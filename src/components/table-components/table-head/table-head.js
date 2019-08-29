import React from 'react';

import DropdownBtn from '../../dropdown-btn';
import UserService from '../../../services/user-service'
import {CONST_LAST_COL_WIDTH} from '../../../constants'

import './table-head.scss'

const TableHead = ({ numberOfMonth, onChangeMonthNumber }) => {
	const userService = new UserService();
	const months = userService.getMonth();
	const getYear = new Date().getFullYear();

	const getMonthCol = (number) => {
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
			<th style={{width: '15%'}}>Full Name</th>
			<th style={{width: '15%'}}>Deal</th>
			<th style={{width: '120px'}}/>
			{getMonthCol(numberOfMonth)}
			<th style={{width: `${CONST_LAST_COL_WIDTH}px`}}>
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
