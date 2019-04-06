import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
    width: '80%',
    margin: 'auto',
    height: 100,
    marginTop: 20,
    marginBottom: 20,
    paddingTop: 20,
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
  },
}));

export function Title(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Typography
        component="h2"
        variant="display1"
        gutterBottom
        className={makeStyles({ root: { height: 12 } }).root}
        style={{ color: '#fff' }}
      >
        {props.text}
      </Typography>
      <br />
      {props.children}
    </Paper>
  );
}
