import React, { useContext, useEffect, useState } from 'react'
import Avatar from '@material-ui/core/Avatar';
import {
    Grid,
    Paper,
    Button
} from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import { GameContext } from './Context/GameProvider';
import { makeStyles } from '@material-ui/core/styles';
import img from '../../img/check-circle.gif'
import wrong from '../../img/wrong.gif'
import swal from 'sweetalert2';
import { loadUser, Stats, UpdateScore } from '../../action/auth'
import { useSelector, useDispatch } from 'react-redux';
import Axios from 'axios';

const useStyles = makeStyles({
    image: {
        border: "1px solid #ddd ",
        borderRadius: "4px",
        margin: "4px 3px !important",

        "&:hover, &:focus": {
            boxShadow: "0 0 2px 1px rgba(0, 140, 186, 0.5)"
        }
    },
    img: {
        border: "1px solid #ddd",
        borderRadius: "4px",
        width: "30%",
        height: '50%',
    }

});

const Algo2 = (props) => {
    const classes = useStyles();
    const root = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Nunito",

    };
    const paperStyle = {
        padding: 40,
        width: 800,
        margin: "20px auto",
        border: "flex"
    };
    const paperStyle2 = {
        padding: 50,
        margin: "10px auto",
    };
    const dispatch = useDispatch()
    let user = useSelector((state) => state.Auth.user)
    let auth = useSelector((state) => state.Auth.isAuthenticated)
    const handleClose = async () => {
        setOpen(false);
        setRep('')
        game.toggleButton()

    };
    const [bool, setBool] = useState(null)
    const [open, setOpen] = React.useState(false);
    const motivate = ['Fantastique', 'Parfait', 'Bon travail', 'Continuer comme ça', 'Incroyable', 'Bonne réponse', 'Super', 'Exellent']

    const [rep, setRep] = useState('')
    const [state, setState] = useState([])

    let stats = useSelector((state) => state.Auth.stats)

    const Post = async (jeux) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = {
            jeux: jeux
        }
        await Axios.post('/api/users/jeuxtraiter', body)
    }
    const Postfault = async (id,type) => {
        const body={
            fault:id,
            type:type
        }
        await Axios.put('/api/users/jeuxtraiter',body)
    }
    const handleSubmit = () => {
        if (rep == '') {
            swal.fire("Attention !!", "Assurez-vous de définir une réponse", 'error')
        }
        else if (rep == props.reponse) {
            let nbt = game.nbt + 1
            let score = game.score + 12
            let found = false
            setOpen(true)
            setBool(true)
            if (auth) {
                if (stats[0].jeuxTraiter.length !== 0) {
                    for (let i = 0; i < stats[0].jeuxTraiter.length; i++) {
                        if (stats[0].jeuxTraiter[i].jeux == props._id) {
                            found = true
                        }
                    }

                    if (!found) {
                        dispatch(UpdateScore(score, user._id, nbt, game.nbf))
                        Post(props._id)
                    }

                } else {

                    dispatch(UpdateScore(score, user._id, nbt, game.nbf))
                    Post(props._id)
                }

                dispatch(Stats())

            } else {
                game.adjust()
                game.nbtrt()
            }

        } else {
            let nbt = game.nbt + 1
            let nbf = game.nbf + 1
            let found = false
            setOpen(true)
            setBool(false)
            if (auth) {
                if (stats[0].jeuxTraiter.length !==0) {
                    for (let i = 0; i < stats[0].fault.length; i++) {
                        if (stats[0].fault[i].fault == props._id) {
                            found = true
                        }
                    }

                    if (!found) {
                        dispatch(UpdateScore(game.score, user._id, nbt, nbf))
                        Postfault(props._id,props.type)
                    }

                } else {
                    dispatch(UpdateScore(game.score, user._id, nbt, nbf))
                    Postfault(props._id,props.type)
                }

                dispatch(Stats())
            } else {
                game.nbfaut()
                game.nbtrt()
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
    const game = useContext(GameContext)

    return (
        <div className={root}>
            <Grid align="center">
                <Paper elevation={0} style={paperStyle}>
                    <Grid align="center" >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',marginBottom:'20px' }}>


                            <img src={icon} style={{ width: '6%', height: '6%', cursor: 'pointer' }} onClick={handleClick} />

                            {speech && <audio autoPlay src={speech}></audio>}

                            <h3 style={{ fontFamily: "Nunito", fontWeight: 'bold', marginLeft: '10px', textAlign: "left" }}>
                                {props.question}
                            </h3>
                        </div>
                        <Grid align="center" style={{ display: 'flex' }}>
                            <div >
                                {props.files ?
                                    <div className="row mx-0 justify-content-center">
                                        {props.files.sort(() => Math.random() - 0.5).map((img, i) => (
                                            <img
                                                className={`${classes.image} col-3`}
                                                key={i}
                                                src={img}
                                                onClick={() => setRep(img)}

                                            />))}
                                    </div> : null}

                            </div>

                        </Grid>
                        {rep !== '' ?
                            <div >
                                <h3>votre choix est:</h3>
                                <img
                                    className={classes.img}
                                    src={rep}
                                />
                            </div>
                            : null}
                        <Button style={{ marginTop: rep !== '' ? '20px' : '20px' }} variant="contained" onClick={handleSubmit} color="primary" >Validé</Button>

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
                                    <div style={{ display: 'block' }}>
                                        <img src={wrong} alt='gif' style={{ width: '30%', height: '30%' }} />
                                        <h1 style={{ color: '#f74f43', borderRadius: '25px', border: '2px solid #f74f43', padding: '20px', fontWeight: 'bold' }}>Réponse incorrecte</h1>
                                        <h3 style={{ marginTop: '20px', fontWeight: 'bold', color: '#35b557', borderRadius: '25px', border: '2px solid #35b557', padding: '20px' }}>La réponse correct est : </h3>

                                        <img src={props.reponse} alt='gif' style={{ width: '30%', height: '30%' }} />
                                        <Button variant="contained"

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
        </div>
    )
}

export default Algo2
