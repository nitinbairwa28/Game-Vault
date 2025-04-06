import React from "react";

const Pagination = ({ page, setPage }) => {
  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    setPage(page + 1);
  };

  return (
    <div className="d-flex justify-content-center my-4">
      <button className="btn btn-outline-primary me-2" onClick={handlePrevious} disabled={page === 1}>
        Previous
      </button>
      <span className="align-self-center">Page {page}</span>
      <button className="btn btn-outline-primary ms-2" onClick={handleNext}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
