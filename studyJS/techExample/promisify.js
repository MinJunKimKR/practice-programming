const { promisify } = require("util");

const makePromisify = (callback) => {
  return callback(null, "data");
};

const func = promisify(makePromisify);

async function asyncFunc() {
  const data = await func();
  console.log(data);
}
asyncFunc();

function callbackFnc(aaaa, call) {
  return call(
    null,
    ((aaaa) => {
      return aaaa;
    })(aaaa)
  );
}

const asyncCallback = promisify(callbackFnc);

(async (param) => {
  const result = await asyncCallback(param);
  console.log(result);
})(123456798);
