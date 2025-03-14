const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const musicianSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Vocals", "Guitar", "Drums", "Bass"],
      required: true,
    },
    yearsOfExperience: {
      type: Number,
      required: true,
    },
    favouriteGenre: {
      type: String,
      required: true,
    },
    favouriteBand: {
      type: String,
      required: true,
    },
    image: String,
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Musician = model("Musician", musicianSchema);

module.exports = Musician;
