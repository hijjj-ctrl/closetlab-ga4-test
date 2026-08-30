// 共通UI操作(GA4とは無関係の見た目の挙動)
document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.querySelector("[data-menu-btn]");
  const menuPanel = document.querySelector("[data-menu-panel]");
  if (menuBtn && menuPanel) {
    menuBtn.addEventListener("click", function () {
      menuPanel.classList.toggle("is-open");
      document.body.classList.toggle("menu-open", menuPanel.classList.contains("is-open"));
    });
    menuPanel.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", function () {
        menuPanel.classList.remove("is-open");
        document.body.classList.remove("menu-open");
      });
    });
  }
});
