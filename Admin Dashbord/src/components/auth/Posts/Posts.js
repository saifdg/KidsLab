import React,{useEffect} from 'react'
import {connect}from 'react-redux'
import PropTypes from 'prop-types';
import {getPosts}from '../../../action/Posts'
import{Redirect} from 'react-router-dom'
import img from '../../../img/giphy.gif'
import {Paper} from '@material-ui/core'
import PostItem from './PostItem'
import PostForm from './PostForm'
import './Po.css'
import img1 from "../../../img/forum.png"
import { useSelector } from 'react-redux';

const Posts = ({getPosts,post:{posts,loading}}) => {
useEffect(() => {
    getPosts();
}, [getPosts])
const auth = useSelector(state => state.Auth.isAuthenticated)
if (!auth){
    return <Redirect to='/' />
}
    return loading?<img src={img}  style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', marginBottom: '22px' }}/>:(
        <Paper align='center' style={{background: 'rgba(0, 0, 0, 0.5)',padding:'40px'}}>
         
            <img src={img1} style={{width:'50%',height:'50%',borderRadius:'10px'}} />
            
            <PostForm/>
            <div className='posts' style={{justifyContent:'center',alignItems:'center'}}>
                {posts.map(post=>(
                 <PostItem key={post._id} {...post} />
                ))}
              
            </div>
        </Paper>
    )
}
Posts.prototype={
    getPosts:PropTypes.func.isRequired,
    post:PropTypes.object.isRequired,
}
const mapStateToProps=state=>({
post:state.post,
})
export default connect(mapStateToProps,{getPosts})(Posts)
