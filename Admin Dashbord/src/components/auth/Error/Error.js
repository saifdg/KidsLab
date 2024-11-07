import React from "react";
import { Grid, Paper, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import classnames from "classnames";

// styles


// logo


export default function Error() {


  return (
    <Grid container >
      <div >
      
        <Typography variant="h3" color="white" >
          Material Admin
        </Typography>
      </div>
      <Paper>
        <Typography
          variant="h1"
          color="primary"
        
        >
          404
        </Typography>
        <Typography variant="h5" color="primary">
          Oops. Looks like the page you're looking for no longer exists
        </Typography>
        <Typography
          variant="h6"
          color="text"
          colorBrightness="secondary"
          
        >
          But we're here to bring you back to safety
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/"
          size="large"
         
        >
          Back to Home
        </Button>
      </Paper>
    </Grid>
  );
}