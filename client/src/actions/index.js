import axios from "axios";

export function getVideogames() {
  return async function (dispatch) {
    const json = await axios.get("http://localhost:3001/videogames");
    return dispatch({
      type: "GET_VIDEOGAMES",
      payload: json.data,
    });
  };
}

export function filterVideogamesByGenre(payload) {
  return {
    type: "FILTER_BY_GENRE",
    payload,
  };
}

export function filterCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

export function orderByRating(payload) {
  return {
    type: "ORDER_BY_RATING",
    payload,
  };
}

export function getNameVideogames(name) {
  return async function (dispatch) {
    const json = await axios.get(
      "http://localhost:3001/videogames?name=" + name
    );
    return dispatch({
      type: "GET_NAME_VIDEOGAME",
      payload: json.data,
    });
  };
}
