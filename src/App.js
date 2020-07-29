import React, { useRef, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Container from '@material-ui/core/Container';
import './App.css';

const useStyle = makeStyles ((theme) => ({
  box1: {
    marginLeft: theme.spacing(5),
    height: "75%",
  },
  box2: {
    margin: theme.spacing(2),
    height: "15%",
    padding: theme.spacing(2),
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
  const [posted, setPosted] = React.useState("Hello world!");
  const [user, setUser] = React.useState("Santiago posted:");

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

  const styledClasses = useStyle();

  const DisplayPost = ({user,content}) => {
    return(
      <Box className={styledClasses.box1}>
        <Typography variant="h6" align="left" gutterBottom>{user}</Typography>
        <Box className={styledClasses.box2} border={1}>
          <Typography variant="body1" align="justify" gutterBottom>{content}</Typography>
        </Box>
      </Box> 
    );

  }

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
      <Dialog open={open} TransitionComponent={Transition} fullWidth
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
        <Container maxWidth="sm">
          <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }}>
            <DisplayPost user={user} content={posted}/>
          </Typography>
          
        </Container>
        


    </div>
  );
}

export default App;
