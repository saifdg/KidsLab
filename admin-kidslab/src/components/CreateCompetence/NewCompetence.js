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
import { CreateCompetence } from '../../action/auth'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';


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

const NewCompetence = ({ setAlert, CreateCompetence }) => {
    const classes = useStyles();

    const sleep = (time) => new Promise((acc) => setTimeout(acc, time));

    const [formData, setFormData] = useState({
        initialValues: {
            name: '',
            categorie: ''
        }
    })
   /* const handleChangeSelect = (event) => {
        setAge(event.target.value);
    };*/
    const handleSubmit = async (values, props) => {
        const { name, categorie } = values;
        await sleep(3000);
        if (name == '') {
            setAlert('Nom est obligatoire', 'danger')
        } else if(categorie==''){
            setAlert('Voulez vouz choisir une catégorie pour cette competence', 'danger')
        }else {
            console.log({ name, categorie })
            CreateCompetence({ name, categorie })


        }
        props.setSubmitting(false)
        props.resetForm()
    }

    const [categories, setCategories] = useState([])
    const fetch = async () => {
        const res = await axios('/api/categorie')
        setCategories(res.data)
    }

    useEffect(() => {
        fetch()
    }, [])
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
                                                {categories.map((cate,i) => (

                                                    <MenuItem key={i} value={cate._id}>{cate.name}</MenuItem>


                                                ))}

                                            </Select>
                                        </FormControl>
                                    </Box>
                                    <Box ml={3} mt={0} >
                                        <TextField
                                            error={Boolean(touched.name && errors.name)}
                                            fullWidth
                                            label="Nom de Competence"
                                            margin="normal"
                                            name="name"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.name}

                                        />
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

                                </form>
                            )}
                        </Formik>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}
NewCompetence.propTypes = {
    setAlert: PropTypes.func.isRequired,
    CreateCompetence: PropTypes.func.isRequired,

}

export default connect(null, { setAlert, CreateCompetence })(NewCompetence)
