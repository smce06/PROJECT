const urlParams = new URLSearchParams(window.location.search);
const universityName = urlParams.get("name");

// 대학 정보 객체
const universityInfo = {
    "smwu": {
        name: "숙명여자대학교",
        description: "여성의 미래를 선도하는 아웃씽커스(Outthinkers) 숙명",
        admissionLink: "https://admission.sookmyung.ac.kr",
        officialWebsite: "https://www.sookmyung.ac.kr",
        location: { lat: 37.544579, lng: 126.964843 }
    },
    "snu": {
        name: "서울대학교",
        description: "누군가 조국의 미래를 묻거든, 고개를 들어 관악을 보게 하라",
        admissionLink: "https://admission.snu.ac.kr",
        officialWebsite: "https://www.snu.ac.kr",
        location: { lat: 37.459882, lng: 126.951905 }
    },
    "yonsei": {
        name: "연세대학교",
        description: "진리가 너희를 자유케 하리라",
        admissionLink: "https://admission.yonsei.ac.kr",
        officialWebsite: "https://www.yonsei.ac.kr",
        location: { lat: 37.565784, lng: 126.938572 }
    },
    "korea": {
        name: "고려대학교",
        description: "너의 젊음을 고대에 걸어라, 고대는 너에게 세계를 걸겠다",
        admissionLink: "https://oku.korea.ac.kr",
        officialWebsite: "https://www.korea.ac.kr/sites/ko/index.do",
        location: { lat:  37.5894, lng: 127.0336 }
    },
    "skku": {
        name: "성균관대학교",
        description: "예로부터 나라의 인재는 성균에 모여왔으니, 그대 머묾이 우연이겠는가",
        admissionLink: "https://admission.skku.edu/admission/html/main/main.html",
        officialWebsite: "https://www.skku.edu/skku/index.do",
        location: { lat: 37.5872, lng: 126.9942 }
    },
    "cau": {
        name: "중앙대학교",
        description: "한국의 중앙에서 세계의 중앙으로",
        admissionLink: "https://admission.cau.ac.kr/mainIntro/intro.do",
        officialWebsite: "https://www.cau.ac.kr/index.do",
        location: { lat: 37.5049, lng: 126.9575 }
    },
    "kyu": {
        name: "건양대학교",
        description: "학생교육에 진심을 다하는 대학,‘Design You’",
        admissionLink: "https://ipsi.konyang.ac.kr/ipsi.dor",
        officialWebsite: "https://www.konyang.ac.kr/kor.do",
        location: { lat: 36.306998, lng: 127.343176 }
    },
    "dst": {
        name: "대전과학기술대학교",
        description: "Good to Great - 좋은 인재를 최고의 인재로",
        admissionLink: "https://ipsi.dst.ac.kr/ipsi/Main.do",
        officialWebsite: "https://www.dst.ac.kr/kor/Main.do",
        location: { lat: 36.302433, lng: 127.375304 }
    },
    "hit": {
        name: "대전보건대학교",
        description: "의미와 가치가 살아있는 매력적인 대학",
        admissionLink: "https://ipsi.hit.ac.kr",
        officialWebsite: "https://www.hit.ac.kr/main",
        location: { lat: 36.350062, lng: 127.455239}
    },
    "mwu": {
        name: "목원대학교",
        description: "대전 최초의 사립대학에서 중부권 최강의 혁신대학으로",
        admissionLink: "https://enter.mokwon.ac.kr/enter",
        officialWebsite: "https://www.mokwon.ac.kr",
        location: { lat: 36.326484, lng: 127.338548 }
    },
    "cnu": {
        name: "충남대학교",
        description: "The Strong CNU - 미래 사회를 선도할 강한 대학",
        admissionLink: "https://ipsi.cnu.ac.kr/intro.html",
        officialWebsite: "https://plus.cnu.ac.kr/html/kr/",
        location: { lat: 36.369396, lng: 127.346951}
    },
    "kaist": {
        name: "카이스트",
        description: "세상의 중심에서 세상을 바꾼다",
        admissionLink: "https://admission.kaist.ac.kr/",
        officialWebsite: "https://www.kaist.ac.kr/kr/",
        location: { lat: 36.372274, lng: 127.360475 }
    },
    "pknu": {
        name: "부경대학교",
        description: "모두의 미래, 함께하는 꿈",
        admissionLink: "https://iphak.pknu.ac.kr/pknu/intro/intro.php",
        officialWebsite: "https://www.pknu.ac.kr/main",
        location: { lat: 35.134473, lng: 129.103284 }
    },
    "bist": {
        name: "부산과학기술대학교",
        description: "전문가를 만드는 전문가",
        admissionLink: "https://ipsi.bist.ac.kr/ipsi/main/index.php",
        officialWebsite: "http://www.bist.ac.kr/univ/main/intro_250429.php",
        location: { lat: 35.195602, lng: 129.003907}
    },
    "pnu": {
        name: "부산대학교",
        description: "Arise PNU, 같이 더 높게",
        admissionLink: "https://go.pusan.ac.kr/college_2016/main/main.asp",
        officialWebsite: "https://www.pusan.ac.kr/kor/Main.do",
        location: { lat: 35.234494, lng: 129.080628 }
    },
    "bufs": {
        name: "부산외국어대학교",
        description: "외성의 울림이 세상을 덮을 때 세상의 중심에 그대가 있다. Global B.U.F.S.",
        admissionLink: "https://enter.bufs.ac.kr/",
        officialWebsite: "https://www.bufs.ac.kr/bbs/board.php?bo_table=bufsmain_2023",
        location: { lat: 35.267928, lng: 129.079032 }
    },
    "bwu": {
        name: "부산여자대학교",
        description: "다도정신 기반 글로컬 창의 여성 인재 양성",
        admissionLink: "https://www.bwc.ac.kr/ipsi/index.asp",
        officialWebsite: "https://www.bwc.ac.kr/sch/index.asp",
        location: { lat: 35.168167, lng: 129.073223 }
    },
    "kmou": {
        name: "한국해양대학교",
        description: "해양의 미래를 설계하고 지식으로 항해하는 대학",
        admissionLink: "https://www.kmou.ac.kr/ipsi/main.do",
        officialWebsite: "https://www.kmou.ac.kr/kmou/main.do",
        location: { lat: 35.076552, lng: 129.089216}
    },
};

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
  let location = { lat: 37.5665, lng: 126.9780 };
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

document.querySelector(".profile-icon")?.addEventListener("click", () => {
    window.location.href = "profile.html";
});