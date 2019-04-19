import React from "react";
import { Alert } from "react-bootstrap";

const EmptyState = ({ msg = "Não existem itens a serem exibidos" }) => (
  <Alert variant="light">{msg}</Alert>
);

export default EmptyState;
