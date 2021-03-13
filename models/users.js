import mongoose from "mongoose";
import { generatePasswordHash } from "./../utils/helper";

const UsersSchema = new mongoose.Schema({
  name: { type: String },
  auth_type: { type: Number, default: 2 },
  username: { type: String },
  password: { type: String },
  email: { type: String },
  email_verified: { type: Date },
  image: { type: String },
  status: { type: Number, enum: [0, 1, 2, 10], default: 10 },
  created_at: { type: Date, default: new Date() },
  updated_at: { type: Date, default: new Date() }
});

UsersSchema.methods.checkUsername = (data, cb) => {
  UsersSchema.findOne({ username: data.username })
    .lean()
    .exec((_error, count) => {
      if (!_error && count) {
        return cb({ code: 2, key: "Username" });
      } else {
        return cb({ code: 0, key: "" });
      }
    });
};

UsersSchema.pre("save", function (next) {
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

//export default mongoose.model("users", UsersSchema);

export default mongoose.models.users || mongoose.model("users", UsersSchema);
