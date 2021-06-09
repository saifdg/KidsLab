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

function Users() {
    const classes = useStyles();
    const fetch = async () => {
        const res = await axios.get('/api/users')
        setUser({ location: res.data })
    }
    const [user, setUser] = useState({ location: [] })
    let array = []
    user.location.map((users) => { if (users.role == 'user') { array = [...array, users] } })

    useEffect(() => {
        fetch()
    }, [])

    return (
        <Grid container spacing={3}>
            {/* Recent Users */}
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Title>Les utilisateurs</Title>
                    <Grid align="right">
                        <Button href="/app/CreateUser" variant="contained" color='primary' style={{ marginRight: '10px', color: '#fff' }} >
                            Crée un nouveux utilisateur
                        </Button>
                    </Grid>

                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>id</TableCell>
                                <TableCell>Nom et Prénom</TableCell>
                                <TableCell>E-mail</TableCell>
                                <TableCell>Sexe</TableCell>
                                <TableCell align="right">Abonnement</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {array.map((user, i) => (
                                <TableRow key={i}>
                                    <TableCell>{user._id}</TableCell>
                                    <TableCell>{user.firstName} {user.lastName}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.gender}</TableCell>
                                    <TableCell align="right">{user.sub}</TableCell>
                                    <TableCell align="right"><Button variant="contained" color='primary'>Edité</Button></TableCell>
                                    <TableCell align="right"><Button onClick={async () => {
                                        await axios.delete(`/api/users/${user._id}`)
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

export default Users