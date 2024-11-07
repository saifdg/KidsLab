import React, { useEffect, useState } from 'react'
import { connect, useSelector } from 'react-redux'
import PropTypes from 'prop-types';
import Moment from 'react-moment'
import { removeComment } from '../../../action/Posts';
import {
    Paper,
    Box,
    Grid,
    Button
} from '@material-ui/core'
import axios from 'axios';


const CommentItem = ({
    postId,
    comment: { _id, text, name, avatar, user, date },
    auth,
    removeComment
}) => {
    const users = useSelector(state => state.Auth.user)
 
    return (
        <Paper elevation={8} style={{ padding: '20px', width: '80%', marginTop: '10px', justifyContent: 'center', alignItems: 'center', fontFamily: 'nunito' }}>
            <Grid align='center'>
                <div class="post bg-white p-1 my-1">
                    <div>

                        <img
                            className="round-img"
                            src={avatar}
                            alt=""
                        />
                        <h4 style={{ marginTop: '10px' }}>{name}</h4>


                    </div>
                    <div>
                        <h5 className="my-1">
                            {text}
                        </h5>
                        <p className="post-date">
                            Posté le <Moment format='YYYY/MM/DD'>{date}</Moment>
                        </p>

                        <Button
                            style={{ width: '40px', height: '40px', marginLeft: '10px' }}
                            onClick={(e) => { removeComment(postId, _id) }}
                            variant="contained"
                            color="secondary"

                        >
                            <i className="fas fa-times"></i>
                        </Button>

                    </div>
                </div>
            </Grid>
        </Paper>
    )
}
CommentItem.prototype = {
    postId: PropTypes.number.isRequired,
    comment: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    removeComment: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
    auth: state.Auth
})

export default connect(mapStateToProps, { removeComment })(CommentItem)
