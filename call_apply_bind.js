Function.prototype.myCall = function (context = window, ...args) {
  if (this === Function.prototype) {
    return;
  }

  let fn = Symbol();
  context[fn] = this;
  let result = context[fn](...args);
  delete context[fn];
  return result;
};

Function.prototype.myApply = function (context = window, args) {
  if (this === Function.prototype) {
    return;
  }

  let fn = Symbol();
  context[fn] = this;
  let result;
  if (Array.isArray(args)) {
    result = context[fn](...args);
  } else {
    result = context[fn]();
  }
  delete context[fn];
  return result;
};

// var t = "aaa";
// let testMyApply = function (a, b, c) {
//   console.log(this.t);
//   console.log(a, b, c);
// };

// testMyApply.myApply(null, [1, 2, 3]);

Function.prototype.myBind = function (context = window, ...args1) {
  if (this === Function.prototype) {
    return;
  }

  let _this = this;

  return function F(...args2) {
    if (this instanceof F) {
      return new _this(...args1, ...args2);
    }
    return _this.apply(context, args1.concat(args2));
  };
};

// let testMyBind = function (a, b, c) {
//   console.log(a, b, c);
// };

// let fn = testMyBind.myBind(undefined, 1);

// let testMyBind2 = function (a, b, c) {
//   this.a = a;
//   this.b = b;
//   this.c = c;
// };

// let Fn2 = testMyBind2.myBind(undefined, 1);
