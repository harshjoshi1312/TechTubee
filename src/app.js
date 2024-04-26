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

export { app };
// ACCES TOKENS ARE STORE IN DB WHILE REFRSH TOKEN CANT