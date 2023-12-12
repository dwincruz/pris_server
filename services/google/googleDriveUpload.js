// const google = require("googleapis");
// const stream = require("stream");
// const path = require("path");

// const upload = async () => {
//   const keyFilePath = path.join(__dirname, "..", "..", "credentials.json");
//   const scopes = ["https://www.googleapis.com/auth/drive"];

//   const auth = new google.auth.GoogleAuth({
//     keyFile: keyFilePath,
//     scopes: scopes,
//   });

//   const bufferStream = new stream.PassThrough();
//   bufferStream.end(fileObject.buffer);
//   const { data } = await google.drive({ version: "v3", auth }).files.create({
//     media: {
//       mimeType: fileObject.mimeType,
//       body: bufferStream,
//     },
//     requestBody: {
//       name: fileObject.originalname,
//       parents: ["1TPbpQ8-LYqUrKBs5Te9hQ92IFhASZtAe"],
//     },
//     fields: "id,name",
//   });
//   console.log(`uploaded file ${data.name} ${data.id}`);
// };

// module.exports = {
//   upload,
// };
