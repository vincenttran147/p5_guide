import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import Card from "../components/Card.jsx";
import { AppContext } from "../contexts/AppContext.js";

const styles = makeStyles(() => ({
  root: {
    width: "100%",
    height: window.innerHeight,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function Home() {
  const [context, setContext] = useContext(AppContext);
  const classes = styles();
  const history = useHistory();

  function cardClickHandler(pageName) {
    return () => {
      history.push(pageName);
    };
  }

  useEffect(() => {
    setContext({
      ...context,
      history,
    });
  }, [history]);

  return (
    <div className={classes.root}>
      <Card onClick={cardClickHandler("negotiation-guide")} />
    </div>
  );
}
