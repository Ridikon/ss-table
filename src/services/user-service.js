import { month } from '../models/month'
import { users } from '../models/users';

export default class UserService {
  _month = month;
  _users = users;

  getUsers() {
    return this._users
  }

  getMonth() {
    return this._month;
  }
}
