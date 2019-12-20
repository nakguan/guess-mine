const time = document.getElementById("jsTimeout");

const TIMEOUTSEC = 30;
let tId = null;

const printTime = pTime => {
  time.innerText = `Remain Time : ${pTime}`;
};

const startTimer = () => {
  time.style.display = "flex";
  let t = TIMEOUTSEC;
  tId = setInterval(() => {
    t = parseInt(t) - 1;
    printTime(t);
  }, 1000);
};

export const startTimeout = () => {
  startTimer();
};

export const endTimeout = () => {
  time.style.display = "none";
  if (tId !== null) {
    clearInterval(tId);
  }
};
