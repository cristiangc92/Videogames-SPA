import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./Card.css";

export default function Card({ name, image, genres }) {
  return (
    <div className="card">
      <h4>{name}</h4>
      <img src={image} alt="" />
      <h5>{genres.join(",  ")}</h5>
    </div>
  );
}
