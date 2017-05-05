var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt'),SALT_WORK_FACTOR = 10;

var passLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
  username: {type: String, unique: true, required:true},
  password: {type:String,require: true},
  yearOfJoined:{type: Number},
  school:{type:String}
});

User.pre('save', function(next){
  var user = this;
  if(!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash){
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

User.methods.comparePassword = function (candidatePassword, callback){
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
    if (err) return callback(err);
    callback(undefined, isMatch);
  });
};

// User.plugin(passLocalMongoose);

module.exports = mongoose.model('User', User);
