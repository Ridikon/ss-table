export default class ProgressService {
  _getDays = (numberOfMonth) => {
    let days = 0;

    for (let i = 1; i <= numberOfMonth; i++) {
      days += new Date(2019, i, 0).getDate();
    }

    return days
  };

  getPositionDay = (date) => {
    const day = new Date(date).getDate();
    const month = new Date(date).getMonth();

    return this._getDays(month) + day;
  };

  getOneDayWidth = (colWidth, numberOfMonth) => {
    return colWidth / this._getDays(numberOfMonth)
  };

  getTodayPosition = (colWidth, numberOfMonth, date) => {
    return this.getOneDayWidth(colWidth, numberOfMonth) * this.getPositionDay(date)
  };
}
