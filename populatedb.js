#! /usr/bin/env node

console.log(
    'This script populates some test users and posts. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
  );
  
  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);
  
  const User = require('./models/user');
  const Message = require('./models/message');
  
  const users = [];
  const messages = [];
  
  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false); // Prepare for Mongoose 7
  
  const mongoDB = userArgs[0];
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createUsers();
    await createMessages();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }
  
  // We pass the index to the ...Create functions so that, for example,
  // item[0] will always be the Fantasy genre, regardless of the order
  // in which the elements of promise.all's argument complete.

  async function userCreate(
    index,
    firstName,
    lastName,
    email,
    clubMember,
    admin
  ) {
    const user = new User({
        firstName,
        lastName,
        email,
        clubMember,
        admin
    })
    await user.save();
    users[index] = user;
    console.log(`added user: ${user.fullName}`)
  }
  
  async function createUsers() {
    console.log("Adding users");
    await Promise.all([
      userCreate(0, 'Lewis', 'K', 'lewis@email.com', true, true),
      userCreate(1, 'Kolo', 'Toure', 'kolo@email.com', true, true),
  ]);
  }
  
  async function messageCreate(
    index,
    text,
    author,
  ) {
    const message = new Message({
        text,
        author
    })
    await message.save();
    messages[index] = message;
    console.log(`Added message: ${message.text}`);
  }
  
  async function createMessages() {
      console.log("Adding messages");
      await Promise.all([
            messageCreate(0, 'Hello application', users[0]),
            messageCreate(1, 'Hello again', users[0]),
            messageCreate(2, 'final message test', users[1])
      ])
  }