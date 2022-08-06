const express = require('express');
const cors = require('cors');
const errorhandler = require('errorhandler');
const morgan = require('morgan');
const passport = require('passport');
const expressSession = require("express-session");
const mongoose = require('mongoose');

const appRouter = require('./routes');

(require('dotenv')).config();
const passportConfig = require('./middleware/authentication.middleware');

const app = express();
const PORT = process.env.PORT | 5000;

const connect = async (dbConnectionUrl) => {
  try {
    await mongoose.connect(dbConnectionUrl, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
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
app.use(express.json({urlencoded: true}));
app.use(morgan('dev'));

app.use('/api', appRouter);

app.listen(PORT, () => {
    console.log(`Server up, PORT: ${PORT}`)
})

