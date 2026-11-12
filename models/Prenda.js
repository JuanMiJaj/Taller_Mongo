const mongoose = require("mongoose");

// Modelo de Prenda -> colección "prendas"
const prendaSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    categoria: { type: String },
    color: { type: String },
    talla: { type: String },
    // Referencia a la colección de marcas (para poder "populate")
    marca_id: { type: mongoose.Schema.Types.ObjectId, ref: "Marca" },
  },
  { collection: "prendas" }
);

module.exports = mongoose.model("Prenda", prendaSchema);
