import {
  disableCanvas,
  hideControls,
  enableCanvas,
  showControls,
  resetCanvas
} from "./paint";

import { disableChat, enableChat } from "./chat";
import { startTimeout, endTimeout } from "./time";

const board = document.getElementById("jsPBoard");
const notifs = document.getElementById("jsNotifs");

const addPlayers = players => {
  board.innerHTML = "";
  players.forEach(player => {
    const playerElement = document.createElement("span");
    playerElement.innerText = `${player.nickname}: ${player.points}`;
    board.appendChild(playerElement);
  });
};

const setNotifs = text => {
  notifs.innerText = "";
  notifs.innerText = text;
};

export const handlePalyerUpdate = ({ sockets }) => addPlayers(sockets);

export const handleGameStarted = () => {
  resetCanvas();
  setNotifs("");
  //1. 리더가 아닌 사람은 그림을 그릴 수 없다.
  // disable canvas events
  disableCanvas();
  // hide the canvas control
  hideControls();
  enableChat();
  startTimeout();
};

export const handleLeaderNotification = ({ word }) => {
  disableChat();
  enableCanvas();
  showControls();
  setNotifs(`You are the leader Paint ${word}`);
};

export const handleGameEnded = () => {
  setNotifs("Game ended");
  disableCanvas();
  hideControls();
  resetCanvas();
  endTimeout();
};

export const handleGameStarting = () => {
  setNotifs("Game will start soon");
};
