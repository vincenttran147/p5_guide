import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 350,
    maxHeight: 350,
  },
});

export default function Home(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root} onClick={props.onClick}>
      <CardActionArea>
        <CardMedia
          component='img'
          alt='Negotiation guide'
          height='250'
          image='src/images/negotiation-guide.jpg'
          title='Negotiation guide'
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            Negotiation guide
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            Negotiation guide for Persona 5
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
