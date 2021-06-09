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


// Generate Order Data


const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));

function Competances() {
    const classes = useStyles();
    const fetch = async () => {
        const res = await axios.get('/api/competance')
        setCompetance({ location: res.data })
    }
    const [competance, setCompetance] = useState({ location: [] })
    useEffect(() => {
        fetch()
    }, [])
    return (
        <Grid container spacing={3}>
            {/* Recent Users */}
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Title>Les compétences</Title>
                    <Grid align="right">
                        <Button href='/app/CreateCompetence' variant="contained" color='primary' style={{ marginRight: '10px',color:'#fff' }} >
                            Crée une nouvelle compétence
                        </Button>
                    </Grid>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell>Nom </TableCell>
                                <TableCell>Id de Createur</TableCell>
                                <TableCell>Id de Categorie</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {competance.location.map((competances, i) => (
                                <TableRow key={i}>
                                    <TableCell>{competances._id}</TableCell>
                                    <TableCell>{competances.name}</TableCell>
                                    <TableCell>{competances.user}</TableCell>
                                    <TableCell>{competances.categorie}</TableCell>
                                    <TableCell align="right"><Button variant="contained" color='primary'>Edité</Button></TableCell>
                                    <TableCell align="right"><Button onClick={async () => {
                                        await axios.delete(`/api/competance/${competances._id}`)
                                        window.location.reload(true)
                                    }} variant="contained" color='secondary'>Supprimer</Button></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default Competances