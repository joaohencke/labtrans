import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import toastr from "toastr";
import moment from "moment";

import { put, setPut, modelChange, get } from "../actions/";

import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";

class BookingPut extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: ["Sala 1", "Sala 2", "Sala 3"],
      places: ["LabTrans", "UFSC", "Itacorubi"],
      responsibles: ["Ezequias", "Diego"]
    };

    this.handle = this.handle.bind(this);
    this.submit = this.submit.bind(this);
  }
  async componentWillMount() {
    const { setPut, match, get } = this.props;
    const $isCreation = !match.params.id;

    setPut({ $isCreation });
    if ($isCreation) return;

    try {
      await get(match.params.id);
    } catch (e) {
      toastr.error(e, "Ops..");
    }
  }
  handleDateChange(date, when) {
    const { modelChange } = this.props;

    modelChange({ [when]: date });

    const { begin, end } = this.props.model;
    if (end < begin) {
      toastr.error("A data de fim não pode ser maior que a de início");
      modelChange({
        end: moment(begin)
          .add(15, "minutes")
          .toDate()
      });
    }
  }
  handle(e) {
    if (Object.prototype.toString.call(e) === "[object Date]")
      return this.handleDateChange(...arguments);

    const { modelChange } = this.props;
    const target = e.target;
    const { name, type } = target;

    modelChange({
      [name]: type === "checkbox" ? target.checked : target.value
    });

    if (name === "coffee") modelChange({ people: 0 });
  }
  async submit(e) {
    e.preventDefault();
    const { currentTarget } = e;
    const { $isCreation, setPut, put, model, history } = this.props;

    setPut({ validated: true });
    if (!currentTarget.checkValidity())
      return toastr.error("Verifique o formulário", "Ops...");
    setPut({ submitting: true });
    try {
      await put(model);

      toastr.success(
        `Reserva ${$isCreation ? "criado" : "editado"} com sucesso`
      );

      return history.push("/bookings");
    } catch (e) {
      console.log(e);
      return toastr.error(e.error, "Ops...");
    }
  }
  render() {
    const { model, validated } = this.props;
    const {
      description,
      room,
      place,
      begin,
      end,
      coffee,
      people,
      responsible
    } = model;

    const { rooms, places, responsibles } = this.state;

    return (
      <Container>
        <Card>
          <Card.Body>
            <Form onSubmit={this.submit} validated={validated} noValidate>
              <Form.Group as={Row}>
                <Form.Label column sm="2">
                  Descriçao
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    name="description"
                    onChange={this.handle}
                    value={description}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    digite a descrição
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column sm="2">
                  Local
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    as="select"
                    name="place"
                    onChange={this.handle}
                    value={place}
                    required
                  >
                    <option value="">Selecione o local</option>
                    {places.map(p => (
                      <option value={p} key={`place-${p}`}>
                        {p}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="2">
                  Sala
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    as="select"
                    name="room"
                    onChange={this.handle}
                    value={room}
                    required
                  >
                    <option value="">Selecione a sala</option>
                    {rooms.map(r => (
                      <option value={r} key={`room-${r}`}>
                        {r}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column sm="2">
                  Responsável
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    as="select"
                    name="responsible"
                    onChange={this.handle}
                    value={responsible}
                    required
                  >
                    <option value="">Selecione o responsável</option>
                    {responsibles.map(r => (
                      <option value={r} key={`responsible-${r}`}>
                        {r}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column sm="2">
                  Início
                </Form.Label>
                <Col sm="10">
                  <DatePicker
                    selected={begin}
                    onChange={e => this.handle(e, "begin")}
                    showTimeSelect
                    timeFormat="HH:mm"
                    name="begin"
                    className="form-control"
                    timeIntervals={15}
                    dateFormat="dd/MM/yyyy hh:mm"
                    timeCaption="Hora"
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="2">
                  Fim
                </Form.Label>
                <Col sm="10">
                  <DatePicker
                    selected={end}
                    onChange={e => this.handle(e, "end")}
                    showTimeSelect
                    timeFormat="HH:mm"
                    name="end"
                    className="form-control"
                    timeIntervals={15}
                    dateFormat="dd/MM/yyyy hh:mm"
                    timeCaption="Hora"
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Col>
                  <Form.Check
                    type="checkbox"
                    name="coffee"
                    label="Vai precisar de café?"
                    checked={coffee || people > 0}
                    onChange={this.handle}
                  />
                </Col>
              </Form.Group>
              {(coffee || people > 0) && (
                <Form.Group as={Row}>
                  <Form.Label column sm="2">
                    Número de pessoas
                  </Form.Label>
                  <Col sm="2">
                    <Form.Control
                      type="number"
                      min="1"
                      name="people"
                      value={people}
                      onChange={this.handle}
                    />
                  </Col>
                </Form.Group>
              )}
              <Button type="submit">Enviar</Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  ...state.booking.put,
  fetching: state.booking.fetching
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ put, setPut, modelChange, get }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookingPut);
