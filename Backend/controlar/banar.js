const banar = require("../Modal/banar");
const Banar = require("../Modal/banar");
const fs = require("fs");
const path = require("path");
const Errorhandeler = require("../utils/Errorhandeler");
const CatchAsyncError = require("../Middleware/CatchAsyncError");

// crate banar

const createBanar = CatchAsyncError(async (req, res, next) => {
  try {
    const banarData = req.body;

    const filename = req.file.filename;
    const fileUrl = path.join(filename);

    banarData.avatar = fileUrl;

    // If "role" is part of the "banarData", you can access it here and use it accordingly.

    const urlbanarproduct = banarData.urlbanarproduct;
    banarData.urlbanarproduct = urlbanarproduct;

    const banar = await Banar.create(banarData);

    res.status(201).json({
      success: true,
      banar,
    });
  } catch (error) {
    return next(new Errorhandeler(error, 400));
  }
});

// delete banar
const DeleteBanar = CatchAsyncError(async (req, res, next) => {
  try {
    const banarId = req.params.id;

    const banarData = await Banar.findById(banarId);

    const filename = banarData.avatar;

    const filePath = `upload/${filename}`;

    try {
      fs.unlink(filePath); // Await the unlink operation
    } catch (err) {
      console.log(err);
    }
    const banar = await Banar.findByIdAndDelete(banarId);

    if (!banar) {
      return next(new Errorhandeler("banar not found with this id!", 500));
    }

    res.status(201).json({
      success: true,
      message: "banar Deleted successfully!",
    });
  } catch (error) {
    return next(new Errorhandeler(error, 400));
  }
});

//get all banars
const getAllBanars = CatchAsyncError(async (req, res, next) => {
  try {
    const banars = await Banar.find().sort({ createdAt: -1 });

    res.status(201).json({
      success: true,
      banars,
    });
  } catch (error) {
    return next(new Errorhandeler(error, 400));
  }
});
const upDateBanarRole = CatchAsyncError(async (req, res) => {
  const bannerId = req.params.id; // Corrected to 'req.params.id'

  try {
    // Find the banner in the database by its ID
    const banner = await Banar.findById(bannerId);

    if (!banner) {
      return res.status(404).json({ error: "Banner not found" }); // Corrected to return a response
    } else {
      if (banner.role === 1) {
        banner.role = 0;
      } else {
        banner.role = 1;
      }
    }

    // Update the role of the banner

    await banner.save();

    res.status(200).json({
      success: true,
      message: "Banner role updated successfully",
    });
  } catch (error) {
    return next(new Errorhandeler(error, 400));
  }
});

module.exports = { createBanar, DeleteBanar, getAllBanars, upDateBanarRole };
