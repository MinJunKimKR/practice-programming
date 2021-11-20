console.log("va : ", va);
console.log("le : ", le);
console.log("con : ", con);

var outVa = 1;
let outLe = 2;
const outCon = 3;

function aaa() {
  console.log("aaa va : ", va);
  console.log("aaa le : ", le);
  console.log("aaa con : ", con);

  var va = 1;
  let le = 2;
  const con = 3;
}

aaa();
