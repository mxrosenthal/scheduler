import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {

  const day = props.days.map((day, key) => {
    return (
      <DayListItem
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={props.setDay}
        key={key}
      />
    )
  })
  return <ul>{day}</ul>;
}
