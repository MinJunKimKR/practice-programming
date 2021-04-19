const days = ['Mon', 'tues', 'wed'];
const otherDays = ['Thu', 'Fri', 'Sat'];

// const allDay = [days, otherDays];
// console.log(allDay);
const allDay = [...days, ...otherDays];
console.log(allDay);

const a = {
  first: 'hi',
};
const b = {
  second: "I'm",
  Third: 'MJ',
};

const c = { ...a, ...b };
console.log(c);
