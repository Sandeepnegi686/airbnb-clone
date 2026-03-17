import { model, Schema, Types } from "mongoose";
import validator from "validator";
import argon2 from "argon2";

const schema = new Schema(
  {
    name: { type: String, required: [true, "Please provide name"] },
    email: {
      type: String,
      required: [true, "Please provide email"],
      unique: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: (props: any) => `${props.value} is not a valid email!`,
      },
    },
    password: {
      type: String,
      select: false,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
    },
    publicImageId: {
      type: String,
    },
    favoriteIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "List",
      },
    ],
    reservations: [
      {
        type: Schema.Types.ObjectId,
        ref: "Reservation",
      },
    ],
  },
  { timestamps: true },
);

schema.pre("save", async function () {
  try {
    if (this.isModified("password")) {
      this.password = await argon2.hash("password");
    }
  } catch (error) {
    console.log("Something went wrong while saving the hashed password");
    console.log(error);
  }
});

schema.methods.comparePassword = async function (userPassword: string) {
  try {
    if (await argon2.verify(this.password, userPassword)) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    console.log("Something went wrong while comparing the password");
  }
};

export default model("User", schema);
