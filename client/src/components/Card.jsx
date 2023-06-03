import React from "react";

export default function Card({ name, image, genres }) {
  return (
    <div>
      <h3>{name}</h3>
      <img src={image} alt="" />
      <h3>{genres}</h3>
    </div>
  );
}
