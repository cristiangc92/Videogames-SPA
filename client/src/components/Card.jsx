import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./Card.css";

export default function Card({ name, image, genres, rating }) {
  return (
    <div className="card">
      <h4>{name}</h4>
      <img src={image} alt="" />
      <h5>
        <span>◊ Genres:</span> {genres.join(",  ")}
      </h5>
      <h5>
        <span>☆ Rating:</span> {rating}
      </h5>
    </div>
  );
}
