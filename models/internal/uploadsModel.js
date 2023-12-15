const database = require("../../config/database");
const OtherConcern = require("./concernModel");
class Uploads extends OtherConcern {
  constructor(sentFiles, monthYear, remarks, currentUser, complaintType) {
    super(monthYear, remarks, currentUser, complaintType);
    this.sentFiles = sentFiles;
  }
  async createUpload() {
    const fileNames = this.sentFiles.map((e) => e.fileName).join(",");
    const filePaths = this.sentFiles
      .map((e) => `https://drive.google.com/file/d/${e.fileId}/preview`)
      .join(",");

    const concernId = await super.createComplaint();
    const query = `INSERT INTO uploads(concern_id,file_name, file_path, date_uploaded) VALUES('${concernId}', '${fileNames}', '${filePaths}', NOW())`;
    const rows = await database.execute(query);
    return rows;
  }
}

module.exports = Uploads;
