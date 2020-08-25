import React, { useEffect, useState } from "react";
import { Typography, Link, CircularProgress, Button } from "@material-ui/core";
import { toFirstCharUppercase } from "./constants";
import axios from "axios";
import mockData from './mockData';



const Recipe = (props) => {
  const { match, history } = props;
  const { params } = match;
  const { recipeID } = params;
  const [recipe, setRecipe] = useState(mockData);

  useEffect(() => {
    axios
      .get(recipeID)
      .then(function (response) {
        const { data } = response;
        setRecipe(data);
      })
      .catch(function (error) {
        setRecipe(false);
      });
  }, [recipeID]);

  const generateRecipeJSX = (recipe) => {
    const { name, ingredients, directions, image} = recipe;
    const fullImageUrl = {image};
    return (
      <>
        <Typography variant="h3"> {name} </Typography>
        <img style={{ width: "300px", height: "300px" }} src={fullImageUrl} alt={fullImageUrl} />
        <Typography>Ingredients: {ingredients} </Typography>
        <Typography>Directions: {directions} </Typography>
      </>
    );
  };
  return (
    <>
      {recipe === undefined && <CircularProgress />}
      {recipe !== undefined && recipe && generateRecipeJSX(recipe)}
      {recipe === false && <><CircularProgress /><Typography> Recipe not found</Typography></>}
      {recipe !== undefined && (
        <Button variant="contained" onClick={() => history.push("/")}>
          Back
        </Button>
      )}
    </>
  );
};


export default Recipe;