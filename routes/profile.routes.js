const express = require("express");
const router = express.Router();
const Musician = require("../models/musician.model");
const Band = require("../models/band.model");
const { isLoggedIn } = require("../middleware/route.guard");
const uploader = require("../middleware/cloudinary.config.js");

router.get("/createMusician", isLoggedIn, (req, res, next) => {
  res.render("profile/createMusician");
});

router.post(
  "/createMusician",
  uploader.single("imageUrl"),
  async (req, res, next) => {
    try {
      const { name, role, yearsOfExperience, favouriteGenre, favouriteBand } =
        req.body;
      const image = req.file.path;
      const createdMusician = await Musician.create({
        name,
        role,
        yearsOfExperience,
        favouriteGenre,
        favouriteBand,
        image,
      });
      console.log("new musician", createdMusician);
      res.redirect("/profile/musicianList");
    } catch (error) {
      console.log(error);
    }
    console.log(req.body);
  }
);

router.get("/MusicianList", isLoggedIn, async (req, res, next) => {
  try {
    const allMusicians = await Musician.find();
    res.render("profile/musicianList", { allMusicians });
  } catch (error) {
    console.log(error);
  }
});

router.get("/delete/:musicianId", isLoggedIn, async (req, res, next) => {
  try {
    const { musicianId } = req.params;
    await Musician.findByIdAndDelete(musicianId);
    console.log(req.params);
    res.redirect("/profile/musicianList");
  } catch (error) {
    console.log(error);
  }
});

router.get("/editMusician/:musicianId", isLoggedIn, async (req, res, next) => {
  try {
    const musicianToUpdate = await Musician.findById(
      req.params.musicianId
    ).populate();
    console.log(musicianToUpdate);
    res.render("profile/editMusician", { musicianToUpdate });
  } catch (error) {
    console.log(error);
  }
});

router.post(
  "/editMusician/:musicianId",
  uploader.single("imageUrl"),
  async (req, res, next) => {
    try {
      const { name, role, yearsOfExperience, favouriteGenre, favouriteBand } =
        req.body;
      const image = req.file.path;
      const { musicianId } = req.params;
      const updatedMusician = await Musician.findByIdAndUpdate(
        musicianId,
        { name, role, yearsOfExperience, favouriteGenre, favouriteBand, image },
        {
          new: true,
        }
      );
      console.log("new Musician", updatedMusician);
      res.redirect("/profile/musicianList");
    } catch (error) {
      console.log(error);
    }
  }
);

// //Band routes ------------------------------- ****

router.get("/createBand", isLoggedIn, async (req, res, next) => {
  try {
    const allMusicians = await Musician.find();
    res.render("profile/createBand", { allMusicians });
  } catch (error) {
    console.log(error);
  }
});

router.post("/createBand", async (req, res, next) => {
  try {
    // const image = req.file.path;
    const createdBand = await Band.create(req.body);
    console.log("new band", createdBand);
    res.redirect("/profile/bandList");
  } catch (error) {
    console.log(error);
  }
});

router.get("/bandList", isLoggedIn, async (req, res, next) => {
  try {
    const allBands = await Band.find().populate("members");
    res.render("profile/bandList", { allBands });
  } catch (error) {
    console.log(error);
  }
});

router.get("/delete/band/:bandId", isLoggedIn, async (req, res, next) => {
  try {
    const { bandId } = req.params;
    await Band.findByIdAndDelete(bandId);
    res.redirect("/profile/bandList");
  } catch (error) {
    console.log(error);
  }
});
router.get("/editBand/:bandId", isLoggedIn, async (req, res, next) => {
  try {
    const bandToUpdate = await Band.findById(req.params.bandId).populate(
      "members"
    );
    const allMembers = await Musician.find();
    console.log(bandToUpdate);
    res.render("profile/editBand", { bandToUpdate, allMembers });
  } catch (error) {
    console.log(error);
  }
});

router.post(
  "/editBand/:bandId",
  uploader.single("imageUrl"),
  async (req, res, next) => {
    try {
      const bandId = req.params.bandId;
      const bandToUpdate = await Band.findByIdAndUpdate(
        bandId,
        {
          members: req.body.members,
          name: req.body.name,
          genre: req.body.genre,
          dateFounded: req.body.dateFounded,
        },
        {
          new: true,
        }
      );
      console.log(req.body);
      console.log("Updated Band", bandToUpdate);
      res.redirect("/profile/bandList");
    } catch (error) {
      console.log(error);
    }
  }
);

module.exports = router;
