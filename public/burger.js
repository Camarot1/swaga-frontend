"use strict";
function initBurgerMenu() {
  const burger = document.querySelector(".header__burger");
  const menu = document.querySelector(".header__navigation");
  const logo = document.querySelector(".header__name");

  if (!burger || !menu || !logo) return;

  const mobile = 900;
  const HIDDEN_CLASS = "hidden";
  function updateMenuVisibility() {
    const isMobile = window.innerWidth <= mobile;

    if (isMobile) {
      menu.classList.add(HIDDEN_CLASS);
    } else {
      menu.classList.remove(HIDDEN_CLASS);
    }
  }

  burger.addEventListener("click", () => {
    if (window.innerWidth <= mobile) {
      menu.classList.toggle(HIDDEN_CLASS);
      logo.classList.toggle(HIDDEN_CLASS);
    }
  });

  updateMenuVisibility();

  window.addEventListener("resize", updateMenuVisibility);
}

document.addEventListener("DOMContentLoaded", initBurgerMenu);
