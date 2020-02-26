import React from "react";
import "./DayListItem.scss"
var classNames = require('classnames');



export default function DayListItem(props) {

  const { name, spots, selected, setDay } = props;

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": spots === 0
  });

  const formatSpots = function (spots) {
    switch (spots) {
      case 0:
        return 'no spots remaining';

      case 1:
        return '1 spot remaining';

      default:
        return `${spots} spots remaining`;
    }
  }

  return (
    <li className={dayClass} data-testid={"day"} onClick={() => setDay(name)}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
}