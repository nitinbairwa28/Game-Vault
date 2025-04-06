import React from "react";
import { Link } from "react-router-dom";

const GameList = ({ games }) => {
  return (
    <div className="row">
      {games.map((game) => (
        <div key={game.id} className="col-sm-6 col-md-4 mb-4">
          <div className="card h-100">
            <img src={game.background_image} className="card-img-top" alt={game.name} />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">{game.name}</h5>
              <p className="card-text">{game.genres?.map((g) => g.name).join(", ") || "Unknown Genre"}</p>
              <Link to={`/game/${game.id}`} className="btn btn-outline-primary mt-auto">Details</Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GameList;
