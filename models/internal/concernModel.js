const database = require("../../config/database");

class Concern {
  constructor() {}
  static async fetchData() {
    const query = "SELECT * FROM public_concerns";
    const [rows, fields] = await database.execute(query);
    const filteredRows = rows.filter((row) => !Buffer.isBuffer(row._buff));
    return filteredRows;
  }
}

module.exports = Concern;
