import React, { useState } from "react";
import { Formik, Form, Field } from 'formik';
import {
    Box,
    Button,
    Container,
    Grid,
    Link,
    Typography,
    Paper, CircularProgress
} from '@material-ui/core';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Alert from '../Layout/Alert'
import { login } from '../../action/auth'
import { Redirect } from 'react-router-dom'
import { TextField } from "formik-material-ui";

const Login = ({ login, auth: { isAuthenticated } }) => {

    const paperStyle = {
        padding: 50
    };
    const sleep = (time) => new Promise((acc) => setTimeout(acc, time));
    const [formData, setFormData] = useState({
        initialValues: {
            email: "",
            password: "",
        }
    })
    const handleSubmit = async (values) => {
        formData.initialValues = values
        const { email, password } = formData.initialValues;
        await sleep(3000)
        login({ email, password })
    }
    if (isAuthenticated) {
        return <Redirect to='/app' />
    }
    return (
        <Grid style={{ marginTop: '100px' }}>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    justifyContent: 'center'
                }}
            >
                <Container maxWidth="sm">
                    <Formik
                        initialValues={formData.initialValues}
                        onSubmit={(values) => handleSubmit(values)}
                    >
                        {({
                            isSubmitting
                        }) => (
                            <>

                                <Form>
                                    <Paper elevation={5} style={paperStyle}>
                                        <Box sx={{ mb: 3 }}>
                                            <Typography
                                                color="textPrimary"
                                                variant="h2"
                                                style={{ fontWeight: 'bold' }}
                                            >
                                                S'identifier
                                             </Typography>
                                        </Box>

                                        <Box
                                            sx={{
                                                pb: 1,
                                                pt: 3
                                            }}
                                        >
                                        </Box>
                                        <Field
                                            name="email"
                                            fullWidth
                                            component={TextField}
                                            label="Adresse E-mail"
                                            margin="normal"
                                            variant="outlined"


                                        />
                                        <Field
                                            name="password"
                                            fullWidth
                                            component={TextField}
                                            label="Mot de passe"
                                            margin="normal"
                                            type="password"
                                            variant="outlined"
                                        />
                                        <Box sx={{ py: 2 }} mt={1}>
                                            <Alert />
                                            <Button
                                                startIcon={
                                                    isSubmitting ? <CircularProgress size="1rem" /> : null
                                                }
                                                color="primary"
                                                disabled={isSubmitting}
                                                fullWidth
                                                size="large"
                                                variant="contained"
                                                type="submit"
                                            >
                                                Sign in now
                                          </Button>
                                        </Box>
                                    </Paper>
                                </Form>


                            </>
                        )}
                    </Formik>
                </Container>
            </Box>
        </Grid>
    );
};
Login.propTypes = {
    login: PropTypes.func.isRequired,
}
const mapStateProps = state => ({
    auth: state.Auth
});
export default connect(mapStateProps, { login })(Login);