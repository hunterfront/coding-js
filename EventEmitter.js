class MyEventEmitter {
  _events = {};
  constructor() {}

  addListener(event, listener) {
    if (this._events[event]) {
      this._events[event].push(listener);
    } else {
      this._events[event] = [listener];
    }
  }

  removeListener(event, listener) {
    if (!this._events[event]) {
      return;
    }

    if (!listener) {
      delete this._events[event];
    } else {
      this._events[event] = this._events[event].filter((e) => e !== listener);
    }
  }

  emit(event, ...args) {
    if (!this._events[event]) return;

    let listeners = this._events[event];

    listeners.forEach((listener) => {
      listener.apply(this, args);
    });
  }

  once(event, listener) {
    let only = (...args) => {
      listener.apply(this, args);
      this.removeListener(event, only);
    };

    this.addListener(event, only);
  }

  setMaxListeners(max) {
    this._maxListeners = max;
  }
}

let me = new MyEventEmitter();
function a(a, b, c) {
  console.log("listener1", a, b, c);
}
me.once("event1", a);

// me.addListener("event1", function b(a, b, c) {
//   console.log("listener2", a, b, c);
// });

// me.removeListener("event1", a);

me.emit("event1", 1, 2, 3);
me.emit("event1", 1, 2, 3);
me.emit("event1", 1, 2, 3);
