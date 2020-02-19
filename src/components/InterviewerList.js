import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "./InterviewerList.scss"

export default function InterviewerList(props) {

  const { interviewers } = props;

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers.map((person, key) => {
        return (
          <InterviewerListItem
            name={person.name}
            avatar={person.avatar}
            selected={person.id === props.value}
            setInterviewer={event => props.onChange(person.id)}
            key={key}
          />
        )
      })}</ul>
    </section>
  );
}

