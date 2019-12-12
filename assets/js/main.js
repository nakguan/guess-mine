import { handleMessageNotif } from "./chat";

const socket = io("/");

const sendMessage = message => {
  socket.emit("newMessage", {
    message: message
  });
  console.log(`You : ${message}`);
};

const setNickname = nickname => {
  socket.emit("setNickname", { nickname });
};

socket.on("messageNoti", handleMessageNotif);
