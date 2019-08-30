import React from 'react';

import DropdownBtn from '../../dropdown-btn';
import UserService from '../../../services/user-service'
import { CONST_LAST_COL_WIDTH } from '../../../constants'

import './table-head.scss'

const TableHead = ({ numberOfMonth, onChangeMonthNumber, tableHeadWidth }) => {
  const userService = new UserService();
  const months = userService.getMonth();
  const getYear = new Date().getFullYear();
  const monthColWidth = tableHeadWidth / numberOfMonth;

  const getMonthCol = (number) => {
    return months.map((item, i) => {
      if (i > number - 1) {
        return;
      }

      if (numberOfMonth > 8) {
        item = item.slice(0, 3)
      }

      if (i === 0) {
        return (
          <th
            key={item}
            className="column-month"
            style={{ width: `${monthColWidth}px` }}
          >
            <div className="text-center">
              <span>{item} {getYear}</span>
            </div>
          </th>
        )
      }

      return (
        <th
          key={item}
          className="column-month"
          style={{ width: `${monthColWidth}px` }}
        >
          <div
            className="text-center"
            style={{ borderLeft: '1px solid #000' }}
          >
            <span>{item} {getYear}</span>
          </div>
        </th>
      )
    });
  };

  return (
    <tr>
      <th style={{ width: '15%' }}>Full Name</th>
      <th style={{ width: '15%' }}>Deal</th>
      <th style={{ width: '120px' }}/>
      {getMonthCol(numberOfMonth)}
      <th style={{ width: `${CONST_LAST_COL_WIDTH}px` }}>
        <DropdownBtn
          onClickEvent={onChangeMonthNumber}
          numberOfMonth={numberOfMonth}
        >
          Filter
        </DropdownBtn>
      </th>
    </tr>
  );
};

export default TableHead;
