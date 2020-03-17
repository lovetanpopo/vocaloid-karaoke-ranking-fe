import React from "react";
import { RootState } from "./components/types";
import { hydrate, render } from "react-dom";
import Contents from "./components/modules/Contents";

const renderMethod = module.hot ? render : hydrate;
// @ts-ignore
const preloadedState: RootState = window.__store;

renderMethod(
  <Contents state={preloadedState} />,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept();
}
