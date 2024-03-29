const body = document.querySelector("body");

const fireNotification = (text, color) => {
  const notification = document.createElement("div");
  notification.innerText = text;
  notification.className = "notification";
  notification.style.backgroundColor = color;
  body.appendChild(notification);
};

export const handleNewUser = ({ nickname }) => {
  console.log(nickname);
  fireNotification(`${nickname} just joined`, "rgb(0, 122, 255)");
};

export const handleDisconnected = ({ nickname }) => {
  fireNotification(`${nickname} just left`, "rgb(255, 149, 0)");
};
