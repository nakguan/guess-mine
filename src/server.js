import { join } from "path";
import express from "express";
import socketIO from "socket.io";
import logger from "morgan";
import socketController from "./socketController";
import events from "./events";

const PORT = 8080;
const app = express();

app.set("view engine", "pug");
app.set("views", join(__dirname, "views"));
app.use(logger("dev"));
app.use(express.static(join(__dirname, "static")));

app.get("/", (req, res) => {
  res.render("home", { events: events });
});

const handleListening = () =>
  console.log(`✔️ Sever running: http://localhost:${PORT}`);

const server = app.listen(PORT, handleListening);
const io = socketIO.listen(server);

io.on("connection", socket => socketController(socket));

//setInterval(() => console.log(sockets), 1000);
