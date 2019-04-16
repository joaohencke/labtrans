/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 12;

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      select: false,
    },
  },
  { timestamps: true },
);

UserSchema.statics.hashPassword = password => bcrypt.hash(password, saltRounds);

UserSchema.methods.checkPassword = async function checkPassword(password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.path('username').validate(async function usernameValidation(username) {
  const count = await UserModel.countDocuments({ username, _id: { $ne: this._id } });
  return !count;
}, 'registered_user');

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
