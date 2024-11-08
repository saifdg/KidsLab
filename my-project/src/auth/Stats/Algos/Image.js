import React, { useState, useContext, useEffect } from 'react'
import Avatar from '@material-ui/core/Avatar';
import {
    Grid,
    Paper,
    Button,
    TextField,
    Box,
} from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import img from '../../../img/check-circle.gif'
import wrong from '../../../img/wrong.gif'
import Swal from 'sweetalert2';
import { GameContext } from '../../gameWrapper/Context/GameProvider';


const Image = (props) => {

    const paperStyle = {
        padding: 40,
        width: 800,
        margin: "20px auto",
    };
    const paperStyle2 = {
        padding: 50,
        margin: "10px auto",
    };
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
        setAnswer('')
        game.toggleButton()
    };

    const motivate = ['Fantastique', 'Parfait', 'Bon travail', 'Continuer comme ça', 'Incroyable', 'Bonne réponse', 'Super', 'Exellent']
    const [answer, setAnswer] = useState('')
    const [bool, setBool] = useState(null)
    const game = useContext(GameContext)
    const onchange = (e) => {
        setAnswer(e.target.value)
    }
   
    const handleSubmit = () => {

        if (answer == '') {
            Swal.fire('Attention', "Ajouter une reponse", 'error')
        } else {
            let isnum = /^\d+$/.test(answer);
            if (isnum) {
                const rep = parseInt(answer)
                if (rep == props.reponse) {
              
                    setOpen(true)
                    setBool(true)
                   

                } else {
                    
                    setOpen(true)
                    setBool(false)
                }
            } else {
                Swal.fire('Attention', "la reponse est pas de type Number", 'error')
            }


        }


    }
    const icon = 'https://cdn1.iconfinder.com/data/icons/social-messaging-ui-color-round-2/254000/91-512.png'
    const [speech, setSpeech] = useState('');
    const apiKey = '264eafad30a84332adc348aec4bef0e0'
    const handleClick = () => {
        const audioSrc = `http://api.voicerss.org/?key=${apiKey}&hl=fr-fr&src=${props.question}&r=1`

        setSpeech(audioSrc);
    };
    return (
        <Grid align="center">
            <Paper elevation={0} style={paperStyle}>
                <Grid align="center">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>


                        <img src={icon} style={{ width: '6%', height: '6%', cursor: 'pointer' }} onClick={handleClick} />

                        {speech && <audio autoPlay src={speech}></audio>}

                        <h3 style={{ fontFamily: "Nunito", fontWeight: 'bold', marginLeft: '10px', textAlign: "left" }}>
                            {props.question}
                        </h3>
                    </div>

                    <Avatar variant="square" src={props.image} style={{ height: "60%", width: '60%', cursor: 'pointer', borderRadius: '10px', marginTop: '20px' }} />

                    <Box mt={3}>
                        <TextField
                            name='answer'
                            label='Taper le resultat ici'
                            onChange={(e) => onchange(e)}
                            value={answer}
                            autoComplete='off'
                            variant="outlined"
                        />

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                            style={{ marginLeft: '20px', marginTop: '10px' }}>
                            Validé
                        </Button>
                    </Box>
                </Grid>
            </Paper>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Grid>
                    <Paper elevation={0} style={paperStyle2}>
                        <Grid align="center">
                            {bool ?

                                <div>
                                    <img src={img} alt='gif' />
                                    <h1 style={{ color: '#35b557', borderRadius: '25px', border: '2px solid #35b557', padding: '20px', fontWeight: 'bold' }}>{motivate[Math.floor(Math.random() * motivate.length)]}</h1>
                                    <Button variant="contained"
                                        style={{ marginTop: '20px' }}
                                        color="primary" onClick={handleClose}> continuer
                                    </Button>
                                </div>
                                :
                                <div>
                                    <img src={wrong} alt='gif' style={{ width: '30%', height: '30%' }} />
                                    <h1 style={{ color: '#f74f43', borderRadius: '25px', border: '2px solid #f74f43', padding: '20px', fontWeight: 'bold' }}>Réponse incorrecte</h1>
                                    <h3 style={{ marginTop: '20px', fontWeight: 'bold', color: '#35b557', borderRadius: '25px', border: '2px solid #35b557', padding: '20px' }}>La réponse correct est : <span style={{ color: '#000', fontWeight: 'bold' }}>{props.reponse}</span></h3>
                                    <Button variant="contained"
                                        style={{ marginTop: '20px' }}
                                        color="primary" onClick={handleClose}>
                                       continuer
                                    </Button>
                                </div>
                            }
                        </Grid>
                    </Paper>
                </Grid>
            </Dialog>
        </Grid>
    )
}

export default Image
