import { Footer } from "../../components/footer";
import { Header } from "../../components/header";
import { Product } from "../../components/product";
import { SectionDiv } from "../../components/SectionDiv";
import { getData } from "../../lib/http.request";
import { reload } from "../../lib/utills";

Header();
Footer();
const products = await getData("/products");
const wishes = await getData("/wishes");
const user = JSON.parse(localStorage.getItem("user"));

const wishes_cont = document.querySelector(".products_cont");
const empty_div = document.querySelector(".empty_div");
const main_page_btn = document.querySelector(".empty_div button");
const all_products = document.querySelector(".all_products");

all_products.append(SectionDiv());
const all_products_cont = document.querySelector(
  ".all_products .products_cont"
);

const popular_products = products.data
  .sort((a, b) => b.minimumOrderQuantity - a.minimumOrderQuantity)
  .slice(0, 5);

reload(popular_products, Product, all_products_cont);

const all_products_title = document.querySelector(".all_products .cont_title");
all_products_title.innerHTML = "популярные товары".replace(/^./, (char) =>
  char.toLocaleUpperCase("ru")
);

main_page_btn.onclick = () => {
  location.assign("/dashboard");
};

const userWishes = wishes.data.filter(
  (item) => user && item.userId === user.id
);
console.log(userWishes);

if (userWishes.length > 0) {
  empty_div.style.display = "none";
  all_products.style.display = "none";
  reload(userWishes, Product, wishes_cont);
}
