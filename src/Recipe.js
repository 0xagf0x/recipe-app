import React, { useEffect, useState } from "react";
import { Typography, Link, CircularProgress, Button } from "@material-ui/core";
import { toFirstCharUppercase } from "./constants";
import axios from "axios";
import mockData from './mockData';
import { makeStyles } from "@material-ui/core/styles";



const useStyles = makeStyles(() => ({
  missingContainer: {
    width: '500px',
    margin: 'auto',
    marginTop: '10%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  missingText: {
    textAlign: 'center',
    fontFamily: 'helvetica',
    fontSize: '32px',
    margin: '1rem',
  },
  missingBackButton: {
    backgroundColor: 'lightgrey',
    margin: 'auto',
    display: 'flex',
    marginTop: '2rem',
  },
}));


const Recipe = (props) => {
  const classes = useStyles();
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
      {recipe !== undefined && recipe && generateRecipeJSX(recipe)}
      {recipe === false && <><div className={classes.missingContainer}><CircularProgress /><Typography className={classes.missingText}> Sorry, this recipe was not found</Typography></div></>}
      {recipe !== undefined && (
        <Button className={classes.missingBackButton} variant="contained" onClick={() => history.push("/")}>
          Back
        </Button>
      )}
    </>
  );
};


export default Recipe;