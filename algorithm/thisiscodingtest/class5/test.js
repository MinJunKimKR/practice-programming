dduk = [1, 2, 3, 45, 5, 5, 5];
height = 3;

remainDduk = dduk
  .map((el) => el - height)
  .filter((el) => el > 0)
  .reduce((acc, curr) => acc + curr);

console.log(remainDduk);
