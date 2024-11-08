import React, { useEffect, useState, Fragment } from "react";
import { fade, makeStyles, useTheme } from "@material-ui/core/styles";
import { AppBar, IconButton, Toolbar } from "@material-ui/core";
import SortIcon from "@material-ui/icons/Sort";
import imgg from "../img/logo.png";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import Link from '@material-ui/core/Link';
import {
  Drawer as MUIDrawer,
  ListItem,
  List,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import CategoryIcon from "@material-ui/icons/Category";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import BarChartIcon from "@material-ui/icons/BarChart";
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Signup from "./Sign-up/Signup";
import { connect, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../action/auth'
import Avatar from '@material-ui/core/Avatar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Popover from '@material-ui/core/Popover';
import Profile from "../auth/Profile/Profile";
import ContactMailIcon from '@material-ui/icons/ContactMail';
import ForumIcon from '@material-ui/icons/Forum';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "20vh",
    fontFamily: "Nunito",

  },
  button: {
    "& > *": {
      margin: theme.spacing(1),
    },
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  appbar: {
    background: 'rgba(86, 184, 166, 0.2)',

  },
  appbarWrapper: {
    width: "85%",
    margin: "0 auto",
  },
  appbarTitle: {
    flexGrow: "1",
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),

  },
  icon: {
    color: "#fff",
    fontSize: "3rem",
  },

  img: {
    width: "85% ",
    height: "85%",
  },

  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  Link: {
    width: "22%",
    height: "20%",
  },
  Nav: {
    TextDecoder: "none",
    fontSize: "100px",
    color: "#000",
  },
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
}));

//header

function Header({ auth: { isAuthenticated, loading, user }, logout }) {

  const auth = useSelector((state) => state.Auth.isAuthenticated);

  const theme = useTheme();
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);

  const [ovrer, setOvrer] = useState(false);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleClickOpen = () => {
    setOvrer(true)

  };

  const handleClose = () => {
    setOvrer(false);
  };
  const openProfile = Boolean(anchorEl);

  const handleCloseProfile = () => {
    setShow(false);
  };
  //auth links


  const authLinks = (
    <div>
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar className={classes.appbarWrapper}>
          <Link className={classes.Link} href="/">
            <img className={classes.img} src={imgg} alt="logo" />
          </Link>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.appbarTitle}></div>
          <div
            aria-owns={openProfile ? 'mouse-over-popover' : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
            onClick={() => setShow(true)}

            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              marginRight: "60px",
              cursor: 'pointer'

            }}>
            <Avatar alt="Remy Sharp" src={user && user.file} className={classes.large} />
            <span style={{ padding: "5px 20px", fontSize: '24px', fontWeight: 'bold' }}>Bienvenue {user && user.firstName}</span>
          </div>

          <Popover
            id="mouse-over-popover"
            className={classes.popover}
            classes={{
              paper: classes.paper,
            }}
            open={openProfile}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            <Profile />
          </Popover>


          <IconButton onClick={() => setOpen(true)}>
            <SortIcon className={classes.icon} />
          </IconButton>
        </Toolbar>
      </AppBar>

      <MUIDrawer open={open} anchor={"right"} onClose={() => setOpen(false)}>
        <div className={classes.drawer} onClick={() => setOpen(false)}>
          <div className={classes.toolbar}>
            <IconButton onClick={() => setOpen(false)}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon style={{ fontSize: 40 }} />
              ) : (
                <ChevronLeftIcon style={{ fontSize: 40 }} />
              )}
            </IconButton>
          </div>
          <Divider />
          <List style={{ width: 300, textDecoration: "none" }}>
            <ListItem button component={Link} href="/Maths">
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText className={classes.Nav} primary="Maths" />
            </ListItem>
            <ListItem button component={Link} href="/Suivi-des-progrès">
              <ListItemIcon>
                <BarChartIcon />
              </ListItemIcon>
              <ListItemText className={classes.Nav} primary="Suivi des progrès" />
            </ListItem>
            <ListItem button component={Link} href="/ContactUs">
              <ListItemIcon>
                <ContactMailIcon />
              </ListItemIcon>
              <ListItemText className={classes.Nav} primary="Contactez nous" />
            </ListItem>
            <Divider />
            <ListItem button component={Link} href='/Forum'>
              <ListItemIcon>
                <ForumIcon />
              </ListItemIcon>
              <ListItemText className={classes.Nav} primary="Forum" />
            </ListItem>
            <Divider />
            <ListItem onClick={logout} button component={Link} href='/'>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText className={classes.Nav} primary="Déconnexion" />
            </ListItem>
          </List>
        </div>
      </MUIDrawer>

      <div>
        <Dialog
          open={show}
          keepMounted
          onClose={handleCloseProfile}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent>
            <Profile />
          </DialogContent>
        </Dialog>
      </div>
    </div>




  );


  //guest links


  const guestLinks = (
    <div>
      {!isAuthenticated && loading ? () => setOvrer(false) : null}
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar className={classes.appbarWrapper}>
          <Link className={classes.Link} href="/">
            <img className={classes.img} src={imgg} alt="logo" />
          </Link>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.appbarTitle}></div>
          <div className={classes.button}>

            <Button
              variant="contained"
              color="primary"
              onClick={handleClickOpen}
            >
              Connectez-vous
      </Button>
            <Button
              href="/Registre"
              style={{ textDecoration: "none", color: "#fff" }}
              variant="contained"
              color="secondary"
            >
              Inscrivez-vous
      </Button>
          </div>
          <div className={classes.appbarTitle}></div>
          <IconButton onClick={() => setOpen(true)}>
            <SortIcon className={classes.icon} />
          </IconButton>
        </Toolbar>
      </AppBar>

      <MUIDrawer open={open} anchor={"right"} onClose={() => setOpen(false)}>
        <div className={classes.drawer} onClick={() => setOpen(false)}>
          <div className={classes.toolbar}>
            <IconButton onClick={() => setOpen(false)}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon style={{ fontSize: 40 }} />
              ) : (
                <ChevronLeftIcon style={{ fontSize: 40 }} />
              )}
            </IconButton>
          </div>
          <Divider />
          <List style={{ width: 300, textDecoration: "none" }}>
            <ListItem button component={Link} href="/Maths">
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText className={classes.Nav} primary="Maths" />
            </ListItem>
            <ListItem button component={Link} href="/Récompenses">
              <ListItemIcon>
                <CardGiftcardIcon />
              </ListItemIcon>
              <ListItemText className={classes.Nav} primary="Récompenses" />
            </ListItem>
            <ListItem button component={Link} href="/Suivi-des-progrès">
              <ListItemIcon>
                <BarChartIcon />
              </ListItemIcon>
              <ListItemText className={classes.Nav} primary="Suivi des progrès" />
            </ListItem>
            <ListItem button component={Link} href="/ParentsZone">
              <ListItemIcon>
                <SupervisorAccountIcon />
              </ListItemIcon>
              <ListItemText className={classes.Nav} primary="Espace parents" />
            </ListItem>
            <ListItem button component={Link} href="/ContactUs">
              <ListItemIcon>
                <ContactMailIcon />
              </ListItemIcon>
              <ListItemText className={classes.Nav} primary="Contactez nous" />
            </ListItem>
            <ListItem button component={Link} href="/Registre">
              <ListItemIcon>
                <AssignmentIndIcon />
              </ListItemIcon>
              <ListItemText className={classes.Nav} primary="S'INSCRIRE" />
            </ListItem>
            <ListItem button component={Link} href="/Formateur">
              <ListItemIcon>
                <PersonAddIcon />
              </ListItemIcon>
              <ListItemText className={classes.Nav} primary="Devenir formateur" />
            </ListItem>
          </List>
        </div>
      </MUIDrawer>

      <div>
        <Dialog
          open={ovrer}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent>
            <Signup />
          </DialogContent>
        </Dialog>
      </div>
    </div>

  );
  /*{!loading && (<Fragment>{isAuthenticated? authLinks : guestLinks}</Fragment>)})*/
  /*{!loading && isAuthenticated? authLinks : guestLinks}*/
  return (
    <nav className={classes.root} id="header">

      {!loading && isAuthenticated ? authLinks : guestLinks}


    </nav>
  );
}
Header.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateProps = state => ({
  auth: state.Auth
});


export default connect(mapStateProps, { logout })(Header)