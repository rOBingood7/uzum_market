import { cartProduct } from "../../components/cartProduct";
import { Footer } from "../../components/footer";
import { Header } from "../../components/header";
import { Product } from "../../components/product";
import { SectionDiv } from "../../components/SectionDiv";
import { getData } from "../../lib/http.request";
import { reload } from "../../lib/utills";

Header();
Footer();

const cart_products = await getData("/cart");
const products = await getData("/products");
const user = JSON.parse(localStorage.getItem("user"));

const cart = document.querySelector(".cart");
const empty_cart = document.querySelector(".empty_div");
const main_page_btn = document.querySelector(".empty_div button");
const all_products = document.querySelector(".all_products");
all_products.append(SectionDiv());
const all_products_cont = document.querySelector(
  ".all_products .products_cont"
);

reload(
  products.data
    .sort((a, b) => b.minimumOrderQuantity - a.minimumOrderQuantity)
    .slice(0, 5),
  Product,
  all_products_cont
);

document.querySelector(".all_products .cont_title").innerHTML =
  "Все товары".charAt(0).toUpperCase() + "Все товары".slice(1);

main_page_btn.onclick = () => location.assign("/dashboard");

if (cart_products.data.length > 0 && user) {
  empty_cart.style.display = "none";
  cart.style.display = "block";

  let totalSum = 0;
  let totalSaleSum = 0;

  cart_products.data.forEach((item) => {
    if (user.id === item.userId) {
      totalSum += Math.ceil(item.product.price * 10000 * item.quantity);
      totalSaleSum += Math.ceil(
        (item.product.price -
          (item.product.price * item.product.discountPercentage) / 100) *
          10000 *
          item.quantity
      );
    }
  });

  cart.innerHTML = `
    <h1>Ваша корзина, <span class="cart_length">${
      cart_products.data.length
    } товар</span></h1>
    <div class="cart_container">
      <div class="cart_products_container"></div>
      <div class="cart_sum">
        <h2>Ваш заказ</h2>
        <div class="summary_price">
          <span class="cart_length_sum">Товары (${
            cart_products.data.length
          }):</span>
          <span class="total_price_without_sale">${
            totalSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " сум"
          }</span>
        </div>
        <div class="summary_fullprice">
          <span>Итого:</span>
          <span class="total_price">${
            totalSaleSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") +
            " сум"
          }</span>
        </div>
        <button>Перейти к оформлению</button>
      </div>
    </div>`;

  const cart_products_container = document.querySelector(
    ".cart_products_container"
  );
  reload(cart_products.data, cartProduct, cart_products_container);
} else {
  cart.style.display = "none";
  empty_cart.style.display = "flex";
}
