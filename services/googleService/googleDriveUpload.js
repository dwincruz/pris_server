const google = require("googleapis");
const stream = require("stream");
const path = require("path");

const upload = async (fileObject) => {
  const keyFilePath = path.join(
    __dirname,
    "..",
    "..",
    "/services/googleService",
    "credentials.json"
  );
  const scopes = [
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/drive.file",
  ];

  const auth = new google.auth.GoogleAuth({
    keyFile: keyFilePath,
    scopes: scopes,
  });

  const bufferStream = new stream.PassThrough();
  bufferStream.end(fileObject.buffer);
  const { data } = await google.drive({ version: "v3", auth }).files.create({
    media: {
      mimeType: fileObject.mimeType,
      body: bufferStream,
    },
    requestBody: {
      name: fileObject.originalname,
      parents: process.env.NODE_DB_GDRIVE_ID_FOLDER,
    },
    fields: "id,name",
  });
  console.log(`successfully uploaded a file: ${data.name} - ${data.id}`);
};

module.exports = {
  upload,
};
