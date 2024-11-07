import React, { useRef, useState, useEffect } from 'react'
import { Formik } from 'formik';
import {
    Box,
    Button,
    Grid,
    Paper,
    CircularProgress,
    TextField,
    Avatar
} from '@material-ui/core';
import Alert from '../Layout/Alert'
import { setAlert } from '../../action/alert'
import { makeStyles } from '@material-ui/core/styles';
import { GetJeux2,AdminUpdateJeux2 } from '../../action/auth'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';
//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
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
    },
    wrapperwar: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "Nunito",
    },
    wrapper: {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
    },
}));


const EditJeux2 = (props) => {
    const dispatch = useDispatch()
    const history=useHistory()
    let competance = useSelector((state) => state.Auth.competances)
    let categorie = useSelector((state) => state.Auth.categorie)

    const[jeux2,setJeux2]=useState()
    const [id,setId]=useState()

    let jeux = useSelector((state) => state.Auth.jeux2)
    useEffect(() => {
        if(jeux.length!==0){
            for(let i=0;i<jeux.length;i++){
               if(jeux[i]._id==props.match.params.id){
                   setFormData({
                       ...formData, 
                       categorie:jeux[i].categorie,
                       files:jeux[i].files,
                      competance:jeux[i].competance,
                      question:jeux[i].question,
                      reponse:jeux[i].reponse,
                     
                   
                  })
                  setImgCorrect(jeux[i].reponse)
                  setId(jeux[i]._id)
                  setJeux2(jeux[i])
                  setImages(jeux[i].files)
          }
      }
  }else{
      history.push('/app/Jeux1')
  }
  dispatch(GetJeux2())

    }, [])



    const classes = useStyles();

    const refer = useRef(null);
    const refers = useRef(null);

    const handleClick = () => {
        refer.current.click()

    }
    const handleClickCorrect = () => {
        refers.current.click()

    }

    const sleep = (time) => new Promise((acc) => setTimeout(acc, time));
    const [images, setImages] = useState([]);

    const [formData, setFormData] = useState({
            categorie: '',
            competance: '',
            question: '',
            reponse: '',
            files:''

        
    })
    const [correct, setCorrect] = useState('')


    const handleImageChangeCorrect = (e) => {
        e.preventDefault();
      
            let reader = new FileReader();
            setCorrect(e.target.files[0])
            reader.onloadend = () => {

               
                setImgCorrect(reader.result)

            }
            reader.readAsDataURL(e.target.files[0]);
    }

    const handleChangeUser = (event) => {
        const { value, name } = event.target;
    
        const newUser = { ...formData };
        newUser[name] = value;

        setFormData({...newUser})
    }
    

    const handleImageChange = (e) => {
        e.preventDefault();

        let files = Array.from(e.target.files);
        

        files.forEach((file) => {
            let reader = new FileReader();
            setImg([...img, file])
            reader.onloadend = () => {

               
                setImages([...images, reader.result])

            }
            reader.readAsDataURL(file);
        });
    }

    const [img, setImg] = useState([])
    const [imgCorrect, setImgCorrect] = useState('')

    const handleSubmit = async () => {
        await sleep(3000);

        const Form = new FormData()
        Form.append('categorie', formData.categorie)
        Form.append('competance', formData.competance)
        Form.append('question', formData.question)
        Form.append('reponse', formData.reponse)
        for(let i =0;i<formData.files.length;i++){
            Form.append('oldFiles',formData.files[i])
        }
        Form.append('Correct', correct?correct:'old')
        const{question}=formData
        if(img.length>0){
            for (let i = 0; i < img.length; i++) {
                Form.append('file', img[i])
            }
        }
        else{
            Form.append('file', 'old')
        }
        if (formData.competance==jeux2.competance&& jeux2.categorie!==formData.categorie){
            dispatch(setAlert("Choisir une competence ",'danger'))
        }else if (imgCorrect == jeux2.reponse&&jeux2.question==question&&jeux2.files==images &&jeux2.competance==formData.competance&&jeux2.categorie==formData.categorie ){
            dispatch(setAlert("Aucune changement ",'dark'))
        }else{
            //setAlert('Bien créer','success')
            dispatch(AdminUpdateJeux2(Form, id))
            
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
    const [bool,setBool]=useState(true)
     useEffect(() => {
        fetch2(formData.categorie)
     }, [formData.categorie])
    
     const reset =()=>{
         setBool(false)
        setImg([])
        setImages([])
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
                            <form
                                onSubmit={handleSubmit}
                            >

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

                                        <Box my={1} ml={3} mt={3} style={{ display: 'flex' }}>
                                            <Box>
                                                <label>Téléchargez l'image Correct :{"   "}</label>
                                            </Box>
                                            <Box mt={5} ml={-22} style={{ display: 'flex' }}>
                                                <input
                                                    name="image"
                                                    type="file"
                                                    onChange={(e) => handleImageChangeCorrect(e)}
                                                    style={{ display: 'none' }}
                                                    ref={refers}
                                                    accept=".png , .jpg , .jpeg"
                                                />
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={handleClickCorrect}
                                                    style={{ height: '40px', marginTop: "20px" }}
                                                >
                                                    Choisir image
                                        </Button>
                                                <div className="img-holder" style={{ margin: 'auto', width: '50vh', height: '40vh', borderRadius: '5px', marginTop: '-50px', marginLeft: "38px", background: img ? `url("${imgCorrect}") no-repeat center/cover` : "#fff" }}>
                                                </div>
                                            </Box>
                                        </Box>

                                        <Box my={1} ml={3} mt={3} style={{ display: 'flex' }}>
                                            <Box>
                                                <label>Téléchargez les images de Quizz :{"   "}</label>
                                            </Box>
                                            <Box mt={5} ml={-19} >
                                                <input
                                                    id="file"
                                                    name="image"
                                                    type="file"
                                                    onChange={(e) => handleImageChange(e)}
                                                    style={{ display: 'none' }}
                                                    ref={refer}
                                                    multiple
                                                    accept=".png , .jpg , .jpeg"
                                                />
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    disabled={bool}
                                                    onClick={handleClick}
                                                    style={{ height: '40px', marginTop: "20px" ,marginLeft:"-56px"}}
                                                >
                                                    Ajouter des images
                                        </Button>
                                                <Button variant="contained" color="secondary" onClick={reset} style={{ marginTop: '18px', marginLeft: '15px' }}>Réinitialiser</Button>


                                            </Box>
                                        </Box>
                                        <div className={classes.wrapperwar}>

                                            <div className={classes.wrapper}>
                                                {images.map((imge, i) => (

                                                    <Avatar
                                                        key={i}
                                                        src={imge}
                                                        style={{ margin: 'auto', width: '30%', height: '20%', borderRadius: '5px', marginLeft: "38px", marginTop: '10px' }}
                                                    />

                                                ))}
                                            </div>
                                        </div>
                                        <Alert />
                                        <Box align='center' mt={2}>
                                            <Button
                                                startIcon={
                                                    isSubmitting ? <CircularProgress size="1rem" /> : null
                                                }
                                                fullWidth
                                                type='submit'
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

export default EditJeux2
