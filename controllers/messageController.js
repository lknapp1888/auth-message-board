const asyncHandler = require("express-async-handler");
const Message = require("../models/message");
const User = require("../models/user");
const { body, validationResult } = require("express-validator");

//display list of messages
exports.get_message_list = asyncHandler(async (req, res, next) => {
  const messages = await Message.find().sort({ added: -1 }).populate("author").exec();
  res.render("message_list", {
    title: "Home page",
    user: req.user,
    message_list: messages,
  });
});

exports.new_message_post = [
      body('messageText').trim()
      .isLength({ min: 1, max:150 })
      .escape(),

      asyncHandler(async (req, res, next) => {
            try {
              const user = await User.findById(req.params.id).exec();
              const message = new Message({
                text: req.body.messageText,
                author: user,
              });
              await message.save();
              res.redirect('/')
            } catch (error) {
                next(error)
            }
          })
]

exports.delete_message = asyncHandler(async (req, res, next) => {
      const message = await Message.findById(req.body.messageid).exec()
      
      if (message === null) {
            res.redirect('/')
      }
      await Message.findByIdAndRemove(req.body.messageid);
      res.redirect('/')
})
