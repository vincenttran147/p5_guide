import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import Card from "../components/Card.jsx";

const styles = makeStyles(() => ({
  root: {
    width: '100%',
    height: '100%',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function Home() {
  const classes = styles();
  const history = useHistory();

  function cardClickHandler(pageName) {
    return () => {
      history.push(pageName);
    };
  }

  return (
    <div className={classes.root}>
      <Card onClick={cardClickHandler("negotiation-guide")} />
    </div>
  );
}
