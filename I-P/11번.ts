function findAllHobbyists(hobby, hobbies) {
  //   const hobbistNames = Object.keys(hobbies);
  const hobbistNames = [];
  for (const hobbistName in hobbies) {
    if (Object.prototype.hasOwnProperty.call(hobbies, hobbistName)) {
      if (hobbies[hobbistName].indexOf(hobby) > -1) {
        hobbistNames.push(hobbistName);
      }
    }
  }
  return hobbistNames;
}

var hobbies = {
  Steve: ['Fashion', 'Piano', 'Reading'],
  Patty: ['Drama', 'Magic', 'Pets'],
  Chad: ['Puzzles', 'Pets', 'Yoga'],
};

console.log(findAllHobbyists('Yoga', hobbies));
