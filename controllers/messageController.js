const asyncHandler = require("express-async-handler");
const Message = require("../models/message");


//display list of messages
exports.get_message_list = asyncHandler(async (req, res, next) => {
      const messages = await Message.find().populate('author').exec();
      res.render('message_list', {
            title: 'Home page',
            user: req.user,
            message_list: messages,
      })
})

exports.new_message_get = asyncHandler(async (req, res, next) => {
      res.send('GET request for new message page - not implemented');
})

exports.new_message_post = asyncHandler(async (req, res, next) => {
      res.send('POST request for new message page - not implemented');
})