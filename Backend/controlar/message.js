
const express = require("express");
const Messages =require("../Modal/message")
const path = require ("path");
const CatchAsyncError = require("../Middleware/CatchAsyncError");
const Errorhandeler = require("../utils/Errorhandeler");
const router = express.Router();

// create new message
const createMessage=
  CatchAsyncError(async (req, res, next) => {
    try {
      const messageData = req.body;

      if (req.file) {
        const filename = req.file.filename;
        const fileUrl = path.join(filename);
        messageData.images = fileUrl;
      }

      messageData.conversationId = req.body.conversationId;
      messageData.sender = req.body.sender;
      messageData.text = req.body.text;

      const message = new Messages({
        conversationId: messageData.conversationId,
        text: messageData.text,
        sender: messageData.sender,
        images: messageData.images ? messageData.images : undefined,
      });

      await message.save();

      res.status(201).json({
        success: true,
        message,
      });
    } catch (error) {
      return next(new Errorhandeler(error.message), 500);
    }
  })
;

// get all messages with conversation id
const getMessage=
  CatchAsyncError(async (req, res, next) => {
    try {
      const messages = await Messages.find({
        conversationId: req.params.id,
      });

      res.status(201).json({
        success: true,
        messages,
      });
    } catch (error) {
      return next(new Errorhandeler(error.message), 500);
    }
  });

module.exports = {getMessage,createMessage};
