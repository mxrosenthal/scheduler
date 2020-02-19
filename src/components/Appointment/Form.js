import React, { useState } from 'react';
import Button from '../Button';
import InterviewerList from '../InterviewerList';

export default function Form(props) {

  const { name, interviewers, interviewer, onSave, onCancel } = props;

  const [currentName, setName] = useState(name || '')
  const [currentInterviewer, setInterviewer] = useState(interviewer || null)

  const reset = function () {
    setName('');
    setInterviewer(null);
  }

  const cancel = function () {
    reset();
    onCancel();
  }

  const save = function () {
    reset();
    onSave(currentName, currentInterviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            value={currentName}
            placeholder="Enter Student Name"
            onChange={(event) => setName(event.target.value)}
            onSubmit={event => event.preventDefault()}
          /*
      This must be a controlled component
    */
          />
        </form>
        <InterviewerList interviewers={interviewers} value={currentInterviewer} onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={save}>Save</Button>
        </section>
      </section>
    </main>
  );
}
