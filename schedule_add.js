/* ===== 폼 제출 → 로컬스토리지 저장 ===== */
document.addEventListener("DOMContentLoaded", () => {
  const form  = document.getElementById("eventForm");
  const dateI = document.getElementById("eventDate");
  const titleI= document.getElementById("eventTitle");

  form.addEventListener("submit", e => {
    e.preventDefault();

    const date  = dateI.value;
    const title = titleI.value.trim();
    if (!date || !title){
      alert("모든 항목을 입력해주세요.");
      return;
    }

    /* 기존 이벤트 목록에 추가 */
    const events = JSON.parse(localStorage.getItem("events") || "[]");
    events.push({ date, title });
    localStorage.setItem("events", JSON.stringify(events));

    alert("일정이 추가되었습니다!");
    location.href = "schedule.html";
  });
});

/* ===== 메뉴 토글 & 로고 이동 (공통) ===== */
const menuBtn = document.getElementById("menuBtn");
const nav     = document.getElementById("nav");
menuBtn.addEventListener("click", () => nav.classList.toggle("show"));

document.getElementById("mainButton").addEventListener("click", () => {
  location.href = "index.html";
});
