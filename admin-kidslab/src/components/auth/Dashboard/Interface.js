import React, { useEffect, useState } from 'react'
import {
    Grid,
    Paper,
    Button,
    TextField,
    Box,
} from "@material-ui/core";
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import axios from 'axios';

const Interface = () => {
    const fetch = async () => {
        const res = await axios.get('/api/users')
        setUser({ location: res.data })
    }
    const [user, setUser] = useState({ location: [] })
    let count = 0
    let paiment = 0
    user.location.map((users) => {
        if (users.role == 'user') { count = count + 1 }
        if (users.sub == 'mensuel') {
            paiment = paiment + 27.34
        } else if (users.sub == 'annuel') {
            paiment = paiment + 217.09
        }

    })
    useEffect(() => {
        fetch()
    }, [])
    return (    
        <div style={{display:'flex',justifyContent:"center"}}>
            <Paper align='center' style={{width:'200px',height:'200px',padding:'20px'}}>
                <SupervisorAccountIcon style={{ fontSize: '100px' }} />
                <Box>
                   <h2>{count}</h2> 
                </Box>
            </Paper>
            <Paper align='center' style={{width:'200px',height:'200px',padding:'20px',marginLeft:'20px'}}>
                <AttachMoneyIcon style={{ fontSize: '100px' }} />
                <Box>
                    <h2>{Math.round(paiment * 100) / 100}</h2>
                </Box>
            </Paper>
        </div>
    )
}

export default Interface
