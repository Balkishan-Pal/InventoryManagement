import React from "react";

function Widgets(props) {
  const { icon, textHeading, value } = props;
  return (
    <div>
      <span>
        <span>{icon}</span>
        <span>{textHeading}</span>
      </span>
      <span>{value}</span>
    </div>
  );
}

export default Widgets;
