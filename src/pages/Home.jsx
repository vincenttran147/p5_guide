import React, {useMemo} from "react";
import {createUseStyles} from "react-jss";
import {useHistory} from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import Card from "../components/Card.jsx";

const styles = createUseStyles({
  root: {
    width: window.innerWidth,
    height: window.innerHeight,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default function Home() {
  const classes = styles();
  const history = useHistory();
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

  function cardClickHandler(pageName) {
    return () => {
      history.push(pageName);
    };
  }

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Card onClick={cardClickHandler("negotiation-guide")} />
      </ThemeProvider>
    </div>
  );
}
