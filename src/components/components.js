import React from "react";

const Filters = ({ filters, setFilters }) => {
  return (
    <div className="p-3 bg-light">
      <h5>Filters</h5>
      <select 
        className="form-control mb-2" 
        onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
      >
        <option value="">Select Category</option>
        <option value="action">Action</option>
        <option value="adventure">Adventure</option>
      </select>

      <select 
        className="form-control" 
        onChange={(e) => setFilters(prev => ({ ...prev, releaseYear: e.target.value }))}
      >
        <option value="">Release Year</option>
        <option value="2023">2023</option>
        <option value="2022">2022</option>
      </select>
    </div>
  );
};


export default Filters;
