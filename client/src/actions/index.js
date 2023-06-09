import axios from "axios";

export function getVideogames() {
  return async function (dispatch) {
    const json = await axios.get("/videogames");
    console.log("JSON: ", json.data);
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
    const json = await axios.get("/videogames?name=" + name);
    return dispatch({
      type: "GET_NAME_VIDEOGAME",
      payload: json.data,
    });
  };
}

export function getGenres() {
  return async function (dispatch) {
    const json = await axios.get("/genres");
    return dispatch({
      type: "GET_GENRES",
      payload: json.data,
    });
  };
}

export function postVideogame(payload) {
  return async function (dispatch) {
    const json = await axios.post("/videogame", payload);
    return dispatch({
      type: "POST_VIDEOGAME",
      payload: json,
    });
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    const json = await axios.get("/videogame/" + id);
    return dispatch({
      type: "GET_DETAILS",
      payload: json.data,
    });
  };
}

export function vaciarDetail() {
  return {
    type: "VACIAR_DETAIL",
  };
}
