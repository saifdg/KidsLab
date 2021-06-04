import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Collapse } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Link as Scroll } from "react-scroll";

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
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(true);
  }, []);

  return (
    <div className={classes.root} id="title">
      <Collapse
        in={checked}
        {...(checked ? { timeout: 1000 } : {})}
        collapsedHeight={50}
      >
        <div className={classes.container}>
          <h1 className={classes.title} style={{fontWeight:700}}>
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
    </div>
  );
};
