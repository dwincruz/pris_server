const database = require("../../config/database");
const OtherConcern = require("./otherConcernModel");
class Uploads extends OtherConcern {
  constructor(fileName) {
    super();
    this.fileName = fileName;
  }
  async createUpload() {
    // const currentUserData = await super.createComplaint();
  }
}

module.exports = Uploads;
