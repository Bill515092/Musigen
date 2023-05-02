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
      get: function (date) {
        const day = ("0" + date.getDate()).slice(-2);
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
      },
      set: function (dateString) {
        return new Date(dateString);
      },
    },
  },
  {
    timestamps: true,
  }
);

const Band = model("Band", bandSchema);

module.exports = Band;
