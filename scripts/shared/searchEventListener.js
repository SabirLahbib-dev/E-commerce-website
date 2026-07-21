export function searchFeatureEventListener() {
  document.querySelector(".js-search-button").addEventListener("click", () => {
    const search = document.querySelector(".js-search-bar").value;

    window.location.href = `sabir.html?search=${search}`;
  });

  document.querySelector(".js-search-bar").addEventListener("keydown", () => {
    if (event.key === "Enter") {
      const search = document.querySelector(".js-search-bar").value;

      window.location.href = `sabir.html?search=${search}`;
    }
  });
}
