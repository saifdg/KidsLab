import React, { useEffect, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getPost } from '../../action/Posts'
import { GameContext } from '../gameWrapper/Context/GameProvider';
import img from '../../img/giphy.gif'
import PostItem from './PostItem';
import { Link, Button, Grid } from '@material-ui/core';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import Alert from '../../components/layout/Alert';
import { Paper } from '@material-ui/core'
import BackspaceIcon from '@material-ui/icons/Backspace';
const Post = (props) => {
    const dispatch = useDispatch()
    const post = useSelector(state => state.post)
    const auth = useSelector(state => state.Auth)
    const state = useContext(GameContext)


    //console.log
    useEffect(() => {
        dispatch(getPost(props.match.params.id))
        state.unshowed()
    }, [])

    if (!auth.isAuthenticated) {
        return <Redirect to='/' />
    }
    return post.loading || post.post === null ? <img src={img} style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', marginBottom: '22px' }} /> : <>
        <Paper style={{ marginTop: '70px', background: 'rgba(0, 0, 0, 0.5)', padding: '40px' }}>
            <Button
            startIcon={<BackspaceIcon/>}
                variant="contained"
                color="secondary"
                href='/Forum'
                style={{
                    color:'#fff',
                    position: 'fixed',
                    bottom: '50%',
                    left: '5px',
                }}
            >Retour
            </Button>
            <Grid align='center'>
                <PostItem {...post.post} />
                <div style={{marginTop:'20px'}}/>
                {post.post.comment.map(comments => (
                    <CommentItem key={comments._id} comment={comments} postId={post.post._id} />
                ))}
                <CommentForm id={post.post._id} />
            </Grid>
        </Paper>
    </>
}

export default Post
