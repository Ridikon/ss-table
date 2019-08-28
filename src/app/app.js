import React, { useState } from 'react';

import UserService from '../services/user-service'
import UserRow from "../user-row";
import TableHead from "../table-head";
import TableFilter from "../table-filter";

import './app.scss'

function search(arr, searchField, q) {
	return arr.filter(item => {
		const projectItems = item.projects.filter(project => {
			return project[searchField].toLowerCase().includes(q.toLowerCase())
		});

		item.projects = projectItems;

		return item;
	});
}

function filter(arr, type, q) {
	const copyArr = JSON.parse(arr);

	if (!q) {
		return copyArr;
	}

	if (type === 'name') {
		return copyArr.filter(item => item.name.toLowerCase().includes(q.toLowerCase()))
	}

	if (type === 'deal') {
		return search(copyArr, 'name', q)
	}

	if (type === 'status') {
		return search(copyArr, 'status', q)
	}
}

const App = () => {
	const userService = new UserService();
	const numberOfMonth = 6;
	const users = userService.getUsers();

	const [usersState, setUsers] = useState(users);
	const [term, setTerm] = useState('');
	const [searchType, setSearchType] = useState('');
	const [monthNumberState, setMonthNumber] = useState(numberOfMonth);

	const visibleUsers = filter(JSON.stringify(usersState), searchType, term);

	const renderBodyRow = () => {
		return visibleUsers.map(user => <UserRow key={user.id} user={user} numberOfMonth={monthNumberState}/>)
	};

	const onFiltered = (q, type) => {
		setTerm(q);
		setSearchType(type);
	};

	const onResetFilter = () => {
		setTerm('');
		setSearchType('');
	};

	return (
		<div>
			<table className="table table-sm">
				<thead>
				<TableHead numberOfMonth={monthNumberState}/>
				<TableFilter
					numberOfMonth={monthNumberState}
					onFiltered={onFiltered}
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
