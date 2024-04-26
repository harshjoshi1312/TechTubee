import dotenv from "dotenv";

import { DB_NAME } from "./constsnts.js";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () =>{
        console.log("port is listning");
    });
  })
  .catch((err) => {
    console.log("mogodb connection failed !!");
  });






// Mongoose.agrigate.paginate.v2 awesome!!

// this is one of the best approach
/*
// do this with the immidiately execute function
import express from "express"
const app = express()
(async () => {
    try {
       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
       app.on("error",(error)=>{
        console.log("ERR:",error);
        throw error
       })

       app.listen(process.env.PORT,() =>{
        console.log("port listning on 8000");
       })
    } catch (error) {
        console.error("Error: ", error)
        throw error
    }
})()
*/
