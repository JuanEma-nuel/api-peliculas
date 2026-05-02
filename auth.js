const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/login", (req, res) => {
  const { usuario, password } = req.body;

  if (usuario === "admin" && password === "1234") {
    const token = jwt.sign(
      { usuario: usuario },
      "secreto123",
      { expiresIn: "1h" }
    );

    return res.json({ token });
  }

  res.status(401).json({ message: "Credenciales incorrectas" });
});

module.exports = router;