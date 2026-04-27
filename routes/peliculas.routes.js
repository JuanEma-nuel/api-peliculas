const express = require("express");
const router = express.Router();
const service = require("../services/peliculas.service");

// GET todas
router.get("/", async (req, res) => {
  const data = await service.getAll();
  res.json(data);
});

// GET por id
router.get("/:id", async (req, res) => {
  const item = await service.getById(req.params.id);
  if (!item) return res.status(404).json({ message: "Pelicula no encontrada" });
  res.json(item);
});

// POST
router.post("/", async (req, res) => {
  const { titulo, genero, anio, director } = req.body;

  if (!titulo || !genero || !anio || !director) {
    return res.status(400).json({ message: "Faltan campos" });
  }

  const newItem = await service.create(req.body);
  res.status(201).json(newItem);
});

// PUT
router.put("/:id", async (req, res) => {
  const updated = await service.update(req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: "Pelicula no encontrada" });
  res.json(updated);
});

// DELETE
router.delete("/:id", async (req, res) => {
  const deleted = await service.remove(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Pelicula no encontrada" });
  res.json({ message: "Pelicula eliminada" });
});

module.exports = router;