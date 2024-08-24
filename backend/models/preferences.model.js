const mongoose = require("mongoose");

const DietaryRequirementsSchema = new mongoose.Schema({
  id: Number,
  name: String,
  state: Boolean
})

const AllergySchema = new mongoose.Schema({
  id: String,
  title: String
})

const NutritionSchema = new mongoose.Schema({
  id: String,
  name: String,
  min_amount: Number,
  max_amount: Number
})

const PreferenceSchema = new mongoose.Schema({
  dietaryRequirements: [DietaryRequirementsSchema],
  dietaryCombination: String,
  allergies: [AllergySchema],
  maxPrepTime: Number,
  nutrition: [NutritionSchema],
})

const DietaryRequirements = mongoose.model("DietaryRequirements", DietaryRequirementsSchema);
const Allergies = mongoose.model("Allergies", AllergySchema);
const Nutrition = mongoose.model("Nutrition", NutritionSchema);
const Preferences = mongoose.model("Preferences", PreferenceSchema);

module.exports = {Preferences, Allergies, DietaryRequirements, Nutrition};