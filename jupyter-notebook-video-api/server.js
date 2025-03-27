// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./routes/authRoutes"); // Rutas de autenticación
const courseRoutes = require("./routes/courseRoutes"); // Rutas de cursos
const chapterRoutes = require("./routes/chapterRoutes"); // Rutas de capítulos
const lessonRoutes = require("./routes/lessonRoutes"); // Rutas de lecciones

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/cursos";

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("API funcionando");
});

//Rutas de capítulos
app.use("/api/chapters", chapterRoutes);

// Rutas de lecciones
app.use("/api/lessons", lessonRoutes);

// Conectar a MongoDB
mongoose
  .connect(MONGO_URI, {})
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error("Error de conexión:", err));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
