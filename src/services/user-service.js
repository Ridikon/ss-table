export default class UserService {
	_month = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	_users = [
		{
			id: 1,
			name: 'John Dow',
			img: 'https://img.icons8.com/carbon-copy/2x/user.png',
			projects: [
				{
					id: 1,
					name: 'John Project 1',
					status: 'billable',
					start: 'March 21, 2019',
					end: 'June 2, 2019',
					progress: 80
				},
				{
					id: 2,
					name: 'John Project 2',
					status: 'vacation',
					start: 'may 15, 2019',
					end: 'September 20, 2019',
					progress: 50
				},
				{
					id: 3,
					name: 'John Project 3',
					status: 'vacation',
					start: 'may 15, 2019',
					end: 'September 20, 2019',
					progress: 60
				}
			]
		},
		{
			id: 2,
			name: 'Mike Johnson',
			img: 'https://img.icons8.com/carbon-copy/2x/businessman.png',
			projects: [
				{
					id: 1,
					name: 'Mike Project 1',
					status: 'internal',
					start: 'March 21, 2019',
					end: 'July 2, 2019',
					progress: 100
				},
				{
					id: 2,
					name: 'Mike Project 2',
					status: 'potential',
					start: 'June 21, 2019',
					end: 'August 10, 2019',
					progress: 30
				}
			]
		},
		{
			id: 3,
			name: 'Ben Gur',
			img: 'https://img.icons8.com/plasticine/100/000000/user-male-circle.png',
			projects: [
				{
					id: 1,
					name: 'Ben Project 1',
					status: 'billable',
					start: 'March 21, 2019',
					end: 'June 2, 2019',
					progress: 80
				},
				{
					id: 2,
					name: 'Ben Project 2',
					status: 'potential',
					start: 'May 15, 2019',
					end: 'September 20, 2019',
					progress: 50
				},
				{
					id: 3,
					name: 'Ben Project 3',
					status: 'vacation',
					start: 'May 15, 2019',
					end: 'September 20, 2019',
					progress: 60
				},
				{
					id: 4,
					name: 'Ben Project 4',
					status: 'internal',
					start: 'May 15, 2019',
					end: 'September 20, 2019',
					progress: 60
				},
				{
					id: 5,
					name: 'Ben Project 5',
					status: 'vacation',
					start: 'February 15, 2019',
					end: 'May 20, 2019',
					progress: 100
				}
			]
		},
	];

	getUsers() {
		return this._users
	}

	getMonth() {
		return this._month;
	}
}
