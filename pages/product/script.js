import { SwiperFunction } from "../../algorithms/swiper";
import { Footer } from "../../components/footer";
import { Header } from "../../components/header";
import { Product } from "../../components/product";
import { ProductInfo } from "../../components/ProductInfo";
import { SectionDiv } from "../../components/SectionDiv";
import { getData } from "../../lib/http.request";
import { reload } from "../../lib/utills";
Footer();
Header();

const id = Number(location.search.split("=").at(-1));
const product_page = document.querySelector(".product_page");
const product = await getData("/products/" + id);
document.title = product.data.title;
console.log(product);

reload([product.data], ProductInfo, product_page);
SwiperFunction(2);

const products = await getData("/products");
const similar_products = document.querySelector(".similar_products");

similar_products.append(SectionDiv());

const similar_products_title = document.querySelector(
  ".similar_products .cont_title"
);
similar_products_title.innerHTML =
  "Похожие товары".charAt(0).toUpperCase() + "Похожие товары".slice(1);

const category = product.data.category;
const products_cont = document.querySelector(
  ".similar_products .products_cont"
);
const filtered_products = products.data.filter(
  (item) => item.category === category && item.id !== product.data.id
);

if (filtered_products.length >= 5) {
  reload(filtered_products.slice(0, 5), Product, products_cont);
} else {
  reload(filtered_products, Product, products_cont);
  document.querySelectorAll(".product").forEach((product) => {
    product.style.height = "460px";
  });
  document.querySelectorAll(".product_img").forEach((product_img) => {
    product_img.style.height = "350px";
  });
}
