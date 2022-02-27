for (var i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i);
  }, 10);
}

for (var i = 0; i < 5; i++) {
  (function (x) {
    setTimeout(function () {
      console.log(x);
    }, 10);
  })(i);
}

for (let i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i);
  }, 10);
}
