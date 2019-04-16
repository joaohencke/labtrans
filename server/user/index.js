const UserModel = require('./model');

/**
 * Creates an user
 * @param {Object} user
 * @param {String} user.username
 * @param {String} user.password
 *
 * @returns {Promise<Object>} created user
 */
exports.create = async ({ username, password }) => {
  const user = new UserModel({
    username,
    password: await UserModel.hashPassword(password),
  });

  await user.save();

  return { ...user.toObject(), password: undefined };
};

/**
 * Lists all users stored in db
 * @returns {Promise<Array>} array of users
 */
exports.list = async () => UserModel.find({});
