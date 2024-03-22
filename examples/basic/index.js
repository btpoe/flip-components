import React, { useCallback, useState } from 'react';
import { render } from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';

import { Flipper, Flipped } from '../../src/index.js';
import imageSrc from './download.jpg';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: 20,
  },
  media: {
    height: 140,
  },
});

export default function MediaCard() {
  const classes = useStyles();

  return (
    <Flipped as={Card} className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={imageSrc}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Flipped>
  );
}

const useAppStyles = makeStyles((theme) => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const classes = useAppStyles();

  const changeStack = useCallback(() => {
    setSidebarOpen((old) => !old);
  }, []);

  return (
    <Flipper flipKey={sidebarOpen}>
      <div className={`parent ${sidebarOpen && 'open'}`}>
        <Flipped as="header" className="header">
          page nav
        </Flipped>
        <div className="sidebar">
          <Flipped as="nav">
            <Typography>
              <Link href="#">Link</Link>
            </Typography>
            <Typography>
              <Link href="#">Link</Link>
            </Typography>
            <Typography>
              <Link href="#">Link</Link>
            </Typography>
          </Flipped>
        </div>
        <div className="body">
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <MediaCard />
            <MediaCard />
            <MediaCard />
            <MediaCard />
          </div>
        </div>
        <Flipped as="footer" className="footer">
          Some links
        </Flipped>
      </div>
      <Fab className={classes.fab} variant="extended" onClick={changeStack}>
        <NavigationIcon className={classes.extendedIcon} />
        Change Layout
      </Fab>
    </Flipper>
  );
}

render(<App />, document.getElementById('root'));
