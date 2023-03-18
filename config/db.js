const mongoose = require("mongoose");
const connectDB = async()=>{
    // console.log(process.env.MONGODB_URI);
    return mongoose
    .connect(process.env.MONGODB_URI,{
          useNewUrlParser: true,
          useUnifiedTopology: true
    })
    .then(() => console.log("Connected to database"))
    .catch((error) => console.log("Failed to connect database at ", error));
};

module.exports= connectDB;