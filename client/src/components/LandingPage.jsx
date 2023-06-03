import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="fondo">
      <h1 className="titulo">Videogame SPA</h1>
      <Link to="/home">
        <button className="btn btn-secondary">INGRESAR</button>
      </Link>
    </div>
  );
}
