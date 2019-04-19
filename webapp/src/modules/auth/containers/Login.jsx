import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { Container, Card, Form, Button, Spinner, Alert } from "react-bootstrap";

import * as actions from "../actions/";

class LoginComponent extends Component {
  constructor(props) {
    super(props);

    this.handle = this.handle.bind(this);
    this.submit = this.submit.bind(this);
  }
  handle(e) {
    const { modelChange } = this.props;
    // const { target } = e;
    // console.log(target.name);
    modelChange({ [e.target.name]: e.target.value });
  }
  submit(e) {
    e.preventDefault();

    const { currentTarget } = e;

    if (!currentTarget.checkValidity()) return false;

    const { username, password, login, setSubmitting } = this.props;

    setSubmitting(true);

    login({ username, password });
  }
  render() {
    const { username, password, submitting, error,validated } = this.props;
    return (
      <Container>
        <Card>
          <Card.Body>
            <Form onSubmit={this.submit} validated={validated} noValidate>
              <Form.Group controlId="username">
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="username"
                  onChange={this.handle}
                  value={username}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  digite seu usuário
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="password"
                  value={password}
                  onChange={this.handle}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  digite sua senha
                </Form.Control.Feedback>
              </Form.Group>
              <Button variant="primary" type="submit">
                Entrar &nbsp;
                {submitting && (
                  <Spinner variant="dark" animation="border" size="sm" />
                )}
              </Button>
            </Form>
            {error && (
              <Alert variant="danger" style={{ marginTop: "10px" }}>
                {error}
              </Alert>
            )}
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

const mapStateToProps = state => ({ ...state.auth.login });

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent);
