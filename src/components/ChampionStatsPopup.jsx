import React, { useEffect, useState } from 'react';

const ChampionStatsPopup = ({ champion, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);

  // Mostrar la animación cuando el componente se monta
  useEffect(() => {
    setIsVisible(true); // Cambiamos el estado para activar la animación
  }, []);

  if (!champion) return null;

  const { info, stats } = champion;

  return (
    <div style={styles.overlay}>
      <div className="champion-popup" style={{
        ...styles.popup,
        transform: isVisible ? 'translateY(0)' : 'translateY(-6%)', // Animación de "Move from top"
        opacity: isVisible ? 1 : 0, // También aplicamos una transición de opacidad
      }}>
        <img src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg`} alt={champion.name} className="champion-image" />
        <h2>{champion.name} - {champion.title}</h2>
        <h3>Stats</h3>
        <ul className="stats-popup">
          <li>Attack: {info.attack}</li>
          <li>Defense: {info.defense}</li>
          <li>Magic: {info.magic}</li>
          <li>Difficulty: {info.difficulty}</li>
        </ul>
        <h3>Attributes</h3>
        <ul className="atts-popup">
          <li>HP: {stats.hp}</li>
          <li>MP: {stats.mp}</li>
          <li>DMG Attack: {stats.attackdamage}</li>
          <li>Attack Speed: {stats.attackspeed}</li>
          <li>Move speed: {stats.movespeed}</li>
          <li>Armor: {stats.armor}</li>
          <li>Spell block: {stats.spellblock}</li>
        </ul>
        <button onClick={onClose} style={styles.closeButton}>Cerrar</button>
      </div>
    </div>
  );
};

// Estilos mejorados para el popup
const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    popup: {
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '10px',
      width: '450px',
      textAlign: 'center',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
      transition: 'transform 0.5s ease-out, opacity 0.5s ease-out',
      transform: 'translateY(-100%)',
      opacity: 0,
    },
    championName: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '10px',
    },
    championTitle: {
      fontSize: '18px',
      color: '#666',
      marginBottom: '20px',
    },
    statsContainer: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    section: {
      width: '45%',
    },
    sectionTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#333',
      borderBottom: '2px solid #007bff',
      paddingBottom: '5px',
      marginBottom: '10px',
    },
    statsList: {
      listStyleType: 'none',
      padding: 0,
      fontSize: '16px',
      color: '#555',
    },
    statValue: {
      fontWeight: 'bold',
      color: '#007bff',
    },
    closeButton: {
      marginTop: '20px',
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'background-color 0.3s',
    },
    closeButtonHover: {
      backgroundColor: '#0056b3',
    },
  };

export default ChampionStatsPopup;
