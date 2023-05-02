const express = require("express");
const router = express.Router();
const Musician = require("../models/musician.model");
const Band = require("../models/band.model");

router.get("/createMusician", (req, res, next) => {
  res.render("profile/createMusician");
});

router.post("/createMusician", async (req, res, next) => {
  try {
    const createdMusician = await Musician.create(req.body);
    console.log("new musician", createdMusician);
    res.redirect("/profile/musicianList");
  } catch (error) {
    console.log(error);
  }
  console.log(req.body);
});

router.get("/MusicianList", async (req, res, next) => {
  try {
    const allMusicians = await Musician.find();
    res.render("profile/musicianList", { allMusicians });
  } catch (error) {
    console.log(error);
  }
});

router.get("/delete/:musicianId", async (req, res, next) => {
  try {
    const { musicianId } = req.params;
    await Musician.findByIdAndDelete(musicianId);
    console.log(req.params);
    res.redirect("/profile/musicianList");
  } catch (error) {
    console.log(error);
  }
});

router.get("/editMusician/:musicianId", async (req, res, next) => {
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

router.post("/editMusician/:musicianId", async (req, res, next) => {
  try {
    const { musicianId } = req.params;
    const updatedMusician = await Musician.findByIdAndUpdate(
      musicianId,
      req.body,
      {
        new: true,
      }
    );
    console.log("new Musician", updatedMusician);
    res.redirect("/profile/musicianList");
  } catch (error) {
    console.log(error);
  }
});

// //Band routes ------------------------------- ****

router.get("/createBand", async (req, res, next) => {
  try {
    const allMusicians = await Musician.find();
    res.render("profile/createBand", { allMusicians });
  } catch (error) {
    console.log(error);
  }
});

router.post("/createBand", async (req, res, next) => {
  try {
    const createdBand = await Band.create(req.body);
    console.log("new band", createdBand);
    res.redirect("/profile/bandList");
  } catch (error) {
    console.log(error);
  }
});

router.get("/bandList", async (req, res, next) => {
  try {
    const allBands = await Band.find().populate("members");
    res.render("profile/bandList", { allBands });
  } catch (error) {
    console.log(error);
  }
});

router.get("/delete/band/:bandId", async (req, res, next) => {
  try {
    const { bandId } = req.params;
    await Band.findByIdAndDelete(bandId);
    res.redirect("/profile/bandList");
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
