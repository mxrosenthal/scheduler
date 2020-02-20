import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from './Appointment';
import axios from 'axios';
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from '../helpers/selectors.js';
// import { useVisualMode } from '../hooks/useVisualMode';

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  function bookInterview(id, interview) {
    // console.log(id, interview);
    //STATE object. to apply these, we need to call setState with this new state object.
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    //returns a promise so we can .then from the index and change state there.
    return axios
      .put(`./api/appointments/${id}`, { interview })
      .then(res => {
        setState({
          ...state,
          appointments
        });
      })
      .catch(err => console.log(err))

  }



  const setDay = day => setState({ ...state, day });

  const fetchDays = axios.get('/api/days');
  const fetchAppointments = axios.get('/api/appointments');
  const fetchInterviewers = axios.get('/api/interviewers');
  useEffect(() => {
    Promise.all([
      fetchDays, fetchAppointments, fetchInterviewers
    ]).then((all) => {
      setState(prev => ({ days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
  }, []);
  const appointments = getAppointmentsForDay(state, state.day);
  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    const interviewers = getInterviewersForDay(state, state.day)
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
      />
    );
  });

  // console.log('state.interviewers: ', state.interviewers)
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />      </section>
      <section className="schedule">
        <ul>
          {schedule}
          <Appointment key="last" time="5pm" />
        </ul>
      </section>
    </main>
  );
}
