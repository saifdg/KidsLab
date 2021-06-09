import React, { useRef, useState } from 'react'
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
import { CreateCategorie } from '../../action/auth'


const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));

const NewCategorie = ({ setAlert, CreateCategorie }) => {
    const classes = useStyles();
    const refer = useRef(null);

    const handleClick = () => {
        refer.current.click()

    }
    const sleep = (time) => new Promise((acc) => setTimeout(acc, time));
    const [img, setImg] = useState('');

    const handleImageChange = (e) => {

        let reader = new FileReader();
        formData.initialValues.imageUrl = e.target.files[0];

        reader.onload = () => {
            setImg(reader.result)
        }

        reader.readAsDataURL(e.target.files[0]);
    }
    const [formData, setFormData] = useState({
        initialValues: {
            name: '',
            description: '',
            imageUrl: '',
        }
    })
    const handleSubmit = async (values, props) => {
        if (img !== '') {
            values.imageUrl = img
        }
        const { name, description, imageUrl } = values;
        await sleep(3000);
        if (img == '') {
            setAlert('Image est obligatoire', 'danger')
        } else {
            console.log({ name, description, imageUrl })
            CreateCategorie({ name, description, imageUrl })


        }
        props.setSubmitting(false)
        props.resetForm()
    }

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
                                    <Box ml={3} mt={3} >
                                        <TextField
                                            error={Boolean(touched.name && errors.name)}
                                            fullWidth
                                            label="Nom de categorie"
                                            margin="normal"
                                            name="name"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.name}

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
                                            onChange={handleChange}
                                            value={values.description}
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
                                            <div className="img-holder" style={{ margin: 'auto', width: '160px', height: '157px', borderRadius: '5px', marginTop: '-50px', marginLeft: "38px", background: img ? `url("${img}") no-repeat center/cover` : "#fff" }}>
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
NewCategorie.propTypes = {
    setAlert: PropTypes.func.isRequired,
    CreateCategorie: PropTypes.func.isRequired,

}

export default connect(null, { setAlert, CreateCategorie })(NewCategorie)
