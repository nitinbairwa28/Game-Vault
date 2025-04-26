import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header.js";
import GameList from "./components/gamelist.js";
import GameDetail from "./components/gamedetail.js";
import Pagination from "./components/pagination.js";
import Filters from "./components/components.js";
import Library from "./Library";

const API_KEY = "your_api_key";
const API_URL = "https://api.rawg.io/api/games";

const App = () => {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      setError(null);
      try {
        const category = filters.category || "";
        const year = filters.releaseYear || "";
        const res = await fetch(`${API_URL}?key=${API_KEY}&page=${page}&search=${searchQuery}&genres=${category}&dates=${year}`);
        const data = await res.json();
        if (data.results) {
          setGames(data.results);
        } else {
          throw new Error("No games found");
        }
      } catch (err) {
        setError(err.message);
        setGames([]);
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, [page, searchQuery, filters]);

  return (
    <Router>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-3">
            <Filters filters={filters} setFilters={setFilters} />
          </div>
          <div className="col-md-9">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                  {loading ? <div className="skeleton-loader">Loading games...</div> : null}
                  {error && <p className="text-danger">{error}</p>}
                  {!loading && !error && <GameList games={games} />}
                  {!loading && !error && <Pagination page={page} setPage={setPage} />}
                </>
                }
              />
              <Route path="/game/:id" element={<GameDetail />} />
              <Route path="/library" element={<Library />} />
            </Routes>
            {/* <Pagination page={page} setPage={setPage} /> */}
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
