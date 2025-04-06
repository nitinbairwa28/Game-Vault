import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_KEY = "a9d2bf93b4b44650b38906e2462b62f4";
const API_URL = "https://api.rawg.io/api/games/";

const GameDetail = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inLibrary, setInLibrary] = useState(false);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const res = await fetch(`${API_URL}${id}?key=${API_KEY}`);
        const data = await res.json();
        setGame(data);

        const ssRes = await fetch(`${API_URL}${id}/screenshots?key=${API_KEY}`);
        const ssData = await ssRes.json();
        setScreenshots(ssData.results || []);

        const library = JSON.parse(localStorage.getItem("gameLibrary")) || [];
        setInLibrary(library.some(g => g.id === data.id));
      } catch (err) {
        console.error("Error fetching game details:", err);
        setGame(null);
      } finally {
        setLoading(false);
      }
    };

    fetchGameDetails();
  }, [id]);

  const toggleLibrary = () => {
    const library = JSON.parse(localStorage.getItem("gameLibrary")) || [];
    if (inLibrary) {
      const updated = library.filter(g => g.id !== game.id);
      localStorage.setItem("gameLibrary", JSON.stringify(updated));
      setInLibrary(false);
    } else {
      library.push({ id: game.id, name: game.name, background_image: game.background_image });
      localStorage.setItem("gameLibrary", JSON.stringify(library));
      setInLibrary(true);
    }
  };

  if (loading) return <div className="text-center skeleton-loader">Loading...</div>;
  if (!game) return <p className="text-danger text-center">Game not found.</p>;

  return (
    <div className="container mt-4 bg-white p-4 rounded shadow">
      <h2 className="mb-3">{game.name}</h2>

      <img
        src={game.background_image}
        alt={game.name}
        className="img-fluid rounded mb-3"
      />

      <button onClick={toggleLibrary} className={`btn ${inLibrary ? "btn-danger" : "btn-primary"} mb-3`}>
        {inLibrary ? "Remove from Library" : "Add to Library"}
      </button>

      <p>{game.description_raw || "No description available."}</p>

      <div className="my-3">
        <h5>Rating:</h5>
        <p>{game.rating} / 5 ({game.ratings_count} reviews)</p>
      </div>

      {game.metacritic && (
        <div className="my-3">
          <h5>Metacritic Score:</h5>
          <p>{game.metacritic}</p>
        </div>
      )}

      <div className="my-3">
        <h5>Pricing:</h5>
        <p>{game.stores?.length ? "Available for purchase" : "Not available for purchase"}</p>
      </div>

      {game.platforms && (
        <div className="my-3">
          <h5>System Requirements (PC):</h5>
          {game.platforms
            .filter(p => p.platform.name === "PC" && p.requirements)
            .map((p, index) => (
              <div key={index}>
                <p dangerouslySetInnerHTML={{ __html: p.requirements.minimum }}></p>
                <p dangerouslySetInnerHTML={{ __html: p.requirements.recommended }}></p>
              </div>
            ))}
        </div>
      )}

      {screenshots.length > 0 && (
        <div className="my-3">
          <h5>Screenshots:</h5>
          <div className="d-flex flex-wrap gap-3">
            {screenshots.map((ss) => (
              <img
                key={ss.id}
                src={ss.image}
                alt="screenshot"
                style={{ width: "250px", borderRadius: "8px" }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GameDetail;