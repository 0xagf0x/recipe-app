import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    borderRadius: "10px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function NewRecipeModal() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
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
          <Button 
          variant="contained" 
          color="secondary"
          onClick={handleClose}
          >
            Cancel
          </Button>
          <Button variant="contained" color="primary">
            Add
          </Button>
        </div>
      </form>
    </div>
  );

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        New
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="form"
      >
        {body}
      </Modal>
    </div>
  );
}

export default NewRecipeModal;