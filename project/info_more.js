// URL에서 대학 이름 가져오기
const urlParams = new URLSearchParams(window.location.search);
const universityName = urlParams.get("name");

// 대학 정보 객체
const universityInfo = {
    "smwu": {
        name: "숙명여자대학교",
        description: "숙명여자대학교는 여성 교육과 연구에 특화된 대학입니다.",
        admissionLink: "https://admission.sookmyung.ac.kr",
        officialWebsite: "https://www.sookmyung.ac.kr",
        location: { lat: 37.544579, lng: 126.964843 }
    },
    "snu": {
        name: "서울대학교",
        description: "서울대학교는 대한민국 대표적인 연구 중심 대학입니다.",
        admissionLink: "https://admission.snu.ac.kr",
        officialWebsite: "https://www.snu.ac.kr",
        location: { lat: 37.459882, lng: 126.951905 }
    },
    "yonsei": {
        name: "연세대학교",
        description: "연세대학교는 세계적으로 인정받는 명문 대학입니다.",
        admissionLink: "https://admission.yonsei.ac.kr",
        officialWebsite: "https://www.yonsei.ac.kr",
        location: { lat: 37.565784, lng: 126.938572 }
    }
};

// HTML 요소 업데이트 함수
function updateUniversityInfo() {
    if (universityName && universityInfo[universityName]) {
        const uniData = universityInfo[universityName];
        document.getElementById("universityTitle").textContent = uniData.name;
        document.getElementById("universityDescription").textContent = uniData.description;
        document.getElementById("admissionLink").href = uniData.admissionLink;
        document.getElementById("officialWebsite").href = uniData.officialWebsite;
    } else {
        document.getElementById("universityTitle").textContent = "대학 정보를 찾을 수 없습니다.";
        document.getElementById("universityDescription").textContent = "";
    }
}

// 내비게이션 토글 함수
function toggleNavigation() {
    document.getElementById("nav").classList.toggle("show");
}

// 지역 선택 필터링 함수
function filterUniversities() {
    let selectedRegion = this.value;
    let universities = document.querySelectorAll("#universityList li");

    universities.forEach(uni => {
        uni.style.display = (uni.dataset.region === selectedRegion || selectedRegion === "all") ? "block" : "none";
    });
}

// 이벤트 리스너 추가 (중복 제거)
document.addEventListener("DOMContentLoaded", () => {
    updateUniversityInfo();
    document.getElementById("menuBtn").addEventListener("click", toggleNavigation);
    document.getElementById("mainButton").adSdEventListener("click", () => {
        window.location.href = "index.html";
    });
    const regionSelect = document.getElementById("regionSelect");
    if (regionSelect) {
        regionSelect.addEventListener("change", filterUniversities);
    }
});

function initMap() {
  let location = { lat: 37.5665, lng: 126.9780 }; // 기본값: 서울
  if (universityName && universityInfo[universityName] && universityInfo[universityName].location) {
    location = universityInfo[universityName].location;
  }

  const map = new google.maps.Map(document.getElementById("map"), {
    center: location,
    zoom: 16
  });

  new google.maps.Marker({
    position: location,
    map: map,
    title: universityInfo[universityName]?.name || "선택한 위치"
  });
}

document.getElementById("mainButton").addEventListener("click", function() {
    window.location.href = "index.html";
});