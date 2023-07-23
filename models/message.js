const connection = require('../config/database');
const mongoose = require('mongoose');
const format = require('date-fns').format;
const formatDistanceToNowStrict = require('date-fns').formatDistanceToNowStrict;

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    text: {type: String, required: true, maxLength: 150, minLength: 1},
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    added: {type: Date, default: () => Date.now(), immutable: true}
});

//return a formatted date
MessageSchema.virtual("formattedDate").get(function () {
    return format(this.added, 'HH:mm - do MMM y');
  });

MessageSchema.virtual('timeSincePosted').get(function () {
    return `posted ${formatDistanceToNowStrict(this.added)} ago`;
})

// Export model
module.exports = connection.model("Message", MessageSchema);