import React, { Component } from 'react';

import ProjectProgress from "../project-progress";

import './user-row.scss'
import ProgressService from "../services/progress-service";

export default class UserRow extends Component {
	progressService = new ProgressService();

	state = {
		progressColWidth: 0,
		todayPosition: 0
	};

	componentDidMount() {
		const {numberOfMonth} = this.props;
		const progressColWidth = this.refs.progressRef.clientWidth;
		const oneDay = progressColWidth / this.progressService.getDays(numberOfMonth);

		this.setState({
			progressColWidth,
			todayPosition: oneDay * this.progressService.getPositionDay(new Date())
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

	renderProjects = () => {
		const { numberOfMonth, user: { projects } } = this.props;
		const { progressColWidth, todayPosition } = this.state;

		return projects.map((project, i) => {
			const { id, status, name, start, end, progress } = project;

			const badgeClasses = ['badge', 'badge-pill', this.setClass(status, 'badge')];

			return (
				<tr key={id} className="user-row">

					{this.renderClientName(i)}

					<td><a href="#">{name}</a></td>
					<td><span className={badgeClasses.join(' ')}>{status}</span></td>
					<td
						className="progress-col"
						colSpan={numberOfMonth + 1}
						ref="progressRef"
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
							style={{left: `${todayPosition}px`}}
							className="bg-primary vertical-line"
						/>
					</td>
				</tr>
			)
		})
	};

	render() {
		return this.renderProjects()
	}
};
