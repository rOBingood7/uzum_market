export function formatPrice(price, discountPercentage, quantity) {
  const totalPrice = Math.ceil(
    (price - (price * discountPercentage) / 100) * 10000 * quantity
  );
  return totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " сум";
}
