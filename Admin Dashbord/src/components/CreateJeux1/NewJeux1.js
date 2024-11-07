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
    }
}));

const NewJeux1 = ({ setAlert, CreateJeux1 }) => {
    const classes = useStyles();
    const refer = useRef(null);

    const handleClick = () => {
        refer.current.click()

    }
    const sleep = (time) => new Promise((acc) => setTimeout(acc, time));
    const [img, setImg] = useState('')
    const [formData, setFormData] = useState({
        initialValues: {
            categorie: '',
            competence: '',
            question: '',
            reponse: '',

        }
    })
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
        Form.append('file',img)
        Form.append('question',values.question)
        Form.append('reponse',values.reponse)
        Form.append('categorie',values.categorie)
        if (img == '') {
            setAlert('Image est obligatoire', 'danger')
        } 
        else {
           CreateJeux1(Form,values.competence)
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
                                                    onChange={handleChange}
                                                    value={values.reponse}

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
NewJeux1.propTypes = {
    setAlert: PropTypes.func.isRequired,
    CreateJeux1: PropTypes.func.isRequired,

}

export default connect(null, { setAlert, CreateJeux1 })(NewJeux1)
