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

    case "FILTER_CREATED":
      const allVideogames2 = state.allVideogames;
      const createdFilter =
        action.payload === "created"
          ? allVideogames2.filter((v) => v.createdInDb === true)
          : allVideogames2.filter((v) => v.createdInDb !== true);
      return {
        ...state,
        videogames:
          action.payload === "All" ? state.allVideogames : createdFilter,
      };

    default:
      return state;
  }
}

export default rootReduce;
