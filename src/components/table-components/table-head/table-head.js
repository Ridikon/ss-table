import React from 'react';

import _ from 'lodash';

import DropdownBtn from '../../dropdown-btn';
import UserService from '../../../services/user-service'
import { CONST_LAST_COL_WIDTH } from '../../../constants'

import './table-head.scss'

const TableHead = ({ numberOfMonth, onChangeMonthNumber, oneDayWidth }) => {
  const userService = new UserService();
  const months = userService.getMonth();
  const year = new Date().getFullYear();

  const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  const setMonthWidth = (month) => {
    const monthDaysCount = getDaysInMonth(month + 1, year);
    return oneDayWidth * monthDaysCount
  };

  const monthCol = _.map(months, (month, i) => {
    if (i > numberOfMonth - 1) {
      return null;
    }

    if (numberOfMonth > 8) {
      month = _.slice(month, 0, 3).join('')
    }

    return (
      <th
        key={month}
        className="column-month"
        style={{ width: `${setMonthWidth(i)}px` }}
      >
        <div className="text-center">
          <span>{`${month} ${year}`}</span>
        </div>
      </th>
    )
  });

  return (
    <tr>
      <th style={{ width: '15%' }}>Full Name</th>
      <th style={{ width: '15%' }}>Deal</th>
      <th style={{ width: '120px' }}/>

      {monthCol}

      <th style={{ width: `${CONST_LAST_COL_WIDTH}px` }}>
        <div className="table-head-dropdown">
          <DropdownBtn
            onClickEvent={onChangeMonthNumber}
            numberOfMonth={numberOfMonth}
          >
            <i className="fa fa-sliders" aria-hidden="true"/>
          </DropdownBtn>
        </div>
      </th>
    </tr>
  );
};

export default TableHead;
