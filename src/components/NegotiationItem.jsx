import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";

import textToIcon from "../util/textToIcon.js";
import { NegotiationGuideContext } from "../contexts/NegotiationGuideContext.js";

const useStyles = makeStyles({
  table: {
    minWidth: 300,
    padding: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  tableCell: {
    position: "relative",
  },
  icon: (props) => ({
    transition: "opacity 0.3s",
    opacity: props.context.useIcon ? 1 : 0,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }),
  text: (props) => ({
    transition: "opacity 0.3s",
    opacity: props.context.useIcon ? 0 : 1,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }),
  answer: {
    width: "20%",
  },
});

export default function NegotiationItem(props) {
  const [context] = useContext(NegotiationGuideContext);
  const classes = useStyles({ context });

  return (
    <TableContainer component={Paper} className={classes.table}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell colSpan={5}>{props.dataObject.question}</TableCell>
          </TableRow>
        </TableHead>
        <TableHead>
          <TableRow>
            <TableCell>Answer</TableCell>
            <TableCell align="center">Upbeat</TableCell>
            <TableCell align="center">Timid</TableCell>
            <TableCell align="center">Irritable</TableCell>
            <TableCell align="center">Gloomy</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.dataObject.answers.map((answer, index) => (
            <TableRow key={index}>
              <TableCell className={classes.answer} component="th" scope="row">
                {answer["answer"]}
              </TableCell>
              <TableCell className={classes.tableCell} align="center">
                <div className={classes.text}>{answer["status"]["upbeat"]}</div>
                <div className={classes.icon}>
                  {textToIcon(answer["status"]["upbeat"])}
                </div>
              </TableCell>
              <TableCell className={classes.tableCell} align="center">
                <div className={classes.text}>{answer["status"]["timid"]}</div>
                <div className={classes.icon}>
                  {textToIcon(answer["status"]["timid"])}
                </div>
              </TableCell>
              <TableCell className={classes.tableCell} align="center">
                <div className={classes.text}>
                  {answer["status"]["irritable"]}
                </div>
                <div className={classes.icon}>
                  {textToIcon(answer["status"]["irritable"])}
                </div>
              </TableCell>
              <TableCell className={classes.tableCell} align="center">
                <div className={classes.text}>{answer["status"]["gloomy"]}</div>
                <div className={classes.icon}>
                  {textToIcon(answer["status"]["gloomy"])}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
