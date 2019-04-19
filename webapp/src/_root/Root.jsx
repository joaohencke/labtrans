import React from "react";
import { renderRoutes } from "react-router-config";
import { Redirect } from "react-router-dom";
import { Container } from "react-bootstrap";
import { connect } from 'react-redux';

const Root = ({ route, location, logged }) => {
  if (!logged && location.pathname !== "/login")
    return <Redirect to="/login" />;

  return <Container>{renderRoutes(route.routes)}</Container>;
};

const mapStateToProps = state => ({
  logged: state.auth.logged,
});


export default connect(mapStateToProps)(Root);
