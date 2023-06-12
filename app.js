const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose");
const config = require('./config');
const book = require("./routes/book.routes");


const app = express();
const port = 5000;


//MongoDB connection string

mongoose.connect(config.database.url);


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/books", book);

//checking server connection
app.listen(port, () => {
    console.log("Server is starting ... here: localhost:" + port)
});