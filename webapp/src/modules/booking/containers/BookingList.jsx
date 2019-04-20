import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Container, Row, Col, Button } from "react-bootstrap";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import moment from "moment";

import * as actions from "../actions/";
import { List, Breadcrumb } from "../../../components";

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
    const Header = (title, key, format) => ({ title, key, format });
    const formatter = e => moment(e).format("DD/MM HH:mm");
    return [
      Header("#", "_id"),
      Header("Descrição", "description"),
      Header("Local", "place"),
      Header("Sala", "room"),
      Header("Início", "beginTs", formatter),
      Header("Fim", "endTs", formatter)
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
          <Col md="4">
            <Breadcrumb items={[{ text: "Lista de Reservas" }]} />
          </Col>
          <Col md={{ span: 4, offset: 4 }} className="text-right">
            <Link to="/bookings/create">
              <Button type="button">Novo</Button>
            </Link>
          </Col>
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
