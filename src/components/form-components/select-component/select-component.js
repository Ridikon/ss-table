import React from 'react';

import _ from 'lodash';

const SelectComponent = ({value, name, selectOptions, onSearch}) => {
  return (
    <select
      className="form-control form-control-sm"
      value={value}
      name={name}
      onChange={onSearch}
    >
      {_.map(selectOptions, ({name, value}) => <option key={value} value={value}>{name}</option>)}
    </select>
  );
};

export default SelectComponent;
