import axios from 'axios'
import React, { useEffect } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
    Grid,
    Paper,
    Button,
    Box
} from "@material-ui/core";
import img from '../../../img/good.png'

const Validation = () => {
    const { token } = useParams()
    const verif = () => {
        const body = {
            token: token
        }
        axios.post('/api/admin/activate', body)

    }
    const paperStyle = {
        padding: 40,
        width: 800,
        margin: "20px auto",
    };

    useEffect(() => {
        verif()
        setTimeout(async () => {
            await axios.post('/api/admin/creeDb');
        }, 1000)
    }, [])
    return (
        <div>
            <Grid >
                <Paper elevation={0} style={paperStyle}>
                    <Grid align="center">
                        <img src={img} style={{ width: '60%', height: '60%', borderRadius: '10px' }} />
                        <h3 style={{ fontFamily: 'nunito', marginTop: '10px' }}>Demande accepter avec succés</h3>
                    </Grid>
                </Paper>
            </Grid>

        </div>
    )

}

export default Validation
