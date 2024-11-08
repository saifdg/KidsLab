import React, { useState } from 'react'
import {
    Button,
    TextField,
    makeStyles,
    Paper,
    Grid,
    Box
} from '@material-ui/core'
import { Reset } from '../../action/auth'
import { setAlert } from '../../action/alert'
import { connect, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Alert from '../../components/layout/Alert'
import { Redirect } from 'react-router';
import { useParams } from 'react-router-dom'


const initialState = {
    password: '',
    ConfirmPassword: ''

}

const useStyles = makeStyles({
    fg_pass: {
        color: "#555",
        textTransform: "uppercase",
        textAlign: "center",
        fontSize: "2rem",
        margin: '30px 0',
        letteSpacing: "1.3px"
    },
    row: {
        maxWidth: "500px",
        margin: "auto",
        padding: "0 10px",
    },
    paper: {
        padding: 40,
        alignItems: "center",
        margin: '20px auto',
        justifyContent: 'center',
        display: 'block'
    },
    fg: {
        color: "#555",
        textTransform: "uppercase",
        textAlign: "center",
        fontSize: "1.5rem",
        margin: '20px 0',
        letteSpacing: "1.3px"
    },
});

const ResetPassword = ({ setAlert, Reset }) => {
    let auth = useSelector((state) => state.Auth.isAuthenticated)
    const classes = useStyles()
    const { token } = useParams()
    const [data, setData] = useState(initialState)
    const handleChangeInput = e => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    const resetPassword = () => {
        if (data.password !== data.ConfirmPassword) {
            setAlert("le mot de passe ne correspond pas", 'danger')
        } else {
            const obj = {
                password: data.password,
                token: token
            }
            Reset(obj)
        }
    }

    if(auth){
        return <Redirect to='/' />
    }
    return (
        <div>
            <Grid align='center'>
                <Paper className={classes.paper}>
                    <Grid >
                        <h2 className={classes.fg_pass} >Réinitialiser le mot de passe</h2>
                        <Alert />
                        <Box style={{ display: 'block' }}>
                            <Box mt={0}>
                                <TextField
                                    type='password'
                                    name="password"
                                    variant='outlined'
                                    label='Nouveau mot de passe'
                                    value={data.email}
                                    onChange={handleChangeInput}
                                />
                            </Box>
                            <Box mt={2}>
                                <TextField
                                    type='password'
                                    name="ConfirmPassword"
                                    variant='outlined'
                                    label='Confirmez le mot de passe'
                                    value={data.ConfirmPassword}
                                    onChange={handleChangeInput}

                                />
                            </Box>

                            <Button
                                style={{ marginTop: '20px' }}
                                variant="contained"
                                color="primary"
                                onClick={resetPassword}>
                                confirmer !
                            </Button>
                        </Box>


                    </Grid>
                </Paper>
            </Grid>
        </div>
    )
}
ResetPassword.prototype = {
    setAlert: PropTypes.func.isRequired,
    Reset: PropTypes.func.isRequired,
}
export default connect(null, { setAlert, Reset })(ResetPassword)
