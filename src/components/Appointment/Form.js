import React, { useState } from 'react';
import Button from '../Button';
import InterviewerList from '../InterviewerList';

export default function Form(props) {

  const { name, interviewers, interviewer, onSave, onCancel, create } = props;

  const [currentName, setName] = useState(name || '')
  const [currentInterviewer, setInterviewer] = useState(interviewer || null)
  const [error, setError] = useState("");

  const reset = function () {
    setError('');
    setName('');
    setInterviewer(null);
  }

  const cancel = function () {
    setError('');
    reset();
    onCancel();
  }

  const save = function () {
    reset();
    onSave(currentName, currentInterviewer, create);
  }

  function validate() {
    if (currentName === '') {
      setError('Student name cannot be blank');
      return;
    }
    setError('');
    save(currentName, currentInterviewer, create)
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
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList interviewers={interviewers} value={currentInterviewer} onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  );
}
