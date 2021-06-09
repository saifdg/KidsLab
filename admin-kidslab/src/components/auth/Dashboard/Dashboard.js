import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { withRouter, Route, Switch, BrowserRouter, useRouteMatch } from "react-router-dom";
import Admins from './Admins'
import Bar from '../../AppBar/Bar';
import Users from './Users';
import Categories from './Categories';
import Competances from './Competances';
import jeux1 from './Jeux1';
import Jeux2 from './Jeux2';
import Register from '../../Register/Register';
import NewCategorie from '../../CreateCategorie/NewCategorie';
import NewCompetence from '../../CreateCompetence/NewCompetence';
import NewJeux1 from '../../CreateJeux1/NewJeux1';
import NewJeux2 from '../../CreateJeux2/NewJeux2';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

function Dashboard({ auth: { isAuthenticated } }) {
    const classes = useStyles();
    const url = useRouteMatch()

    if (!isAuthenticated) {
        return <Redirect to='/login' />
    }

    return (
        <div className={classes.root}>

            <CssBaseline />
            <Bar />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Switch>
                        <>
                            <Route exact path='/app' component={Admins} />
                            <Route path={`/app/Users`} component={Users} />
                            <Route path={`/app/Categories`} component={Categories} />
                            <Route path={`/app/Competences`} component={Competances} />
                            <Route path={"/app/Jeux1"} component={jeux1} />
                            <Route path={"/app/Jeux2"} component={Jeux2} />
                            <Route path={"/app/CreateUser"} component={Register} />
                            <Route path={"/app/CreateCategorie"} component={NewCategorie} />
                            <Route path={"/app/CreateCompetence"} component={NewCompetence} />
                            <Route path={"/app/CreateJeux1"} component={NewJeux1} />
                            <Route path={"/app/CreateJeux2"} component={NewJeux2} />
                        </>
                    </Switch>
                </Container>
            </main>

        </div>
    );
}
Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
}
const mapStateProps = state => ({
    auth: state.Auth
});
export default connect(mapStateProps)(withRouter(Dashboard))