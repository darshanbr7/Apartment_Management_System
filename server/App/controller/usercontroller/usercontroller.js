const user = require("../../module/user/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userController = {};

userController.register = (req, res) => {
  const body = req.body;
  const newUser = new user(body);
  bcrypt
    .genSalt()
    .then((salt) => {
      bcrypt
        .hash(newUser.password, salt)
        .then((encrypted) => {
          newUser.password = encrypted;
          newUser
            .save()
            .then((data) => {
              res.json(data);
            })
            .catch((err) => {
              res.json({
                error: err.message,
              });
            });
        })
        .catch((err) => {
          res.json({
            error: err.message,
          });
        });
    })
    .catch((err) => {
      res.json({
        error: err.message,
      });
    });
};

userController.login = (req, res) => {
  const body = req.body;
  user
    .findOne({ email: body.email })
    .then(async (user) => {
      const verifyPass = await bcrypt.compare(body.password, user.password);
      if (!verifyPass) {
        res.json({
          error: "Email/Password not match",
        });
      } else {
        const token = {
          user_Id: user._id,
          username: user.username,
          email: user.email,
        };
        const gentoken = jwt.sign(token, "D123");
        res.send({
          token: gentoken,
        });
      }
    })
    .catch((e) => {
      res.status(401).json("Email/Password Error");
    });
};

module.exports = userController;
