require("dotenv").config();
const { google } = require("googleapis");
const uploadsModel = require("../../models/internal/uploadsModel");

exports.authCredentials = async (request, response, next) => {
  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.NODE_GOOGLE_CLIENT_ID,
      process.env.NODE_GOOGLE_SECRET,
      process.env.NODE_GOOGLE_REDIRECT_URI
    );
    const credentials = fs.readFileSync("../credentials.json");
    oauth2Client.setCredentials(JSON.parse(credentials));

    const url = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scopes: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/drive",
      ],
    });
    response.redirect(url);
  } catch (error) {
    next(error);
  }
};
exports.redirect = async (request, response, next) => {
  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.NODE_GOOGLE_CLIENT_ID,
      process.env.NODE_GOOGLE_SECRET,
      process.env.NODE_GOOGLE_REDIRECT_URI
    );
    const { code } = request.query;
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    fs.writeFileSync("../credentials.json", JSON.stringify(tokens));
    response.send("success");
  } catch (error) {
    next(error);
  }
};
