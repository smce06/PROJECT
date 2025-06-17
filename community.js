/* ===================== 기본 설정 ===================== */
/* 사이드 메뉴 토글 & 로고 홈 이동 */
const menuBtn = document.getElementById("menuBtn");
const nav     = document.getElementById("nav");
const mainBtn = document.getElementById("mainButton");
menuBtn.addEventListener("click", () => nav.classList.toggle("show"));
mainBtn.addEventListener("click", () => location.href = "index.html");

/* 추가하기 → 글 작성 페이지로 이동 */
const addBtn = document.getElementById("addBtn");      // HTML에 id="addPostBtn"이어야 함
addBtn.addEventListener("click", () => location.href = "community_add.html");

/* ===================== 데이터 로드 ===================== */
/* community_add.html에서 저장한 게시글을 불러온다 */
let posts = JSON.parse(localStorage.getItem("communityPosts") || "[]");


/* ===================== 상수 ===================== */
const PER_PAGE   = 10;          // 페이지당 10개
let   current    = 1;           // 현재 페이지
const tableBody  = document.getElementById("applyTableBody");
const pagination = document.querySelector(".pagination");

/* ===================== 테이블 렌더 ===================== */
/* ===================== 테이블 렌더 ===================== */
function renderTable(page) {
  tableBody.innerHTML = "";
  const start  = (page - 1) * PER_PAGE;
  const slice  = posts.slice(start, start + PER_PAGE);

  for (let i = 0; i < PER_PAGE; i++) {
    if (i < slice.length) {
      const { title, author, date } = slice[i];

      // tr 생성
      const tr = document.createElement("tr");

      // 제목 td
      const tdTitle = document.createElement("td");
      tdTitle.textContent = title;
      tdTitle.style.color = "#2F855A";
      tdTitle.style.cursor = "pointer";

      // 클릭 시 상세 페이지로 이동, postId는 실제 데이터 인덱스 계산 필요
      tdTitle.addEventListener("click", () => {
        // 전체 posts 기준 인덱스 = start + i
        location.href = `community_show.html?postId=${start + i}`;
      });

      // 작성자 td
      const tdAuthor = document.createElement("td");
      tdAuthor.textContent = author;

      // 날짜 td
      const tdDate = document.createElement("td");
      tdDate.textContent = date;

      tr.appendChild(tdTitle);
      tr.appendChild(tdAuthor);
      tr.appendChild(tdDate);

      tableBody.appendChild(tr);
    } else {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>-</td><td>-</td><td>-</td>`;
      tableBody.appendChild(tr);
    }
  }
}



/* ===================== 페이지네이션 렌더 ===================== */
function renderPagination() {
  pagination.innerHTML = "";
  const totalPages = Math.ceil(posts.length / PER_PAGE) || 1;

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.className   = "page-btn" + (i === current ? " active" : "");
    btn.addEventListener("click", () => {
      current = i;
      renderTable(current);
      renderPagination();
      window.scrollTo({ top: 0 });
    });
    pagination.appendChild(btn);
  }
}

/* ===================== 최초 실행 ===================== */
document.addEventListener("DOMContentLoaded", () => {
  renderTable(current);
  renderPagination();
});
