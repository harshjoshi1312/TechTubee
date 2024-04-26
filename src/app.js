import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    Credential: true,
  })
);

// the data which accepts from the form
app.use(
  express.json({
    limit: "16kb",
  })
);

// for the url encoded
app.use(
  express.urlencoded({
    extended: true,
  })
);

// for pdf files public assets
app.use(express.static("public"));

//cookies parser helps for the secure crud operations
app.use(cookieParser());


// Routes Import
import userRouter from "./routes/user.routes.js"


//Routes declaration
app.use("/api/v1/users",userRouter)

export { app };




// Important
// ACCES TOKENS ARE STORE IN DB WHILE REFRSH TOKEN CANT

// file upload handeling
// mainly there are some srvices for the file uploading
// cloudinary(pdf file sharing)
// take file from client to local service with the help of
// multer then stores it on the cloudinary

//nodejs -(FS) for handling file system
// file link - unlink 