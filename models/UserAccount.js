import mongoose from "mongoose";
import { generatePasswordHash } from "./../utils/helper";
const UserAccountSchema = new mongoose.Schema({
  auth_type: { type: Number, required: true },
  account_type: { type: Number, required: true },
  profile: {
    first_name: String,
    last_name: String,
    avatar_url: String
  },
  username: { type: String, required: true },
  password: { type: String, required: true },
  status: { type: Number, enum: [0, 1, 2, 10] },
  createdAt: { type: Date },
  updatedAt: { type: Date }
});

UserAccountSchema.methods.checkUsername = (data, cb) => {
  UserAccountSchema.findOne({ username: data.username })
    .lean()
    .exec((_error, count) => {
      if (!_error && count) {
        return cb({ code: 2, key: "Username" });
      } else {
        return cb({ code: 0, key: "" });
      }
    });
};

UserAccountSchema.pre("save", function (next) {
  let _this = this;

  generatePasswordHash(_this.password, (hash) => {
    if (hash.error) {
      next(hash.error);
    } else {
      _this.password = hash.hash;

      next();
    }
  });
});

export default mongoose.model("user_account", UserAccountSchema);
