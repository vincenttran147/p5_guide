import React, { useContext }  from "react";
import HomeIcon from "@material-ui/icons/Home";

import AbstractMenuItem from "./AbstractMenuItem.jsx";
import { AppContext } from "../../contexts/AppContext.js";

export default function HomeMenuItem() {
  const [context] = useContext(AppContext);

  function onClickHandler() {
    if (context.history != null) {
      context.history.replace("/");
    }
  }

  return (
    <AbstractMenuItem onClick={onClickHandler} text="Home" icon={<HomeIcon />} />
  );
}
