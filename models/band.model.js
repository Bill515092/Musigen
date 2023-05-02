const { Schema, model } = require("mongoose");

const bandSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "musician",
      },
    ],
    genre: {
      type: String,
      required: true,
    },
    dateFounded: {
      type: Date,
      required: true,
      get: (date) => date.toISOString().substr(0, 10),
      set: (dateString) => new Date(dateString),
    },
  },
  {
    timestamps: true,
  }
);

const Band = model("Band", bandSchema);

module.exports = Band;
