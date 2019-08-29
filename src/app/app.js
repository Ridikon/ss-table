import React, { useState } from 'react';

import UserService from '../services/user-service'
import TableRow from '../components/table-components/table-row';
import TableHead from '../components/table-components/table-head';
import TableFilter from '../components/table-components/table-filter';

import './app.scss'

function getSearchResult(item, field, q) {
	return item[field].toLowerCase().includes(q.toLowerCase())
}

function search(arr, searchField, q) {
	return arr.filter(item => {
		item.projects = item.projects.filter(project => {
			return getSearchResult(project, searchField, q);
		});

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

const App = () => {
	const userService = new UserService();
	const numberOfMonth = 12;
	const users = userService.getUsers();

	const [usersState, setUsersState] = useState(users);
	const [term, setTerm] = useState('');
	const [searchType, setSearchType] = useState('');
	const [monthNumber, setMonthNumber] = useState(numberOfMonth);

	const visibleUsers = filterUsersData(JSON.stringify(usersState), searchType, term);

	const renderBodyRow = () => visibleUsers.map(user => <TableRow key={user.id} user={user} numberOfMonth={monthNumber}/>);

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
		<div>
			<table className="table table-sm">
				<thead>
					<TableHead onChangeMonthNumber={onChangeMonthNumber} numberOfMonth={monthNumber}/>
					<TableFilter
						numberOfMonth={monthNumber}
						onFilter={onFilterEvent}
						onResetFilter={onResetFilter}
					/>
				</thead>
				<tbody>
					{renderBodyRow()}
				</tbody>
			</table>
		</div>
	);
};

export default App;
