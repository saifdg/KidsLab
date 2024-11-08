import React, { useRef, useState,useEffect } from 'react'
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
import { AdminUpdateCategorie } from '../../action/auth'
import { useSelector, useDispatch } from 'react-redux';
import {useHistory } from 'react-router';



const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));

const EditCategorie = (props) => {

    const dispatch = useDispatch()
    const history=useHistory()

    let categorie = useSelector((state) => state.Auth.categorie)
     
    const [id,setId]=useState()
    const [categories,setCategorie]=useState()
    useEffect(() => {
        if(categorie.length!==0){
          for(let i=0;i<categorie.length;i++){
             if(categorie[i]._id==props.match.params.id){
                setCategorie(categorie[i])
                 setFormData({
                    name:categorie[i].name,
                    description:categorie[i].description,
                    imageUrl:categorie[i].imageUrl,
         })
         setImgPrev(categorie[i].imageUrl)
         setId(categorie[i]._id)
         setCategorie(categorie[i])
        }
    }
}else{
    history.push('/app/Categories')
}
    
      
    }, [])

    const classes = useStyles();
    const refer = useRef(null);

    const handleClick = () => {
        refer.current.click()

    }
    const sleep = (time) => new Promise((acc) => setTimeout(acc, time));
    const [img, setImg] = useState(null);
    const [imgPrev, setImgPrev] = useState('')
    const handleImageChange = (e) => {

        let reader = new FileReader();

        setImg(e.target.files[0])
        reader.onload = () => {

            setImgPrev(reader.result)
        }

        reader.readAsDataURL(e.target.files[0]);
    }
    const handleChangeUser = (event) => {
        const { value, name } = event.target;

        const newUser = { ...formData };
        newUser[name] = value;

        setFormData({...newUser})
    }
    const [formData, setFormData] = useState({
   
            name: '',
            description: '',
            imageUrl:''
   
    })
    const handleSubmit = async () => {
        await sleep(3000);
        const Form = new FormData()
        Form.append('file',img?img:'old')
        Form.append('name',formData.name)
        Form.append('description',formData.description)
        Form.append('oldImg',formData.imageUrl)
        const {description,imageUrl,name}=formData
        if (description==categories.description&&name==categories.name&&categories.imageUrl==imgPrev) {
            dispatch(setAlert("Aucune changement ",'dark'))
        } else {
            dispatch(AdminUpdateCategorie(Form,id))
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
                                <Box ml={3} mt={3} >
                                    <TextField
                                        error={Boolean(touched.name && errors.name)}
                                        fullWidth
                                        label="Nom de categorie"
                                        margin="normal"
                                        name="name"
                                        onBlur={handleBlur}
                                        onChange={handleChangeUser}
                                        value={formData.name}

                                    />
                                </Box>
                                <Box ml={3} mt={3} >
                                    <TextField
                                        error={Boolean(touched.description && errors.description)}
                                        fullWidth
                                        helperText={touched.description && errors.description}
                                        label="Description de categorie"
                                        margin="normal"
                                        name="description"
                                        onBlur={handleBlur}
                                        onChange={handleChangeUser}
                                        value={formData.description}
                                        variant="outlined"
                                    />
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

export default EditCategorie
