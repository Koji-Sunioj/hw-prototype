import moment from "moment";

function calendarArray(theMoment) {
  const first = theMoment.clone().startOf("month").startOf("week");
  const last = theMoment.clone().endOf("month").endOf("week");
  const dateDiff = last.diff(first, "days");
  const calendar = [];

  for (let i = 0; i <= dateDiff; i++) {
    const something = first.clone();
    calendar.push(something.add(i, "days").startOf("day"));
  }

  return calendar;
}

export default calendarArray;
