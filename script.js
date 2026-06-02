const dates = [
  "2026-06-02",
  "2026-06-03",
  "2026-06-04",
  "2026-06-05",
  "2026-06-06"
];

const STORAGE_KEY = "yanagiya_vote_stamp";

let stamps = JSON.parse(
  localStorage.getItem(STORAGE_KEY) || "[]"
);

const stampArea =
  document.getElementById("stampArea");

function render() {

  stampArea.innerHTML = "";

  const today = new Date();
  today.setHours(0,0,0,0);

  dates.forEach((date,index)=>{

    const targetDate =
      new Date(date);

    const acquired =
      stamps.includes(date);

    const isToday =
      targetDate.getTime() ===
      today.getTime();

    const stampItem =
      document.createElement("div");

    stampItem.className =
      "stamp-item";

    stampItem.innerHTML = `
      <div class="stamp-date">
        ${date.slice(5)}
      </div>

      <div class="stamp-circle ${acquired ? 'done' : ''} ${(!acquired && isToday) ? 'today' : ''}">
        <img
          src="images/stamp.png"
          alt="stamp"
        >
      </div>
    `;

    stampArea.appendChild(
      stampItem
    );

    if(index !== dates.length - 1){

      const arrow =
        document.createElement("div");

      arrow.className =
        "arrow";

      arrow.textContent =
        "→";

      stampArea.appendChild(
        arrow
      );

    }

  });

  document.getElementById(
    "progressCount"
  ).textContent =
    stamps.length;

  if(stamps.length >= 5){

    document
      .getElementById(
        "completeArea"
      )
      .classList.add(
        "show"
      );

  }

}

document
  .getElementById(
    "voteButton"
  )
  .addEventListener(
    "click",
    ()=>{

      const today =
        new Date();

      today.setHours(
        0,0,0,0
      );

      const todayString =
        today
          .toISOString()
          .slice(0,10);

      if(
        !dates.includes(
          todayString
        )
      ){
        alert(
          "スタンプ対象期間外です"
        );
        return;
      }

      if(
        stamps.includes(
          todayString
        )
      ){
        alert(
          "本日は取得済みです"
        );
        return;
      }

      stamps.push(
        todayString
      );

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(
          stamps
        )
      );

      render();

      alert(
        "スタンプを獲得しました！"
      );

    }
  );

render();
