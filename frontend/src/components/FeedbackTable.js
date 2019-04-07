import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '95%',
    marginLeft: '5%',
    marginTop: 0,
    overflowX: 'auto',
  },
  table: {
    minWidth: 400,
  },
});

function FeedbackTable(props) {
  const { classes, rows } = props;
  console.log(rows);
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell align="right">Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.time}>
              <TableCell component="th" scope="row" style={{ color: '#000' }}>
                {row.time}
              </TableCell>
              <TableCell align="right" style={{ color: '#000' }}>
                {row.description}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

FeedbackTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FeedbackTable);
