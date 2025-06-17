import React from 'react';
import styles from './ToggleCard.module.css';

export function ToggleCard({ enabled, onToggle }) {
  const handleToggle = (e) => {
    onToggle(e.target.checked);
  };

  return (
    <div className={styles.toggleCard}>
      <div className={styles.toggleInfo}>
        <h3>Provide starter code</h3>
        <p>Give candidates a basic code template to get started faster</p>
      </div>
      <label className={styles.toggleSwitch}>
        <input
          type="checkbox"
          checked={enabled}
          onChange={handleToggle}
        />
        <span className={styles.toggleSlider}></span>
      </label>
    </div>
  );
}

export default ToggleCard;