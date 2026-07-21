export function searchProductsByCategories() {
  document.querySelectorAll(".js-category-link").forEach((link) => {
    link.addEventListener("click", () => {
      const { category } = link.dataset;
      window.location.href = `sabir.html?search=${category}`;
    });
  });
}
