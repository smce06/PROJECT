/* ===== 헤더 / 내비게이션 ===== */
const menuBtn = document.getElementById("menuBtn");
const nav     = document.getElementById("nav");
menuBtn.addEventListener("click",()=>nav.classList.toggle("show"));
document.getElementById("mainButton").onclick=()=>location.href="index.html";
document.getElementById("backBtn").onclick   =()=>location.href="community.html";

/* ===== 글 데이터 로드 ===== */
const params = new URLSearchParams(location.search);
const postId = Number(params.get("postId"));
const posts  = JSON.parse(localStorage.getItem("communityPosts")||"[]");

if(isNaN(postId)||postId<0||postId>=posts.length){
  alert("글을 찾을 수 없습니다.");location.href="community.html";
}

const {title,author,date,content} = posts[postId];
document.getElementById("postTitle").textContent       = title;
document.getElementById("postWriterDate").textContent  = `${author} / ${date}`;
document.getElementById("postContent").textContent     = content;

/* ===== 댓글 로직 ===== */
const MAX_VISIBLE = 2;
let showAll = false;

const commentsKey = "communityComments";
let allComments = JSON.parse(localStorage.getItem(commentsKey)||"{}");
if(!allComments[postId]) allComments[postId]=[];

const commentsList  = document.getElementById("commentsList");
const moreBtn       = document.getElementById("moreCommentsBtn");
const commentInput  = document.getElementById("commentInput");
const commentSubmit = document.getElementById("commentSubmit");

function renderComments(){
  const list = allComments[postId];
  commentsList.innerHTML="";
  const slice = showAll? list : list.slice(0,MAX_VISIBLE);

  slice.forEach(c=>{
    const div = document.createElement("div");
    div.className="comment";
    div.innerHTML=`<p class="comment-meta">${c.author} / ${c.date}</p>
                   <p class="comment-text">${c.text}</p>`;
    commentsList.appendChild(div);
  });

  if(list.length>MAX_VISIBLE){
    moreBtn.style.display="inline";
    moreBtn.textContent = showAll? "접기" : "댓글 더 보기";
  }else moreBtn.style.display="none";

  if(list.length===0) commentsList.textContent="댓글이 없습니다.";
}

commentSubmit.onclick = ()=>{
  const text = commentInput.value.trim();
  if(!text) return alert("댓글 내용을 입력해주세요.");
  allComments[postId].push({
    author:"익명",
    date:new Date().toISOString().slice(0,10),
    text
  });
  localStorage.setItem(commentsKey,JSON.stringify(allComments));
  commentInput.value="";
  showAll=false;           // 새 댓글 달리면 다시 3개만 표시
  renderComments();
};

moreBtn.onclick = ()=>{
  showAll=!showAll;
  renderComments();
};

renderComments();
