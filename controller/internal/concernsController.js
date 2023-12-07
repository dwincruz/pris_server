require("dotenv").config();
const concernModel = require("../../models/internal/concernModel");

exports.fetchData = async (request, response, next) => {
  try {
    const { filters, sorting } = request.query;
    const data = await concernModel.fetchData();
    console.log("...fetching");
    response.send({ message: "api running" });
    response.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
