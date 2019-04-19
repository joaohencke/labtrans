import React from "react";
import { renderRoutes } from "react-router-config";
import { Redirect } from "react-router-dom";
import { Container } from "react-bootstrap";

const Root = ({ route, location, logged }) => {
  if (!logged && location.pathname !== "/login")
    return <Redirect to="/login" />;

  return <Container>{renderRoutes(route.routes)}</Container>;
};

export default Root;
