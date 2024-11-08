import React, { useState } from "react";
import {
  Grid,
  Paper,
  Button,
  Typography,
  Avatar,
  Link,
  CircularProgress
} from "@material-ui/core";
import { TextField, CheckboxWithLabel } from "formik-material-ui";
import { Formik, Form, Field } from "formik";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../action/auth';
import Alert from "../../components/layout/Alert";
import { Redirect } from "react-router-dom";
import Box from "@material-ui/core/Box";
import {useHistory } from 'react-router';



const Signup = ({ login, isAuthenticated }) => {
  const paperStyle = {
    padding: 30,
    width: 280,
    margin: "20px auto",
  };
  const history=useHistory()
  const btnStyle = { marginTop: 10 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };

  const sleep = (time) => new Promise((acc) => setTimeout(acc, time));

  const [formData, setFormData] = useState({
    initialValues: {
      email: "",
      password: ""
    }
  })

  const handleSubmit = async (values) => {
    formData.initialValues = values
    const { email, password } = formData.initialValues;

    await sleep(3000);

    login({ email, password });

    if (isAuthenticated) {
      return  history.push('/')
    }

  }




  //redirect if logged in

  if (isAuthenticated) {
    return  history.push('/')
  }

  return (
    <Grid>
      <Paper elevation={0} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>S'identifier</h2>
        </Grid>
        <Grid align="center">
          <Typography variant="caption">
            Remplissez le formulaire pour vous connecter sur votre compte
          </Typography>
        </Grid>
        <Alert />
        <Formik
          initialValues={formData.initialValues}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ isSubmitting }) => (
            <>
              <Form>
                <Box mt={1}>
                  <Field
                    component={TextField}
                    name="email"
                    label="E-mail"
                    fullWidth


                  />
                </Box>
                <Box mt={2}>
                  <Field
                    component={TextField}
                    name="password"
                    label="Mot de passe"
                    type="password"
                    fullWidth

                  />
                </Box>
                <Box mt={2}>
                  <Button
                    startIcon={
                      isSubmitting ? <CircularProgress size="1rem" /> : null
                    }
                    fullWidth
                    type="submit"
                    style={btnStyle}
                    disabled={isSubmitting}
                    variant="contained"
                    color="primary"
                  >
                    Connexion
              </Button>
                  <Typography style={{marginTop:'20px'}}>
                    <Link href="/ForgetPassword"> Mot de passe oublié ?</Link>
                  </Typography>
                  <Typography>
                    tu n'as pas de compte ?<Link href="/Registre">INSCRIRE</Link>
                  </Typography>
                </Box>
              </Form>
            </>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
};

Signup.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated
});

export default connect(mapStateProps, { login })(Signup);
