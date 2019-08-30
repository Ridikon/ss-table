export default class ProgressService {
  getDays = (number) => {
    let days = 0;

    for (let i = 1; i <= number; i++) {
      days += new Date(2019, i, 0).getDate();
    }

    return days
  };

  getPositionDay = (date) => {
    const day = new Date(date).getDate();
    const month = new Date(date).getMonth();

    return this.getDays(month) + day;
  };
}
