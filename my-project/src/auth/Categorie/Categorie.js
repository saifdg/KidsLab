import React, { useEffect, useState, useContext } from 'react';
import {
    Grid,
    Paper,
} from "@material-ui/core";
import { withRouter } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import ForwardIcon from '@material-ui/icons/Forward';
import Axios from 'axios'
import { GameContext } from '../gameWrapper/Context/GameProvider';

//params {props.params._id}

const Categorie = (props) => {

    const root = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Nunito",
    };
    const paperStyle = {
        padding: 50,
 
        margin: "50px auto",

    };
    const fetch = async () => {
        const rest = await Axios.get(`/api/competance/${props.match.params.id}/categorie`)
        setRes({ location: rest.data })
    }
    const [res, setRes] = useState({ location: [] })
    const game = useContext(GameContext)
    useEffect(() => {
        fetch()
    }, [])
    console.log(game)
    return (
        <div className={root} >
            <Grid style={{ marginTop: '50px' }}>
                <Paper align='center' elevation={0} style={paperStyle} style={{ display: 'flex' }}>
                    <Grid  align='center' style={{ display: 'block' }}>
                        <h1 style={{ fontFamily: 'nunito', fontWeight: 'bold' }}>Commencer a jouer !!</h1>
                        <Divider />
                        {res.location.map((data, id) => (
                            <div key={id}>
                                <List component="nav" aria-label="main mailbox folders" style={{ marginTop: '20px' }} >
                                    <ListItem button component={Link} href={"/Games/" + data._id + "/" + props.match.params.id}>
                                        <ListItemIcon>
                                            <ForwardIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={data.name} style={{ textDecoration: 'none', color: 'black' }} />
                                    </ListItem>
                                </List>
                                <Divider />
                            </div>))}

                    </Grid>
                </Paper>
            </Grid>
        </div>
    )
}

export default withRouter(Categorie)
