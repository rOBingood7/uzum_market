export function Slider(item) {
  const product_slider = document.createElement("div");
  const product_details = document.createElement("div");
  const product_info = document.createElement("div");
  const product_name = document.createElement("span");
  const product_brand = document.createElement("span");
  const price_details = document.createElement("div");
  const price_info = document.createElement("div");
  const price_original = document.createElement("span");
  const discount_badge = document.createElement("span");
  const price_discounted = document.createElement("span");
  const product_image = document.createElement("div");

  product_slider.classList.add("product_slider", "swiper-slide");
  product_details.classList.add("product_details");
  product_info.classList.add("product_info");
  product_name.classList.add("product_name");
  product_brand.classList.add("product_brand");
  price_details.classList.add("price_details");
  price_info.classList.add("price_info");
  price_original.classList.add("price_original");
  discount_badge.classList.add("discount_badge");
  price_discounted.classList.add("price_discounted");
  product_image.classList.add("product_image");

  product_slider.style.display = "flex";
  product_name.innerHTML = item.title;
  if (item.brand) {
    product_brand.innerHTML = item.brand;
  }
  price_original.innerHTML =
    (item.price * 10000).toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, " ") +
    " сум";
  discount_badge.innerHTML = `-${item.discountPercentage}%`;
  price_discounted.innerHTML =
    Math.ceil(
      (item.price - (item.price * item.discountPercentage) / 100) * 10000
    )
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " сум";

  product_image.style.backgroundImage = `url(${item.images[0]})`;
  product_info.append(product_name, product_brand);
  price_info.append(price_original, discount_badge);
  price_details.append(price_info, price_discounted);
  product_details.append(product_info, price_details);
  product_slider.append(product_details, product_image);
  return product_slider;
}
