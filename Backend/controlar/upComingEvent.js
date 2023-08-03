const UpEvent = require("../Modal/upComingEvent");

const fs = require("fs");
const path = require("path");
const Errorhandeler = require("../utils/Errorhandeler");
const CatchAsyncError = require("../Middleware/CatchAsyncError");

// crate banar

const createupEvent = CatchAsyncError(async (req, res, next) => {
  try {
    const upEventData = req.body;
    const filename = req.file.filename;
    const fileUrl = path.join(filename);

    upEventData.avatar = fileUrl;

    const upEvent = await UpEvent.create(upEventData);

    res.status(201).json({
      success: true,
      upEvent,
    });
  } catch (error) {
    return next(new Errorhandeler(error, 400));
  }
});

// delete banar
const DeleteupEvent = CatchAsyncError(async (req, res, next) => {
  try {
    const upEventId = req.params.id;

    const upEventData = await UpEvent.findById(upEventId);

    const filename = upEventData.avatar;

    const filePath = `upload/${filename}`;

    try {
      fs.unlink(filePath); // Await the unlink operation
    } catch (err) {
      console.log(err);
    }
    const upEvent = await Banar.findByIdAndDelete(upEventId);

    if (!upEvent) {
      return next(new Errorhandeler("event not found with this id!", 500));
    }

    res.status(201).json({
      success: true,
      message: "event Deleted successfully!",
    });
  } catch (error) {
    return next(new Errorhandeler(error, 400));
  }
});

//get all banars
const getAllupEvents = CatchAsyncError(async (req, res, next) => {
  try {
    const upEvents = await Banar.find().sort({ createdAt: -1 });

    res.status(201).json({
      success: true,
      upEvents,
    });
  } catch (error) {
    return next(new Errorhandeler(error, 400));
  }
});

module.exports = {
  createupEvent,
  getAllupEvents,
  DeleteupEvent,
};
