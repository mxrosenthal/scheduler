import axios from 'axios';
import { useReducer, useEffect } from 'react';
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";

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

    //updating 'spots' remaining
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

    //updating 'spots' remaining
    let days = [...state.days];
    days = state.days.map(day =>
      day.appointments.includes(id) ? { ...day, spots: day.spots + 1 } : day
    );

    return axios
      .delete(`/api/appointments/${id}`)
      .then(res => {
        dispatch({ type: SET_INTERVIEW, days, appointments })
      })
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

