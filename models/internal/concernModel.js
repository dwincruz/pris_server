const database = require("../../config/database");
const User = require("./userModel");
class OtherConcern extends User {
  constructor(monthYear, remarks, currentUser, complaintType) {
    super();
    this.monthYear = monthYear;
    this.remarks = remarks;
    this.currentUser = currentUser;
    this.complaintType = complaintType;
  }
  async createComplaint() {
    switch (this.complaintType) {
      case "other concerns":
        const currentUserData = await super.currentLoggedUser(this.currentUser);
        const query = `INSERT INTO other_concerns(month_and_year, remarks, creatorId, date_created) VALUES('${this.monthYear}', '${this.remarks}', ${currentUserData}, NOW())`;
        const rows = await database.execute(query);
        return rows[0].insertId;
        break;
    }
  }
  static async fetchComplaint() {
    const query = `SELECT other_concerns.id, other_concerns.month_and_year, other_concerns.remarks, uploads.concern_id, uploads.file_name, uploads.file_path FROM other_concerns LEFT JOIN uploads ON other_concerns.id = uploads.concern_id`;
    const [rows, fields] = await database.execute(query);
    const filteredRows = rows.filter((row) => !Buffer.isBuffer(row._buff));
    return filteredRows;
  }
}

module.exports = OtherConcern;
