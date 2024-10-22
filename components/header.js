import { getData } from "../lib/http.request";
import "toastify-js/src/toastify.css";
import Toastify from "toastify-js";

export function Header() {
  const header = document.querySelector("header");
  const header_div = document.createElement("div");
  const logo_div = document.createElement("div");
  const catalogue_div = document.createElement("div");
  const catalogue_button = document.createElement("button");
  const search_bar_div = document.createElement("div");
  const search_input = document.createElement("input");
  const right_section_div = document.createElement("div");
  const user_button = document.createElement("button");
  const user_img = document.createElement("div");
  const user_span = document.createElement("span");
  const favorites_button = document.createElement("button");
  const favorites_img = document.createElement("div");
  const favorites_span = document.createElement("span");
  const cart_button = document.createElement("button");
  const cart_img = document.createElement("div");
  const cart_span = document.createElement("span");
  const cart_count_div = document.createElement("div");

  header_div.classList.add("header_div", "container");
  logo_div.classList.add("logo_img");
  user_img.classList.add("user_img");
  catalogue_div.classList.add("catalogue");
  search_bar_div.classList.add("search_bar");
  catalogue_button.classList.add("catalogue_btn");
  right_section_div.classList.add("right_section");
  user_button.classList.add("right_section_btn");
  favorites_img.classList.add("favourites_img");
  cart_img.classList.add("cart_img");
  favorites_button.classList.add("right_section_btn");
  cart_button.classList.add("right_section_btn");
  cart_count_div.classList.add("cart_count");

  const user_string = localStorage.getItem("user");
  const user = JSON.parse(user_string);

  catalogue_button.innerHTML = "Каталог";
  favorites_span.innerHTML = "Избранное";
  cart_span.innerHTML = "Корзина";
  if (user) {
    user_span.innerHTML = user.name;
  } else {
    user_span.innerHTML = "Войти";
  }
  user_button.onclick = () => {
    if (!user) {
      location.assign("/pages/signin/");
    } else {
      localStorage.clear();
      location.reload();
    }
  };
  user_button.onmouseover = () => {
    if (user) {
      user_span.innerHTML = "Выход";
      user_img.style.display = "none";
    }
  };
  user_button.onmouseleave = () => {
    if (user) {
      user_span.innerHTML = user.name;
      user_img.style.display = "block";
    }
  };

  cart_span.onclick = () => {
    if (user) {
      location.assign("/pages/cart/");
    } else {
      Toastify({
        text: "Войдите в аккаунт, чтобы посмотреть корзину",
        gravity: "top",
        position: "center",
      }).showToast();
    }
  };

  favorites_button.onclick = () => {
    if (user) {
      location.assign("/pages/wishes/");
    } else {
      Toastify({
        text: "Войдите в аккаунт, чтобы посмотреть избранное",
        gravity: "top",
        position: "center",
      }).showToast();
    }
  };
  logo_div.onclick = () => {
    location.assign("/dashboard/");
  };

  search_input.type = "text";
  search_input.placeholder = "Искать товары";

  catalogue_div.append(catalogue_button);
  search_bar_div.append(search_input);
  user_button.append(user_img, user_span);
  favorites_button.append(favorites_img, favorites_span);
  cart_button.append(cart_img, cart_span, cart_count_div);
  right_section_div.append(user_button, favorites_button, cart_button);
  header_div.append(logo_div, catalogue_div, search_bar_div, right_section_div);
  header.append(header_div);

  async function cartIndicator() {
    try {
      const cart_products = await getData("/cart");
      cart_products.data.forEach((item) => {
        if (user && user.id === item.userId && cart_products.data.length > 0) {
          cart_count_div.style.display = "block";
          cart_count_div.innerHTML = cart_products.data.length;
        } else {
          cart_count_div.style.display = "none";
        }
      });
    } catch (error) {
      console.error("Error");
    }
  }
  cartIndicator();
}
