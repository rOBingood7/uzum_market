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
  product_name.innerHTML = item.title || item.product.title;
  product_rating.innerHTML = item.rating || item.product.rating;
  product_reviews.innerHTML = `(${
    (item.reviews?.length || item.product.reviews?.length) ?? 0
  }) отзывов`;

  product_img.style.backgroundImage = `url(${
    item.images?.[0] || item.product.images?.[0]
  })`;
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

  const checkIfFavorite = async () => {
    try {
      const favourites = await getData(`/wishes`);
      const isFavorite = favourites.data.some(
        (fav) => fav.productId === item.id
      );

      if (isFavorite) {
        favourites_img.classList.add("heart_filled");
        favourites_img.classList.remove("favourites_img");
        return;
      }
    } catch (error) {
      console.error("Error checking favorites:", error);
    }
  };

  checkIfFavorite();

  favourites_img.onclick = async (e) => {
    e.stopPropagation();

    try {
      const isFavorite = favourites_img.classList.contains("heart_filled");

      if (isFavorite) {
        const favorite = await getData(`/wishes?productId=${item.id}`);

        if (favorite.data.length > 0) {
          await deleteData(`/wishes/${favorite.data[0].id}`);
          favourites_img.classList.remove("heart_filled");
          favourites_img.classList.add("favourites_img");
        } else {
          console.warn("Favorite item not found for deletion.");
        }
      } else {
        await postData("/wishes", {
          userId: user.id,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          productId: item.id,
          product: item,
        });
        favourites_img.classList.add("heart_filled");
        favourites_img.classList.remove("favourites_img");
      }
    } catch (error) {
      console.error("Error handling favorite toggle:", error);
    }
  };

  const price = item.price || item.product.price || 0;
  const discountPercentage =
    item.discountPercentage || item.product.discountPercentage || 0;

  price_without_sale.innerHTML = (price * 10000 * quantity)
    .toFixed()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  price_with_sale.innerHTML =
    Math.ceil((price - (price * discountPercentage) / 100) * 10000 * quantity)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " сум";
  return product;
}
