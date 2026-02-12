import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChampions } from './redux/championsSlice';
import Pagination from './components/Pagination'; // Import pagination component
import ChampionStatsPopup from './components/ChampionStatsPopup'; // Import stats popup component

import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const { champions, loading, error } = useSelector((state) => state.champions);

  // States for pagination and search
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [selectedChampion, setSelectedChampion] = useState(null); // State for selected champion
  const championsPerPage = 12; // Number of champions per page

  useEffect(() => {
    dispatch(fetchChampions());
  }, [dispatch]);

  // Get current champions
  const indexOfLastChampion = currentPage * championsPerPage;
  const indexOfFirstChampion = indexOfLastChampion - championsPerPage;

  // Filter champions by search term
  const filteredChampions = champions.filter((champion) =>
    champion.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get current champions after filtering
  const currentChampions = filteredChampions.slice(indexOfFirstChampion, indexOfLastChampion);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Function to open popup with champion stats
  const handleOpenPopup = (champion) => {
    setSelectedChampion(champion);
  };

  // Function to close popup
  const handleClosePopup = () => {
    setSelectedChampion(null);
  };

  if (loading) {
    return <p>Loading champions...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  console.log(champions);

  return (
    <div>
      <h1 className="lol-title">League of Legends Champions</h1>

      {/* Search Field */}
      <input
        type="text"
        placeholder="Search champion..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <ul className="champions-list">
        {currentChampions.map((champion) => (

          <li key={champion.id}>
            <div className="card">
              <img src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg`} alt={champion.name} className="champion-image" />
              <div className="card-content">
                <h2 className="champion-name">{champion.name}</h2>
                <p className="champion-title">{champion.title}</p>
                <p className="champion-tags">Tags: {champion.tags.join(", ")}</p>
                <button onClick={() => handleOpenPopup(champion)} className="stats-button">View Stats</button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Show message if no champions match the search */}
      {filteredChampions.length === 0 && <p>No champions found.</p>}

      {/* Pagination Component */}
      <Pagination
        championsPerPage={championsPerPage}
        totalChampions={filteredChampions.length} // Number of champions after filtering
        paginate={paginate}
        currentPage={currentPage}
      />

      {/* Champion stats popup */}
      {selectedChampion && (
        <ChampionStatsPopup champion={selectedChampion} onClose={handleClosePopup} />
      )}

    </div>
  );
};

export default App;
