import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import Navbar from './components/NavBar'
import Page1 from './views/first_page';
import Page2 from './views/second_page';
import Login from './components/Login';
import SignUp from './components/SignUp';
import RecipeRecommendation from "./components/RecipeRecommendation";

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

          </Routes>

        </div>

      </BrowserRouter>
    </div>
  );
}

export default App;