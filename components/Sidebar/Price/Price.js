import styles from "./Price.module.css"
import React, { useState } from 'react';

const LotNumberFilter = ({ onFilterChange }) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const handlePriceFromChange = (e) => {
    setFrom(e.target.value);
  };

  const handlePriceToChange = (e) => {
    setTo(e.target.value);
  };

  const handleApplyFilter = () => {
    // Here you can perform any additional filtering logic if needed
    // For now, we'll just pass the price range to the parent component
    onFilterChange({ from, to });
  };

  return (
      <>
          <h4>Ид лота</h4>
          <div className={styles["lot-number-filter-container"]}>
              <input
                  placeholder="от"
                  value={from}
                  onChange={handlePriceFromChange}
              />
              <input
                  placeholder="до"
                  value={to}
                  onChange={handlePriceToChange}
              />
          </div>
          <button className={styles.lotButton} onClick={handleApplyFilter}>Применить фильтр</button>
      </>
  );
};

export default LotNumberFilter;
