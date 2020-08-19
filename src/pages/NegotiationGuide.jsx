import React, {useMemo, useState, useEffect} from "react";
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
    width: "100%",
  },
  controlContainer: {
    position: "sticky",
    top: 0,
    backgroundColor: darkTheme.palette.background.paper,
    padding: 5,
    border: `2px solid ${darkTheme.palette.text.disabled}`,
    borderRadius: 5,
  },
  contentContainer: {
    padding: 0,
  },
});

const MAX_ITEMS = 20;

export default function NegotiationGuide() {
  const [useIcon, setUseIcon] = useState(false);
  const [top, setTop] = useState(0);
  const [bottom, setBottom] = useState(MAX_ITEMS);
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
    const items = [];
    for (let i = top; i < bottom; ++i) {
      items.push(
        <div key={i}>
          <NegotiationItem dataObject={data[i]} useIcon={useIcon} />
        </div>
      );
    }
    return items;
  }

  function useIconHandler() {
    setUseIcon(!useIcon);
  }

  useEffect(() => {
    const scrollHandler = () => {
      let newTop, newBottom;
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        newBottom = Math.min(bottom + MAX_ITEMS, data.length);
        newTop = Math.min(bottom - MAX_ITEMS, top + MAX_ITEMS);
        setBottom(newBottom);
        setTop(newTop);
      }
      if (window.scrollY <= 0) {
        newTop = Math.max(0, top - MAX_ITEMS);
        newBottom = Math.max(top + MAX_ITEMS, bottom - MAX_ITEMS);
        setTop(newTop);
        setBottom(newBottom);
      }
    };

    window.addEventListener('scroll', scrollHandler);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

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
