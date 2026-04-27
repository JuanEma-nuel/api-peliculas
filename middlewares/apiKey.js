const validarApiKey = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (apiKey !== "123456") {
    return res.status(403).json({ message: "API KEY inválida" });
  }

  next();
};

module.exports = validarApiKey;