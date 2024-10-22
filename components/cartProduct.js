import { deleteData, getData } from "../lib/http.request";

export function cartProduct(item) {
  const cart_item = document.createElement("div");
  const product_img = document.createElement("div");
  const product_info_details = document.createElement("div");
  const product_link = document.createElement("a");
  const price_with_sale = document.createElement("p");
  const price_without_sale = document.createElement("p");
  const quantity_selector = document.createElement("div");
  const decrease_button = document.createElement("button");
  const quantity_input = document.createElement("input");
  const increase_button = document.createElement("button");
  const delete_button = document.createElement("button");

  cart_item.classList.add("cart_item");
  product_img.classList.add("product_img");
  product_info_details.classList.add("product_info_details");
  price_with_sale.classList.add("price_with_sale");
  price_without_sale.classList.add("price_without_sale");
  quantity_selector.classList.add("quantity_selector");
  decrease_button.classList.add("decrease");
  quantity_input.classList.add("quantity");
  increase_button.classList.add("increase");
  delete_button.classList.add("delete");

  product_link.href = `/pages/product/?id=${item.productId}`;
  decrease_button.disabled = true;
  quantity_input.type = "number";
  quantity_input.min = "1";
  quantity_input.placeholder = "1";

  product_link.innerHTML = item.product.title;
  price_with_sale.innerHTML = item.product.price;
  decrease_button.innerHTML = "−";
  increase_button.innerHTML = "+";
  delete_button.innerHTML = "Удалить";

  product_img.style.backgroundImage = `url(${item.product.images[0]})`;
  price_with_sale.innerHTML =
    Math.ceil(
      (item.product.price -
        (item.product.price * item.product.discountPercentage) / 100) *
        10000
    )
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " сум";

  price_without_sale.innerHTML =
    (item.product.price * 10000)
      .toFixed()
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " cум";

  quantity_selector.append(decrease_button, quantity_input, increase_button);

  product_info_details.append(
    product_link,
    price_with_sale,
    price_without_sale,
    quantity_selector,
    delete_button
  );

  cart_item.append(product_img, product_info_details);
  let totalSum = 0;
  let totalSaleSum = 0;
  totalSum += Math.ceil(item.product.price * 10000);
  totalSaleSum += Math.ceil(
    (item.product.price -
      (item.product.price * item.product.discountPercentage) / 100) *
      10000
  );
  delete_button.onclick = async (e) => {
    e.preventDefault();
    await deleteData("/cart/" + item.id, item);
    const res = await getData("/cart");
    
    const cart = document.querySelector(".cart");
    const empty_cart = document.querySelector(".empty_cart");
    const cart_count = document.querySelector(".cart_count");
    const cart_length = document.querySelector(".cart_length");
    const cart_length_sum = document.querySelector(".cart_length_sum");
    const total_price_without_sale = document.querySelector(
      ".total_price_without_sale"
    );
    const total_price = document.querySelector(".total_price");

    let totalSum = 0;
    let totalSaleSum = 0;

    res.data.forEach((cartItem) => {
      totalSum += Math.ceil(cartItem.product.price * 10000);
      totalSaleSum += Math.ceil(
        (cartItem.product.price -
          (cartItem.product.price * cartItem.product.discountPercentage) /
            100) *
          10000
      );
    });

    cart_length.innerHTML = `${res.data.length} товар`;
    cart_length_sum.innerHTML = `Товары (${res.data.length}):`;
    cart_count.innerHTML = res.data.length;

    total_price_without_sale.innerHTML = `${totalSum
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ")} сум`;

    total_price.innerHTML = `${totalSaleSum
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ")} сум`;

    if (res.data.length === 0) {
      cart.remove();
      empty_cart.style.display = "flex";
      cart_count.style.display = "none";
    }
    cart_item.remove();
  };

  return cart_item;
}
