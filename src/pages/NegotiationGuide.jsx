import React, { useMemo, useState, useEffect, useContext } from "react";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Switch from "@material-ui/core/Switch";

import { NegotiationGuideContext } from "../contexts/NegotiationGuideContext.js";
import NegotiationItem from "../components/NegotiationItem.jsx";
import rawData from "../data/processedData.js";

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
    zIndex: 1,
  },
  contentContainer: {
    padding: 0,
  },
  infoContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: 'center'
  },
});

const MAX_ITEMS = 20;

export default function NegotiationGuide() {
  const [context, setContext] = useState({
    useIcon: false,
  });
  const [data, setData] = useState(rawData);
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
    const length = Math.min(data.length, bottom);
    for (let i = top; i < length; ++i) {
      items.push(
        <div key={i}>
          <NegotiationItem dataObject={data[i]} />
        </div>
      );
    }
    return items;
  }

  function useIconHandler() {
    setContext({
      ...context,
      useIcon: !context.useIcon,
    });
  }

  function searchHandler(event) {
    const value = event.target.value.toLowerCase();
    setData(
      rawData.filter((dataObject) =>
        dataObject.question.toLowerCase().includes(value)
      )
    );
    setTop(0);
    setBottom(MAX_ITEMS);
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

    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, [bottom, top]);

  return (
    <NegotiationGuideContext.Provider value={[context, setContext]}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container className={classes.root} maxWidth="lg">
          <Container className={classes.controlContainer} maxWidth="lg">
            <TextField
              className={classes.textField}
              variant="filled"
              label="Search questions"
              onChange={searchHandler}
            />
            <Container className={classes.infoContainer} maxWidth="lg">
              <FormControlLabel
                control={
                  <Switch
                    checked={context.useIcon}
                    onChange={useIconHandler}
                    name="checkedB"
                    color="primary"
                  />
                }
                label="Use icon"
              />
              <FormLabel>Total results: {data.length}</FormLabel>
            </Container>
          </Container>
          <Container maxWidth="lg" className={classes.contentContainer}>
            <div>{createContent()}</div>
          </Container>
        </Container>
      </ThemeProvider>
    </NegotiationGuideContext.Provider>
  );
}
