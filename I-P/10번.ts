function filterNumbersFromArray(arr: any[]): void {
  // Write the code that goes here
  const tempArr = JSON.parse(JSON.stringify(arr));
  arr.splice(0, arr.length);
  tempArr.map((item: any) => {
    if (typeof item === 'number') {
      arr.push(item);
    }
  });
}

// var arr = [1, 'a', 'b', 2];
var arr = [1, , true, 2];
filterNumbersFromArray(arr);
console.log(arr);
