import React from 'react';

import UserService from '../services/user-service'

import './table-head.scss'

const TableHead = ({ numberOfMonth }) => {
	const userService = new UserService();
	const months = userService.getMonth();
	const getYear = new Date().getFullYear();

	const getMonthsCol = (number) => {
		return months.map((item, i) => {
			if (i > number - 1) {
				return;
			}

			if (i === 0) {
				return (
					<th key={item} className="column-month">
						<div className="text-center">
							<span>{item} {getYear}</span>
						</div>
					</th>
				)
			}

			return (
				<th key={item} className="column-month">
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
			<th style={{width: '20%'}}>Full Name</th>
			<th style={{width: '20%'}}>Deal</th>
			<th style={{width: '120px'}}/>
			{getMonthsCol(numberOfMonth - 1)}
			<th className="text-right align-middle" style={{width: '50px'}}>
				<button className="btn btn-sm">Filter</button>
			</th>
		</tr>
	);
};

export default TableHead;
