import Swiper from "swiper";
import "swiper/css";
import "swiper/css/pagination";
// import "swiper/css/navigation";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

export function SwiperFunction(slidesPerViewNumber, enableAutoplay = false) {
  const swiperModules = [Navigation, Pagination];

  if (enableAutoplay) {
    swiperModules.push(Autoplay);
  }

  const swiperConfig = {
    loop: true,
    modules: swiperModules,
    slidesPerView: slidesPerViewNumber,
    spaceBetween: 25,
    watchOverflow: true,
    pagination: {
      el: ".swiper-pagination",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  };

  if (enableAutoplay) {
    swiperConfig.autoplay = {
      delay: 3000,
      disableOnInteraction: false,
    };
  }

  new Swiper(".swiper", swiperConfig);
}
