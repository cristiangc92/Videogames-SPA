const { Router } = require("express");
const { Videogame, Genre } = require("../db");

const router = Router();

router.post("/", async (req, res) => {
  try {
    const {
      name,
      image,
      description,
      released,
      rating,
      genres,
      platforms,
      createdInDb,
    } = req.body;
    const videogameCreated = await Videogame.create({
      name,
      image,
      description,
      released,
      rating,
      platforms,
      createdInDb,
    });
    const genresDb = await Genre.findAll({
      where: { name: genres },
    });
    videogameCreated.addGenre(genresDb);
    res.send("Videojuego creado con exito!");
  } catch (error) {
    console.log("Error en la ruta /videogame: ", error);
  }
});

module.exports = router;
