import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import Navbar from './components/NavBar'
import Page1 from './views/first_page';
import Page2 from './views/second_page';
import Login from './views/Login';
import SignUp from './views/SignUp';
import RecipeRecommendation from "./views/RecipeRecommendation";
import Ingredients from './views/Ingredients';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <div className="pages">

          <Routes>

            <Route 
              path="/page1" 
              element={<Page1 />} 
            />

            <Route 
              path="/page2" 
              element={<Page2 />} 
            />

            <Route 
              path="/login" 
              element={<Login />} 
            /> 

            <Route 
              path="/sign_up" 
              element={<SignUp />} 
            />

            <Route
              path="/recipe_recommendation"
              element={<RecipeRecommendation />}
            />

            <Route
              path="/ingredients"
              element={<Ingredients />}
            />

          </Routes>

        </div>

      </BrowserRouter>
    </div>
  );
}

export default App;