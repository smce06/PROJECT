const menuBtn = document.getElementById("menuBtn");
const nav     = document.getElementById("nav");
const mainBtn = document.getElementById("mainButton");
menuBtn.addEventListener("click", () => nav.classList.toggle("show"));
mainBtn.addEventListener("click", () => location.href = "index.html");

document.querySelector(".profile-icon")?.addEventListener("click", () => {
    window.location.href = "profile.html";
});