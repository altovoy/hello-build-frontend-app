import React from "react";
import { Routes, Route } from "react-router-dom";

import { publicRoutes, privateRoutes } from "./routes";
import useLocalStorage from "./../hooks/useLocalStorage";

export const Router = () => {
  const [_user] = useLocalStorage("user");
  return (
    <Routes>
      {publicRoutes.map((route, index) => (
        <Route key={index} {...route} />
      ))}

      {_user &&
        privateRoutes.map((route, index) => <Route key={index} {...route} />)}
    </Routes>
  );
};
