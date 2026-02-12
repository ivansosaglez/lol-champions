import React from 'react';

const Pagination = ({ championsPerPage, totalChampions, paginate, currentPage }) => {
  const pageNumbers = [];

  // Calculate total page numbers
  for (let i = 1; i <= Math.ceil(totalChampions / championsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination-nav">
      <ul className="pagination-list">
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`pagination-btn ${currentPage === number ? 'active' : ''}`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
