const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const recipeBookSchema = new Schema(
  {
    title: { type: String, require: true },
    description: String,
    recipes: { type: [{ type: Schema.Types.ObjectId, ref: "Recipe" }] },
  },
  {
    timestamp: true,
  }
);

module.exports = model("recipeBook", recipeBookSchema);
