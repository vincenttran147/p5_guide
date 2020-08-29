import React, { useMemo, useState } from "react";
import clsx from "clsx";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import MenuIcon from "@material-ui/icons/Menu";

import DarkModeMenuItem from "./components/menuItems/DarkModeMenuItem.jsx";
import AbstractMenuItem from "./components/menuItems/AbstractMenuItem.jsx";
import routes from "./routeConfig.js";

const drawerWidth = 240;

const styles = makeStyles((theme) => ({
  root: {
    width: window.innerWidth,
    height: window.innerHeight,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
}));

export default function Wrapper() {
  const [open, setOpen] = useState(false);
  const classes = styles();
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

  function toggleDrawer() {
    setOpen(!open);
  }

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <List>
            <AbstractMenuItem
              onClick={toggleDrawer}
              text={open ? "Close menu" : "Open menu"}
              icon={<MenuIcon />}
            />
            <DarkModeMenuItem />
          </List>
        </Drawer>
        <CssBaseline />
        <Router>
          <Switch>
            {routes.map((route, i) => (
              <Route
                exact
                key={i}
                path={route.path}
                render={(props) => <route.component {...props} />}
              />
            ))}
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}
