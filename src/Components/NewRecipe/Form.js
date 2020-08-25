import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  directions: {
    height: '200px',
  }
}));

function Form() {
  const classes = useStyles();

  return (
    <form id="form" className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField required id="standard-required" label="Required" defaultValue="Dish Name" />
      </div>
      <div>
        <TextField
          required
          id="outlined-required"
          label="Ingredients"
          variant="outlined"
          defaultValue=""
        />
         <TextField
          required
          id="outlined-required"
          label="Directions"
          variant="outlined"
          className={classes.directions}
          defaultValue=""
        />
      </div>
      <div>
        <Button
            variant="contained"
            component="label"
        >
        Upload Img
          <input
            type="file"
            style={{ display: "none" }}
          />
        </Button>
      </div>
      <div>
        <Button variant="contained" color="secondary">
          Cancel
        </Button>
        <Button variant="contained" color="primary">
          Add
        </Button>
      </div>
    </form>
  );
}

export default Form;