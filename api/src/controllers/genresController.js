const axios = require("axios");
const API_KEY = process.env;
const { Genre } = require("../db");

const getGenres = async () => {
  try {
    const genresApi = await axios.get(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    );
    const genresTotal = genresApi.data.results?.map((g) => g.name);
    genresTotal.forEach((el) => {
      Genre.findOrCreate({
        where: { name: el },
      });
    });
  } catch (error) {
    console.log("Error en getGenres: ", error);
  }
};
