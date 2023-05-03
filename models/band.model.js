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
        ref: "Musician",
      },
    ],
    genre: {
      type: String,
      required: true,
    },
    dateFounded: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Band = model("band", bandSchema);

module.exports = Band;
