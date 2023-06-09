import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postVideogame, getGenres, getVideogames } from "../actions";
import { Link } from "react-router-dom";
import "./VideogameCreate.css";
import "bootstrap/dist/css/bootstrap.css";

export default function VideogameCreate() {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
  const videogames = useSelector((state) => state.videogames);

  const platformsArr = [
    "PC",
    "PlayStation 5",
    "Xbox One",
    "PlayStation 4",
    "Xbox Series S/X",
    "Nintendo Switch",
    "iOS",
    "Android",
    "Nintendo 3DS",
    "Nintendo DS",
    "Nintendo DSi",
    "macOS",
    "Linux",
    "Xbox 360",
    "Xbox",
    "PlayStation 3",
    "PlayStation 2",
    "PlayStation",
    "PS Vita",
    "PSP",
    "Wii U",
    "Wii",
    "GameCube",
    "Nintendo 64",
    "Game Boy Advance",
    "Game Boy Color",
    "Game Boy",
    "SNES",
    "NES",
    "Classic Macintosh",
    "Apple II",
    "Commodore / Amiga",
    "Atari 7800",
    "Atari 5200",
    "Atari 2600",
    "Atari Flashback",
    "Atari 8-bit",
    "Atari ST",
    "Atari Lynx",
    "Atari XEGS",
    "Genesis",
    "SEGA Saturn",
    "SEGA CD",
    "SEGA 32X",
    "SEGA Master System",
    "Dreamcast",
    "3DO",
    "Jaguar",
    "Game Gear",
    "Neo Geo",
  ];

  const [input, setInput] = useState({
    name: "",
    image: "",
    description: "",
    released: "",
    rating: "",
    genres: [],
    platforms: [],
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
      [e.target.description]: e.target.value,
      [e.target.released]: e.target.value,
      [e.target.rating]: e.target.value,
      [e.target.image]: e.target.value,
    });
  }

  function handleSelect(e) {
    setInput({
      ...input,
      genres: input.genres.includes(e.target.value)
        ? input.genres
        : [...input.genres, e.target.value],
    });
  }

  function handleSelect2(e) {
    setInput({
      ...input,
      platforms: input.platforms.includes(e.target.value)
        ? input.platforms
        : [...input.platforms, e.target.value],
    });
  }

  function handleDelete(e) {
    setInput({
      ...input,
      genres: input.genres.filter((g) => g !== e),
    });
  }

  function handleDelete2(e) {
    setInput({
      ...input,
      platforms: input.platforms.filter((p) => p !== e),
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (input.name.trim() === "") {
      return alert("Debe ingresar un nombre.");
    } else if (
      videogames.find(
        (e) => e.name.toLowerCase().trim() === input.name.toLowerCase().trim()
      )
    ) {
      return alert(`El nombre ${input.name} ya existe.`);
    } else if (input.description.trim() === "") {
      return alert("Descripción requerida.");
    } else if (input.released.trim() === "") {
      return alert("Fecha de lanzamiento requerida.");
    } else if (input.released < "1951-05-03") {
      return alert("Fecha de lanzamiento no puede ser menor a 03/05/1951.");
    } else if (
      input.rating.trim() === "" ||
      input.rating < 1 ||
      input.rating > 10
    ) {
      return alert("Coloca un Puntaje del 1 al 10.");
    } else if (input.genres.length === 0) {
      return alert("Coloca uno o más Generos.");
    } else if (input.platforms.length === 0) {
      return alert("Coloca una o más Plataformas.");
    } else {
      dispatch(postVideogame(input));
      alert("Videojuego creado con exito!!");
      setInput({
        name: "",
        image: "",
        description: "",
        released: "",
        rating: "",
        genres: [],
        platforms: [],
      });
      document.getElementById("formulario").reset();
    }
  }

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getVideogames());
  }, [dispatch]);

  return (
    <div className="fondoCreate">
      <div className="contenedorForm">
        <form
          id="formulario"
          className="row g-3 justify-content-center m-4 pb-3 backgroundForm"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="col-md-5">
            <label htmlFor="validationDefault01" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="validationDefault01"
              value={input.name}
              name="name"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="col-md-5">
            <label htmlFor="validationDefault02" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="validationDefault02"
              value={input.description}
              name="description"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="col-md-5">
            <label htmlFor="validationDefault03" className="form-label">
              Released
            </label>
            <input
              type="date"
              className="form-control"
              id="validationDefault03"
              value={input.released}
              name="released"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="col-md-5">
            <label htmlFor="validationDefault04" className="form-label">
              Rating
            </label>
            <input
              type="number"
              className="form-control"
              id="validationDefault04"
              value={input.rating}
              name="rating"
              placeholder="0"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="col-md-5">
            <label htmlFor="validationDefault06" className="form-label">
              Genres
            </label>
            <select
              className="form-select mb-1"
              id="validationDefault06"
              defaultValue="Choose"
              onChange={(e) => handleSelect(e)}
            >
              <option disabled value="Choose">
                Choose...
              </option>
              {genres?.map((g) => (
                <option value={g} key={g}>
                  {g}
                </option>
              ))}
            </select>
            <ul className="list-group justify-content-center list-group-horizontal">
              <li className="list-group-item p-1">
                {input.genres?.map((g) => (
                  <div key={g}>
                    {g + " "}
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm buttonClose"
                      onClick={() => handleDelete(g)}
                    >
                      X
                    </button>
                  </div>
                ))}
              </li>
            </ul>
          </div>
          <div className="col-md-5">
            <label htmlFor="validationDefault07" className="form-label">
              Platforms
            </label>
            <select
              className="form-select mb-1"
              id="validationDefault07"
              onChange={(e) => handleSelect2(e)}
              defaultValue="Choose"
            >
              <option disabled value="Choose">
                Choose...
              </option>
              {platformsArr?.map((p) => (
                <option value={p} key={p}>
                  {p}
                </option>
              ))}
            </select>
            <ul className="list-group justify-content-center list-group-horizontal">
              <li className="list-group-item p-1">
                {input.platforms?.map((p) => (
                  <div key={p}>
                    {p + " "}
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm buttonClose"
                      onClick={() => handleDelete2(p)}
                    >
                      X
                    </button>
                  </div>
                ))}
              </li>
            </ul>
          </div>
          <div className="col-md-5">
            <label htmlFor="validationDefault05" className="form-label">
              Image
            </label>
            <input
              type="text"
              className="form-control"
              id="validationDefault05"
              value={input.image}
              name="image"
              placeholder="URL"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="col-12 d-flex justify-content-center">
            <button className="btn btn-light" type="submit">
              Create Videogame ✓
            </button>
          </div>
          <div className="col-12 d-flex justify-content-center">
            <Link to={"/home"}>
              <a className="nav-link active" aria-current="page">
                <button type="button" className="btn btn-light">
                  ◁ Volver
                </button>
              </a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
