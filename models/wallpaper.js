const mongoose = require("mongoose");
const wallpaperSchema = mongoose.Schema({
  uploadedBy: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  images:{
    required:true,
    type:String,
  },
  category:{
    type:String,
    required:true,
  },
  
});

const Wallpaper = mongoose.model("Wallpapers", wallpaperSchema);

module.exports = Wallpaper;
