import React from "react";
import { Alert } from "react-bootstrap";
import PropTypes from "prop-types";

const EmptyState = ({ msg, ...props }) => (
  <Alert variant="light" {...props}>
    {msg}
  </Alert>
);

EmptyState.defaultProps = {
  msg: "Não existem itens a serem exibidos"
};

EmptyState.propTypes = {
  msg: PropTypes.string
};

export default EmptyState;
