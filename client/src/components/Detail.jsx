import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, vaciarDetail } from "../actions";
import { useParams } from "react-router-dom";
import "./Detail.css";

export default function Detail(props) {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetail(id));
    return function () {
      dispatch(vaciarDetail());
    };
  }, [dispatch, id]);

  const myVideogame = useSelector((state) => state.detail);

  return (
    <div className="fondoDetail">
      {myVideogame ? (
        <div className="contenedorDetail">
          <h1>{myVideogame.name}</h1>
          <div className="containerFlex">
            <img className="imageDetail" src={myVideogame.image} alt="" />
            <div>
              <h4>
                <span>📆 Released:</span> {myVideogame.released}{" "}
              </h4>
              <h4>
                <span>🎮 Platforms:</span> {myVideogame.platforms?.join(",  ")}
              </h4>
              <h4>
                <span>🔹 Genres:</span> {myVideogame.genres?.join(",  ")}
              </h4>
              <h4>
                <span>⭐ Rating:</span> {myVideogame.rating}
              </h4>
            </div>
          </div>
          <h4>
            <span>📜 Description:</span>{" "}
          </h4>
          <h5 dangerouslySetInnerHTML={{ __html: myVideogame.description }} />
          <a href="/home">
            <button type="button" className="btn btn-light">
              ◁ Volver
            </button>
          </a>
        </div>
      ) : (
        <br />
      )}
    </div>
  );
}
