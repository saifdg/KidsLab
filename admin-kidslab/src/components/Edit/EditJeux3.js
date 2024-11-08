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
import { AdminUpdateJeux3 ,GetJeux3} from '../../action/auth'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';
import Swal from 'sweetalert2';
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

const EditJeux3 = (props) => {
    const dispatch = useDispatch()
    const history=useHistory()


    let competance = useSelector((state) => state.Auth.competances)
    let categorie = useSelector((state) => state.Auth.categorie)

    const[jeux3,setJeux3]=useState()
    const [id,setId]=useState()

    let jeux = useSelector((state) => state.Auth.jeux3)
    useEffect(() => {
        if(jeux.length!==0){
            for(let i=0;i<jeux.length;i++){
               if(jeux[i]._id==props.match.params.id){
                   setFormData({
                       ...formData, 
                       categorie:jeux[i].categorie,
                       jeuxType:jeux[i].jeuxType,
                      competance:jeux[i].competance,
                      question:jeux[i].question,
                      reponse:jeux[i].reponse,
                     
                   
                  })
                  setId(jeux[i]._id)
                  setJeux3(jeux[i])
                  setRep(jeux[i].reponse)
          }
      }
  }else{
      history.push('/app/Jeux1')
  }
  dispatch(GetJeux3())

    }, [])

    const classes = useStyles();
    const [competences, setCompetences] = useState([])
 
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
      
            categorie: '',
            competance: '',
            question: '',
            reponse: [],
            jeuxType: '',
            value: ''

        
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
    const reset =()=>{
        setRep([])
        setModif(false)
    }
    const[modif,setModif]=useState(true)
    const handleChangeUser = (event) => {
        const { value, name } = event.target;
    
        const newUser = { ...formData };
        newUser[name] = value;

        setFormData({...newUser})
    }
    console.log(jeux3)
    console.log(formData)
    const sleep = (time) => new Promise((acc) => setTimeout(acc, time));
    const handleSubmit = async () => {
        await sleep(3000);
        formData.reponse = rep
        const { question, reponse, jeuxType, competance,categorie } = formData
        //console.log(formData.reponse == jeux3.reponse&&jeux3.question==question&&jeux3.jeuxType==formData.jeuxType &&jeux3.competance==formData.competance&&jeux3.categorie==formData.categorie)
        if (formData.reponse == jeux3.reponse&&jeux3.question==question&&jeux3.jeuxType==formData.jeuxType &&jeux3.competance==formData.competance&&jeux3.categorie==formData.categorie ){
            dispatch(setAlert("Aucune changement ",'dark')) 
        }else if(formData.competance==jeux3.competance&& jeux3.categorie!==formData.categorie){
            dispatch(setAlert("Choisir une competence ",'danger'))
        }
        else if (formData.reponse.length == 0) {
            dispatch(setAlert("les valuers sont obligatoire", "danger"))
        } else if (formData.reponse.length <= 1) {
            dispatch( setAlert("Ils faut 2 valeurs au minimum", "danger")) 
        } else {
            dispatch(AdminUpdateJeux3({ question, reponse, jeuxType, competance, categorie},id))
            
            
        }
    }
   
    useEffect(() => {
        for(let i =0 ; i<competance.length;i++){
            if(formData.competance==competance[i]._id)
            setFormData({
                ...formData,
                categorie:competance[i].categorie
            })
        }
     }, [formData.competance])

     const fetch2 = async (id) => {
        const res = await axios(`/api/competance/${id}/categorie`)
        setCompetences(res.data)
    }
     useEffect(() => {
        fetch2(formData.categorie)
     }, [formData.categorie])
    
    

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
                                            {categorie.map((cate, i) => (

                                                <MenuItem key={i} value={cate._id}>{cate.name}</MenuItem>


                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                                

                                    <Box ml={3} mt={2} >
                                        <FormControl className={classes.formControl}>
                                            <InputLabel id="demo-simple-select-label">Competences</InputLabel>
                                            <Select
                                                name="competance"
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={formData.competance}
                                                onChange={handleChangeUser}
                                            >
                                                {competences.map((comp, key) => (

                                                    <MenuItem key={key} value={comp._id}>{comp.name}</MenuItem>


                                                ))}

                                            </Select>
                                        </FormControl>
                                    </Box>
                                    <>
                                        <Box ml={3.5} mt={0} >
                                            <TextField
                                                error={Boolean(touched.name && errors.name)}
                                                fullWidth
                                                label="Question"
                                                margin="normal"
                                                name="question"
                                                onBlur={handleBlur}
                                                onChange={handleChangeUser}
                                                value={formData.question}
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
                                                    value={formData.jeuxType}
                                                    onChange={handleChangeUser}
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
                                                        onChange={handleChangeUser}
                                                        value={formData.value}
                                                        autoComplete='off'

                                                    />
                                                    <Box ml={3} mt={3} style={{ display: 'flex', height: '40px' }}>
                                                        <Button
                                                            onClick={() => handleRep(formData.value)}
                                                            variant="contained"
                                                            disabled={modif}
                                                            color="primary">
                                                            {bool ? formData.value = '' : null}
                                                            {setBool(false)}
                                                        Ajouter
                                            </Button>
                                                        <Button
                                                            style={{ marginLeft: '10px' }}
                                                            variant="contained"
                                                            color="secondary"
                                                            onClick={reset}
                                                        >
                                                            Réinitialiser
                                                            </Button>
                                                    </Box>
                                                </Box>
                                                <Box style={style2} mt={2} ml={2} mb={3}>

                                                    {rep.map((nb) => (
                                                        <div  >
                                                            <div style={style}>
                                                                {nb}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </Box> 
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
                                   

                            </form>
                        )}
                    </Formik>
                </Paper>
            </Grid>
        </Grid>
    </div>
    )
}

export default EditJeux3
