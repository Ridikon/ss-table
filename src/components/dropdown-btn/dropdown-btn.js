import React from 'react';

const DropdownBtn = ({ children, onChangeMonthNumber, numberOfMonth }) => {
  return (
    <div className="dropdown dropleft">
      <button className="btn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
              aria-expanded="false">
        {children}
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <label htmlFor="month">Month count:</label>
        <input
          className="form-control"
          id="month"
          type="number"
          name="number"
          value={numberOfMonth}
          onChange={(e) => onChangeMonthNumber(e.target.value)}
          max="12"
          min="1"
        />
      </div>
    </div>
  );
};

export default DropdownBtn;
