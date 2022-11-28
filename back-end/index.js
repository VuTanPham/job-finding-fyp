const express = require("express");
const cors = require("cors");
const errorhandler = require("errorhandler");
const morgan = require("morgan");
const passport = require("passport");
const expressSession = require("express-session");
const mongoose = require("mongoose");
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const seed = require("./services/seed.service");

const appRouter = require("./routes");

require("dotenv").config();
const passportConfig = require("./middleware/authentication.middleware");
const {User} = require('./models/index');
const { sendNewMessage } = require("./services/chatting.service");
const { fakeEmail } = require("./services/mail.sevice");

const PORT = process.env.PORT | 5000;

const connect = async (dbConnectionUrl) => {
  try {
    await mongoose.connect(dbConnectionUrl, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    await seed();
    console.log("DB connected");
  } catch (error) {
    console.error(`Connecting error: ${error}`);
  }
};

connect("mongodb://localhost:27017/job-find-fyp");


app.use(
  expressSession({
    secret: process.env.SECRET_KEY,
    saveUninitialized: false,
    resave: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(errorhandler());
app.use(express.json({ urlencoded: true }));
app.use(morgan("dev"));

app.use("/api", appRouter);

const io = new Server(server, {
  cors: '*'
});

io.on("connection", (socket) => {
  console.log("userId connected", socket.id);
  socket.on("setId", async (userId) => {
    await User.findByIdAndUpdate(userId, { socketId: socket.id });
  });

  socket.on('clear', async (userId) => {
    await User.findByIdAndUpdate(userId, { socketId: null });
  })

  socket.on('send', async ({conId, sendBy, content, senderId}) => {
    try {
      const {receiverId, message, conservationId} = await sendNewMessage(conId, sendBy, content, senderId);
      console.log(receiverId);
      socket.to(receiverId).emit('receive', {message, conservationId});
      // socket.to(receiverId).emit('receive', {message, conservationId});
    } catch (error) {
      console.log(error);
    }
  })

  socket.on('disconnect', async () => {
    console.log('user disconnect')
  })
});


server.listen(PORT, () => {
  console.log(`Server up, PORT: ${PORT}`);
});
