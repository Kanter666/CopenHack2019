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
    width: '45%',
    marginTop: 0,
    overflowX: 'auto',
  },
  table: {},
});

function Row({ preKey, value }) {
  return (
    <TableRow key={preKey}>
      <TableCell component="th" scope="row" style={{ color: '#000' }}>
        {preKey}
      </TableCell>
      <TableCell align="right" style={{ color: '#000' }}>
        {value}
      </TableCell>
    </TableRow>
  );
}

function SoundTable(props) {
  const { classes, rows } = props;
  console.log(rows);
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="right" />
          </TableRow>
        </TableHead>
        <TableBody>
          <Row preKey="Total time:" value="15.32" />
          <Row preKey="Speaking percentage:" value="0.833" />
          <Row preKey="Words per minute:" value="103.7" />
        </TableBody>
      </Table>
    </Paper>
  );
}

SoundTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SoundTable);
