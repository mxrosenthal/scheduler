import React from 'react';
import "./InterviewerListItem.scss"
var classNames = require('classnames');


export default function InterviewerListItem(props) {

  const { id, name, avatar, selected, setInterviewer } = props;
  console.log('id: ', id)
  console.log('selected: ', selected)
  const className = classNames("interviewers__item", {
    "interviewers__item--selected": selected,
  })

  return (
    <li className={className}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
        onClick={() => { setInterviewer(id) }}
      />
      {selected && name}
    </li>
  );
}