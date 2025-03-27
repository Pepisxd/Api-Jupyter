const express = require("express");
const router = express.Router();
const chapterController = require("../controllers/chapterController");

// Ruta para crear un nuevo capítulo
router.post("/", chapterController.createChapter);

// Ruta para obtener todos los capítulos
router.get("/", chapterController.getChapters);

// Ruta para obtener un capítulo por ID
router.get("/:id", chapterController.getChapterById);

// Ruta para actualizar un capítulo por ID
router.put("/:id", chapterController.updateChapter);

// Ruta para eliminar un capítulo por ID
router.delete("/:id", chapterController.deleteChapter);

module.exports = router;
