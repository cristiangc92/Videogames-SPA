const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;
const axios = require("axios");

const getApiInfo = async () => {
  try {
    const promises = [];
    const arrVideogames = [];
    for (let i = 1; i < 7; i++) {
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
    const infoDb = await Videogame.findAll({
      include: {
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    const mapInfoDb = infoDb?.map((e) => {
      return {
        id: e.id,
        name: e.name,
        image: e.image,
        genres: e.genres?.map((e) => e.name),
        description: e.description,
        released: e.released,
        rating: e.rating,
        plataforms: e.platforms?.map((el) => el),
        createdInDb: e.createdInDb,
      };
    });
    return mapInfoDb;
  } catch (error) {}
};

const getAllVideogames = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const infoTotal = apiInfo.concat(dbInfo);
  return infoTotal;
};

module.exports = getAllVideogames;
