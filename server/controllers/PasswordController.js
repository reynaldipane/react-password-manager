const Password = require('../models/Password');
const User = require('../models/User');
const bcrypt    = require('bcrypt');
const saltRound = 10;

module.exports = {
  create: (req, res) => {
    Password.create({
      url: req.body.url,
      username: req.body.username,
      password: req.body.password,
      userid: req.body.userid
    }, (err, newPassword) => {
      if (err) {
        res.status(500).json({
          message: `Create new password error ${err}`,
          data: {}
        })
      } else {
        res.status(200).json({
          message: `New password created`,
          data: newPassword
        })
      }
    })
  },

  readByUserId: (req, res) => {
    Password.find({ userid: req.body.userid })
      .sort({ updatedAt: -1 })
      .exec()
      .then((userPassword) => {
        if (userPassword.length) {
          res.status(200).json({
            message: `Find password data success`,
            data: userPassword
          })
        } else {
          res.status(202).json({
            message: `No data found !`,
            data: []
          })
        }
      })
      .catch((err) => {
        res.status(202).json({
          message: `No data found ! ${err}`,
          data: {}
        })
      })
  },

  readById: (req, res) => {
    Password.findById(req.params.id)
      .exec()
      .then((password) => {
        if (password) {
          res.status(200).json({
            message: `Get password success`,
            data: password
          })
        } else {
          res.status(202).json({
            message: `Get password failed`,
            data: {}
          })
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: `Error while getting password ${err}`,
          data: {}
        })
      })
  },


  update: (req, res) => {
    Password.findByIdAndUpdate(req.params.id, {
      url: req.body.url,
      username: req.body.username,
      password: req.body.password
    }, { new: true }, (err, updatedPassword) => {
      if (err) {
        res.status(500).json({
          message: `Failed to update password data ${err}`,
          data: {}
        })
      } else {
        res.status(200).json({
          message: `Update data success`,
          data: updatedPassword
        })
      }
    })
  },

  delete: (req, res) => {
    Password.findByIdAndRemove(req.params.id, (err, deletedPassword) => {
      if (err) {
        res.status(500).json({
          message: `Failed to delete password data ${err}`,
          data: {}
        })
      } else {
        res.status(200).json({
          message: `Delete password success`,
          data: deletedPassword
        })
      }
    })
  },

  showPassword: (req, res) => {
    User.findOne({
      $or: [
        { username: req.body.username_email },
        { email: req.body.username_email }
      ]
    })
      .exec()
      .then((userData) => {
        if (userData) {
          let passwordCheck = bcrypt.compareSync(req.body.password, userData.password)
          if (passwordCheck) {
            Password.findById({
              _id: req.body.password_id
            })
            .exec()
            .then((password) => {
              res.status(200).json({
                message: `Show password success !`,
                data: password.password
              })
            })
          } else {
            res.status(202).json({
              message: `Password wrong`,
              data: null
            })
          }
        } else {
          res.status(202).json({
            message: `Password wrong`,
            data: null
          })
        }

      })
      .catch((err) => {
        res.status(500).json({
          message: `Error occured on getting users data ${err}`
        })
      })
  },
}