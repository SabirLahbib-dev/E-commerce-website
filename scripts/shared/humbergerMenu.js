export function hamburgerMenu() {
  document
    .querySelector(".hamburger-menu-button")
    .addEventListener("click", () => {
      document.querySelector(".mobile-side-bar").classList.toggle("active");

      const icon = document.querySelector(".hamburger-menu-icon");
      if (icon.src.includes("images/icons/menu-bar.png")) {
        icon.src = "images/icons/close.png";
      } else {
        icon.src = "images/icons/menu-bar.png";
      }

      console.log("click");
    });
}
