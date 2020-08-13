import React, {useMemo, useState} from "react";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import NegotiationItem from "../components/NegotiationItem.jsx";
import data from "../data/processedData.js";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingTop: 20,
    paddingBottom: 20,
    position: "relative",
  },
  textField: {
    width: "100%"
  },
  controlContainer: {
    position: 'sticky',
    top: 0,
    backgroundColor: darkTheme.palette.background.paper,
    padding: 5,
    border: `2px solid ${darkTheme.palette.text.disabled}`,
    borderRadius: 5
  },
  contentContainer: {
    padding: 0
  }
});

export default function NegotiationGuide() {
  const [useIcon, setUseIcon] = useState(false);
  const classes = useStyles();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  function createContent() {
    return data.map((dataObject, index) => (
      <div key={index}>
        <NegotiationItem dataObject={dataObject} useIcon={useIcon} />
      </div>
    ));
  }

  function useIconHandler() {
    setUseIcon(!useIcon);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container className={classes.root} maxWidth='lg'>
        <Container className={classes.controlContainer} maxWidth='lg'>
          <TextField
            className={classes.textField}
            variant='filled'
            label='Search questions'
          />
          <FormControlLabel
            control={
              <Switch
                checked={useIcon}
                onChange={useIconHandler}
                name='checkedB'
                color='primary'
              />
            }
            label='Use icon'
          />
        </Container>
        <Container maxWidth='lg' className={classes.contentContainer}>
          <div>{createContent()}</div>
        </Container>
      </Container>
    </ThemeProvider>
  );
}
