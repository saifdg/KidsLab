import React, { useEffect, useState } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Title from './Title';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TableContainer from "@material-ui/core/TableContainer";
import SearchBar from "material-ui-search-bar";
import { GetUsers,GetCategories,GetCompetances,GetJeux1,GetJeux2,GetJeux3 } from '../../../action/auth'
import {useDispatch}from 'react-redux'

// Generate Order Data


const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));

function Jeux1() {
    const dispatch = useDispatch()
    const classes = useStyles();
    const fetch = async () => {
        const res = await axios.get('/api/jeux1')
        setJeux({ location: res.data })
        setMount(true)
    }
    useEffect(() => {
        dispatch(GetJeux1())
    }, [])
    const [rows, setRows] = useState(null);
    const [searched, setSearched] = useState('')
    const [jeux, setJeux] = useState({ location: [] })
    const [mount, setMount] = useState(false)
    const requestSearch = (searchedVal) => {
        if (mount) {
            const filteredRows = jeux.location.filter((row) => {
                return Object.keys(row).some(key =>{
                    return row[key].toString().toLowerCase().includes(searchedVal);
                })
              
            })
            setRows(filteredRows)
        }
    }
    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
    };
    useEffect(() => {
        fetch()
    }, [])
    useEffect(() => {
        setRows(jeux.location)
    }, [mount])
    return (
        <Grid container spacing={3}>
            {/* Recent Users */}
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Title>Les Jeux d'algorithme 1</Title>
                    <Grid align="right" style={{marginBottom:'20px'}}>
                        <Button href='/app/CreateJeux1' variant="contained" color='primary' style={{ marginRight: '10px', color: '#fff' }} >
                            Crée un nouvelle Jeux1
                        </Button>
                    </Grid>
                    <SearchBar
                        value={searched}
                        onChange={(searchVal) => requestSearch(searchVal)}
                        onCancelSearch={() => cancelSearch()}
                    />
                    <TableContainer>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Id</TableCell>
                                    <TableCell>Question </TableCell>
                                    <TableCell>Reponse</TableCell>
                                    <TableCell>image</TableCell>
                                    <TableCell>Id de Compétence</TableCell>
                                    <TableCell>Date de creation</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {rows ? rows.map((jeu, i) => (
                                    <TableRow key={i}>
                                        <TableCell>{jeu._id}</TableCell>
                                        <TableCell>{jeu.question}</TableCell>
                                        <TableCell>{jeu.reponse}</TableCell>
                                        <TableCell><img src={jeu.image} style={{width:'50px',height:'50px'}}/></TableCell>
                                        <TableCell>{jeu.competance}</TableCell>
                                        <TableCell>{jeu.date}</TableCell>
                                        <TableCell align="right"><Button style={{color:'#fff'}} href={'/app/EditJeux1/' + jeu._id} variant="contained" color='primary'>Edité</Button></TableCell>
                                        <TableCell align="right"><Button onClick={async () => {
                                        await axios.delete(`/api/jeux1/${jeu._id}`)
                                        window.location.reload(true)
                                    }} variant="contained" color='secondary'>Supprimer</Button></TableCell>
                                    </TableRow>
                                )) : null}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default Jeux1