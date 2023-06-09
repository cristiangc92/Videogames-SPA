import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./LandingPage.css";

export default function LandingPage() {
  alert(process.env.REACT_APP_API);
  return (
    <div className="fondo">
      <h1 className="titulo">Videogames SPA</h1>
      <Link to="/home">
        <button className="btn btn-secondary">INGRESAR</button>
      </Link>
    </div>
  );
}
