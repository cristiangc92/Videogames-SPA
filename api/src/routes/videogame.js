const { Router } = require("express");
const { Videogame, Genre } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;
const { validate: uuidValidate } = require("uuid");

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
      image:
        image ||
        "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg",
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
    if (!uuidValidate(id)) {
      const videogameId = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
      );
      const videogameInfo = {
        id: videogameId.data.id,
        name: videogameId.data.name,
        image: videogameId.data.background_image_additional,
        description: videogameId.data.description,
        genres: videogameId.data.genres?.map((g) => g.name),
        released: videogameId.data.released,
        rating: videogameId.data.rating,
        platforms: videogameId.data.platforms?.map((p) => p.platform.name),
      };
      videogameInfo
        ? res.status(200).send(videogameInfo)
        : res.status(404).send("No existe el ID en la API!!");
    } else {
      const videogameDb = await Videogame.findByPk(id, {
        include: Genre,
      });
      const videogameIdDb = {
        id: videogameDb.id,
        name: videogameDb.name,
        image: videogameDb.image,
        genres: videogameDb.genres?.map((e) => e.name),
        description: videogameDb.description,
        released: videogameDb.released,
        rating: videogameDb.rating,
        platforms: videogameDb.platforms,
        createdInDb: videogameDb.createdInDb,
      };
      videogameIdDb
        ? res.status(200).send(videogameIdDb)
        : res.status(404).send("No existe el ID en la BD!!");
    }
  } catch (error) {
    console.log("Error en la ruta /videogame/:id: ", error);
  }
});

module.exports = router;
