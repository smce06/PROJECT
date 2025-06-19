const btn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

btn.addEventListener("click", () => {
  nav.classList.toggle("show");
});

document.getElementById("mainButton").addEventListener("click", function() {
    window.location.href = "index.html";
});

document.getElementById("regionSelect").addEventListener("change", function () {
  let selectedRegion = this.value;
  let universities = document.querySelectorAll("#universityList li");

  universities.forEach((uni) => {
    if (uni.dataset.region === selectedRegion || selectedRegion === "all") {
      uni.style.display = "block";
    } else {
      uni.style.display = "none";
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
    const universityList = document.querySelectorAll("#universityList li");
    const paginationContainer = document.getElementById("pagination");
    const itemsPerPage = 8;
    let currentPage = 1;

    // 전체 페이지 수 계산
    const totalPages = Math.ceil(universityList.length / itemsPerPage);

    function showPage(page) {
        universityList.forEach((uni, index) => {
            uni.style.display =
                index >= (page - 1) * itemsPerPage && index < page * itemsPerPage ? "block" : "none";
        });

        updatePaginationButtons(page);
    }

    function updatePaginationButtons(currentPage) {
        paginationContainer.innerHTML = "";

        for (let i = 1; i <= totalPages; i++) {
            let button = document.createElement("button");
            button.innerText = i;
            button.classList.add("pagination-btn");

            if (i === currentPage) {
                button.classList.add("active");
            }

            button.addEventListener("click", () => {
                showPage(i);
            });

            paginationContainer.appendChild(button);
        }
    }

    showPage(currentPage);
});

document.getElementById("mainButton").addEventListener("click", function() {
    window.location.href = "index.html";
});

document.querySelector(".profile-icon")?.addEventListener("click", () => {
    window.location.href = "profile.html";
});