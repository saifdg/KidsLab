import React, { useState } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import { addComment } from '../../../action/Posts';
import Alert from "../../Layout/Alert"
import {
  Paper,
  Box,
  Grid,
  Button,
  Dialog,
  TextField
} from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Slide from '@material-ui/core/Slide';
import './Text.css';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;

});

const CommentForm = (props) => {
  const posts = useSelector(state => state.posts)
  const auth = useSelector(state => state.Auth)
  const [text, setText] = useState('')
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const submit = (e) => {
    e.preventDefault();
    dispatch(addComment(props.id, { text }))
    setText('')
  }
  return (
    <div className="post-form">

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <Paper style={{ padding: '20px' }}>
          <Grid align="center">
            <Alert />
            <textarea
              placeholder="Ajouter un commentaire"
              rows="20"
              name="text"
              value={text}
              onChange={e => setText(e.target.value)}
              id="comment_text"
              cols="40"
              class="ui-autocomplete-input"
              autocomplete="off"
              role="textbox"
              aria-autocomplete="list"
              aria-haspopup="true" />

            <Button style={{ marginTop: '20px' }} variant="contained" color="primary" type="submit" onClick={submit}>Poster</Button>
          </Grid>
        </Paper>

      </Dialog>
      <Button style={{
        position: 'fixed',
        bottom: '50%',
        right: '5px',
        display: 'block',
    
        background: 'rgba(0, 0, 0, 0.5)',
        color: '#fff'
      }}
        onClick={handleClickOpen}
      >

        <AddCircleOutlineIcon style={{ fontSize: '8vh', color: '#02ed0a' }} />
        Ajouter un commentaire

      </Button>


    </div>
  )
}

export default CommentForm
