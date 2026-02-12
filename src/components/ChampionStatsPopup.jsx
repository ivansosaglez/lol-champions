import React from 'react';

const ChampionStatsPopup = ({ champion, onClose }) => {
  if (!champion) return null;

  const { info, stats } = champion;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>

        <div className="modal-header">
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg`}
            alt={champion.name}
            className="modal-header-image"
          />
          <div className="modal-title-container">
            <h2>{champion.name}</h2>
            <h3>{champion.title}</h3>
          </div>
        </div>

        <div className="modal-body">
          <div className="stat-group">
            <h4>Combat Info</h4>
            <ul className="stat-list">
              <li><span>Attack</span> <span>{info.attack}</span></li>
              <li><span>Defense</span> <span>{info.defense}</span></li>
              <li><span>Magic</span> <span>{info.magic}</span></li>
              <li><span>Difficulty</span> <span>{info.difficulty}</span></li>
            </ul>
          </div>

          <div className="stat-group">
            <h4>Base Attributes</h4>
            <ul className="stat-list">
              <li><span>HP</span> <span>{stats.hp}</span></li>
              <li><span>MP</span> <span>{stats.mp}</span></li>
              <li><span>Attack Damage</span> <span>{stats.attackdamage}</span></li>
              <li><span>Attack Speed</span> <span>{stats.attackspeed}</span></li>
              <li><span>Move Speed</span> <span>{stats.movespeed}</span></li>
              <li><span>Armor</span> <span>{stats.armor}</span></li>
              <li><span>Spell Block</span> <span>{stats.spellblock}</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChampionStatsPopup;
