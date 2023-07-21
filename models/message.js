const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    text: {type: String, required: true, maxLength: 150, minLength: 1},
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    added: {type: Date, default: () => Date.now(), immutable: true}
});

// Export model
module.exports = mongoose.model("Message", MessageSchema);