require("dotenv").config();
const { google } = require("googleapis");
const stream = require("stream");
const path = require("path");

const uploadsModel = require("../../models/internal/uploadsModel");

exports.uploads = async (request, response, next) => {
  try {
    const keyFilePath = path.join(__dirname, "..", "..", "credentials.json");
    const scopes = ["https://www.googleapis.com/auth/drive"];

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
            parents: ["1TPbpQ8-LYqUrKBs5Te9hQ92IFhASZtAe"], // gdrive id folder
          },
          fields: "id,name",
        });
      console.log(`uploaded file ${data.name} ${data.id}`);
    };

    const selectedFiles = request.files;
    selectedFiles.filter(async (eachFile) => {
      await uploadSelectedFiles(eachFile);
    });
    response.status(200).json("Successfully Uploaded to Google Drive");
  } catch (error) {
    next(error);
  }
};
