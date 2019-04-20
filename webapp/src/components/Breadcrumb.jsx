import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

const Item = ({ route, text, params }) => {
  if (!route) {
    return <span className="breadcrumb-item">{text}</span>;
  }

  return (
    <Link to={{ pathname: route, search: params }} className="breadcrumb-item">
      {text}
      {/* <a >{text}</a> */}
    </Link>
  );
};

Item.propTypes = {
  route: PropTypes.string,
  params: PropTypes.any,
  text: PropTypes.string.isRequired
};

Item.defaultProps = {
  route: undefined,
  params: undefined
};

const Breadcrumb = ({ items }) => {
  return (
    <nav className="breadcrumb bg-white">
      {items.map(item => (
        <Item {...item} key={item.text} />
      ))}
    </nav>
  );
};

Breadcrumb.propTypes = {
  items: PropTypes.array.isRequired
};

export default Breadcrumb;
