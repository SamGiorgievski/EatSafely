import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import axios from "axios";
import "./Recipe.scss";
import { useResolvedPath } from "react-router-dom";

const Recipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [diet, setDiet] = useState("");
  const [intolerance, setIntolerance] = useState("");
  const [nutritionLabel, setNutritionalLable] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [text, count] = useTypewriter({
    words: ["Generate Recipe"],
    loop: true,
    delaySpeed: 3000,
    typeSpeed: 90,
  });

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    getRecipes();
  }, [diet, intolerance]);

  const getRecipes = async () => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?diet=${diet}&intolerances=${intolerance}&instructionsRequired=true&apiKey=596c8cbb08394a8482c1a10627c3d85d`
      );
      setRecipes(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const getRecipeDetails = async (recipeId) => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions?apiKey=596c8cbb08394a8482c1a10627c3d85d`
      );

      return response.data[0].steps.map((step) => step.step);
    } catch (error) {
      console.error(error);
    }
  };

  const getIngredients = async (recipeId) => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/${recipeId}/ingredientWidget.json?apiKey=596c8cbb08394a8482c1a10627c3d85d`
      );
      // console.log(response.data.ingredients[0].amount);
      return response.data.ingredients.map((ingredient) => ingredient.name);
    } catch (error) {
      console.error(error);
    }
  };

  const getAmounts = async (recipeId) => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/${recipeId}/ingredientWidget.json?apiKey=596c8cbb08394a8482c1a10627c3d85d`
      );
      // console.log(response.data.ingredients[0].amount.us.value);
      return response.data.ingredients.map((amount) => amount.amount.us.value);
    } catch (error) {
      console.error(error);
    }
  };

  const getUnits = async (recipeId) => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/${recipeId}/ingredientWidget.json?apiKey=596c8cbb08394a8482c1a10627c3d85d`
      );
      // console.log(response.data.ingredients[0].amount);
      return response.data.ingredients.map((amount) => amount.amount.us.unit);
    } catch (error) {
      console.error(error);
    }
  };

  const getNutritionFacts = async (recipeId) => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/${recipeId}/nutritionLabel.png?apiKey=596c8cbb08394a8482c1a10627c3d85d`
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectRecipe = async (recipe) => {
    setSelectedRecipe(null);
    setSelectedRecipe({
      ...recipe,
      instructions: await getRecipeDetails(recipe.id),
      ingredients: await getIngredients(recipe.id),
      amounts: await getAmounts(recipe.id),
      units: await getUnits(recipe.id),
      label: await getNutritionFacts(recipe.id),
    });
  };

  const handleChangeDiet = (event) => {
    setDiet(event.target.value);
  };

  const handleIntoleranceChange = (event) => {
    setIntolerance(event.target.value);
  };

  // console.log(selectedRecipe);

  return (
    <div className="recipe-container">
      <h1>Recipes</h1>
      <div className="images">
        <img
          src="https://images.everydayhealth.com/images/what-is-a-gluten-free-diet-alt-1440x810.jpg"
          alt=""
        />
        <img
          src="https://post.healthline.com/wp-content/uploads/2020/09/gluten-free-diet-thumb-1.jpg"
          alt=""
        />
        <img
          src="https://www.happycow.net/img/vegtopics/going-vegan-800.jpg"
          alt=""
        />
        <img
          src="https://hips.hearstapps.com/hmg-prod/images/vegan-food-list-1563809023.png"
          alt=""
        />
      </div>
      <div className="inputs--selection">
        <div className="diet--div">
          <h4>Diet</h4>
          <select value={diet} onChange={handleChangeDiet}>
            <option value="">None</option>
            <option value="gluten-free">Gluten-Free</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="paleo">Paleo</option>
            <option value="ketogenic">Keto</option>
          </select>
        </div>
        <div className="intolerance--div">
          <h4>Intolerance</h4>
          <select value={intolerance} onChange={handleIntoleranceChange}>
            <option value="">None</option>
            <option value="dairy">Dairy</option>
            <option value="egg">Egg</option>
            <option value="gluten">Gluten</option>
            <option value="grain">Grain</option>
            <option value="peanut">Peanut</option>
            <option value="tree-nut">Tree Nut</option>
            <option value="seafood">Seafood</option>
            <option value="sesame">Sesame</option>
            <option value="shellfish">Shellfish</option>
            <option value="soy">Soy</option>
            <option value="sulfite">Sulfite</option>
            <option value="wheat">Wheat</option>
          </select>
        </div>
      </div>
      <button
        disabled={recipes.length === 0}
        className="btn btn-primary"
        onClick={() => {
          handleSelectRecipe(
            recipes[Math.floor(Math.random() * recipes.length)]
          );
          openModal();
        }}
      >
        {text}
      </button>
      {selectedRecipe ? (
        <>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            ariaHideApp={false}
          >
            <div className="selected-recipe">
              <h2>{selectedRecipe.title}</h2>
              <img src={selectedRecipe.image} alt={selectedRecipe.title} />

              <ol>
                <h3>Ingredients:</h3>
                {selectedRecipe.ingredients.map((ingredient, index) => (
                  <li key={index}>
                    {ingredient} - {selectedRecipe.amounts[index]}{" "}
                    {selectedRecipe.units[index]}
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <h3>Instructions:</h3>
              <ol>
                {selectedRecipe.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
            </div>
            <img src={selectedRecipe.label} alt="" />
            <button className="btn btn-primary" onClick={closeModal}>
              Close
            </button>
          </Modal>
        </>
      ) : (
        <p></p>
      )}
    </div>
  );
};
export default Recipe;
