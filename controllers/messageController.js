const asyncHandler = require("express-async-handler");

//display list of messages
exports.get_message_list = asyncHandler(async (req, res, next) => {
      res.send('list messages on GET page - not implemented');
})

exports.new_message_get = asyncHandler(async (req, res, next) => {
      res.send('GET request for new message page - not implemented');
})

exports.new_message_post = asyncHandler(async (req, res, next) => {
      res.send('POST request for new message page - not implemented');
})