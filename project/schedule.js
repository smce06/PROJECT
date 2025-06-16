const btn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

/* ======= 로컬 스토리지에서 이벤트 로드 ======= */
const defaultEvents = [
  { date: "2025-09-30", title: "가다대 1차 합격 발표" },
  { date: "2025-10-05", title: "나라대 지원 마감" },
  { date: "2025-10-20", title: "다바대 면접" },
];
let events = JSON.parse(localStorage.getItem("events") || "null") || defaultEvents;

/* ======= DOM 헬퍼 ======= */
const $ = (s) => document.querySelector(s);

let current = new Date();

/* ======= 캘린더 렌더 ======= */
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

  /* = 우측 리스트 = */
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

/* ======= 월 네비게이션 ======= */
$("#prevMonth").onclick = () => {
  current.setMonth(current.getMonth() - 1);
  drawCalendar(current);
};
$("#nextMonth").onclick = () => {
  current.setMonth(current.getMonth() + 1);
  drawCalendar(current);
};

/* ======= 일정 추가 버튼 ======= */
$("#addEventBtn").onclick = () => {
  const date = prompt("날짜를 입력하세요 (YYYY-MM-DD)");
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return alert("날짜 형식이 올바르지 않습니다!");

  const title = prompt("일정 내용을 입력하세요");
  if (!title) return;

  events.push({ date, title });
  localStorage.setItem("events", JSON.stringify(events));
  drawCalendar(current);
};

/* ======= 초기 렌더 ======= */
drawCalendar(current);

document.getElementById("mainButton").addEventListener("click", function() {
    window.location.href = "index.html";
});

// 메뉴 버튼 클릭 시 내비게이션 열고 닫기
btn.addEventListener("click", () => {
  nav.classList.toggle("show");
});