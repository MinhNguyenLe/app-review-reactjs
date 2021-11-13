require("dotenv").config();

const path = require("path");
const express = require("express");
const cors = require("cors");

const app = express();

// socket io
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", function (socket) {
  console.log("New client connected" + socket.id);

  socket.on("sendDataClient", function (data) {
    // Handle khi có sự kiện tên là sendDataClient từ phía client
    io.emit("sendDataServer", { data });
    // phát sự kiện  có tên sendDataServer cùng với dữ liệu tin nhắn từ phía server
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    // Khi client disconnect thì log ra terminal.
  });
});

const route = require("./routes");
const port = process.env.PORT || 5000;
// Connect to DB
const db = require("./config/db");
db.connect();

const corsOptions = {
  exposedHeaders: ["x-access-token", "x-refresh-token"],
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

// config use static file
app.use(express.static(path.join(__dirname, "public")));

route(app);

app.get("/", (req, res) => {
  res.json({ dm: "hihihi" });
});

server.listen(port, () => {
  console.log(`server running in port ${port}`);
});
