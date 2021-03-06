const mongoose      = require("mongoose");
const bcrypt        = require("bcrypt");
const jwt           = require('jsonwebtoken');
const User          = require("../models/userModel");
const utils         = require('../utils/utils');

exports.get_profile = (req, res) => {
  let token = utils.getAuthToken(req.headers.authorization);
  if (!token.length) {
    return res.status(401).json({
      message: 'Access token is missing!'
    });
  }
  try {
    const user = jwt.verify(token, 'secret');
    res.status(200).json({
      data : {user},
      message: 'successful'
    });
  } catch (error) {
      return res.status(401).json({
        message: 'Auth failed',
      });
  }
}

exports.user_login = (req, res, next) => {
    User.find({email: req.body.email})
        .exec()
        .then((user) => {
          if (user.length < 1) {
            return res.status(401).json({
              message: 'Auth failed',
            });
          }
          bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (err) {
              return res.status(401).json({
                message: 'Auth failed',
              });
            }
            if (result) {
              const token = jwt.sign({
                email: user[0].email,
                userId: user[0]._id,
              },
              'secret',
              {
                expiresIn: '1h',
              },
              );
              return res.status(200).json({
                message: 'Auth Successful',
                token: token,
              });
            }
            return res.status(401).json({
              message: 'Auth failed',
            });
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            error: err,
          });
        });
  }

exports.user_signup = (req, res) => {
  console.log('REGITSER IN USER API');
    User.find({email: req.body.email})
        .exec()
        .then((user) => {
          if (user.length >= 1) {
            res.status(409).json({
              message: 'Mail Exist',
            });
          } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
              if (err) {
                res.status(500).json({
                  error: err,
                });
              } else {
                const user = new User({
                  _id: new mongoose.Types.ObjectId(),
                  name: req.body.name,
                  email: req.body.email,
                  password: hash,
                });
                user.save()
                    .then((result) => {
                      res.status(201).json({
                        message: 'User created',
                      });
                    })
                    .catch((err) => {
                      res.status(500).json({
                        error: err,
                      });
                    });
              }
            });
          }
        })
        .catch((err) => {
          res.status(500).json({
            error: err,
          });
        });
  }
