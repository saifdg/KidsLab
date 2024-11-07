import Axios from 'axios'
import React, { useEffect } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
    Grid,
    Paper,
    Button,
    Box
} from "@material-ui/core";
import bravo from '../../img/bravo.gif'
import axios from 'axios'

const Validation = () => {
    const { token } = useParams()
    let auth = useSelector((state) => state.Auth.isAuthenticated)
    const verif = () => {
        const body = {
            token: token
        }
        Axios.post('/api/users/activate', body)

    }
    const paperStyle = {
        padding: 40,
        width: 800,
        margin: "20px auto",
    };

    useEffect(() => {
        verif()
        setTimeout(async()=>{
           await axios.post('/api/users/creeDb');
        },1000)
    }, [])
    

    if (auth) {
        return <Redirect to='/' />
    }
    return (
        <div>
            <Grid >
                <Paper elevation={0} style={paperStyle}>


                    <Grid align="center">
                    <img src={bravo} style={{width:'60%',height:'60%',borderRadius:'10px'}} />
                   <h1 style={{fontFamily:'nunito',marginTop:'20px',fontWeight:'bold'}}>Félicitations,</h1>
                   <h3 style={{fontFamily:'nunito',marginTop:'10px'}}>A partir de maintenant vous êtes membre de notre famille<span style={{fontWeight:'bold'}}> kids <span style={{color:'orange'}}>lab</span> </span></h3>
                    </Grid>
                </Paper>
            </Grid>

        </div>
    )
}

export default Validation
