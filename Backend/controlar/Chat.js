const sellerModel = require("../Modal/seller");
const customerModel = require("../Modal/user");
const sellerCustomerModel = require("../Modal/chat/sellerCustomerModel");
const sellerCustomerMessage = require("../Modal/chat/sellerCustomerMessage");
const adminSellerMessage = require("../Modal/chat/adminSellerMessage");

class Chat {
  add_customer_friend = async (req, res) => {
    const { sellerId, userId } = req.body;

    try {
      // Validate input data 
      if (!sellerId || !userId) {
        return res.status(400).json({ error: "Invalid input data" });
      }
      // Query the database
      const seller = await sellerModel.findById(sellerId);
      const user = await customerModel.findById(userId);

      // Query the database to find the existing document

      const existingFriendship = await sellerCustomerModel.findOne({
        myId: userId,
      });
  

      if (existingFriendship) {
   

       const fdIdToCheck = sellerId; // The fdId you want to check for

       const fdIdExistsInAllElements = existingFriendship.myFriends.every(
         (friend) => friend.fdId === fdIdToCheck
       );

      if (fdIdExistsInAllElements) {
       return
      } else {
        await sellerCustomerModel.updateOne(
          { myId: userId },
          {
            $push: {
              myFriends: {
                fdId: sellerId,
                name: seller?.name,
                image: seller?.avatar,
              },
            },
          }
        );
      }
      } else { 

           await sellerCustomerModel.create({
             myId: userId,
             myFriends: [
               {
                 fdId: sellerId,
                 name: seller.name,
                 image: seller.avatar,
               },
             ],
           });
       
      }

      // if (!existingFriendship) {
      //   // The friendship doesn't exist, so create a new document
      //   await sellerCustomerModel.create({
      //     myId: userId,
      //     myFriends: [
      //       {
      //         fdId: sellerId,
      //         name: seller.name,
      //         image: seller.avatar,
      //       },
      //     ],
      //   });

      //   console.log("Friendship added successfully.");
      // } else {
      //   // The friendship exists, so update the existing document
      //   await sellerCustomerModel.updateOne(
      //     { myId: userId },
      //     {
      //       $push: {
      //         myFriends: {
      //           fdId: sellerId,
      //           name: seller.name,
      //           image: seller.avatar,
      //         },
      //       },
      //     }
      //   );

      //   console.log("Friendship updated successfully.");
      // }

      const checkCustomer = await sellerCustomerModel.findOne({
        myId: sellerId,
        "myFriends.fdId": userId,
      });

      if (!checkCustomer) {
        await sellerCustomerModel.updateOne(
          { myId: sellerId },
          {
            $push: {
              myFriends: {
                fdId: userId,
                name: user.name,
                image: "",
              },
            },
          }
        );
      }

      const messages = await sellerCustomerMessage.find({
        $or: [
          { receverId: sellerId, senderId: userId },
          { receverId: userId, senderId: sellerId },
        ],
      });

      const MyFriends = await sellerCustomerModel.findOne({ myId: userId });
      const currentFd = MyFriends?.myFriends?.find((s) => s.fdId === sellerId);

      res.status(200).json({
        myFriends: MyFriends?.myFriends,
        currentFd,
        messages,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  customer_message_add = async (req, res) => {
    const { userId, text, sellerId, name } = req.body;
    try {
      const message = await sellerCustomerMessage.create({
        senderId: userId,
        senderName: name,
        receverId: sellerId,
        message: text,
      });

      const data = await sellerCustomerModel.findOne({ myId: userId });
      let myFriends = data.myFriends;
      let index = myFriends.findIndex((f) => f.fdId === sellerId);
      while (index > 0) {
        let temp = myFriends[index];
        myFriends[index] = myFriends[index - 1];
        myFriends[index - 1] = temp;
        index--;
      }
      await sellerCustomerModel.updateOne(
        {
          myId: userId,
        },
        {
          myFriends,
        }
      );
      const data1 = await sellerCustomerModel.findOne({ myId: sellerId });
      let myFriends1 = data1.myFriends;
      let index1 = myFriends1.findIndex((f) => f.fdId === userId);

      while (index1 > 0) {
        let temp1 = myFriends1[index1];
        myFriends1[index1] = myFriends[index1 - 1];
        myFriends1[index1 - 1] = temp1;
        index1--;
      }

      await sellerCustomerModel.updateOne(
        {
          myId: sellerId,
        },
        {
          myFriends1,
        }
      );
      res.status(200).json({
        message,
      });
      // responseReturn(res, 201, { message });
    } catch (error) {
      console.log(error);
    }
  };  

  get_customers = async (req, res) => {
    const { sellerId } = req.params;

    try {
      const data = await sellerCustomerModel.findOne({ myId: sellerId });
      res.status(200).json({
        customers: data.myFriends,
      });
      // responseReturn(res, 200, {
      //   customers: data.myFriends,
      // });
    } catch (error) {
      console.log(error);
    }
  };

  get_customer_seller_message = async (req, res) => {
    const { customerId } = req.params;
    const { id } = req;

    try {
      const messages = await sellerCustomerMessage.find({
        $or: [
          {
            $and: [
              {
                receverId: { $eq: customerId },
              },
              {
                senderId: {
                  $eq: id,
                },
              },
            ],
          },
          {
            $and: [
              {
                receverId: { $eq: id },
              },
              {
                senderId: {
                  $eq: customerId,
                },
              },
            ],
          },
        ],
      });
      const currentCustomer = await customerModel.findById(customerId);
      res.status(200).json({
        messages,
        currentCustomer,
      });

      // responseReturn(res, 200, { messages, currentCustomer });
    } catch (error) {
      console.log(error);
    }
  };

  seller_message_add = async (req, res) => {
    const { senderId, text, receverId, name } = req.body;
    try {
      const message = await sellerCustomerMessage.create({
        senderId: senderId,
        senderName: name,
        receverId: receverId,
        message: text,
      });

      const data = await sellerCustomerModel.findOne({ myId: senderId });
      let myFriends = data.myFriends;
      let index = myFriends.findIndex((f) => f.fdId === receverId);
      while (index > 0) {
        let temp = myFriends[index];
        myFriends[index] = myFriends[index - 1];
        myFriends[index - 1] = temp;
        index--;
      }
      await sellerCustomerModel.updateOne(
        {
          myId: senderId,
        },
        {
          myFriends,
        }
      );
      const data1 = await sellerCustomerModel.findOne({ myId: receverId });
      let myFriends1 = data1.myFriends;
      let index1 = myFriends1.findIndex((f) => f.fdId === senderId);

      while (index1 > 0) {
        let temp1 = myFriends1[index1];
        myFriends1[index1] = myFriends[index1 - 1];
        myFriends1[index1 - 1] = temp1;
        index1--;
      }

      await sellerCustomerModel.updateOne(
        {
          myId: receverId,
        },
        {
          myFriends1,
        }
      );
      res.status(200).json({
        success: true,
        message,
      });
      // responseReturn(res, 201, { message });
    } catch (error) {
      console.log(error);
    }
  };

  get_sellers = async (req, res) => {
    try {
      const sellers = await sellerModel.find({});
      res.status(200).json({
        success: true,
        sellers,
      });

      // responseReturn(res, 200, { sellers });
    } catch (error) {
      console.log(error);
    }
  };

  seller_admin_message_insert = async (req, res) => {
    const { senderId, receverId, message, senderName } = req.body;
    try {
      const messageData = await adminSellerMessage.create({
        senderId,
        receverId,
        senderName,
        message,
      });
      res.status(200).json({
        success: true,
        message: messageData,
      });
      // responseReturn(res, 200, { message: messageData });
    } catch (error) {
      console.log(error);
    }
  };

  get_admin_messages = async (req, res) => {
    const { receverId } = req.params;
    const id = "";
    try {
      const messages = await adminSellerMessage.find({
        $or: [
          {
            $and: [
              {
                receverId: { $eq: receverId },
              },
              {
                senderId: {
                  $eq: id,
                },
              },
            ],
          },
          {
            $and: [
              {
                receverId: { $eq: id },
              },
              {
                senderId: {
                  $eq: receverId,
                },
              },
            ],
          },
        ],
      });
      let currentSeller = {};
      if (receverId) {
        currentSeller = await sellerModel.findById(receverId);
      }
      res.status(200).json({
        success: true,
        messages,
        currentSeller,
      });
      // responseReturn(res, 200, { messages, currentSeller });
    } catch (error) {
      console.log(error);
    }
  };

  get_seller_messages = async (req, res) => {
    const receverId = "";
    const { id } = req;
    try {
      const messages = await adminSellerMessage.find({
        $or: [
          {
            $and: [
              {
                receverId: { $eq: receverId },
              },
              {
                senderId: {
                  $eq: id,
                },
              },
            ],
          },
          {
            $and: [
              {
                receverId: { $eq: id },
              },
              {
                senderId: {
                  $eq: receverId,
                },
              },
            ],
          },
        ],
      });
      res.status(200).json({
        success: true,
        messages,
      });
      // responseReturn(res, 200, { messages });
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = new Chat();
