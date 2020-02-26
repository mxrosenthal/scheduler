import axios from 'axios';
import { useReducer, useEffect } from 'react';
const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {

  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.day };
    case SET_APPLICATION_DATA:
      return { ...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers };
    case SET_INTERVIEW: //update? not on edit
      return {
        ...state,
        appointments: action.appointments,
        days: action.days
      };
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

export function useApplicationData() {
  const testState = {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  }
  const [state, dispatch] = useReducer(reducer, testState);


  function bookInterview(id, interview, create) {
    //STATE object. to apply these, we need to call setState with this new state object.
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    let days = [...state.days];
    if (create) {
      days = state.days.map(day =>
        day.appointments.includes(id) ? { ...day, spots: day.spots - 1 } : day
      );
    }
    //returns a promise so we can .then from the index and change state there.
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then(res => {
        dispatch({ type: SET_INTERVIEW, days, appointments })
      })
  }

  const cancelInterview = function (id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    //updating interviews remaining
    let days = [...state.days];

    days = state.days.map(day =>
      day.appointments.includes(id) ? { ...day, spots: day.spots + 1 } : day
    );

    return axios
      .delete(`/api/appointments/${id}`)
      .then(res => {
        // console.log(days)
        // console.log(appointments)
        dispatch({ type: SET_INTERVIEW, days, appointments })
      })
    // .catch(err => console.log('check: ', err))
  }

  const setDay = day => {
    dispatch({ type: SET_DAY, day })
  }

  const fetchDays = axios.get('/api/days');
  const fetchAppointments = axios.get('/api/appointments');
  const fetchInterviewers = axios.get('/api/interviewers');
  useEffect(() => {
    Promise.all([
      fetchDays, fetchAppointments, fetchInterviewers
    ]).then((all) => {
      dispatch({ type: SET_APPLICATION_DATA, days: all[0].data, appointments: all[1].data, interviewers: all[2].data })
    })
      .catch(err => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}

