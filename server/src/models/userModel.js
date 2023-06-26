const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
      minlength: [3, "Too short user name"],
      maxlength: [20, "Too short user name"],
    },
    username: {
      type: String,
      trim: true,
      required: [true, "Username is required"],
      minlength: [3, "Too short username"],
      maxlength: [20, "Too short username"],
      unique: [true, "This is duplicate username"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "This is duplicate email"],
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [6, "Too short password"],
    },
    about: {
      type: String,
      maxlength: [100, "Too short password"],
    },
    avatar: {
      type: String,
      default: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  // Hashing user password
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

/**
 * Get user profile data.
 */
userSchema.methods.getData = function(){
  return {
      id: this._id,
      name: this.name,
      username: this.username,
      about: this.about,
      avatar: this.avatar
  };
};

/**
 * Append id attribute.
 */
userSchema.virtual('id').get(function(){
  return this._id.toHexString();
});

/**
* Enable virtual attributes (id).
*/
userSchema.set('toJSON', {
  virtuals: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;
