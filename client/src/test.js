// CHOMP API KEY = 169nuDTVJQBRD4S0K
import React from 'react';
import axios from 'axios';

async function checkIngredients(ingredients, restriction) {
  const apiKey = "169nuDTVJQBRD4S0K";
  const ingredientsString = ingredients.join(",");
  const apiUrl = `https://api.chompthis.com/v1/ingredients/check?text=${ingredientsString}&platform=web&key=${apiKey}`;

  try {
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (data.message === "Success") {
      for (let ingredient of data.data) {
        if (ingredient.restrictions.includes(restriction)) {
          return `The ingredient "${ingredient.name}" is not suitable for a "${restriction}" diet.`;
        }
      }
      return `All ingredients are suitable for a "${restriction}" diet.`;
    } else {
      return "Error: " + data.message;
    }
  } catch (error) {
    return "Error: " + error.message;
  }
}
console.log(checkIngredients(['wheat', 'rye', 'barley'], 'gluten free'));