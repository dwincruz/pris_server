const database = require("../../config/database");
const OtherConcern = require("./otherConcernModel");
class Uploads extends OtherConcern {
  constructor(monthYear, remarks, currentUser) {
    super();
    this.monthYear = monthYear;
    this.remarks = remarks;
    this.currentUser = currentUser; //instead of recreating a method we inherit this method to the parent
  }
  async createUpdate() {
    const currentUserData = await super.currentLoggedUser(this.currentUser);
    const query = `INSERT INTO uploads(month_and_year, remarks, creatorId, date_created) VALUES('${this.monthYear}', '${this.remarks}', ${currentUserData}, NOW())`;
    const rows = await database.execute(query);
    return rows;
  }
}

module.exports = Uploads;
