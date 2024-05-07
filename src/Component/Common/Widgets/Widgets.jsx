import React from "react";
import './Widgets.scss';

function Widgets(props) {
  const { icon, textHeading, value } = props;
  return (
    <div className="widget-common-structure">
      <span>{icon}</span>
      <span className="heading-value-wrapper">
        <span className="text-heading">{textHeading}</span>
        <span className="value-text">{value}</span>
      </span>
    </div>
  );
}

export default Widgets;
