import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import swal from "sweetalert";

import * as actions from "../actions/";
import { List } from "../../../components";

class BookingList extends Component {
  constructor(props) {
    super(props);

    this.headers.bind(this);
    this.remove.bind(this);
  }
  componentWillMount() {
    const { fetch, setFetching } = this.props;

    setFetching(true);
    fetch();
  }
  headers() {
    const Header = (title, key) => ({ title, key });
    return [
      Header("#", "_id"),
      Header("Descrição", "description"),
      Header("Local", "place"),
      Header("Sala", "room"),
      Header("Início", "beginTs"),
      Header("Fim", "endTs")
    ];
  }
  async remove(entry) {
    const sure = await swal({
      title: "Você tem certeza?",
      text: "A exclusão de registro é permanente",
      icon: "warning",
      buttons: true,
      dangerMode: true
    });
    if (!sure) return;

    const { remove } = this.props;
    remove(entry._id);
  }
  render() {
    const { items } = this.props;

    return (
      <Container>
        <Row>
          <Col>BookingList</Col>
        </Row>
        <Row>
          <Col>
            <List
              headers={this.headers()}
              items={items}
              remove={e => this.remove(e)}
              empty="Não existem registros a serem exibidos"
            />
          </Col>
        </Row>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  ...state.booking.list,
  fetching: state.booking.fetching
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookingList);
