const { Schema, model } = require("mongoose");

const Joi = require("joi");
const { handleMongooseError } = require("../utils");
const passwordRegexp = /^[0-9]+$/;
const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: emailRegexp,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },

    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },

  },
  { versionKey: false }
);

userSchema.post("save", handleMongooseError);

const schemas = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().pattern(passwordRegexp).required(),
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .default("starter"),
});

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});


const User = model("user", userSchema);

module.exports = {
  User,
  schemas,

  emailSchema,


};
