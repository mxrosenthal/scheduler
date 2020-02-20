import "./styles.scss";
import React, { Fragment } from "react";
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import { useVisualMode } from "hooks/useVisualMode";
import { action } from "@storybook/addon-actions";

export default function Appointment({ id, time, interview, interviewers, bookInterview }) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  const onAdd = function () {
    transition(CREATE);
  }

  function save(name, interviewer) {
    const interviewSave = {
      student: name,
      interviewer
    };
    bookInterview(id, interviewSave)
  }

  const onDelete = function () {

  }
  const onCancel = function () {
    back();
  }
  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={onAdd} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onSave={save}
          onCancel={onCancel}
        />
      )}
    </article>
  );
}
