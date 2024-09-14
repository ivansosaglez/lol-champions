import React from 'react';

const Pagination = ({ championsPerPage, totalChampions, paginate, currentPage }) => {
  const pageNumbers = [];

  // Calcular el número total de páginas
  for (let i = 1; i <= Math.ceil(totalChampions / championsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul style={{ display: 'flex', listStyle: 'none', justifyContent: 'center' }}>
        {pageNumbers.map((number) => (
          <li key={number} style={{ margin: '0 10px' }}>
            <button
              onClick={() => paginate(number)}
              style={{
                padding: '10px',
                backgroundColor: currentPage === number ? '#007bff' : '#fff',
                color: currentPage === number ? '#fff' : '#007bff',
                border: '1px solid #007bff',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
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
