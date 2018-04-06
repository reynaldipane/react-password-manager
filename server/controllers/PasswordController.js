const Password  = require('../models/Password');

module.exports = {
  create: (req,res) => {
    Password.create({
      url: req.body.url,
      username: req.body.username,
      password: req.body.password,
      userid: req.body.userid
    },(err, newPassword) => {
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

  readByUserId: (req,res) => {
    Password.find({userid: req.body.userid})
    .sort({updatedAt:-1})
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
          data: {}
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


  update: (req,res) => {
    Password.findByIdAndUpdate(req.params.id, {
      url: req.body.url,
      username: req.body.username,
      password: req.body.password
    }, { new: true}, (err, updatedPassword) => {
      if (err) {
        res.status(500).json({
          message : `Failed to update password data ${err}`,
          data    : {}
        })
      } else {
        res.status(200).json({
          message: `Update data success`,
          data: updatedPassword
        })
      }
    })
  },

  delete: (req,res) => {
    Password.findByIdAndRemove(req.params.id, (err, deletedPassword) => {
      if (err) {
        res.status(500).json({
          message : `Failed to delete password data ${err}`,
          data    : {}
        })
      } else {
        res.status(200).json({
          message: `Delete password success`,
          data: deletedPassword
        })
      }
    })
  }
}