import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

export default function LandingPage() {
  return (
    <div>
      <h1>Bienvenidos a mi Landinpage</h1>
      <Link to="/home">
        <button className="btn btn-primary">Mi botón de Bootstrap</button>
      </Link>
    </div>
  );
}
