// 共通UI操作(GA4とは無関係の見た目の挙動)
document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.querySelector("[data-menu-btn]");
  const menuPanel = document.querySelector("[data-menu-panel]");
  if (menuBtn && menuPanel) {
    menuBtn.addEventListener("click", function () {
      menuPanel.classList.toggle("is-open");
    });
    menuPanel.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => menuPanel.classList.remove("is-open"));
    });
  }
});
