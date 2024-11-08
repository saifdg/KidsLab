import React, { useState } from 'react'
import {
    Grid,
    Paper,
    Button,
    TextField,
    Box,
} from "@material-ui/core";
import img from '../../img/parent.png'
import { useDispatch } from 'react-redux';
import { mailParents } from '../../action/auth';
import Alert from '../../components/layout/Alert';

const Parents = () => {
    const dispatch = useDispatch()
    const handleChangeInput = e => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }
    const [data, setData] = useState({
        emailParent: '',
        email: '',
        password: ''
    })
    const handleSubmit=()=>{
        
        const body={
            emailParent:data.emailParent,
            email:data.email,
            password:data.password
        }
        dispatch(mailParents(body))
    }
    return (
        <Paper style={{ marginTop: '50px', padding: '30px' }}>
            <Grid align='center' style={{ display: 'flex' }}>
                <img src={img} />
                <div style={{ display: 'block', width: '100%', height: '100%', marginTop: '30px', alignItems: 'center' }}>
                    <h5 style={{ fontFamily: 'nunito', fontWeight: 'bold' }}>Remplissez le formulaire ci-dessous pour obtenir les statistiques de votre enfant</h5>
                    <Box mt={2}>
                        <TextField
                            name='emailParent'
                            type="email"
                            variant='outlined'
                            fullWidth
                            label='Email Parent'
                            value={data.emailParent}
                            onChange={handleChangeInput}
                        />
                    </Box>
                    <Box mt={1}>
                        <TextField
                            name='email'
                            type="email"
                            fullWidth
                            variant='outlined'
                            label='Email Apprenant'
                            value={data.email}
                            onChange={handleChangeInput}
                        />
                    </Box>
                    <Box mt={1}>
                        <TextField
                            name='password'
                            fullWidth
                            type="password"
                            variant='outlined'
                            label='Mot de passe'
                            value={data.password}
                            onChange={handleChangeInput}
                        />
                    </Box>
                    <Alert/>
                    <Box mt={2}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                            >
                            Envoyer
                        </Button>
                    </Box>
                </div>
            </Grid>
        </Paper>
    )
}

export default Parents
