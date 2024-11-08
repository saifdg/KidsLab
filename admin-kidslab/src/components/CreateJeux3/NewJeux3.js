import React, { useRef, useState, useEffect } from 'react'
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
    Box,
    Button,
    Grid,
    Checkbox,
    Container,
    FormHelperText,
    Paper,
    CircularProgress,
    Link,
    TextField,
    Typography,
    TextareaAutosize
} from '@material-ui/core';
import Alert from '../Layout/Alert'
import { setAlert } from '../../action/alert'
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { CreateJeux3 } from '../../action/auth'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';
import Swal from 'sweetalert2';

const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    }
}));
//////////////////////////////////////////////////////////////////////
const NewJeux3 = ({ setAlert, CreateJeux3 }) => {
    const classes = useStyles();
    const [categories, setCategories] = useState([])
    const [competence, setCompetence] = useState([])
    const [idcat, setIdcat] = useState('')
    const [idcomp, setIdcomp] = useState('')
    const fetch = async () => {
        const res = await axios('/api/categorie')
        setCategories(res.data)
    }
    const fetch2 = async () => {
        const res = await axios(`/api/competance/${idcat}/categorie`)
        setCompetence(res.data)
    }
    const style = {
        userSelect: 'none',
        padding: 8 * 2,
        margin: `0 8px 0 0`,
        borderRadius: '15px',
        display: 'flex',
        border: '2px solid #000',
        fontWeight: 'bold',
        background: '#6293e3',

    }
    const style2 = {
        background: '#fff',
        display: 'flex',
        padding: 8,
        overflow: 'auto',
    }
    const [formData, setFormData] = useState({
        initialValues: {
            categorie: '',
            competence: '',
            question: '',
            reponse: [],
            jeuxType: '',
            value: ''

        }
    })
    const [bool, setBool] = useState(false)
    const [rep, setRep] = useState([])
    const handleRep = (nb) => {
        let isnum = /^\d+$/.test(nb);
        if (isnum) {

            const num = parseInt(nb)
            console.log(num)
            setRep([...rep, num])
            setBool(true)
        } else {
            Swal.fire('Attention', "l'object est pas de type Number", 'error')
        }


    }
    const sleep = (time) => new Promise((acc) => setTimeout(acc, time));
    const handleSubmit = async (values,props) => {
        await sleep(3000);
        values.reponse = rep
        const { question, reponse, jeuxType, competence ,categorie} = values

        if (values.reponse.length == 0) {
            setAlert("les valuers sont obligatoire", "danger")
        } else if (values.reponse.length <= 1) {
            setAlert("Ils faut 2 valeurs au minimum", "danger")
        } else {
            CreateJeux3({ question, reponse, jeuxType, competence,categorie})
            
        }
    }
    useEffect(() => {
        fetch()
    }, [])
    useEffect(() => {
        fetch2()
    }, [idcat])
    console.log(rep)
    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
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
                                <form onSubmit={handleSubmit}>

                                    <Box ml={3} mt={2} >
                                        <FormControl className={classes.formControl}>
                                            <InputLabel id="demo-simple-select-label">categorie</InputLabel>
                                            <Select
                                                name="categorie"
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={values.categorie}
                                                onChange={handleChange}
                                            >
                                                {categories.map((cate, i) => (

                                                    <MenuItem key={i} value={cate._id}>{cate.name}</MenuItem>


                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Box>
                                    {}

                                    { setIdcat(values.categorie)}
                                    {values.categorie !== '' && idcat == values.categorie ?

                                        <Box ml={3} mt={2} >
                                            <FormControl className={classes.formControl}>
                                                <InputLabel id="demo-simple-select-label">Competences</InputLabel>
                                                <Select
                                                    name="competence"
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={values.competence}
                                                    onChange={handleChange}
                                                >
                                                    {competence.map((comp, key) => (

                                                        <MenuItem key={key} value={comp._id}>{comp.name}</MenuItem>


                                                    ))}

                                                </Select>
                                            </FormControl>
                                        </Box> :
                                        values.competence = '' &&
                                        setIdcat(values.categorie)

                                    }
                                    {values.competence !== '' ? setIdcomp(values.competence) : null}
                                    {values.competence !== '' && values.competence == idcomp ?
                                        <>
                                            <Box ml={3.5} mt={0} >
                                                <TextField
                                                    error={Boolean(touched.name && errors.name)}
                                                    fullWidth
                                                    label="Question"
                                                    margin="normal"
                                                    name="question"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.question}
                                                    autoComplete='off'

                                                />
                                            </Box>
                                            <Box ml={3} mt={2} >
                                                <FormControl className={classes.formControl}>
                                                    <InputLabel id="demo-simple-select-label">Order de jeux</InputLabel>
                                                    <Select
                                                        name="jeuxType"
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={values.jeuxType}
                                                        onChange={handleChange}
                                                    >


                                                        <MenuItem value="decroissant">Décroissant</MenuItem>
                                                        <MenuItem value="croissant">Croissant</MenuItem>

                                                    </Select>
                                                </FormControl>
                                            </Box>

                                            <Box ml={3} mt={3} >
                                                <InputLabel id="demo-simple-select">Mettre les valeurs ici (valeur par valeur)</InputLabel>
                                                <Box>
                                                    <Box style={{ display: 'flex' }}>
                                                        <TextField
                                                            labelId="demo-simple-select"
                                                            error={Boolean(touched.name && errors.name)}
                                                            variant="outlined"
                                                            label="Valeur"
                                                            margin="normal"
                                                            name="value"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.value}
                                                            autoComplete='off'

                                                        />
                                                        <Box ml={3} mt={3} style={{ display: 'flex', height: '40px' }}>
                                                            <Button
                                                                onClick={() => handleRep(values.value)}
                                                                variant="contained"
                                                                color="primary">
                                                                {bool ? values.value = '' : null}
                                                                {setBool(false)}
                                                            Ajouter
                                                </Button>
                                                            <Button
                                                                style={{ marginLeft: '10px' }}
                                                                variant="contained"
                                                                color="secondary"
                                                                onClick={() => setRep([])}
                                                            >
                                                                Réinitialiser
                                                                </Button>
                                                        </Box>
                                                    </Box>
                                                    {rep ? <Box style={style2} mt={2} ml={2} mb={3}>

                                                        {rep.map((nb) => (
                                                            <div  >
                                                                <div style={style}>
                                                                    {nb}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </Box> : null}
                                                </Box>
                                            </Box>



                                            <Alert />
                                            <Box align='center' mt={2}>
                                                <Button
                                                    startIcon={
                                                        isSubmitting ? <CircularProgress size="1rem" /> : null
                                                    }
                                                    fullWidth
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    variant="contained"
                                                    color="primary"
                                                    style={{ marginBottom: "10px", marginTop: '5px' }}
                                                >
                                                    Enregistrer !
                                             </Button>

                                            </Box>
                                        </>
                                        : null

                                    }

                                </form>
                            )}
                        </Formik>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}
NewJeux3.propTypes = {
    setAlert: PropTypes.func.isRequired,
    CreateJeux3: PropTypes.func.isRequired,
}
export default connect(null, { setAlert, CreateJeux3 })(NewJeux3)
