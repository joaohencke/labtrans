import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { EmptyState } from "../../../components";

import * as actions from "../actions/";

class BookingList extends Component {
  componentWillMount() {
    const { fetch, setFetching } = this.props;

    setFetching(true);
    fetch();
  }
  render() {
    const { items, total } = this.props;
    console.log(items, total);
    if (!items.length) return <EmptyState />;

    return <div>BookingList</div>;
  }
}
const mapStateToProps = state => {
  console.log(state);

  return ({
    ...state.booking.list,
    fetching: state.booking.fetching
  })
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookingList);
