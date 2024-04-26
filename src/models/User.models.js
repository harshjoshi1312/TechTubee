import mongoose, { Schema, SchemaTypes, trusted } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    avatar: {
      type: String, // clodinary store
      required: true,
    },
    coverImage: {
      type: String,
    },

    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "video",
      },
    ],

    password: {
      type: String,
      required: [true, "password is requires"],
    },

    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: {
      type: String,
    },
  }
);

// hooks in npm for the pre working
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = bcrypt.hash(this.password, 10);
  next();
});

// methods for the working
userSchema.methods.isPassworCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema);

// acess token genrator
userSchema.methods.generateAcesstoken = function () {
  return Jwt.sign(
    {
      _id: this.ObjectId,
      email: this.email,
      username: this.username,
      fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

// refresh token genrator
userSchema.methods.generateRefreshtoken = function () {
  return Jwt.sign(
    {
      _id: this.ObjectId,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

// jwtr token is basicaally liker the key wehich is importan
// access and refresh token are both the jwt token for
//to check the authority aor timing
