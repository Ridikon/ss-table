import React, { useState } from 'react';

import { CONST_LAST_COL_WIDTH } from '../../../constants'

const Filter = ({ numberOfMonth, onFilter, onResetFilter }) => {
	const [name, setName] = useState('');
	const [deal, setDeal] = useState('');
	const [status, setStatus] = useState('');

	const onSearchChange = ({ target: { value, name } }) => {
		switch (name) {
			case 'name':
				setName(value);
				break;
			case 'deal':
				setDeal(value);
				break;
			case 'status':
				setStatus(value);
				break;
			default:
				return;
		}
		onFilter(value, name)
	};

	const onReset = () => {
		setName('');
		setDeal('');
		setStatus('');
		onResetFilter();
	};

	return (
		<tr>
			<th>
				<input
					className="form-control form-control-sm"
					type="text"
					name="name"
					value={name}
					placeholder="Title"
					onChange={onSearchChange}
				/>
			</th>
			<th>
				<input
					className="form-control form-control-sm"
					type="text"
					name="deal"
					value={deal}
					placeholder="Title"
					onChange={onSearchChange}
				/>
			</th>
			<th>
				<select
					className="form-control form-control-sm"
					value={status}
					name="status"
					onChange={onSearchChange}
				>
					<option value="">Status</option>
					<option value="billable">Billable</option>
					<option value="vacation">Vacation</option>
					<option value="internal">Internal</option>
					<option value="potential">Potential</option>
				</select>
			</th>
			<th colSpan={numberOfMonth}/>
			<th className="text-right" style={{ width: `${CONST_LAST_COL_WIDTH}px` }}>
				<button className="btn btn-sm" onClick={onReset}>
					Reset
				</button>
			</th>
		</tr>
	);
};

export default Filter;
