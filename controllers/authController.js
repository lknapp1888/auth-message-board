const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const passport = require('passport');

const bcrypt = require('bcryptjs');

//display sign up form on GET
exports.signup_get = asyncHandler(async (req, res, next) => {
  res.render("signup_form", {
    title: "Register an account",
  });
});

//handle sign up post request
exports.signup_post = [
  // Validate and sanitize fields.
  body('firstName').trim()
  .isLength({ min: 1, max:30 })
  .escape()
  .withMessage("First name must be specified.")
  .isAlphanumeric()
  .withMessage("First name has non-alphanumeric characters."),
  body('lastName').trim()
  .isLength({ min: 1 })
  .escape()
  .withMessage("Last name must be specified.")
  .isAlphanumeric()
  .withMessage("Last name has non-alphanumeric characters."),
  body('username').trim()
  .isEmail()
  .withMessage('please enter a valid email address')
  .escape()
  .custom(async value => {
    const user = await User.findOne({email: value}).exec();
    console.log(value)
    if (user) {
      throw new Error('E-mail already in use');
    }
  })
  .withMessage('username/email already exists'),
  body('password').trim()
  .escape()
  .isLength({ min: 6, max:30 }),
  body('passwordVerify', 'passwords do not match').custom((value, { req }) => {
    return value === req.body.password;
  }),

  //process request after validation and sanitation -THIS WORKS!
  asyncHandler(async (req, res, next) => {
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) {
        return next(err);
      }
      try {
        // Extract the validation errors from a request.
        const errors = validationResult(req);
  
        //create user
        const user = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.username,
          password: hashedPassword,
          admin: req.body.isAdmin ? true : false,
        });
        if (!errors.isEmpty()) {
          // There are errors. Render form again with sanitized values/error messages.
          res.render("signup_form", {
            title: "Register an account",
            errors: errors.array(),
          });
        } else {
          // Data from form is valid. Save user.
          await user.save();
          res.redirect("/log-in");
        }
      } catch (err) {
        return next(err);
      }
    });
  }),
];


//display log in form on GET
exports.login_get = asyncHandler(async (req, res, next) => {
  const title = req.session.messages ? req.session.messages[req.session.messages.length - 1] : 'log in';
  res.render('login_form', {
    title: title,
  })
});

//handle log in post request
exports.login_post = [
  body('username').trim()
  .isEmail()
  .withMessage('please enter a valid email address')
  .escape(),
  body('password').trim()
  .escape(),
  passport.authenticate('local', {failureRedirect: '/log-in', failureMessage: 'Log in failed, please try again', successRedirect: '/'}),
]

exports.logout_post = asyncHandler(async(req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
})

//handle join club post request
exports.join_club_post = asyncHandler(async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.body.userid, {clubMember: true}, {})
    res.redirect('/')
  } catch (error) {
    next(error)
  }
});
