const btn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

// 메뉴 버튼 클릭 시 내비게이션 열고 닫기
btn.addEventListener("click", () => {
  nav.classList.toggle("show");
});

document.getElementById("mainButton").addEventListener("click", function() {
    window.location.href = "index.html";
});
    document.getElementById("menuBtn").addEventListener("click", () => {
      document.getElementById("nav").classList.toggle("show");
    });

    const calendarEl = document.getElementById('calendar');
    const eventsUl = document.getElementById('events');

    const eventData = [
      {
        title: '박유민 친구 생일',
        date: '2025-06-05'
      },
      {
        title: '병원 예약',
        date: '2025-06-05'
      },
      {
        title: '학원 면접',
        date: '2025-06-10'
      },
      {
        title: '가나대학교 면접',
        date: '2025-06-30'
      }
    ];

    const calendar = new FullCalendar.Calendar(calendarEl, {
      locale: 'ko',
      initialView: 'dayGridMonth',
      height: 'auto',
      events: eventData,
      dateClick: function(info) {
        const clickedDate = info.dateStr;
        const filtered = eventData.filter(ev => ev.date === clickedDate);
        eventsUl.innerHTML = '';
        if (filtered.length === 0) {
          const li = document.createElement('li');
          li.textContent = '일정 없음';
          eventsUl.appendChild(li);
        } else {
          filtered.forEach(ev => {
            const li = document.createElement('li');
            li.textContent = `${clickedDate} : ${ev.title}`;
            eventsUl.appendChild(li);
          });
        }
      }
    });

    calendar.render();