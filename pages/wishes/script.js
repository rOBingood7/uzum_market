import { Footer } from "../../components/footer";
import { Header } from "../../components/header";
import { Product } from "../../components/product";
import { SectionDiv } from "../../components/SectionDiv";
import { getData } from "../../lib/http.request";
import { reload } from "../../lib/utills";

Header();
Footer();
const products = await getData("/products");

const user_string = localStorage.getItem("user");
const user = JSON.parse(user_string);

const empty_cart = document.querySelector(".empty_cart");
const main_page_btn = document.querySelector(".empty_cart button");
const all_products = document.querySelector(".all_products");
all_products.append(SectionDiv());
const all_products_cont = document.querySelector(
  ".all_products .products_cont"
);

const popular_products = products.data.sort(
  (a, b) => b.minimumOrderQuantity - a.minimumOrderQuantity
);

reload(popular_products.slice(0, 5), Product, all_products_cont);

const all_products_title = document.querySelector(".all_products .cont_title");

all_products_title.innerHTML =
  "Популярные товары".charAt(0).toUpperCase() + "Популярные товары".slice(1);

main_page_btn.onclick = () => {
  location.assign("/dashboard");
};
