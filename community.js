document.getElementById("addApplyBtn").addEventListener("click", function () {
  location.href = "community_add.html";
});

document.addEventListener("DOMContentLoaded", function () {
  const tableBody = document.getElementById("applyTableBody");
  const applyList = JSON.parse(localStorage.getItem("applyList") || "[]");

  const totalRows = 6;
  tableBody.innerHTML = ""; // 초기 표 비우기

  // 데이터 행 추가
  applyList.forEach(({ univ, type, deadline }) => {
    const row = `<tr><td>${univ}</td><td>${type}</td><td>${deadline}</td></tr>`;
    tableBody.insertAdjacentHTML("beforeend", row);
  });

  // 빈칸 행 채우기
  const emptyRows = totalRows - applyList.length;
  for (let i = 0; i < emptyRows; i++) {
    const emptyRow = `<tr><td>-</td><td>-</td><td>-</td></tr>`;
    tableBody.insertAdjacentHTML("beforeend", emptyRow);
  }
});

const btn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

// 메뉴 버튼 클릭 시 내비게이션 열고 닫기
btn.addEventListener("click", () => {
  nav.classList.toggle("show");
});

document.getElementById("mainButton").addEventListener("click", function() {
    window.location.href = "index.html";
});

// 샘플 글 데이터 (서버 없이 테스트용)
const posts = [
  { title: '합격 후기 1', author: '학생A', date: '2025-06-01' },
  { title: '합격 후기 2', author: '학생B', date: '2025-06-02' },
  // ... 20개 이상 채워도 됨
];


const postsPerPage = 8;
let currentPage = 1;

function renderTable(page) {
  const tbody = document.getElementById('applyTableBody');
  tbody.innerHTML = '';

  const start = (page - 1) * postsPerPage;
  const end = start + postsPerPage;
  const pagePosts = posts.slice(start, end);

  // 최대 10줄 유지
  for (let i = 0; i < postsPerPage; i++) {
    if (i < pagePosts.length) {
      const post = pagePosts[i];
      tbody.innerHTML += `
        <tr>
          <td>${post.title}</td>
          <td>${post.author}</td>
          <td>${post.date}</td>
        </tr>
      `;
    } else {
      tbody.innerHTML += `
        <tr>
          <td>-</td>
          <td>-</td>
          <td>-</td>
        </tr>
      `;
    }
  }
}


function renderPagination() {
  const paginationDiv = document.querySelector('.pagination');
  paginationDiv.innerHTML = ''; // 초기화
  const totalPages = Math.ceil(posts.length / postsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.className = 'page-btn';
    if (i === currentPage) btn.style.backgroundColor = '#4CAF50', btn.style.color = '#fff';
    btn.addEventListener('click', () => {
      currentPage = i;
      renderTable(currentPage);
      renderPagination();
    });
    paginationDiv.appendChild(btn);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderTable(currentPage);
  renderPagination();
});
