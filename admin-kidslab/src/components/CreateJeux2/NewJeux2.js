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
    TextareaAutosize,
    Avatar
} from '@material-ui/core';
import Alert from '../Layout/Alert'
import { setAlert } from '../../action/alert'
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { CreateJeux1 } from '../../action/auth'
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

const NewJeux2 = ({ setAlert, CreateJeux1 }) => {
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
    const [img, setImg] = useState([])
    const [formData, setFormData] = useState({
        initialValues: {
            categorie: '',
            competence: '',
            question: '',
            reponse: '',
            image: []

        }
    })
    const handleImageChangeCorrect = (e) => {
        let reader = new FileReader();
        reader.onload = () => {
            setCorrect(reader.result)
        }
        reader.readAsDataURL(e.target.files[0]);
    }


    const handleImageChange = (e) => {
        let reader = new FileReader();
        reader.onload = () => {
            setImg([...img, reader.result])
        }

        reader.readAsDataURL(e.target.files[0]);
    }
    const handleSubmit = async (values, props) => {
        if (img !== '') {
            values.image = img
        }
        const { question, categorie, competence, reponse, image } = values;
        await sleep(3000);
        console.log(image)
        console.log(correct)
        /* if (img == '') {
             setAlert('Image est obligatoire', 'danger')
         } else {
            CreateJeux1({ question, reponse, image, competence })
         }
         props.setSubmitting(false)
         props.resetForm()*/
    }
    let val = null
    const [categories, setCategories] = useState([])
    const [competence, setCompetence] = useState([])
    const [idcat, setIdcat] = useState('')
    const [idcomp, setIdcomp] = useState('')
    const [correct, setCorrect]=useState('')
    const fetch = async () => {
        const res = await axios('/api/categorie')
        setCategories(res.data)
    }
    const fetch2 = async () => {
        const res = await axios(`/api/competance/${idcat}/categorie`)
        setCompetence(res.data)
    }

    useEffect(() => {
        fetch()
    }, [])
    useEffect(() => {
        fetch2()
    }, [idcat])
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
                                                        multiple={true}
                                                        onChange={(e) => handleImageChangeCorrect(e)}
                                                        style={{ display: 'none' }}
                                                        ref={refers}
                                                    />
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={handleClickCorrect}
                                                        style={{ height: '40px', marginTop: "20px" }}
                                                    >
                                                        Choisir image 
                                                </Button>
                                                    <div className="img-holder" style={{ margin: 'auto', width: '160px', height: '157px', borderRadius: '5px', marginTop: '-50px', marginLeft: "38px", background: img ? `url("${correct}") no-repeat center/cover` : "#fff" }}>
                                                    </div>
                                                </Box>
                                            </Box>

                                            <Box my={1} ml={3} mt={3} style={{ display: 'flex' }}>
                                                <Box>
                                                    <label>Téléchargez les images :{"   "}</label>
                                                </Box>
                                                <Box mt={5} ml={-19} >
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
                                                        Ajouter des images
                                                </Button>
                                                <Button variant="contained"  color="secondary" onClick={()=>setImg([])} style={{marginTop:'18px',marginLeft:'15px'}}>Réinitialiser</Button>


                                                </Box>
                                            </Box>
                                            <div className={classes.wrapperwar}>

                                                <div className={classes.wrapper}>
                                                    {img.map((imge, i) => (

                                                        <Avatar
                                                            key={i}
                                                            src={imge}
                                                            style={{ margin: 'auto', width: '160px', height: '157px', borderRadius: '5px', marginLeft: "38px", marginTop: '10px' }}
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
NewJeux2.propTypes = {
    setAlert: PropTypes.func.isRequired,
    CreateJeux1: PropTypes.func.isRequired,

}

export default connect(null, { setAlert, CreateJeux1 })(NewJeux2)
