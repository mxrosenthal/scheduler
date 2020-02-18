import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "./InterviewerList.scss"

export default function InterviewerList(props) {

  const { interviewers } = props;

  const person = interviewers.map((person, key) => {
    return (
      <InterviewerListItem
        id={person.id}
        name={person.name}
        avatar={person.avatar}
        selected={person.id === props.interviewer}
        setInterviewer={props.setInterviewer}
        key={key}
      />
    )
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{person}</ul>
    </section>
  );
}

