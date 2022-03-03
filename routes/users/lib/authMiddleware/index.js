const { userCreateValidator } = require("./userCreateValidator");
const { validateLoginData } = require("./validateLoginData");
const { validateUpdateData } = require("./validateUpdateData");

module.exports = {
  userCreateValidator,
  validateLoginData,
  validateUpdateData,
};
