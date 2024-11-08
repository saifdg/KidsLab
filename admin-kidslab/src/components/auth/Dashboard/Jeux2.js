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
import SearchBar from "material-ui-search-bar";
import { GetUsers,GetCategories,GetCompetances,GetJeux1,GetJeux2,GetJeux3 } from '../../../action/auth'
import {useDispatch}from 'react-redux'

// Generate Order Data


const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
    paper:{
        width:"280vh"
    }
}));

function Jeux2() {
    const classes = useStyles();
    const dispatch = useDispatch()
    const [rows, setRows] = useState(null);
    const [searched, setSearched] = useState('')
    const [mount, setMount] = useState(false)
    const fetch = async () => {
        const res = await axios.get('/api/jeux2')
        setJeux({ location: res.data })
        setMount(true)
    }
    
    useEffect(() => {
        dispatch(GetJeux2())
    }, [])
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
    const [jeux, setJeux] = useState({ location: [] })
    useEffect(() => {
        fetch()
    }, [])
    useEffect(() => {
        setRows(jeux.location)
    }, [mount])
    console.log(jeux.location)
    return (
        <Grid container spacing={3}>
            {/* Recent Users */}
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Title>Les Jeux d'algorithme 2</Title>
                    <Grid align="right"  style={{marginBottom:'20px'}}>
                        <Button href='/app/CreateJeux2' variant="contained" color='primary' style={{ marginRight: '10px' ,color:'#fff'}} >
                            Crée un nouvelle Jeux2
                        </Button>
                    </Grid>
                    <SearchBar
                        value={searched}
                        onChange={(searchVal) => requestSearch(searchVal)}
                        onCancelSearch={() => cancelSearch()}
                    />
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell>Question </TableCell>
                                <TableCell>Url de l'image Correct</TableCell>
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
                                    <TableCell>{jeu.competance}</TableCell>
                                    <TableCell>{jeu.date}</TableCell>
                                    <TableCell align="right"><Button style={{color:'#fff'}} href={'/app/EditJeux2/' + jeu._id} variant="contained" color='primary'>Edité</Button></TableCell>
                                    <TableCell align="right"><Button onClick={async () => {
                                        await axios.delete(`/api/jeux2/${jeu._id}`)
                                        window.location.reload(true)
                                    }} variant="contained" color='secondary'>Supprimer</Button></TableCell>
                                </TableRow>
                            )):null}
                        </TableBody>
                    </Table>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default Jeux2