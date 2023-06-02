const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;
const axios = require("axios");

const getApiInfo = async () => {
  try {
    const promises = [];
    const arrVideogames = [];
    for (let i = 1; i < 6; i++) {
      promises.push(
        axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`)
      );
    }
    await Promise.all(promises)
      .then((values) => {
        values?.map((elem) => {
          elem.data.results?.map((el) => {
            arrVideogames.push({
              id: el.id,
              name: el.name,
              image: el.background_image,
              released: el.released,
              rating: el.rating,
              platforms: el.platforms?.map((p) => p.platform.name),
              genres: el.genres?.map((g) => g.name),
            });
          });
        });
      })
      .catch((error) =>
        console.log("Error en Promise.all de getApiInfo", error)
      );
    return arrVideogames;
  } catch (error) {
    console.log("Error en getApiInfo: ", error);
  }
};

const getDbInfo = async () => {
  try {
    return await Videogame.findAll({
      include: {
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
  } catch (error) {}
};

const getAllVideogames = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const infoTotal = apiInfo.concat(dbInfo);
  return infoTotal;
};

module.exports = getAllVideogames;
