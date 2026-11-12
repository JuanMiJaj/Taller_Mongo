const mongoose = require("mongoose");

// Modelo de Marca -> colección "marcas"
const marcaSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    pais: { type: String },
  },
  { collection: "marcas" }
);

module.exports = mongoose.model("Marca", marcaSchema);
