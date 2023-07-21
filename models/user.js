const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {type: String, required: true, maxLength: 30, minLength: 1},
    lastName: {type: String, required: true, maxLength: 30, minLength: 1},
    email: {type: String, required: true},
    registered: {type: Date, default: () => Date.now(), immutable: true},
    clubMember: {type: Boolean, default: false},
    admin: {type: Boolean, default: false}
});

// Virtual for full name
UserSchema.virtual("fullName").get(function () {
    // We don't use an arrow function as we'll need the this object
    return `${this.firstName} ${this.lastName}`;
  });

// Export model
module.exports = mongoose.model("User", UserSchema);