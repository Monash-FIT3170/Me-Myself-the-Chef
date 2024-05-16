const mongoose = require("mongoose");

const DietaryRequirementsSchema = new mongoose.Schema({
  id: Number,
  name: String,
  state: Boolean
})

const AllergySchema = new mongoose.Schema({
  id: Number,
  title: String
})

const PreferenceSchema = new mongoose.Schema({
  dietaryRequirements: [DietaryRequirementsSchema],
  dietaryCombination: String,
  allergies: [AllergySchema],
  maxPrepTime: Number
})

const DietaryRequirements = mongoose.model("DietaryRequirements", DietaryRequirementsSchema);
const Allergies = mongoose.model("Allergies", AllergySchema);
const Preferences = mongoose.model("Preferences", PreferenceSchema);

module.exports = Preferences;