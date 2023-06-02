const { Router } = require("express");
const { Genre } = require("../db");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const allGenres = await Genre.findAll();
    res.status(200).send(allGenres);
  } catch (error) {
    console.log("Error en la ruta /genres: ", error);
  }
});

module.exports = router;
