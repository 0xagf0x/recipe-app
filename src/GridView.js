import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  Toolbar,
  AppBar,
  TextField,
} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import { toFirstCharUppercase } from "./constants";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import mockData from './mockData';

const useStyles = makeStyles((theme) => ({
  navBar: {
    backgroundColor: 'lightgrey',
  },
  recipeContainer: {
    paddingTop: "20px",
    paddingLeft: "50px",
    paddingRight: "50px",
  },
  cardMedia: {
    margin: "auto",
  },
  cardHover: {
    '&:hover': {
      transition: 'all .25s ease-in-out',
      transform: 'scale(1.05)',
    },
  },
  cardContent: {
    textAlign: "center",
    backgroundColor: "lightgrey",
    
  },
  cardTitle: {
    color: 'black',
    fontSize: "18px",
    letterSpacing: '2px',
    textTransform: 'uppercase',
    fontWeight: 200,
    fontFamily: "helvetica",
  },
  navContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  newRecipeBtn: {
    height: '25px',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  searchContainer: {
    display: "flex",
    padding: "5px",
    marginTop: "5px",
    marginBottom: "5px",
  },
  searchText: {
    color: 'white',
  },
  searchIcon: {
    alignSelf: "flex-end",
    marginBottom: "5px",
    color: 'black',
  },
  searchInput: {
    width: "200px",
    margin: "5px",
  },
}));

const GridView = (props) => {
  const classes = useStyles();
  const { history } = props;
  const [recipeData, setRecipeData] = useState(mockData);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get(`./Mock`)
      .then(function (response) {
        const { data } = response;
        const { results } = data;
        const newRecipeData = {};
        results.forEach((recipe, index) => {
          newRecipeData[index + 1] = {
            id: index + 1,
            name: recipe.name,
          };
        });
        setRecipeData(newRecipeData);
      });
  }, []);

  const handleSearchChange = (e) => {
    setFilter(e.target.value);
  };

  const handleNewRecipeForm = () => {
    console.log('btn clicked');
  };

  const getRecipeCard = (recipeID) => {
    const { id, name, image } = recipeData[recipeID];
    return (
      <Grid item xs={4} key={recipeID} className={classes.cardHover}>
        <Card onClick={() => history.push(`/${id}`)} >
          <CardMedia
            className={classes.cardMedia}
            image={image}
            style={{ width: "100%", height: "250px" }}
          />
          <CardContent className={classes.cardContent}>
            <Typography className={classes.cardTitle}> {toFirstCharUppercase(name)} </Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  return (
    <>
      <AppBar position="static" className={classes.navBar}>
        <Toolbar>
            <div className={classes.navContainer}>
              <div className={classes.searchContainer}>
                <SearchIcon className={classes.searchIcon} />
                <TextField
                  className={classes.searchInput}
                  onChange={handleSearchChange}
                  label="Recipes"
                  variant="standard"
                />
              </div>
              <Button 
              variant="contained"
              className={classes.newRecipeBtn}
              onClick={handleNewRecipeForm}
              size="small"
              >Add Recipe
              </Button>
            </div>
        </Toolbar>
      </AppBar>
      {recipeData ? (
        <Grid container spacing={2} className={classes.recipeContainer}>
          {Object.keys(recipeData).map(
            (recipeID) =>
              recipeData[recipeID].name.includes(filter) &&
              getRecipeCard(recipeID)
          )}
        </Grid>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};
export default GridView;