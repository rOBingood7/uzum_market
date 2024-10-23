import { formatPrice } from "../algorithms/formatPrice";
import { deleteData, getData, patchData } from "../lib/http.request";

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
  quantity_input.type = "number";
  quantity_input.min = "1";
  quantity_input.value = item.quantity;

  product_link.innerHTML = item.product.title;
  decrease_button.innerHTML = "−";
  increase_button.innerHTML = "+";
  delete_button.innerHTML = "Удалить";
  product_img.style.backgroundImage = `url(${item.product.images[0]})`;

  price_with_sale.innerHTML = formatPrice(
    item.product.price,
    item.product.discountPercentage,
    item.quantity
  );
  price_without_sale.innerHTML = formatPrice(
    item.product.price,
    0,
    item.quantity
  );

  quantity_selector.append(decrease_button, quantity_input, increase_button);
  product_info_details.append(
    product_link,
    price_with_sale,
    price_without_sale,
    quantity_selector,
    delete_button
  );
  cart_item.append(product_img, product_info_details);
  const total_price_without_sale = document.querySelector(
    ".total_price_without_sale"
  );
  const total_price = document.querySelector(".total_price");

  const updateTotalPrice = async () => {
    const cart_products = await getData("/cart");

    let totalSum = 0;
    let totalSaleSum = 0;

    cart_products.data.forEach((cartItem) => {
      totalSum += Math.ceil(cartItem.product.price * 10000 * cartItem.quantity);
      totalSaleSum += Math.ceil(
        (cartItem.product.price -
          (cartItem.product.price * cartItem.product.discountPercentage) /
            100) *
          10000 *
          cartItem.quantity
      );
    });

    total_price_without_sale.innerHTML =
      totalSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " сум";
    total_price.innerHTML =
      totalSaleSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " сум";
  };

  const updateButtonsState = (quantity) => {
    decrease_button.disabled = quantity <= 1;
    increase_button.disabled = quantity >= item.product.stock;
  };

  const updatePriceAndButtons = (quantity) => {
    price_with_sale.innerHTML = formatPrice(
      item.product.price,
      item.product.discountPercentage,
      quantity
    );
    price_without_sale.innerHTML = formatPrice(item.product.price, 0, quantity);

    updateButtonsState(quantity);
  };

  const updateQuantity = async (quantity) => {
    try {
      if (quantity < 1) {
        quantity = 1;
      } else if (quantity > item.product.stock) {
        quantity = item.product.stock;
      }

      await patchData(`/cart/${item.id}`, { quantity });
      quantity_input.value = quantity;
      updatePriceAndButtons(quantity);
      await updateTotalPrice();
    } catch (error) {
      console.error("Error updating quantity", error);
    }
  };

  quantity_input.oninput = async () => {
    let quantity = +quantity_input.value;

    if (isNaN(quantity) || quantity < 0) {
      quantity = 1;
    } else if (quantity > item.product.stock) {
      quantity = item.product.stock;
    }

    quantity_input.value = quantity;
    await updateQuantity(quantity);
  };

  increase_button.onclick = () => {
    let quantity = parseInt(quantity_input.value) || 0;
    if (quantity < item.product.stock) {
      quantity++;
      updateQuantity(quantity);
    }
  };

  decrease_button.onclick = () => {
    let quantity = parseInt(quantity_input.value) || 0;
    if (quantity > 1) {
      quantity--;
      updateQuantity(quantity);
    }
  };

  delete_button.onclick = async () => {
    try {
      await deleteData(`/cart/${item.id}`);
      cart_item.remove();
      await updateTotalPrice();
    } catch (error) {
      console.error("Error deleting item from cart", error);
    }
  };

  updateButtonsState(item.quantity);
  updateTotalPrice();

  return cart_item;
}
