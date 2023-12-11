const database = require("../../config/database");
const User = require("./userModel");
class OtherConcern extends User {
  constructor(monthYear, remarks, file, currentUser) {
    super();
    this.monthYear = monthYear;
    this.remarks = remarks;
    this.file = file;
    this.currentUser = currentUser; //instead of recreating a method we inherit this method to the parent
  }
  async createComplaint() {
    const currentUserData = await super.currentLoggedUser(this.currentUser);
    const query = `INSERT INTO other_concerns(month_and_year, remarks, creatorId, date_created) VALUES('${this.monthYear}', '${this.remarks}', ${currentUserData}, NOW())`;
    const rows = await database.execute(query);

    // const uploads = `INSERT INTO uploads(concern_id, file_name, file_path, date_uploaded) VALUES('${rows[0].insertId}', '${this.file}', '' , NOW())`;
    console.log("last inserted id: ", rows[0].insertId);
    return rows;
  }
  static async fetchComplaint() {
    const query = `SELECT * FROM other_concerns`;
    const [rows, fields] = await database.execute(query);
    const filteredRows = rows.filter((row) => !Buffer.isBuffer(row._buff));
    return filteredRows;
  }
}

module.exports = OtherConcern;
