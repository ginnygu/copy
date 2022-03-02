const { isEmpty } = require("validator");

const checkIfEmpty = (req, res, next) => {
  let errorObj = {}; //new Object
  let body = req.body;

  for (let key in body) {
    if (isEmpty(body[key])) {
      errorObj[key] = `${key} cannot be empty`;
    }
  }
  let checkObj = Object.keys(errorObj);
  if (checkObj.length > 0) {
    return res
      .status(500)
      .json({ message: "There's and error", error: errorObj });
  } else {
    next();
  }
};

module.exports = {
  checkIfEmpty,
};
