const jwt = require("jsonwebtoken");

const jwtMiddleware = async (req, res, next) => {
  try {
    if (req.headers && req.headers.authorization) {
      //remove the bearer so we can decode the token!
      const slicedToken = req.headers.authorization.slice(7);
      const decodedToken = jwt.verify(slicedToken, process.env.SECRET_KEY);

      res.locals.decodedToken = decodedToken;

      next();
    } else {
      throw { message: "You don't have permission" };
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  jwtMiddleware,
};
