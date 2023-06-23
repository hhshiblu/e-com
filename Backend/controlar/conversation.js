const express = require("express");
const CatchAsyncError = require("../Middleware/CatchAsyncError");
const Errorhandeler=require("../utils/Errorhandeler")
const Conversation =require("../Modal/conversation")

// create a new conversation
const CreateConversation=
  CatchAsyncError(async (req, res, next) => {
    try {
      const { groupTitle, userId, sellerId } = req.body;

      const isConversationExist = await Conversation.findOne({ groupTitle });

      if (isConversationExist) {
        const conversation = isConversationExist;
        res.status(201).json({
          success: true,
          conversation,
        });
      } else {
        const conversation = await Conversation.create({
          members: [userId, sellerId],
          groupTitle: groupTitle,
        });

        res.status(201).json({
          success: true,
          conversation,
        });
      }
    } catch (error) {
      return next(new Errorhandeler(error.response.message), 500);
    }
  });

// get seller conversations
const getSellerConver=
  CatchAsyncError(async (req, res, next) => {
    try {
      const conversations = await Conversation.find({
        members: {
          $in: [req.params.id],
        },
      }).sort({ updatedAt: -1, createdAt: -1 });

      res.status(201).json({
        success: true,
        conversations,
      });
    } catch (error) {
      return next(new Errorhandeler(error), 500);
    }
  });


// get user conversations
const getUserConversation=
  CatchAsyncError(async (req, res, next) => {
    try {
      const conversations = await Conversation.find({
        members: {
          $in: [req.params.id],
        },
      }).sort({ updatedAt: -1, createdAt: -1 });

      res.status(201).json({
        success: true,
        conversations,
      });
    } catch (error) {
      return next(new Errorhandeler(error), 500);
    }
  });

// update the last message
const UpdateConversation=
  CatchAsyncError(async (req, res, next) => {
    try {
      const { lastMessage, lastMessageId } = req.body;

      const conversation = await Conversation.findByIdAndUpdate(req.params.id, {
        lastMessage,
        lastMessageId,
      });

      res.status(201).json({
        success: true,
        conversation,
      });
    } catch (error) {
      return next(new Errorhandeler(error), 500);
    }
  })
;

module.exports = {CreateConversation,getSellerConver,getUserConversation,UpdateConversation};
