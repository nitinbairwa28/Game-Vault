import React from "react";

import { Link } from "react-router-dom";

const Header = ({ searchQuery, setSearchQuery }) => {
  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">GameVault</Link>
      <input
        type="text"
        className="form-control w-50"
        placeholder="Search games..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
<li className="nav-item">
  <Link className="nav-link text-light" to="/library">Library</Link>
</li>
</nav>
  );
};


export default Header;
