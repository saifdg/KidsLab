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
import { makeStyles } from '@material-ui/core/styles';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'


// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 ${grid}px 0 0`,
    borderRadius: '15px',
    border: '2px solid #000',
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    // change background colour if dragging
    background: '#6293e3',

    // styles we need to apply on draggables
    ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
    background: '#fff',
    display: 'flex',
    padding: grid,
    overflow: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
});

const useStyles = makeStyles({
    flexbox: {

        width: "100%",
        margin: '0 auto',
    },

    board: {
        width: "100%",
        backgroundColor: 'cadetblue',
        padding: '15px',
        border: '2px solid #000',
        borderRadius: '15px',
        fontWeight: 'bold',
        marginLeft: '10px'
    },



});

////////////////////////////////////////////////////////////////////////////////////////////

const DragDrop = (props) => {
  
    const classes = useStyles();
    const paperStyle = {
        padding: 40,
        width: 800,
        margin: "20px auto",
    };
    const paperStyle2 = {
        padding: 50,
        marginTop: "10px ",
        alignItems: 'center',
        justifyContent: 'center',
    };
    const style = {
        userSelect: 'none',
        padding: 8 * 2,
        margin: `0 8px 0 0`,
        borderRadius: '15px',
        display: 'flex',
        border: '2px solid #000',
        fontWeight: 'bold',
        background: '#6293e3',
        alignItems: 'center',
        justifyContent: 'center',

    }
    const style2 = {
        background: '#fff',
        display: 'flex',
        padding: 8,
        overflow: 'auto',
        justifyContent: "center"
    }
    /////////////////////////////////////////////////////////////////
    const icon = 'https://cdn1.iconfinder.com/data/icons/social-messaging-ui-color-round-2/254000/91-512.png'
    const [speech, setSpeech] = useState('');
    const apiKey = '264eafad30a84332adc348aec4bef0e0'
    const handleClick = () => {
        const audioSrc = `http://api.voicerss.org/?key=${apiKey}&hl=fr-fr&src=${props.question}&r=1`

        setSpeech(audioSrc);
    };

    ////////////////////////////////////////////////////////////////////////
    const [bool, setBool] = useState(null)
    const [open, setOpen] = React.useState(false);
    const game = useContext(GameContext)
    const motivate = ['Fantastique', 'Parfait', 'Bon travail', 'Continuer comme ça', 'Incroyable', 'Bonne réponse', 'Super', 'Exellent']

  

 
    const handleSubmit = () => {

        if (string == answer) {
           
            setOpen(true)
            setBool(true)
           

           
        } else {
          
            setOpen(true)
            setBool(false)
          
        }

    }

    const handleClose = () => {
        setOpen(false);
        game.toggleButton()
    };
    //////////////////////////////////////////////////////////////////////////////////////////////////
    const [items, setItems] = useState([]);
    const [correct, setCorrect] = useState([])
    useEffect(() => {
        if (props.jeuxType == 'croissant') {
            setCorrect(props.reponse.slice().sort((a, b) => a - b))
        } else if (props.jeuxType == 'decroissant') {
            setCorrect(props.reponse.slice().sort((a, b) => b - a))
        }
        const aa = Array.from({ length: props.reponse.length }, (v, k) => k).map((k, v) => ({
            id: `item-${v}`,
            content: k
        }));


        const newArrayObj = aa.reduce((acc, current, index) => {
            return acc.concat({ ...current, content: props.reponse[index] });
        }, []);
        setItems(newArrayObj.sort(() => Math.random() - 0.5))
    }, [props])
console.log(props.reponse)
    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }
        const onother = reorder(
            items,
            result.source.index,
            result.destination.index
        );
        setItems(onother)
        // console.log(onother)
    }



    const [string, setString] = useState('')
    const [answer, setAnswer] = useState('')
    useEffect(() => {
        let s = ''
        for (let i = 0; i < correct.length; i++) {
            s = s + `/${correct[i]}`
        }
        s = s.slice(1)
        setString(s)
    }, [correct])
    useEffect(() => {
        let s = ''
        for (let i = 0; i < items.length; i++) {
            s = s + `/${items[i].content}`
        }
        s = s.slice(1)
        setAnswer(s)
    }, [items])


    //console.log(string)
    console.log(correct)
    return (
        <Grid align="center">
            <Paper elevation={0} style={paperStyle} >
                <Grid align="center" className={classes.flexbox} style={{ justifyContent: "center", alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>


                        <img src={icon} style={{ width: '6%', height: '6%', cursor: 'pointer' }} onClick={handleClick} />

                        {speech && <audio autoPlay src={speech}></audio>}

                        <h3 style={{ fontFamily: "Nunito", fontWeight: 'bold', marginLeft: '10px', textAlign: "left" }}>
                            {props.question}
                        </h3>
                    </div>
                    <Box mt={3} ml={2} mb={3} style={{ justifyContent: "center", alignItems: 'center' }}>
                        <DragDropContext onDragEnd={onDragEnd} style={{ justifyContent: "center", alignItems: 'center' }}>
                            <Droppable droppableId="droppable" direction="horizontal">
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        style={getListStyle(snapshot.isDraggingOver)}
                                        {...provided.droppableProps}
                                    >
                                        {items ? <>
                                            {items.map((item, index) => (
                                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={getItemStyle(
                                                                snapshot.isDragging,
                                                                provided.draggableProps.style
                                                            )}
                                                        >
                                                            {item.content}
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                        </> : null}

                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </Box>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        style={{ marginLeft: '20px', marginTop: '10px' }}>
                        Validé
                    </Button>
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
                                    <h3 style={{ marginTop: '20px', fontWeight: 'bold', color: '#35b557', borderRadius: '25px', border: '2px solid #35b557', padding: '20px' }}>La réponse correct est : </h3>
                                    <Grid>
                                        <Box style={style2}>

                                            {correct.map((nb) => (


                                                <div style={style}>
                                                    {nb}
                                                </div>


                                            ))}
                                        </Box>

                                        <Button variant="contained"
                                            style={{ marginTop: '20px' }}
                                            color="primary" onClick={handleClose}>
                                            continuer
                                        </Button>
                                    </Grid>
                                </div>
                            }
                        </Grid>
                    </Paper>
                </Grid>
            </Dialog>
        </Grid>
    )
}

export default DragDrop
