const express = require('express');
const cors = require('cors');
const errorhandler = require('errorhandler');
const morgan = require('morgan');
(require('dotenv')).config();

const app = express();
const PORT = process.env.PORT | 5000;

app.use(cors());
app.use(errorhandler());
app.use(express.json());
app.use(morgan('dev'));

app.listen(PORT, () => {
    console.log(`Server up, PORT: ${PORT}`)
})

