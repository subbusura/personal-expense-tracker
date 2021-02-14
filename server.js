// server.js
const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const Nextapp = next({ dev });
const handle = Nextapp.getRequestHandler();

const PORT = process.env.PORT || 3000;

Nextapp.prepare().then(() => {
  app.use(handle);
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:" + PORT);
  });
});

io.on("connect", (socket) => {
  console.log(`Connected: ${socket.id}`);

  socket.on("subscribe", function (room) {
    console.log("joining room", room);
    socket.join(room);
  });

  socket.on("unsubscribe", function (room) {
    console.log("leaving room", room);
    socket.leave(room);
  });

  socket.on("send", function (data) {
    console.log("sending message");
    io.sockets.in(data.room).emit("message", data);
  });

  socket.emit("now", {
    message: "Feel real time experience!"
  });

  socket.on("disconnect", () => console.log(`Disconnected: ${socket.id}`));
});
