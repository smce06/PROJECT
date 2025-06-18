const menuBtn = document.getElementById("menuBtn");
const nav     = document.getElementById("nav");
const mainBtn = document.getElementById("mainButton");
menuBtn.addEventListener("click", () => nav.classList.toggle("show"));
mainBtn.addEventListener("click", () => location.href = "index.html");

/* 추가하기 → 글 작성 페이지로 이동 */
const addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", () => location.href = "community_add.html");

/* ===================== 데이터 로드 ===================== */
let posts = JSON.parse(localStorage.getItem("communityPosts") || "[]");

const PER_PAGE   = 7; 
let   current    = 1; 
const tableBody  = document.getElementById("applyTableBody");
const pagination = document.querySelector(".pagination");

function renderTable(page) {
  tableBody.innerHTML = "";
  const start  = (page - 1) * PER_PAGE;
  const slice  = posts.slice(start, start + PER_PAGE);

  for (let i = 0; i < PER_PAGE; i++) {
    if (i < slice.length) {
      const { title, author, date } = slice[i];

      const tr = document.createElement("tr");

      const tdTitle = document.createElement("td");
      tdTitle.textContent = title;
      tdTitle.style.color = "#2F855A";
      tdTitle.style.cursor = "pointer";

      tdTitle.addEventListener("click", () => {
        location.href = `community_show.html?postId=${start + i}`;
      });

      const tdAuthor = document.createElement("td");
      tdAuthor.textContent = author;

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

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  return parts.length === 2 ? parts.pop().split(";").shift() : null;
}

document.querySelector(".profile-icon")?.addEventListener("click", () => {
    window.location.href = "profile.html";
});