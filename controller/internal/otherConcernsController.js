require("dotenv").config();
const otherConcernModel = require("../../models/internal/otherConcernModel");

exports.fetchComplaint = async (request, response, next) => {
  try {
    const data = await otherConcernModel.fetchComplaint();
    response.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

exports.createComplaint = async (request, response, next) => {
  try {
    // const { filters, sorting } = request.query;
    const { monthYear, remarks, currentUser } = request.body;
    console.log(request.body);
    const post = new otherConcernModel(monthYear, remarks, currentUser);
    const data = await post.createComplaint();

    response.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
