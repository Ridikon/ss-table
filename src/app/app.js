import React, { useState, useEffect } from 'react';

import UserService from '../services/user-service'
import ProgressService from '../services/progress-service';
import TableRow from '../components/table-components/table-row';
import TableHead from '../components/table-components/table-head';
import TableFilter from '../components/table-components/table-filter';

import './app.scss'

function getSearchResult(item, field, q) {
  return item[field].toLowerCase().includes(q.toLowerCase())
}

function search(arr, searchField, q) {
  return arr.filter(item => {
    item.projects = item.projects.filter(project => getSearchResult(project, searchField, q));
    return item;
  });
}

function filterUsersData(arr, type, q) {
  const copyArr = JSON.parse(arr);

  switch (type) {
    case 'name':
      return copyArr.filter(item => getSearchResult(item, 'name', q));
    case 'deal':
      return search(copyArr, 'name', q);
    case 'status':
      return search(copyArr, 'status', q);
    default:
      return copyArr;
  }
}

const userService = new UserService();
const progressService = new ProgressService();
const numberOfMonth = 12;

const App = () => {
  const [usersState, setUsersState] = useState([]);
  const [term, setTerm] = useState('');
  const [progressColWidth, setProgressColWidth] = useState(0);
  const [todayPosition, setTodayPosition] = useState(0);
  const [searchType, setSearchType] = useState('');
  const [monthNumber, setMonthNumber] = useState(numberOfMonth);

  const visibleUsers = filterUsersData(JSON.stringify(usersState), searchType, term);

  useEffect(() => {
    getTodayPosition();
    setUsersState(userService.getUsers())
  }, [progressColWidth, todayPosition]);

  const getTodayPosition = () => {
    const oneDayWidth = progressColWidth / progressService.getDays(numberOfMonth);
    const todayPosition = oneDayWidth * progressService.getPositionDay(new Date());
    setTodayPosition(todayPosition)
  };

  const getProgressColWidth = (width) => {
    setProgressColWidth(width);
  };

  const renderBodyRow = (user) => {
    return (
      <TableRow
        key={user.id}
        user={user}
        numberOfMonth={monthNumber}
        getProgressColWidth={getProgressColWidth}
      />
    )
  };

  const onFilterEvent = (q, type) => {
    setTerm(q);
    setSearchType(type);
  };

  const onResetFilter = () => {
    setTerm('');
    setSearchType('');
  };

  const onChangeMonthNumber = (monthNumber) => {
    setMonthNumber(monthNumber)
  };

  return (
    <div className="table-responsive-md">
      <table className="table table-sm">
        <thead>
        <TableHead
          onChangeMonthNumber={onChangeMonthNumber}
          numberOfMonth={monthNumber}
          tableHeadWidth={progressColWidth}
        />
        <TableFilter
          numberOfMonth={monthNumber}
          onFilter={onFilterEvent}
          onResetFilter={onResetFilter}
        />
        </thead>
        <tbody>
        {visibleUsers.map(renderBodyRow)}
        </tbody>
      </table>
    </div>
  );
};

export default App;
