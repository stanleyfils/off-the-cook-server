const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const recipeSchema = new Schema(
  {
    title: { type: String, require: true },
    id: Number,
    cookTime: String,
    servings: Number,
    ingredients: String,
    // directions: String,
    // nutrition: String,
    bookID: {
      type: Schema.Types.ObjectId,
      ref: "RecipeBook",
    },
    image: String,
  },
  {
    timestamp: true,
  }
);

module.exports = model("Recipe", recipeSchema);

//add author
