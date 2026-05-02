const jwt = require("jsonwebtoken");

const validarToken = (req, res, next) => {
  const bearer = req.headers["authorization"];

  if (!bearer) {
    return res.status(403).json({ message: "Token requerido" });
  }

  const token = bearer.split(" ")[1];

  jwt.verify(token, "secreto123", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token inválido" });
    }

    req.user = decoded;
    next();
  });
};

module.exports = validarToken;