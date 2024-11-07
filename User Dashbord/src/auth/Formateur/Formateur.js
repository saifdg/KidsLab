import React, { useState, useRef } from 'react'
import img from '../../img/formateur.jpg'
import {
    Grid,
    Paper,
    Button,
    TextField,
    Box,
    TextareaAutosize,
    CircularProgress
} from "@material-ui/core";
import { useDispatch, useSelector } from 'react-redux';
import { mailParents, registerFormateur } from '../../action/auth';
import Alert from '../../components/layout/Alert';
import { Formik } from 'formik';
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import { Redirect } from 'react-router-dom';
import { setAlert } from '../../action/alert';

const Formateur = () => {
    const refer = useRef(null);
    const auth = useSelector(state => state.Auth)
    const handleClick = () => {
        refer.current.click()

    }
    const sleep = (time) => new Promise((acc) => setTimeout(acc, time));
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        description: '',
        password: '',
        confimPassword: '',
        role: 'formateur',
        sub: 'unlimit'
    })
    const [img1, setImg1] = useState(null)
    const [imgPrev, setImgPrev] = useState('https://leskimo.fr/wp-content/uploads/2018/11/les-trois-cv.png')
    const handleImageChange = (e) => {
        e.preventDefault();
        setImg1(e.target.files[0])

        let reader = new FileReader();
        reader.onloadend = () => {
            setImgPrev(reader.result)

        }
        reader.readAsDataURL(e.target.files[0]);
    }
    const dispatch = useDispatch()
    const handleSubmit = async (values) => {
        const Form = new FormData()
        Form.append('file', img1 ? img1 : 'none')
        Form.append('firstName', values.firstName)
        Form.append('lastName', values.lastName)
        Form.append('email', values.email)
        Form.append('description', values.description)
        Form.append('gender', values.gender)
        Form.append('role', values.role)
        Form.append('password', values.password)
        Form.append('sub', values.sub)
        await sleep(2000);
        if (values.confimPassword !== values.password) {
            dispatch(setAlert('Mot de passe non identique', 'danger'))
        } else if (img1 == null) {
            dispatch(setAlert('veuillez télécharger votre CV', 'danger'))
        } else {
            dispatch(registerFormateur(Form))
        }
        console.log(values)
    }

    if (auth.isAuthenticated) {
        return <Redirect to='/' />
    }
    return (
        <Paper align='center' style={{ marginTop: '50px', padding: '40px', display: 'flex', width: '100%' }}>

            <img style={{ width: '50%'}} src={img} />


            <Formik
                initialValues={formData}
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
                    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                        <div style={{ display: 'block', width: '100%', height: '100%', alignItems: 'center' }}>
                            <h4 style={{ fontFamily: 'nunito', fontWeight: 'bold' }}>Assurez-vous de remplir tous les champs</h4>
                            <Box mt={1.5}>
                                <TextField
                                    type="text"
                                    name="firstName"
                                    label="Nom"
                                    autoComplete="off"
                                    fullWidth
                                    variant='outlined'
                                    value={values.firstName}
                                    onChange={handleChange}
                                />

                            </Box>
                            <Box mt={0.5}>
                                <TextField
                                    type="text"
                                    name="lastName"
                                    label="Prénom"
                                    autoComplete="off"
                                    fullWidth
                                    variant='outlined'
                                    value={values.lastName}
                                    onChange={handleChange}
                                />
                            </Box>
                            <Box mt={0.5}>
                                <TextField
                                    type="email"
                                    name="email"
                                    label="E-mail"
                                    autoComplete="off"
                                    fullWidth
                                    variant='outlined'
                                    value={values.email}
                                    onChange={handleChange}
                                />
                            </Box>
                            <Box my={3} ml={-54}>
                                <FormLabel component="legend">Sexe :</FormLabel>
                            </Box>
                            <Box ml={-32}>
                                <RadioGroup
                                    aria-label="Sexe"
                                    name="gender"
                                    style={{ display: "initial", margin: "0" }}
                                    value={values.gender}
                                    onChange={handleChange}
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
                            <Box mt={0}>
                                <TextareaAutosize
                                    name='description'
                                    rowsMin={4}
                                    rowsMax={4}
                                    fullWidth
                                    aria-label="maximum height"
                                    placeholder="Une petit description de toi"
                                    value={values.description}
                                    onChange={handleChange}
                                />

                            </Box>

                            <Box my={1} ml={3} mt={3} style={{ display: 'flex' }}>
                                <Box>
                                    <label>Téléchargez image ou pdf de votre cv :{"   "}</label>
                                </Box>
                                <Box mt={5} ml={-21} style={{ display: 'flex' }}>
                                    <input
                                        id="file"
                                        name="images"
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
                                        style={{ height: '40px', marginTop: "20px",marginLeft:'-80px'}}
                                    >
                                        Choisir image/pdf
                                    </Button>
                                    <div className="img-holder" style={{ margin: 'auto', width: '160px', height: '157px', borderRadius: '5px', marginTop: '-50px', marginLeft: "50px", background: imgPrev ? `url("${imgPrev}") no-repeat center/cover` : "#fff" }}>
                                    </div>
                                </Box>
                            </Box>
                            <Box mt={0.5}>
                                <TextField
                                    type="password"
                                    name="password"
                                    label="Mot de passe"
                                    autoComplete="off"
                                    fullWidth
                                    variant='outlined'
                                    value={values.password}
                                    onChange={handleChange}
                                />
                            </Box>
                            <Box mt={0.5}>
                                <TextField
                                    type="password"
                                    name="confimPassword"
                                    label="Confirmez le mot de passe"
                                    autoComplete="off"
                                    fullWidth
                                    variant='outlined'
                                    value={values.confimPassword}
                                    onChange={handleChange}
                                />
                            </Box>
                            <Alert />
                            <Box mt={1}>
                                <Button
                                    startIcon={
                                        isSubmitting ? <CircularProgress size="1rem" /> : null
                                    }
                                    disabled={isSubmitting}
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    fullWidth
                                >
                                    {isSubmitting
                                        ? "Soumission"
                                        :
                                        "Envoyer la demande"
                                    }
                                </Button>
                            </Box>
                        </div>
                    </form>
                )}
            </Formik>

        </Paper>
    )
}

export default Formateur
