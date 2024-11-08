import React, { useRef, useState, useEffect } from 'react'
import { Formik } from 'formik';
import {
    Box,
    Button,
    Grid,
    Paper,
    CircularProgress,
    TextField,
} from '@material-ui/core';
import Alert from '../Layout/Alert'
import { setAlert } from '../../action/alert'
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { AdminUpdateJeux1,GetJeux1 } from '../../action/auth'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useSelector, useDispatch } from 'react-redux';
import {useHistory } from 'react-router';
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

const EditJeux1 = (props) => {
    const dispatch = useDispatch()
    const history=useHistory()
    let competance = useSelector((state) => state.Auth.competances)
    let categorie = useSelector((state) => state.Auth.categorie)
    const[jeux1,setJeux1]=useState()
    const [id,setId]=useState()
    let jeux = useSelector((state) => state.Auth.jeux1)
    useEffect(() => {
        if(jeux.length!==0){
            for(let i=0;i<jeux.length;i++){
               if(jeux[i]._id==props.match.params.id){
                   setFormData({
                       ...formData, 
                       categorie:jeux[i].categorie,
                       image:jeux[i].image,
                      competance:jeux[i].competance,
                      question:jeux[i].question,
                      reponse:jeux[i].reponse,
                     
                   
                  })
                  setImgPrev(jeux[i].image)
                  setId(jeux[i]._id)
                  setJeux1(jeux[i])
                 
          }
      }
  }else{
      history.push('/app/Jeux1')
  }
  dispatch(GetJeux1())

    }, [])


    const classes = useStyles();
    const refer = useRef(null);

    const handleClick = () => {
        refer.current.click()

    }
    const sleep = (time) => new Promise((acc) => setTimeout(acc, time));
    const [img, setImg] = useState('')
    const [formData, setFormData] = useState({

            categorie: '',
            competance: '',
            question: '',
            reponse: '',
            image:'',
        
    })
    const handleChangeUser = (event) => {
        const { value, name } = event.target;
    
        const newUser = { ...formData };
        newUser[name] = value;

        setFormData({...newUser})
    }
    
    const[imgPrev,setImgPrev]=useState('')
    const handleImageChange = (e) => {
        e.preventDefault();
      
        let reader = new FileReader();
        reader.onloadend = () => {

  
            setImgPrev(reader.result)

        }
        setImg(e.target.files[0])
        reader.readAsDataURL(e.target.files[0]);
    }
    const handleSubmit = async (values, props) => {
        await sleep(3000);
        const Form = new FormData()
        Form.append('file',img?img:'old')
        Form.append('question',formData.question)
        Form.append('img',formData.image)
        Form.append('reponse',formData.reponse)
        Form.append('competance',formData.competance)
        Form.append('categorie',formData.categorie)
        console.log(imgPrev == jeux1.image)
        const{question,reponse,}=formData
        if (formData.competance==jeux1.competance&& jeux1.categorie!==formData.categorie){
            dispatch(setAlert("Choisir une competence ",'danger'))
        }else if (imgPrev == jeux1.image&&jeux1.question==question&&jeux1.reponse==reponse &&jeux1.competance==formData.competance&&jeux1.categorie==formData.categorie ) {
            dispatch(setAlert("Aucune changement ",'dark'))
        } 
        else {
            dispatch(AdminUpdateJeux1(Form,id))
        }
  
    
    }
    const [competences, setCompetences] = useState([])

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
                                        <Box ml={3} mt={0} >
                                            <TextField
                                                error={Boolean(touched.name && errors.name)}
                                                fullWidth
                                                label="Question"
                                                margin="normal"
                                                name="question"
                                                onBlur={handleBlur}
                                                onChange={handleChangeUser}
                                                value={formData.question}

                                            />
                                        </Box>
                                        <Box ml={3} mt={3} >
                                            <Box mt={0} >
                                                <InputLabel id="number">Response correct</InputLabel>
                                            </Box>
                                            <input
                                                id='number'
                                                error={Boolean(touched.name && errors.name)}
                                                type='number'
                                                Response correct
                                                margin="normal"
                                                name="reponse"
                                                onBlur={handleBlur}
                                                onChange={handleChangeUser}
                                                value={formData.reponse}

                                            />
                                        </Box>
                                        <Box my={1} ml={3} mt={3} style={{ display: 'flex' }}>
                                            <Box>
                                                <label>Téléchargez les image :{"   "}</label>
                                            </Box>
                                            <Box mt={5} ml={-18} style={{ display: 'flex' }}>
                                                <input
                                                    id="file"
                                                    name="image"
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
                                                <div className="img-holder" style={{ margin: 'auto',  width: '50vh', height: '40vh', borderRadius: '5px', marginTop: '-50px', marginLeft: "38px", background: imgPrev ? `url("${imgPrev}") no-repeat center/cover` : "#fff" }}>
                                                </div>
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

export default EditJeux1
