export function SectionDiv(item) {
  const section_div = document.createElement("div");
  const title_flex = document.createElement("div");
  const cont_title = document.createElement("h2");
  const cont_a = document.createElement("a");
  const products_cont = document.createElement("div");

  section_div.classList.add("section_div")
  title_flex.classList.add("title_flex");
  cont_title.classList.add("cont_title");
  products_cont.classList.add("products_cont");

  cont_title.innerHTML = String(item).charAt(0).toUpperCase() + String(item).slice(1);

  section_div.append(title_flex, products_cont);
  title_flex.append(cont_title, cont_a);

  return section_div;
}
