const database = require("../../config/database");
const User = require("./userModel");
class otherConcern extends User {
  constructor(monthYear, remarks, currentUser) {
    super();
    this.monthYear = monthYear;
    this.remarks = remarks;
    this.currentUser = currentUser; //instead of recreating a method we inherit this method to the parent
  }
  async createComplaint() {
    const currentUserData = await super.currentLoggedUser(this.currentUser);

    const query = `INSERT INTO other_concerns(month_and_year, remarks, creatorId, date_created) VALUES('${this.monthYear}', '${this.remarks}', ${currentUserData}, NOW())`;
    console.log(query);
    const rows = await database.execute(query);
    return rows;
  }
  static async fetchComplaint() {
    const query = `SELECT * FROM other_concerns`;
    const [rows, fields] = await database.execute(query);
    const filteredRows = rows.filter((row) => !Buffer.isBuffer(row._buff));
    return filteredRows;
  }
}

module.exports = otherConcern;
