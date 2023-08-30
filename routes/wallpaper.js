const express = require("express");
const wallpaperRouter = express.Router();
const Wallpaper = require("../models/wallpaper");

wallpaperRouter.get("/api/wallpapers", async (req, res) => {
  try {
    const wallpaper = await Wallpaper.find({ category: req.query.category });

    res.json(wallpaper);
  } catch (e) {
    res.status(500).json({ err: e.message });
  }
});

wallpaperRouter.get("/api/wallpapers/search/:name", async (req, res) => {
  try {
    const wallpaper = await Wallpaper.find({
      description: { $regex: req.params.name, $options: "i" },
    });
    res.json(wallpaper);
  } catch (e) {
    res.status(500).json({ err: e.message });
  }
});

module.exports = wallpaperRouter;
