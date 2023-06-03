const initialState = {
  videogames: [],
};

function rootReduce(state = initialState, action) {
  switch (action.type) {
    case "GET_VIDEOGAMES":
      return {
        ...state,
        videogames: action.payload,
      };
    default:
      return state;
  }
}

export default rootReduce;
