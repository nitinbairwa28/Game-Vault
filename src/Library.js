
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Library = () => {
  const [library, setLibrary] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("gameLibrary")) || [];
    setLibrary(stored);
  }, []);

  return (
    <div className="container mt-4">
      <h2>Your Game Library</h2>
      {library.length === 0 ? (
        <p>No games in your library yet.</p>
      ) : (
        <div className="row">
          {library.map((game) => (
            <div className="col-md-4 mb-4" key={game.id}>
              <div className="card h-100">
                <img
                  src={game.background_image}
                  className="card-img-top"
                  alt={game.name}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{game.name}</h5>
                  <Link to={`/game/${game.id}`} className="btn btn-primary mt-auto">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Library;
