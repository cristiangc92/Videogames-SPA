import React from "react";

export default function Paginado({
  videogamesPerPage,
  allVideogames,
  paginado,
}) {
  const pageNumbers = [];
  for (let i = 0; i < Math.ceil(allVideogames / videogamesPerPage); i++) {
    pageNumbers.push(i + 1);
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center mt-3">
        {pageNumbers?.map((number) => (
          <li className="page-item" key={number}>
            <a
              className="page-link text-secondary"
              onClick={() => paginado(number)}
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
