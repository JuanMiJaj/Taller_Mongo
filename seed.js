require("dotenv").config();
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

const Prenda = require("./models/Prenda");
const Marca = require("./models/Marca");

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/AtuendoDBx";

// Carpeta donde están los JSON exportados de MongoDB
const DATA_DIR = path.join(__dirname, "Atuendodbx");

// Convierte el formato de export de Mongo ({ "$oid": "..." }) a ObjectId real
function normalizar(doc) {
  const out = {};
  for (const [key, value] of Object.entries(doc)) {
    if (value && typeof value === "object" && value.$oid) {
      out[key] = new mongoose.Types.ObjectId(value.$oid);
    } else {
      out[key] = value;
    }
  }
  return out;
}

function leerJSON(nombreArchivo) {
  const ruta = path.join(DATA_DIR, nombreArchivo);
  const raw = fs.readFileSync(ruta, "utf-8");
  const data = JSON.parse(raw);
  return data.map(normalizar);
}

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Conectado a MongoDB:", MONGODB_URI);

    const marcas = leerJSON("AtuendoDBx.marcas.json");
    const prendas = leerJSON("AtuendoDBx.prendas.json");

    // Limpiar colecciones antes de reimportar
    await Marca.deleteMany({});
    await Prenda.deleteMany({});

    await Marca.insertMany(marcas);
    await Prenda.insertMany(prendas);

    console.log(`✅ Importadas ${marcas.length} marcas y ${prendas.length} prendas.`);
  } catch (err) {
    console.error("❌ Error en el seed:", err.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();
