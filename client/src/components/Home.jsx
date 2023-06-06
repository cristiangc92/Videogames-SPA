import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames, filterVideogamesByGenre } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import "bootstrap/dist/css/bootstrap.css";
import "./Home.css";
import Paginado from "./Paginado";

export default function Home() {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames);
  const [currentPage, setCurrentPage] = useState(1);
  const [videogamesPerPage, setVideogamesPerPage] = useState(15);
  const indexOfLastVideogame = currentPage * videogamesPerPage;
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
  const currentVideogames = allVideogames?.slice(
    indexOfFirstVideogame,
    indexOfLastVideogame
  );
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getVideogames());
  }, []);

  function handleFilterGenre(e) {
    dispatch(filterVideogamesByGenre(e.target.value));
  }

  return (
    <div className="fondoHome">
      <nav className="navbar navbar-expand-lg bg-secondary">
        <div className="container-fluid justify-content-center">
          <button
            className="navbar-toggler ps-5 pe-5"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarNavDropdown"
          >
            <ul className="navbar-nav">
              <li className="nav-item me-5 ms-3">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/videogame"
                >
                  <button type="button" className="btn btn-light">
                    Crear Videojuego
                  </button>
                </a>
              </li>
              <li className="nav-item me-5 ms-3">
                <select
                  className="form-select mt-2 pb-1 pe-3"
                  aria-label="Default select example"
                  defaultValue="Generos"
                  onChange={(e) => handleFilterGenre(e)}
                >
                  <option>Generos</option>
                  <option value="All">All</option>
                  <option value="Action">Action</option>
                  <option value="Indie">Indie</option>
                  <option value="Adventure">Adventure</option>
                  <option value="RPG">RPG</option>
                  <option value="Strategy">Strategy</option>
                  <option value="Shooter">Shooter</option>
                  <option value="Puzzle">Puzzle</option>
                  <option value="Casual">Casual</option>
                  <option value="Simulation">Simulation</option>
                  <option value="Arcade">Arcade</option>
                  <option value="Platformer">Platformer</option>
                  <option value="Racing">Racing</option>
                  <option value="Massively Multiplayer">Multiplayer</option>
                  <option value="Sports">Sports</option>
                  <option value="Fighting">Fighting</option>
                  <option value="Family">Family</option>
                  <option value="Educational">Educational</option>
                  <option value="Card">Card</option>
                </select>
              </li>
              <li className="nav-item me-5 ms-3">
                <select
                  className="form-select mt-2 pb-1"
                  aria-label="Default select example"
                  defaultValue="Origen"
                >
                  <option>Origen</option>
                  <option value="All">All</option>
                  <option value="created">Created</option>
                  <option value="api">Api</option>
                </select>
              </li>
              <li className="nav-item me-5 ms-3">
                <select
                  className="form-select mt-2 pb-1"
                  aria-label="Default select example"
                  defaultValue="Orden"
                >
                  <option>Orden</option>
                  <option value="asc">A to Z</option>
                  <option value="desc">Z to A</option>
                </select>
              </li>
              <li className="nav-item me-5 ms-3">
                <select
                  className="form-select mt-2 pb-1"
                  aria-label="Default select example"
                  defaultValue="Rating"
                >
                  <option>Rating</option>
                  <option value="high">HIGH</option>
                  <option value="low">LOW</option>
                </select>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Paginado
        videogamesPerPage={videogamesPerPage}
        allVideogames={allVideogames.length}
        paginado={paginado}
      />

      <div className="card_contenedor">
        {currentVideogames?.map((v) => {
          return (
            <Card key={v.id} name={v.name} image={v.image} genres={v.genres} />
          );
        })}
      </div>
    </div>
  );
}
