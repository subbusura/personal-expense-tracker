import Bcrypt from "bcrypt";
const SALT_FACTOR = 10;
export const generatePasswordHash = function (password, callback) {
  Bcrypt.genSalt(SALT_FACTOR, (error, salt) => {
    if (!error) {
      Bcrypt.hash(password, salt, (error, hash) => {
        if (!error) {
          return callback({ hash: hash });
        } else {
          return callback({ error: error });
        }
      });
    } else {
      return callback({ error: error });
    }
  });
};
