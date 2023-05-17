
const Event =require ("../Modal/event")




const CatchAsyncError = require("../Middleware/CatchAsyncError");
const { isSeller, isAdmin, isAuthenticated } = require("../middleware/auth");

const fs = require("fs");
const Errorhandeler = require("../utils/Errorhandeler");
const Seller = require("../Modal/seller");

// create event
const createEvent = CatchAsyncError(async (req, res, next) => {
    try {
      const sellerId = req.body.sellerId;
      const seller = await Seller.findById(sellerId);
      if (!seller) {
        return next(new Errorhandeler("Shop Id is invalid!", 400));
      } else {
        const files = req.files;
        const imageUrls = files.map((file) => `${file.filename}`);
  
        const eventData = req.body;
        eventData.images = imageUrls;
        eventData.seller = seller;
  
        const event = await Event.create(eventData); 
  
        res.status(201).json({
          success: true,
          event,
        });
      }
    } catch (error) {
      return next(new Errorhandeler(error, 400));
    }
  });

// get all events
// const getShopProduct = CatchAsyncError(async (req, res, next) => {
//   try {
//     const events = await Event.find({ sellerId: req.params.id });

//     res.status(201).json({
//       success: true,
//       events,
//     });
//   } catch (error) {
//     return next(new Errorhandeler(error, 400));
//   }
// });

// get all events of a shop
const getAllEvents=
  CatchAsyncError(async (req, res, next) => {
    try {
      const events = await Event.find({ sellerId: req.params.id });

      res.status(201).json({
        success: true,
        events,
      });
    } catch (error) {
      return next(new Errorhandeler(error, 400));
    }
  });

// delete event of a shop
const DeleteEvent=
  CatchAsyncError(async (req, res, next) => {
    try {
      const eventId = req.params.id;

      const eventData = await Event.findById(eventId);

      eventData.images.forEach((imageUrl) => {
        const filename = imageUrl;
        const filePath = `uploads/${filename}`;

        fs.unlink(filePath, (err) => {
          if (err) {
            console.log(err);
          }
        });
      });

      const event = await Event.findByIdAndDelete(eventId);

      if (!event) {
        return next(new Errorhandeler("Event not found with this id!", 500));
      }

      res.status(201).json({
        success: true,
        message: "Event Deleted successfully!",
      });
    } catch (error) {
      return next(new Errorhandeler(error, 400));
    }
  });

// all events --- for admin
// router.get(
//   "/admin-all-events",
//   isAuthenticated,
//   isAdmin("Admin"),
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const events = await Event.find().sort({
//         createdAt: -1,
//       });
//       res.status(201).json({
//         success: true,
//         events,
//       });
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   })
// );

module.exports = {createEvent,getAllEvents,DeleteEvent};
