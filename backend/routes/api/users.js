const express = require('express')
const { setTokenCookie } = require('../../utils/auth');
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
    check('firstName')
        .exists({checkFalsy: true})
        .isAlpha()
        .withMessage('Please provide first name'),
    check('lastName')
        .exists({checkFalsy: true})
        .isAlpha()
        .withMessage('Please provide last name'),
    handleValidationErrors
];


router.post(
    '/',
    validateSignup,
    async (req, res) => {
        const { email, password, username, firstName, lastName } = req.body;
        const existingEmail = await User.findOne({
            where: {
                email: email
            }
        });
        const existingUsername = await User.findOne({
            where: {
                username: username
            }
        })
        if (existingEmail) {
            res.status(403),
            res.json(
            {
                "message": "User already exists",
                "statusCode": 403,
                "errors": {
                    "email": "User with that email already exists"
                }
            })
        } else if (existingUsername) {
            res.status(403),
            res.json(
            {
                "message": "User already exists",
                "statusCode": 403,
                "errors": {
                    "email": "User with that username already exists"
                }
            })
        } else if (!existingEmail && ! existingUsername) {
            let user = await User.signup({ email, username, password, firstName, lastName }, {scope: 'currentUser'});
            let token = setTokenCookie(res, user);
            user = user.toJSON();
            delete user.createdAt;
            delete user.updatedAt;
            user.token = token;
            return res.json(user);
        }
    }
);


module.exports = router;
