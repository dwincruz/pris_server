const google = require("googleapis");
const stream = require("stream");
const path = require("path");
// const googleCredentials = require("../../credentials.json");

const upload = async (creds, scope, fileObject) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: creds,
    scopes: scope,
  });
  console.log("-------");
  const bufferStream = new stream.PassThrough();
  bufferStream.end(fileObject.buffer);
  const { data } = await google.drive({ version: "v3", auth }).files.create({
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

module.exports = {
  upload,
};
