const { Router } = require("express");
const { Videogame, Genre } = require("../db");
const getAllVideogames = require("../controllers/videogamesController");

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

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const videogamesTotal = await getAllVideogames();
    if (id) {
      const videogameId = videogamesTotal?.filter((v) => v.id == id);
      videogameId.length
        ? res.status(200).json(videogameId)
        : res.status(404).send("No se encuentra ese videojuego");
    }
  } catch (error) {
    console.log("Error en la ruta /videogame/:id ", error);
  }
});

module.exports = router;
