const { Router } = require("express");
const { Genre } = require("../db");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const allGenres = await Genre.findAll();
    const genresMap = allGenres?.map((g) => g.name);
    res.status(200).send(genresMap);
  } catch (error) {
    console.log("Error en la ruta /genres: ", error);
  }
});

module.exports = router;
