const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

// Sign up
router.post('/', validateSignup, async (req, res, next) => {
    const { firstName, lastName, email, password, username } = req.body;

    const errors = []


    if(!email){
      errors.push('Invalid email')
    }
    if(!username){
      errors.push('Username is required')
    }
    if(!firstName){
      errors.push('First Name is required')
    }
    if(!lastName){
      errors.push('Last Name is required')
    }

    if(errors.length) {
      const error = new Error()
      error.errors = errors
      error.statusCode = 400
      error.message = "Validation error"
      return next(error)
    }

    const users = await User.findAll()

    users.forEach(user => {
      if(username === user.username){
        errors.push("User with that username already exists")
        const error = new Error()
        error.errors = errors
        error.statusCode = 403
        error.message = "User already exists"
        return next(error)
      } else if(email === user.email) {
        errors.push("User with that email already exists")
        const error = new Error()
        error.errors = errors
        error.statusCode = 403
        error.message = "User already exists"
        return next(error)
      }
    });

    const user = await User.signup({ firstName, lastName, email, username, password });

    await setTokenCookie(res, user);

    user.toJSON()

    let responseUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      token: ""
    }

    return res.json({
      user: responseUser
    });
  }
);

module.exports = router;
