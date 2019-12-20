import { handleNewUser, handleDisconnected } from "./notification";
import { handleNewMessage } from "./chat";
import { handleStorkedPath, handleBeganPath, handleFilled } from "./paint";
import {
  handlePalyerUpdate,
  handleGameStarted,
  handleLeaderNotification,
  handleGameEnded,
  handleGameStarting
} from "./player";

let socket = null;

export const getSocket = () => socket;

export const updateSocket = aSocket => (socket = aSocket);

export const initSockets = aSocket => {
  const { events } = window;
  updateSocket(aSocket);
  aSocket.on(events.newUser, handleNewUser);
  aSocket.on(events.disconnected, handleDisconnected);
  aSocket.on(events.newMsg, handleNewMessage);
  aSocket.on(events.beganPath, handleBeganPath);
  aSocket.on(events.strokedPath, handleStorkedPath);
  aSocket.on(events.filled, handleFilled);
  aSocket.on(events.playerUpdate, handlePalyerUpdate);
  aSocket.on(events.gameStarted, handleGameStarted);
  aSocket.on(events.leaderNotif, handleLeaderNotification);
  aSocket.on(events.gameEnded, handleGameEnded);
  aSocket.on(events.gameStarting, handleGameStarting);
};
