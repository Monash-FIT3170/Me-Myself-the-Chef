import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import Navbar from './components/NavBar'
import Page1 from './views/first_page';
import Login from './views/Login';
import SignUp from './views/SignUp';
import RecipeRecommendation from "./views/RecipeRecommendation";
import Ingredients from './views/Ingredients';
import Disable_Ingredients from './views/Disable_Ingredients';
import Recipe from './views/Recipe';
import { Preference, DietaryRequirements, NutritionRequirements, PreparationTime } from './views/Preference'
import LoggedInPage from './views/LoggedInPage';
import Chatbot from './components/ChatBot';
import AIRecipe from './views/AIRecipe';
import SavedRecipe from './views/SavedRecipe';

function App() {

  return (
    <div className="App d-flex h-100 flex-column">
      <BrowserRouter>
        <Navbar />

        <div className="pages d-flex h-100 flex-column">
          <Routes>

            {/* Page 1 is a test page for making API calls to the backend: can delete if desired */}
            <Route path="/page1" element={<Page1 />} />
          
            <Route path="/login" element={<Login />} /> 

            <Route path="/sign_up" element={<SignUp />} />

            {/* Recipe recommendations list page */}
            <Route path="/recipe_recommendation" element={<RecipeRecommendation />} />

            {/* Ingredients search page */}
            <Route path="/ingredients" element={<Ingredients />} />

            {/* Saved Recipes */}
            <Route path="/saved_recipe" element={<SavedRecipe />} />


            {/* Ingredients search page */}
            <Route path="/disable_ingredients" element={<Disable_Ingredients />} />

            {/* Single detailed recipe view page */}
            <Route path="/recipe" element={<Recipe />} />

            {/* Home Preference page */}
            <Route path="/preferences" element={<Preference />} />

            {/* Dietary Requirement Preference page */}
            <Route path="/preferences/dietary_requirements" element={<DietaryRequirements />} />

            {/* Nutrition Requirement Preference page */}
            <Route path="/preferences/nutrition_requirements" element={<NutritionRequirements />} />

            {/* Preparation Time Preference page */}
            <Route path="/preferences/preparation_time" element={<PreparationTime />} />

            {/* Preference page */}
            <Route path="/logged_in" element={<LoggedInPage />} />

            {/* AI Recipe page */}
            <Route path="/AIRecipe" element={<AIRecipe />} />

          </Routes>

        </div>
        <Chatbot />

      </BrowserRouter>
    </div>
  );
}

export default App;