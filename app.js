require("dotenv").config({ path: "./config/config.env" });
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const auth = require("./middlewares/auth");

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.options("*", cors());

//routes
app.use("/api", require("./routes/auth"));
app.use("/api", require("./routes/Reimbursement"));


const PORT = process.env.PORT || 8000;
app.listen(PORT,async()=>{ 
    await connectDB();
    console.log(`server listening to port:${PORT}`)
});

