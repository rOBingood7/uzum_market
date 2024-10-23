import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { formatDate } from "../algorithms/formatDate";
import { getData, postData } from "../lib/http.request";

export function ProductInfo(item) {
  function createElement(tag, classes = [], content = "") {
    const el = document.createElement(tag);
    if (classes.length) el.classList.add(...classes);
    if (content) el.innerHTML = content;
    return el;
  }
  const content_wrapper = createElement("div", ["content_wrapper"]);
  const content_left = createElement("div", ["content_left"]);
  const content_right = createElement("div", ["content_right"]);
  const product_header = createElement("div", ["product_header"]);
  const slider_container = createElement("div", ["slider_container"]);
  const description_wrapper = createElement("div", ["description_wrapper"]);
  const product_description_btn = createElement(
    "div",
    ["product_description_btn"],
    "Описание"
  );
  const product_description_text = createElement(
    "p",
    ["product_description_text"],
    item.description
  );
  const product_name = createElement("h1", [], item.title);
  const product_rating_div = createElement("div", ["product_rating_div"]);
  const star_icon = createElement("div", ["star_icon"]);
  const star_icon_2 = createElement("div", ["star_icon"]);
  const product_rating = createElement("div", ["product_rating"], item.rating);
  const thumbnails_container = createElement("div", ["thumbnails_container"]);
  const main_slider = createElement("div", ["main_slider", "swiper"]);
  const swiper_prev_btn = createElement("button", ["swiper-button-prev"]);
  const swiper_next_btn = createElement("button", ["swiper-button-next"]);
  const swiper_wrapper = createElement("div", ["swiper-wrapper"]);
  const product_card = createElement("div", ["product_card"]);
  const price_info = createElement("div", ["price_info"]);
  const current_price = createElement("div", ["current_price"]);
  const old_price = createElement("div", ["old_price"]);
  const discount = createElement("div", ["discount"]);
  const buy_div = createElement("div", ["buy_div"]);
  const wishlist = createElement("button", ["wishlist"]);
  const stock_info = createElement("div", ["stock_info"]);
  const stock_status = createElement("div", ["stock_status"]);
  const stock_icon = createElement("div", ["stock_icon"]);
  const favourites_img_btn = createElement("button");
  const info_banner = createElement("div", ["info_banner"]);
  const delivery_section = createElement("div", ["delivery_section"]);
  const payment_section = createElement("div", ["payment_section"]);
  const return_section = createElement("div", ["return_section"]);
  const delivery_title = createElement("p", ["title"], "Доставка от 1 дня");
  const payment_icons = createElement("span", ["payment_icons"]);
  const uzum_bank_icon = createElement("span", ["uzum_bank"]);
  const uzum_nasiya_icon = createElement("span", ["uzum_nasiya"]);
  const uzcard_icon = createElement("span", ["uzcard"]);
  const humo_icon = createElement("span", ["humo"]);
  const visa_icon = createElement("span", ["visa"]);
  const mastercard_icon = createElement("span", ["mastercard"]);
  const cash_icon = createElement("span", ["cash"]);
  const info_extra_banner = createElement("div", ["info_extra_banner"]);
  const info_item = createElement("div", ["info_item"]);
  const hanger_icon = createElement("div", ["hanger"]);
  const info_content = createElement("div", ["info_content"]);
  const info_title = createElement("p", ["title"], "Удобные пункты выдачи");
  const favourites_img = createElement("span", ["favourites_img"]);
  const product_reviews = createElement(
    "span",
    ["product_reviews"],
    `(${item.reviews.length} отзывов)`
  );
  const product_reviews_2 = createElement(
    "span",
    ["product_reviews"],
    `(${item.reviews.length} отзывов)`
  );
  const product_orders = createElement(
    "span",
    ["product_orders"],
    `${item.minimumOrderQuantity} заказов`
  );
  const buy_one_click = createElement(
    "button",
    ["buy_one_click"],
    "Купить в 1 клик"
  );
  const add_to_cart = createElement(
    "button",
    ["add_to_cart"],
    "Добавить в корзину"
  );

  const payment_title = createElement(
    "p",
    ["title"],
    "Безопасная оплата удобным способом"
  );
  const return_title = createElement(
    "p",
    ["title"],
    "Простой и быстрый возврат"
  );
  const delivery_descr = createElement(
    "p",
    ["description"],
    "В пункты выдачи Uzum или курьером"
  );
  const payment_descr = createElement(
    "p",
    ["description"],
    "Оплачивайте картой, наличными или в рассрочку"
  );
  const return_descr = createElement(
    "p",
    ["description"],
    "Примем товары в течение 10 дней и сразу вернём деньги."
  );
  const info_descr = createElement(
    "p",
    ["description"],
    "Примерьте одежду и проверьте технику"
  );

  const feedback_rating = createElement("div", ["feedback_rating"]);
  const rating_summary = createElement("div", ["rating_summary"]);
  const feedback_list = createElement("div", ["feedback_list"]);
  const rating_value = createElement("h3", ["rating_value"], item.rating);

  const user_string = localStorage.getItem("user");
  const user = JSON.parse(user_string);

  add_to_cart.onclick = async (e) => {
    const cartItems = await getData("/cart");

    const exists = cartItems.data.some(
      (cartItem) => cartItem.product.id === item.id
    );
    let quantity = 1;
    if (!exists && user) {
      await postData("/cart", {
        userId: user.id,
        id: crypto.randomUUID(),
        productId: item.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        quantity: quantity,
        product: item,
      });

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
  current_price.innerHTML =
    Math.ceil(
      (item.price - (item.price * item.discountPercentage) / 100) * 10000
    )
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " сум";
  old_price.innerHTML = (item.price * 10000)
    .toFixed()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  discount.innerHTML = `-${item.discountPercentage}%`;

  stock_status.innerHTML =
    item.stock > 10
      ? `В наличии ${item.stock}`
      : `Осталось всего ${item.stock}`;

  product_rating_div.append(
    star_icon,
    product_rating,
    product_reviews,
    product_orders
  );
  product_header.append(product_name, product_rating_div);
  main_slider.append(swiper_wrapper, swiper_prev_btn, swiper_next_btn);
  content_left.append(
    product_header,
    slider_container,
    feedback_rating,
    description_wrapper
  );
  description_wrapper.append(product_description_btn, product_description_text);
  slider_container.append(thumbnails_container, main_slider);
  content_wrapper.append(content_left, content_right);
  favourites_img_btn.append(favourites_img);
  buy_div.append(buy_one_click, favourites_img_btn);
  price_info.append(current_price, old_price, discount);
  stock_info.append(stock_icon, stock_status);
  product_card.append(price_info, buy_div, wishlist, add_to_cart, stock_info);
  delivery_section.append(delivery_title, delivery_descr);
  payment_section.append(payment_title, payment_descr, payment_icons);
  payment_icons.append(
    uzum_bank_icon,
    uzum_nasiya_icon,
    uzcard_icon,
    humo_icon,
    visa_icon,
    mastercard_icon,
    cash_icon
  );
  return_section.append(return_title, return_descr);
  info_banner.append(delivery_section, payment_section, return_section);
  info_extra_banner.append(info_item);
  info_item.append(hanger_icon, info_content);
  info_content.append(info_title, info_descr);
  content_right.append(product_card, info_banner, info_extra_banner);
  feedback_rating.append(rating_summary, feedback_list);
  rating_summary.append(rating_value, star_icon_2, product_reviews_2);

  item.images.forEach((imageUrl) => {
    const thumbnailImg = createElement("div", ["thumbnail"]);
    const sliderDiv = createElement("div", ["swiper-slide"]);
    thumbnailImg.style.backgroundImage = `url(${imageUrl})`;
    sliderDiv.style.backgroundImage = `url(${imageUrl})`;

    thumbnails_container.append(thumbnailImg);
    swiper_wrapper.append(sliderDiv);
  });

  if (item.images.length < 2) {
    swiper_prev_btn.style.display = "none";
    swiper_next_btn.style.display = "none";
  }
  item.reviews.forEach((review) => {
    const item_feedback = createElement("div", ["item_feedback"]);
    const feedback_card = createElement("div", ["feedback_card"]);
    const customer_name = createElement(
      "span",
      ["customer_name"],
      review.reviewerName
    );
    const feedback_date = createElement(
      "span",
      ["feedback_date"],
      formatDate(review.date)
    );
    const text_review = createElement(
      "span",
      ["text_review"],
      `Комментарий: ${review.comment}`
    );
    feedback_list.append(feedback_card);

    feedback_card.append(item_feedback, text_review);
    item_feedback.append(customer_name, feedback_date);
  });
  return content_wrapper;
}
