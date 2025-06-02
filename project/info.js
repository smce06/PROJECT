const btn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

// 메뉴 버튼 클릭 시 내비게이션 열고 닫기
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
    const itemsPerPage = 10;
    let currentPage = 1;

    // 전체 페이지 수 계산
    const totalPages = Math.ceil(universityList.length / itemsPerPage);

    function showPage(page) {
        universityList.forEach((uni, index) => {
            uni.style.display =
                index >= (page - 1) * itemsPerPage && index < page * itemsPerPage ? "block" : "none";
        });

        // 페이지 버튼 업데이트
        paginationContainer.innerHTML = "";
        for (let i = 1; i <= totalPages; i++) {
            let button = document.createElement("button");
            button.innerText = i;
            button.classList.add(i === page ? "active" : "");
            button.addEventListener("click", () => {
                currentPage = i;
                showPage(currentPage);
            });
            paginationContainer.appendChild(button);
        }
    }

    showPage(currentPage); // 초기 페이지 로드
});
