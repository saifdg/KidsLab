import React, { useContext } from 'react'
import {
    Grid,
    Paper,
    Button,
    CircularProgress
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Avatar from '@material-ui/core/Avatar';
import ReactStoreIndicator from 'react-score-indicator'
import { GameContext } from '../Context/GameProvider';
const Score = (props) => {
    const paperStyle = {
        padding: 40,

        margin: "20px 20px",
    };
    const game = useContext(GameContext)
    return (
        <div>
            <Grid >
                <Paper elevation={2} style={paperStyle}>
                    <Grid align="center">
                        <h3 style={{ fontFamily: 'nunito',fontWeight:'bold' }}>Score :</h3>
                        <Grid align="center">

                            <ReactStoreIndicator
                                value={game.score}
                                maxValue={props.Score}
                            />
                        </Grid>
                        <h6 style={{ fontFamily: 'nunito', marginTop: '20px' }}>Nombre des question traité : {game.nbt}</h6>
                        <h6 style={{ fontFamily: 'nunito', marginTop: '20px' }}>Nombre des fautes : {game.nbf}</h6>
                    </Grid>
                </Paper>
            </Grid>
        </div>
    )
}

export default Score
