import React from "react";
import Paper from "@mui/material/Paper";
import "./CenteredCardLayout.scss";

export const CenteredCardLayout = ({ children }) => {
  return (
    <div className="centered_card_layout centered_card_layout__container">
      <Paper elevation={3}>{children}</Paper>
    </div>
  );
};
