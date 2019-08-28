import React from 'react';

import './user-row.scss'

const UserRow = ({ user, numberOfMonth }) => {
	const { img, name, projects } = user;

	const renderProjectsName = (index) => {
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

	const renderBadge = (status) => {
		const badgeClasses = ['badge', 'badge-pill'];

		switch (status) {
			case 'billable':
				badgeClasses.push('badge-success');
				break;
			case 'vacation':
				badgeClasses.push('badge-secondary');
				break;
			case 'internal':
				badgeClasses.push('badge-primary');
				break;
			case 'potential':
				badgeClasses.push('badge-warning');
				break;
			default:
				return;
		}

		return badgeClasses.join(' ');
	};

	const renderProjects = () => {
		return projects.map((project, i) => {
			const {id, status, name, start, end, progress} = project;

			return (
				<tr key={id}>

					{renderProjectsName(i)}

					<td><a href="#">{name}</a></td>
					<td><span className={renderBadge(status)}>{status}</span></td>
					<td colSpan={numberOfMonth}>
						<div></div>
					</td>
				</tr>
			)
		})
	};

	return renderProjects();
};

export default UserRow;
