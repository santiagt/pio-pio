import React, { useRef, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, rgbToHex } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import './App.css';


const useStyle = makeStyles ((theme) => ({
  box1: {
    marginLeft: theme.spacing(5),
    height: "35%",
  },
  box2: {
    margin: theme.spacing(2),
    height: "40%",
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
  const [allPost, setAllPost] = React.useState([]);



  useEffect(() => {
    getPost();
  }, []);

  const postPost = () => {
    const payLoad = {
      user: "Santiago",
      content: post,
      date: Date.now()
    };

    axios({
      url: "http://localhost:8080/api/save",
      method: "POST",
      data: payLoad
    }).then((res) => {
      console.log(res + " was send to the server");
      setPost("");
      getPost();
    }).catch((error) => {
      console.log("Internal server error");
    })


    console.log(post);
    setOpen(false);
    
  };

  const getPost = () => {

    axios.get('http://localhost:8080/api')
    .then((response) => {
      const data = response.data;
      setAllPost(data);
      console.log("Data has been recieved");
    })
    .catch(() => {
      console.log("something went wrong!");
    })
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleChangePost = (event) => {
    setPost(event.target.value);
  };

  const styledClasses = useStyle();

  const DisplayPosts = () => {
    const toPage = allPost.reverse().map((pos, index) => {
      return (
        <Box className={styledClasses.box1} key={index}>
        <Typography variant="h6" align="left" gutterBottom>{pos.user + " says:"}</Typography>
        <Box className={styledClasses.box2} border={1} 
          style={{ background: "#d9d9d9", 
                   borderRadius: "10px",
                   boxShadow: "0px 5px 10px rgb(70, 70, 70)" }}>
          <Typography variant="body1" align="justify" gutterBottom>{pos.content}</Typography>
        </Box>
      </Box> 
      );

    });
    return toPage;    
      
    
  }
  

  return (
    <div className="App">
      <AppBar position="static" style={{ background: "#407dbf" }}>
        <Toolbar variant="dense">
        <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Button color="inherit">My Feed</Button>
          <Button color="inherit" onClick={handleClickOpen}>New Post</Button>
          <div style={{flex:'0.3'}}/>
          <Typography variant="h5" color="inherit" align="center">Pio-Pio!</Typography>
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
          <Typography component="div" style={{ backgroundColor: '#808080', height: '100%' }}>
              <DisplayPosts />
          </Typography>
          
        </Container>
        


    </div>
  );
}

export default App;
