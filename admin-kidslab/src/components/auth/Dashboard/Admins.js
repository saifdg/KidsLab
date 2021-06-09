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



const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));

function Admins() {
    const classes = useStyles();
    const fetch = async () => {
        const res = await axios.get('/api/users')
        setUser({ location: res.data })
    }
    const [user, setUser] = useState({ location: [] })
    let array = []
    user.location.map((admin) => { if (admin.role == 'admin') { array = [...array, admin] } })
    useEffect(() => {
        fetch()
    }, [])

    return (
        <Grid container spacing={3}>
            {/* Recent Users */}
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Title>Les administarteurs</Title>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>id</TableCell>
                                <TableCell>Nom et Prénom</TableCell>
                                <TableCell>E-mail</TableCell>
                                <TableCell>Sexe</TableCell>
                               
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {array.map((user, i) => (
                                <TableRow key={i}>
                                    <TableCell>{user._id}</TableCell>
                                    <TableCell>{user.firstName} {user.lastName}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.gender}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default Admins