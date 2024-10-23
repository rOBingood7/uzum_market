import { deleteData, getData, postData } from "../lib/http.request";
import "toastify-js/src/toastify.css";
import Toastify from "toastify-js";

export function Product(item) {
  const product = document.createElement("div");
  const product_img = document.createElement("div");
  const favourites_img = document.createElement("button");
  const product_name = document.createElement("p");
  const price_without_sale = document.createElement("span");
  const price_with_sale_div = document.createElement("div");
  const price_with_sale = document.createElement("span");
  const product_cart_btn = document.createElement("button");
  const cart_img = document.createElement("div");
  const product_rating_div = document.createElement("div");
  const product_rating = document.createElement("div");
  const product_reviews = document.createElement("span");
  const star_icon = document.createElement("div");

  product.classList.add("product");
  product_img.classList.add("product_img");
  favourites_img.classList.add("favourites_img");
  price_without_sale.classList.add("price_without_sale");
  price_with_sale_div.classList.add("price_with_sale_div");
  price_with_sale.classList.add("price_with_sale");
  cart_img.classList.add("cart_img");
  star_icon.classList.add("star_icon");
  product_rating.classList.add("product_rating");
  product_reviews.classList.add("product_reviews");
  product_rating_div.classList.add("product_rating_div");
  let quantity = 1;

  const user_string = localStorage.getItem("user");
  const user = JSON.parse(user_string);
  product_name.innerHTML = item.title;
  product_rating.innerHTML = item.rating;
  product_reviews.innerHTML = `(${item.reviews.length}) отзывов`;

  product_img.style.backgroundImage = `url(${item.images[0]})`;
  product.append(
    product_img,
    product_name,
    product_rating_div,
    price_without_sale,
    price_with_sale_div
  );
  product_img.append(favourites_img);
  product_rating_div.append(star_icon, product_rating, product_reviews);
  price_with_sale_div.append(price_with_sale, product_cart_btn);
  product_cart_btn.append(cart_img);

  product.onclick = (e) => {
    e.preventDefault();
    location.assign(`/pages/product/?id=${item.id}`);
  };

  product_cart_btn.onclick = async (e) => {
    e.stopPropagation();

    const cartItems = await getData("/cart");

    const exists = cartItems.data.some(
      (cartItem) => cartItem.product.id === item.id
    );

    if (!exists && user) {
      await postData("/cart", {
        userId: user.id,
        id: crypto.randomUUID(),
        productId: item.id,
        quantity: quantity,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        product: item,
      });

      document.querySelector(".cart_count").innerHTML = cartItems.data.length;
      document.querySelector(".cart_count").style.display = "block";

      Toastify({
        text: "Товар добавлен в корзину!",
        gravity: "top",
        position: "center",
      }).showToast();
      const updatedCartItems = await getData("/cart");
      const cart_count = document.querySelector(".cart_count");
      cart_count.innerHTML = updatedCartItems.data.length;
    } else if (exists) {
      Toastify({
        text: "Товар уже есть в корзине!",
        gravity: "top",
        position: "center",
      }).showToast();
    } else {
      Toastify({
        text: "Войдите в аккаунт чтобы добавить товар в корзину!",
        gravity: "top",
        position: "center",
      }).showToast();
    }
  };

  favourites_img.onclick = async (e) => {
    e.stopPropagation();

    if (favourites_img.classList.contains("heart_filled")) {
      favourites_img.classList.remove("heart_filled");
      favourites_img.classList.add("favourites_img");

      try {
        await deleteData(`/favourites?favouritesId=${item.id}`);
      } catch (error) {
        console.error("Error deleting favourite:", error);
        favourites_img.classList.add("heart_filled");
        favourites_img.classList.remove("favourites_img");
      }
    } else {
      favourites_img.classList.add("heart_filled");
      favourites_img.classList.remove("favourites_img");

      try {
        await postData("/favourites", {
          userId: user,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          product: item,
          productId: item.id,
        });
      } catch (error) {
        console.error("Error", error);
        favourites_img.classList.remove("heart_filled");
        favourites_img.classList.add("favourites_img");
      }
    }
  };

  price_without_sale.innerHTML = (item.price * 10000 * quantity)
    .toFixed()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  price_with_sale.innerHTML =
    Math.ceil(
      (item.price - (item.price * item.discountPercentage) / 100) *
        10000 *
        quantity
    )
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " сум";

  return product;
}
