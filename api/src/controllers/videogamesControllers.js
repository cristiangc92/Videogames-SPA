const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;
const axios = require("axios");

const getApiInfo = async () => {
  try {
    const apiUrl1 = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&page=1`
    );
    const apiUrl2 = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&page=2`
    );
    const apiUrl3 = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&page=3`
    );
    const apiUrl4 = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&page=4`
    );
    const apiUrl5 = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&page=5`
    );
    const apiUrlTotal = apiUrl1.data.results.concat(
      apiUrl2.data.results,
      apiUrl3.data.results,
      apiUrl4.data.results,
      apiUrl5.data.results
    );
    const apiInfo = await apiUrlTotal?.map((el) => {
      return {
        id: el.id,
        name: el.name,
        image: el.background_image,
        released: el.released,
        rating: el.rating,
        platforms: el.platforms?.map((p) => p.name),
        genres: el.genres?.map((g) => g.name),
      };
    });
    return apiInfo;
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
