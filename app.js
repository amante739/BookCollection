const express = require("express");
const cors = require("cors")

const app = express();
const port = 5000;

//checking server connection
app.listen(port,()=>{
    console.log("Server is starting ... here: localhost:" + port)
});