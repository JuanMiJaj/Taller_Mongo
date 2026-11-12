require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

const Prenda = require("./models/Prenda");
const Marca = require("./models/Marca");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/AtuendoDBx";

app.use(cors());
app.use(express.json());

// Servir el index.html y demás archivos estáticos (css, imágenes) desde esta carpeta
app.use(express.static(path.join(__dirname)));

// --- API REST ---

// GET /api/prendas -> todas las prendas con su marca incluida
app.get("/api/prendas", async (req, res) => {
  try {
    const prendas = await Prenda.find().populate("marca_id");
    res.json(prendas);
  } catch (err) {
    console.error("Error al obtener prendas:", err);
    res.status(500).json({ error: "No se pudieron obtener las prendas" });
  }
});

// GET /api/marcas -> todas las marcas
app.get("/api/marcas", async (req, res) => {
  try {
    const marcas = await Marca.find();
    res.json(marcas);
  } catch (err) {
    console.error("Error al obtener marcas:", err);
    res.status(500).json({ error: "No se pudieron obtener las marcas" });
  }
});

// GET /api/prendas/:id -> una prenda concreta
app.get("/api/prendas/:id", async (req, res) => {
  try {
    const prenda = await Prenda.findById(req.params.id).populate("marca_id");
    if (!prenda) return res.status(404).json({ error: "Prenda no encontrada" });
    res.json(prenda);
  } catch (err) {
    res.status(400).json({ error: "ID inválido" });
  }
});

// --- Conexión a MongoDB y arranque del servidor ---
async function start() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Conectado a MongoDB:", MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`🚀 Servidor en http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Error conectando a MongoDB:", err.message);
    process.exit(1);
  }
}

start();
