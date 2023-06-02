const { Router } = require("express");
const getAllVideogames = require("../controllers/videogamesController");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    const videogamesTotal = await getAllVideogames();
    if (name) {
      const videogameName = videogamesTotal.filter((v) =>
        v.name.toLowerCase().includes(name.toLowerCase())
      );
      videogameName.length
        ? res.status(200).send(videogameName)
        : res
            .status(404)
            .send("No se encuentra el videojuego buscado por nombre");
    } else {
      res.status(200).send(videogamesTotal);
    }
  } catch (error) {
    console.log("Error en la ruta /videogames: ", error);
  }
});

module.exports = router;
