require("dotenv").config();
const { google } = require("googleapis");
const stream = require("stream");
const path = require("path");

const uploadsModel = require("../../models/internal/uploadsModel");
const gservices = require("../../services/googleService/googleDriveUpload");
exports.uploads = async (request, response, next) => {
  try {
    const keyFilePath = path.join(
      __dirname,

      "../../credentials.json"
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
      let uploadedFiles = [];
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
            parents: ["1qjGqtm4o1CG5GubXEvRWBz7W8XFZ9ib6"],
          },
          fields: "id,name",
        });

      return {
        fileName: data.name,
        fileId: data.id,
      };
    };

    const selectedFiles = request.files;
    const sentFiles = await Promise.all(
      selectedFiles.map(async (eachFile) => {
        return await uploadSelectedFiles(eachFile);
      })
    );

    const file = new uploadsModel(
      sentFiles,
      "10-14-1998",
      "remarks",
      "aldwinceazarcruz@gmail.com",
      "other concerns"
    );
    file.createUpload();

    response.status(200).json({ status: "uploaded" });
  } catch (error) {
    next(error);
  }
};
