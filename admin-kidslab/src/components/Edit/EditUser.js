import {
    Grid, Paper, Box, Button, CircularProgress
} from '@material-ui/core'
import { Formik } from 'formik'
import React, { useRef, useState, useEffect } from 'react'
import Radio from "@material-ui/core/Radio";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import Alert from '../Layout/Alert'
import { setAlert } from '../../action/alert'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { TextField } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux';
import { AdminUpdateUser, GetUsers } from '../../action/auth'
import { useHistory } from 'react-router';


const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 180,
    }
}));


const EditUser = (props) => {

    const dispatch = useDispatch()
    const history = useHistory()

    let users = useSelector((state) => state.Auth.users)

    const [use, setUse] = useState()
    const [user, setUser] = useState()
    useEffect(() => {
        if (users.length !== 0) {
            for (let i = 0; i < users.length; i++) {
                if (users[i]._id == props.match.params.id) {
                    setUse(users[i])
                    setFormData({
                        firstName: users[i].firstName,
                        lastName: users[i].lastName,
                        email: users[i].email,
                        role: users[i].role,
                        sub: users[i].sub,
                        file: users[i].file,
                        gender: users[i].gender,
                    })
                    setImgPrev(users[i].file)
                    setUse(users[i]._id)
                    setUser(users[i])
                }
            }
        } else {
            history.push('/app/Users')
        }


    }, [])

    const classes = useStyles();
    const refer = useRef(null);
    const handleClick = () => {
        refer.current.click()

    }


    const sleep = (time) => new Promise((acc) => setTimeout(acc, time));



    const handleImageChange = (e) => {
        e.preventDefault();
        setImg(e.target.files[0])

        let reader = new FileReader();
        reader.onloadend = () => {
            setImgPrev(reader.result)

        }
        reader.readAsDataURL(e.target.files[0]);
    }

    const handleChangeUser = (event) => {
        const { value, name } = event.target;

        const newUser = { ...formData };
        newUser[name] = value;

        setFormData({ ...newUser })
    }
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        gender: "",
        role: "",
        sub: '',
        file: '',
    })
    console.log(formData)
    const [img, setImg] = useState(null)
    const [imgPrev, setImgPrev] = useState()
    const handleSubmit = async (values) => {
        const Form = new FormData()
        Form.append('file', img ? img : 'old')
        Form.append('img', formData.file)
        Form.append('firstName', formData.firstName)
        Form.append('lastName', formData.lastName)
        Form.append('email', formData.email)
        Form.append('gender', formData.gender)
        Form.append('sub', formData.sub)
        Form.append('role', formData.role)
        await sleep(3000);
        /*alert(JSON.stringify({firstName,lastName,email,gender,password,file,sub}), null, 2);*/
        const { firstName, lastName, role, sub, gender, email, file } = formData

        if (firstName == user.firstName && lastName == user.lastName && role == user.role && sub == user.sub && gender == user.gender && user.file == imgPrev) {
            dispatch(setAlert("Aucune changement ", 'dark'))
        } else {
            dispatch(AdminUpdateUser(Form, use))
            //  console.log(use)
        }

        dispatch(GetUsers())
    }


    //  const {firstName,lastName}=user
    //  console.log(aa&&aar)

    // console.log(edit&&edit.firstName)
    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Formik
                            initialValues={formData}
                            onSubmit={handleSubmit}
                        >
                            {({

                                isSubmitting,
                                handleSubmit

                            }) => (
                                <>
                                    <form onSubmit={handleSubmit} >
                                        <Box my={1} ml={3}>
                                            <TextField
                                                type="text"
                                                name="firstName"
                                                label="Nom"
                                                autoComplete="off"
                                                fullWidth
                                                onChange={handleChangeUser}
                                                value={formData.firstName}
                                            />
                                        </Box>
                                        <Box my={1} ml={3}>
                                            <TextField
                                                type="text"
                                                name="lastName"
                                                label="Prénom"
                                                onChange={handleChangeUser}
                                                value={formData.lastName}
                                                autoComplete="off"
                                                fullWidth
                                            />

                                        </Box>
                                        <Box my={1} ml={3}>
                                            <TextField

                                                type="email"
                                                name="email"
                                                label="E-mail"
                                                onChange={handleChangeUser}
                                                value={formData.email}
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
                                                onChange={handleChangeUser}
                                                value={formData.gender}

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
                                                    value={formData.role}
                                                    onChange={handleChangeUser}
                                                >


                                                    <MenuItem value="admin">Admin</MenuItem>
                                                    <MenuItem value="formateur">Formateur</MenuItem>
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
                                                    value={formData.sub}
                                                    onChange={handleChangeUser}
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
                                </>
                            )}
                        </Formik>
                    </Paper>
                </Grid>
            </Grid>
        </div >
    )
}
export default EditUser

