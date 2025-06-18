/* ========== 사이드 메뉴 토글 ========== */
const menuBtn = document.getElementById("menuBtn");
const nav     = document.getElementById("nav");
menuBtn.addEventListener("click", () => nav.classList.toggle("show"));

/* 로고 → 메인 */
document.getElementById("mainButton").addEventListener("click", () => {
  location.href = "index.html";
});

let events = JSON.parse(localStorage.getItem("events") || "[]");

/* ========== 헬퍼 ========= */
const $ = (s) => document.querySelector(s);
let current = new Date();

/* ========== 달력 렌더 ========= */
function drawCalendar(dateObj) {
  const y = dateObj.getFullYear();
  const m = dateObj.getMonth();

  $("#calTitle").textContent = `${y}년 ${m + 1}월`;

  const first = new Date(y, m, 1);
  const last  = new Date(y, m + 1, 0).getDate();
  const start = first.getDay();

  const tbody = $("#calendar tbody");
  tbody.innerHTML = "";

  let row = document.createElement("tr");
  for (let i = 0; i < start; i++) row.appendChild(document.createElement("td"));

  for (let d = 1; d <= last; d++) {
    const cell = document.createElement("td");
    cell.textContent = d;

    const iso = `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    if (events.some((e) => e.date === iso)) cell.classList.add("event-day");

    row.appendChild(cell);

    if ((start + d) % 7 === 0 || d === last) {
      tbody.appendChild(row);
      row = document.createElement("tr");
    }
  }

  /* = 우측 ‘주요일정’ 리스트 = */
  const ul = $("#eventList");
  ul.innerHTML = "";
  events
    .filter((e) => e.date.startsWith(`${y}-${String(m + 1).padStart(2, "0")}`))
    .sort((a, b) => a.date.localeCompare(b.date))
    .forEach((e) => {
      const li = document.createElement("li");
      li.textContent = `${e.date}  ${e.title}`;
      ul.appendChild(li);
    });
}

/* ========== 월 네비게이션 ========= */
$("#prevMonth").onclick = () => {
  current.setMonth(current.getMonth() - 1);
  drawCalendar(current);
};
$("#nextMonth").onclick = () => {
  current.setMonth(current.getMonth() + 1);
  drawCalendar(current);
};

/* ========== “＋” 버튼 → 일정 추가 페이지 ========= */
$("#addEventBtn").onclick = () => {
  location.href = "schedule_add.html";
};

/* ========== 초기 렌더 ========= */
drawCalendar(current);

document.querySelector(".profile-icon")?.addEventListener("click", () => {
    window.location.href = "profile.html";
});