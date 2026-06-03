const dates = [
  {
    date: "2026-06-03",
    stamp: "images/stamp.png"
  },
  {
    date: "2026-06-04",
    stamp: "images/stamp2.png"
  },
  {
    date: "2026-06-05",
    stamp: "images/stamp3.png"
  },
  {
    date: "2026-06-06",
    stamp: "images/stamp4.png"
  }
];

const STORAGE_KEY = "yanagiya_vote_stamp_v3";

let stamps = JSON.parse(
  localStorage.getItem(STORAGE_KEY) || "[]"
);

const stampArea = document.getElementById("stampArea");
const progressCount = document.getElementById("progressCount");
const completeArea = document.getElementById("completeArea");
const artPreview = document.getElementById("artPreview");
const voteButton = document.getElementById("voteButton");

function getLocalDateString(){
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function render(){
  stampArea.innerHTML = "";

  const todayString = getLocalDateString();

  dates.forEach((item,index)=>{
    const acquired = stamps.includes(item.date);
    const isToday = todayString === item.date;

    const stampItem = document.createElement("div");
    stampItem.className = "stamp-item";

    stampItem.innerHTML = `
      <div class="stamp-date">${item.date.slice(5).replace("-", "/")}</div>

      <div class="stamp-circle ${!acquired && isToday ? "today" : ""}">
        ${
          acquired
          ? `<img src="${item.stamp}" alt="取得済みスタンプ">`
          : `<span class="empty-star">★</span>`
        }
      </div>
    `;

    stampArea.appendChild(stampItem);

    if(index !== dates.length - 1){
      const arrow = document.createElement("div");
      arrow.className = "arrow";
      arrow.textContent = "→";
      stampArea.appendChild(arrow);
    }
  });

  progressCount.textContent = stamps.length;

  if(stamps.length >= dates.length){
    completeArea.classList.add("show");

    artPreview.innerHTML = `
      <img
        src="images/complete.png"
        alt="特別なアート"
        class="complete-art-image"
      >
    `;

    artPreview.classList.add("completed-art");
    artPreview.style.display = "flex";

  }else{
    completeArea.classList.remove("show");

    artPreview.innerHTML = `
      <p class="question">?</p>
      <p>特別なアート</p>
    `;

    artPreview.classList.remove("completed-art");
    artPreview.style.display = "flex";
  }
}

voteButton.addEventListener("click", ()=>{
  const todayString = getLocalDateString();

  const todayItem = dates.find(
    item => item.date === todayString
  );

  if(!todayItem){
    alert("スタンプ対象期間外です");
    return;
  }

  if(stamps.includes(todayString)){
    alert("本日は取得済みです");
    return;
  }

stamps.push(todayString);

lastAddedDate = todayString;

localStorage.setItem(
  STORAGE_KEY,
  JSON.stringify(stamps)
);
  );

  render();

  alert("スタンプを獲得しました！");
});

render();

const shareButton =
  document.getElementById("shareButton");

shareButton.addEventListener("click",()=>{

  const text =
    "柳谷伊冴くん投票スタンプカードを進めています！✨";

  const url =
    window.location.href;

  window.open(
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
    "_blank"
  );

});
