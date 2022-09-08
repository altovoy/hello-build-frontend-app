import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { publicRoutes, privateRoutes } from "./routes";
import useLocalStorage from "./../hooks/useLocalStorage";

export const Router = () => {
  const [_user] = useLocalStorage("user");
  return (
    <Routes>
      {publicRoutes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={!!_user ? <Navigate to="/profile" /> : route.element}
        />
      ))}

      {privateRoutes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={!!_user ? route.element : <Navigate to="/" />}
        />
      ))}
    </Routes>
  );
};
