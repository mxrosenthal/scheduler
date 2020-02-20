import axios from 'axios';
import { useState, useEffect } from 'react';

export function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  function bookInterview(id, interview) {
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
  }

  const cancelInterview = function (id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    return axios
      .delete(`./api/appointments/${id}`, { appointment })
      .then(res => {
        setState({
          ...state, appointment
        })
      })
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

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}

