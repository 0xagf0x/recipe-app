import React from "react";
import GridView from "./GridView";
import Recipe from "./Recipe";
import { Route, Switch } from "react-router-dom";

document.body.style.backgroundColor="#7395ae";
document.body.style.margin="0";

const App = () => (
  <Switch>
    <Route exact path="/" render={(props) => <GridView {...props} />} />
    <Route
      exact
      path="/:recipeID"
      render={(props) => <Recipe {...props} />}
    />
  </Switch>
);

export default App;