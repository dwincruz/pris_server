require("dotenv").config();
const userModel = require("../../models/internal/userModel");

exports.fetchUser = async (request, response, next) => {
  try {
    // const { filters, sorting } = request.query;
    const data = await userModel.fetchUser();
    response.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
exports.createUser = async (request, response, next) => {
  try {
    // firstName, middleName, lastName,
    const { email } = request.body;
    const user = new userModel(email);
    const data = await user.createUser();
    response.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
exports.currentLoggedUser = async (request, response, next) => {
  try {
    const { email } = request.body;
    console.log(email);
    const user = new userModel();
    const data = await user.currentLoggedUser(email);
    response.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
