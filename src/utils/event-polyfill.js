'use strict';

(function() {
// Event polyfill
  try {
    new Event('test');
  } catch (e) {
    var Event = function (event, params) {
      var evt;
      params = params || {
          bubbles: false,
          cancelable: false,
          detail: undefined
        };

      evt = document.createEvent('Event');
      evt.initEvent(event, params.bubbles, params.cancelable, params.detail);
      return evt;
    };

    Event.prototype = window.Event.prototype;
    window.Event = Event;
  }

// CustomEvent polyfill
  try {
    new CustomEvent('test');
  } catch (e) {
    var CustomEvent = function (event, params) {
      var evt;
      params = params || {
          bubbles: false,
          cancelable: false,
          detail: undefined
        };

      evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
      return evt;
    };

    CustomEvent.prototype = window.Event.prototype;
    window.CustomEvent = CustomEvent;
  }
})();
