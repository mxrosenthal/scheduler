export default function getAppointmentsForDay(state, day) {
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
