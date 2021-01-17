const human = {
  name: 'aaa',
  age: 19,
  nationality: 'KOR',
  favFood: {
    beakfast: 'toast',
    lunch: 'doncas',
    dinner: 'beef',
  },
};

// console.log(...{ human });
console.log('123');

// const { name, age, nationality } = human;
const {
  name,
  age,
  nationality: difName,
  favFood: { dinner, beakfast, lunch: branch },
} = human;

console.log(name, age, difName);
console.log(dinner, beakfast); //human.favFood.dinner, beakfast
console.log(branch);
