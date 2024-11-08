import {
    Grid, Paper, Box, Button, CircularProgress
} from '@material-ui/core'
import { Formik, Form, Field } from 'formik'
import React, { useRef, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Radio from "@material-ui/core/Radio";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { register } from '../../action/auth'
import Alert from '../Layout/Alert'
import { setAlert } from '../../action/alert'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {TextField}from '@material-ui/core'



const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 180,
    }
}));


const RegisterUser = ({ setAlert, register }) => {
    const classes = useStyles();
    const refer = useRef(null);
    
    const handleClick = () => {
        refer.current.click()

    }

    const sleep = (time) => new Promise((acc) => setTimeout(acc, time));

    const [img, setImg] = useState(null)
    const [imgPrev, setImgPrev] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png')

    const handleImageChange = (e) => {
        e.preventDefault();
        setImg(e.target.files[0])

        let reader = new FileReader();
        reader.onloadend = () => {
            setImgPrev(reader.result)

        }
        reader.readAsDataURL(e.target.files[0]);
    }
    const [value, setValue] = useState({
        showPassword: false,
        showCPassword: false,
      });
      const handleClickShowPassword = () => {
        setValue({ ...value, showPassword: !value.showPassword });
      };
      const handleClickShowCPassword = () => {
        setValue({ ...value, showCPassword: !value.showCPassword });
      };

    const [formData, setFormData] = useState({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            gender: "",
            password: "",
            confirmPassword: "",
            sub: 'unlimit',
            role: 'user'
        }
    })

    const handleSubmit = async (values) => {
        const Form = new FormData()
        Form.append('file', img ? img : 'none')
        Form.append('firstName', values.firstName)
        Form.append('lastName', values.lastName)
        Form.append('email', values.email)
        Form.append('gender', values.gender)
        Form.append('password', values.password)
        Form.append('sub', values.sub)
        Form.append('role', values.role)
        await sleep(3000);
        /*alert(JSON.stringify({firstName,lastName,email,gender,password,file,sub}), null, 2);*/
        if (values.password !== values.confirmPassword) {
            setAlert('Mot de passe non identique', 'danger');
        }else {
            register(Form)
        }
    }

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Formik
                            initialValues={formData.initialValues}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting, values, handleChange ,handleSubmit}) => (
                                <>
                                    <form  onSubmit={handleSubmit} >
                                        <Box my={1} ml={3}>
                                            <TextField
                                                type="text"
                                                name="firstName"
                                                label="Nom"
                                                autoComplete="off"
                                                fullWidth
                                                onChange={handleChange}
                                                value={values.firstName}
                                            />
                                        </Box>
                                        <Box my={1} ml={3}>
                                            <TextField
                                                type="text"
                                                name="lastName"
                                                label="Prénom"
                                                onChange={handleChange}
                                                value={values.lastName}
                                                autoComplete="off"
                                                fullWidth
                                            />

                                        </Box>
                                        <Box my={1} ml={3}>
                                            <TextField
                                                type="email"
                                                name="email"
                                                label="E-mail"
                                                onChange={handleChange}
                                                value={values.email}
                                                autoComplete="off"
                                                fullWidth
                                            />
                                        </Box>
                                        <Box my={3} ml={3}>
                                            <FormLabel component="legend">Sexe</FormLabel>
                                        </Box>
                                        <Box my={-1} ml={3}>
                                            <RadioGroup
                                                aria-label="Sexe"
                                                name="gender"
                                                style={{ display: "initial", margin: "0" }}
                                                onChange={handleChange}
                                                value={values.gender}

                                            >
                                                <FormControlLabel
                                                    value="female"
                                                    control={<Radio />}
                                                    label="Femme"
                                                />
                                                <FormControlLabel
                                                    value="male"
                                                    control={<Radio />}
                                                    label="Homme"
                                                />
                                            </RadioGroup>
                                        </Box>
                                        <Box ml={3} mt={2} >
                                            <FormControl className={classes.formControl}>
                                                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                                <Select
                                                    name="role"
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={values.role}
                                                    onChange={handleChange}
                                                >


                                                    <MenuItem value="admin">Admin</MenuItem>
                                                    <MenuItem value="Formateur">Formateur</MenuItem>
                                                    <MenuItem value="user">Utilisateur</MenuItem>

                                                </Select>
                                            </FormControl>
                                        </Box>
                                        <Box ml={3} mt={2} >
                                            <FormControl className={classes.formControl}>
                                                <InputLabel id="demo-simple-select">Type d'abonnement</InputLabel>
                                                <Select
                                                    name="sub"
                                                    labelId="demo-simple-select"
                                                    id="demo-simple-select"
                                                    value={values.sub}
                                                    onChange={handleChange}
                                                >


                                                    <MenuItem value="mensuel">Mensuel</MenuItem>
                                                    <MenuItem value="annuel">Annuel</MenuItem>
                                                    <MenuItem value="unlimit">Non limité</MenuItem>

                                                </Select>
                                            </FormControl>
                                        </Box>
                                        <Box my={1} ml={3} mt={3} style={{ display: 'flex' }}>
                                            <Box>
                                                <label>Téléchargez votre image :{"   "}</label>
                                            </Box>
                                            <Box mt={5} ml={-21} style={{ display: 'flex' }}>
                                                <input
                                                    id="file"
                                                    name="file"
                                                    type="file"
                                                    multiple={true}
                                                    onChange={(e) => handleImageChange(e)}
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
                                                <div className="img-holder" style={{ margin: 'auto', width: '160px', height: '157px', borderRadius: '5px', marginTop: '-50px', marginLeft: "38px", background: imgPrev ? `url("${imgPrev}") no-repeat center/cover` : "#fff" }}>
                                                </div>
                                            </Box>
                                        </Box>

                                        <Box my={1} ml={3}>
                                            <TextField
                                                type={value.showPassword ? "text" : "password"}
                                                name="password"
                                                label="Mot de passe"
                                                onChange={handleChange}
                                                value={values.password}
                                                autoComplete="off"
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={handleClickShowPassword}
                                                            >
                                                                {value.showPassword ? (
                                                                    <Visibility />
                                                                ) : (
                                                                    <VisibilityOff />
                                                                )}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                fullWidth

                                            />
                                        </Box>


                                        <Box my={1} ml={3}>
                                            <TextField
                                                type={value.showCPassword ? "text" : "password"}
                                                name="confirmPassword"
                                                label="Confirme mot de passe"
                                                onChange={handleChange}
                                                value={values.confirmPassword}
                                                autoComplete="off"
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={handleClickShowCPassword}
                                                            >
                                                                {value.showCPassword ? (
                                                                    <Visibility />
                                                                ) : (
                                                                    <VisibilityOff />
                                                                )}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                fullWidth

                                            />
                                        </Box>
                                        <Alert />
                                        <Box mt={2}>
                                            <Button
                                                startIcon={
                                                    isSubmitting ? <CircularProgress size="1rem" /> : null
                                                }
                                                fullWidth
                                                type="submit"
                                                disabled={isSubmitting}
                                                variant="contained"
                                                color="primary"
                                                style={{ padding: "5px" }}
                                            >
                                                Enregistrer !
                                            </Button>
                                        </Box>
                                    </form>
                                </>)
                            }
                        </Formik>

                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}
RegisterUser.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,

}

export default connect(null, { setAlert, register })(RegisterUser)
