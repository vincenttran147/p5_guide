import React, { useContext } from "react";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import Brightness4Icon from "@material-ui/icons/Brightness4";

import AbstractMenuItem from "./AbstractMenuItem.jsx";
import { AppContext } from "../../contexts/AppContext.js";

export default function DarkModeMenutItem() {
  const [context, setContext] = useContext(AppContext);

  function onClickHandler() {
    setContext({
      ...context,
      darkMode: !context.darkMode
    });
  }

  return (
    <AbstractMenuItem
      onClick={onClickHandler}
      text={context.darkMode ? "Dark mode" : "Light mode"}
      icon={context.darkMode ? <Brightness4Icon /> : <Brightness7Icon />}
    />
  );
}
