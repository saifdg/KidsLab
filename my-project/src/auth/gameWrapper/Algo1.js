import React, { useState,useContext } from 'react'
import Avatar from '@material-ui/core/Avatar';
import {
    Grid,
    Paper,
    Button
} from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { Formik, Form, Field } from "formik";
import { TextField, Select } from "formik-material-ui";
import { GameContext } from './Context/GameProvider';

const Algo1 = () => {

    const img = 'https://etc.usf.edu/clipart/37100/37136/frac_01-03_37136_lg.gif'
    const [formData, setFormdata] = useState({
        initialValues: {
            answer: null
        }
    })
    const paperStyle = {
        padding: 40,
        width: 800,
        margin: "20px auto",
    };
    const correct = 3;
    const handleSubmit = async (values) => {
        if (values.answer == null) {
            alert('please answer the question')
        } else if (values.answer == correct) {
            alert('good')
            
        } else {
            alert('wrong')
        }
    }
    const game=useContext(GameContext)
   // console.log(game)
    return (
        <Grid align="center">
            <Paper elevation={0} style={paperStyle}>
                <Grid align="center">
                    <h1 style={{ fontFamily: "Nunito", fontWeight: 'bold' }}>
                        What is 1 / 3 ?
                    </h1>

                    <Avatar variant="square" src={img} style={{ height: "60%", width: '40%', cursor: 'pointer', border: '1px solid black' }} />

                    <Formik

                        initialValues={formData.initialValues}
                        
                    >

                        <Form style={{ paddingTop: '20px', alignItems: 'center' }}>
                            <Field
                                name='answer'
                                type='number'
                                component={TextField}
                                placeholder='Taper le resultat ici'
                            />
                            <Button variant="contained"
                                color="primary"
                                onClick={game.toggleButton}
                                style={{ marginLeft: '20px' }}>
                                Validé
                            </Button>
                        </Form>

                    </Formik>


                </Grid>
            </Paper>
            <Dialog
                open={false}
                keepMounted
                onClose
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent>

                </DialogContent>
            </Dialog>
        </Grid>
    )
}

export default Algo1
