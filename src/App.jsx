import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChampions } from './redux/championsSlice';
import Pagination from './components/Pagination'; // Importa el componente de paginación
import ChampionStatsPopup from './components/ChampionStatsPopup'; // Importa el popup de estadísticas

import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const { champions, loading, error } = useSelector((state) => state.champions);
  
  // Estados para la paginación y la búsqueda
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
  const [selectedChampion, setSelectedChampion] = useState(null); // Estado para el campeón seleccionado
  const championsPerPage = 12; // Número de campeones por página

  useEffect(() => {
    dispatch(fetchChampions());
  }, [dispatch]);

  // Obtener los campeones de la página actual
  const indexOfLastChampion = currentPage * championsPerPage;
  const indexOfFirstChampion = indexOfLastChampion - championsPerPage;

  // Filtrar campeones por el término de búsqueda
  const filteredChampions = champions.filter((champion) =>
    champion.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Obtener los campeones de la página actual después de filtrar
  const currentChampions = filteredChampions.slice(indexOfFirstChampion, indexOfLastChampion);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Función para abrir el popup con las estadísticas del campeón
  const handleOpenPopup = (champion) => {
    setSelectedChampion(champion);
  };

  // Función para cerrar el popup
  const handleClosePopup = () => {
    setSelectedChampion(null);
  };

  if (loading) {
    return <p>Cargando campeones...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  console.log(champions);

  return (
    <div>
      <h1 className="lol-title">League of Legends Champions</h1>

      {/* Campo de búsqueda */}
      <input
        type="text"
        placeholder="Buscar campeón..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: '10px', marginBottom: '20px', width: '300px' }}
      />

      <ul className="champions-list">
        {currentChampions.map((champion) => (

          <li key={champion.id}>
            <div className="card">
              <img src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg`} alt={champion.name} className="champion-image" />
              <div className="card-content">
                  <h2 className="champion-name">{champion.name}</h2>
                  <p className="champion-description">{champion.title}</p>
                  <p className="champion-tags">Tags: {champion.tags.join(", ")}</p>
                  <a onClick={() => handleOpenPopup(champion)} href="#" className="stats-button">Ver estadísticas</a>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Mostrar mensaje si no hay campeones que coincidan con la búsqueda */}
      {filteredChampions.length === 0 && <p>No se encontraron campeones.</p>}

      {/* Componente de Paginación */}
      <Pagination
        championsPerPage={championsPerPage}
        totalChampions={filteredChampions.length} // Número de campeones después de filtrar
        paginate={paginate}
        currentPage={currentPage}
      />

      {/* Popup de estadísticas del campeón */}
      {selectedChampion && (
        <ChampionStatsPopup champion={selectedChampion} onClose={handleClosePopup} />
      )}

    </div>
  );
};

export default App;
