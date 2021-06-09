import {
    Grid, Paper, Box, Button, CircularProgress
} from '@material-ui/core'
import { Formik, Form, Field } from 'formik'
import React, { useRef, useState } from 'react'
import { TextField } from 'formik-material-ui'
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
import {  register } from '../../action/auth'
import Alert from '../Layout/Alert'
import {setAlert} from '../../action/alert'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));


const RegisterUser = ({setAlert,register}) => {
    const classes = useStyles();
    const refer = useRef(null);

    const handleClick = () => {
        refer.current.click()

    }

    const sleep = (time) => new Promise((acc) => setTimeout(acc, time));
    const [values, setValues] = useState({
        showPassword: false,
        showCPassword: false,
    });
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    const handleClickShowCPassword = () => {
        setValues({ ...values, showCPassword: !values.showCPassword });
    };


    const [img, setImg] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png');

    const handleImageChange = (e) => {

        let reader = new FileReader();
        formData.initialValues.file = e.target.files[0];

        reader.onload = () => {
            setImg(reader.result)
        }

        reader.readAsDataURL(e.target.files[0]);
    }

    const [formData, setFormData] = useState({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            gender: "",
            password: "",
            confirmPassword: "",
            file: null,
            sub: 'Crée par admin',
        }
    })
    const image = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

    const handleSubmit = async (values,props) => {
        if (img !== image) {
            values.file = img
        }
        const { firstName, lastName, email, gender, password, file, sub } =values;
        await sleep(3000);
        /*alert(JSON.stringify({firstName,lastName,email,gender,password,file,sub}), null, 2);*/
        if (values.password !== values.confirmPassword) {
            setAlert('Mot de passe non identique', 'danger');
        } else {
            //alert(JSON.stringify({ firstName, lastName, email, gender, password, file, sub }), null, 2);
            register({ firstName, lastName, email, gender, password, file, sub });
        }
        props.setSubmitting(false)
        props.resetForm()
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
                            {({ isSubmitting }) => (
                                <>
                                    <Form>
                                        <Box my={1} ml={3}>
                                            <Field
                                                type="text"
                                                name="firstName"
                                                label="Nom"
                                                component={TextField}
                                                autoComplete="off"
                                                fullWidth
                                            />
                                        </Box>
                                        <Box my={1} ml={3}>
                                            <Field
                                                type="text"
                                                name="lastName"
                                                label="Prénom"
                                                component={TextField}
                                                autoComplete="off"
                                                fullWidth
                                            />

                                        </Box>
                                        <Box my={1} ml={3}>
                                            <Field
                                                type="email"
                                                name="email"
                                                label="E-mail"
                                                component={TextField}
                                                autoComplete="off"
                                                fullWidth
                                            />
                                        </Box>
                                        <Box my={3} ml={3}>
                                            <FormLabel component="legend">Sexe</FormLabel>
                                        </Box>
                                        <Box my={-1} ml={3}>
                                            <Field
                                                as={RadioGroup}
                                                aria-label="Sexe"
                                                name="gender"
                                                style={{ display: "initial", margin: "0" }}

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
                                            </Field>
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
                                                <div className="img-holder" style={{ margin: 'auto', width: '160px', height: '157px', borderRadius: '5px', marginTop: '-50px', marginLeft: "38px", background: img ? `url("${img}") no-repeat center/cover` : "#fff" }}>
                                                </div>
                                            </Box>
                                        </Box>

                                        <Box my={1} ml={3}>
                                            <Field
                                                type={values.showPassword ? "text" : "password"}
                                                name="password"
                                                label="Mot de passe"
                                                component={TextField}
                                                autoComplete="off"
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={handleClickShowPassword}
                                                            >
                                                                {values.showPassword ? (
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
                                            <Field
                                                type={values.showCPassword ? "text" : "password"}
                                                name="confirmPassword"
                                                label="Confirme mot de passe"
                                                component={TextField}
                                                autoComplete="off"
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={handleClickShowCPassword}
                                                            >
                                                                {values.showCPassword ? (
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
                                        <Alert/>
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
                                    </Form>
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
