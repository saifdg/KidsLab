import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from "@material-ui/core/Button";
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Axios from 'axios';

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    background: 'rgba(0,0,0,0.5)',
    margin: '20px',
  },
  media: {
    height: "400px",
  },
  title: {
    fontFamily: 'Nunito',
    fontWeight: 'bold',
    fontSize: '2rem',
    color: '#fff',
  },
  desc: {
    fontFamily: 'Nunito',
    fontSize: '1.1rem',
    color: '#ddd',
  },
});

export default function ImageCard(props) {
  const { _id, name, imageUrl, description } = props;
  const [comp, setComp] = useState({ location: [] })
  const classes = useStyles();

  let count = 0;
  comp.location.map(service => { if (service.name) { count = count + 1 } })

  useEffect(() => {
    Axios.get(`/api/competance/${_id}/categorie`).then(res => { setComp({ location: res.data }) })

  }, [])

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={imageUrl}
        title="Contemplative Reptile"
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="h1"
          className={classes.title}
        >
          {name}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          className={classes.desc}
        >
          {description}
        </Typography>
        <div style={{ padding: "15px" }}>
          <Button variant="contained" color="primary" href={'/Categorie/'+_id} style={{textDecoration:'none',color:'#fff'}}>
            voir les {count} compétences
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
