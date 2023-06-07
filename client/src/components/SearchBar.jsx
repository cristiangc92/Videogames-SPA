import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameVideogames } from "../actions";
import "bootstrap/dist/css/bootstrap.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!name) {
      return alert("Debe ingresar un nombre");
    } else {
      dispatch(getNameVideogames(name));
      setName("");
      document.getElementById("search").value = "";
    }
  }

  return (
    <form className="d-flex" role="search">
      <input
        id="search"
        className="form-control me-2"
        type="search"
        placeholder="Search..."
        aria-label="Search"
        onChange={(e) => handleInputChange(e)}
      />
      <button
        type="button"
        className="btn btn-light"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={(e) => handleSubmit(e)}
      >
        Search
      </button>
    </form>
  );
}
