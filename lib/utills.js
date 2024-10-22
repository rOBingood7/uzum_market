export function reload(arr, component, place, category = false) {
  place.innerHTML = "";

  let filtered_arr = arr;

  if (category) {
    filtered_arr = arr.filter((item) => item.category === category);
  }

  filtered_arr.forEach((item) => place.append(component(item)));
}
