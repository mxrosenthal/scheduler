import "./styles.scss";
import React from "react";
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';


import { useVisualMode } from "hooks/useVisualMode";
// import { action } from "@storybook/addon-actions";

export default function Appointment({ id, time, interview, interviewers, bookInterview, cancelInterview }) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

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

    //show saving mode before calling bookInterview.
    transition(SAVING)
    //changing state after the axios call.
    bookInterview(id, interviewSave)
      .then(() => transition(SHOW))
      .catch(err => {
        console.log(err)
        transition(ERROR_SAVE, true)
      })
  }

  function onEdit() {
    console.log(interview)

    transition(EDIT);
  }

  function onDelete() {
    if (mode !== CONFIRM) {
      transition(CONFIRM)
    } else {
      transition(DELETE, true);
      cancelInterview(id)
        .then(() => transition(EMPTY))
        .catch(err => {
          console.log(err)
          transition(ERROR_DELETE, true)
        })

    }
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
          onDelete={onDelete}
          onEdit={onEdit}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onSave={save}
          onDelete={onDelete}
          onCancel={onCancel}
        />
      )}
      {mode === SAVING && (
        <Status message="Saving" />
      )}
      {mode === DELETE && (
        <Status message="Deleteing" />
      )}
      {mode === CONFIRM && (
        <Confirm message="Delete the appointment?" onConfirm={onDelete} onCancel={onCancel} />
      )}
      {mode === EDIT && (
        <Form name={interview.student} interviewers={interviewers} interviewer={interview.interviewer.id} onSave={save} onCancel={onCancel} />
      )}
      {mode === ERROR_SAVE && (
        <Error message="Could not save appointment." onClose={onCancel} />
      )}
      {mode === ERROR_DELETE && (
        <Error message="Could not delete appointment." onClose={onCancel} />
      )}
    </article>
  );
}
