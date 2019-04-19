import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as actions from "../actions/";

class BookingList extends Component {
  componentWillMount() {
    const { fetch, setFetching } = this.props;

    setFetching(true);
    fetch();
  }
  render() {
    return <div>BookingList</div>;
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
