export function getInterview(state, interview) {
  if (!interview) return null;
  const result = {};
  result.student = interview.student;
  result.interviewer = state.interviewers[interview.interviewer];
  return result;
}

export function getAppointmentsForDay(state, day) {
  //pulling days off state obj and pulling apts off state obj.
  const daysArray = state.days;
  const appointments = state.appointments;
  if (!appointments || appointments.length === 0 || daysArray.length === 0) {
    return [];
  }

  //checks if dayObj has name equal to day. If yes, saves associated appointments
  //array to aptsArray.
  let aptsArray = [];
  for (const dayObj of daysArray) {
    if (dayObj.name === day) {
      aptsArray = dayObj.appointments;
    }
  }

  //Matches appointment ID's to entries in aptsArray.
  //Pushes appointments to the foundAppointments array.
  const foundAppointments = [];
  for (const item of aptsArray) {
    if (appointments[item]) {
      foundAppointments.push(appointments[item]);
    }
  }
  return foundAppointments;
}

export function getInterviewersForDay(state, day) {
  const daysArray = state.days;
  const interviewers = state.interviewers;
  let interviewerArray = [];
  for (const dayObj of daysArray) {
    if (dayObj.name === day) {
      interviewerArray = dayObj.interviewers;
    }
  }

  const foundInterviewers = [];
  for (const item of interviewerArray) {
    if (interviewers[item]) {
      foundInterviewers.push(interviewers[item]);
    }
  }
  return foundInterviewers;
}