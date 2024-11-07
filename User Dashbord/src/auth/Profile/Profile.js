import React, { useState, useRef, useEffect } from "react";
import {
  Grid,
  Paper,
  Button,
  CircularProgress,
  TextField
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Avatar from '@material-ui/core/Avatar';
import { connect, useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import EditIcon from '@material-ui/icons/Edit';

import { Formik, Form, Field } from "formik";
import BackspaceIcon from '@material-ui/icons/Backspace';
import { setAlert } from "../../action/alert";
import Alert from "../../components/layout/Alert";
import { UpdateAll, UpdateUser, loadUser } from '../../action/auth'
import Moment from 'react-moment'

const Profile = ({ setAlert, auth, UpdateAll, UpdateUser }) => {
  const dispatch = useDispatch()
  const root = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Nunito",

  };
  let user = useSelector((state) => state.Auth.user)
  const paperStyle = {
    padding: 40,
    width: 320,
    margin: "20px auto",
  };
  const btnStyle = { marginTop: 10 };
  const [formData, setFormData] = useState({
    initialValues: {
      firstName: user && user.firstName,
      lastName: user && user.lastName,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }
  })

  const refer = useRef(null);

  const handleClick = () => {
    refer.current.click()

  }
  const [pass, setPass] = useState(false)
  const [edit, setEdit] = useState(false)
  const [img, setImg] = useState('')
  const [imgPrev, setImgPrev] = useState(user.file)
  const sleep = (time) => new Promise((acc) => setTimeout(acc, time));

  const handleImg = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    setImg(e.target.files[0])
    reader.onloadend = () => {


      setImgPrev(reader.result)
     
    }

    reader.readAsDataURL(e.target.files[0]);
  }

  const handleR = () => {
    setPass(false);
    setEdit(false);
  }

  const handleSubmit = async (values, props) => {
    await sleep(3000)
    formData.initialValues.file = img
    values.file = img
    const id = user._id
    const Form = new FormData()
    Form.append('file', img ? img : 'old')
    Form.append('img', user && user.file)
    Form.append('firstName', values.firstName)
    Form.append('lastName', values.lastName)
    Form.append('newPassword', values.newPassword)
    Form.append('oldPassword', values.currentPassword)
    const { firstName, lastName, newPassword, confirmPassword, currentPassword, file } = values

    if (newPassword !== confirmPassword && confirmPassword !== '' && newPassword !== '') {
      console.log(user && user.file)
      setAlert('Mot de passe non identique ', 'danger');
    } else if (confirmPassword == '' && newPassword == '' && currentPassword == '') {
      UpdateUser(Form, id)
    }
    else {
      UpdateAll(Form, id)
    }

    //setPass(false)

  }
  useEffect(() => {
    setFormData({
      initialValues: {
        firstName: user && user.firstName,
        lastName: user && user.lastName,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
        file: user && user.file,
      }

    })
    setImgPrev(user && user.file)
  }, [user])
  return (
    <div className={root}>
      <Grid >
        <Paper elevation={0} style={paperStyle}>
          {!edit ? <div>

            <Grid align="center">
              <Box mt={2}>
                <Avatar alt="Remy Sharp" src={user.file} style={{ width: '100px', height: '100px' }} />
                <Box mt={2}>
                  <h3 style={{ fontFamily: "Nunito", fontWeight: 'bold' }}>{user.firstName} {user.lastName}</h3>
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
                    Date d'expiration : <Moment format='YYYY/MM/DD'>{user.dateexp}</Moment>
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
                onSubmit={handleSubmit}
              >
                {({
                  errors,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  isSubmitting,
                  touched,
                  values
                }) => (
                  <>
                    <form onSubmit={handleSubmit}>

                      <Box mt={1} >
                        <TextField
                          error={Boolean(touched.name && errors.name)}
                          margin="normal"
                          onBlur={handleBlur}
                          name="firstName"
                          label="Nom"
                          fullWidth
                          onChange={handleChange}
                          value={values.firstName}

                        />
                      </Box>
                      <Box mt={2}>
                        <TextField
                          error={Boolean(touched.name && errors.name)}
                          margin="normal"
                          onBlur={handleBlur}
                          name="lastName"
                          label="Prénom"
                          fullWidth
                          onChange={handleChange}
                          value={values.lastName}

                        />
                      </Box>
                      <Box style={{ display: 'flex' }} mt={2} ml={0.5}>
                        <input
                          id="file"
                          name="image"
                          type="file"
                          multiple={true}
                          onChange={(e) => handleImg(e)}
                          style={{ display: 'none' }}
                          ref={refer}
                        />
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleClick}
                          style={{ height: '40px', marginTop: "20px" }}
                        >
                          Choisir une image
                        </Button>
                        <Box mt={1.5} ml={2}>
                          <Avatar alt="Remy Sharp" src={imgPrev} style={{ width: '60px', height: '60px' }} />
                        </Box>
                      </Box>


                      {!pass ?
                        <Box mt={2} ml={1.5}><Button onClick={() => setPass(true)}>Modifié le mot de passe</Button></Box> :
                        <div>
                          <Box mt={2}>

                            <TextField
                              margin="normal"
                              onBlur={handleBlur}
                              name="currentPassword"
                              label="ancien mot de passe"
                              type="password"
                              fullWidth
                              onChange={handleChange}
                              value={values.currentPassword}
                            />
                          </Box>
                          <Box mt={2}>

                            <TextField
                              margin="normal"
                              onBlur={handleBlur}
                              name="newPassword"
                              label="Nouveu mot de passe"
                              type="password"
                              fullWidth
                              onChange={handleChange}
                              value={values.newPassword}
                            />
                          </Box>
                          <Box mt={2}>
                            <TextField
                              margin="normal"
                              onBlur={handleBlur}
                              name="confirmPassword"
                              label="Confirme mot de passe"
                              type="password"
                              fullWidth
                              onChange={handleChange}
                              value={values.confirmPassword}
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

                    </form>
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
  UpdateAll: PropTypes.func.isRequired,
  UpdateUser: PropTypes.func.isRequired,
}
const mapStateProps = state => ({
  auth: state.Auth
});

export default connect(mapStateProps, { setAlert, UpdateAll, UpdateUser })(Profile)
