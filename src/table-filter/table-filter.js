import React, {useState} from 'react';

const TableFilter = ({ numberOfMonth, onFiltered, onResetFilter }) => {
	const [name, setName] = useState('');
	const [deal, setDeal] = useState('');
	const [status, setStatus] = useState('');

	const onSearchChange = ({target: {value}}, type) => {
		if (type === 'name') {
			setName(value)
		}
		if (type === 'deal') {
			setDeal(value)
		}
		if (type === 'status') {
			if (!value) {
				setStatus('');
			}
			setStatus(value)
		}
		onFiltered(value, type)
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
					value={name}
					placeholder="Title"
					onChange={(event) => onSearchChange(event, 'name')}
				/>
			</th>
			<th>
				<input
					className="form-control form-control-sm"
					type="text"
					value={deal}
					placeholder="Title"
					onChange={(event) => onSearchChange(event, 'deal')}
				/>
			</th>
			<th>
				<select
					className="form-control form-control-sm"
					value={status}
					onChange={(event) => onSearchChange(event, 'status')}
				>
					<option value={''}>Status</option>
					<option value="billable">Billable</option>
					<option value="vacation">Vacation</option>
					<option value="internal">Internal</option>
					<option value="potential">Potential</option>
				</select>
			</th>
			<th colSpan={numberOfMonth}/>
			<th className="text-right" style={{width: '50px'}}>
				<button
					className="btn btn-sm"
					onClick={onReset}
				>
					Reset
				</button>
			</th>
		</tr>
	);
};

export default TableFilter;
