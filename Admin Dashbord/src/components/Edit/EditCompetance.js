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
import { AdminUpdateCompetance } from '../../action/auth'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {useHistory } from 'react-router';

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

const EditCompetance = (props) => {
const dispatch = useDispatch()
const history=useHistory()
    let categorie = useSelector((state) => state.Auth.categorie)
    let competance = useSelector((state) => state.Auth.competances)
    
    const [id,setId]=useState()
    const [competances,setcompetances]=useState()
  
    useEffect(() => {
        if(competance.length!==0){
          for(let i=0;i<competance.length;i++){
             if(competance[i]._id==props.match.params.id){
                setcompetances(competance[i])
                 setFormData({
                    name:competance[i].name,
                    categorie:competance[i].categorie,
                 
                })
                setId(competance[i]._id)
                setcompetances(competance[i])
        }
    }
}else{
    history.push('/app/Categories')
}
    
      
    }, [])


const classes = useStyles();

const sleep = (time) => new Promise((acc) => setTimeout(acc, time));

const [formData, setFormData] = useState({
        name: '',
        categorie: ''
    
})
const handleChangeUser = (event) => {
    const { value, name } = event.target;

    const newUser = { ...formData };
    newUser[name] = value;

    setFormData({...newUser})
}

const handleSubmit = async (values, props) => {
    const { name, categorie } = formData
    await sleep(3000);
    if (name ==competances.name&&categorie==competances._id) {
        dispatch(setAlert("Aucune changement ",'dark'))
    } else if(categorie==competances._id){
        const body={
            name:name,
            categorie:competances._id
        }
        dispatch(AdminUpdateCompetance(body,id))
    }else{
        const body={
            name:name,
            categorie:categorie
        }
        dispatch(AdminUpdateCompetance(body,id))
    }
   
}



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
                                            value={formData.categorie}
                                            onChange={handleChangeUser}
                                        >
                                            {categorie.map((cate,i) => (

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
                                        onChange={handleChangeUser}
                                        value={formData.name}

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

export default EditCompetance
