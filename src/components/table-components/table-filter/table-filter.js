import React, { useState } from 'react';

import './table-filter.scss'

import InputComponent from '../../form-components/input-component';
import SelectComponent from '../../form-components/select-component';
import { CONST_LAST_COL_WIDTH } from '../../../constants'

const selectOptions = [
  {name: 'Status', value: ''},
  {name: 'Billable', value: 'billable'},
  {name: 'Vacation', value: 'vacation'},
  {name: 'Internal', value: 'internal'},
  {name: 'Potential', value: 'potential'},
];

const Filter = ({ numberOfMonth, onFilter, onResetFilter }) => {
  const [nameInput, setNameInput] = useState('');
  const [dealInput, setDealInput] = useState('');
  const [statusSelect, setStatusSelect] = useState('');

  const onSearchChange = ({ target: { value, name } }) => {
    onReset();
    switch (name) {
      case 'name':
        setNameInput(value);
        break;
      case 'deal':
        setDealInput(value);
        break;
      case 'status':
        setStatusSelect(value);
        break;
      default:
        return;
    }
    onFilter(value, name)
  };

  const onReset = () => {
    setNameInput('');
    setDealInput('');
    setStatusSelect('');
    onResetFilter();
  };

  return (
    <tr>
      <th>
        <InputComponent
          value={nameInput}
          name="name"
          placeholder="Title"
          onSearch={onSearchChange}
        />
      </th>
      <th>
        <InputComponent
          value={dealInput}
          name="deal"
          placeholder="Title"
          onSearch={onSearchChange}
        />
      </th>
      <th>
        <SelectComponent
          value={statusSelect}
          name="status"
          selectOptions={selectOptions}
          onSearch={onSearchChange}
        />
      </th>
      <th colSpan={numberOfMonth}/>
      <th className="text-right filter-reset-col" style={{ width: `${CONST_LAST_COL_WIDTH}px` }}>
        <span className="filter-reset-btn" onClick={onReset}>
          Reset
        </span>
      </th>
    </tr>
  );
};

export default Filter;
