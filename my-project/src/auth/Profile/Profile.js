import React, { useState, useRef } from "react";
import {
  Grid,
  Paper,
  Button,
  CircularProgress
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Avatar from '@material-ui/core/Avatar';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import EditIcon from '@material-ui/icons/Edit';
import { TextField } from "formik-material-ui";
import { Formik, Form, Field } from "formik";
import BackspaceIcon from '@material-ui/icons/Backspace';
import { setAlert } from "../../action/alert";
import Alert from "../../components/layout/Alert";
import { UpdatePassword, UpdateUser } from '../../action/auth'

const Profile = ({ setAlert, auth: { user }, UpdatePassword, UpdateUser }) => {
  const root = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Nunito",

  };
  const paperStyle = {
    padding: 40,
    width: 320,
    margin: "20px auto",
  };
  const btnStyle = { marginTop: 10 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const [formData, setFormData] = useState({
    initialValues: {
      firstName: user && user.firstName,
      lastName: user && user.lastName,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      file: user && user.file,
    }
  })

  const refer = useRef(null);

  const handleClick = () => {
    refer.current.click()

  }
  const [pass, setPass] = useState(false)
  const [edit, setEdit] = useState(false)
  const [img, setImg] = useState(formData.initialValues.file)

  const sleep = (time) => new Promise((acc) => setTimeout(acc, time));

  const handleImg = (e) => {
    let reader = new FileReader();
    formData.initialValues.file = e.target.files[0];
    reader.onload = () => {
      setImg(reader.result)
    }
    reader.readAsDataURL(e.target.files[0]);
  }

  const handleR = () => {
    setPass(false);
    setEdit(false);
  }
  const handleSubmite = async (values) => {
    await sleep(3000)
    const config = {
      Headers: {
        'Content-Type': 'application/json'
      }
    }
    formData.initialValues.file = img
    values.file = img
    const id = user._id
    const { firstName, lastName, newPassword, confirmPassword, currentPassword, file } = values
    if (newPassword !== confirmPassword && confirmPassword !== '' && newPassword !== '') {
      setAlert('Mot de passe non identique ', 'danger');
    } else if (confirmPassword == '' && newPassword == '' &&currentPassword=='' ) {
      UpdateUser({ firstName, lastName, file,id})
    }
    else{
      UpdateUser({ firstName, lastName, file,id})
      UpdatePassword({newPassword,currentPassword})
    }

  }
  return (
    <div className={root}>
      <Grid >
        <Paper elevation={0} style={paperStyle}>
          {!edit ? <div>

            <Grid align="center">
              <Box mt={2}>
                <Avatar alt="Remy Sharp" src={user && user.file} style={{ width: '100px', height: '100px' }} />
                <Box mt={2}>
                  <h3 style={{ fontFamily: "Nunito", fontWeight: 'bold' }}>{user && user.firstName} {user && user.lastName}</h3>
                </Box>
                <Box mt={3}>
                  <h5>
                    {user && user.email}
                  </h5>
                </Box>
                <Box mt={5}>
                  <h6>
                    Type d'abonnement : {user && user.sub}
                  </h6>
                </Box>
                <Box mt={3}>
                  <h6>
                    Date d'expiration : 10/11/2021
              </h6>
                </Box>
              </Box>
            </Grid>
            <Box mt={3}>
              <Grid align='center'>
                <Button variant="contained" color="primary" endIcon={<EditIcon size="1rem" />} onClick={() => setEdit(true)} >Editer</Button>
              </Grid>
            </Box></div>
            ://///////////////////////////////////////////////////////////////////////////
            <div>
              <Box>
                <Grid align='right'>
                  <Button variant="contained" color="secondary" startIcon={<BackspaceIcon size="1rem" />} onClick={handleR} >retour</Button>
                </Grid>
              </Box>
              <Formik
                initialValues={formData.initialValues}
                onSubmit={(e) => handleSubmite(e)}
              >
                {({ isSubmitting }) => (
                  <>
                    <Form>
                      <Box mt={1}>
                        <Field
                          component={TextField}
                          name="firstName"
                          label="Nom"
                          fullWidth


                        />
                      </Box>
                      <Box mt={2}>
                        <Field
                          component={TextField}
                          name="lastName"
                          label="Prénom"
                          fullWidth

                        />
                      </Box>
                      <Box style={{ display: 'flex' }} mt={2} ml={0.5}>
                        <input
                          id="file"
                          name="file"
                          type="file"
                          multiple={true}
                          onChange={(e) => handleImg(e)}
                          style={{ display: 'none' }}
                          ref={refer}
                        />
                        <Button

                          color="primary"
                          onClick={handleClick}
                          style={{ height: '40px', marginTop: "20px" }}
                        >
                          Choisir une image
                      </Button>
                        <Box mt={1.5} ml={2}>
                          <Avatar alt="Remy Sharp" src={img} style={{ width: '60px', height: '60px' }} />
                        </Box>
                      </Box>

                      {!pass ?
                        <Box mt={2} ml={1.5}><Button onClick={() => setPass(true)}>Modifié le mot de passe</Button></Box> :
                        <div>
                          <Box mt={2}>

                            <Field
                              component={TextField}
                              name="currentPassword"
                              label="ancien mot de passe"
                              type="password"
                              fullWidth

                            />
                          </Box>
                          <Box mt={2}>

                            <Field
                              component={TextField}
                              name="newPassword"
                              label="Nouveu mot de passe"
                              type="password"
                              fullWidth

                            />
                          </Box>
                          <Box mt={2}>
                            <Field
                              component={TextField}
                              name="confirmPassword"
                              label="Confirme mot de passe"
                              type="password"
                              fullWidth

                            />
                          </Box>
                        </div>
                      }
                      <Alert />
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
                          style={{ padding: "5px" }}
                        >
                          Confirme !
              </Button>

                      </Box>

                    </Form>
                  </>
                )}
              </Formik>
            </div>
          }

        </Paper>
      </Grid>
    </div>
  )
}
Profile.propTypes = {
  setAlert: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  UpdatePassword: PropTypes.func.isRequired,
  UpdateUser: PropTypes.func.isRequired,
}
const mapStateProps = state => ({
  auth: state.Auth
});

export default connect(mapStateProps, { setAlert, UpdatePassword, UpdateUser })(Profile)
