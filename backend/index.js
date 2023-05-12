const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const router = require("./routes/router");
const port = 1516;


// middle ware
app.use(express.json());
app.use(cors());
app.use(router)


app.listen(port,()=>{
    console.log(`App running on port ${port}`)
})