import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";

export default function Home() {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames);

  useEffect(() => {
    dispatch(getVideogames());
  }, []);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getVideogames());
  }

  return (
    <div>
      <Link to="/videogame">Crear Videojuego</Link>
      <h1>TITULO DE VIDEOJUEGOS SPA</h1>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Volver a cargar todos los videojuegos
      </button>
      <div>
        <select>
          <option disabled>Generos</option>
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

        <select>
          <option disabled>Origen</option>
          <option value="All">All</option>
          <option value="created">Created</option>
          <option value="api">Api</option>
        </select>

        <select>
          <option disabled>Orden</option>
          <option value="asc">A to Z</option>
          <option value="desc">Z to A</option>
        </select>

        <select>
          <option disabled>Rating</option>
          <option value="high">HIGH</option>
          <option value="low">LOW</option>
        </select>
      </div>
      {allVideogames?.map((v) => {
        return <Card name={v.name} image={v.image} genres={v.genres} />;
      })}
    </div>
  );
}
