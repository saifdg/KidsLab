import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types';
import { Link } from '@material-ui/core';
import Moment from 'react-moment'
import { connect, useSelector, useDispatch } from 'react-redux'
import { addLike, removeLike, deletePost } from '../../../action/Posts';
import './Po.css'
import { GameContext } from '../../../Context/GameProvider';
import {
    Paper,
    Box,
    Grid,
    Button
} from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const PostItem = (props) => {
    const auth = useSelector(state => state.Auth)
    const dispatch = useDispatch()
    const state = useContext(GameContext)

    return (
        <div >
            <Paper elevation={8} style={{ padding: '20px', width: '80%', marginTop: '10px', justifyContent: 'center', alignItems: 'center', fontFamily: 'nunito' }}>
                <Grid align='center'>
                    <div className="post bg-white p-1 my-1">
                        <div>

                            <img
                                className="round-img"
                                src={props.avatar}
                                alt=""
                            />
                            <h4 style={{ marginTop: '10px' }}>{props.name}</h4>


                        </div>
                        <div>
                            <h5 className="my-1">
                                {props.text}
                            </h5>
                            <p className="post-date">
                                Posté le <Moment format='YYYY/MM/DD'>{props.date}</Moment>      
                            </p>
                            {state.show && <>
                                <Button onClick={(e) => dispatch(addLike(props._id))}
                                    style={{ width: '40px', height: '40px', marginLeft: '10px' }}>
                                    <i className="fas fa-thumbs-up" style={{ color: 'blue', fontSize: '20px' }} />{' '}
                                    <span>{props.likes.length > 0 && (
                                        <span className='comment-count'>{props.likes.length}</span>
                                    )}</span>
                                </Button>

                                <Button onClick={(e) => dispatch(removeLike(props._id))} style={{ width: '40px', height: '40px', marginLeft: '10px' }} >
                                    <i className="fas fa-thumbs-down" style={{ color: 'red', fontSize: '20px' }}></i>{' '}
                                </Button>

                                <Button href={`/app/post/${props._id}`} variant="contained"
                                    style={{ marginLeft: '10px', color: '#fff' }}
                                    color="primary">
                                    Discussion{props.comment.length > 0 && (
                                        <span className='comment-count'>{props.comment.length}</span>
                                    )}
                                </Button>

                                <Button
                                    style={{ width: '40px', height: '40px', marginLeft: '10px' }}
                                    onClick={(e) => dispatch(deletePost(props._id))}
                                    variant="contained"
                                    color="secondary"

                                >
                                    <i className="fas fa-times"></i>
                                </Button>


                            </>}
                        </div>
                    </div>
                </Grid>
            </Paper>
        </div>
    )
}

/*PostItem.prototype = {

  post: PropTypes.object.isRequired,
}*/

export default (PostItem)
