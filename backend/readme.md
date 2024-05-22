# Backend

### Paths

Get top 10 recipes via search query
(returns list of IDs need to make another API call to get recipe info)
e.g. http://localhost:8080/api/recipes/query/apple

Get top 10 recipes via ingredients
(returns list of IDs need to make another API call to get recipe info)
e.g. http://localhost:8080/api/recipes/ingredients/chicken,garlic

Get a recipe information from ID (will store the recipe into the database so that we don't use multiple API calls to retrieve the same recipe)
e.g. http://localhost:8080/api/recipes/id/590989


### Instructions

1. Navigate to this folder
   ```
   cd backend
   ```
2. Install dependencies
   ```
   npm install
   ```
3. Create `.env` file in this folder<br>
   *Go to [Spoonacular](https://spoonacular.com/food-api/console#Dashboard) and sign up to get your key*
   ```
   SPOONACULAR_API_KEY=
   ```
4. Start the server
   ```
   npm run dev
   ```
5. Go any of the paths in your browser to see the results of the API call

6. Change the upstream branch (optional)
   ```
   git branch --set-upstream-to origin/branch
   ```

### Links

- [MERN Stack Tutorial](https://github.com/iamshaunjp/MERN-Stack-Tutorial)
- [Express Docs](https://expressjs.com/en/5x/api.html)
- [Mongoose Docs](https://mongoosejs.com/docs/index.html)
- [Spoonacular Docs](https://spoonacular.com/food-api/docs)
- [Spoonacular RapidAPI](https://rapidapi.com/spoonacular/api/recipe-food-nutrition)