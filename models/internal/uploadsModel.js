const database = require("../../config/database");
const OtherConcern = require("./otherConcernModel");
class Uploads extends OtherConcern {
  constructor(sentFiles, monthYear, remarks, currentUser) {
    super(monthYear, remarks, currentUser);
    this.sentFiles = sentFiles;
  }
  async createUpload() {
    console.log("your files: ", this.sentFiles);

    const concernId = await super.createComplaint();

    // const x =  super
    //   .createComplaint()
    //   .then((result) => {
    //      result;
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });

    // return super.createComplaint();
    const query = `INSERT INTO uploads(concern_id,file_name, file_path, date_uploaded) VALUES('${concernId}', '', '', NOW())`;
    const rows = await database.execute(query);
    return rows;
  }
}

module.exports = Uploads;
