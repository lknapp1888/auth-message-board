const asyncHandler = require("express-async-handler");

//display sign up form on GET
exports.signup_get = asyncHandler(async (req, res, next) => {
  res.render('signup_form', {
    title: 'Register an account',
  });
});

//handle sign up post request
exports.signup_post = asyncHandler(async (req, res, next) => {
  res.send('Sign-up POST page - Not implemented');
});

//display log in form on GET
exports.login_get = asyncHandler(async (req, res, next) => {
  res.send('log-in GET page - Not implemented');
});

//handle log in post request
exports.login_post = asyncHandler(async (req, res, next) => {
  res.send('log-in POST page - Not implemented');
});

//display join club form on GET
exports.join_club_get = asyncHandler(async (req, res, next) => {
  res.send('join club GET page - Not implemented');
});

//handle join club post request
exports.join_club_post = asyncHandler(async (req, res, next) => {
  res.send('join club POST page - Not implemented');
});