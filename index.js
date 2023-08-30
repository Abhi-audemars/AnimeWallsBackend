const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const uploadRouter = require("./routes/upload");
const wallpaperRouter = require("./routes/wallpaper");
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(authRouter);
app.use(uploadRouter);
app.use(wallpaperRouter);

const DB =
  "mongodb+srv://abhi:12527@cluster0.vaxrlvj.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(DB)
  .then(() => {
    console.log("connextion suxxessful");
  })
  .catch((e) => {
    console.log(e);
  });

app.listen(PORT, "0.0.0.0", () => {
  console.log("connection started!!");
});
