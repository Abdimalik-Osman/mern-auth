const express = require("express");
const mongoose = require("mongoose");
const cors = require( "cors");
const dotenv = require( "dotenv");
const morgan = require( "morgan");
const helmet = require( "helmet");
const cookieParser = require( "cookie-parser");

// routes

const userRouter = require( "./users/route");
const RolesRouter = require( "./roles/route");


dotenv.config();

const PORT = process.env.PORT || 4000;
const CONNECTION_URL =
  process.env.MONGO_URL || "mongodb://localhost:27017/authDb";

const app = express();
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());
app.options("*", cors);
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cookieParser());

app.use("/uploads", express.static("public/uploads"));

app.get("/", (req, res) => {
  res.send("welcome");
});

// * REGISTER ROTES

app.use("/api/users", userRouter);
app.use("/api/roles", RolesRouter);

app.use("/*", (req, res) => {
  res.status(404).json({ status: false, message: "Incorrect URL Destination" });
});

// *MONGO SETUP
mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connection success");
  })
  .catch((e) => {
    console.error("Error is: " + e.message);
    process.exit(1);
  });

mongoose.connection.once("end", () => {
  console.log("Mongodb connect");
});

mongoose.connection.on("error", (error) => {
  throw error;
});

app.listen(PORT, (err) => {
  if (err) throw err;

  console.log(`Server running on ${PORT}`);
});
