import React from "react";
import { renderRoutes } from "react-router-config";
import { Redirect } from "react-router-dom";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import { authorization } from "../utils/http";

const Root = ({ route, location, logged, credential }) => {
  if (credential)
    authorization(`${credential.token_type} ${credential.access_token}`);

  if (!logged && location.pathname !== "/login")
    return <Redirect to="/login" />;

  console.log(
    "%cEspero que não vejam muitos problemas por aqui =P",
    "color: red; font-weight: bold; font-size: 1rem;"
  );

  return <Container style={{ padding: 20 }}>{renderRoutes(route.routes)}</Container>;
};

const mapStateToProps = state => ({
  logged: state.auth.logged,
  credential: state.auth.credential
});

export default connect(mapStateToProps)(Root);
