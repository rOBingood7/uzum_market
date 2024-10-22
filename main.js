import { SwiperFunction } from "./algorithms/swiper";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { Product } from "./components/product";
import { SectionDiv } from "./components/SectionDiv";
import { Slider } from "./components/slider";
import { getData } from "./lib/http.request";
import { reload } from "./lib/utills";

Header();
Footer();
SwiperFunction(1, true);

const products = await getData("/products");
const show_all = document.querySelector(".show_all");
const swiper_wrapper = document.querySelector(".swiper-wrapper");
const all_products = document.querySelector(".all_products");
const category_products = document.querySelector(".category_products");

all_products.append(SectionDiv());

const all_products_cont = document.querySelector(
  ".all_products .products_cont"
);
const all_products_title = document.querySelector(".all_products .cont_title");

all_products_title.innerHTML =
  "Все товары".charAt(0).toUpperCase() + "Все товары".slice(1);

reload(products.data.slice(0, 10), Product, all_products_cont);
let product_length = 10;

show_all.onclick = () => {
  const next_products = products.data.slice(
    product_length,
    product_length + 10
  );
  next_products.forEach((item) => all_products_cont.append(Product(item)));
  product_length += next_products.length;

  if (product_length >= products.data.length) {
    show_all.style.display = "none";
  }
};

const categories = new Set();

products.data.forEach((product) => {
  categories.add(product.category);
});
reload(categories, SectionDiv, category_products);
const section_divs = document.querySelectorAll(
  ".category_products .section_div"
);

section_divs.forEach((div, index) => {
  const category = Array.from(categories)[index];
  const filtered_products = products.data.filter(
    (item) => item.category === category
  );
  reload(
    filtered_products.slice(0, 5),
    Product,
    div.querySelector(".products_cont")
  );
});

reload(products.data, Slider, swiper_wrapper);

