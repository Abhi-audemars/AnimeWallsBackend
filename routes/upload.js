const express = require("express");
const Wallpaper = require("../models/wallpaper");

const uploadRouter = express.Router();

uploadRouter.post("/api/upload-wallpaper", async (req, res) => {
  try {
    const { description, uploadedBy, images, category } = req.body;
    let wallpaper = new Wallpaper({
      description,
      uploadedBy,
      images,
      category,
    });

    wallpaper = await wallpaper.save();
    res.json(wallpaper);
  } catch (e) {
    res.status(500).json({ err: e.message });
  }
});

uploadRouter.get("/api/get-wallpapers", async (req, res) => {
  try {
    const wallpaper = await Wallpaper.find({});
    res.json(wallpaper);
  } catch (e) {
    res.status(500).json({ err: e.message });
  }
});



module.exports = uploadRouter;
