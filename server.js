// server.js
const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const Nextapp = next({ dev });
const handle = Nextapp.getRequestHandler();

Nextapp.prepare().then(() => {
  app.use(handle);
  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});

io.on("connect", (socket) => {
  console.log(`Connected: ${socket.id}`);

  socket.emit("now", {
    message: "Hello World"
  });

  socket.on("disconnect", () => console.log(`Disconnected: ${socket.id}`));
});
