import React, { Component } from 'react';

import ProjectProgress from '../../project-progress';
import ProgressService from '../../../services/progress-service';
import {CONST_LAST_COL_WIDTH} from '../../../constants'

import './table-row.scss'

export default class TableRow extends Component {
	progressService = new ProgressService();

	state = {
		progressColWidth: 0,
		todayPosition: 0
	};

	constructor(props) {
		super(props);
		this.progressRef = React.createRef();
	}

	componentDidMount() {
		this.computeProgressColWidth()
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.numberOfMonth === this.props.numberOfMonth) {
			return;
		}

		this.computeProgressColWidth()
	}

	computeProgressColWidth() {
		const { numberOfMonth } = this.props;
		const node = this.progressRef.current;
		const progressColWidth = node.clientWidth - CONST_LAST_COL_WIDTH;
		const oneDayWidth = progressColWidth / this.progressService.getDays(numberOfMonth);

		this.setState({
			progressColWidth,
			todayPosition: oneDayWidth * this.progressService.getPositionDay(new Date())
		});
	}

	renderClientName = (index) => {
		const { img, name, projects } = this.props.user;

		if (!index) {
			return (
				<td rowSpan={projects.length} className="user">
					<div>
						<img src={img} alt="user image"/>
						<a href="#">{name}</a>
					</div>
				</td>
			)
		}

		return null;
	};

	setClass = (status, type) => {
		switch (status) {
			case 'billable':
				return `${type}-success`;
			case 'vacation':
				return `${type}-secondary`;
			case 'internal':
				return `${type}-primary`;
			case 'potential':
				return `${type}-warning`;
			default:
				return '';
		}
	};

	render() {
		const { numberOfMonth, user: { projects } } = this.props;
		const { progressColWidth, todayPosition } = this.state;

		return projects.map((project, i) => {
			const { id, status, name, start, end, progress } = project;

			const badgeClasses = ['badge', 'badge-pill', this.setClass(status, 'badge')];

			return (
				<tr key={id} className="user-row">

					{this.renderClientName(i)}

					<td><a href="#" className="pl-3">{name}</a></td>
					<td><span className={badgeClasses.join(' ')}>{status}</span></td>
					<td
						className="progress-col"
						colSpan={numberOfMonth + 1}
						ref={this.progressRef}
					>
						<ProjectProgress
							bgClass={this.setClass(status, 'bg')}
							textClass={this.setClass(status, 'text')}
							colWidth={progressColWidth}
							numberOfMonth={numberOfMonth}
							start={start}
							end={end}
							progress={progress}
						/>
						<span
							style={{ left: `${todayPosition}px` }}
							className="bg-primary vertical-line"
						/>
					</td>
				</tr>
			)
		})
	}
};
