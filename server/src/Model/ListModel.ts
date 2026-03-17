import { model, Schema } from "mongoose";

const schema = new Schema(
  {
    title: { type: String, required: [true, "Please provide title"] },
    description: {
      type: String,
      required: [true, "Please provide description"],
    },
    imageSrc: {
      type: String,
    },
    publicImageSrcId: {
      type: String,
    },
    category: {
      type: String,
    },
    roomCount: {
      type: Number,
    },
    bathroomCount: {
      type: Number,
    },
    guestCount: {
      type: Number,
    },
    locationValue: {
      type: String,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    reservations: [
      {
        type: Schema.Types.ObjectId,
        ref: "Reservation",
      },
    ],
  },
  { timestamps: true },
);

export default model("List", schema);
