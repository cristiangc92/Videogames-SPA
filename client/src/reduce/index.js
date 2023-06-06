const initialState = {
  videogames: [],
  allVideogames: [],
};

function rootReduce(state = initialState, action) {
  switch (action.type) {
    case "GET_VIDEOGAMES":
      return {
        ...state,
        videogames: action.payload,
        allVideogames: action.payload,
      };

    case "FILTER_BY_GENRE":
      const allVideogames = state.allVideogames;
      const genreFiltered =
        action.payload === "All"
          ? allVideogames
          : allVideogames.filter((v) => v.genres?.includes(action.payload));
      return {
        ...state,
        videogames: genreFiltered,
      };
    default:
      return state;
  }
}

export default rootReduce;
