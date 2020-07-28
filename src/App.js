import React, { useRef, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/core/Menu';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import './App.css';

const useStyle = makeStyles ((theme) => ({
  box1: {
    marginLeft: theme.spacing(10),
    height: "75%",
  },
  buttons: {
    margin: 5,
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const App = () => {
  
  const [open, setOpen] = React.useState(false);
  const [post, setPost] = React.useState("");
  const [posted, setPosted] = React.useState("");

  useEffect(() => {

  }, []);

  const postPost = () => {
    setPosted(post);
    console.log(post);
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleChangePost = (event) => {
    setPost(event.target.value);
    console.log(post);
  };



  return (
    <div className="App">
       <AppBar position="static">
        <Toolbar variant="dense">
        <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Button color="inherit">My Feed</Button>
          <Button color="inherit" onClick={handleClickOpen}>New Post</Button>
        
        </Toolbar>
      </AppBar>
      <Dialog open={open} TransitionComponent={Transition} fullWidth="true"
        keepMounted onClose={handleDialogClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Write a new post!</DialogTitle>
          <DialogContent>
            <Typography>Max 490 characters</Typography>
            <TextField
              id="new-post"
              multiline
              margin="dense"
              onChange={handleChangePost}
              rows={7}
              defaultValue="What would you like to say?"
              variant="filled"
              fullWidth
              inputProps={{ maxLength: 490 }}
            />
            
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              Close
            </Button>
            <Button onClick={postPost} color="primary">
              Post
            </Button>
          </DialogActions>
        </Dialog>
        <Box width={1/2} padding={5} 
        paddingBottom={10}  
        className={ useStyle.box1 }>
          <Typography>{posted}</Typography>
          
        </Box>


    </div>
  );
}

export default App;
