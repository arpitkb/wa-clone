const { createServer } = require("http");
const express = require("express");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    allowedHeaders: ["my-custom-header"],
  },
});

io.on("connection", (socket) => {
  const id = socket.handshake.query.id;
  console.log("server running and id is ", id);
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
  app.use(express.static(path.resolve(__dirname, "../client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log("server running");
});
