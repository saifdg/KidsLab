import React, { useState } from 'react'
import {
    Button,
    TextField,
    makeStyles,
    Paper,
    Grid,
    Box
} from '@material-ui/core'
import { validate } from 'email-validator';
import { Forget } from '../../action/auth'
import { setAlert } from '../../action/alert'
import { connect, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Alert from '../../components/layout/Alert'
import { Redirect } from 'react-router';


const initialState = {
    email: '',
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

const ForgetPassword = ({ setAlert, Forget }) => {
    let auth = useSelector((state) => state.Auth.isAuthenticated)

    const classes = useStyles()
    const [data, setData] = useState(initialState)

    const handleChangeInput = e => {
        setData({ email: e.target.value })
    }

    const forgotPassword = async () => {
        console.log(validate(data.email))
        if (!validate(data.email)) {
            setAlert("E-mail invalide", "danger")
        } else {
            Forget(data.email)
        }
    }
    if (auth) {
        return <Redirect to='/' />
    }

    return (
        <div className="fg_pass">
            <Grid align='center'>
                <Paper className={classes.paper}>
                    <h2 className={classes.fg_pass}>Mot de passe oublié?</h2>




                    <h5 className={classes.fg_pass} >Entrez votre adresse email</h5>
                    <Alert />
                    <TextField
                        type="email"
                        name="email"
                        id="email"
                        variant='outlined'
                        placeholder='Inconnu@gmail.com'
                        value={data.email}
                        onChange={handleChangeInput} />



                    <Button
                        style={{ marginTop: '8px', marginLeft: '20px' }}
                        variant="contained"
                        color="primary"
                        onClick={forgotPassword}>
                        Vérifiez votre e-mail
                        </Button>

                </Paper>
            </Grid>

        </div>
    )
}
ForgetPassword.prototype = {
    setAlert: PropTypes.func.isRequired,
    Forget: PropTypes.func.isRequired,
}

export default connect(null, { setAlert, Forget })(ForgetPassword)
