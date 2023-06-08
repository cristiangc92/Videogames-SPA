import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getVideogames,
  filterVideogamesByGenre,
  filterCreated,
  orderByName,
  orderByRating,
} from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import "bootstrap/dist/css/bootstrap.css";
import "./Home.css";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";

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

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    dispatch(getVideogames())
      .then((response) => {
        setLoading(false);
      })
      .catch((error) => setError(error.message));
  }, []);

  function handleFilterGenre(e) {
    dispatch(filterVideogamesByGenre(e.target.value));
    setCurrentPage(1);
  }

  function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value));
    setCurrentPage(1);
  }

  const [orden, setOrden] = useState("");

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(e.target.value);
  }

  function handleSort2(e) {
    e.preventDefault();
    dispatch(orderByRating(e.target.value));
    setCurrentPage(1);
    setOrden(e.target.value);
  }

  return (
    <div className="fondoHome">
      {error ? (
        <div>
          <h1>{error}</h1>
        </div>
      ) : loading ? (
        <div className="loadingFlex">
          <div
            className="spinner-border text-secondary"
            style={{ width: "5rem", height: "5rem" }}
            role="status"
          ></div>
          <strong className="text-secondary mt-2">Loading...</strong>
        </div>
      ) : (
        <div>
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
                  <li className="nav-item">
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
                  <li className="nav-item me-2">
                    <select
                      className="form-select mt-2 pb-1 pe-3"
                      aria-label="Default select example"
                      defaultValue="Generos"
                      onChange={(e) => handleFilterGenre(e)}
                    >
                      <option value="All">Generos</option>
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
                  <li className="nav-item me-2">
                    <select
                      className="form-select mt-2 pb-1"
                      aria-label="Default select example"
                      defaultValue="Origen"
                      onChange={(e) => handleFilterCreated(e)}
                    >
                      <option value="All">Origen</option>
                      <option value="All">All</option>
                      <option value="created">Created</option>
                      <option value="api">Api</option>
                    </select>
                  </li>
                  <li className="nav-item me-2">
                    <select
                      className="form-select mt-2 pb-1"
                      aria-label="Default select example"
                      defaultValue="Orden"
                      onChange={(e) => handleSort(e)}
                    >
                      <option>Orden</option>
                      <option value="asc">A to Z</option>
                      <option value="desc">Z to A</option>
                    </select>
                  </li>
                  <li className="nav-item me-2 mb-2">
                    <select
                      className="form-select mt-2 pb-1"
                      aria-label="Default select example"
                      defaultValue="Rating"
                      onChange={(e) => handleSort2(e)}
                    >
                      <option>Rating</option>
                      <option value="high">High</option>
                      <option value="low">Low</option>
                    </select>
                  </li>
                </ul>
                <SearchBar />
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
                <div className="link" key={v.id}>
                  <Link to={"/home/" + v.id} key={v.id} className="link2">
                    <Card
                      key={v.id}
                      name={v.name}
                      image={v.image}
                      genres={v.genres}
                      rating={v.rating}
                    />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
