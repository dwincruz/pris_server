const google = require("googleapis");
const stream = require("stream");
const path = require("path");

const uploads = async (request, response, next) => {
  try {
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
    const uploadSelectedFiles = async (fileObject) => {
      const bufferStream = new stream.PassThrough();
      bufferStream.end(fileObject.buffer);
      const { data } = await google
        .drive({ version: "v3", auth })
        .files.create({
          media: {
            mimeType: fileObject.mimeType,
            body: bufferStream,
          },
          requestBody: {
            name: fileObject.originalname,
            parents: process.env.NODE_DB_GDRIVE_ID_FOLDER,
            //1qjGqtm4o1CG5GubXEvRWBz7W8XFZ9ib6
          },
          fields: "id,name",
        });
      console.log(`successfully uploaded a file: ${data.name} - ${data.id}`);
    };
    const { fileName } = request.body;
    const file = new uploadsModel(fileName);

    const selectedFiles = request.files;
    selectedFiles.filter(async (eachFile) => {
      await uploadSelectedFiles(eachFile);
    });
    response.status(200).json({ status: "uploaded" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploads,
};
