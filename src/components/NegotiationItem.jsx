import React, {useContext} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";

import textToIcon from '../util/textToIcon.js';
import {NegotiationGuideContext} from '../contexts/NegotiationGuideContext.js';

const useStyles = makeStyles({
  table: {
    minWidth: 300,
    padding: 10,
    marginTop: 20,
    marginBottom: 20
  },
});

export default function NegotiationItem(props) {
  const [context] = useContext(NegotiationGuideContext);
  const classes = useStyles();

  function getStatus(status) {
    return context.useIcon ? textToIcon(status) : status;
  }

  return (
    <TableContainer component={Paper} className={classes.table}>
      <Table size='small' aria-label='a dense table'>
        <TableHead>
          <TableRow>
            <TableCell colSpan={5}>{props.dataObject.question}</TableCell>
          </TableRow>
        </TableHead>
        <TableHead>
          <TableRow>
            <TableCell>Answer</TableCell>
            <TableCell align='right'>Upbeat</TableCell>
            <TableCell align='right'>Timid</TableCell>
            <TableCell align='right'>Irritable</TableCell>
            <TableCell align='right'>Gloomy</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.dataObject.answers.map((answer, index) => (
            <TableRow key={index}>
              <TableCell component='th' scope='row'>
                {answer["answer"]}
              </TableCell>
              <TableCell align='right'>{getStatus(answer['status']["upbeat"])}</TableCell>
              <TableCell align='right'>{getStatus(answer['status']["timid"])}</TableCell>
              <TableCell align='right'>{getStatus(answer['status']["irritable"])}</TableCell>
              <TableCell align='right'>{getStatus(answer['status']["gloomy"])}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
