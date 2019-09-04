import React, { useState, useEffect } from 'react';

import _ from 'lodash';

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
  return _.filter(arr, item => {
    item.projects = _.filter(item.projects, project => getSearchResult(project, searchField, q));

    if (item.projects.length) {
      return item;
    }

    return null;
  });
}

function filterUsersData(arr, type, q) {
  let copyArr = JSON.parse(arr);

  copyArr = _.map(copyArr, item => {
    if (!item.projects.length) {
      const projectEmpty = {
        id: Math.random(),
        name: '',
        status: '',
        start: null,
        end: null,
        progress: null
      };

      item.projects.push(projectEmpty)
    }

    return item;
  });

  switch (type) {
    case 'name':
      return _.filter(copyArr, item => getSearchResult(item, type, q));
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
  const [searchType, setSearchType] = useState('');
  const [monthNumber, setMonthNumber] = useState(numberOfMonth);

  const oneDayWidth = progressColWidth / progressService.getDays(numberOfMonth);

  let visibleUsers = filterUsersData(JSON.stringify(usersState), searchType, term);

  useEffect(() => {
    setUsersState(userService.getUsers())
  }, []);

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

  const getProgressColWidth = (width) => {
    setProgressColWidth(width);
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
        <thead className="table-head">
          <TableHead
            onChangeMonthNumber={onChangeMonthNumber}
            numberOfMonth={monthNumber}
            oneDayWidth={oneDayWidth}
          />
          <TableFilter
            numberOfMonth={monthNumber}
            onFilter={onFilterEvent}
            onResetFilter={onResetFilter}
          />
        </thead>
        <tbody className="table-body">
          {_.map(visibleUsers, renderBodyRow)}
        </tbody>
      </table>
    </div>
  );
};

export default App;
