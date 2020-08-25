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
    width: 300,
    backgroundColor: '#e8e8e8',
    border: '2px solid #000',
    borderRadius: "10px",
    boxShadow: theme.shadows[5],
  },
  formRow: {
    textAlign: 'center',
    margin: '10px 0px',
    padding: '10px 0px',
    width: '100%',
  },
  buttonRow: {
    backgroundColor: 'grey',
    display: 'flex',
    padding: '20px 0px',
    justifyContent: 'space-around',
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

  const handleSubmit = () => {
    alert('submit modal test');
  };

  const handleClose = () => {
    setOpen(false);
  };

  const modalForm = (
    <div style={modalStyle} className={classes.paper}>
      <form id="form" className={classes.root} noValidate autoComplete="off">
        <div className={classes.formRow}>
          <TextField required id="standard-required" label="Dish Name" />
        </div>
        <div className={classes.formRow}>
          <TextField
            required
            id="outlined-required"
            label="Ingredients"
            variant="outlined"
            defaultValue=""
          />
        </div>
        <div className={classes.formRow}>
          <TextField
            required
            id="outlined-required"
            label="Directions"
            variant="outlined"
            className={classes.directions}
            defaultValue=""
          />
        </div>
        <div className={classes.formRow}>
          <Button
              variant="contained"
              component="label"
          >
            Image
            <input
              type="file"
              style={{ display: "none" }}
            />
          </Button>
        </div>
        <div> 
          <div className={classes.buttonRow}>
            <Button 
            color="primary"
            onClick={handleSubmit}
            >
              Add
            </Button>
            <Button 
            color="secondary"
            onClick={handleClose}
            >
              Cancel
            </Button>
          </div>
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
        {modalForm}
      </Modal>
    </div>
  );
}

export default NewRecipeModal;