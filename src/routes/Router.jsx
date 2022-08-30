import React from "react";
import { Routes, Route } from "react-router-dom";

import { publicRoutes, privateRoutes } from "./routes";

export const Router = () => {
  return (
    <Routes>
      {publicRoutes.map((route, index) => (
        <Route key={index} {...route} />
      ))}

      {privateRoutes.map((route, index) => (
        <Route key={index} {...route} />
      ))}
    </Routes>
  );
};
