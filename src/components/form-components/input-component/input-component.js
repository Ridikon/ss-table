import React from 'react';

const InputComponent = ({value, name, placeholder, onSearch}) => {
  return (
    <input
      className="form-control form-control-sm"
      type="text"
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onSearch}
    />
  );
};

export default InputComponent;
