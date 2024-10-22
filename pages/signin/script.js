import { getData } from "../../lib/http.request";
import "toastify-js/src/toastify.css";
import Toastify from "toastify-js";

const patterns = {
  email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
};

const inps = document.querySelectorAll("input");
const form = document.querySelector("form");

inps.forEach((inp) => {
  inp.onkeyup = (e) => {
    const val = e.target.value;

    if (patterns[inp.name].test(val)) {
      inp.classList.remove("error");
      inp.classList.add("correct");
    } else {
      inp.classList.remove("correct");
      inp.classList.add("error");
    }
    patterns[inp.name].lastIndex = 0;
  };
});

form.onsubmit = async (e) => {
  e.preventDefault();

  let isError = false;

  inps.forEach((inp) => {
    if (inp.classList.contains("error") || inp.value === "") {
      isError = true;
      inp.classList.add("error");
    }
  });

  if (isError) {
    Toastify({
      text: "Пожалуйста, исправьте ошибки в форме.",
      gravity: "top",
      position: "center",
    }).showToast();
    return;
  } else {
    await submit(e.target);
  }
};

async function submit(target) {
  const fm = new FormData(target);
  const user = {};

  fm.forEach((val, key) => (user[key] = val));

  try {
    const users = await getData(`/users?email=${user.email}`);

    if (users.data.length > 0) {
      const existing_user = users.data[0];

      if (existing_user.password === user.password) {
        const stringified = JSON.stringify(existing_user);

        localStorage.setItem("user", stringified);
        Toastify({
          text: "Вы вошли в аккаунт!",
          gravity: "top",
          position: "center",
        }).showToast();

        setTimeout(() => {
          location.assign("/");
        }, 500);
      } else {
        Toastify({
          text: "Пароль неправильный",
          gravity: "top",
          position: "center",
        }).showToast();
      }
    } else {
      Toastify({
        text: "Пользователь с таким email не существует",
        gravity: "top",
        position: "center",
      }).showToast();
    }
  } catch (error) {
    console.error("Error:", error);
    Toastify({
      text: "Произошла ошибка.",
      gravity: "top",
      position: "center",
    }).showToast();
  }
}
