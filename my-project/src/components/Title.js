import React, { useEffect, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Collapse } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Link as Scroll } from "react-scroll";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import gif from '../img/sorry.gif'
import {getPosts}from '../action/Posts'
import {
  Grid,
  Paper,
  Link
} from "@material-ui/core";
import { GameContext } from '../auth/gameWrapper/Context/GameProvider';
import Strip from '../auth/registre/Strip/Strip'

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "70vh",
    fontFamily: "Nunito",
  },
  container: {
    textAlign: "center",
  },
  title: {
    color: "#fff",
    fontSize: "6rem",

  },
  goDown: {
    color: "orange",
    fontSize: "5rem",
  },
  colorText: {
    color: "orange",
  },
}));

export const Title = () => {
  const paperStyle = {
    padding: 40,
    width: 400,
    margin: "20px auto",
  };
  const game = useContext(GameContext)

  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(true);
    getPosts()
  }, []);

  return (
    <div className={classes.root} id="title">
      <Collapse
        in={checked}
        {...(checked ? { timeout: 1000 } : {})}
        collapsedHeight={50}
      >
        <div className={classes.container}>
          <h1 className={classes.title} style={{ fontWeight: 700 }}>
            Bienvenue au <br />
            Kids<span className={classes.colorText}>Lab.</span>
          </h1>
          <Scroll to="intro" smooth={true}>
            <IconButton>
              <ExpandMoreIcon className={classes.goDown} />
            </IconButton>
          </Scroll>
        </div>
      </Collapse>
      <Dialog aria-labelledby="simple-dialog-title" open={game.block}>
        <Paper sytle={paperStyle}>
          <Grid align="center" style={{ display: 'block' }}>
            <img src={gif} style={{ width: '80%', height: '80%' }} />
            <Button
              variant='outlined'
              color='primary'
              href='/Registre'
              style={{ marginBottom: '20px' }}
            >Inscrivez-vous</Button>
          </Grid>

        </Paper>
      </Dialog>
      <Dialog aria-labelledby="simple-dialog-title" open={game.resub}>
        <Strip />
      </Dialog>
    </div>
  );
};
