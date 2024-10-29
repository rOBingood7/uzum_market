export function Footer() {
  const footer_container = document.createElement("div");
  const footer_bottom = document.createElement("div");
  const bottom_links_container = document.createElement("div");
  const privacy_link = document.createElement("a");
  const user_agreement_link = document.createElement("a");
  const footer_text = document.createElement("p");

  footer_container.classList.add("footer_container", "container");
  footer_bottom.classList.add("footer_bottom", "container");

  privacy_link.href = "https://legal.uzum.uz/privacy-policy.html";
  privacy_link.innerHTML = "Соглашение о конфиденциальности";
  user_agreement_link.href = "https://legal.uzum.uz/user-agreement-ru.html";
  user_agreement_link.innerHTML = "Пользовательское соглашение";
  footer_text.innerHTML =
    "«2024© ООО «UZUM MARKET». ИНН 309376127. Все права защищены»";

  const sections = [
    {
      heading: "О нас",
      links: [
        { text: "Пункты выдачи", href: "https://uzum.uz/ru/about/delivery-points" },
        { text: "Вакансии", href: "https://uzum.uz/ru/about/careers" },
      ],
    },
    {
      heading: "Пользователям",
      links: [
        { text: "Связаться с нами", href: "#" },
        { text: "Вопрос - Ответ", href: "https://uzum.uz/ru/faq" },
      ],
    },
    {
      heading: "Для предпринимателей",
      links: [
        { text: "Продавайте на Uzum", href: "https://seller.uzum.uz/" },
        { text: "Вход для продавцов", href: "https://seller.uzum.uz/seller/signin" },
      ],
    },
  ];

  const download_app_links = [
    {
      platform: "AppStore",
      href: "https://apps.apple.com/ru/app/uzum-%D0%B8%D0%BD%D1%82%D0%B5%D1%80%D0%BD%D0%B5%D1%82-%D0%BC%D0%B0%D0%B3%D0%B0%D0%B7%D0%B8%D0%BD/id1640483056",
      class: "apple_logo",
    },
    {
      platform: "Play Market",
      href: "https://play.google.com/store/apps/details?id=uz.uzum.app",
      class: "play_market_logo",
    },
  ];

  const social_links = [
    { href: "https://www.instagram.com/uzum.market", class: "instagram_logo" },
    { href: "https://t.me/uzum_market", class: "telegram_logo" },
    { href: "https://www.facebook.com/uzummarket", class: "facebook_logo" },
    {
      href: "https://www.youtube.com/channel/UCY3nNF2MUDKHrELA6LzbnHA",
      class: "youtube_logo",
    },
  ];

  function createSection(headingText, links) {
    const section = document.createElement("div");
    const heading = document.createElement("h4");
    section.classList.add("footer_section");
    heading.innerHTML = headingText;
    section.append(heading);

    links.forEach(({ text, href }) => {
      const link = document.createElement("a");
      link.href = href;
      link.innerHTML = text;
      section.append(link);
    });

    return section;
  }

  function createLinks(links, className) {
    const container = document.createElement("div");
    container.classList.add(className);
    links.forEach(({ platform, href, class: linkClass }) => {
      const link_div = document.createElement("div");
      const link = document.createElement("a");
      const span = document.createElement("span");

      link.href = href;
      link.target = "_blank";
      link.classList.add(linkClass);
      span.innerHTML = platform;

      link_div.classList.add("footer_logo_div");
      link_div.append(link, span);
      container.append(link_div);
    });

    return container;
  }

  sections.forEach(({ heading, links }) =>
    footer_container.append(createSection(heading, links))
  );

  const download_app_section = createSection("Скачать приложение", []);
  const download_app_container = createLinks(
    download_app_links,
    "download_app"
  );

  const social_section = createSection("Uzum в соцсетях", []);
  const social_container = createLinks(
    social_links.map(({ href, class: linkClass }) => ({
      platform: "",
      href,
      class: linkClass,
    })),
    "social_apps"
  );

  bottom_links_container.append(privacy_link, user_agreement_link);
  footer_bottom.append(bottom_links_container, footer_text);
  download_app_section.append(download_app_container, social_section);
  footer_container.append(download_app_section);
  social_section.append(social_container);
  const footer = document.querySelector("footer");
  footer.append(footer_container, footer_bottom);
}
