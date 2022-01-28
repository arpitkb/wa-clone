const { createServer } = require("http");
const express = require("express");
const socketio = require("socket.io");
const path = require("path");
const cors = require("cors");

// const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = socketio(server, {
  cors: {
    // allowedHeaders: ["my-custom-header"],
    // origin: "*",
    methods: ["GET", "POST"],
  },
});

// const PORT = process.env.PORT || 5000;
// const io = new Server(PORT, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
// });

app.use(cors());

io.on("connection", (socket) => {
  const id = socket.handshake.query.id;
  socket.join(id);

  socket.on("send-message", ({ recipients, text }) => {
    recipients.forEach((recipient) => {
      const newRecipients = recipients.filter((el) => el !== recipient);
      newRecipients.push(id);
      socket.broadcast.to(recipient).emit("recieve-message", {
        recipients: newRecipients,
        text,
        sender: id,
      });
    });
  });
});

// serve static assets in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static(path.join(__dirname, "../client", "build")));

  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log("server running");
});
