function debounce(fn, time, flag) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    if (flag && !timer) {
      fn.apply(this, args);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, time);
  };
}

// 时间戳实现，一个time周期内，第一次执行，最后一次不执行
function throttle1(fn, time) {
  let pre = 0;
  return function (...args) {
    if (Date.now() - pre > time) {
      pre = Date.now();
      fn.apply(this, args);
    }
  };
}

// 定时器实现，一个time周期内，第一次不执行，最后一次执行
function throttle2(fn, time) {
  let timer = null;
  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        fn.apply(this, args);
      }, time);
    }
  };
}

function throttle3(fn, time) {
  let pre = 0;
  let timer = null;
  return function (...args) {
    if (Date.now() - pre > time) {
      clearTimeout(timer);
      timer = null;
      pre = Date.now();
      fn.apply(this, args);
    } else if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, time);
    }
  };
}
