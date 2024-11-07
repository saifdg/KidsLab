import React, { useRef, useState, useEffect } from 'react'
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
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
    TextareaAutosize,
    Avatar
} from '@material-ui/core';
import Alert from '../Layout/Alert'
import { setAlert } from '../../action/alert'
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { CreateJeux2 } from '../../action/auth'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';
import ImageUploading from 'react-images-uploading';
//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
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

const NewJeux2 = ({ setAlert, CreateJeux2 }) => {
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
        initialValues: {
            categorie: '',
            competence: '',
            question: '',
            reponse: '',

        }
    })
    /* const onChangeFile = (e) => {
         setImages(e.target.files);
     }
     const onChangeCorrect = (e) => {
         setCorrect(e.target.files[0]);
     }*/
    const [correct, setCorrect] = useState('')


    const handleImageChangeCorrect = (e) => {
        e.preventDefault();
      
            let reader = new FileReader();
        
            reader.onloadend = () => {

               
                setImgCorrect(reader.result)

            }
            setCorrect(e.target.files[0])
            reader.readAsDataURL(e.target.files[0]);
    }
    const handleImageChange = (e) => {
        e.preventDefault();

        let files = Array.from(e.target.files);
        

        files.forEach((file) => {
            let reader = new FileReader();
            
            reader.onloadend = () => {

               
                setImg([...img, reader.result])

            }
            setImages([...images, file])
            reader.readAsDataURL(file);
        });
    }

    const [img, setImg] = useState([])
    const [imgCorrect, setImgCorrect] = useState('')

    const handleSubmit = async (values, props) => {
        await sleep(3000);
        const Form = new FormData()
        Form.append('question', values.question)
        Form.append('categorie', values.categorie)
        Form.append('Correct', correct)
        for (let i = 0; i < images.length; i++) {
            Form.append('file', images[i])
        }
        if(img.length==0 || images.length==0){
            setAlert("Les images de quizz sont obligatoire",'danger')
        }else if(img.length==1){
            setAlert("Il faut 2 ou plus images",'danger')
        }
        else if(correct==''||imgCorrect==''){
            setAlert("L'image correct est obligatoire",'danger')
        }else if(values.question==''){
            setAlert("Le question est obligatoire",'danger')
        }else{
            //setAlert('Bien créer','success')
            CreateJeux2(Form, values.competence)
            
        }
      
       
    }
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
    const reset =()=>{
        setImg([])
        setImages([])
    }

    useEffect(() => {
        fetch()
    }, [])
    useEffect(() => {
        fetch2()
    }, [idcat])
    console.log(images)
    console.log(correct)
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
                                                value={values.categorie}
                                                onChange={handleChange}
                                            >
                                                {categories.map((cate, i) => (

                                                    <MenuItem key={i} value={cate._id}>{cate.name}</MenuItem>


                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Box>

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
                                            <Box ml={3} mt={0} >
                                                <TextField
                                                    error={Boolean(touched.name && errors.name)}
                                                    fullWidth
                                                    label="Question"
                                                    margin="normal"
                                                    name="question"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.question}

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
                                                    {img.map((imge, i) => (

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
NewJeux2.propTypes = {
    setAlert: PropTypes.func.isRequired,
    CreateJeux2: PropTypes.func.isRequired,

}

export default connect(null, { setAlert, CreateJeux2 })(NewJeux2)
