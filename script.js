const dates = [
  "2026-06-03",
  "2026-06-04",
  "2026-06-05",
  "2026-06-06"
];

const STORAGE_KEY = "yanagiya_vote_stamp_v2";

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

  dates.forEach((date,index)=>{
    const acquired = stamps.includes(date);
    const isToday = todayString === date;

    const item = document.createElement("div");
    item.className = "stamp-item";

    item.innerHTML = `
      <div class="stamp-date">${date.slice(5).replace("-", "/")}</div>

      <div class="stamp-circle ${!acquired && isToday ? "today" : ""}">
        ${
          acquired
          ? `<img src="images/stamp.png" alt="取得済みスタンプ">`
          : `<span class="empty-star">★</span>`
        }
      </div>
    `;

    stampArea.appendChild(item);

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
    artPreview.style.display = "none";
  }else{
    completeArea.classList.remove("show");
    artPreview.style.display = "flex";
  }
}

voteButton.addEventListener("click", ()=>{
  const todayString = getLocalDateString();

  if(!dates.includes(todayString)){
    alert("スタンプ対象期間外です");
    return;
  }

  if(stamps.includes(todayString)){
    alert("本日は取得済みです");
    return;
  }

  stamps.push(todayString);

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(stamps)
  );

  render();

  voteButton.classList.add("button-pop");

  alert("スタンプを獲得しました！");
});

render();
