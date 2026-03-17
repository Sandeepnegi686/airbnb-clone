import { model, Schema } from "mongoose";

const schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    listingId: {
      type: Schema.Types.ObjectId,
      ref: "List",
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    totalPrice: {
      type: Number,
    },
  },
  { timestamps: true },
);

export default model("Reservation", schema);
