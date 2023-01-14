const express = require('express')

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Email or username is required'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Password is required'),
  handleValidationErrors
];

router.get('/', restoreUser, (req, res) => {
    const { user } = req;
    if (user) {
      return res.json({
        user: user.toSafeObject()
      });
    } else return res.json({ user: null });
  }
);

router.post('/', validateLogin, async (req, res, next) => {
    const { credential, password } = req.body;

    if(!credential || !password){
      const err = new Error('Login failed');
      err.status = 400;
      err.title = 'Invalid credentials';
      err.errors = {
        "credential": 'Email or username is required.',
        "password": 'Password is required'
      };
      return next(err);
    }

    let user = await User.login({ credential, password });

    if (!user) {
        res.status(401),
        res.json(
        {
            "message": "Invalid credentials",
            "statusCode": 401,
        })
    }

    setTokenCookie(res, user);

    user = user.toSafeObject()

    return res.json({
      user: user
    });
  }
);

router.delete('/', (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
);


module.exports = router;

