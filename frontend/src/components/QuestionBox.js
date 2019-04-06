import React from 'react';
import { makeStyles } from '@material-ui/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    textAlign: 'center',
    height: 100,
    paddingTop: 10,
    paddingBottom: 10,
  },
}));

export function QuestionBox() {
  const classes = useStyles();
  const [completed, setCompleted] = React.useState(0);
  const [buffer, setBuffer] = React.useState(10);

  function progress() {
    if (completed > 100) {
      setCompleted(0);
      setBuffer(10);
    } else {
      const diff = Math.random() * 10;
      const diff2 = Math.random() * 10;
      setCompleted(completed + diff);
      setBuffer(completed + diff + diff2);
    }
  }

  React.useEffect(() => {
    const timer = setInterval(progress, 500);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Paper className={classes.root}>
      <Typography> Some random question </Typography>
      <br />
      <LinearProgress variant="buffer" value={completed} valueBuffer={buffer} />
    </Paper>
  );
}
