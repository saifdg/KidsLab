import React, { useContext, useState } from 'react'
import Avatar from '@material-ui/core/Avatar';
import {
    Grid,
    Paper,
    Button
} from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { GameContext } from './Context/GameProvider';



const Algo2 = (props) => {

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
    };
    const img1 = 'https://cdn.pixabay.com/photo/2015/04/04/19/13/one-706897_960_720.jpg'
    const img2 = 'https://image.shutterstock.com/image-illustration/number-2-chrome-solid-alphabet-260nw-77005477.jpg'
    const img3 = 'https://cdn.pixabay.com/photo/2015/04/04/19/13/three-706895_640.jpg'

    const correct = 'https://cdn.pixabay.com/photo/2015/04/04/19/13/three-706895_640.jpg'

    const [op, setOp] = useState({ op1: 100, op2: 100, op3: 100 })
    const [open, setOpen] = useState(false)
    const [img, setImg] = useState(null)

    const getImg1 = () => {
        setImg(img1)
        setOp({ op1: 0.6, op2: 100, op3: 100 })
    }
    const getImg2 = () => {
        setImg(img2)
        setOp({ op1: 100, op2: 0.6, op3: 100 })
    }
    const getImg3 = () => {
        setImg(img3)
        setOp({ op3: 0.6, op2: 100, op1: 100 })
    }


    const handlAnswer = () => {
        if (correct == img) {
            setOpen(true)
        } else if (img == null) {
            alert('chose an answer')
        } else if (correct != img) {
            alert('wrong')
        }

    }

    const game=useContext(GameContext)


   // console.log(game)
    return (
        <div className={root}>
            <Grid align="center">
                <Paper elevation={0} style={paperStyle}>
                    <Grid align="center">
                        <h1 style={{ fontFamily: "Nunito", fontWeight: 'bold' }}>
                            What is 1 + 2 ?
                </h1>
                        <Grid align="center" style={{ display: 'flex', paddingTop: '20px', marginLeft: '200px' }}>
                            <div style={{ background: 'black' }}>
                                <Avatar variant="square" src={img1} onClick={getImg1} style={{ height: "100px", width: '100px', cursor: 'pointer', opacity: `${op.op1}`, border: '1px solid black' }} />
                            </div>
                            <div style={{ background: 'black', marginLeft: '10px' }}>
                                <Avatar variant="square" src={img2} onClick={getImg2} style={{ height: "100px", width: '100px', cursor: 'pointer', opacity: `${op.op2}`, border: '1px solid black' }} />
                            </div>
                            <div style={{ background: 'black', marginLeft: '10px' }}>
                                <Avatar variant="square" src={img3} onClick={getImg3} style={{ height: "100px", width: '100px', cursor: 'pointer', opacity: `${op.op3}`, border: '1px solid black' }} />
                            </div>
                        </Grid>
                        <Button variant="contained" onClick={game.toggleButton} color="primary" style={{ marginTop: '30px' }}>Validé</Button>

                    </Grid>
                </Paper>
                <Dialog
                    open={open}
                    keepMounted
                    onClose
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogContent>

                    </DialogContent>
                </Dialog>
            </Grid>
        </div>
    )
}

export default Algo2
