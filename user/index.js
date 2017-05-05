var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('./model.js')
var jwt = require('jsonwebtoken')
var bodyParser = require('body-parser')
var testSchema = require('./testSchema.js')
var auth = require('./auth.js')
router.post('/login',function(req, res, next){
  console.log(req.body);
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({username: username}, function(err, user){
    if(err) {
      return res.status.json({
        err: "login failed"
      });
    }
    if(!user){
      return res.status(404).json({
        err: "user not found"
      });
    }
    user.comparePassword(password, function(err, isMatch){
      if (isMatch == true){
        //var token = verify.getToken(user);
        console.log(user)
        return res.status(200).json({
          username: username,
          token: jwt.sign({
            _id: user._id
          },'secret')
        });
      } else {
        return res.status(401).json({
          status: false,
          err: "invalid credentials"
        });
      }
    });
  });

});
router.post('/insert',auth.authLevel,function(req, res, next){
  var body =req.body
  body.user = req.decoded._id
  testSchema.createData(body)
  .then((x) => {
    res.status(200).json({
      status: true,
      description: 'created succesfully'
    })
  })
  .catch((err) => {
    console.log(err);
    res.status(401)
    .json({
      status: false,
      description: 'something went wrong'
    })
  })

});

module.exports = router
