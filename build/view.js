/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/leaflet/dist/leaflet-src.js":
/*!**************************************************!*\
  !*** ./node_modules/leaflet/dist/leaflet-src.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports) {

/* @preserve
 * Leaflet 1.9.4, a JS library for interactive maps. https://leafletjs.com
 * (c) 2010-2023 Vladimir Agafonkin, (c) 2010-2011 CloudMade
 */

(function (global, factory) {
   true ? factory(exports) :
  0;
})(this, (function (exports) { 'use strict';

  var version = "1.9.4";

  /*
   * @namespace Util
   *
   * Various utility functions, used by Leaflet internally.
   */

  // @function extend(dest: Object, src?: Object): Object
  // Merges the properties of the `src` object (or multiple objects) into `dest` object and returns the latter. Has an `L.extend` shortcut.
  function extend(dest) {
  	var i, j, len, src;

  	for (j = 1, len = arguments.length; j < len; j++) {
  		src = arguments[j];
  		for (i in src) {
  			dest[i] = src[i];
  		}
  	}
  	return dest;
  }

  // @function create(proto: Object, properties?: Object): Object
  // Compatibility polyfill for [Object.create](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
  var create$2 = Object.create || (function () {
  	function F() {}
  	return function (proto) {
  		F.prototype = proto;
  		return new F();
  	};
  })();

  // @function bind(fn: Function, …): Function
  // Returns a new function bound to the arguments passed, like [Function.prototype.bind](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
  // Has a `L.bind()` shortcut.
  function bind(fn, obj) {
  	var slice = Array.prototype.slice;

  	if (fn.bind) {
  		return fn.bind.apply(fn, slice.call(arguments, 1));
  	}

  	var args = slice.call(arguments, 2);

  	return function () {
  		return fn.apply(obj, args.length ? args.concat(slice.call(arguments)) : arguments);
  	};
  }

  // @property lastId: Number
  // Last unique ID used by [`stamp()`](#util-stamp)
  var lastId = 0;

  // @function stamp(obj: Object): Number
  // Returns the unique ID of an object, assigning it one if it doesn't have it.
  function stamp(obj) {
  	if (!('_leaflet_id' in obj)) {
  		obj['_leaflet_id'] = ++lastId;
  	}
  	return obj._leaflet_id;
  }

  // @function throttle(fn: Function, time: Number, context: Object): Function
  // Returns a function which executes function `fn` with the given scope `context`
  // (so that the `this` keyword refers to `context` inside `fn`'s code). The function
  // `fn` will be called no more than one time per given amount of `time`. The arguments
  // received by the bound function will be any arguments passed when binding the
  // function, followed by any arguments passed when invoking the bound function.
  // Has an `L.throttle` shortcut.
  function throttle(fn, time, context) {
  	var lock, args, wrapperFn, later;

  	later = function () {
  		// reset lock and call if queued
  		lock = false;
  		if (args) {
  			wrapperFn.apply(context, args);
  			args = false;
  		}
  	};

  	wrapperFn = function () {
  		if (lock) {
  			// called too soon, queue to call later
  			args = arguments;

  		} else {
  			// call and lock until later
  			fn.apply(context, arguments);
  			setTimeout(later, time);
  			lock = true;
  		}
  	};

  	return wrapperFn;
  }

  // @function wrapNum(num: Number, range: Number[], includeMax?: Boolean): Number
  // Returns the number `num` modulo `range` in such a way so it lies within
  // `range[0]` and `range[1]`. The returned value will be always smaller than
  // `range[1]` unless `includeMax` is set to `true`.
  function wrapNum(x, range, includeMax) {
  	var max = range[1],
  	    min = range[0],
  	    d = max - min;
  	return x === max && includeMax ? x : ((x - min) % d + d) % d + min;
  }

  // @function falseFn(): Function
  // Returns a function which always returns `false`.
  function falseFn() { return false; }

  // @function formatNum(num: Number, precision?: Number|false): Number
  // Returns the number `num` rounded with specified `precision`.
  // The default `precision` value is 6 decimal places.
  // `false` can be passed to skip any processing (can be useful to avoid round-off errors).
  function formatNum(num, precision) {
  	if (precision === false) { return num; }
  	var pow = Math.pow(10, precision === undefined ? 6 : precision);
  	return Math.round(num * pow) / pow;
  }

  // @function trim(str: String): String
  // Compatibility polyfill for [String.prototype.trim](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/Trim)
  function trim(str) {
  	return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
  }

  // @function splitWords(str: String): String[]
  // Trims and splits the string on whitespace and returns the array of parts.
  function splitWords(str) {
  	return trim(str).split(/\s+/);
  }

  // @function setOptions(obj: Object, options: Object): Object
  // Merges the given properties to the `options` of the `obj` object, returning the resulting options. See `Class options`. Has an `L.setOptions` shortcut.
  function setOptions(obj, options) {
  	if (!Object.prototype.hasOwnProperty.call(obj, 'options')) {
  		obj.options = obj.options ? create$2(obj.options) : {};
  	}
  	for (var i in options) {
  		obj.options[i] = options[i];
  	}
  	return obj.options;
  }

  // @function getParamString(obj: Object, existingUrl?: String, uppercase?: Boolean): String
  // Converts an object into a parameter URL string, e.g. `{a: "foo", b: "bar"}`
  // translates to `'?a=foo&b=bar'`. If `existingUrl` is set, the parameters will
  // be appended at the end. If `uppercase` is `true`, the parameter names will
  // be uppercased (e.g. `'?A=foo&B=bar'`)
  function getParamString(obj, existingUrl, uppercase) {
  	var params = [];
  	for (var i in obj) {
  		params.push(encodeURIComponent(uppercase ? i.toUpperCase() : i) + '=' + encodeURIComponent(obj[i]));
  	}
  	return ((!existingUrl || existingUrl.indexOf('?') === -1) ? '?' : '&') + params.join('&');
  }

  var templateRe = /\{ *([\w_ -]+) *\}/g;

  // @function template(str: String, data: Object): String
  // Simple templating facility, accepts a template string of the form `'Hello {a}, {b}'`
  // and a data object like `{a: 'foo', b: 'bar'}`, returns evaluated string
  // `('Hello foo, bar')`. You can also specify functions instead of strings for
  // data values — they will be evaluated passing `data` as an argument.
  function template(str, data) {
  	return str.replace(templateRe, function (str, key) {
  		var value = data[key];

  		if (value === undefined) {
  			throw new Error('No value provided for variable ' + str);

  		} else if (typeof value === 'function') {
  			value = value(data);
  		}
  		return value;
  	});
  }

  // @function isArray(obj): Boolean
  // Compatibility polyfill for [Array.isArray](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)
  var isArray = Array.isArray || function (obj) {
  	return (Object.prototype.toString.call(obj) === '[object Array]');
  };

  // @function indexOf(array: Array, el: Object): Number
  // Compatibility polyfill for [Array.prototype.indexOf](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)
  function indexOf(array, el) {
  	for (var i = 0; i < array.length; i++) {
  		if (array[i] === el) { return i; }
  	}
  	return -1;
  }

  // @property emptyImageUrl: String
  // Data URI string containing a base64-encoded empty GIF image.
  // Used as a hack to free memory from unused images on WebKit-powered
  // mobile devices (by setting image `src` to this string).
  var emptyImageUrl = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';

  // inspired by https://paulirish.com/2011/requestanimationframe-for-smart-animating/

  function getPrefixed(name) {
  	return window['webkit' + name] || window['moz' + name] || window['ms' + name];
  }

  var lastTime = 0;

  // fallback for IE 7-8
  function timeoutDefer(fn) {
  	var time = +new Date(),
  	    timeToCall = Math.max(0, 16 - (time - lastTime));

  	lastTime = time + timeToCall;
  	return window.setTimeout(fn, timeToCall);
  }

  var requestFn = window.requestAnimationFrame || getPrefixed('RequestAnimationFrame') || timeoutDefer;
  var cancelFn = window.cancelAnimationFrame || getPrefixed('CancelAnimationFrame') ||
  		getPrefixed('CancelRequestAnimationFrame') || function (id) { window.clearTimeout(id); };

  // @function requestAnimFrame(fn: Function, context?: Object, immediate?: Boolean): Number
  // Schedules `fn` to be executed when the browser repaints. `fn` is bound to
  // `context` if given. When `immediate` is set, `fn` is called immediately if
  // the browser doesn't have native support for
  // [`window.requestAnimationFrame`](https://developer.mozilla.org/docs/Web/API/window/requestAnimationFrame),
  // otherwise it's delayed. Returns a request ID that can be used to cancel the request.
  function requestAnimFrame(fn, context, immediate) {
  	if (immediate && requestFn === timeoutDefer) {
  		fn.call(context);
  	} else {
  		return requestFn.call(window, bind(fn, context));
  	}
  }

  // @function cancelAnimFrame(id: Number): undefined
  // Cancels a previous `requestAnimFrame`. See also [window.cancelAnimationFrame](https://developer.mozilla.org/docs/Web/API/window/cancelAnimationFrame).
  function cancelAnimFrame(id) {
  	if (id) {
  		cancelFn.call(window, id);
  	}
  }

  var Util = {
    __proto__: null,
    extend: extend,
    create: create$2,
    bind: bind,
    get lastId () { return lastId; },
    stamp: stamp,
    throttle: throttle,
    wrapNum: wrapNum,
    falseFn: falseFn,
    formatNum: formatNum,
    trim: trim,
    splitWords: splitWords,
    setOptions: setOptions,
    getParamString: getParamString,
    template: template,
    isArray: isArray,
    indexOf: indexOf,
    emptyImageUrl: emptyImageUrl,
    requestFn: requestFn,
    cancelFn: cancelFn,
    requestAnimFrame: requestAnimFrame,
    cancelAnimFrame: cancelAnimFrame
  };

  // @class Class
  // @aka L.Class

  // @section
  // @uninheritable

  // Thanks to John Resig and Dean Edwards for inspiration!

  function Class() {}

  Class.extend = function (props) {

  	// @function extend(props: Object): Function
  	// [Extends the current class](#class-inheritance) given the properties to be included.
  	// Returns a Javascript function that is a class constructor (to be called with `new`).
  	var NewClass = function () {

  		setOptions(this);

  		// call the constructor
  		if (this.initialize) {
  			this.initialize.apply(this, arguments);
  		}

  		// call all constructor hooks
  		this.callInitHooks();
  	};

  	var parentProto = NewClass.__super__ = this.prototype;

  	var proto = create$2(parentProto);
  	proto.constructor = NewClass;

  	NewClass.prototype = proto;

  	// inherit parent's statics
  	for (var i in this) {
  		if (Object.prototype.hasOwnProperty.call(this, i) && i !== 'prototype' && i !== '__super__') {
  			NewClass[i] = this[i];
  		}
  	}

  	// mix static properties into the class
  	if (props.statics) {
  		extend(NewClass, props.statics);
  	}

  	// mix includes into the prototype
  	if (props.includes) {
  		checkDeprecatedMixinEvents(props.includes);
  		extend.apply(null, [proto].concat(props.includes));
  	}

  	// mix given properties into the prototype
  	extend(proto, props);
  	delete proto.statics;
  	delete proto.includes;

  	// merge options
  	if (proto.options) {
  		proto.options = parentProto.options ? create$2(parentProto.options) : {};
  		extend(proto.options, props.options);
  	}

  	proto._initHooks = [];

  	// add method for calling all hooks
  	proto.callInitHooks = function () {

  		if (this._initHooksCalled) { return; }

  		if (parentProto.callInitHooks) {
  			parentProto.callInitHooks.call(this);
  		}

  		this._initHooksCalled = true;

  		for (var i = 0, len = proto._initHooks.length; i < len; i++) {
  			proto._initHooks[i].call(this);
  		}
  	};

  	return NewClass;
  };


  // @function include(properties: Object): this
  // [Includes a mixin](#class-includes) into the current class.
  Class.include = function (props) {
  	var parentOptions = this.prototype.options;
  	extend(this.prototype, props);
  	if (props.options) {
  		this.prototype.options = parentOptions;
  		this.mergeOptions(props.options);
  	}
  	return this;
  };

  // @function mergeOptions(options: Object): this
  // [Merges `options`](#class-options) into the defaults of the class.
  Class.mergeOptions = function (options) {
  	extend(this.prototype.options, options);
  	return this;
  };

  // @function addInitHook(fn: Function): this
  // Adds a [constructor hook](#class-constructor-hooks) to the class.
  Class.addInitHook = function (fn) { // (Function) || (String, args...)
  	var args = Array.prototype.slice.call(arguments, 1);

  	var init = typeof fn === 'function' ? fn : function () {
  		this[fn].apply(this, args);
  	};

  	this.prototype._initHooks = this.prototype._initHooks || [];
  	this.prototype._initHooks.push(init);
  	return this;
  };

  function checkDeprecatedMixinEvents(includes) {
  	/* global L: true */
  	if (typeof L === 'undefined' || !L || !L.Mixin) { return; }

  	includes = isArray(includes) ? includes : [includes];

  	for (var i = 0; i < includes.length; i++) {
  		if (includes[i] === L.Mixin.Events) {
  			console.warn('Deprecated include of L.Mixin.Events: ' +
  				'this property will be removed in future releases, ' +
  				'please inherit from L.Evented instead.', new Error().stack);
  		}
  	}
  }

  /*
   * @class Evented
   * @aka L.Evented
   * @inherits Class
   *
   * A set of methods shared between event-powered classes (like `Map` and `Marker`). Generally, events allow you to execute some function when something happens with an object (e.g. the user clicks on the map, causing the map to fire `'click'` event).
   *
   * @example
   *
   * ```js
   * map.on('click', function(e) {
   * 	alert(e.latlng);
   * } );
   * ```
   *
   * Leaflet deals with event listeners by reference, so if you want to add a listener and then remove it, define it as a function:
   *
   * ```js
   * function onClick(e) { ... }
   *
   * map.on('click', onClick);
   * map.off('click', onClick);
   * ```
   */

  var Events = {
  	/* @method on(type: String, fn: Function, context?: Object): this
  	 * Adds a listener function (`fn`) to a particular event type of the object. You can optionally specify the context of the listener (object the this keyword will point to). You can also pass several space-separated types (e.g. `'click dblclick'`).
  	 *
  	 * @alternative
  	 * @method on(eventMap: Object): this
  	 * Adds a set of type/listener pairs, e.g. `{click: onClick, mousemove: onMouseMove}`
  	 */
  	on: function (types, fn, context) {

  		// types can be a map of types/handlers
  		if (typeof types === 'object') {
  			for (var type in types) {
  				// we don't process space-separated events here for performance;
  				// it's a hot path since Layer uses the on(obj) syntax
  				this._on(type, types[type], fn);
  			}

  		} else {
  			// types can be a string of space-separated words
  			types = splitWords(types);

  			for (var i = 0, len = types.length; i < len; i++) {
  				this._on(types[i], fn, context);
  			}
  		}

  		return this;
  	},

  	/* @method off(type: String, fn?: Function, context?: Object): this
  	 * Removes a previously added listener function. If no function is specified, it will remove all the listeners of that particular event from the object. Note that if you passed a custom context to `on`, you must pass the same context to `off` in order to remove the listener.
  	 *
  	 * @alternative
  	 * @method off(eventMap: Object): this
  	 * Removes a set of type/listener pairs.
  	 *
  	 * @alternative
  	 * @method off: this
  	 * Removes all listeners to all events on the object. This includes implicitly attached events.
  	 */
  	off: function (types, fn, context) {

  		if (!arguments.length) {
  			// clear all listeners if called without arguments
  			delete this._events;

  		} else if (typeof types === 'object') {
  			for (var type in types) {
  				this._off(type, types[type], fn);
  			}

  		} else {
  			types = splitWords(types);

  			var removeAll = arguments.length === 1;
  			for (var i = 0, len = types.length; i < len; i++) {
  				if (removeAll) {
  					this._off(types[i]);
  				} else {
  					this._off(types[i], fn, context);
  				}
  			}
  		}

  		return this;
  	},

  	// attach listener (without syntactic sugar now)
  	_on: function (type, fn, context, _once) {
  		if (typeof fn !== 'function') {
  			console.warn('wrong listener type: ' + typeof fn);
  			return;
  		}

  		// check if fn already there
  		if (this._listens(type, fn, context) !== false) {
  			return;
  		}

  		if (context === this) {
  			// Less memory footprint.
  			context = undefined;
  		}

  		var newListener = {fn: fn, ctx: context};
  		if (_once) {
  			newListener.once = true;
  		}

  		this._events = this._events || {};
  		this._events[type] = this._events[type] || [];
  		this._events[type].push(newListener);
  	},

  	_off: function (type, fn, context) {
  		var listeners,
  		    i,
  		    len;

  		if (!this._events) {
  			return;
  		}

  		listeners = this._events[type];
  		if (!listeners) {
  			return;
  		}

  		if (arguments.length === 1) { // remove all
  			if (this._firingCount) {
  				// Set all removed listeners to noop
  				// so they are not called if remove happens in fire
  				for (i = 0, len = listeners.length; i < len; i++) {
  					listeners[i].fn = falseFn;
  				}
  			}
  			// clear all listeners for a type if function isn't specified
  			delete this._events[type];
  			return;
  		}

  		if (typeof fn !== 'function') {
  			console.warn('wrong listener type: ' + typeof fn);
  			return;
  		}

  		// find fn and remove it
  		var index = this._listens(type, fn, context);
  		if (index !== false) {
  			var listener = listeners[index];
  			if (this._firingCount) {
  				// set the removed listener to noop so that's not called if remove happens in fire
  				listener.fn = falseFn;

  				/* copy array in case events are being fired */
  				this._events[type] = listeners = listeners.slice();
  			}
  			listeners.splice(index, 1);
  		}
  	},

  	// @method fire(type: String, data?: Object, propagate?: Boolean): this
  	// Fires an event of the specified type. You can optionally provide a data
  	// object — the first argument of the listener function will contain its
  	// properties. The event can optionally be propagated to event parents.
  	fire: function (type, data, propagate) {
  		if (!this.listens(type, propagate)) { return this; }

  		var event = extend({}, data, {
  			type: type,
  			target: this,
  			sourceTarget: data && data.sourceTarget || this
  		});

  		if (this._events) {
  			var listeners = this._events[type];
  			if (listeners) {
  				this._firingCount = (this._firingCount + 1) || 1;
  				for (var i = 0, len = listeners.length; i < len; i++) {
  					var l = listeners[i];
  					// off overwrites l.fn, so we need to copy fn to a var
  					var fn = l.fn;
  					if (l.once) {
  						this.off(type, fn, l.ctx);
  					}
  					fn.call(l.ctx || this, event);
  				}

  				this._firingCount--;
  			}
  		}

  		if (propagate) {
  			// propagate the event to parents (set with addEventParent)
  			this._propagateEvent(event);
  		}

  		return this;
  	},

  	// @method listens(type: String, propagate?: Boolean): Boolean
  	// @method listens(type: String, fn: Function, context?: Object, propagate?: Boolean): Boolean
  	// Returns `true` if a particular event type has any listeners attached to it.
  	// The verification can optionally be propagated, it will return `true` if parents have the listener attached to it.
  	listens: function (type, fn, context, propagate) {
  		if (typeof type !== 'string') {
  			console.warn('"string" type argument expected');
  		}

  		// we don't overwrite the input `fn` value, because we need to use it for propagation
  		var _fn = fn;
  		if (typeof fn !== 'function') {
  			propagate = !!fn;
  			_fn = undefined;
  			context = undefined;
  		}

  		var listeners = this._events && this._events[type];
  		if (listeners && listeners.length) {
  			if (this._listens(type, _fn, context) !== false) {
  				return true;
  			}
  		}

  		if (propagate) {
  			// also check parents for listeners if event propagates
  			for (var id in this._eventParents) {
  				if (this._eventParents[id].listens(type, fn, context, propagate)) { return true; }
  			}
  		}
  		return false;
  	},

  	// returns the index (number) or false
  	_listens: function (type, fn, context) {
  		if (!this._events) {
  			return false;
  		}

  		var listeners = this._events[type] || [];
  		if (!fn) {
  			return !!listeners.length;
  		}

  		if (context === this) {
  			// Less memory footprint.
  			context = undefined;
  		}

  		for (var i = 0, len = listeners.length; i < len; i++) {
  			if (listeners[i].fn === fn && listeners[i].ctx === context) {
  				return i;
  			}
  		}
  		return false;

  	},

  	// @method once(…): this
  	// Behaves as [`on(…)`](#evented-on), except the listener will only get fired once and then removed.
  	once: function (types, fn, context) {

  		// types can be a map of types/handlers
  		if (typeof types === 'object') {
  			for (var type in types) {
  				// we don't process space-separated events here for performance;
  				// it's a hot path since Layer uses the on(obj) syntax
  				this._on(type, types[type], fn, true);
  			}

  		} else {
  			// types can be a string of space-separated words
  			types = splitWords(types);

  			for (var i = 0, len = types.length; i < len; i++) {
  				this._on(types[i], fn, context, true);
  			}
  		}

  		return this;
  	},

  	// @method addEventParent(obj: Evented): this
  	// Adds an event parent - an `Evented` that will receive propagated events
  	addEventParent: function (obj) {
  		this._eventParents = this._eventParents || {};
  		this._eventParents[stamp(obj)] = obj;
  		return this;
  	},

  	// @method removeEventParent(obj: Evented): this
  	// Removes an event parent, so it will stop receiving propagated events
  	removeEventParent: function (obj) {
  		if (this._eventParents) {
  			delete this._eventParents[stamp(obj)];
  		}
  		return this;
  	},

  	_propagateEvent: function (e) {
  		for (var id in this._eventParents) {
  			this._eventParents[id].fire(e.type, extend({
  				layer: e.target,
  				propagatedFrom: e.target
  			}, e), true);
  		}
  	}
  };

  // aliases; we should ditch those eventually

  // @method addEventListener(…): this
  // Alias to [`on(…)`](#evented-on)
  Events.addEventListener = Events.on;

  // @method removeEventListener(…): this
  // Alias to [`off(…)`](#evented-off)

  // @method clearAllEventListeners(…): this
  // Alias to [`off()`](#evented-off)
  Events.removeEventListener = Events.clearAllEventListeners = Events.off;

  // @method addOneTimeEventListener(…): this
  // Alias to [`once(…)`](#evented-once)
  Events.addOneTimeEventListener = Events.once;

  // @method fireEvent(…): this
  // Alias to [`fire(…)`](#evented-fire)
  Events.fireEvent = Events.fire;

  // @method hasEventListeners(…): Boolean
  // Alias to [`listens(…)`](#evented-listens)
  Events.hasEventListeners = Events.listens;

  var Evented = Class.extend(Events);

  /*
   * @class Point
   * @aka L.Point
   *
   * Represents a point with `x` and `y` coordinates in pixels.
   *
   * @example
   *
   * ```js
   * var point = L.point(200, 300);
   * ```
   *
   * All Leaflet methods and options that accept `Point` objects also accept them in a simple Array form (unless noted otherwise), so these lines are equivalent:
   *
   * ```js
   * map.panBy([200, 300]);
   * map.panBy(L.point(200, 300));
   * ```
   *
   * Note that `Point` does not inherit from Leaflet's `Class` object,
   * which means new classes can't inherit from it, and new methods
   * can't be added to it with the `include` function.
   */

  function Point(x, y, round) {
  	// @property x: Number; The `x` coordinate of the point
  	this.x = (round ? Math.round(x) : x);
  	// @property y: Number; The `y` coordinate of the point
  	this.y = (round ? Math.round(y) : y);
  }

  var trunc = Math.trunc || function (v) {
  	return v > 0 ? Math.floor(v) : Math.ceil(v);
  };

  Point.prototype = {

  	// @method clone(): Point
  	// Returns a copy of the current point.
  	clone: function () {
  		return new Point(this.x, this.y);
  	},

  	// @method add(otherPoint: Point): Point
  	// Returns the result of addition of the current and the given points.
  	add: function (point) {
  		// non-destructive, returns a new point
  		return this.clone()._add(toPoint(point));
  	},

  	_add: function (point) {
  		// destructive, used directly for performance in situations where it's safe to modify existing point
  		this.x += point.x;
  		this.y += point.y;
  		return this;
  	},

  	// @method subtract(otherPoint: Point): Point
  	// Returns the result of subtraction of the given point from the current.
  	subtract: function (point) {
  		return this.clone()._subtract(toPoint(point));
  	},

  	_subtract: function (point) {
  		this.x -= point.x;
  		this.y -= point.y;
  		return this;
  	},

  	// @method divideBy(num: Number): Point
  	// Returns the result of division of the current point by the given number.
  	divideBy: function (num) {
  		return this.clone()._divideBy(num);
  	},

  	_divideBy: function (num) {
  		this.x /= num;
  		this.y /= num;
  		return this;
  	},

  	// @method multiplyBy(num: Number): Point
  	// Returns the result of multiplication of the current point by the given number.
  	multiplyBy: function (num) {
  		return this.clone()._multiplyBy(num);
  	},

  	_multiplyBy: function (num) {
  		this.x *= num;
  		this.y *= num;
  		return this;
  	},

  	// @method scaleBy(scale: Point): Point
  	// Multiply each coordinate of the current point by each coordinate of
  	// `scale`. In linear algebra terms, multiply the point by the
  	// [scaling matrix](https://en.wikipedia.org/wiki/Scaling_%28geometry%29#Matrix_representation)
  	// defined by `scale`.
  	scaleBy: function (point) {
  		return new Point(this.x * point.x, this.y * point.y);
  	},

  	// @method unscaleBy(scale: Point): Point
  	// Inverse of `scaleBy`. Divide each coordinate of the current point by
  	// each coordinate of `scale`.
  	unscaleBy: function (point) {
  		return new Point(this.x / point.x, this.y / point.y);
  	},

  	// @method round(): Point
  	// Returns a copy of the current point with rounded coordinates.
  	round: function () {
  		return this.clone()._round();
  	},

  	_round: function () {
  		this.x = Math.round(this.x);
  		this.y = Math.round(this.y);
  		return this;
  	},

  	// @method floor(): Point
  	// Returns a copy of the current point with floored coordinates (rounded down).
  	floor: function () {
  		return this.clone()._floor();
  	},

  	_floor: function () {
  		this.x = Math.floor(this.x);
  		this.y = Math.floor(this.y);
  		return this;
  	},

  	// @method ceil(): Point
  	// Returns a copy of the current point with ceiled coordinates (rounded up).
  	ceil: function () {
  		return this.clone()._ceil();
  	},

  	_ceil: function () {
  		this.x = Math.ceil(this.x);
  		this.y = Math.ceil(this.y);
  		return this;
  	},

  	// @method trunc(): Point
  	// Returns a copy of the current point with truncated coordinates (rounded towards zero).
  	trunc: function () {
  		return this.clone()._trunc();
  	},

  	_trunc: function () {
  		this.x = trunc(this.x);
  		this.y = trunc(this.y);
  		return this;
  	},

  	// @method distanceTo(otherPoint: Point): Number
  	// Returns the cartesian distance between the current and the given points.
  	distanceTo: function (point) {
  		point = toPoint(point);

  		var x = point.x - this.x,
  		    y = point.y - this.y;

  		return Math.sqrt(x * x + y * y);
  	},

  	// @method equals(otherPoint: Point): Boolean
  	// Returns `true` if the given point has the same coordinates.
  	equals: function (point) {
  		point = toPoint(point);

  		return point.x === this.x &&
  		       point.y === this.y;
  	},

  	// @method contains(otherPoint: Point): Boolean
  	// Returns `true` if both coordinates of the given point are less than the corresponding current point coordinates (in absolute values).
  	contains: function (point) {
  		point = toPoint(point);

  		return Math.abs(point.x) <= Math.abs(this.x) &&
  		       Math.abs(point.y) <= Math.abs(this.y);
  	},

  	// @method toString(): String
  	// Returns a string representation of the point for debugging purposes.
  	toString: function () {
  		return 'Point(' +
  		        formatNum(this.x) + ', ' +
  		        formatNum(this.y) + ')';
  	}
  };

  // @factory L.point(x: Number, y: Number, round?: Boolean)
  // Creates a Point object with the given `x` and `y` coordinates. If optional `round` is set to true, rounds the `x` and `y` values.

  // @alternative
  // @factory L.point(coords: Number[])
  // Expects an array of the form `[x, y]` instead.

  // @alternative
  // @factory L.point(coords: Object)
  // Expects a plain object of the form `{x: Number, y: Number}` instead.
  function toPoint(x, y, round) {
  	if (x instanceof Point) {
  		return x;
  	}
  	if (isArray(x)) {
  		return new Point(x[0], x[1]);
  	}
  	if (x === undefined || x === null) {
  		return x;
  	}
  	if (typeof x === 'object' && 'x' in x && 'y' in x) {
  		return new Point(x.x, x.y);
  	}
  	return new Point(x, y, round);
  }

  /*
   * @class Bounds
   * @aka L.Bounds
   *
   * Represents a rectangular area in pixel coordinates.
   *
   * @example
   *
   * ```js
   * var p1 = L.point(10, 10),
   * p2 = L.point(40, 60),
   * bounds = L.bounds(p1, p2);
   * ```
   *
   * All Leaflet methods that accept `Bounds` objects also accept them in a simple Array form (unless noted otherwise), so the bounds example above can be passed like this:
   *
   * ```js
   * otherBounds.intersects([[10, 10], [40, 60]]);
   * ```
   *
   * Note that `Bounds` does not inherit from Leaflet's `Class` object,
   * which means new classes can't inherit from it, and new methods
   * can't be added to it with the `include` function.
   */

  function Bounds(a, b) {
  	if (!a) { return; }

  	var points = b ? [a, b] : a;

  	for (var i = 0, len = points.length; i < len; i++) {
  		this.extend(points[i]);
  	}
  }

  Bounds.prototype = {
  	// @method extend(point: Point): this
  	// Extends the bounds to contain the given point.

  	// @alternative
  	// @method extend(otherBounds: Bounds): this
  	// Extend the bounds to contain the given bounds
  	extend: function (obj) {
  		var min2, max2;
  		if (!obj) { return this; }

  		if (obj instanceof Point || typeof obj[0] === 'number' || 'x' in obj) {
  			min2 = max2 = toPoint(obj);
  		} else {
  			obj = toBounds(obj);
  			min2 = obj.min;
  			max2 = obj.max;

  			if (!min2 || !max2) { return this; }
  		}

  		// @property min: Point
  		// The top left corner of the rectangle.
  		// @property max: Point
  		// The bottom right corner of the rectangle.
  		if (!this.min && !this.max) {
  			this.min = min2.clone();
  			this.max = max2.clone();
  		} else {
  			this.min.x = Math.min(min2.x, this.min.x);
  			this.max.x = Math.max(max2.x, this.max.x);
  			this.min.y = Math.min(min2.y, this.min.y);
  			this.max.y = Math.max(max2.y, this.max.y);
  		}
  		return this;
  	},

  	// @method getCenter(round?: Boolean): Point
  	// Returns the center point of the bounds.
  	getCenter: function (round) {
  		return toPoint(
  		        (this.min.x + this.max.x) / 2,
  		        (this.min.y + this.max.y) / 2, round);
  	},

  	// @method getBottomLeft(): Point
  	// Returns the bottom-left point of the bounds.
  	getBottomLeft: function () {
  		return toPoint(this.min.x, this.max.y);
  	},

  	// @method getTopRight(): Point
  	// Returns the top-right point of the bounds.
  	getTopRight: function () { // -> Point
  		return toPoint(this.max.x, this.min.y);
  	},

  	// @method getTopLeft(): Point
  	// Returns the top-left point of the bounds (i.e. [`this.min`](#bounds-min)).
  	getTopLeft: function () {
  		return this.min; // left, top
  	},

  	// @method getBottomRight(): Point
  	// Returns the bottom-right point of the bounds (i.e. [`this.max`](#bounds-max)).
  	getBottomRight: function () {
  		return this.max; // right, bottom
  	},

  	// @method getSize(): Point
  	// Returns the size of the given bounds
  	getSize: function () {
  		return this.max.subtract(this.min);
  	},

  	// @method contains(otherBounds: Bounds): Boolean
  	// Returns `true` if the rectangle contains the given one.
  	// @alternative
  	// @method contains(point: Point): Boolean
  	// Returns `true` if the rectangle contains the given point.
  	contains: function (obj) {
  		var min, max;

  		if (typeof obj[0] === 'number' || obj instanceof Point) {
  			obj = toPoint(obj);
  		} else {
  			obj = toBounds(obj);
  		}

  		if (obj instanceof Bounds) {
  			min = obj.min;
  			max = obj.max;
  		} else {
  			min = max = obj;
  		}

  		return (min.x >= this.min.x) &&
  		       (max.x <= this.max.x) &&
  		       (min.y >= this.min.y) &&
  		       (max.y <= this.max.y);
  	},

  	// @method intersects(otherBounds: Bounds): Boolean
  	// Returns `true` if the rectangle intersects the given bounds. Two bounds
  	// intersect if they have at least one point in common.
  	intersects: function (bounds) { // (Bounds) -> Boolean
  		bounds = toBounds(bounds);

  		var min = this.min,
  		    max = this.max,
  		    min2 = bounds.min,
  		    max2 = bounds.max,
  		    xIntersects = (max2.x >= min.x) && (min2.x <= max.x),
  		    yIntersects = (max2.y >= min.y) && (min2.y <= max.y);

  		return xIntersects && yIntersects;
  	},

  	// @method overlaps(otherBounds: Bounds): Boolean
  	// Returns `true` if the rectangle overlaps the given bounds. Two bounds
  	// overlap if their intersection is an area.
  	overlaps: function (bounds) { // (Bounds) -> Boolean
  		bounds = toBounds(bounds);

  		var min = this.min,
  		    max = this.max,
  		    min2 = bounds.min,
  		    max2 = bounds.max,
  		    xOverlaps = (max2.x > min.x) && (min2.x < max.x),
  		    yOverlaps = (max2.y > min.y) && (min2.y < max.y);

  		return xOverlaps && yOverlaps;
  	},

  	// @method isValid(): Boolean
  	// Returns `true` if the bounds are properly initialized.
  	isValid: function () {
  		return !!(this.min && this.max);
  	},


  	// @method pad(bufferRatio: Number): Bounds
  	// Returns bounds created by extending or retracting the current bounds by a given ratio in each direction.
  	// For example, a ratio of 0.5 extends the bounds by 50% in each direction.
  	// Negative values will retract the bounds.
  	pad: function (bufferRatio) {
  		var min = this.min,
  		max = this.max,
  		heightBuffer = Math.abs(min.x - max.x) * bufferRatio,
  		widthBuffer = Math.abs(min.y - max.y) * bufferRatio;


  		return toBounds(
  			toPoint(min.x - heightBuffer, min.y - widthBuffer),
  			toPoint(max.x + heightBuffer, max.y + widthBuffer));
  	},


  	// @method equals(otherBounds: Bounds): Boolean
  	// Returns `true` if the rectangle is equivalent to the given bounds.
  	equals: function (bounds) {
  		if (!bounds) { return false; }

  		bounds = toBounds(bounds);

  		return this.min.equals(bounds.getTopLeft()) &&
  			this.max.equals(bounds.getBottomRight());
  	},
  };


  // @factory L.bounds(corner1: Point, corner2: Point)
  // Creates a Bounds object from two corners coordinate pairs.
  // @alternative
  // @factory L.bounds(points: Point[])
  // Creates a Bounds object from the given array of points.
  function toBounds(a, b) {
  	if (!a || a instanceof Bounds) {
  		return a;
  	}
  	return new Bounds(a, b);
  }

  /*
   * @class LatLngBounds
   * @aka L.LatLngBounds
   *
   * Represents a rectangular geographical area on a map.
   *
   * @example
   *
   * ```js
   * var corner1 = L.latLng(40.712, -74.227),
   * corner2 = L.latLng(40.774, -74.125),
   * bounds = L.latLngBounds(corner1, corner2);
   * ```
   *
   * All Leaflet methods that accept LatLngBounds objects also accept them in a simple Array form (unless noted otherwise), so the bounds example above can be passed like this:
   *
   * ```js
   * map.fitBounds([
   * 	[40.712, -74.227],
   * 	[40.774, -74.125]
   * ]);
   * ```
   *
   * Caution: if the area crosses the antimeridian (often confused with the International Date Line), you must specify corners _outside_ the [-180, 180] degrees longitude range.
   *
   * Note that `LatLngBounds` does not inherit from Leaflet's `Class` object,
   * which means new classes can't inherit from it, and new methods
   * can't be added to it with the `include` function.
   */

  function LatLngBounds(corner1, corner2) { // (LatLng, LatLng) or (LatLng[])
  	if (!corner1) { return; }

  	var latlngs = corner2 ? [corner1, corner2] : corner1;

  	for (var i = 0, len = latlngs.length; i < len; i++) {
  		this.extend(latlngs[i]);
  	}
  }

  LatLngBounds.prototype = {

  	// @method extend(latlng: LatLng): this
  	// Extend the bounds to contain the given point

  	// @alternative
  	// @method extend(otherBounds: LatLngBounds): this
  	// Extend the bounds to contain the given bounds
  	extend: function (obj) {
  		var sw = this._southWest,
  		    ne = this._northEast,
  		    sw2, ne2;

  		if (obj instanceof LatLng) {
  			sw2 = obj;
  			ne2 = obj;

  		} else if (obj instanceof LatLngBounds) {
  			sw2 = obj._southWest;
  			ne2 = obj._northEast;

  			if (!sw2 || !ne2) { return this; }

  		} else {
  			return obj ? this.extend(toLatLng(obj) || toLatLngBounds(obj)) : this;
  		}

  		if (!sw && !ne) {
  			this._southWest = new LatLng(sw2.lat, sw2.lng);
  			this._northEast = new LatLng(ne2.lat, ne2.lng);
  		} else {
  			sw.lat = Math.min(sw2.lat, sw.lat);
  			sw.lng = Math.min(sw2.lng, sw.lng);
  			ne.lat = Math.max(ne2.lat, ne.lat);
  			ne.lng = Math.max(ne2.lng, ne.lng);
  		}

  		return this;
  	},

  	// @method pad(bufferRatio: Number): LatLngBounds
  	// Returns bounds created by extending or retracting the current bounds by a given ratio in each direction.
  	// For example, a ratio of 0.5 extends the bounds by 50% in each direction.
  	// Negative values will retract the bounds.
  	pad: function (bufferRatio) {
  		var sw = this._southWest,
  		    ne = this._northEast,
  		    heightBuffer = Math.abs(sw.lat - ne.lat) * bufferRatio,
  		    widthBuffer = Math.abs(sw.lng - ne.lng) * bufferRatio;

  		return new LatLngBounds(
  		        new LatLng(sw.lat - heightBuffer, sw.lng - widthBuffer),
  		        new LatLng(ne.lat + heightBuffer, ne.lng + widthBuffer));
  	},

  	// @method getCenter(): LatLng
  	// Returns the center point of the bounds.
  	getCenter: function () {
  		return new LatLng(
  		        (this._southWest.lat + this._northEast.lat) / 2,
  		        (this._southWest.lng + this._northEast.lng) / 2);
  	},

  	// @method getSouthWest(): LatLng
  	// Returns the south-west point of the bounds.
  	getSouthWest: function () {
  		return this._southWest;
  	},

  	// @method getNorthEast(): LatLng
  	// Returns the north-east point of the bounds.
  	getNorthEast: function () {
  		return this._northEast;
  	},

  	// @method getNorthWest(): LatLng
  	// Returns the north-west point of the bounds.
  	getNorthWest: function () {
  		return new LatLng(this.getNorth(), this.getWest());
  	},

  	// @method getSouthEast(): LatLng
  	// Returns the south-east point of the bounds.
  	getSouthEast: function () {
  		return new LatLng(this.getSouth(), this.getEast());
  	},

  	// @method getWest(): Number
  	// Returns the west longitude of the bounds
  	getWest: function () {
  		return this._southWest.lng;
  	},

  	// @method getSouth(): Number
  	// Returns the south latitude of the bounds
  	getSouth: function () {
  		return this._southWest.lat;
  	},

  	// @method getEast(): Number
  	// Returns the east longitude of the bounds
  	getEast: function () {
  		return this._northEast.lng;
  	},

  	// @method getNorth(): Number
  	// Returns the north latitude of the bounds
  	getNorth: function () {
  		return this._northEast.lat;
  	},

  	// @method contains(otherBounds: LatLngBounds): Boolean
  	// Returns `true` if the rectangle contains the given one.

  	// @alternative
  	// @method contains (latlng: LatLng): Boolean
  	// Returns `true` if the rectangle contains the given point.
  	contains: function (obj) { // (LatLngBounds) or (LatLng) -> Boolean
  		if (typeof obj[0] === 'number' || obj instanceof LatLng || 'lat' in obj) {
  			obj = toLatLng(obj);
  		} else {
  			obj = toLatLngBounds(obj);
  		}

  		var sw = this._southWest,
  		    ne = this._northEast,
  		    sw2, ne2;

  		if (obj instanceof LatLngBounds) {
  			sw2 = obj.getSouthWest();
  			ne2 = obj.getNorthEast();
  		} else {
  			sw2 = ne2 = obj;
  		}

  		return (sw2.lat >= sw.lat) && (ne2.lat <= ne.lat) &&
  		       (sw2.lng >= sw.lng) && (ne2.lng <= ne.lng);
  	},

  	// @method intersects(otherBounds: LatLngBounds): Boolean
  	// Returns `true` if the rectangle intersects the given bounds. Two bounds intersect if they have at least one point in common.
  	intersects: function (bounds) {
  		bounds = toLatLngBounds(bounds);

  		var sw = this._southWest,
  		    ne = this._northEast,
  		    sw2 = bounds.getSouthWest(),
  		    ne2 = bounds.getNorthEast(),

  		    latIntersects = (ne2.lat >= sw.lat) && (sw2.lat <= ne.lat),
  		    lngIntersects = (ne2.lng >= sw.lng) && (sw2.lng <= ne.lng);

  		return latIntersects && lngIntersects;
  	},

  	// @method overlaps(otherBounds: LatLngBounds): Boolean
  	// Returns `true` if the rectangle overlaps the given bounds. Two bounds overlap if their intersection is an area.
  	overlaps: function (bounds) {
  		bounds = toLatLngBounds(bounds);

  		var sw = this._southWest,
  		    ne = this._northEast,
  		    sw2 = bounds.getSouthWest(),
  		    ne2 = bounds.getNorthEast(),

  		    latOverlaps = (ne2.lat > sw.lat) && (sw2.lat < ne.lat),
  		    lngOverlaps = (ne2.lng > sw.lng) && (sw2.lng < ne.lng);

  		return latOverlaps && lngOverlaps;
  	},

  	// @method toBBoxString(): String
  	// Returns a string with bounding box coordinates in a 'southwest_lng,southwest_lat,northeast_lng,northeast_lat' format. Useful for sending requests to web services that return geo data.
  	toBBoxString: function () {
  		return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(',');
  	},

  	// @method equals(otherBounds: LatLngBounds, maxMargin?: Number): Boolean
  	// Returns `true` if the rectangle is equivalent (within a small margin of error) to the given bounds. The margin of error can be overridden by setting `maxMargin` to a small number.
  	equals: function (bounds, maxMargin) {
  		if (!bounds) { return false; }

  		bounds = toLatLngBounds(bounds);

  		return this._southWest.equals(bounds.getSouthWest(), maxMargin) &&
  		       this._northEast.equals(bounds.getNorthEast(), maxMargin);
  	},

  	// @method isValid(): Boolean
  	// Returns `true` if the bounds are properly initialized.
  	isValid: function () {
  		return !!(this._southWest && this._northEast);
  	}
  };

  // TODO International date line?

  // @factory L.latLngBounds(corner1: LatLng, corner2: LatLng)
  // Creates a `LatLngBounds` object by defining two diagonally opposite corners of the rectangle.

  // @alternative
  // @factory L.latLngBounds(latlngs: LatLng[])
  // Creates a `LatLngBounds` object defined by the geographical points it contains. Very useful for zooming the map to fit a particular set of locations with [`fitBounds`](#map-fitbounds).
  function toLatLngBounds(a, b) {
  	if (a instanceof LatLngBounds) {
  		return a;
  	}
  	return new LatLngBounds(a, b);
  }

  /* @class LatLng
   * @aka L.LatLng
   *
   * Represents a geographical point with a certain latitude and longitude.
   *
   * @example
   *
   * ```
   * var latlng = L.latLng(50.5, 30.5);
   * ```
   *
   * All Leaflet methods that accept LatLng objects also accept them in a simple Array form and simple object form (unless noted otherwise), so these lines are equivalent:
   *
   * ```
   * map.panTo([50, 30]);
   * map.panTo({lon: 30, lat: 50});
   * map.panTo({lat: 50, lng: 30});
   * map.panTo(L.latLng(50, 30));
   * ```
   *
   * Note that `LatLng` does not inherit from Leaflet's `Class` object,
   * which means new classes can't inherit from it, and new methods
   * can't be added to it with the `include` function.
   */

  function LatLng(lat, lng, alt) {
  	if (isNaN(lat) || isNaN(lng)) {
  		throw new Error('Invalid LatLng object: (' + lat + ', ' + lng + ')');
  	}

  	// @property lat: Number
  	// Latitude in degrees
  	this.lat = +lat;

  	// @property lng: Number
  	// Longitude in degrees
  	this.lng = +lng;

  	// @property alt: Number
  	// Altitude in meters (optional)
  	if (alt !== undefined) {
  		this.alt = +alt;
  	}
  }

  LatLng.prototype = {
  	// @method equals(otherLatLng: LatLng, maxMargin?: Number): Boolean
  	// Returns `true` if the given `LatLng` point is at the same position (within a small margin of error). The margin of error can be overridden by setting `maxMargin` to a small number.
  	equals: function (obj, maxMargin) {
  		if (!obj) { return false; }

  		obj = toLatLng(obj);

  		var margin = Math.max(
  		        Math.abs(this.lat - obj.lat),
  		        Math.abs(this.lng - obj.lng));

  		return margin <= (maxMargin === undefined ? 1.0E-9 : maxMargin);
  	},

  	// @method toString(): String
  	// Returns a string representation of the point (for debugging purposes).
  	toString: function (precision) {
  		return 'LatLng(' +
  		        formatNum(this.lat, precision) + ', ' +
  		        formatNum(this.lng, precision) + ')';
  	},

  	// @method distanceTo(otherLatLng: LatLng): Number
  	// Returns the distance (in meters) to the given `LatLng` calculated using the [Spherical Law of Cosines](https://en.wikipedia.org/wiki/Spherical_law_of_cosines).
  	distanceTo: function (other) {
  		return Earth.distance(this, toLatLng(other));
  	},

  	// @method wrap(): LatLng
  	// Returns a new `LatLng` object with the longitude wrapped so it's always between -180 and +180 degrees.
  	wrap: function () {
  		return Earth.wrapLatLng(this);
  	},

  	// @method toBounds(sizeInMeters: Number): LatLngBounds
  	// Returns a new `LatLngBounds` object in which each boundary is `sizeInMeters/2` meters apart from the `LatLng`.
  	toBounds: function (sizeInMeters) {
  		var latAccuracy = 180 * sizeInMeters / 40075017,
  		    lngAccuracy = latAccuracy / Math.cos((Math.PI / 180) * this.lat);

  		return toLatLngBounds(
  		        [this.lat - latAccuracy, this.lng - lngAccuracy],
  		        [this.lat + latAccuracy, this.lng + lngAccuracy]);
  	},

  	clone: function () {
  		return new LatLng(this.lat, this.lng, this.alt);
  	}
  };



  // @factory L.latLng(latitude: Number, longitude: Number, altitude?: Number): LatLng
  // Creates an object representing a geographical point with the given latitude and longitude (and optionally altitude).

  // @alternative
  // @factory L.latLng(coords: Array): LatLng
  // Expects an array of the form `[Number, Number]` or `[Number, Number, Number]` instead.

  // @alternative
  // @factory L.latLng(coords: Object): LatLng
  // Expects an plain object of the form `{lat: Number, lng: Number}` or `{lat: Number, lng: Number, alt: Number}` instead.

  function toLatLng(a, b, c) {
  	if (a instanceof LatLng) {
  		return a;
  	}
  	if (isArray(a) && typeof a[0] !== 'object') {
  		if (a.length === 3) {
  			return new LatLng(a[0], a[1], a[2]);
  		}
  		if (a.length === 2) {
  			return new LatLng(a[0], a[1]);
  		}
  		return null;
  	}
  	if (a === undefined || a === null) {
  		return a;
  	}
  	if (typeof a === 'object' && 'lat' in a) {
  		return new LatLng(a.lat, 'lng' in a ? a.lng : a.lon, a.alt);
  	}
  	if (b === undefined) {
  		return null;
  	}
  	return new LatLng(a, b, c);
  }

  /*
   * @namespace CRS
   * @crs L.CRS.Base
   * Object that defines coordinate reference systems for projecting
   * geographical points into pixel (screen) coordinates and back (and to
   * coordinates in other units for [WMS](https://en.wikipedia.org/wiki/Web_Map_Service) services). See
   * [spatial reference system](https://en.wikipedia.org/wiki/Spatial_reference_system).
   *
   * Leaflet defines the most usual CRSs by default. If you want to use a
   * CRS not defined by default, take a look at the
   * [Proj4Leaflet](https://github.com/kartena/Proj4Leaflet) plugin.
   *
   * Note that the CRS instances do not inherit from Leaflet's `Class` object,
   * and can't be instantiated. Also, new classes can't inherit from them,
   * and methods can't be added to them with the `include` function.
   */

  var CRS = {
  	// @method latLngToPoint(latlng: LatLng, zoom: Number): Point
  	// Projects geographical coordinates into pixel coordinates for a given zoom.
  	latLngToPoint: function (latlng, zoom) {
  		var projectedPoint = this.projection.project(latlng),
  		    scale = this.scale(zoom);

  		return this.transformation._transform(projectedPoint, scale);
  	},

  	// @method pointToLatLng(point: Point, zoom: Number): LatLng
  	// The inverse of `latLngToPoint`. Projects pixel coordinates on a given
  	// zoom into geographical coordinates.
  	pointToLatLng: function (point, zoom) {
  		var scale = this.scale(zoom),
  		    untransformedPoint = this.transformation.untransform(point, scale);

  		return this.projection.unproject(untransformedPoint);
  	},

  	// @method project(latlng: LatLng): Point
  	// Projects geographical coordinates into coordinates in units accepted for
  	// this CRS (e.g. meters for EPSG:3857, for passing it to WMS services).
  	project: function (latlng) {
  		return this.projection.project(latlng);
  	},

  	// @method unproject(point: Point): LatLng
  	// Given a projected coordinate returns the corresponding LatLng.
  	// The inverse of `project`.
  	unproject: function (point) {
  		return this.projection.unproject(point);
  	},

  	// @method scale(zoom: Number): Number
  	// Returns the scale used when transforming projected coordinates into
  	// pixel coordinates for a particular zoom. For example, it returns
  	// `256 * 2^zoom` for Mercator-based CRS.
  	scale: function (zoom) {
  		return 256 * Math.pow(2, zoom);
  	},

  	// @method zoom(scale: Number): Number
  	// Inverse of `scale()`, returns the zoom level corresponding to a scale
  	// factor of `scale`.
  	zoom: function (scale) {
  		return Math.log(scale / 256) / Math.LN2;
  	},

  	// @method getProjectedBounds(zoom: Number): Bounds
  	// Returns the projection's bounds scaled and transformed for the provided `zoom`.
  	getProjectedBounds: function (zoom) {
  		if (this.infinite) { return null; }

  		var b = this.projection.bounds,
  		    s = this.scale(zoom),
  		    min = this.transformation.transform(b.min, s),
  		    max = this.transformation.transform(b.max, s);

  		return new Bounds(min, max);
  	},

  	// @method distance(latlng1: LatLng, latlng2: LatLng): Number
  	// Returns the distance between two geographical coordinates.

  	// @property code: String
  	// Standard code name of the CRS passed into WMS services (e.g. `'EPSG:3857'`)
  	//
  	// @property wrapLng: Number[]
  	// An array of two numbers defining whether the longitude (horizontal) coordinate
  	// axis wraps around a given range and how. Defaults to `[-180, 180]` in most
  	// geographical CRSs. If `undefined`, the longitude axis does not wrap around.
  	//
  	// @property wrapLat: Number[]
  	// Like `wrapLng`, but for the latitude (vertical) axis.

  	// wrapLng: [min, max],
  	// wrapLat: [min, max],

  	// @property infinite: Boolean
  	// If true, the coordinate space will be unbounded (infinite in both axes)
  	infinite: false,

  	// @method wrapLatLng(latlng: LatLng): LatLng
  	// Returns a `LatLng` where lat and lng has been wrapped according to the
  	// CRS's `wrapLat` and `wrapLng` properties, if they are outside the CRS's bounds.
  	wrapLatLng: function (latlng) {
  		var lng = this.wrapLng ? wrapNum(latlng.lng, this.wrapLng, true) : latlng.lng,
  		    lat = this.wrapLat ? wrapNum(latlng.lat, this.wrapLat, true) : latlng.lat,
  		    alt = latlng.alt;

  		return new LatLng(lat, lng, alt);
  	},

  	// @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
  	// Returns a `LatLngBounds` with the same size as the given one, ensuring
  	// that its center is within the CRS's bounds.
  	// Only accepts actual `L.LatLngBounds` instances, not arrays.
  	wrapLatLngBounds: function (bounds) {
  		var center = bounds.getCenter(),
  		    newCenter = this.wrapLatLng(center),
  		    latShift = center.lat - newCenter.lat,
  		    lngShift = center.lng - newCenter.lng;

  		if (latShift === 0 && lngShift === 0) {
  			return bounds;
  		}

  		var sw = bounds.getSouthWest(),
  		    ne = bounds.getNorthEast(),
  		    newSw = new LatLng(sw.lat - latShift, sw.lng - lngShift),
  		    newNe = new LatLng(ne.lat - latShift, ne.lng - lngShift);

  		return new LatLngBounds(newSw, newNe);
  	}
  };

  /*
   * @namespace CRS
   * @crs L.CRS.Earth
   *
   * Serves as the base for CRS that are global such that they cover the earth.
   * Can only be used as the base for other CRS and cannot be used directly,
   * since it does not have a `code`, `projection` or `transformation`. `distance()` returns
   * meters.
   */

  var Earth = extend({}, CRS, {
  	wrapLng: [-180, 180],

  	// Mean Earth Radius, as recommended for use by
  	// the International Union of Geodesy and Geophysics,
  	// see https://rosettacode.org/wiki/Haversine_formula
  	R: 6371000,

  	// distance between two geographical points using spherical law of cosines approximation
  	distance: function (latlng1, latlng2) {
  		var rad = Math.PI / 180,
  		    lat1 = latlng1.lat * rad,
  		    lat2 = latlng2.lat * rad,
  		    sinDLat = Math.sin((latlng2.lat - latlng1.lat) * rad / 2),
  		    sinDLon = Math.sin((latlng2.lng - latlng1.lng) * rad / 2),
  		    a = sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLon * sinDLon,
  		    c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  		return this.R * c;
  	}
  });

  /*
   * @namespace Projection
   * @projection L.Projection.SphericalMercator
   *
   * Spherical Mercator projection — the most common projection for online maps,
   * used by almost all free and commercial tile providers. Assumes that Earth is
   * a sphere. Used by the `EPSG:3857` CRS.
   */

  var earthRadius = 6378137;

  var SphericalMercator = {

  	R: earthRadius,
  	MAX_LATITUDE: 85.0511287798,

  	project: function (latlng) {
  		var d = Math.PI / 180,
  		    max = this.MAX_LATITUDE,
  		    lat = Math.max(Math.min(max, latlng.lat), -max),
  		    sin = Math.sin(lat * d);

  		return new Point(
  			this.R * latlng.lng * d,
  			this.R * Math.log((1 + sin) / (1 - sin)) / 2);
  	},

  	unproject: function (point) {
  		var d = 180 / Math.PI;

  		return new LatLng(
  			(2 * Math.atan(Math.exp(point.y / this.R)) - (Math.PI / 2)) * d,
  			point.x * d / this.R);
  	},

  	bounds: (function () {
  		var d = earthRadius * Math.PI;
  		return new Bounds([-d, -d], [d, d]);
  	})()
  };

  /*
   * @class Transformation
   * @aka L.Transformation
   *
   * Represents an affine transformation: a set of coefficients `a`, `b`, `c`, `d`
   * for transforming a point of a form `(x, y)` into `(a*x + b, c*y + d)` and doing
   * the reverse. Used by Leaflet in its projections code.
   *
   * @example
   *
   * ```js
   * var transformation = L.transformation(2, 5, -1, 10),
   * 	p = L.point(1, 2),
   * 	p2 = transformation.transform(p), //  L.point(7, 8)
   * 	p3 = transformation.untransform(p2); //  L.point(1, 2)
   * ```
   */


  // factory new L.Transformation(a: Number, b: Number, c: Number, d: Number)
  // Creates a `Transformation` object with the given coefficients.
  function Transformation(a, b, c, d) {
  	if (isArray(a)) {
  		// use array properties
  		this._a = a[0];
  		this._b = a[1];
  		this._c = a[2];
  		this._d = a[3];
  		return;
  	}
  	this._a = a;
  	this._b = b;
  	this._c = c;
  	this._d = d;
  }

  Transformation.prototype = {
  	// @method transform(point: Point, scale?: Number): Point
  	// Returns a transformed point, optionally multiplied by the given scale.
  	// Only accepts actual `L.Point` instances, not arrays.
  	transform: function (point, scale) { // (Point, Number) -> Point
  		return this._transform(point.clone(), scale);
  	},

  	// destructive transform (faster)
  	_transform: function (point, scale) {
  		scale = scale || 1;
  		point.x = scale * (this._a * point.x + this._b);
  		point.y = scale * (this._c * point.y + this._d);
  		return point;
  	},

  	// @method untransform(point: Point, scale?: Number): Point
  	// Returns the reverse transformation of the given point, optionally divided
  	// by the given scale. Only accepts actual `L.Point` instances, not arrays.
  	untransform: function (point, scale) {
  		scale = scale || 1;
  		return new Point(
  		        (point.x / scale - this._b) / this._a,
  		        (point.y / scale - this._d) / this._c);
  	}
  };

  // factory L.transformation(a: Number, b: Number, c: Number, d: Number)

  // @factory L.transformation(a: Number, b: Number, c: Number, d: Number)
  // Instantiates a Transformation object with the given coefficients.

  // @alternative
  // @factory L.transformation(coefficients: Array): Transformation
  // Expects an coefficients array of the form
  // `[a: Number, b: Number, c: Number, d: Number]`.

  function toTransformation(a, b, c, d) {
  	return new Transformation(a, b, c, d);
  }

  /*
   * @namespace CRS
   * @crs L.CRS.EPSG3857
   *
   * The most common CRS for online maps, used by almost all free and commercial
   * tile providers. Uses Spherical Mercator projection. Set in by default in
   * Map's `crs` option.
   */

  var EPSG3857 = extend({}, Earth, {
  	code: 'EPSG:3857',
  	projection: SphericalMercator,

  	transformation: (function () {
  		var scale = 0.5 / (Math.PI * SphericalMercator.R);
  		return toTransformation(scale, 0.5, -scale, 0.5);
  	}())
  });

  var EPSG900913 = extend({}, EPSG3857, {
  	code: 'EPSG:900913'
  });

  // @namespace SVG; @section
  // There are several static functions which can be called without instantiating L.SVG:

  // @function create(name: String): SVGElement
  // Returns a instance of [SVGElement](https://developer.mozilla.org/docs/Web/API/SVGElement),
  // corresponding to the class name passed. For example, using 'line' will return
  // an instance of [SVGLineElement](https://developer.mozilla.org/docs/Web/API/SVGLineElement).
  function svgCreate(name) {
  	return document.createElementNS('http://www.w3.org/2000/svg', name);
  }

  // @function pointsToPath(rings: Point[], closed: Boolean): String
  // Generates a SVG path string for multiple rings, with each ring turning
  // into "M..L..L.." instructions
  function pointsToPath(rings, closed) {
  	var str = '',
  	i, j, len, len2, points, p;

  	for (i = 0, len = rings.length; i < len; i++) {
  		points = rings[i];

  		for (j = 0, len2 = points.length; j < len2; j++) {
  			p = points[j];
  			str += (j ? 'L' : 'M') + p.x + ' ' + p.y;
  		}

  		// closes the ring for polygons; "x" is VML syntax
  		str += closed ? (Browser.svg ? 'z' : 'x') : '';
  	}

  	// SVG complains about empty path strings
  	return str || 'M0 0';
  }

  /*
   * @namespace Browser
   * @aka L.Browser
   *
   * A namespace with static properties for browser/feature detection used by Leaflet internally.
   *
   * @example
   *
   * ```js
   * if (L.Browser.ielt9) {
   *   alert('Upgrade your browser, dude!');
   * }
   * ```
   */

  var style = document.documentElement.style;

  // @property ie: Boolean; `true` for all Internet Explorer versions (not Edge).
  var ie = 'ActiveXObject' in window;

  // @property ielt9: Boolean; `true` for Internet Explorer versions less than 9.
  var ielt9 = ie && !document.addEventListener;

  // @property edge: Boolean; `true` for the Edge web browser.
  var edge = 'msLaunchUri' in navigator && !('documentMode' in document);

  // @property webkit: Boolean;
  // `true` for webkit-based browsers like Chrome and Safari (including mobile versions).
  var webkit = userAgentContains('webkit');

  // @property android: Boolean
  // **Deprecated.** `true` for any browser running on an Android platform.
  var android = userAgentContains('android');

  // @property android23: Boolean; **Deprecated.** `true` for browsers running on Android 2 or Android 3.
  var android23 = userAgentContains('android 2') || userAgentContains('android 3');

  /* See https://stackoverflow.com/a/17961266 for details on detecting stock Android */
  var webkitVer = parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1], 10); // also matches AppleWebKit
  // @property androidStock: Boolean; **Deprecated.** `true` for the Android stock browser (i.e. not Chrome)
  var androidStock = android && userAgentContains('Google') && webkitVer < 537 && !('AudioNode' in window);

  // @property opera: Boolean; `true` for the Opera browser
  var opera = !!window.opera;

  // @property chrome: Boolean; `true` for the Chrome browser.
  var chrome = !edge && userAgentContains('chrome');

  // @property gecko: Boolean; `true` for gecko-based browsers like Firefox.
  var gecko = userAgentContains('gecko') && !webkit && !opera && !ie;

  // @property safari: Boolean; `true` for the Safari browser.
  var safari = !chrome && userAgentContains('safari');

  var phantom = userAgentContains('phantom');

  // @property opera12: Boolean
  // `true` for the Opera browser supporting CSS transforms (version 12 or later).
  var opera12 = 'OTransition' in style;

  // @property win: Boolean; `true` when the browser is running in a Windows platform
  var win = navigator.platform.indexOf('Win') === 0;

  // @property ie3d: Boolean; `true` for all Internet Explorer versions supporting CSS transforms.
  var ie3d = ie && ('transition' in style);

  // @property webkit3d: Boolean; `true` for webkit-based browsers supporting CSS transforms.
  var webkit3d = ('WebKitCSSMatrix' in window) && ('m11' in new window.WebKitCSSMatrix()) && !android23;

  // @property gecko3d: Boolean; `true` for gecko-based browsers supporting CSS transforms.
  var gecko3d = 'MozPerspective' in style;

  // @property any3d: Boolean
  // `true` for all browsers supporting CSS transforms.
  var any3d = !window.L_DISABLE_3D && (ie3d || webkit3d || gecko3d) && !opera12 && !phantom;

  // @property mobile: Boolean; `true` for all browsers running in a mobile device.
  var mobile = typeof orientation !== 'undefined' || userAgentContains('mobile');

  // @property mobileWebkit: Boolean; `true` for all webkit-based browsers in a mobile device.
  var mobileWebkit = mobile && webkit;

  // @property mobileWebkit3d: Boolean
  // `true` for all webkit-based browsers in a mobile device supporting CSS transforms.
  var mobileWebkit3d = mobile && webkit3d;

  // @property msPointer: Boolean
  // `true` for browsers implementing the Microsoft touch events model (notably IE10).
  var msPointer = !window.PointerEvent && window.MSPointerEvent;

  // @property pointer: Boolean
  // `true` for all browsers supporting [pointer events](https://msdn.microsoft.com/en-us/library/dn433244%28v=vs.85%29.aspx).
  var pointer = !!(window.PointerEvent || msPointer);

  // @property touchNative: Boolean
  // `true` for all browsers supporting [touch events](https://developer.mozilla.org/docs/Web/API/Touch_events).
  // **This does not necessarily mean** that the browser is running in a computer with
  // a touchscreen, it only means that the browser is capable of understanding
  // touch events.
  var touchNative = 'ontouchstart' in window || !!window.TouchEvent;

  // @property touch: Boolean
  // `true` for all browsers supporting either [touch](#browser-touch) or [pointer](#browser-pointer) events.
  // Note: pointer events will be preferred (if available), and processed for all `touch*` listeners.
  var touch = !window.L_NO_TOUCH && (touchNative || pointer);

  // @property mobileOpera: Boolean; `true` for the Opera browser in a mobile device.
  var mobileOpera = mobile && opera;

  // @property mobileGecko: Boolean
  // `true` for gecko-based browsers running in a mobile device.
  var mobileGecko = mobile && gecko;

  // @property retina: Boolean
  // `true` for browsers on a high-resolution "retina" screen or on any screen when browser's display zoom is more than 100%.
  var retina = (window.devicePixelRatio || (window.screen.deviceXDPI / window.screen.logicalXDPI)) > 1;

  // @property passiveEvents: Boolean
  // `true` for browsers that support passive events.
  var passiveEvents = (function () {
  	var supportsPassiveOption = false;
  	try {
  		var opts = Object.defineProperty({}, 'passive', {
  			get: function () { // eslint-disable-line getter-return
  				supportsPassiveOption = true;
  			}
  		});
  		window.addEventListener('testPassiveEventSupport', falseFn, opts);
  		window.removeEventListener('testPassiveEventSupport', falseFn, opts);
  	} catch (e) {
  		// Errors can safely be ignored since this is only a browser support test.
  	}
  	return supportsPassiveOption;
  }());

  // @property canvas: Boolean
  // `true` when the browser supports [`<canvas>`](https://developer.mozilla.org/docs/Web/API/Canvas_API).
  var canvas$1 = (function () {
  	return !!document.createElement('canvas').getContext;
  }());

  // @property svg: Boolean
  // `true` when the browser supports [SVG](https://developer.mozilla.org/docs/Web/SVG).
  var svg$1 = !!(document.createElementNS && svgCreate('svg').createSVGRect);

  var inlineSvg = !!svg$1 && (function () {
  	var div = document.createElement('div');
  	div.innerHTML = '<svg/>';
  	return (div.firstChild && div.firstChild.namespaceURI) === 'http://www.w3.org/2000/svg';
  })();

  // @property vml: Boolean
  // `true` if the browser supports [VML](https://en.wikipedia.org/wiki/Vector_Markup_Language).
  var vml = !svg$1 && (function () {
  	try {
  		var div = document.createElement('div');
  		div.innerHTML = '<v:shape adj="1"/>';

  		var shape = div.firstChild;
  		shape.style.behavior = 'url(#default#VML)';

  		return shape && (typeof shape.adj === 'object');

  	} catch (e) {
  		return false;
  	}
  }());


  // @property mac: Boolean; `true` when the browser is running in a Mac platform
  var mac = navigator.platform.indexOf('Mac') === 0;

  // @property mac: Boolean; `true` when the browser is running in a Linux platform
  var linux = navigator.platform.indexOf('Linux') === 0;

  function userAgentContains(str) {
  	return navigator.userAgent.toLowerCase().indexOf(str) >= 0;
  }


  var Browser = {
  	ie: ie,
  	ielt9: ielt9,
  	edge: edge,
  	webkit: webkit,
  	android: android,
  	android23: android23,
  	androidStock: androidStock,
  	opera: opera,
  	chrome: chrome,
  	gecko: gecko,
  	safari: safari,
  	phantom: phantom,
  	opera12: opera12,
  	win: win,
  	ie3d: ie3d,
  	webkit3d: webkit3d,
  	gecko3d: gecko3d,
  	any3d: any3d,
  	mobile: mobile,
  	mobileWebkit: mobileWebkit,
  	mobileWebkit3d: mobileWebkit3d,
  	msPointer: msPointer,
  	pointer: pointer,
  	touch: touch,
  	touchNative: touchNative,
  	mobileOpera: mobileOpera,
  	mobileGecko: mobileGecko,
  	retina: retina,
  	passiveEvents: passiveEvents,
  	canvas: canvas$1,
  	svg: svg$1,
  	vml: vml,
  	inlineSvg: inlineSvg,
  	mac: mac,
  	linux: linux
  };

  /*
   * Extends L.DomEvent to provide touch support for Internet Explorer and Windows-based devices.
   */

  var POINTER_DOWN =   Browser.msPointer ? 'MSPointerDown'   : 'pointerdown';
  var POINTER_MOVE =   Browser.msPointer ? 'MSPointerMove'   : 'pointermove';
  var POINTER_UP =     Browser.msPointer ? 'MSPointerUp'     : 'pointerup';
  var POINTER_CANCEL = Browser.msPointer ? 'MSPointerCancel' : 'pointercancel';
  var pEvent = {
  	touchstart  : POINTER_DOWN,
  	touchmove   : POINTER_MOVE,
  	touchend    : POINTER_UP,
  	touchcancel : POINTER_CANCEL
  };
  var handle = {
  	touchstart  : _onPointerStart,
  	touchmove   : _handlePointer,
  	touchend    : _handlePointer,
  	touchcancel : _handlePointer
  };
  var _pointers = {};
  var _pointerDocListener = false;

  // Provides a touch events wrapper for (ms)pointer events.
  // ref https://www.w3.org/TR/pointerevents/ https://www.w3.org/Bugs/Public/show_bug.cgi?id=22890

  function addPointerListener(obj, type, handler) {
  	if (type === 'touchstart') {
  		_addPointerDocListener();
  	}
  	if (!handle[type]) {
  		console.warn('wrong event specified:', type);
  		return falseFn;
  	}
  	handler = handle[type].bind(this, handler);
  	obj.addEventListener(pEvent[type], handler, false);
  	return handler;
  }

  function removePointerListener(obj, type, handler) {
  	if (!pEvent[type]) {
  		console.warn('wrong event specified:', type);
  		return;
  	}
  	obj.removeEventListener(pEvent[type], handler, false);
  }

  function _globalPointerDown(e) {
  	_pointers[e.pointerId] = e;
  }

  function _globalPointerMove(e) {
  	if (_pointers[e.pointerId]) {
  		_pointers[e.pointerId] = e;
  	}
  }

  function _globalPointerUp(e) {
  	delete _pointers[e.pointerId];
  }

  function _addPointerDocListener() {
  	// need to keep track of what pointers and how many are active to provide e.touches emulation
  	if (!_pointerDocListener) {
  		// we listen document as any drags that end by moving the touch off the screen get fired there
  		document.addEventListener(POINTER_DOWN, _globalPointerDown, true);
  		document.addEventListener(POINTER_MOVE, _globalPointerMove, true);
  		document.addEventListener(POINTER_UP, _globalPointerUp, true);
  		document.addEventListener(POINTER_CANCEL, _globalPointerUp, true);

  		_pointerDocListener = true;
  	}
  }

  function _handlePointer(handler, e) {
  	if (e.pointerType === (e.MSPOINTER_TYPE_MOUSE || 'mouse')) { return; }

  	e.touches = [];
  	for (var i in _pointers) {
  		e.touches.push(_pointers[i]);
  	}
  	e.changedTouches = [e];

  	handler(e);
  }

  function _onPointerStart(handler, e) {
  	// IE10 specific: MsTouch needs preventDefault. See #2000
  	if (e.MSPOINTER_TYPE_TOUCH && e.pointerType === e.MSPOINTER_TYPE_TOUCH) {
  		preventDefault(e);
  	}
  	_handlePointer(handler, e);
  }

  /*
   * Extends the event handling code with double tap support for mobile browsers.
   *
   * Note: currently most browsers fire native dblclick, with only a few exceptions
   * (see https://github.com/Leaflet/Leaflet/issues/7012#issuecomment-595087386)
   */

  function makeDblclick(event) {
  	// in modern browsers `type` cannot be just overridden:
  	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Getter_only
  	var newEvent = {},
  	    prop, i;
  	for (i in event) {
  		prop = event[i];
  		newEvent[i] = prop && prop.bind ? prop.bind(event) : prop;
  	}
  	event = newEvent;
  	newEvent.type = 'dblclick';
  	newEvent.detail = 2;
  	newEvent.isTrusted = false;
  	newEvent._simulated = true; // for debug purposes
  	return newEvent;
  }

  var delay = 200;
  function addDoubleTapListener(obj, handler) {
  	// Most browsers handle double tap natively
  	obj.addEventListener('dblclick', handler);

  	// On some platforms the browser doesn't fire native dblclicks for touch events.
  	// It seems that in all such cases `detail` property of `click` event is always `1`.
  	// So here we rely on that fact to avoid excessive 'dblclick' simulation when not needed.
  	var last = 0,
  	    detail;
  	function simDblclick(e) {
  		if (e.detail !== 1) {
  			detail = e.detail; // keep in sync to avoid false dblclick in some cases
  			return;
  		}

  		if (e.pointerType === 'mouse' ||
  			(e.sourceCapabilities && !e.sourceCapabilities.firesTouchEvents)) {

  			return;
  		}

  		// When clicking on an <input>, the browser generates a click on its
  		// <label> (and vice versa) triggering two clicks in quick succession.
  		// This ignores clicks on elements which are a label with a 'for'
  		// attribute (or children of such a label), but not children of
  		// a <input>.
  		var path = getPropagationPath(e);
  		if (path.some(function (el) {
  			return el instanceof HTMLLabelElement && el.attributes.for;
  		}) &&
  			!path.some(function (el) {
  				return (
  					el instanceof HTMLInputElement ||
  					el instanceof HTMLSelectElement
  				);
  			})
  		) {
  			return;
  		}

  		var now = Date.now();
  		if (now - last <= delay) {
  			detail++;
  			if (detail === 2) {
  				handler(makeDblclick(e));
  			}
  		} else {
  			detail = 1;
  		}
  		last = now;
  	}

  	obj.addEventListener('click', simDblclick);

  	return {
  		dblclick: handler,
  		simDblclick: simDblclick
  	};
  }

  function removeDoubleTapListener(obj, handlers) {
  	obj.removeEventListener('dblclick', handlers.dblclick);
  	obj.removeEventListener('click', handlers.simDblclick);
  }

  /*
   * @namespace DomUtil
   *
   * Utility functions to work with the [DOM](https://developer.mozilla.org/docs/Web/API/Document_Object_Model)
   * tree, used by Leaflet internally.
   *
   * Most functions expecting or returning a `HTMLElement` also work for
   * SVG elements. The only difference is that classes refer to CSS classes
   * in HTML and SVG classes in SVG.
   */


  // @property TRANSFORM: String
  // Vendor-prefixed transform style name (e.g. `'webkitTransform'` for WebKit).
  var TRANSFORM = testProp(
  	['transform', 'webkitTransform', 'OTransform', 'MozTransform', 'msTransform']);

  // webkitTransition comes first because some browser versions that drop vendor prefix don't do
  // the same for the transitionend event, in particular the Android 4.1 stock browser

  // @property TRANSITION: String
  // Vendor-prefixed transition style name.
  var TRANSITION = testProp(
  	['webkitTransition', 'transition', 'OTransition', 'MozTransition', 'msTransition']);

  // @property TRANSITION_END: String
  // Vendor-prefixed transitionend event name.
  var TRANSITION_END =
  	TRANSITION === 'webkitTransition' || TRANSITION === 'OTransition' ? TRANSITION + 'End' : 'transitionend';


  // @function get(id: String|HTMLElement): HTMLElement
  // Returns an element given its DOM id, or returns the element itself
  // if it was passed directly.
  function get(id) {
  	return typeof id === 'string' ? document.getElementById(id) : id;
  }

  // @function getStyle(el: HTMLElement, styleAttrib: String): String
  // Returns the value for a certain style attribute on an element,
  // including computed values or values set through CSS.
  function getStyle(el, style) {
  	var value = el.style[style] || (el.currentStyle && el.currentStyle[style]);

  	if ((!value || value === 'auto') && document.defaultView) {
  		var css = document.defaultView.getComputedStyle(el, null);
  		value = css ? css[style] : null;
  	}
  	return value === 'auto' ? null : value;
  }

  // @function create(tagName: String, className?: String, container?: HTMLElement): HTMLElement
  // Creates an HTML element with `tagName`, sets its class to `className`, and optionally appends it to `container` element.
  function create$1(tagName, className, container) {
  	var el = document.createElement(tagName);
  	el.className = className || '';

  	if (container) {
  		container.appendChild(el);
  	}
  	return el;
  }

  // @function remove(el: HTMLElement)
  // Removes `el` from its parent element
  function remove(el) {
  	var parent = el.parentNode;
  	if (parent) {
  		parent.removeChild(el);
  	}
  }

  // @function empty(el: HTMLElement)
  // Removes all of `el`'s children elements from `el`
  function empty(el) {
  	while (el.firstChild) {
  		el.removeChild(el.firstChild);
  	}
  }

  // @function toFront(el: HTMLElement)
  // Makes `el` the last child of its parent, so it renders in front of the other children.
  function toFront(el) {
  	var parent = el.parentNode;
  	if (parent && parent.lastChild !== el) {
  		parent.appendChild(el);
  	}
  }

  // @function toBack(el: HTMLElement)
  // Makes `el` the first child of its parent, so it renders behind the other children.
  function toBack(el) {
  	var parent = el.parentNode;
  	if (parent && parent.firstChild !== el) {
  		parent.insertBefore(el, parent.firstChild);
  	}
  }

  // @function hasClass(el: HTMLElement, name: String): Boolean
  // Returns `true` if the element's class attribute contains `name`.
  function hasClass(el, name) {
  	if (el.classList !== undefined) {
  		return el.classList.contains(name);
  	}
  	var className = getClass(el);
  	return className.length > 0 && new RegExp('(^|\\s)' + name + '(\\s|$)').test(className);
  }

  // @function addClass(el: HTMLElement, name: String)
  // Adds `name` to the element's class attribute.
  function addClass(el, name) {
  	if (el.classList !== undefined) {
  		var classes = splitWords(name);
  		for (var i = 0, len = classes.length; i < len; i++) {
  			el.classList.add(classes[i]);
  		}
  	} else if (!hasClass(el, name)) {
  		var className = getClass(el);
  		setClass(el, (className ? className + ' ' : '') + name);
  	}
  }

  // @function removeClass(el: HTMLElement, name: String)
  // Removes `name` from the element's class attribute.
  function removeClass(el, name) {
  	if (el.classList !== undefined) {
  		el.classList.remove(name);
  	} else {
  		setClass(el, trim((' ' + getClass(el) + ' ').replace(' ' + name + ' ', ' ')));
  	}
  }

  // @function setClass(el: HTMLElement, name: String)
  // Sets the element's class.
  function setClass(el, name) {
  	if (el.className.baseVal === undefined) {
  		el.className = name;
  	} else {
  		// in case of SVG element
  		el.className.baseVal = name;
  	}
  }

  // @function getClass(el: HTMLElement): String
  // Returns the element's class.
  function getClass(el) {
  	// Check if the element is an SVGElementInstance and use the correspondingElement instead
  	// (Required for linked SVG elements in IE11.)
  	if (el.correspondingElement) {
  		el = el.correspondingElement;
  	}
  	return el.className.baseVal === undefined ? el.className : el.className.baseVal;
  }

  // @function setOpacity(el: HTMLElement, opacity: Number)
  // Set the opacity of an element (including old IE support).
  // `opacity` must be a number from `0` to `1`.
  function setOpacity(el, value) {
  	if ('opacity' in el.style) {
  		el.style.opacity = value;
  	} else if ('filter' in el.style) {
  		_setOpacityIE(el, value);
  	}
  }

  function _setOpacityIE(el, value) {
  	var filter = false,
  	    filterName = 'DXImageTransform.Microsoft.Alpha';

  	// filters collection throws an error if we try to retrieve a filter that doesn't exist
  	try {
  		filter = el.filters.item(filterName);
  	} catch (e) {
  		// don't set opacity to 1 if we haven't already set an opacity,
  		// it isn't needed and breaks transparent pngs.
  		if (value === 1) { return; }
  	}

  	value = Math.round(value * 100);

  	if (filter) {
  		filter.Enabled = (value !== 100);
  		filter.Opacity = value;
  	} else {
  		el.style.filter += ' progid:' + filterName + '(opacity=' + value + ')';
  	}
  }

  // @function testProp(props: String[]): String|false
  // Goes through the array of style names and returns the first name
  // that is a valid style name for an element. If no such name is found,
  // it returns false. Useful for vendor-prefixed styles like `transform`.
  function testProp(props) {
  	var style = document.documentElement.style;

  	for (var i = 0; i < props.length; i++) {
  		if (props[i] in style) {
  			return props[i];
  		}
  	}
  	return false;
  }

  // @function setTransform(el: HTMLElement, offset: Point, scale?: Number)
  // Resets the 3D CSS transform of `el` so it is translated by `offset` pixels
  // and optionally scaled by `scale`. Does not have an effect if the
  // browser doesn't support 3D CSS transforms.
  function setTransform(el, offset, scale) {
  	var pos = offset || new Point(0, 0);

  	el.style[TRANSFORM] =
  		(Browser.ie3d ?
  			'translate(' + pos.x + 'px,' + pos.y + 'px)' :
  			'translate3d(' + pos.x + 'px,' + pos.y + 'px,0)') +
  		(scale ? ' scale(' + scale + ')' : '');
  }

  // @function setPosition(el: HTMLElement, position: Point)
  // Sets the position of `el` to coordinates specified by `position`,
  // using CSS translate or top/left positioning depending on the browser
  // (used by Leaflet internally to position its layers).
  function setPosition(el, point) {

  	/*eslint-disable */
  	el._leaflet_pos = point;
  	/* eslint-enable */

  	if (Browser.any3d) {
  		setTransform(el, point);
  	} else {
  		el.style.left = point.x + 'px';
  		el.style.top = point.y + 'px';
  	}
  }

  // @function getPosition(el: HTMLElement): Point
  // Returns the coordinates of an element previously positioned with setPosition.
  function getPosition(el) {
  	// this method is only used for elements previously positioned using setPosition,
  	// so it's safe to cache the position for performance

  	return el._leaflet_pos || new Point(0, 0);
  }

  // @function disableTextSelection()
  // Prevents the user from generating `selectstart` DOM events, usually generated
  // when the user drags the mouse through a page with text. Used internally
  // by Leaflet to override the behaviour of any click-and-drag interaction on
  // the map. Affects drag interactions on the whole document.

  // @function enableTextSelection()
  // Cancels the effects of a previous [`L.DomUtil.disableTextSelection`](#domutil-disabletextselection).
  var disableTextSelection;
  var enableTextSelection;
  var _userSelect;
  if ('onselectstart' in document) {
  	disableTextSelection = function () {
  		on(window, 'selectstart', preventDefault);
  	};
  	enableTextSelection = function () {
  		off(window, 'selectstart', preventDefault);
  	};
  } else {
  	var userSelectProperty = testProp(
  		['userSelect', 'WebkitUserSelect', 'OUserSelect', 'MozUserSelect', 'msUserSelect']);

  	disableTextSelection = function () {
  		if (userSelectProperty) {
  			var style = document.documentElement.style;
  			_userSelect = style[userSelectProperty];
  			style[userSelectProperty] = 'none';
  		}
  	};
  	enableTextSelection = function () {
  		if (userSelectProperty) {
  			document.documentElement.style[userSelectProperty] = _userSelect;
  			_userSelect = undefined;
  		}
  	};
  }

  // @function disableImageDrag()
  // As [`L.DomUtil.disableTextSelection`](#domutil-disabletextselection), but
  // for `dragstart` DOM events, usually generated when the user drags an image.
  function disableImageDrag() {
  	on(window, 'dragstart', preventDefault);
  }

  // @function enableImageDrag()
  // Cancels the effects of a previous [`L.DomUtil.disableImageDrag`](#domutil-disabletextselection).
  function enableImageDrag() {
  	off(window, 'dragstart', preventDefault);
  }

  var _outlineElement, _outlineStyle;
  // @function preventOutline(el: HTMLElement)
  // Makes the [outline](https://developer.mozilla.org/docs/Web/CSS/outline)
  // of the element `el` invisible. Used internally by Leaflet to prevent
  // focusable elements from displaying an outline when the user performs a
  // drag interaction on them.
  function preventOutline(element) {
  	while (element.tabIndex === -1) {
  		element = element.parentNode;
  	}
  	if (!element.style) { return; }
  	restoreOutline();
  	_outlineElement = element;
  	_outlineStyle = element.style.outlineStyle;
  	element.style.outlineStyle = 'none';
  	on(window, 'keydown', restoreOutline);
  }

  // @function restoreOutline()
  // Cancels the effects of a previous [`L.DomUtil.preventOutline`]().
  function restoreOutline() {
  	if (!_outlineElement) { return; }
  	_outlineElement.style.outlineStyle = _outlineStyle;
  	_outlineElement = undefined;
  	_outlineStyle = undefined;
  	off(window, 'keydown', restoreOutline);
  }

  // @function getSizedParentNode(el: HTMLElement): HTMLElement
  // Finds the closest parent node which size (width and height) is not null.
  function getSizedParentNode(element) {
  	do {
  		element = element.parentNode;
  	} while ((!element.offsetWidth || !element.offsetHeight) && element !== document.body);
  	return element;
  }

  // @function getScale(el: HTMLElement): Object
  // Computes the CSS scale currently applied on the element.
  // Returns an object with `x` and `y` members as horizontal and vertical scales respectively,
  // and `boundingClientRect` as the result of [`getBoundingClientRect()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect).
  function getScale(element) {
  	var rect = element.getBoundingClientRect(); // Read-only in old browsers.

  	return {
  		x: rect.width / element.offsetWidth || 1,
  		y: rect.height / element.offsetHeight || 1,
  		boundingClientRect: rect
  	};
  }

  var DomUtil = {
    __proto__: null,
    TRANSFORM: TRANSFORM,
    TRANSITION: TRANSITION,
    TRANSITION_END: TRANSITION_END,
    get: get,
    getStyle: getStyle,
    create: create$1,
    remove: remove,
    empty: empty,
    toFront: toFront,
    toBack: toBack,
    hasClass: hasClass,
    addClass: addClass,
    removeClass: removeClass,
    setClass: setClass,
    getClass: getClass,
    setOpacity: setOpacity,
    testProp: testProp,
    setTransform: setTransform,
    setPosition: setPosition,
    getPosition: getPosition,
    get disableTextSelection () { return disableTextSelection; },
    get enableTextSelection () { return enableTextSelection; },
    disableImageDrag: disableImageDrag,
    enableImageDrag: enableImageDrag,
    preventOutline: preventOutline,
    restoreOutline: restoreOutline,
    getSizedParentNode: getSizedParentNode,
    getScale: getScale
  };

  /*
   * @namespace DomEvent
   * Utility functions to work with the [DOM events](https://developer.mozilla.org/docs/Web/API/Event), used by Leaflet internally.
   */

  // Inspired by John Resig, Dean Edwards and YUI addEvent implementations.

  // @function on(el: HTMLElement, types: String, fn: Function, context?: Object): this
  // Adds a listener function (`fn`) to a particular DOM event type of the
  // element `el`. You can optionally specify the context of the listener
  // (object the `this` keyword will point to). You can also pass several
  // space-separated types (e.g. `'click dblclick'`).

  // @alternative
  // @function on(el: HTMLElement, eventMap: Object, context?: Object): this
  // Adds a set of type/listener pairs, e.g. `{click: onClick, mousemove: onMouseMove}`
  function on(obj, types, fn, context) {

  	if (types && typeof types === 'object') {
  		for (var type in types) {
  			addOne(obj, type, types[type], fn);
  		}
  	} else {
  		types = splitWords(types);

  		for (var i = 0, len = types.length; i < len; i++) {
  			addOne(obj, types[i], fn, context);
  		}
  	}

  	return this;
  }

  var eventsKey = '_leaflet_events';

  // @function off(el: HTMLElement, types: String, fn: Function, context?: Object): this
  // Removes a previously added listener function.
  // Note that if you passed a custom context to on, you must pass the same
  // context to `off` in order to remove the listener.

  // @alternative
  // @function off(el: HTMLElement, eventMap: Object, context?: Object): this
  // Removes a set of type/listener pairs, e.g. `{click: onClick, mousemove: onMouseMove}`

  // @alternative
  // @function off(el: HTMLElement, types: String): this
  // Removes all previously added listeners of given types.

  // @alternative
  // @function off(el: HTMLElement): this
  // Removes all previously added listeners from given HTMLElement
  function off(obj, types, fn, context) {

  	if (arguments.length === 1) {
  		batchRemove(obj);
  		delete obj[eventsKey];

  	} else if (types && typeof types === 'object') {
  		for (var type in types) {
  			removeOne(obj, type, types[type], fn);
  		}

  	} else {
  		types = splitWords(types);

  		if (arguments.length === 2) {
  			batchRemove(obj, function (type) {
  				return indexOf(types, type) !== -1;
  			});
  		} else {
  			for (var i = 0, len = types.length; i < len; i++) {
  				removeOne(obj, types[i], fn, context);
  			}
  		}
  	}

  	return this;
  }

  function batchRemove(obj, filterFn) {
  	for (var id in obj[eventsKey]) {
  		var type = id.split(/\d/)[0];
  		if (!filterFn || filterFn(type)) {
  			removeOne(obj, type, null, null, id);
  		}
  	}
  }

  var mouseSubst = {
  	mouseenter: 'mouseover',
  	mouseleave: 'mouseout',
  	wheel: !('onwheel' in window) && 'mousewheel'
  };

  function addOne(obj, type, fn, context) {
  	var id = type + stamp(fn) + (context ? '_' + stamp(context) : '');

  	if (obj[eventsKey] && obj[eventsKey][id]) { return this; }

  	var handler = function (e) {
  		return fn.call(context || obj, e || window.event);
  	};

  	var originalHandler = handler;

  	if (!Browser.touchNative && Browser.pointer && type.indexOf('touch') === 0) {
  		// Needs DomEvent.Pointer.js
  		handler = addPointerListener(obj, type, handler);

  	} else if (Browser.touch && (type === 'dblclick')) {
  		handler = addDoubleTapListener(obj, handler);

  	} else if ('addEventListener' in obj) {

  		if (type === 'touchstart' || type === 'touchmove' || type === 'wheel' ||  type === 'mousewheel') {
  			obj.addEventListener(mouseSubst[type] || type, handler, Browser.passiveEvents ? {passive: false} : false);

  		} else if (type === 'mouseenter' || type === 'mouseleave') {
  			handler = function (e) {
  				e = e || window.event;
  				if (isExternalTarget(obj, e)) {
  					originalHandler(e);
  				}
  			};
  			obj.addEventListener(mouseSubst[type], handler, false);

  		} else {
  			obj.addEventListener(type, originalHandler, false);
  		}

  	} else {
  		obj.attachEvent('on' + type, handler);
  	}

  	obj[eventsKey] = obj[eventsKey] || {};
  	obj[eventsKey][id] = handler;
  }

  function removeOne(obj, type, fn, context, id) {
  	id = id || type + stamp(fn) + (context ? '_' + stamp(context) : '');
  	var handler = obj[eventsKey] && obj[eventsKey][id];

  	if (!handler) { return this; }

  	if (!Browser.touchNative && Browser.pointer && type.indexOf('touch') === 0) {
  		removePointerListener(obj, type, handler);

  	} else if (Browser.touch && (type === 'dblclick')) {
  		removeDoubleTapListener(obj, handler);

  	} else if ('removeEventListener' in obj) {

  		obj.removeEventListener(mouseSubst[type] || type, handler, false);

  	} else {
  		obj.detachEvent('on' + type, handler);
  	}

  	obj[eventsKey][id] = null;
  }

  // @function stopPropagation(ev: DOMEvent): this
  // Stop the given event from propagation to parent elements. Used inside the listener functions:
  // ```js
  // L.DomEvent.on(div, 'click', function (ev) {
  // 	L.DomEvent.stopPropagation(ev);
  // });
  // ```
  function stopPropagation(e) {

  	if (e.stopPropagation) {
  		e.stopPropagation();
  	} else if (e.originalEvent) {  // In case of Leaflet event.
  		e.originalEvent._stopped = true;
  	} else {
  		e.cancelBubble = true;
  	}

  	return this;
  }

  // @function disableScrollPropagation(el: HTMLElement): this
  // Adds `stopPropagation` to the element's `'wheel'` events (plus browser variants).
  function disableScrollPropagation(el) {
  	addOne(el, 'wheel', stopPropagation);
  	return this;
  }

  // @function disableClickPropagation(el: HTMLElement): this
  // Adds `stopPropagation` to the element's `'click'`, `'dblclick'`, `'contextmenu'`,
  // `'mousedown'` and `'touchstart'` events (plus browser variants).
  function disableClickPropagation(el) {
  	on(el, 'mousedown touchstart dblclick contextmenu', stopPropagation);
  	el['_leaflet_disable_click'] = true;
  	return this;
  }

  // @function preventDefault(ev: DOMEvent): this
  // Prevents the default action of the DOM Event `ev` from happening (such as
  // following a link in the href of the a element, or doing a POST request
  // with page reload when a `<form>` is submitted).
  // Use it inside listener functions.
  function preventDefault(e) {
  	if (e.preventDefault) {
  		e.preventDefault();
  	} else {
  		e.returnValue = false;
  	}
  	return this;
  }

  // @function stop(ev: DOMEvent): this
  // Does `stopPropagation` and `preventDefault` at the same time.
  function stop(e) {
  	preventDefault(e);
  	stopPropagation(e);
  	return this;
  }

  // @function getPropagationPath(ev: DOMEvent): Array
  // Compatibility polyfill for [`Event.composedPath()`](https://developer.mozilla.org/en-US/docs/Web/API/Event/composedPath).
  // Returns an array containing the `HTMLElement`s that the given DOM event
  // should propagate to (if not stopped).
  function getPropagationPath(ev) {
  	if (ev.composedPath) {
  		return ev.composedPath();
  	}

  	var path = [];
  	var el = ev.target;

  	while (el) {
  		path.push(el);
  		el = el.parentNode;
  	}
  	return path;
  }


  // @function getMousePosition(ev: DOMEvent, container?: HTMLElement): Point
  // Gets normalized mouse position from a DOM event relative to the
  // `container` (border excluded) or to the whole page if not specified.
  function getMousePosition(e, container) {
  	if (!container) {
  		return new Point(e.clientX, e.clientY);
  	}

  	var scale = getScale(container),
  	    offset = scale.boundingClientRect; // left and top  values are in page scale (like the event clientX/Y)

  	return new Point(
  		// offset.left/top values are in page scale (like clientX/Y),
  		// whereas clientLeft/Top (border width) values are the original values (before CSS scale applies).
  		(e.clientX - offset.left) / scale.x - container.clientLeft,
  		(e.clientY - offset.top) / scale.y - container.clientTop
  	);
  }


  //  except , Safari and
  // We need double the scroll pixels (see #7403 and #4538) for all Browsers
  // except OSX (Mac) -> 3x, Chrome running on Linux 1x

  var wheelPxFactor =
  	(Browser.linux && Browser.chrome) ? window.devicePixelRatio :
  	Browser.mac ? window.devicePixelRatio * 3 :
  	window.devicePixelRatio > 0 ? 2 * window.devicePixelRatio : 1;
  // @function getWheelDelta(ev: DOMEvent): Number
  // Gets normalized wheel delta from a wheel DOM event, in vertical
  // pixels scrolled (negative if scrolling down).
  // Events from pointing devices without precise scrolling are mapped to
  // a best guess of 60 pixels.
  function getWheelDelta(e) {
  	return (Browser.edge) ? e.wheelDeltaY / 2 : // Don't trust window-geometry-based delta
  	       (e.deltaY && e.deltaMode === 0) ? -e.deltaY / wheelPxFactor : // Pixels
  	       (e.deltaY && e.deltaMode === 1) ? -e.deltaY * 20 : // Lines
  	       (e.deltaY && e.deltaMode === 2) ? -e.deltaY * 60 : // Pages
  	       (e.deltaX || e.deltaZ) ? 0 :	// Skip horizontal/depth wheel events
  	       e.wheelDelta ? (e.wheelDeltaY || e.wheelDelta) / 2 : // Legacy IE pixels
  	       (e.detail && Math.abs(e.detail) < 32765) ? -e.detail * 20 : // Legacy Moz lines
  	       e.detail ? e.detail / -32765 * 60 : // Legacy Moz pages
  	       0;
  }

  // check if element really left/entered the event target (for mouseenter/mouseleave)
  function isExternalTarget(el, e) {

  	var related = e.relatedTarget;

  	if (!related) { return true; }

  	try {
  		while (related && (related !== el)) {
  			related = related.parentNode;
  		}
  	} catch (err) {
  		return false;
  	}
  	return (related !== el);
  }

  var DomEvent = {
    __proto__: null,
    on: on,
    off: off,
    stopPropagation: stopPropagation,
    disableScrollPropagation: disableScrollPropagation,
    disableClickPropagation: disableClickPropagation,
    preventDefault: preventDefault,
    stop: stop,
    getPropagationPath: getPropagationPath,
    getMousePosition: getMousePosition,
    getWheelDelta: getWheelDelta,
    isExternalTarget: isExternalTarget,
    addListener: on,
    removeListener: off
  };

  /*
   * @class PosAnimation
   * @aka L.PosAnimation
   * @inherits Evented
   * Used internally for panning animations, utilizing CSS3 Transitions for modern browsers and a timer fallback for IE6-9.
   *
   * @example
   * ```js
   * var myPositionMarker = L.marker([48.864716, 2.294694]).addTo(map);
   *
   * myPositionMarker.on("click", function() {
   * 	var pos = map.latLngToLayerPoint(myPositionMarker.getLatLng());
   * 	pos.y -= 25;
   * 	var fx = new L.PosAnimation();
   *
   * 	fx.once('end',function() {
   * 		pos.y += 25;
   * 		fx.run(myPositionMarker._icon, pos, 0.8);
   * 	});
   *
   * 	fx.run(myPositionMarker._icon, pos, 0.3);
   * });
   *
   * ```
   *
   * @constructor L.PosAnimation()
   * Creates a `PosAnimation` object.
   *
   */

  var PosAnimation = Evented.extend({

  	// @method run(el: HTMLElement, newPos: Point, duration?: Number, easeLinearity?: Number)
  	// Run an animation of a given element to a new position, optionally setting
  	// duration in seconds (`0.25` by default) and easing linearity factor (3rd
  	// argument of the [cubic bezier curve](https://cubic-bezier.com/#0,0,.5,1),
  	// `0.5` by default).
  	run: function (el, newPos, duration, easeLinearity) {
  		this.stop();

  		this._el = el;
  		this._inProgress = true;
  		this._duration = duration || 0.25;
  		this._easeOutPower = 1 / Math.max(easeLinearity || 0.5, 0.2);

  		this._startPos = getPosition(el);
  		this._offset = newPos.subtract(this._startPos);
  		this._startTime = +new Date();

  		// @event start: Event
  		// Fired when the animation starts
  		this.fire('start');

  		this._animate();
  	},

  	// @method stop()
  	// Stops the animation (if currently running).
  	stop: function () {
  		if (!this._inProgress) { return; }

  		this._step(true);
  		this._complete();
  	},

  	_animate: function () {
  		// animation loop
  		this._animId = requestAnimFrame(this._animate, this);
  		this._step();
  	},

  	_step: function (round) {
  		var elapsed = (+new Date()) - this._startTime,
  		    duration = this._duration * 1000;

  		if (elapsed < duration) {
  			this._runFrame(this._easeOut(elapsed / duration), round);
  		} else {
  			this._runFrame(1);
  			this._complete();
  		}
  	},

  	_runFrame: function (progress, round) {
  		var pos = this._startPos.add(this._offset.multiplyBy(progress));
  		if (round) {
  			pos._round();
  		}
  		setPosition(this._el, pos);

  		// @event step: Event
  		// Fired continuously during the animation.
  		this.fire('step');
  	},

  	_complete: function () {
  		cancelAnimFrame(this._animId);

  		this._inProgress = false;
  		// @event end: Event
  		// Fired when the animation ends.
  		this.fire('end');
  	},

  	_easeOut: function (t) {
  		return 1 - Math.pow(1 - t, this._easeOutPower);
  	}
  });

  /*
   * @class Map
   * @aka L.Map
   * @inherits Evented
   *
   * The central class of the API — it is used to create a map on a page and manipulate it.
   *
   * @example
   *
   * ```js
   * // initialize the map on the "map" div with a given center and zoom
   * var map = L.map('map', {
   * 	center: [51.505, -0.09],
   * 	zoom: 13
   * });
   * ```
   *
   */

  var Map = Evented.extend({

  	options: {
  		// @section Map State Options
  		// @option crs: CRS = L.CRS.EPSG3857
  		// The [Coordinate Reference System](#crs) to use. Don't change this if you're not
  		// sure what it means.
  		crs: EPSG3857,

  		// @option center: LatLng = undefined
  		// Initial geographic center of the map
  		center: undefined,

  		// @option zoom: Number = undefined
  		// Initial map zoom level
  		zoom: undefined,

  		// @option minZoom: Number = *
  		// Minimum zoom level of the map.
  		// If not specified and at least one `GridLayer` or `TileLayer` is in the map,
  		// the lowest of their `minZoom` options will be used instead.
  		minZoom: undefined,

  		// @option maxZoom: Number = *
  		// Maximum zoom level of the map.
  		// If not specified and at least one `GridLayer` or `TileLayer` is in the map,
  		// the highest of their `maxZoom` options will be used instead.
  		maxZoom: undefined,

  		// @option layers: Layer[] = []
  		// Array of layers that will be added to the map initially
  		layers: [],

  		// @option maxBounds: LatLngBounds = null
  		// When this option is set, the map restricts the view to the given
  		// geographical bounds, bouncing the user back if the user tries to pan
  		// outside the view. To set the restriction dynamically, use
  		// [`setMaxBounds`](#map-setmaxbounds) method.
  		maxBounds: undefined,

  		// @option renderer: Renderer = *
  		// The default method for drawing vector layers on the map. `L.SVG`
  		// or `L.Canvas` by default depending on browser support.
  		renderer: undefined,


  		// @section Animation Options
  		// @option zoomAnimation: Boolean = true
  		// Whether the map zoom animation is enabled. By default it's enabled
  		// in all browsers that support CSS3 Transitions except Android.
  		zoomAnimation: true,

  		// @option zoomAnimationThreshold: Number = 4
  		// Won't animate zoom if the zoom difference exceeds this value.
  		zoomAnimationThreshold: 4,

  		// @option fadeAnimation: Boolean = true
  		// Whether the tile fade animation is enabled. By default it's enabled
  		// in all browsers that support CSS3 Transitions except Android.
  		fadeAnimation: true,

  		// @option markerZoomAnimation: Boolean = true
  		// Whether markers animate their zoom with the zoom animation, if disabled
  		// they will disappear for the length of the animation. By default it's
  		// enabled in all browsers that support CSS3 Transitions except Android.
  		markerZoomAnimation: true,

  		// @option transform3DLimit: Number = 2^23
  		// Defines the maximum size of a CSS translation transform. The default
  		// value should not be changed unless a web browser positions layers in
  		// the wrong place after doing a large `panBy`.
  		transform3DLimit: 8388608, // Precision limit of a 32-bit float

  		// @section Interaction Options
  		// @option zoomSnap: Number = 1
  		// Forces the map's zoom level to always be a multiple of this, particularly
  		// right after a [`fitBounds()`](#map-fitbounds) or a pinch-zoom.
  		// By default, the zoom level snaps to the nearest integer; lower values
  		// (e.g. `0.5` or `0.1`) allow for greater granularity. A value of `0`
  		// means the zoom level will not be snapped after `fitBounds` or a pinch-zoom.
  		zoomSnap: 1,

  		// @option zoomDelta: Number = 1
  		// Controls how much the map's zoom level will change after a
  		// [`zoomIn()`](#map-zoomin), [`zoomOut()`](#map-zoomout), pressing `+`
  		// or `-` on the keyboard, or using the [zoom controls](#control-zoom).
  		// Values smaller than `1` (e.g. `0.5`) allow for greater granularity.
  		zoomDelta: 1,

  		// @option trackResize: Boolean = true
  		// Whether the map automatically handles browser window resize to update itself.
  		trackResize: true
  	},

  	initialize: function (id, options) { // (HTMLElement or String, Object)
  		options = setOptions(this, options);

  		// Make sure to assign internal flags at the beginning,
  		// to avoid inconsistent state in some edge cases.
  		this._handlers = [];
  		this._layers = {};
  		this._zoomBoundLayers = {};
  		this._sizeChanged = true;

  		this._initContainer(id);
  		this._initLayout();

  		// hack for https://github.com/Leaflet/Leaflet/issues/1980
  		this._onResize = bind(this._onResize, this);

  		this._initEvents();

  		if (options.maxBounds) {
  			this.setMaxBounds(options.maxBounds);
  		}

  		if (options.zoom !== undefined) {
  			this._zoom = this._limitZoom(options.zoom);
  		}

  		if (options.center && options.zoom !== undefined) {
  			this.setView(toLatLng(options.center), options.zoom, {reset: true});
  		}

  		this.callInitHooks();

  		// don't animate on browsers without hardware-accelerated transitions or old Android/Opera
  		this._zoomAnimated = TRANSITION && Browser.any3d && !Browser.mobileOpera &&
  				this.options.zoomAnimation;

  		// zoom transitions run with the same duration for all layers, so if one of transitionend events
  		// happens after starting zoom animation (propagating to the map pane), we know that it ended globally
  		if (this._zoomAnimated) {
  			this._createAnimProxy();
  			on(this._proxy, TRANSITION_END, this._catchTransitionEnd, this);
  		}

  		this._addLayers(this.options.layers);
  	},


  	// @section Methods for modifying map state

  	// @method setView(center: LatLng, zoom: Number, options?: Zoom/pan options): this
  	// Sets the view of the map (geographical center and zoom) with the given
  	// animation options.
  	setView: function (center, zoom, options) {

  		zoom = zoom === undefined ? this._zoom : this._limitZoom(zoom);
  		center = this._limitCenter(toLatLng(center), zoom, this.options.maxBounds);
  		options = options || {};

  		this._stop();

  		if (this._loaded && !options.reset && options !== true) {

  			if (options.animate !== undefined) {
  				options.zoom = extend({animate: options.animate}, options.zoom);
  				options.pan = extend({animate: options.animate, duration: options.duration}, options.pan);
  			}

  			// try animating pan or zoom
  			var moved = (this._zoom !== zoom) ?
  				this._tryAnimatedZoom && this._tryAnimatedZoom(center, zoom, options.zoom) :
  				this._tryAnimatedPan(center, options.pan);

  			if (moved) {
  				// prevent resize handler call, the view will refresh after animation anyway
  				clearTimeout(this._sizeTimer);
  				return this;
  			}
  		}

  		// animation didn't start, just reset the map view
  		this._resetView(center, zoom, options.pan && options.pan.noMoveStart);

  		return this;
  	},

  	// @method setZoom(zoom: Number, options?: Zoom/pan options): this
  	// Sets the zoom of the map.
  	setZoom: function (zoom, options) {
  		if (!this._loaded) {
  			this._zoom = zoom;
  			return this;
  		}
  		return this.setView(this.getCenter(), zoom, {zoom: options});
  	},

  	// @method zoomIn(delta?: Number, options?: Zoom options): this
  	// Increases the zoom of the map by `delta` ([`zoomDelta`](#map-zoomdelta) by default).
  	zoomIn: function (delta, options) {
  		delta = delta || (Browser.any3d ? this.options.zoomDelta : 1);
  		return this.setZoom(this._zoom + delta, options);
  	},

  	// @method zoomOut(delta?: Number, options?: Zoom options): this
  	// Decreases the zoom of the map by `delta` ([`zoomDelta`](#map-zoomdelta) by default).
  	zoomOut: function (delta, options) {
  		delta = delta || (Browser.any3d ? this.options.zoomDelta : 1);
  		return this.setZoom(this._zoom - delta, options);
  	},

  	// @method setZoomAround(latlng: LatLng, zoom: Number, options: Zoom options): this
  	// Zooms the map while keeping a specified geographical point on the map
  	// stationary (e.g. used internally for scroll zoom and double-click zoom).
  	// @alternative
  	// @method setZoomAround(offset: Point, zoom: Number, options: Zoom options): this
  	// Zooms the map while keeping a specified pixel on the map (relative to the top-left corner) stationary.
  	setZoomAround: function (latlng, zoom, options) {
  		var scale = this.getZoomScale(zoom),
  		    viewHalf = this.getSize().divideBy(2),
  		    containerPoint = latlng instanceof Point ? latlng : this.latLngToContainerPoint(latlng),

  		    centerOffset = containerPoint.subtract(viewHalf).multiplyBy(1 - 1 / scale),
  		    newCenter = this.containerPointToLatLng(viewHalf.add(centerOffset));

  		return this.setView(newCenter, zoom, {zoom: options});
  	},

  	_getBoundsCenterZoom: function (bounds, options) {

  		options = options || {};
  		bounds = bounds.getBounds ? bounds.getBounds() : toLatLngBounds(bounds);

  		var paddingTL = toPoint(options.paddingTopLeft || options.padding || [0, 0]),
  		    paddingBR = toPoint(options.paddingBottomRight || options.padding || [0, 0]),

  		    zoom = this.getBoundsZoom(bounds, false, paddingTL.add(paddingBR));

  		zoom = (typeof options.maxZoom === 'number') ? Math.min(options.maxZoom, zoom) : zoom;

  		if (zoom === Infinity) {
  			return {
  				center: bounds.getCenter(),
  				zoom: zoom
  			};
  		}

  		var paddingOffset = paddingBR.subtract(paddingTL).divideBy(2),

  		    swPoint = this.project(bounds.getSouthWest(), zoom),
  		    nePoint = this.project(bounds.getNorthEast(), zoom),
  		    center = this.unproject(swPoint.add(nePoint).divideBy(2).add(paddingOffset), zoom);

  		return {
  			center: center,
  			zoom: zoom
  		};
  	},

  	// @method fitBounds(bounds: LatLngBounds, options?: fitBounds options): this
  	// Sets a map view that contains the given geographical bounds with the
  	// maximum zoom level possible.
  	fitBounds: function (bounds, options) {

  		bounds = toLatLngBounds(bounds);

  		if (!bounds.isValid()) {
  			throw new Error('Bounds are not valid.');
  		}

  		var target = this._getBoundsCenterZoom(bounds, options);
  		return this.setView(target.center, target.zoom, options);
  	},

  	// @method fitWorld(options?: fitBounds options): this
  	// Sets a map view that mostly contains the whole world with the maximum
  	// zoom level possible.
  	fitWorld: function (options) {
  		return this.fitBounds([[-90, -180], [90, 180]], options);
  	},

  	// @method panTo(latlng: LatLng, options?: Pan options): this
  	// Pans the map to a given center.
  	panTo: function (center, options) { // (LatLng)
  		return this.setView(center, this._zoom, {pan: options});
  	},

  	// @method panBy(offset: Point, options?: Pan options): this
  	// Pans the map by a given number of pixels (animated).
  	panBy: function (offset, options) {
  		offset = toPoint(offset).round();
  		options = options || {};

  		if (!offset.x && !offset.y) {
  			return this.fire('moveend');
  		}
  		// If we pan too far, Chrome gets issues with tiles
  		// and makes them disappear or appear in the wrong place (slightly offset) #2602
  		if (options.animate !== true && !this.getSize().contains(offset)) {
  			this._resetView(this.unproject(this.project(this.getCenter()).add(offset)), this.getZoom());
  			return this;
  		}

  		if (!this._panAnim) {
  			this._panAnim = new PosAnimation();

  			this._panAnim.on({
  				'step': this._onPanTransitionStep,
  				'end': this._onPanTransitionEnd
  			}, this);
  		}

  		// don't fire movestart if animating inertia
  		if (!options.noMoveStart) {
  			this.fire('movestart');
  		}

  		// animate pan unless animate: false specified
  		if (options.animate !== false) {
  			addClass(this._mapPane, 'leaflet-pan-anim');

  			var newPos = this._getMapPanePos().subtract(offset).round();
  			this._panAnim.run(this._mapPane, newPos, options.duration || 0.25, options.easeLinearity);
  		} else {
  			this._rawPanBy(offset);
  			this.fire('move').fire('moveend');
  		}

  		return this;
  	},

  	// @method flyTo(latlng: LatLng, zoom?: Number, options?: Zoom/pan options): this
  	// Sets the view of the map (geographical center and zoom) performing a smooth
  	// pan-zoom animation.
  	flyTo: function (targetCenter, targetZoom, options) {

  		options = options || {};
  		if (options.animate === false || !Browser.any3d) {
  			return this.setView(targetCenter, targetZoom, options);
  		}

  		this._stop();

  		var from = this.project(this.getCenter()),
  		    to = this.project(targetCenter),
  		    size = this.getSize(),
  		    startZoom = this._zoom;

  		targetCenter = toLatLng(targetCenter);
  		targetZoom = targetZoom === undefined ? startZoom : targetZoom;

  		var w0 = Math.max(size.x, size.y),
  		    w1 = w0 * this.getZoomScale(startZoom, targetZoom),
  		    u1 = (to.distanceTo(from)) || 1,
  		    rho = 1.42,
  		    rho2 = rho * rho;

  		function r(i) {
  			var s1 = i ? -1 : 1,
  			    s2 = i ? w1 : w0,
  			    t1 = w1 * w1 - w0 * w0 + s1 * rho2 * rho2 * u1 * u1,
  			    b1 = 2 * s2 * rho2 * u1,
  			    b = t1 / b1,
  			    sq = Math.sqrt(b * b + 1) - b;

  			    // workaround for floating point precision bug when sq = 0, log = -Infinite,
  			    // thus triggering an infinite loop in flyTo
  			    var log = sq < 0.000000001 ? -18 : Math.log(sq);

  			return log;
  		}

  		function sinh(n) { return (Math.exp(n) - Math.exp(-n)) / 2; }
  		function cosh(n) { return (Math.exp(n) + Math.exp(-n)) / 2; }
  		function tanh(n) { return sinh(n) / cosh(n); }

  		var r0 = r(0);

  		function w(s) { return w0 * (cosh(r0) / cosh(r0 + rho * s)); }
  		function u(s) { return w0 * (cosh(r0) * tanh(r0 + rho * s) - sinh(r0)) / rho2; }

  		function easeOut(t) { return 1 - Math.pow(1 - t, 1.5); }

  		var start = Date.now(),
  		    S = (r(1) - r0) / rho,
  		    duration = options.duration ? 1000 * options.duration : 1000 * S * 0.8;

  		function frame() {
  			var t = (Date.now() - start) / duration,
  			    s = easeOut(t) * S;

  			if (t <= 1) {
  				this._flyToFrame = requestAnimFrame(frame, this);

  				this._move(
  					this.unproject(from.add(to.subtract(from).multiplyBy(u(s) / u1)), startZoom),
  					this.getScaleZoom(w0 / w(s), startZoom),
  					{flyTo: true});

  			} else {
  				this
  					._move(targetCenter, targetZoom)
  					._moveEnd(true);
  			}
  		}

  		this._moveStart(true, options.noMoveStart);

  		frame.call(this);
  		return this;
  	},

  	// @method flyToBounds(bounds: LatLngBounds, options?: fitBounds options): this
  	// Sets the view of the map with a smooth animation like [`flyTo`](#map-flyto),
  	// but takes a bounds parameter like [`fitBounds`](#map-fitbounds).
  	flyToBounds: function (bounds, options) {
  		var target = this._getBoundsCenterZoom(bounds, options);
  		return this.flyTo(target.center, target.zoom, options);
  	},

  	// @method setMaxBounds(bounds: LatLngBounds): this
  	// Restricts the map view to the given bounds (see the [maxBounds](#map-maxbounds) option).
  	setMaxBounds: function (bounds) {
  		bounds = toLatLngBounds(bounds);

  		if (this.listens('moveend', this._panInsideMaxBounds)) {
  			this.off('moveend', this._panInsideMaxBounds);
  		}

  		if (!bounds.isValid()) {
  			this.options.maxBounds = null;
  			return this;
  		}

  		this.options.maxBounds = bounds;

  		if (this._loaded) {
  			this._panInsideMaxBounds();
  		}

  		return this.on('moveend', this._panInsideMaxBounds);
  	},

  	// @method setMinZoom(zoom: Number): this
  	// Sets the lower limit for the available zoom levels (see the [minZoom](#map-minzoom) option).
  	setMinZoom: function (zoom) {
  		var oldZoom = this.options.minZoom;
  		this.options.minZoom = zoom;

  		if (this._loaded && oldZoom !== zoom) {
  			this.fire('zoomlevelschange');

  			if (this.getZoom() < this.options.minZoom) {
  				return this.setZoom(zoom);
  			}
  		}

  		return this;
  	},

  	// @method setMaxZoom(zoom: Number): this
  	// Sets the upper limit for the available zoom levels (see the [maxZoom](#map-maxzoom) option).
  	setMaxZoom: function (zoom) {
  		var oldZoom = this.options.maxZoom;
  		this.options.maxZoom = zoom;

  		if (this._loaded && oldZoom !== zoom) {
  			this.fire('zoomlevelschange');

  			if (this.getZoom() > this.options.maxZoom) {
  				return this.setZoom(zoom);
  			}
  		}

  		return this;
  	},

  	// @method panInsideBounds(bounds: LatLngBounds, options?: Pan options): this
  	// Pans the map to the closest view that would lie inside the given bounds (if it's not already), controlling the animation using the options specific, if any.
  	panInsideBounds: function (bounds, options) {
  		this._enforcingBounds = true;
  		var center = this.getCenter(),
  		    newCenter = this._limitCenter(center, this._zoom, toLatLngBounds(bounds));

  		if (!center.equals(newCenter)) {
  			this.panTo(newCenter, options);
  		}

  		this._enforcingBounds = false;
  		return this;
  	},

  	// @method panInside(latlng: LatLng, options?: padding options): this
  	// Pans the map the minimum amount to make the `latlng` visible. Use
  	// padding options to fit the display to more restricted bounds.
  	// If `latlng` is already within the (optionally padded) display bounds,
  	// the map will not be panned.
  	panInside: function (latlng, options) {
  		options = options || {};

  		var paddingTL = toPoint(options.paddingTopLeft || options.padding || [0, 0]),
  		    paddingBR = toPoint(options.paddingBottomRight || options.padding || [0, 0]),
  		    pixelCenter = this.project(this.getCenter()),
  		    pixelPoint = this.project(latlng),
  		    pixelBounds = this.getPixelBounds(),
  		    paddedBounds = toBounds([pixelBounds.min.add(paddingTL), pixelBounds.max.subtract(paddingBR)]),
  		    paddedSize = paddedBounds.getSize();

  		if (!paddedBounds.contains(pixelPoint)) {
  			this._enforcingBounds = true;
  			var centerOffset = pixelPoint.subtract(paddedBounds.getCenter());
  			var offset = paddedBounds.extend(pixelPoint).getSize().subtract(paddedSize);
  			pixelCenter.x += centerOffset.x < 0 ? -offset.x : offset.x;
  			pixelCenter.y += centerOffset.y < 0 ? -offset.y : offset.y;
  			this.panTo(this.unproject(pixelCenter), options);
  			this._enforcingBounds = false;
  		}
  		return this;
  	},

  	// @method invalidateSize(options: Zoom/pan options): this
  	// Checks if the map container size changed and updates the map if so —
  	// call it after you've changed the map size dynamically, also animating
  	// pan by default. If `options.pan` is `false`, panning will not occur.
  	// If `options.debounceMoveend` is `true`, it will delay `moveend` event so
  	// that it doesn't happen often even if the method is called many
  	// times in a row.

  	// @alternative
  	// @method invalidateSize(animate: Boolean): this
  	// Checks if the map container size changed and updates the map if so —
  	// call it after you've changed the map size dynamically, also animating
  	// pan by default.
  	invalidateSize: function (options) {
  		if (!this._loaded) { return this; }

  		options = extend({
  			animate: false,
  			pan: true
  		}, options === true ? {animate: true} : options);

  		var oldSize = this.getSize();
  		this._sizeChanged = true;
  		this._lastCenter = null;

  		var newSize = this.getSize(),
  		    oldCenter = oldSize.divideBy(2).round(),
  		    newCenter = newSize.divideBy(2).round(),
  		    offset = oldCenter.subtract(newCenter);

  		if (!offset.x && !offset.y) { return this; }

  		if (options.animate && options.pan) {
  			this.panBy(offset);

  		} else {
  			if (options.pan) {
  				this._rawPanBy(offset);
  			}

  			this.fire('move');

  			if (options.debounceMoveend) {
  				clearTimeout(this._sizeTimer);
  				this._sizeTimer = setTimeout(bind(this.fire, this, 'moveend'), 200);
  			} else {
  				this.fire('moveend');
  			}
  		}

  		// @section Map state change events
  		// @event resize: ResizeEvent
  		// Fired when the map is resized.
  		return this.fire('resize', {
  			oldSize: oldSize,
  			newSize: newSize
  		});
  	},

  	// @section Methods for modifying map state
  	// @method stop(): this
  	// Stops the currently running `panTo` or `flyTo` animation, if any.
  	stop: function () {
  		this.setZoom(this._limitZoom(this._zoom));
  		if (!this.options.zoomSnap) {
  			this.fire('viewreset');
  		}
  		return this._stop();
  	},

  	// @section Geolocation methods
  	// @method locate(options?: Locate options): this
  	// Tries to locate the user using the Geolocation API, firing a [`locationfound`](#map-locationfound)
  	// event with location data on success or a [`locationerror`](#map-locationerror) event on failure,
  	// and optionally sets the map view to the user's location with respect to
  	// detection accuracy (or to the world view if geolocation failed).
  	// Note that, if your page doesn't use HTTPS, this method will fail in
  	// modern browsers ([Chrome 50 and newer](https://sites.google.com/a/chromium.org/dev/Home/chromium-security/deprecating-powerful-features-on-insecure-origins))
  	// See `Locate options` for more details.
  	locate: function (options) {

  		options = this._locateOptions = extend({
  			timeout: 10000,
  			watch: false
  			// setView: false
  			// maxZoom: <Number>
  			// maximumAge: 0
  			// enableHighAccuracy: false
  		}, options);

  		if (!('geolocation' in navigator)) {
  			this._handleGeolocationError({
  				code: 0,
  				message: 'Geolocation not supported.'
  			});
  			return this;
  		}

  		var onResponse = bind(this._handleGeolocationResponse, this),
  		    onError = bind(this._handleGeolocationError, this);

  		if (options.watch) {
  			this._locationWatchId =
  			        navigator.geolocation.watchPosition(onResponse, onError, options);
  		} else {
  			navigator.geolocation.getCurrentPosition(onResponse, onError, options);
  		}
  		return this;
  	},

  	// @method stopLocate(): this
  	// Stops watching location previously initiated by `map.locate({watch: true})`
  	// and aborts resetting the map view if map.locate was called with
  	// `{setView: true}`.
  	stopLocate: function () {
  		if (navigator.geolocation && navigator.geolocation.clearWatch) {
  			navigator.geolocation.clearWatch(this._locationWatchId);
  		}
  		if (this._locateOptions) {
  			this._locateOptions.setView = false;
  		}
  		return this;
  	},

  	_handleGeolocationError: function (error) {
  		if (!this._container._leaflet_id) { return; }

  		var c = error.code,
  		    message = error.message ||
  		            (c === 1 ? 'permission denied' :
  		            (c === 2 ? 'position unavailable' : 'timeout'));

  		if (this._locateOptions.setView && !this._loaded) {
  			this.fitWorld();
  		}

  		// @section Location events
  		// @event locationerror: ErrorEvent
  		// Fired when geolocation (using the [`locate`](#map-locate) method) failed.
  		this.fire('locationerror', {
  			code: c,
  			message: 'Geolocation error: ' + message + '.'
  		});
  	},

  	_handleGeolocationResponse: function (pos) {
  		if (!this._container._leaflet_id) { return; }

  		var lat = pos.coords.latitude,
  		    lng = pos.coords.longitude,
  		    latlng = new LatLng(lat, lng),
  		    bounds = latlng.toBounds(pos.coords.accuracy * 2),
  		    options = this._locateOptions;

  		if (options.setView) {
  			var zoom = this.getBoundsZoom(bounds);
  			this.setView(latlng, options.maxZoom ? Math.min(zoom, options.maxZoom) : zoom);
  		}

  		var data = {
  			latlng: latlng,
  			bounds: bounds,
  			timestamp: pos.timestamp
  		};

  		for (var i in pos.coords) {
  			if (typeof pos.coords[i] === 'number') {
  				data[i] = pos.coords[i];
  			}
  		}

  		// @event locationfound: LocationEvent
  		// Fired when geolocation (using the [`locate`](#map-locate) method)
  		// went successfully.
  		this.fire('locationfound', data);
  	},

  	// TODO Appropriate docs section?
  	// @section Other Methods
  	// @method addHandler(name: String, HandlerClass: Function): this
  	// Adds a new `Handler` to the map, given its name and constructor function.
  	addHandler: function (name, HandlerClass) {
  		if (!HandlerClass) { return this; }

  		var handler = this[name] = new HandlerClass(this);

  		this._handlers.push(handler);

  		if (this.options[name]) {
  			handler.enable();
  		}

  		return this;
  	},

  	// @method remove(): this
  	// Destroys the map and clears all related event listeners.
  	remove: function () {

  		this._initEvents(true);
  		if (this.options.maxBounds) { this.off('moveend', this._panInsideMaxBounds); }

  		if (this._containerId !== this._container._leaflet_id) {
  			throw new Error('Map container is being reused by another instance');
  		}

  		try {
  			// throws error in IE6-8
  			delete this._container._leaflet_id;
  			delete this._containerId;
  		} catch (e) {
  			/*eslint-disable */
  			this._container._leaflet_id = undefined;
  			/* eslint-enable */
  			this._containerId = undefined;
  		}

  		if (this._locationWatchId !== undefined) {
  			this.stopLocate();
  		}

  		this._stop();

  		remove(this._mapPane);

  		if (this._clearControlPos) {
  			this._clearControlPos();
  		}
  		if (this._resizeRequest) {
  			cancelAnimFrame(this._resizeRequest);
  			this._resizeRequest = null;
  		}

  		this._clearHandlers();

  		if (this._loaded) {
  			// @section Map state change events
  			// @event unload: Event
  			// Fired when the map is destroyed with [remove](#map-remove) method.
  			this.fire('unload');
  		}

  		var i;
  		for (i in this._layers) {
  			this._layers[i].remove();
  		}
  		for (i in this._panes) {
  			remove(this._panes[i]);
  		}

  		this._layers = [];
  		this._panes = [];
  		delete this._mapPane;
  		delete this._renderer;

  		return this;
  	},

  	// @section Other Methods
  	// @method createPane(name: String, container?: HTMLElement): HTMLElement
  	// Creates a new [map pane](#map-pane) with the given name if it doesn't exist already,
  	// then returns it. The pane is created as a child of `container`, or
  	// as a child of the main map pane if not set.
  	createPane: function (name, container) {
  		var className = 'leaflet-pane' + (name ? ' leaflet-' + name.replace('Pane', '') + '-pane' : ''),
  		    pane = create$1('div', className, container || this._mapPane);

  		if (name) {
  			this._panes[name] = pane;
  		}
  		return pane;
  	},

  	// @section Methods for Getting Map State

  	// @method getCenter(): LatLng
  	// Returns the geographical center of the map view
  	getCenter: function () {
  		this._checkIfLoaded();

  		if (this._lastCenter && !this._moved()) {
  			return this._lastCenter.clone();
  		}
  		return this.layerPointToLatLng(this._getCenterLayerPoint());
  	},

  	// @method getZoom(): Number
  	// Returns the current zoom level of the map view
  	getZoom: function () {
  		return this._zoom;
  	},

  	// @method getBounds(): LatLngBounds
  	// Returns the geographical bounds visible in the current map view
  	getBounds: function () {
  		var bounds = this.getPixelBounds(),
  		    sw = this.unproject(bounds.getBottomLeft()),
  		    ne = this.unproject(bounds.getTopRight());

  		return new LatLngBounds(sw, ne);
  	},

  	// @method getMinZoom(): Number
  	// Returns the minimum zoom level of the map (if set in the `minZoom` option of the map or of any layers), or `0` by default.
  	getMinZoom: function () {
  		return this.options.minZoom === undefined ? this._layersMinZoom || 0 : this.options.minZoom;
  	},

  	// @method getMaxZoom(): Number
  	// Returns the maximum zoom level of the map (if set in the `maxZoom` option of the map or of any layers).
  	getMaxZoom: function () {
  		return this.options.maxZoom === undefined ?
  			(this._layersMaxZoom === undefined ? Infinity : this._layersMaxZoom) :
  			this.options.maxZoom;
  	},

  	// @method getBoundsZoom(bounds: LatLngBounds, inside?: Boolean, padding?: Point): Number
  	// Returns the maximum zoom level on which the given bounds fit to the map
  	// view in its entirety. If `inside` (optional) is set to `true`, the method
  	// instead returns the minimum zoom level on which the map view fits into
  	// the given bounds in its entirety.
  	getBoundsZoom: function (bounds, inside, padding) { // (LatLngBounds[, Boolean, Point]) -> Number
  		bounds = toLatLngBounds(bounds);
  		padding = toPoint(padding || [0, 0]);

  		var zoom = this.getZoom() || 0,
  		    min = this.getMinZoom(),
  		    max = this.getMaxZoom(),
  		    nw = bounds.getNorthWest(),
  		    se = bounds.getSouthEast(),
  		    size = this.getSize().subtract(padding),
  		    boundsSize = toBounds(this.project(se, zoom), this.project(nw, zoom)).getSize(),
  		    snap = Browser.any3d ? this.options.zoomSnap : 1,
  		    scalex = size.x / boundsSize.x,
  		    scaley = size.y / boundsSize.y,
  		    scale = inside ? Math.max(scalex, scaley) : Math.min(scalex, scaley);

  		zoom = this.getScaleZoom(scale, zoom);

  		if (snap) {
  			zoom = Math.round(zoom / (snap / 100)) * (snap / 100); // don't jump if within 1% of a snap level
  			zoom = inside ? Math.ceil(zoom / snap) * snap : Math.floor(zoom / snap) * snap;
  		}

  		return Math.max(min, Math.min(max, zoom));
  	},

  	// @method getSize(): Point
  	// Returns the current size of the map container (in pixels).
  	getSize: function () {
  		if (!this._size || this._sizeChanged) {
  			this._size = new Point(
  				this._container.clientWidth || 0,
  				this._container.clientHeight || 0);

  			this._sizeChanged = false;
  		}
  		return this._size.clone();
  	},

  	// @method getPixelBounds(): Bounds
  	// Returns the bounds of the current map view in projected pixel
  	// coordinates (sometimes useful in layer and overlay implementations).
  	getPixelBounds: function (center, zoom) {
  		var topLeftPoint = this._getTopLeftPoint(center, zoom);
  		return new Bounds(topLeftPoint, topLeftPoint.add(this.getSize()));
  	},

  	// TODO: Check semantics - isn't the pixel origin the 0,0 coord relative to
  	// the map pane? "left point of the map layer" can be confusing, specially
  	// since there can be negative offsets.
  	// @method getPixelOrigin(): Point
  	// Returns the projected pixel coordinates of the top left point of
  	// the map layer (useful in custom layer and overlay implementations).
  	getPixelOrigin: function () {
  		this._checkIfLoaded();
  		return this._pixelOrigin;
  	},

  	// @method getPixelWorldBounds(zoom?: Number): Bounds
  	// Returns the world's bounds in pixel coordinates for zoom level `zoom`.
  	// If `zoom` is omitted, the map's current zoom level is used.
  	getPixelWorldBounds: function (zoom) {
  		return this.options.crs.getProjectedBounds(zoom === undefined ? this.getZoom() : zoom);
  	},

  	// @section Other Methods

  	// @method getPane(pane: String|HTMLElement): HTMLElement
  	// Returns a [map pane](#map-pane), given its name or its HTML element (its identity).
  	getPane: function (pane) {
  		return typeof pane === 'string' ? this._panes[pane] : pane;
  	},

  	// @method getPanes(): Object
  	// Returns a plain object containing the names of all [panes](#map-pane) as keys and
  	// the panes as values.
  	getPanes: function () {
  		return this._panes;
  	},

  	// @method getContainer: HTMLElement
  	// Returns the HTML element that contains the map.
  	getContainer: function () {
  		return this._container;
  	},


  	// @section Conversion Methods

  	// @method getZoomScale(toZoom: Number, fromZoom: Number): Number
  	// Returns the scale factor to be applied to a map transition from zoom level
  	// `fromZoom` to `toZoom`. Used internally to help with zoom animations.
  	getZoomScale: function (toZoom, fromZoom) {
  		// TODO replace with universal implementation after refactoring projections
  		var crs = this.options.crs;
  		fromZoom = fromZoom === undefined ? this._zoom : fromZoom;
  		return crs.scale(toZoom) / crs.scale(fromZoom);
  	},

  	// @method getScaleZoom(scale: Number, fromZoom: Number): Number
  	// Returns the zoom level that the map would end up at, if it is at `fromZoom`
  	// level and everything is scaled by a factor of `scale`. Inverse of
  	// [`getZoomScale`](#map-getZoomScale).
  	getScaleZoom: function (scale, fromZoom) {
  		var crs = this.options.crs;
  		fromZoom = fromZoom === undefined ? this._zoom : fromZoom;
  		var zoom = crs.zoom(scale * crs.scale(fromZoom));
  		return isNaN(zoom) ? Infinity : zoom;
  	},

  	// @method project(latlng: LatLng, zoom: Number): Point
  	// Projects a geographical coordinate `LatLng` according to the projection
  	// of the map's CRS, then scales it according to `zoom` and the CRS's
  	// `Transformation`. The result is pixel coordinate relative to
  	// the CRS origin.
  	project: function (latlng, zoom) {
  		zoom = zoom === undefined ? this._zoom : zoom;
  		return this.options.crs.latLngToPoint(toLatLng(latlng), zoom);
  	},

  	// @method unproject(point: Point, zoom: Number): LatLng
  	// Inverse of [`project`](#map-project).
  	unproject: function (point, zoom) {
  		zoom = zoom === undefined ? this._zoom : zoom;
  		return this.options.crs.pointToLatLng(toPoint(point), zoom);
  	},

  	// @method layerPointToLatLng(point: Point): LatLng
  	// Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
  	// returns the corresponding geographical coordinate (for the current zoom level).
  	layerPointToLatLng: function (point) {
  		var projectedPoint = toPoint(point).add(this.getPixelOrigin());
  		return this.unproject(projectedPoint);
  	},

  	// @method latLngToLayerPoint(latlng: LatLng): Point
  	// Given a geographical coordinate, returns the corresponding pixel coordinate
  	// relative to the [origin pixel](#map-getpixelorigin).
  	latLngToLayerPoint: function (latlng) {
  		var projectedPoint = this.project(toLatLng(latlng))._round();
  		return projectedPoint._subtract(this.getPixelOrigin());
  	},

  	// @method wrapLatLng(latlng: LatLng): LatLng
  	// Returns a `LatLng` where `lat` and `lng` has been wrapped according to the
  	// map's CRS's `wrapLat` and `wrapLng` properties, if they are outside the
  	// CRS's bounds.
  	// By default this means longitude is wrapped around the dateline so its
  	// value is between -180 and +180 degrees.
  	wrapLatLng: function (latlng) {
  		return this.options.crs.wrapLatLng(toLatLng(latlng));
  	},

  	// @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
  	// Returns a `LatLngBounds` with the same size as the given one, ensuring that
  	// its center is within the CRS's bounds.
  	// By default this means the center longitude is wrapped around the dateline so its
  	// value is between -180 and +180 degrees, and the majority of the bounds
  	// overlaps the CRS's bounds.
  	wrapLatLngBounds: function (latlng) {
  		return this.options.crs.wrapLatLngBounds(toLatLngBounds(latlng));
  	},

  	// @method distance(latlng1: LatLng, latlng2: LatLng): Number
  	// Returns the distance between two geographical coordinates according to
  	// the map's CRS. By default this measures distance in meters.
  	distance: function (latlng1, latlng2) {
  		return this.options.crs.distance(toLatLng(latlng1), toLatLng(latlng2));
  	},

  	// @method containerPointToLayerPoint(point: Point): Point
  	// Given a pixel coordinate relative to the map container, returns the corresponding
  	// pixel coordinate relative to the [origin pixel](#map-getpixelorigin).
  	containerPointToLayerPoint: function (point) { // (Point)
  		return toPoint(point).subtract(this._getMapPanePos());
  	},

  	// @method layerPointToContainerPoint(point: Point): Point
  	// Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
  	// returns the corresponding pixel coordinate relative to the map container.
  	layerPointToContainerPoint: function (point) { // (Point)
  		return toPoint(point).add(this._getMapPanePos());
  	},

  	// @method containerPointToLatLng(point: Point): LatLng
  	// Given a pixel coordinate relative to the map container, returns
  	// the corresponding geographical coordinate (for the current zoom level).
  	containerPointToLatLng: function (point) {
  		var layerPoint = this.containerPointToLayerPoint(toPoint(point));
  		return this.layerPointToLatLng(layerPoint);
  	},

  	// @method latLngToContainerPoint(latlng: LatLng): Point
  	// Given a geographical coordinate, returns the corresponding pixel coordinate
  	// relative to the map container.
  	latLngToContainerPoint: function (latlng) {
  		return this.layerPointToContainerPoint(this.latLngToLayerPoint(toLatLng(latlng)));
  	},

  	// @method mouseEventToContainerPoint(ev: MouseEvent): Point
  	// Given a MouseEvent object, returns the pixel coordinate relative to the
  	// map container where the event took place.
  	mouseEventToContainerPoint: function (e) {
  		return getMousePosition(e, this._container);
  	},

  	// @method mouseEventToLayerPoint(ev: MouseEvent): Point
  	// Given a MouseEvent object, returns the pixel coordinate relative to
  	// the [origin pixel](#map-getpixelorigin) where the event took place.
  	mouseEventToLayerPoint: function (e) {
  		return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(e));
  	},

  	// @method mouseEventToLatLng(ev: MouseEvent): LatLng
  	// Given a MouseEvent object, returns geographical coordinate where the
  	// event took place.
  	mouseEventToLatLng: function (e) { // (MouseEvent)
  		return this.layerPointToLatLng(this.mouseEventToLayerPoint(e));
  	},


  	// map initialization methods

  	_initContainer: function (id) {
  		var container = this._container = get(id);

  		if (!container) {
  			throw new Error('Map container not found.');
  		} else if (container._leaflet_id) {
  			throw new Error('Map container is already initialized.');
  		}

  		on(container, 'scroll', this._onScroll, this);
  		this._containerId = stamp(container);
  	},

  	_initLayout: function () {
  		var container = this._container;

  		this._fadeAnimated = this.options.fadeAnimation && Browser.any3d;

  		addClass(container, 'leaflet-container' +
  			(Browser.touch ? ' leaflet-touch' : '') +
  			(Browser.retina ? ' leaflet-retina' : '') +
  			(Browser.ielt9 ? ' leaflet-oldie' : '') +
  			(Browser.safari ? ' leaflet-safari' : '') +
  			(this._fadeAnimated ? ' leaflet-fade-anim' : ''));

  		var position = getStyle(container, 'position');

  		if (position !== 'absolute' && position !== 'relative' && position !== 'fixed' && position !== 'sticky') {
  			container.style.position = 'relative';
  		}

  		this._initPanes();

  		if (this._initControlPos) {
  			this._initControlPos();
  		}
  	},

  	_initPanes: function () {
  		var panes = this._panes = {};
  		this._paneRenderers = {};

  		// @section
  		//
  		// Panes are DOM elements used to control the ordering of layers on the map. You
  		// can access panes with [`map.getPane`](#map-getpane) or
  		// [`map.getPanes`](#map-getpanes) methods. New panes can be created with the
  		// [`map.createPane`](#map-createpane) method.
  		//
  		// Every map has the following default panes that differ only in zIndex.
  		//
  		// @pane mapPane: HTMLElement = 'auto'
  		// Pane that contains all other map panes

  		this._mapPane = this.createPane('mapPane', this._container);
  		setPosition(this._mapPane, new Point(0, 0));

  		// @pane tilePane: HTMLElement = 200
  		// Pane for `GridLayer`s and `TileLayer`s
  		this.createPane('tilePane');
  		// @pane overlayPane: HTMLElement = 400
  		// Pane for vectors (`Path`s, like `Polyline`s and `Polygon`s), `ImageOverlay`s and `VideoOverlay`s
  		this.createPane('overlayPane');
  		// @pane shadowPane: HTMLElement = 500
  		// Pane for overlay shadows (e.g. `Marker` shadows)
  		this.createPane('shadowPane');
  		// @pane markerPane: HTMLElement = 600
  		// Pane for `Icon`s of `Marker`s
  		this.createPane('markerPane');
  		// @pane tooltipPane: HTMLElement = 650
  		// Pane for `Tooltip`s.
  		this.createPane('tooltipPane');
  		// @pane popupPane: HTMLElement = 700
  		// Pane for `Popup`s.
  		this.createPane('popupPane');

  		if (!this.options.markerZoomAnimation) {
  			addClass(panes.markerPane, 'leaflet-zoom-hide');
  			addClass(panes.shadowPane, 'leaflet-zoom-hide');
  		}
  	},


  	// private methods that modify map state

  	// @section Map state change events
  	_resetView: function (center, zoom, noMoveStart) {
  		setPosition(this._mapPane, new Point(0, 0));

  		var loading = !this._loaded;
  		this._loaded = true;
  		zoom = this._limitZoom(zoom);

  		this.fire('viewprereset');

  		var zoomChanged = this._zoom !== zoom;
  		this
  			._moveStart(zoomChanged, noMoveStart)
  			._move(center, zoom)
  			._moveEnd(zoomChanged);

  		// @event viewreset: Event
  		// Fired when the map needs to redraw its content (this usually happens
  		// on map zoom or load). Very useful for creating custom overlays.
  		this.fire('viewreset');

  		// @event load: Event
  		// Fired when the map is initialized (when its center and zoom are set
  		// for the first time).
  		if (loading) {
  			this.fire('load');
  		}
  	},

  	_moveStart: function (zoomChanged, noMoveStart) {
  		// @event zoomstart: Event
  		// Fired when the map zoom is about to change (e.g. before zoom animation).
  		// @event movestart: Event
  		// Fired when the view of the map starts changing (e.g. user starts dragging the map).
  		if (zoomChanged) {
  			this.fire('zoomstart');
  		}
  		if (!noMoveStart) {
  			this.fire('movestart');
  		}
  		return this;
  	},

  	_move: function (center, zoom, data, supressEvent) {
  		if (zoom === undefined) {
  			zoom = this._zoom;
  		}
  		var zoomChanged = this._zoom !== zoom;

  		this._zoom = zoom;
  		this._lastCenter = center;
  		this._pixelOrigin = this._getNewPixelOrigin(center);

  		if (!supressEvent) {
  			// @event zoom: Event
  			// Fired repeatedly during any change in zoom level,
  			// including zoom and fly animations.
  			if (zoomChanged || (data && data.pinch)) {	// Always fire 'zoom' if pinching because #3530
  				this.fire('zoom', data);
  			}

  			// @event move: Event
  			// Fired repeatedly during any movement of the map,
  			// including pan and fly animations.
  			this.fire('move', data);
  		} else if (data && data.pinch) {	// Always fire 'zoom' if pinching because #3530
  			this.fire('zoom', data);
  		}
  		return this;
  	},

  	_moveEnd: function (zoomChanged) {
  		// @event zoomend: Event
  		// Fired when the map zoom changed, after any animations.
  		if (zoomChanged) {
  			this.fire('zoomend');
  		}

  		// @event moveend: Event
  		// Fired when the center of the map stops changing
  		// (e.g. user stopped dragging the map or after non-centered zoom).
  		return this.fire('moveend');
  	},

  	_stop: function () {
  		cancelAnimFrame(this._flyToFrame);
  		if (this._panAnim) {
  			this._panAnim.stop();
  		}
  		return this;
  	},

  	_rawPanBy: function (offset) {
  		setPosition(this._mapPane, this._getMapPanePos().subtract(offset));
  	},

  	_getZoomSpan: function () {
  		return this.getMaxZoom() - this.getMinZoom();
  	},

  	_panInsideMaxBounds: function () {
  		if (!this._enforcingBounds) {
  			this.panInsideBounds(this.options.maxBounds);
  		}
  	},

  	_checkIfLoaded: function () {
  		if (!this._loaded) {
  			throw new Error('Set map center and zoom first.');
  		}
  	},

  	// DOM event handling

  	// @section Interaction events
  	_initEvents: function (remove) {
  		this._targets = {};
  		this._targets[stamp(this._container)] = this;

  		var onOff = remove ? off : on;

  		// @event click: MouseEvent
  		// Fired when the user clicks (or taps) the map.
  		// @event dblclick: MouseEvent
  		// Fired when the user double-clicks (or double-taps) the map.
  		// @event mousedown: MouseEvent
  		// Fired when the user pushes the mouse button on the map.
  		// @event mouseup: MouseEvent
  		// Fired when the user releases the mouse button on the map.
  		// @event mouseover: MouseEvent
  		// Fired when the mouse enters the map.
  		// @event mouseout: MouseEvent
  		// Fired when the mouse leaves the map.
  		// @event mousemove: MouseEvent
  		// Fired while the mouse moves over the map.
  		// @event contextmenu: MouseEvent
  		// Fired when the user pushes the right mouse button on the map, prevents
  		// default browser context menu from showing if there are listeners on
  		// this event. Also fired on mobile when the user holds a single touch
  		// for a second (also called long press).
  		// @event keypress: KeyboardEvent
  		// Fired when the user presses a key from the keyboard that produces a character value while the map is focused.
  		// @event keydown: KeyboardEvent
  		// Fired when the user presses a key from the keyboard while the map is focused. Unlike the `keypress` event,
  		// the `keydown` event is fired for keys that produce a character value and for keys
  		// that do not produce a character value.
  		// @event keyup: KeyboardEvent
  		// Fired when the user releases a key from the keyboard while the map is focused.
  		onOff(this._container, 'click dblclick mousedown mouseup ' +
  			'mouseover mouseout mousemove contextmenu keypress keydown keyup', this._handleDOMEvent, this);

  		if (this.options.trackResize) {
  			onOff(window, 'resize', this._onResize, this);
  		}

  		if (Browser.any3d && this.options.transform3DLimit) {
  			(remove ? this.off : this.on).call(this, 'moveend', this._onMoveEnd);
  		}
  	},

  	_onResize: function () {
  		cancelAnimFrame(this._resizeRequest);
  		this._resizeRequest = requestAnimFrame(
  		        function () { this.invalidateSize({debounceMoveend: true}); }, this);
  	},

  	_onScroll: function () {
  		this._container.scrollTop  = 0;
  		this._container.scrollLeft = 0;
  	},

  	_onMoveEnd: function () {
  		var pos = this._getMapPanePos();
  		if (Math.max(Math.abs(pos.x), Math.abs(pos.y)) >= this.options.transform3DLimit) {
  			// https://bugzilla.mozilla.org/show_bug.cgi?id=1203873 but Webkit also have
  			// a pixel offset on very high values, see: https://jsfiddle.net/dg6r5hhb/
  			this._resetView(this.getCenter(), this.getZoom());
  		}
  	},

  	_findEventTargets: function (e, type) {
  		var targets = [],
  		    target,
  		    isHover = type === 'mouseout' || type === 'mouseover',
  		    src = e.target || e.srcElement,
  		    dragging = false;

  		while (src) {
  			target = this._targets[stamp(src)];
  			if (target && (type === 'click' || type === 'preclick') && this._draggableMoved(target)) {
  				// Prevent firing click after you just dragged an object.
  				dragging = true;
  				break;
  			}
  			if (target && target.listens(type, true)) {
  				if (isHover && !isExternalTarget(src, e)) { break; }
  				targets.push(target);
  				if (isHover) { break; }
  			}
  			if (src === this._container) { break; }
  			src = src.parentNode;
  		}
  		if (!targets.length && !dragging && !isHover && this.listens(type, true)) {
  			targets = [this];
  		}
  		return targets;
  	},

  	_isClickDisabled: function (el) {
  		while (el && el !== this._container) {
  			if (el['_leaflet_disable_click']) { return true; }
  			el = el.parentNode;
  		}
  	},

  	_handleDOMEvent: function (e) {
  		var el = (e.target || e.srcElement);
  		if (!this._loaded || el['_leaflet_disable_events'] || e.type === 'click' && this._isClickDisabled(el)) {
  			return;
  		}

  		var type = e.type;

  		if (type === 'mousedown') {
  			// prevents outline when clicking on keyboard-focusable element
  			preventOutline(el);
  		}

  		this._fireDOMEvent(e, type);
  	},

  	_mouseEvents: ['click', 'dblclick', 'mouseover', 'mouseout', 'contextmenu'],

  	_fireDOMEvent: function (e, type, canvasTargets) {

  		if (e.type === 'click') {
  			// Fire a synthetic 'preclick' event which propagates up (mainly for closing popups).
  			// @event preclick: MouseEvent
  			// Fired before mouse click on the map (sometimes useful when you
  			// want something to happen on click before any existing click
  			// handlers start running).
  			var synth = extend({}, e);
  			synth.type = 'preclick';
  			this._fireDOMEvent(synth, synth.type, canvasTargets);
  		}

  		// Find the layer the event is propagating from and its parents.
  		var targets = this._findEventTargets(e, type);

  		if (canvasTargets) {
  			var filtered = []; // pick only targets with listeners
  			for (var i = 0; i < canvasTargets.length; i++) {
  				if (canvasTargets[i].listens(type, true)) {
  					filtered.push(canvasTargets[i]);
  				}
  			}
  			targets = filtered.concat(targets);
  		}

  		if (!targets.length) { return; }

  		if (type === 'contextmenu') {
  			preventDefault(e);
  		}

  		var target = targets[0];
  		var data = {
  			originalEvent: e
  		};

  		if (e.type !== 'keypress' && e.type !== 'keydown' && e.type !== 'keyup') {
  			var isMarker = target.getLatLng && (!target._radius || target._radius <= 10);
  			data.containerPoint = isMarker ?
  				this.latLngToContainerPoint(target.getLatLng()) : this.mouseEventToContainerPoint(e);
  			data.layerPoint = this.containerPointToLayerPoint(data.containerPoint);
  			data.latlng = isMarker ? target.getLatLng() : this.layerPointToLatLng(data.layerPoint);
  		}

  		for (i = 0; i < targets.length; i++) {
  			targets[i].fire(type, data, true);
  			if (data.originalEvent._stopped ||
  				(targets[i].options.bubblingMouseEvents === false && indexOf(this._mouseEvents, type) !== -1)) { return; }
  		}
  	},

  	_draggableMoved: function (obj) {
  		obj = obj.dragging && obj.dragging.enabled() ? obj : this;
  		return (obj.dragging && obj.dragging.moved()) || (this.boxZoom && this.boxZoom.moved());
  	},

  	_clearHandlers: function () {
  		for (var i = 0, len = this._handlers.length; i < len; i++) {
  			this._handlers[i].disable();
  		}
  	},

  	// @section Other Methods

  	// @method whenReady(fn: Function, context?: Object): this
  	// Runs the given function `fn` when the map gets initialized with
  	// a view (center and zoom) and at least one layer, or immediately
  	// if it's already initialized, optionally passing a function context.
  	whenReady: function (callback, context) {
  		if (this._loaded) {
  			callback.call(context || this, {target: this});
  		} else {
  			this.on('load', callback, context);
  		}
  		return this;
  	},


  	// private methods for getting map state

  	_getMapPanePos: function () {
  		return getPosition(this._mapPane) || new Point(0, 0);
  	},

  	_moved: function () {
  		var pos = this._getMapPanePos();
  		return pos && !pos.equals([0, 0]);
  	},

  	_getTopLeftPoint: function (center, zoom) {
  		var pixelOrigin = center && zoom !== undefined ?
  			this._getNewPixelOrigin(center, zoom) :
  			this.getPixelOrigin();
  		return pixelOrigin.subtract(this._getMapPanePos());
  	},

  	_getNewPixelOrigin: function (center, zoom) {
  		var viewHalf = this.getSize()._divideBy(2);
  		return this.project(center, zoom)._subtract(viewHalf)._add(this._getMapPanePos())._round();
  	},

  	_latLngToNewLayerPoint: function (latlng, zoom, center) {
  		var topLeft = this._getNewPixelOrigin(center, zoom);
  		return this.project(latlng, zoom)._subtract(topLeft);
  	},

  	_latLngBoundsToNewLayerBounds: function (latLngBounds, zoom, center) {
  		var topLeft = this._getNewPixelOrigin(center, zoom);
  		return toBounds([
  			this.project(latLngBounds.getSouthWest(), zoom)._subtract(topLeft),
  			this.project(latLngBounds.getNorthWest(), zoom)._subtract(topLeft),
  			this.project(latLngBounds.getSouthEast(), zoom)._subtract(topLeft),
  			this.project(latLngBounds.getNorthEast(), zoom)._subtract(topLeft)
  		]);
  	},

  	// layer point of the current center
  	_getCenterLayerPoint: function () {
  		return this.containerPointToLayerPoint(this.getSize()._divideBy(2));
  	},

  	// offset of the specified place to the current center in pixels
  	_getCenterOffset: function (latlng) {
  		return this.latLngToLayerPoint(latlng).subtract(this._getCenterLayerPoint());
  	},

  	// adjust center for view to get inside bounds
  	_limitCenter: function (center, zoom, bounds) {

  		if (!bounds) { return center; }

  		var centerPoint = this.project(center, zoom),
  		    viewHalf = this.getSize().divideBy(2),
  		    viewBounds = new Bounds(centerPoint.subtract(viewHalf), centerPoint.add(viewHalf)),
  		    offset = this._getBoundsOffset(viewBounds, bounds, zoom);

  		// If offset is less than a pixel, ignore.
  		// This prevents unstable projections from getting into
  		// an infinite loop of tiny offsets.
  		if (Math.abs(offset.x) <= 1 && Math.abs(offset.y) <= 1) {
  			return center;
  		}

  		return this.unproject(centerPoint.add(offset), zoom);
  	},

  	// adjust offset for view to get inside bounds
  	_limitOffset: function (offset, bounds) {
  		if (!bounds) { return offset; }

  		var viewBounds = this.getPixelBounds(),
  		    newBounds = new Bounds(viewBounds.min.add(offset), viewBounds.max.add(offset));

  		return offset.add(this._getBoundsOffset(newBounds, bounds));
  	},

  	// returns offset needed for pxBounds to get inside maxBounds at a specified zoom
  	_getBoundsOffset: function (pxBounds, maxBounds, zoom) {
  		var projectedMaxBounds = toBounds(
  		        this.project(maxBounds.getNorthEast(), zoom),
  		        this.project(maxBounds.getSouthWest(), zoom)
  		    ),
  		    minOffset = projectedMaxBounds.min.subtract(pxBounds.min),
  		    maxOffset = projectedMaxBounds.max.subtract(pxBounds.max),

  		    dx = this._rebound(minOffset.x, -maxOffset.x),
  		    dy = this._rebound(minOffset.y, -maxOffset.y);

  		return new Point(dx, dy);
  	},

  	_rebound: function (left, right) {
  		return left + right > 0 ?
  			Math.round(left - right) / 2 :
  			Math.max(0, Math.ceil(left)) - Math.max(0, Math.floor(right));
  	},

  	_limitZoom: function (zoom) {
  		var min = this.getMinZoom(),
  		    max = this.getMaxZoom(),
  		    snap = Browser.any3d ? this.options.zoomSnap : 1;
  		if (snap) {
  			zoom = Math.round(zoom / snap) * snap;
  		}
  		return Math.max(min, Math.min(max, zoom));
  	},

  	_onPanTransitionStep: function () {
  		this.fire('move');
  	},

  	_onPanTransitionEnd: function () {
  		removeClass(this._mapPane, 'leaflet-pan-anim');
  		this.fire('moveend');
  	},

  	_tryAnimatedPan: function (center, options) {
  		// difference between the new and current centers in pixels
  		var offset = this._getCenterOffset(center)._trunc();

  		// don't animate too far unless animate: true specified in options
  		if ((options && options.animate) !== true && !this.getSize().contains(offset)) { return false; }

  		this.panBy(offset, options);

  		return true;
  	},

  	_createAnimProxy: function () {

  		var proxy = this._proxy = create$1('div', 'leaflet-proxy leaflet-zoom-animated');
  		this._panes.mapPane.appendChild(proxy);

  		this.on('zoomanim', function (e) {
  			var prop = TRANSFORM,
  			    transform = this._proxy.style[prop];

  			setTransform(this._proxy, this.project(e.center, e.zoom), this.getZoomScale(e.zoom, 1));

  			// workaround for case when transform is the same and so transitionend event is not fired
  			if (transform === this._proxy.style[prop] && this._animatingZoom) {
  				this._onZoomTransitionEnd();
  			}
  		}, this);

  		this.on('load moveend', this._animMoveEnd, this);

  		this._on('unload', this._destroyAnimProxy, this);
  	},

  	_destroyAnimProxy: function () {
  		remove(this._proxy);
  		this.off('load moveend', this._animMoveEnd, this);
  		delete this._proxy;
  	},

  	_animMoveEnd: function () {
  		var c = this.getCenter(),
  		    z = this.getZoom();
  		setTransform(this._proxy, this.project(c, z), this.getZoomScale(z, 1));
  	},

  	_catchTransitionEnd: function (e) {
  		if (this._animatingZoom && e.propertyName.indexOf('transform') >= 0) {
  			this._onZoomTransitionEnd();
  		}
  	},

  	_nothingToAnimate: function () {
  		return !this._container.getElementsByClassName('leaflet-zoom-animated').length;
  	},

  	_tryAnimatedZoom: function (center, zoom, options) {

  		if (this._animatingZoom) { return true; }

  		options = options || {};

  		// don't animate if disabled, not supported or zoom difference is too large
  		if (!this._zoomAnimated || options.animate === false || this._nothingToAnimate() ||
  		        Math.abs(zoom - this._zoom) > this.options.zoomAnimationThreshold) { return false; }

  		// offset is the pixel coords of the zoom origin relative to the current center
  		var scale = this.getZoomScale(zoom),
  		    offset = this._getCenterOffset(center)._divideBy(1 - 1 / scale);

  		// don't animate if the zoom origin isn't within one screen from the current center, unless forced
  		if (options.animate !== true && !this.getSize().contains(offset)) { return false; }

  		requestAnimFrame(function () {
  			this
  			    ._moveStart(true, options.noMoveStart || false)
  			    ._animateZoom(center, zoom, true);
  		}, this);

  		return true;
  	},

  	_animateZoom: function (center, zoom, startAnim, noUpdate) {
  		if (!this._mapPane) { return; }

  		if (startAnim) {
  			this._animatingZoom = true;

  			// remember what center/zoom to set after animation
  			this._animateToCenter = center;
  			this._animateToZoom = zoom;

  			addClass(this._mapPane, 'leaflet-zoom-anim');
  		}

  		// @section Other Events
  		// @event zoomanim: ZoomAnimEvent
  		// Fired at least once per zoom animation. For continuous zoom, like pinch zooming, fired once per frame during zoom.
  		this.fire('zoomanim', {
  			center: center,
  			zoom: zoom,
  			noUpdate: noUpdate
  		});

  		if (!this._tempFireZoomEvent) {
  			this._tempFireZoomEvent = this._zoom !== this._animateToZoom;
  		}

  		this._move(this._animateToCenter, this._animateToZoom, undefined, true);

  		// Work around webkit not firing 'transitionend', see https://github.com/Leaflet/Leaflet/issues/3689, 2693
  		setTimeout(bind(this._onZoomTransitionEnd, this), 250);
  	},

  	_onZoomTransitionEnd: function () {
  		if (!this._animatingZoom) { return; }

  		if (this._mapPane) {
  			removeClass(this._mapPane, 'leaflet-zoom-anim');
  		}

  		this._animatingZoom = false;

  		this._move(this._animateToCenter, this._animateToZoom, undefined, true);

  		if (this._tempFireZoomEvent) {
  			this.fire('zoom');
  		}
  		delete this._tempFireZoomEvent;

  		this.fire('move');

  		this._moveEnd(true);
  	}
  });

  // @section

  // @factory L.map(id: String, options?: Map options)
  // Instantiates a map object given the DOM ID of a `<div>` element
  // and optionally an object literal with `Map options`.
  //
  // @alternative
  // @factory L.map(el: HTMLElement, options?: Map options)
  // Instantiates a map object given an instance of a `<div>` HTML element
  // and optionally an object literal with `Map options`.
  function createMap(id, options) {
  	return new Map(id, options);
  }

  /*
   * @class Control
   * @aka L.Control
   * @inherits Class
   *
   * L.Control is a base class for implementing map controls. Handles positioning.
   * All other controls extend from this class.
   */

  var Control = Class.extend({
  	// @section
  	// @aka Control Options
  	options: {
  		// @option position: String = 'topright'
  		// The position of the control (one of the map corners). Possible values are `'topleft'`,
  		// `'topright'`, `'bottomleft'` or `'bottomright'`
  		position: 'topright'
  	},

  	initialize: function (options) {
  		setOptions(this, options);
  	},

  	/* @section
  	 * Classes extending L.Control will inherit the following methods:
  	 *
  	 * @method getPosition: string
  	 * Returns the position of the control.
  	 */
  	getPosition: function () {
  		return this.options.position;
  	},

  	// @method setPosition(position: string): this
  	// Sets the position of the control.
  	setPosition: function (position) {
  		var map = this._map;

  		if (map) {
  			map.removeControl(this);
  		}

  		this.options.position = position;

  		if (map) {
  			map.addControl(this);
  		}

  		return this;
  	},

  	// @method getContainer: HTMLElement
  	// Returns the HTMLElement that contains the control.
  	getContainer: function () {
  		return this._container;
  	},

  	// @method addTo(map: Map): this
  	// Adds the control to the given map.
  	addTo: function (map) {
  		this.remove();
  		this._map = map;

  		var container = this._container = this.onAdd(map),
  		    pos = this.getPosition(),
  		    corner = map._controlCorners[pos];

  		addClass(container, 'leaflet-control');

  		if (pos.indexOf('bottom') !== -1) {
  			corner.insertBefore(container, corner.firstChild);
  		} else {
  			corner.appendChild(container);
  		}

  		this._map.on('unload', this.remove, this);

  		return this;
  	},

  	// @method remove: this
  	// Removes the control from the map it is currently active on.
  	remove: function () {
  		if (!this._map) {
  			return this;
  		}

  		remove(this._container);

  		if (this.onRemove) {
  			this.onRemove(this._map);
  		}

  		this._map.off('unload', this.remove, this);
  		this._map = null;

  		return this;
  	},

  	_refocusOnMap: function (e) {
  		// if map exists and event is not a keyboard event
  		if (this._map && e && e.screenX > 0 && e.screenY > 0) {
  			this._map.getContainer().focus();
  		}
  	}
  });

  var control = function (options) {
  	return new Control(options);
  };

  /* @section Extension methods
   * @uninheritable
   *
   * Every control should extend from `L.Control` and (re-)implement the following methods.
   *
   * @method onAdd(map: Map): HTMLElement
   * Should return the container DOM element for the control and add listeners on relevant map events. Called on [`control.addTo(map)`](#control-addTo).
   *
   * @method onRemove(map: Map)
   * Optional method. Should contain all clean up code that removes the listeners previously added in [`onAdd`](#control-onadd). Called on [`control.remove()`](#control-remove).
   */

  /* @namespace Map
   * @section Methods for Layers and Controls
   */
  Map.include({
  	// @method addControl(control: Control): this
  	// Adds the given control to the map
  	addControl: function (control) {
  		control.addTo(this);
  		return this;
  	},

  	// @method removeControl(control: Control): this
  	// Removes the given control from the map
  	removeControl: function (control) {
  		control.remove();
  		return this;
  	},

  	_initControlPos: function () {
  		var corners = this._controlCorners = {},
  		    l = 'leaflet-',
  		    container = this._controlContainer =
  		            create$1('div', l + 'control-container', this._container);

  		function createCorner(vSide, hSide) {
  			var className = l + vSide + ' ' + l + hSide;

  			corners[vSide + hSide] = create$1('div', className, container);
  		}

  		createCorner('top', 'left');
  		createCorner('top', 'right');
  		createCorner('bottom', 'left');
  		createCorner('bottom', 'right');
  	},

  	_clearControlPos: function () {
  		for (var i in this._controlCorners) {
  			remove(this._controlCorners[i]);
  		}
  		remove(this._controlContainer);
  		delete this._controlCorners;
  		delete this._controlContainer;
  	}
  });

  /*
   * @class Control.Layers
   * @aka L.Control.Layers
   * @inherits Control
   *
   * The layers control gives users the ability to switch between different base layers and switch overlays on/off (check out the [detailed example](https://leafletjs.com/examples/layers-control/)). Extends `Control`.
   *
   * @example
   *
   * ```js
   * var baseLayers = {
   * 	"Mapbox": mapbox,
   * 	"OpenStreetMap": osm
   * };
   *
   * var overlays = {
   * 	"Marker": marker,
   * 	"Roads": roadsLayer
   * };
   *
   * L.control.layers(baseLayers, overlays).addTo(map);
   * ```
   *
   * The `baseLayers` and `overlays` parameters are object literals with layer names as keys and `Layer` objects as values:
   *
   * ```js
   * {
   *     "<someName1>": layer1,
   *     "<someName2>": layer2
   * }
   * ```
   *
   * The layer names can contain HTML, which allows you to add additional styling to the items:
   *
   * ```js
   * {"<img src='my-layer-icon' /> <span class='my-layer-item'>My Layer</span>": myLayer}
   * ```
   */

  var Layers = Control.extend({
  	// @section
  	// @aka Control.Layers options
  	options: {
  		// @option collapsed: Boolean = true
  		// If `true`, the control will be collapsed into an icon and expanded on mouse hover, touch, or keyboard activation.
  		collapsed: true,
  		position: 'topright',

  		// @option autoZIndex: Boolean = true
  		// If `true`, the control will assign zIndexes in increasing order to all of its layers so that the order is preserved when switching them on/off.
  		autoZIndex: true,

  		// @option hideSingleBase: Boolean = false
  		// If `true`, the base layers in the control will be hidden when there is only one.
  		hideSingleBase: false,

  		// @option sortLayers: Boolean = false
  		// Whether to sort the layers. When `false`, layers will keep the order
  		// in which they were added to the control.
  		sortLayers: false,

  		// @option sortFunction: Function = *
  		// A [compare function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
  		// that will be used for sorting the layers, when `sortLayers` is `true`.
  		// The function receives both the `L.Layer` instances and their names, as in
  		// `sortFunction(layerA, layerB, nameA, nameB)`.
  		// By default, it sorts layers alphabetically by their name.
  		sortFunction: function (layerA, layerB, nameA, nameB) {
  			return nameA < nameB ? -1 : (nameB < nameA ? 1 : 0);
  		}
  	},

  	initialize: function (baseLayers, overlays, options) {
  		setOptions(this, options);

  		this._layerControlInputs = [];
  		this._layers = [];
  		this._lastZIndex = 0;
  		this._handlingClick = false;
  		this._preventClick = false;

  		for (var i in baseLayers) {
  			this._addLayer(baseLayers[i], i);
  		}

  		for (i in overlays) {
  			this._addLayer(overlays[i], i, true);
  		}
  	},

  	onAdd: function (map) {
  		this._initLayout();
  		this._update();

  		this._map = map;
  		map.on('zoomend', this._checkDisabledLayers, this);

  		for (var i = 0; i < this._layers.length; i++) {
  			this._layers[i].layer.on('add remove', this._onLayerChange, this);
  		}

  		return this._container;
  	},

  	addTo: function (map) {
  		Control.prototype.addTo.call(this, map);
  		// Trigger expand after Layers Control has been inserted into DOM so that is now has an actual height.
  		return this._expandIfNotCollapsed();
  	},

  	onRemove: function () {
  		this._map.off('zoomend', this._checkDisabledLayers, this);

  		for (var i = 0; i < this._layers.length; i++) {
  			this._layers[i].layer.off('add remove', this._onLayerChange, this);
  		}
  	},

  	// @method addBaseLayer(layer: Layer, name: String): this
  	// Adds a base layer (radio button entry) with the given name to the control.
  	addBaseLayer: function (layer, name) {
  		this._addLayer(layer, name);
  		return (this._map) ? this._update() : this;
  	},

  	// @method addOverlay(layer: Layer, name: String): this
  	// Adds an overlay (checkbox entry) with the given name to the control.
  	addOverlay: function (layer, name) {
  		this._addLayer(layer, name, true);
  		return (this._map) ? this._update() : this;
  	},

  	// @method removeLayer(layer: Layer): this
  	// Remove the given layer from the control.
  	removeLayer: function (layer) {
  		layer.off('add remove', this._onLayerChange, this);

  		var obj = this._getLayer(stamp(layer));
  		if (obj) {
  			this._layers.splice(this._layers.indexOf(obj), 1);
  		}
  		return (this._map) ? this._update() : this;
  	},

  	// @method expand(): this
  	// Expand the control container if collapsed.
  	expand: function () {
  		addClass(this._container, 'leaflet-control-layers-expanded');
  		this._section.style.height = null;
  		var acceptableHeight = this._map.getSize().y - (this._container.offsetTop + 50);
  		if (acceptableHeight < this._section.clientHeight) {
  			addClass(this._section, 'leaflet-control-layers-scrollbar');
  			this._section.style.height = acceptableHeight + 'px';
  		} else {
  			removeClass(this._section, 'leaflet-control-layers-scrollbar');
  		}
  		this._checkDisabledLayers();
  		return this;
  	},

  	// @method collapse(): this
  	// Collapse the control container if expanded.
  	collapse: function () {
  		removeClass(this._container, 'leaflet-control-layers-expanded');
  		return this;
  	},

  	_initLayout: function () {
  		var className = 'leaflet-control-layers',
  		    container = this._container = create$1('div', className),
  		    collapsed = this.options.collapsed;

  		// makes this work on IE touch devices by stopping it from firing a mouseout event when the touch is released
  		container.setAttribute('aria-haspopup', true);

  		disableClickPropagation(container);
  		disableScrollPropagation(container);

  		var section = this._section = create$1('section', className + '-list');

  		if (collapsed) {
  			this._map.on('click', this.collapse, this);

  			on(container, {
  				mouseenter: this._expandSafely,
  				mouseleave: this.collapse
  			}, this);
  		}

  		var link = this._layersLink = create$1('a', className + '-toggle', container);
  		link.href = '#';
  		link.title = 'Layers';
  		link.setAttribute('role', 'button');

  		on(link, {
  			keydown: function (e) {
  				if (e.keyCode === 13) {
  					this._expandSafely();
  				}
  			},
  			// Certain screen readers intercept the key event and instead send a click event
  			click: function (e) {
  				preventDefault(e);
  				this._expandSafely();
  			}
  		}, this);

  		if (!collapsed) {
  			this.expand();
  		}

  		this._baseLayersList = create$1('div', className + '-base', section);
  		this._separator = create$1('div', className + '-separator', section);
  		this._overlaysList = create$1('div', className + '-overlays', section);

  		container.appendChild(section);
  	},

  	_getLayer: function (id) {
  		for (var i = 0; i < this._layers.length; i++) {

  			if (this._layers[i] && stamp(this._layers[i].layer) === id) {
  				return this._layers[i];
  			}
  		}
  	},

  	_addLayer: function (layer, name, overlay) {
  		if (this._map) {
  			layer.on('add remove', this._onLayerChange, this);
  		}

  		this._layers.push({
  			layer: layer,
  			name: name,
  			overlay: overlay
  		});

  		if (this.options.sortLayers) {
  			this._layers.sort(bind(function (a, b) {
  				return this.options.sortFunction(a.layer, b.layer, a.name, b.name);
  			}, this));
  		}

  		if (this.options.autoZIndex && layer.setZIndex) {
  			this._lastZIndex++;
  			layer.setZIndex(this._lastZIndex);
  		}

  		this._expandIfNotCollapsed();
  	},

  	_update: function () {
  		if (!this._container) { return this; }

  		empty(this._baseLayersList);
  		empty(this._overlaysList);

  		this._layerControlInputs = [];
  		var baseLayersPresent, overlaysPresent, i, obj, baseLayersCount = 0;

  		for (i = 0; i < this._layers.length; i++) {
  			obj = this._layers[i];
  			this._addItem(obj);
  			overlaysPresent = overlaysPresent || obj.overlay;
  			baseLayersPresent = baseLayersPresent || !obj.overlay;
  			baseLayersCount += !obj.overlay ? 1 : 0;
  		}

  		// Hide base layers section if there's only one layer.
  		if (this.options.hideSingleBase) {
  			baseLayersPresent = baseLayersPresent && baseLayersCount > 1;
  			this._baseLayersList.style.display = baseLayersPresent ? '' : 'none';
  		}

  		this._separator.style.display = overlaysPresent && baseLayersPresent ? '' : 'none';

  		return this;
  	},

  	_onLayerChange: function (e) {
  		if (!this._handlingClick) {
  			this._update();
  		}

  		var obj = this._getLayer(stamp(e.target));

  		// @namespace Map
  		// @section Layer events
  		// @event baselayerchange: LayersControlEvent
  		// Fired when the base layer is changed through the [layers control](#control-layers).
  		// @event overlayadd: LayersControlEvent
  		// Fired when an overlay is selected through the [layers control](#control-layers).
  		// @event overlayremove: LayersControlEvent
  		// Fired when an overlay is deselected through the [layers control](#control-layers).
  		// @namespace Control.Layers
  		var type = obj.overlay ?
  			(e.type === 'add' ? 'overlayadd' : 'overlayremove') :
  			(e.type === 'add' ? 'baselayerchange' : null);

  		if (type) {
  			this._map.fire(type, obj);
  		}
  	},

  	// IE7 bugs out if you create a radio dynamically, so you have to do it this hacky way (see https://stackoverflow.com/a/119079)
  	_createRadioElement: function (name, checked) {

  		var radioHtml = '<input type="radio" class="leaflet-control-layers-selector" name="' +
  				name + '"' + (checked ? ' checked="checked"' : '') + '/>';

  		var radioFragment = document.createElement('div');
  		radioFragment.innerHTML = radioHtml;

  		return radioFragment.firstChild;
  	},

  	_addItem: function (obj) {
  		var label = document.createElement('label'),
  		    checked = this._map.hasLayer(obj.layer),
  		    input;

  		if (obj.overlay) {
  			input = document.createElement('input');
  			input.type = 'checkbox';
  			input.className = 'leaflet-control-layers-selector';
  			input.defaultChecked = checked;
  		} else {
  			input = this._createRadioElement('leaflet-base-layers_' + stamp(this), checked);
  		}

  		this._layerControlInputs.push(input);
  		input.layerId = stamp(obj.layer);

  		on(input, 'click', this._onInputClick, this);

  		var name = document.createElement('span');
  		name.innerHTML = ' ' + obj.name;

  		// Helps from preventing layer control flicker when checkboxes are disabled
  		// https://github.com/Leaflet/Leaflet/issues/2771
  		var holder = document.createElement('span');

  		label.appendChild(holder);
  		holder.appendChild(input);
  		holder.appendChild(name);

  		var container = obj.overlay ? this._overlaysList : this._baseLayersList;
  		container.appendChild(label);

  		this._checkDisabledLayers();
  		return label;
  	},

  	_onInputClick: function () {
  		// expanding the control on mobile with a click can cause adding a layer - we don't want this
  		if (this._preventClick) {
  			return;
  		}

  		var inputs = this._layerControlInputs,
  		    input, layer;
  		var addedLayers = [],
  		    removedLayers = [];

  		this._handlingClick = true;

  		for (var i = inputs.length - 1; i >= 0; i--) {
  			input = inputs[i];
  			layer = this._getLayer(input.layerId).layer;

  			if (input.checked) {
  				addedLayers.push(layer);
  			} else if (!input.checked) {
  				removedLayers.push(layer);
  			}
  		}

  		// Bugfix issue 2318: Should remove all old layers before readding new ones
  		for (i = 0; i < removedLayers.length; i++) {
  			if (this._map.hasLayer(removedLayers[i])) {
  				this._map.removeLayer(removedLayers[i]);
  			}
  		}
  		for (i = 0; i < addedLayers.length; i++) {
  			if (!this._map.hasLayer(addedLayers[i])) {
  				this._map.addLayer(addedLayers[i]);
  			}
  		}

  		this._handlingClick = false;

  		this._refocusOnMap();
  	},

  	_checkDisabledLayers: function () {
  		var inputs = this._layerControlInputs,
  		    input,
  		    layer,
  		    zoom = this._map.getZoom();

  		for (var i = inputs.length - 1; i >= 0; i--) {
  			input = inputs[i];
  			layer = this._getLayer(input.layerId).layer;
  			input.disabled = (layer.options.minZoom !== undefined && zoom < layer.options.minZoom) ||
  			                 (layer.options.maxZoom !== undefined && zoom > layer.options.maxZoom);

  		}
  	},

  	_expandIfNotCollapsed: function () {
  		if (this._map && !this.options.collapsed) {
  			this.expand();
  		}
  		return this;
  	},

  	_expandSafely: function () {
  		var section = this._section;
  		this._preventClick = true;
  		on(section, 'click', preventDefault);
  		this.expand();
  		var that = this;
  		setTimeout(function () {
  			off(section, 'click', preventDefault);
  			that._preventClick = false;
  		});
  	}

  });


  // @factory L.control.layers(baselayers?: Object, overlays?: Object, options?: Control.Layers options)
  // Creates a layers control with the given layers. Base layers will be switched with radio buttons, while overlays will be switched with checkboxes. Note that all base layers should be passed in the base layers object, but only one should be added to the map during map instantiation.
  var layers = function (baseLayers, overlays, options) {
  	return new Layers(baseLayers, overlays, options);
  };

  /*
   * @class Control.Zoom
   * @aka L.Control.Zoom
   * @inherits Control
   *
   * A basic zoom control with two buttons (zoom in and zoom out). It is put on the map by default unless you set its [`zoomControl` option](#map-zoomcontrol) to `false`. Extends `Control`.
   */

  var Zoom = Control.extend({
  	// @section
  	// @aka Control.Zoom options
  	options: {
  		position: 'topleft',

  		// @option zoomInText: String = '<span aria-hidden="true">+</span>'
  		// The text set on the 'zoom in' button.
  		zoomInText: '<span aria-hidden="true">+</span>',

  		// @option zoomInTitle: String = 'Zoom in'
  		// The title set on the 'zoom in' button.
  		zoomInTitle: 'Zoom in',

  		// @option zoomOutText: String = '<span aria-hidden="true">&#x2212;</span>'
  		// The text set on the 'zoom out' button.
  		zoomOutText: '<span aria-hidden="true">&#x2212;</span>',

  		// @option zoomOutTitle: String = 'Zoom out'
  		// The title set on the 'zoom out' button.
  		zoomOutTitle: 'Zoom out'
  	},

  	onAdd: function (map) {
  		var zoomName = 'leaflet-control-zoom',
  		    container = create$1('div', zoomName + ' leaflet-bar'),
  		    options = this.options;

  		this._zoomInButton  = this._createButton(options.zoomInText, options.zoomInTitle,
  		        zoomName + '-in',  container, this._zoomIn);
  		this._zoomOutButton = this._createButton(options.zoomOutText, options.zoomOutTitle,
  		        zoomName + '-out', container, this._zoomOut);

  		this._updateDisabled();
  		map.on('zoomend zoomlevelschange', this._updateDisabled, this);

  		return container;
  	},

  	onRemove: function (map) {
  		map.off('zoomend zoomlevelschange', this._updateDisabled, this);
  	},

  	disable: function () {
  		this._disabled = true;
  		this._updateDisabled();
  		return this;
  	},

  	enable: function () {
  		this._disabled = false;
  		this._updateDisabled();
  		return this;
  	},

  	_zoomIn: function (e) {
  		if (!this._disabled && this._map._zoom < this._map.getMaxZoom()) {
  			this._map.zoomIn(this._map.options.zoomDelta * (e.shiftKey ? 3 : 1));
  		}
  	},

  	_zoomOut: function (e) {
  		if (!this._disabled && this._map._zoom > this._map.getMinZoom()) {
  			this._map.zoomOut(this._map.options.zoomDelta * (e.shiftKey ? 3 : 1));
  		}
  	},

  	_createButton: function (html, title, className, container, fn) {
  		var link = create$1('a', className, container);
  		link.innerHTML = html;
  		link.href = '#';
  		link.title = title;

  		/*
  		 * Will force screen readers like VoiceOver to read this as "Zoom in - button"
  		 */
  		link.setAttribute('role', 'button');
  		link.setAttribute('aria-label', title);

  		disableClickPropagation(link);
  		on(link, 'click', stop);
  		on(link, 'click', fn, this);
  		on(link, 'click', this._refocusOnMap, this);

  		return link;
  	},

  	_updateDisabled: function () {
  		var map = this._map,
  		    className = 'leaflet-disabled';

  		removeClass(this._zoomInButton, className);
  		removeClass(this._zoomOutButton, className);
  		this._zoomInButton.setAttribute('aria-disabled', 'false');
  		this._zoomOutButton.setAttribute('aria-disabled', 'false');

  		if (this._disabled || map._zoom === map.getMinZoom()) {
  			addClass(this._zoomOutButton, className);
  			this._zoomOutButton.setAttribute('aria-disabled', 'true');
  		}
  		if (this._disabled || map._zoom === map.getMaxZoom()) {
  			addClass(this._zoomInButton, className);
  			this._zoomInButton.setAttribute('aria-disabled', 'true');
  		}
  	}
  });

  // @namespace Map
  // @section Control options
  // @option zoomControl: Boolean = true
  // Whether a [zoom control](#control-zoom) is added to the map by default.
  Map.mergeOptions({
  	zoomControl: true
  });

  Map.addInitHook(function () {
  	if (this.options.zoomControl) {
  		// @section Controls
  		// @property zoomControl: Control.Zoom
  		// The default zoom control (only available if the
  		// [`zoomControl` option](#map-zoomcontrol) was `true` when creating the map).
  		this.zoomControl = new Zoom();
  		this.addControl(this.zoomControl);
  	}
  });

  // @namespace Control.Zoom
  // @factory L.control.zoom(options: Control.Zoom options)
  // Creates a zoom control
  var zoom = function (options) {
  	return new Zoom(options);
  };

  /*
   * @class Control.Scale
   * @aka L.Control.Scale
   * @inherits Control
   *
   * A simple scale control that shows the scale of the current center of screen in metric (m/km) and imperial (mi/ft) systems. Extends `Control`.
   *
   * @example
   *
   * ```js
   * L.control.scale().addTo(map);
   * ```
   */

  var Scale = Control.extend({
  	// @section
  	// @aka Control.Scale options
  	options: {
  		position: 'bottomleft',

  		// @option maxWidth: Number = 100
  		// Maximum width of the control in pixels. The width is set dynamically to show round values (e.g. 100, 200, 500).
  		maxWidth: 100,

  		// @option metric: Boolean = True
  		// Whether to show the metric scale line (m/km).
  		metric: true,

  		// @option imperial: Boolean = True
  		// Whether to show the imperial scale line (mi/ft).
  		imperial: true

  		// @option updateWhenIdle: Boolean = false
  		// If `true`, the control is updated on [`moveend`](#map-moveend), otherwise it's always up-to-date (updated on [`move`](#map-move)).
  	},

  	onAdd: function (map) {
  		var className = 'leaflet-control-scale',
  		    container = create$1('div', className),
  		    options = this.options;

  		this._addScales(options, className + '-line', container);

  		map.on(options.updateWhenIdle ? 'moveend' : 'move', this._update, this);
  		map.whenReady(this._update, this);

  		return container;
  	},

  	onRemove: function (map) {
  		map.off(this.options.updateWhenIdle ? 'moveend' : 'move', this._update, this);
  	},

  	_addScales: function (options, className, container) {
  		if (options.metric) {
  			this._mScale = create$1('div', className, container);
  		}
  		if (options.imperial) {
  			this._iScale = create$1('div', className, container);
  		}
  	},

  	_update: function () {
  		var map = this._map,
  		    y = map.getSize().y / 2;

  		var maxMeters = map.distance(
  			map.containerPointToLatLng([0, y]),
  			map.containerPointToLatLng([this.options.maxWidth, y]));

  		this._updateScales(maxMeters);
  	},

  	_updateScales: function (maxMeters) {
  		if (this.options.metric && maxMeters) {
  			this._updateMetric(maxMeters);
  		}
  		if (this.options.imperial && maxMeters) {
  			this._updateImperial(maxMeters);
  		}
  	},

  	_updateMetric: function (maxMeters) {
  		var meters = this._getRoundNum(maxMeters),
  		    label = meters < 1000 ? meters + ' m' : (meters / 1000) + ' km';

  		this._updateScale(this._mScale, label, meters / maxMeters);
  	},

  	_updateImperial: function (maxMeters) {
  		var maxFeet = maxMeters * 3.2808399,
  		    maxMiles, miles, feet;

  		if (maxFeet > 5280) {
  			maxMiles = maxFeet / 5280;
  			miles = this._getRoundNum(maxMiles);
  			this._updateScale(this._iScale, miles + ' mi', miles / maxMiles);

  		} else {
  			feet = this._getRoundNum(maxFeet);
  			this._updateScale(this._iScale, feet + ' ft', feet / maxFeet);
  		}
  	},

  	_updateScale: function (scale, text, ratio) {
  		scale.style.width = Math.round(this.options.maxWidth * ratio) + 'px';
  		scale.innerHTML = text;
  	},

  	_getRoundNum: function (num) {
  		var pow10 = Math.pow(10, (Math.floor(num) + '').length - 1),
  		    d = num / pow10;

  		d = d >= 10 ? 10 :
  		    d >= 5 ? 5 :
  		    d >= 3 ? 3 :
  		    d >= 2 ? 2 : 1;

  		return pow10 * d;
  	}
  });


  // @factory L.control.scale(options?: Control.Scale options)
  // Creates an scale control with the given options.
  var scale = function (options) {
  	return new Scale(options);
  };

  var ukrainianFlag = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg>';


  /*
   * @class Control.Attribution
   * @aka L.Control.Attribution
   * @inherits Control
   *
   * The attribution control allows you to display attribution data in a small text box on a map. It is put on the map by default unless you set its [`attributionControl` option](#map-attributioncontrol) to `false`, and it fetches attribution texts from layers with the [`getAttribution` method](#layer-getattribution) automatically. Extends Control.
   */

  var Attribution = Control.extend({
  	// @section
  	// @aka Control.Attribution options
  	options: {
  		position: 'bottomright',

  		// @option prefix: String|false = 'Leaflet'
  		// The HTML text shown before the attributions. Pass `false` to disable.
  		prefix: '<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">' + (Browser.inlineSvg ? ukrainianFlag + ' ' : '') + 'Leaflet</a>'
  	},

  	initialize: function (options) {
  		setOptions(this, options);

  		this._attributions = {};
  	},

  	onAdd: function (map) {
  		map.attributionControl = this;
  		this._container = create$1('div', 'leaflet-control-attribution');
  		disableClickPropagation(this._container);

  		// TODO ugly, refactor
  		for (var i in map._layers) {
  			if (map._layers[i].getAttribution) {
  				this.addAttribution(map._layers[i].getAttribution());
  			}
  		}

  		this._update();

  		map.on('layeradd', this._addAttribution, this);

  		return this._container;
  	},

  	onRemove: function (map) {
  		map.off('layeradd', this._addAttribution, this);
  	},

  	_addAttribution: function (ev) {
  		if (ev.layer.getAttribution) {
  			this.addAttribution(ev.layer.getAttribution());
  			ev.layer.once('remove', function () {
  				this.removeAttribution(ev.layer.getAttribution());
  			}, this);
  		}
  	},

  	// @method setPrefix(prefix: String|false): this
  	// The HTML text shown before the attributions. Pass `false` to disable.
  	setPrefix: function (prefix) {
  		this.options.prefix = prefix;
  		this._update();
  		return this;
  	},

  	// @method addAttribution(text: String): this
  	// Adds an attribution text (e.g. `'&copy; OpenStreetMap contributors'`).
  	addAttribution: function (text) {
  		if (!text) { return this; }

  		if (!this._attributions[text]) {
  			this._attributions[text] = 0;
  		}
  		this._attributions[text]++;

  		this._update();

  		return this;
  	},

  	// @method removeAttribution(text: String): this
  	// Removes an attribution text.
  	removeAttribution: function (text) {
  		if (!text) { return this; }

  		if (this._attributions[text]) {
  			this._attributions[text]--;
  			this._update();
  		}

  		return this;
  	},

  	_update: function () {
  		if (!this._map) { return; }

  		var attribs = [];

  		for (var i in this._attributions) {
  			if (this._attributions[i]) {
  				attribs.push(i);
  			}
  		}

  		var prefixAndAttribs = [];

  		if (this.options.prefix) {
  			prefixAndAttribs.push(this.options.prefix);
  		}
  		if (attribs.length) {
  			prefixAndAttribs.push(attribs.join(', '));
  		}

  		this._container.innerHTML = prefixAndAttribs.join(' <span aria-hidden="true">|</span> ');
  	}
  });

  // @namespace Map
  // @section Control options
  // @option attributionControl: Boolean = true
  // Whether a [attribution control](#control-attribution) is added to the map by default.
  Map.mergeOptions({
  	attributionControl: true
  });

  Map.addInitHook(function () {
  	if (this.options.attributionControl) {
  		new Attribution().addTo(this);
  	}
  });

  // @namespace Control.Attribution
  // @factory L.control.attribution(options: Control.Attribution options)
  // Creates an attribution control.
  var attribution = function (options) {
  	return new Attribution(options);
  };

  Control.Layers = Layers;
  Control.Zoom = Zoom;
  Control.Scale = Scale;
  Control.Attribution = Attribution;

  control.layers = layers;
  control.zoom = zoom;
  control.scale = scale;
  control.attribution = attribution;

  /*
  	L.Handler is a base class for handler classes that are used internally to inject
  	interaction features like dragging to classes like Map and Marker.
  */

  // @class Handler
  // @aka L.Handler
  // Abstract class for map interaction handlers

  var Handler = Class.extend({
  	initialize: function (map) {
  		this._map = map;
  	},

  	// @method enable(): this
  	// Enables the handler
  	enable: function () {
  		if (this._enabled) { return this; }

  		this._enabled = true;
  		this.addHooks();
  		return this;
  	},

  	// @method disable(): this
  	// Disables the handler
  	disable: function () {
  		if (!this._enabled) { return this; }

  		this._enabled = false;
  		this.removeHooks();
  		return this;
  	},

  	// @method enabled(): Boolean
  	// Returns `true` if the handler is enabled
  	enabled: function () {
  		return !!this._enabled;
  	}

  	// @section Extension methods
  	// Classes inheriting from `Handler` must implement the two following methods:
  	// @method addHooks()
  	// Called when the handler is enabled, should add event hooks.
  	// @method removeHooks()
  	// Called when the handler is disabled, should remove the event hooks added previously.
  });

  // @section There is static function which can be called without instantiating L.Handler:
  // @function addTo(map: Map, name: String): this
  // Adds a new Handler to the given map with the given name.
  Handler.addTo = function (map, name) {
  	map.addHandler(name, this);
  	return this;
  };

  var Mixin = {Events: Events};

  /*
   * @class Draggable
   * @aka L.Draggable
   * @inherits Evented
   *
   * A class for making DOM elements draggable (including touch support).
   * Used internally for map and marker dragging. Only works for elements
   * that were positioned with [`L.DomUtil.setPosition`](#domutil-setposition).
   *
   * @example
   * ```js
   * var draggable = new L.Draggable(elementToDrag);
   * draggable.enable();
   * ```
   */

  var START = Browser.touch ? 'touchstart mousedown' : 'mousedown';

  var Draggable = Evented.extend({

  	options: {
  		// @section
  		// @aka Draggable options
  		// @option clickTolerance: Number = 3
  		// The max number of pixels a user can shift the mouse pointer during a click
  		// for it to be considered a valid click (as opposed to a mouse drag).
  		clickTolerance: 3
  	},

  	// @constructor L.Draggable(el: HTMLElement, dragHandle?: HTMLElement, preventOutline?: Boolean, options?: Draggable options)
  	// Creates a `Draggable` object for moving `el` when you start dragging the `dragHandle` element (equals `el` itself by default).
  	initialize: function (element, dragStartTarget, preventOutline, options) {
  		setOptions(this, options);

  		this._element = element;
  		this._dragStartTarget = dragStartTarget || element;
  		this._preventOutline = preventOutline;
  	},

  	// @method enable()
  	// Enables the dragging ability
  	enable: function () {
  		if (this._enabled) { return; }

  		on(this._dragStartTarget, START, this._onDown, this);

  		this._enabled = true;
  	},

  	// @method disable()
  	// Disables the dragging ability
  	disable: function () {
  		if (!this._enabled) { return; }

  		// If we're currently dragging this draggable,
  		// disabling it counts as first ending the drag.
  		if (Draggable._dragging === this) {
  			this.finishDrag(true);
  		}

  		off(this._dragStartTarget, START, this._onDown, this);

  		this._enabled = false;
  		this._moved = false;
  	},

  	_onDown: function (e) {
  		// Ignore the event if disabled; this happens in IE11
  		// under some circumstances, see #3666.
  		if (!this._enabled) { return; }

  		this._moved = false;

  		if (hasClass(this._element, 'leaflet-zoom-anim')) { return; }

  		if (e.touches && e.touches.length !== 1) {
  			// Finish dragging to avoid conflict with touchZoom
  			if (Draggable._dragging === this) {
  				this.finishDrag();
  			}
  			return;
  		}

  		if (Draggable._dragging || e.shiftKey || ((e.which !== 1) && (e.button !== 1) && !e.touches)) { return; }
  		Draggable._dragging = this;  // Prevent dragging multiple objects at once.

  		if (this._preventOutline) {
  			preventOutline(this._element);
  		}

  		disableImageDrag();
  		disableTextSelection();

  		if (this._moving) { return; }

  		// @event down: Event
  		// Fired when a drag is about to start.
  		this.fire('down');

  		var first = e.touches ? e.touches[0] : e,
  		    sizedParent = getSizedParentNode(this._element);

  		this._startPoint = new Point(first.clientX, first.clientY);
  		this._startPos = getPosition(this._element);

  		// Cache the scale, so that we can continuously compensate for it during drag (_onMove).
  		this._parentScale = getScale(sizedParent);

  		var mouseevent = e.type === 'mousedown';
  		on(document, mouseevent ? 'mousemove' : 'touchmove', this._onMove, this);
  		on(document, mouseevent ? 'mouseup' : 'touchend touchcancel', this._onUp, this);
  	},

  	_onMove: function (e) {
  		// Ignore the event if disabled; this happens in IE11
  		// under some circumstances, see #3666.
  		if (!this._enabled) { return; }

  		if (e.touches && e.touches.length > 1) {
  			this._moved = true;
  			return;
  		}

  		var first = (e.touches && e.touches.length === 1 ? e.touches[0] : e),
  		    offset = new Point(first.clientX, first.clientY)._subtract(this._startPoint);

  		if (!offset.x && !offset.y) { return; }
  		if (Math.abs(offset.x) + Math.abs(offset.y) < this.options.clickTolerance) { return; }

  		// We assume that the parent container's position, border and scale do not change for the duration of the drag.
  		// Therefore there is no need to account for the position and border (they are eliminated by the subtraction)
  		// and we can use the cached value for the scale.
  		offset.x /= this._parentScale.x;
  		offset.y /= this._parentScale.y;

  		preventDefault(e);

  		if (!this._moved) {
  			// @event dragstart: Event
  			// Fired when a drag starts
  			this.fire('dragstart');

  			this._moved = true;

  			addClass(document.body, 'leaflet-dragging');

  			this._lastTarget = e.target || e.srcElement;
  			// IE and Edge do not give the <use> element, so fetch it
  			// if necessary
  			if (window.SVGElementInstance && this._lastTarget instanceof window.SVGElementInstance) {
  				this._lastTarget = this._lastTarget.correspondingUseElement;
  			}
  			addClass(this._lastTarget, 'leaflet-drag-target');
  		}

  		this._newPos = this._startPos.add(offset);
  		this._moving = true;

  		this._lastEvent = e;
  		this._updatePosition();
  	},

  	_updatePosition: function () {
  		var e = {originalEvent: this._lastEvent};

  		// @event predrag: Event
  		// Fired continuously during dragging *before* each corresponding
  		// update of the element's position.
  		this.fire('predrag', e);
  		setPosition(this._element, this._newPos);

  		// @event drag: Event
  		// Fired continuously during dragging.
  		this.fire('drag', e);
  	},

  	_onUp: function () {
  		// Ignore the event if disabled; this happens in IE11
  		// under some circumstances, see #3666.
  		if (!this._enabled) { return; }
  		this.finishDrag();
  	},

  	finishDrag: function (noInertia) {
  		removeClass(document.body, 'leaflet-dragging');

  		if (this._lastTarget) {
  			removeClass(this._lastTarget, 'leaflet-drag-target');
  			this._lastTarget = null;
  		}

  		off(document, 'mousemove touchmove', this._onMove, this);
  		off(document, 'mouseup touchend touchcancel', this._onUp, this);

  		enableImageDrag();
  		enableTextSelection();

  		var fireDragend = this._moved && this._moving;

  		this._moving = false;
  		Draggable._dragging = false;

  		if (fireDragend) {
  			// @event dragend: DragEndEvent
  			// Fired when the drag ends.
  			this.fire('dragend', {
  				noInertia: noInertia,
  				distance: this._newPos.distanceTo(this._startPos)
  			});
  		}
  	}

  });

  /*
   * @namespace PolyUtil
   * Various utility functions for polygon geometries.
   */

  /* @function clipPolygon(points: Point[], bounds: Bounds, round?: Boolean): Point[]
   * Clips the polygon geometry defined by the given `points` by the given bounds (using the [Sutherland-Hodgman algorithm](https://en.wikipedia.org/wiki/Sutherland%E2%80%93Hodgman_algorithm)).
   * Used by Leaflet to only show polygon points that are on the screen or near, increasing
   * performance. Note that polygon points needs different algorithm for clipping
   * than polyline, so there's a separate method for it.
   */
  function clipPolygon(points, bounds, round) {
  	var clippedPoints,
  	    edges = [1, 4, 2, 8],
  	    i, j, k,
  	    a, b,
  	    len, edge, p;

  	for (i = 0, len = points.length; i < len; i++) {
  		points[i]._code = _getBitCode(points[i], bounds);
  	}

  	// for each edge (left, bottom, right, top)
  	for (k = 0; k < 4; k++) {
  		edge = edges[k];
  		clippedPoints = [];

  		for (i = 0, len = points.length, j = len - 1; i < len; j = i++) {
  			a = points[i];
  			b = points[j];

  			// if a is inside the clip window
  			if (!(a._code & edge)) {
  				// if b is outside the clip window (a->b goes out of screen)
  				if (b._code & edge) {
  					p = _getEdgeIntersection(b, a, edge, bounds, round);
  					p._code = _getBitCode(p, bounds);
  					clippedPoints.push(p);
  				}
  				clippedPoints.push(a);

  			// else if b is inside the clip window (a->b enters the screen)
  			} else if (!(b._code & edge)) {
  				p = _getEdgeIntersection(b, a, edge, bounds, round);
  				p._code = _getBitCode(p, bounds);
  				clippedPoints.push(p);
  			}
  		}
  		points = clippedPoints;
  	}

  	return points;
  }

  /* @function polygonCenter(latlngs: LatLng[], crs: CRS): LatLng
   * Returns the center ([centroid](http://en.wikipedia.org/wiki/Centroid)) of the passed LatLngs (first ring) from a polygon.
   */
  function polygonCenter(latlngs, crs) {
  	var i, j, p1, p2, f, area, x, y, center;

  	if (!latlngs || latlngs.length === 0) {
  		throw new Error('latlngs not passed');
  	}

  	if (!isFlat(latlngs)) {
  		console.warn('latlngs are not flat! Only the first ring will be used');
  		latlngs = latlngs[0];
  	}

  	var centroidLatLng = toLatLng([0, 0]);

  	var bounds = toLatLngBounds(latlngs);
  	var areaBounds = bounds.getNorthWest().distanceTo(bounds.getSouthWest()) * bounds.getNorthEast().distanceTo(bounds.getNorthWest());
  	// tests showed that below 1700 rounding errors are happening
  	if (areaBounds < 1700) {
  		// getting a inexact center, to move the latlngs near to [0, 0] to prevent rounding errors
  		centroidLatLng = centroid(latlngs);
  	}

  	var len = latlngs.length;
  	var points = [];
  	for (i = 0; i < len; i++) {
  		var latlng = toLatLng(latlngs[i]);
  		points.push(crs.project(toLatLng([latlng.lat - centroidLatLng.lat, latlng.lng - centroidLatLng.lng])));
  	}

  	area = x = y = 0;

  	// polygon centroid algorithm;
  	for (i = 0, j = len - 1; i < len; j = i++) {
  		p1 = points[i];
  		p2 = points[j];

  		f = p1.y * p2.x - p2.y * p1.x;
  		x += (p1.x + p2.x) * f;
  		y += (p1.y + p2.y) * f;
  		area += f * 3;
  	}

  	if (area === 0) {
  		// Polygon is so small that all points are on same pixel.
  		center = points[0];
  	} else {
  		center = [x / area, y / area];
  	}

  	var latlngCenter = crs.unproject(toPoint(center));
  	return toLatLng([latlngCenter.lat + centroidLatLng.lat, latlngCenter.lng + centroidLatLng.lng]);
  }

  /* @function centroid(latlngs: LatLng[]): LatLng
   * Returns the 'center of mass' of the passed LatLngs.
   */
  function centroid(coords) {
  	var latSum = 0;
  	var lngSum = 0;
  	var len = 0;
  	for (var i = 0; i < coords.length; i++) {
  		var latlng = toLatLng(coords[i]);
  		latSum += latlng.lat;
  		lngSum += latlng.lng;
  		len++;
  	}
  	return toLatLng([latSum / len, lngSum / len]);
  }

  var PolyUtil = {
    __proto__: null,
    clipPolygon: clipPolygon,
    polygonCenter: polygonCenter,
    centroid: centroid
  };

  /*
   * @namespace LineUtil
   *
   * Various utility functions for polyline points processing, used by Leaflet internally to make polylines lightning-fast.
   */

  // Simplify polyline with vertex reduction and Douglas-Peucker simplification.
  // Improves rendering performance dramatically by lessening the number of points to draw.

  // @function simplify(points: Point[], tolerance: Number): Point[]
  // Dramatically reduces the number of points in a polyline while retaining
  // its shape and returns a new array of simplified points, using the
  // [Ramer-Douglas-Peucker algorithm](https://en.wikipedia.org/wiki/Ramer-Douglas-Peucker_algorithm).
  // Used for a huge performance boost when processing/displaying Leaflet polylines for
  // each zoom level and also reducing visual noise. tolerance affects the amount of
  // simplification (lesser value means higher quality but slower and with more points).
  // Also released as a separated micro-library [Simplify.js](https://mourner.github.io/simplify-js/).
  function simplify(points, tolerance) {
  	if (!tolerance || !points.length) {
  		return points.slice();
  	}

  	var sqTolerance = tolerance * tolerance;

  	    // stage 1: vertex reduction
  	    points = _reducePoints(points, sqTolerance);

  	    // stage 2: Douglas-Peucker simplification
  	    points = _simplifyDP(points, sqTolerance);

  	return points;
  }

  // @function pointToSegmentDistance(p: Point, p1: Point, p2: Point): Number
  // Returns the distance between point `p` and segment `p1` to `p2`.
  function pointToSegmentDistance(p, p1, p2) {
  	return Math.sqrt(_sqClosestPointOnSegment(p, p1, p2, true));
  }

  // @function closestPointOnSegment(p: Point, p1: Point, p2: Point): Number
  // Returns the closest point from a point `p` on a segment `p1` to `p2`.
  function closestPointOnSegment(p, p1, p2) {
  	return _sqClosestPointOnSegment(p, p1, p2);
  }

  // Ramer-Douglas-Peucker simplification, see https://en.wikipedia.org/wiki/Ramer-Douglas-Peucker_algorithm
  function _simplifyDP(points, sqTolerance) {

  	var len = points.length,
  	    ArrayConstructor = typeof Uint8Array !== undefined + '' ? Uint8Array : Array,
  	    markers = new ArrayConstructor(len);

  	    markers[0] = markers[len - 1] = 1;

  	_simplifyDPStep(points, markers, sqTolerance, 0, len - 1);

  	var i,
  	    newPoints = [];

  	for (i = 0; i < len; i++) {
  		if (markers[i]) {
  			newPoints.push(points[i]);
  		}
  	}

  	return newPoints;
  }

  function _simplifyDPStep(points, markers, sqTolerance, first, last) {

  	var maxSqDist = 0,
  	index, i, sqDist;

  	for (i = first + 1; i <= last - 1; i++) {
  		sqDist = _sqClosestPointOnSegment(points[i], points[first], points[last], true);

  		if (sqDist > maxSqDist) {
  			index = i;
  			maxSqDist = sqDist;
  		}
  	}

  	if (maxSqDist > sqTolerance) {
  		markers[index] = 1;

  		_simplifyDPStep(points, markers, sqTolerance, first, index);
  		_simplifyDPStep(points, markers, sqTolerance, index, last);
  	}
  }

  // reduce points that are too close to each other to a single point
  function _reducePoints(points, sqTolerance) {
  	var reducedPoints = [points[0]];

  	for (var i = 1, prev = 0, len = points.length; i < len; i++) {
  		if (_sqDist(points[i], points[prev]) > sqTolerance) {
  			reducedPoints.push(points[i]);
  			prev = i;
  		}
  	}
  	if (prev < len - 1) {
  		reducedPoints.push(points[len - 1]);
  	}
  	return reducedPoints;
  }

  var _lastCode;

  // @function clipSegment(a: Point, b: Point, bounds: Bounds, useLastCode?: Boolean, round?: Boolean): Point[]|Boolean
  // Clips the segment a to b by rectangular bounds with the
  // [Cohen-Sutherland algorithm](https://en.wikipedia.org/wiki/Cohen%E2%80%93Sutherland_algorithm)
  // (modifying the segment points directly!). Used by Leaflet to only show polyline
  // points that are on the screen or near, increasing performance.
  function clipSegment(a, b, bounds, useLastCode, round) {
  	var codeA = useLastCode ? _lastCode : _getBitCode(a, bounds),
  	    codeB = _getBitCode(b, bounds),

  	    codeOut, p, newCode;

  	    // save 2nd code to avoid calculating it on the next segment
  	    _lastCode = codeB;

  	while (true) {
  		// if a,b is inside the clip window (trivial accept)
  		if (!(codeA | codeB)) {
  			return [a, b];
  		}

  		// if a,b is outside the clip window (trivial reject)
  		if (codeA & codeB) {
  			return false;
  		}

  		// other cases
  		codeOut = codeA || codeB;
  		p = _getEdgeIntersection(a, b, codeOut, bounds, round);
  		newCode = _getBitCode(p, bounds);

  		if (codeOut === codeA) {
  			a = p;
  			codeA = newCode;
  		} else {
  			b = p;
  			codeB = newCode;
  		}
  	}
  }

  function _getEdgeIntersection(a, b, code, bounds, round) {
  	var dx = b.x - a.x,
  	    dy = b.y - a.y,
  	    min = bounds.min,
  	    max = bounds.max,
  	    x, y;

  	if (code & 8) { // top
  		x = a.x + dx * (max.y - a.y) / dy;
  		y = max.y;

  	} else if (code & 4) { // bottom
  		x = a.x + dx * (min.y - a.y) / dy;
  		y = min.y;

  	} else if (code & 2) { // right
  		x = max.x;
  		y = a.y + dy * (max.x - a.x) / dx;

  	} else if (code & 1) { // left
  		x = min.x;
  		y = a.y + dy * (min.x - a.x) / dx;
  	}

  	return new Point(x, y, round);
  }

  function _getBitCode(p, bounds) {
  	var code = 0;

  	if (p.x < bounds.min.x) { // left
  		code |= 1;
  	} else if (p.x > bounds.max.x) { // right
  		code |= 2;
  	}

  	if (p.y < bounds.min.y) { // bottom
  		code |= 4;
  	} else if (p.y > bounds.max.y) { // top
  		code |= 8;
  	}

  	return code;
  }

  // square distance (to avoid unnecessary Math.sqrt calls)
  function _sqDist(p1, p2) {
  	var dx = p2.x - p1.x,
  	    dy = p2.y - p1.y;
  	return dx * dx + dy * dy;
  }

  // return closest point on segment or distance to that point
  function _sqClosestPointOnSegment(p, p1, p2, sqDist) {
  	var x = p1.x,
  	    y = p1.y,
  	    dx = p2.x - x,
  	    dy = p2.y - y,
  	    dot = dx * dx + dy * dy,
  	    t;

  	if (dot > 0) {
  		t = ((p.x - x) * dx + (p.y - y) * dy) / dot;

  		if (t > 1) {
  			x = p2.x;
  			y = p2.y;
  		} else if (t > 0) {
  			x += dx * t;
  			y += dy * t;
  		}
  	}

  	dx = p.x - x;
  	dy = p.y - y;

  	return sqDist ? dx * dx + dy * dy : new Point(x, y);
  }


  // @function isFlat(latlngs: LatLng[]): Boolean
  // Returns true if `latlngs` is a flat array, false is nested.
  function isFlat(latlngs) {
  	return !isArray(latlngs[0]) || (typeof latlngs[0][0] !== 'object' && typeof latlngs[0][0] !== 'undefined');
  }

  function _flat(latlngs) {
  	console.warn('Deprecated use of _flat, please use L.LineUtil.isFlat instead.');
  	return isFlat(latlngs);
  }

  /* @function polylineCenter(latlngs: LatLng[], crs: CRS): LatLng
   * Returns the center ([centroid](http://en.wikipedia.org/wiki/Centroid)) of the passed LatLngs (first ring) from a polyline.
   */
  function polylineCenter(latlngs, crs) {
  	var i, halfDist, segDist, dist, p1, p2, ratio, center;

  	if (!latlngs || latlngs.length === 0) {
  		throw new Error('latlngs not passed');
  	}

  	if (!isFlat(latlngs)) {
  		console.warn('latlngs are not flat! Only the first ring will be used');
  		latlngs = latlngs[0];
  	}

  	var centroidLatLng = toLatLng([0, 0]);

  	var bounds = toLatLngBounds(latlngs);
  	var areaBounds = bounds.getNorthWest().distanceTo(bounds.getSouthWest()) * bounds.getNorthEast().distanceTo(bounds.getNorthWest());
  	// tests showed that below 1700 rounding errors are happening
  	if (areaBounds < 1700) {
  		// getting a inexact center, to move the latlngs near to [0, 0] to prevent rounding errors
  		centroidLatLng = centroid(latlngs);
  	}

  	var len = latlngs.length;
  	var points = [];
  	for (i = 0; i < len; i++) {
  		var latlng = toLatLng(latlngs[i]);
  		points.push(crs.project(toLatLng([latlng.lat - centroidLatLng.lat, latlng.lng - centroidLatLng.lng])));
  	}

  	for (i = 0, halfDist = 0; i < len - 1; i++) {
  		halfDist += points[i].distanceTo(points[i + 1]) / 2;
  	}

  	// The line is so small in the current view that all points are on the same pixel.
  	if (halfDist === 0) {
  		center = points[0];
  	} else {
  		for (i = 0, dist = 0; i < len - 1; i++) {
  			p1 = points[i];
  			p2 = points[i + 1];
  			segDist = p1.distanceTo(p2);
  			dist += segDist;

  			if (dist > halfDist) {
  				ratio = (dist - halfDist) / segDist;
  				center = [
  					p2.x - ratio * (p2.x - p1.x),
  					p2.y - ratio * (p2.y - p1.y)
  				];
  				break;
  			}
  		}
  	}

  	var latlngCenter = crs.unproject(toPoint(center));
  	return toLatLng([latlngCenter.lat + centroidLatLng.lat, latlngCenter.lng + centroidLatLng.lng]);
  }

  var LineUtil = {
    __proto__: null,
    simplify: simplify,
    pointToSegmentDistance: pointToSegmentDistance,
    closestPointOnSegment: closestPointOnSegment,
    clipSegment: clipSegment,
    _getEdgeIntersection: _getEdgeIntersection,
    _getBitCode: _getBitCode,
    _sqClosestPointOnSegment: _sqClosestPointOnSegment,
    isFlat: isFlat,
    _flat: _flat,
    polylineCenter: polylineCenter
  };

  /*
   * @namespace Projection
   * @section
   * Leaflet comes with a set of already defined Projections out of the box:
   *
   * @projection L.Projection.LonLat
   *
   * Equirectangular, or Plate Carree projection — the most simple projection,
   * mostly used by GIS enthusiasts. Directly maps `x` as longitude, and `y` as
   * latitude. Also suitable for flat worlds, e.g. game maps. Used by the
   * `EPSG:4326` and `Simple` CRS.
   */

  var LonLat = {
  	project: function (latlng) {
  		return new Point(latlng.lng, latlng.lat);
  	},

  	unproject: function (point) {
  		return new LatLng(point.y, point.x);
  	},

  	bounds: new Bounds([-180, -90], [180, 90])
  };

  /*
   * @namespace Projection
   * @projection L.Projection.Mercator
   *
   * Elliptical Mercator projection — more complex than Spherical Mercator. Assumes that Earth is an ellipsoid. Used by the EPSG:3395 CRS.
   */

  var Mercator = {
  	R: 6378137,
  	R_MINOR: 6356752.314245179,

  	bounds: new Bounds([-20037508.34279, -15496570.73972], [20037508.34279, 18764656.23138]),

  	project: function (latlng) {
  		var d = Math.PI / 180,
  		    r = this.R,
  		    y = latlng.lat * d,
  		    tmp = this.R_MINOR / r,
  		    e = Math.sqrt(1 - tmp * tmp),
  		    con = e * Math.sin(y);

  		var ts = Math.tan(Math.PI / 4 - y / 2) / Math.pow((1 - con) / (1 + con), e / 2);
  		y = -r * Math.log(Math.max(ts, 1E-10));

  		return new Point(latlng.lng * d * r, y);
  	},

  	unproject: function (point) {
  		var d = 180 / Math.PI,
  		    r = this.R,
  		    tmp = this.R_MINOR / r,
  		    e = Math.sqrt(1 - tmp * tmp),
  		    ts = Math.exp(-point.y / r),
  		    phi = Math.PI / 2 - 2 * Math.atan(ts);

  		for (var i = 0, dphi = 0.1, con; i < 15 && Math.abs(dphi) > 1e-7; i++) {
  			con = e * Math.sin(phi);
  			con = Math.pow((1 - con) / (1 + con), e / 2);
  			dphi = Math.PI / 2 - 2 * Math.atan(ts * con) - phi;
  			phi += dphi;
  		}

  		return new LatLng(phi * d, point.x * d / r);
  	}
  };

  /*
   * @class Projection

   * An object with methods for projecting geographical coordinates of the world onto
   * a flat surface (and back). See [Map projection](https://en.wikipedia.org/wiki/Map_projection).

   * @property bounds: Bounds
   * The bounds (specified in CRS units) where the projection is valid

   * @method project(latlng: LatLng): Point
   * Projects geographical coordinates into a 2D point.
   * Only accepts actual `L.LatLng` instances, not arrays.

   * @method unproject(point: Point): LatLng
   * The inverse of `project`. Projects a 2D point into a geographical location.
   * Only accepts actual `L.Point` instances, not arrays.

   * Note that the projection instances do not inherit from Leaflet's `Class` object,
   * and can't be instantiated. Also, new classes can't inherit from them,
   * and methods can't be added to them with the `include` function.

   */

  var index = {
    __proto__: null,
    LonLat: LonLat,
    Mercator: Mercator,
    SphericalMercator: SphericalMercator
  };

  /*
   * @namespace CRS
   * @crs L.CRS.EPSG3395
   *
   * Rarely used by some commercial tile providers. Uses Elliptical Mercator projection.
   */
  var EPSG3395 = extend({}, Earth, {
  	code: 'EPSG:3395',
  	projection: Mercator,

  	transformation: (function () {
  		var scale = 0.5 / (Math.PI * Mercator.R);
  		return toTransformation(scale, 0.5, -scale, 0.5);
  	}())
  });

  /*
   * @namespace CRS
   * @crs L.CRS.EPSG4326
   *
   * A common CRS among GIS enthusiasts. Uses simple Equirectangular projection.
   *
   * Leaflet 1.0.x complies with the [TMS coordinate scheme for EPSG:4326](https://wiki.osgeo.org/wiki/Tile_Map_Service_Specification#global-geodetic),
   * which is a breaking change from 0.7.x behaviour.  If you are using a `TileLayer`
   * with this CRS, ensure that there are two 256x256 pixel tiles covering the
   * whole earth at zoom level zero, and that the tile coordinate origin is (-180,+90),
   * or (-180,-90) for `TileLayer`s with [the `tms` option](#tilelayer-tms) set.
   */

  var EPSG4326 = extend({}, Earth, {
  	code: 'EPSG:4326',
  	projection: LonLat,
  	transformation: toTransformation(1 / 180, 1, -1 / 180, 0.5)
  });

  /*
   * @namespace CRS
   * @crs L.CRS.Simple
   *
   * A simple CRS that maps longitude and latitude into `x` and `y` directly.
   * May be used for maps of flat surfaces (e.g. game maps). Note that the `y`
   * axis should still be inverted (going from bottom to top). `distance()` returns
   * simple euclidean distance.
   */

  var Simple = extend({}, CRS, {
  	projection: LonLat,
  	transformation: toTransformation(1, 0, -1, 0),

  	scale: function (zoom) {
  		return Math.pow(2, zoom);
  	},

  	zoom: function (scale) {
  		return Math.log(scale) / Math.LN2;
  	},

  	distance: function (latlng1, latlng2) {
  		var dx = latlng2.lng - latlng1.lng,
  		    dy = latlng2.lat - latlng1.lat;

  		return Math.sqrt(dx * dx + dy * dy);
  	},

  	infinite: true
  });

  CRS.Earth = Earth;
  CRS.EPSG3395 = EPSG3395;
  CRS.EPSG3857 = EPSG3857;
  CRS.EPSG900913 = EPSG900913;
  CRS.EPSG4326 = EPSG4326;
  CRS.Simple = Simple;

  /*
   * @class Layer
   * @inherits Evented
   * @aka L.Layer
   * @aka ILayer
   *
   * A set of methods from the Layer base class that all Leaflet layers use.
   * Inherits all methods, options and events from `L.Evented`.
   *
   * @example
   *
   * ```js
   * var layer = L.marker(latlng).addTo(map);
   * layer.addTo(map);
   * layer.remove();
   * ```
   *
   * @event add: Event
   * Fired after the layer is added to a map
   *
   * @event remove: Event
   * Fired after the layer is removed from a map
   */


  var Layer = Evented.extend({

  	// Classes extending `L.Layer` will inherit the following options:
  	options: {
  		// @option pane: String = 'overlayPane'
  		// By default the layer will be added to the map's [overlay pane](#map-overlaypane). Overriding this option will cause the layer to be placed on another pane by default.
  		pane: 'overlayPane',

  		// @option attribution: String = null
  		// String to be shown in the attribution control, e.g. "© OpenStreetMap contributors". It describes the layer data and is often a legal obligation towards copyright holders and tile providers.
  		attribution: null,

  		bubblingMouseEvents: true
  	},

  	/* @section
  	 * Classes extending `L.Layer` will inherit the following methods:
  	 *
  	 * @method addTo(map: Map|LayerGroup): this
  	 * Adds the layer to the given map or layer group.
  	 */
  	addTo: function (map) {
  		map.addLayer(this);
  		return this;
  	},

  	// @method remove: this
  	// Removes the layer from the map it is currently active on.
  	remove: function () {
  		return this.removeFrom(this._map || this._mapToAdd);
  	},

  	// @method removeFrom(map: Map): this
  	// Removes the layer from the given map
  	//
  	// @alternative
  	// @method removeFrom(group: LayerGroup): this
  	// Removes the layer from the given `LayerGroup`
  	removeFrom: function (obj) {
  		if (obj) {
  			obj.removeLayer(this);
  		}
  		return this;
  	},

  	// @method getPane(name? : String): HTMLElement
  	// Returns the `HTMLElement` representing the named pane on the map. If `name` is omitted, returns the pane for this layer.
  	getPane: function (name) {
  		return this._map.getPane(name ? (this.options[name] || name) : this.options.pane);
  	},

  	addInteractiveTarget: function (targetEl) {
  		this._map._targets[stamp(targetEl)] = this;
  		return this;
  	},

  	removeInteractiveTarget: function (targetEl) {
  		delete this._map._targets[stamp(targetEl)];
  		return this;
  	},

  	// @method getAttribution: String
  	// Used by the `attribution control`, returns the [attribution option](#gridlayer-attribution).
  	getAttribution: function () {
  		return this.options.attribution;
  	},

  	_layerAdd: function (e) {
  		var map = e.target;

  		// check in case layer gets added and then removed before the map is ready
  		if (!map.hasLayer(this)) { return; }

  		this._map = map;
  		this._zoomAnimated = map._zoomAnimated;

  		if (this.getEvents) {
  			var events = this.getEvents();
  			map.on(events, this);
  			this.once('remove', function () {
  				map.off(events, this);
  			}, this);
  		}

  		this.onAdd(map);

  		this.fire('add');
  		map.fire('layeradd', {layer: this});
  	}
  });

  /* @section Extension methods
   * @uninheritable
   *
   * Every layer should extend from `L.Layer` and (re-)implement the following methods.
   *
   * @method onAdd(map: Map): this
   * Should contain code that creates DOM elements for the layer, adds them to `map panes` where they should belong and puts listeners on relevant map events. Called on [`map.addLayer(layer)`](#map-addlayer).
   *
   * @method onRemove(map: Map): this
   * Should contain all clean up code that removes the layer's elements from the DOM and removes listeners previously added in [`onAdd`](#layer-onadd). Called on [`map.removeLayer(layer)`](#map-removelayer).
   *
   * @method getEvents(): Object
   * This optional method should return an object like `{ viewreset: this._reset }` for [`addEventListener`](#evented-addeventlistener). The event handlers in this object will be automatically added and removed from the map with your layer.
   *
   * @method getAttribution(): String
   * This optional method should return a string containing HTML to be shown on the `Attribution control` whenever the layer is visible.
   *
   * @method beforeAdd(map: Map): this
   * Optional method. Called on [`map.addLayer(layer)`](#map-addlayer), before the layer is added to the map, before events are initialized, without waiting until the map is in a usable state. Use for early initialization only.
   */


  /* @namespace Map
   * @section Layer events
   *
   * @event layeradd: LayerEvent
   * Fired when a new layer is added to the map.
   *
   * @event layerremove: LayerEvent
   * Fired when some layer is removed from the map
   *
   * @section Methods for Layers and Controls
   */
  Map.include({
  	// @method addLayer(layer: Layer): this
  	// Adds the given layer to the map
  	addLayer: function (layer) {
  		if (!layer._layerAdd) {
  			throw new Error('The provided object is not a Layer.');
  		}

  		var id = stamp(layer);
  		if (this._layers[id]) { return this; }
  		this._layers[id] = layer;

  		layer._mapToAdd = this;

  		if (layer.beforeAdd) {
  			layer.beforeAdd(this);
  		}

  		this.whenReady(layer._layerAdd, layer);

  		return this;
  	},

  	// @method removeLayer(layer: Layer): this
  	// Removes the given layer from the map.
  	removeLayer: function (layer) {
  		var id = stamp(layer);

  		if (!this._layers[id]) { return this; }

  		if (this._loaded) {
  			layer.onRemove(this);
  		}

  		delete this._layers[id];

  		if (this._loaded) {
  			this.fire('layerremove', {layer: layer});
  			layer.fire('remove');
  		}

  		layer._map = layer._mapToAdd = null;

  		return this;
  	},

  	// @method hasLayer(layer: Layer): Boolean
  	// Returns `true` if the given layer is currently added to the map
  	hasLayer: function (layer) {
  		return stamp(layer) in this._layers;
  	},

  	/* @method eachLayer(fn: Function, context?: Object): this
  	 * Iterates over the layers of the map, optionally specifying context of the iterator function.
  	 * ```
  	 * map.eachLayer(function(layer){
  	 *     layer.bindPopup('Hello');
  	 * });
  	 * ```
  	 */
  	eachLayer: function (method, context) {
  		for (var i in this._layers) {
  			method.call(context, this._layers[i]);
  		}
  		return this;
  	},

  	_addLayers: function (layers) {
  		layers = layers ? (isArray(layers) ? layers : [layers]) : [];

  		for (var i = 0, len = layers.length; i < len; i++) {
  			this.addLayer(layers[i]);
  		}
  	},

  	_addZoomLimit: function (layer) {
  		if (!isNaN(layer.options.maxZoom) || !isNaN(layer.options.minZoom)) {
  			this._zoomBoundLayers[stamp(layer)] = layer;
  			this._updateZoomLevels();
  		}
  	},

  	_removeZoomLimit: function (layer) {
  		var id = stamp(layer);

  		if (this._zoomBoundLayers[id]) {
  			delete this._zoomBoundLayers[id];
  			this._updateZoomLevels();
  		}
  	},

  	_updateZoomLevels: function () {
  		var minZoom = Infinity,
  		    maxZoom = -Infinity,
  		    oldZoomSpan = this._getZoomSpan();

  		for (var i in this._zoomBoundLayers) {
  			var options = this._zoomBoundLayers[i].options;

  			minZoom = options.minZoom === undefined ? minZoom : Math.min(minZoom, options.minZoom);
  			maxZoom = options.maxZoom === undefined ? maxZoom : Math.max(maxZoom, options.maxZoom);
  		}

  		this._layersMaxZoom = maxZoom === -Infinity ? undefined : maxZoom;
  		this._layersMinZoom = minZoom === Infinity ? undefined : minZoom;

  		// @section Map state change events
  		// @event zoomlevelschange: Event
  		// Fired when the number of zoomlevels on the map is changed due
  		// to adding or removing a layer.
  		if (oldZoomSpan !== this._getZoomSpan()) {
  			this.fire('zoomlevelschange');
  		}

  		if (this.options.maxZoom === undefined && this._layersMaxZoom && this.getZoom() > this._layersMaxZoom) {
  			this.setZoom(this._layersMaxZoom);
  		}
  		if (this.options.minZoom === undefined && this._layersMinZoom && this.getZoom() < this._layersMinZoom) {
  			this.setZoom(this._layersMinZoom);
  		}
  	}
  });

  /*
   * @class LayerGroup
   * @aka L.LayerGroup
   * @inherits Interactive layer
   *
   * Used to group several layers and handle them as one. If you add it to the map,
   * any layers added or removed from the group will be added/removed on the map as
   * well. Extends `Layer`.
   *
   * @example
   *
   * ```js
   * L.layerGroup([marker1, marker2])
   * 	.addLayer(polyline)
   * 	.addTo(map);
   * ```
   */

  var LayerGroup = Layer.extend({

  	initialize: function (layers, options) {
  		setOptions(this, options);

  		this._layers = {};

  		var i, len;

  		if (layers) {
  			for (i = 0, len = layers.length; i < len; i++) {
  				this.addLayer(layers[i]);
  			}
  		}
  	},

  	// @method addLayer(layer: Layer): this
  	// Adds the given layer to the group.
  	addLayer: function (layer) {
  		var id = this.getLayerId(layer);

  		this._layers[id] = layer;

  		if (this._map) {
  			this._map.addLayer(layer);
  		}

  		return this;
  	},

  	// @method removeLayer(layer: Layer): this
  	// Removes the given layer from the group.
  	// @alternative
  	// @method removeLayer(id: Number): this
  	// Removes the layer with the given internal ID from the group.
  	removeLayer: function (layer) {
  		var id = layer in this._layers ? layer : this.getLayerId(layer);

  		if (this._map && this._layers[id]) {
  			this._map.removeLayer(this._layers[id]);
  		}

  		delete this._layers[id];

  		return this;
  	},

  	// @method hasLayer(layer: Layer): Boolean
  	// Returns `true` if the given layer is currently added to the group.
  	// @alternative
  	// @method hasLayer(id: Number): Boolean
  	// Returns `true` if the given internal ID is currently added to the group.
  	hasLayer: function (layer) {
  		var layerId = typeof layer === 'number' ? layer : this.getLayerId(layer);
  		return layerId in this._layers;
  	},

  	// @method clearLayers(): this
  	// Removes all the layers from the group.
  	clearLayers: function () {
  		return this.eachLayer(this.removeLayer, this);
  	},

  	// @method invoke(methodName: String, …): this
  	// Calls `methodName` on every layer contained in this group, passing any
  	// additional parameters. Has no effect if the layers contained do not
  	// implement `methodName`.
  	invoke: function (methodName) {
  		var args = Array.prototype.slice.call(arguments, 1),
  		    i, layer;

  		for (i in this._layers) {
  			layer = this._layers[i];

  			if (layer[methodName]) {
  				layer[methodName].apply(layer, args);
  			}
  		}

  		return this;
  	},

  	onAdd: function (map) {
  		this.eachLayer(map.addLayer, map);
  	},

  	onRemove: function (map) {
  		this.eachLayer(map.removeLayer, map);
  	},

  	// @method eachLayer(fn: Function, context?: Object): this
  	// Iterates over the layers of the group, optionally specifying context of the iterator function.
  	// ```js
  	// group.eachLayer(function (layer) {
  	// 	layer.bindPopup('Hello');
  	// });
  	// ```
  	eachLayer: function (method, context) {
  		for (var i in this._layers) {
  			method.call(context, this._layers[i]);
  		}
  		return this;
  	},

  	// @method getLayer(id: Number): Layer
  	// Returns the layer with the given internal ID.
  	getLayer: function (id) {
  		return this._layers[id];
  	},

  	// @method getLayers(): Layer[]
  	// Returns an array of all the layers added to the group.
  	getLayers: function () {
  		var layers = [];
  		this.eachLayer(layers.push, layers);
  		return layers;
  	},

  	// @method setZIndex(zIndex: Number): this
  	// Calls `setZIndex` on every layer contained in this group, passing the z-index.
  	setZIndex: function (zIndex) {
  		return this.invoke('setZIndex', zIndex);
  	},

  	// @method getLayerId(layer: Layer): Number
  	// Returns the internal ID for a layer
  	getLayerId: function (layer) {
  		return stamp(layer);
  	}
  });


  // @factory L.layerGroup(layers?: Layer[], options?: Object)
  // Create a layer group, optionally given an initial set of layers and an `options` object.
  var layerGroup = function (layers, options) {
  	return new LayerGroup(layers, options);
  };

  /*
   * @class FeatureGroup
   * @aka L.FeatureGroup
   * @inherits LayerGroup
   *
   * Extended `LayerGroup` that makes it easier to do the same thing to all its member layers:
   *  * [`bindPopup`](#layer-bindpopup) binds a popup to all of the layers at once (likewise with [`bindTooltip`](#layer-bindtooltip))
   *  * Events are propagated to the `FeatureGroup`, so if the group has an event
   * handler, it will handle events from any of the layers. This includes mouse events
   * and custom events.
   *  * Has `layeradd` and `layerremove` events
   *
   * @example
   *
   * ```js
   * L.featureGroup([marker1, marker2, polyline])
   * 	.bindPopup('Hello world!')
   * 	.on('click', function() { alert('Clicked on a member of the group!'); })
   * 	.addTo(map);
   * ```
   */

  var FeatureGroup = LayerGroup.extend({

  	addLayer: function (layer) {
  		if (this.hasLayer(layer)) {
  			return this;
  		}

  		layer.addEventParent(this);

  		LayerGroup.prototype.addLayer.call(this, layer);

  		// @event layeradd: LayerEvent
  		// Fired when a layer is added to this `FeatureGroup`
  		return this.fire('layeradd', {layer: layer});
  	},

  	removeLayer: function (layer) {
  		if (!this.hasLayer(layer)) {
  			return this;
  		}
  		if (layer in this._layers) {
  			layer = this._layers[layer];
  		}

  		layer.removeEventParent(this);

  		LayerGroup.prototype.removeLayer.call(this, layer);

  		// @event layerremove: LayerEvent
  		// Fired when a layer is removed from this `FeatureGroup`
  		return this.fire('layerremove', {layer: layer});
  	},

  	// @method setStyle(style: Path options): this
  	// Sets the given path options to each layer of the group that has a `setStyle` method.
  	setStyle: function (style) {
  		return this.invoke('setStyle', style);
  	},

  	// @method bringToFront(): this
  	// Brings the layer group to the top of all other layers
  	bringToFront: function () {
  		return this.invoke('bringToFront');
  	},

  	// @method bringToBack(): this
  	// Brings the layer group to the back of all other layers
  	bringToBack: function () {
  		return this.invoke('bringToBack');
  	},

  	// @method getBounds(): LatLngBounds
  	// Returns the LatLngBounds of the Feature Group (created from bounds and coordinates of its children).
  	getBounds: function () {
  		var bounds = new LatLngBounds();

  		for (var id in this._layers) {
  			var layer = this._layers[id];
  			bounds.extend(layer.getBounds ? layer.getBounds() : layer.getLatLng());
  		}
  		return bounds;
  	}
  });

  // @factory L.featureGroup(layers?: Layer[], options?: Object)
  // Create a feature group, optionally given an initial set of layers and an `options` object.
  var featureGroup = function (layers, options) {
  	return new FeatureGroup(layers, options);
  };

  /*
   * @class Icon
   * @aka L.Icon
   *
   * Represents an icon to provide when creating a marker.
   *
   * @example
   *
   * ```js
   * var myIcon = L.icon({
   *     iconUrl: 'my-icon.png',
   *     iconRetinaUrl: 'my-icon@2x.png',
   *     iconSize: [38, 95],
   *     iconAnchor: [22, 94],
   *     popupAnchor: [-3, -76],
   *     shadowUrl: 'my-icon-shadow.png',
   *     shadowRetinaUrl: 'my-icon-shadow@2x.png',
   *     shadowSize: [68, 95],
   *     shadowAnchor: [22, 94]
   * });
   *
   * L.marker([50.505, 30.57], {icon: myIcon}).addTo(map);
   * ```
   *
   * `L.Icon.Default` extends `L.Icon` and is the blue icon Leaflet uses for markers by default.
   *
   */

  var Icon = Class.extend({

  	/* @section
  	 * @aka Icon options
  	 *
  	 * @option iconUrl: String = null
  	 * **(required)** The URL to the icon image (absolute or relative to your script path).
  	 *
  	 * @option iconRetinaUrl: String = null
  	 * The URL to a retina sized version of the icon image (absolute or relative to your
  	 * script path). Used for Retina screen devices.
  	 *
  	 * @option iconSize: Point = null
  	 * Size of the icon image in pixels.
  	 *
  	 * @option iconAnchor: Point = null
  	 * The coordinates of the "tip" of the icon (relative to its top left corner). The icon
  	 * will be aligned so that this point is at the marker's geographical location. Centered
  	 * by default if size is specified, also can be set in CSS with negative margins.
  	 *
  	 * @option popupAnchor: Point = [0, 0]
  	 * The coordinates of the point from which popups will "open", relative to the icon anchor.
  	 *
  	 * @option tooltipAnchor: Point = [0, 0]
  	 * The coordinates of the point from which tooltips will "open", relative to the icon anchor.
  	 *
  	 * @option shadowUrl: String = null
  	 * The URL to the icon shadow image. If not specified, no shadow image will be created.
  	 *
  	 * @option shadowRetinaUrl: String = null
  	 *
  	 * @option shadowSize: Point = null
  	 * Size of the shadow image in pixels.
  	 *
  	 * @option shadowAnchor: Point = null
  	 * The coordinates of the "tip" of the shadow (relative to its top left corner) (the same
  	 * as iconAnchor if not specified).
  	 *
  	 * @option className: String = ''
  	 * A custom class name to assign to both icon and shadow images. Empty by default.
  	 */

  	options: {
  		popupAnchor: [0, 0],
  		tooltipAnchor: [0, 0],

  		// @option crossOrigin: Boolean|String = false
  		// Whether the crossOrigin attribute will be added to the tiles.
  		// If a String is provided, all tiles will have their crossOrigin attribute set to the String provided. This is needed if you want to access tile pixel data.
  		// Refer to [CORS Settings](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for valid String values.
  		crossOrigin: false
  	},

  	initialize: function (options) {
  		setOptions(this, options);
  	},

  	// @method createIcon(oldIcon?: HTMLElement): HTMLElement
  	// Called internally when the icon has to be shown, returns a `<img>` HTML element
  	// styled according to the options.
  	createIcon: function (oldIcon) {
  		return this._createIcon('icon', oldIcon);
  	},

  	// @method createShadow(oldIcon?: HTMLElement): HTMLElement
  	// As `createIcon`, but for the shadow beneath it.
  	createShadow: function (oldIcon) {
  		return this._createIcon('shadow', oldIcon);
  	},

  	_createIcon: function (name, oldIcon) {
  		var src = this._getIconUrl(name);

  		if (!src) {
  			if (name === 'icon') {
  				throw new Error('iconUrl not set in Icon options (see the docs).');
  			}
  			return null;
  		}

  		var img = this._createImg(src, oldIcon && oldIcon.tagName === 'IMG' ? oldIcon : null);
  		this._setIconStyles(img, name);

  		if (this.options.crossOrigin || this.options.crossOrigin === '') {
  			img.crossOrigin = this.options.crossOrigin === true ? '' : this.options.crossOrigin;
  		}

  		return img;
  	},

  	_setIconStyles: function (img, name) {
  		var options = this.options;
  		var sizeOption = options[name + 'Size'];

  		if (typeof sizeOption === 'number') {
  			sizeOption = [sizeOption, sizeOption];
  		}

  		var size = toPoint(sizeOption),
  		    anchor = toPoint(name === 'shadow' && options.shadowAnchor || options.iconAnchor ||
  		            size && size.divideBy(2, true));

  		img.className = 'leaflet-marker-' + name + ' ' + (options.className || '');

  		if (anchor) {
  			img.style.marginLeft = (-anchor.x) + 'px';
  			img.style.marginTop  = (-anchor.y) + 'px';
  		}

  		if (size) {
  			img.style.width  = size.x + 'px';
  			img.style.height = size.y + 'px';
  		}
  	},

  	_createImg: function (src, el) {
  		el = el || document.createElement('img');
  		el.src = src;
  		return el;
  	},

  	_getIconUrl: function (name) {
  		return Browser.retina && this.options[name + 'RetinaUrl'] || this.options[name + 'Url'];
  	}
  });


  // @factory L.icon(options: Icon options)
  // Creates an icon instance with the given options.
  function icon(options) {
  	return new Icon(options);
  }

  /*
   * @miniclass Icon.Default (Icon)
   * @aka L.Icon.Default
   * @section
   *
   * A trivial subclass of `Icon`, represents the icon to use in `Marker`s when
   * no icon is specified. Points to the blue marker image distributed with Leaflet
   * releases.
   *
   * In order to customize the default icon, just change the properties of `L.Icon.Default.prototype.options`
   * (which is a set of `Icon options`).
   *
   * If you want to _completely_ replace the default icon, override the
   * `L.Marker.prototype.options.icon` with your own icon instead.
   */

  var IconDefault = Icon.extend({

  	options: {
  		iconUrl:       'marker-icon.png',
  		iconRetinaUrl: 'marker-icon-2x.png',
  		shadowUrl:     'marker-shadow.png',
  		iconSize:    [25, 41],
  		iconAnchor:  [12, 41],
  		popupAnchor: [1, -34],
  		tooltipAnchor: [16, -28],
  		shadowSize:  [41, 41]
  	},

  	_getIconUrl: function (name) {
  		if (typeof IconDefault.imagePath !== 'string') {	// Deprecated, backwards-compatibility only
  			IconDefault.imagePath = this._detectIconPath();
  		}

  		// @option imagePath: String
  		// `Icon.Default` will try to auto-detect the location of the
  		// blue icon images. If you are placing these images in a non-standard
  		// way, set this option to point to the right path.
  		return (this.options.imagePath || IconDefault.imagePath) + Icon.prototype._getIconUrl.call(this, name);
  	},

  	_stripUrl: function (path) {	// separate function to use in tests
  		var strip = function (str, re, idx) {
  			var match = re.exec(str);
  			return match && match[idx];
  		};
  		path = strip(path, /^url\((['"])?(.+)\1\)$/, 2);
  		return path && strip(path, /^(.*)marker-icon\.png$/, 1);
  	},

  	_detectIconPath: function () {
  		var el = create$1('div',  'leaflet-default-icon-path', document.body);
  		var path = getStyle(el, 'background-image') ||
  		           getStyle(el, 'backgroundImage');	// IE8

  		document.body.removeChild(el);
  		path = this._stripUrl(path);
  		if (path) { return path; }
  		var link = document.querySelector('link[href$="leaflet.css"]');
  		if (!link) { return ''; }
  		return link.href.substring(0, link.href.length - 'leaflet.css'.length - 1);
  	}
  });

  /*
   * L.Handler.MarkerDrag is used internally by L.Marker to make the markers draggable.
   */


  /* @namespace Marker
   * @section Interaction handlers
   *
   * Interaction handlers are properties of a marker instance that allow you to control interaction behavior in runtime, enabling or disabling certain features such as dragging (see `Handler` methods). Example:
   *
   * ```js
   * marker.dragging.disable();
   * ```
   *
   * @property dragging: Handler
   * Marker dragging handler (by both mouse and touch). Only valid when the marker is on the map (Otherwise set [`marker.options.draggable`](#marker-draggable)).
   */

  var MarkerDrag = Handler.extend({
  	initialize: function (marker) {
  		this._marker = marker;
  	},

  	addHooks: function () {
  		var icon = this._marker._icon;

  		if (!this._draggable) {
  			this._draggable = new Draggable(icon, icon, true);
  		}

  		this._draggable.on({
  			dragstart: this._onDragStart,
  			predrag: this._onPreDrag,
  			drag: this._onDrag,
  			dragend: this._onDragEnd
  		}, this).enable();

  		addClass(icon, 'leaflet-marker-draggable');
  	},

  	removeHooks: function () {
  		this._draggable.off({
  			dragstart: this._onDragStart,
  			predrag: this._onPreDrag,
  			drag: this._onDrag,
  			dragend: this._onDragEnd
  		}, this).disable();

  		if (this._marker._icon) {
  			removeClass(this._marker._icon, 'leaflet-marker-draggable');
  		}
  	},

  	moved: function () {
  		return this._draggable && this._draggable._moved;
  	},

  	_adjustPan: function (e) {
  		var marker = this._marker,
  		    map = marker._map,
  		    speed = this._marker.options.autoPanSpeed,
  		    padding = this._marker.options.autoPanPadding,
  		    iconPos = getPosition(marker._icon),
  		    bounds = map.getPixelBounds(),
  		    origin = map.getPixelOrigin();

  		var panBounds = toBounds(
  			bounds.min._subtract(origin).add(padding),
  			bounds.max._subtract(origin).subtract(padding)
  		);

  		if (!panBounds.contains(iconPos)) {
  			// Compute incremental movement
  			var movement = toPoint(
  				(Math.max(panBounds.max.x, iconPos.x) - panBounds.max.x) / (bounds.max.x - panBounds.max.x) -
  				(Math.min(panBounds.min.x, iconPos.x) - panBounds.min.x) / (bounds.min.x - panBounds.min.x),

  				(Math.max(panBounds.max.y, iconPos.y) - panBounds.max.y) / (bounds.max.y - panBounds.max.y) -
  				(Math.min(panBounds.min.y, iconPos.y) - panBounds.min.y) / (bounds.min.y - panBounds.min.y)
  			).multiplyBy(speed);

  			map.panBy(movement, {animate: false});

  			this._draggable._newPos._add(movement);
  			this._draggable._startPos._add(movement);

  			setPosition(marker._icon, this._draggable._newPos);
  			this._onDrag(e);

  			this._panRequest = requestAnimFrame(this._adjustPan.bind(this, e));
  		}
  	},

  	_onDragStart: function () {
  		// @section Dragging events
  		// @event dragstart: Event
  		// Fired when the user starts dragging the marker.

  		// @event movestart: Event
  		// Fired when the marker starts moving (because of dragging).

  		this._oldLatLng = this._marker.getLatLng();

  		// When using ES6 imports it could not be set when `Popup` was not imported as well
  		this._marker.closePopup && this._marker.closePopup();

  		this._marker
  			.fire('movestart')
  			.fire('dragstart');
  	},

  	_onPreDrag: function (e) {
  		if (this._marker.options.autoPan) {
  			cancelAnimFrame(this._panRequest);
  			this._panRequest = requestAnimFrame(this._adjustPan.bind(this, e));
  		}
  	},

  	_onDrag: function (e) {
  		var marker = this._marker,
  		    shadow = marker._shadow,
  		    iconPos = getPosition(marker._icon),
  		    latlng = marker._map.layerPointToLatLng(iconPos);

  		// update shadow position
  		if (shadow) {
  			setPosition(shadow, iconPos);
  		}

  		marker._latlng = latlng;
  		e.latlng = latlng;
  		e.oldLatLng = this._oldLatLng;

  		// @event drag: Event
  		// Fired repeatedly while the user drags the marker.
  		marker
  		    .fire('move', e)
  		    .fire('drag', e);
  	},

  	_onDragEnd: function (e) {
  		// @event dragend: DragEndEvent
  		// Fired when the user stops dragging the marker.

  		 cancelAnimFrame(this._panRequest);

  		// @event moveend: Event
  		// Fired when the marker stops moving (because of dragging).
  		delete this._oldLatLng;
  		this._marker
  		    .fire('moveend')
  		    .fire('dragend', e);
  	}
  });

  /*
   * @class Marker
   * @inherits Interactive layer
   * @aka L.Marker
   * L.Marker is used to display clickable/draggable icons on the map. Extends `Layer`.
   *
   * @example
   *
   * ```js
   * L.marker([50.5, 30.5]).addTo(map);
   * ```
   */

  var Marker = Layer.extend({

  	// @section
  	// @aka Marker options
  	options: {
  		// @option icon: Icon = *
  		// Icon instance to use for rendering the marker.
  		// See [Icon documentation](#L.Icon) for details on how to customize the marker icon.
  		// If not specified, a common instance of `L.Icon.Default` is used.
  		icon: new IconDefault(),

  		// Option inherited from "Interactive layer" abstract class
  		interactive: true,

  		// @option keyboard: Boolean = true
  		// Whether the marker can be tabbed to with a keyboard and clicked by pressing enter.
  		keyboard: true,

  		// @option title: String = ''
  		// Text for the browser tooltip that appear on marker hover (no tooltip by default).
  		// [Useful for accessibility](https://leafletjs.com/examples/accessibility/#markers-must-be-labelled).
  		title: '',

  		// @option alt: String = 'Marker'
  		// Text for the `alt` attribute of the icon image.
  		// [Useful for accessibility](https://leafletjs.com/examples/accessibility/#markers-must-be-labelled).
  		alt: 'Marker',

  		// @option zIndexOffset: Number = 0
  		// By default, marker images zIndex is set automatically based on its latitude. Use this option if you want to put the marker on top of all others (or below), specifying a high value like `1000` (or high negative value, respectively).
  		zIndexOffset: 0,

  		// @option opacity: Number = 1.0
  		// The opacity of the marker.
  		opacity: 1,

  		// @option riseOnHover: Boolean = false
  		// If `true`, the marker will get on top of others when you hover the mouse over it.
  		riseOnHover: false,

  		// @option riseOffset: Number = 250
  		// The z-index offset used for the `riseOnHover` feature.
  		riseOffset: 250,

  		// @option pane: String = 'markerPane'
  		// `Map pane` where the markers icon will be added.
  		pane: 'markerPane',

  		// @option shadowPane: String = 'shadowPane'
  		// `Map pane` where the markers shadow will be added.
  		shadowPane: 'shadowPane',

  		// @option bubblingMouseEvents: Boolean = false
  		// When `true`, a mouse event on this marker will trigger the same event on the map
  		// (unless [`L.DomEvent.stopPropagation`](#domevent-stoppropagation) is used).
  		bubblingMouseEvents: false,

  		// @option autoPanOnFocus: Boolean = true
  		// When `true`, the map will pan whenever the marker is focused (via
  		// e.g. pressing `tab` on the keyboard) to ensure the marker is
  		// visible within the map's bounds
  		autoPanOnFocus: true,

  		// @section Draggable marker options
  		// @option draggable: Boolean = false
  		// Whether the marker is draggable with mouse/touch or not.
  		draggable: false,

  		// @option autoPan: Boolean = false
  		// Whether to pan the map when dragging this marker near its edge or not.
  		autoPan: false,

  		// @option autoPanPadding: Point = Point(50, 50)
  		// Distance (in pixels to the left/right and to the top/bottom) of the
  		// map edge to start panning the map.
  		autoPanPadding: [50, 50],

  		// @option autoPanSpeed: Number = 10
  		// Number of pixels the map should pan by.
  		autoPanSpeed: 10
  	},

  	/* @section
  	 *
  	 * In addition to [shared layer methods](#Layer) like `addTo()` and `remove()` and [popup methods](#Popup) like bindPopup() you can also use the following methods:
  	 */

  	initialize: function (latlng, options) {
  		setOptions(this, options);
  		this._latlng = toLatLng(latlng);
  	},

  	onAdd: function (map) {
  		this._zoomAnimated = this._zoomAnimated && map.options.markerZoomAnimation;

  		if (this._zoomAnimated) {
  			map.on('zoomanim', this._animateZoom, this);
  		}

  		this._initIcon();
  		this.update();
  	},

  	onRemove: function (map) {
  		if (this.dragging && this.dragging.enabled()) {
  			this.options.draggable = true;
  			this.dragging.removeHooks();
  		}
  		delete this.dragging;

  		if (this._zoomAnimated) {
  			map.off('zoomanim', this._animateZoom, this);
  		}

  		this._removeIcon();
  		this._removeShadow();
  	},

  	getEvents: function () {
  		return {
  			zoom: this.update,
  			viewreset: this.update
  		};
  	},

  	// @method getLatLng: LatLng
  	// Returns the current geographical position of the marker.
  	getLatLng: function () {
  		return this._latlng;
  	},

  	// @method setLatLng(latlng: LatLng): this
  	// Changes the marker position to the given point.
  	setLatLng: function (latlng) {
  		var oldLatLng = this._latlng;
  		this._latlng = toLatLng(latlng);
  		this.update();

  		// @event move: Event
  		// Fired when the marker is moved via [`setLatLng`](#marker-setlatlng) or by [dragging](#marker-dragging). Old and new coordinates are included in event arguments as `oldLatLng`, `latlng`.
  		return this.fire('move', {oldLatLng: oldLatLng, latlng: this._latlng});
  	},

  	// @method setZIndexOffset(offset: Number): this
  	// Changes the [zIndex offset](#marker-zindexoffset) of the marker.
  	setZIndexOffset: function (offset) {
  		this.options.zIndexOffset = offset;
  		return this.update();
  	},

  	// @method getIcon: Icon
  	// Returns the current icon used by the marker
  	getIcon: function () {
  		return this.options.icon;
  	},

  	// @method setIcon(icon: Icon): this
  	// Changes the marker icon.
  	setIcon: function (icon) {

  		this.options.icon = icon;

  		if (this._map) {
  			this._initIcon();
  			this.update();
  		}

  		if (this._popup) {
  			this.bindPopup(this._popup, this._popup.options);
  		}

  		return this;
  	},

  	getElement: function () {
  		return this._icon;
  	},

  	update: function () {

  		if (this._icon && this._map) {
  			var pos = this._map.latLngToLayerPoint(this._latlng).round();
  			this._setPos(pos);
  		}

  		return this;
  	},

  	_initIcon: function () {
  		var options = this.options,
  		    classToAdd = 'leaflet-zoom-' + (this._zoomAnimated ? 'animated' : 'hide');

  		var icon = options.icon.createIcon(this._icon),
  		    addIcon = false;

  		// if we're not reusing the icon, remove the old one and init new one
  		if (icon !== this._icon) {
  			if (this._icon) {
  				this._removeIcon();
  			}
  			addIcon = true;

  			if (options.title) {
  				icon.title = options.title;
  			}

  			if (icon.tagName === 'IMG') {
  				icon.alt = options.alt || '';
  			}
  		}

  		addClass(icon, classToAdd);

  		if (options.keyboard) {
  			icon.tabIndex = '0';
  			icon.setAttribute('role', 'button');
  		}

  		this._icon = icon;

  		if (options.riseOnHover) {
  			this.on({
  				mouseover: this._bringToFront,
  				mouseout: this._resetZIndex
  			});
  		}

  		if (this.options.autoPanOnFocus) {
  			on(icon, 'focus', this._panOnFocus, this);
  		}

  		var newShadow = options.icon.createShadow(this._shadow),
  		    addShadow = false;

  		if (newShadow !== this._shadow) {
  			this._removeShadow();
  			addShadow = true;
  		}

  		if (newShadow) {
  			addClass(newShadow, classToAdd);
  			newShadow.alt = '';
  		}
  		this._shadow = newShadow;


  		if (options.opacity < 1) {
  			this._updateOpacity();
  		}


  		if (addIcon) {
  			this.getPane().appendChild(this._icon);
  		}
  		this._initInteraction();
  		if (newShadow && addShadow) {
  			this.getPane(options.shadowPane).appendChild(this._shadow);
  		}
  	},

  	_removeIcon: function () {
  		if (this.options.riseOnHover) {
  			this.off({
  				mouseover: this._bringToFront,
  				mouseout: this._resetZIndex
  			});
  		}

  		if (this.options.autoPanOnFocus) {
  			off(this._icon, 'focus', this._panOnFocus, this);
  		}

  		remove(this._icon);
  		this.removeInteractiveTarget(this._icon);

  		this._icon = null;
  	},

  	_removeShadow: function () {
  		if (this._shadow) {
  			remove(this._shadow);
  		}
  		this._shadow = null;
  	},

  	_setPos: function (pos) {

  		if (this._icon) {
  			setPosition(this._icon, pos);
  		}

  		if (this._shadow) {
  			setPosition(this._shadow, pos);
  		}

  		this._zIndex = pos.y + this.options.zIndexOffset;

  		this._resetZIndex();
  	},

  	_updateZIndex: function (offset) {
  		if (this._icon) {
  			this._icon.style.zIndex = this._zIndex + offset;
  		}
  	},

  	_animateZoom: function (opt) {
  		var pos = this._map._latLngToNewLayerPoint(this._latlng, opt.zoom, opt.center).round();

  		this._setPos(pos);
  	},

  	_initInteraction: function () {

  		if (!this.options.interactive) { return; }

  		addClass(this._icon, 'leaflet-interactive');

  		this.addInteractiveTarget(this._icon);

  		if (MarkerDrag) {
  			var draggable = this.options.draggable;
  			if (this.dragging) {
  				draggable = this.dragging.enabled();
  				this.dragging.disable();
  			}

  			this.dragging = new MarkerDrag(this);

  			if (draggable) {
  				this.dragging.enable();
  			}
  		}
  	},

  	// @method setOpacity(opacity: Number): this
  	// Changes the opacity of the marker.
  	setOpacity: function (opacity) {
  		this.options.opacity = opacity;
  		if (this._map) {
  			this._updateOpacity();
  		}

  		return this;
  	},

  	_updateOpacity: function () {
  		var opacity = this.options.opacity;

  		if (this._icon) {
  			setOpacity(this._icon, opacity);
  		}

  		if (this._shadow) {
  			setOpacity(this._shadow, opacity);
  		}
  	},

  	_bringToFront: function () {
  		this._updateZIndex(this.options.riseOffset);
  	},

  	_resetZIndex: function () {
  		this._updateZIndex(0);
  	},

  	_panOnFocus: function () {
  		var map = this._map;
  		if (!map) { return; }

  		var iconOpts = this.options.icon.options;
  		var size = iconOpts.iconSize ? toPoint(iconOpts.iconSize) : toPoint(0, 0);
  		var anchor = iconOpts.iconAnchor ? toPoint(iconOpts.iconAnchor) : toPoint(0, 0);

  		map.panInside(this._latlng, {
  			paddingTopLeft: anchor,
  			paddingBottomRight: size.subtract(anchor)
  		});
  	},

  	_getPopupAnchor: function () {
  		return this.options.icon.options.popupAnchor;
  	},

  	_getTooltipAnchor: function () {
  		return this.options.icon.options.tooltipAnchor;
  	}
  });


  // factory L.marker(latlng: LatLng, options? : Marker options)

  // @factory L.marker(latlng: LatLng, options? : Marker options)
  // Instantiates a Marker object given a geographical point and optionally an options object.
  function marker(latlng, options) {
  	return new Marker(latlng, options);
  }

  /*
   * @class Path
   * @aka L.Path
   * @inherits Interactive layer
   *
   * An abstract class that contains options and constants shared between vector
   * overlays (Polygon, Polyline, Circle). Do not use it directly. Extends `Layer`.
   */

  var Path = Layer.extend({

  	// @section
  	// @aka Path options
  	options: {
  		// @option stroke: Boolean = true
  		// Whether to draw stroke along the path. Set it to `false` to disable borders on polygons or circles.
  		stroke: true,

  		// @option color: String = '#3388ff'
  		// Stroke color
  		color: '#3388ff',

  		// @option weight: Number = 3
  		// Stroke width in pixels
  		weight: 3,

  		// @option opacity: Number = 1.0
  		// Stroke opacity
  		opacity: 1,

  		// @option lineCap: String= 'round'
  		// A string that defines [shape to be used at the end](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linecap) of the stroke.
  		lineCap: 'round',

  		// @option lineJoin: String = 'round'
  		// A string that defines [shape to be used at the corners](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linejoin) of the stroke.
  		lineJoin: 'round',

  		// @option dashArray: String = null
  		// A string that defines the stroke [dash pattern](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-dasharray). Doesn't work on `Canvas`-powered layers in [some old browsers](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/setLineDash#Browser_compatibility).
  		dashArray: null,

  		// @option dashOffset: String = null
  		// A string that defines the [distance into the dash pattern to start the dash](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-dashoffset). Doesn't work on `Canvas`-powered layers in [some old browsers](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/setLineDash#Browser_compatibility).
  		dashOffset: null,

  		// @option fill: Boolean = depends
  		// Whether to fill the path with color. Set it to `false` to disable filling on polygons or circles.
  		fill: false,

  		// @option fillColor: String = *
  		// Fill color. Defaults to the value of the [`color`](#path-color) option
  		fillColor: null,

  		// @option fillOpacity: Number = 0.2
  		// Fill opacity.
  		fillOpacity: 0.2,

  		// @option fillRule: String = 'evenodd'
  		// A string that defines [how the inside of a shape](https://developer.mozilla.org/docs/Web/SVG/Attribute/fill-rule) is determined.
  		fillRule: 'evenodd',

  		// className: '',

  		// Option inherited from "Interactive layer" abstract class
  		interactive: true,

  		// @option bubblingMouseEvents: Boolean = true
  		// When `true`, a mouse event on this path will trigger the same event on the map
  		// (unless [`L.DomEvent.stopPropagation`](#domevent-stoppropagation) is used).
  		bubblingMouseEvents: true
  	},

  	beforeAdd: function (map) {
  		// Renderer is set here because we need to call renderer.getEvents
  		// before this.getEvents.
  		this._renderer = map.getRenderer(this);
  	},

  	onAdd: function () {
  		this._renderer._initPath(this);
  		this._reset();
  		this._renderer._addPath(this);
  	},

  	onRemove: function () {
  		this._renderer._removePath(this);
  	},

  	// @method redraw(): this
  	// Redraws the layer. Sometimes useful after you changed the coordinates that the path uses.
  	redraw: function () {
  		if (this._map) {
  			this._renderer._updatePath(this);
  		}
  		return this;
  	},

  	// @method setStyle(style: Path options): this
  	// Changes the appearance of a Path based on the options in the `Path options` object.
  	setStyle: function (style) {
  		setOptions(this, style);
  		if (this._renderer) {
  			this._renderer._updateStyle(this);
  			if (this.options.stroke && style && Object.prototype.hasOwnProperty.call(style, 'weight')) {
  				this._updateBounds();
  			}
  		}
  		return this;
  	},

  	// @method bringToFront(): this
  	// Brings the layer to the top of all path layers.
  	bringToFront: function () {
  		if (this._renderer) {
  			this._renderer._bringToFront(this);
  		}
  		return this;
  	},

  	// @method bringToBack(): this
  	// Brings the layer to the bottom of all path layers.
  	bringToBack: function () {
  		if (this._renderer) {
  			this._renderer._bringToBack(this);
  		}
  		return this;
  	},

  	getElement: function () {
  		return this._path;
  	},

  	_reset: function () {
  		// defined in child classes
  		this._project();
  		this._update();
  	},

  	_clickTolerance: function () {
  		// used when doing hit detection for Canvas layers
  		return (this.options.stroke ? this.options.weight / 2 : 0) +
  		  (this._renderer.options.tolerance || 0);
  	}
  });

  /*
   * @class CircleMarker
   * @aka L.CircleMarker
   * @inherits Path
   *
   * A circle of a fixed size with radius specified in pixels. Extends `Path`.
   */

  var CircleMarker = Path.extend({

  	// @section
  	// @aka CircleMarker options
  	options: {
  		fill: true,

  		// @option radius: Number = 10
  		// Radius of the circle marker, in pixels
  		radius: 10
  	},

  	initialize: function (latlng, options) {
  		setOptions(this, options);
  		this._latlng = toLatLng(latlng);
  		this._radius = this.options.radius;
  	},

  	// @method setLatLng(latLng: LatLng): this
  	// Sets the position of a circle marker to a new location.
  	setLatLng: function (latlng) {
  		var oldLatLng = this._latlng;
  		this._latlng = toLatLng(latlng);
  		this.redraw();

  		// @event move: Event
  		// Fired when the marker is moved via [`setLatLng`](#circlemarker-setlatlng). Old and new coordinates are included in event arguments as `oldLatLng`, `latlng`.
  		return this.fire('move', {oldLatLng: oldLatLng, latlng: this._latlng});
  	},

  	// @method getLatLng(): LatLng
  	// Returns the current geographical position of the circle marker
  	getLatLng: function () {
  		return this._latlng;
  	},

  	// @method setRadius(radius: Number): this
  	// Sets the radius of a circle marker. Units are in pixels.
  	setRadius: function (radius) {
  		this.options.radius = this._radius = radius;
  		return this.redraw();
  	},

  	// @method getRadius(): Number
  	// Returns the current radius of the circle
  	getRadius: function () {
  		return this._radius;
  	},

  	setStyle : function (options) {
  		var radius = options && options.radius || this._radius;
  		Path.prototype.setStyle.call(this, options);
  		this.setRadius(radius);
  		return this;
  	},

  	_project: function () {
  		this._point = this._map.latLngToLayerPoint(this._latlng);
  		this._updateBounds();
  	},

  	_updateBounds: function () {
  		var r = this._radius,
  		    r2 = this._radiusY || r,
  		    w = this._clickTolerance(),
  		    p = [r + w, r2 + w];
  		this._pxBounds = new Bounds(this._point.subtract(p), this._point.add(p));
  	},

  	_update: function () {
  		if (this._map) {
  			this._updatePath();
  		}
  	},

  	_updatePath: function () {
  		this._renderer._updateCircle(this);
  	},

  	_empty: function () {
  		return this._radius && !this._renderer._bounds.intersects(this._pxBounds);
  	},

  	// Needed by the `Canvas` renderer for interactivity
  	_containsPoint: function (p) {
  		return p.distanceTo(this._point) <= this._radius + this._clickTolerance();
  	}
  });


  // @factory L.circleMarker(latlng: LatLng, options?: CircleMarker options)
  // Instantiates a circle marker object given a geographical point, and an optional options object.
  function circleMarker(latlng, options) {
  	return new CircleMarker(latlng, options);
  }

  /*
   * @class Circle
   * @aka L.Circle
   * @inherits CircleMarker
   *
   * A class for drawing circle overlays on a map. Extends `CircleMarker`.
   *
   * It's an approximation and starts to diverge from a real circle closer to poles (due to projection distortion).
   *
   * @example
   *
   * ```js
   * L.circle([50.5, 30.5], {radius: 200}).addTo(map);
   * ```
   */

  var Circle = CircleMarker.extend({

  	initialize: function (latlng, options, legacyOptions) {
  		if (typeof options === 'number') {
  			// Backwards compatibility with 0.7.x factory (latlng, radius, options?)
  			options = extend({}, legacyOptions, {radius: options});
  		}
  		setOptions(this, options);
  		this._latlng = toLatLng(latlng);

  		if (isNaN(this.options.radius)) { throw new Error('Circle radius cannot be NaN'); }

  		// @section
  		// @aka Circle options
  		// @option radius: Number; Radius of the circle, in meters.
  		this._mRadius = this.options.radius;
  	},

  	// @method setRadius(radius: Number): this
  	// Sets the radius of a circle. Units are in meters.
  	setRadius: function (radius) {
  		this._mRadius = radius;
  		return this.redraw();
  	},

  	// @method getRadius(): Number
  	// Returns the current radius of a circle. Units are in meters.
  	getRadius: function () {
  		return this._mRadius;
  	},

  	// @method getBounds(): LatLngBounds
  	// Returns the `LatLngBounds` of the path.
  	getBounds: function () {
  		var half = [this._radius, this._radiusY || this._radius];

  		return new LatLngBounds(
  			this._map.layerPointToLatLng(this._point.subtract(half)),
  			this._map.layerPointToLatLng(this._point.add(half)));
  	},

  	setStyle: Path.prototype.setStyle,

  	_project: function () {

  		var lng = this._latlng.lng,
  		    lat = this._latlng.lat,
  		    map = this._map,
  		    crs = map.options.crs;

  		if (crs.distance === Earth.distance) {
  			var d = Math.PI / 180,
  			    latR = (this._mRadius / Earth.R) / d,
  			    top = map.project([lat + latR, lng]),
  			    bottom = map.project([lat - latR, lng]),
  			    p = top.add(bottom).divideBy(2),
  			    lat2 = map.unproject(p).lat,
  			    lngR = Math.acos((Math.cos(latR * d) - Math.sin(lat * d) * Math.sin(lat2 * d)) /
  			            (Math.cos(lat * d) * Math.cos(lat2 * d))) / d;

  			if (isNaN(lngR) || lngR === 0) {
  				lngR = latR / Math.cos(Math.PI / 180 * lat); // Fallback for edge case, #2425
  			}

  			this._point = p.subtract(map.getPixelOrigin());
  			this._radius = isNaN(lngR) ? 0 : p.x - map.project([lat2, lng - lngR]).x;
  			this._radiusY = p.y - top.y;

  		} else {
  			var latlng2 = crs.unproject(crs.project(this._latlng).subtract([this._mRadius, 0]));

  			this._point = map.latLngToLayerPoint(this._latlng);
  			this._radius = this._point.x - map.latLngToLayerPoint(latlng2).x;
  		}

  		this._updateBounds();
  	}
  });

  // @factory L.circle(latlng: LatLng, options?: Circle options)
  // Instantiates a circle object given a geographical point, and an options object
  // which contains the circle radius.
  // @alternative
  // @factory L.circle(latlng: LatLng, radius: Number, options?: Circle options)
  // Obsolete way of instantiating a circle, for compatibility with 0.7.x code.
  // Do not use in new applications or plugins.
  function circle(latlng, options, legacyOptions) {
  	return new Circle(latlng, options, legacyOptions);
  }

  /*
   * @class Polyline
   * @aka L.Polyline
   * @inherits Path
   *
   * A class for drawing polyline overlays on a map. Extends `Path`.
   *
   * @example
   *
   * ```js
   * // create a red polyline from an array of LatLng points
   * var latlngs = [
   * 	[45.51, -122.68],
   * 	[37.77, -122.43],
   * 	[34.04, -118.2]
   * ];
   *
   * var polyline = L.polyline(latlngs, {color: 'red'}).addTo(map);
   *
   * // zoom the map to the polyline
   * map.fitBounds(polyline.getBounds());
   * ```
   *
   * You can also pass a multi-dimensional array to represent a `MultiPolyline` shape:
   *
   * ```js
   * // create a red polyline from an array of arrays of LatLng points
   * var latlngs = [
   * 	[[45.51, -122.68],
   * 	 [37.77, -122.43],
   * 	 [34.04, -118.2]],
   * 	[[40.78, -73.91],
   * 	 [41.83, -87.62],
   * 	 [32.76, -96.72]]
   * ];
   * ```
   */


  var Polyline = Path.extend({

  	// @section
  	// @aka Polyline options
  	options: {
  		// @option smoothFactor: Number = 1.0
  		// How much to simplify the polyline on each zoom level. More means
  		// better performance and smoother look, and less means more accurate representation.
  		smoothFactor: 1.0,

  		// @option noClip: Boolean = false
  		// Disable polyline clipping.
  		noClip: false
  	},

  	initialize: function (latlngs, options) {
  		setOptions(this, options);
  		this._setLatLngs(latlngs);
  	},

  	// @method getLatLngs(): LatLng[]
  	// Returns an array of the points in the path, or nested arrays of points in case of multi-polyline.
  	getLatLngs: function () {
  		return this._latlngs;
  	},

  	// @method setLatLngs(latlngs: LatLng[]): this
  	// Replaces all the points in the polyline with the given array of geographical points.
  	setLatLngs: function (latlngs) {
  		this._setLatLngs(latlngs);
  		return this.redraw();
  	},

  	// @method isEmpty(): Boolean
  	// Returns `true` if the Polyline has no LatLngs.
  	isEmpty: function () {
  		return !this._latlngs.length;
  	},

  	// @method closestLayerPoint(p: Point): Point
  	// Returns the point closest to `p` on the Polyline.
  	closestLayerPoint: function (p) {
  		var minDistance = Infinity,
  		    minPoint = null,
  		    closest = _sqClosestPointOnSegment,
  		    p1, p2;

  		for (var j = 0, jLen = this._parts.length; j < jLen; j++) {
  			var points = this._parts[j];

  			for (var i = 1, len = points.length; i < len; i++) {
  				p1 = points[i - 1];
  				p2 = points[i];

  				var sqDist = closest(p, p1, p2, true);

  				if (sqDist < minDistance) {
  					minDistance = sqDist;
  					minPoint = closest(p, p1, p2);
  				}
  			}
  		}
  		if (minPoint) {
  			minPoint.distance = Math.sqrt(minDistance);
  		}
  		return minPoint;
  	},

  	// @method getCenter(): LatLng
  	// Returns the center ([centroid](https://en.wikipedia.org/wiki/Centroid)) of the polyline.
  	getCenter: function () {
  		// throws error when not yet added to map as this center calculation requires projected coordinates
  		if (!this._map) {
  			throw new Error('Must add layer to map before using getCenter()');
  		}
  		return polylineCenter(this._defaultShape(), this._map.options.crs);
  	},

  	// @method getBounds(): LatLngBounds
  	// Returns the `LatLngBounds` of the path.
  	getBounds: function () {
  		return this._bounds;
  	},

  	// @method addLatLng(latlng: LatLng, latlngs?: LatLng[]): this
  	// Adds a given point to the polyline. By default, adds to the first ring of
  	// the polyline in case of a multi-polyline, but can be overridden by passing
  	// a specific ring as a LatLng array (that you can earlier access with [`getLatLngs`](#polyline-getlatlngs)).
  	addLatLng: function (latlng, latlngs) {
  		latlngs = latlngs || this._defaultShape();
  		latlng = toLatLng(latlng);
  		latlngs.push(latlng);
  		this._bounds.extend(latlng);
  		return this.redraw();
  	},

  	_setLatLngs: function (latlngs) {
  		this._bounds = new LatLngBounds();
  		this._latlngs = this._convertLatLngs(latlngs);
  	},

  	_defaultShape: function () {
  		return isFlat(this._latlngs) ? this._latlngs : this._latlngs[0];
  	},

  	// recursively convert latlngs input into actual LatLng instances; calculate bounds along the way
  	_convertLatLngs: function (latlngs) {
  		var result = [],
  		    flat = isFlat(latlngs);

  		for (var i = 0, len = latlngs.length; i < len; i++) {
  			if (flat) {
  				result[i] = toLatLng(latlngs[i]);
  				this._bounds.extend(result[i]);
  			} else {
  				result[i] = this._convertLatLngs(latlngs[i]);
  			}
  		}

  		return result;
  	},

  	_project: function () {
  		var pxBounds = new Bounds();
  		this._rings = [];
  		this._projectLatlngs(this._latlngs, this._rings, pxBounds);

  		if (this._bounds.isValid() && pxBounds.isValid()) {
  			this._rawPxBounds = pxBounds;
  			this._updateBounds();
  		}
  	},

  	_updateBounds: function () {
  		var w = this._clickTolerance(),
  		    p = new Point(w, w);

  		if (!this._rawPxBounds) {
  			return;
  		}

  		this._pxBounds = new Bounds([
  			this._rawPxBounds.min.subtract(p),
  			this._rawPxBounds.max.add(p)
  		]);
  	},

  	// recursively turns latlngs into a set of rings with projected coordinates
  	_projectLatlngs: function (latlngs, result, projectedBounds) {
  		var flat = latlngs[0] instanceof LatLng,
  		    len = latlngs.length,
  		    i, ring;

  		if (flat) {
  			ring = [];
  			for (i = 0; i < len; i++) {
  				ring[i] = this._map.latLngToLayerPoint(latlngs[i]);
  				projectedBounds.extend(ring[i]);
  			}
  			result.push(ring);
  		} else {
  			for (i = 0; i < len; i++) {
  				this._projectLatlngs(latlngs[i], result, projectedBounds);
  			}
  		}
  	},

  	// clip polyline by renderer bounds so that we have less to render for performance
  	_clipPoints: function () {
  		var bounds = this._renderer._bounds;

  		this._parts = [];
  		if (!this._pxBounds || !this._pxBounds.intersects(bounds)) {
  			return;
  		}

  		if (this.options.noClip) {
  			this._parts = this._rings;
  			return;
  		}

  		var parts = this._parts,
  		    i, j, k, len, len2, segment, points;

  		for (i = 0, k = 0, len = this._rings.length; i < len; i++) {
  			points = this._rings[i];

  			for (j = 0, len2 = points.length; j < len2 - 1; j++) {
  				segment = clipSegment(points[j], points[j + 1], bounds, j, true);

  				if (!segment) { continue; }

  				parts[k] = parts[k] || [];
  				parts[k].push(segment[0]);

  				// if segment goes out of screen, or it's the last one, it's the end of the line part
  				if ((segment[1] !== points[j + 1]) || (j === len2 - 2)) {
  					parts[k].push(segment[1]);
  					k++;
  				}
  			}
  		}
  	},

  	// simplify each clipped part of the polyline for performance
  	_simplifyPoints: function () {
  		var parts = this._parts,
  		    tolerance = this.options.smoothFactor;

  		for (var i = 0, len = parts.length; i < len; i++) {
  			parts[i] = simplify(parts[i], tolerance);
  		}
  	},

  	_update: function () {
  		if (!this._map) { return; }

  		this._clipPoints();
  		this._simplifyPoints();
  		this._updatePath();
  	},

  	_updatePath: function () {
  		this._renderer._updatePoly(this);
  	},

  	// Needed by the `Canvas` renderer for interactivity
  	_containsPoint: function (p, closed) {
  		var i, j, k, len, len2, part,
  		    w = this._clickTolerance();

  		if (!this._pxBounds || !this._pxBounds.contains(p)) { return false; }

  		// hit detection for polylines
  		for (i = 0, len = this._parts.length; i < len; i++) {
  			part = this._parts[i];

  			for (j = 0, len2 = part.length, k = len2 - 1; j < len2; k = j++) {
  				if (!closed && (j === 0)) { continue; }

  				if (pointToSegmentDistance(p, part[k], part[j]) <= w) {
  					return true;
  				}
  			}
  		}
  		return false;
  	}
  });

  // @factory L.polyline(latlngs: LatLng[], options?: Polyline options)
  // Instantiates a polyline object given an array of geographical points and
  // optionally an options object. You can create a `Polyline` object with
  // multiple separate lines (`MultiPolyline`) by passing an array of arrays
  // of geographic points.
  function polyline(latlngs, options) {
  	return new Polyline(latlngs, options);
  }

  // Retrocompat. Allow plugins to support Leaflet versions before and after 1.1.
  Polyline._flat = _flat;

  /*
   * @class Polygon
   * @aka L.Polygon
   * @inherits Polyline
   *
   * A class for drawing polygon overlays on a map. Extends `Polyline`.
   *
   * Note that points you pass when creating a polygon shouldn't have an additional last point equal to the first one — it's better to filter out such points.
   *
   *
   * @example
   *
   * ```js
   * // create a red polygon from an array of LatLng points
   * var latlngs = [[37, -109.05],[41, -109.03],[41, -102.05],[37, -102.04]];
   *
   * var polygon = L.polygon(latlngs, {color: 'red'}).addTo(map);
   *
   * // zoom the map to the polygon
   * map.fitBounds(polygon.getBounds());
   * ```
   *
   * You can also pass an array of arrays of latlngs, with the first array representing the outer shape and the other arrays representing holes in the outer shape:
   *
   * ```js
   * var latlngs = [
   *   [[37, -109.05],[41, -109.03],[41, -102.05],[37, -102.04]], // outer ring
   *   [[37.29, -108.58],[40.71, -108.58],[40.71, -102.50],[37.29, -102.50]] // hole
   * ];
   * ```
   *
   * Additionally, you can pass a multi-dimensional array to represent a MultiPolygon shape.
   *
   * ```js
   * var latlngs = [
   *   [ // first polygon
   *     [[37, -109.05],[41, -109.03],[41, -102.05],[37, -102.04]], // outer ring
   *     [[37.29, -108.58],[40.71, -108.58],[40.71, -102.50],[37.29, -102.50]] // hole
   *   ],
   *   [ // second polygon
   *     [[41, -111.03],[45, -111.04],[45, -104.05],[41, -104.05]]
   *   ]
   * ];
   * ```
   */

  var Polygon = Polyline.extend({

  	options: {
  		fill: true
  	},

  	isEmpty: function () {
  		return !this._latlngs.length || !this._latlngs[0].length;
  	},

  	// @method getCenter(): LatLng
  	// Returns the center ([centroid](http://en.wikipedia.org/wiki/Centroid)) of the Polygon.
  	getCenter: function () {
  		// throws error when not yet added to map as this center calculation requires projected coordinates
  		if (!this._map) {
  			throw new Error('Must add layer to map before using getCenter()');
  		}
  		return polygonCenter(this._defaultShape(), this._map.options.crs);
  	},

  	_convertLatLngs: function (latlngs) {
  		var result = Polyline.prototype._convertLatLngs.call(this, latlngs),
  		    len = result.length;

  		// remove last point if it equals first one
  		if (len >= 2 && result[0] instanceof LatLng && result[0].equals(result[len - 1])) {
  			result.pop();
  		}
  		return result;
  	},

  	_setLatLngs: function (latlngs) {
  		Polyline.prototype._setLatLngs.call(this, latlngs);
  		if (isFlat(this._latlngs)) {
  			this._latlngs = [this._latlngs];
  		}
  	},

  	_defaultShape: function () {
  		return isFlat(this._latlngs[0]) ? this._latlngs[0] : this._latlngs[0][0];
  	},

  	_clipPoints: function () {
  		// polygons need a different clipping algorithm so we redefine that

  		var bounds = this._renderer._bounds,
  		    w = this.options.weight,
  		    p = new Point(w, w);

  		// increase clip padding by stroke width to avoid stroke on clip edges
  		bounds = new Bounds(bounds.min.subtract(p), bounds.max.add(p));

  		this._parts = [];
  		if (!this._pxBounds || !this._pxBounds.intersects(bounds)) {
  			return;
  		}

  		if (this.options.noClip) {
  			this._parts = this._rings;
  			return;
  		}

  		for (var i = 0, len = this._rings.length, clipped; i < len; i++) {
  			clipped = clipPolygon(this._rings[i], bounds, true);
  			if (clipped.length) {
  				this._parts.push(clipped);
  			}
  		}
  	},

  	_updatePath: function () {
  		this._renderer._updatePoly(this, true);
  	},

  	// Needed by the `Canvas` renderer for interactivity
  	_containsPoint: function (p) {
  		var inside = false,
  		    part, p1, p2, i, j, k, len, len2;

  		if (!this._pxBounds || !this._pxBounds.contains(p)) { return false; }

  		// ray casting algorithm for detecting if point is in polygon
  		for (i = 0, len = this._parts.length; i < len; i++) {
  			part = this._parts[i];

  			for (j = 0, len2 = part.length, k = len2 - 1; j < len2; k = j++) {
  				p1 = part[j];
  				p2 = part[k];

  				if (((p1.y > p.y) !== (p2.y > p.y)) && (p.x < (p2.x - p1.x) * (p.y - p1.y) / (p2.y - p1.y) + p1.x)) {
  					inside = !inside;
  				}
  			}
  		}

  		// also check if it's on polygon stroke
  		return inside || Polyline.prototype._containsPoint.call(this, p, true);
  	}

  });


  // @factory L.polygon(latlngs: LatLng[], options?: Polyline options)
  function polygon(latlngs, options) {
  	return new Polygon(latlngs, options);
  }

  /*
   * @class GeoJSON
   * @aka L.GeoJSON
   * @inherits FeatureGroup
   *
   * Represents a GeoJSON object or an array of GeoJSON objects. Allows you to parse
   * GeoJSON data and display it on the map. Extends `FeatureGroup`.
   *
   * @example
   *
   * ```js
   * L.geoJSON(data, {
   * 	style: function (feature) {
   * 		return {color: feature.properties.color};
   * 	}
   * }).bindPopup(function (layer) {
   * 	return layer.feature.properties.description;
   * }).addTo(map);
   * ```
   */

  var GeoJSON = FeatureGroup.extend({

  	/* @section
  	 * @aka GeoJSON options
  	 *
  	 * @option pointToLayer: Function = *
  	 * A `Function` defining how GeoJSON points spawn Leaflet layers. It is internally
  	 * called when data is added, passing the GeoJSON point feature and its `LatLng`.
  	 * The default is to spawn a default `Marker`:
  	 * ```js
  	 * function(geoJsonPoint, latlng) {
  	 * 	return L.marker(latlng);
  	 * }
  	 * ```
  	 *
  	 * @option style: Function = *
  	 * A `Function` defining the `Path options` for styling GeoJSON lines and polygons,
  	 * called internally when data is added.
  	 * The default value is to not override any defaults:
  	 * ```js
  	 * function (geoJsonFeature) {
  	 * 	return {}
  	 * }
  	 * ```
  	 *
  	 * @option onEachFeature: Function = *
  	 * A `Function` that will be called once for each created `Feature`, after it has
  	 * been created and styled. Useful for attaching events and popups to features.
  	 * The default is to do nothing with the newly created layers:
  	 * ```js
  	 * function (feature, layer) {}
  	 * ```
  	 *
  	 * @option filter: Function = *
  	 * A `Function` that will be used to decide whether to include a feature or not.
  	 * The default is to include all features:
  	 * ```js
  	 * function (geoJsonFeature) {
  	 * 	return true;
  	 * }
  	 * ```
  	 * Note: dynamically changing the `filter` option will have effect only on newly
  	 * added data. It will _not_ re-evaluate already included features.
  	 *
  	 * @option coordsToLatLng: Function = *
  	 * A `Function` that will be used for converting GeoJSON coordinates to `LatLng`s.
  	 * The default is the `coordsToLatLng` static method.
  	 *
  	 * @option markersInheritOptions: Boolean = false
  	 * Whether default Markers for "Point" type Features inherit from group options.
  	 */

  	initialize: function (geojson, options) {
  		setOptions(this, options);

  		this._layers = {};

  		if (geojson) {
  			this.addData(geojson);
  		}
  	},

  	// @method addData( <GeoJSON> data ): this
  	// Adds a GeoJSON object to the layer.
  	addData: function (geojson) {
  		var features = isArray(geojson) ? geojson : geojson.features,
  		    i, len, feature;

  		if (features) {
  			for (i = 0, len = features.length; i < len; i++) {
  				// only add this if geometry or geometries are set and not null
  				feature = features[i];
  				if (feature.geometries || feature.geometry || feature.features || feature.coordinates) {
  					this.addData(feature);
  				}
  			}
  			return this;
  		}

  		var options = this.options;

  		if (options.filter && !options.filter(geojson)) { return this; }

  		var layer = geometryToLayer(geojson, options);
  		if (!layer) {
  			return this;
  		}
  		layer.feature = asFeature(geojson);

  		layer.defaultOptions = layer.options;
  		this.resetStyle(layer);

  		if (options.onEachFeature) {
  			options.onEachFeature(geojson, layer);
  		}

  		return this.addLayer(layer);
  	},

  	// @method resetStyle( <Path> layer? ): this
  	// Resets the given vector layer's style to the original GeoJSON style, useful for resetting style after hover events.
  	// If `layer` is omitted, the style of all features in the current layer is reset.
  	resetStyle: function (layer) {
  		if (layer === undefined) {
  			return this.eachLayer(this.resetStyle, this);
  		}
  		// reset any custom styles
  		layer.options = extend({}, layer.defaultOptions);
  		this._setLayerStyle(layer, this.options.style);
  		return this;
  	},

  	// @method setStyle( <Function> style ): this
  	// Changes styles of GeoJSON vector layers with the given style function.
  	setStyle: function (style) {
  		return this.eachLayer(function (layer) {
  			this._setLayerStyle(layer, style);
  		}, this);
  	},

  	_setLayerStyle: function (layer, style) {
  		if (layer.setStyle) {
  			if (typeof style === 'function') {
  				style = style(layer.feature);
  			}
  			layer.setStyle(style);
  		}
  	}
  });

  // @section
  // There are several static functions which can be called without instantiating L.GeoJSON:

  // @function geometryToLayer(featureData: Object, options?: GeoJSON options): Layer
  // Creates a `Layer` from a given GeoJSON feature. Can use a custom
  // [`pointToLayer`](#geojson-pointtolayer) and/or [`coordsToLatLng`](#geojson-coordstolatlng)
  // functions if provided as options.
  function geometryToLayer(geojson, options) {

  	var geometry = geojson.type === 'Feature' ? geojson.geometry : geojson,
  	    coords = geometry ? geometry.coordinates : null,
  	    layers = [],
  	    pointToLayer = options && options.pointToLayer,
  	    _coordsToLatLng = options && options.coordsToLatLng || coordsToLatLng,
  	    latlng, latlngs, i, len;

  	if (!coords && !geometry) {
  		return null;
  	}

  	switch (geometry.type) {
  	case 'Point':
  		latlng = _coordsToLatLng(coords);
  		return _pointToLayer(pointToLayer, geojson, latlng, options);

  	case 'MultiPoint':
  		for (i = 0, len = coords.length; i < len; i++) {
  			latlng = _coordsToLatLng(coords[i]);
  			layers.push(_pointToLayer(pointToLayer, geojson, latlng, options));
  		}
  		return new FeatureGroup(layers);

  	case 'LineString':
  	case 'MultiLineString':
  		latlngs = coordsToLatLngs(coords, geometry.type === 'LineString' ? 0 : 1, _coordsToLatLng);
  		return new Polyline(latlngs, options);

  	case 'Polygon':
  	case 'MultiPolygon':
  		latlngs = coordsToLatLngs(coords, geometry.type === 'Polygon' ? 1 : 2, _coordsToLatLng);
  		return new Polygon(latlngs, options);

  	case 'GeometryCollection':
  		for (i = 0, len = geometry.geometries.length; i < len; i++) {
  			var geoLayer = geometryToLayer({
  				geometry: geometry.geometries[i],
  				type: 'Feature',
  				properties: geojson.properties
  			}, options);

  			if (geoLayer) {
  				layers.push(geoLayer);
  			}
  		}
  		return new FeatureGroup(layers);

  	case 'FeatureCollection':
  		for (i = 0, len = geometry.features.length; i < len; i++) {
  			var featureLayer = geometryToLayer(geometry.features[i], options);

  			if (featureLayer) {
  				layers.push(featureLayer);
  			}
  		}
  		return new FeatureGroup(layers);

  	default:
  		throw new Error('Invalid GeoJSON object.');
  	}
  }

  function _pointToLayer(pointToLayerFn, geojson, latlng, options) {
  	return pointToLayerFn ?
  		pointToLayerFn(geojson, latlng) :
  		new Marker(latlng, options && options.markersInheritOptions && options);
  }

  // @function coordsToLatLng(coords: Array): LatLng
  // Creates a `LatLng` object from an array of 2 numbers (longitude, latitude)
  // or 3 numbers (longitude, latitude, altitude) used in GeoJSON for points.
  function coordsToLatLng(coords) {
  	return new LatLng(coords[1], coords[0], coords[2]);
  }

  // @function coordsToLatLngs(coords: Array, levelsDeep?: Number, coordsToLatLng?: Function): Array
  // Creates a multidimensional array of `LatLng`s from a GeoJSON coordinates array.
  // `levelsDeep` specifies the nesting level (0 is for an array of points, 1 for an array of arrays of points, etc., 0 by default).
  // Can use a custom [`coordsToLatLng`](#geojson-coordstolatlng) function.
  function coordsToLatLngs(coords, levelsDeep, _coordsToLatLng) {
  	var latlngs = [];

  	for (var i = 0, len = coords.length, latlng; i < len; i++) {
  		latlng = levelsDeep ?
  			coordsToLatLngs(coords[i], levelsDeep - 1, _coordsToLatLng) :
  			(_coordsToLatLng || coordsToLatLng)(coords[i]);

  		latlngs.push(latlng);
  	}

  	return latlngs;
  }

  // @function latLngToCoords(latlng: LatLng, precision?: Number|false): Array
  // Reverse of [`coordsToLatLng`](#geojson-coordstolatlng)
  // Coordinates values are rounded with [`formatNum`](#util-formatnum) function.
  function latLngToCoords(latlng, precision) {
  	latlng = toLatLng(latlng);
  	return latlng.alt !== undefined ?
  		[formatNum(latlng.lng, precision), formatNum(latlng.lat, precision), formatNum(latlng.alt, precision)] :
  		[formatNum(latlng.lng, precision), formatNum(latlng.lat, precision)];
  }

  // @function latLngsToCoords(latlngs: Array, levelsDeep?: Number, closed?: Boolean, precision?: Number|false): Array
  // Reverse of [`coordsToLatLngs`](#geojson-coordstolatlngs)
  // `closed` determines whether the first point should be appended to the end of the array to close the feature, only used when `levelsDeep` is 0. False by default.
  // Coordinates values are rounded with [`formatNum`](#util-formatnum) function.
  function latLngsToCoords(latlngs, levelsDeep, closed, precision) {
  	var coords = [];

  	for (var i = 0, len = latlngs.length; i < len; i++) {
  		// Check for flat arrays required to ensure unbalanced arrays are correctly converted in recursion
  		coords.push(levelsDeep ?
  			latLngsToCoords(latlngs[i], isFlat(latlngs[i]) ? 0 : levelsDeep - 1, closed, precision) :
  			latLngToCoords(latlngs[i], precision));
  	}

  	if (!levelsDeep && closed && coords.length > 0) {
  		coords.push(coords[0].slice());
  	}

  	return coords;
  }

  function getFeature(layer, newGeometry) {
  	return layer.feature ?
  		extend({}, layer.feature, {geometry: newGeometry}) :
  		asFeature(newGeometry);
  }

  // @function asFeature(geojson: Object): Object
  // Normalize GeoJSON geometries/features into GeoJSON features.
  function asFeature(geojson) {
  	if (geojson.type === 'Feature' || geojson.type === 'FeatureCollection') {
  		return geojson;
  	}

  	return {
  		type: 'Feature',
  		properties: {},
  		geometry: geojson
  	};
  }

  var PointToGeoJSON = {
  	toGeoJSON: function (precision) {
  		return getFeature(this, {
  			type: 'Point',
  			coordinates: latLngToCoords(this.getLatLng(), precision)
  		});
  	}
  };

  // @namespace Marker
  // @section Other methods
  // @method toGeoJSON(precision?: Number|false): Object
  // Coordinates values are rounded with [`formatNum`](#util-formatnum) function with given `precision`.
  // Returns a [`GeoJSON`](https://en.wikipedia.org/wiki/GeoJSON) representation of the marker (as a GeoJSON `Point` Feature).
  Marker.include(PointToGeoJSON);

  // @namespace CircleMarker
  // @method toGeoJSON(precision?: Number|false): Object
  // Coordinates values are rounded with [`formatNum`](#util-formatnum) function with given `precision`.
  // Returns a [`GeoJSON`](https://en.wikipedia.org/wiki/GeoJSON) representation of the circle marker (as a GeoJSON `Point` Feature).
  Circle.include(PointToGeoJSON);
  CircleMarker.include(PointToGeoJSON);


  // @namespace Polyline
  // @method toGeoJSON(precision?: Number|false): Object
  // Coordinates values are rounded with [`formatNum`](#util-formatnum) function with given `precision`.
  // Returns a [`GeoJSON`](https://en.wikipedia.org/wiki/GeoJSON) representation of the polyline (as a GeoJSON `LineString` or `MultiLineString` Feature).
  Polyline.include({
  	toGeoJSON: function (precision) {
  		var multi = !isFlat(this._latlngs);

  		var coords = latLngsToCoords(this._latlngs, multi ? 1 : 0, false, precision);

  		return getFeature(this, {
  			type: (multi ? 'Multi' : '') + 'LineString',
  			coordinates: coords
  		});
  	}
  });

  // @namespace Polygon
  // @method toGeoJSON(precision?: Number|false): Object
  // Coordinates values are rounded with [`formatNum`](#util-formatnum) function with given `precision`.
  // Returns a [`GeoJSON`](https://en.wikipedia.org/wiki/GeoJSON) representation of the polygon (as a GeoJSON `Polygon` or `MultiPolygon` Feature).
  Polygon.include({
  	toGeoJSON: function (precision) {
  		var holes = !isFlat(this._latlngs),
  		    multi = holes && !isFlat(this._latlngs[0]);

  		var coords = latLngsToCoords(this._latlngs, multi ? 2 : holes ? 1 : 0, true, precision);

  		if (!holes) {
  			coords = [coords];
  		}

  		return getFeature(this, {
  			type: (multi ? 'Multi' : '') + 'Polygon',
  			coordinates: coords
  		});
  	}
  });


  // @namespace LayerGroup
  LayerGroup.include({
  	toMultiPoint: function (precision) {
  		var coords = [];

  		this.eachLayer(function (layer) {
  			coords.push(layer.toGeoJSON(precision).geometry.coordinates);
  		});

  		return getFeature(this, {
  			type: 'MultiPoint',
  			coordinates: coords
  		});
  	},

  	// @method toGeoJSON(precision?: Number|false): Object
  	// Coordinates values are rounded with [`formatNum`](#util-formatnum) function with given `precision`.
  	// Returns a [`GeoJSON`](https://en.wikipedia.org/wiki/GeoJSON) representation of the layer group (as a GeoJSON `FeatureCollection`, `GeometryCollection`, or `MultiPoint`).
  	toGeoJSON: function (precision) {

  		var type = this.feature && this.feature.geometry && this.feature.geometry.type;

  		if (type === 'MultiPoint') {
  			return this.toMultiPoint(precision);
  		}

  		var isGeometryCollection = type === 'GeometryCollection',
  		    jsons = [];

  		this.eachLayer(function (layer) {
  			if (layer.toGeoJSON) {
  				var json = layer.toGeoJSON(precision);
  				if (isGeometryCollection) {
  					jsons.push(json.geometry);
  				} else {
  					var feature = asFeature(json);
  					// Squash nested feature collections
  					if (feature.type === 'FeatureCollection') {
  						jsons.push.apply(jsons, feature.features);
  					} else {
  						jsons.push(feature);
  					}
  				}
  			}
  		});

  		if (isGeometryCollection) {
  			return getFeature(this, {
  				geometries: jsons,
  				type: 'GeometryCollection'
  			});
  		}

  		return {
  			type: 'FeatureCollection',
  			features: jsons
  		};
  	}
  });

  // @namespace GeoJSON
  // @factory L.geoJSON(geojson?: Object, options?: GeoJSON options)
  // Creates a GeoJSON layer. Optionally accepts an object in
  // [GeoJSON format](https://tools.ietf.org/html/rfc7946) to display on the map
  // (you can alternatively add it later with `addData` method) and an `options` object.
  function geoJSON(geojson, options) {
  	return new GeoJSON(geojson, options);
  }

  // Backward compatibility.
  var geoJson = geoJSON;

  /*
   * @class ImageOverlay
   * @aka L.ImageOverlay
   * @inherits Interactive layer
   *
   * Used to load and display a single image over specific bounds of the map. Extends `Layer`.
   *
   * @example
   *
   * ```js
   * var imageUrl = 'https://maps.lib.utexas.edu/maps/historical/newark_nj_1922.jpg',
   * 	imageBounds = [[40.712216, -74.22655], [40.773941, -74.12544]];
   * L.imageOverlay(imageUrl, imageBounds).addTo(map);
   * ```
   */

  var ImageOverlay = Layer.extend({

  	// @section
  	// @aka ImageOverlay options
  	options: {
  		// @option opacity: Number = 1.0
  		// The opacity of the image overlay.
  		opacity: 1,

  		// @option alt: String = ''
  		// Text for the `alt` attribute of the image (useful for accessibility).
  		alt: '',

  		// @option interactive: Boolean = false
  		// If `true`, the image overlay will emit [mouse events](#interactive-layer) when clicked or hovered.
  		interactive: false,

  		// @option crossOrigin: Boolean|String = false
  		// Whether the crossOrigin attribute will be added to the image.
  		// If a String is provided, the image will have its crossOrigin attribute set to the String provided. This is needed if you want to access image pixel data.
  		// Refer to [CORS Settings](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for valid String values.
  		crossOrigin: false,

  		// @option errorOverlayUrl: String = ''
  		// URL to the overlay image to show in place of the overlay that failed to load.
  		errorOverlayUrl: '',

  		// @option zIndex: Number = 1
  		// The explicit [zIndex](https://developer.mozilla.org/docs/Web/CSS/CSS_Positioning/Understanding_z_index) of the overlay layer.
  		zIndex: 1,

  		// @option className: String = ''
  		// A custom class name to assign to the image. Empty by default.
  		className: ''
  	},

  	initialize: function (url, bounds, options) { // (String, LatLngBounds, Object)
  		this._url = url;
  		this._bounds = toLatLngBounds(bounds);

  		setOptions(this, options);
  	},

  	onAdd: function () {
  		if (!this._image) {
  			this._initImage();

  			if (this.options.opacity < 1) {
  				this._updateOpacity();
  			}
  		}

  		if (this.options.interactive) {
  			addClass(this._image, 'leaflet-interactive');
  			this.addInteractiveTarget(this._image);
  		}

  		this.getPane().appendChild(this._image);
  		this._reset();
  	},

  	onRemove: function () {
  		remove(this._image);
  		if (this.options.interactive) {
  			this.removeInteractiveTarget(this._image);
  		}
  	},

  	// @method setOpacity(opacity: Number): this
  	// Sets the opacity of the overlay.
  	setOpacity: function (opacity) {
  		this.options.opacity = opacity;

  		if (this._image) {
  			this._updateOpacity();
  		}
  		return this;
  	},

  	setStyle: function (styleOpts) {
  		if (styleOpts.opacity) {
  			this.setOpacity(styleOpts.opacity);
  		}
  		return this;
  	},

  	// @method bringToFront(): this
  	// Brings the layer to the top of all overlays.
  	bringToFront: function () {
  		if (this._map) {
  			toFront(this._image);
  		}
  		return this;
  	},

  	// @method bringToBack(): this
  	// Brings the layer to the bottom of all overlays.
  	bringToBack: function () {
  		if (this._map) {
  			toBack(this._image);
  		}
  		return this;
  	},

  	// @method setUrl(url: String): this
  	// Changes the URL of the image.
  	setUrl: function (url) {
  		this._url = url;

  		if (this._image) {
  			this._image.src = url;
  		}
  		return this;
  	},

  	// @method setBounds(bounds: LatLngBounds): this
  	// Update the bounds that this ImageOverlay covers
  	setBounds: function (bounds) {
  		this._bounds = toLatLngBounds(bounds);

  		if (this._map) {
  			this._reset();
  		}
  		return this;
  	},

  	getEvents: function () {
  		var events = {
  			zoom: this._reset,
  			viewreset: this._reset
  		};

  		if (this._zoomAnimated) {
  			events.zoomanim = this._animateZoom;
  		}

  		return events;
  	},

  	// @method setZIndex(value: Number): this
  	// Changes the [zIndex](#imageoverlay-zindex) of the image overlay.
  	setZIndex: function (value) {
  		this.options.zIndex = value;
  		this._updateZIndex();
  		return this;
  	},

  	// @method getBounds(): LatLngBounds
  	// Get the bounds that this ImageOverlay covers
  	getBounds: function () {
  		return this._bounds;
  	},

  	// @method getElement(): HTMLElement
  	// Returns the instance of [`HTMLImageElement`](https://developer.mozilla.org/docs/Web/API/HTMLImageElement)
  	// used by this overlay.
  	getElement: function () {
  		return this._image;
  	},

  	_initImage: function () {
  		var wasElementSupplied = this._url.tagName === 'IMG';
  		var img = this._image = wasElementSupplied ? this._url : create$1('img');

  		addClass(img, 'leaflet-image-layer');
  		if (this._zoomAnimated) { addClass(img, 'leaflet-zoom-animated'); }
  		if (this.options.className) { addClass(img, this.options.className); }

  		img.onselectstart = falseFn;
  		img.onmousemove = falseFn;

  		// @event load: Event
  		// Fired when the ImageOverlay layer has loaded its image
  		img.onload = bind(this.fire, this, 'load');
  		img.onerror = bind(this._overlayOnError, this, 'error');

  		if (this.options.crossOrigin || this.options.crossOrigin === '') {
  			img.crossOrigin = this.options.crossOrigin === true ? '' : this.options.crossOrigin;
  		}

  		if (this.options.zIndex) {
  			this._updateZIndex();
  		}

  		if (wasElementSupplied) {
  			this._url = img.src;
  			return;
  		}

  		img.src = this._url;
  		img.alt = this.options.alt;
  	},

  	_animateZoom: function (e) {
  		var scale = this._map.getZoomScale(e.zoom),
  		    offset = this._map._latLngBoundsToNewLayerBounds(this._bounds, e.zoom, e.center).min;

  		setTransform(this._image, offset, scale);
  	},

  	_reset: function () {
  		var image = this._image,
  		    bounds = new Bounds(
  		        this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
  		        this._map.latLngToLayerPoint(this._bounds.getSouthEast())),
  		    size = bounds.getSize();

  		setPosition(image, bounds.min);

  		image.style.width  = size.x + 'px';
  		image.style.height = size.y + 'px';
  	},

  	_updateOpacity: function () {
  		setOpacity(this._image, this.options.opacity);
  	},

  	_updateZIndex: function () {
  		if (this._image && this.options.zIndex !== undefined && this.options.zIndex !== null) {
  			this._image.style.zIndex = this.options.zIndex;
  		}
  	},

  	_overlayOnError: function () {
  		// @event error: Event
  		// Fired when the ImageOverlay layer fails to load its image
  		this.fire('error');

  		var errorUrl = this.options.errorOverlayUrl;
  		if (errorUrl && this._url !== errorUrl) {
  			this._url = errorUrl;
  			this._image.src = errorUrl;
  		}
  	},

  	// @method getCenter(): LatLng
  	// Returns the center of the ImageOverlay.
  	getCenter: function () {
  		return this._bounds.getCenter();
  	}
  });

  // @factory L.imageOverlay(imageUrl: String, bounds: LatLngBounds, options?: ImageOverlay options)
  // Instantiates an image overlay object given the URL of the image and the
  // geographical bounds it is tied to.
  var imageOverlay = function (url, bounds, options) {
  	return new ImageOverlay(url, bounds, options);
  };

  /*
   * @class VideoOverlay
   * @aka L.VideoOverlay
   * @inherits ImageOverlay
   *
   * Used to load and display a video player over specific bounds of the map. Extends `ImageOverlay`.
   *
   * A video overlay uses the [`<video>`](https://developer.mozilla.org/docs/Web/HTML/Element/video)
   * HTML5 element.
   *
   * @example
   *
   * ```js
   * var videoUrl = 'https://www.mapbox.com/bites/00188/patricia_nasa.webm',
   * 	videoBounds = [[ 32, -130], [ 13, -100]];
   * L.videoOverlay(videoUrl, videoBounds ).addTo(map);
   * ```
   */

  var VideoOverlay = ImageOverlay.extend({

  	// @section
  	// @aka VideoOverlay options
  	options: {
  		// @option autoplay: Boolean = true
  		// Whether the video starts playing automatically when loaded.
  		// On some browsers autoplay will only work with `muted: true`
  		autoplay: true,

  		// @option loop: Boolean = true
  		// Whether the video will loop back to the beginning when played.
  		loop: true,

  		// @option keepAspectRatio: Boolean = true
  		// Whether the video will save aspect ratio after the projection.
  		// Relevant for supported browsers. See [browser compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)
  		keepAspectRatio: true,

  		// @option muted: Boolean = false
  		// Whether the video starts on mute when loaded.
  		muted: false,

  		// @option playsInline: Boolean = true
  		// Mobile browsers will play the video right where it is instead of open it up in fullscreen mode.
  		playsInline: true
  	},

  	_initImage: function () {
  		var wasElementSupplied = this._url.tagName === 'VIDEO';
  		var vid = this._image = wasElementSupplied ? this._url : create$1('video');

  		addClass(vid, 'leaflet-image-layer');
  		if (this._zoomAnimated) { addClass(vid, 'leaflet-zoom-animated'); }
  		if (this.options.className) { addClass(vid, this.options.className); }

  		vid.onselectstart = falseFn;
  		vid.onmousemove = falseFn;

  		// @event load: Event
  		// Fired when the video has finished loading the first frame
  		vid.onloadeddata = bind(this.fire, this, 'load');

  		if (wasElementSupplied) {
  			var sourceElements = vid.getElementsByTagName('source');
  			var sources = [];
  			for (var j = 0; j < sourceElements.length; j++) {
  				sources.push(sourceElements[j].src);
  			}

  			this._url = (sourceElements.length > 0) ? sources : [vid.src];
  			return;
  		}

  		if (!isArray(this._url)) { this._url = [this._url]; }

  		if (!this.options.keepAspectRatio && Object.prototype.hasOwnProperty.call(vid.style, 'objectFit')) {
  			vid.style['objectFit'] = 'fill';
  		}
  		vid.autoplay = !!this.options.autoplay;
  		vid.loop = !!this.options.loop;
  		vid.muted = !!this.options.muted;
  		vid.playsInline = !!this.options.playsInline;
  		for (var i = 0; i < this._url.length; i++) {
  			var source = create$1('source');
  			source.src = this._url[i];
  			vid.appendChild(source);
  		}
  	}

  	// @method getElement(): HTMLVideoElement
  	// Returns the instance of [`HTMLVideoElement`](https://developer.mozilla.org/docs/Web/API/HTMLVideoElement)
  	// used by this overlay.
  });


  // @factory L.videoOverlay(video: String|Array|HTMLVideoElement, bounds: LatLngBounds, options?: VideoOverlay options)
  // Instantiates an image overlay object given the URL of the video (or array of URLs, or even a video element) and the
  // geographical bounds it is tied to.

  function videoOverlay(video, bounds, options) {
  	return new VideoOverlay(video, bounds, options);
  }

  /*
   * @class SVGOverlay
   * @aka L.SVGOverlay
   * @inherits ImageOverlay
   *
   * Used to load, display and provide DOM access to an SVG file over specific bounds of the map. Extends `ImageOverlay`.
   *
   * An SVG overlay uses the [`<svg>`](https://developer.mozilla.org/docs/Web/SVG/Element/svg) element.
   *
   * @example
   *
   * ```js
   * var svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
   * svgElement.setAttribute('xmlns', "http://www.w3.org/2000/svg");
   * svgElement.setAttribute('viewBox', "0 0 200 200");
   * svgElement.innerHTML = '<rect width="200" height="200"/><rect x="75" y="23" width="50" height="50" style="fill:red"/><rect x="75" y="123" width="50" height="50" style="fill:#0013ff"/>';
   * var svgElementBounds = [ [ 32, -130 ], [ 13, -100 ] ];
   * L.svgOverlay(svgElement, svgElementBounds).addTo(map);
   * ```
   */

  var SVGOverlay = ImageOverlay.extend({
  	_initImage: function () {
  		var el = this._image = this._url;

  		addClass(el, 'leaflet-image-layer');
  		if (this._zoomAnimated) { addClass(el, 'leaflet-zoom-animated'); }
  		if (this.options.className) { addClass(el, this.options.className); }

  		el.onselectstart = falseFn;
  		el.onmousemove = falseFn;
  	}

  	// @method getElement(): SVGElement
  	// Returns the instance of [`SVGElement`](https://developer.mozilla.org/docs/Web/API/SVGElement)
  	// used by this overlay.
  });


  // @factory L.svgOverlay(svg: String|SVGElement, bounds: LatLngBounds, options?: SVGOverlay options)
  // Instantiates an image overlay object given an SVG element and the geographical bounds it is tied to.
  // A viewBox attribute is required on the SVG element to zoom in and out properly.

  function svgOverlay(el, bounds, options) {
  	return new SVGOverlay(el, bounds, options);
  }

  /*
   * @class DivOverlay
   * @inherits Interactive layer
   * @aka L.DivOverlay
   * Base model for L.Popup and L.Tooltip. Inherit from it for custom overlays like plugins.
   */

  // @namespace DivOverlay
  var DivOverlay = Layer.extend({

  	// @section
  	// @aka DivOverlay options
  	options: {
  		// @option interactive: Boolean = false
  		// If true, the popup/tooltip will listen to the mouse events.
  		interactive: false,

  		// @option offset: Point = Point(0, 0)
  		// The offset of the overlay position.
  		offset: [0, 0],

  		// @option className: String = ''
  		// A custom CSS class name to assign to the overlay.
  		className: '',

  		// @option pane: String = undefined
  		// `Map pane` where the overlay will be added.
  		pane: undefined,

  		// @option content: String|HTMLElement|Function = ''
  		// Sets the HTML content of the overlay while initializing. If a function is passed the source layer will be
  		// passed to the function. The function should return a `String` or `HTMLElement` to be used in the overlay.
  		content: ''
  	},

  	initialize: function (options, source) {
  		if (options && (options instanceof LatLng || isArray(options))) {
  			this._latlng = toLatLng(options);
  			setOptions(this, source);
  		} else {
  			setOptions(this, options);
  			this._source = source;
  		}
  		if (this.options.content) {
  			this._content = this.options.content;
  		}
  	},

  	// @method openOn(map: Map): this
  	// Adds the overlay to the map.
  	// Alternative to `map.openPopup(popup)`/`.openTooltip(tooltip)`.
  	openOn: function (map) {
  		map = arguments.length ? map : this._source._map; // experimental, not the part of public api
  		if (!map.hasLayer(this)) {
  			map.addLayer(this);
  		}
  		return this;
  	},

  	// @method close(): this
  	// Closes the overlay.
  	// Alternative to `map.closePopup(popup)`/`.closeTooltip(tooltip)`
  	// and `layer.closePopup()`/`.closeTooltip()`.
  	close: function () {
  		if (this._map) {
  			this._map.removeLayer(this);
  		}
  		return this;
  	},

  	// @method toggle(layer?: Layer): this
  	// Opens or closes the overlay bound to layer depending on its current state.
  	// Argument may be omitted only for overlay bound to layer.
  	// Alternative to `layer.togglePopup()`/`.toggleTooltip()`.
  	toggle: function (layer) {
  		if (this._map) {
  			this.close();
  		} else {
  			if (arguments.length) {
  				this._source = layer;
  			} else {
  				layer = this._source;
  			}
  			this._prepareOpen();

  			// open the overlay on the map
  			this.openOn(layer._map);
  		}
  		return this;
  	},

  	onAdd: function (map) {
  		this._zoomAnimated = map._zoomAnimated;

  		if (!this._container) {
  			this._initLayout();
  		}

  		if (map._fadeAnimated) {
  			setOpacity(this._container, 0);
  		}

  		clearTimeout(this._removeTimeout);
  		this.getPane().appendChild(this._container);
  		this.update();

  		if (map._fadeAnimated) {
  			setOpacity(this._container, 1);
  		}

  		this.bringToFront();

  		if (this.options.interactive) {
  			addClass(this._container, 'leaflet-interactive');
  			this.addInteractiveTarget(this._container);
  		}
  	},

  	onRemove: function (map) {
  		if (map._fadeAnimated) {
  			setOpacity(this._container, 0);
  			this._removeTimeout = setTimeout(bind(remove, undefined, this._container), 200);
  		} else {
  			remove(this._container);
  		}

  		if (this.options.interactive) {
  			removeClass(this._container, 'leaflet-interactive');
  			this.removeInteractiveTarget(this._container);
  		}
  	},

  	// @namespace DivOverlay
  	// @method getLatLng: LatLng
  	// Returns the geographical point of the overlay.
  	getLatLng: function () {
  		return this._latlng;
  	},

  	// @method setLatLng(latlng: LatLng): this
  	// Sets the geographical point where the overlay will open.
  	setLatLng: function (latlng) {
  		this._latlng = toLatLng(latlng);
  		if (this._map) {
  			this._updatePosition();
  			this._adjustPan();
  		}
  		return this;
  	},

  	// @method getContent: String|HTMLElement
  	// Returns the content of the overlay.
  	getContent: function () {
  		return this._content;
  	},

  	// @method setContent(htmlContent: String|HTMLElement|Function): this
  	// Sets the HTML content of the overlay. If a function is passed the source layer will be passed to the function.
  	// The function should return a `String` or `HTMLElement` to be used in the overlay.
  	setContent: function (content) {
  		this._content = content;
  		this.update();
  		return this;
  	},

  	// @method getElement: String|HTMLElement
  	// Returns the HTML container of the overlay.
  	getElement: function () {
  		return this._container;
  	},

  	// @method update: null
  	// Updates the overlay content, layout and position. Useful for updating the overlay after something inside changed, e.g. image loaded.
  	update: function () {
  		if (!this._map) { return; }

  		this._container.style.visibility = 'hidden';

  		this._updateContent();
  		this._updateLayout();
  		this._updatePosition();

  		this._container.style.visibility = '';

  		this._adjustPan();
  	},

  	getEvents: function () {
  		var events = {
  			zoom: this._updatePosition,
  			viewreset: this._updatePosition
  		};

  		if (this._zoomAnimated) {
  			events.zoomanim = this._animateZoom;
  		}
  		return events;
  	},

  	// @method isOpen: Boolean
  	// Returns `true` when the overlay is visible on the map.
  	isOpen: function () {
  		return !!this._map && this._map.hasLayer(this);
  	},

  	// @method bringToFront: this
  	// Brings this overlay in front of other overlays (in the same map pane).
  	bringToFront: function () {
  		if (this._map) {
  			toFront(this._container);
  		}
  		return this;
  	},

  	// @method bringToBack: this
  	// Brings this overlay to the back of other overlays (in the same map pane).
  	bringToBack: function () {
  		if (this._map) {
  			toBack(this._container);
  		}
  		return this;
  	},

  	// prepare bound overlay to open: update latlng pos / content source (for FeatureGroup)
  	_prepareOpen: function (latlng) {
  		var source = this._source;
  		if (!source._map) { return false; }

  		if (source instanceof FeatureGroup) {
  			source = null;
  			var layers = this._source._layers;
  			for (var id in layers) {
  				if (layers[id]._map) {
  					source = layers[id];
  					break;
  				}
  			}
  			if (!source) { return false; } // Unable to get source layer.

  			// set overlay source to this layer
  			this._source = source;
  		}

  		if (!latlng) {
  			if (source.getCenter) {
  				latlng = source.getCenter();
  			} else if (source.getLatLng) {
  				latlng = source.getLatLng();
  			} else if (source.getBounds) {
  				latlng = source.getBounds().getCenter();
  			} else {
  				throw new Error('Unable to get source layer LatLng.');
  			}
  		}
  		this.setLatLng(latlng);

  		if (this._map) {
  			// update the overlay (content, layout, etc...)
  			this.update();
  		}

  		return true;
  	},

  	_updateContent: function () {
  		if (!this._content) { return; }

  		var node = this._contentNode;
  		var content = (typeof this._content === 'function') ? this._content(this._source || this) : this._content;

  		if (typeof content === 'string') {
  			node.innerHTML = content;
  		} else {
  			while (node.hasChildNodes()) {
  				node.removeChild(node.firstChild);
  			}
  			node.appendChild(content);
  		}

  		// @namespace DivOverlay
  		// @section DivOverlay events
  		// @event contentupdate: Event
  		// Fired when the content of the overlay is updated
  		this.fire('contentupdate');
  	},

  	_updatePosition: function () {
  		if (!this._map) { return; }

  		var pos = this._map.latLngToLayerPoint(this._latlng),
  		    offset = toPoint(this.options.offset),
  		    anchor = this._getAnchor();

  		if (this._zoomAnimated) {
  			setPosition(this._container, pos.add(anchor));
  		} else {
  			offset = offset.add(pos).add(anchor);
  		}

  		var bottom = this._containerBottom = -offset.y,
  		    left = this._containerLeft = -Math.round(this._containerWidth / 2) + offset.x;

  		// bottom position the overlay in case the height of the overlay changes (images loading etc)
  		this._container.style.bottom = bottom + 'px';
  		this._container.style.left = left + 'px';
  	},

  	_getAnchor: function () {
  		return [0, 0];
  	}

  });

  Map.include({
  	_initOverlay: function (OverlayClass, content, latlng, options) {
  		var overlay = content;
  		if (!(overlay instanceof OverlayClass)) {
  			overlay = new OverlayClass(options).setContent(content);
  		}
  		if (latlng) {
  			overlay.setLatLng(latlng);
  		}
  		return overlay;
  	}
  });


  Layer.include({
  	_initOverlay: function (OverlayClass, old, content, options) {
  		var overlay = content;
  		if (overlay instanceof OverlayClass) {
  			setOptions(overlay, options);
  			overlay._source = this;
  		} else {
  			overlay = (old && !options) ? old : new OverlayClass(options, this);
  			overlay.setContent(content);
  		}
  		return overlay;
  	}
  });

  /*
   * @class Popup
   * @inherits DivOverlay
   * @aka L.Popup
   * Used to open popups in certain places of the map. Use [Map.openPopup](#map-openpopup) to
   * open popups while making sure that only one popup is open at one time
   * (recommended for usability), or use [Map.addLayer](#map-addlayer) to open as many as you want.
   *
   * @example
   *
   * If you want to just bind a popup to marker click and then open it, it's really easy:
   *
   * ```js
   * marker.bindPopup(popupContent).openPopup();
   * ```
   * Path overlays like polylines also have a `bindPopup` method.
   *
   * A popup can be also standalone:
   *
   * ```js
   * var popup = L.popup()
   * 	.setLatLng(latlng)
   * 	.setContent('<p>Hello world!<br />This is a nice popup.</p>')
   * 	.openOn(map);
   * ```
   * or
   * ```js
   * var popup = L.popup(latlng, {content: '<p>Hello world!<br />This is a nice popup.</p>')
   * 	.openOn(map);
   * ```
   */


  // @namespace Popup
  var Popup = DivOverlay.extend({

  	// @section
  	// @aka Popup options
  	options: {
  		// @option pane: String = 'popupPane'
  		// `Map pane` where the popup will be added.
  		pane: 'popupPane',

  		// @option offset: Point = Point(0, 7)
  		// The offset of the popup position.
  		offset: [0, 7],

  		// @option maxWidth: Number = 300
  		// Max width of the popup, in pixels.
  		maxWidth: 300,

  		// @option minWidth: Number = 50
  		// Min width of the popup, in pixels.
  		minWidth: 50,

  		// @option maxHeight: Number = null
  		// If set, creates a scrollable container of the given height
  		// inside a popup if its content exceeds it.
  		// The scrollable container can be styled using the
  		// `leaflet-popup-scrolled` CSS class selector.
  		maxHeight: null,

  		// @option autoPan: Boolean = true
  		// Set it to `false` if you don't want the map to do panning animation
  		// to fit the opened popup.
  		autoPan: true,

  		// @option autoPanPaddingTopLeft: Point = null
  		// The margin between the popup and the top left corner of the map
  		// view after autopanning was performed.
  		autoPanPaddingTopLeft: null,

  		// @option autoPanPaddingBottomRight: Point = null
  		// The margin between the popup and the bottom right corner of the map
  		// view after autopanning was performed.
  		autoPanPaddingBottomRight: null,

  		// @option autoPanPadding: Point = Point(5, 5)
  		// Equivalent of setting both top left and bottom right autopan padding to the same value.
  		autoPanPadding: [5, 5],

  		// @option keepInView: Boolean = false
  		// Set it to `true` if you want to prevent users from panning the popup
  		// off of the screen while it is open.
  		keepInView: false,

  		// @option closeButton: Boolean = true
  		// Controls the presence of a close button in the popup.
  		closeButton: true,

  		// @option autoClose: Boolean = true
  		// Set it to `false` if you want to override the default behavior of
  		// the popup closing when another popup is opened.
  		autoClose: true,

  		// @option closeOnEscapeKey: Boolean = true
  		// Set it to `false` if you want to override the default behavior of
  		// the ESC key for closing of the popup.
  		closeOnEscapeKey: true,

  		// @option closeOnClick: Boolean = *
  		// Set it if you want to override the default behavior of the popup closing when user clicks
  		// on the map. Defaults to the map's [`closePopupOnClick`](#map-closepopuponclick) option.

  		// @option className: String = ''
  		// A custom CSS class name to assign to the popup.
  		className: ''
  	},

  	// @namespace Popup
  	// @method openOn(map: Map): this
  	// Alternative to `map.openPopup(popup)`.
  	// Adds the popup to the map and closes the previous one.
  	openOn: function (map) {
  		map = arguments.length ? map : this._source._map; // experimental, not the part of public api

  		if (!map.hasLayer(this) && map._popup && map._popup.options.autoClose) {
  			map.removeLayer(map._popup);
  		}
  		map._popup = this;

  		return DivOverlay.prototype.openOn.call(this, map);
  	},

  	onAdd: function (map) {
  		DivOverlay.prototype.onAdd.call(this, map);

  		// @namespace Map
  		// @section Popup events
  		// @event popupopen: PopupEvent
  		// Fired when a popup is opened in the map
  		map.fire('popupopen', {popup: this});

  		if (this._source) {
  			// @namespace Layer
  			// @section Popup events
  			// @event popupopen: PopupEvent
  			// Fired when a popup bound to this layer is opened
  			this._source.fire('popupopen', {popup: this}, true);
  			// For non-path layers, we toggle the popup when clicking
  			// again the layer, so prevent the map to reopen it.
  			if (!(this._source instanceof Path)) {
  				this._source.on('preclick', stopPropagation);
  			}
  		}
  	},

  	onRemove: function (map) {
  		DivOverlay.prototype.onRemove.call(this, map);

  		// @namespace Map
  		// @section Popup events
  		// @event popupclose: PopupEvent
  		// Fired when a popup in the map is closed
  		map.fire('popupclose', {popup: this});

  		if (this._source) {
  			// @namespace Layer
  			// @section Popup events
  			// @event popupclose: PopupEvent
  			// Fired when a popup bound to this layer is closed
  			this._source.fire('popupclose', {popup: this}, true);
  			if (!(this._source instanceof Path)) {
  				this._source.off('preclick', stopPropagation);
  			}
  		}
  	},

  	getEvents: function () {
  		var events = DivOverlay.prototype.getEvents.call(this);

  		if (this.options.closeOnClick !== undefined ? this.options.closeOnClick : this._map.options.closePopupOnClick) {
  			events.preclick = this.close;
  		}

  		if (this.options.keepInView) {
  			events.moveend = this._adjustPan;
  		}

  		return events;
  	},

  	_initLayout: function () {
  		var prefix = 'leaflet-popup',
  		    container = this._container = create$1('div',
  			prefix + ' ' + (this.options.className || '') +
  			' leaflet-zoom-animated');

  		var wrapper = this._wrapper = create$1('div', prefix + '-content-wrapper', container);
  		this._contentNode = create$1('div', prefix + '-content', wrapper);

  		disableClickPropagation(container);
  		disableScrollPropagation(this._contentNode);
  		on(container, 'contextmenu', stopPropagation);

  		this._tipContainer = create$1('div', prefix + '-tip-container', container);
  		this._tip = create$1('div', prefix + '-tip', this._tipContainer);

  		if (this.options.closeButton) {
  			var closeButton = this._closeButton = create$1('a', prefix + '-close-button', container);
  			closeButton.setAttribute('role', 'button'); // overrides the implicit role=link of <a> elements #7399
  			closeButton.setAttribute('aria-label', 'Close popup');
  			closeButton.href = '#close';
  			closeButton.innerHTML = '<span aria-hidden="true">&#215;</span>';

  			on(closeButton, 'click', function (ev) {
  				preventDefault(ev);
  				this.close();
  			}, this);
  		}
  	},

  	_updateLayout: function () {
  		var container = this._contentNode,
  		    style = container.style;

  		style.width = '';
  		style.whiteSpace = 'nowrap';

  		var width = container.offsetWidth;
  		width = Math.min(width, this.options.maxWidth);
  		width = Math.max(width, this.options.minWidth);

  		style.width = (width + 1) + 'px';
  		style.whiteSpace = '';

  		style.height = '';

  		var height = container.offsetHeight,
  		    maxHeight = this.options.maxHeight,
  		    scrolledClass = 'leaflet-popup-scrolled';

  		if (maxHeight && height > maxHeight) {
  			style.height = maxHeight + 'px';
  			addClass(container, scrolledClass);
  		} else {
  			removeClass(container, scrolledClass);
  		}

  		this._containerWidth = this._container.offsetWidth;
  	},

  	_animateZoom: function (e) {
  		var pos = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center),
  		    anchor = this._getAnchor();
  		setPosition(this._container, pos.add(anchor));
  	},

  	_adjustPan: function () {
  		if (!this.options.autoPan) { return; }
  		if (this._map._panAnim) { this._map._panAnim.stop(); }

  		// We can endlessly recurse if keepInView is set and the view resets.
  		// Let's guard against that by exiting early if we're responding to our own autopan.
  		if (this._autopanning) {
  			this._autopanning = false;
  			return;
  		}

  		var map = this._map,
  		    marginBottom = parseInt(getStyle(this._container, 'marginBottom'), 10) || 0,
  		    containerHeight = this._container.offsetHeight + marginBottom,
  		    containerWidth = this._containerWidth,
  		    layerPos = new Point(this._containerLeft, -containerHeight - this._containerBottom);

  		layerPos._add(getPosition(this._container));

  		var containerPos = map.layerPointToContainerPoint(layerPos),
  		    padding = toPoint(this.options.autoPanPadding),
  		    paddingTL = toPoint(this.options.autoPanPaddingTopLeft || padding),
  		    paddingBR = toPoint(this.options.autoPanPaddingBottomRight || padding),
  		    size = map.getSize(),
  		    dx = 0,
  		    dy = 0;

  		if (containerPos.x + containerWidth + paddingBR.x > size.x) { // right
  			dx = containerPos.x + containerWidth - size.x + paddingBR.x;
  		}
  		if (containerPos.x - dx - paddingTL.x < 0) { // left
  			dx = containerPos.x - paddingTL.x;
  		}
  		if (containerPos.y + containerHeight + paddingBR.y > size.y) { // bottom
  			dy = containerPos.y + containerHeight - size.y + paddingBR.y;
  		}
  		if (containerPos.y - dy - paddingTL.y < 0) { // top
  			dy = containerPos.y - paddingTL.y;
  		}

  		// @namespace Map
  		// @section Popup events
  		// @event autopanstart: Event
  		// Fired when the map starts autopanning when opening a popup.
  		if (dx || dy) {
  			// Track that we're autopanning, as this function will be re-ran on moveend
  			if (this.options.keepInView) {
  				this._autopanning = true;
  			}

  			map
  			    .fire('autopanstart')
  			    .panBy([dx, dy]);
  		}
  	},

  	_getAnchor: function () {
  		// Where should we anchor the popup on the source layer?
  		return toPoint(this._source && this._source._getPopupAnchor ? this._source._getPopupAnchor() : [0, 0]);
  	}

  });

  // @namespace Popup
  // @factory L.popup(options?: Popup options, source?: Layer)
  // Instantiates a `Popup` object given an optional `options` object that describes its appearance and location and an optional `source` object that is used to tag the popup with a reference to the Layer to which it refers.
  // @alternative
  // @factory L.popup(latlng: LatLng, options?: Popup options)
  // Instantiates a `Popup` object given `latlng` where the popup will open and an optional `options` object that describes its appearance and location.
  var popup = function (options, source) {
  	return new Popup(options, source);
  };


  /* @namespace Map
   * @section Interaction Options
   * @option closePopupOnClick: Boolean = true
   * Set it to `false` if you don't want popups to close when user clicks the map.
   */
  Map.mergeOptions({
  	closePopupOnClick: true
  });


  // @namespace Map
  // @section Methods for Layers and Controls
  Map.include({
  	// @method openPopup(popup: Popup): this
  	// Opens the specified popup while closing the previously opened (to make sure only one is opened at one time for usability).
  	// @alternative
  	// @method openPopup(content: String|HTMLElement, latlng: LatLng, options?: Popup options): this
  	// Creates a popup with the specified content and options and opens it in the given point on a map.
  	openPopup: function (popup, latlng, options) {
  		this._initOverlay(Popup, popup, latlng, options)
  		  .openOn(this);

  		return this;
  	},

  	// @method closePopup(popup?: Popup): this
  	// Closes the popup previously opened with [openPopup](#map-openpopup) (or the given one).
  	closePopup: function (popup) {
  		popup = arguments.length ? popup : this._popup;
  		if (popup) {
  			popup.close();
  		}
  		return this;
  	}
  });

  /*
   * @namespace Layer
   * @section Popup methods example
   *
   * All layers share a set of methods convenient for binding popups to it.
   *
   * ```js
   * var layer = L.Polygon(latlngs).bindPopup('Hi There!').addTo(map);
   * layer.openPopup();
   * layer.closePopup();
   * ```
   *
   * Popups will also be automatically opened when the layer is clicked on and closed when the layer is removed from the map or another popup is opened.
   */

  // @section Popup methods
  Layer.include({

  	// @method bindPopup(content: String|HTMLElement|Function|Popup, options?: Popup options): this
  	// Binds a popup to the layer with the passed `content` and sets up the
  	// necessary event listeners. If a `Function` is passed it will receive
  	// the layer as the first argument and should return a `String` or `HTMLElement`.
  	bindPopup: function (content, options) {
  		this._popup = this._initOverlay(Popup, this._popup, content, options);
  		if (!this._popupHandlersAdded) {
  			this.on({
  				click: this._openPopup,
  				keypress: this._onKeyPress,
  				remove: this.closePopup,
  				move: this._movePopup
  			});
  			this._popupHandlersAdded = true;
  		}

  		return this;
  	},

  	// @method unbindPopup(): this
  	// Removes the popup previously bound with `bindPopup`.
  	unbindPopup: function () {
  		if (this._popup) {
  			this.off({
  				click: this._openPopup,
  				keypress: this._onKeyPress,
  				remove: this.closePopup,
  				move: this._movePopup
  			});
  			this._popupHandlersAdded = false;
  			this._popup = null;
  		}
  		return this;
  	},

  	// @method openPopup(latlng?: LatLng): this
  	// Opens the bound popup at the specified `latlng` or at the default popup anchor if no `latlng` is passed.
  	openPopup: function (latlng) {
  		if (this._popup) {
  			if (!(this instanceof FeatureGroup)) {
  				this._popup._source = this;
  			}
  			if (this._popup._prepareOpen(latlng || this._latlng)) {
  				// open the popup on the map
  				this._popup.openOn(this._map);
  			}
  		}
  		return this;
  	},

  	// @method closePopup(): this
  	// Closes the popup bound to this layer if it is open.
  	closePopup: function () {
  		if (this._popup) {
  			this._popup.close();
  		}
  		return this;
  	},

  	// @method togglePopup(): this
  	// Opens or closes the popup bound to this layer depending on its current state.
  	togglePopup: function () {
  		if (this._popup) {
  			this._popup.toggle(this);
  		}
  		return this;
  	},

  	// @method isPopupOpen(): boolean
  	// Returns `true` if the popup bound to this layer is currently open.
  	isPopupOpen: function () {
  		return (this._popup ? this._popup.isOpen() : false);
  	},

  	// @method setPopupContent(content: String|HTMLElement|Popup): this
  	// Sets the content of the popup bound to this layer.
  	setPopupContent: function (content) {
  		if (this._popup) {
  			this._popup.setContent(content);
  		}
  		return this;
  	},

  	// @method getPopup(): Popup
  	// Returns the popup bound to this layer.
  	getPopup: function () {
  		return this._popup;
  	},

  	_openPopup: function (e) {
  		if (!this._popup || !this._map) {
  			return;
  		}
  		// prevent map click
  		stop(e);

  		var target = e.layer || e.target;
  		if (this._popup._source === target && !(target instanceof Path)) {
  			// treat it like a marker and figure out
  			// if we should toggle it open/closed
  			if (this._map.hasLayer(this._popup)) {
  				this.closePopup();
  			} else {
  				this.openPopup(e.latlng);
  			}
  			return;
  		}
  		this._popup._source = target;
  		this.openPopup(e.latlng);
  	},

  	_movePopup: function (e) {
  		this._popup.setLatLng(e.latlng);
  	},

  	_onKeyPress: function (e) {
  		if (e.originalEvent.keyCode === 13) {
  			this._openPopup(e);
  		}
  	}
  });

  /*
   * @class Tooltip
   * @inherits DivOverlay
   * @aka L.Tooltip
   * Used to display small texts on top of map layers.
   *
   * @example
   * If you want to just bind a tooltip to marker:
   *
   * ```js
   * marker.bindTooltip("my tooltip text").openTooltip();
   * ```
   * Path overlays like polylines also have a `bindTooltip` method.
   *
   * A tooltip can be also standalone:
   *
   * ```js
   * var tooltip = L.tooltip()
   * 	.setLatLng(latlng)
   * 	.setContent('Hello world!<br />This is a nice tooltip.')
   * 	.addTo(map);
   * ```
   * or
   * ```js
   * var tooltip = L.tooltip(latlng, {content: 'Hello world!<br />This is a nice tooltip.'})
   * 	.addTo(map);
   * ```
   *
   *
   * Note about tooltip offset. Leaflet takes two options in consideration
   * for computing tooltip offsetting:
   * - the `offset` Tooltip option: it defaults to [0, 0], and it's specific to one tooltip.
   *   Add a positive x offset to move the tooltip to the right, and a positive y offset to
   *   move it to the bottom. Negatives will move to the left and top.
   * - the `tooltipAnchor` Icon option: this will only be considered for Marker. You
   *   should adapt this value if you use a custom icon.
   */


  // @namespace Tooltip
  var Tooltip = DivOverlay.extend({

  	// @section
  	// @aka Tooltip options
  	options: {
  		// @option pane: String = 'tooltipPane'
  		// `Map pane` where the tooltip will be added.
  		pane: 'tooltipPane',

  		// @option offset: Point = Point(0, 0)
  		// Optional offset of the tooltip position.
  		offset: [0, 0],

  		// @option direction: String = 'auto'
  		// Direction where to open the tooltip. Possible values are: `right`, `left`,
  		// `top`, `bottom`, `center`, `auto`.
  		// `auto` will dynamically switch between `right` and `left` according to the tooltip
  		// position on the map.
  		direction: 'auto',

  		// @option permanent: Boolean = false
  		// Whether to open the tooltip permanently or only on mouseover.
  		permanent: false,

  		// @option sticky: Boolean = false
  		// If true, the tooltip will follow the mouse instead of being fixed at the feature center.
  		sticky: false,

  		// @option opacity: Number = 0.9
  		// Tooltip container opacity.
  		opacity: 0.9
  	},

  	onAdd: function (map) {
  		DivOverlay.prototype.onAdd.call(this, map);
  		this.setOpacity(this.options.opacity);

  		// @namespace Map
  		// @section Tooltip events
  		// @event tooltipopen: TooltipEvent
  		// Fired when a tooltip is opened in the map.
  		map.fire('tooltipopen', {tooltip: this});

  		if (this._source) {
  			this.addEventParent(this._source);

  			// @namespace Layer
  			// @section Tooltip events
  			// @event tooltipopen: TooltipEvent
  			// Fired when a tooltip bound to this layer is opened.
  			this._source.fire('tooltipopen', {tooltip: this}, true);
  		}
  	},

  	onRemove: function (map) {
  		DivOverlay.prototype.onRemove.call(this, map);

  		// @namespace Map
  		// @section Tooltip events
  		// @event tooltipclose: TooltipEvent
  		// Fired when a tooltip in the map is closed.
  		map.fire('tooltipclose', {tooltip: this});

  		if (this._source) {
  			this.removeEventParent(this._source);

  			// @namespace Layer
  			// @section Tooltip events
  			// @event tooltipclose: TooltipEvent
  			// Fired when a tooltip bound to this layer is closed.
  			this._source.fire('tooltipclose', {tooltip: this}, true);
  		}
  	},

  	getEvents: function () {
  		var events = DivOverlay.prototype.getEvents.call(this);

  		if (!this.options.permanent) {
  			events.preclick = this.close;
  		}

  		return events;
  	},

  	_initLayout: function () {
  		var prefix = 'leaflet-tooltip',
  		    className = prefix + ' ' + (this.options.className || '') + ' leaflet-zoom-' + (this._zoomAnimated ? 'animated' : 'hide');

  		this._contentNode = this._container = create$1('div', className);

  		this._container.setAttribute('role', 'tooltip');
  		this._container.setAttribute('id', 'leaflet-tooltip-' + stamp(this));
  	},

  	_updateLayout: function () {},

  	_adjustPan: function () {},

  	_setPosition: function (pos) {
  		var subX, subY,
  		    map = this._map,
  		    container = this._container,
  		    centerPoint = map.latLngToContainerPoint(map.getCenter()),
  		    tooltipPoint = map.layerPointToContainerPoint(pos),
  		    direction = this.options.direction,
  		    tooltipWidth = container.offsetWidth,
  		    tooltipHeight = container.offsetHeight,
  		    offset = toPoint(this.options.offset),
  		    anchor = this._getAnchor();

  		if (direction === 'top') {
  			subX = tooltipWidth / 2;
  			subY = tooltipHeight;
  		} else if (direction === 'bottom') {
  			subX = tooltipWidth / 2;
  			subY = 0;
  		} else if (direction === 'center') {
  			subX = tooltipWidth / 2;
  			subY = tooltipHeight / 2;
  		} else if (direction === 'right') {
  			subX = 0;
  			subY = tooltipHeight / 2;
  		} else if (direction === 'left') {
  			subX = tooltipWidth;
  			subY = tooltipHeight / 2;
  		} else if (tooltipPoint.x < centerPoint.x) {
  			direction = 'right';
  			subX = 0;
  			subY = tooltipHeight / 2;
  		} else {
  			direction = 'left';
  			subX = tooltipWidth + (offset.x + anchor.x) * 2;
  			subY = tooltipHeight / 2;
  		}

  		pos = pos.subtract(toPoint(subX, subY, true)).add(offset).add(anchor);

  		removeClass(container, 'leaflet-tooltip-right');
  		removeClass(container, 'leaflet-tooltip-left');
  		removeClass(container, 'leaflet-tooltip-top');
  		removeClass(container, 'leaflet-tooltip-bottom');
  		addClass(container, 'leaflet-tooltip-' + direction);
  		setPosition(container, pos);
  	},

  	_updatePosition: function () {
  		var pos = this._map.latLngToLayerPoint(this._latlng);
  		this._setPosition(pos);
  	},

  	setOpacity: function (opacity) {
  		this.options.opacity = opacity;

  		if (this._container) {
  			setOpacity(this._container, opacity);
  		}
  	},

  	_animateZoom: function (e) {
  		var pos = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center);
  		this._setPosition(pos);
  	},

  	_getAnchor: function () {
  		// Where should we anchor the tooltip on the source layer?
  		return toPoint(this._source && this._source._getTooltipAnchor && !this.options.sticky ? this._source._getTooltipAnchor() : [0, 0]);
  	}

  });

  // @namespace Tooltip
  // @factory L.tooltip(options?: Tooltip options, source?: Layer)
  // Instantiates a `Tooltip` object given an optional `options` object that describes its appearance and location and an optional `source` object that is used to tag the tooltip with a reference to the Layer to which it refers.
  // @alternative
  // @factory L.tooltip(latlng: LatLng, options?: Tooltip options)
  // Instantiates a `Tooltip` object given `latlng` where the tooltip will open and an optional `options` object that describes its appearance and location.
  var tooltip = function (options, source) {
  	return new Tooltip(options, source);
  };

  // @namespace Map
  // @section Methods for Layers and Controls
  Map.include({

  	// @method openTooltip(tooltip: Tooltip): this
  	// Opens the specified tooltip.
  	// @alternative
  	// @method openTooltip(content: String|HTMLElement, latlng: LatLng, options?: Tooltip options): this
  	// Creates a tooltip with the specified content and options and open it.
  	openTooltip: function (tooltip, latlng, options) {
  		this._initOverlay(Tooltip, tooltip, latlng, options)
  		  .openOn(this);

  		return this;
  	},

  	// @method closeTooltip(tooltip: Tooltip): this
  	// Closes the tooltip given as parameter.
  	closeTooltip: function (tooltip) {
  		tooltip.close();
  		return this;
  	}

  });

  /*
   * @namespace Layer
   * @section Tooltip methods example
   *
   * All layers share a set of methods convenient for binding tooltips to it.
   *
   * ```js
   * var layer = L.Polygon(latlngs).bindTooltip('Hi There!').addTo(map);
   * layer.openTooltip();
   * layer.closeTooltip();
   * ```
   */

  // @section Tooltip methods
  Layer.include({

  	// @method bindTooltip(content: String|HTMLElement|Function|Tooltip, options?: Tooltip options): this
  	// Binds a tooltip to the layer with the passed `content` and sets up the
  	// necessary event listeners. If a `Function` is passed it will receive
  	// the layer as the first argument and should return a `String` or `HTMLElement`.
  	bindTooltip: function (content, options) {

  		if (this._tooltip && this.isTooltipOpen()) {
  			this.unbindTooltip();
  		}

  		this._tooltip = this._initOverlay(Tooltip, this._tooltip, content, options);
  		this._initTooltipInteractions();

  		if (this._tooltip.options.permanent && this._map && this._map.hasLayer(this)) {
  			this.openTooltip();
  		}

  		return this;
  	},

  	// @method unbindTooltip(): this
  	// Removes the tooltip previously bound with `bindTooltip`.
  	unbindTooltip: function () {
  		if (this._tooltip) {
  			this._initTooltipInteractions(true);
  			this.closeTooltip();
  			this._tooltip = null;
  		}
  		return this;
  	},

  	_initTooltipInteractions: function (remove) {
  		if (!remove && this._tooltipHandlersAdded) { return; }
  		var onOff = remove ? 'off' : 'on',
  		    events = {
  			remove: this.closeTooltip,
  			move: this._moveTooltip
  		    };
  		if (!this._tooltip.options.permanent) {
  			events.mouseover = this._openTooltip;
  			events.mouseout = this.closeTooltip;
  			events.click = this._openTooltip;
  			if (this._map) {
  				this._addFocusListeners();
  			} else {
  				events.add = this._addFocusListeners;
  			}
  		} else {
  			events.add = this._openTooltip;
  		}
  		if (this._tooltip.options.sticky) {
  			events.mousemove = this._moveTooltip;
  		}
  		this[onOff](events);
  		this._tooltipHandlersAdded = !remove;
  	},

  	// @method openTooltip(latlng?: LatLng): this
  	// Opens the bound tooltip at the specified `latlng` or at the default tooltip anchor if no `latlng` is passed.
  	openTooltip: function (latlng) {
  		if (this._tooltip) {
  			if (!(this instanceof FeatureGroup)) {
  				this._tooltip._source = this;
  			}
  			if (this._tooltip._prepareOpen(latlng)) {
  				// open the tooltip on the map
  				this._tooltip.openOn(this._map);

  				if (this.getElement) {
  					this._setAriaDescribedByOnLayer(this);
  				} else if (this.eachLayer) {
  					this.eachLayer(this._setAriaDescribedByOnLayer, this);
  				}
  			}
  		}
  		return this;
  	},

  	// @method closeTooltip(): this
  	// Closes the tooltip bound to this layer if it is open.
  	closeTooltip: function () {
  		if (this._tooltip) {
  			return this._tooltip.close();
  		}
  	},

  	// @method toggleTooltip(): this
  	// Opens or closes the tooltip bound to this layer depending on its current state.
  	toggleTooltip: function () {
  		if (this._tooltip) {
  			this._tooltip.toggle(this);
  		}
  		return this;
  	},

  	// @method isTooltipOpen(): boolean
  	// Returns `true` if the tooltip bound to this layer is currently open.
  	isTooltipOpen: function () {
  		return this._tooltip.isOpen();
  	},

  	// @method setTooltipContent(content: String|HTMLElement|Tooltip): this
  	// Sets the content of the tooltip bound to this layer.
  	setTooltipContent: function (content) {
  		if (this._tooltip) {
  			this._tooltip.setContent(content);
  		}
  		return this;
  	},

  	// @method getTooltip(): Tooltip
  	// Returns the tooltip bound to this layer.
  	getTooltip: function () {
  		return this._tooltip;
  	},

  	_addFocusListeners: function () {
  		if (this.getElement) {
  			this._addFocusListenersOnLayer(this);
  		} else if (this.eachLayer) {
  			this.eachLayer(this._addFocusListenersOnLayer, this);
  		}
  	},

  	_addFocusListenersOnLayer: function (layer) {
  		var el = typeof layer.getElement === 'function' && layer.getElement();
  		if (el) {
  			on(el, 'focus', function () {
  				this._tooltip._source = layer;
  				this.openTooltip();
  			}, this);
  			on(el, 'blur', this.closeTooltip, this);
  		}
  	},

  	_setAriaDescribedByOnLayer: function (layer) {
  		var el = typeof layer.getElement === 'function' && layer.getElement();
  		if (el) {
  			el.setAttribute('aria-describedby', this._tooltip._container.id);
  		}
  	},


  	_openTooltip: function (e) {
  		if (!this._tooltip || !this._map) {
  			return;
  		}

  		// If the map is moving, we will show the tooltip after it's done.
  		if (this._map.dragging && this._map.dragging.moving() && !this._openOnceFlag) {
  			this._openOnceFlag = true;
  			var that = this;
  			this._map.once('moveend', function () {
  				that._openOnceFlag = false;
  				that._openTooltip(e);
  			});
  			return;
  		}

  		this._tooltip._source = e.layer || e.target;

  		this.openTooltip(this._tooltip.options.sticky ? e.latlng : undefined);
  	},

  	_moveTooltip: function (e) {
  		var latlng = e.latlng, containerPoint, layerPoint;
  		if (this._tooltip.options.sticky && e.originalEvent) {
  			containerPoint = this._map.mouseEventToContainerPoint(e.originalEvent);
  			layerPoint = this._map.containerPointToLayerPoint(containerPoint);
  			latlng = this._map.layerPointToLatLng(layerPoint);
  		}
  		this._tooltip.setLatLng(latlng);
  	}
  });

  /*
   * @class DivIcon
   * @aka L.DivIcon
   * @inherits Icon
   *
   * Represents a lightweight icon for markers that uses a simple `<div>`
   * element instead of an image. Inherits from `Icon` but ignores the `iconUrl` and shadow options.
   *
   * @example
   * ```js
   * var myIcon = L.divIcon({className: 'my-div-icon'});
   * // you can set .my-div-icon styles in CSS
   *
   * L.marker([50.505, 30.57], {icon: myIcon}).addTo(map);
   * ```
   *
   * By default, it has a 'leaflet-div-icon' CSS class and is styled as a little white square with a shadow.
   */

  var DivIcon = Icon.extend({
  	options: {
  		// @section
  		// @aka DivIcon options
  		iconSize: [12, 12], // also can be set through CSS

  		// iconAnchor: (Point),
  		// popupAnchor: (Point),

  		// @option html: String|HTMLElement = ''
  		// Custom HTML code to put inside the div element, empty by default. Alternatively,
  		// an instance of `HTMLElement`.
  		html: false,

  		// @option bgPos: Point = [0, 0]
  		// Optional relative position of the background, in pixels
  		bgPos: null,

  		className: 'leaflet-div-icon'
  	},

  	createIcon: function (oldIcon) {
  		var div = (oldIcon && oldIcon.tagName === 'DIV') ? oldIcon : document.createElement('div'),
  		    options = this.options;

  		if (options.html instanceof Element) {
  			empty(div);
  			div.appendChild(options.html);
  		} else {
  			div.innerHTML = options.html !== false ? options.html : '';
  		}

  		if (options.bgPos) {
  			var bgPos = toPoint(options.bgPos);
  			div.style.backgroundPosition = (-bgPos.x) + 'px ' + (-bgPos.y) + 'px';
  		}
  		this._setIconStyles(div, 'icon');

  		return div;
  	},

  	createShadow: function () {
  		return null;
  	}
  });

  // @factory L.divIcon(options: DivIcon options)
  // Creates a `DivIcon` instance with the given options.
  function divIcon(options) {
  	return new DivIcon(options);
  }

  Icon.Default = IconDefault;

  /*
   * @class GridLayer
   * @inherits Layer
   * @aka L.GridLayer
   *
   * Generic class for handling a tiled grid of HTML elements. This is the base class for all tile layers and replaces `TileLayer.Canvas`.
   * GridLayer can be extended to create a tiled grid of HTML elements like `<canvas>`, `<img>` or `<div>`. GridLayer will handle creating and animating these DOM elements for you.
   *
   *
   * @section Synchronous usage
   * @example
   *
   * To create a custom layer, extend GridLayer and implement the `createTile()` method, which will be passed a `Point` object with the `x`, `y`, and `z` (zoom level) coordinates to draw your tile.
   *
   * ```js
   * var CanvasLayer = L.GridLayer.extend({
   *     createTile: function(coords){
   *         // create a <canvas> element for drawing
   *         var tile = L.DomUtil.create('canvas', 'leaflet-tile');
   *
   *         // setup tile width and height according to the options
   *         var size = this.getTileSize();
   *         tile.width = size.x;
   *         tile.height = size.y;
   *
   *         // get a canvas context and draw something on it using coords.x, coords.y and coords.z
   *         var ctx = tile.getContext('2d');
   *
   *         // return the tile so it can be rendered on screen
   *         return tile;
   *     }
   * });
   * ```
   *
   * @section Asynchronous usage
   * @example
   *
   * Tile creation can also be asynchronous, this is useful when using a third-party drawing library. Once the tile is finished drawing it can be passed to the `done()` callback.
   *
   * ```js
   * var CanvasLayer = L.GridLayer.extend({
   *     createTile: function(coords, done){
   *         var error;
   *
   *         // create a <canvas> element for drawing
   *         var tile = L.DomUtil.create('canvas', 'leaflet-tile');
   *
   *         // setup tile width and height according to the options
   *         var size = this.getTileSize();
   *         tile.width = size.x;
   *         tile.height = size.y;
   *
   *         // draw something asynchronously and pass the tile to the done() callback
   *         setTimeout(function() {
   *             done(error, tile);
   *         }, 1000);
   *
   *         return tile;
   *     }
   * });
   * ```
   *
   * @section
   */


  var GridLayer = Layer.extend({

  	// @section
  	// @aka GridLayer options
  	options: {
  		// @option tileSize: Number|Point = 256
  		// Width and height of tiles in the grid. Use a number if width and height are equal, or `L.point(width, height)` otherwise.
  		tileSize: 256,

  		// @option opacity: Number = 1.0
  		// Opacity of the tiles. Can be used in the `createTile()` function.
  		opacity: 1,

  		// @option updateWhenIdle: Boolean = (depends)
  		// Load new tiles only when panning ends.
  		// `true` by default on mobile browsers, in order to avoid too many requests and keep smooth navigation.
  		// `false` otherwise in order to display new tiles _during_ panning, since it is easy to pan outside the
  		// [`keepBuffer`](#gridlayer-keepbuffer) option in desktop browsers.
  		updateWhenIdle: Browser.mobile,

  		// @option updateWhenZooming: Boolean = true
  		// By default, a smooth zoom animation (during a [touch zoom](#map-touchzoom) or a [`flyTo()`](#map-flyto)) will update grid layers every integer zoom level. Setting this option to `false` will update the grid layer only when the smooth animation ends.
  		updateWhenZooming: true,

  		// @option updateInterval: Number = 200
  		// Tiles will not update more than once every `updateInterval` milliseconds when panning.
  		updateInterval: 200,

  		// @option zIndex: Number = 1
  		// The explicit zIndex of the tile layer.
  		zIndex: 1,

  		// @option bounds: LatLngBounds = undefined
  		// If set, tiles will only be loaded inside the set `LatLngBounds`.
  		bounds: null,

  		// @option minZoom: Number = 0
  		// The minimum zoom level down to which this layer will be displayed (inclusive).
  		minZoom: 0,

  		// @option maxZoom: Number = undefined
  		// The maximum zoom level up to which this layer will be displayed (inclusive).
  		maxZoom: undefined,

  		// @option maxNativeZoom: Number = undefined
  		// Maximum zoom number the tile source has available. If it is specified,
  		// the tiles on all zoom levels higher than `maxNativeZoom` will be loaded
  		// from `maxNativeZoom` level and auto-scaled.
  		maxNativeZoom: undefined,

  		// @option minNativeZoom: Number = undefined
  		// Minimum zoom number the tile source has available. If it is specified,
  		// the tiles on all zoom levels lower than `minNativeZoom` will be loaded
  		// from `minNativeZoom` level and auto-scaled.
  		minNativeZoom: undefined,

  		// @option noWrap: Boolean = false
  		// Whether the layer is wrapped around the antimeridian. If `true`, the
  		// GridLayer will only be displayed once at low zoom levels. Has no
  		// effect when the [map CRS](#map-crs) doesn't wrap around. Can be used
  		// in combination with [`bounds`](#gridlayer-bounds) to prevent requesting
  		// tiles outside the CRS limits.
  		noWrap: false,

  		// @option pane: String = 'tilePane'
  		// `Map pane` where the grid layer will be added.
  		pane: 'tilePane',

  		// @option className: String = ''
  		// A custom class name to assign to the tile layer. Empty by default.
  		className: '',

  		// @option keepBuffer: Number = 2
  		// When panning the map, keep this many rows and columns of tiles before unloading them.
  		keepBuffer: 2
  	},

  	initialize: function (options) {
  		setOptions(this, options);
  	},

  	onAdd: function () {
  		this._initContainer();

  		this._levels = {};
  		this._tiles = {};

  		this._resetView(); // implicit _update() call
  	},

  	beforeAdd: function (map) {
  		map._addZoomLimit(this);
  	},

  	onRemove: function (map) {
  		this._removeAllTiles();
  		remove(this._container);
  		map._removeZoomLimit(this);
  		this._container = null;
  		this._tileZoom = undefined;
  	},

  	// @method bringToFront: this
  	// Brings the tile layer to the top of all tile layers.
  	bringToFront: function () {
  		if (this._map) {
  			toFront(this._container);
  			this._setAutoZIndex(Math.max);
  		}
  		return this;
  	},

  	// @method bringToBack: this
  	// Brings the tile layer to the bottom of all tile layers.
  	bringToBack: function () {
  		if (this._map) {
  			toBack(this._container);
  			this._setAutoZIndex(Math.min);
  		}
  		return this;
  	},

  	// @method getContainer: HTMLElement
  	// Returns the HTML element that contains the tiles for this layer.
  	getContainer: function () {
  		return this._container;
  	},

  	// @method setOpacity(opacity: Number): this
  	// Changes the [opacity](#gridlayer-opacity) of the grid layer.
  	setOpacity: function (opacity) {
  		this.options.opacity = opacity;
  		this._updateOpacity();
  		return this;
  	},

  	// @method setZIndex(zIndex: Number): this
  	// Changes the [zIndex](#gridlayer-zindex) of the grid layer.
  	setZIndex: function (zIndex) {
  		this.options.zIndex = zIndex;
  		this._updateZIndex();

  		return this;
  	},

  	// @method isLoading: Boolean
  	// Returns `true` if any tile in the grid layer has not finished loading.
  	isLoading: function () {
  		return this._loading;
  	},

  	// @method redraw: this
  	// Causes the layer to clear all the tiles and request them again.
  	redraw: function () {
  		if (this._map) {
  			this._removeAllTiles();
  			var tileZoom = this._clampZoom(this._map.getZoom());
  			if (tileZoom !== this._tileZoom) {
  				this._tileZoom = tileZoom;
  				this._updateLevels();
  			}
  			this._update();
  		}
  		return this;
  	},

  	getEvents: function () {
  		var events = {
  			viewprereset: this._invalidateAll,
  			viewreset: this._resetView,
  			zoom: this._resetView,
  			moveend: this._onMoveEnd
  		};

  		if (!this.options.updateWhenIdle) {
  			// update tiles on move, but not more often than once per given interval
  			if (!this._onMove) {
  				this._onMove = throttle(this._onMoveEnd, this.options.updateInterval, this);
  			}

  			events.move = this._onMove;
  		}

  		if (this._zoomAnimated) {
  			events.zoomanim = this._animateZoom;
  		}

  		return events;
  	},

  	// @section Extension methods
  	// Layers extending `GridLayer` shall reimplement the following method.
  	// @method createTile(coords: Object, done?: Function): HTMLElement
  	// Called only internally, must be overridden by classes extending `GridLayer`.
  	// Returns the `HTMLElement` corresponding to the given `coords`. If the `done` callback
  	// is specified, it must be called when the tile has finished loading and drawing.
  	createTile: function () {
  		return document.createElement('div');
  	},

  	// @section
  	// @method getTileSize: Point
  	// Normalizes the [tileSize option](#gridlayer-tilesize) into a point. Used by the `createTile()` method.
  	getTileSize: function () {
  		var s = this.options.tileSize;
  		return s instanceof Point ? s : new Point(s, s);
  	},

  	_updateZIndex: function () {
  		if (this._container && this.options.zIndex !== undefined && this.options.zIndex !== null) {
  			this._container.style.zIndex = this.options.zIndex;
  		}
  	},

  	_setAutoZIndex: function (compare) {
  		// go through all other layers of the same pane, set zIndex to max + 1 (front) or min - 1 (back)

  		var layers = this.getPane().children,
  		    edgeZIndex = -compare(-Infinity, Infinity); // -Infinity for max, Infinity for min

  		for (var i = 0, len = layers.length, zIndex; i < len; i++) {

  			zIndex = layers[i].style.zIndex;

  			if (layers[i] !== this._container && zIndex) {
  				edgeZIndex = compare(edgeZIndex, +zIndex);
  			}
  		}

  		if (isFinite(edgeZIndex)) {
  			this.options.zIndex = edgeZIndex + compare(-1, 1);
  			this._updateZIndex();
  		}
  	},

  	_updateOpacity: function () {
  		if (!this._map) { return; }

  		// IE doesn't inherit filter opacity properly, so we're forced to set it on tiles
  		if (Browser.ielt9) { return; }

  		setOpacity(this._container, this.options.opacity);

  		var now = +new Date(),
  		    nextFrame = false,
  		    willPrune = false;

  		for (var key in this._tiles) {
  			var tile = this._tiles[key];
  			if (!tile.current || !tile.loaded) { continue; }

  			var fade = Math.min(1, (now - tile.loaded) / 200);

  			setOpacity(tile.el, fade);
  			if (fade < 1) {
  				nextFrame = true;
  			} else {
  				if (tile.active) {
  					willPrune = true;
  				} else {
  					this._onOpaqueTile(tile);
  				}
  				tile.active = true;
  			}
  		}

  		if (willPrune && !this._noPrune) { this._pruneTiles(); }

  		if (nextFrame) {
  			cancelAnimFrame(this._fadeFrame);
  			this._fadeFrame = requestAnimFrame(this._updateOpacity, this);
  		}
  	},

  	_onOpaqueTile: falseFn,

  	_initContainer: function () {
  		if (this._container) { return; }

  		this._container = create$1('div', 'leaflet-layer ' + (this.options.className || ''));
  		this._updateZIndex();

  		if (this.options.opacity < 1) {
  			this._updateOpacity();
  		}

  		this.getPane().appendChild(this._container);
  	},

  	_updateLevels: function () {

  		var zoom = this._tileZoom,
  		    maxZoom = this.options.maxZoom;

  		if (zoom === undefined) { return undefined; }

  		for (var z in this._levels) {
  			z = Number(z);
  			if (this._levels[z].el.children.length || z === zoom) {
  				this._levels[z].el.style.zIndex = maxZoom - Math.abs(zoom - z);
  				this._onUpdateLevel(z);
  			} else {
  				remove(this._levels[z].el);
  				this._removeTilesAtZoom(z);
  				this._onRemoveLevel(z);
  				delete this._levels[z];
  			}
  		}

  		var level = this._levels[zoom],
  		    map = this._map;

  		if (!level) {
  			level = this._levels[zoom] = {};

  			level.el = create$1('div', 'leaflet-tile-container leaflet-zoom-animated', this._container);
  			level.el.style.zIndex = maxZoom;

  			level.origin = map.project(map.unproject(map.getPixelOrigin()), zoom).round();
  			level.zoom = zoom;

  			this._setZoomTransform(level, map.getCenter(), map.getZoom());

  			// force the browser to consider the newly added element for transition
  			falseFn(level.el.offsetWidth);

  			this._onCreateLevel(level);
  		}

  		this._level = level;

  		return level;
  	},

  	_onUpdateLevel: falseFn,

  	_onRemoveLevel: falseFn,

  	_onCreateLevel: falseFn,

  	_pruneTiles: function () {
  		if (!this._map) {
  			return;
  		}

  		var key, tile;

  		var zoom = this._map.getZoom();
  		if (zoom > this.options.maxZoom ||
  			zoom < this.options.minZoom) {
  			this._removeAllTiles();
  			return;
  		}

  		for (key in this._tiles) {
  			tile = this._tiles[key];
  			tile.retain = tile.current;
  		}

  		for (key in this._tiles) {
  			tile = this._tiles[key];
  			if (tile.current && !tile.active) {
  				var coords = tile.coords;
  				if (!this._retainParent(coords.x, coords.y, coords.z, coords.z - 5)) {
  					this._retainChildren(coords.x, coords.y, coords.z, coords.z + 2);
  				}
  			}
  		}

  		for (key in this._tiles) {
  			if (!this._tiles[key].retain) {
  				this._removeTile(key);
  			}
  		}
  	},

  	_removeTilesAtZoom: function (zoom) {
  		for (var key in this._tiles) {
  			if (this._tiles[key].coords.z !== zoom) {
  				continue;
  			}
  			this._removeTile(key);
  		}
  	},

  	_removeAllTiles: function () {
  		for (var key in this._tiles) {
  			this._removeTile(key);
  		}
  	},

  	_invalidateAll: function () {
  		for (var z in this._levels) {
  			remove(this._levels[z].el);
  			this._onRemoveLevel(Number(z));
  			delete this._levels[z];
  		}
  		this._removeAllTiles();

  		this._tileZoom = undefined;
  	},

  	_retainParent: function (x, y, z, minZoom) {
  		var x2 = Math.floor(x / 2),
  		    y2 = Math.floor(y / 2),
  		    z2 = z - 1,
  		    coords2 = new Point(+x2, +y2);
  		coords2.z = +z2;

  		var key = this._tileCoordsToKey(coords2),
  		    tile = this._tiles[key];

  		if (tile && tile.active) {
  			tile.retain = true;
  			return true;

  		} else if (tile && tile.loaded) {
  			tile.retain = true;
  		}

  		if (z2 > minZoom) {
  			return this._retainParent(x2, y2, z2, minZoom);
  		}

  		return false;
  	},

  	_retainChildren: function (x, y, z, maxZoom) {

  		for (var i = 2 * x; i < 2 * x + 2; i++) {
  			for (var j = 2 * y; j < 2 * y + 2; j++) {

  				var coords = new Point(i, j);
  				coords.z = z + 1;

  				var key = this._tileCoordsToKey(coords),
  				    tile = this._tiles[key];

  				if (tile && tile.active) {
  					tile.retain = true;
  					continue;

  				} else if (tile && tile.loaded) {
  					tile.retain = true;
  				}

  				if (z + 1 < maxZoom) {
  					this._retainChildren(i, j, z + 1, maxZoom);
  				}
  			}
  		}
  	},

  	_resetView: function (e) {
  		var animating = e && (e.pinch || e.flyTo);
  		this._setView(this._map.getCenter(), this._map.getZoom(), animating, animating);
  	},

  	_animateZoom: function (e) {
  		this._setView(e.center, e.zoom, true, e.noUpdate);
  	},

  	_clampZoom: function (zoom) {
  		var options = this.options;

  		if (undefined !== options.minNativeZoom && zoom < options.minNativeZoom) {
  			return options.minNativeZoom;
  		}

  		if (undefined !== options.maxNativeZoom && options.maxNativeZoom < zoom) {
  			return options.maxNativeZoom;
  		}

  		return zoom;
  	},

  	_setView: function (center, zoom, noPrune, noUpdate) {
  		var tileZoom = Math.round(zoom);
  		if ((this.options.maxZoom !== undefined && tileZoom > this.options.maxZoom) ||
  		    (this.options.minZoom !== undefined && tileZoom < this.options.minZoom)) {
  			tileZoom = undefined;
  		} else {
  			tileZoom = this._clampZoom(tileZoom);
  		}

  		var tileZoomChanged = this.options.updateWhenZooming && (tileZoom !== this._tileZoom);

  		if (!noUpdate || tileZoomChanged) {

  			this._tileZoom = tileZoom;

  			if (this._abortLoading) {
  				this._abortLoading();
  			}

  			this._updateLevels();
  			this._resetGrid();

  			if (tileZoom !== undefined) {
  				this._update(center);
  			}

  			if (!noPrune) {
  				this._pruneTiles();
  			}

  			// Flag to prevent _updateOpacity from pruning tiles during
  			// a zoom anim or a pinch gesture
  			this._noPrune = !!noPrune;
  		}

  		this._setZoomTransforms(center, zoom);
  	},

  	_setZoomTransforms: function (center, zoom) {
  		for (var i in this._levels) {
  			this._setZoomTransform(this._levels[i], center, zoom);
  		}
  	},

  	_setZoomTransform: function (level, center, zoom) {
  		var scale = this._map.getZoomScale(zoom, level.zoom),
  		    translate = level.origin.multiplyBy(scale)
  		        .subtract(this._map._getNewPixelOrigin(center, zoom)).round();

  		if (Browser.any3d) {
  			setTransform(level.el, translate, scale);
  		} else {
  			setPosition(level.el, translate);
  		}
  	},

  	_resetGrid: function () {
  		var map = this._map,
  		    crs = map.options.crs,
  		    tileSize = this._tileSize = this.getTileSize(),
  		    tileZoom = this._tileZoom;

  		var bounds = this._map.getPixelWorldBounds(this._tileZoom);
  		if (bounds) {
  			this._globalTileRange = this._pxBoundsToTileRange(bounds);
  		}

  		this._wrapX = crs.wrapLng && !this.options.noWrap && [
  			Math.floor(map.project([0, crs.wrapLng[0]], tileZoom).x / tileSize.x),
  			Math.ceil(map.project([0, crs.wrapLng[1]], tileZoom).x / tileSize.y)
  		];
  		this._wrapY = crs.wrapLat && !this.options.noWrap && [
  			Math.floor(map.project([crs.wrapLat[0], 0], tileZoom).y / tileSize.x),
  			Math.ceil(map.project([crs.wrapLat[1], 0], tileZoom).y / tileSize.y)
  		];
  	},

  	_onMoveEnd: function () {
  		if (!this._map || this._map._animatingZoom) { return; }

  		this._update();
  	},

  	_getTiledPixelBounds: function (center) {
  		var map = this._map,
  		    mapZoom = map._animatingZoom ? Math.max(map._animateToZoom, map.getZoom()) : map.getZoom(),
  		    scale = map.getZoomScale(mapZoom, this._tileZoom),
  		    pixelCenter = map.project(center, this._tileZoom).floor(),
  		    halfSize = map.getSize().divideBy(scale * 2);

  		return new Bounds(pixelCenter.subtract(halfSize), pixelCenter.add(halfSize));
  	},

  	// Private method to load tiles in the grid's active zoom level according to map bounds
  	_update: function (center) {
  		var map = this._map;
  		if (!map) { return; }
  		var zoom = this._clampZoom(map.getZoom());

  		if (center === undefined) { center = map.getCenter(); }
  		if (this._tileZoom === undefined) { return; }	// if out of minzoom/maxzoom

  		var pixelBounds = this._getTiledPixelBounds(center),
  		    tileRange = this._pxBoundsToTileRange(pixelBounds),
  		    tileCenter = tileRange.getCenter(),
  		    queue = [],
  		    margin = this.options.keepBuffer,
  		    noPruneRange = new Bounds(tileRange.getBottomLeft().subtract([margin, -margin]),
  		                              tileRange.getTopRight().add([margin, -margin]));

  		// Sanity check: panic if the tile range contains Infinity somewhere.
  		if (!(isFinite(tileRange.min.x) &&
  		      isFinite(tileRange.min.y) &&
  		      isFinite(tileRange.max.x) &&
  		      isFinite(tileRange.max.y))) { throw new Error('Attempted to load an infinite number of tiles'); }

  		for (var key in this._tiles) {
  			var c = this._tiles[key].coords;
  			if (c.z !== this._tileZoom || !noPruneRange.contains(new Point(c.x, c.y))) {
  				this._tiles[key].current = false;
  			}
  		}

  		// _update just loads more tiles. If the tile zoom level differs too much
  		// from the map's, let _setView reset levels and prune old tiles.
  		if (Math.abs(zoom - this._tileZoom) > 1) { this._setView(center, zoom); return; }

  		// create a queue of coordinates to load tiles from
  		for (var j = tileRange.min.y; j <= tileRange.max.y; j++) {
  			for (var i = tileRange.min.x; i <= tileRange.max.x; i++) {
  				var coords = new Point(i, j);
  				coords.z = this._tileZoom;

  				if (!this._isValidTile(coords)) { continue; }

  				var tile = this._tiles[this._tileCoordsToKey(coords)];
  				if (tile) {
  					tile.current = true;
  				} else {
  					queue.push(coords);
  				}
  			}
  		}

  		// sort tile queue to load tiles in order of their distance to center
  		queue.sort(function (a, b) {
  			return a.distanceTo(tileCenter) - b.distanceTo(tileCenter);
  		});

  		if (queue.length !== 0) {
  			// if it's the first batch of tiles to load
  			if (!this._loading) {
  				this._loading = true;
  				// @event loading: Event
  				// Fired when the grid layer starts loading tiles.
  				this.fire('loading');
  			}

  			// create DOM fragment to append tiles in one batch
  			var fragment = document.createDocumentFragment();

  			for (i = 0; i < queue.length; i++) {
  				this._addTile(queue[i], fragment);
  			}

  			this._level.el.appendChild(fragment);
  		}
  	},

  	_isValidTile: function (coords) {
  		var crs = this._map.options.crs;

  		if (!crs.infinite) {
  			// don't load tile if it's out of bounds and not wrapped
  			var bounds = this._globalTileRange;
  			if ((!crs.wrapLng && (coords.x < bounds.min.x || coords.x > bounds.max.x)) ||
  			    (!crs.wrapLat && (coords.y < bounds.min.y || coords.y > bounds.max.y))) { return false; }
  		}

  		if (!this.options.bounds) { return true; }

  		// don't load tile if it doesn't intersect the bounds in options
  		var tileBounds = this._tileCoordsToBounds(coords);
  		return toLatLngBounds(this.options.bounds).overlaps(tileBounds);
  	},

  	_keyToBounds: function (key) {
  		return this._tileCoordsToBounds(this._keyToTileCoords(key));
  	},

  	_tileCoordsToNwSe: function (coords) {
  		var map = this._map,
  		    tileSize = this.getTileSize(),
  		    nwPoint = coords.scaleBy(tileSize),
  		    sePoint = nwPoint.add(tileSize),
  		    nw = map.unproject(nwPoint, coords.z),
  		    se = map.unproject(sePoint, coords.z);
  		return [nw, se];
  	},

  	// converts tile coordinates to its geographical bounds
  	_tileCoordsToBounds: function (coords) {
  		var bp = this._tileCoordsToNwSe(coords),
  		    bounds = new LatLngBounds(bp[0], bp[1]);

  		if (!this.options.noWrap) {
  			bounds = this._map.wrapLatLngBounds(bounds);
  		}
  		return bounds;
  	},
  	// converts tile coordinates to key for the tile cache
  	_tileCoordsToKey: function (coords) {
  		return coords.x + ':' + coords.y + ':' + coords.z;
  	},

  	// converts tile cache key to coordinates
  	_keyToTileCoords: function (key) {
  		var k = key.split(':'),
  		    coords = new Point(+k[0], +k[1]);
  		coords.z = +k[2];
  		return coords;
  	},

  	_removeTile: function (key) {
  		var tile = this._tiles[key];
  		if (!tile) { return; }

  		remove(tile.el);

  		delete this._tiles[key];

  		// @event tileunload: TileEvent
  		// Fired when a tile is removed (e.g. when a tile goes off the screen).
  		this.fire('tileunload', {
  			tile: tile.el,
  			coords: this._keyToTileCoords(key)
  		});
  	},

  	_initTile: function (tile) {
  		addClass(tile, 'leaflet-tile');

  		var tileSize = this.getTileSize();
  		tile.style.width = tileSize.x + 'px';
  		tile.style.height = tileSize.y + 'px';

  		tile.onselectstart = falseFn;
  		tile.onmousemove = falseFn;

  		// update opacity on tiles in IE7-8 because of filter inheritance problems
  		if (Browser.ielt9 && this.options.opacity < 1) {
  			setOpacity(tile, this.options.opacity);
  		}
  	},

  	_addTile: function (coords, container) {
  		var tilePos = this._getTilePos(coords),
  		    key = this._tileCoordsToKey(coords);

  		var tile = this.createTile(this._wrapCoords(coords), bind(this._tileReady, this, coords));

  		this._initTile(tile);

  		// if createTile is defined with a second argument ("done" callback),
  		// we know that tile is async and will be ready later; otherwise
  		if (this.createTile.length < 2) {
  			// mark tile as ready, but delay one frame for opacity animation to happen
  			requestAnimFrame(bind(this._tileReady, this, coords, null, tile));
  		}

  		setPosition(tile, tilePos);

  		// save tile in cache
  		this._tiles[key] = {
  			el: tile,
  			coords: coords,
  			current: true
  		};

  		container.appendChild(tile);
  		// @event tileloadstart: TileEvent
  		// Fired when a tile is requested and starts loading.
  		this.fire('tileloadstart', {
  			tile: tile,
  			coords: coords
  		});
  	},

  	_tileReady: function (coords, err, tile) {
  		if (err) {
  			// @event tileerror: TileErrorEvent
  			// Fired when there is an error loading a tile.
  			this.fire('tileerror', {
  				error: err,
  				tile: tile,
  				coords: coords
  			});
  		}

  		var key = this._tileCoordsToKey(coords);

  		tile = this._tiles[key];
  		if (!tile) { return; }

  		tile.loaded = +new Date();
  		if (this._map._fadeAnimated) {
  			setOpacity(tile.el, 0);
  			cancelAnimFrame(this._fadeFrame);
  			this._fadeFrame = requestAnimFrame(this._updateOpacity, this);
  		} else {
  			tile.active = true;
  			this._pruneTiles();
  		}

  		if (!err) {
  			addClass(tile.el, 'leaflet-tile-loaded');

  			// @event tileload: TileEvent
  			// Fired when a tile loads.
  			this.fire('tileload', {
  				tile: tile.el,
  				coords: coords
  			});
  		}

  		if (this._noTilesToLoad()) {
  			this._loading = false;
  			// @event load: Event
  			// Fired when the grid layer loaded all visible tiles.
  			this.fire('load');

  			if (Browser.ielt9 || !this._map._fadeAnimated) {
  				requestAnimFrame(this._pruneTiles, this);
  			} else {
  				// Wait a bit more than 0.2 secs (the duration of the tile fade-in)
  				// to trigger a pruning.
  				setTimeout(bind(this._pruneTiles, this), 250);
  			}
  		}
  	},

  	_getTilePos: function (coords) {
  		return coords.scaleBy(this.getTileSize()).subtract(this._level.origin);
  	},

  	_wrapCoords: function (coords) {
  		var newCoords = new Point(
  			this._wrapX ? wrapNum(coords.x, this._wrapX) : coords.x,
  			this._wrapY ? wrapNum(coords.y, this._wrapY) : coords.y);
  		newCoords.z = coords.z;
  		return newCoords;
  	},

  	_pxBoundsToTileRange: function (bounds) {
  		var tileSize = this.getTileSize();
  		return new Bounds(
  			bounds.min.unscaleBy(tileSize).floor(),
  			bounds.max.unscaleBy(tileSize).ceil().subtract([1, 1]));
  	},

  	_noTilesToLoad: function () {
  		for (var key in this._tiles) {
  			if (!this._tiles[key].loaded) { return false; }
  		}
  		return true;
  	}
  });

  // @factory L.gridLayer(options?: GridLayer options)
  // Creates a new instance of GridLayer with the supplied options.
  function gridLayer(options) {
  	return new GridLayer(options);
  }

  /*
   * @class TileLayer
   * @inherits GridLayer
   * @aka L.TileLayer
   * Used to load and display tile layers on the map. Note that most tile servers require attribution, which you can set under `Layer`. Extends `GridLayer`.
   *
   * @example
   *
   * ```js
   * L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar', attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);
   * ```
   *
   * @section URL template
   * @example
   *
   * A string of the following form:
   *
   * ```
   * 'https://{s}.somedomain.com/blabla/{z}/{x}/{y}{r}.png'
   * ```
   *
   * `{s}` means one of the available subdomains (used sequentially to help with browser parallel requests per domain limitation; subdomain values are specified in options; `a`, `b` or `c` by default, can be omitted), `{z}` — zoom level, `{x}` and `{y}` — tile coordinates. `{r}` can be used to add "&commat;2x" to the URL to load retina tiles.
   *
   * You can use custom keys in the template, which will be [evaluated](#util-template) from TileLayer options, like this:
   *
   * ```
   * L.tileLayer('https://{s}.somedomain.com/{foo}/{z}/{x}/{y}.png', {foo: 'bar'});
   * ```
   */


  var TileLayer = GridLayer.extend({

  	// @section
  	// @aka TileLayer options
  	options: {
  		// @option minZoom: Number = 0
  		// The minimum zoom level down to which this layer will be displayed (inclusive).
  		minZoom: 0,

  		// @option maxZoom: Number = 18
  		// The maximum zoom level up to which this layer will be displayed (inclusive).
  		maxZoom: 18,

  		// @option subdomains: String|String[] = 'abc'
  		// Subdomains of the tile service. Can be passed in the form of one string (where each letter is a subdomain name) or an array of strings.
  		subdomains: 'abc',

  		// @option errorTileUrl: String = ''
  		// URL to the tile image to show in place of the tile that failed to load.
  		errorTileUrl: '',

  		// @option zoomOffset: Number = 0
  		// The zoom number used in tile URLs will be offset with this value.
  		zoomOffset: 0,

  		// @option tms: Boolean = false
  		// If `true`, inverses Y axis numbering for tiles (turn this on for [TMS](https://en.wikipedia.org/wiki/Tile_Map_Service) services).
  		tms: false,

  		// @option zoomReverse: Boolean = false
  		// If set to true, the zoom number used in tile URLs will be reversed (`maxZoom - zoom` instead of `zoom`)
  		zoomReverse: false,

  		// @option detectRetina: Boolean = false
  		// If `true` and user is on a retina display, it will request four tiles of half the specified size and a bigger zoom level in place of one to utilize the high resolution.
  		detectRetina: false,

  		// @option crossOrigin: Boolean|String = false
  		// Whether the crossOrigin attribute will be added to the tiles.
  		// If a String is provided, all tiles will have their crossOrigin attribute set to the String provided. This is needed if you want to access tile pixel data.
  		// Refer to [CORS Settings](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for valid String values.
  		crossOrigin: false,

  		// @option referrerPolicy: Boolean|String = false
  		// Whether the referrerPolicy attribute will be added to the tiles.
  		// If a String is provided, all tiles will have their referrerPolicy attribute set to the String provided.
  		// This may be needed if your map's rendering context has a strict default but your tile provider expects a valid referrer
  		// (e.g. to validate an API token).
  		// Refer to [HTMLImageElement.referrerPolicy](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/referrerPolicy) for valid String values.
  		referrerPolicy: false
  	},

  	initialize: function (url, options) {

  		this._url = url;

  		options = setOptions(this, options);

  		// detecting retina displays, adjusting tileSize and zoom levels
  		if (options.detectRetina && Browser.retina && options.maxZoom > 0) {

  			options.tileSize = Math.floor(options.tileSize / 2);

  			if (!options.zoomReverse) {
  				options.zoomOffset++;
  				options.maxZoom = Math.max(options.minZoom, options.maxZoom - 1);
  			} else {
  				options.zoomOffset--;
  				options.minZoom = Math.min(options.maxZoom, options.minZoom + 1);
  			}

  			options.minZoom = Math.max(0, options.minZoom);
  		} else if (!options.zoomReverse) {
  			// make sure maxZoom is gte minZoom
  			options.maxZoom = Math.max(options.minZoom, options.maxZoom);
  		} else {
  			// make sure minZoom is lte maxZoom
  			options.minZoom = Math.min(options.maxZoom, options.minZoom);
  		}

  		if (typeof options.subdomains === 'string') {
  			options.subdomains = options.subdomains.split('');
  		}

  		this.on('tileunload', this._onTileRemove);
  	},

  	// @method setUrl(url: String, noRedraw?: Boolean): this
  	// Updates the layer's URL template and redraws it (unless `noRedraw` is set to `true`).
  	// If the URL does not change, the layer will not be redrawn unless
  	// the noRedraw parameter is set to false.
  	setUrl: function (url, noRedraw) {
  		if (this._url === url && noRedraw === undefined) {
  			noRedraw = true;
  		}

  		this._url = url;

  		if (!noRedraw) {
  			this.redraw();
  		}
  		return this;
  	},

  	// @method createTile(coords: Object, done?: Function): HTMLElement
  	// Called only internally, overrides GridLayer's [`createTile()`](#gridlayer-createtile)
  	// to return an `<img>` HTML element with the appropriate image URL given `coords`. The `done`
  	// callback is called when the tile has been loaded.
  	createTile: function (coords, done) {
  		var tile = document.createElement('img');

  		on(tile, 'load', bind(this._tileOnLoad, this, done, tile));
  		on(tile, 'error', bind(this._tileOnError, this, done, tile));

  		if (this.options.crossOrigin || this.options.crossOrigin === '') {
  			tile.crossOrigin = this.options.crossOrigin === true ? '' : this.options.crossOrigin;
  		}

  		// for this new option we follow the documented behavior
  		// more closely by only setting the property when string
  		if (typeof this.options.referrerPolicy === 'string') {
  			tile.referrerPolicy = this.options.referrerPolicy;
  		}

  		// The alt attribute is set to the empty string,
  		// allowing screen readers to ignore the decorative image tiles.
  		// https://www.w3.org/WAI/tutorials/images/decorative/
  		// https://www.w3.org/TR/html-aria/#el-img-empty-alt
  		tile.alt = '';

  		tile.src = this.getTileUrl(coords);

  		return tile;
  	},

  	// @section Extension methods
  	// @uninheritable
  	// Layers extending `TileLayer` might reimplement the following method.
  	// @method getTileUrl(coords: Object): String
  	// Called only internally, returns the URL for a tile given its coordinates.
  	// Classes extending `TileLayer` can override this function to provide custom tile URL naming schemes.
  	getTileUrl: function (coords) {
  		var data = {
  			r: Browser.retina ? '@2x' : '',
  			s: this._getSubdomain(coords),
  			x: coords.x,
  			y: coords.y,
  			z: this._getZoomForUrl()
  		};
  		if (this._map && !this._map.options.crs.infinite) {
  			var invertedY = this._globalTileRange.max.y - coords.y;
  			if (this.options.tms) {
  				data['y'] = invertedY;
  			}
  			data['-y'] = invertedY;
  		}

  		return template(this._url, extend(data, this.options));
  	},

  	_tileOnLoad: function (done, tile) {
  		// For https://github.com/Leaflet/Leaflet/issues/3332
  		if (Browser.ielt9) {
  			setTimeout(bind(done, this, null, tile), 0);
  		} else {
  			done(null, tile);
  		}
  	},

  	_tileOnError: function (done, tile, e) {
  		var errorUrl = this.options.errorTileUrl;
  		if (errorUrl && tile.getAttribute('src') !== errorUrl) {
  			tile.src = errorUrl;
  		}
  		done(e, tile);
  	},

  	_onTileRemove: function (e) {
  		e.tile.onload = null;
  	},

  	_getZoomForUrl: function () {
  		var zoom = this._tileZoom,
  		maxZoom = this.options.maxZoom,
  		zoomReverse = this.options.zoomReverse,
  		zoomOffset = this.options.zoomOffset;

  		if (zoomReverse) {
  			zoom = maxZoom - zoom;
  		}

  		return zoom + zoomOffset;
  	},

  	_getSubdomain: function (tilePoint) {
  		var index = Math.abs(tilePoint.x + tilePoint.y) % this.options.subdomains.length;
  		return this.options.subdomains[index];
  	},

  	// stops loading all tiles in the background layer
  	_abortLoading: function () {
  		var i, tile;
  		for (i in this._tiles) {
  			if (this._tiles[i].coords.z !== this._tileZoom) {
  				tile = this._tiles[i].el;

  				tile.onload = falseFn;
  				tile.onerror = falseFn;

  				if (!tile.complete) {
  					tile.src = emptyImageUrl;
  					var coords = this._tiles[i].coords;
  					remove(tile);
  					delete this._tiles[i];
  					// @event tileabort: TileEvent
  					// Fired when a tile was loading but is now not wanted.
  					this.fire('tileabort', {
  						tile: tile,
  						coords: coords
  					});
  				}
  			}
  		}
  	},

  	_removeTile: function (key) {
  		var tile = this._tiles[key];
  		if (!tile) { return; }

  		// Cancels any pending http requests associated with the tile
  		tile.el.setAttribute('src', emptyImageUrl);

  		return GridLayer.prototype._removeTile.call(this, key);
  	},

  	_tileReady: function (coords, err, tile) {
  		if (!this._map || (tile && tile.getAttribute('src') === emptyImageUrl)) {
  			return;
  		}

  		return GridLayer.prototype._tileReady.call(this, coords, err, tile);
  	}
  });


  // @factory L.tilelayer(urlTemplate: String, options?: TileLayer options)
  // Instantiates a tile layer object given a `URL template` and optionally an options object.

  function tileLayer(url, options) {
  	return new TileLayer(url, options);
  }

  /*
   * @class TileLayer.WMS
   * @inherits TileLayer
   * @aka L.TileLayer.WMS
   * Used to display [WMS](https://en.wikipedia.org/wiki/Web_Map_Service) services as tile layers on the map. Extends `TileLayer`.
   *
   * @example
   *
   * ```js
   * var nexrad = L.tileLayer.wms("http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi", {
   * 	layers: 'nexrad-n0r-900913',
   * 	format: 'image/png',
   * 	transparent: true,
   * 	attribution: "Weather data © 2012 IEM Nexrad"
   * });
   * ```
   */

  var TileLayerWMS = TileLayer.extend({

  	// @section
  	// @aka TileLayer.WMS options
  	// If any custom options not documented here are used, they will be sent to the
  	// WMS server as extra parameters in each request URL. This can be useful for
  	// [non-standard vendor WMS parameters](https://docs.geoserver.org/stable/en/user/services/wms/vendor.html).
  	defaultWmsParams: {
  		service: 'WMS',
  		request: 'GetMap',

  		// @option layers: String = ''
  		// **(required)** Comma-separated list of WMS layers to show.
  		layers: '',

  		// @option styles: String = ''
  		// Comma-separated list of WMS styles.
  		styles: '',

  		// @option format: String = 'image/jpeg'
  		// WMS image format (use `'image/png'` for layers with transparency).
  		format: 'image/jpeg',

  		// @option transparent: Boolean = false
  		// If `true`, the WMS service will return images with transparency.
  		transparent: false,

  		// @option version: String = '1.1.1'
  		// Version of the WMS service to use
  		version: '1.1.1'
  	},

  	options: {
  		// @option crs: CRS = null
  		// Coordinate Reference System to use for the WMS requests, defaults to
  		// map CRS. Don't change this if you're not sure what it means.
  		crs: null,

  		// @option uppercase: Boolean = false
  		// If `true`, WMS request parameter keys will be uppercase.
  		uppercase: false
  	},

  	initialize: function (url, options) {

  		this._url = url;

  		var wmsParams = extend({}, this.defaultWmsParams);

  		// all keys that are not TileLayer options go to WMS params
  		for (var i in options) {
  			if (!(i in this.options)) {
  				wmsParams[i] = options[i];
  			}
  		}

  		options = setOptions(this, options);

  		var realRetina = options.detectRetina && Browser.retina ? 2 : 1;
  		var tileSize = this.getTileSize();
  		wmsParams.width = tileSize.x * realRetina;
  		wmsParams.height = tileSize.y * realRetina;

  		this.wmsParams = wmsParams;
  	},

  	onAdd: function (map) {

  		this._crs = this.options.crs || map.options.crs;
  		this._wmsVersion = parseFloat(this.wmsParams.version);

  		var projectionKey = this._wmsVersion >= 1.3 ? 'crs' : 'srs';
  		this.wmsParams[projectionKey] = this._crs.code;

  		TileLayer.prototype.onAdd.call(this, map);
  	},

  	getTileUrl: function (coords) {

  		var tileBounds = this._tileCoordsToNwSe(coords),
  		    crs = this._crs,
  		    bounds = toBounds(crs.project(tileBounds[0]), crs.project(tileBounds[1])),
  		    min = bounds.min,
  		    max = bounds.max,
  		    bbox = (this._wmsVersion >= 1.3 && this._crs === EPSG4326 ?
  		    [min.y, min.x, max.y, max.x] :
  		    [min.x, min.y, max.x, max.y]).join(','),
  		    url = TileLayer.prototype.getTileUrl.call(this, coords);
  		return url +
  			getParamString(this.wmsParams, url, this.options.uppercase) +
  			(this.options.uppercase ? '&BBOX=' : '&bbox=') + bbox;
  	},

  	// @method setParams(params: Object, noRedraw?: Boolean): this
  	// Merges an object with the new parameters and re-requests tiles on the current screen (unless `noRedraw` was set to true).
  	setParams: function (params, noRedraw) {

  		extend(this.wmsParams, params);

  		if (!noRedraw) {
  			this.redraw();
  		}

  		return this;
  	}
  });


  // @factory L.tileLayer.wms(baseUrl: String, options: TileLayer.WMS options)
  // Instantiates a WMS tile layer object given a base URL of the WMS service and a WMS parameters/options object.
  function tileLayerWMS(url, options) {
  	return new TileLayerWMS(url, options);
  }

  TileLayer.WMS = TileLayerWMS;
  tileLayer.wms = tileLayerWMS;

  /*
   * @class Renderer
   * @inherits Layer
   * @aka L.Renderer
   *
   * Base class for vector renderer implementations (`SVG`, `Canvas`). Handles the
   * DOM container of the renderer, its bounds, and its zoom animation.
   *
   * A `Renderer` works as an implicit layer group for all `Path`s - the renderer
   * itself can be added or removed to the map. All paths use a renderer, which can
   * be implicit (the map will decide the type of renderer and use it automatically)
   * or explicit (using the [`renderer`](#path-renderer) option of the path).
   *
   * Do not use this class directly, use `SVG` and `Canvas` instead.
   *
   * @event update: Event
   * Fired when the renderer updates its bounds, center and zoom, for example when
   * its map has moved
   */

  var Renderer = Layer.extend({

  	// @section
  	// @aka Renderer options
  	options: {
  		// @option padding: Number = 0.1
  		// How much to extend the clip area around the map view (relative to its size)
  		// e.g. 0.1 would be 10% of map view in each direction
  		padding: 0.1
  	},

  	initialize: function (options) {
  		setOptions(this, options);
  		stamp(this);
  		this._layers = this._layers || {};
  	},

  	onAdd: function () {
  		if (!this._container) {
  			this._initContainer(); // defined by renderer implementations

  			// always keep transform-origin as 0 0
  			addClass(this._container, 'leaflet-zoom-animated');
  		}

  		this.getPane().appendChild(this._container);
  		this._update();
  		this.on('update', this._updatePaths, this);
  	},

  	onRemove: function () {
  		this.off('update', this._updatePaths, this);
  		this._destroyContainer();
  	},

  	getEvents: function () {
  		var events = {
  			viewreset: this._reset,
  			zoom: this._onZoom,
  			moveend: this._update,
  			zoomend: this._onZoomEnd
  		};
  		if (this._zoomAnimated) {
  			events.zoomanim = this._onAnimZoom;
  		}
  		return events;
  	},

  	_onAnimZoom: function (ev) {
  		this._updateTransform(ev.center, ev.zoom);
  	},

  	_onZoom: function () {
  		this._updateTransform(this._map.getCenter(), this._map.getZoom());
  	},

  	_updateTransform: function (center, zoom) {
  		var scale = this._map.getZoomScale(zoom, this._zoom),
  		    viewHalf = this._map.getSize().multiplyBy(0.5 + this.options.padding),
  		    currentCenterPoint = this._map.project(this._center, zoom),

  		    topLeftOffset = viewHalf.multiplyBy(-scale).add(currentCenterPoint)
  				  .subtract(this._map._getNewPixelOrigin(center, zoom));

  		if (Browser.any3d) {
  			setTransform(this._container, topLeftOffset, scale);
  		} else {
  			setPosition(this._container, topLeftOffset);
  		}
  	},

  	_reset: function () {
  		this._update();
  		this._updateTransform(this._center, this._zoom);

  		for (var id in this._layers) {
  			this._layers[id]._reset();
  		}
  	},

  	_onZoomEnd: function () {
  		for (var id in this._layers) {
  			this._layers[id]._project();
  		}
  	},

  	_updatePaths: function () {
  		for (var id in this._layers) {
  			this._layers[id]._update();
  		}
  	},

  	_update: function () {
  		// Update pixel bounds of renderer container (for positioning/sizing/clipping later)
  		// Subclasses are responsible of firing the 'update' event.
  		var p = this.options.padding,
  		    size = this._map.getSize(),
  		    min = this._map.containerPointToLayerPoint(size.multiplyBy(-p)).round();

  		this._bounds = new Bounds(min, min.add(size.multiplyBy(1 + p * 2)).round());

  		this._center = this._map.getCenter();
  		this._zoom = this._map.getZoom();
  	}
  });

  /*
   * @class Canvas
   * @inherits Renderer
   * @aka L.Canvas
   *
   * Allows vector layers to be displayed with [`<canvas>`](https://developer.mozilla.org/docs/Web/API/Canvas_API).
   * Inherits `Renderer`.
   *
   * Due to [technical limitations](https://caniuse.com/canvas), Canvas is not
   * available in all web browsers, notably IE8, and overlapping geometries might
   * not display properly in some edge cases.
   *
   * @example
   *
   * Use Canvas by default for all paths in the map:
   *
   * ```js
   * var map = L.map('map', {
   * 	renderer: L.canvas()
   * });
   * ```
   *
   * Use a Canvas renderer with extra padding for specific vector geometries:
   *
   * ```js
   * var map = L.map('map');
   * var myRenderer = L.canvas({ padding: 0.5 });
   * var line = L.polyline( coordinates, { renderer: myRenderer } );
   * var circle = L.circle( center, { renderer: myRenderer } );
   * ```
   */

  var Canvas = Renderer.extend({

  	// @section
  	// @aka Canvas options
  	options: {
  		// @option tolerance: Number = 0
  		// How much to extend the click tolerance around a path/object on the map.
  		tolerance: 0
  	},

  	getEvents: function () {
  		var events = Renderer.prototype.getEvents.call(this);
  		events.viewprereset = this._onViewPreReset;
  		return events;
  	},

  	_onViewPreReset: function () {
  		// Set a flag so that a viewprereset+moveend+viewreset only updates&redraws once
  		this._postponeUpdatePaths = true;
  	},

  	onAdd: function () {
  		Renderer.prototype.onAdd.call(this);

  		// Redraw vectors since canvas is cleared upon removal,
  		// in case of removing the renderer itself from the map.
  		this._draw();
  	},

  	_initContainer: function () {
  		var container = this._container = document.createElement('canvas');

  		on(container, 'mousemove', this._onMouseMove, this);
  		on(container, 'click dblclick mousedown mouseup contextmenu', this._onClick, this);
  		on(container, 'mouseout', this._handleMouseOut, this);
  		container['_leaflet_disable_events'] = true;

  		this._ctx = container.getContext('2d');
  	},

  	_destroyContainer: function () {
  		cancelAnimFrame(this._redrawRequest);
  		delete this._ctx;
  		remove(this._container);
  		off(this._container);
  		delete this._container;
  	},

  	_updatePaths: function () {
  		if (this._postponeUpdatePaths) { return; }

  		var layer;
  		this._redrawBounds = null;
  		for (var id in this._layers) {
  			layer = this._layers[id];
  			layer._update();
  		}
  		this._redraw();
  	},

  	_update: function () {
  		if (this._map._animatingZoom && this._bounds) { return; }

  		Renderer.prototype._update.call(this);

  		var b = this._bounds,
  		    container = this._container,
  		    size = b.getSize(),
  		    m = Browser.retina ? 2 : 1;

  		setPosition(container, b.min);

  		// set canvas size (also clearing it); use double size on retina
  		container.width = m * size.x;
  		container.height = m * size.y;
  		container.style.width = size.x + 'px';
  		container.style.height = size.y + 'px';

  		if (Browser.retina) {
  			this._ctx.scale(2, 2);
  		}

  		// translate so we use the same path coordinates after canvas element moves
  		this._ctx.translate(-b.min.x, -b.min.y);

  		// Tell paths to redraw themselves
  		this.fire('update');
  	},

  	_reset: function () {
  		Renderer.prototype._reset.call(this);

  		if (this._postponeUpdatePaths) {
  			this._postponeUpdatePaths = false;
  			this._updatePaths();
  		}
  	},

  	_initPath: function (layer) {
  		this._updateDashArray(layer);
  		this._layers[stamp(layer)] = layer;

  		var order = layer._order = {
  			layer: layer,
  			prev: this._drawLast,
  			next: null
  		};
  		if (this._drawLast) { this._drawLast.next = order; }
  		this._drawLast = order;
  		this._drawFirst = this._drawFirst || this._drawLast;
  	},

  	_addPath: function (layer) {
  		this._requestRedraw(layer);
  	},

  	_removePath: function (layer) {
  		var order = layer._order;
  		var next = order.next;
  		var prev = order.prev;

  		if (next) {
  			next.prev = prev;
  		} else {
  			this._drawLast = prev;
  		}
  		if (prev) {
  			prev.next = next;
  		} else {
  			this._drawFirst = next;
  		}

  		delete layer._order;

  		delete this._layers[stamp(layer)];

  		this._requestRedraw(layer);
  	},

  	_updatePath: function (layer) {
  		// Redraw the union of the layer's old pixel
  		// bounds and the new pixel bounds.
  		this._extendRedrawBounds(layer);
  		layer._project();
  		layer._update();
  		// The redraw will extend the redraw bounds
  		// with the new pixel bounds.
  		this._requestRedraw(layer);
  	},

  	_updateStyle: function (layer) {
  		this._updateDashArray(layer);
  		this._requestRedraw(layer);
  	},

  	_updateDashArray: function (layer) {
  		if (typeof layer.options.dashArray === 'string') {
  			var parts = layer.options.dashArray.split(/[, ]+/),
  			    dashArray = [],
  			    dashValue,
  			    i;
  			for (i = 0; i < parts.length; i++) {
  				dashValue = Number(parts[i]);
  				// Ignore dash array containing invalid lengths
  				if (isNaN(dashValue)) { return; }
  				dashArray.push(dashValue);
  			}
  			layer.options._dashArray = dashArray;
  		} else {
  			layer.options._dashArray = layer.options.dashArray;
  		}
  	},

  	_requestRedraw: function (layer) {
  		if (!this._map) { return; }

  		this._extendRedrawBounds(layer);
  		this._redrawRequest = this._redrawRequest || requestAnimFrame(this._redraw, this);
  	},

  	_extendRedrawBounds: function (layer) {
  		if (layer._pxBounds) {
  			var padding = (layer.options.weight || 0) + 1;
  			this._redrawBounds = this._redrawBounds || new Bounds();
  			this._redrawBounds.extend(layer._pxBounds.min.subtract([padding, padding]));
  			this._redrawBounds.extend(layer._pxBounds.max.add([padding, padding]));
  		}
  	},

  	_redraw: function () {
  		this._redrawRequest = null;

  		if (this._redrawBounds) {
  			this._redrawBounds.min._floor();
  			this._redrawBounds.max._ceil();
  		}

  		this._clear(); // clear layers in redraw bounds
  		this._draw(); // draw layers

  		this._redrawBounds = null;
  	},

  	_clear: function () {
  		var bounds = this._redrawBounds;
  		if (bounds) {
  			var size = bounds.getSize();
  			this._ctx.clearRect(bounds.min.x, bounds.min.y, size.x, size.y);
  		} else {
  			this._ctx.save();
  			this._ctx.setTransform(1, 0, 0, 1, 0, 0);
  			this._ctx.clearRect(0, 0, this._container.width, this._container.height);
  			this._ctx.restore();
  		}
  	},

  	_draw: function () {
  		var layer, bounds = this._redrawBounds;
  		this._ctx.save();
  		if (bounds) {
  			var size = bounds.getSize();
  			this._ctx.beginPath();
  			this._ctx.rect(bounds.min.x, bounds.min.y, size.x, size.y);
  			this._ctx.clip();
  		}

  		this._drawing = true;

  		for (var order = this._drawFirst; order; order = order.next) {
  			layer = order.layer;
  			if (!bounds || (layer._pxBounds && layer._pxBounds.intersects(bounds))) {
  				layer._updatePath();
  			}
  		}

  		this._drawing = false;

  		this._ctx.restore();  // Restore state before clipping.
  	},

  	_updatePoly: function (layer, closed) {
  		if (!this._drawing) { return; }

  		var i, j, len2, p,
  		    parts = layer._parts,
  		    len = parts.length,
  		    ctx = this._ctx;

  		if (!len) { return; }

  		ctx.beginPath();

  		for (i = 0; i < len; i++) {
  			for (j = 0, len2 = parts[i].length; j < len2; j++) {
  				p = parts[i][j];
  				ctx[j ? 'lineTo' : 'moveTo'](p.x, p.y);
  			}
  			if (closed) {
  				ctx.closePath();
  			}
  		}

  		this._fillStroke(ctx, layer);

  		// TODO optimization: 1 fill/stroke for all features with equal style instead of 1 for each feature
  	},

  	_updateCircle: function (layer) {

  		if (!this._drawing || layer._empty()) { return; }

  		var p = layer._point,
  		    ctx = this._ctx,
  		    r = Math.max(Math.round(layer._radius), 1),
  		    s = (Math.max(Math.round(layer._radiusY), 1) || r) / r;

  		if (s !== 1) {
  			ctx.save();
  			ctx.scale(1, s);
  		}

  		ctx.beginPath();
  		ctx.arc(p.x, p.y / s, r, 0, Math.PI * 2, false);

  		if (s !== 1) {
  			ctx.restore();
  		}

  		this._fillStroke(ctx, layer);
  	},

  	_fillStroke: function (ctx, layer) {
  		var options = layer.options;

  		if (options.fill) {
  			ctx.globalAlpha = options.fillOpacity;
  			ctx.fillStyle = options.fillColor || options.color;
  			ctx.fill(options.fillRule || 'evenodd');
  		}

  		if (options.stroke && options.weight !== 0) {
  			if (ctx.setLineDash) {
  				ctx.setLineDash(layer.options && layer.options._dashArray || []);
  			}
  			ctx.globalAlpha = options.opacity;
  			ctx.lineWidth = options.weight;
  			ctx.strokeStyle = options.color;
  			ctx.lineCap = options.lineCap;
  			ctx.lineJoin = options.lineJoin;
  			ctx.stroke();
  		}
  	},

  	// Canvas obviously doesn't have mouse events for individual drawn objects,
  	// so we emulate that by calculating what's under the mouse on mousemove/click manually

  	_onClick: function (e) {
  		var point = this._map.mouseEventToLayerPoint(e), layer, clickedLayer;

  		for (var order = this._drawFirst; order; order = order.next) {
  			layer = order.layer;
  			if (layer.options.interactive && layer._containsPoint(point)) {
  				if (!(e.type === 'click' || e.type === 'preclick') || !this._map._draggableMoved(layer)) {
  					clickedLayer = layer;
  				}
  			}
  		}
  		this._fireEvent(clickedLayer ? [clickedLayer] : false, e);
  	},

  	_onMouseMove: function (e) {
  		if (!this._map || this._map.dragging.moving() || this._map._animatingZoom) { return; }

  		var point = this._map.mouseEventToLayerPoint(e);
  		this._handleMouseHover(e, point);
  	},


  	_handleMouseOut: function (e) {
  		var layer = this._hoveredLayer;
  		if (layer) {
  			// if we're leaving the layer, fire mouseout
  			removeClass(this._container, 'leaflet-interactive');
  			this._fireEvent([layer], e, 'mouseout');
  			this._hoveredLayer = null;
  			this._mouseHoverThrottled = false;
  		}
  	},

  	_handleMouseHover: function (e, point) {
  		if (this._mouseHoverThrottled) {
  			return;
  		}

  		var layer, candidateHoveredLayer;

  		for (var order = this._drawFirst; order; order = order.next) {
  			layer = order.layer;
  			if (layer.options.interactive && layer._containsPoint(point)) {
  				candidateHoveredLayer = layer;
  			}
  		}

  		if (candidateHoveredLayer !== this._hoveredLayer) {
  			this._handleMouseOut(e);

  			if (candidateHoveredLayer) {
  				addClass(this._container, 'leaflet-interactive'); // change cursor
  				this._fireEvent([candidateHoveredLayer], e, 'mouseover');
  				this._hoveredLayer = candidateHoveredLayer;
  			}
  		}

  		this._fireEvent(this._hoveredLayer ? [this._hoveredLayer] : false, e);

  		this._mouseHoverThrottled = true;
  		setTimeout(bind(function () {
  			this._mouseHoverThrottled = false;
  		}, this), 32);
  	},

  	_fireEvent: function (layers, e, type) {
  		this._map._fireDOMEvent(e, type || e.type, layers);
  	},

  	_bringToFront: function (layer) {
  		var order = layer._order;

  		if (!order) { return; }

  		var next = order.next;
  		var prev = order.prev;

  		if (next) {
  			next.prev = prev;
  		} else {
  			// Already last
  			return;
  		}
  		if (prev) {
  			prev.next = next;
  		} else if (next) {
  			// Update first entry unless this is the
  			// single entry
  			this._drawFirst = next;
  		}

  		order.prev = this._drawLast;
  		this._drawLast.next = order;

  		order.next = null;
  		this._drawLast = order;

  		this._requestRedraw(layer);
  	},

  	_bringToBack: function (layer) {
  		var order = layer._order;

  		if (!order) { return; }

  		var next = order.next;
  		var prev = order.prev;

  		if (prev) {
  			prev.next = next;
  		} else {
  			// Already first
  			return;
  		}
  		if (next) {
  			next.prev = prev;
  		} else if (prev) {
  			// Update last entry unless this is the
  			// single entry
  			this._drawLast = prev;
  		}

  		order.prev = null;

  		order.next = this._drawFirst;
  		this._drawFirst.prev = order;
  		this._drawFirst = order;

  		this._requestRedraw(layer);
  	}
  });

  // @factory L.canvas(options?: Renderer options)
  // Creates a Canvas renderer with the given options.
  function canvas(options) {
  	return Browser.canvas ? new Canvas(options) : null;
  }

  /*
   * Thanks to Dmitry Baranovsky and his Raphael library for inspiration!
   */


  var vmlCreate = (function () {
  	try {
  		document.namespaces.add('lvml', 'urn:schemas-microsoft-com:vml');
  		return function (name) {
  			return document.createElement('<lvml:' + name + ' class="lvml">');
  		};
  	} catch (e) {
  		// Do not return fn from catch block so `e` can be garbage collected
  		// See https://github.com/Leaflet/Leaflet/pull/7279
  	}
  	return function (name) {
  		return document.createElement('<' + name + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">');
  	};
  })();


  /*
   * @class SVG
   *
   *
   * VML was deprecated in 2012, which means VML functionality exists only for backwards compatibility
   * with old versions of Internet Explorer.
   */

  // mixin to redefine some SVG methods to handle VML syntax which is similar but with some differences
  var vmlMixin = {

  	_initContainer: function () {
  		this._container = create$1('div', 'leaflet-vml-container');
  	},

  	_update: function () {
  		if (this._map._animatingZoom) { return; }
  		Renderer.prototype._update.call(this);
  		this.fire('update');
  	},

  	_initPath: function (layer) {
  		var container = layer._container = vmlCreate('shape');

  		addClass(container, 'leaflet-vml-shape ' + (this.options.className || ''));

  		container.coordsize = '1 1';

  		layer._path = vmlCreate('path');
  		container.appendChild(layer._path);

  		this._updateStyle(layer);
  		this._layers[stamp(layer)] = layer;
  	},

  	_addPath: function (layer) {
  		var container = layer._container;
  		this._container.appendChild(container);

  		if (layer.options.interactive) {
  			layer.addInteractiveTarget(container);
  		}
  	},

  	_removePath: function (layer) {
  		var container = layer._container;
  		remove(container);
  		layer.removeInteractiveTarget(container);
  		delete this._layers[stamp(layer)];
  	},

  	_updateStyle: function (layer) {
  		var stroke = layer._stroke,
  		    fill = layer._fill,
  		    options = layer.options,
  		    container = layer._container;

  		container.stroked = !!options.stroke;
  		container.filled = !!options.fill;

  		if (options.stroke) {
  			if (!stroke) {
  				stroke = layer._stroke = vmlCreate('stroke');
  			}
  			container.appendChild(stroke);
  			stroke.weight = options.weight + 'px';
  			stroke.color = options.color;
  			stroke.opacity = options.opacity;

  			if (options.dashArray) {
  				stroke.dashStyle = isArray(options.dashArray) ?
  				    options.dashArray.join(' ') :
  				    options.dashArray.replace(/( *, *)/g, ' ');
  			} else {
  				stroke.dashStyle = '';
  			}
  			stroke.endcap = options.lineCap.replace('butt', 'flat');
  			stroke.joinstyle = options.lineJoin;

  		} else if (stroke) {
  			container.removeChild(stroke);
  			layer._stroke = null;
  		}

  		if (options.fill) {
  			if (!fill) {
  				fill = layer._fill = vmlCreate('fill');
  			}
  			container.appendChild(fill);
  			fill.color = options.fillColor || options.color;
  			fill.opacity = options.fillOpacity;

  		} else if (fill) {
  			container.removeChild(fill);
  			layer._fill = null;
  		}
  	},

  	_updateCircle: function (layer) {
  		var p = layer._point.round(),
  		    r = Math.round(layer._radius),
  		    r2 = Math.round(layer._radiusY || r);

  		this._setPath(layer, layer._empty() ? 'M0 0' :
  			'AL ' + p.x + ',' + p.y + ' ' + r + ',' + r2 + ' 0,' + (65535 * 360));
  	},

  	_setPath: function (layer, path) {
  		layer._path.v = path;
  	},

  	_bringToFront: function (layer) {
  		toFront(layer._container);
  	},

  	_bringToBack: function (layer) {
  		toBack(layer._container);
  	}
  };

  var create = Browser.vml ? vmlCreate : svgCreate;

  /*
   * @class SVG
   * @inherits Renderer
   * @aka L.SVG
   *
   * Allows vector layers to be displayed with [SVG](https://developer.mozilla.org/docs/Web/SVG).
   * Inherits `Renderer`.
   *
   * Due to [technical limitations](https://caniuse.com/svg), SVG is not
   * available in all web browsers, notably Android 2.x and 3.x.
   *
   * Although SVG is not available on IE7 and IE8, these browsers support
   * [VML](https://en.wikipedia.org/wiki/Vector_Markup_Language)
   * (a now deprecated technology), and the SVG renderer will fall back to VML in
   * this case.
   *
   * @example
   *
   * Use SVG by default for all paths in the map:
   *
   * ```js
   * var map = L.map('map', {
   * 	renderer: L.svg()
   * });
   * ```
   *
   * Use a SVG renderer with extra padding for specific vector geometries:
   *
   * ```js
   * var map = L.map('map');
   * var myRenderer = L.svg({ padding: 0.5 });
   * var line = L.polyline( coordinates, { renderer: myRenderer } );
   * var circle = L.circle( center, { renderer: myRenderer } );
   * ```
   */

  var SVG = Renderer.extend({

  	_initContainer: function () {
  		this._container = create('svg');

  		// makes it possible to click through svg root; we'll reset it back in individual paths
  		this._container.setAttribute('pointer-events', 'none');

  		this._rootGroup = create('g');
  		this._container.appendChild(this._rootGroup);
  	},

  	_destroyContainer: function () {
  		remove(this._container);
  		off(this._container);
  		delete this._container;
  		delete this._rootGroup;
  		delete this._svgSize;
  	},

  	_update: function () {
  		if (this._map._animatingZoom && this._bounds) { return; }

  		Renderer.prototype._update.call(this);

  		var b = this._bounds,
  		    size = b.getSize(),
  		    container = this._container;

  		// set size of svg-container if changed
  		if (!this._svgSize || !this._svgSize.equals(size)) {
  			this._svgSize = size;
  			container.setAttribute('width', size.x);
  			container.setAttribute('height', size.y);
  		}

  		// movement: update container viewBox so that we don't have to change coordinates of individual layers
  		setPosition(container, b.min);
  		container.setAttribute('viewBox', [b.min.x, b.min.y, size.x, size.y].join(' '));

  		this.fire('update');
  	},

  	// methods below are called by vector layers implementations

  	_initPath: function (layer) {
  		var path = layer._path = create('path');

  		// @namespace Path
  		// @option className: String = null
  		// Custom class name set on an element. Only for SVG renderer.
  		if (layer.options.className) {
  			addClass(path, layer.options.className);
  		}

  		if (layer.options.interactive) {
  			addClass(path, 'leaflet-interactive');
  		}

  		this._updateStyle(layer);
  		this._layers[stamp(layer)] = layer;
  	},

  	_addPath: function (layer) {
  		if (!this._rootGroup) { this._initContainer(); }
  		this._rootGroup.appendChild(layer._path);
  		layer.addInteractiveTarget(layer._path);
  	},

  	_removePath: function (layer) {
  		remove(layer._path);
  		layer.removeInteractiveTarget(layer._path);
  		delete this._layers[stamp(layer)];
  	},

  	_updatePath: function (layer) {
  		layer._project();
  		layer._update();
  	},

  	_updateStyle: function (layer) {
  		var path = layer._path,
  		    options = layer.options;

  		if (!path) { return; }

  		if (options.stroke) {
  			path.setAttribute('stroke', options.color);
  			path.setAttribute('stroke-opacity', options.opacity);
  			path.setAttribute('stroke-width', options.weight);
  			path.setAttribute('stroke-linecap', options.lineCap);
  			path.setAttribute('stroke-linejoin', options.lineJoin);

  			if (options.dashArray) {
  				path.setAttribute('stroke-dasharray', options.dashArray);
  			} else {
  				path.removeAttribute('stroke-dasharray');
  			}

  			if (options.dashOffset) {
  				path.setAttribute('stroke-dashoffset', options.dashOffset);
  			} else {
  				path.removeAttribute('stroke-dashoffset');
  			}
  		} else {
  			path.setAttribute('stroke', 'none');
  		}

  		if (options.fill) {
  			path.setAttribute('fill', options.fillColor || options.color);
  			path.setAttribute('fill-opacity', options.fillOpacity);
  			path.setAttribute('fill-rule', options.fillRule || 'evenodd');
  		} else {
  			path.setAttribute('fill', 'none');
  		}
  	},

  	_updatePoly: function (layer, closed) {
  		this._setPath(layer, pointsToPath(layer._parts, closed));
  	},

  	_updateCircle: function (layer) {
  		var p = layer._point,
  		    r = Math.max(Math.round(layer._radius), 1),
  		    r2 = Math.max(Math.round(layer._radiusY), 1) || r,
  		    arc = 'a' + r + ',' + r2 + ' 0 1,0 ';

  		// drawing a circle with two half-arcs
  		var d = layer._empty() ? 'M0 0' :
  			'M' + (p.x - r) + ',' + p.y +
  			arc + (r * 2) + ',0 ' +
  			arc + (-r * 2) + ',0 ';

  		this._setPath(layer, d);
  	},

  	_setPath: function (layer, path) {
  		layer._path.setAttribute('d', path);
  	},

  	// SVG does not have the concept of zIndex so we resort to changing the DOM order of elements
  	_bringToFront: function (layer) {
  		toFront(layer._path);
  	},

  	_bringToBack: function (layer) {
  		toBack(layer._path);
  	}
  });

  if (Browser.vml) {
  	SVG.include(vmlMixin);
  }

  // @namespace SVG
  // @factory L.svg(options?: Renderer options)
  // Creates a SVG renderer with the given options.
  function svg(options) {
  	return Browser.svg || Browser.vml ? new SVG(options) : null;
  }

  Map.include({
  	// @namespace Map; @method getRenderer(layer: Path): Renderer
  	// Returns the instance of `Renderer` that should be used to render the given
  	// `Path`. It will ensure that the `renderer` options of the map and paths
  	// are respected, and that the renderers do exist on the map.
  	getRenderer: function (layer) {
  		// @namespace Path; @option renderer: Renderer
  		// Use this specific instance of `Renderer` for this path. Takes
  		// precedence over the map's [default renderer](#map-renderer).
  		var renderer = layer.options.renderer || this._getPaneRenderer(layer.options.pane) || this.options.renderer || this._renderer;

  		if (!renderer) {
  			renderer = this._renderer = this._createRenderer();
  		}

  		if (!this.hasLayer(renderer)) {
  			this.addLayer(renderer);
  		}
  		return renderer;
  	},

  	_getPaneRenderer: function (name) {
  		if (name === 'overlayPane' || name === undefined) {
  			return false;
  		}

  		var renderer = this._paneRenderers[name];
  		if (renderer === undefined) {
  			renderer = this._createRenderer({pane: name});
  			this._paneRenderers[name] = renderer;
  		}
  		return renderer;
  	},

  	_createRenderer: function (options) {
  		// @namespace Map; @option preferCanvas: Boolean = false
  		// Whether `Path`s should be rendered on a `Canvas` renderer.
  		// By default, all `Path`s are rendered in a `SVG` renderer.
  		return (this.options.preferCanvas && canvas(options)) || svg(options);
  	}
  });

  /*
   * L.Rectangle extends Polygon and creates a rectangle when passed a LatLngBounds object.
   */

  /*
   * @class Rectangle
   * @aka L.Rectangle
   * @inherits Polygon
   *
   * A class for drawing rectangle overlays on a map. Extends `Polygon`.
   *
   * @example
   *
   * ```js
   * // define rectangle geographical bounds
   * var bounds = [[54.559322, -5.767822], [56.1210604, -3.021240]];
   *
   * // create an orange rectangle
   * L.rectangle(bounds, {color: "#ff7800", weight: 1}).addTo(map);
   *
   * // zoom the map to the rectangle bounds
   * map.fitBounds(bounds);
   * ```
   *
   */


  var Rectangle = Polygon.extend({
  	initialize: function (latLngBounds, options) {
  		Polygon.prototype.initialize.call(this, this._boundsToLatLngs(latLngBounds), options);
  	},

  	// @method setBounds(latLngBounds: LatLngBounds): this
  	// Redraws the rectangle with the passed bounds.
  	setBounds: function (latLngBounds) {
  		return this.setLatLngs(this._boundsToLatLngs(latLngBounds));
  	},

  	_boundsToLatLngs: function (latLngBounds) {
  		latLngBounds = toLatLngBounds(latLngBounds);
  		return [
  			latLngBounds.getSouthWest(),
  			latLngBounds.getNorthWest(),
  			latLngBounds.getNorthEast(),
  			latLngBounds.getSouthEast()
  		];
  	}
  });


  // @factory L.rectangle(latLngBounds: LatLngBounds, options?: Polyline options)
  function rectangle(latLngBounds, options) {
  	return new Rectangle(latLngBounds, options);
  }

  SVG.create = create;
  SVG.pointsToPath = pointsToPath;

  GeoJSON.geometryToLayer = geometryToLayer;
  GeoJSON.coordsToLatLng = coordsToLatLng;
  GeoJSON.coordsToLatLngs = coordsToLatLngs;
  GeoJSON.latLngToCoords = latLngToCoords;
  GeoJSON.latLngsToCoords = latLngsToCoords;
  GeoJSON.getFeature = getFeature;
  GeoJSON.asFeature = asFeature;

  /*
   * L.Handler.BoxZoom is used to add shift-drag zoom interaction to the map
   * (zoom to a selected bounding box), enabled by default.
   */

  // @namespace Map
  // @section Interaction Options
  Map.mergeOptions({
  	// @option boxZoom: Boolean = true
  	// Whether the map can be zoomed to a rectangular area specified by
  	// dragging the mouse while pressing the shift key.
  	boxZoom: true
  });

  var BoxZoom = Handler.extend({
  	initialize: function (map) {
  		this._map = map;
  		this._container = map._container;
  		this._pane = map._panes.overlayPane;
  		this._resetStateTimeout = 0;
  		map.on('unload', this._destroy, this);
  	},

  	addHooks: function () {
  		on(this._container, 'mousedown', this._onMouseDown, this);
  	},

  	removeHooks: function () {
  		off(this._container, 'mousedown', this._onMouseDown, this);
  	},

  	moved: function () {
  		return this._moved;
  	},

  	_destroy: function () {
  		remove(this._pane);
  		delete this._pane;
  	},

  	_resetState: function () {
  		this._resetStateTimeout = 0;
  		this._moved = false;
  	},

  	_clearDeferredResetState: function () {
  		if (this._resetStateTimeout !== 0) {
  			clearTimeout(this._resetStateTimeout);
  			this._resetStateTimeout = 0;
  		}
  	},

  	_onMouseDown: function (e) {
  		if (!e.shiftKey || ((e.which !== 1) && (e.button !== 1))) { return false; }

  		// Clear the deferred resetState if it hasn't executed yet, otherwise it
  		// will interrupt the interaction and orphan a box element in the container.
  		this._clearDeferredResetState();
  		this._resetState();

  		disableTextSelection();
  		disableImageDrag();

  		this._startPoint = this._map.mouseEventToContainerPoint(e);

  		on(document, {
  			contextmenu: stop,
  			mousemove: this._onMouseMove,
  			mouseup: this._onMouseUp,
  			keydown: this._onKeyDown
  		}, this);
  	},

  	_onMouseMove: function (e) {
  		if (!this._moved) {
  			this._moved = true;

  			this._box = create$1('div', 'leaflet-zoom-box', this._container);
  			addClass(this._container, 'leaflet-crosshair');

  			this._map.fire('boxzoomstart');
  		}

  		this._point = this._map.mouseEventToContainerPoint(e);

  		var bounds = new Bounds(this._point, this._startPoint),
  		    size = bounds.getSize();

  		setPosition(this._box, bounds.min);

  		this._box.style.width  = size.x + 'px';
  		this._box.style.height = size.y + 'px';
  	},

  	_finish: function () {
  		if (this._moved) {
  			remove(this._box);
  			removeClass(this._container, 'leaflet-crosshair');
  		}

  		enableTextSelection();
  		enableImageDrag();

  		off(document, {
  			contextmenu: stop,
  			mousemove: this._onMouseMove,
  			mouseup: this._onMouseUp,
  			keydown: this._onKeyDown
  		}, this);
  	},

  	_onMouseUp: function (e) {
  		if ((e.which !== 1) && (e.button !== 1)) { return; }

  		this._finish();

  		if (!this._moved) { return; }
  		// Postpone to next JS tick so internal click event handling
  		// still see it as "moved".
  		this._clearDeferredResetState();
  		this._resetStateTimeout = setTimeout(bind(this._resetState, this), 0);

  		var bounds = new LatLngBounds(
  		        this._map.containerPointToLatLng(this._startPoint),
  		        this._map.containerPointToLatLng(this._point));

  		this._map
  			.fitBounds(bounds)
  			.fire('boxzoomend', {boxZoomBounds: bounds});
  	},

  	_onKeyDown: function (e) {
  		if (e.keyCode === 27) {
  			this._finish();
  			this._clearDeferredResetState();
  			this._resetState();
  		}
  	}
  });

  // @section Handlers
  // @property boxZoom: Handler
  // Box (shift-drag with mouse) zoom handler.
  Map.addInitHook('addHandler', 'boxZoom', BoxZoom);

  /*
   * L.Handler.DoubleClickZoom is used to handle double-click zoom on the map, enabled by default.
   */

  // @namespace Map
  // @section Interaction Options

  Map.mergeOptions({
  	// @option doubleClickZoom: Boolean|String = true
  	// Whether the map can be zoomed in by double clicking on it and
  	// zoomed out by double clicking while holding shift. If passed
  	// `'center'`, double-click zoom will zoom to the center of the
  	//  view regardless of where the mouse was.
  	doubleClickZoom: true
  });

  var DoubleClickZoom = Handler.extend({
  	addHooks: function () {
  		this._map.on('dblclick', this._onDoubleClick, this);
  	},

  	removeHooks: function () {
  		this._map.off('dblclick', this._onDoubleClick, this);
  	},

  	_onDoubleClick: function (e) {
  		var map = this._map,
  		    oldZoom = map.getZoom(),
  		    delta = map.options.zoomDelta,
  		    zoom = e.originalEvent.shiftKey ? oldZoom - delta : oldZoom + delta;

  		if (map.options.doubleClickZoom === 'center') {
  			map.setZoom(zoom);
  		} else {
  			map.setZoomAround(e.containerPoint, zoom);
  		}
  	}
  });

  // @section Handlers
  //
  // Map properties include interaction handlers that allow you to control
  // interaction behavior in runtime, enabling or disabling certain features such
  // as dragging or touch zoom (see `Handler` methods). For example:
  //
  // ```js
  // map.doubleClickZoom.disable();
  // ```
  //
  // @property doubleClickZoom: Handler
  // Double click zoom handler.
  Map.addInitHook('addHandler', 'doubleClickZoom', DoubleClickZoom);

  /*
   * L.Handler.MapDrag is used to make the map draggable (with panning inertia), enabled by default.
   */

  // @namespace Map
  // @section Interaction Options
  Map.mergeOptions({
  	// @option dragging: Boolean = true
  	// Whether the map is draggable with mouse/touch or not.
  	dragging: true,

  	// @section Panning Inertia Options
  	// @option inertia: Boolean = *
  	// If enabled, panning of the map will have an inertia effect where
  	// the map builds momentum while dragging and continues moving in
  	// the same direction for some time. Feels especially nice on touch
  	// devices. Enabled by default.
  	inertia: true,

  	// @option inertiaDeceleration: Number = 3000
  	// The rate with which the inertial movement slows down, in pixels/second².
  	inertiaDeceleration: 3400, // px/s^2

  	// @option inertiaMaxSpeed: Number = Infinity
  	// Max speed of the inertial movement, in pixels/second.
  	inertiaMaxSpeed: Infinity, // px/s

  	// @option easeLinearity: Number = 0.2
  	easeLinearity: 0.2,

  	// TODO refactor, move to CRS
  	// @option worldCopyJump: Boolean = false
  	// With this option enabled, the map tracks when you pan to another "copy"
  	// of the world and seamlessly jumps to the original one so that all overlays
  	// like markers and vector layers are still visible.
  	worldCopyJump: false,

  	// @option maxBoundsViscosity: Number = 0.0
  	// If `maxBounds` is set, this option will control how solid the bounds
  	// are when dragging the map around. The default value of `0.0` allows the
  	// user to drag outside the bounds at normal speed, higher values will
  	// slow down map dragging outside bounds, and `1.0` makes the bounds fully
  	// solid, preventing the user from dragging outside the bounds.
  	maxBoundsViscosity: 0.0
  });

  var Drag = Handler.extend({
  	addHooks: function () {
  		if (!this._draggable) {
  			var map = this._map;

  			this._draggable = new Draggable(map._mapPane, map._container);

  			this._draggable.on({
  				dragstart: this._onDragStart,
  				drag: this._onDrag,
  				dragend: this._onDragEnd
  			}, this);

  			this._draggable.on('predrag', this._onPreDragLimit, this);
  			if (map.options.worldCopyJump) {
  				this._draggable.on('predrag', this._onPreDragWrap, this);
  				map.on('zoomend', this._onZoomEnd, this);

  				map.whenReady(this._onZoomEnd, this);
  			}
  		}
  		addClass(this._map._container, 'leaflet-grab leaflet-touch-drag');
  		this._draggable.enable();
  		this._positions = [];
  		this._times = [];
  	},

  	removeHooks: function () {
  		removeClass(this._map._container, 'leaflet-grab');
  		removeClass(this._map._container, 'leaflet-touch-drag');
  		this._draggable.disable();
  	},

  	moved: function () {
  		return this._draggable && this._draggable._moved;
  	},

  	moving: function () {
  		return this._draggable && this._draggable._moving;
  	},

  	_onDragStart: function () {
  		var map = this._map;

  		map._stop();
  		if (this._map.options.maxBounds && this._map.options.maxBoundsViscosity) {
  			var bounds = toLatLngBounds(this._map.options.maxBounds);

  			this._offsetLimit = toBounds(
  				this._map.latLngToContainerPoint(bounds.getNorthWest()).multiplyBy(-1),
  				this._map.latLngToContainerPoint(bounds.getSouthEast()).multiplyBy(-1)
  					.add(this._map.getSize()));

  			this._viscosity = Math.min(1.0, Math.max(0.0, this._map.options.maxBoundsViscosity));
  		} else {
  			this._offsetLimit = null;
  		}

  		map
  		    .fire('movestart')
  		    .fire('dragstart');

  		if (map.options.inertia) {
  			this._positions = [];
  			this._times = [];
  		}
  	},

  	_onDrag: function (e) {
  		if (this._map.options.inertia) {
  			var time = this._lastTime = +new Date(),
  			    pos = this._lastPos = this._draggable._absPos || this._draggable._newPos;

  			this._positions.push(pos);
  			this._times.push(time);

  			this._prunePositions(time);
  		}

  		this._map
  		    .fire('move', e)
  		    .fire('drag', e);
  	},

  	_prunePositions: function (time) {
  		while (this._positions.length > 1 && time - this._times[0] > 50) {
  			this._positions.shift();
  			this._times.shift();
  		}
  	},

  	_onZoomEnd: function () {
  		var pxCenter = this._map.getSize().divideBy(2),
  		    pxWorldCenter = this._map.latLngToLayerPoint([0, 0]);

  		this._initialWorldOffset = pxWorldCenter.subtract(pxCenter).x;
  		this._worldWidth = this._map.getPixelWorldBounds().getSize().x;
  	},

  	_viscousLimit: function (value, threshold) {
  		return value - (value - threshold) * this._viscosity;
  	},

  	_onPreDragLimit: function () {
  		if (!this._viscosity || !this._offsetLimit) { return; }

  		var offset = this._draggable._newPos.subtract(this._draggable._startPos);

  		var limit = this._offsetLimit;
  		if (offset.x < limit.min.x) { offset.x = this._viscousLimit(offset.x, limit.min.x); }
  		if (offset.y < limit.min.y) { offset.y = this._viscousLimit(offset.y, limit.min.y); }
  		if (offset.x > limit.max.x) { offset.x = this._viscousLimit(offset.x, limit.max.x); }
  		if (offset.y > limit.max.y) { offset.y = this._viscousLimit(offset.y, limit.max.y); }

  		this._draggable._newPos = this._draggable._startPos.add(offset);
  	},

  	_onPreDragWrap: function () {
  		// TODO refactor to be able to adjust map pane position after zoom
  		var worldWidth = this._worldWidth,
  		    halfWidth = Math.round(worldWidth / 2),
  		    dx = this._initialWorldOffset,
  		    x = this._draggable._newPos.x,
  		    newX1 = (x - halfWidth + dx) % worldWidth + halfWidth - dx,
  		    newX2 = (x + halfWidth + dx) % worldWidth - halfWidth - dx,
  		    newX = Math.abs(newX1 + dx) < Math.abs(newX2 + dx) ? newX1 : newX2;

  		this._draggable._absPos = this._draggable._newPos.clone();
  		this._draggable._newPos.x = newX;
  	},

  	_onDragEnd: function (e) {
  		var map = this._map,
  		    options = map.options,

  		    noInertia = !options.inertia || e.noInertia || this._times.length < 2;

  		map.fire('dragend', e);

  		if (noInertia) {
  			map.fire('moveend');

  		} else {
  			this._prunePositions(+new Date());

  			var direction = this._lastPos.subtract(this._positions[0]),
  			    duration = (this._lastTime - this._times[0]) / 1000,
  			    ease = options.easeLinearity,

  			    speedVector = direction.multiplyBy(ease / duration),
  			    speed = speedVector.distanceTo([0, 0]),

  			    limitedSpeed = Math.min(options.inertiaMaxSpeed, speed),
  			    limitedSpeedVector = speedVector.multiplyBy(limitedSpeed / speed),

  			    decelerationDuration = limitedSpeed / (options.inertiaDeceleration * ease),
  			    offset = limitedSpeedVector.multiplyBy(-decelerationDuration / 2).round();

  			if (!offset.x && !offset.y) {
  				map.fire('moveend');

  			} else {
  				offset = map._limitOffset(offset, map.options.maxBounds);

  				requestAnimFrame(function () {
  					map.panBy(offset, {
  						duration: decelerationDuration,
  						easeLinearity: ease,
  						noMoveStart: true,
  						animate: true
  					});
  				});
  			}
  		}
  	}
  });

  // @section Handlers
  // @property dragging: Handler
  // Map dragging handler (by both mouse and touch).
  Map.addInitHook('addHandler', 'dragging', Drag);

  /*
   * L.Map.Keyboard is handling keyboard interaction with the map, enabled by default.
   */

  // @namespace Map
  // @section Keyboard Navigation Options
  Map.mergeOptions({
  	// @option keyboard: Boolean = true
  	// Makes the map focusable and allows users to navigate the map with keyboard
  	// arrows and `+`/`-` keys.
  	keyboard: true,

  	// @option keyboardPanDelta: Number = 80
  	// Amount of pixels to pan when pressing an arrow key.
  	keyboardPanDelta: 80
  });

  var Keyboard = Handler.extend({

  	keyCodes: {
  		left:    [37],
  		right:   [39],
  		down:    [40],
  		up:      [38],
  		zoomIn:  [187, 107, 61, 171],
  		zoomOut: [189, 109, 54, 173]
  	},

  	initialize: function (map) {
  		this._map = map;

  		this._setPanDelta(map.options.keyboardPanDelta);
  		this._setZoomDelta(map.options.zoomDelta);
  	},

  	addHooks: function () {
  		var container = this._map._container;

  		// make the container focusable by tabbing
  		if (container.tabIndex <= 0) {
  			container.tabIndex = '0';
  		}

  		on(container, {
  			focus: this._onFocus,
  			blur: this._onBlur,
  			mousedown: this._onMouseDown
  		}, this);

  		this._map.on({
  			focus: this._addHooks,
  			blur: this._removeHooks
  		}, this);
  	},

  	removeHooks: function () {
  		this._removeHooks();

  		off(this._map._container, {
  			focus: this._onFocus,
  			blur: this._onBlur,
  			mousedown: this._onMouseDown
  		}, this);

  		this._map.off({
  			focus: this._addHooks,
  			blur: this._removeHooks
  		}, this);
  	},

  	_onMouseDown: function () {
  		if (this._focused) { return; }

  		var body = document.body,
  		    docEl = document.documentElement,
  		    top = body.scrollTop || docEl.scrollTop,
  		    left = body.scrollLeft || docEl.scrollLeft;

  		this._map._container.focus();

  		window.scrollTo(left, top);
  	},

  	_onFocus: function () {
  		this._focused = true;
  		this._map.fire('focus');
  	},

  	_onBlur: function () {
  		this._focused = false;
  		this._map.fire('blur');
  	},

  	_setPanDelta: function (panDelta) {
  		var keys = this._panKeys = {},
  		    codes = this.keyCodes,
  		    i, len;

  		for (i = 0, len = codes.left.length; i < len; i++) {
  			keys[codes.left[i]] = [-1 * panDelta, 0];
  		}
  		for (i = 0, len = codes.right.length; i < len; i++) {
  			keys[codes.right[i]] = [panDelta, 0];
  		}
  		for (i = 0, len = codes.down.length; i < len; i++) {
  			keys[codes.down[i]] = [0, panDelta];
  		}
  		for (i = 0, len = codes.up.length; i < len; i++) {
  			keys[codes.up[i]] = [0, -1 * panDelta];
  		}
  	},

  	_setZoomDelta: function (zoomDelta) {
  		var keys = this._zoomKeys = {},
  		    codes = this.keyCodes,
  		    i, len;

  		for (i = 0, len = codes.zoomIn.length; i < len; i++) {
  			keys[codes.zoomIn[i]] = zoomDelta;
  		}
  		for (i = 0, len = codes.zoomOut.length; i < len; i++) {
  			keys[codes.zoomOut[i]] = -zoomDelta;
  		}
  	},

  	_addHooks: function () {
  		on(document, 'keydown', this._onKeyDown, this);
  	},

  	_removeHooks: function () {
  		off(document, 'keydown', this._onKeyDown, this);
  	},

  	_onKeyDown: function (e) {
  		if (e.altKey || e.ctrlKey || e.metaKey) { return; }

  		var key = e.keyCode,
  		    map = this._map,
  		    offset;

  		if (key in this._panKeys) {
  			if (!map._panAnim || !map._panAnim._inProgress) {
  				offset = this._panKeys[key];
  				if (e.shiftKey) {
  					offset = toPoint(offset).multiplyBy(3);
  				}

  				if (map.options.maxBounds) {
  					offset = map._limitOffset(toPoint(offset), map.options.maxBounds);
  				}

  				if (map.options.worldCopyJump) {
  					var newLatLng = map.wrapLatLng(map.unproject(map.project(map.getCenter()).add(offset)));
  					map.panTo(newLatLng);
  				} else {
  					map.panBy(offset);
  				}
  			}
  		} else if (key in this._zoomKeys) {
  			map.setZoom(map.getZoom() + (e.shiftKey ? 3 : 1) * this._zoomKeys[key]);

  		} else if (key === 27 && map._popup && map._popup.options.closeOnEscapeKey) {
  			map.closePopup();

  		} else {
  			return;
  		}

  		stop(e);
  	}
  });

  // @section Handlers
  // @section Handlers
  // @property keyboard: Handler
  // Keyboard navigation handler.
  Map.addInitHook('addHandler', 'keyboard', Keyboard);

  /*
   * L.Handler.ScrollWheelZoom is used by L.Map to enable mouse scroll wheel zoom on the map.
   */

  // @namespace Map
  // @section Interaction Options
  Map.mergeOptions({
  	// @section Mouse wheel options
  	// @option scrollWheelZoom: Boolean|String = true
  	// Whether the map can be zoomed by using the mouse wheel. If passed `'center'`,
  	// it will zoom to the center of the view regardless of where the mouse was.
  	scrollWheelZoom: true,

  	// @option wheelDebounceTime: Number = 40
  	// Limits the rate at which a wheel can fire (in milliseconds). By default
  	// user can't zoom via wheel more often than once per 40 ms.
  	wheelDebounceTime: 40,

  	// @option wheelPxPerZoomLevel: Number = 60
  	// How many scroll pixels (as reported by [L.DomEvent.getWheelDelta](#domevent-getwheeldelta))
  	// mean a change of one full zoom level. Smaller values will make wheel-zooming
  	// faster (and vice versa).
  	wheelPxPerZoomLevel: 60
  });

  var ScrollWheelZoom = Handler.extend({
  	addHooks: function () {
  		on(this._map._container, 'wheel', this._onWheelScroll, this);

  		this._delta = 0;
  	},

  	removeHooks: function () {
  		off(this._map._container, 'wheel', this._onWheelScroll, this);
  	},

  	_onWheelScroll: function (e) {
  		var delta = getWheelDelta(e);

  		var debounce = this._map.options.wheelDebounceTime;

  		this._delta += delta;
  		this._lastMousePos = this._map.mouseEventToContainerPoint(e);

  		if (!this._startTime) {
  			this._startTime = +new Date();
  		}

  		var left = Math.max(debounce - (+new Date() - this._startTime), 0);

  		clearTimeout(this._timer);
  		this._timer = setTimeout(bind(this._performZoom, this), left);

  		stop(e);
  	},

  	_performZoom: function () {
  		var map = this._map,
  		    zoom = map.getZoom(),
  		    snap = this._map.options.zoomSnap || 0;

  		map._stop(); // stop panning and fly animations if any

  		// map the delta with a sigmoid function to -4..4 range leaning on -1..1
  		var d2 = this._delta / (this._map.options.wheelPxPerZoomLevel * 4),
  		    d3 = 4 * Math.log(2 / (1 + Math.exp(-Math.abs(d2)))) / Math.LN2,
  		    d4 = snap ? Math.ceil(d3 / snap) * snap : d3,
  		    delta = map._limitZoom(zoom + (this._delta > 0 ? d4 : -d4)) - zoom;

  		this._delta = 0;
  		this._startTime = null;

  		if (!delta) { return; }

  		if (map.options.scrollWheelZoom === 'center') {
  			map.setZoom(zoom + delta);
  		} else {
  			map.setZoomAround(this._lastMousePos, zoom + delta);
  		}
  	}
  });

  // @section Handlers
  // @property scrollWheelZoom: Handler
  // Scroll wheel zoom handler.
  Map.addInitHook('addHandler', 'scrollWheelZoom', ScrollWheelZoom);

  /*
   * L.Map.TapHold is used to simulate `contextmenu` event on long hold,
   * which otherwise is not fired by mobile Safari.
   */

  var tapHoldDelay = 600;

  // @namespace Map
  // @section Interaction Options
  Map.mergeOptions({
  	// @section Touch interaction options
  	// @option tapHold: Boolean
  	// Enables simulation of `contextmenu` event, default is `true` for mobile Safari.
  	tapHold: Browser.touchNative && Browser.safari && Browser.mobile,

  	// @option tapTolerance: Number = 15
  	// The max number of pixels a user can shift his finger during touch
  	// for it to be considered a valid tap.
  	tapTolerance: 15
  });

  var TapHold = Handler.extend({
  	addHooks: function () {
  		on(this._map._container, 'touchstart', this._onDown, this);
  	},

  	removeHooks: function () {
  		off(this._map._container, 'touchstart', this._onDown, this);
  	},

  	_onDown: function (e) {
  		clearTimeout(this._holdTimeout);
  		if (e.touches.length !== 1) { return; }

  		var first = e.touches[0];
  		this._startPos = this._newPos = new Point(first.clientX, first.clientY);

  		this._holdTimeout = setTimeout(bind(function () {
  			this._cancel();
  			if (!this._isTapValid()) { return; }

  			// prevent simulated mouse events https://w3c.github.io/touch-events/#mouse-events
  			on(document, 'touchend', preventDefault);
  			on(document, 'touchend touchcancel', this._cancelClickPrevent);
  			this._simulateEvent('contextmenu', first);
  		}, this), tapHoldDelay);

  		on(document, 'touchend touchcancel contextmenu', this._cancel, this);
  		on(document, 'touchmove', this._onMove, this);
  	},

  	_cancelClickPrevent: function cancelClickPrevent() {
  		off(document, 'touchend', preventDefault);
  		off(document, 'touchend touchcancel', cancelClickPrevent);
  	},

  	_cancel: function () {
  		clearTimeout(this._holdTimeout);
  		off(document, 'touchend touchcancel contextmenu', this._cancel, this);
  		off(document, 'touchmove', this._onMove, this);
  	},

  	_onMove: function (e) {
  		var first = e.touches[0];
  		this._newPos = new Point(first.clientX, first.clientY);
  	},

  	_isTapValid: function () {
  		return this._newPos.distanceTo(this._startPos) <= this._map.options.tapTolerance;
  	},

  	_simulateEvent: function (type, e) {
  		var simulatedEvent = new MouseEvent(type, {
  			bubbles: true,
  			cancelable: true,
  			view: window,
  			// detail: 1,
  			screenX: e.screenX,
  			screenY: e.screenY,
  			clientX: e.clientX,
  			clientY: e.clientY,
  			// button: 2,
  			// buttons: 2
  		});

  		simulatedEvent._simulated = true;

  		e.target.dispatchEvent(simulatedEvent);
  	}
  });

  // @section Handlers
  // @property tapHold: Handler
  // Long tap handler to simulate `contextmenu` event (useful in mobile Safari).
  Map.addInitHook('addHandler', 'tapHold', TapHold);

  /*
   * L.Handler.TouchZoom is used by L.Map to add pinch zoom on supported mobile browsers.
   */

  // @namespace Map
  // @section Interaction Options
  Map.mergeOptions({
  	// @section Touch interaction options
  	// @option touchZoom: Boolean|String = *
  	// Whether the map can be zoomed by touch-dragging with two fingers. If
  	// passed `'center'`, it will zoom to the center of the view regardless of
  	// where the touch events (fingers) were. Enabled for touch-capable web
  	// browsers.
  	touchZoom: Browser.touch,

  	// @option bounceAtZoomLimits: Boolean = true
  	// Set it to false if you don't want the map to zoom beyond min/max zoom
  	// and then bounce back when pinch-zooming.
  	bounceAtZoomLimits: true
  });

  var TouchZoom = Handler.extend({
  	addHooks: function () {
  		addClass(this._map._container, 'leaflet-touch-zoom');
  		on(this._map._container, 'touchstart', this._onTouchStart, this);
  	},

  	removeHooks: function () {
  		removeClass(this._map._container, 'leaflet-touch-zoom');
  		off(this._map._container, 'touchstart', this._onTouchStart, this);
  	},

  	_onTouchStart: function (e) {
  		var map = this._map;
  		if (!e.touches || e.touches.length !== 2 || map._animatingZoom || this._zooming) { return; }

  		var p1 = map.mouseEventToContainerPoint(e.touches[0]),
  		    p2 = map.mouseEventToContainerPoint(e.touches[1]);

  		this._centerPoint = map.getSize()._divideBy(2);
  		this._startLatLng = map.containerPointToLatLng(this._centerPoint);
  		if (map.options.touchZoom !== 'center') {
  			this._pinchStartLatLng = map.containerPointToLatLng(p1.add(p2)._divideBy(2));
  		}

  		this._startDist = p1.distanceTo(p2);
  		this._startZoom = map.getZoom();

  		this._moved = false;
  		this._zooming = true;

  		map._stop();

  		on(document, 'touchmove', this._onTouchMove, this);
  		on(document, 'touchend touchcancel', this._onTouchEnd, this);

  		preventDefault(e);
  	},

  	_onTouchMove: function (e) {
  		if (!e.touches || e.touches.length !== 2 || !this._zooming) { return; }

  		var map = this._map,
  		    p1 = map.mouseEventToContainerPoint(e.touches[0]),
  		    p2 = map.mouseEventToContainerPoint(e.touches[1]),
  		    scale = p1.distanceTo(p2) / this._startDist;

  		this._zoom = map.getScaleZoom(scale, this._startZoom);

  		if (!map.options.bounceAtZoomLimits && (
  			(this._zoom < map.getMinZoom() && scale < 1) ||
  			(this._zoom > map.getMaxZoom() && scale > 1))) {
  			this._zoom = map._limitZoom(this._zoom);
  		}

  		if (map.options.touchZoom === 'center') {
  			this._center = this._startLatLng;
  			if (scale === 1) { return; }
  		} else {
  			// Get delta from pinch to center, so centerLatLng is delta applied to initial pinchLatLng
  			var delta = p1._add(p2)._divideBy(2)._subtract(this._centerPoint);
  			if (scale === 1 && delta.x === 0 && delta.y === 0) { return; }
  			this._center = map.unproject(map.project(this._pinchStartLatLng, this._zoom).subtract(delta), this._zoom);
  		}

  		if (!this._moved) {
  			map._moveStart(true, false);
  			this._moved = true;
  		}

  		cancelAnimFrame(this._animRequest);

  		var moveFn = bind(map._move, map, this._center, this._zoom, {pinch: true, round: false}, undefined);
  		this._animRequest = requestAnimFrame(moveFn, this, true);

  		preventDefault(e);
  	},

  	_onTouchEnd: function () {
  		if (!this._moved || !this._zooming) {
  			this._zooming = false;
  			return;
  		}

  		this._zooming = false;
  		cancelAnimFrame(this._animRequest);

  		off(document, 'touchmove', this._onTouchMove, this);
  		off(document, 'touchend touchcancel', this._onTouchEnd, this);

  		// Pinch updates GridLayers' levels only when zoomSnap is off, so zoomSnap becomes noUpdate.
  		if (this._map.options.zoomAnimation) {
  			this._map._animateZoom(this._center, this._map._limitZoom(this._zoom), true, this._map.options.zoomSnap);
  		} else {
  			this._map._resetView(this._center, this._map._limitZoom(this._zoom));
  		}
  	}
  });

  // @section Handlers
  // @property touchZoom: Handler
  // Touch zoom handler.
  Map.addInitHook('addHandler', 'touchZoom', TouchZoom);

  Map.BoxZoom = BoxZoom;
  Map.DoubleClickZoom = DoubleClickZoom;
  Map.Drag = Drag;
  Map.Keyboard = Keyboard;
  Map.ScrollWheelZoom = ScrollWheelZoom;
  Map.TapHold = TapHold;
  Map.TouchZoom = TouchZoom;

  exports.Bounds = Bounds;
  exports.Browser = Browser;
  exports.CRS = CRS;
  exports.Canvas = Canvas;
  exports.Circle = Circle;
  exports.CircleMarker = CircleMarker;
  exports.Class = Class;
  exports.Control = Control;
  exports.DivIcon = DivIcon;
  exports.DivOverlay = DivOverlay;
  exports.DomEvent = DomEvent;
  exports.DomUtil = DomUtil;
  exports.Draggable = Draggable;
  exports.Evented = Evented;
  exports.FeatureGroup = FeatureGroup;
  exports.GeoJSON = GeoJSON;
  exports.GridLayer = GridLayer;
  exports.Handler = Handler;
  exports.Icon = Icon;
  exports.ImageOverlay = ImageOverlay;
  exports.LatLng = LatLng;
  exports.LatLngBounds = LatLngBounds;
  exports.Layer = Layer;
  exports.LayerGroup = LayerGroup;
  exports.LineUtil = LineUtil;
  exports.Map = Map;
  exports.Marker = Marker;
  exports.Mixin = Mixin;
  exports.Path = Path;
  exports.Point = Point;
  exports.PolyUtil = PolyUtil;
  exports.Polygon = Polygon;
  exports.Polyline = Polyline;
  exports.Popup = Popup;
  exports.PosAnimation = PosAnimation;
  exports.Projection = index;
  exports.Rectangle = Rectangle;
  exports.Renderer = Renderer;
  exports.SVG = SVG;
  exports.SVGOverlay = SVGOverlay;
  exports.TileLayer = TileLayer;
  exports.Tooltip = Tooltip;
  exports.Transformation = Transformation;
  exports.Util = Util;
  exports.VideoOverlay = VideoOverlay;
  exports.bind = bind;
  exports.bounds = toBounds;
  exports.canvas = canvas;
  exports.circle = circle;
  exports.circleMarker = circleMarker;
  exports.control = control;
  exports.divIcon = divIcon;
  exports.extend = extend;
  exports.featureGroup = featureGroup;
  exports.geoJSON = geoJSON;
  exports.geoJson = geoJson;
  exports.gridLayer = gridLayer;
  exports.icon = icon;
  exports.imageOverlay = imageOverlay;
  exports.latLng = toLatLng;
  exports.latLngBounds = toLatLngBounds;
  exports.layerGroup = layerGroup;
  exports.map = createMap;
  exports.marker = marker;
  exports.point = toPoint;
  exports.polygon = polygon;
  exports.polyline = polyline;
  exports.popup = popup;
  exports.rectangle = rectangle;
  exports.setOptions = setOptions;
  exports.stamp = stamp;
  exports.svg = svg;
  exports.svgOverlay = svgOverlay;
  exports.tileLayer = tileLayer;
  exports.tooltip = tooltip;
  exports.transformation = toTransformation;
  exports.version = version;
  exports.videoOverlay = videoOverlay;

  var oldL = window.L;
  exports.noConflict = function() {
  	window.L = oldL;
  	return this;
  }
  // Always export us to window global (see #2364)
  window.L = exports;

}));
//# sourceMappingURL=leaflet-src.js.map


/***/ }),

/***/ "./src/france.json":
/*!*************************!*\
  !*** ./src/france.json ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[1.9221462784913,48.457599361977],[1.9207376717625,48.447750046159],[1.9065549813045,48.445672344539],[1.9064076592587,48.440146719021],[1.8774887068591,48.440613561663],[1.8448630603718,48.449360706547],[1.8363839553347,48.466477806902],[1.8014512893542,48.466086215218],[1.7963309289573,48.484187938277],[1.7857092863217,48.489936911612],[1.7906352036641,48.497377315443],[1.7786170432038,48.508131705459],[1.7757543018107,48.527702827198],[1.7872423006556,48.553746336139],[1.7674104287362,48.559405546059],[1.765322855183,48.569374568412],[1.7458629248393,48.576137031624],[1.7368302606076,48.572280930629],[1.7092486767776,48.578026100992],[1.701983609829,48.584999462088],[1.7178604312421,48.606851120102],[1.7148984609516,48.614392276576],[1.689422105099,48.611536250362],[1.6793591385148,48.618488989615],[1.6662229993646,48.613704063337],[1.656339110342,48.622053121145],[1.6582325680054,48.627645882726],[1.6495606586096,48.63227092599],[1.6515719070139,48.638125076138],[1.64099001993,48.643389970225],[1.6431906740267,48.651291198129],[1.6298476379809,48.648875085504],[1.6156160327829,48.652789464959],[1.6024917313048,48.663765432374],[1.6058633277913,48.678762670696],[1.611774872468,48.689473861848],[1.5823151457709,48.696368116243],[1.5795403954022,48.701811808781],[1.5948810579854,48.709310708948],[1.5895382120501,48.712468154974],[1.617804540369,48.735942039093],[1.6264035004424,48.748091646614],[1.6026875153092,48.760486506237],[1.5849045861802,48.763296867942],[1.5875973267999,48.77360593191],[1.5803992974877,48.777559499888],[1.5756742997058,48.790504096814],[1.5834240899801,48.807168828475],[1.5912058811372,48.814866973865],[1.5837280523171,48.832130726577],[1.5941817842602,48.834218536506],[1.5951919881928,48.839707334891],[1.5772727483959,48.844358116549],[1.5815974879282,48.854999853184],[1.5780393102494,48.860864409827],[1.5666395741734,48.866183647932],[1.5552126063723,48.865075717505],[1.5462328761118,48.872431616391],[1.5595079054893,48.882055273516],[1.5572530066459,48.891575743208],[1.5385235335514,48.906685854091],[1.5417973746939,48.91547990669],[1.5386177797921,48.921794692396],[1.5241021875366,48.924752145617],[1.5128954188837,48.922585369837],[1.5090139983632,48.936627464834],[1.5015266013113,48.941051842112],[1.5010590902862,48.952678048634],[1.4966058957223,48.969344788938],[1.5155485568584,48.976406187821],[1.5079088220123,48.98376724437],[1.497416022081,48.979551284823],[1.4770931932159,48.978791319268],[1.4706099672547,48.975306435494],[1.4609202371105,48.986433838647],[1.4787512905862,48.998884682872],[1.4721822976397,49.018490972378],[1.4577570076778,49.026294572016],[1.4579533584639,49.03483279821],[1.4474286969633,49.04518889808],[1.4472851104304,49.053509472828],[1.4608012364168,49.062739598254],[1.4848766880401,49.0515451317],[1.5032944474047,49.059098256736],[1.5116006058281,49.074136193201],[1.5217716034178,49.068546693163],[1.5494725491086,49.072557881924],[1.5570743762242,49.069620586462],[1.5747375500157,49.078437534581],[1.6044866350314,49.08303659502],[1.608798807603,49.077894185227],[1.6233233619235,49.086078404348],[1.6175344667245,49.093996514155],[1.6470910019222,49.124713530921],[1.655781502711,49.130164014177],[1.6539225302112,49.145440634177],[1.6643792614171,49.153368483471],[1.6670168601861,49.178613559023],[1.6769552220057,49.202542812736],[1.6757423007191,49.21186711807],[1.7040643483737,49.229320472612],[1.7043588288241,49.232197221792],[1.729662120604,49.22919730317],[1.7341091784733,49.221277890399],[1.7336823766846,49.210958623685],[1.7230394537953,49.20967924589],[1.7155761288215,49.203118037941],[1.7258249045161,49.195712707137],[1.7374357068856,49.194603115202],[1.7421415990654,49.180151725276],[1.7551705903258,49.174545969477],[1.7775554860529,49.184104883007],[1.7909791787819,49.179854330047],[1.7954740881562,49.18526277584],[1.8143979645085,49.176162362964],[1.8265758315348,49.179516758866],[1.8370818782543,49.171698986367],[1.8455433838221,49.169896687357],[1.877042152092,49.171448857663],[1.8852348791181,49.162636028533],[1.894536229716,49.166040538631],[1.931476176782,49.17416772145],[1.9480171420872,49.170749195544],[1.9607171629873,49.173517298241],[1.9734431640564,49.18389441504],[1.996823915181,49.176453415327],[2.0045021739488,49.177609556506],[2.0217858750717,49.188671770161],[2.0380917348167,49.192136044555],[2.066842351201,49.202860855132],[2.0808850919985,49.209773929407],[2.0915398506152,49.204360444701],[2.0968798927064,49.189757147704],[2.1133369040576,49.186543761789],[2.1327402600127,49.191379169415],[2.1645707336419,49.179671393215],[2.157743439339,49.172599185593],[2.1642743368285,49.166004802028],[2.1819527991076,49.173675958457],[2.204958905762,49.174316445929],[2.2186458815721,49.180685270888],[2.2354095182703,49.167035850124],[2.2163546658105,49.154378017348],[2.2230049777895,49.151869445673],[2.2524813607229,49.152881479913],[2.2622091200851,49.158297463054],[2.2695453788487,49.156306628677],[2.2862682227562,49.160277559835],[2.2888064839605,49.170710377425],[2.2994229533516,49.17583535835],[2.3011998615285,49.183887047533],[2.3109304401404,49.186404768181],[2.3222626753655,49.180859736345],[2.3462625342946,49.161815854345],[2.3592998527471,49.147343950086],[2.370937678429,49.159173609651],[2.383003341928,49.155913004846],[2.3912847262891,49.1493504084],[2.4153544805398,49.151762413963],[2.4409039786288,49.14580411257],[2.4354018020913,49.133939040206],[2.4615068862157,49.135936921998],[2.4817070713716,49.126919463544],[2.4992321189629,49.122269747269],[2.5020961933805,49.118887475459],[2.4899295573932,49.106359373937],[2.5310585957685,49.099597191318],[2.5329944482474,49.119245162084],[2.5408087122315,49.122242313794],[2.5561550654469,49.118627938332],[2.5520149054273,49.113947081753],[2.5581755098966,49.098381756011],[2.5786858654184,49.091952842127],[2.5833038141204,49.080706309944],[2.5905283926735,49.079653961607],[2.6072121818235,49.089061593648],[2.6103345312027,49.09494039704],[2.6205306041593,49.095141144665],[2.6332770991263,49.108372635105],[2.6676934960697,49.092495236068],[2.6848013380994,49.081070149491],[2.6921954156417,49.072098782916],[2.6909952426863,49.066575827238],[2.7061794650059,49.06530744517],[2.7204862280103,49.074886920193],[2.7324165014354,49.069856383944],[2.7350099332564,49.060452516659],[2.7604244593128,49.06296236294],[2.787073783912,49.07527418833],[2.7918697099795,49.090226188638],[2.8090528505052,49.097537605404],[2.8198502647929,49.087367188293],[2.8360889289489,49.082987383853],[2.8451483788669,49.084656494049],[2.8557424844029,49.070260111043],[2.8662678657136,49.070693981918],[2.8830747436616,49.076071279686],[2.8949485303642,49.077063202013],[2.9015078822282,49.085373143453],[2.9174506912143,49.079815930085],[2.9445842533756,49.081604590578],[2.9704735929189,49.088974001698],[2.9747449093505,49.074788481937],[2.9879964190903,49.072371853401],[2.9912365557999,49.084010529465],[3.0085155423352,49.091506561321],[3.0295246754031,49.085932257529],[3.0327819280137,49.089067566229],[3.0483557770377,49.08631637936],[3.0573553400185,49.093990044235],[3.0563165652026,49.101913557338],[3.0718801833502,49.11755332218],[3.0824299640326,49.112379413059],[3.1019450875262,49.108665530931],[3.1288977237115,49.106712873662],[3.1495286898189,49.100548046274],[3.1652303376546,49.099653555336],[3.1568687392365,49.086717381412],[3.1586170058803,49.080495794822],[3.1686703252618,49.076194127358],[3.1818447950388,49.062073630984],[3.1821650688322,49.052356876125],[3.1902026447151,49.046494471584],[3.181201109614,49.042312878135],[3.1765330296567,49.030276306398],[3.1610292917102,49.024224133711],[3.17167852308,49.014125889695],[3.1836516708558,49.011250532749],[3.2071647717724,49.000687121653],[3.209314063913,48.993783774365],[3.2291741613167,48.988415153607],[3.2312127851282,48.976752849115],[3.2441973984858,48.976835025435],[3.2518324140274,48.972363565032],[3.2571425774493,48.95706258101],[3.2678473977393,48.938330226813],[3.2845265117579,48.940530948472],[3.3047535824542,48.948766966256],[3.3128748032908,48.933619620679],[3.3130772332366,48.921215462331],[3.3302940034825,48.908707002968],[3.3441215555428,48.915424399696],[3.3535717935992,48.915243105496],[3.3663458595763,48.922834212302],[3.3722055688435,48.921684863018],[3.3755045418202,48.907223979388],[3.3690076856012,48.893887842681],[3.3828118491401,48.888743663179],[3.3804785922907,48.874760520568],[3.3897420595655,48.871208088242],[3.4058488876005,48.875883179755],[3.4032208419263,48.864690111949],[3.4209735309142,48.863949992871],[3.4522351731222,48.856295042236],[3.4453621334286,48.843227318178],[3.4619058634763,48.837795469902],[3.4704665824993,48.850999590899],[3.4851833721947,48.851910309574],[3.4895742506519,48.839868156733],[3.4849684486637,48.825009748881],[3.4872017702391,48.815190371551],[3.4809287140503,48.81218578416],[3.4703815627087,48.8208976637],[3.4544121814945,48.813840024336],[3.4321664968613,48.812257770946],[3.4166176467147,48.817828781451],[3.4041649646308,48.80927626878],[3.4104778884203,48.803943061752],[3.4412895824977,48.800919300185],[3.442160723333,48.784353883555],[3.4282111529646,48.77948500421],[3.4094228096892,48.783835572028],[3.4008409030783,48.767256400859],[3.398657955437,48.755599281994],[3.4129613380945,48.753902050854],[3.4256695187547,48.755689536249],[3.4358103469779,48.753571711386],[3.440606129229,48.738701946832],[3.4674670222781,48.735224220894],[3.4643082791983,48.707378088042],[3.4769690535178,48.699355347111],[3.4658318000834,48.68619250912],[3.4545564374114,48.682119139778],[3.442691260176,48.672503410154],[3.4408489379625,48.66307286353],[3.4604317354595,48.653009078358],[3.4531162175594,48.633955984329],[3.4765733783329,48.637329365265],[3.4881941587649,48.644795887875],[3.5031842529874,48.645682506087],[3.517498400146,48.643365240313],[3.5190643678345,48.633470112339],[3.54590310832,48.62806547987],[3.555613758785,48.620285576065],[3.5346181421224,48.61035282902],[3.5038548704771,48.604807329745],[3.5158639136582,48.589782150903],[3.4975057114927,48.589954752513],[3.4852747034173,48.580426868353],[3.4733827141903,48.576873863934],[3.4655215727904,48.570484758136],[3.4722961348839,48.564913176785],[3.4797700428722,48.550623337178],[3.4796007670225,48.544709319952],[3.4591848626137,48.530740265696],[3.4382278519026,48.52833381057],[3.4234477695307,48.533559074894],[3.4142391071512,48.533468273095],[3.4053967325678,48.528014902933],[3.4239142947726,48.514360214193],[3.4346387383078,48.490251682592],[3.4203545971629,48.491547248944],[3.3883584814447,48.480409204068],[3.3964392758484,48.463728690957],[3.4064837519344,48.45245201333],[3.40356672054,48.438738834692],[3.3969885214937,48.434567766893],[3.3919585015834,48.424317659764],[3.4118359218741,48.421315638566],[3.4136232739227,48.414339744235],[3.4220792964886,48.413341016525],[3.4147888224632,48.390268550005],[3.4020328168494,48.389706108674],[3.3833174045242,48.39970411104],[3.3672130286667,48.394317453742],[3.3627847824483,48.382576787133],[3.3651606301927,48.372282482296],[3.3301099431753,48.372120787109],[3.3093216217612,48.376980286994],[3.3051586355523,48.372876819681],[3.2823921646024,48.377519839785],[3.2647767822592,48.374621237382],[3.254386262298,48.36502005161],[3.2328491246009,48.370332895515],[3.2018505500023,48.364015470529],[3.184946555144,48.368130335436],[3.1796714598679,48.375720974057],[3.1677335139977,48.371858146235],[3.1398647131279,48.372599662445],[3.1182555596676,48.366787852825],[3.1034153439925,48.349510589018],[3.0878411046476,48.358744110403],[3.0605482162395,48.357442256262],[3.0495229427782,48.360116755131],[3.0374902381586,48.343151149375],[3.0365741164856,48.326028248436],[3.0158983096866,48.307897241414],[3.0272557445779,48.300368070976],[3.0204148507047,48.293439730003],[3.0297705668286,48.285841287403],[3.0249639004196,48.27600913901],[3.0436326434308,48.272020556142],[3.047565503762,48.249696163103],[3.0314619630164,48.248879164003],[3.0185660113854,48.235192866522],[3.0189243879447,48.231774581507],[3.0051596957479,48.207665501246],[2.9889655342085,48.209014778073],[2.9744704228122,48.205550154363],[2.9695465243882,48.193835497978],[2.9507427471906,48.190202971569],[2.9347445709406,48.178820824383],[2.9363157566366,48.163391744884],[2.8680328112418,48.156437148324],[2.8590064128033,48.147350198136],[2.8411949308256,48.137851473794],[2.8252530440464,48.133557427837],[2.8208840113898,48.129664483454],[2.800901925208,48.133251589253],[2.7986329461926,48.150165448323],[2.8099458960087,48.161299706681],[2.7989459318842,48.168273053171],[2.7801683123181,48.167546718776],[2.7686108994112,48.163611325806],[2.7462653547317,48.163802955575],[2.7414632024764,48.159773038474],[2.7535738017345,48.15321134405],[2.7551942761197,48.145652570311],[2.7291489796899,48.139089867843],[2.706543037587,48.124819235783],[2.6722231385896,48.124202437622],[2.6634137701321,48.122204261229],[2.6463713950461,48.136008390021],[2.6397379446435,48.138858805822],[2.6026896280919,48.131484417095],[2.5775724874953,48.132078323329],[2.570559954027,48.140815681604],[2.5381145999136,48.140650823762],[2.5215119811805,48.127298388836],[2.4903125823631,48.126606179474],[2.4648664700171,48.129109351924],[2.4510870610062,48.123458807719],[2.4442532323658,48.131467936811],[2.4560832798883,48.13581808329],[2.4783726996912,48.156743847],[2.4832322969696,48.164516406945],[2.5063243383023,48.156437563961],[2.5168430223759,48.166807571121],[2.5097551291606,48.177877699501],[2.5129645377339,48.192979126229],[2.5229439829919,48.200517077101],[2.5141133764865,48.214377652405],[2.5061863934974,48.238532108957],[2.4866525872998,48.240104494021],[2.4690928288345,48.255276432625],[2.4501643446939,48.250036886561],[2.4319323869166,48.255142430662],[2.4237621901031,48.260296420297],[2.4178314142956,48.278395078542],[2.4231698173532,48.289315551296],[2.4207604700518,48.299253278858],[2.4048123966273,48.314593139765],[2.4026629385658,48.320717653248],[2.3968534009104,48.314755298076],[2.3698159145392,48.308674310979],[2.3401550939779,48.320230117587],[2.3276948002521,48.333053330653],[2.312593571187,48.330803657009],[2.2954192911964,48.30822244035],[2.2668923386489,48.314682212687],[2.2535700132149,48.300243238173],[2.2451518848313,48.298393903395],[2.2494360700816,48.314580917036],[2.2380428382036,48.316370632568],[2.2463103911083,48.329962148865],[2.2295923211201,48.329229232055],[2.2239137900476,48.336416239958],[2.2022520441218,48.344598562828],[2.1982097691131,48.337062877906],[2.185025102223,48.32642865382],[2.1813553737363,48.313746373001],[2.1690253806915,48.312695907539],[2.1543896262247,48.315910610694],[2.1557084788588,48.304493813388],[2.1637483268763,48.298436908006],[2.1361199958338,48.299247999325],[2.1105944678389,48.29694441258],[2.1137168991141,48.307245161467],[2.1061680366894,48.307635584746],[2.0815050149817,48.293603520661],[2.0527138226636,48.295470353999],[2.0493770399482,48.289753273514],[2.0228447716486,48.288080340461],[2.007237571012,48.284688606385],[1.9940901445311,48.286584124472],[1.9752915866555,48.287202034779],[1.9666102219583,48.295582043441],[1.959225976988,48.308685064463],[1.9694413393402,48.314231718094],[1.9744919508382,48.323163720082],[1.9823432207772,48.328312555088],[1.9749473035511,48.335258065972],[1.9733953665973,48.352974683353],[1.9868237281778,48.362141015776],[1.9763108383484,48.380270715947],[1.966381938603,48.38158815854],[1.9765710225943,48.399385315775],[1.9619541453882,48.404321075988],[1.9427703207411,48.405651458209],[1.9305611178719,48.404126689728],[1.925889401548,48.412741750651],[1.9378068315128,48.426390003183],[1.9428970138616,48.441083787001],[1.9331248410711,48.442264032481],[1.9304234130097,48.453403326926],[1.9221462784913,48.457599361977]]]},"properties":{"code":"11","nom":"Île-de-France"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[0.8148247207739,48.670163564137],[0.82767132893029,48.680720042791],[0.85036287028898,48.682948048025],[0.86149783759132,48.691007914902],[0.87671116761022,48.715496114803],[0.88836808739528,48.718920532577],[0.90239998073196,48.710649225086],[0.92119872414556,48.709175212814],[0.95524192597313,48.716786068922],[0.96144420763056,48.725722137279],[0.9772943914531,48.730138669646],[0.98441493173502,48.725995395669],[1.0140639866541,48.72810030179],[1.0206075605327,48.734789446779],[1.0316499412576,48.730581545643],[1.0398026909049,48.742155339],[1.0590712054157,48.756765184439],[1.0686653703661,48.756913559557],[1.0757811283562,48.749437927852],[1.086000043818,48.756926389494],[1.0957264674684,48.748713222693],[1.1126577960236,48.751863710692],[1.1209842348348,48.767249558527],[1.1189842149957,48.782375233568],[1.1213959532999,48.789195509733],[1.1521150110915,48.78555968408],[1.1533037151721,48.774016041266],[1.161542788993,48.769293220083],[1.1847360438338,48.772630245963],[1.1981446610666,48.769568542277],[1.223526519249,48.758056658402],[1.2226160798083,48.767292140423],[1.246023632927,48.769675823998],[1.2562637586379,48.765103705723],[1.2545465453882,48.758629272206],[1.2702130511038,48.757482633762],[1.2799854142834,48.762674216595],[1.3002968590985,48.767536812046],[1.3195444496148,48.76096144137],[1.3329054445301,48.762612355286],[1.3422322124976,48.772542324536],[1.3626643019013,48.781664300017],[1.3744255946955,48.782613836125],[1.3769627320869,48.791766336256],[1.3592476591605,48.813608561344],[1.3621823366519,48.834179921179],[1.3905601143901,48.8466061658],[1.3968565494996,48.855383585466],[1.4093657222488,48.861152641723],[1.4238934051882,48.861268418973],[1.4343110180818,48.866140106761],[1.4549936915991,48.870326164498],[1.4653628424762,48.877601417126],[1.4683545148033,48.892215598584],[1.4606700524523,48.900494617753],[1.4593261044838,48.914649076535],[1.4479593034805,48.924639965044],[1.4594110528379,48.928926959252],[1.4613112437714,48.937555310548],[1.4806477281429,48.940490376837],[1.5015266013113,48.941051842112],[1.5090139983632,48.936627464834],[1.5128954188837,48.922585369837],[1.5241021875366,48.924752145617],[1.5386177797921,48.921794692396],[1.5417973746939,48.91547990669],[1.5385235335514,48.906685854091],[1.5572530066459,48.891575743208],[1.5595079054893,48.882055273516],[1.5462328761118,48.872431616391],[1.5552126063723,48.865075717505],[1.5666395741734,48.866183647932],[1.5780393102494,48.860864409827],[1.5815974879282,48.854999853184],[1.5772727483959,48.844358116549],[1.5951919881928,48.839707334891],[1.5941817842602,48.834218536506],[1.5837280523171,48.832130726577],[1.5912058811372,48.814866973865],[1.5834240899801,48.807168828475],[1.5756742997058,48.790504096814],[1.5803992974877,48.777559499888],[1.5875973267999,48.77360593191],[1.5849045861802,48.763296867942],[1.6026875153092,48.760486506237],[1.6264035004424,48.748091646614],[1.617804540369,48.735942039093],[1.5895382120501,48.712468154974],[1.5948810579854,48.709310708948],[1.5795403954022,48.701811808781],[1.5823151457709,48.696368116243],[1.611774872468,48.689473861848],[1.6058633277913,48.678762670696],[1.6024917313048,48.663765432374],[1.6156160327829,48.652789464959],[1.6298476379809,48.648875085504],[1.6431906740267,48.651291198129],[1.64099001993,48.643389970225],[1.6515719070139,48.638125076138],[1.6495606586096,48.63227092599],[1.6582325680054,48.627645882726],[1.656339110342,48.622053121145],[1.6662229993646,48.613704063337],[1.6793591385148,48.618488989615],[1.689422105099,48.611536250362],[1.7148984609516,48.614392276576],[1.7178604312421,48.606851120102],[1.701983609829,48.584999462088],[1.7092486767776,48.578026100992],[1.7368302606076,48.572280930629],[1.7458629248393,48.576137031624],[1.765322855183,48.569374568412],[1.7674104287362,48.559405546059],[1.7872423006556,48.553746336139],[1.7757543018107,48.527702827198],[1.7786170432038,48.508131705459],[1.7906352036641,48.497377315443],[1.7857092863217,48.489936911612],[1.7963309289573,48.484187938277],[1.8014512893542,48.466086215218],[1.8363839553347,48.466477806902],[1.8448630603718,48.449360706547],[1.8774887068591,48.440613561663],[1.9064076592587,48.440146719021],[1.9065549813045,48.445672344539],[1.9207376717625,48.447750046159],[1.9221462784913,48.457599361977],[1.9304234130097,48.453403326926],[1.9331248410711,48.442264032481],[1.9428970138616,48.441083787001],[1.9378068315128,48.426390003183],[1.925889401548,48.412741750651],[1.9305611178719,48.404126689728],[1.9427703207411,48.405651458209],[1.9619541453882,48.404321075988],[1.9765710225943,48.399385315775],[1.966381938603,48.38158815854],[1.9763108383484,48.380270715947],[1.9868237281778,48.362141015776],[1.9733953665973,48.352974683353],[1.9749473035511,48.335258065972],[1.9823432207772,48.328312555088],[1.9744919508382,48.323163720082],[1.9694413393402,48.314231718094],[1.959225976988,48.308685064463],[1.9666102219583,48.295582043441],[1.9752915866555,48.287202034779],[1.9940901445311,48.286584124472],[2.007237571012,48.284688606385],[2.0228447716486,48.288080340461],[2.0493770399482,48.289753273514],[2.0527138226636,48.295470353999],[2.0815050149817,48.293603520661],[2.1061680366894,48.307635584746],[2.1137168991141,48.307245161467],[2.1105944678389,48.29694441258],[2.1361199958338,48.299247999325],[2.1637483268763,48.298436908006],[2.1557084788588,48.304493813388],[2.1543896262247,48.315910610694],[2.1690253806915,48.312695907539],[2.1813553737363,48.313746373001],[2.185025102223,48.32642865382],[2.1982097691131,48.337062877906],[2.2022520441218,48.344598562828],[2.2239137900476,48.336416239958],[2.2295923211201,48.329229232055],[2.2463103911083,48.329962148865],[2.2380428382036,48.316370632568],[2.2494360700816,48.314580917036],[2.2451518848313,48.298393903395],[2.2535700132149,48.300243238173],[2.2668923386489,48.314682212687],[2.2954192911964,48.30822244035],[2.312593571187,48.330803657009],[2.3276948002521,48.333053330653],[2.3401550939779,48.320230117587],[2.3698159145392,48.308674310979],[2.3968534009104,48.314755298076],[2.4026629385658,48.320717653248],[2.4048123966273,48.314593139765],[2.4207604700518,48.299253278858],[2.4231698173532,48.289315551296],[2.4178314142956,48.278395078542],[2.4237621901031,48.260296420297],[2.4319323869166,48.255142430662],[2.4501643446939,48.250036886561],[2.4690928288345,48.255276432625],[2.4866525872998,48.240104494021],[2.5061863934974,48.238532108957],[2.5141133764865,48.214377652405],[2.5229439829919,48.200517077101],[2.5129645377339,48.192979126229],[2.5097551291606,48.177877699501],[2.5168430223759,48.166807571121],[2.5063243383023,48.156437563961],[2.4832322969696,48.164516406945],[2.4783726996912,48.156743847],[2.4560832798883,48.13581808329],[2.4442532323658,48.131467936811],[2.4510870610062,48.123458807719],[2.4648664700171,48.129109351924],[2.4903125823631,48.126606179474],[2.5215119811805,48.127298388836],[2.5381145999136,48.140650823762],[2.570559954027,48.140815681604],[2.5775724874953,48.132078323329],[2.6026896280919,48.131484417095],[2.6397379446435,48.138858805822],[2.6463713950461,48.136008390021],[2.6634137701321,48.122204261229],[2.6722231385896,48.124202437622],[2.706543037587,48.124819235783],[2.7291489796899,48.139089867843],[2.7551942761197,48.145652570311],[2.7535738017345,48.15321134405],[2.7414632024764,48.159773038474],[2.7462653547317,48.163802955575],[2.7686108994112,48.163611325806],[2.7801683123181,48.167546718776],[2.7989459318842,48.168273053171],[2.8099458960087,48.161299706681],[2.7986329461926,48.150165448323],[2.800901925208,48.133251589253],[2.8208840113898,48.129664483454],[2.8252530440464,48.133557427837],[2.8411949308256,48.137851473794],[2.8590064128033,48.147350198136],[2.8680328112418,48.156437148324],[2.9363157566366,48.163391744884],[2.9532706975673,48.165012141792],[2.9636115856187,48.152952836191],[2.9908854951697,48.152489288025],[2.9939835469666,48.142265686487],[3.0067845221623,48.145250368304],[3.0294681734995,48.133204471839],[3.0158768007648,48.115703437492],[3.035285259367,48.115994375619],[3.0383144426538,48.101542780839],[3.0498894899541,48.088838788782],[3.0504714242752,48.072334131135],[3.0668426687001,48.062700948945],[3.0883164489307,48.053931896432],[3.0973362166793,48.039371853532],[3.1242571374888,48.031123310866],[3.120444753158,48.027237026667],[3.1031098748357,48.024050754331],[3.1040912941224,48.013541749122],[3.1154271480689,48.012966036779],[3.1245523220345,48.006031052733],[3.1215086124269,47.99508051279],[3.1284487900515,47.970976841524],[3.1177801945629,47.964978280792],[3.1052652915151,47.946939230434],[3.0959562152001,47.94648282966],[3.0813886854655,47.938303435109],[3.0784762596905,47.93141901745],[3.0646126208988,47.930516710244],[3.049851715745,47.917612271733],[3.0501029428736,47.911450149596],[3.0369085970173,47.910046599044],[3.0251429746145,47.905395103831],[3.0102886119028,47.904716972369],[3.0072263096695,47.895290955742],[3.0113128689564,47.874942218413],[3.0020156817175,47.86910456894],[3.0053590366439,47.864049253797],[3.0241574870815,47.860432544378],[3.0338278605646,47.843872107669],[3.0310783842835,47.837952684286],[3.0125313015817,47.834373232486],[3.0154699273932,47.813535934414],[3.0229373322912,47.812772400995],[3.0281204473987,47.800645366032],[3.0237994278176,47.786550178612],[2.988226602321,47.78603448946],[2.9350564314568,47.763249875579],[2.9093762293739,47.769314365231],[2.893986958474,47.764757164259],[2.8701769520741,47.764868196886],[2.8566700654285,47.760929175798],[2.8581457165416,47.745650029901],[2.8487899744432,47.725884864654],[2.8489690050712,47.716844895991],[2.8585167014012,47.711991090287],[2.8765799552305,47.719081526808],[2.8841930930896,47.714211876689],[2.8829409210413,47.702615088236],[2.9037123946566,47.695095946597],[2.9231151407358,47.680558801908],[2.9181562549963,47.669794968987],[2.926238261078,47.660085723292],[2.9369444627222,47.659131595543],[2.9542289513333,47.64577418642],[2.9362905168585,47.636648702788],[2.9357687458876,47.619831796752],[2.9452166853722,47.608449329011],[2.9379937136807,47.598885605034],[2.9480691732296,47.590534725553],[2.954982923175,47.590408879602],[2.9644517577136,47.581632358212],[2.9622680864494,47.576787199846],[2.9765353538906,47.569424295927],[2.9643142632036,47.564408371297],[2.9586515837228,47.55737826151],[2.9142961197082,47.565971982014],[2.9093721909559,47.559160555497],[2.8907714985755,47.553102008094],[2.8738950692802,47.55280954087],[2.8661248696402,47.546368484983],[2.8574859883322,47.552839253284],[2.8451871650071,47.544932948997],[2.8489012329621,47.53754134151],[2.8746305174837,47.520424918568],[2.8884586332585,47.50943098545],[2.8980184987491,47.485252401408],[2.9140606551793,47.470896834824],[2.9209883066832,47.455435821811],[2.9288970093188,47.444564932191],[2.930733371753,47.431324302158],[2.9198859465078,47.42134952529],[2.9184549974743,47.405524882196],[2.9008159931543,47.385192680229],[2.8952492319567,47.372177057081],[2.8734919391537,47.348396860493],[2.8699481463917,47.338248316569],[2.8765423657559,47.321934350315],[2.8848764388062,47.316364164149],[2.907768482234,47.310991294935],[2.9264805753113,47.298618271978],[2.9378619912637,47.287719383722],[2.9739389096142,47.269804660206],[2.9834001334309,47.259765880582],[2.9779552353597,47.235552508643],[2.9816886133559,47.221993356801],[2.9972827962038,47.20166393803],[3.0092852008476,47.179914660937],[3.0159484799111,47.159093918463],[3.0211980869457,47.136438093682],[3.0280905152523,47.129064982977],[3.0313737475376,47.092475725697],[3.0211804845643,47.078232382085],[3.0187160021753,47.070780884737],[3.0232191913817,47.062612371142],[3.034525000237,47.056291089581],[3.0627453140392,47.04527634615],[3.0748375004401,47.029815006019],[3.0757442612943,47.019148176465],[3.0655821306108,46.997351832387],[3.0629299477088,46.981085018578],[3.0717062160523,46.964340639457],[3.0793324170792,46.955115150499],[3.0648978058646,46.937079267447],[3.062210755789,46.927739529848],[3.0502954877584,46.910631265703],[3.0514016137092,46.904955777225],[3.0609590858964,46.898148846497],[3.0680961068914,46.877680332057],[3.0671018851119,46.847818120893],[3.0545889127264,46.838765097797],[3.0593510744061,46.827263935532],[3.0374707304721,46.807786953663],[3.0320629441459,46.794909389217],[3.0175184994153,46.799900698717],[3.0033551657685,46.798122809815],[2.9895396276531,46.799298294916],[2.977801671991,46.80377337386],[2.959918627937,46.803872076205],[2.9529591220769,46.790999230159],[2.9378161550649,46.795713700537],[2.9243754548552,46.794523429403],[2.9081271826571,46.787903599841],[2.9098049149944,46.779347563944],[2.8761691440531,46.768445733319],[2.8770157582915,46.761468535881],[2.8612332862758,46.754030340445],[2.845419928846,46.742855932849],[2.8448121194469,46.726844055458],[2.8276177034814,46.735286079973],[2.8010724027789,46.733722377214],[2.787290827625,46.728613960925],[2.7744893811293,46.718902897367],[2.7585207590938,46.717748505775],[2.7567441474108,46.724772483564],[2.7435704821949,46.73008326729],[2.7372898083354,46.743150242056],[2.7287214908144,46.748308579779],[2.7049698717297,46.739389993021],[2.7009209254283,46.720959754269],[2.6881649904859,46.720909610987],[2.6777927654584,46.704612208045],[2.6547293011216,46.696536792562],[2.6478858990075,46.688908315282],[2.6313578708624,46.690886867154],[2.6234039357923,46.688702717854],[2.6215530530757,46.678653259953],[2.6308613163993,46.672294145791],[2.6246414896646,46.657300692831],[2.6095979741835,46.662840354764],[2.6050484721825,46.668158037606],[2.5849748988646,46.664165776546],[2.5721892884417,46.659444642004],[2.5673899068872,46.652347408754],[2.5895802639199,46.648026747075],[2.5966478585977,46.637215067759],[2.5852765586441,46.622738638042],[2.5859628971047,46.6142967727],[2.5691010154446,46.609518978116],[2.5779519369239,46.603788174773],[2.5815597567024,46.593164438775],[2.6023203253116,46.595164451357],[2.6045186165205,46.579001838563],[2.6093779370947,46.571328686404],[2.60621930247,46.565758488844],[2.6149607060411,46.553276455558],[2.5835051726425,46.542741752192],[2.5724916070298,46.533849645617],[2.5540275760751,46.529387627047],[2.5366546066244,46.519702557793],[2.5275313125159,46.529030044988],[2.5201385391568,46.530864132368],[2.512426202843,46.523880853474],[2.4991226886431,46.521292172555],[2.4969434776113,46.533665788244],[2.4829275256976,46.532694737487],[2.4685711377311,46.526009632976],[2.4502811792897,46.521935935452],[2.4266867789218,46.526121661214],[2.4131644849466,46.520301786364],[2.3884650716406,46.518246292054],[2.3683002910262,46.51843386298],[2.3520036091655,46.512206845202],[2.3241785781947,46.49036759012],[2.3298217389117,46.479616607338],[2.3242884285484,46.470978980874],[2.3166710404192,46.468549195709],[2.3054693178764,46.475428936804],[2.2857604795168,46.453514664499],[2.2810437278384,46.420403547753],[2.2498765158587,46.426366967242],[2.2334148941606,46.423384135542],[2.2206403396014,46.423664161021],[2.1975676755012,46.428294141001],[2.1851558899005,46.423284068779],[2.1677843748983,46.424069192575],[2.1296807376318,46.419867872386],[2.1126347187417,46.420825387231],[2.1083721397147,46.413528592759],[2.0889457684929,46.40889961632],[2.0803472806508,46.411894246794],[2.0741962684953,46.419842978652],[2.0294174309506,46.424588797264],[2.0203464671203,46.429421918521],[1.9930771581051,46.430917343442],[1.9781042758382,46.439772572322],[1.9542508363527,46.438125703166],[1.943869602507,46.433996659264],[1.9243017577068,46.431903065788],[1.9195527692358,46.440208070783],[1.909180451657,46.443498226347],[1.902458213237,46.43780452052],[1.89071589528,46.441493184019],[1.8834368991965,46.432557252889],[1.8580375856722,46.433476804112],[1.8383647496008,46.42728517531],[1.8195044214246,46.430033877555],[1.816812388337,46.439524938483],[1.8031391002694,46.44691836733],[1.7983753858278,46.45481310551],[1.7548573832317,46.452214535934],[1.7475915839665,46.450017868926],[1.7566658918784,46.441292317573],[1.757375741134,46.423616429483],[1.7493159438657,46.41093389201],[1.7505449826939,46.405586225701],[1.7392119982362,46.401254100808],[1.7277096608449,46.388955998124],[1.7091312929501,46.393353821969],[1.6974668292376,46.406604886198],[1.683606447426,46.418176923275],[1.6611836253306,46.403538218482],[1.6448463938248,46.386816749434],[1.628836514357,46.388247455127],[1.6143064140463,46.405295947029],[1.6226552998913,46.418260263211],[1.6092554805936,46.423123163216],[1.5920388571659,46.407311867592],[1.5696914589532,46.405498471105],[1.5524923075161,46.394133824944],[1.5461946362171,46.39346025752],[1.5439680356057,46.41688301363],[1.5350519004493,46.424455702933],[1.5223067601736,46.426527695424],[1.5112050540502,46.419594596972],[1.5059901336348,46.409908716453],[1.4929348173659,46.398340551367],[1.4775958033831,46.393726557044],[1.472558559102,46.383431643989],[1.4629367778167,46.375349793186],[1.454349713379,46.376048839285],[1.4353743494744,46.363842198651],[1.438395055125,46.35797267046],[1.4151854142983,46.347214822447],[1.4048447784072,46.364056923495],[1.3965775759913,46.371445233126],[1.3835201223913,46.374755471612],[1.3775283931369,46.382803331341],[1.3560243049838,46.4001195921],[1.3442929839887,46.401546863371],[1.3309220641861,46.396705560378],[1.3223398241302,46.389656273383],[1.3204740000508,46.38163178083],[1.3093599883058,46.378135125428],[1.3030594710726,46.370991990563],[1.2795549241983,46.376488887271],[1.2603993142262,46.378783327264],[1.245105268008,46.37323860456],[1.2408646690892,46.367573686174],[1.2164239770673,46.367784938774],[1.2047664407221,46.387689428519],[1.191538104043,46.376759451936],[1.1841495355328,46.37729147918],[1.1772787760985,46.383948000481],[1.1950871576883,46.40275403272],[1.1944727430082,46.410351612296],[1.2126877519811,46.432217971701],[1.2011339896178,46.432466167404],[1.1834055129956,46.429224899772],[1.1860178766023,46.441083576014],[1.1689192762458,46.446308575491],[1.1516072310249,46.449233517349],[1.1355078072574,46.470884241481],[1.1529790996043,46.472957682593],[1.1405271083029,46.485634879486],[1.1349675834984,46.495262876365],[1.1491485689753,46.502205353076],[1.1459288779804,46.506400874677],[1.1082856489547,46.531510215741],[1.0875973131695,46.538168324634],[1.0722975106803,46.53723511351],[1.0206003685537,46.537099020664],[1.0219575008089,46.55371655484],[1.0147685045818,46.567759565973],[0.98723321911375,46.565560099789],[0.98209440694689,46.572640353042],[0.96266777384523,46.574297702094],[0.94202235129636,46.580794785364],[0.9371898310662,46.586044724789],[0.93775566335965,46.594420109118],[0.91586544594852,46.596627887059],[0.90986438287983,46.603447081391],[0.90693650860659,46.615213230068],[0.89430329614895,46.625732175305],[0.89638293110539,46.633451946341],[0.90652086468369,46.647752216163],[0.91742860399951,46.65036307159],[0.9067032428601,46.665571264221],[0.91071057116932,46.677183661606],[0.90215945171528,46.67919114553],[0.92474929055741,46.692789633606],[0.9249533025609,46.699991021542],[0.91455153531157,46.710120272246],[0.90104236961312,46.736090564754],[0.88777529605684,46.737902736858],[0.86746898682573,46.748216404838],[0.85444929067001,46.759970797231],[0.84293807311317,46.764275112746],[0.83064773545714,46.775361466403],[0.82943649435874,46.783579432834],[0.81628357550664,46.787769101729],[0.81190192936381,46.794504364542],[0.8153195131751,46.805707876783],[0.81032866524034,46.813064718291],[0.80932023680023,46.827853568236],[0.79509333742744,46.832522249054],[0.78680224354972,46.840463346525],[0.79645898941075,46.848962468561],[0.79032856900623,46.852389283147],[0.76879944678165,46.85074613749],[0.77198838768839,46.860643073187],[0.75088169303492,46.863524734354],[0.74733084634723,46.869392079962],[0.73368489987152,46.876040130575],[0.72673737636298,46.886740909711],[0.7043177119069,46.903295922263],[0.70357222720342,46.930055655547],[0.70624788531743,46.937157219193],[0.6961893847553,46.956809748541],[0.69256676799124,46.974304310533],[0.68216214670066,46.977079806439],[0.66162129594461,46.978086547342],[0.65646206458496,46.985434564914],[0.64769454368947,46.98827539877],[0.63621078823085,46.985451013839],[0.62124367303806,46.997106205666],[0.6188740376389,47.007464569411],[0.59055093530507,47.006722651596],[0.56695306996355,47.002266858023],[0.57368515665648,46.995531274591],[0.57382203251682,46.983340464589],[0.59353374575945,46.977612888014],[0.60117289544287,46.973094369377],[0.60155821661783,46.959107207652],[0.59834824957594,46.956764146875],[0.57084220800147,46.95593925543],[0.53928916139484,46.960219024665],[0.52812896085369,46.955971768907],[0.5061349705044,46.959245419792],[0.47662392866394,46.949861808585],[0.44480103455716,46.941152434129],[0.43870457627727,46.929578354733],[0.41852515647745,46.937386922114],[0.40666063754734,46.936647597652],[0.38814626546636,46.943624533306],[0.36651145250788,46.949554418002],[0.35524351132264,46.94418585304],[0.34773843894922,46.936585764264],[0.33952563735758,46.936623468454],[0.32483667041576,46.930652041087],[0.31123243685649,46.937837015115],[0.3052147303369,46.952805098497],[0.30507546032998,46.965176268239],[0.30073879657193,46.973829519846],[0.3083994154951,46.978149875297],[0.30178521378569,46.984422127588],[0.30884587377182,46.999441441774],[0.30543065376719,47.012362068122],[0.29867667498614,47.019599341054],[0.30969866315285,47.025643877461],[0.30698465850517,47.048723481399],[0.29822992579073,47.053922293608],[0.26770726634947,47.04388297477],[0.26201563438582,47.057459330927],[0.26761937550861,47.067504197075],[0.26165981464917,47.070051249456],[0.24245135321948,47.0711879788],[0.23175079195616,47.064054806793],[0.20799449312514,47.053230964732],[0.19167202519639,47.064672009871],[0.17997285846393,47.059187917933],[0.17421802926902,47.071274231914],[0.20095307158529,47.091257976623],[0.18811779784912,47.100828164294],[0.18145709966147,47.1143899519],[0.16598416316105,47.107162285602],[0.16126718554822,47.100796179607],[0.13471650901781,47.107872599064],[0.13613099833731,47.121578754741],[0.12716663727095,47.119967203103],[0.12372359489648,47.128315822721],[0.11111857810383,47.129423259303],[0.10471937462849,47.120793812241],[0.084648249403316,47.118377760157],[0.076371249669326,47.123931049218],[0.08087053131906,47.137653029292],[0.078395363975684,47.146334786534],[0.066259497472021,47.143215902043],[0.053830055961677,47.16373374848],[0.063052886223431,47.175281799504],[0.066596690426524,47.189796025762],[0.053277684947378,47.197182170708],[0.072492820219795,47.220509854465],[0.074829460019472,47.248048474897],[0.082848635358157,47.274168568836],[0.078978960154079,47.282822156056],[0.099012801986365,47.308139754432],[0.10924461524906,47.313421774727],[0.11786940351405,47.325601141531],[0.11745694898776,47.332342613969],[0.13125388952305,47.33409233868],[0.13898837615883,47.33824318552],[0.14796868770319,47.348447803202],[0.14165395029201,47.361961427199],[0.15845843664067,47.366157059648],[0.18296214025622,47.38033044936],[0.16798792612309,47.386934066036],[0.16948959021545,47.395646092388],[0.15385793095636,47.398727021572],[0.18138204745888,47.417824739063],[0.18527899163678,47.424736116162],[0.18093772230519,47.453404824236],[0.18979781155354,47.460723327297],[0.2007181726014,47.484545277708],[0.22010664406864,47.50195233416],[0.22008941253351,47.511490494119],[0.22491484141757,47.52709951065],[0.20807030184987,47.526432351568],[0.2034912870347,47.533330991541],[0.19334553772128,47.539118278038],[0.20150198535452,47.544324126228],[0.21510267043528,47.569975576615],[0.23453049018557,47.57797744555],[0.23000044283917,47.608397360802],[0.23768269638563,47.610966183961],[0.25925309972834,47.612253732911],[0.26784211805055,47.608672360211],[0.27799234011686,47.597381208395],[0.29001704748145,47.597728628188],[0.32325488038268,47.592888415747],[0.33844630799321,47.585030259946],[0.33958580258874,47.579472315073],[0.36673611607068,47.573457923574],[0.3789542711163,47.569104805534],[0.40216586206278,47.579002216555],[0.39442325665444,47.594393009892],[0.37905609046241,47.610779501442],[0.36480446047317,47.620165400372],[0.36465430735157,47.626011449659],[0.38107503178189,47.639064909321],[0.39702255940301,47.638927008339],[0.42390524684004,47.617824451176],[0.44993291932188,47.619329777154],[0.45518198840301,47.627017225989],[0.45662804145159,47.638826353606],[0.47607646347987,47.648011563852],[0.4797670863672,47.64329220016],[0.4996666538331,47.645272415067],[0.51325174134335,47.652863992861],[0.54289746214182,47.656203651505],[0.55947922009731,47.665994923777],[0.58772733155021,47.669617061038],[0.60463738045699,47.679968482062],[0.61480416648326,47.68275087954],[0.61443245110168,47.694215472574],[0.60418662363095,47.685607124967],[0.59557114412559,47.688312714504],[0.59297009308968,47.703590911989],[0.58052041667909,47.712330763793],[0.59409530653203,47.723105855723],[0.61159726872368,47.728134311986],[0.61066958830157,47.732034198596],[0.62683335231018,47.751793159891],[0.63937932915856,47.751572315523],[0.67564997055176,47.768962404729],[0.69688004266227,47.764225211],[0.70344170542358,47.769940283327],[0.68931761050545,47.779996503151],[0.69798475487217,47.788889445319],[0.71263236035006,47.790038970809],[0.72484407861962,47.798889067315],[0.7397212944059,47.814678933449],[0.74540046495951,47.825663057103],[0.7588569724751,47.833536394698],[0.76841445732376,47.831101351932],[0.77457358541314,47.839684494777],[0.77401870735853,47.851208382865],[0.75916076452252,47.859222188506],[0.76468938104337,47.866582667793],[0.75733759497489,47.884473514914],[0.75986941585155,47.898224938894],[0.77032460906914,47.902009083915],[0.78051199587287,47.910375216053],[0.79002362904946,47.912210300533],[0.79799062776542,47.898193546758],[0.81018749426364,47.890393591962],[0.81721753097407,47.892418803105],[0.80913428200565,47.91066247592],[0.81211830142135,47.928939306036],[0.8171459594605,47.934467914387],[0.83727689039754,47.937246716219],[0.84579379193831,47.941403140329],[0.84529238839341,47.954438931698],[0.82428057343045,47.982142037161],[0.82622288599262,47.991475839362],[0.83237463233502,47.996592094392],[0.83170184588828,48.006116934727],[0.84052666414894,48.021048593652],[0.84155459904793,48.029673676539],[0.83672342747852,48.034558745892],[0.82520263947346,48.03005952554],[0.80877017226921,48.031993621434],[0.79747785616118,48.037556987677],[0.79653309159021,48.05267766261],[0.80118315423495,48.071513555954],[0.83460349982458,48.070147734707],[0.84302009925743,48.072638200667],[0.84483764311698,48.086647072566],[0.83920278539184,48.09125189303],[0.81516825904503,48.093730753222],[0.81435131408069,48.098801731111],[0.83268783335498,48.098453526315],[0.84121734187884,48.103059710788],[0.8553701454218,48.122620579792],[0.852575219489,48.133602174445],[0.87293551592102,48.133408559058],[0.89396954177329,48.135535055964],[0.91379809767445,48.135125048448],[0.91161206421963,48.148858532659],[0.88249645680993,48.161766033434],[0.86198925121346,48.166816904566],[0.83683452952269,48.167352245345],[0.82688955262783,48.175387000045],[0.80835901939965,48.18611890903],[0.79562670501545,48.188043105362],[0.79765841643139,48.19445496608],[0.80626900151784,48.203016266265],[0.83048365574563,48.210708729507],[0.82588953248827,48.220721830264],[0.80608653469826,48.239891017509],[0.80241465108887,48.248072322927],[0.78758977714986,48.261313612339],[0.78587084890053,48.271138465423],[0.79426147145466,48.284950588985],[0.79341825616719,48.293008635712],[0.77758221552843,48.302840856139],[0.76023175104941,48.298171659555],[0.76219430247254,48.306876639515],[0.77313762601396,48.325511221527],[0.78418514184216,48.334478837721],[0.78542500970172,48.340430711536],[0.81840111266411,48.349420439199],[0.82785590745519,48.342447024282],[0.84159508492141,48.350229728169],[0.86181253481946,48.350897961325],[0.87015714346989,48.35834027017],[0.88337252111541,48.356669121421],[0.90184278255778,48.373449772268],[0.9149193773197,48.374324097325],[0.93117784919562,48.391265934635],[0.94224603424783,48.399004844657],[0.9482686361643,48.417831978233],[0.9762713097259,48.439081867809],[0.95840880937073,48.44259696324],[0.94226766472979,48.457733974776],[0.93571270291242,48.475553807957],[0.95629262450835,48.482279378048],[0.95436935096035,48.490573966149],[0.94155894503993,48.498694713572],[0.9540037271624,48.503840229688],[0.96655146260943,48.522741687979],[0.95341814083771,48.526244433476],[0.922603461355,48.537716017396],[0.93876307137649,48.550558547099],[0.92638981194521,48.559394233279],[0.89126612131175,48.572177428167],[0.86767573670944,48.573488250275],[0.85063536439017,48.582625709205],[0.8465873876382,48.604782622076],[0.83304661425976,48.61077016626],[0.81963618816719,48.609871113214],[0.81775390390063,48.616320066598],[0.83140562696703,48.633774446005],[0.8226824397504,48.640053608418],[0.82392074530028,48.650041826767],[0.81294886563427,48.660510127486],[0.8148247207739,48.670163564137]]]},"properties":{"code":"24","nom":"Centre-Val de Loire"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[6.9405416785725,47.433371743667],[6.9416788459902,47.415801742321],[6.9383781843469,47.40602166291],[6.9175655645227,47.405540786123],[6.9112807218549,47.38565149684],[6.8853957543304,47.374599512338],[6.879373150364,47.358392623936],[6.8841847374511,47.3526166115],[6.9041310992201,47.359488916109],[6.9173061224044,47.356174450746],[6.9518221878337,47.359328514583],[6.965171933991,47.359200577804],[6.9832539854825,47.36354366283],[6.9942194881531,47.36305702277],[7.0161749063041,47.371834506375],[7.0497154850674,47.360716488473],[7.0522936553288,47.351141950572],[7.0622006908671,47.344160388368],[7.0567509457312,47.334567036162],[7.046205749818,47.326977520793],[7.0305707210719,47.327027697793],[7.0097278540447,47.324358772262],[7.0161408458867,47.313601433148],[7.0096883964596,47.303186330915],[6.9931211498575,47.295543502651],[6.9812664414026,47.295770810067],[6.9665305332962,47.292330424797],[6.9535590397913,47.292421856494],[6.9428919076225,47.287757217086],[6.9514761981406,47.262184061527],[6.9494136431571,47.256679318602],[6.9549768276348,47.242939913873],[6.92627289824,47.224555534793],[6.882438308572,47.201615407729],[6.8639146913869,47.180098699893],[6.842629723754,47.172148165798],[6.8448535375183,47.166384939791],[6.8583444229594,47.164385451371],[6.8397865674492,47.150904795437],[6.8285734250859,47.146341618703],[6.8065486361803,47.130890441394],[6.7637802260904,47.11979466278],[6.7399139141665,47.108051829732],[6.7456764991255,47.100307622017],[6.741092234341,47.091067967613],[6.7178304547913,47.088938283348],[6.7072576746821,47.083033793266],[6.7060095703295,47.074995419181],[6.6916197499771,47.06668927851],[6.7110513317725,47.054327711875],[6.7140545270618,47.049123354928],[6.6996564781858,47.039039389615],[6.6784719863524,47.035382104925],[6.6616206647392,47.028224476267],[6.6535911062238,47.021768824963],[6.6403417206763,47.002761124116],[6.6186789138725,46.992038806738],[6.5931797938133,46.991770812154],[6.5665618384639,46.980637338846],[6.5402076242225,46.974399049863],[6.5188066665015,46.970856252967],[6.5052194745754,46.965849252067],[6.4966857222781,46.974183469608],[6.4751246015727,46.959379453348],[6.4553435306172,46.940428600583],[6.4326749210724,46.928605526908],[6.4579026529923,46.900855622932],[6.4645775075825,46.890210535442],[6.4598785157573,46.851147058563],[6.4423415130938,46.83123675481],[6.4401683842133,46.819062942975],[6.4310019605487,46.812409973106],[6.4382925253712,46.799581903269],[6.4586515580207,46.788759687976],[6.4381050836181,46.76175121989],[6.425911183574,46.754801119874],[6.3950745702138,46.748243117811],[6.389642803755,46.735238377227],[6.3716294362082,46.7247505128],[6.360238313501,46.72308030451],[6.3448015815423,46.711867719342],[6.3154917743371,46.702442903244],[6.2993568333135,46.694896443468],[6.2853255009979,46.691242033962],[6.2704880921381,46.683194022336],[6.2691722926715,46.678150632899],[6.241610701122,46.660314779707],[6.2087769308549,46.636617811577],[6.1849170570186,46.622901021419],[6.1755349630813,46.614142709958],[6.1644651641931,46.610011824492],[6.1273332783823,46.590310133888],[6.1107441527986,46.576314209592],[6.138105886557,46.557659570871],[6.1564422357855,46.545471592105],[6.1528479944668,46.536134657174],[6.1446024516564,46.528393629454],[6.1378590985632,46.530871419262],[6.1126938080715,46.509641497594],[6.0968277794178,46.481208813072],[6.0739298928675,46.463949535302],[6.0744598322778,46.453664090185],[6.0843910990454,46.447437001059],[6.0858348949625,46.440994445768],[6.0747681070246,46.431630995903],[6.064005627331,46.416222559892],[6.0551820813125,46.414801045991],[6.0480752195777,46.405125490757],[6.0295137846375,46.38681604791],[6.0106565375389,46.374508650286],[5.9868463201736,46.364869353266],[5.9729173069373,46.346856233903],[5.9535602724875,46.326531457174],[5.9414094008927,46.309446510031],[5.9259040835744,46.313765646046],[5.9185184907402,46.307199659115],[5.9089357776791,46.283950786541],[5.8946251190123,46.286607913138],[5.8791206347196,46.269936490689],[5.8702488945181,46.265305590806],[5.8643332109856,46.271208875005],[5.8498475590074,46.262067170418],[5.8212837267024,46.262094109034],[5.7656471814788,46.268294754652],[5.7459179055539,46.266368533117],[5.7251818400017,46.260731935709],[5.720112401844,46.265870062788],[5.7160491956243,46.279915646538],[5.7192939761881,46.293462363342],[5.714721806193,46.308772354673],[5.6845768021754,46.310927537001],[5.6833466019044,46.316276892818],[5.6684418272398,46.324369189279],[5.6529045876259,46.323214774673],[5.6493445080392,46.339494512081],[5.6419584041921,46.342028332374],[5.6305151249665,46.330204693001],[5.6176441912887,46.329091983869],[5.610460815624,46.324211378495],[5.59838931795,46.298445925032],[5.5855011829326,46.292557783319],[5.5663641424008,46.294050213862],[5.5581274576637,46.282173642648],[5.5420340189851,46.270203795698],[5.5129432911698,46.264539612518],[5.4995891133957,46.268200455579],[5.4730515403718,46.265066548043],[5.4568426743662,46.274473574235],[5.4595129521644,46.290471994825],[5.4674037740958,46.295566233017],[5.4753005499335,46.315382606424],[5.4669175767252,46.323267248222],[5.4377949533958,46.315109371064],[5.4278984240109,46.342210714821],[5.4170861726833,46.339534237431],[5.4102335548466,46.30910668308],[5.4046508439018,46.310338173994],[5.4042931339536,46.332813029221],[5.3992759574473,46.339521371463],[5.3819165667023,46.345255630996],[5.3734648101425,46.352234450451],[5.3770544086974,46.364113395825],[5.362996992744,46.370926983475],[5.3770431289975,46.381355482485],[5.3552221284773,46.39375452396],[5.3525084400185,46.397586033829],[5.331272401231,46.399499315198],[5.3147703161373,46.40947618293],[5.3076872001929,46.416819197974],[5.308978572395,46.424532251303],[5.3194882695109,46.430803499916],[5.3105633704742,46.446769968334],[5.2759250637615,46.4481213263],[5.2545935888787,46.454117831184],[5.2468319237306,46.459403653865],[5.2350290009581,46.457948870166],[5.2255477233319,46.468273543404],[5.2150628404089,46.468359298393],[5.2130427939332,46.481261974235],[5.2066353369633,46.48639795185],[5.2011399666188,46.508211405762],[5.1815968667213,46.509758803783],[5.1667923612572,46.514674866375],[5.1664495124354,46.505590616989],[5.141950046447,46.508357328146],[5.1152051358154,46.494069043579],[5.10737201939,46.491919458253],[5.0989387475854,46.497166675779],[5.0700061667722,46.485667291269],[5.0523715346281,46.484873791529],[5.0141793460298,46.500587565063],[5.011007749262,46.510294840159],[4.9835496952255,46.515392507897],[4.9645994700407,46.513175985923],[4.9491021767105,46.501380502462],[4.9400218107181,46.517199374492],[4.9314208893674,46.509211481378],[4.9257189717408,46.497441604339],[4.9155507621799,46.488939443669],[4.9157805036687,46.465413333501],[4.9111172894635,46.457732635494],[4.8992958191725,46.450123277325],[4.8918151434404,46.439918009678],[4.8882101486247,46.402977057782],[4.873839273104,46.384668143424],[4.8585287407096,46.368018459572],[4.8514544831808,46.356271094403],[4.8534210199043,46.32990123356],[4.8332136171616,46.300145048773],[4.8259515552341,46.274785814873],[4.8109975376095,46.259923276174],[4.8115552603184,46.249932664612],[4.8077505003904,46.236972415214],[4.7945859355866,46.218311767171],[4.7933904888672,46.204700104778],[4.7802430578135,46.189052363162],[4.7802082627383,46.176676203678],[4.7608053446831,46.175968780182],[4.7597597705914,46.172840600415],[4.7305257874621,46.178368585861],[4.7243706747794,46.184304976244],[4.72266470068,46.202320489849],[4.7356928657613,46.211923783014],[4.7206237625559,46.222390986056],[4.7326605831699,46.227019799221],[4.7357666167041,46.234244688808],[4.7028290155173,46.251330439429],[4.6883618181605,46.25011389523],[4.6795502516132,46.258666565339],[4.6878811178807,46.265311972919],[4.7076872577415,46.269647917424],[4.7075411259083,46.284660070276],[4.694515991108,46.292672565821],[4.6931098569714,46.302197476983],[4.6794340760587,46.303994122044],[4.6693820675804,46.297910092985],[4.6546591822967,46.303484822155],[4.6352614072065,46.299289507242],[4.6314517777677,46.289015276562],[4.6183224944202,46.282440402941],[4.6220235259619,46.270079226484],[4.6185580580588,46.264793895574],[4.5865068000033,46.268694622582],[4.5726687726239,46.277139335718],[4.5698487572768,46.293352201901],[4.5577956308141,46.294551640092],[4.5480762222411,46.282864938182],[4.5464477974735,46.27391839397],[4.5372643385622,46.269911483268],[4.5039940949336,46.267132463094],[4.488465816487,46.287994462282],[4.4765696377244,46.284237867232],[4.4583704273073,46.296976724079],[4.4397213287914,46.293184568466],[4.4272337977412,46.302730717527],[4.4218715520166,46.294954263085],[4.4058135314858,46.296057806589],[4.3920466116785,46.263026545141],[4.388291015925,46.247956431405],[4.3880744564659,46.219790380732],[4.3893979878582,46.213601360996],[4.3774743279046,46.21020246009],[4.3631781812533,46.200537276046],[4.3706868166882,46.191620039558],[4.3648481141165,46.183579311067],[4.3450682105084,46.187441862916],[4.3357117653558,46.181398292861],[4.3270887031684,46.184790131282],[4.3157416420975,46.172029804364],[4.3035807058325,46.17426655994],[4.2952828837852,46.172250410112],[4.2824944900944,46.156946471815],[4.2520302327293,46.157916681311],[4.2518988744775,46.167097935374],[4.2610250986037,46.178754364444],[4.2525000565082,46.187922148658],[4.2423584224526,46.188830459357],[4.2335294499164,46.180026926884],[4.2246872961743,46.177995338767],[4.207903434232,46.194833150686],[4.1854551738783,46.190162130834],[4.1884438149961,46.175128955988],[4.1660889760454,46.172928033288],[4.1324158349304,46.177826358374],[4.1040867377072,46.198391359055],[4.0908839436933,46.192837097346],[4.0716672927165,46.18807123789],[4.0614051962048,46.188789802443],[4.051960198465,46.181690186415],[4.0308840440337,46.171882539683],[3.9887880883959,46.169805261207],[3.9817823975359,46.17634098728],[3.9728332574833,46.193862543845],[3.9725466394127,46.202707514639],[3.933514918779,46.206414377073],[3.9179891232598,46.202853033545],[3.9135693350409,46.206918558033],[3.890130972164,46.214487049905],[3.8981917464837,46.226659321125],[3.8966112073781,46.2371189424],[3.9076581109201,46.242456213516],[3.908821904601,46.260346940334],[3.9055127902449,46.271596707683],[3.899538631706,46.275908099459],[3.8912386850317,46.28524616424],[3.8974208259956,46.291460834216],[3.9135709840696,46.296680727045],[3.9300977722843,46.295820251472],[3.942781911555,46.298925500612],[3.9477193967384,46.303444864233],[3.9481286581435,46.31979164002],[3.9866271252361,46.319195576966],[3.9974052217542,46.323291087799],[3.9847410554074,46.32973022678],[3.9886640376734,46.360561403255],[3.9916043062641,46.369630419679],[3.9842615206377,46.378286038678],[3.9772206054151,46.399220047306],[3.9886970251491,46.408772224942],[3.9844480228975,46.416663389961],[3.9956151474212,46.4286940195],[3.9881422985694,46.435461575775],[4.0055701432229,46.443531306791],[3.997444424826,46.450264670788],[4.0015415164833,46.458618151559],[3.9980402829299,46.465463980924],[3.9730562040646,46.477457398934],[3.9565931687991,46.47688226209],[3.9520867242123,46.481423383561],[3.9579376111726,46.489753821104],[3.9496133283036,46.492478893726],[3.9375764836594,46.49076190287],[3.9189702450008,46.496061208045],[3.9013529089878,46.490636303507],[3.896985633842,46.481471942919],[3.8904665810402,46.481246458453],[3.8649127119961,46.489736338385],[3.860387224324,46.495601253328],[3.8646271424558,46.509717077517],[3.8600251576626,46.515222323315],[3.8494709455035,46.513023833485],[3.8397556873666,46.517562051932],[3.8464630176371,46.524356398489],[3.8340033360184,46.531134997034],[3.8176755382384,46.525229454055],[3.8113440515561,46.520138117834],[3.8017563839321,46.519902255804],[3.7878963661806,46.528042650186],[3.7656008328403,46.537908481562],[3.7546629110025,46.536019887064],[3.7418443310505,46.539508443385],[3.73154117491,46.549578224034],[3.7406549316466,46.559049395025],[3.7432893129951,46.567565263244],[3.7323776901235,46.604907119963],[3.7176467323502,46.605806262315],[3.7138737202882,46.613995279712],[3.7230250098493,46.622072726143],[3.7227091007956,46.627609885471],[3.7121523238188,46.633631635674],[3.699679505,46.651867135799],[3.6969575528098,46.660583034448],[3.6801004977635,46.66852089269],[3.6554716665381,46.687748401639],[3.6513931816228,46.70282167235],[3.637895263919,46.707205199291],[3.6381391050479,46.722723829214],[3.6353341554133,46.728514790806],[3.6225898833129,46.740130866568],[3.6294223422648,46.749456328005],[3.6201072037828,46.754059565827],[3.6020398798222,46.751247280578],[3.5977490685569,46.76202889412],[3.5910525816638,46.762426406979],[3.5806709648764,46.752741235279],[3.5845515939144,46.739382605418],[3.5971876767747,46.728401657187],[3.598000652576,46.723983498355],[3.5773137335153,46.714852724197],[3.5503869458917,46.715861095646],[3.548207507912,46.706166654281],[3.5555591963708,46.695741177165],[3.5543959772727,46.684731744078],[3.5464728563281,46.678292894912],[3.5300363962253,46.688813284083],[3.5174930194471,46.683185185586],[3.4871533162964,46.658256156349],[3.4865354798384,46.65380880583],[3.4572892729042,46.651760006926],[3.4473385862025,46.663554460402],[3.4535963621348,46.681987883569],[3.4513122938683,46.689900877873],[3.4329783660003,46.693340026098],[3.4295672938027,46.702504791218],[3.4341396009475,46.711907843672],[3.4074108289121,46.711510582242],[3.3877581200663,46.714818365449],[3.3787310431309,46.71134766179],[3.3754269760827,46.699410803841],[3.3664449691016,46.691259477216],[3.3467035850706,46.684418162056],[3.3139651835149,46.688751611332],[3.2988329664362,46.713590484885],[3.2697959512206,46.71674181988],[3.2551640362648,46.706289026218],[3.2330363473519,46.697017662903],[3.2155446436111,46.682892755029],[3.1972601846791,46.679928148065],[3.1631524413883,46.693541123032],[3.1297797354937,46.727201530755],[3.0839336875931,46.737632194007],[3.0610780913415,46.749849808096],[3.0490666680714,46.758080742151],[3.0361449719957,46.776351034743],[3.0368385012729,46.784399457513],[3.0320629441459,46.794909389217],[3.0374707304721,46.807786953663],[3.0593510744061,46.827263935532],[3.0545889127264,46.838765097797],[3.0671018851119,46.847818120893],[3.0680961068914,46.877680332057],[3.0609590858964,46.898148846497],[3.0514016137092,46.904955777225],[3.0502954877584,46.910631265703],[3.062210755789,46.927739529848],[3.0648978058646,46.937079267447],[3.0793324170792,46.955115150499],[3.0717062160523,46.964340639457],[3.0629299477088,46.981085018578],[3.0655821306108,46.997351832387],[3.0757442612943,47.019148176465],[3.0748375004401,47.029815006019],[3.0627453140392,47.04527634615],[3.034525000237,47.056291089581],[3.0232191913817,47.062612371142],[3.0187160021753,47.070780884737],[3.0211804845643,47.078232382085],[3.0313737475376,47.092475725697],[3.0280905152523,47.129064982977],[3.0211980869457,47.136438093682],[3.0159484799111,47.159093918463],[3.0092852008476,47.179914660937],[2.9972827962038,47.20166393803],[2.9816886133559,47.221993356801],[2.9779552353597,47.235552508643],[2.9834001334309,47.259765880582],[2.9739389096142,47.269804660206],[2.9378619912637,47.287719383722],[2.9264805753113,47.298618271978],[2.907768482234,47.310991294935],[2.8848764388062,47.316364164149],[2.8765423657559,47.321934350315],[2.8699481463917,47.338248316569],[2.8734919391537,47.348396860493],[2.8952492319567,47.372177057081],[2.9008159931543,47.385192680229],[2.9184549974743,47.405524882196],[2.9198859465078,47.42134952529],[2.930733371753,47.431324302158],[2.9288970093188,47.444564932191],[2.9209883066832,47.455435821811],[2.9140606551793,47.470896834824],[2.8980184987491,47.485252401408],[2.8884586332585,47.50943098545],[2.8746305174837,47.520424918568],[2.8489012329621,47.53754134151],[2.8451871650071,47.544932948997],[2.8574859883322,47.552839253284],[2.8661248696402,47.546368484983],[2.8738950692802,47.55280954087],[2.8907714985755,47.553102008094],[2.9093721909559,47.559160555497],[2.9142961197082,47.565971982014],[2.9586515837228,47.55737826151],[2.9643142632036,47.564408371297],[2.9765353538906,47.569424295927],[2.9622680864494,47.576787199846],[2.9644517577136,47.581632358212],[2.954982923175,47.590408879602],[2.9480691732296,47.590534725553],[2.9379937136807,47.598885605034],[2.9452166853722,47.608449329011],[2.9357687458876,47.619831796752],[2.9362905168585,47.636648702788],[2.9542289513333,47.64577418642],[2.9369444627222,47.659131595543],[2.926238261078,47.660085723292],[2.9181562549963,47.669794968987],[2.9231151407358,47.680558801908],[2.9037123946566,47.695095946597],[2.8829409210413,47.702615088236],[2.8841930930896,47.714211876689],[2.8765799552305,47.719081526808],[2.8585167014012,47.711991090287],[2.8489690050712,47.716844895991],[2.8487899744432,47.725884864654],[2.8581457165416,47.745650029901],[2.8566700654285,47.760929175798],[2.8701769520741,47.764868196886],[2.893986958474,47.764757164259],[2.9093762293739,47.769314365231],[2.9350564314568,47.763249875579],[2.988226602321,47.78603448946],[3.0237994278176,47.786550178612],[3.0281204473987,47.800645366032],[3.0229373322912,47.812772400995],[3.0154699273932,47.813535934414],[3.0125313015817,47.834373232486],[3.0310783842835,47.837952684286],[3.0338278605646,47.843872107669],[3.0241574870815,47.860432544378],[3.0053590366439,47.864049253797],[3.0020156817175,47.86910456894],[3.0113128689564,47.874942218413],[3.0072263096695,47.895290955742],[3.0102886119028,47.904716972369],[3.0251429746145,47.905395103831],[3.0369085970173,47.910046599044],[3.0501029428736,47.911450149596],[3.049851715745,47.917612271733],[3.0646126208988,47.930516710244],[3.0784762596905,47.93141901745],[3.0813886854655,47.938303435109],[3.0959562152001,47.94648282966],[3.1052652915151,47.946939230434],[3.1177801945629,47.964978280792],[3.1284487900515,47.970976841524],[3.1215086124269,47.99508051279],[3.1245523220345,48.006031052733],[3.1154271480689,48.012966036779],[3.1040912941224,48.013541749122],[3.1031098748357,48.024050754331],[3.120444753158,48.027237026667],[3.1242571374888,48.031123310866],[3.0973362166793,48.039371853532],[3.0883164489307,48.053931896432],[3.0668426687001,48.062700948945],[3.0504714242752,48.072334131135],[3.0498894899541,48.088838788782],[3.0383144426538,48.101542780839],[3.035285259367,48.115994375619],[3.0158768007648,48.115703437492],[3.0294681734995,48.133204471839],[3.0067845221623,48.145250368304],[2.9939835469666,48.142265686487],[2.9908854951697,48.152489288025],[2.9636115856187,48.152952836191],[2.9532706975673,48.165012141792],[2.9363157566366,48.163391744884],[2.9347445709406,48.178820824383],[2.9507427471906,48.190202971569],[2.9695465243882,48.193835497978],[2.9744704228122,48.205550154363],[2.9889655342085,48.209014778073],[3.0051596957479,48.207665501246],[3.0189243879447,48.231774581507],[3.0185660113854,48.235192866522],[3.0314619630164,48.248879164003],[3.047565503762,48.249696163103],[3.0436326434308,48.272020556142],[3.0249639004196,48.27600913901],[3.0297705668286,48.285841287403],[3.0204148507047,48.293439730003],[3.0272557445779,48.300368070976],[3.0158983096866,48.307897241414],[3.0365741164856,48.326028248436],[3.0374902381586,48.343151149375],[3.0495229427782,48.360116755131],[3.0605482162395,48.357442256262],[3.0878411046476,48.358744110403],[3.1034153439925,48.349510589018],[3.1182555596676,48.366787852825],[3.1398647131279,48.372599662445],[3.1677335139977,48.371858146235],[3.1796714598679,48.375720974057],[3.184946555144,48.368130335436],[3.2018505500023,48.364015470529],[3.2328491246009,48.370332895515],[3.254386262298,48.36502005161],[3.2647767822592,48.374621237382],[3.2823921646024,48.377519839785],[3.3051586355523,48.372876819681],[3.3093216217612,48.376980286994],[3.3301099431753,48.372120787109],[3.3651606301927,48.372282482296],[3.3627847824483,48.382576787133],[3.3672130286667,48.394317453742],[3.3833174045242,48.39970411104],[3.4020328168494,48.389706108674],[3.4147888224632,48.390268550005],[3.4132728603068,48.376300840268],[3.4216806196631,48.371727783356],[3.4275090718968,48.35997574793],[3.4432494908564,48.367382718502],[3.4525885512991,48.374388436099],[3.4704759274371,48.374667861079],[3.4748808608132,48.369266510477],[3.4981541228456,48.369098088724],[3.512139360519,48.360812483948],[3.530465379844,48.342613415975],[3.5451019683919,48.334543016882],[3.5440725252239,48.319671593536],[3.5634067310877,48.321440919656],[3.566569257901,48.307425850859],[3.5879641370453,48.300806415009],[3.5857412014087,48.29008425533],[3.5777963307254,48.284593393925],[3.5881978504359,48.280068510017],[3.6117709302505,48.274410870011],[3.6168016799253,48.271343511852],[3.6243226631674,48.254526756748],[3.6138531799397,48.24927733618],[3.6000799784034,48.237038015917],[3.6046865808402,48.229884548214],[3.6136268888051,48.232260725333],[3.6216106602921,48.225744034142],[3.6140713717985,48.220115584573],[3.6111516430878,48.21192986819],[3.6009970264951,48.20380086628],[3.5751823496995,48.188742267274],[3.5941772424762,48.178873395497],[3.6195451473546,48.190784507919],[3.6318850111199,48.189390079748],[3.6414996909345,48.183932963824],[3.6506538178638,48.168228410946],[3.6595795108361,48.15965193897],[3.6678669028091,48.139211019047],[3.6887554871535,48.144278615274],[3.6936218940592,48.14799982015],[3.7050157631116,48.144314849936],[3.7223449458636,48.156837755739],[3.7141712164177,48.170603029762],[3.7184640557735,48.175364157847],[3.74029665141,48.169709598744],[3.7519004546533,48.161296410098],[3.7548293235379,48.150244530897],[3.7398043096241,48.138688236138],[3.7397131881194,48.13275416124],[3.7569100878728,48.125307470037],[3.7680208404533,48.1337610774],[3.7768827441699,48.124996720039],[3.8049696872895,48.102546851574],[3.7999733080105,48.096695524271],[3.7985814686078,48.086366869837],[3.8067979988969,48.083861354137],[3.8201608894357,48.067459938552],[3.82635868236,48.063603655356],[3.827059329799,48.047441428512],[3.8219783557759,48.043916868834],[3.8321550263001,48.036232814814],[3.8425469054526,48.036189501683],[3.850085900943,48.02786301681],[3.8706144760895,48.015633804416],[3.8700007142194,48.002599720655],[3.8619707432349,48.004325555172],[3.8398152772889,48.003890008543],[3.8500279607807,47.983791517043],[3.8643090405558,47.98423551782],[3.8618055931881,47.976443001861],[3.8783021550775,47.979419574124],[3.885413743137,48.00032841816],[3.9001846571879,47.997906103474],[3.9146958839434,47.975696995879],[3.9056151344907,47.956390517208],[3.9020918728463,47.939168233154],[3.8940363766278,47.929291041133],[3.9124676793978,47.930259049768],[3.9264502525997,47.934566873068],[3.9403268061141,47.933140821871],[3.9565980726161,47.934513395738],[3.9859571275878,47.930640025592],[4.0055897042792,47.942010075901],[4.0122015583229,47.933099817884],[4.0256492301283,47.928321965076],[4.0315462267821,47.933180877458],[4.0435079889664,47.928107993449],[4.0540462390611,47.92948006618],[4.0563117031209,47.941500284277],[4.0612633895691,47.945564277098],[4.0779088672194,47.942844108199],[4.0929746686253,47.942978558738],[4.091392975551,47.929644880288],[4.111781787339,47.926998395128],[4.129354902453,47.936039992343],[4.1418393873722,47.937107385043],[4.1459926719811,47.947950206748],[4.1663202417186,47.959799899508],[4.1814937489139,47.957133674703],[4.185174863551,47.953252557601],[4.185389386493,47.940250187972],[4.201887052952,47.94115816132],[4.2078363901654,47.946594650302],[4.1991540335482,47.96994144352],[4.2127809206222,47.971725942982],[4.2284618067273,47.969156456849],[4.2221403072235,47.949693241055],[4.2362857449326,47.940458371541],[4.2481126500816,47.929257212053],[4.265592811732,47.924112631788],[4.293421363566,47.925673564836],[4.3019415557721,47.939722254759],[4.2989694743195,47.948924996538],[4.3090008707807,47.961170613198],[4.3512833685724,47.956581571066],[4.3984909856202,47.963428889937],[4.414350314367,47.968207562341],[4.4275882888072,47.965925181567],[4.4394035883612,47.958224025114],[4.4490036624777,47.957151982179],[4.482135195437,47.963341049725],[4.4908013666212,47.967274674022],[4.515002575681,47.966197509296],[4.5315674205603,47.969936101313],[4.5533088051577,47.967682340931],[4.5599635426905,47.971424167131],[4.5552078832713,47.985773515235],[4.5455985119462,47.98829443758],[4.5358174351871,48.001208262],[4.5494258066747,48.004460028844],[4.554850985404,48.012319062721],[4.5673230090597,48.018739473733],[4.5718848731394,48.025129476681],[4.5826732520974,48.029462774305],[4.612404633886,48.030241950581],[4.624062923698,48.025381425202],[4.6396252873332,48.025481582141],[4.6633228351061,48.020020302718],[4.6732270680042,48.015055346449],[4.6985527278028,48.023678273472],[4.7042329730873,48.020235152969],[4.7199460898645,48.008895516311],[4.7492966391968,48.004246587867],[4.7890783024494,48.007828564444],[4.7932639090855,47.996944239514],[4.8091903248533,47.990087845923],[4.7946342537178,47.983195170106],[4.7865152517638,47.964201285162],[4.8194243190699,47.960358692838],[4.8410086317455,47.96075264808],[4.8520473231564,47.956242158653],[4.8660942377505,47.940508774674],[4.8501722212977,47.929537855578],[4.8467200449818,47.924483556015],[4.8289423070305,47.915124211024],[4.8340343917843,47.906781834116],[4.8569990661674,47.89585146766],[4.8693396784934,47.917449806377],[4.8944964422884,47.922840464291],[4.9018509649222,47.921284863427],[4.9190920876169,47.894720464516],[4.9281731599986,47.88687190538],[4.9282357147154,47.871123778488],[4.9540995648128,47.866767159307],[4.9603856383733,47.857358065698],[4.9622497289156,47.839702282837],[4.968346106104,47.831938726344],[4.9846956660801,47.828868610045],[4.9941266376295,47.819746154602],[4.9906198706093,47.80709265473],[4.9824009031204,47.800350982387],[4.9635761932156,47.795106816319],[4.9564491304036,47.790048428128],[4.9183050956308,47.777311690703],[4.9177846968097,47.766614764213],[4.9307398007716,47.761333148797],[4.9496050950308,47.765006218324],[4.9589919593761,47.761870409828],[4.9598932138082,47.7544709258],[4.9707033208711,47.727636116595],[4.9570644317617,47.709406346338],[4.9541385723681,47.701462932734],[4.9791098413952,47.687763691185],[4.9922739605095,47.688315326064],[5.0043602413418,47.700727315079],[5.0262670139789,47.709492979045],[5.0327622841789,47.704076235268],[5.0327945086565,47.692333079799],[5.0606448449781,47.694789812394],[5.0435832118687,47.676513563124],[5.0578872394562,47.668305887057],[5.0703648554737,47.666753831482],[5.0849169001544,47.657252517205],[5.1017263997014,47.659487818247],[5.1088743414175,47.649687715835],[5.133419901405,47.650731358395],[5.1562768819218,47.668257175471],[5.1613411137784,47.679935696643],[5.1793190058471,47.679306571337],[5.173772704787,47.661555338996],[5.1735955223689,47.652564238401],[5.1885815533539,47.6495597478],[5.2153019734879,47.638776585158],[5.2275663747918,47.630461719186],[5.2392323119847,47.616130998734],[5.2505435136739,47.622148375054],[5.2586017166912,47.622216096373],[5.243335051832,47.603257395562],[5.2395818018336,47.595735741686],[5.248821805001,47.588304655805],[5.2529216592041,47.576950536437],[5.2779061705699,47.581361382365],[5.2787977512377,47.590248985309],[5.2948617680378,47.599202098387],[5.2998385942923,47.604925842894],[5.3223487268523,47.612359526718],[5.3399999375357,47.609069594411],[5.3421656596273,47.597942682873],[5.3547654342374,47.591360294209],[5.3706351264232,47.604807955246],[5.3740797661661,47.604538026913],[5.3727580571009,47.618659790315],[5.3868465136168,47.635662494107],[5.4055917713039,47.647770719631],[5.3984746606309,47.649083223607],[5.406340329799,47.673403498326],[5.4265210893308,47.675523872509],[5.4357130635739,47.670913872806],[5.4460337073379,47.670773959543],[5.4725699801331,47.67672271053],[5.482566377733,47.684598405046],[5.5167714113012,47.673665697151],[5.529779465589,47.672825610683],[5.5429630425056,47.685875666578],[5.5672035170122,47.705232598617],[5.580075717534,47.703119392386],[5.5966797529575,47.671689689304],[5.6060928986115,47.675206717975],[5.616916763571,47.673506825098],[5.6350433227815,47.676729768703],[5.6534107674437,47.677377804161],[5.6602009774384,47.684701035958],[5.6900715815111,47.684834261118],[5.6946315676577,47.691589089204],[5.6934923219824,47.703700407172],[5.6841172724944,47.711966308717],[5.6848345035363,47.722252488703],[5.6933389025912,47.737536114776],[5.7092157661502,47.744819092275],[5.7061546847262,47.752289930468],[5.7092177964874,47.763723848917],[5.7050877892064,47.769109267163],[5.6799723393154,47.76996692113],[5.6766127410923,47.77915552638],[5.6816907857215,47.801918539863],[5.6902845680034,47.818602061169],[5.7038164823427,47.822615914257],[5.7326324521832,47.817595239681],[5.7460508220444,47.823594453292],[5.7441242763236,47.848675592832],[5.7534185985443,47.851779809209],[5.7611967718111,47.859337964072],[5.7981943193063,47.852395843864],[5.8053544944686,47.8473671425],[5.8279856830918,47.851868490955],[5.8214368328201,47.868177826395],[5.8366827972636,47.885275579155],[5.8483941586096,47.904328585027],[5.8699685694528,47.900702448936],[5.8864978594033,47.902632285568],[5.8908642780035,47.910826243984],[5.884723650121,47.92604631497],[5.8967125895793,47.93202806731],[5.892904334004,47.937140708276],[5.9001165275304,47.9447526196],[5.9180463526732,47.94735518647],[5.9217138598918,47.970783700094],[5.9367445426717,47.978874239655],[5.9475278158692,47.979712022025],[5.9595125543651,47.965838580885],[5.9377200582568,47.950937203984],[5.9296518654303,47.938718128621],[5.953718196208,47.937030199568],[5.9689005966348,47.947407535025],[5.9707820414319,47.957206856313],[5.9965110271696,47.957642319673],[6.0022660129604,47.956088697125],[6.0099778425991,47.968676110152],[6.0235129876577,47.978198192556],[6.01816748796,47.984218151119],[6.0269197055122,47.990054024535],[6.0411765157853,48.00442320835],[6.0725586040075,48.015669051022],[6.0809347681235,48.012700464881],[6.0977392042699,48.01504283565],[6.1092294655483,48.012467456506],[6.1165344664207,48.019389790184],[6.1317082771503,48.023714993889],[6.1560578216767,48.006943160047],[6.1523407152561,47.994505212317],[6.164889049648,47.976133645938],[6.1509430707726,47.970556896575],[6.160691544552,47.964476018183],[6.1679889957893,47.952352981729],[6.1784443979518,47.954215961253],[6.1973668542118,47.951792167635],[6.2079614134083,47.94275319831],[6.2052242815746,47.932044890248],[6.2191727089294,47.93576331706],[6.2379829343014,47.932840414292],[6.2773320945343,47.953805619678],[6.2964155087065,47.955366770009],[6.3097604456805,47.949874526566],[6.3245064287941,47.949279774694],[6.338561201971,47.954979185933],[6.3661530482729,47.961943699906],[6.394005582089,47.956962872907],[6.4053578977345,47.95311233294],[6.4088868226821,47.943264452338],[6.4317140631681,47.943817555323],[6.4363061456524,47.936497632925],[6.4604356473863,47.91345059658],[6.4560181967467,47.906627288043],[6.4786058641603,47.885521654796],[6.5032137734313,47.89621857502],[6.5421569547535,47.902612242352],[6.5682839276999,47.93449546901],[6.6017847198921,47.944400335071],[6.6302463718081,47.925593409791],[6.6455373160956,47.904022779887],[6.6696633226227,47.89320009565],[6.703676313184,47.881417920779],[6.7102378561952,47.87576777925],[6.7304382302284,47.867533474661],[6.7377719050045,47.861560606022],[6.7638501387584,47.857307907712],[6.7644647560578,47.853457064113],[6.784819046343,47.849620144546],[6.792547182043,47.840496971878],[6.7884284780797,47.834484214023],[6.8235333222471,47.813051201983],[6.8393097752574,47.824784354742],[6.8461756187967,47.822942631655],[6.8428287756472,47.812907241333],[6.8634725871955,47.785157366739],[6.9020863665368,47.776444142208],[6.9093369154314,47.77760076122],[6.9239978247236,47.770469646258],[6.9425641239541,47.768619181766],[6.9695414653395,47.753879554684],[6.9881803418573,47.747811458115],[7.01596189708,47.743229997088],[7.0194654399739,47.736016178013],[7.0374215531951,47.721642148751],[7.0264858913282,47.701000683113],[7.037634862268,47.694693941352],[7.0388002853848,47.687529274973],[7.0480463579808,47.682334383614],[7.0389466543978,47.67798172185],[7.0463174145898,47.671501618284],[7.034430907222,47.661170659864],[7.0391920612816,47.650571191522],[7.0188657902769,47.650671462441],[7.0180362046747,47.642567039669],[7.0049789727138,47.619379272859],[7.0105070572794,47.605019604987],[7.005954748644,47.602446062879],[7.0254214022991,47.592680119451],[7.0405190481699,47.600960102238],[7.0565070741684,47.598940564806],[7.0647156944354,47.601059487848],[7.0772390032257,47.598070781665],[7.0862717367469,47.592564849851],[7.0863359637946,47.585555682513],[7.0941662771964,47.57363395328],[7.1002437787202,47.572348664104],[7.1084182862429,47.563026634543],[7.1062174347916,47.551377585032],[7.1192027781559,47.547271468],[7.132779554549,47.539650016902],[7.1398015507652,47.526066534747],[7.1378734301853,47.510602312684],[7.1303408019013,47.503028568514],[7.1110611805129,47.494903561041],[7.0917092821703,47.494843569895],[7.0792767593811,47.488864894845],[7.0615862317267,47.49474656879],[7.0365664433325,47.497498840015],[7.0243941161552,47.504209745968],[7.0002031778313,47.499396645969],[6.9831161167318,47.49330200911],[6.9886863518423,47.486681305933],[6.9880828045822,47.474451283009],[6.9917666987937,47.466419458718],[7.0002998100994,47.462967214339],[6.9989680532301,47.452297949929],[6.9890632753006,47.447650094342],[6.9700019113149,47.44688361894],[6.9663672609906,47.437927724299],[6.9573594450338,47.433602748363],[6.9405416785725,47.433371743667]]]},"properties":{"code":"27","nom":"Bourgogne-Franche-Comté"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[-1.1196198636379,49.355568981262],[-1.1150349421423,49.362395930026],[-1.0921583687035,49.379887497495],[-1.0782159992234,49.388493551822],[-1.0581039796328,49.390752810392],[-1.030230861026,49.389584817643],[-1.0217757695616,49.392985914906],[-0.98940345902679,49.39743637948],[-0.93938187284516,49.39504140049],[-0.91939336367386,49.39002775011],[-0.90740489073828,49.381675557637],[-0.88137714562161,49.371558349237],[-0.85116019900865,49.362545824867],[-0.8268800178819,49.357899826541],[-0.75879493262363,49.349989308157],[-0.72224467845688,49.347004293019],[-0.69550391989566,49.347281971172],[-0.64201902855212,49.345054424205],[-0.62418682110984,49.340513964595],[-0.59417938730252,49.34074582701],[-0.55324813273511,49.346097088235],[-0.51530983971648,49.345015391903],[-0.45195840154088,49.335498540224],[-0.41484997241071,49.335581004388],[-0.39661087301599,49.333003019991],[-0.36103882127829,49.322880511612],[-0.30257140893328,49.298438445237],[-0.28214642940768,49.293321218346],[-0.24699588025273,49.28822175334],[-0.22569484520744,49.281819588113],[-0.21207245145114,49.28603196545],[-0.16966058718734,49.286245922952],[-0.14189309791495,49.289141316114],[-0.099599544001567,49.2976014263],[-0.087163331120361,49.297906717769],[-0.077762308941497,49.304037533131],[-0.013370009201545,49.321204345512],[0.0040210484147169,49.327780217617],[0.049806426845953,49.350858557413],[0.075462774884584,49.366163898954],[0.087042570312236,49.376676027467],[0.11038536206668,49.394265661988],[0.12974714895673,49.402984487336],[0.15940920759597,49.410111989975],[0.17578564453162,49.412357210559],[0.21994143692835,49.426760938177],[0.29722451460974,49.429859840723],[0.34059327041276,49.434318983746],[0.33897883098918,49.440928520352],[0.3393150124405,49.449872303637],[0.27313585922231,49.453416220586],[0.27142113093512,49.447328719148],[0.25679707643476,49.446323719841],[0.23825592404046,49.451159696807],[0.21769119265823,49.452963282619],[0.19246153744669,49.451459914922],[0.1738896350055,49.456501326126],[0.12123966998691,49.463194369813],[0.11663179558052,49.468668951933],[0.090696994632536,49.482114939562],[0.093998128223838,49.493022491933],[0.086909848300058,49.501426737567],[0.069553018028324,49.506394515928],[0.065609431053556,49.512574780191],[0.074935648312722,49.536327644008],[0.096662241910689,49.566865543968],[0.10673209691871,49.583498812584],[0.13691446853437,49.620054067093],[0.1545404481146,49.648638840156],[0.15041940420529,49.654089298171],[0.15745336474727,49.662409366742],[0.16435786084442,49.683595262249],[0.16902493112731,49.690718055481],[0.18958482856705,49.704795514512],[0.21166902744322,49.714464279709],[0.23734601222366,49.719026316153],[0.28325599543364,49.73657572055],[0.3054297000562,49.741647940405],[0.32055583850936,49.741550113943],[0.35492089191875,49.755006661783],[0.36447312419198,49.764320270499],[0.3742717461751,49.768687702238],[0.40291800519761,49.776954241768],[0.42846422682965,49.786277467203],[0.48354180865604,49.808256679169],[0.50625084522888,49.819729645976],[0.52275149356329,49.824531278036],[0.53443430957787,49.833749077935],[0.57293876242844,49.849717051188],[0.63455572059055,49.86165150765],[0.64204209247477,49.864190596157],[0.67449107487386,49.867359871226],[0.70196726010642,49.871881124641],[0.73355874170037,49.870614655047],[0.76972675735512,49.872091970828],[0.79097157704249,49.875749307356],[0.83667159834277,49.889522498512],[0.88434934728582,49.896715247569],[0.92979339254159,49.906736769842],[0.95467186229888,49.91831807638],[0.96318320357221,49.919860176009],[1.0200494254731,49.916107227482],[1.065897535547,49.925609301563],[1.0809062558413,49.932292873025],[1.1109703384695,49.939082116247],[1.1629209730147,49.957022281774],[1.1845869056976,49.966360150471],[1.1943755832405,49.968033261783],[1.2080962672336,49.979831426538],[1.2332915838912,49.988728375641],[1.2997853981801,50.029578582167],[1.3170167914747,50.03625056502],[1.3324268900416,50.047124707032],[1.3672027614548,50.062608452248],[1.3796981484469,50.065011890414],[1.3924400221587,50.060056426893],[1.4088347782602,50.057247377816],[1.4235940727692,50.070851596042],[1.4464534693489,50.069324171563],[1.4591516246417,50.062494643478],[1.455286116297,50.056298876577],[1.4564566095824,50.037832374442],[1.4734926140971,50.033599846345],[1.4933105925107,50.017740486409],[1.50103897683,50.018915984928],[1.5180154200133,50.00910228757],[1.5270192186573,49.996530516122],[1.5465597760538,49.987581734127],[1.5582578959792,49.979389381286],[1.5738903148936,49.973921649667],[1.5940092903756,49.949050560009],[1.6182113660007,49.937822139755],[1.6784507673607,49.918130568802],[1.6932946158985,49.895601909585],[1.7124562091314,49.886444322648],[1.7117443909555,49.87371820092],[1.7187325614081,49.865708141834],[1.7195139243408,49.85406661499],[1.724683271591,49.845733284166],[1.7270527964865,49.828882279702],[1.7373867941575,49.808209452072],[1.7544750364007,49.790629917937],[1.7579284899296,49.780795399895],[1.7728042654107,49.77686925316],[1.7844715649337,49.763592975395],[1.7838342426767,49.758309270134],[1.7471451565537,49.757054329335],[1.7416291636029,49.751631106006],[1.7409502199257,49.738588067086],[1.7232343899458,49.730085190671],[1.7121688003106,49.731959147918],[1.7151877298233,49.712819627841],[1.7119859825186,49.707713850498],[1.6895744511517,49.694787428191],[1.7045184506731,49.68092815534],[1.7177073271231,49.684373173475],[1.7214282927506,49.691450681445],[1.7375343076769,49.700350145116],[1.7506387449271,49.693804769865],[1.7521845944048,49.680960782507],[1.7251990095943,49.672636996929],[1.72256553641,49.661514170983],[1.7034537142049,49.645178379124],[1.7046286111408,49.639706031745],[1.7172522158626,49.633071609694],[1.7216033847573,49.621992077342],[1.7045833964597,49.60539714358],[1.6951880268931,49.599725188693],[1.7079026298891,49.59512101877],[1.7094013142782,49.586713688098],[1.7216170199559,49.588805803542],[1.7147772726003,49.576403299976],[1.7296224523484,49.561514722426],[1.727181881084,49.541625548343],[1.7446099134771,49.539601433398],[1.7451293471854,49.531735853612],[1.7309415306325,49.516127433413],[1.7192339956449,49.508224831919],[1.7254532581616,49.499781817922],[1.7387428193977,49.499646659524],[1.7437037722862,49.495260515275],[1.7579593630441,49.508955782237],[1.7718616459246,49.512848245546],[1.79022549105,49.503468309638],[1.7874800747665,49.493410636962],[1.7741026603547,49.484110404638],[1.7758155194349,49.475733185704],[1.7663409121222,49.466149422943],[1.7477144178281,49.459538435118],[1.7512558538526,49.452315507953],[1.7375744776703,49.448744348943],[1.7325062090143,49.440346816415],[1.7227989638177,49.433057939568],[1.7207550257388,49.421790744656],[1.7139306567281,49.409224915677],[1.7401057248725,49.405314790651],[1.7203128039946,49.39483019677],[1.74121389808,49.381720558637],[1.747580532548,49.37311965741],[1.7594132403395,49.36814533573],[1.7576982127616,49.356710604078],[1.7727704938425,49.333136370328],[1.7676000740408,49.315889978292],[1.7756247174004,49.29969367954],[1.796488015906,49.284111717893],[1.7932298788283,49.274330698204],[1.8026740663848,49.271947858898],[1.7918059477748,49.256427629819],[1.7895339086741,49.247870747839],[1.7668935671793,49.252034345086],[1.7643549601555,49.263082374151],[1.7547213954529,49.270007807429],[1.7104820360249,49.264465989242],[1.7014183926808,49.252460272045],[1.699042864415,49.234864303276],[1.7043588288241,49.232197221792],[1.7040643483737,49.229320472612],[1.6757423007191,49.21186711807],[1.6769552220057,49.202542812736],[1.6670168601861,49.178613559023],[1.6643792614171,49.153368483471],[1.6539225302112,49.145440634177],[1.655781502711,49.130164014177],[1.6470910019222,49.124713530921],[1.6175344667245,49.093996514155],[1.6233233619235,49.086078404348],[1.608798807603,49.077894185227],[1.6044866350314,49.08303659502],[1.5747375500157,49.078437534581],[1.5570743762242,49.069620586462],[1.5494725491086,49.072557881924],[1.5217716034178,49.068546693163],[1.5116006058281,49.074136193201],[1.5032944474047,49.059098256736],[1.4848766880401,49.0515451317],[1.4608012364168,49.062739598254],[1.4472851104304,49.053509472828],[1.4474286969633,49.04518889808],[1.4579533584639,49.03483279821],[1.4577570076778,49.026294572016],[1.4721822976397,49.018490972378],[1.4787512905862,48.998884682872],[1.4609202371105,48.986433838647],[1.4706099672547,48.975306435494],[1.4770931932159,48.978791319268],[1.497416022081,48.979551284823],[1.5079088220123,48.98376724437],[1.5155485568584,48.976406187821],[1.4966058957223,48.969344788938],[1.5010590902862,48.952678048634],[1.5015266013113,48.941051842112],[1.4806477281429,48.940490376837],[1.4613112437714,48.937555310548],[1.4594110528379,48.928926959252],[1.4479593034805,48.924639965044],[1.4593261044838,48.914649076535],[1.4606700524523,48.900494617753],[1.4683545148033,48.892215598584],[1.4653628424762,48.877601417126],[1.4549936915991,48.870326164498],[1.4343110180818,48.866140106761],[1.4238934051882,48.861268418973],[1.4093657222488,48.861152641723],[1.3968565494996,48.855383585466],[1.3905601143901,48.8466061658],[1.3621823366519,48.834179921179],[1.3592476591605,48.813608561344],[1.3769627320869,48.791766336256],[1.3744255946955,48.782613836125],[1.3626643019013,48.781664300017],[1.3422322124976,48.772542324536],[1.3329054445301,48.762612355286],[1.3195444496148,48.76096144137],[1.3002968590985,48.767536812046],[1.2799854142834,48.762674216595],[1.2702130511038,48.757482633762],[1.2545465453882,48.758629272206],[1.2562637586379,48.765103705723],[1.246023632927,48.769675823998],[1.2226160798083,48.767292140423],[1.223526519249,48.758056658402],[1.1981446610666,48.769568542277],[1.1847360438338,48.772630245963],[1.161542788993,48.769293220083],[1.1533037151721,48.774016041266],[1.1521150110915,48.78555968408],[1.1213959532999,48.789195509733],[1.1189842149957,48.782375233568],[1.1209842348348,48.767249558527],[1.1126577960236,48.751863710692],[1.0957264674684,48.748713222693],[1.086000043818,48.756926389494],[1.0757811283562,48.749437927852],[1.0686653703661,48.756913559557],[1.0590712054157,48.756765184439],[1.0398026909049,48.742155339],[1.0316499412576,48.730581545643],[1.0206075605327,48.734789446779],[1.0140639866541,48.72810030179],[0.98441493173502,48.725995395669],[0.9772943914531,48.730138669646],[0.96144420763056,48.725722137279],[0.95524192597313,48.716786068922],[0.92119872414556,48.709175212814],[0.90239998073196,48.710649225086],[0.88836808739528,48.718920532577],[0.87671116761022,48.715496114803],[0.86149783759132,48.691007914902],[0.85036287028898,48.682948048025],[0.82767132893029,48.680720042791],[0.8148247207739,48.670163564137],[0.81294886563427,48.660510127486],[0.82392074530028,48.650041826767],[0.8226824397504,48.640053608418],[0.83140562696703,48.633774446005],[0.81775390390063,48.616320066598],[0.81963618816719,48.609871113214],[0.83304661425976,48.61077016626],[0.8465873876382,48.604782622076],[0.85063536439017,48.582625709205],[0.86767573670944,48.573488250275],[0.89126612131175,48.572177428167],[0.92638981194521,48.559394233279],[0.93876307137649,48.550558547099],[0.922603461355,48.537716017396],[0.95341814083771,48.526244433476],[0.96655146260943,48.522741687979],[0.9540037271624,48.503840229688],[0.94155894503993,48.498694713572],[0.95436935096035,48.490573966149],[0.95629262450835,48.482279378048],[0.93571270291242,48.475553807957],[0.94226766472979,48.457733974776],[0.95840880937073,48.44259696324],[0.9762713097259,48.439081867809],[0.9482686361643,48.417831978233],[0.94224603424783,48.399004844657],[0.93117784919562,48.391265934635],[0.9149193773197,48.374324097325],[0.90184278255778,48.373449772268],[0.88337252111541,48.356669121421],[0.87015714346989,48.35834027017],[0.86181253481946,48.350897961325],[0.84159508492141,48.350229728169],[0.82785590745519,48.342447024282],[0.81840111266411,48.349420439199],[0.78542500970172,48.340430711536],[0.78418514184216,48.334478837721],[0.77313762601396,48.325511221527],[0.76219430247254,48.306876639515],[0.76023175104941,48.298171659555],[0.77758221552843,48.302840856139],[0.79341825616719,48.293008635712],[0.79426147145466,48.284950588985],[0.78587084890053,48.271138465423],[0.78758977714986,48.261313612339],[0.80241465108887,48.248072322927],[0.80608653469826,48.239891017509],[0.82588953248827,48.220721830264],[0.83048365574563,48.210708729507],[0.80626900151784,48.203016266265],[0.79765841643139,48.19445496608],[0.76407918474979,48.181599665308],[0.75566254080812,48.181981836049],[0.73782963836386,48.189069627691],[0.73014979083029,48.200521766169],[0.72363045806996,48.19813955141],[0.7165758658899,48.212094515686],[0.68321966914477,48.2485882228],[0.67547108490982,48.254740726504],[0.65315095543918,48.263702677988],[0.64070530481206,48.261221689671],[0.63190429889268,48.254754506701],[0.63315984470535,48.245553870078],[0.57919146406902,48.24436440048],[0.56099429972633,48.245949063769],[0.55013843367508,48.249395520335],[0.53597049486367,48.249844560134],[0.53848634108307,48.256987820339],[0.5303000454288,48.265496730429],[0.51293004449183,48.266874483366],[0.49455647283795,48.28681567575],[0.50702990447062,48.295832610533],[0.48757654033176,48.307795859172],[0.48050090924161,48.298592258919],[0.46361198113469,48.305016107657],[0.44279870606142,48.304629310064],[0.43133408375288,48.306638667446],[0.42688901989368,48.315425242308],[0.41599578567133,48.321625198799],[0.4062203560807,48.314621149851],[0.3954029644226,48.320549965535],[0.38260989677575,48.333828412247],[0.38047838823167,48.341797530871],[0.38828549911199,48.349122009475],[0.38255236381737,48.359498801305],[0.37865893857906,48.383227765197],[0.37386118731698,48.386969757082],[0.37537215739256,48.395740224588],[0.37172370405574,48.410451667862],[0.38150787714381,48.417547978808],[0.38066015166482,48.425411796164],[0.36771793204951,48.438272682172],[0.36395632992898,48.451631721658],[0.35578465090337,48.458217063582],[0.33874148490671,48.461599536909],[0.32727632603609,48.471072305832],[0.31789727296834,48.471938210212],[0.29585588821524,48.480174860693],[0.27593434536664,48.479055127239],[0.26286221529839,48.482954540393],[0.25857807031538,48.476710383834],[0.22939338887665,48.472578001816],[0.21823241324651,48.473790546424],[0.18981304225187,48.461891344828],[0.18125494041244,48.464965078387],[0.16972375424173,48.461776714307],[0.16965670000587,48.449364042801],[0.15610127663516,48.454794932825],[0.15811789380158,48.4440164218],[0.15131906064063,48.437226845695],[0.11624768586472,48.435555660302],[0.09917046478078,48.41034986941],[0.083580132468228,48.411137710408],[0.067826622948661,48.406115400716],[0.056684859958794,48.393974400454],[0.062489872264419,48.382213868151],[0.020992722816365,48.380200925309],[0.0065863250934992,48.388521385965],[-0.0025641291874286,48.397311951396],[-0.020363541559243,48.393656323667],[-0.022054721991416,48.388059994444],[-0.035753099663116,48.384874683334],[-0.050692623162423,48.375201195715],[-0.054527208218665,48.382004461206],[-0.052691042298523,48.392979240085],[-0.05669039654505,48.398915618731],[-0.053012801512314,48.412716132961],[-0.057355677768335,48.42850299559],[-0.049909790963035,48.447628170085],[-0.051890589271637,48.453255414135],[-0.072707535476378,48.456927943118],[-0.073006901765828,48.450527118516],[-0.10641182796282,48.447519773766],[-0.12454179598033,48.449239552758],[-0.14871763477939,48.458069224847],[-0.15336586853021,48.476724917968],[-0.14958860992305,48.479781866844],[-0.15856042497356,48.496817021301],[-0.1720909995602,48.502134649047],[-0.16634047065468,48.51558387484],[-0.15568415360731,48.520496772763],[-0.14501210976342,48.521000343601],[-0.14460271813847,48.527754338423],[-0.16937878261294,48.536973156988],[-0.1899589987284,48.548884398226],[-0.19398633186269,48.554824404734],[-0.20694246592994,48.562946447212],[-0.22107424204732,48.560317301834],[-0.23435242732491,48.562336320193],[-0.24264015511442,48.567994064435],[-0.26180425334438,48.54789519181],[-0.24635660161985,48.542620878313],[-0.24176789393774,48.536388956089],[-0.25395512234333,48.525985631213],[-0.26580141522268,48.522782191648],[-0.27155353070113,48.507447568195],[-0.27823048075492,48.506986142113],[-0.30280889062491,48.517340998248],[-0.32023332020671,48.522923755915],[-0.34337759223335,48.500849863584],[-0.35582138041634,48.495673571366],[-0.35349558279054,48.483897081468],[-0.36723974711241,48.487748985001],[-0.3676233888649,48.492944315138],[-0.39345664138171,48.501835194106],[-0.3991855056689,48.510158714286],[-0.41273449116925,48.506498004612],[-0.42497181740742,48.507282953736],[-0.43075652123879,48.51181625112],[-0.46226332328429,48.512709151203],[-0.47060334996255,48.509716651644],[-0.47820460128897,48.501565713987],[-0.4884950789804,48.501617721865],[-0.50506155077299,48.505798828433],[-0.5304424347088,48.495164970256],[-0.54510290980273,48.482691035747],[-0.55171796610154,48.473119783464],[-0.57152013702789,48.469152972446],[-0.59533674901115,48.472630277201],[-0.6175695455761,48.458960402325],[-0.6540003356242,48.444278312957],[-0.65363074848858,48.459545681615],[-0.66371844747552,48.484471551488],[-0.66895705284659,48.486137900646],[-0.68585273590642,48.475468439014],[-0.68799234091834,48.469431032111],[-0.70206934477695,48.467207668633],[-0.71121688547931,48.470742279355],[-0.73034187148783,48.472703026439],[-0.73585755427354,48.461124917636],[-0.7197695922356,48.454578580623],[-0.71509947351088,48.448950147648],[-0.73527798039621,48.445048872201],[-0.75727715268855,48.436552496914],[-0.77453904965747,48.44327891903],[-0.7785859196383,48.453255439492],[-0.77787285065978,48.465413522216],[-0.79756269441243,48.465280274577],[-0.79918376742683,48.458939062295],[-0.81322359143068,48.455083144137],[-0.8184585148882,48.474291742186],[-0.82728981063172,48.476292220178],[-0.83778925434372,48.485178672867],[-0.84610706675308,48.498284307396],[-0.86036021134895,48.501458584456],[-0.8774635305069,48.499620464013],[-0.89624907070572,48.495083815873],[-0.91847065624527,48.500394275132],[-0.92236046915212,48.512389219916],[-0.93371106054579,48.51502659051],[-0.95637394558324,48.516620056723],[-0.96425363340344,48.510812466339],[-0.96235389107925,48.503667410902],[-0.97225823660351,48.494600246107],[-1.0039961840993,48.489172448089],[-1.0514451903751,48.509308794368],[-1.0605497194866,48.515346429697],[-1.0701643748629,48.508492017418],[-1.0969039995416,48.512091635194],[-1.1160901264748,48.5212333284],[-1.1305430206604,48.52170348713],[-1.1470767776101,48.517498765375],[-1.156893190635,48.521285821117],[-1.1699074343327,48.531104413062],[-1.1889294040247,48.52889285086],[-1.2065516679372,48.542206088249],[-1.2158216927154,48.538229063528],[-1.2363206998987,48.538079953318],[-1.254274261097,48.543267861594],[-1.2722481273192,48.533920331809],[-1.2695738148732,48.524058079717],[-1.2792034941015,48.509166405754],[-1.2882493476535,48.506990431124],[-1.3025661285534,48.498856875187],[-1.3263369028651,48.498742404871],[-1.3302853407871,48.489791631794],[-1.3393694052252,48.490940085021],[-1.3450398581682,48.484912379925],[-1.3463506846745,48.471670546758],[-1.3772457352191,48.458282754255],[-1.3966756078064,48.462052879811],[-1.4064842226881,48.460604032661],[-1.429135838213,48.462552562467],[-1.4403529299447,48.471140825579],[-1.4362528107594,48.478368227471],[-1.4492603238973,48.486102161685],[-1.4670861806686,48.48806705044],[-1.4731862558468,48.485386403307],[-1.4899417997599,48.489372357681],[-1.4956406657121,48.508898642535],[-1.512277768964,48.524834117063],[-1.519564216371,48.540018024898],[-1.5332855375208,48.548003700235],[-1.5291705857729,48.560522846907],[-1.5189218496777,48.56659037005],[-1.5286423474284,48.579179736848],[-1.5429927154595,48.580446827686],[-1.544011006159,48.587389031303],[-1.5396520439432,48.599920146805],[-1.5484855009897,48.607366445795],[-1.5651218255326,48.614397614273],[-1.5710894380361,48.626441149011],[-1.5435452019954,48.63121633289],[-1.5186481112506,48.627241443224],[-1.515647973505,48.618249181032],[-1.4875143099536,48.619683118162],[-1.477188590376,48.618737838556],[-1.453119129556,48.624675630959],[-1.4491592197362,48.623416514324],[-1.4258419389759,48.637559262748],[-1.4045832706425,48.643393783536],[-1.3788928672818,48.641984051038],[-1.3574234034789,48.635483059321],[-1.3667902778659,48.646816772419],[-1.37779618361,48.650980830291],[-1.3931922892245,48.650524483715],[-1.4008843035347,48.658912226981],[-1.3868080886343,48.674230077774],[-1.3885017122394,48.680611484574],[-1.4109326754602,48.671499504878],[-1.432437001637,48.666381359345],[-1.4385827533746,48.656898441113],[-1.4453056482617,48.655010677863],[-1.4492892816983,48.670001538869],[-1.4812544062845,48.684374376408],[-1.49696844753,48.683669583998],[-1.5049509038692,48.687406798864],[-1.5184702088038,48.716306146704],[-1.5319277117459,48.731023322195],[-1.5601753647368,48.735462626987],[-1.5701538176576,48.742946555279],[-1.5744027818825,48.75185050251],[-1.5701442959905,48.772302111897],[-1.569890517616,48.800224865932],[-1.5744376405691,48.821682401355],[-1.5941495509687,48.834715454159],[-1.6013201144142,48.836516012355],[-1.5871738726074,48.846459450942],[-1.5763822718035,48.866233003819],[-1.5643455142932,48.921580374553],[-1.5541181922605,48.900139698967],[-1.5434258848416,48.931027158992],[-1.5495360815231,48.940185428234],[-1.5621107504118,48.941016659011],[-1.5620295824626,48.981625893318],[-1.5589869081576,48.991685570978],[-1.5607098810567,49.001480959204],[-1.5507932300727,49.003261996562],[-1.557066459398,49.011560491842],[-1.5561478071951,49.024690465146],[-1.5398053590488,49.034164591611],[-1.5238615597683,49.027357230532],[-1.5093830641249,49.026943233212],[-1.5417948391641,49.041162160828],[-1.5471012949252,49.037292772502],[-1.5592318014493,49.038274352716],[-1.5688741957393,49.032047703421],[-1.5785771444366,49.015283279183],[-1.5745849862677,49.002853692658],[-1.5816167633561,49.002704056487],[-1.5937891730984,49.022503424284],[-1.60295018717,49.05577884026],[-1.5980958444687,49.058557083517],[-1.5984218569282,49.074513497125],[-1.6094145764943,49.079281603206],[-1.6104318663509,49.092932611918],[-1.6069307277516,49.110034240873],[-1.5999863662105,49.118513175091],[-1.5947459734594,49.131928426288],[-1.5810718554805,49.131674948757],[-1.595825359512,49.14283223955],[-1.5988469663686,49.169200419634],[-1.6073215295119,49.196647120312],[-1.6051478142522,49.2037447513],[-1.6107491510687,49.214490949154],[-1.5717703394133,49.223972136229],[-1.5892944345851,49.233427410876],[-1.6169953390227,49.231610466351],[-1.625063732473,49.225074527383],[-1.6316846090167,49.21422230031],[-1.6425012327523,49.223929836401],[-1.6541603483738,49.241445046412],[-1.6609046758189,49.259266389315],[-1.6782177867605,49.280142766374],[-1.6657720735083,49.28188131922],[-1.6652075172903,49.286811899007],[-1.6831075465952,49.28762544819],[-1.6968629360079,49.302727209961],[-1.71117197286,49.325094637036],[-1.7012938138615,49.323915736806],[-1.6968290117754,49.331720453626],[-1.7176162414367,49.326352117431],[-1.7247902425762,49.327450118599],[-1.7411588494555,49.344037789167],[-1.7647272242817,49.363551606894],[-1.7787957331797,49.371673062007],[-1.807044519245,49.371886570418],[-1.8198270387403,49.39048194081],[-1.8233630709264,49.405355197016],[-1.8234334633411,49.438806741795],[-1.8267734462966,49.452912708931],[-1.8365701217503,49.468323740242],[-1.8434098400699,49.47077677688],[-1.8464190476711,49.498628821215],[-1.8526021717957,49.510385793698],[-1.8686791471828,49.51237165287],[-1.8819330190767,49.51931183704],[-1.8865295575919,49.527614954968],[-1.8856912059509,49.540389845217],[-1.8599268014835,49.550652196301],[-1.8410258496794,49.571733495111],[-1.8423657220792,49.603652142802],[-1.8451382307403,49.619088241649],[-1.8550073982962,49.642822194747],[-1.8602959828965,49.650193854758],[-1.8734840432458,49.657595242746],[-1.8983983394389,49.665827626044],[-1.9178223549036,49.665792917579],[-1.9291066373282,49.671817058684],[-1.9461839215553,49.67434359255],[-1.9362755021206,49.687906388906],[-1.9364332705437,49.693755561379],[-1.9472733176655,49.704928806767],[-1.9422468301096,49.725557927402],[-1.9165182727857,49.724881008941],[-1.8977813504921,49.71710162128],[-1.8901181931224,49.707153428958],[-1.8765349678081,49.706745540386],[-1.8524826023107,49.716941279614],[-1.8395312458249,49.711552803104],[-1.8276334422186,49.693428126343],[-1.815242405587,49.68887201482],[-1.7903115872551,49.687062757357],[-1.7626785199869,49.678675842585],[-1.7353787740872,49.677475890784],[-1.7226166267492,49.67923539334],[-1.7044356804014,49.670860552488],[-1.6867469480741,49.673066182254],[-1.6783904494577,49.661233437166],[-1.6501443485293,49.65679900284],[-1.6328523940131,49.660641576202],[-1.6240147652106,49.644053113794],[-1.6151605571489,49.643460933616],[-1.595585416435,49.654476141253],[-1.5790665683374,49.654108869195],[-1.5657216224347,49.6564319962],[-1.5415760950278,49.65411200539],[-1.5142668707452,49.659906363431],[-1.4951992999355,49.668112324564],[-1.485803063592,49.669315434164],[-1.4848705161427,49.677760491652],[-1.4753944670543,49.681673759847],[-1.4759879580656,49.692012655502],[-1.4710843353661,49.69667139043],[-1.4551125681652,49.691211562863],[-1.4211648985369,49.703706318223],[-1.4112493611078,49.70195420522],[-1.3858209704338,49.706235946931],[-1.369566553066,49.706887557051],[-1.3498383478638,49.702068404407],[-1.2878440862449,49.692595816605],[-1.2679291968387,49.695329176599],[-1.2715087649217,49.683652851227],[-1.2538864036932,49.663805883133],[-1.2391801151651,49.652402684434],[-1.2432478604805,49.648200405198],[-1.2295967339571,49.624653776103],[-1.228866448748,49.607863429808],[-1.2542854436666,49.612658345594],[-1.2662660112701,49.592845791028],[-1.2612384503723,49.586657015411],[-1.267613440608,49.581953814631],[-1.2840568870782,49.587252068376],[-1.2962280470313,49.583173183623],[-1.3042001777054,49.573677338992],[-1.3091731760214,49.552609580003],[-1.3063595679898,49.538928237908],[-1.2895246997246,49.51798179534],[-1.2699260332883,49.500541701878],[-1.2583845422005,49.48641032582],[-1.2233382850858,49.455809055808],[-1.182532110005,49.424017594444],[-1.1679979463415,49.408031770721],[-1.1617337685799,49.39174984514],[-1.1732751083089,49.37843798982],[-1.1775396285395,49.36489675323],[-1.1639466580138,49.366660471267],[-1.1388379041632,49.358414252281],[-1.1360493392017,49.354043408557],[-1.1196198636379,49.355568981262]]]},"properties":{"code":"28","nom":"Normandie"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[4.1408937784816,49.978756019427],[4.1539790946564,49.974840643025],[4.1723910913291,49.97708133227],[4.1971143649951,49.967723922794],[4.1973605165259,49.954734901799],[4.2259812346668,49.959064626187],[4.2330628764399,49.957824711709],[4.2303959475263,49.947204968202],[4.2216024803296,49.937902313306],[4.2187089162197,49.920686498287],[4.2221391301616,49.910422069675],[4.2332446058305,49.904304609803],[4.2540638814402,49.904004764573],[4.2530532522095,49.872272130792],[4.2485056451169,49.856518172527],[4.2366221851606,49.849699207378],[4.2234884321126,49.83376467914],[4.21989152014,49.815134132001],[4.2147724033566,49.806110108269],[4.2270460920968,49.793183108192],[4.2224308204953,49.786967474101],[4.2095884562322,49.781777002902],[4.2142637924854,49.771267691897],[4.2266193641282,49.773087602827],[4.2382185523689,49.767642716303],[4.2500943395752,49.757098850356],[4.2290201625555,49.745744739695],[4.2247072679536,49.727198714419],[4.2064629076853,49.723538323397],[4.1926293949408,49.715800885171],[4.1920358906093,49.710905599545],[4.1783005290521,49.698036101434],[4.1441873561823,49.688543920373],[4.1475377596226,49.678019756234],[4.1270270054568,49.677917606181],[4.1223323319077,49.659520506862],[4.1254660330069,49.650608155401],[4.1147910874013,49.635304817786],[4.0993133133426,49.628479985907],[4.0695561865706,49.636751879497],[4.0511107039532,49.634644480527],[4.0432501448672,49.6361455878],[4.0379111248697,49.622918577627],[4.0252899216328,49.62252962525],[4.0313962718463,49.614287229711],[4.0541912133221,49.595288700911],[4.065110143114,49.594908552638],[4.0595605382919,49.578709772836],[4.0627821408209,49.573556972194],[4.0765722336699,49.57112568919],[4.0647940705926,49.562212345669],[4.0582914969504,49.552548182169],[4.0487683371061,49.545272613584],[4.0738006912951,49.541617642486],[4.0767490566918,49.531314775054],[4.0758354322042,49.518345118497],[4.0650976973335,49.523284436368],[4.0566240283661,49.521046840185],[4.0618580428951,49.512563145954],[4.053158610381,49.50864470004],[4.0407061703752,49.50853200863],[4.0423746855064,49.468690509147],[4.0529144654974,49.460257089671],[4.0602468457773,49.447151466107],[4.0500241066599,49.445792451369],[4.0376689955921,49.438263004999],[4.0431448752397,49.429325986342],[4.0422957368009,49.416650795955],[4.0502747365168,49.412260783575],[4.047974391829,49.405644080344],[4.0399063933123,49.397393331324],[4.0354977852679,49.359905945249],[4.0127326189721,49.358302701884],[4.0051087823761,49.369208523497],[3.9913652648133,49.378222344205],[3.9613104389204,49.377346727516],[3.9424137621592,49.391461051265],[3.9318314213659,49.403084958448],[3.9244391664348,49.406179032892],[3.9150740342564,49.399385348956],[3.8787822154646,49.385857165921],[3.8591446800636,49.381351797144],[3.8573468410854,49.369945638107],[3.847475808218,49.364589335554],[3.858709482185,49.353737278746],[3.852156449301,49.344654924149],[3.832778633819,49.350261851859],[3.8237576514434,49.356987454563],[3.8015158122099,49.358931233427],[3.7824442652216,49.352774492617],[3.7744622374234,49.354639933222],[3.757818074306,49.347604354229],[3.7410811711412,49.347585887018],[3.7422206958499,49.336511221485],[3.7216167324835,49.335726303503],[3.7012926310034,49.332508221298],[3.6891002697559,49.326851228803],[3.6703327730544,49.325093317382],[3.6601616875884,49.318370386543],[3.646957318637,49.315152582535],[3.6383343630554,49.301354552133],[3.642801871342,49.296041342828],[3.65731758003,49.291021541771],[3.6516094181931,49.278360707849],[3.665132135016,49.269657535247],[3.6552490233788,49.262847772673],[3.6637955993399,49.253525125811],[3.6707785326799,49.239600299061],[3.6763725147129,49.23836076616],[3.6650221926501,49.223221302369],[3.6516085786612,49.221427253663],[3.6584058277856,49.211000985544],[3.6817942876508,49.205339977618],[3.6839084510227,49.197534060825],[3.6971034744514,49.205472659609],[3.7048747423107,49.198590103722],[3.7005485386662,49.187713241443],[3.7043892552675,49.181369443488],[3.7254385553209,49.173515978138],[3.7372236091373,49.177961424911],[3.7511423125744,49.177699202357],[3.7487678456403,49.157085133246],[3.7395699991233,49.156933396134],[3.717012841182,49.147040324959],[3.7016210668145,49.143083232127],[3.6980322212385,49.149827639227],[3.6838376358892,49.154490943481],[3.6718043158638,49.150635019402],[3.6468735208387,49.149122623512],[3.6222521277141,49.151105463129],[3.6103949951775,49.127543924136],[3.6000114843908,49.120690012831],[3.6200761430148,49.107193914382],[3.6323412082709,49.086509017267],[3.6390507423115,49.081304273735],[3.6328719662821,49.072789507462],[3.6237954864751,49.07086508435],[3.6121535124357,49.073560405492],[3.5877081614204,49.059394624683],[3.5866997575834,49.035795925017],[3.6150194069679,49.033500653248],[3.6168408971943,49.03648384631],[3.6463115589695,49.040590166906],[3.6639547486924,49.037308063462],[3.6774822917619,49.019164672527],[3.6749656325958,49.01172340253],[3.6651641207485,49.00563190452],[3.6398926774554,49.00408594583],[3.6245368960791,48.983751500727],[3.6206544521613,48.965944000018],[3.5991756397826,48.964609029368],[3.5915529898914,48.960375393399],[3.599065082592,48.953591820396],[3.6015957850168,48.944073853473],[3.5888878773911,48.943911238057],[3.5744445323994,48.939019123403],[3.5738483617762,48.921481440361],[3.5698140355022,48.914705628852],[3.5600217013966,48.917012631384],[3.5285709402165,48.912136556763],[3.5130610888281,48.894727857657],[3.5021501743028,48.871150830362],[3.4824053162481,48.864936735752],[3.4851833721947,48.851910309574],[3.4704665824993,48.850999590899],[3.4619058634763,48.837795469902],[3.4453621334286,48.843227318178],[3.4522351731222,48.856295042236],[3.4209735309142,48.863949992871],[3.4032208419263,48.864690111949],[3.4058488876005,48.875883179755],[3.3897420595655,48.871208088242],[3.3804785922907,48.874760520568],[3.3828118491401,48.888743663179],[3.3690076856012,48.893887842681],[3.3755045418202,48.907223979388],[3.3722055688435,48.921684863018],[3.3663458595763,48.922834212302],[3.3535717935992,48.915243105496],[3.3441215555428,48.915424399696],[3.3302940034825,48.908707002968],[3.3130772332366,48.921215462331],[3.3128748032908,48.933619620679],[3.3047535824542,48.948766966256],[3.2845265117579,48.940530948472],[3.2678473977393,48.938330226813],[3.2571425774493,48.95706258101],[3.2518324140274,48.972363565032],[3.2441973984858,48.976835025435],[3.2312127851282,48.976752849115],[3.2291741613167,48.988415153607],[3.209314063913,48.993783774365],[3.2071647717724,49.000687121653],[3.1836516708558,49.011250532749],[3.17167852308,49.014125889695],[3.1610292917102,49.024224133711],[3.1765330296567,49.030276306398],[3.181201109614,49.042312878135],[3.1902026447151,49.046494471584],[3.1821650688322,49.052356876125],[3.1818447950388,49.062073630984],[3.1686703252618,49.076194127358],[3.1586170058803,49.080495794822],[3.1568687392365,49.086717381412],[3.1652303376546,49.099653555336],[3.1495286898189,49.100548046274],[3.1288977237115,49.106712873662],[3.1019450875262,49.108665530931],[3.0824299640326,49.112379413059],[3.0718801833502,49.11755332218],[3.0563165652026,49.101913557338],[3.0573553400185,49.093990044235],[3.0483557770377,49.08631637936],[3.0327819280137,49.089067566229],[3.0295246754031,49.085932257529],[3.0085155423352,49.091506561321],[2.9912365557999,49.084010529465],[2.9879964190903,49.072371853401],[2.9747449093505,49.074788481937],[2.9704735929189,49.088974001698],[2.9445842533756,49.081604590578],[2.9174506912143,49.079815930085],[2.9015078822282,49.085373143453],[2.8949485303642,49.077063202013],[2.8830747436616,49.076071279686],[2.8662678657136,49.070693981918],[2.8557424844029,49.070260111043],[2.8451483788669,49.084656494049],[2.8360889289489,49.082987383853],[2.8198502647929,49.087367188293],[2.8090528505052,49.097537605404],[2.7918697099795,49.090226188638],[2.787073783912,49.07527418833],[2.7604244593128,49.06296236294],[2.7350099332564,49.060452516659],[2.7324165014354,49.069856383944],[2.7204862280103,49.074886920193],[2.7061794650059,49.06530744517],[2.6909952426863,49.066575827238],[2.6921954156417,49.072098782916],[2.6848013380994,49.081070149491],[2.6676934960697,49.092495236068],[2.6332770991263,49.108372635105],[2.6205306041593,49.095141144665],[2.6103345312027,49.09494039704],[2.6072121818235,49.089061593648],[2.5905283926735,49.079653961607],[2.5833038141204,49.080706309944],[2.5786858654184,49.091952842127],[2.5581755098966,49.098381756011],[2.5520149054273,49.113947081753],[2.5561550654469,49.118627938332],[2.5408087122315,49.122242313794],[2.5329944482474,49.119245162084],[2.5310585957685,49.099597191318],[2.4899295573932,49.106359373937],[2.5020961933805,49.118887475459],[2.4992321189629,49.122269747269],[2.4817070713716,49.126919463544],[2.4615068862157,49.135936921998],[2.4354018020913,49.133939040206],[2.4409039786288,49.14580411257],[2.4153544805398,49.151762413963],[2.3912847262891,49.1493504084],[2.383003341928,49.155913004846],[2.370937678429,49.159173609651],[2.3592998527471,49.147343950086],[2.3462625342946,49.161815854345],[2.3222626753655,49.180859736345],[2.3109304401404,49.186404768181],[2.3011998615285,49.183887047533],[2.2994229533516,49.17583535835],[2.2888064839605,49.170710377425],[2.2862682227562,49.160277559835],[2.2695453788487,49.156306628677],[2.2622091200851,49.158297463054],[2.2524813607229,49.152881479913],[2.2230049777895,49.151869445673],[2.2163546658105,49.154378017348],[2.2354095182703,49.167035850124],[2.2186458815721,49.180685270888],[2.204958905762,49.174316445929],[2.1819527991076,49.173675958457],[2.1642743368285,49.166004802028],[2.157743439339,49.172599185593],[2.1645707336419,49.179671393215],[2.1327402600127,49.191379169415],[2.1133369040576,49.186543761789],[2.0968798927064,49.189757147704],[2.0915398506152,49.204360444701],[2.0808850919985,49.209773929407],[2.066842351201,49.202860855132],[2.0380917348167,49.192136044555],[2.0217858750717,49.188671770161],[2.0045021739488,49.177609556506],[1.996823915181,49.176453415327],[1.9734431640564,49.18389441504],[1.9607171629873,49.173517298241],[1.9480171420872,49.170749195544],[1.931476176782,49.17416772145],[1.894536229716,49.166040538631],[1.8852348791181,49.162636028533],[1.877042152092,49.171448857663],[1.8455433838221,49.169896687357],[1.8370818782543,49.171698986367],[1.8265758315348,49.179516758866],[1.8143979645085,49.176162362964],[1.7954740881562,49.18526277584],[1.7909791787819,49.179854330047],[1.7775554860529,49.184104883007],[1.7551705903258,49.174545969477],[1.7421415990654,49.180151725276],[1.7374357068856,49.194603115202],[1.7258249045161,49.195712707137],[1.7155761288215,49.203118037941],[1.7230394537953,49.20967924589],[1.7336823766846,49.210958623685],[1.7341091784733,49.221277890399],[1.729662120604,49.22919730317],[1.7043588288241,49.232197221792],[1.699042864415,49.234864303276],[1.7014183926808,49.252460272045],[1.7104820360249,49.264465989242],[1.7547213954529,49.270007807429],[1.7643549601555,49.263082374151],[1.7668935671793,49.252034345086],[1.7895339086741,49.247870747839],[1.7918059477748,49.256427629819],[1.8026740663848,49.271947858898],[1.7932298788283,49.274330698204],[1.796488015906,49.284111717893],[1.7756247174004,49.29969367954],[1.7676000740408,49.315889978292],[1.7727704938425,49.333136370328],[1.7576982127616,49.356710604078],[1.7594132403395,49.36814533573],[1.747580532548,49.37311965741],[1.74121389808,49.381720558637],[1.7203128039946,49.39483019677],[1.7401057248725,49.405314790651],[1.7139306567281,49.409224915677],[1.7207550257388,49.421790744656],[1.7227989638177,49.433057939568],[1.7325062090143,49.440346816415],[1.7375744776703,49.448744348943],[1.7512558538526,49.452315507953],[1.7477144178281,49.459538435118],[1.7663409121222,49.466149422943],[1.7758155194349,49.475733185704],[1.7741026603547,49.484110404638],[1.7874800747665,49.493410636962],[1.79022549105,49.503468309638],[1.7718616459246,49.512848245546],[1.7579593630441,49.508955782237],[1.7437037722862,49.495260515275],[1.7387428193977,49.499646659524],[1.7254532581616,49.499781817922],[1.7192339956449,49.508224831919],[1.7309415306325,49.516127433413],[1.7451293471854,49.531735853612],[1.7446099134771,49.539601433398],[1.727181881084,49.541625548343],[1.7296224523484,49.561514722426],[1.7147772726003,49.576403299976],[1.7216170199559,49.588805803542],[1.7094013142782,49.586713688098],[1.7079026298891,49.59512101877],[1.6951880268931,49.599725188693],[1.7045833964597,49.60539714358],[1.7216033847573,49.621992077342],[1.7172522158626,49.633071609694],[1.7046286111408,49.639706031745],[1.7034537142049,49.645178379124],[1.72256553641,49.661514170983],[1.7251990095943,49.672636996929],[1.7521845944048,49.680960782507],[1.7506387449271,49.693804769865],[1.7375343076769,49.700350145116],[1.7214282927506,49.691450681445],[1.7177073271231,49.684373173475],[1.7045184506731,49.68092815534],[1.6895744511517,49.694787428191],[1.7119859825186,49.707713850498],[1.7151877298233,49.712819627841],[1.7121688003106,49.731959147918],[1.7232343899458,49.730085190671],[1.7409502199257,49.738588067086],[1.7416291636029,49.751631106006],[1.7471451565537,49.757054329335],[1.7838342426767,49.758309270134],[1.7844715649337,49.763592975395],[1.7728042654107,49.77686925316],[1.7579284899296,49.780795399895],[1.7544750364007,49.790629917937],[1.7373867941575,49.808209452072],[1.7270527964865,49.828882279702],[1.724683271591,49.845733284166],[1.7195139243408,49.85406661499],[1.7187325614081,49.865708141834],[1.7117443909555,49.87371820092],[1.7124562091314,49.886444322648],[1.6932946158985,49.895601909585],[1.6784507673607,49.918130568802],[1.6182113660007,49.937822139755],[1.5940092903756,49.949050560009],[1.5738903148936,49.973921649667],[1.5582578959792,49.979389381286],[1.5465597760538,49.987581734127],[1.5270192186573,49.996530516122],[1.5180154200133,50.00910228757],[1.50103897683,50.018915984928],[1.4933105925107,50.017740486409],[1.4734926140971,50.033599846345],[1.4564566095824,50.037832374442],[1.455286116297,50.056298876577],[1.4591516246417,50.062494643478],[1.4464534693489,50.069324171563],[1.4235940727692,50.070851596042],[1.4088347782602,50.057247377816],[1.3924400221587,50.060056426893],[1.3796981484469,50.065011890414],[1.3926951404215,50.075508103188],[1.4326447913126,50.094349140281],[1.453882566018,50.110330912339],[1.4680459164898,50.139076728869],[1.4787103407902,50.164913871979],[1.4916774164956,50.184158850335],[1.5124437978409,50.201705539893],[1.5484363732305,50.215217479179],[1.5596528651115,50.210793191325],[1.5742402203094,50.196012165606],[1.5961920997106,50.185502423396],[1.6115742742922,50.191033491192],[1.6274144143455,50.190005124318],[1.6733457641263,50.174680696998],[1.683793928232,50.183026098336],[1.6708368854438,50.194260444795],[1.6696347125474,50.205895817898],[1.6626657206518,50.213594131613],[1.6392011577592,50.217276772482],[1.6225007114324,50.215151972316],[1.5920617370787,50.248546445422],[1.590272985914,50.255949292147],[1.562292530548,50.255765909795],[1.549313280898,50.260403925768],[1.5403360598397,50.273870926874],[1.5379421306702,50.282668408098],[1.5509359402445,50.350318813543],[1.5558295005084,50.361315709087],[1.5713313280132,50.35845215301],[1.612966033514,50.360292820052],[1.6242577191597,50.366290636763],[1.6339779035367,50.355381211519],[1.6415398327353,50.352148667835],[1.6313872914825,50.36008632241],[1.6252312966713,50.371832567005],[1.609294107413,50.370743587316],[1.6001281982125,50.3777199452],[1.5846837792851,50.376382884213],[1.5703000307947,50.392158393497],[1.563294790003,50.394950334151],[1.5577948179294,50.404714412055],[1.5634107613097,50.418460574304],[1.5691068767694,50.440882836463],[1.5770036622248,50.493788201491],[1.577419530273,50.516533642344],[1.5854092273894,50.537352408548],[1.6267556408457,50.521386133981],[1.6192946160483,50.535275013384],[1.6084280327721,50.540109583469],[1.6000968934514,50.549488993972],[1.5812683008538,50.56276958757],[1.5766037238144,50.572223225221],[1.5776855393668,50.579872832517],[1.578417453812,50.640285448716],[1.5720971666289,50.664196329528],[1.5624650705923,50.687457544808],[1.5607073853506,50.699672766378],[1.5736037455337,50.716166202188],[1.5627006546685,50.724987440831],[1.5841273301918,50.731155421742],[1.5905216325015,50.729795719211],[1.5960008708105,50.74619627021],[1.6043933167393,50.7628298425],[1.6042092031199,50.791871277165],[1.6106406418335,50.803762099322],[1.59968410858,50.805849583644],[1.590153572682,50.825395303048],[1.5833136380965,50.8457034659],[1.5779419504031,50.853333808739],[1.580632768506,50.867343830504],[1.5887300407704,50.871669803792],[1.6016621961931,50.871163999157],[1.635804198092,50.876984561631],[1.6641002886514,50.890134303575],[1.6925371850157,50.915373472941],[1.7122611515718,50.929408873362],[1.7288559802086,50.937892541353],[1.7807166589725,50.954865814239],[1.851150647352,50.965664502203],[1.8527009274535,50.970956150804],[1.871165789111,50.974935769432],[1.8896938932734,50.972314506334],[1.915779044375,50.984087355938],[1.939240821017,50.987858664569],[1.9598449752902,50.987202834418],[1.9927371149402,50.993728633123],[2.0395672744245,50.997310813057],[2.0477184398862,51.002860879522],[2.0677049871716,51.006501514321],[2.0845036256491,51.008606935608],[2.1097045642696,51.003827598587],[2.123515723481,51.014167524083],[2.141504907246,51.022058874598],[2.1673459399511,51.020738207739],[2.1794228227752,51.015102619912],[2.1925606242518,51.027436640575],[2.1918294890846,51.034714947113],[2.2140013975448,51.031681877805],[2.2590224218691,51.043489703657],[2.33185815699,51.056055745767],[2.3478325752445,51.059829634673],[2.3666467120992,51.051919789329],[2.3782653998463,51.049621895931],[2.3995855035021,51.050957305507],[2.4247543344414,51.055621633327],[2.493466611121,51.073071375079],[2.5430346061346,51.08854370897],[2.5463210173049,51.088403186427],[2.5599258259302,51.068918893476],[2.5759795456357,51.013756325485],[2.5739982943322,51.003521991804],[2.5828043639126,50.997122436344],[2.6012847777962,50.991283503211],[2.6105921963125,50.976188347149],[2.6326801578862,50.946008766454],[2.618276709243,50.938761685952],[2.5902216021403,50.919275360805],[2.5940974354529,50.914372170977],[2.6075324528985,50.91240659974],[2.606318820361,50.899326241848],[2.6071625262549,50.873044043565],[2.6103262931744,50.86206244973],[2.5995904644573,50.853332534722],[2.62561536399,50.836560386715],[2.6272629250997,50.82765105936],[2.6349756592043,50.812755500853],[2.6588971217623,50.814991778582],[2.6690258101157,50.822462129386],[2.6862350086644,50.813429813967],[2.7174754083298,50.81360682515],[2.7256398356216,50.808632188358],[2.7219265518167,50.80159438836],[2.7267028013485,50.792383411441],[2.7375118592303,50.78266728319],[2.7621515823535,50.770756585159],[2.7584298773759,50.762930766426],[2.766042090907,50.754519108704],[2.7819457247827,50.75109080132],[2.7867390132952,50.73381741121],[2.7956557413456,50.724609008419],[2.8132739834573,50.716945833429],[2.8483860974407,50.722914959975],[2.8547299617705,50.714708513206],[2.8701715745294,50.702911374608],[2.8856496977648,50.706611021367],[2.8983786417092,50.694238803855],[2.9109065606969,50.694496081053],[2.9115936515323,50.703838778555],[2.9223300662476,50.702801451402],[2.9307796391097,50.716242999992],[2.9298687861194,50.722758772582],[2.94083706877,50.733174957645],[2.9380690677647,50.744343927761],[2.9582403353503,50.753446186612],[2.9696585316524,50.749612772394],[2.9810878439876,50.756657678787],[3.0120929242906,50.769111505719],[3.0352750082458,50.770239418325],[3.0408824825472,50.775687536871],[3.06137703349,50.78050174847],[3.0798956714209,50.773020869115],[3.0886989124978,50.773371114027],[3.1067964329954,50.783860810329],[3.1147669732972,50.794187883435],[3.1249879535977,50.786437758612],[3.150782780111,50.790127285347],[3.1520005085792,50.782343293233],[3.1927531897582,50.738373224845],[3.199134285231,50.734731836468],[3.1912265002692,50.724409127208],[3.2040720746712,50.719906646456],[3.2155072743961,50.712360639713],[3.241487162382,50.712571336251],[3.2583766477988,50.700646817566],[3.2601205467889,50.693081234565],[3.2548022328174,50.686810753613],[3.2624274548591,50.678483478988],[3.2445871588055,50.670121319421],[3.2411021613015,50.657785417847],[3.2485035849353,50.638041219835],[3.2590208715028,50.630050536375],[3.2612681066709,50.618847521451],[3.2702967597615,50.610812998689],[3.2775041513186,50.592959787705],[3.2761648131069,50.581684874378],[3.2817196163381,50.577326666545],[3.2759630544617,50.55853838771],[3.2801733532291,50.541649764418],[3.286524369777,50.527577616965],[3.3076292824013,50.519351863345],[3.323616112777,50.515711801855],[3.3288583317067,50.50812409632],[3.3373216704386,50.508504351312],[3.3626639420755,50.503101853968],[3.3738958439101,50.491827615781],[3.3892974635465,50.496497126168],[3.407610572795,50.499030496362],[3.4322501535667,50.507122357013],[3.4500814758008,50.507357727388],[3.4537383652366,50.519240260247],[3.4739635797806,50.533563546234],[3.4879746720951,50.52951223764],[3.5037708157723,50.529588132251],[3.5194053990883,50.522871548274],[3.5150527088294,50.511939927188],[3.4963266702785,50.498685062833],[3.5007741945714,50.487265476296],[3.5260686365645,50.494642317404],[3.5677678220335,50.50061221444],[3.5853427353378,50.490537930282],[3.599870886857,50.493844386319],[3.6130169489409,50.492471225596],[3.6321845132975,50.476505259546],[3.6436495207902,50.463210909782],[3.6559966661463,50.461231295862],[3.6642184659463,50.453173761167],[3.6601071896526,50.444370502961],[3.668845812022,50.436854602212],[3.6737092904608,50.404244897722],[3.6723742999474,50.387652477303],[3.6582667947641,50.371343895257],[3.6672786748469,50.360267800167],[3.6673721160869,50.350556515727],[3.6738427984215,50.342705763301],[3.673675944671,50.334926016155],[3.6936219005906,50.322150381532],[3.6944326025128,50.31582844934],[3.7104309751894,50.303169731959],[3.715608900178,50.312633964487],[3.7317343457441,50.311904528305],[3.7300326908857,50.323304085674],[3.7362234073766,50.343257031302],[3.7474052053778,50.350928242159],[3.7637003867935,50.348299279201],[3.7681168487951,50.352409081215],[3.7987851177737,50.351332715036],[3.8136651517092,50.353164952183],[3.8213860471348,50.34573984572],[3.8297546113897,50.352692404719],[3.8527555972491,50.351593778606],[3.859478039848,50.342899076611],[3.8722862224421,50.337941906562],[3.8884496083778,50.338223421367],[3.8897942621496,50.329975796406],[3.900403191897,50.327566131768],[3.9144701316434,50.330369968091],[3.9678985736842,50.350369100061],[3.9844697338671,50.341952511071],[3.9939041267958,50.348610880809],[4.0151639433994,50.351813784602],[4.0273772077583,50.357488651634],[4.0376171727107,50.342950902805],[4.0488085710308,50.339599664463],[4.0781900466276,50.320551562698],[4.0788865919897,50.309752500483],[4.0971684837089,50.313208013214],[4.1129089634483,50.302069970791],[4.1199595939074,50.300055788038],[4.1259410717892,50.286248262682],[4.1243582297602,50.27361214025],[4.1366519411801,50.274295837487],[4.1362790115355,50.256814562298],[4.156126246964,50.256602008528],[4.1676077441772,50.259698659168],[4.168471823828,50.266121912654],[4.1511739326664,50.278121082001],[4.1626744412235,50.288919839989],[4.1766755914931,50.284428214863],[4.1812834659039,50.274457878757],[4.2032487281264,50.274520097558],[4.2218515438762,50.256954384753],[4.220693486293,50.252205490042],[4.2042939009819,50.240013765122],[4.183902128366,50.232827043151],[4.1719488669029,50.218984966036],[4.1507645008475,50.213105993648],[4.1601187752999,50.202535082465],[4.1539072088435,50.181618869284],[4.1493941237622,50.174782630132],[4.155121374967,50.166769949356],[4.1482848043049,50.158154635639],[4.1377525142419,50.151611885511],[4.1269212643952,50.1350091215],[4.1437071184687,50.129042962388],[4.1524471048199,50.128949591969],[4.1575165386038,50.13552668129],[4.1798368402129,50.133557548619],[4.1916907010978,50.134590962587],[4.1998869422006,50.131081113334],[4.2031708176335,50.114887331607],[4.1975019481259,50.109173730897],[4.2014079092014,50.101540479066],[4.2164449121556,50.091114252843],[4.2275402024598,50.079679049395],[4.2279959931456,50.066368977978],[4.1910964802776,50.049491958302],[4.1774115449025,50.045996982435],[4.1622238052451,50.04898215278],[4.1363736079231,50.02046124405],[4.1354830598469,50.015042091472],[4.1456765100433,50.003909005549],[4.1617434156239,50.000912769341],[4.1577077947817,49.988248872528],[4.1408937784816,49.978756019427]]]},"properties":{"code":"32","nom":"Hauts-de-France"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[3.4147888224632,48.390268550005],[3.4220792964886,48.413341016525],[3.4136232739227,48.414339744235],[3.4118359218741,48.421315638566],[3.3919585015834,48.424317659764],[3.3969885214937,48.434567766893],[3.40356672054,48.438738834692],[3.4064837519344,48.45245201333],[3.3964392758484,48.463728690957],[3.3883584814447,48.480409204068],[3.4203545971629,48.491547248944],[3.4346387383078,48.490251682592],[3.4239142947726,48.514360214193],[3.4053967325678,48.528014902933],[3.4142391071512,48.533468273095],[3.4234477695307,48.533559074894],[3.4382278519026,48.52833381057],[3.4591848626137,48.530740265696],[3.4796007670225,48.544709319952],[3.4797700428722,48.550623337178],[3.4722961348839,48.564913176785],[3.4655215727904,48.570484758136],[3.4733827141903,48.576873863934],[3.4852747034173,48.580426868353],[3.4975057114927,48.589954752513],[3.5158639136582,48.589782150903],[3.5038548704771,48.604807329745],[3.5346181421224,48.61035282902],[3.555613758785,48.620285576065],[3.54590310832,48.62806547987],[3.5190643678345,48.633470112339],[3.517498400146,48.643365240313],[3.5031842529874,48.645682506087],[3.4881941587649,48.644795887875],[3.4765733783329,48.637329365265],[3.4531162175594,48.633955984329],[3.4604317354595,48.653009078358],[3.4408489379625,48.66307286353],[3.442691260176,48.672503410154],[3.4545564374114,48.682119139778],[3.4658318000834,48.68619250912],[3.4769690535178,48.699355347111],[3.4643082791983,48.707378088042],[3.4674670222781,48.735224220894],[3.440606129229,48.738701946832],[3.4358103469779,48.753571711386],[3.4256695187547,48.755689536249],[3.4129613380945,48.753902050854],[3.398657955437,48.755599281994],[3.4008409030783,48.767256400859],[3.4094228096892,48.783835572028],[3.4282111529646,48.77948500421],[3.442160723333,48.784353883555],[3.4412895824977,48.800919300185],[3.4104778884203,48.803943061752],[3.4041649646308,48.80927626878],[3.4166176467147,48.817828781451],[3.4321664968613,48.812257770946],[3.4544121814945,48.813840024336],[3.4703815627087,48.8208976637],[3.4809287140503,48.81218578416],[3.4872017702391,48.815190371551],[3.4849684486637,48.825009748881],[3.4895742506519,48.839868156733],[3.4851833721947,48.851910309574],[3.4824053162481,48.864936735752],[3.5021501743028,48.871150830362],[3.5130610888281,48.894727857657],[3.5285709402165,48.912136556763],[3.5600217013966,48.917012631384],[3.5698140355022,48.914705628852],[3.5738483617762,48.921481440361],[3.5744445323994,48.939019123403],[3.5888878773911,48.943911238057],[3.6015957850168,48.944073853473],[3.599065082592,48.953591820396],[3.5915529898914,48.960375393399],[3.5991756397826,48.964609029368],[3.6206544521613,48.965944000018],[3.6245368960791,48.983751500727],[3.6398926774554,49.00408594583],[3.6651641207485,49.00563190452],[3.6749656325958,49.01172340253],[3.6774822917619,49.019164672527],[3.6639547486924,49.037308063462],[3.6463115589695,49.040590166906],[3.6168408971943,49.03648384631],[3.6150194069679,49.033500653248],[3.5866997575834,49.035795925017],[3.5877081614204,49.059394624683],[3.6121535124357,49.073560405492],[3.6237954864751,49.07086508435],[3.6328719662821,49.072789507462],[3.6390507423115,49.081304273735],[3.6323412082709,49.086509017267],[3.6200761430148,49.107193914382],[3.6000114843908,49.120690012831],[3.6103949951775,49.127543924136],[3.6222521277141,49.151105463129],[3.6468735208387,49.149122623512],[3.6718043158638,49.150635019402],[3.6838376358892,49.154490943481],[3.6980322212385,49.149827639227],[3.7016210668145,49.143083232127],[3.717012841182,49.147040324959],[3.7395699991233,49.156933396134],[3.7487678456403,49.157085133246],[3.7511423125744,49.177699202357],[3.7372236091373,49.177961424911],[3.7254385553209,49.173515978138],[3.7043892552675,49.181369443488],[3.7005485386662,49.187713241443],[3.7048747423107,49.198590103722],[3.6971034744514,49.205472659609],[3.6839084510227,49.197534060825],[3.6817942876508,49.205339977618],[3.6584058277856,49.211000985544],[3.6516085786612,49.221427253663],[3.6650221926501,49.223221302369],[3.6763725147129,49.23836076616],[3.6707785326799,49.239600299061],[3.6637955993399,49.253525125811],[3.6552490233788,49.262847772673],[3.665132135016,49.269657535247],[3.6516094181931,49.278360707849],[3.65731758003,49.291021541771],[3.642801871342,49.296041342828],[3.6383343630554,49.301354552133],[3.646957318637,49.315152582535],[3.6601616875884,49.318370386543],[3.6703327730544,49.325093317382],[3.6891002697559,49.326851228803],[3.7012926310034,49.332508221298],[3.7216167324835,49.335726303503],[3.7422206958499,49.336511221485],[3.7410811711412,49.347585887018],[3.757818074306,49.347604354229],[3.7744622374234,49.354639933222],[3.7824442652216,49.352774492617],[3.8015158122099,49.358931233427],[3.8237576514434,49.356987454563],[3.832778633819,49.350261851859],[3.852156449301,49.344654924149],[3.858709482185,49.353737278746],[3.847475808218,49.364589335554],[3.8573468410854,49.369945638107],[3.8591446800636,49.381351797144],[3.8787822154646,49.385857165921],[3.9150740342564,49.399385348956],[3.9244391664348,49.406179032892],[3.9318314213659,49.403084958448],[3.9424137621592,49.391461051265],[3.9613104389204,49.377346727516],[3.9913652648133,49.378222344205],[4.0051087823761,49.369208523497],[4.0127326189721,49.358302701884],[4.0354977852679,49.359905945249],[4.0399063933123,49.397393331324],[4.047974391829,49.405644080344],[4.0502747365168,49.412260783575],[4.0422957368009,49.416650795955],[4.0431448752397,49.429325986342],[4.0376689955921,49.438263004999],[4.0500241066599,49.445792451369],[4.0602468457773,49.447151466107],[4.0529144654974,49.460257089671],[4.0423746855064,49.468690509147],[4.0407061703752,49.50853200863],[4.053158610381,49.50864470004],[4.0618580428951,49.512563145954],[4.0566240283661,49.521046840185],[4.0650976973335,49.523284436368],[4.0758354322042,49.518345118497],[4.0767490566918,49.531314775054],[4.0738006912951,49.541617642486],[4.0487683371061,49.545272613584],[4.0582914969504,49.552548182169],[4.0647940705926,49.562212345669],[4.0765722336699,49.57112568919],[4.0627821408209,49.573556972194],[4.0595605382919,49.578709772836],[4.065110143114,49.594908552638],[4.0541912133221,49.595288700911],[4.0313962718463,49.614287229711],[4.0252899216328,49.62252962525],[4.0379111248697,49.622918577627],[4.0432501448672,49.6361455878],[4.0511107039532,49.634644480527],[4.0695561865706,49.636751879497],[4.0993133133426,49.628479985907],[4.1147910874013,49.635304817786],[4.1254660330069,49.650608155401],[4.1223323319077,49.659520506862],[4.1270270054568,49.677917606181],[4.1475377596226,49.678019756234],[4.1441873561823,49.688543920373],[4.1783005290521,49.698036101434],[4.1920358906093,49.710905599545],[4.1926293949408,49.715800885171],[4.2064629076853,49.723538323397],[4.2247072679536,49.727198714419],[4.2290201625555,49.745744739695],[4.2500943395752,49.757098850356],[4.2382185523689,49.767642716303],[4.2266193641282,49.773087602827],[4.2142637924854,49.771267691897],[4.2095884562322,49.781777002902],[4.2224308204953,49.786967474101],[4.2270460920968,49.793183108192],[4.2147724033566,49.806110108269],[4.21989152014,49.815134132001],[4.2234884321126,49.83376467914],[4.2366221851606,49.849699207378],[4.2485056451169,49.856518172527],[4.2530532522095,49.872272130792],[4.2540638814402,49.904004764573],[4.2332446058305,49.904304609803],[4.2221391301616,49.910422069675],[4.2187089162197,49.920686498287],[4.2216024803296,49.937902313306],[4.2303959475263,49.947204968202],[4.2330628764399,49.957824711709],[4.2543844268894,49.963631572174],[4.2912940079087,49.964058971117],[4.3014826951044,49.966176318126],[4.3336522040504,49.963560746982],[4.3497118423918,49.952178234237],[4.3768351947882,49.952426776681],[4.3893549519505,49.948471550376],[4.4040767168602,49.949066249233],[4.4384321997593,49.940983017693],[4.4469381022162,49.937508219405],[4.4816075926688,49.947850133409],[4.5104090412086,49.94668310443],[4.5268882654673,49.955655131433],[4.5379600686649,49.966578753488],[4.562760480326,49.969878068755],[4.5737037707612,49.980303220057],[4.5930582012037,49.985505370138],[4.6234910262232,49.986514367297],[4.6718734438468,49.997042353417],[4.6888729975296,49.99550012591],[4.6851735062023,50.008022811301],[4.6855679524785,50.027630172966],[4.6964968238826,50.048065555594],[4.6959001788656,50.059078634975],[4.6831845410969,50.064918750085],[4.6930262279408,50.084818698216],[4.702082951479,50.095527943315],[4.7516371956114,50.112096179533],[4.7621611459353,50.136395161183],[4.7797569187354,50.141423325848],[4.8060299652994,50.152928502564],[4.8225821967951,50.168317417174],[4.8242908682916,50.160729654086],[4.8319939129987,50.153954420888],[4.8795586056388,50.152031455312],[4.8823453724974,50.14107993006],[4.8949695160522,50.140358533811],[4.8948873702986,50.134603452171],[4.8777264037364,50.129652324419],[4.8706357641482,50.124646439548],[4.8684744101123,50.116644777365],[4.8732123209519,50.106964035761],[4.8685258721021,50.097622646189],[4.8512334054671,50.101365762653],[4.8435535797063,50.093372937943],[4.8428707035034,50.077477843885],[4.8379348636099,50.067107469075],[4.8193112936247,50.065876763524],[4.8269925484463,50.052897786762],[4.8408180239435,50.045906327693],[4.8403927713466,50.037589003447],[4.8219880629777,50.027412758579],[4.8159415189027,49.997896526955],[4.8110027580392,49.987971684423],[4.794698989736,49.978299033895],[4.7901082811856,49.970018583443],[4.7909101015257,49.958397607379],[4.8149651624191,49.95406557034],[4.8294146767334,49.949216811425],[4.8393316997629,49.950755525407],[4.8501867463093,49.946472183139],[4.8581281971305,49.93289732385],[4.8813667911683,49.921507940837],[4.8876674649878,49.90625840031],[4.8833077168313,49.896180747091],[4.8692226992226,49.883673952197],[4.8621352372787,49.869183589271],[4.8541885068293,49.864788994801],[4.8517209454791,49.856206959432],[4.8554596773055,49.848133613298],[4.8675765193083,49.840075948112],[4.8738789972466,49.820795895287],[4.8670886259725,49.814194172037],[4.8553769519334,49.792361619124],[4.8622979513047,49.789221252237],[4.8809506209952,49.792325737532],[4.8875425422306,49.788171662915],[4.9102925994326,49.786100854737],[4.9309281605517,49.786852475693],[4.9561280722759,49.801228329118],[4.9988354545104,49.799310967803],[5.0089296334883,49.781937129687],[5.038248102836,49.771525570008],[5.0568010186231,49.767535269907],[5.063178302851,49.761924291203],[5.093500464756,49.763726941381],[5.1150746404809,49.741436226312],[5.1246896996546,49.727395536304],[5.1230703404202,49.717305567328],[5.143638993168,49.709300418645],[5.1533130431568,49.718376209895],[5.1615689619341,49.714805281588],[5.1658552238469,49.707139109792],[5.1662014036773,49.692914558036],[5.2066035044019,49.693600820549],[5.224566521714,49.689429173903],[5.2324451768337,49.690737513629],[5.2474131522102,49.686990389293],[5.2580461992444,49.694260798854],[5.2691845901837,49.696071670408],[5.2807611147651,49.689032466702],[5.2865633840877,49.681818441276],[5.3087401102806,49.67122355633],[5.3327639081107,49.652787613834],[5.3169728483899,49.643830993309],[5.3046743423384,49.629430201402],[5.3117321993999,49.613546516808],[5.3397669126158,49.616560947097],[5.3429882085979,49.62674042769],[5.3503363217496,49.630862526305],[5.3699196598296,49.622570862025],[5.3935393812988,49.617086785829],[5.4269132757795,49.597344909551],[5.4379714887151,49.569737286799],[5.4535526093259,49.564921488307],[5.4415639023972,49.552225052944],[5.4650619164038,49.538862640494],[5.4663281735759,49.528430189479],[5.447578521257,49.517372874597],[5.4647324749065,49.505819945807],[5.4709047865596,49.497208726991],[5.4801260050649,49.5042048476],[5.505773753281,49.507560932221],[5.5327282010479,49.512980369896],[5.556050367567,49.52925089646],[5.5934514158621,49.521909724278],[5.6002800743504,49.517481440665],[5.6036245138856,49.508662087223],[5.6115035973004,49.506452254144],[5.6213594702283,49.519543514982],[5.6159222684657,49.527126195574],[5.6203426845973,49.533164237559],[5.6368006429332,49.545044778804],[5.659773917278,49.552868947481],[5.6940713831155,49.544034542904],[5.7012603687509,49.539519718091],[5.7152828377125,49.539335201991],[5.7325199993123,49.544461313993],[5.7388640222945,49.539320264271],[5.7573750958904,49.542824262522],[5.7561520187018,49.557012366016],[5.7752184924057,49.562644003065],[5.7939345464924,49.551240108366],[5.817598826725,49.54647885103],[5.8192303780619,49.537378081769],[5.8369587698802,49.542475474291],[5.845880698823,49.529954308627],[5.8344148247219,49.52630284488],[5.8437151332678,49.516116312314],[5.8624510369037,49.501642325338],[5.869086517445,49.498778421143],[5.8934039932125,49.496912378689],[5.9131228430979,49.501930487596],[5.9275784580358,49.498222137522],[5.9399396363651,49.500973515404],[5.9543549817944,49.494028742166],[5.971776634974,49.491320067133],[5.9719898548951,49.472772002285],[5.9786602517285,49.461213469236],[5.9876579090328,49.462416479402],[5.9889818118401,49.453330179107],[6.0020130392406,49.455793300138],[6.0091636987779,49.452599066022],[6.0276447821787,49.455537293057],[6.0278782998684,49.448439296043],[6.0423723359911,49.447931072295],[6.0556220526452,49.465361612667],[6.0767052592775,49.46365936715],[6.0812989556481,49.458562227473],[6.100815774202,49.452882062635],[6.0978706962197,49.464052470472],[6.1020780284711,49.470224838021],[6.123492261297,49.473753515732],[6.1276565854344,49.492885551721],[6.1438043282733,49.487268725521],[6.1569057576806,49.497456281788],[6.1568855820521,49.504390732514],[6.1807922123531,49.507740334246],[6.1972680839746,49.505966578682],[6.2564100413301,49.510019040716],[6.2624116466706,49.504724182106],[6.2790979434498,49.503352708062],[6.2801065837471,49.494398595906],[6.296575175601,49.480106832386],[6.3124934980479,49.480320202438],[6.3328228233983,49.469493947419],[6.3424701827187,49.469156069631],[6.3643965239711,49.459484546704],[6.3666661689717,49.466918673264],[6.3919596630846,49.464460320335],[6.4076179611636,49.467512030949],[6.4190855362062,49.474939817898],[6.4301197078959,49.476400021233],[6.4395895671046,49.467281846999],[6.4700838654605,49.462767275295],[6.4848977061868,49.452470714368],[6.4976632893167,49.450631546424],[6.5211006756686,49.437323933302],[6.5329615902039,49.435378532848],[6.5522345196475,49.423348210636],[6.5543620111982,49.418383989553],[6.5387980688369,49.412379406349],[6.5405242817617,49.401146060427],[6.563422078373,49.388145785152],[6.5735876662047,49.389262822438],[6.5870798611261,49.384936563478],[6.5838802640069,49.368622950588],[6.5943948345255,49.371471620308],[6.6018563427332,49.366781011608],[6.5901277643478,49.354745146744],[6.5746297463216,49.358198402077],[6.5647703710395,49.353135042025],[6.5658428249466,49.347352742548],[6.5775969804184,49.335791607751],[6.5854756155499,49.336044725988],[6.5955861357867,49.330270386186],[6.5890778127358,49.321999253582],[6.6175388153446,49.302170593505],[6.6253921808815,49.302190458195],[6.6514018837136,49.285835177653],[6.6532277371416,49.281116548287],[6.6691862190043,49.28060241979],[6.6678733285273,49.271339809982],[6.6603276651427,49.260969691767],[6.6644435280076,49.254561265753],[6.6780682329599,49.255060668414],[6.6905439593201,49.247633562325],[6.6850959557718,49.243739619385],[6.6895788875244,49.23533441597],[6.6881350897594,49.224445656782],[6.6948030976287,49.215906501206],[6.7196514167899,49.221375153791],[6.7314966006431,49.20608920408],[6.7113631909174,49.188538133309],[6.7209675062078,49.174994832853],[6.7385082593927,49.163661266785],[6.7538830937062,49.166177108553],[6.7845561626242,49.168086631556],[6.8345431950591,49.151466537904],[6.8438548055183,49.15565290074],[6.8472694874904,49.173487755725],[6.8609474837466,49.178714159357],[6.8586496056677,49.185917677931],[6.8501173934685,49.193288221075],[6.8521803808921,49.198655232881],[6.8353839856274,49.211325473776],[6.8574425399538,49.22227794129],[6.8713243769655,49.215472554027],[6.8941557656397,49.210197254284],[6.9274131306062,49.22252636726],[6.9354186816977,49.222156163157],[6.9517226192342,49.207276845843],[6.9592812915983,49.203004868528],[6.9746332903262,49.209818267623],[6.9915096208719,49.201388059087],[7.0107084883023,49.18812033997],[7.0213917004814,49.19318400175],[7.0343248906795,49.189680638467],[7.0276496496344,49.170085953929],[7.0316782380222,49.158253423186],[7.046140831118,49.138567199151],[7.0446219986815,49.121956113571],[7.0497586225268,49.114534084003],[7.0660953113297,49.114582077807],[7.0719376289158,49.124748468913],[7.0888751761417,49.130224426302],[7.080281154448,49.148775932362],[7.097848351075,49.155036981759],[7.1132659041816,49.151694619011],[7.1040602508156,49.146084305838],[7.1048549037238,49.13866216876],[7.1264458967451,49.141725132417],[7.1315891478523,49.131823319707],[7.1567251793676,49.121307004318],[7.1632202862747,49.126662546105],[7.183939320312,49.130726755298],[7.201238747366,49.116722335367],[7.2066365546017,49.123479912557],[7.215896311218,49.125515370531],[7.2477915881698,49.127982310796],[7.2663442843038,49.122591822505],[7.2808871054318,49.124111468981],[7.2862671647554,49.117590655005],[7.2986472513209,49.11745641594],[7.3141283440236,49.137565746438],[7.3298410268211,49.14494179986],[7.3453334573199,49.143232164996],[7.3628465402247,49.14521647821],[7.36507550268,49.171836295674],[7.3813683009451,49.175274386224],[7.4450649197879,49.184305403345],[7.4399501767781,49.180796023353],[7.44067166015,49.170483311686],[7.4552262580683,49.166323401106],[7.4911929165521,49.169804496794],[7.4954431400151,49.156591826787],[7.5061698187802,49.154030900401],[7.4921500560289,49.141863362811],[7.5046995077445,49.124892105953],[7.5154385998767,49.121168712175],[7.5241643855785,49.105491018786],[7.5390064229804,49.092067833166],[7.5631836706272,49.080458461345],[7.570389598272,49.079863764095],[7.5999843985962,49.083327857216],[7.6311909357346,49.06938180187],[7.6352815933424,49.054164206261],[7.6744885818061,49.045042026719],[7.7073172414616,49.054054167764],[7.7235168959792,49.052567266134],[7.7322236434991,49.044355921307],[7.7464402457806,49.047183991579],[7.7564971746319,49.04559846504],[7.7699412681687,49.048752604766],[7.7761140800325,49.056208919534],[7.7930299497337,49.063494910346],[7.8004419678935,49.064114797244],[7.8203561465381,49.053762416992],[7.8445208331331,49.044968895008],[7.8554925156838,49.035415738102],[7.8687912381001,49.034158646571],[7.8816859515844,49.045192019191],[7.8916182565803,49.047594615956],[7.9166981594872,49.04096573662],[7.9346229019277,49.057811113571],[7.9450664235081,49.055272126791],[7.9473992180973,49.049180307495],[7.9673895507266,49.038891633851],[7.9748521290202,49.027746491985],[7.9819000059942,49.025893418758],[7.9991263159241,49.028129921868],[8.0227035606617,49.018324772576],[8.0480839535656,49.014172777638],[8.0671689833513,48.999497718891],[8.0913803067987,48.989259837789],[8.1213785685874,48.98536003174],[8.1414937386022,48.978017561341],[8.170147720846,48.979348008223],[8.1944015411941,48.97743000256],[8.1990893418219,48.967223546641],[8.2143424400211,48.975096459051],[8.2268223344758,48.974092891976],[8.2303986615424,48.965607843829],[8.2030347428027,48.959937315879],[8.1958012960897,48.95621138585],[8.1767812617108,48.932012053804],[8.1479387393441,48.903810890927],[8.1245755473601,48.870687777488],[8.1087697047883,48.836985966255],[8.1060606073282,48.823689761204],[8.0963232810048,48.810383594146],[8.0771060061123,48.79529933543],[8.0589448227056,48.788812962432],[8.0432668189723,48.790730127013],[8.0291352605611,48.786478892711],[8.022824712781,48.768352845058],[8.0147046028691,48.761181073583],[8.0049554561251,48.758781494258],[7.9817555144595,48.761013532829],[7.9717522881571,48.757631517371],[7.967222806413,48.745410899662],[7.9672574265548,48.727017790766],[7.9631443712693,48.721355620767],[7.8908881835121,48.663098534076],[7.8398216436445,48.64137741102],[7.8287156830025,48.617707542634],[7.8041684261793,48.59233381119],[7.8002369638938,48.578683608778],[7.8052303653608,48.562215004891],[7.8032686065062,48.53382105272],[7.8069547274248,48.522278404185],[7.8052011366022,48.513573048614],[7.7947080252984,48.502090987414],[7.7681925743495,48.489661466269],[7.7648837539549,48.456687845258],[7.7618878776799,48.448985237501],[7.735972029784,48.404161681857],[7.7318458832381,48.39290556989],[7.7320016795341,48.375407113123],[7.7450295673245,48.335662070435],[7.7398754620749,48.321749343082],[7.7332390210278,48.317791507494],[7.7031470724726,48.308812723211],[7.6960088664325,48.304010337634],[7.6893329145202,48.293283776555],[7.6889755135447,48.279872718204],[7.6678077852565,48.223906110814],[7.6645588474966,48.219142022716],[7.6440693964521,48.207227606933],[7.6311500892776,48.185415410472],[7.6011481776184,48.158377720127],[7.6006039800313,48.138845916373],[7.5970709855475,48.13314660244],[7.5828806945248,48.126528231256],[7.5773157720816,48.120371112534],[7.5799590690256,48.10602146786],[7.5774082960332,48.095951430851],[7.5692340186038,48.081401774521],[7.5738062890481,48.05303432392],[7.5684900054594,48.03538248569],[7.5716202896502,48.030376143149],[7.6054362344578,48.003757828011],[7.6186203571286,47.985903661407],[7.6220859200517,47.972272417851],[7.6088349991317,47.95317720329],[7.5936684690443,47.94169373068],[7.5832939822001,47.931118516785],[7.5805114095847,47.924033439912],[7.5835051671331,47.903574715879],[7.5769428779391,47.891476151582],[7.5567072919531,47.879941001941],[7.5571893871238,47.863835316778],[7.5635516323114,47.852137004105],[7.5614656894138,47.838677705698],[7.5497020250415,47.822574606584],[7.5453101034285,47.811279821706],[7.5312612420762,47.78675983822],[7.5310556236986,47.770364762321],[7.5480799502254,47.739589288712],[7.5434728959465,47.721949347317],[7.5347268810595,47.714498714804],[7.513751772485,47.702815362123],[7.5125727857792,47.694845299819],[7.5199928711004,47.682662502885],[7.5196030195489,47.667762233129],[7.5223404693959,47.662321695948],[7.5384262027619,47.648803157063],[7.5664726424667,47.632895936057],[7.5736049822678,47.616665207802],[7.5927957926469,47.601779854527],[7.5847073872051,47.577266068409],[7.5664182305498,47.577551201666],[7.5586696424832,47.573257991504],[7.5571945026924,47.565031495571],[7.503411179747,47.54197564763],[7.4990407869528,47.535364446849],[7.5013916497461,47.528725219131],[7.5110723875321,47.529059304058],[7.5192608270666,47.534552788408],[7.5314262789643,47.528284428742],[7.5277089588457,47.521554981262],[7.5054524965593,47.514369511354],[7.5105092147616,47.504115173213],[7.5067572708125,47.495629213014],[7.48685795056,47.481732320167],[7.4709073051131,47.480413251158],[7.4613662600979,47.489038177399],[7.450258499575,47.490385814784],[7.4345574218437,47.497928259116],[7.4226892243323,47.484388248594],[7.4556328646187,47.472976694654],[7.4450127609649,47.461705406933],[7.4300598912161,47.459277177538],[7.4225922859548,47.447887544888],[7.403410043504,47.435524491145],[7.3809450743678,47.43186353224],[7.3559606165998,47.433851805177],[7.3424777485662,47.438085917762],[7.3259229750377,47.439342239117],[7.3017355889987,47.437813631568],[7.2777859777968,47.431673598095],[7.2688212417913,47.426648175648],[7.2462981009916,47.422198455938],[7.2357678622845,47.436929813322],[7.2184754685329,47.438111100818],[7.2066841689176,47.434823362792],[7.1811906725339,47.441480675914],[7.1730742135766,47.447181789836],[7.1782210667095,47.458502082925],[7.1792412182665,47.469724384789],[7.1966955177699,47.493482758971],[7.1675377459529,47.48940851862],[7.1589517583051,47.490757673188],[7.1491338904597,47.497609012469],[7.1303408019013,47.503028568514],[7.1378734301853,47.510602312684],[7.1398015507652,47.526066534747],[7.132779554549,47.539650016902],[7.1192027781559,47.547271468],[7.1062174347916,47.551377585032],[7.1084182862429,47.563026634543],[7.1002437787202,47.572348664104],[7.0941662771964,47.57363395328],[7.0863359637946,47.585555682513],[7.0862717367469,47.592564849851],[7.0772390032257,47.598070781665],[7.0647156944354,47.601059487848],[7.0565070741684,47.598940564806],[7.0405190481699,47.600960102238],[7.0254214022991,47.592680119451],[7.005954748644,47.602446062879],[7.0105070572794,47.605019604987],[7.0049789727138,47.619379272859],[7.0180362046747,47.642567039669],[7.0188657902769,47.650671462441],[7.0391920612816,47.650571191522],[7.034430907222,47.661170659864],[7.0463174145898,47.671501618284],[7.0389466543978,47.67798172185],[7.0480463579808,47.682334383614],[7.0388002853848,47.687529274973],[7.037634862268,47.694693941352],[7.0264858913282,47.701000683113],[7.0374215531951,47.721642148751],[7.0194654399739,47.736016178013],[7.01596189708,47.743229997088],[6.9881803418573,47.747811458115],[6.9695414653395,47.753879554684],[6.9425641239541,47.768619181766],[6.9239978247236,47.770469646258],[6.9093369154314,47.77760076122],[6.9020863665368,47.776444142208],[6.8634725871955,47.785157366739],[6.8428287756472,47.812907241333],[6.8461756187967,47.822942631655],[6.8393097752574,47.824784354742],[6.8235333222471,47.813051201983],[6.7884284780797,47.834484214023],[6.792547182043,47.840496971878],[6.784819046343,47.849620144546],[6.7644647560578,47.853457064113],[6.7638501387584,47.857307907712],[6.7377719050045,47.861560606022],[6.7304382302284,47.867533474661],[6.7102378561952,47.87576777925],[6.703676313184,47.881417920779],[6.6696633226227,47.89320009565],[6.6455373160956,47.904022779887],[6.6302463718081,47.925593409791],[6.6017847198921,47.944400335071],[6.5682839276999,47.93449546901],[6.5421569547535,47.902612242352],[6.5032137734313,47.89621857502],[6.4786058641603,47.885521654796],[6.4560181967467,47.906627288043],[6.4604356473863,47.91345059658],[6.4363061456524,47.936497632925],[6.4317140631681,47.943817555323],[6.4088868226821,47.943264452338],[6.4053578977345,47.95311233294],[6.394005582089,47.956962872907],[6.3661530482729,47.961943699906],[6.338561201971,47.954979185933],[6.3245064287941,47.949279774694],[6.3097604456805,47.949874526566],[6.2964155087065,47.955366770009],[6.2773320945343,47.953805619678],[6.2379829343014,47.932840414292],[6.2191727089294,47.93576331706],[6.2052242815746,47.932044890248],[6.2079614134083,47.94275319831],[6.1973668542118,47.951792167635],[6.1784443979518,47.954215961253],[6.1679889957893,47.952352981729],[6.160691544552,47.964476018183],[6.1509430707726,47.970556896575],[6.164889049648,47.976133645938],[6.1523407152561,47.994505212317],[6.1560578216767,48.006943160047],[6.1317082771503,48.023714993889],[6.1165344664207,48.019389790184],[6.1092294655483,48.012467456506],[6.0977392042699,48.01504283565],[6.0809347681235,48.012700464881],[6.0725586040075,48.015669051022],[6.0411765157853,48.00442320835],[6.0269197055122,47.990054024535],[6.01816748796,47.984218151119],[6.0235129876577,47.978198192556],[6.0099778425991,47.968676110152],[6.0022660129604,47.956088697125],[5.9965110271696,47.957642319673],[5.9707820414319,47.957206856313],[5.9689005966348,47.947407535025],[5.953718196208,47.937030199568],[5.9296518654303,47.938718128621],[5.9377200582568,47.950937203984],[5.9595125543651,47.965838580885],[5.9475278158692,47.979712022025],[5.9367445426717,47.978874239655],[5.9217138598918,47.970783700094],[5.9180463526732,47.94735518647],[5.9001165275304,47.9447526196],[5.892904334004,47.937140708276],[5.8967125895793,47.93202806731],[5.884723650121,47.92604631497],[5.8908642780035,47.910826243984],[5.8864978594033,47.902632285568],[5.8699685694528,47.900702448936],[5.8483941586096,47.904328585027],[5.8366827972636,47.885275579155],[5.8214368328201,47.868177826395],[5.8279856830918,47.851868490955],[5.8053544944686,47.8473671425],[5.7981943193063,47.852395843864],[5.7611967718111,47.859337964072],[5.7534185985443,47.851779809209],[5.7441242763236,47.848675592832],[5.7460508220444,47.823594453292],[5.7326324521832,47.817595239681],[5.7038164823427,47.822615914257],[5.6902845680034,47.818602061169],[5.6816907857215,47.801918539863],[5.6766127410923,47.77915552638],[5.6799723393154,47.76996692113],[5.7050877892064,47.769109267163],[5.7092177964874,47.763723848917],[5.7061546847262,47.752289930468],[5.7092157661502,47.744819092275],[5.6933389025912,47.737536114776],[5.6848345035363,47.722252488703],[5.6841172724944,47.711966308717],[5.6934923219824,47.703700407172],[5.6946315676577,47.691589089204],[5.6900715815111,47.684834261118],[5.6602009774384,47.684701035958],[5.6534107674437,47.677377804161],[5.6350433227815,47.676729768703],[5.616916763571,47.673506825098],[5.6060928986115,47.675206717975],[5.5966797529575,47.671689689304],[5.580075717534,47.703119392386],[5.5672035170122,47.705232598617],[5.5429630425056,47.685875666578],[5.529779465589,47.672825610683],[5.5167714113012,47.673665697151],[5.482566377733,47.684598405046],[5.4725699801331,47.67672271053],[5.4460337073379,47.670773959543],[5.4357130635739,47.670913872806],[5.4265210893308,47.675523872509],[5.406340329799,47.673403498326],[5.3984746606309,47.649083223607],[5.4055917713039,47.647770719631],[5.3868465136168,47.635662494107],[5.3727580571009,47.618659790315],[5.3740797661661,47.604538026913],[5.3706351264232,47.604807955246],[5.3547654342374,47.591360294209],[5.3421656596273,47.597942682873],[5.3399999375357,47.609069594411],[5.3223487268523,47.612359526718],[5.2998385942923,47.604925842894],[5.2948617680378,47.599202098387],[5.2787977512377,47.590248985309],[5.2779061705699,47.581361382365],[5.2529216592041,47.576950536437],[5.248821805001,47.588304655805],[5.2395818018336,47.595735741686],[5.243335051832,47.603257395562],[5.2586017166912,47.622216096373],[5.2505435136739,47.622148375054],[5.2392323119847,47.616130998734],[5.2275663747918,47.630461719186],[5.2153019734879,47.638776585158],[5.1885815533539,47.6495597478],[5.1735955223689,47.652564238401],[5.173772704787,47.661555338996],[5.1793190058471,47.679306571337],[5.1613411137784,47.679935696643],[5.1562768819218,47.668257175471],[5.133419901405,47.650731358395],[5.1088743414175,47.649687715835],[5.1017263997014,47.659487818247],[5.0849169001544,47.657252517205],[5.0703648554737,47.666753831482],[5.0578872394562,47.668305887057],[5.0435832118687,47.676513563124],[5.0606448449781,47.694789812394],[5.0327945086565,47.692333079799],[5.0327622841789,47.704076235268],[5.0262670139789,47.709492979045],[5.0043602413418,47.700727315079],[4.9922739605095,47.688315326064],[4.9791098413952,47.687763691185],[4.9541385723681,47.701462932734],[4.9570644317617,47.709406346338],[4.9707033208711,47.727636116595],[4.9598932138082,47.7544709258],[4.9589919593761,47.761870409828],[4.9496050950308,47.765006218324],[4.9307398007716,47.761333148797],[4.9177846968097,47.766614764213],[4.9183050956308,47.777311690703],[4.9564491304036,47.790048428128],[4.9635761932156,47.795106816319],[4.9824009031204,47.800350982387],[4.9906198706093,47.80709265473],[4.9941266376295,47.819746154602],[4.9846956660801,47.828868610045],[4.968346106104,47.831938726344],[4.9622497289156,47.839702282837],[4.9603856383733,47.857358065698],[4.9540995648128,47.866767159307],[4.9282357147154,47.871123778488],[4.9281731599986,47.88687190538],[4.9190920876169,47.894720464516],[4.9018509649222,47.921284863427],[4.8944964422884,47.922840464291],[4.8693396784934,47.917449806377],[4.8569990661674,47.89585146766],[4.8340343917843,47.906781834116],[4.8289423070305,47.915124211024],[4.8467200449818,47.924483556015],[4.8501722212977,47.929537855578],[4.8660942377505,47.940508774674],[4.8520473231564,47.956242158653],[4.8410086317455,47.96075264808],[4.8194243190699,47.960358692838],[4.7865152517638,47.964201285162],[4.7946342537178,47.983195170106],[4.8091903248533,47.990087845923],[4.7932639090855,47.996944239514],[4.7890783024494,48.007828564444],[4.7492966391968,48.004246587867],[4.7199460898645,48.008895516311],[4.7042329730873,48.020235152969],[4.6985527278028,48.023678273472],[4.6732270680042,48.015055346449],[4.6633228351061,48.020020302718],[4.6396252873332,48.025481582141],[4.624062923698,48.025381425202],[4.612404633886,48.030241950581],[4.5826732520974,48.029462774305],[4.5718848731394,48.025129476681],[4.5673230090597,48.018739473733],[4.554850985404,48.012319062721],[4.5494258066747,48.004460028844],[4.5358174351871,48.001208262],[4.5455985119462,47.98829443758],[4.5552078832713,47.985773515235],[4.5599635426905,47.971424167131],[4.5533088051577,47.967682340931],[4.5315674205603,47.969936101313],[4.515002575681,47.966197509296],[4.4908013666212,47.967274674022],[4.482135195437,47.963341049725],[4.4490036624777,47.957151982179],[4.4394035883612,47.958224025114],[4.4275882888072,47.965925181567],[4.414350314367,47.968207562341],[4.3984909856202,47.963428889937],[4.3512833685724,47.956581571066],[4.3090008707807,47.961170613198],[4.2989694743195,47.948924996538],[4.3019415557721,47.939722254759],[4.293421363566,47.925673564836],[4.265592811732,47.924112631788],[4.2481126500816,47.929257212053],[4.2362857449326,47.940458371541],[4.2221403072235,47.949693241055],[4.2284618067273,47.969156456849],[4.2127809206222,47.971725942982],[4.1991540335482,47.96994144352],[4.2078363901654,47.946594650302],[4.201887052952,47.94115816132],[4.185389386493,47.940250187972],[4.185174863551,47.953252557601],[4.1814937489139,47.957133674703],[4.1663202417186,47.959799899508],[4.1459926719811,47.947950206748],[4.1418393873722,47.937107385043],[4.129354902453,47.936039992343],[4.111781787339,47.926998395128],[4.091392975551,47.929644880288],[4.0929746686253,47.942978558738],[4.0779088672194,47.942844108199],[4.0612633895691,47.945564277098],[4.0563117031209,47.941500284277],[4.0540462390611,47.92948006618],[4.0435079889664,47.928107993449],[4.0315462267821,47.933180877458],[4.0256492301283,47.928321965076],[4.0122015583229,47.933099817884],[4.0055897042792,47.942010075901],[3.9859571275878,47.930640025592],[3.9565980726161,47.934513395738],[3.9403268061141,47.933140821871],[3.9264502525997,47.934566873068],[3.9124676793978,47.930259049768],[3.8940363766278,47.929291041133],[3.9020918728463,47.939168233154],[3.9056151344907,47.956390517208],[3.9146958839434,47.975696995879],[3.9001846571879,47.997906103474],[3.885413743137,48.00032841816],[3.8783021550775,47.979419574124],[3.8618055931881,47.976443001861],[3.8643090405558,47.98423551782],[3.8500279607807,47.983791517043],[3.8398152772889,48.003890008543],[3.8619707432349,48.004325555172],[3.8700007142194,48.002599720655],[3.8706144760895,48.015633804416],[3.850085900943,48.02786301681],[3.8425469054526,48.036189501683],[3.8321550263001,48.036232814814],[3.8219783557759,48.043916868834],[3.827059329799,48.047441428512],[3.82635868236,48.063603655356],[3.8201608894357,48.067459938552],[3.8067979988969,48.083861354137],[3.7985814686078,48.086366869837],[3.7999733080105,48.096695524271],[3.8049696872895,48.102546851574],[3.7768827441699,48.124996720039],[3.7680208404533,48.1337610774],[3.7569100878728,48.125307470037],[3.7397131881194,48.13275416124],[3.7398043096241,48.138688236138],[3.7548293235379,48.150244530897],[3.7519004546533,48.161296410098],[3.74029665141,48.169709598744],[3.7184640557735,48.175364157847],[3.7141712164177,48.170603029762],[3.7223449458636,48.156837755739],[3.7050157631116,48.144314849936],[3.6936218940592,48.14799982015],[3.6887554871535,48.144278615274],[3.6678669028091,48.139211019047],[3.6595795108361,48.15965193897],[3.6506538178638,48.168228410946],[3.6414996909345,48.183932963824],[3.6318850111199,48.189390079748],[3.6195451473546,48.190784507919],[3.5941772424762,48.178873395497],[3.5751823496995,48.188742267274],[3.6009970264951,48.20380086628],[3.6111516430878,48.21192986819],[3.6140713717985,48.220115584573],[3.6216106602921,48.225744034142],[3.6136268888051,48.232260725333],[3.6046865808402,48.229884548214],[3.6000799784034,48.237038015917],[3.6138531799397,48.24927733618],[3.6243226631674,48.254526756748],[3.6168016799253,48.271343511852],[3.6117709302505,48.274410870011],[3.5881978504359,48.280068510017],[3.5777963307254,48.284593393925],[3.5857412014087,48.29008425533],[3.5879641370453,48.300806415009],[3.566569257901,48.307425850859],[3.5634067310877,48.321440919656],[3.5440725252239,48.319671593536],[3.5451019683919,48.334543016882],[3.530465379844,48.342613415975],[3.512139360519,48.360812483948],[3.4981541228456,48.369098088724],[3.4748808608132,48.369266510477],[3.4704759274371,48.374667861079],[3.4525885512991,48.374388436099],[3.4432494908564,48.367382718502],[3.4275090718968,48.35997574793],[3.4216806196631,48.371727783356],[3.4132728603068,48.376300840268],[3.4147888224632,48.390268550005]]]},"properties":{"code":"44","nom":"Grand Est"}},{"type":"Feature","geometry":{"type":"MultiPolygon","coordinates":[[[[-2.3047881362997,46.709424180555],[-2.2861197201191,46.695671725007],[-2.301824987103,46.692466226408],[-2.3141842217392,46.695297761013],[-2.3220102228855,46.689370859197],[-2.3339086309831,46.686335754046],[-2.3408401190474,46.692270630681],[-2.3628244691363,46.694296913939],[-2.3838250010365,46.706769430868],[-2.398720979356,46.717509050217],[-2.3987614706025,46.723952024978],[-2.3829626597426,46.732131547952],[-2.3715184087159,46.732423656909],[-2.3449955109993,46.726619233181],[-2.3403092656153,46.720187286383],[-2.3198084377514,46.719332810947],[-2.3047881362997,46.709424180555]]],[[[-0.89196408624284,46.975820414303],[-0.88901027465591,46.970996440972],[-0.87712517316223,46.968538385199],[-0.88359502600069,46.962369264823],[-0.87713915299698,46.955855606347],[-0.8837974960632,46.950388590831],[-0.87298436818273,46.944344247689],[-0.85194566174473,46.946506302307],[-0.84069799142137,46.933043168191],[-0.8291494586578,46.933361861306],[-0.8226181521192,46.919496882097],[-0.80739348796693,46.9198254879],[-0.81977358192379,46.909085252586],[-0.82020445366662,46.899619563541],[-0.8321856982677,46.884537016923],[-0.81527450811283,46.879362263307],[-0.80837576068615,46.869152331931],[-0.79477643718776,46.861061682533],[-0.78164600263284,46.84282764491],[-0.75815720893345,46.831399908556],[-0.74431663878843,46.830243411726],[-0.72752746779957,46.821938243707],[-0.70883784005248,46.821063616454],[-0.7008577279242,46.80862581328],[-0.71783828712373,46.800521372146],[-0.72731204616972,46.76763065568],[-0.72079949738479,46.762538021138],[-0.71534345605879,46.751789737735],[-0.70417950073791,46.74945353126],[-0.69413275947291,46.742731111953],[-0.70015414355827,46.73579562558],[-0.68397597689122,46.727863770277],[-0.66888364550954,46.717232370405],[-0.65619325740221,46.700774517445],[-0.68073310425929,46.686803996225],[-0.65787343587941,46.676827080382],[-0.63771460553181,46.66348907218],[-0.64924847916988,46.653283801506],[-0.65717243733762,46.634619354943],[-0.64405974899964,46.638024434086],[-0.62619906297455,46.633078356802],[-0.61411399285986,46.62039129053],[-0.62702650527698,46.605651097302],[-0.61671038535954,46.598536566433],[-0.61190793736705,46.588307031212],[-0.62456684878994,46.577400290716],[-0.61785426354446,46.562043099519],[-0.60670934401643,46.562331917411],[-0.60213244964129,46.533279525109],[-0.61002538912342,46.52729145947],[-0.63352903140625,46.526545961083],[-0.64519375671477,46.5085710348],[-0.636581601251,46.506095217567],[-0.62483750061224,46.496362745962],[-0.6241822995269,46.48674665851],[-0.6124273279524,46.45873668738],[-0.61983716832458,46.452467117452],[-0.61877090027571,46.438854562232],[-0.63684012869206,46.432305656566],[-0.6406468690526,46.416224664644],[-0.63282952674398,46.403812558564],[-0.63658749242212,46.395578228534],[-0.62088828506372,46.390451131851],[-0.61017966919341,46.413733221347],[-0.59417281123848,46.410185950063],[-0.58189775121858,46.40217377528],[-0.57238400631421,46.400707224569],[-0.56605536149932,46.393082159377],[-0.55052040300574,46.393343323056],[-0.53779518169029,46.38646382767],[-0.55764744918976,46.363451353574],[-0.57567653828611,46.356508034766],[-0.60325195656142,46.361468010185],[-0.60547077785894,46.347207865876],[-0.61868206115959,46.339099077209],[-0.63660376728023,46.33759543996],[-0.63998183318338,46.322110972748],[-0.64825320981615,46.317143530802],[-0.67227364916502,46.316216425466],[-0.69732735736344,46.325092837487],[-0.70757171772654,46.317704940913],[-0.7201487066083,46.314890543328],[-0.72191414100459,46.302372661742],[-0.73459543046899,46.304955701863],[-0.75047134037184,46.304254425344],[-0.75794915819339,46.311254056955],[-0.77570312778264,46.318376375981],[-0.78424343720168,46.318861879535],[-0.80247564445275,46.325156566217],[-0.80732128185426,46.339293680039],[-0.82415169186325,46.335854967946],[-0.83052754444062,46.341529547924],[-0.83988457052554,46.340367099668],[-0.84865539686859,46.332512597898],[-0.84487598314026,46.3245597282],[-0.8509424448661,46.317185675508],[-0.88767597392192,46.326322589931],[-0.89270136944125,46.320101412175],[-0.90480272235534,46.313812430336],[-0.93489398189823,46.312857623927],[-0.9612310671154,46.323395683014],[-0.9441551264402,46.336048129241],[-0.93790474501528,46.353157499224],[-0.92857576719505,46.371051399922],[-0.94112049397563,46.367862165606],[-0.95084003340185,46.360617622608],[-0.96451829359621,46.365398033698],[-0.97744453847283,46.351108789901],[-0.99521192821645,46.350317645688],[-1.013809705621,46.35562286986],[-1.0290641764217,46.348867660129],[-1.0525331368763,46.342540560637],[-1.0645117099073,46.335517206168],[-1.0807238252872,46.321431313321],[-1.0782951920661,46.316911662518],[-1.0997364979128,46.314471710528],[-1.113284059211,46.316302232447],[-1.1236420717667,46.321795835911],[-1.1294064331873,46.310272328818],[-1.1396042849062,46.311220270269],[-1.1633871701049,46.324357697468],[-1.1789816995107,46.319237198363],[-1.2010861494985,46.316343408957],[-1.2029476108593,46.31299774522],[-1.1955066954319,46.300486336512],[-1.2063790183713,46.288844677353],[-1.2073980363312,46.266566974958],[-1.233813730916,46.279787036182],[-1.244708256192,46.287909226104],[-1.2850844462619,46.310943853415],[-1.2958949852744,46.323927342846],[-1.3059782500842,46.319190709176],[-1.2950494049459,46.30445585614],[-1.298649918542,46.298035215363],[-1.3088839142276,46.303381059905],[-1.3209210907591,46.321997394722],[-1.3209769583137,46.325733328602],[-1.3456750283516,46.34200224737],[-1.3667385250608,46.348611637782],[-1.3817097975849,46.341186215234],[-1.4009756575246,46.340508325831],[-1.416442893161,46.346032461982],[-1.4284201012028,46.347121382446],[-1.4369731247534,46.341049782884],[-1.4659374486589,46.342356465827],[-1.4709432372166,46.346061757066],[-1.4771749719261,46.363507201844],[-1.4878020252489,46.38139003894],[-1.5021398541908,46.397345234333],[-1.5150666516907,46.40429394231],[-1.5377511402152,46.409241650902],[-1.5505012086214,46.405427866679],[-1.5849335376726,46.408882191167],[-1.6113093601133,46.413418180507],[-1.6270620551428,46.414220589438],[-1.6417221223658,46.419202887095],[-1.6563835193513,46.431211054285],[-1.6746027257341,46.439923752177],[-1.7038680334017,46.448675063621],[-1.7191201629207,46.459167761425],[-1.7521241921725,46.474155783424],[-1.777137894573,46.492758626968],[-1.7912930929301,46.494497528609],[-1.8033948364521,46.488967027341],[-1.8123442739131,46.493416566185],[-1.8186497595357,46.518682691519],[-1.8419594438554,46.573013536296],[-1.8484416100107,46.585884833838],[-1.8560152427178,46.608580735068],[-1.873382171513,46.620915463581],[-1.8822873872759,46.630594948835],[-1.8906734495839,46.63469093819],[-1.9035668912462,46.647321849326],[-1.9126335673886,46.661558294252],[-1.9428758596327,46.692706115369],[-1.9508357687079,46.695651008644],[-1.966128703921,46.692012127622],[-1.9784453425744,46.703097268015],[-1.9826649825899,46.720311181056],[-2.0002660579608,46.733925400032],[-2.0719487138764,46.782812921452],[-2.1171981955453,46.803360927686],[-2.1401926882177,46.817151505205],[-2.1445060316881,46.826399169492],[-2.1454334062879,46.847809766579],[-2.1489184130775,46.869931347964],[-2.1553427446113,46.883151727981],[-2.153823981621,46.890149400164],[-2.1188882449818,46.893677330801],[-2.1177998913797,46.908317123363],[-2.1034385508171,46.920984664355],[-2.062735433411,46.948064118056],[-2.0447808242546,46.969115340219],[-2.0453622399129,46.979481273443],[-2.0273622488649,47.00992054926],[-1.9975145183017,47.018754751413],[-1.9804130066429,47.028904753758],[-1.9836243655281,47.029504869904],[-1.9994147476381,47.055759178647],[-2.0047214099724,47.061460656046],[-2.0326019810958,47.073513335424],[-2.0485561088483,47.086376045155],[-2.0534773710676,47.094116874449],[-2.1048560377353,47.108515739095],[-2.1555855165283,47.112834108468],[-2.1776795960367,47.12206186156],[-2.2150136613872,47.124060089367],[-2.2268201491195,47.130935989866],[-2.2478150673853,47.134022011309],[-2.2295324163069,47.144165117321],[-2.226128166772,47.152275320793],[-2.2009562728096,47.158406462933],[-2.1802049236481,47.15593411267],[-2.1670631605228,47.166180557901],[-2.1582127475069,47.196892590523],[-2.158373708365,47.209050666096],[-2.1738613907116,47.22651156379],[-2.1778607172174,47.236097279547],[-2.1705455113596,47.239751522169],[-2.1699895453995,47.268472297219],[-2.1873608303178,47.280622361747],[-2.2055602597095,47.271131396915],[-2.2246437954795,47.264387061764],[-2.2278604253303,47.256330261162],[-2.2466914047133,47.255988431427],[-2.2698952747426,47.2395647121],[-2.3016402822796,47.236400031931],[-2.3396017707663,47.255188453422],[-2.3420962103188,47.261755983579],[-2.3552895948005,47.27180855813],[-2.369753264591,47.277438171535],[-2.3983798514521,47.281448757206],[-2.4203808400315,47.276443831705],[-2.4253877232221,47.270964820355],[-2.4165529129684,47.25871256282],[-2.4475351836802,47.261757701956],[-2.4555210807153,47.268139889592],[-2.4823147658717,47.272979613928],[-2.4990968218639,47.280741885999],[-2.5442517230455,47.290107777197],[-2.5449696912262,47.297963681667],[-2.5272130839477,47.301551808752],[-2.5138083846226,47.298375734085],[-2.5049900911185,47.31367062334],[-2.5029144731486,47.328754801261],[-2.5067783337792,47.341390242029],[-2.5211591992751,47.358811002331],[-2.531174634228,47.365374694297],[-2.5413465599302,47.366005665021],[-2.5589448655806,47.374566485616],[-2.5455487941567,47.381126464909],[-2.5341061627856,47.382961282244],[-2.5224115438117,47.392240089144],[-2.5000251663727,47.404398607793],[-2.4912351567464,47.404811002726],[-2.4826825430466,47.412264457829],[-2.4726723242774,47.416083446873],[-2.4583086370333,47.412128481989],[-2.4347120386263,47.41323956486],[-2.4330361363116,47.416778409153],[-2.450864597211,47.425323844427],[-2.4523914498156,47.43382171003],[-2.4482478800515,47.441292494065],[-2.4584933200854,47.44812333026],[-2.453436631799,47.46207522621],[-2.4400824549861,47.465780511452],[-2.4230228667484,47.477116356867],[-2.4168260809589,47.462051729438],[-2.399942719827,47.455985214433],[-2.390389834657,47.456871614258],[-2.3822957470498,47.462247958261],[-2.3709692377347,47.463384419512],[-2.3540439813745,47.454520038759],[-2.3463648513449,47.457849990711],[-2.3239404651198,47.459700150766],[-2.3128644981072,47.464470727328],[-2.3131411665125,47.485904562585],[-2.3036714616823,47.49241124835],[-2.2991228743726,47.500477533121],[-2.2965137349146,47.51605888675],[-2.2808336661554,47.509587432992],[-2.2629685042061,47.512911091518],[-2.2585200153358,47.504528170665],[-2.2656383885011,47.501780337272],[-2.2442830226806,47.493603343394],[-2.2199696788078,47.505419526219],[-2.2066684734953,47.510040688056],[-2.184622799181,47.511938749674],[-2.1837606578958,47.501791543642],[-2.192163736718,47.496643815865],[-2.1833018888491,47.491696689458],[-2.1636756892187,47.49050097161],[-2.1541860993449,47.496364966339],[-2.1529569093967,47.510962718509],[-2.1560180197876,47.522028206659],[-2.1073294072614,47.531054380017],[-2.0985591504874,47.533957226787],[-2.096829841083,47.540329954312],[-2.1038869792414,47.549970178949],[-2.096507139486,47.572369157778],[-2.1037228936324,47.589435010495],[-2.0992687458213,47.597488169512],[-2.0869236114994,47.602779172942],[-2.0849952925543,47.621229400095],[-2.0970339249479,47.631356309182],[-2.0898837230131,47.642709543195],[-2.0747327428802,47.651662965349],[-2.0579097595869,47.649483633439],[-2.050624831954,47.651134018014],[-2.0430946586878,47.665696588636],[-2.0357277498302,47.668540889438],[-2.013316284318,47.666003385464],[-2.0093555248025,47.671376463587],[-1.9852234827543,47.683232805983],[-1.9743811536912,47.693936715593],[-1.9690592974,47.688368806165],[-1.9691960862159,47.677526213073],[-1.9538162196423,47.672268062701],[-1.9363036351526,47.686649217665],[-1.8918360415668,47.696328031406],[-1.880073341802,47.695308629028],[-1.8640156728505,47.706980966313],[-1.8415465142207,47.705493872656],[-1.8250533703276,47.708269117018],[-1.8028599988222,47.702303252055],[-1.7724177137179,47.698454240157],[-1.754669062014,47.70617243813],[-1.7354918450583,47.704030670166],[-1.7292404629403,47.699070332406],[-1.7133831145586,47.699308113335],[-1.7051414585604,47.709321517725],[-1.6863422821157,47.713034371357],[-1.6641158381935,47.711144721547],[-1.6548173400684,47.712589314425],[-1.6454761757831,47.721464189516],[-1.6381811285931,47.72231109575],[-1.6390681088186,47.731229794449],[-1.6355680463584,47.74265760999],[-1.6260806089052,47.756571625148],[-1.6163542814852,47.764155016463],[-1.5981151893439,47.766615164584],[-1.5934046637562,47.776049297939],[-1.5519088415196,47.784014922086],[-1.5280610367888,47.785843354761],[-1.5202764448571,47.793620421696],[-1.5042386939766,47.800947509052],[-1.4928971911208,47.798439989341],[-1.4684440000216,47.8059033883],[-1.4669179596494,47.809780189045],[-1.4818132504128,47.831893536154],[-1.4628972269562,47.833557723029],[-1.435426799044,47.83115216305],[-1.4249168477477,47.832841359769],[-1.4178500987788,47.827486856246],[-1.3904289319245,47.828276258082],[-1.3813446142742,47.822668998285],[-1.3772932944092,47.812713141041],[-1.3631664145966,47.801683607753],[-1.3528652871869,47.797688995885],[-1.3184870728098,47.792334376846],[-1.2458850128779,47.776717450948],[-1.238247803597,47.809992506553],[-1.2327236903989,47.820244561296],[-1.2206362424472,47.820389620636],[-1.2139544800221,47.844315066059],[-1.222737283795,47.852599843541],[-1.2164918382318,47.857201283697],[-1.2030225271774,47.856844148885],[-1.1891865993477,47.867976952617],[-1.1969660077971,47.8789391525],[-1.1966306275523,47.889267731968],[-1.1762242926663,47.897399695909],[-1.1754814134505,47.910385737305],[-1.1663141666181,47.923578184002],[-1.1671197731246,47.93471641408],[-1.1595152529454,47.939219922042],[-1.1613811233462,47.952310307885],[-1.1539896711831,47.96581664419],[-1.1343829543823,47.969309177864],[-1.1260752876073,47.973307719181],[-1.1228021186321,47.986671335599],[-1.1026780017247,47.989064346633],[-1.0908100123801,47.98774338815],[-1.0709659537463,47.981801155317],[-1.045096271371,47.987097320485],[-1.021259621245,47.994939309553],[-1.0168893967587,48.003728266054],[-1.0182078693094,48.012308274749],[-1.0330632921231,48.031188955766],[-1.0277969380856,48.044863699713],[-1.033830641773,48.05209341916],[-1.0232901182126,48.068911872714],[-1.0406036968359,48.078179883231],[-1.0496111794277,48.089801151393],[-1.0527563302629,48.10735152844],[-1.0591416106668,48.125077547289],[-1.0602880762288,48.15011075649],[-1.0738876778536,48.159661823604],[-1.079605768256,48.183480590178],[-1.0747741638529,48.198201373069],[-1.0873107692067,48.209806916083],[-1.0806036422976,48.21949752801],[-1.0865989301563,48.227529635817],[-1.1000554557338,48.25927761239],[-1.0930408735111,48.281855553692],[-1.0820920155689,48.298391604095],[-1.0592143517314,48.312093827381],[-1.0450195990474,48.32772872854],[-1.0558182376068,48.340683235403],[-1.0598919207817,48.350532594956],[-1.0590029395387,48.358994435228],[-1.0646292178107,48.368281337083],[-1.053937234376,48.383986913354],[-1.0681208970941,48.404716742704],[-1.0783677064971,48.413230711968],[-1.0779200339792,48.421477186884],[-1.0827926455739,48.433057379747],[-1.0793641401546,48.443271982049],[-1.0654330620157,48.451695678779],[-1.0639645498148,48.466954435587],[-1.0741061961301,48.473896847289],[-1.0782957929126,48.481154857966],[-1.075717285974,48.499392729686],[-1.0701643748629,48.508492017418],[-1.0605497194866,48.515346429697],[-1.0514451903751,48.509308794368],[-1.0039961840993,48.489172448089],[-0.97225823660351,48.494600246107],[-0.96235389107925,48.503667410902],[-0.96425363340344,48.510812466339],[-0.95637394558324,48.516620056723],[-0.93371106054579,48.51502659051],[-0.92236046915212,48.512389219916],[-0.91847065624527,48.500394275132],[-0.89624907070572,48.495083815873],[-0.8774635305069,48.499620464013],[-0.86036021134895,48.501458584456],[-0.84610706675308,48.498284307396],[-0.83778925434372,48.485178672867],[-0.82728981063172,48.476292220178],[-0.8184585148882,48.474291742186],[-0.81322359143068,48.455083144137],[-0.79918376742683,48.458939062295],[-0.79756269441243,48.465280274577],[-0.77787285065978,48.465413522216],[-0.7785859196383,48.453255439492],[-0.77453904965747,48.44327891903],[-0.75727715268855,48.436552496914],[-0.73527798039621,48.445048872201],[-0.71509947351088,48.448950147648],[-0.7197695922356,48.454578580623],[-0.73585755427354,48.461124917636],[-0.73034187148783,48.472703026439],[-0.71121688547931,48.470742279355],[-0.70206934477695,48.467207668633],[-0.68799234091834,48.469431032111],[-0.68585273590642,48.475468439014],[-0.66895705284659,48.486137900646],[-0.66371844747552,48.484471551488],[-0.65363074848858,48.459545681615],[-0.6540003356242,48.444278312957],[-0.6175695455761,48.458960402325],[-0.59533674901115,48.472630277201],[-0.57152013702789,48.469152972446],[-0.55171796610154,48.473119783464],[-0.54510290980273,48.482691035747],[-0.5304424347088,48.495164970256],[-0.50506155077299,48.505798828433],[-0.4884950789804,48.501617721865],[-0.47820460128897,48.501565713987],[-0.47060334996255,48.509716651644],[-0.46226332328429,48.512709151203],[-0.43075652123879,48.51181625112],[-0.42497181740742,48.507282953736],[-0.41273449116925,48.506498004612],[-0.3991855056689,48.510158714286],[-0.39345664138171,48.501835194106],[-0.3676233888649,48.492944315138],[-0.36723974711241,48.487748985001],[-0.35349558279054,48.483897081468],[-0.35582138041634,48.495673571366],[-0.34337759223335,48.500849863584],[-0.32023332020671,48.522923755915],[-0.30280889062491,48.517340998248],[-0.27823048075492,48.506986142113],[-0.27155353070113,48.507447568195],[-0.26580141522268,48.522782191648],[-0.25395512234333,48.525985631213],[-0.24176789393774,48.536388956089],[-0.24635660161985,48.542620878313],[-0.26180425334438,48.54789519181],[-0.24264015511442,48.567994064435],[-0.23435242732491,48.562336320193],[-0.22107424204732,48.560317301834],[-0.20694246592994,48.562946447212],[-0.19398633186269,48.554824404734],[-0.1899589987284,48.548884398226],[-0.16937878261294,48.536973156988],[-0.14460271813847,48.527754338423],[-0.14501210976342,48.521000343601],[-0.15568415360731,48.520496772763],[-0.16634047065468,48.51558387484],[-0.1720909995602,48.502134649047],[-0.15856042497356,48.496817021301],[-0.14958860992305,48.479781866844],[-0.15336586853021,48.476724917968],[-0.14871763477939,48.458069224847],[-0.12454179598033,48.449239552758],[-0.10641182796282,48.447519773766],[-0.073006901765828,48.450527118516],[-0.072707535476378,48.456927943118],[-0.051890589271637,48.453255414135],[-0.049909790963035,48.447628170085],[-0.057355677768335,48.42850299559],[-0.053012801512314,48.412716132961],[-0.05669039654505,48.398915618731],[-0.052691042298523,48.392979240085],[-0.054527208218665,48.382004461206],[-0.050692623162423,48.375201195715],[-0.035753099663116,48.384874683334],[-0.022054721991416,48.388059994444],[-0.020363541559243,48.393656323667],[-0.0025641291874286,48.397311951396],[0.0065863250934992,48.388521385965],[0.020992722816365,48.380200925309],[0.062489872264419,48.382213868151],[0.056684859958794,48.393974400454],[0.067826622948661,48.406115400716],[0.083580132468228,48.411137710408],[0.09917046478078,48.41034986941],[0.11624768586472,48.435555660302],[0.15131906064063,48.437226845695],[0.15811789380158,48.4440164218],[0.15610127663516,48.454794932825],[0.16965670000587,48.449364042801],[0.16972375424173,48.461776714307],[0.18125494041244,48.464965078387],[0.18981304225187,48.461891344828],[0.21823241324651,48.473790546424],[0.22939338887665,48.472578001816],[0.25857807031538,48.476710383834],[0.26286221529839,48.482954540393],[0.27593434536664,48.479055127239],[0.29585588821524,48.480174860693],[0.31789727296834,48.471938210212],[0.32727632603609,48.471072305832],[0.33874148490671,48.461599536909],[0.35578465090337,48.458217063582],[0.36395632992898,48.451631721658],[0.36771793204951,48.438272682172],[0.38066015166482,48.425411796164],[0.38150787714381,48.417547978808],[0.37172370405574,48.410451667862],[0.37537215739256,48.395740224588],[0.37386118731698,48.386969757082],[0.37865893857906,48.383227765197],[0.38255236381737,48.359498801305],[0.38828549911199,48.349122009475],[0.38047838823167,48.341797530871],[0.38260989677575,48.333828412247],[0.3954029644226,48.320549965535],[0.4062203560807,48.314621149851],[0.41599578567133,48.321625198799],[0.42688901989368,48.315425242308],[0.43133408375288,48.306638667446],[0.44279870606142,48.304629310064],[0.46361198113469,48.305016107657],[0.48050090924161,48.298592258919],[0.48757654033176,48.307795859172],[0.50702990447062,48.295832610533],[0.49455647283795,48.28681567575],[0.51293004449183,48.266874483366],[0.5303000454288,48.265496730429],[0.53848634108307,48.256987820339],[0.53597049486367,48.249844560134],[0.55013843367508,48.249395520335],[0.56099429972633,48.245949063769],[0.57919146406902,48.24436440048],[0.63315984470535,48.245553870078],[0.63190429889268,48.254754506701],[0.64070530481206,48.261221689671],[0.65315095543918,48.263702677988],[0.67547108490982,48.254740726504],[0.68321966914477,48.2485882228],[0.7165758658899,48.212094515686],[0.72363045806996,48.19813955141],[0.73014979083029,48.200521766169],[0.73782963836386,48.189069627691],[0.75566254080812,48.181981836049],[0.76407918474979,48.181599665308],[0.79765841643139,48.19445496608],[0.79562670501545,48.188043105362],[0.80835901939965,48.18611890903],[0.82688955262783,48.175387000045],[0.83683452952269,48.167352245345],[0.86198925121346,48.166816904566],[0.88249645680993,48.161766033434],[0.91161206421963,48.148858532659],[0.91379809767445,48.135125048448],[0.89396954177329,48.135535055964],[0.87293551592102,48.133408559058],[0.852575219489,48.133602174445],[0.8553701454218,48.122620579792],[0.84121734187884,48.103059710788],[0.83268783335498,48.098453526315],[0.81435131408069,48.098801731111],[0.81516825904503,48.093730753222],[0.83920278539184,48.09125189303],[0.84483764311698,48.086647072566],[0.84302009925743,48.072638200667],[0.83460349982458,48.070147734707],[0.80118315423495,48.071513555954],[0.79653309159021,48.05267766261],[0.79747785616118,48.037556987677],[0.80877017226921,48.031993621434],[0.82520263947346,48.03005952554],[0.83672342747852,48.034558745892],[0.84155459904793,48.029673676539],[0.84052666414894,48.021048593652],[0.83170184588828,48.006116934727],[0.83237463233502,47.996592094392],[0.82622288599262,47.991475839362],[0.82428057343045,47.982142037161],[0.84529238839341,47.954438931698],[0.84579379193831,47.941403140329],[0.83727689039754,47.937246716219],[0.8171459594605,47.934467914387],[0.81211830142135,47.928939306036],[0.80913428200565,47.91066247592],[0.81721753097407,47.892418803105],[0.81018749426364,47.890393591962],[0.79799062776542,47.898193546758],[0.79002362904946,47.912210300533],[0.78051199587287,47.910375216053],[0.77032460906914,47.902009083915],[0.75986941585155,47.898224938894],[0.75733759497489,47.884473514914],[0.76468938104337,47.866582667793],[0.75916076452252,47.859222188506],[0.77401870735853,47.851208382865],[0.77457358541314,47.839684494777],[0.76841445732376,47.831101351932],[0.7588569724751,47.833536394698],[0.74540046495951,47.825663057103],[0.7397212944059,47.814678933449],[0.72484407861962,47.798889067315],[0.71263236035006,47.790038970809],[0.69798475487217,47.788889445319],[0.68931761050545,47.779996503151],[0.70344170542358,47.769940283327],[0.69688004266227,47.764225211],[0.67564997055176,47.768962404729],[0.63937932915856,47.751572315523],[0.62683335231018,47.751793159891],[0.61066958830157,47.732034198596],[0.61159726872368,47.728134311986],[0.59409530653203,47.723105855723],[0.58052041667909,47.712330763793],[0.59297009308968,47.703590911989],[0.59557114412559,47.688312714504],[0.60418662363095,47.685607124967],[0.61443245110168,47.694215472574],[0.61480416648326,47.68275087954],[0.60463738045699,47.679968482062],[0.58772733155021,47.669617061038],[0.55947922009731,47.665994923777],[0.54289746214182,47.656203651505],[0.51325174134335,47.652863992861],[0.4996666538331,47.645272415067],[0.4797670863672,47.64329220016],[0.47607646347987,47.648011563852],[0.45662804145159,47.638826353606],[0.45518198840301,47.627017225989],[0.44993291932188,47.619329777154],[0.42390524684004,47.617824451176],[0.39702255940301,47.638927008339],[0.38107503178189,47.639064909321],[0.36465430735157,47.626011449659],[0.36480446047317,47.620165400372],[0.37905609046241,47.610779501442],[0.39442325665444,47.594393009892],[0.40216586206278,47.579002216555],[0.3789542711163,47.569104805534],[0.36673611607068,47.573457923574],[0.33958580258874,47.579472315073],[0.33844630799321,47.585030259946],[0.32325488038268,47.592888415747],[0.29001704748145,47.597728628188],[0.27799234011686,47.597381208395],[0.26784211805055,47.608672360211],[0.25925309972834,47.612253732911],[0.23768269638563,47.610966183961],[0.23000044283917,47.608397360802],[0.23453049018557,47.57797744555],[0.21510267043528,47.569975576615],[0.20150198535452,47.544324126228],[0.19334553772128,47.539118278038],[0.2034912870347,47.533330991541],[0.20807030184987,47.526432351568],[0.22491484141757,47.52709951065],[0.22008941253351,47.511490494119],[0.22010664406864,47.50195233416],[0.2007181726014,47.484545277708],[0.18979781155354,47.460723327297],[0.18093772230519,47.453404824236],[0.18527899163678,47.424736116162],[0.18138204745888,47.417824739063],[0.15385793095636,47.398727021572],[0.16948959021545,47.395646092388],[0.16798792612309,47.386934066036],[0.18296214025622,47.38033044936],[0.15845843664067,47.366157059648],[0.14165395029201,47.361961427199],[0.14796868770319,47.348447803202],[0.13898837615883,47.33824318552],[0.13125388952305,47.33409233868],[0.11745694898776,47.332342613969],[0.11786940351405,47.325601141531],[0.10924461524906,47.313421774727],[0.099012801986365,47.308139754432],[0.078978960154079,47.282822156056],[0.082848635358157,47.274168568836],[0.074829460019472,47.248048474897],[0.072492820219795,47.220509854465],[0.053277684947378,47.197182170708],[0.066596690426524,47.189796025762],[0.063052886223431,47.175281799504],[0.053830055961677,47.16373374848],[0.049480342584696,47.168623012343],[0.036501918227681,47.160445278183],[0.019016376976915,47.175754285742],[-0.010739414334867,47.15751215065],[-0.034011786935389,47.127334734816],[-0.040856468682482,47.112928627112],[-0.039289561029516,47.108055925394],[-0.026535185584925,47.105798471803],[-0.029234974929682,47.095257561848],[-0.03562437381954,47.086261232309],[-0.044169213959146,47.093239781385],[-0.060661742719366,47.09514763055],[-0.085909274640678,47.101010256779],[-0.098719424061378,47.090117668474],[-0.10150441660145,47.08326376928],[-0.1021158452812,47.06480003115],[-0.12837866130337,47.054429041651],[-0.13712137046296,47.058426719475],[-0.13678317485552,47.063924090649],[-0.14766123249005,47.069855194532],[-0.16599081567743,47.064596744766],[-0.17848280781104,47.069769863363],[-0.15947412139976,47.085935164317],[-0.14555986138819,47.091366857483],[-0.14125473717962,47.103745079728],[-0.15721241252843,47.101780345038],[-0.18483829723431,47.108333434925],[-0.18649707382196,47.101547033466],[-0.20607508372803,47.09328538537],[-0.24153284082639,47.1057275119],[-0.25537525933525,47.100286155299],[-0.2879249468488,47.101438124536],[-0.29895654468625,47.099250384298],[-0.3142510524831,47.091338121731],[-0.34146522078634,47.087332841605],[-0.34498093726671,47.09177095779],[-0.35741871073042,47.094026201074],[-0.38345929253299,47.087697613397],[-0.39631090043786,47.087753100169],[-0.40078196900616,47.070768258647],[-0.40931478414398,47.06628937151],[-0.4258514883367,47.072734496606],[-0.44613773080732,47.067564764094],[-0.46425258388436,47.067574344676],[-0.47634088284647,47.054361886701],[-0.48553786553274,47.065209021486],[-0.47635021862705,47.072140351589],[-0.46404370608664,47.074916254874],[-0.46269595640292,47.081925505658],[-0.49533635185918,47.082386236675],[-0.54271238339803,47.068832410093],[-0.55953163443577,47.061883133164],[-0.55518423855519,47.056996280386],[-0.55557809674432,47.043528672476],[-0.54222220688058,47.035131514655],[-0.54565906541349,47.029239134682],[-0.56225950470765,47.030666495232],[-0.56546953385811,47.019423404938],[-0.57652952670071,47.017027138711],[-0.58641245768408,47.009979798203],[-0.59549628776894,46.997955261938],[-0.61997935748009,46.993321083755],[-0.62971403267853,46.996851004876],[-0.64422463763986,46.995602969044],[-0.67605096460406,47.000124265341],[-0.68018770038511,46.987658683517],[-0.69637193445308,46.994704963523],[-0.71305373485382,46.986070538333],[-0.72790285494931,46.994993345811],[-0.74336287533223,47.000701964828],[-0.74760195615967,46.991449795286],[-0.76195094831376,46.992143526967],[-0.7738784459047,47.004247669583],[-0.78757295549441,47.005134613994],[-0.80044123437384,46.994429249843],[-0.82697025806846,46.992404409034],[-0.83853635765488,46.985503699072],[-0.85591689102216,46.979079840933],[-0.84915622076396,46.973775579115],[-0.85764337306558,46.969397597368],[-0.8797290084417,46.975803771985],[-0.89196408624284,46.975820414303]]],[[[-2.1980717999149,46.951171361358],[-2.2231531353026,46.965271208862],[-2.24244506994,46.965359299904],[-2.2543982518538,46.958122789992],[-2.2643746646818,46.960876831901],[-2.2867885516843,46.983496627052],[-2.3010946565916,46.989047601607],[-2.3020317382713,46.997616748051],[-2.2925186097225,47.012555022671],[-2.3042054070871,47.025060693728],[-2.2872328794469,47.024618443862],[-2.2770692805571,47.029038135374],[-2.2520693981849,47.027966094972],[-2.2401364085503,47.017854413154],[-2.2256229438599,47.016854719984],[-2.2183338551942,47.007817147562],[-2.2188122423342,46.991712728633],[-2.2317459039104,46.989711402141],[-2.2374732061994,46.981958292077],[-2.2307387193565,46.973215731503],[-2.2202452222616,46.973677309765],[-2.1571813233526,46.950033359583],[-2.147437598884,46.934194164793],[-2.1482142491069,46.913528857926],[-2.1532523636713,46.906933207426],[-2.1538987641986,46.895779045368],[-2.1679391075448,46.911177523069],[-2.1735282996294,46.925285521446],[-2.1814210323948,46.937050160658],[-2.1980717999149,46.951171361358]]]]},"properties":{"code":"52","nom":"Pays de la Loire"}},{"type":"Feature","geometry":{"type":"MultiPolygon","coordinates":[[[[-2.123706231573,48.604405598781],[-2.1344816510593,48.611643369666],[-2.1387092211901,48.623233227338],[-2.1503248031597,48.627053106726],[-2.1334957716008,48.637088444356],[-2.1265123781579,48.634929665212],[-2.1151461030982,48.640574814888],[-2.0947895329223,48.633600009628],[-2.0812159935305,48.636113938227],[-2.0780785794745,48.640606840627],[-2.0486923175112,48.636979345527],[-2.0550978778787,48.627308162871],[-2.0479009976935,48.624252682515],[-2.0302658489221,48.6230402789],[-2.033552700515,48.609450561797],[-2.0174903342468,48.594980622161],[-2.0135140412299,48.587519422472],[-2.0052387594747,48.588372025047],[-1.9946685652283,48.578424268262],[-2.0117662463935,48.571458977418],[-2.0068973832739,48.566110094782],[-1.9937102250766,48.559543529591],[-1.9881857185433,48.545116037063],[-1.9754496222253,48.543657395889],[-1.9723506867232,48.534638480013],[-1.9870341945665,48.525657088599],[-1.9857586016344,48.510758659842],[-1.9694960306022,48.517140952252],[-1.9693306755786,48.523178885752],[-1.9547996276675,48.522834435277],[-1.9480341971128,48.538808017557],[-1.9591400244487,48.536361793933],[-1.9689408101185,48.539138345101],[-1.9611555626668,48.550288017551],[-1.9630715571236,48.555935046598],[-1.9742078804092,48.557792898054],[-1.9725748468616,48.565573079381],[-1.9819961816246,48.573998865405],[-1.9812825658863,48.586178667101],[-1.9592506615667,48.576213011519],[-1.9541860424982,48.578971353192],[-1.9678110801245,48.592143118152],[-1.9919484014969,48.594107232092],[-2.0110006809827,48.604725563563],[-2.0023941362904,48.613055635525],[-2.0151419114746,48.613981579065],[-2.0183123229782,48.620076905126],[-2.0136236164094,48.627010189175],[-2.0259859464428,48.634438167728],[-2.0202576088523,48.639910339273],[-2.028955958438,48.646918475376],[-1.995234996379,48.660138273521],[-1.9823378822778,48.672879184591],[-1.9849669305136,48.681290529268],[-1.9698310104514,48.686323909863],[-1.9562928614112,48.680756983693],[-1.9425512881469,48.685719750246],[-1.9380749435582,48.694458847226],[-1.905837502586,48.690484641205],[-1.8905081889989,48.698944421746],[-1.8745830467838,48.694893912876],[-1.8561321209073,48.704854504824],[-1.8371380899061,48.679159712785],[-1.8627254313798,48.667274741628],[-1.8633547109875,48.659420480639],[-1.8716628360703,48.64740579596],[-1.8666223954374,48.635297119972],[-1.8569581590835,48.624576587136],[-1.8450690325377,48.616364824796],[-1.8221188983634,48.610007750763],[-1.7641502834765,48.60355862709],[-1.7017734211771,48.607233355175],[-1.6751542146205,48.6114230382],[-1.6611083246856,48.61074613166],[-1.5710894380361,48.626441149011],[-1.5651218255326,48.614397614273],[-1.5484855009897,48.607366445795],[-1.5396520439432,48.599920146805],[-1.544011006159,48.587389031303],[-1.5429927154595,48.580446827686],[-1.5286423474284,48.579179736848],[-1.5189218496777,48.56659037005],[-1.5291705857729,48.560522846907],[-1.5332855375208,48.548003700235],[-1.519564216371,48.540018024898],[-1.512277768964,48.524834117063],[-1.4956406657121,48.508898642535],[-1.4899417997599,48.489372357681],[-1.4731862558468,48.485386403307],[-1.4670861806686,48.48806705044],[-1.4492603238973,48.486102161685],[-1.4362528107594,48.478368227471],[-1.4403529299447,48.471140825579],[-1.429135838213,48.462552562467],[-1.4064842226881,48.460604032661],[-1.3966756078064,48.462052879811],[-1.3772457352191,48.458282754255],[-1.3463506846745,48.471670546758],[-1.3450398581682,48.484912379925],[-1.3393694052252,48.490940085021],[-1.3302853407871,48.489791631794],[-1.3263369028651,48.498742404871],[-1.3025661285534,48.498856875187],[-1.2882493476535,48.506990431124],[-1.2792034941015,48.509166405754],[-1.2695738148732,48.524058079717],[-1.2722481273192,48.533920331809],[-1.254274261097,48.543267861594],[-1.2363206998987,48.538079953318],[-1.2158216927154,48.538229063528],[-1.2065516679372,48.542206088249],[-1.1889294040247,48.52889285086],[-1.1699074343327,48.531104413062],[-1.156893190635,48.521285821117],[-1.1470767776101,48.517498765375],[-1.1305430206604,48.52170348713],[-1.1160901264748,48.5212333284],[-1.0969039995416,48.512091635194],[-1.0701643748629,48.508492017418],[-1.075717285974,48.499392729686],[-1.0782957929126,48.481154857966],[-1.0741061961301,48.473896847289],[-1.0639645498148,48.466954435587],[-1.0654330620157,48.451695678779],[-1.0793641401546,48.443271982049],[-1.0827926455739,48.433057379747],[-1.0779200339792,48.421477186884],[-1.0783677064971,48.413230711968],[-1.0681208970941,48.404716742704],[-1.053937234376,48.383986913354],[-1.0646292178107,48.368281337083],[-1.0590029395387,48.358994435228],[-1.0598919207817,48.350532594956],[-1.0558182376068,48.340683235403],[-1.0450195990474,48.32772872854],[-1.0592143517314,48.312093827381],[-1.0820920155689,48.298391604095],[-1.0930408735111,48.281855553692],[-1.1000554557338,48.25927761239],[-1.0865989301563,48.227529635817],[-1.0806036422976,48.21949752801],[-1.0873107692067,48.209806916083],[-1.0747741638529,48.198201373069],[-1.079605768256,48.183480590178],[-1.0738876778536,48.159661823604],[-1.0602880762288,48.15011075649],[-1.0591416106668,48.125077547289],[-1.0527563302629,48.10735152844],[-1.0496111794277,48.089801151393],[-1.0406036968359,48.078179883231],[-1.0232901182126,48.068911872714],[-1.033830641773,48.05209341916],[-1.0277969380856,48.044863699713],[-1.0330632921231,48.031188955766],[-1.0182078693094,48.012308274749],[-1.0168893967587,48.003728266054],[-1.021259621245,47.994939309553],[-1.045096271371,47.987097320485],[-1.0709659537463,47.981801155317],[-1.0908100123801,47.98774338815],[-1.1026780017247,47.989064346633],[-1.1228021186321,47.986671335599],[-1.1260752876073,47.973307719181],[-1.1343829543823,47.969309177864],[-1.1539896711831,47.96581664419],[-1.1613811233462,47.952310307885],[-1.1595152529454,47.939219922042],[-1.1671197731246,47.93471641408],[-1.1663141666181,47.923578184002],[-1.1754814134505,47.910385737305],[-1.1762242926663,47.897399695909],[-1.1966306275523,47.889267731968],[-1.1969660077971,47.8789391525],[-1.1891865993477,47.867976952617],[-1.2030225271774,47.856844148885],[-1.2164918382318,47.857201283697],[-1.222737283795,47.852599843541],[-1.2139544800221,47.844315066059],[-1.2206362424472,47.820389620636],[-1.2327236903989,47.820244561296],[-1.238247803597,47.809992506553],[-1.2458850128779,47.776717450948],[-1.3184870728098,47.792334376846],[-1.3528652871869,47.797688995885],[-1.3631664145966,47.801683607753],[-1.3772932944092,47.812713141041],[-1.3813446142742,47.822668998285],[-1.3904289319245,47.828276258082],[-1.4178500987788,47.827486856246],[-1.4249168477477,47.832841359769],[-1.435426799044,47.83115216305],[-1.4628972269562,47.833557723029],[-1.4818132504128,47.831893536154],[-1.4669179596494,47.809780189045],[-1.4684440000216,47.8059033883],[-1.4928971911208,47.798439989341],[-1.5042386939766,47.800947509052],[-1.5202764448571,47.793620421696],[-1.5280610367888,47.785843354761],[-1.5519088415196,47.784014922086],[-1.5934046637562,47.776049297939],[-1.5981151893439,47.766615164584],[-1.6163542814852,47.764155016463],[-1.6260806089052,47.756571625148],[-1.6355680463584,47.74265760999],[-1.6390681088186,47.731229794449],[-1.6381811285931,47.72231109575],[-1.6454761757831,47.721464189516],[-1.6548173400684,47.712589314425],[-1.6641158381935,47.711144721547],[-1.6863422821157,47.713034371357],[-1.7051414585604,47.709321517725],[-1.7133831145586,47.699308113335],[-1.7292404629403,47.699070332406],[-1.7354918450583,47.704030670166],[-1.754669062014,47.70617243813],[-1.7724177137179,47.698454240157],[-1.8028599988222,47.702303252055],[-1.8250533703276,47.708269117018],[-1.8415465142207,47.705493872656],[-1.8640156728505,47.706980966313],[-1.880073341802,47.695308629028],[-1.8918360415668,47.696328031406],[-1.9363036351526,47.686649217665],[-1.9538162196423,47.672268062701],[-1.9691960862159,47.677526213073],[-1.9690592974,47.688368806165],[-1.9743811536912,47.693936715593],[-1.9852234827543,47.683232805983],[-2.0093555248025,47.671376463587],[-2.013316284318,47.666003385464],[-2.0357277498302,47.668540889438],[-2.0430946586878,47.665696588636],[-2.050624831954,47.651134018014],[-2.0579097595869,47.649483633439],[-2.0747327428802,47.651662965349],[-2.0898837230131,47.642709543195],[-2.0970339249479,47.631356309182],[-2.0849952925543,47.621229400095],[-2.0869236114994,47.602779172942],[-2.0992687458213,47.597488169512],[-2.1037228936324,47.589435010495],[-2.096507139486,47.572369157778],[-2.1038869792414,47.549970178949],[-2.096829841083,47.540329954312],[-2.0985591504874,47.533957226787],[-2.1073294072614,47.531054380017],[-2.1560180197876,47.522028206659],[-2.1529569093967,47.510962718509],[-2.1541860993449,47.496364966339],[-2.1636756892187,47.49050097161],[-2.1833018888491,47.491696689458],[-2.192163736718,47.496643815865],[-2.1837606578958,47.501791543642],[-2.184622799181,47.511938749674],[-2.2066684734953,47.510040688056],[-2.2199696788078,47.505419526219],[-2.2442830226806,47.493603343394],[-2.2656383885011,47.501780337272],[-2.2585200153358,47.504528170665],[-2.2629685042061,47.512911091518],[-2.2808336661554,47.509587432992],[-2.2965137349146,47.51605888675],[-2.2991228743726,47.500477533121],[-2.3036714616823,47.49241124835],[-2.3131411665125,47.485904562585],[-2.3128644981072,47.464470727328],[-2.3239404651198,47.459700150766],[-2.3463648513449,47.457849990711],[-2.3540439813745,47.454520038759],[-2.3709692377347,47.463384419512],[-2.3822957470498,47.462247958261],[-2.390389834657,47.456871614258],[-2.399942719827,47.455985214433],[-2.4168260809589,47.462051729438],[-2.4230228667484,47.477116356867],[-2.4400824549861,47.465780511452],[-2.453436631799,47.46207522621],[-2.4584933200854,47.44812333026],[-2.4658187901467,47.449802093033],[-2.4804252485529,47.441963079767],[-2.4905571762189,47.446452306175],[-2.4991358587812,47.457540137914],[-2.4889918501409,47.468033929888],[-2.4895613282298,47.474318089711],[-2.5014022305882,47.490518823453],[-2.4937203667699,47.496719184685],[-2.4812257438732,47.495301802155],[-2.4674495382969,47.482627274277],[-2.4566319282751,47.48649918664],[-2.4412197566934,47.496237972727],[-2.4544840297362,47.50695431439],[-2.4661501788359,47.511698006916],[-2.5001329684216,47.51780353312],[-2.5051621326726,47.523097091258],[-2.5177342670181,47.526379124102],[-2.5371281384206,47.525677358637],[-2.544757222766,47.518191712712],[-2.556172145179,47.512844753872],[-2.5731695264161,47.516856993244],[-2.594864559507,47.517692920359],[-2.6058118321704,47.515243886611],[-2.6094941252327,47.509770061639],[-2.6219180968561,47.504642830448],[-2.6238853198868,47.513043352663],[-2.6115717799579,47.514953612529],[-2.6022307930281,47.523493027492],[-2.5867175567864,47.525970484889],[-2.5735934948752,47.545947890549],[-2.559927969571,47.551149229397],[-2.5868524345501,47.563522718081],[-2.5830102351203,47.544093495058],[-2.5950997790228,47.533860071767],[-2.6043518130413,47.531033499908],[-2.6174572174627,47.544577945836],[-2.6197613863302,47.553120080253],[-2.6293614142026,47.549477103692],[-2.620896300155,47.543139537592],[-2.6260111378038,47.530694282534],[-2.650778878004,47.53796758253],[-2.6490453148391,47.52871403441],[-2.6323971230563,47.529969402681],[-2.6362963357436,47.518311441107],[-2.6643333232928,47.518636731497],[-2.6663632444305,47.509807344989],[-2.6812726425683,47.495823503923],[-2.7155101291894,47.505556661277],[-2.7383720762509,47.503971748148],[-2.7464594152624,47.499178906102],[-2.7686807216999,47.497547306973],[-2.783917445629,47.494171291195],[-2.8002084412293,47.487274625086],[-2.820249819976,47.488552319653],[-2.8494633183276,47.498714210554],[-2.8473220606719,47.511542665428],[-2.8715617319757,47.532180194766],[-2.8867515062552,47.537761181776],[-2.9053147509137,47.53836615706],[-2.9127507683233,47.542221258931],[-2.9100056010075,47.552847850571],[-2.8785251291933,47.563822706213],[-2.875192617398,47.554282188137],[-2.8584601857729,47.550660977545],[-2.8388802388699,47.543739594278],[-2.8209970086207,47.542598073556],[-2.8136150628512,47.552976639704],[-2.8053232688367,47.55465217436],[-2.7983285187393,47.54772871596],[-2.7763664183452,47.54637816599],[-2.7800781208128,47.539995170204],[-2.7656825016343,47.536349797594],[-2.7305342531378,47.542486209183],[-2.7342085766345,47.552059689],[-2.7271201608591,47.565348713813],[-2.718401891601,47.567486439417],[-2.7138081735774,47.579402737983],[-2.7019511829809,47.589922636913],[-2.690000413435,47.589629645348],[-2.6893684783836,47.605475178645],[-2.6858183369351,47.617254810447],[-2.6923951849212,47.626672194763],[-2.7101869757185,47.639250695814],[-2.7157627565643,47.632178418633],[-2.7087829379002,47.628877096117],[-2.7068583824059,47.619857356802],[-2.6956189709006,47.610971810996],[-2.7134014552926,47.594743232814],[-2.7210591260306,47.603107177713],[-2.7399219165437,47.603861056383],[-2.7785759216065,47.619153949607],[-2.77515576774,47.625162720347],[-2.75071220553,47.62190984793],[-2.7577479466431,47.632011754392],[-2.7805769364965,47.626366080093],[-2.783280446908,47.620929683472],[-2.7980253950261,47.619354324535],[-2.8119448383424,47.622321040814],[-2.8312640065467,47.613981447085],[-2.8511519612038,47.619021300579],[-2.8683761763816,47.607049879913],[-2.8655555799982,47.59730655576],[-2.8851907493108,47.603861505908],[-2.8912992832039,47.600251055152],[-2.8902083733527,47.583759203505],[-2.8954479129042,47.581494812737],[-2.9055871359278,47.590412052268],[-2.9147145838282,47.591080951176],[-2.9320958563755,47.600389216902],[-2.9391279484845,47.594030070059],[-2.9468653824632,47.607515814492],[-2.9492053452579,47.620300052943],[-2.9472179938322,47.629097718661],[-2.9588456568534,47.627387400625],[-2.9578927965981,47.637888099776],[-2.9766375186447,47.658576868252],[-2.9821003804206,47.655171781052],[-2.97168067816,47.64505595394],[-2.9744526066848,47.639664006057],[-2.9632708243662,47.631813523307],[-2.9607067176234,47.61463764084],[-2.9653352276132,47.601579987203],[-2.9551759826158,47.598617982077],[-2.9649822013031,47.588704907763],[-2.9559516107688,47.579651698895],[-2.9478608265496,47.57934478607],[-2.9428107767728,47.568756823617],[-2.9288355514896,47.55474379968],[-2.9390911128082,47.554097415693],[-2.9514873302492,47.558895907795],[-2.9684287009143,47.557175629484],[-2.9751788529976,47.576068937045],[-2.9862715309049,47.577092614249],[-3.0046872395881,47.566465469116],[-3.0123216393668,47.580152522478],[-3.0228793917846,47.578112102992],[-3.0519734636492,47.577936411937],[-3.0618814356091,47.572517204359],[-3.0738615376547,47.571102118951],[-3.0948867588573,47.564687759616],[-3.1065771207183,47.574439681659],[-3.1035813029521,47.583875926358],[-3.1304124258813,47.595994049527],[-3.1294822782995,47.574986035076],[-3.1232563342713,47.569508296346],[-3.1283264863235,47.561155649925],[-3.1333592273144,47.544057720215],[-3.1329801809192,47.532940856127],[-3.1265682020102,47.515571637729],[-3.1202689791131,47.510193523895],[-3.1187883281895,47.498761676631],[-3.1099177580575,47.490095631431],[-3.0945017004357,47.48241159014],[-3.0996239283661,47.472659280146],[-3.1178050237851,47.478792204713],[-3.1310768433146,47.473341925849],[-3.1438097827755,47.483493521766],[-3.1517804898255,47.50387573681],[-3.1510830738294,47.513240426176],[-3.1573094190216,47.527777147938],[-3.1424420706013,47.533350052758],[-3.1345818841427,47.548823597227],[-3.1383935427929,47.559327887066],[-3.1397514157784,47.579595849581],[-3.1494412574588,47.596336414351],[-3.1583739612277,47.606980561921],[-3.1926562041934,47.621875108037],[-3.2097600334006,47.640692378745],[-3.2048348154766,47.652288439195],[-3.2081335587952,47.663424134982],[-3.1905086423658,47.682544307053],[-3.1622880424494,47.680141384504],[-3.1644539365533,47.694638292784],[-3.1439930291641,47.706565141662],[-3.1280609317144,47.705557196606],[-3.1314171963644,47.71283707385],[-3.1259673333102,47.723460801941],[-3.1493565548036,47.721594210494],[-3.1493499098343,47.737340126654],[-3.161008055411,47.73537887244],[-3.1600761495593,47.728976621526],[-3.1746363055634,47.723148407528],[-3.1687810020071,47.704127663223],[-3.1946342296882,47.703535994129],[-3.2010030764507,47.697371761748],[-3.1903765047009,47.690890020276],[-3.2065278804508,47.672945488888],[-3.2189237367916,47.666402207114],[-3.2109296431363,47.655062695853],[-3.2149712295324,47.645222611468],[-3.2432568168208,47.662982381585],[-3.2708992101864,47.678872772241],[-3.2878626003796,47.700955753699],[-3.2955569268779,47.702972616608],[-3.3111004799677,47.701542726074],[-3.3175576788183,47.705105920031],[-3.3442241173144,47.70835964689],[-3.3540324221035,47.703281447243],[-3.3639383928461,47.709062757079],[-3.3427340330799,47.719388265728],[-3.3490788842555,47.72931295062],[-3.3361476227018,47.728997614093],[-3.3215796590588,47.73525260819],[-3.3135540007668,47.746463211784],[-3.3057310772884,47.74833039532],[-3.2978560945981,47.768548758802],[-3.3167640619277,47.756496417246],[-3.3238312586273,47.747889296245],[-3.333042362653,47.743689149171],[-3.3514545169925,47.744278722575],[-3.355826445994,47.732409734807],[-3.3671634315263,47.725361124789],[-3.3675668898422,47.717947229619],[-3.3871098313882,47.701882463104],[-3.4304385578708,47.703212158669],[-3.4527575847414,47.695339093038],[-3.4638578995064,47.705832814713],[-3.4794942914613,47.714386099732],[-3.5002201860967,47.731474104191],[-3.5051314690212,47.745702801045],[-3.5209645860149,47.757667759682],[-3.5300214665675,47.774211050848],[-3.5299340818516,47.782467704588],[-3.517378148747,47.805037826205],[-3.5359136532779,47.816437273679],[-3.5382920395566,47.836022619198],[-3.5240076654732,47.844903373787],[-3.5230056259837,47.849146782891],[-3.5396500367876,47.836179727509],[-3.5415735087146,47.82278037201],[-3.5212461653116,47.798868078426],[-3.53051730308,47.791502368376],[-3.5323062304549,47.768279004853],[-3.5386367482063,47.762638930067],[-3.562529511804,47.768194082971],[-3.5791169851307,47.767577448995],[-3.6173276112343,47.769506747908],[-3.6430519534915,47.774569329599],[-3.646811655721,47.778818400263],[-3.670099651884,47.782985158502],[-3.6808379137393,47.776793307824],[-3.7178229109781,47.796523695646],[-3.7218026363467,47.803803079831],[-3.7325477346747,47.802927405811],[-3.7613726155759,47.790506218278],[-3.788240857282,47.791328352432],[-3.8005952117561,47.787633600944],[-3.8206986898906,47.797035412496],[-3.837052356745,47.797206603832],[-3.84572557896,47.792371643861],[-3.8536850991125,47.803179888577],[-3.8653715148318,47.809482207573],[-3.8923444805786,47.83181405626],[-3.9024789053236,47.835940597569],[-3.8953330854301,47.851456671771],[-3.9059288131014,47.856053716976],[-3.9115007019574,47.870280163635],[-3.9291853857822,47.870728950257],[-3.9318150077372,47.879930376283],[-3.9474946202184,47.88711050561],[-3.952255270628,47.894973629627],[-3.9727069922104,47.897113244288],[-3.9900268008062,47.88273500359],[-3.9835079713108,47.860854249073],[-3.9771079749911,47.853797355451],[-4.0255592139411,47.850394911361],[-4.0415835187416,47.845999773961],[-4.0552180992409,47.858290390712],[-4.0777227188397,47.86652861959],[-4.0973424184599,47.861927402731],[-4.1033355392797,47.870935392975],[-4.1175131185531,47.876648114661],[-4.1153436191058,47.884957075533],[-4.1240918215755,47.887653785645],[-4.1350139887829,47.899319953681],[-4.1413175344589,47.900932795588],[-4.1443044504617,47.910760442169],[-4.139164438695,47.922460714167],[-4.1265483456658,47.930694608117],[-4.1181705270283,47.930255946671],[-4.1097870557359,47.936359164606],[-4.1095097330885,47.949458350167],[-4.1003241613862,47.951228624348],[-4.0942945270601,47.962343568462],[-4.1016356245061,47.971599102005],[-4.1154592154278,47.951971718394],[-4.1108035376299,47.93643845362],[-4.116939924733,47.931723171212],[-4.1308490218786,47.931268820614],[-4.1387273378666,47.924044327709],[-4.148590650053,47.911784831299],[-4.1456111634641,47.897377929735],[-4.137658347962,47.894582683745],[-4.1214402638717,47.882431174872],[-4.1220414405413,47.877480552794],[-4.112806039055,47.864208198344],[-4.1260449628811,47.86417449959],[-4.1384513988378,47.860372058344],[-4.1635564220902,47.849182582249],[-4.1751052516171,47.875971241102],[-4.1956480316546,47.876129863398],[-4.1917255768507,47.867926519042],[-4.1985842210014,47.859767014899],[-4.1893682915433,47.851394814187],[-4.1779637170825,47.83448054667],[-4.169637218528,47.835983578473],[-4.1594079263305,47.831817813505],[-4.1665272788102,47.81562709526],[-4.1747961215709,47.807720089743],[-4.1923054697265,47.797375930596],[-4.2102829763554,47.801668247082],[-4.2165941479178,47.793145496317],[-4.2324661582068,47.793694342897],[-4.2692270352914,47.79098118891],[-4.278552033431,47.793791055402],[-4.2908690668838,47.792683316384],[-4.2985421674237,47.800459408076],[-4.3121953465001,47.800898472176],[-4.32359993608,47.79785495381],[-4.3422494923384,47.799673907649],[-4.3624139097032,47.795739457012],[-4.3740484540088,47.798476085782],[-4.3716114594948,47.80777876035],[-4.3792556925789,47.822050720065],[-4.3498041232485,47.83078661588],[-4.3461614463077,47.83907388297],[-4.3476870805612,47.849005072333],[-4.3600577158752,47.879146436114],[-4.362571617849,47.889266575343],[-4.3790334776921,47.914084532462],[-4.395188435554,47.934409652937],[-4.4098520632839,47.946650557322],[-4.4246099459353,47.963758867166],[-4.453576704456,47.981777636275],[-4.4746789421278,47.985624949661],[-4.4826653312528,47.993824490611],[-4.4980779158615,48.001183040607],[-4.5148540490952,48.006067730047],[-4.5256147363767,48.006067667043],[-4.5368798410152,48.012491630575],[-4.550096166671,48.011713275225],[-4.5647501712087,47.999835676162],[-4.5907349278799,48.006794478828],[-4.597265482557,48.014881869407],[-4.6171479742083,48.016679284353],[-4.6329587586753,48.029369004938],[-4.6460824443153,48.023304150678],[-4.6997885692117,48.027891769892],[-4.7105952929249,48.033199609507],[-4.7230336277547,48.033599672317],[-4.7319575291791,48.040893238655],[-4.7124639734808,48.042115186074],[-4.7068549694099,48.04999288348],[-4.7163398904359,48.062467036521],[-4.6737632606973,48.060829548571],[-4.6682276450746,48.070200865274],[-4.6329864019536,48.067656900838],[-4.6212551186766,48.06856975321],[-4.6055567322678,48.075144649057],[-4.5906529113319,48.077103152291],[-4.580146507137,48.081908477448],[-4.5536216450504,48.077132543168],[-4.545646174971,48.07845960521],[-4.5400399621897,48.087861184127],[-4.5144760304168,48.088898642776],[-4.4885983026016,48.086473104323],[-4.4666979200231,48.099143817185],[-4.4569858789134,48.096458543946],[-4.4350684487573,48.097322911408],[-4.4102497059559,48.106021543169],[-4.3936094931243,48.10445280582],[-4.3743959355115,48.110158765816],[-4.3635604323207,48.109200301918],[-4.3549482349925,48.10371581043],[-4.3069930438711,48.089185950308],[-4.2969336649841,48.092193155485],[-4.2842966027835,48.107888922651],[-4.2815394753097,48.115546749849],[-4.2837291765835,48.126894213088],[-4.2717328773485,48.133054000516],[-4.2730799332603,48.154184060675],[-4.2928384902475,48.157399085257],[-4.2962454405426,48.165147430098],[-4.2920632378488,48.176348134139],[-4.3011254537871,48.191446905092],[-4.3154011317845,48.201590197777],[-4.3320245514115,48.206252420086],[-4.3674265719653,48.205181125133],[-4.3764153744941,48.217120653017],[-4.4112371701961,48.222749021747],[-4.4255159659909,48.229011423558],[-4.4317441689243,48.228335889789],[-4.4483574330506,48.23563427883],[-4.4890285598601,48.236209131048],[-4.5016483626877,48.230419925672],[-4.4973006895694,48.216773771782],[-4.5107514965186,48.211453602973],[-4.5193408676193,48.192342464231],[-4.5401709706587,48.180690252545],[-4.5396785660795,48.170248926865],[-4.5541303580757,48.16777550723],[-4.5539161923019,48.178980950953],[-4.5496466530638,48.194260085865],[-4.5534516878496,48.211909181419],[-4.5640287889751,48.2322275804],[-4.5542366911133,48.23943709268],[-4.5445091004672,48.241191020822],[-4.5438454031052,48.24868513629],[-4.5581833509587,48.259044482063],[-4.5637622836517,48.255323260533],[-4.583579355652,48.25247718648],[-4.619781824787,48.263922349139],[-4.6151754712281,48.272608618322],[-4.6191913673877,48.277687013901],[-4.6010351660969,48.283328561972],[-4.5920264733919,48.274941952167],[-4.580510315487,48.276821723646],[-4.5666092529207,48.286340243106],[-4.5722318933548,48.298194529125],[-4.5710033055979,48.305488131525],[-4.5793535371685,48.317985114981],[-4.5711366097909,48.33004851178],[-4.5554096260061,48.33827322458],[-4.534438235185,48.341855622806],[-4.5323989547456,48.339322193963],[-4.5453284966877,48.324530697141],[-4.5483564279774,48.309091985071],[-4.5562724762849,48.299755550421],[-4.5526899421663,48.294333094321],[-4.5409637873526,48.290218695274],[-4.5357701963006,48.283943449529],[-4.5217946962434,48.291114428525],[-4.5076962523209,48.310708704249],[-4.5010461586171,48.306105555944],[-4.5129990628384,48.297069816261],[-4.5087664864786,48.284364971679],[-4.5026015309363,48.280860913221],[-4.4835588084111,48.284044560152],[-4.4550522136348,48.292771537786],[-4.4237773421087,48.291670034681],[-4.4121223635074,48.277431878755],[-4.4068502675656,48.275442332471],[-4.3844939336359,48.275154271566],[-4.3660839325116,48.278010699726],[-4.3536674198016,48.285793291692],[-4.3380117997035,48.285592492129],[-4.3080337336786,48.297163385068],[-4.2716752810253,48.295919896917],[-4.2739347422518,48.288971383308],[-4.2845412149644,48.287650160728],[-4.2848570831774,48.275913907112],[-4.2595853011287,48.266201814358],[-4.2459294480179,48.250780318991],[-4.2317540680499,48.250320630547],[-4.2172932355759,48.257615458861],[-4.2080204243049,48.242451425248],[-4.1866606053631,48.246536490853],[-4.1970338862768,48.25110791887],[-4.2079834304869,48.251025418009],[-4.2167166565259,48.260995596762],[-4.2406571035438,48.254405816531],[-4.2484420972136,48.264631942186],[-4.2794340183855,48.277816418923],[-4.2586639746308,48.280337796407],[-4.2339831734409,48.291663390615],[-4.2255916464459,48.287775626172],[-4.1940779875676,48.293672058984],[-4.1927914320833,48.297566770216],[-4.2230912040754,48.296296136643],[-4.2607589991265,48.308808886841],[-4.2717767417457,48.3085010698],[-4.2817306872962,48.314149062808],[-4.2931983397824,48.311355653833],[-4.3065317325636,48.314942350033],[-4.3311785781541,48.314620491654],[-4.3098044941465,48.327389890558],[-4.3054717563496,48.333012617327],[-4.2909479256962,48.341952755975],[-4.2780004139394,48.344874608976],[-4.2976741907114,48.355911039667],[-4.3050740561368,48.354482380706],[-4.3021566253156,48.34377489677],[-4.3293983637326,48.340226102871],[-4.3353494088236,48.351018718927],[-4.3446175802594,48.343247421931],[-4.36648632172,48.344799621581],[-4.3678442897223,48.334697246192],[-4.375252431501,48.326306182232],[-4.4046736898418,48.323603347031],[-4.4163170599611,48.324328314613],[-4.4212814557887,48.332856308545],[-4.4474594889754,48.325680817565],[-4.4496265161822,48.337161490176],[-4.4395482007447,48.341279779512],[-4.4417567491006,48.353615394797],[-4.4290271772091,48.365619656485],[-4.4186091872326,48.368726808201],[-4.4075253481222,48.380534385031],[-4.3961298593091,48.38650177881],[-4.3680405113101,48.39489925028],[-4.3593237104943,48.402144960849],[-4.3428458694475,48.403365443241],[-4.3093501979999,48.419403653203],[-4.2819732297193,48.434393207398],[-4.287872061805,48.436420644162],[-4.3094694139567,48.423596726474],[-4.3381817157191,48.414949405527],[-4.3459483488972,48.409663044293],[-4.3686013125106,48.40664262085],[-4.3688602316922,48.401485058956],[-4.386795431773,48.397755391732],[-4.4029442647564,48.390018662486],[-4.4249472968664,48.397600203449],[-4.4333536489875,48.396593913062],[-4.4352859423298,48.383389050061],[-4.4427532805509,48.381948489599],[-4.4563561684304,48.387015703714],[-4.4672858436945,48.381010080426],[-4.4818709168706,48.382521354469],[-4.5070284331619,48.375177195361],[-4.5380169478944,48.357124862764],[-4.5496694490256,48.362001489858],[-4.556901556146,48.356967518117],[-4.5949382473261,48.34398230697],[-4.6087240373586,48.337888380763],[-4.6281010576136,48.337509419286],[-4.6392496162242,48.34493297515],[-4.6542388141476,48.346681343342],[-4.6671754786758,48.352722054618],[-4.6805572523649,48.355611191009],[-4.6994701606877,48.350825211906],[-4.7031861104856,48.345439143685],[-4.6984198568155,48.339008917129],[-4.7076075032169,48.33225949433],[-4.7268279563533,48.330101611584],[-4.7412649297657,48.331137342157],[-4.755151556882,48.328314605498],[-4.7723051357322,48.3291788831],[-4.7713352334093,48.348321487205],[-4.7807548157661,48.358363845243],[-4.7609158756256,48.372752574444],[-4.7744540702471,48.389384734113],[-4.7736837961353,48.404922524224],[-4.7856134234263,48.409183783259],[-4.7933430625428,48.416235956794],[-4.7829693643734,48.437550153141],[-4.7762887997551,48.44323010222],[-4.7783033027269,48.449337151566],[-4.7691821477998,48.462065352166],[-4.7590583232069,48.470397966682],[-4.7754782499743,48.491000702902],[-4.7769978959372,48.503117217189],[-4.7669531385337,48.508949694964],[-4.7677505482026,48.51549084169],[-4.7579904988592,48.520934810502],[-4.7635828540663,48.531059613438],[-4.750430701927,48.531787625414],[-4.7505716364016,48.543395532423],[-4.7369401487605,48.549669633203],[-4.730581474956,48.556345629552],[-4.7073251262934,48.554495469139],[-4.7006100061104,48.565257293095],[-4.6897329488655,48.571618302905],[-4.6751613492295,48.568639591535],[-4.6464232548783,48.572118967627],[-4.6306065814165,48.577693340766],[-4.5960814216726,48.570438077138],[-4.5920294451056,48.55696728141],[-4.5801834734014,48.562246351219],[-4.5940875669374,48.574670422845],[-4.6091605495172,48.575417985689],[-4.6036696454798,48.58297905273],[-4.6076603107424,48.596461551968],[-4.5983162877184,48.608011192206],[-4.5856196284358,48.601472677829],[-4.5907770172397,48.594023648193],[-4.5627715925875,48.598170219165],[-4.5565167429014,48.594799473824],[-4.5455036785654,48.59783340549],[-4.550782271051,48.604094317015],[-4.5608700909489,48.603771154268],[-4.5686991918772,48.611035547029],[-4.5614793437335,48.623801490681],[-4.5503434319799,48.625018824991],[-4.5395490492214,48.631187796313],[-4.5261586212295,48.629376007091],[-4.5217973483906,48.634384422626],[-4.5018039011118,48.621186293816],[-4.4931187647023,48.625414896892],[-4.4782291949973,48.623557861673],[-4.4627692950062,48.627100958455],[-4.4469441913165,48.638394323748],[-4.4149997798362,48.637926090365],[-4.4271033577354,48.652260777339],[-4.3980441994007,48.65561478084],[-4.3801425974664,48.661666859925],[-4.3514034206459,48.676113294185],[-4.3303269284446,48.67546160978],[-4.3291124062469,48.667907661004],[-4.3102390806509,48.667931594289],[-4.2954040446046,48.660446563113],[-4.3160685361226,48.640188688849],[-4.3115885562964,48.635172589811],[-4.298511346251,48.632640665789],[-4.2727657939881,48.649579657653],[-4.2464935655648,48.649709559996],[-4.2333860393386,48.652097867975],[-4.2236435014343,48.648213897066],[-4.1945007324424,48.652175738687],[-4.1987860401536,48.655717939248],[-4.2202278931,48.656147005163],[-4.2096068963467,48.670447739532],[-4.1968161610499,48.677628282862],[-4.1869344610679,48.686462205394],[-4.174061395128,48.686024655247],[-4.1624191936583,48.689758295612],[-4.1270367426342,48.694927216255],[-4.0837978480658,48.692972814592],[-4.0709024391013,48.684670504996],[-4.0575875391344,48.689258711554],[-4.05679529974,48.700628181133],[-4.0429161757203,48.70265342713],[-4.0353886405866,48.713928688184],[-4.02495529368,48.710629584547],[-4.0124824530698,48.714491395544],[-4.0005364915392,48.711631523299],[-3.9834371521249,48.726305142899],[-3.9668077805805,48.71962530493],[-3.9735238414907,48.71002461021],[-3.9757432893007,48.699031896983],[-3.9682004772062,48.689973835843],[-3.9691581056971,48.676107684525],[-3.9531383099577,48.672136886316],[-3.9494659266738,48.652861005926],[-3.9300674451266,48.657839171964],[-3.9211812871032,48.674928420785],[-3.9114347331104,48.669960338823],[-3.8911113303248,48.670896023532],[-3.8925732849232,48.666174874576],[-3.9061966723813,48.660822813734],[-3.8977104457356,48.646355840782],[-3.8895679902243,48.641662476434],[-3.8607964112541,48.632586859442],[-3.8566651166084,48.62062982347],[-3.845545208747,48.626964725465],[-3.856272170722,48.650755902177],[-3.8564327756426,48.660929312176],[-3.8644147711301,48.670330901442],[-3.8466397296643,48.673108945878],[-3.854473660269,48.686373923346],[-3.8482610894395,48.695947065984],[-3.8323743274237,48.711935659748],[-3.8207715463903,48.701352197337],[-3.8189371050949,48.715169992971],[-3.8056106339945,48.711019729093],[-3.7874929573455,48.701796106506],[-3.7761094548232,48.702861922085],[-3.7657078018764,48.708879271701],[-3.733246519616,48.707417936626],[-3.7169828876846,48.702516263423],[-3.7024279161749,48.690384977451],[-3.6884703928375,48.691672302665],[-3.678008056564,48.6868131946],[-3.6609393047034,48.694072404612],[-3.6451676792066,48.690710877885],[-3.6547881028975,48.682400406377],[-3.6427952345386,48.672116059351],[-3.6554581627922,48.664723869854],[-3.659150584255,48.65920940185],[-3.6420873568022,48.669628149236],[-3.6364032001666,48.681876659006],[-3.6229753236901,48.685744443578],[-3.6160667149757,48.682134712863],[-3.6134373556063,48.672125467118],[-3.6013474443039,48.668882399999],[-3.5812522674227,48.670014971375],[-3.567388863762,48.682875835381],[-3.5821292852091,48.688828850154],[-3.5806180997154,48.699098969889],[-3.5848136756599,48.717143137778],[-3.5777341572244,48.722922763845],[-3.5535067685842,48.729599848138],[-3.5494040209786,48.745685503762],[-3.5660238040656,48.760470858523],[-3.5780706522181,48.763052810216],[-3.5850133196812,48.775496976258],[-3.5670493902465,48.796072228502],[-3.5544363965473,48.791566104085],[-3.5350388142712,48.802711262754],[-3.5452296969806,48.811547911235],[-3.5353532236423,48.82420921892],[-3.5132038128061,48.834999450202],[-3.5102190015828,48.827666021396],[-3.4947289999517,48.828909887366],[-3.487057183946,48.835210739121],[-3.4767632379266,48.836553086027],[-3.4682941245516,48.823719601392],[-3.4534252470278,48.815730292786],[-3.4387785622141,48.820131082218],[-3.4282482665937,48.816467818251],[-3.4428880325615,48.803230031461],[-3.4307313974533,48.797223993896],[-3.3975515012589,48.800749976127],[-3.3872194078248,48.805276623502],[-3.3860910507659,48.815072936716],[-3.3570227693774,48.819691247713],[-3.3353898521234,48.828434255251],[-3.3194282929708,48.838251369288],[-3.2918755715046,48.83192266916],[-3.2808810565774,48.84207127438],[-3.2643350622758,48.834201312354],[-3.2566001531918,48.846756455248],[-3.2460295399846,48.856723818997],[-3.2347983819655,48.861980153414],[-3.2317564057757,48.867411825697],[-3.2197255192397,48.866460220845],[-3.2109738852073,48.854759740147],[-3.213490950434,48.839397397676],[-3.2028272774671,48.834506769958],[-3.2082284171302,48.813122349364],[-3.1967385179982,48.818392675983],[-3.1981611200673,48.826345008208],[-3.1827618229112,48.842557979967],[-3.1738028697326,48.841865128735],[-3.1679437352953,48.853146277189],[-3.1581455962223,48.851635850053],[-3.1344876629569,48.858231534485],[-3.1298367560421,48.864364228073],[-3.1139737119264,48.866740453944],[-3.0840007772064,48.86569562865],[-3.0934910357785,48.858795039139],[-3.08514880221,48.849384963641],[-3.0891457935409,48.832182747832],[-3.0791514131107,48.830043840648],[-3.0921032112249,48.808980389522],[-3.0983841004526,48.804282774149],[-3.0973562864529,48.794283712041],[-3.1017797073776,48.783225484414],[-3.1197930438538,48.773596321728],[-3.1213980681585,48.76526963585],[-3.0996365562548,48.768295722963],[-3.0934962179147,48.791936271699],[-3.0854700296144,48.810358940308],[-3.0704323241691,48.82090011268],[-3.0620643799616,48.822425000014],[-3.0523569695531,48.815396803409],[-3.0386386693612,48.819468829234],[-3.0136302920911,48.822137752778],[-3.0079489411489,48.818123335033],[-3.0167821898089,48.812113151135],[-3.0061398616086,48.800293214921],[-3.0208405402882,48.797138467927],[-3.0249972636159,48.79144626786],[-3.0416526216166,48.789013531286],[-3.0436410172513,48.78335094785],[-3.0239926616859,48.783128253914],[-3.029395265054,48.775914254773],[-3.0159167403363,48.767132102258],[-2.9895062091921,48.762638625905],[-2.9645414610051,48.762494954478],[-2.9554262913638,48.769189501689],[-2.943654576565,48.758338397641],[-2.9286347276991,48.75442692542],[-2.9416450538097,48.745308799004],[-2.9341631909275,48.737092242062],[-2.9479075153591,48.727211276245],[-2.9417423433506,48.719207198957],[-2.9320923985813,48.717491879688],[-2.924759508377,48.707466143849],[-2.8896153283211,48.696372886916],[-2.8800886489961,48.67427144179],[-2.8582441777909,48.672308279455],[-2.8413210056003,48.663352340555],[-2.8377644227621,48.656020055446],[-2.826930459455,48.650565045336],[-2.8241580988201,48.634957454331],[-2.8153839194992,48.609899617724],[-2.8251563129905,48.600303982104],[-2.8196028872168,48.593528075876],[-2.8065963669984,48.591904974754],[-2.7979631859761,48.586577481759],[-2.7793122045816,48.584979704743],[-2.7726822658829,48.570547123262],[-2.7495486430359,48.562166461746],[-2.7179738137973,48.555376234837],[-2.7247921572497,48.546914137203],[-2.7145653373375,48.529029220355],[-2.6984370712725,48.505683606103],[-2.6847820858607,48.498049171075],[-2.6788699666557,48.503939642438],[-2.6765221053678,48.519145534995],[-2.6815598011872,48.531128876642],[-2.6684668905712,48.534818647729],[-2.6579857250454,48.526362123163],[-2.642926445977,48.523601503198],[-2.6302809106614,48.52608884558],[-2.6312659297144,48.538126147652],[-2.6055582106646,48.551823337566],[-2.5686751748086,48.578559898858],[-2.5502739246772,48.598731144351],[-2.5315182573984,48.597242979825],[-2.4966511974711,48.608236480629],[-2.4734313644435,48.62252003118],[-2.4680102449695,48.635312407707],[-2.4802182452475,48.637139971893],[-2.4680059332961,48.649583903116],[-2.4533521947478,48.647603843479],[-2.4356296138472,48.652182703457],[-2.412172534292,48.641490561257],[-2.3963208098213,48.642746205929],[-2.3851972631136,48.652775428242],[-2.3566430746048,48.658128435538],[-2.329817993644,48.67243374983],[-2.3268351903798,48.682690335758],[-2.3128614051641,48.68092479798],[-2.3095552780235,48.670248867579],[-2.2873086848415,48.668048684079],[-2.2986303647576,48.650777277754],[-2.3082350519385,48.645115878008],[-2.3116350377043,48.63457311919],[-2.3378377315034,48.620070642052],[-2.3093749578841,48.615045727598],[-2.2998911449283,48.624056828509],[-2.2873445575751,48.627320739303],[-2.284514633269,48.632393122516],[-2.2590733904716,48.644952415823],[-2.255746903771,48.636212558848],[-2.2433554764628,48.623384047682],[-2.2457501789659,48.615403901289],[-2.2286025908783,48.607719393152],[-2.2239525410226,48.595382260905],[-2.2128021263747,48.591597817216],[-2.201779275207,48.583790688394],[-2.1915532278103,48.592304252064],[-2.194714982728,48.599920578374],[-2.1821193547183,48.599174901368],[-2.187757441748,48.587190961848],[-2.1867457952027,48.581332257121],[-2.1734764888765,48.577917159837],[-2.1642654103968,48.578892956541],[-2.1567074926763,48.587698435173],[-2.1695676200346,48.596654644275],[-2.1658043885874,48.604235347881],[-2.142859606356,48.611174051597],[-2.123706231573,48.604405598781]]],[[[-3.0023212314614,48.836321026552],[-3.0114954582397,48.841507416855],[-3.0130894554754,48.856420115989],[-2.9941385070247,48.864342720942],[-2.9944706950371,48.847148998272],[-3.0023212314614,48.836321026552]]],[[[-3.5838774341471,48.794094648663],[-3.5836489264715,48.804750470639],[-3.5657740104496,48.807749291796],[-3.5701295554214,48.797239145154],[-3.5838774341471,48.794094648663]]],[[[-5.0725232805168,48.482730316788],[-5.056629077213,48.476824762454],[-5.0569734591597,48.468162401798],[-5.0403484938817,48.465113540285],[-5.0582321919735,48.45095691003],[-5.0824009760553,48.448344776816],[-5.0925866419522,48.439891473019],[-5.1059118332911,48.436349765333],[-5.1091921689816,48.443357330074],[-5.0980583552481,48.44608363557],[-5.0924748133511,48.45196258108],[-5.1016868570136,48.455914476174],[-5.138001239929,48.448413926313],[-5.1331652198509,48.457205597014],[-5.1113600694265,48.465174516755],[-5.1035961538682,48.472329242796],[-5.0840283627307,48.472702685549],[-5.0719207191004,48.478208180718],[-5.0725232805168,48.482730316788]]],[[[-3.9918110541337,48.736399873504],[-4.0090123106371,48.742838902418],[-4.0221693339987,48.738491540178],[-4.0397770750633,48.746526903072],[-4.0218503360744,48.75230874743],[-4.0062293732672,48.752081933672],[-3.9899103155008,48.742601867881],[-3.9918110541337,48.736399873504]]],[[[-2.8828361523996,47.342633634283],[-2.8688242027986,47.347187413333],[-2.8640228377349,47.337396656922],[-2.8851980047361,47.332204587601],[-2.8828361523996,47.342633634283]]],[[[-3.4217929168617,47.619997807491],[-3.4406778342018,47.627446574356],[-3.4456273600808,47.623593013481],[-3.4619142000708,47.620345627722],[-3.4742467748166,47.62698825448],[-3.4852053906539,47.628378526095],[-3.5076315908068,47.640599145055],[-3.5132724400036,47.65091255248],[-3.4969409139507,47.653807933351],[-3.4442954529884,47.643499781555],[-3.4294853772433,47.642297272249],[-3.416338603723,47.630594308492],[-3.4217929168617,47.619997807491]]],[[[-2.9481489550955,47.373337178232],[-2.9612329905761,47.384142688142],[-2.9734969970118,47.385337455258],[-2.970456003478,47.393456515554],[-2.9497473196772,47.391474918453],[-2.9539501005726,47.383664372021],[-2.9481489550955,47.373337178232]]],[[[-3.2354396164691,47.323814198525],[-3.248052686952,47.330283433793],[-3.2635566742404,47.352257081813],[-3.2592142344527,47.357022204229],[-3.2618219738531,47.371275182462],[-3.248770867599,47.379576261704],[-3.244700982732,47.387618359758],[-3.2340762447846,47.379338291339],[-3.2175838675208,47.378419150942],[-3.2163525094804,47.373608898918],[-3.201274824189,47.372213510615],[-3.1935193838263,47.365912324522],[-3.1730081240198,47.361684567685],[-3.1558604781053,47.361080830931],[-3.1534877470215,47.348344091052],[-3.1451698763814,47.342292073717],[-3.1396470634137,47.329840381841],[-3.1150509508386,47.324060678234],[-3.1110236087502,47.319021634193],[-3.0931245649635,47.315130772229],[-3.0741240211962,47.317262323892],[-3.0633503439268,47.315039283837],[-3.0678622487088,47.296750488818],[-3.0759226223168,47.286048310497],[-3.0865518494098,47.283069445657],[-3.1058963104173,47.284999245839],[-3.1228947190822,47.290552518526],[-3.1362157348542,47.287982908601],[-3.1512588812655,47.293806467377],[-3.1762732030367,47.300368448324],[-3.1856628166084,47.295185330833],[-3.2021408353701,47.296875977003],[-3.2171954083953,47.293469947191],[-3.2284492482294,47.301290747295],[-3.2387014326446,47.303636953067],[-3.2490903024394,47.316119926971],[-3.2354396164691,47.323814198525]]],[[[-2.8595623119286,47.559896175763],[-2.8615807977029,47.568279187496],[-2.853851482193,47.594134904148],[-2.8447503210418,47.601281769517],[-2.8379117800168,47.591917276455],[-2.8501830550859,47.586592024447],[-2.8542598282248,47.575141694299],[-2.8533540092104,47.567483466314],[-2.8595623119286,47.559896175763]]],[[[-2.80960545819,47.578258375141],[-2.8090954794976,47.592251881558],[-2.7939896392391,47.601731628428],[-2.7868109056903,47.595356275895],[-2.7994090459784,47.588534826736],[-2.80960545819,47.578258375141]]]]},"properties":{"code":"53","nom":"Bretagne"}},{"type":"Feature","geometry":{"type":"MultiPolygon","coordinates":[[[[-1.0257391846007,45.574691325999],[-0.99300406059586,45.577175103049],[-0.98915191244273,45.581341317039],[-0.99448166466087,45.598471363385],[-1.0091096377528,45.597495172168],[-1.0149548718972,45.602385291749],[-1.0096347332233,45.611436531328],[-1.0203205505127,45.62151668447],[-1.030734415261,45.616566131118],[-1.0488627706461,45.620296785838],[-1.0728559725266,45.634224904397],[-1.1158529629831,45.646976690887],[-1.1615633042487,45.674286390956],[-1.1764544979496,45.679631218564],[-1.1960486136478,45.691215860779],[-1.2093162908787,45.696695600645],[-1.2303338364371,45.693221363131],[-1.237223219004,45.705895619461],[-1.241444700502,45.758155786245],[-1.2437947470471,45.772440059531],[-1.2425689958526,45.781575345749],[-1.2310317959574,45.788930983319],[-1.2210183884462,45.789634505334],[-1.2089657293798,45.795749040068],[-1.1919967968082,45.789370772875],[-1.1749504479715,45.793552459949],[-1.1595510306588,45.801417483779],[-1.1409697147076,45.798212034993],[-1.132892019615,45.807422776222],[-1.137157980964,45.819898709185],[-1.1502088102145,45.830706445563],[-1.1545872388857,45.840814345567],[-1.1680717875645,45.845145151766],[-1.157329540581,45.85452985161],[-1.153187170193,45.862358814767],[-1.1210426718188,45.856462545265],[-1.1008913277365,45.872209699286],[-1.0952763372146,45.885483654804],[-1.081212277475,45.898789509328],[-1.0737883386215,45.914234695342],[-1.076864753109,45.936699490286],[-1.0959775740275,45.942016808278],[-1.094399319351,45.948773629702],[-1.0643262929189,45.949911547118],[-1.0650836422026,45.955876942711],[-1.0760315150124,45.958641591561],[-1.0824929437006,45.965886353981],[-1.0833944490579,45.978241345779],[-1.0942868235613,45.98407853197],[-1.0989532154989,45.990511008295],[-1.0842912197077,45.995595529343],[-1.0630867195678,45.994435355467],[-1.0556386696802,45.999342515679],[-1.0526895091436,46.011182592646],[-1.0611535121644,46.028848986934],[-1.0567431675806,46.035915721056],[-1.0670030997899,46.050149738322],[-1.0888412421854,46.053947103542],[-1.0938493810902,46.077074374166],[-1.1007240096268,46.093795091913],[-1.1150482792811,46.102319452799],[-1.1300954807717,46.101767963634],[-1.1431683463329,46.10884040725],[-1.1253028796809,46.110920815275],[-1.1264071986579,46.124260358299],[-1.1483371896137,46.132006346959],[-1.1554222855991,46.137461403915],[-1.1729310087073,46.139283394105],[-1.1712255083601,46.146518573114],[-1.1618314872923,46.148520817666],[-1.1607229685204,46.1554895116],[-1.1893147393064,46.150729023324],[-1.206939036394,46.145764027266],[-1.2284491051228,46.1497260682],[-1.2420434969372,46.157446715501],[-1.2361325026972,46.166145111409],[-1.2238703709795,46.165946361191],[-1.2184421668953,46.180122028855],[-1.2066150416523,46.184680886611],[-1.1993303516663,46.194320636545],[-1.2065329820075,46.204362200351],[-1.1990017582044,46.213243547272],[-1.1713508437289,46.224055692443],[-1.1484576572781,46.238406807482],[-1.1411322001501,46.249709112106],[-1.1182950608301,46.261125374832],[-1.1111664091524,46.261342685351],[-1.1219630552981,46.290281706357],[-1.1207134213387,46.296691182666],[-1.1294064331873,46.310272328818],[-1.1236420717667,46.321795835911],[-1.113284059211,46.316302232447],[-1.0997364979128,46.314471710528],[-1.0782951920661,46.316911662518],[-1.0807238252872,46.321431313321],[-1.0645117099073,46.335517206168],[-1.0525331368763,46.342540560637],[-1.0290641764217,46.348867660129],[-1.013809705621,46.35562286986],[-0.99521192821645,46.350317645688],[-0.97744453847283,46.351108789901],[-0.96451829359621,46.365398033698],[-0.95084003340185,46.360617622608],[-0.94112049397563,46.367862165606],[-0.92857576719505,46.371051399922],[-0.93790474501528,46.353157499224],[-0.9441551264402,46.336048129241],[-0.9612310671154,46.323395683014],[-0.93489398189823,46.312857623927],[-0.90480272235534,46.313812430336],[-0.89270136944125,46.320101412175],[-0.88767597392192,46.326322589931],[-0.8509424448661,46.317185675508],[-0.84487598314026,46.3245597282],[-0.84865539686859,46.332512597898],[-0.83988457052554,46.340367099668],[-0.83052754444062,46.341529547924],[-0.82415169186325,46.335854967946],[-0.80732128185426,46.339293680039],[-0.80247564445275,46.325156566217],[-0.78424343720168,46.318861879535],[-0.77570312778264,46.318376375981],[-0.75794915819339,46.311254056955],[-0.75047134037184,46.304254425344],[-0.73459543046899,46.304955701863],[-0.72191414100459,46.302372661742],[-0.7201487066083,46.314890543328],[-0.70757171772654,46.317704940913],[-0.69732735736344,46.325092837487],[-0.67227364916502,46.316216425466],[-0.64825320981615,46.317143530802],[-0.63998183318338,46.322110972748],[-0.63660376728023,46.33759543996],[-0.61868206115959,46.339099077209],[-0.60547077785894,46.347207865876],[-0.60325195656142,46.361468010185],[-0.57567653828611,46.356508034766],[-0.55764744918976,46.363451353574],[-0.53779518169029,46.38646382767],[-0.55052040300574,46.393343323056],[-0.56605536149932,46.393082159377],[-0.57238400631421,46.400707224569],[-0.58189775121858,46.40217377528],[-0.59417281123848,46.410185950063],[-0.61017966919341,46.413733221347],[-0.62088828506372,46.390451131851],[-0.63658749242212,46.395578228534],[-0.63282952674398,46.403812558564],[-0.6406468690526,46.416224664644],[-0.63684012869206,46.432305656566],[-0.61877090027571,46.438854562232],[-0.61983716832458,46.452467117452],[-0.6124273279524,46.45873668738],[-0.6241822995269,46.48674665851],[-0.62483750061224,46.496362745962],[-0.636581601251,46.506095217567],[-0.64519375671477,46.5085710348],[-0.63352903140625,46.526545961083],[-0.61002538912342,46.52729145947],[-0.60213244964129,46.533279525109],[-0.60670934401643,46.562331917411],[-0.61785426354446,46.562043099519],[-0.62456684878994,46.577400290716],[-0.61190793736705,46.588307031212],[-0.61671038535954,46.598536566433],[-0.62702650527698,46.605651097302],[-0.61411399285986,46.62039129053],[-0.62619906297455,46.633078356802],[-0.64405974899964,46.638024434086],[-0.65717243733762,46.634619354943],[-0.64924847916988,46.653283801506],[-0.63771460553181,46.66348907218],[-0.65787343587941,46.676827080382],[-0.68073310425929,46.686803996225],[-0.65619325740221,46.700774517445],[-0.66888364550954,46.717232370405],[-0.68397597689122,46.727863770277],[-0.70015414355827,46.73579562558],[-0.69413275947291,46.742731111953],[-0.70417950073791,46.74945353126],[-0.71534345605879,46.751789737735],[-0.72079949738479,46.762538021138],[-0.72731204616972,46.76763065568],[-0.71783828712373,46.800521372146],[-0.7008577279242,46.80862581328],[-0.70883784005248,46.821063616454],[-0.72752746779957,46.821938243707],[-0.74431663878843,46.830243411726],[-0.75815720893345,46.831399908556],[-0.78164600263284,46.84282764491],[-0.79477643718776,46.861061682533],[-0.80837576068615,46.869152331931],[-0.81527450811283,46.879362263307],[-0.8321856982677,46.884537016923],[-0.82020445366662,46.899619563541],[-0.81977358192379,46.909085252586],[-0.80739348796693,46.9198254879],[-0.8226181521192,46.919496882097],[-0.8291494586578,46.933361861306],[-0.84069799142137,46.933043168191],[-0.85194566174473,46.946506302307],[-0.87298436818273,46.944344247689],[-0.8837974960632,46.950388590831],[-0.87713915299698,46.955855606347],[-0.88359502600069,46.962369264823],[-0.87712517316223,46.968538385199],[-0.88901027465591,46.970996440972],[-0.89196408624284,46.975820414303],[-0.8797290084417,46.975803771985],[-0.85764337306558,46.969397597368],[-0.84915622076396,46.973775579115],[-0.85591689102216,46.979079840933],[-0.83853635765488,46.985503699072],[-0.82697025806846,46.992404409034],[-0.80044123437384,46.994429249843],[-0.78757295549441,47.005134613994],[-0.7738784459047,47.004247669583],[-0.76195094831376,46.992143526967],[-0.74760195615967,46.991449795286],[-0.74336287533223,47.000701964828],[-0.72790285494931,46.994993345811],[-0.71305373485382,46.986070538333],[-0.69637193445308,46.994704963523],[-0.68018770038511,46.987658683517],[-0.67605096460406,47.000124265341],[-0.64422463763986,46.995602969044],[-0.62971403267853,46.996851004876],[-0.61997935748009,46.993321083755],[-0.59549628776894,46.997955261938],[-0.58641245768408,47.009979798203],[-0.57652952670071,47.017027138711],[-0.56546953385811,47.019423404938],[-0.56225950470765,47.030666495232],[-0.54565906541349,47.029239134682],[-0.54222220688058,47.035131514655],[-0.55557809674432,47.043528672476],[-0.55518423855519,47.056996280386],[-0.55953163443577,47.061883133164],[-0.54271238339803,47.068832410093],[-0.49533635185918,47.082386236675],[-0.46269595640292,47.081925505658],[-0.46404370608664,47.074916254874],[-0.47635021862705,47.072140351589],[-0.48553786553274,47.065209021486],[-0.47634088284647,47.054361886701],[-0.46425258388436,47.067574344676],[-0.44613773080732,47.067564764094],[-0.4258514883367,47.072734496606],[-0.40931478414398,47.06628937151],[-0.40078196900616,47.070768258647],[-0.39631090043786,47.087753100169],[-0.38345929253299,47.087697613397],[-0.35741871073042,47.094026201074],[-0.34498093726671,47.09177095779],[-0.34146522078634,47.087332841605],[-0.3142510524831,47.091338121731],[-0.29895654468625,47.099250384298],[-0.2879249468488,47.101438124536],[-0.25537525933525,47.100286155299],[-0.24153284082639,47.1057275119],[-0.20607508372803,47.09328538537],[-0.18649707382196,47.101547033466],[-0.18483829723431,47.108333434925],[-0.15721241252843,47.101780345038],[-0.14125473717962,47.103745079728],[-0.14555986138819,47.091366857483],[-0.15947412139976,47.085935164317],[-0.17848280781104,47.069769863363],[-0.16599081567743,47.064596744766],[-0.14766123249005,47.069855194532],[-0.13678317485552,47.063924090649],[-0.13712137046296,47.058426719475],[-0.12837866130337,47.054429041651],[-0.1021158452812,47.06480003115],[-0.10150441660145,47.08326376928],[-0.098719424061378,47.090117668474],[-0.085909274640678,47.101010256779],[-0.060661742719366,47.09514763055],[-0.044169213959146,47.093239781385],[-0.03562437381954,47.086261232309],[-0.029234974929682,47.095257561848],[-0.026535185584925,47.105798471803],[-0.039289561029516,47.108055925394],[-0.040856468682482,47.112928627112],[-0.034011786935389,47.127334734816],[-0.010739414334867,47.15751215065],[0.019016376976915,47.175754285742],[0.036501918227681,47.160445278183],[0.049480342584696,47.168623012343],[0.053830055961677,47.16373374848],[0.066259497472021,47.143215902043],[0.078395363975684,47.146334786534],[0.08087053131906,47.137653029292],[0.076371249669326,47.123931049218],[0.084648249403316,47.118377760157],[0.10471937462849,47.120793812241],[0.11111857810383,47.129423259303],[0.12372359489648,47.128315822721],[0.12716663727095,47.119967203103],[0.13613099833731,47.121578754741],[0.13471650901781,47.107872599064],[0.16126718554822,47.100796179607],[0.16598416316105,47.107162285602],[0.18145709966147,47.1143899519],[0.18811779784912,47.100828164294],[0.20095307158529,47.091257976623],[0.17421802926902,47.071274231914],[0.17997285846393,47.059187917933],[0.19167202519639,47.064672009871],[0.20799449312514,47.053230964732],[0.23175079195616,47.064054806793],[0.24245135321948,47.0711879788],[0.26165981464917,47.070051249456],[0.26761937550861,47.067504197075],[0.26201563438582,47.057459330927],[0.26770726634947,47.04388297477],[0.29822992579073,47.053922293608],[0.30698465850517,47.048723481399],[0.30969866315285,47.025643877461],[0.29867667498614,47.019599341054],[0.30543065376719,47.012362068122],[0.30884587377182,46.999441441774],[0.30178521378569,46.984422127588],[0.3083994154951,46.978149875297],[0.30073879657193,46.973829519846],[0.30507546032998,46.965176268239],[0.3052147303369,46.952805098497],[0.31123243685649,46.937837015115],[0.32483667041576,46.930652041087],[0.33952563735758,46.936623468454],[0.34773843894922,46.936585764264],[0.35524351132264,46.94418585304],[0.36651145250788,46.949554418002],[0.38814626546636,46.943624533306],[0.40666063754734,46.936647597652],[0.41852515647745,46.937386922114],[0.43870457627727,46.929578354733],[0.44480103455716,46.941152434129],[0.47662392866394,46.949861808585],[0.5061349705044,46.959245419792],[0.52812896085369,46.955971768907],[0.53928916139484,46.960219024665],[0.57084220800147,46.95593925543],[0.59834824957594,46.956764146875],[0.60155821661783,46.959107207652],[0.60117289544287,46.973094369377],[0.59353374575945,46.977612888014],[0.57382203251682,46.983340464589],[0.57368515665648,46.995531274591],[0.56695306996355,47.002266858023],[0.59055093530507,47.006722651596],[0.6188740376389,47.007464569411],[0.62124367303806,46.997106205666],[0.63621078823085,46.985451013839],[0.64769454368947,46.98827539877],[0.65646206458496,46.985434564914],[0.66162129594461,46.978086547342],[0.68216214670066,46.977079806439],[0.69256676799124,46.974304310533],[0.6961893847553,46.956809748541],[0.70624788531743,46.937157219193],[0.70357222720342,46.930055655547],[0.7043177119069,46.903295922263],[0.72673737636298,46.886740909711],[0.73368489987152,46.876040130575],[0.74733084634723,46.869392079962],[0.75088169303492,46.863524734354],[0.77198838768839,46.860643073187],[0.76879944678165,46.85074613749],[0.79032856900623,46.852389283147],[0.79645898941075,46.848962468561],[0.78680224354972,46.840463346525],[0.79509333742744,46.832522249054],[0.80932023680023,46.827853568236],[0.81032866524034,46.813064718291],[0.8153195131751,46.805707876783],[0.81190192936381,46.794504364542],[0.81628357550664,46.787769101729],[0.82943649435874,46.783579432834],[0.83064773545714,46.775361466403],[0.84293807311317,46.764275112746],[0.85444929067001,46.759970797231],[0.86746898682573,46.748216404838],[0.88777529605684,46.737902736858],[0.90104236961312,46.736090564754],[0.91455153531157,46.710120272246],[0.9249533025609,46.699991021542],[0.92474929055741,46.692789633606],[0.90215945171528,46.67919114553],[0.91071057116932,46.677183661606],[0.9067032428601,46.665571264221],[0.91742860399951,46.65036307159],[0.90652086468369,46.647752216163],[0.89638293110539,46.633451946341],[0.89430329614895,46.625732175305],[0.90693650860659,46.615213230068],[0.90986438287983,46.603447081391],[0.91586544594852,46.596627887059],[0.93775566335965,46.594420109118],[0.9371898310662,46.586044724789],[0.94202235129636,46.580794785364],[0.96266777384523,46.574297702094],[0.98209440694689,46.572640353042],[0.98723321911375,46.565560099789],[1.0147685045818,46.567759565973],[1.0219575008089,46.55371655484],[1.0206003685537,46.537099020664],[1.0722975106803,46.53723511351],[1.0875973131695,46.538168324634],[1.1082856489547,46.531510215741],[1.1459288779804,46.506400874677],[1.1491485689753,46.502205353076],[1.1349675834984,46.495262876365],[1.1405271083029,46.485634879486],[1.1529790996043,46.472957682593],[1.1355078072574,46.470884241481],[1.1516072310249,46.449233517349],[1.1689192762458,46.446308575491],[1.1860178766023,46.441083576014],[1.1834055129956,46.429224899772],[1.2011339896178,46.432466167404],[1.2126877519811,46.432217971701],[1.1944727430082,46.410351612296],[1.1950871576883,46.40275403272],[1.1772787760985,46.383948000481],[1.1841495355328,46.37729147918],[1.191538104043,46.376759451936],[1.2047664407221,46.387689428519],[1.2164239770673,46.367784938774],[1.2408646690892,46.367573686174],[1.245105268008,46.37323860456],[1.2603993142262,46.378783327264],[1.2795549241983,46.376488887271],[1.3030594710726,46.370991990563],[1.3093599883058,46.378135125428],[1.3204740000508,46.38163178083],[1.3223398241302,46.389656273383],[1.3309220641861,46.396705560378],[1.3442929839887,46.401546863371],[1.3560243049838,46.4001195921],[1.3775283931369,46.382803331341],[1.3835201223913,46.374755471612],[1.3965775759913,46.371445233126],[1.4048447784072,46.364056923495],[1.4151854142983,46.347214822447],[1.438395055125,46.35797267046],[1.4353743494744,46.363842198651],[1.454349713379,46.376048839285],[1.4629367778167,46.375349793186],[1.472558559102,46.383431643989],[1.4775958033831,46.393726557044],[1.4929348173659,46.398340551367],[1.5059901336348,46.409908716453],[1.5112050540502,46.419594596972],[1.5223067601736,46.426527695424],[1.5350519004493,46.424455702933],[1.5439680356057,46.41688301363],[1.5461946362171,46.39346025752],[1.5524923075161,46.394133824944],[1.5696914589532,46.405498471105],[1.5920388571659,46.407311867592],[1.6092554805936,46.423123163216],[1.6226552998913,46.418260263211],[1.6143064140463,46.405295947029],[1.628836514357,46.388247455127],[1.6448463938248,46.386816749434],[1.6611836253306,46.403538218482],[1.683606447426,46.418176923275],[1.6974668292376,46.406604886198],[1.7091312929501,46.393353821969],[1.7277096608449,46.388955998124],[1.7392119982362,46.401254100808],[1.7505449826939,46.405586225701],[1.7493159438657,46.41093389201],[1.757375741134,46.423616429483],[1.7566658918784,46.441292317573],[1.7475915839665,46.450017868926],[1.7548573832317,46.452214535934],[1.7983753858278,46.45481310551],[1.8031391002694,46.44691836733],[1.816812388337,46.439524938483],[1.8195044214246,46.430033877555],[1.8383647496008,46.42728517531],[1.8580375856722,46.433476804112],[1.8834368991965,46.432557252889],[1.89071589528,46.441493184019],[1.902458213237,46.43780452052],[1.909180451657,46.443498226347],[1.9195527692358,46.440208070783],[1.9243017577068,46.431903065788],[1.943869602507,46.433996659264],[1.9542508363527,46.438125703166],[1.9781042758382,46.439772572322],[1.9930771581051,46.430917343442],[2.0203464671203,46.429421918521],[2.0294174309506,46.424588797264],[2.0741962684953,46.419842978652],[2.0803472806508,46.411894246794],[2.0889457684929,46.40889961632],[2.1083721397147,46.413528592759],[2.1126347187417,46.420825387231],[2.1296807376318,46.419867872386],[2.1677843748983,46.424069192575],[2.1851558899005,46.423284068779],[2.1975676755012,46.428294141001],[2.2206403396014,46.423664161021],[2.2334148941606,46.423384135542],[2.2498765158587,46.426366967242],[2.2810437278384,46.420403547753],[2.2804029533754,46.410236476962],[2.2850442774167,46.385857562809],[2.3154715753059,46.375205741584],[2.3315900743858,46.378176612964],[2.3371146519405,46.366795923975],[2.3233383727294,46.366525024524],[2.313389172619,46.356936451493],[2.3027460023726,46.354419802873],[2.3093794648902,46.342006193666],[2.3230230944721,46.329277448172],[2.3345821354246,46.325320260055],[2.3549060485425,46.325678438006],[2.370482749419,46.312629017475],[2.3840641130619,46.328908641081],[2.3918581379529,46.329985164159],[2.4113176626179,46.314094483732],[2.4204656768519,46.310129656565],[2.4161017112175,46.300056006693],[2.421335782135,46.284622030263],[2.4309509758156,46.291519676804],[2.4430263839161,46.294995852237],[2.4789445821479,46.281145991526],[2.4770972903349,46.269361724579],[2.489106418147,46.248968644305],[2.5163085117785,46.239436870366],[2.5154284346668,46.228012112114],[2.5215270201899,46.21133367553],[2.5216954121117,46.203035380932],[2.5280194815711,46.195466990157],[2.5286290573702,46.184894945309],[2.5431674609911,46.175602605523],[2.5597996290957,46.173366559433],[2.5607637153191,46.155596225642],[2.5654816305578,46.153967351319],[2.5653725529015,46.143035759957],[2.5586220340193,46.138326224613],[2.5582364865104,46.130701979674],[2.5490488887945,46.114075006608],[2.5518219731636,46.103970633498],[2.5518715312783,46.083457348801],[2.5570843667475,46.069300275416],[2.5631828961231,46.064609781776],[2.5716988273144,46.048689825423],[2.6025059601172,46.033461930485],[2.5944202186196,45.989440975795],[2.6074695080176,45.979108641029],[2.6107853057918,45.971228071516],[2.5891875589674,45.960437573506],[2.5651781859373,45.95661981464],[2.5657173898648,45.946856793309],[2.5516381183225,45.941261078502],[2.5509536719711,45.935761668247],[2.5415060022687,45.921531781083],[2.5550056008106,45.912509471984],[2.5376912527467,45.900845994537],[2.5262086816167,45.896727274022],[2.5099613389201,45.88666598071],[2.4922279879729,45.864029936278],[2.4797383951775,45.864541357011],[2.4706137918202,45.872335245229],[2.4425827259717,45.863008040763],[2.4478280089908,45.84581866569],[2.436436952669,45.846998827989],[2.4265364620605,45.834771343876],[2.4013447310476,45.837577232244],[2.388014020679,45.827373168854],[2.4006773662183,45.817289546629],[2.4185991219253,45.798475127769],[2.4274035046023,45.794285013202],[2.4329800874586,45.783888824912],[2.4341123429169,45.769852817869],[2.4414259075117,45.762378997013],[2.4547914690758,45.761151249494],[2.4751529321011,45.747688866007],[2.4846414659033,45.748521466442],[2.4921294160933,45.7376701128],[2.5183220391127,45.712799669432],[2.5198739656449,45.697052906827],[2.5268700649094,45.694919495794],[2.5283596411119,45.681924314977],[2.5129233228036,45.6713335771],[2.5151301172176,45.664284079976],[2.5249384159848,45.657234455338],[2.5142980219448,45.639528483879],[2.5011495345088,45.638738876646],[2.4897451626044,45.642353692],[2.4833880353068,45.639303519147],[2.4790816386943,45.62246233864],[2.4784344946797,45.607911789419],[2.4653445128497,45.600820150088],[2.4646251782029,45.594410586781],[2.4725367701592,45.580929716396],[2.4874305070125,45.569384021272],[2.4909285469766,45.560394087282],[2.5064679621685,45.553444063405],[2.5163271748739,45.55342839279],[2.5165205610225,45.524032787608],[2.5203805740984,45.520450992238],[2.5115199537568,45.511153110817],[2.5089910453543,45.500226403127],[2.5138913543334,45.492347782226],[2.5084125130653,45.478501516921],[2.5067704533992,45.464065004968],[2.4955946696815,45.44550416324],[2.487471709413,45.418842030111],[2.4927584232596,45.413842323437],[2.5159713869265,45.403236533013],[2.5220338520841,45.402237812322],[2.5262353366501,45.389343818253],[2.5227321270438,45.382084686424],[2.4857679741129,45.378946887778],[2.4778316883062,45.370410647653],[2.4734557788383,45.38152628147],[2.4580813755781,45.384827047932],[2.441865995091,45.384259395763],[2.4226736731266,45.397229870143],[2.4129045453324,45.396651442056],[2.3982881363717,45.400169538674],[2.3954865345645,45.407322290365],[2.3782501191323,45.414302210343],[2.3551307955913,45.415027972839],[2.3500842175271,45.409676058097],[2.3545525332951,45.401398504646],[2.3644462766137,45.395234506367],[2.3682726042671,45.388621392102],[2.3629697029865,45.378412337982],[2.3647790516305,45.357919621969],[2.3513461420151,45.348610937353],[2.3593793404283,45.335790299537],[2.3504806858312,45.327560923525],[2.3177397642658,45.322963729764],[2.3073512042479,45.312659714856],[2.2920696943683,45.290569998093],[2.2800803441611,45.287325615297],[2.2714111009736,45.290154603854],[2.2617348470443,45.28322143744],[2.2585683903144,45.270220164439],[2.245004874828,45.267106520498],[2.2387747025234,45.260353952142],[2.2413408281325,45.24942616212],[2.2249287044688,45.241854962029],[2.1953636990438,45.220851418291],[2.1905131897891,45.20213434701],[2.1985478420586,45.194408666334],[2.2011879889027,45.181494229499],[2.2195874303098,45.172114610573],[2.2335857511761,45.167181650239],[2.225397887065,45.160336595328],[2.2137008320653,45.160189965969],[2.2115654221992,45.14844827392],[2.1948369367108,45.136027708871],[2.1787905007908,45.136297935946],[2.1852692693185,45.113998024195],[2.1794393252059,45.109177492216],[2.1803618094732,45.09734068898],[2.1717594845165,45.081496802672],[2.1456535641311,45.085592171697],[2.1298193059745,45.078932414297],[2.1183646353816,45.070379067781],[2.1037456940938,45.065812421906],[2.0951568732001,45.056033465741],[2.0993181256264,45.047622806571],[2.1094104611066,45.041521518867],[2.1168066989252,45.02111434735],[2.1406414310588,45.005858479694],[2.1381513494782,44.992811832821],[2.1329815746739,44.985516038406],[2.1003714972007,44.983427469854],[2.0905743960003,44.984665148518],[2.0766169639286,44.978785623857],[2.0629079799591,44.9765045515],[2.0525667664657,44.976478188068],[2.0454327798436,44.983664804729],[2.0068687915517,44.976629769782],[1.9853569537575,44.974450164818],[1.9740981161193,44.966632803845],[1.9557698918802,44.958318624648],[1.9509915581584,44.953151935667],[1.9407166400253,44.95513995704],[1.9390669995572,44.973222308505],[1.9280650601996,44.97871493763],[1.9081575006047,44.978423183181],[1.8926655050781,44.964882977079],[1.8874095971943,44.956563455989],[1.8670322636063,44.952926075187],[1.8510527260352,44.946245504656],[1.8443484053735,44.938030495187],[1.836439246631,44.937455442607],[1.8239145074647,44.927683348732],[1.8085816314758,44.927710042504],[1.8008914101993,44.924210099081],[1.78487170617,44.937317933441],[1.7828574905171,44.929652757246],[1.7749276020491,44.923721627249],[1.7685216398013,44.93111838651],[1.7536701932124,44.940576173829],[1.7506187292807,44.954961208829],[1.7428395473269,44.959830662128],[1.7215459564475,44.968065955731],[1.7110326508746,44.967296262803],[1.702662490825,44.987825577102],[1.6871611264702,44.996380368243],[1.6843750926429,45.002660865737],[1.6714097923126,45.004301541515],[1.6544545546621,45.017019229934],[1.6509774862668,45.025013308842],[1.629956153879,45.033567269253],[1.614739866204,45.033019699506],[1.5893103965749,45.036412402334],[1.5763101796546,45.040696470827],[1.5690421523205,45.038712199205],[1.5520446044451,45.028473138039],[1.5437040262063,45.030761580224],[1.5410691079459,45.042887041934],[1.5357229531152,45.046275852749],[1.519580065039,45.041030205266],[1.502854716064,45.038440870886],[1.4800566881166,45.026797710108],[1.4735839270693,45.017999050409],[1.4619826792135,45.01370224029],[1.4482602497483,45.019314041206],[1.4281821749303,45.009219883472],[1.4092638730924,45.006004469319],[1.4133042325955,44.999381814036],[1.414587951063,44.977794038016],[1.4207336396897,44.955116554897],[1.4364044047008,44.940615131261],[1.4365133670875,44.93225069741],[1.4423501795316,44.916547257696],[1.4246258313763,44.919694190356],[1.4135387322774,44.911821580701],[1.4216345306166,44.896767467267],[1.4398567374008,44.888947217313],[1.4419256468077,44.877575693392],[1.4310840691639,44.871280603185],[1.4181797898114,44.870598618527],[1.4048297845553,44.862526244834],[1.4019376918366,44.849449622068],[1.3861021387482,44.847434745656],[1.3771449543322,44.84182444963],[1.3699846242068,44.846449057072],[1.3614088604034,44.840796241728],[1.3606303391154,44.826748288149],[1.3641055003826,44.811568223737],[1.3368655384896,44.806071554052],[1.3281059944688,44.806531488239],[1.2996402457488,44.796921415066],[1.3042790767232,44.788545534304],[1.2962430489699,44.777811462978],[1.313412866091,44.766040449212],[1.322816677032,44.765133167519],[1.3160471856435,44.740370070289],[1.3005234409238,44.743067753612],[1.2997473700748,44.733876961929],[1.2877769806729,44.714784618791],[1.2704127081354,44.722361774434],[1.2637980717141,44.710685806718],[1.2482656593079,44.707708989465],[1.2433609148288,44.703747365953],[1.2404413959773,44.692803925964],[1.2245513454404,44.684265469136],[1.1922298707031,44.682144673083],[1.1814922279959,44.68312050249],[1.1691224492748,44.680201458326],[1.1631824196253,44.674246913408],[1.1466756285759,44.670346129862],[1.1467257654642,44.651942998392],[1.1537948801342,44.639408990845],[1.137389330558,44.623916068209],[1.1076423221767,44.604047948788],[1.0954254371464,44.590239410789],[1.1023480014998,44.583112143598],[1.10321434571,44.571734741055],[1.0915723340934,44.57129825478],[1.0751420531924,44.577325705506],[1.0716939661813,44.567841711875],[1.0463221422077,44.562091748647],[1.0347007735952,44.555410813413],[1.0131652927005,44.53612981948],[1.0102474849887,44.545187788418],[0.99391928143422,44.549540779914],[0.98177646477517,44.543949619625],[0.99607013748509,44.526838106147],[1.0162275856839,44.505873805304],[1.0168410499751,44.492627682886],[1.009020244264,44.480044617987],[1.0230093439874,44.475437273235],[1.0238896841162,44.464106031022],[1.0209838507254,44.456237710915],[1.0247167778907,44.442988405687],[1.0333318174167,44.432217983065],[1.0452829749205,44.434328842652],[1.0574845114814,44.427673212448],[1.060811266939,44.416585968472],[1.0613076444275,44.401878633002],[1.0514192493927,44.392094511982],[1.060916410464,44.388148956247],[1.0640814762214,44.378508721439],[1.0590342432563,44.369063397724],[1.0497968480895,44.362639367374],[1.004557393851,44.365587714321],[0.9973306063079,44.368970904934],[0.98063192933013,44.358423098349],[0.97103609486138,44.361280217267],[0.95004981400894,44.35975578355],[0.94141859483151,44.345347538009],[0.9372881287013,44.368840749909],[0.92589588135671,44.375628735075],[0.91991430872905,44.384149659695],[0.89821258712664,44.381368271621],[0.88733582833582,44.366374054101],[0.89356714925376,44.358037988638],[0.89611323540437,44.346226535055],[0.87347140241339,44.323307233],[0.86962451276277,44.309387172973],[0.88231719491829,44.308198855394],[0.89449665699205,44.296740377136],[0.91642356261815,44.302198002519],[0.92396339608302,44.288698042192],[0.94992392368958,44.276443376947],[0.94078442423987,44.263651200087],[0.9277876570183,44.26740561543],[0.93302754076927,44.253148853876],[0.91909475906904,44.238271923817],[0.9292406197485,44.230246542717],[0.92476807979815,44.226051714552],[0.91176049272424,44.204739962363],[0.90628814214223,44.190306668919],[0.86348768257448,44.193325437089],[0.85633796923916,44.18904677194],[0.85357025770147,44.174962426044],[0.86504004908695,44.173534926921],[0.8722469128314,44.167867373919],[0.88301819652021,44.17546628714],[0.89034197833787,44.169672870511],[0.88663373024812,44.16278908945],[0.88847935271951,44.148766853903],[0.88180706484803,44.140904730858],[0.87944269844653,44.129608737841],[0.86877875307642,44.126327092678],[0.83543363467659,44.136365774298],[0.82440975793604,44.141179876681],[0.79610189105916,44.145621618679],[0.7885669186743,44.144391188204],[0.79756644493954,44.130381902776],[0.79623991760453,44.11512942813],[0.78623555942697,44.11191141984],[0.77191199947865,44.113420095124],[0.75287865013836,44.102267910932],[0.73810974125492,44.073027677],[0.741884791205,44.065199235038],[0.73670154232703,44.061550959213],[0.71736742842423,44.057565048253],[0.7078014441272,44.058016144097],[0.69448178843623,44.045585512479],[0.68766619417171,44.045887421074],[0.6797359030614,44.03717928063],[0.6795846041912,44.029344422988],[0.66659683472462,44.025144272763],[0.65507583677567,44.031189052143],[0.65460048123679,44.04130753634],[0.63165143580682,44.049501421006],[0.62788687147415,44.060631087503],[0.60470426269225,44.071956240981],[0.59797769402997,44.078224550392],[0.57588134690602,44.075909688882],[0.5650766725315,44.05922317624],[0.53902463781127,44.053724078487],[0.52207386686065,44.05696870158],[0.51214276226031,44.063296138178],[0.5060519145443,44.056124874168],[0.48581828489735,44.058598437153],[0.47876888458351,44.054521013697],[0.4595157527797,44.055234750337],[0.44887562692766,44.042594787048],[0.44244380213487,44.028759139019],[0.41750846361679,44.026970327067],[0.39446082314246,44.019984410354],[0.38151930823563,44.006373305954],[0.3713725918443,44.008155096613],[0.36491171606437,44.015152271393],[0.35756641014151,44.01637714562],[0.32938687327154,44.008324743136],[0.31653852185538,44.01011924115],[0.31793784234407,43.994973643102],[0.30409114391986,43.993060809869],[0.27345979290764,43.998815616074],[0.2658680614134,44.003716751224],[0.24748889809396,44.00473345675],[0.2352015335306,44.008471438234],[0.22470969223381,44.019169028731],[0.20507206540087,44.0190292233],[0.20117969184465,44.013668593318],[0.18957139217537,44.014641613964],[0.17916093410135,44.000666040326],[0.16676088451462,43.996830517368],[0.1664085585548,43.984223372919],[0.1591211137839,43.973860568873],[0.13863539397759,43.974770669617],[0.14095408748334,43.994676380228],[0.12640607961248,44.000336105676],[0.11437379986584,43.988072909373],[0.076043349292038,43.983138573142],[0.067532020801164,43.974192750661],[0.067025223808929,43.967876773509],[0.055307282518792,43.957963073751],[0.057457862003849,43.949050217484],[0.068507868767624,43.937809939581],[0.07664444687609,43.916470177201],[0.059162622123353,43.897893022976],[0.045526933200978,43.902166309486],[0.032551602220287,43.900191508039],[0.017439868557199,43.910847797935],[-0.001843455443284,43.921420036587],[-0.013582447289478,43.923649897266],[-0.015361195667702,43.934152340481],[0.0042089573126749,43.943424094056],[0.0067349635456505,43.953740495039],[0.0014399806732066,43.95988700889],[-0.021769333384946,43.973056989329],[-0.036164948567139,43.983735934778],[-0.040802721725543,43.968964305724],[-0.046527042815464,43.96103952555],[-0.059361902039375,43.960939386464],[-0.073597153405665,43.94504601184],[-0.087028531609323,43.947486286421],[-0.098329558338237,43.942427984825],[-0.094989077566145,43.933381091475],[-0.10225702569033,43.927416125055],[-0.12594278448243,43.944421563926],[-0.13513697119614,43.936297912997],[-0.15333166658385,43.939048046681],[-0.15391959185065,43.93232464077],[-0.16562386692845,43.927613195924],[-0.17911005329495,43.937915232082],[-0.18485270811369,43.928769857675],[-0.19202409075549,43.92603943497],[-0.19978663649385,43.915110256293],[-0.21627342564629,43.907357211722],[-0.22763125359284,43.91098862727],[-0.23443742350753,43.899009673945],[-0.23393612239966,43.89106512629],[-0.22061963081894,43.890378123713],[-0.20122569807121,43.885467279461],[-0.19099207269451,43.875181537803],[-0.19855770088986,43.862412899782],[-0.20890830935508,43.857673133295],[-0.19596777254111,43.845942065138],[-0.18812879425044,43.832561081629],[-0.19725593392987,43.830783419213],[-0.1924617341874,43.810177903112],[-0.21750272546627,43.809928705523],[-0.22713966573848,43.808271178562],[-0.2188522220883,43.796306415322],[-0.2221263729722,43.7870916829],[-0.21332509113417,43.779092079667],[-0.21546661332355,43.76954000666],[-0.2079131727813,43.760637827854],[-0.21894685864266,43.750867558794],[-0.20605854570527,43.750073485568],[-0.19556855881059,43.7457681747],[-0.19413824181548,43.737015033058],[-0.20579650925303,43.727838442023],[-0.23258474697029,43.714085612502],[-0.2466519035345,43.710665978321],[-0.24762242324933,43.705844967214],[-0.23910090516212,43.693946573483],[-0.2558968586296,43.679785947966],[-0.25205576868858,43.672170366192],[-0.23973638497448,43.671241337499],[-0.24428632111807,43.663120354346],[-0.24316590125334,43.654503914277],[-0.26183976696696,43.650333852662],[-0.26375883992318,43.635925825532],[-0.28211623210758,43.643073606308],[-0.27959903054407,43.618177993348],[-0.27771465346131,43.616200527152],[-0.24720389403099,43.615953419221],[-0.25464414089565,43.597079809878],[-0.24817456316599,43.596658468765],[-0.24283300101136,43.584979016847],[-0.23502870973138,43.583357698142],[-0.22423605594959,43.590402846839],[-0.21060415101777,43.593234551989],[-0.20474309579199,43.583597668054],[-0.184802186901,43.591150649921],[-0.17641684233457,43.596401195938],[-0.16044860312899,43.580574768792],[-0.14809699734982,43.585796179458],[-0.12891801130162,43.581224268549],[-0.12160532728785,43.586239621765],[-0.10893257406459,43.582372914877],[-0.096787871742487,43.582404857482],[-0.093425031634788,43.563569921638],[-0.088934220496639,43.557203940272],[-0.094969201412123,43.548141189515],[-0.088671332923909,43.542057336851],[-0.078385830359136,43.546822915717],[-0.064394904836236,43.545147116286],[-0.056174185273693,43.533029097587],[-0.044654576654926,43.525299051263],[-0.040135444460287,43.512604399189],[-0.049321056921324,43.492468050259],[-0.034676452145955,43.487323780123],[-0.033960155813221,43.47488114734],[-0.01781381554075,43.472147456522],[-0.019322496256827,43.466531436068],[-0.065757532784034,43.463483610747],[-0.061666974828373,43.452452940742],[-0.06902834281151,43.437345744695],[-0.057818804728216,43.427453948482],[-0.053836151217704,43.418937636756],[-0.062025455126023,43.417738498202],[-0.066460558394679,43.411733865017],[-0.042752022413969,43.410434732548],[-0.034594805202059,43.429064287986],[-0.024647492248551,43.430441863151],[-0.016529018418498,43.443944372555],[-0.0009763127221442,43.444398882283],[-0.004617224617132,43.431760209363],[0.0095923341693579,43.422106177396],[-0.0038111619353702,43.398395088127],[0.0051784236678809,43.394194111086],[-0.0052544098304965,43.373757650344],[0.0057814385418996,43.363002124921],[0.023777202110468,43.349140741399],[0.02629551293813,43.341364458979],[0.010318205390046,43.325314740811],[-0.0032544572879219,43.332106223092],[-0.024874069651994,43.329492363991],[-0.031830518124419,43.31215055589],[-0.046122559308833,43.300858489621],[-0.044392167069364,43.285272051797],[-0.023979443826928,43.280211811856],[-0.017008526259885,43.270448647152],[-0.02562371129178,43.260991374913],[-0.02368673812988,43.254986403176],[-0.037586102171492,43.242416639333],[-0.045868384089441,43.23213534366],[-0.049462179860127,43.217180833465],[-0.07252723387475,43.224387038006],[-0.06786899220915,43.177118135342],[-0.095496012787098,43.177197303166],[-0.097529225654089,43.166624966901],[-0.10448219117427,43.166691440804],[-0.11133185839731,43.179338583668],[-0.11770126761715,43.180323067986],[-0.12655319090013,43.160447394144],[-0.13859988604461,43.149103535932],[-0.14050344828237,43.136172128164],[-0.14613588573303,43.128233156333],[-0.16634162368399,43.121884731119],[-0.17086902572159,43.113421493828],[-0.19098051290629,43.111202819975],[-0.19768215446413,43.098173160871],[-0.18693584923102,43.091163577327],[-0.18776795009335,43.083330185944],[-0.19776766479894,43.071150876661],[-0.19915084290716,43.064412767264],[-0.18964711095987,43.052021067576],[-0.20860119763472,43.039724486019],[-0.2239464237385,43.033684092022],[-0.23941952476886,43.039676815812],[-0.25993739842031,43.038277556214],[-0.25606972495919,43.022726945323],[-0.26484031266067,43.009957412551],[-0.28772006609469,43.005371765683],[-0.29154703187727,42.987768864423],[-0.28647438097301,42.960054130137],[-0.27938737996819,42.942120483339],[-0.28159219915593,42.933563651361],[-0.29003653813459,42.929087564699],[-0.29777949713226,42.930973352505],[-0.30871758220081,42.924636095621],[-0.31074643857214,42.919004799168],[-0.3270823405503,42.915785217713],[-0.32459076680338,42.905260440304],[-0.31819431138324,42.897761911545],[-0.31566756931289,42.884801825113],[-0.30749089647919,42.867843636256],[-0.3134440845287,42.84937502201],[-0.32341849261751,42.835493251193],[-0.34754374621365,42.835913719016],[-0.35580444046932,42.830259858153],[-0.36426705242731,42.816951541187],[-0.38297282239921,42.807183511438],[-0.39259734345566,42.799559432268],[-0.40923041576119,42.807751018183],[-0.41891986574729,42.805668392726],[-0.4397463890216,42.796464192609],[-0.45955289533088,42.805069160235],[-0.47286478572541,42.808471966291],[-0.50965055176559,42.825391497677],[-0.52482251446902,42.81169739145],[-0.52287827401621,42.799049409362],[-0.52973082529989,42.791532352653],[-0.54380966630498,42.793156705649],[-0.55120490858256,42.777515930774],[-0.57059337631889,42.782911889725],[-0.56471356204106,42.798018672268],[-0.56886605101147,42.806822105003],[-0.57774890534764,42.807226210864],[-0.59273144202498,42.803229806499],[-0.60076025043393,42.806307889858],[-0.59869384234063,42.81658386823],[-0.603635315569,42.832617711388],[-0.62218648418028,42.839974285074],[-0.636155774525,42.853243576651],[-0.64886350304795,42.85519927328],[-0.66146517128628,42.863780807704],[-0.66446867746396,42.872433683564],[-0.67603386909387,42.882121412448],[-0.69899318990985,42.879656093293],[-0.72094493959924,42.888648555303],[-0.72975658553822,42.896558450267],[-0.73499495012597,42.912174326638],[-0.72506592676777,42.923031036303],[-0.73250802453043,42.928418305337],[-0.73095444655538,42.938774411246],[-0.73924496462727,42.947642219182],[-0.75163409617224,42.966937274035],[-0.75637833414362,42.96842723143],[-0.78780828558188,42.964223855906],[-0.80004531168212,42.958965798484],[-0.81001402324725,42.951435944964],[-0.83838735696631,42.953541926019],[-0.86785079295099,42.951831318684],[-0.88394140902026,42.955914739589],[-0.8955520171068,42.955177348594],[-0.89972551604999,42.961947365792],[-0.91428689185959,42.963568880303],[-0.92198470791062,42.955086159393],[-0.94645511377364,42.954058399843],[-0.96116019688124,42.960780979343],[-0.97519106253852,42.963790655966],[-0.98075578416446,42.970298449556],[-1.000506176719,42.977947402167],[-1.0064490904565,42.988992019109],[-1.017553501514,42.994381215156],[-1.0308132030489,42.993442586204],[-1.0702604908545,42.997696781882],[-1.0830662265877,43.001676885789],[-1.0918797435203,43.011282098743],[-1.1106631611518,43.020497969179],[-1.1189184669033,43.019962290375],[-1.1334518490705,43.010370716056],[-1.1425678944125,43.01020623111],[-1.1482628224762,43.026042549327],[-1.166902843708,43.035572700603],[-1.1807284627612,43.032529650113],[-1.2086270779223,43.047643271789],[-1.2129701620528,43.051464997176],[-1.2311469598971,43.054494771203],[-1.2471955274996,43.042411024375],[-1.2642864994766,43.044562906927],[-1.2695665359652,43.052910976258],[-1.2870369506636,43.063010309896],[-1.3085440571134,43.068678772612],[-1.3085964987154,43.072598494799],[-1.2986655700641,43.0932795305],[-1.270184195429,43.11856931563],[-1.3206170406021,43.112750854275],[-1.332008952146,43.107918007228],[-1.3432982771448,43.095380034809],[-1.3418161470064,43.077659473659],[-1.345424430823,43.049771385789],[-1.3547517961039,43.028468046718],[-1.4351873583595,43.045028123845],[-1.4435857863974,43.049155754363],[-1.4717368566926,43.081096614267],[-1.4708680288881,43.091714158473],[-1.4642318751712,43.097527189934],[-1.441119428077,43.108354777765],[-1.424133734518,43.12496310203],[-1.4139466293353,43.129178212008],[-1.4125668315502,43.137780243699],[-1.4160249876204,43.149739804939],[-1.407219151478,43.155624496506],[-1.4033775513995,43.164177642842],[-1.4020191004086,43.177869670121],[-1.3838251967031,43.190817108926],[-1.3852679894359,43.197620432311],[-1.3833596738329,43.217727485119],[-1.3780657425747,43.229613623477],[-1.3827864939261,43.253297008751],[-1.4051202210621,43.270440718404],[-1.41320553569,43.27341516617],[-1.427533858751,43.266986624133],[-1.4388526778219,43.266517244479],[-1.4665458254283,43.272575506034],[-1.4962163703281,43.283459630748],[-1.5053259721679,43.29278751177],[-1.531891014245,43.29350768549],[-1.5518199451379,43.291690896031],[-1.5647157911934,43.28791347967],[-1.5581453439146,43.276923368272],[-1.5679664491027,43.258218706628],[-1.5751249050756,43.249838487966],[-1.599409166844,43.254529607491],[-1.6089315872346,43.252129248888],[-1.6224113687594,43.263949698914],[-1.6303661025897,43.284448371284],[-1.6226028674474,43.300623373179],[-1.6238145722959,43.305851119398],[-1.6354249085658,43.309047121538],[-1.6436698253027,43.306683425588],[-1.6548641244247,43.312638352013],[-1.6657592290595,43.314078692272],[-1.6841024926201,43.309624250299],[-1.7031331583996,43.309207236385],[-1.7135211355733,43.300322980778],[-1.729748923648,43.295678859867],[-1.7355452024048,43.310342175974],[-1.741348809523,43.316753723039],[-1.7373522231501,43.329700042997],[-1.7465925689614,43.331212245199],[-1.75771288788,43.344008101532],[-1.7754875064062,43.343951352243],[-1.7877317304935,43.35420208724],[-1.7841561370583,43.36247717302],[-1.7908870919282,43.373441337557],[-1.774636662773,43.372994899351],[-1.7620222428489,43.375887316087],[-1.7522896327775,43.386696189176],[-1.7378897690031,43.381658311189],[-1.6868172953384,43.396262202116],[-1.6814639058051,43.390043159813],[-1.6697675811644,43.388034474703],[-1.6607413607041,43.393409282177],[-1.6631432214875,43.399286135975],[-1.6577077165394,43.405452954463],[-1.6391136986966,43.408363439748],[-1.6255054979111,43.421748443502],[-1.6097350227992,43.42673810418],[-1.5973883731702,43.437492657411],[-1.5948860178815,43.448345590744],[-1.589536901573,43.449746746172],[-1.5774914365789,43.464140403007],[-1.5667182835573,43.481676419031],[-1.5480656499135,43.495969105934],[-1.5273009710877,43.523223729778],[-1.524870110434,43.52969939564],[-1.5070304054817,43.554964967747],[-1.4919223792491,43.572318908712],[-1.4600147168142,43.620300326042],[-1.4482076265277,43.642275007226],[-1.4464791056108,43.656202078657],[-1.4417112828647,43.669164802754],[-1.4404279792059,43.690015095526],[-1.4365047882215,43.710561485871],[-1.4221209140089,43.763113080873],[-1.4102233294571,43.80324757496],[-1.3953961014978,43.849121637244],[-1.3912095627914,43.858859549202],[-1.3749902540486,43.913786973148],[-1.3370648081025,44.055900444664],[-1.3259993612279,44.089757299216],[-1.3253321090174,44.096044723029],[-1.3123263437187,44.144797833947],[-1.3066211766807,44.171603926833],[-1.2946846942803,44.234574277628],[-1.2866796559521,44.272650495294],[-1.2721032403671,44.350132816331],[-1.2603597808298,44.421266516235],[-1.253891222702,44.4676023661],[-1.2514054654401,44.488888404232],[-1.2517305863129,44.514867670196],[-1.2602783216327,44.539507595489],[-1.2586139358279,44.547133110681],[-1.2461650749779,44.555849447953],[-1.2273970193025,44.575752956082],[-1.2121340085435,44.599510356389],[-1.2035045639686,44.622709327857],[-1.2041701334268,44.639985478462],[-1.1915382411984,44.660725704553],[-1.1812338744214,44.663558241644],[-1.1617591419762,44.663377214551],[-1.1451668567782,44.657629640598],[-1.1407629554469,44.647227205689],[-1.1249301480769,44.647338816899],[-1.0964256367438,44.642110349796],[-1.0807927355826,44.640599156622],[-1.0660182544594,44.646890617223],[-1.0512011570705,44.64425984978],[-1.0446037563356,44.647779187283],[-1.0053643374777,44.648038204976],[-1.0053044562958,44.653801414632],[-1.0185713848822,44.663911777968],[-1.0233052011919,44.67502570927],[-1.0311721058558,44.679029191881],[-1.0500276213214,44.682042500572],[-1.0581367463265,44.689048034983],[-1.0363621413125,44.693561606338],[-1.1066726573125,44.742647003652],[-1.1172405050661,44.74399979558],[-1.1253669244585,44.751000559984],[-1.1459514198999,44.761417104514],[-1.1605278218204,44.774666943417],[-1.1685739214819,44.771765177553],[-1.1781124391023,44.755804073252],[-1.1722002204463,44.75098728783],[-1.1900688471739,44.737019677101],[-1.1907716197354,44.730920109354],[-1.2044873682995,44.721540106397],[-1.2043808938438,44.717662887525],[-1.2229595098338,44.709573193593],[-1.2223114975031,44.706127753166],[-1.232623680779,44.693018645313],[-1.2374176561525,44.682509258925],[-1.2401079698599,44.666522122287],[-1.2389445057575,44.65778181354],[-1.2462021095773,44.641862728761],[-1.243112422171,44.628827562622],[-1.2521476349475,44.617729855339],[-1.2604466153424,44.625669343024],[-1.2617334302552,44.647702967991],[-1.2517253975532,44.712016422613],[-1.2370231185304,44.784935738577],[-1.2229034640823,44.864823398854],[-1.2041233648852,44.989780904848],[-1.198002213805,45.042704797651],[-1.1942059965634,45.069162896565],[-1.190236703195,45.107603378458],[-1.1808856453533,45.176064250108],[-1.162337441751,45.297868794558],[-1.1593599360818,45.35068807983],[-1.1605559384718,45.41068706862],[-1.1515035839053,45.439471708886],[-1.1514532239497,45.451854900963],[-1.1570373594316,45.470365660883],[-1.1546170989864,45.480167705968],[-1.1364252810856,45.51099225066],[-1.1228634483366,45.520418190565],[-1.1002940973715,45.541645700905],[-1.0961094287101,45.55676823678],[-1.0912045614296,45.562411237009],[-1.0605909878371,45.571952807583],[-1.0257391846007,45.574691325999]],[[-0.10221657949985,43.358514651885],[-0.090143282581254,43.358859352353],[-0.086786928155415,43.336872044844],[-0.096783660691415,43.334763115112],[-0.10847946239493,43.337801770075],[-0.11566381713828,43.330976950464],[-0.11139515774132,43.315808605005],[-0.10412308826692,43.312464324807],[-0.075041474866062,43.307136096993],[-0.070279283945182,43.317455182599],[-0.062503063827367,43.346712050556],[-0.065396680791735,43.35504948237],[-0.076422702553633,43.364562190447],[-0.09095912750824,43.37316253716],[-0.10728332222542,43.370734939225],[-0.10221657949985,43.358514651885]],[[-0.10307051080042,43.242819142542],[-0.099320994112155,43.252127129181],[-0.092111707678552,43.252065563512],[-0.079840951222932,43.262366418014],[-0.079283735332789,43.271656452017],[-0.096173699573616,43.285481158687],[-0.092031063800833,43.300469260619],[-0.11185367186851,43.31039465909],[-0.11997934072059,43.306250495105],[-0.12616476378979,43.293876660784],[-0.13650575288846,43.284504952764],[-0.14061503281768,43.271941230583],[-0.13346480059307,43.258458798265],[-0.12215124145212,43.243893908194],[-0.10307051080042,43.242819142542]]],[[[-1.4809035280913,46.210026584191],[-1.4670590519219,46.217438107669],[-1.4581989257469,46.228670423688],[-1.4129379411055,46.230133712834],[-1.4220417034491,46.218167984195],[-1.4439097820914,46.213520554457],[-1.4220989041249,46.204879920432],[-1.4042066055981,46.203130836583],[-1.3638972806052,46.207474893999],[-1.3476852125515,46.202734923599],[-1.3222125679058,46.187529767805],[-1.3079558339781,46.190556844426],[-1.2910690463149,46.186236068993],[-1.2742343920981,46.160161159723],[-1.2567915781519,46.160986989161],[-1.2761678172975,46.147264631398],[-1.3047717732064,46.142879010637],[-1.3216316554218,46.14503661833],[-1.3274184383871,46.14822687302],[-1.3549550613137,46.15588643192],[-1.3709015663159,46.167389183114],[-1.3895694731475,46.175712081226],[-1.4616048806387,46.202118585061],[-1.4746222599077,46.202761956375],[-1.5059249533038,46.194090752981],[-1.5353231579785,46.204392826596],[-1.5438132194944,46.219775891607],[-1.5614107739691,46.237187235682],[-1.5614800452621,46.245426793509],[-1.5410961547552,46.243605472781],[-1.5235573630959,46.251304814865],[-1.5143738942926,46.25771379421],[-1.500577180767,46.258182208227],[-1.4820147319539,46.247190230382],[-1.4745480329933,46.23325461767],[-1.4820134280193,46.228634812137],[-1.4915224496683,46.22912437982],[-1.4963233614182,46.234948705937],[-1.5127175658592,46.222324670773],[-1.5067150732904,46.214570690055],[-1.4995344178725,46.216647439156],[-1.4876936351453,46.206896731453],[-1.4809035280913,46.210026584191]]],[[[-1.2502595149646,45.845963455069],[-1.2592163284786,45.868298982277],[-1.2661547831538,45.878168876396],[-1.2875743906736,45.894605091082],[-1.3380521527432,45.917870413489],[-1.3509545085702,45.925036655573],[-1.3839170490528,45.951445390606],[-1.3917174561272,45.974042547349],[-1.387253309976,45.993870516375],[-1.3890812144965,46.002682308229],[-1.4005330150939,46.016128617682],[-1.4134350122266,46.04686461584],[-1.4070525832078,46.048113296884],[-1.3861064565982,46.041600222214],[-1.3712729567201,46.039341747981],[-1.3720788977654,46.032155177051],[-1.3659284854243,46.027268018796],[-1.3358134208014,46.012041108959],[-1.3127603503815,45.992975701298],[-1.2957631118509,45.989021011393],[-1.2811865787963,45.988409134288],[-1.2479197959851,45.990418426217],[-1.236032979657,45.98151962032],[-1.2354604124334,45.968794257852],[-1.2420820613428,45.957461306685],[-1.2297931152534,45.944251359832],[-1.2290798225525,45.933287072883],[-1.2337729337151,45.927058615789],[-1.2235741052757,45.913107194719],[-1.2064336016984,45.901445384945],[-1.188429054638,45.886745497166],[-1.1883892570962,45.882604284253],[-1.2000379808165,45.867288972841],[-1.2077101197588,45.85034131532],[-1.1956190365959,45.82969276273],[-1.2052089250964,45.824572656016],[-1.217429755495,45.813047230038],[-1.2364238849087,45.80453236122],[-1.2456662479746,45.821355001166],[-1.2502595149646,45.845963455069]]]]},"properties":{"code":"75","nom":"Nouvelle-Aquitaine"}},{"type":"Feature","geometry":{"type":"MultiPolygon","coordinates":[[[[-61.633561766828,15.839768416792],[-61.647984887615,15.847134741722],[-61.646885842853,15.857928742112],[-61.632811349943,15.868008467548],[-61.616954633224,15.858507931645],[-61.633561766828,15.839768416792]]],[[[-61.593277620878,15.852525797847],[-61.605013859511,15.856849657536],[-61.599089980543,15.86282183683],[-61.584324688123,15.864352670299],[-61.583843721787,15.876528440617],[-61.56835218061,15.871658886402],[-61.576558812766,15.866561285047],[-61.578755505213,15.859571155868],[-61.586962240267,15.857704247339],[-61.593277620878,15.852525797847]]],[[[-61.119932329535,16.167153177808],[-61.128887763352,16.169445954743],[-61.128428748764,16.1735081931],[-61.10791110472,16.17273938264],[-61.108228141193,16.168901868819],[-61.119932329535,16.167153177808]]],[[[-61.009731592269,16.349752106931],[-61.002076160633,16.333961565656],[-61.013134908482,16.327650815385],[-61.019408176242,16.327258023238],[-61.034891840704,16.318141287197],[-61.04737526771,16.308282628256],[-61.075287248562,16.30179630617],[-61.083852512155,16.296542997214],[-61.098491894606,16.294315937968],[-61.096467679563,16.303378825401],[-61.088288852872,16.311808644234],[-61.078645205481,16.312443984655],[-61.073986120786,16.320036802024],[-61.062767136655,16.321448522593],[-61.041743390837,16.33492093245],[-61.009731592269,16.349752106931]]],[[[-61.587243975479,16.344937552384],[-61.586116771069,16.352772985013],[-61.57927919558,16.346500883709],[-61.587243975479,16.344937552384]]],[[[-61.323119287614,15.949610056251],[-61.319301123538,15.953827755403],[-61.318358586729,15.974425022279],[-61.306996584991,15.978583333802],[-61.303420983511,15.98716294348],[-61.290717440169,16.003396665549],[-61.27600966113,16.004687075325],[-61.261828412286,16.000182673051],[-61.251663549277,15.992644813745],[-61.243967222943,15.991362102173],[-61.23206969995,15.981798577882],[-61.230907634697,15.973181516809],[-61.217654971033,15.95850045622],[-61.210098305978,15.954400187796],[-61.201119066068,15.945734240556],[-61.196153296332,15.931798904869],[-61.197228093353,15.916016347626],[-61.202131378589,15.905461737534],[-61.208019572206,15.899614219392],[-61.217816854526,15.895176882383],[-61.223251935643,15.887675923067],[-61.233121045184,15.880256236855],[-61.249483019474,15.872323847126],[-61.260137415575,15.871122013185],[-61.266137354751,15.868277434084],[-61.278683242486,15.866954245142],[-61.315008201808,15.880547307819],[-61.323358731877,15.886983425807],[-61.329502652724,15.896539036864],[-61.330916755209,15.910313636985],[-61.337222695437,15.938422857959],[-61.33451761871,15.943643551268],[-61.323119287614,15.949610056251]]],[[[-61.782310728057,16.187698673935],[-61.787181678891,16.194189058809],[-61.782433809868,16.213368740799],[-61.786880779671,16.22808176121],[-61.801476800406,16.243439831742],[-61.805916719765,16.259643859084],[-61.805955315399,16.274467249514],[-61.803077042805,16.280461596097],[-61.803087274812,16.294200167117],[-61.799712796785,16.310451192395],[-61.800519333745,16.316330777534],[-61.792264557903,16.31931160273],[-61.786799874047,16.32515524508],[-61.788027528452,16.330992079142],[-61.773403433379,16.349526607134],[-61.760450461163,16.355009398062],[-61.74823289666,16.355163129494],[-61.744143374802,16.361533370444],[-61.730811421242,16.356618008788],[-61.720527784087,16.34845396472],[-61.712963053158,16.337326187592],[-61.695242363953,16.334731819059],[-61.685801835829,16.327420126329],[-61.673030681674,16.325012899468],[-61.667669437974,16.318516904751],[-61.650128742025,16.320755367987],[-61.645413947651,16.318102339209],[-61.641367436099,16.308678634631],[-61.625741035676,16.30157314131],[-61.608828255564,16.304399792764],[-61.603538350899,16.298128759003],[-61.611158875442,16.292394709257],[-61.616000950851,16.282484736805],[-61.62596622969,16.282549700306],[-61.624284931296,16.275398780573],[-61.6118580456,16.279475076475],[-61.613531851882,16.267646357505],[-61.607586446108,16.268194802932],[-61.602073972636,16.273671593204],[-61.598569461166,16.266463294653],[-61.585026460185,16.269626842482],[-61.57915889342,16.278851307278],[-61.56483275027,16.286617473035],[-61.555114691066,16.28474375617],[-61.550019360034,16.277772438397],[-61.547231073118,16.256130567514],[-61.5530797846,16.249573038381],[-61.548832406206,16.241907103306],[-61.547714441544,16.22328891533],[-61.551691971155,16.224181915727],[-61.55591647918,16.232646569246],[-61.560761742267,16.235300460642],[-61.577416228036,16.234960935817],[-61.583788709917,16.233421956855],[-61.586921508469,16.22374972117],[-61.587548261375,16.211413552612],[-61.584403381095,16.20631241372],[-61.589954732406,16.19514232053],[-61.589150616047,16.186550959656],[-61.58295690373,16.179640064121],[-61.583780333393,16.162518691127],[-61.57732053457,16.15370885841],[-61.574138289437,16.137780866936],[-61.563082012583,16.134317440896],[-61.561115189196,16.128293993138],[-61.569955972829,16.121077921547],[-61.570381114244,16.113940815553],[-61.564202195109,16.106783812191],[-61.559272867917,16.092084828853],[-61.560836433545,16.063174029371],[-61.555488483812,16.053015551687],[-61.562887667481,16.044343698344],[-61.566151150902,16.032344158198],[-61.575790078604,16.020636378388],[-61.610752660917,15.991875719851],[-61.619204212061,15.975525871038],[-61.633373008564,15.966578095065],[-61.648533690715,15.969746828639],[-61.665156233008,15.963885256595],[-61.671772350042,15.959406990072],[-61.675881296722,15.952562216162],[-61.699976864829,15.946608000907],[-61.705776382452,15.949083298214],[-61.709496250489,15.955387360726],[-61.708058736036,15.961027795786],[-61.711081796137,15.974061330382],[-61.716241111462,15.982715797918],[-61.722805896747,15.985385087665],[-61.746384141374,16.010289503454],[-61.747337080707,16.022316341783],[-61.751046273315,16.034494818174],[-61.765058267712,16.050868012846],[-61.770365179133,16.062038595876],[-61.766361410866,16.089809145936],[-61.7729769599,16.093417450166],[-61.772143984619,16.099649275099],[-61.774153160614,16.115026361619],[-61.77357817784,16.122926366244],[-61.769864105642,16.128243147151],[-61.771038130405,16.134983618728],[-61.778538002814,16.139500786324],[-61.775113582008,16.148926407453],[-61.7759132936,16.170940707524],[-61.784106076905,16.177088677498],[-61.782310728057,16.187698673935]]],[[[-61.49348464245,16.353632236141],[-61.497398351201,16.358022571471],[-61.495443109093,16.37594616952],[-61.500178243663,16.384136281949],[-61.507507113796,16.389253918155],[-61.511152527625,16.387558113477],[-61.525750816257,16.394665043367],[-61.534551655015,16.419670248695],[-61.538773763808,16.437459387242],[-61.535458471539,16.454969086787],[-61.523223883299,16.462836214247],[-61.518153380095,16.470708184204],[-61.50730299274,16.474833513006],[-61.50428860693,16.483171594489],[-61.49479807123,16.487079979846],[-61.485524475177,16.493158433413],[-61.479496641275,16.500367128796],[-61.474006983834,16.510561842101],[-61.465321158622,16.513164208575],[-61.465108448233,16.507356219468],[-61.460459428456,16.500114831158],[-61.453213288153,16.498412051897],[-61.444923458251,16.500268244559],[-61.442244105107,16.489305187348],[-61.435127195969,16.487681408224],[-61.422444990174,16.4749342009],[-61.411393040438,16.469202448138],[-61.40702843877,16.447435137369],[-61.401916877535,16.442674369948],[-61.398317086437,16.430469473942],[-61.398420716966,16.41781837423],[-61.405530480848,16.395596019371],[-61.40466574415,16.383711978307],[-61.401490611723,16.374373323823],[-61.381038754427,16.34575029101],[-61.37588146355,16.341236378329],[-61.351141796425,16.333770517333],[-61.332141416031,16.333982609967],[-61.32145401211,16.330644567545],[-61.314573380392,16.33077044573],[-61.287885537827,16.321835113072],[-61.269308456352,16.31133663943],[-61.265288355631,16.305610573748],[-61.256777867855,16.299802270715],[-61.245276226142,16.276257171512],[-61.232931872301,16.266891086012],[-61.220328466077,16.263985098887],[-61.216899977731,16.260340759217],[-61.202501535267,16.254209815379],[-61.196037505889,16.255240138377],[-61.191173872125,16.250047929202],[-61.203805348638,16.249702660769],[-61.218509798761,16.252989572242],[-61.23150967587,16.253324404437],[-61.254263503143,16.256133752482],[-61.269470728714,16.25015876866],[-61.276762509452,16.25071521635],[-61.288646228443,16.244937626831],[-61.317824334501,16.24038165498],[-61.322941708704,16.243630303608],[-61.3276383273,16.241231955816],[-61.339283910697,16.241431947269],[-61.347648702275,16.236730283072],[-61.370463222778,16.232166868805],[-61.379668470884,16.222020892619],[-61.391259832938,16.222922423906],[-61.40501153066,16.216925178636],[-61.412584535743,16.211514386559],[-61.423016687022,16.208889955893],[-61.436533398902,16.208980853917],[-61.450739870236,16.200409028616],[-61.470299527981,16.198878805178],[-61.49022248227,16.204895711549],[-61.504617669815,16.206093795934],[-61.508479725498,16.214920890579],[-61.512023168409,16.216391776096],[-61.524294786657,16.213992069136],[-61.529473138568,16.215880724886],[-61.53040536202,16.224632961722],[-61.539653909524,16.236963711243],[-61.541240328535,16.243843297791],[-61.549697983932,16.251447846787],[-61.546544027313,16.254137554781],[-61.548844026581,16.272183589317],[-61.548684523044,16.281152429864],[-61.551398145077,16.287520027389],[-61.547243618321,16.298925121311],[-61.538690876976,16.305676036633],[-61.534416565937,16.312393028651],[-61.533802763786,16.325696682112],[-61.535584842212,16.331470545574],[-61.528927825759,16.339298695192],[-61.519443983501,16.34333266716],[-61.507936924031,16.34257373143],[-61.506988730883,16.350339284753],[-61.49348464245,16.353632236141]]]]},"properties":{"code":"01","nom":"Guadeloupe"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[-61.204045862119,14.861910321395],[-61.197936385582,14.863721448543],[-61.182378867518,14.871750492874],[-61.179699763096,14.874987215902],[-61.176590188317,14.874150969118],[-61.165397709082,14.877461562138],[-61.159764930568,14.878098752212],[-61.143621635523,14.877549337128],[-61.126961080526,14.874512980566],[-61.12240314101,14.871856774037],[-61.11272994709,14.869343736932],[-61.104558849512,14.865303722509],[-61.086510614497,14.853139375503],[-61.084325564333,14.853122066932],[-61.072086184251,14.844077682869],[-61.062650363211,14.838714501364],[-61.056207720705,14.834031468363],[-61.052059829962,14.832574884641],[-61.046552856404,14.834747605883],[-61.043069951011,14.834350197654],[-61.038636988792,14.830933599737],[-61.02965157779,14.827291831196],[-61.020961888593,14.817005830718],[-61.020722468476,14.812889383758],[-61.018108440301,14.809025422244],[-61.010638760733,14.807475406311],[-61.005853940211,14.808423538562],[-61.001946918696,14.807135403203],[-61.005113638029,14.801824938374],[-61.004038123385,14.797656084612],[-60.998850990241,14.790742413659],[-60.989652964125,14.780496311324],[-60.981617363378,14.777410677975],[-60.98040122931,14.770928105325],[-60.973916256635,14.76391411076],[-60.968367784668,14.760494778495],[-60.966270755786,14.756618674335],[-60.967643040841,14.754141210083],[-60.963387442042,14.747235161777],[-60.961805266196,14.738043832303],[-60.956755684524,14.736376348259],[-60.952713298311,14.742394982414],[-60.952421323003,14.748496465447],[-60.942114856742,14.756822274529],[-60.932180446185,14.762252927519],[-60.924780474802,14.761157334678],[-60.920486642325,14.758318400077],[-60.912172452938,14.762455167873],[-60.909527289494,14.766682747407],[-60.902411619636,14.767030264678],[-60.901687745781,14.769692048293],[-60.897453798812,14.770109849695],[-60.892067922414,14.774133282829],[-60.888427865366,14.780161376611],[-60.885593737876,14.780046867688],[-60.87811398093,14.775101482918],[-60.875692904178,14.775398180072],[-60.873212908041,14.76800742238],[-60.875445251611,14.763233489312],[-60.871877498817,14.759903422653],[-60.878659525509,14.757925476318],[-60.881831869275,14.761343085309],[-60.882291666751,14.766410175058],[-60.893504003071,14.765420272564],[-60.897010381643,14.758667037381],[-60.890507318753,14.755990004637],[-60.888467587246,14.753260560746],[-60.890940357391,14.74776572379],[-60.893432918104,14.749367955743],[-60.898113887667,14.746061789686],[-60.898061093247,14.742081811765],[-60.892245880461,14.741302383472],[-60.893046561159,14.737022964554],[-60.90034226025,14.734448945415],[-60.90433894767,14.737116503562],[-60.908171714717,14.73488763652],[-60.910945910203,14.736265416934],[-60.911107458902,14.741037972658],[-60.91295338061,14.74473778268],[-60.91944015615,14.746690230898],[-60.926278766633,14.750724905157],[-60.930942276303,14.749226015625],[-60.937488690543,14.749912540576],[-60.938692542529,14.745626518268],[-60.943130046871,14.743358159614],[-60.944435544044,14.733465944468],[-60.946208621766,14.728054457718],[-60.944357151769,14.722417416237],[-60.940186752502,14.721207439018],[-60.937123794507,14.716073752632],[-60.934155385917,14.715506927055],[-60.930607373011,14.721762701415],[-60.928675122079,14.715190514245],[-60.933817327999,14.712067407331],[-60.933116879167,14.707675844201],[-60.924561539299,14.708194875612],[-60.920777041297,14.710197719924],[-60.918689433603,14.714566968786],[-60.913566558626,14.715632337647],[-60.915294953995,14.709995751818],[-60.914205915439,14.702865421293],[-60.908756749636,14.699519929728],[-60.90250391272,14.701999898171],[-60.901404160643,14.695841751689],[-60.906840923075,14.695886365767],[-60.91053464716,14.688864210852],[-60.913015671956,14.69173294672],[-60.923411365958,14.688246069597],[-60.926305587276,14.688860215296],[-60.929215432865,14.685944889829],[-60.926577791562,14.680271853895],[-60.93016952794,14.678764119425],[-60.933019899653,14.681861861542],[-60.937430570602,14.682213752172],[-60.938189754983,14.675890537534],[-60.94301224785,14.671996159166],[-60.942037491546,14.667240719415],[-60.935602824468,14.664791714866],[-60.935019872718,14.661429535053],[-60.9299545018,14.653352092492],[-60.925494841769,14.653338554926],[-60.920325816396,14.65512403574],[-60.916245979154,14.663232781936],[-60.910553864669,14.665628680868],[-60.905987394203,14.662379723972],[-60.897037443187,14.665244694526],[-60.897682343225,14.661180647655],[-60.89143374641,14.658868626962],[-60.891185554575,14.665015454596],[-60.886851315672,14.666426372034],[-60.882958213069,14.665490035216],[-60.883165440804,14.658800707388],[-60.886523372128,14.652815027163],[-60.890500946874,14.650044524341],[-60.897189473302,14.649703887707],[-60.900240136392,14.651661575324],[-60.906035039239,14.648183380901],[-60.905313213152,14.646007289986],[-60.898824294085,14.644597866029],[-60.896207304742,14.641456742654],[-60.89421810884,14.63594567489],[-60.891096289703,14.632235187789],[-60.897508701098,14.627405513369],[-60.897769071412,14.620037956592],[-60.891316024903,14.619622720935],[-60.888173248749,14.620849378383],[-60.884493369629,14.619046725664],[-60.875284018255,14.620302986855],[-60.874773032954,14.615733307015],[-60.877965520086,14.612322357846],[-60.8692174037,14.604745359303],[-60.872098129395,14.600067485773],[-60.87245993411,14.596311782028],[-60.867124741356,14.591674577984],[-60.858555497241,14.589321759852],[-60.852333103639,14.593746439953],[-60.850467413457,14.585502025007],[-60.851621358406,14.579981728243],[-60.847495876499,14.576208287755],[-60.85358770356,14.575446573333],[-60.852629902306,14.570020702838],[-60.846031397538,14.564983891778],[-60.842482739779,14.566896609382],[-60.840649796922,14.56448516712],[-60.841630870213,14.559384406987],[-60.830242568355,14.569597097162],[-60.830105468888,14.56028255571],[-60.834551330729,14.556928975626],[-60.838568014788,14.550001236229],[-60.836099148999,14.546226711678],[-60.831703557193,14.54474300595],[-60.826991038075,14.537921507596],[-60.83197709685,14.531633551911],[-60.825276533013,14.533113876461],[-60.824198453144,14.529533798735],[-60.825858984401,14.521546140046],[-60.830148953328,14.524203582592],[-60.834714601647,14.522659997084],[-60.832887594612,14.519774213426],[-60.836427654235,14.513993186448],[-60.834705070708,14.509910220472],[-60.82996968666,14.514527188228],[-60.824905588,14.514890510078],[-60.822673550686,14.510666316928],[-60.823766599082,14.503690825767],[-60.822794123203,14.494437205811],[-60.817886445696,14.493175431402],[-60.814401032392,14.490257881442],[-60.814161391096,14.485185645066],[-60.811039655527,14.478866750314],[-60.813411648811,14.474532648344],[-60.819315623886,14.471349922928],[-60.814865337778,14.461681820899],[-60.823640343189,14.452442600671],[-60.822624689154,14.447235759261],[-60.824508114184,14.440062378446],[-60.827157481217,14.435156815127],[-60.829194650283,14.435716837388],[-60.834379397705,14.432278448448],[-60.832686125867,14.430003896954],[-60.835512679275,14.425822704027],[-60.834660356119,14.422876378982],[-60.84051303983,14.422338166739],[-60.843385059242,14.427471601963],[-60.848640695224,14.427424723583],[-60.847224536912,14.419936276844],[-60.845292930114,14.416021400005],[-60.837656167689,14.414012429722],[-60.840522643781,14.410464924352],[-60.844528842898,14.413528607853],[-60.847788892765,14.412334871302],[-60.850339847119,14.40783465465],[-60.852856448816,14.4068156896],[-60.858072685688,14.397929949606],[-60.86294480669,14.395641834437],[-60.869263733958,14.394743767144],[-60.87660759455,14.398195734874],[-60.878928350266,14.402871141158],[-60.88505100913,14.405408299877],[-60.885439159029,14.41360314295],[-60.8931811347,14.419182699037],[-60.885859336519,14.427442312737],[-60.879902944482,14.438425676217],[-60.881202325749,14.443091915666],[-60.879719856896,14.44737529506],[-60.872628392533,14.448809551984],[-60.873868482406,14.452481302432],[-60.866932199852,14.459207417499],[-60.862964269674,14.461434969974],[-60.866076402811,14.470457763871],[-60.87559043158,14.470236658169],[-60.882968660734,14.4662115879],[-60.888823414311,14.459692140411],[-60.894298512621,14.451699807502],[-60.897691106977,14.448879168539],[-60.90016370471,14.449916906412],[-60.909584385784,14.459601834816],[-60.910096289657,14.468919240095],[-60.916981701315,14.468857416975],[-60.928754602235,14.46427688124],[-60.938367740609,14.463969119755],[-60.943589158828,14.466250442187],[-60.950920813456,14.466578276622],[-60.955112440126,14.465075817466],[-60.96188088152,14.47082489224],[-60.965766677246,14.471339279031],[-60.973092153975,14.468292103858],[-60.978401876207,14.471226820319],[-60.975945144912,14.475728545127],[-60.981361465758,14.482281524361],[-60.985408781994,14.476030312335],[-60.989984067281,14.472916549971],[-60.992686674099,14.466923865464],[-60.996689991819,14.468198736423],[-61.000437928634,14.472003482681],[-61.003853992637,14.478812814355],[-61.007938374409,14.474050712357],[-61.010635094126,14.473562958913],[-61.017352498906,14.480046706944],[-61.020922746651,14.480525020461],[-61.03251317448,14.477087063475],[-61.040669957662,14.473531347092],[-61.046572074599,14.467832905159],[-61.047429383634,14.460469427803],[-61.050106009927,14.457053024278],[-61.054725880599,14.454329517028],[-61.058628181849,14.454132181344],[-61.065234023829,14.457662224623],[-61.067298398911,14.46034693879],[-61.067668360624,14.465503844108],[-61.072092658923,14.469109803901],[-61.076749230993,14.467515809182],[-61.081692518297,14.470219423156],[-61.082963712202,14.473394607531],[-61.079315161913,14.481462135987],[-61.079893501021,14.489378893354],[-61.090818246081,14.492941823522],[-61.089718265549,14.496393223729],[-61.084641224522,14.49827678888],[-61.084059141692,14.501031087753],[-61.086564585237,14.506430448561],[-61.089826590214,14.507562268764],[-61.095525612997,14.506404829408],[-61.100439786619,14.507210108628],[-61.094625288486,14.523808604704],[-61.091362442163,14.525231628381],[-61.084493720202,14.535038748094],[-61.075010403185,14.541253550408],[-61.068568615803,14.539802475653],[-61.064509619841,14.541944184451],[-61.061206192909,14.550305932469],[-61.055325148003,14.550918650008],[-61.053109970024,14.554472554348],[-61.054195503029,14.557647241722],[-61.049855091635,14.559874860475],[-61.050569693848,14.551297499758],[-61.044230529342,14.552937230425],[-61.040414463981,14.556412536846],[-61.037361204508,14.555032310405],[-61.037782351945,14.549791720846],[-61.04413009618,14.546221939279],[-61.040691243481,14.541446985649],[-61.035028836842,14.541178136716],[-61.03068108714,14.539336044496],[-61.026584718426,14.535416613259],[-61.023016010979,14.539775723998],[-61.01713178459,14.538282797649],[-61.013819988008,14.535047572925],[-61.010000175304,14.541212588352],[-61.005417530936,14.539730429087],[-61.000687635947,14.543898510396],[-60.994209551553,14.546335428751],[-60.996092383244,14.549678872933],[-60.99108172719,14.553047269922],[-60.996856681871,14.561006614016],[-61.001422532248,14.559550094555],[-61.010574578025,14.564802572683],[-61.014138709418,14.570565809614],[-61.010523024067,14.574788671756],[-61.010671944106,14.57876882886],[-61.014437164139,14.579612362562],[-61.016031814974,14.582868311332],[-61.023258079858,14.583521492795],[-61.024260166204,14.585608442482],[-61.023038673216,14.591884117057],[-61.016737273021,14.595272777969],[-61.014811035177,14.602491242421],[-61.020175266991,14.602646174708],[-61.022123056822,14.605351146856],[-61.019049147725,14.611297472904],[-61.024188102832,14.613009273514],[-61.027200296557,14.608872421354],[-61.040305188873,14.60391593682],[-61.037772517576,14.597759506337],[-61.037893415232,14.593543008131],[-61.043404663655,14.595212300844],[-61.04815997935,14.598323771776],[-61.052479464194,14.598356247727],[-61.055948146152,14.594990885602],[-61.060945552717,14.596973604239],[-61.057704570424,14.603369231594],[-61.067501282923,14.6013865404],[-61.072090260048,14.602347188852],[-61.083306599691,14.600057433053],[-61.090645812729,14.599998317249],[-61.096408586302,14.606490702901],[-61.09908138981,14.612315264716],[-61.110995672599,14.625267533645],[-61.130022089135,14.632753893885],[-61.133321752995,14.632641194729],[-61.137282989528,14.635303679983],[-61.139874030088,14.642953708013],[-61.149357409659,14.649284984095],[-61.153006432096,14.65525786954],[-61.158413566448,14.661152470672],[-61.162147449917,14.668353207492],[-61.166963491398,14.674280943862],[-61.175726617879,14.687118061096],[-61.17881358919,14.692836813684],[-61.184159877707,14.705944210298],[-61.184327883856,14.713360775426],[-61.176553878817,14.741206403438],[-61.17725351256,14.746184307086],[-61.184652331677,14.755915294227],[-61.199273356942,14.769086171347],[-61.202705318999,14.775395788963],[-61.209676107893,14.781051429903],[-61.215105071118,14.782309946257],[-61.220773468668,14.79351965809],[-61.227145714297,14.804144542873],[-61.2289399188,14.8117544439],[-61.228608376891,14.823282957234],[-61.223236001805,14.837038281642],[-61.21899002146,14.843859499965],[-61.215471194312,14.847520416895],[-61.210497386735,14.857931786493],[-61.204045862119,14.861910321395]]]},"properties":{"code":"02","nom":"Martinique"}},{"type":"Feature","geometry":{"type":"MultiPolygon","coordinates":[[[[-53.870434375273,5.7449104931337],[-53.877886422112,5.7368506714647],[-53.90057002646,5.7415092227013],[-53.89903570619,5.7477556664337],[-53.870434375273,5.7449104931337]]],[[[-54.262866014259,5.2763794088942],[-54.240222653269,5.2863675167148],[-54.227818290795,5.298811974827],[-54.20848197948,5.3032382892827],[-54.19683141711,5.3187850929545],[-54.184146850376,5.323343664439],[-54.174191736865,5.3417614770912],[-54.14793718565,5.3626167245287],[-54.132773603279,5.3846632689967],[-54.117478116658,5.4173672800429],[-54.092860763867,5.4405055110011],[-54.063725195329,5.4806565680479],[-54.046956269484,5.4918376041137],[-54.037464776574,5.5101010755252],[-54.018811786215,5.5214389206923],[-54.009473942828,5.5453274314414],[-54.003653891839,5.5730648768993],[-54.006597523184,5.5892607310604],[-54.004907782462,5.6118457705281],[-54.014856329741,5.6408119832662],[-54.011948038878,5.663468313256],[-53.971500049162,5.7341746541286],[-53.968340504127,5.7451588592873],[-53.934419725078,5.7465313138855],[-53.895425428493,5.7330541527243],[-53.836712859752,5.7323064847222],[-53.799234439704,5.7238817805039],[-53.786975959887,5.7186709141915],[-53.733987198145,5.6887836941746],[-53.712715958305,5.6804956582425],[-53.700811495542,5.6705010590975],[-53.647029326289,5.640302547715],[-53.630887351792,5.6334299470212],[-53.592551162579,5.6082640423834],[-53.584393711158,5.6094623546164],[-53.50886332364,5.5780891436271],[-53.469174550354,5.5662346022297],[-53.453569382873,5.5683930569684],[-53.403015077997,5.563665511641],[-53.365564014256,5.5516606472615],[-53.308912384842,5.5384470957925],[-53.300512506713,5.5528693925483],[-53.271974256164,5.5611587428729],[-53.269338109008,5.5522252558034],[-53.23411867321,5.5425071694207],[-53.187966675372,5.5251511454233],[-53.175294889318,5.5235424882782],[-53.130779622653,5.5067849920981],[-53.122049547976,5.4970046713886],[-53.074734826298,5.4701920560875],[-53.060603594644,5.4650586598703],[-53.01431951546,5.4553078164341],[-53.003160314486,5.4386861012074],[-52.996893794786,5.4596930069106],[-52.981186298522,5.4541657279474],[-52.956353875765,5.4555426531472],[-52.930925840412,5.443189304076],[-52.922858744598,5.4297026375857],[-52.875645210834,5.395134542477],[-52.867820710053,5.3821529702959],[-52.855604184631,5.3778466084172],[-52.834404500271,5.3473851820448],[-52.831605639941,5.3332474094359],[-52.811921641649,5.323989708057],[-52.788928709127,5.3079971259297],[-52.769338288472,5.2788922211643],[-52.722797114306,5.2368388833953],[-52.683839129716,5.2099352638616],[-52.666325683605,5.2002328688054],[-52.656199749922,5.1852945779885],[-52.637381338131,5.1661527209851],[-52.628093567263,5.1621235661598],[-52.627649173444,5.1462877582226],[-52.606599457385,5.1346015000472],[-52.577981537689,5.1085751366517],[-52.549456070124,5.100638613552],[-52.490117950992,5.0405885535444],[-52.468170688695,5.0224742700305],[-52.460314432396,5.0121214814072],[-52.420186763604,4.9822303517225],[-52.402042985345,4.9644328086676],[-52.390400815125,4.945302253376],[-52.364675922738,4.9207169016692],[-52.355881226457,4.9175124436249],[-52.334263734283,4.9313304207521],[-52.335864576865,4.941815767051],[-52.304339285464,4.9508360234963],[-52.283495881645,4.9347307287598],[-52.263040861811,4.9141530948307],[-52.262729933853,4.8998561841106],[-52.249874955894,4.8892439827337],[-52.229082293874,4.8596017030659],[-52.210714989829,4.8586879631742],[-52.200386562622,4.8503002903876],[-52.182576101399,4.8205048122343],[-52.159943441415,4.8086905634655],[-52.145696555689,4.7908754485718],[-52.139367197341,4.7968981731195],[-52.114831530206,4.7861670001622],[-52.100239025169,4.7717176636045],[-52.089912066838,4.7683838464068],[-52.069754606897,4.7514387392035],[-52.017814365524,4.718335681359],[-52.006179250743,4.7017879541951],[-51.916024214319,4.668815539866],[-51.896519698294,4.676768312428],[-51.862390485144,4.6708003084052],[-51.832635527672,4.6507501480391],[-51.823261930884,4.635641127728],[-51.811981346307,4.6293646244524],[-51.799483475822,4.6146485968912],[-51.784567687491,4.5745213968512],[-51.781614207374,4.5441692871027],[-51.775019619042,4.5205746874562],[-51.776548583925,4.4902031550085],[-51.768387477939,4.4682690353028],[-51.748665410741,4.4474547093187],[-51.752328441827,4.4182125048386],[-51.737147252553,4.4041259031371],[-51.711834878195,4.3880250207713],[-51.692206216363,4.3950524298082],[-51.692393784425,4.3844140118647],[-51.707651369383,4.3755661914807],[-51.718108675764,4.3571438328783],[-51.718383011835,4.3404128364733],[-51.711081409267,4.3140078457171],[-51.701558332228,4.2945431110295],[-51.683398799883,4.2710667135168],[-51.675882031481,4.2537436009893],[-51.661022909296,4.2438436663588],[-51.656192903346,4.2264093762853],[-51.626281726719,4.1950661463654],[-51.634913693767,4.1763125671143],[-51.63750189943,4.1332275560296],[-51.647651861027,4.0794636482237],[-51.656014792722,4.0538694849574],[-51.675670135113,4.0360177099327],[-51.702135480544,4.02432744304],[-51.708686123337,4.017987624705],[-51.745685993774,4.0014526708911],[-51.775717858493,3.9764350175201],[-51.782283451259,3.9640547240078],[-51.78029379459,3.9409937117156],[-51.782530259289,3.9207148928692],[-51.798590836173,3.8869182263487],[-51.821958925164,3.8682745935366],[-51.823397734085,3.8585361108645],[-51.837777500164,3.8499980310652],[-51.856350283673,3.8326312859371],[-51.873945573273,3.8031320774989],[-51.891090039957,3.7961274870908],[-51.896426853701,3.7850335927045],[-51.920567066689,3.7800592760501],[-51.923542657142,3.7641591056033],[-51.918833693251,3.7492295428788],[-51.923475741699,3.7226346395689],[-51.955728054116,3.7204074665979],[-51.972555161267,3.7054311484382],[-51.978748191169,3.6824004843594],[-51.986388862391,3.6725404631457],[-51.991313202659,3.6407315920422],[-51.988221624686,3.6276876173801],[-52.019722377848,3.5930217371882],[-52.060359310551,3.5196449891265],[-52.069908631066,3.51800677014],[-52.073507500696,3.4997426943768],[-52.08677525794,3.4895404755011],[-52.095175968896,3.4617253482451],[-52.108617032724,3.4510172217463],[-52.138319175974,3.3937122626886],[-52.150062553217,3.3756061479053],[-52.173680729923,3.3319975769474],[-52.187903953199,3.317454077759],[-52.189028520898,3.3020164147496],[-52.210452973822,3.2773645326556],[-52.233551819493,3.240650008421],[-52.2426430107,3.2373356483004],[-52.249063373148,3.250251038254],[-52.259709946711,3.2530615508378],[-52.274474519949,3.235812608872],[-52.292462780503,3.2263850399586],[-52.302818768633,3.1990142961976],[-52.299307558495,3.1781833835595],[-52.330478173873,3.1677865447781],[-52.339415906748,3.1439389262584],[-52.349078418676,3.1354109983365],[-52.35162290697,3.1234417939473],[-52.3385140188,3.1167557183711],[-52.34515031019,3.1080327965935],[-52.343074840595,3.0932421660963],[-52.325894161671,3.0777731439101],[-52.345489094399,3.0423797356188],[-52.353803125518,3.0214311913146],[-52.362057536216,3.0170894098949],[-52.370552165855,2.97591909157],[-52.395079580663,2.9277883212834],[-52.379257696823,2.9129479592641],[-52.39009288722,2.8981695702437],[-52.405543272257,2.9008546667898],[-52.419837333975,2.893130985888],[-52.444916094791,2.8500261345049],[-52.455710551516,2.8224214300702],[-52.473404092528,2.7938522356518],[-52.478087571117,2.7766245771087],[-52.478968658748,2.7531061394273],[-52.491027900942,2.7291623259451],[-52.499656629936,2.7219488960566],[-52.510635721201,2.6932793300204],[-52.529337734985,2.6541808625403],[-52.541997006503,2.6539308223123],[-52.555185359053,2.6402752946528],[-52.542947468293,2.6239475126302],[-52.548785600581,2.6100155016155],[-52.531807312113,2.5988862032418],[-52.527622266753,2.5810160208327],[-52.537978686141,2.5664790248713],[-52.561156784125,2.5502515931209],[-52.551653756749,2.5208228326326],[-52.565161546205,2.5162358626844],[-52.584751759132,2.4963340907662],[-52.593735764712,2.4778922460682],[-52.616762222128,2.4756394764376],[-52.621527379923,2.4620186165288],[-52.611242322961,2.4554510625897],[-52.616345652966,2.4455620886592],[-52.637195935851,2.4429855184842],[-52.64631771427,2.4320869547261],[-52.644682646044,2.4182832848087],[-52.6557059596,2.4059708306583],[-52.654099480105,2.3956606318591],[-52.660530608181,2.3739379262039],[-52.680151207435,2.370588881787],[-52.71041812416,2.3585884729123],[-52.719470263205,2.3437646975718],[-52.769908189272,2.3209253142118],[-52.793673355459,2.304434737563],[-52.819174037528,2.2946597180915],[-52.839445700591,2.2910347300002],[-52.838177463888,2.2812605225687],[-52.856577544392,2.2800259807313],[-52.853983968273,2.2636426710577],[-52.86984216908,2.2600459429836],[-52.877221305434,2.2383881928929],[-52.886505496255,2.2346878716074],[-52.886153271384,2.2192450547539],[-52.901038014396,2.1985554568938],[-52.91396690882,2.1922708449834],[-52.939030098669,2.189893816624],[-52.939825169721,2.1797974129318],[-52.952691012944,2.174533663303],[-52.985700093695,2.1685716236534],[-53.001453904541,2.1775951046092],[-53.041584032761,2.1873481856855],[-53.060001178205,2.1965567562092],[-53.062342112939,2.2041843636448],[-53.080261730774,2.2225309949581],[-53.094492958577,2.2215777162888],[-53.13385114565,2.2253471578289],[-53.181269812706,2.2119298347366],[-53.209697425491,2.2105377836731],[-53.226086026734,2.2024681680332],[-53.244697383443,2.2110933714304],[-53.263030725464,2.1891485517551],[-53.27523834383,2.2009497919657],[-53.272039021182,2.2220586741672],[-53.260455877868,2.2234587870213],[-53.25870167422,2.2369737590856],[-53.23700132864,2.2520890645195],[-53.226655262079,2.2635898239707],[-53.237554458162,2.2699716335673],[-53.256818387152,2.2704134087924],[-53.26016840175,2.2858133914971],[-53.280763858611,2.3014243097961],[-53.300865415294,2.3070281723707],[-53.314117647012,2.323385695265],[-53.317147438446,2.3400825257566],[-53.331859630719,2.3340619997331],[-53.333058337428,2.3459462201964],[-53.356331646394,2.347854992745],[-53.358656319737,2.3278521194051],[-53.372089634126,2.3129994298218],[-53.388015075308,2.3038654794806],[-53.399174963147,2.3049719972907],[-53.40628632925,2.2898355970349],[-53.433121033304,2.283085806162],[-53.444765440458,2.2728980637387],[-53.451705880049,2.2595575198176],[-53.464810284028,2.2521568558424],[-53.498114464001,2.2593460010372],[-53.525831132889,2.2529148949165],[-53.544810038231,2.2530723689672],[-53.567459930347,2.2671154832105],[-53.581738192006,2.2680651296355],[-53.604411697437,2.2806979473673],[-53.619368297097,2.2733437827726],[-53.626011873791,2.2791139194501],[-53.657025775315,2.2812663260589],[-53.653726874251,2.2974142121025],[-53.669143748873,2.3036906508646],[-53.689066812059,2.2950125153414],[-53.698903151567,2.3111386460154],[-53.728945680109,2.3108730297403],[-53.739586128734,2.3057719339171],[-53.747656186871,2.3197993602764],[-53.725996071963,2.3388253190133],[-53.741548012867,2.3736469528128],[-53.751120819346,2.3697095104057],[-53.765989126907,2.375532710037],[-53.783265068377,2.3611406869512],[-53.796860642861,2.3614593214452],[-53.81052476268,2.3512450304729],[-53.809578187046,2.3410386952895],[-53.834587093055,2.3322899327453],[-53.827893001968,2.3229014124557],[-53.815154503059,2.3222492938537],[-53.813216041767,2.3113898276005],[-53.835640966513,2.3039543572339],[-53.851764349759,2.3030789176854],[-53.882721158575,2.3087999802136],[-53.885191189107,2.2750901153297],[-53.896454298088,2.2729386216716],[-53.905403005731,2.2606512224728],[-53.91510319892,2.2622336350847],[-53.915050675876,2.2781460256735],[-53.933611429337,2.269373712967],[-53.941349609132,2.2592746002028],[-53.936594453965,2.2502318640433],[-53.940896361566,2.2198377044822],[-53.964388361018,2.218521068188],[-53.973451072653,2.2061817978445],[-53.990362121068,2.2090984530074],[-54.017342447745,2.1820834272769],[-54.029947126846,2.1871705400402],[-54.045805238906,2.1863901831659],[-54.064369342986,2.1964307053103],[-54.072299676582,2.1786794158474],[-54.08283164475,2.1724965434496],[-54.085085613451,2.1480232613709],[-54.095350768031,2.1320348808263],[-54.112087753481,2.1175667170442],[-54.127829732075,2.1229667584208],[-54.159341789619,2.1234695547512],[-54.174075660524,2.1366521094363],[-54.190364396535,2.1710812617384],[-54.224091361855,2.1497983892807],[-54.254256912253,2.1557695046639],[-54.267552854806,2.1442669520787],[-54.288233345492,2.147639261715],[-54.319253075811,2.1595544411166],[-54.341832485053,2.1518014547446],[-54.339086916635,2.168554210257],[-54.360668130739,2.1748995679326],[-54.364835391293,2.1849233421364],[-54.354423675378,2.2029260354922],[-54.363780895557,2.210337749774],[-54.397791941011,2.1968809499094],[-54.42101368265,2.2000597926314],[-54.420670361717,2.2136215359175],[-54.433196987168,2.2131182664551],[-54.441671926258,2.2051504817472],[-54.460827007844,2.2074672711924],[-54.478120569375,2.2161897943211],[-54.476245480032,2.2254676162237],[-54.503743707826,2.2544224663441],[-54.523241499869,2.2527262123599],[-54.535482660783,2.2604638716604],[-54.538791838056,2.2724582451497],[-54.520241461985,2.2768464317176],[-54.519344430168,2.2892739832837],[-54.533658650118,2.2924983332531],[-54.538016791767,2.3044927025772],[-54.532681133799,2.3168878577412],[-54.543056212929,2.326819850898],[-54.59182162165,2.3250026889434],[-54.601500729322,2.3366165466918],[-54.590443158543,2.3519263098488],[-54.558308492487,2.3516488904296],[-54.522197362088,2.3369264627634],[-54.509975123162,2.3366484361267],[-54.510252417974,2.3713713011284],[-54.504975070503,2.3910931323174],[-54.49608616343,2.4055372839428],[-54.471751404771,2.4354799412286],[-54.438610084343,2.4322222649037],[-54.419512495163,2.4368416979208],[-54.39083815185,2.4684491214879],[-54.38907253666,2.4806955465275],[-54.372729822487,2.4912275812871],[-54.369994923459,2.5089173040419],[-54.352913073729,2.5185674985255],[-54.34410045025,2.5397108926895],[-54.345920253557,2.561742524651],[-54.33401631489,2.5664106695319],[-54.32281172448,2.5928221383698],[-54.321642497617,2.6096480229722],[-54.312765543016,2.6133277248044],[-54.31719726069,2.6268177831086],[-54.29090970767,2.6606310004328],[-54.280005701825,2.6665871925767],[-54.269420561724,2.6851363777484],[-54.273007056817,2.6932287143362],[-54.264722357456,2.7231474019132],[-54.235163925432,2.7478316519087],[-54.208634295133,2.7766192112614],[-54.208133578115,2.7937324925247],[-54.200369962627,2.8012466358484],[-54.206202149817,2.8285723038286],[-54.185911894683,2.8378169785487],[-54.179398860611,2.8585163824485],[-54.189407665841,2.8678494104288],[-54.193859317854,2.8872316981857],[-54.185709373887,2.9053822858276],[-54.185289583847,2.91680851826],[-54.172831071757,2.9385877115839],[-54.175904172712,2.9576994163798],[-54.164823951127,2.9734572490979],[-54.181399227755,2.9837106825116],[-54.181478020797,3.0013584325913],[-54.169656917996,3.0075111490591],[-54.170525159314,3.0200087540496],[-54.19067247685,3.069601251712],[-54.17426789177,3.0725319328281],[-54.181094744884,3.0907990191331],[-54.173671567916,3.1055950922194],[-54.186189999628,3.1351142569647],[-54.198471996305,3.123771871099],[-54.213840499038,3.150181795143],[-54.203115724011,3.157575913675],[-54.204120901379,3.167395159674],[-54.194007395456,3.1970583224364],[-54.178168904994,3.2068788631048],[-54.152320699544,3.2410781402204],[-54.136293144425,3.2660090565619],[-54.121829138487,3.2718629338758],[-54.117968923844,3.2846620973415],[-54.100466323302,3.3003723745283],[-54.081625034435,3.2934886718991],[-54.064241525004,3.3126532463437],[-54.06715847166,3.3243288144866],[-54.06218177045,3.3520293128855],[-54.053488609946,3.3634107358171],[-54.059100725427,3.3783806592773],[-54.034185047889,3.4048240487565],[-54.020672938839,3.4119659557414],[-54.012133509677,3.4270289843021],[-54.019083743108,3.4361380960611],[-54.016985509834,3.4569881479689],[-54.008052369248,3.4680604397954],[-54.008320853295,3.5066713144546],[-53.999990815695,3.524178298858],[-54.009265240273,3.5378210522926],[-54.004485319904,3.5605937315448],[-53.98703962948,3.5803472195456],[-53.980580745949,3.6083254239515],[-53.989315888026,3.6149298685601],[-54.003189024935,3.6450872463876],[-54.022618182306,3.6467456862701],[-54.029407607234,3.6312126239581],[-54.050962672311,3.6350235551762],[-54.050339819694,3.6527154344785],[-54.056885787822,3.6600486397741],[-54.082843031463,3.6744072261806],[-54.0865962578,3.6871707582536],[-54.078988830955,3.7064511774739],[-54.084754118675,3.7238482757225],[-54.095625157433,3.7333315585552],[-54.100737542566,3.7514983108145],[-54.113079866772,3.7684220868723],[-54.121892382347,3.7926706949773],[-54.130377462649,3.7999651237886],[-54.166238334553,3.805156134274],[-54.186354773814,3.8002219841512],[-54.197703785339,3.8054785208196],[-54.20175687656,3.8232481374998],[-54.189386190364,3.8418281592706],[-54.196495701573,3.8513970777255],[-54.236887910757,3.8604652052628],[-54.250277792254,3.8867857374249],[-54.249189869496,3.9088425216801],[-54.278099503312,3.9205870282916],[-54.289965840761,3.9357646401218],[-54.29958095209,3.9677636343795],[-54.318053687475,4.0131453346459],[-54.336240932718,4.0371004539892],[-54.357569123254,4.0501448068332],[-54.344076199707,4.0959372834853],[-54.344322701853,4.1134401961426],[-54.323301670884,4.1347004780105],[-54.325436701081,4.1501049388355],[-54.340806334555,4.1556168596307],[-54.366322001621,4.1762836408717],[-54.387231386423,4.1793705667925],[-54.395737232332,4.2021487209072],[-54.388370867675,4.2457774455059],[-54.382323935485,4.2632729375416],[-54.390476069704,4.2800753216892],[-54.394439769519,4.3065294022075],[-54.391375518757,4.3332099242721],[-54.385863609216,4.3492169782989],[-54.394501153553,4.3649786564754],[-54.411515590852,4.3736161163727],[-54.435994346941,4.3645844823004],[-54.440743069168,4.3727416650479],[-54.432201067989,4.4150723011303],[-54.441035895905,4.4389134958369],[-54.432421475822,4.4679483152275],[-54.437897392371,4.490814207996],[-54.450025872006,4.5258780813901],[-54.425132424615,4.5562059347853],[-54.417918359697,4.5785254856514],[-54.415241817173,4.606470441976],[-54.436351289991,4.6363040139953],[-54.43568178545,4.6532260375649],[-54.423668070639,4.6654462564097],[-54.4262564016,4.6831752259123],[-54.433422606587,4.6973324987317],[-54.427245236117,4.7149491802101],[-54.435414328774,4.7247764719879],[-54.458543644528,4.7257603315912],[-54.466259120463,4.7398423655057],[-54.459970700728,4.7777678336806],[-54.467827696164,4.814929055577],[-54.465563115708,4.8240431031641],[-54.46890651684,4.8633887349655],[-54.468973090114,4.8903634409371],[-54.478688716157,4.9035249723935],[-54.446120348109,4.9349698819465],[-54.439850925063,4.952563992458],[-54.443267197438,4.9865458051035],[-54.436274055119,4.9932487640836],[-54.437853118554,5.0173013054688],[-54.425502764339,5.0340195826318],[-54.416730606915,5.0604921886792],[-54.415499820177,5.0846792375844],[-54.37534108379,5.1078641738779],[-54.365922885417,5.1350973963443],[-54.350554422629,5.1438636995822],[-54.346323867677,5.1616360756424],[-54.333884890559,5.1762728437267],[-54.312669573789,5.2128222761107],[-54.30811059449,5.2252720237556],[-54.285918868333,5.2491822108207],[-54.278956436148,5.2624821687659],[-54.262866014259,5.2763794088942]]]]},"properties":{"code":"03","nom":"Guyane"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[55.25415375561,-21.109737804325],[55.230936180403,-21.090934707251],[55.221239445979,-21.078095020713],[55.222672586796,-21.055647530992],[55.217135411092,-21.036469853464],[55.233691556437,-21.019279719696],[55.244908004365,-21.019876366239],[55.256552904916,-21.0162341043],[55.274828812396,-21.003236502391],[55.279329074841,-20.99580668298],[55.282766218872,-20.978605336065],[55.278748340251,-20.963381843067],[55.27823084148,-20.952052399071],[55.288112554157,-20.937199184538],[55.289292404055,-20.923219361848],[55.30433191919,-20.929152184371],[55.325052994639,-20.929558227374],[55.343016813716,-20.922804444906],[55.355139561644,-20.910079541906],[55.386296665128,-20.889371260808],[55.394036917298,-20.882986388174],[55.421141873335,-20.874440484522],[55.437381127014,-20.876567897466],[55.456649591996,-20.876526962726],[55.471366123992,-20.88456241524],[55.485094324598,-20.885877009892],[55.502874187823,-20.882269385646],[55.541560144133,-20.89467347041],[55.551075265405,-20.895347906424],[55.55717638151,-20.891552105997],[55.587309965415,-20.896549201032],[55.592451795185,-20.895958362667],[55.61789051779,-20.909357098243],[55.640381167177,-20.91326314248],[55.664378168675,-20.925161312912],[55.680839253857,-20.942754586943],[55.694615577906,-20.963060447375],[55.700683666125,-20.978611757202],[55.700686665069,-21.005727085591],[55.702240950638,-21.016337520335],[55.707788812226,-21.028026265196],[55.713564045606,-21.029915684479],[55.728090424356,-21.046588707299],[55.732198197765,-21.061971681397],[55.7387344493,-21.071505992956],[55.752531093226,-21.085300722523],[55.762611492449,-21.100604921751],[55.77143403156,-21.106971183666],[55.780072832563,-21.121889982217],[55.800058131227,-21.127272443592],[55.808258463549,-21.136108721779],[55.826736952168,-21.145764202904],[55.834386208899,-21.160249915052],[55.832909277473,-21.166581656933],[55.836628265464,-21.183406142411],[55.825382333317,-21.187945665989],[55.824708367899,-21.203251849261],[55.814058919803,-21.214293733919],[55.808520861285,-21.227530149164],[55.804226212501,-21.252892346481],[55.802020994801,-21.257819143119],[55.803216924008,-21.276421214981],[55.808280901341,-21.287305928884],[55.805403930158,-21.296578694611],[55.804504092923,-21.312482750854],[55.807295563557,-21.336761171791],[55.799849509215,-21.346518885481],[55.779848640249,-21.362096247769],[55.7736071095,-21.365231547113],[55.760772415062,-21.363569944646],[55.741310273026,-21.369204880066],[55.727080508255,-21.369853677725],[55.719399086761,-21.37393894895],[55.702544549396,-21.376892628476],[55.681553265314,-21.374733505191],[55.670862413982,-21.383821728156],[55.65919329063,-21.382840878435],[55.652833154059,-21.385827852775],[55.638028256227,-21.382997384189],[55.625637295877,-21.382826767847],[55.609006957416,-21.386904617465],[55.584504867382,-21.372380188377],[55.571433456659,-21.375964895307],[55.547526506413,-21.369146515459],[55.536725030294,-21.363098987553],[55.527168599735,-21.361948612279],[55.501002992462,-21.350598321595],[55.488681490983,-21.350477057178],[55.459522850383,-21.341144046726],[55.454781045738,-21.331585289694],[55.448947363585,-21.328377283821],[55.429383738704,-21.326204793365],[55.417433869019,-21.320149166717],[55.407899030618,-21.306824395359],[55.390688251147,-21.292159550605],[55.367871676711,-21.284874530064],[55.340820614137,-21.280814644564],[55.332230039939,-21.273040398418],[55.330559136553,-21.25867839743],[55.309819984342,-21.239376141429],[55.294129138863,-21.23037270561],[55.283073606482,-21.202892371557],[55.286772824609,-21.185049323512],[55.286733275629,-21.160641411697],[55.274414197865,-21.150557030134],[55.271388344634,-21.135424821028],[55.256062863898,-21.116709703933],[55.25415375561,-21.109737804325]]]},"properties":{"code":"04","nom":"La Réunion"}},{"type":"Feature","geometry":{"type":"MultiPolygon","coordinates":[[[[45.041009222866,-12.646861140458],[45.033919473816,-12.654205921101],[45.029933699088,-12.653141138956],[45.030229971909,-12.650970796418],[45.027819755106,-12.648619890394],[45.020480110171,-12.645614676219],[45.02039978844,-12.643016639867],[45.027011809735,-12.63667241332],[45.033230643054,-12.639976009825],[45.035737591933,-12.642859485931],[45.041009222866,-12.646861140458]]],[[[45.271347010101,-12.79330569657],[45.263686967007,-12.787485401025],[45.258224296458,-12.783994866501],[45.254251103606,-12.782779758001],[45.256558544336,-12.780407410404],[45.258572638641,-12.784062346186],[45.265896872226,-12.788803427516],[45.270644506345,-12.786008903023],[45.271203697166,-12.783346136225],[45.276064154724,-12.774297416961],[45.27539014139,-12.771257938729],[45.280300271494,-12.765824392738],[45.28484565221,-12.75899675397],[45.287309080874,-12.763046156521],[45.292622074766,-12.767827569108],[45.29380935809,-12.771583521025],[45.293943145594,-12.775740331098],[45.296926493398,-12.777399051672],[45.295511780138,-12.78095896535],[45.297065891038,-12.783154610259],[45.294177121143,-12.787645767124],[45.296547091351,-12.795715576537],[45.292118652548,-12.799547413042],[45.286802573328,-12.799965601858],[45.284470493494,-12.804915419317],[45.28488044409,-12.815501319474],[45.279181905971,-12.811172331805],[45.278673252047,-12.805292368954],[45.276652922938,-12.801412443065],[45.274354115315,-12.799834172207],[45.271347010101,-12.79330569657]]],[[[45.051579894616,-12.701683919701],[45.054745454862,-12.700959852171],[45.061198593732,-12.701570648283],[45.065507931897,-12.700233076538],[45.068499746099,-12.697534818913],[45.072638279352,-12.691879180973],[45.073520311442,-12.687562750996],[45.072444282419,-12.683316488322],[45.077050313658,-12.683635312529],[45.082064221225,-12.68064150716],[45.083278286415,-12.67841114347],[45.082367237714,-12.672072332353],[45.085469524617,-12.668002937485],[45.092308958828,-12.664210758367],[45.09563246463,-12.658879677419],[45.103556147063,-12.654643713772],[45.102128832243,-12.659473194427],[45.104327888234,-12.661510619643],[45.089875165058,-12.667509550167],[45.088780545771,-12.671283534002],[45.091547533321,-12.672476263123],[45.097411556845,-12.673131601202],[45.101733905321,-12.676098776111],[45.101419520355,-12.679915010615],[45.10492989507,-12.683340915581],[45.10830291273,-12.6840684218],[45.111981498447,-12.688494309269],[45.111225609712,-12.691234629888],[45.114561769019,-12.695769136158],[45.126816332254,-12.70142442411],[45.123270254783,-12.705308212433],[45.124262525359,-12.711542827794],[45.129562829741,-12.715723533763],[45.130022355869,-12.72093382172],[45.125761015172,-12.72434775955],[45.125443767661,-12.727340200841],[45.133195129555,-12.730488765417],[45.140420146297,-12.734330968767],[45.14420550513,-12.731443352944],[45.1435309553,-12.729360240609],[45.146345254574,-12.727988704836],[45.150352038822,-12.729096021824],[45.15055964497,-12.734363377491],[45.153745590136,-12.736703649892],[45.157606378296,-12.735324150875],[45.160546806747,-12.732391590746],[45.1639349737,-12.726775701735],[45.165541675144,-12.721406853608],[45.167255233874,-12.718965105987],[45.172440420143,-12.72738069569],[45.177429483773,-12.730131857631],[45.187509516531,-12.72845831438],[45.195848973895,-12.731097314973],[45.20485503024,-12.730812886526],[45.211769982209,-12.738263272133],[45.213282919396,-12.740865490839],[45.219661026041,-12.743706053768],[45.226238777834,-12.745056935736],[45.228629172188,-12.750002210618],[45.232067680392,-12.752520354269],[45.23593616293,-12.752704117255],[45.236328030431,-12.759025599379],[45.23853877917,-12.761657784164],[45.235915210113,-12.765885844518],[45.233588927858,-12.766874482258],[45.231744863318,-12.763238183432],[45.22940775782,-12.769586468371],[45.226280319041,-12.774182009679],[45.232302844334,-12.776007947063],[45.232630090129,-12.778211389925],[45.235982117186,-12.78139961795],[45.225036494525,-12.788711242033],[45.223225989507,-12.790810710171],[45.216912366753,-12.794787577496],[45.215182385382,-12.801790833887],[45.208856052639,-12.806483710794],[45.203351217963,-12.809766032446],[45.20415881145,-12.81369450185],[45.203949505471,-12.819255980892],[45.195699640278,-12.823138890671],[45.192059114397,-12.829660521435],[45.192118465476,-12.831366852133],[45.196879371621,-12.830516021152],[45.196036503075,-12.833325339925],[45.191319153096,-12.837010133239],[45.187549220664,-12.838455174846],[45.185743587721,-12.841817660228],[45.192877497182,-12.843046858976],[45.194751380147,-12.849441431695],[45.196806783284,-12.853293928222],[45.200743990624,-12.854545178637],[45.202121213905,-12.857256047057],[45.203441152446,-12.863184366014],[45.211624189729,-12.865037986484],[45.210017251728,-12.86887883142],[45.213907845239,-12.873492009546],[45.220132599584,-12.87101456929],[45.22178355301,-12.873372429674],[45.217302370276,-12.877716700128],[45.215995728094,-12.881332164413],[45.21691077912,-12.884299235339],[45.215296092864,-12.886666147949],[45.209024404662,-12.891978412677],[45.198896585146,-12.89601846218],[45.197273916157,-12.897920474326],[45.194325960439,-12.904939845007],[45.195003709216,-12.90998609007],[45.199263824205,-12.915118242778],[45.204143249705,-12.919815787815],[45.200808250958,-12.920166517431],[45.195079630861,-12.917544850675],[45.187695700592,-12.916420822339],[45.185035053554,-12.918652657479],[45.183235602975,-12.923721471368],[45.17865087415,-12.927249503433],[45.176907647281,-12.929950848741],[45.175738555804,-12.935037266996],[45.179662569786,-12.939386856063],[45.178858696064,-12.943336363229],[45.172617864159,-12.941722826085],[45.170165415362,-12.942947917717],[45.168847835552,-12.949614161897],[45.170407174514,-12.952755490503],[45.174691072913,-12.955949252415],[45.176205082465,-12.958714397257],[45.176382173423,-12.964047664735],[45.185127433134,-12.970139989334],[45.189285179581,-12.970477908581],[45.191850916983,-12.973681663832],[45.196608660966,-12.975949635517],[45.198774271778,-12.974389935484],[45.203116128284,-12.974250038089],[45.203649316806,-12.975677460928],[45.200748664117,-12.979319394657],[45.194007607406,-12.985574811528],[45.189396235103,-12.985636988886],[45.185515733924,-12.983983166791],[45.180472585773,-12.984961517419],[45.175416891452,-12.994399211231],[45.173790143277,-12.983635889935],[45.170518796288,-12.977224072642],[45.166509964832,-12.974945196328],[45.160830579809,-12.97431035389],[45.156725121502,-12.979480763265],[45.157674434379,-12.989039224338],[45.151160858074,-12.99857590028],[45.148139880757,-13.000103142444],[45.142877698465,-12.999464059284],[45.140964429966,-12.998181946523],[45.139435883587,-12.993897438146],[45.135606910566,-12.989983975644],[45.133168923484,-12.990158856008],[45.130425894859,-12.994219515403],[45.12621928171,-12.994539895856],[45.125067472366,-12.99072985798],[45.126372339902,-12.987212518997],[45.124433917797,-12.981350161849],[45.117434018748,-12.980628191048],[45.113692050817,-12.982326266676],[45.110903575865,-12.986319828262],[45.108702777515,-12.993295399322],[45.10603795446,-12.989268877828],[45.105598934789,-12.986867312444],[45.108222750681,-12.981446031159],[45.10666962198,-12.974175423188],[45.110586512687,-12.967861968345],[45.110932253578,-12.961564466872],[45.108276831482,-12.957247680554],[45.104505102016,-12.95764529244],[45.09910206477,-12.964340833685],[45.092586918187,-12.966510774061],[45.082931493165,-12.961253870564],[45.085778300542,-12.957477606358],[45.093774553571,-12.954346064136],[45.100553548837,-12.946496247946],[45.101632088266,-12.939291475981],[45.104275483095,-12.933149502938],[45.102516429571,-12.928511268208],[45.09792030962,-12.924904972985],[45.095248071881,-12.925674595683],[45.089347469517,-12.929303731174],[45.089100943655,-12.925634264553],[45.086947217418,-12.922367841331],[45.08277136543,-12.920244148768],[45.081479001623,-12.917671888495],[45.077326880414,-12.90537679076],[45.075614429896,-12.903207025272],[45.071791080621,-12.90095735515],[45.072985204074,-12.899164745838],[45.080332689136,-12.898944662015],[45.084319127067,-12.898102429261],[45.092294306215,-12.897893562325],[45.099363092815,-12.899341434496],[45.102296835411,-12.903134651044],[45.102765278195,-12.90580479734],[45.1015925648,-12.909945938925],[45.10245763614,-12.917715143668],[45.103402604599,-12.920123762582],[45.107171038476,-12.92412366351],[45.114043503627,-12.925880472506],[45.120830096597,-12.929073127815],[45.124508821767,-12.929812904463],[45.124056538118,-12.932423760384],[45.129019533253,-12.934942470735],[45.136717568903,-12.936710023569],[45.145042025185,-12.935849181961],[45.151427604784,-12.930352997411],[45.155020845481,-12.922367959259],[45.153724159896,-12.918473112172],[45.1470278886,-12.907571409694],[45.1440570124,-12.904582623969],[45.145115495502,-12.900223429355],[45.142292664924,-12.896401700196],[45.140608403137,-12.896077975388],[45.138168440907,-12.890982771717],[45.131993306384,-12.888646593148],[45.129540116422,-12.884234944414],[45.123290198928,-12.881147139147],[45.118141413189,-12.875107123614],[45.113531725961,-12.866287919184],[45.111203355717,-12.863639377953],[45.104046286264,-12.862629521192],[45.099925250582,-12.859464334657],[45.095222546911,-12.85326091082],[45.099001429708,-12.84919386659],[45.10184009427,-12.844935426206],[45.109262154897,-12.844004651343],[45.114785208627,-12.844012243004],[45.121296854357,-12.839620842187],[45.116853703697,-12.839026934473],[45.1088921258,-12.836480280787],[45.102578075641,-12.835326244702],[45.100786898927,-12.833817691239],[45.103595869833,-12.825044158351],[45.106274244435,-12.819533296306],[45.105703414661,-12.814096072938],[45.100101076625,-12.807675137279],[45.100156287028,-12.798143058322],[45.101971801882,-12.796653910069],[45.106495672125,-12.796032686335],[45.111965337495,-12.796441869052],[45.112351924415,-12.793443097975],[45.108277368914,-12.790986957463],[45.103821332014,-12.792775616121],[45.097562092532,-12.792292405627],[45.09619443339,-12.786613998038],[45.094597815608,-12.784476844891],[45.100942818925,-12.781011080371],[45.103061620799,-12.773416069921],[45.102279465991,-12.766670398832],[45.099109591186,-12.765148788546],[45.090469074025,-12.768677702668],[45.085665097908,-12.765159820152],[45.082302996804,-12.76427830479],[45.079471582102,-12.76634546759],[45.073835299819,-12.764015850729],[45.07026972633,-12.76007774691],[45.064550095906,-12.755159879822],[45.062451660194,-12.752215117293],[45.059698679284,-12.751013953917],[45.054307848617,-12.752459264487],[45.050984487298,-12.755046190739],[45.043276986303,-12.748305189274],[45.042555902183,-12.74425409186],[45.046015382632,-12.74074667951],[45.050962719965,-12.738330416394],[45.054267163483,-12.734441314886],[45.05798362461,-12.728054432819],[45.055666891461,-12.72380657463],[45.043114005757,-12.721512016377],[45.047871485287,-12.71545968596],[45.05117613373,-12.709228502763],[45.050551812939,-12.705492994332],[45.051579894616,-12.701683919701]]]]},"properties":{"code":"06","nom":"Mayotte"}},{"type":"Feature","geometry":{"type":"MultiPolygon","coordinates":[[[[1.7861298758203,42.573623487381],[1.7809401403226,42.582603070692],[1.7731587094773,42.580676227298],[1.7536481560277,42.582645134018],[1.7419674623208,42.587752779596],[1.7259218933308,42.59036432389],[1.7264445544535,42.599644154949],[1.7379681342676,42.611311358201],[1.7349772402613,42.617150103375],[1.7179447596001,42.614762264528],[1.7000214431602,42.621543905731],[1.6873563216807,42.623900502482],[1.6620231363069,42.619477292944],[1.6537229363056,42.626311949339],[1.6413815633821,42.628126820518],[1.6190091695864,42.626912244592],[1.6014688979593,42.628040210076],[1.5842076238912,42.634095648993],[1.5687902887144,42.648434939425],[1.5492508690021,42.655772723263],[1.5221497444791,42.649182732256],[1.5189050579628,42.645476248608],[1.5014171161218,42.645160693912],[1.4937449489606,42.653208850036],[1.4801092686891,42.651393752761],[1.4778976589457,42.643814220979],[1.4683365082247,42.630822512454],[1.4772664705807,42.614964046337],[1.4694604333944,42.606890205337],[1.4589391989978,42.603637712724],[1.4401541878412,42.60350366823],[1.4350570021221,42.60607368638],[1.4200859104601,42.627197957489],[1.4135896331553,42.651807228313],[1.3942419945616,42.668386695134],[1.3877372500693,42.670986654888],[1.3895995518927,42.685085573888],[1.3786606854809,42.693636239811],[1.3544057158196,42.699495465984],[1.3523647298671,42.708889639069],[1.3568943438009,42.71932288287],[1.342365880439,42.719196972787],[1.3352658325545,42.724033974941],[1.3250225479117,42.723901216656],[1.310831490396,42.718075501434],[1.2980552717348,42.718971253687],[1.2775594332565,42.714750302311],[1.251508843902,42.717851623956],[1.2474713412106,42.722040389267],[1.2302143018174,42.72758342439],[1.2171573089305,42.720482304172],[1.1848025015663,42.715102850609],[1.1727736952394,42.708100928642],[1.1618506762641,42.711043675126],[1.1333056678708,42.72901199858],[1.1300970414747,42.752068486433],[1.1221505221208,42.76017431013],[1.1092203049835,42.768379798114],[1.0751085868396,42.785348263934],[1.0543403754335,42.782370278653],[1.0356210186709,42.786428027141],[1.0123628046297,42.788067996977],[1.0055793118079,42.790800484118],[0.99648511466901,42.78745217576],[0.98310308426902,42.787068077252],[0.9732840226901,42.797457087229],[0.95989089975521,42.805643824863],[0.93973887204259,42.796973247404],[0.93391854092192,42.789522309625],[0.92732709328685,42.789255631926],[0.91105922430916,42.796342655042],[0.88384668496068,42.813501413999],[0.87039192320778,42.816245743581],[0.85830081521383,42.825718092689],[0.83173917183391,42.829191852348],[0.80892253420252,42.83905419597],[0.80148779146423,42.840484414153],[0.78649531003324,42.835955315429],[0.76764000650777,42.838976644913],[0.7473099643863,42.846684787469],[0.73505963063002,42.854313618439],[0.70837530047161,42.861402691964],[0.6920253593771,42.855311818756],[0.67832018690678,42.855018835179],[0.67858428353724,42.847952666471],[0.65901722875138,42.838528619974],[0.66114635943904,42.830368839742],[0.66851393517847,42.820350298964],[0.66536072645848,42.81251191916],[0.66968713590557,42.802095308449],[0.65863120147728,42.79715230059],[0.65128983839552,42.786597088659],[0.64453806422139,42.783076412205],[0.66423575825517,42.77167292571],[0.65032149143529,42.764168646382],[0.6474308997985,42.751662642856],[0.6599389520435,42.752435876543],[0.66957491088554,42.73276995512],[0.67901232540769,42.722784338644],[0.67386650187529,42.716586587301],[0.68225754178415,42.708965425559],[0.67377451374064,42.699841320693],[0.67057744875758,42.68989270234],[0.6379005478724,42.693041495792],[0.60764322210758,42.699058087497],[0.59731972324609,42.705833174186],[0.58683088027779,42.694999039016],[0.53028817299211,42.702427361485],[0.51254065154989,42.692054778891],[0.49187864436583,42.695004250993],[0.47775091439859,42.699986776967],[0.4569304439913,42.692659152242],[0.42927703134928,42.690747961457],[0.41768712562607,42.694690592529],[0.40299065005461,42.696059426702],[0.39581531433956,42.701201620227],[0.39262638361543,42.713119210116],[0.37690233423878,42.714106032311],[0.35962761747241,42.723390903669],[0.34787523241281,42.714178824464],[0.32622532527099,42.70523860909],[0.32346895203404,42.687137830773],[0.30020270310415,42.676589164672],[0.29282363337494,42.674921018438],[0.2708685107087,42.690720979232],[0.25988644276717,42.715814801568],[0.24551694384626,42.718157572312],[0.22667904852621,42.71735448054],[0.20599010678325,42.729295965395],[0.17572555256904,42.736480431547],[0.16221088087725,42.725842127347],[0.13657205436584,42.722323517883],[0.12571277884722,42.713756931075],[0.11125293791766,42.710207845076],[0.09041936171393,42.717129184641],[0.074772566655186,42.71209248746],[0.07070990768266,42.703944107872],[0.059212546233425,42.698966385505],[0.045947391455758,42.696775443692],[0.025181280051534,42.70192424896],[0.016464909509703,42.701787746946],[0.015303686021275,42.695195339428],[0.0023539316821015,42.686187697005],[-0.010639973713379,42.684384118141],[-0.047756997997488,42.693359114812],[-0.059811467964507,42.693423542148],[-0.064563524867416,42.699353820033],[-0.064009731971453,42.71008519182],[-0.068842258409049,42.717900891138],[-0.076501338605961,42.71719782154],[-0.090397506206375,42.721077862832],[-0.10611325502758,42.720827214056],[-0.11070680415594,42.725007544931],[-0.11080028926285,42.734997384695],[-0.13666638793598,42.764142081631],[-0.14599661532545,42.768469484558],[-0.15421201073912,42.780770439999],[-0.15458058004585,42.792740754923],[-0.15972393675618,42.797400992971],[-0.17849266806523,42.785358654901],[-0.18922389776922,42.787796189656],[-0.20156585632457,42.796277921886],[-0.21390456164229,42.79603817418],[-0.23844648846147,42.808173013415],[-0.23886476296826,42.818111155727],[-0.24336198692263,42.823142763211],[-0.25801362447912,42.821008365204],[-0.26733811029813,42.826009234187],[-0.27668600069509,42.835470786436],[-0.30547392531847,42.84123285236],[-0.3134440845287,42.84937502201],[-0.30749089647919,42.867843636256],[-0.31566756931289,42.884801825113],[-0.31819431138324,42.897761911545],[-0.32459076680338,42.905260440304],[-0.3270823405503,42.915785217713],[-0.31074643857214,42.919004799168],[-0.30871758220081,42.924636095621],[-0.29777949713226,42.930973352505],[-0.29003653813459,42.929087564699],[-0.28159219915593,42.933563651361],[-0.27938737996819,42.942120483339],[-0.28647438097301,42.960054130137],[-0.29154703187727,42.987768864423],[-0.28772006609469,43.005371765683],[-0.26484031266067,43.009957412551],[-0.25606972495919,43.022726945323],[-0.25993739842031,43.038277556214],[-0.23941952476886,43.039676815812],[-0.2239464237385,43.033684092022],[-0.20860119763472,43.039724486019],[-0.18964711095987,43.052021067576],[-0.19915084290716,43.064412767264],[-0.19776766479894,43.071150876661],[-0.18776795009335,43.083330185944],[-0.18693584923102,43.091163577327],[-0.19768215446413,43.098173160871],[-0.19098051290629,43.111202819975],[-0.17086902572159,43.113421493828],[-0.16634162368399,43.121884731119],[-0.14613588573303,43.128233156333],[-0.14050344828237,43.136172128164],[-0.13859988604461,43.149103535932],[-0.12655319090013,43.160447394144],[-0.11770126761715,43.180323067986],[-0.11133185839731,43.179338583668],[-0.10448219117427,43.166691440804],[-0.097529225654089,43.166624966901],[-0.095496012787098,43.177197303166],[-0.06786899220915,43.177118135342],[-0.07252723387475,43.224387038006],[-0.049462179860127,43.217180833465],[-0.045868384089441,43.23213534366],[-0.037586102171492,43.242416639333],[-0.02368673812988,43.254986403176],[-0.02562371129178,43.260991374913],[-0.017008526259885,43.270448647152],[-0.023979443826928,43.280211811856],[-0.044392167069364,43.285272051797],[-0.046122559308833,43.300858489621],[-0.031830518124419,43.31215055589],[-0.024874069651994,43.329492363991],[-0.0032544572879219,43.332106223092],[0.010318205390046,43.325314740811],[0.02629551293813,43.341364458979],[0.023777202110468,43.349140741399],[0.0057814385418996,43.363002124921],[-0.0052544098304965,43.373757650344],[0.0051784236678809,43.394194111086],[-0.0038111619353702,43.398395088127],[0.0095923341693579,43.422106177396],[-0.004617224617132,43.431760209363],[-0.0009763127221442,43.444398882283],[-0.016529018418498,43.443944372555],[-0.024647492248551,43.430441863151],[-0.034594805202059,43.429064287986],[-0.042752022413969,43.410434732548],[-0.066460558394679,43.411733865017],[-0.062025455126023,43.417738498202],[-0.053836151217704,43.418937636756],[-0.057818804728216,43.427453948482],[-0.06902834281151,43.437345744695],[-0.061666974828373,43.452452940742],[-0.065757532784034,43.463483610747],[-0.019322496256827,43.466531436068],[-0.01781381554075,43.472147456522],[-0.033960155813221,43.47488114734],[-0.034676452145955,43.487323780123],[-0.049321056921324,43.492468050259],[-0.040135444460287,43.512604399189],[-0.044654576654926,43.525299051263],[-0.056174185273693,43.533029097587],[-0.064394904836236,43.545147116286],[-0.078385830359136,43.546822915717],[-0.088671332923909,43.542057336851],[-0.094969201412123,43.548141189515],[-0.088934220496639,43.557203940272],[-0.093425031634788,43.563569921638],[-0.096787871742487,43.582404857482],[-0.10893257406459,43.582372914877],[-0.12160532728785,43.586239621765],[-0.12891801130162,43.581224268549],[-0.14809699734982,43.585796179458],[-0.16044860312899,43.580574768792],[-0.17641684233457,43.596401195938],[-0.184802186901,43.591150649921],[-0.20474309579199,43.583597668054],[-0.21060415101777,43.593234551989],[-0.22423605594959,43.590402846839],[-0.23502870973138,43.583357698142],[-0.24283300101136,43.584979016847],[-0.24817456316599,43.596658468765],[-0.25464414089565,43.597079809878],[-0.24720389403099,43.615953419221],[-0.27771465346131,43.616200527152],[-0.27959903054407,43.618177993348],[-0.28211623210758,43.643073606308],[-0.26375883992318,43.635925825532],[-0.26183976696696,43.650333852662],[-0.24316590125334,43.654503914277],[-0.24428632111807,43.663120354346],[-0.23973638497448,43.671241337499],[-0.25205576868858,43.672170366192],[-0.2558968586296,43.679785947966],[-0.23910090516212,43.693946573483],[-0.24762242324933,43.705844967214],[-0.2466519035345,43.710665978321],[-0.23258474697029,43.714085612502],[-0.20579650925303,43.727838442023],[-0.19413824181548,43.737015033058],[-0.19556855881059,43.7457681747],[-0.20605854570527,43.750073485568],[-0.21894685864266,43.750867558794],[-0.2079131727813,43.760637827854],[-0.21546661332355,43.76954000666],[-0.21332509113417,43.779092079667],[-0.2221263729722,43.7870916829],[-0.2188522220883,43.796306415322],[-0.22713966573848,43.808271178562],[-0.21750272546627,43.809928705523],[-0.1924617341874,43.810177903112],[-0.19725593392987,43.830783419213],[-0.18812879425044,43.832561081629],[-0.19596777254111,43.845942065138],[-0.20890830935508,43.857673133295],[-0.19855770088986,43.862412899782],[-0.19099207269451,43.875181537803],[-0.20122569807121,43.885467279461],[-0.22061963081894,43.890378123713],[-0.23393612239966,43.89106512629],[-0.23443742350753,43.899009673945],[-0.22763125359284,43.91098862727],[-0.21627342564629,43.907357211722],[-0.19978663649385,43.915110256293],[-0.19202409075549,43.92603943497],[-0.18485270811369,43.928769857675],[-0.17911005329495,43.937915232082],[-0.16562386692845,43.927613195924],[-0.15391959185065,43.93232464077],[-0.15333166658385,43.939048046681],[-0.13513697119614,43.936297912997],[-0.12594278448243,43.944421563926],[-0.10225702569033,43.927416125055],[-0.094989077566145,43.933381091475],[-0.098329558338237,43.942427984825],[-0.087028531609323,43.947486286421],[-0.073597153405665,43.94504601184],[-0.059361902039375,43.960939386464],[-0.046527042815464,43.96103952555],[-0.040802721725543,43.968964305724],[-0.036164948567139,43.983735934778],[-0.021769333384946,43.973056989329],[0.0014399806732066,43.95988700889],[0.0067349635456505,43.953740495039],[0.0042089573126749,43.943424094056],[-0.015361195667702,43.934152340481],[-0.013582447289478,43.923649897266],[-0.001843455443284,43.921420036587],[0.017439868557199,43.910847797935],[0.032551602220287,43.900191508039],[0.045526933200978,43.902166309486],[0.059162622123353,43.897893022976],[0.07664444687609,43.916470177201],[0.068507868767624,43.937809939581],[0.057457862003849,43.949050217484],[0.055307282518792,43.957963073751],[0.067025223808929,43.967876773509],[0.067532020801164,43.974192750661],[0.076043349292038,43.983138573142],[0.11437379986584,43.988072909373],[0.12640607961248,44.000336105676],[0.14095408748334,43.994676380228],[0.13863539397759,43.974770669617],[0.1591211137839,43.973860568873],[0.1664085585548,43.984223372919],[0.16676088451462,43.996830517368],[0.17916093410135,44.000666040326],[0.18957139217537,44.014641613964],[0.20117969184465,44.013668593318],[0.20507206540087,44.0190292233],[0.22470969223381,44.019169028731],[0.2352015335306,44.008471438234],[0.24748889809396,44.00473345675],[0.2658680614134,44.003716751224],[0.27345979290764,43.998815616074],[0.30409114391986,43.993060809869],[0.31793784234407,43.994973643102],[0.31653852185538,44.01011924115],[0.32938687327154,44.008324743136],[0.35756641014151,44.01637714562],[0.36491171606437,44.015152271393],[0.3713725918443,44.008155096613],[0.38151930823563,44.006373305954],[0.39446082314246,44.019984410354],[0.41750846361679,44.026970327067],[0.44244380213487,44.028759139019],[0.44887562692766,44.042594787048],[0.4595157527797,44.055234750337],[0.47876888458351,44.054521013697],[0.48581828489735,44.058598437153],[0.5060519145443,44.056124874168],[0.51214276226031,44.063296138178],[0.52207386686065,44.05696870158],[0.53902463781127,44.053724078487],[0.5650766725315,44.05922317624],[0.57588134690602,44.075909688882],[0.59797769402997,44.078224550392],[0.60470426269225,44.071956240981],[0.62788687147415,44.060631087503],[0.63165143580682,44.049501421006],[0.65460048123679,44.04130753634],[0.65507583677567,44.031189052143],[0.66659683472462,44.025144272763],[0.6795846041912,44.029344422988],[0.6797359030614,44.03717928063],[0.68766619417171,44.045887421074],[0.69448178843623,44.045585512479],[0.7078014441272,44.058016144097],[0.71736742842423,44.057565048253],[0.73670154232703,44.061550959213],[0.741884791205,44.065199235038],[0.73810974125492,44.073027677],[0.75287865013836,44.102267910932],[0.77191199947865,44.113420095124],[0.78623555942697,44.11191141984],[0.79623991760453,44.11512942813],[0.79756644493954,44.130381902776],[0.7885669186743,44.144391188204],[0.79610189105916,44.145621618679],[0.82440975793604,44.141179876681],[0.83543363467659,44.136365774298],[0.86877875307642,44.126327092678],[0.87944269844653,44.129608737841],[0.88180706484803,44.140904730858],[0.88847935271951,44.148766853903],[0.88663373024812,44.16278908945],[0.89034197833787,44.169672870511],[0.88301819652021,44.17546628714],[0.8722469128314,44.167867373919],[0.86504004908695,44.173534926921],[0.85357025770147,44.174962426044],[0.85633796923916,44.18904677194],[0.86348768257448,44.193325437089],[0.90628814214223,44.190306668919],[0.91176049272424,44.204739962363],[0.92476807979815,44.226051714552],[0.9292406197485,44.230246542717],[0.91909475906904,44.238271923817],[0.93302754076927,44.253148853876],[0.9277876570183,44.26740561543],[0.94078442423987,44.263651200087],[0.94992392368958,44.276443376947],[0.92396339608302,44.288698042192],[0.91642356261815,44.302198002519],[0.89449665699205,44.296740377136],[0.88231719491829,44.308198855394],[0.86962451276277,44.309387172973],[0.87347140241339,44.323307233],[0.89611323540437,44.346226535055],[0.89356714925376,44.358037988638],[0.88733582833582,44.366374054101],[0.89821258712664,44.381368271621],[0.91991430872905,44.384149659695],[0.92589588135671,44.375628735075],[0.9372881287013,44.368840749909],[0.94141859483151,44.345347538009],[0.95004981400894,44.35975578355],[0.97103609486138,44.361280217267],[0.98063192933013,44.358423098349],[0.9973306063079,44.368970904934],[1.004557393851,44.365587714321],[1.0497968480895,44.362639367374],[1.0590342432563,44.369063397724],[1.0640814762214,44.378508721439],[1.060916410464,44.388148956247],[1.0514192493927,44.392094511982],[1.0613076444275,44.401878633002],[1.060811266939,44.416585968472],[1.0574845114814,44.427673212448],[1.0452829749205,44.434328842652],[1.0333318174167,44.432217983065],[1.0247167778907,44.442988405687],[1.0209838507254,44.456237710915],[1.0238896841162,44.464106031022],[1.0230093439874,44.475437273235],[1.009020244264,44.480044617987],[1.0168410499751,44.492627682886],[1.0162275856839,44.505873805304],[0.99607013748509,44.526838106147],[0.98177646477517,44.543949619625],[0.99391928143422,44.549540779914],[1.0102474849887,44.545187788418],[1.0131652927005,44.53612981948],[1.0347007735952,44.555410813413],[1.0463221422077,44.562091748647],[1.0716939661813,44.567841711875],[1.0751420531924,44.577325705506],[1.0915723340934,44.57129825478],[1.10321434571,44.571734741055],[1.1023480014998,44.583112143598],[1.0954254371464,44.590239410789],[1.1076423221767,44.604047948788],[1.137389330558,44.623916068209],[1.1537948801342,44.639408990845],[1.1467257654642,44.651942998392],[1.1466756285759,44.670346129862],[1.1631824196253,44.674246913408],[1.1691224492748,44.680201458326],[1.1814922279959,44.68312050249],[1.1922298707031,44.682144673083],[1.2245513454404,44.684265469136],[1.2404413959773,44.692803925964],[1.2433609148288,44.703747365953],[1.2482656593079,44.707708989465],[1.2637980717141,44.710685806718],[1.2704127081354,44.722361774434],[1.2877769806729,44.714784618791],[1.2997473700748,44.733876961929],[1.3005234409238,44.743067753612],[1.3160471856435,44.740370070289],[1.322816677032,44.765133167519],[1.313412866091,44.766040449212],[1.2962430489699,44.777811462978],[1.3042790767232,44.788545534304],[1.2996402457488,44.796921415066],[1.3281059944688,44.806531488239],[1.3368655384896,44.806071554052],[1.3641055003826,44.811568223737],[1.3606303391154,44.826748288149],[1.3614088604034,44.840796241728],[1.3699846242068,44.846449057072],[1.3771449543322,44.84182444963],[1.3861021387482,44.847434745656],[1.4019376918366,44.849449622068],[1.4048297845553,44.862526244834],[1.4181797898114,44.870598618527],[1.4310840691639,44.871280603185],[1.4419256468077,44.877575693392],[1.4398567374008,44.888947217313],[1.4216345306166,44.896767467267],[1.4135387322774,44.911821580701],[1.4246258313763,44.919694190356],[1.4423501795316,44.916547257696],[1.4365133670875,44.93225069741],[1.4364044047008,44.940615131261],[1.4207336396897,44.955116554897],[1.414587951063,44.977794038016],[1.4133042325955,44.999381814036],[1.4092638730924,45.006004469319],[1.4281821749303,45.009219883472],[1.4482602497483,45.019314041206],[1.4619826792135,45.01370224029],[1.4735839270693,45.017999050409],[1.4800566881166,45.026797710108],[1.502854716064,45.038440870886],[1.519580065039,45.041030205266],[1.5357229531152,45.046275852749],[1.5410691079459,45.042887041934],[1.5437040262063,45.030761580224],[1.5520446044451,45.028473138039],[1.5690421523205,45.038712199205],[1.5763101796546,45.040696470827],[1.5893103965749,45.036412402334],[1.614739866204,45.033019699506],[1.629956153879,45.033567269253],[1.6509774862668,45.025013308842],[1.6544545546621,45.017019229934],[1.6714097923126,45.004301541515],[1.6843750926429,45.002660865737],[1.6871611264702,44.996380368243],[1.702662490825,44.987825577102],[1.7110326508746,44.967296262803],[1.7215459564475,44.968065955731],[1.7428395473269,44.959830662128],[1.7506187292807,44.954961208829],[1.7536701932124,44.940576173829],[1.7685216398013,44.93111838651],[1.7749276020491,44.923721627249],[1.7828574905171,44.929652757246],[1.78487170617,44.937317933441],[1.8008914101993,44.924210099081],[1.8085816314758,44.927710042504],[1.8239145074647,44.927683348732],[1.836439246631,44.937455442607],[1.8443484053735,44.938030495187],[1.8510527260352,44.946245504656],[1.8670322636063,44.952926075187],[1.8874095971943,44.956563455989],[1.8926655050781,44.964882977079],[1.9081575006047,44.978423183181],[1.9280650601996,44.97871493763],[1.9390669995572,44.973222308505],[1.9407166400253,44.95513995704],[1.9509915581584,44.953151935667],[1.9557698918802,44.958318624648],[1.9740981161193,44.966632803845],[1.9853569537575,44.974450164818],[2.0068687915517,44.976629769782],[2.0454327798436,44.983664804729],[2.0525667664657,44.976478188068],[2.0629079799591,44.9765045515],[2.0806940542158,44.953285983552],[2.0763195910268,44.940561879615],[2.0786238601329,44.932494333995],[2.0892278644094,44.928560463933],[2.1081047030139,44.910638688547],[2.0864901589829,44.901079919432],[2.0837359232769,44.887424173789],[2.0942097640089,44.872012369152],[2.1165704984568,44.850184202716],[2.1227770243941,44.847633102732],[2.1398031019064,44.823820670465],[2.1658208187006,44.812904212621],[2.1652929430823,44.799560342182],[2.1716374993124,44.790027108976],[2.1667022088341,44.772651831571],[2.1493997719958,44.769790512407],[2.1534957604021,44.753104006989],[2.1522238006118,44.736723151663],[2.1479681938401,44.723035803571],[2.1336852541707,44.70956475715],[2.1301318075949,44.698486086307],[2.1386637746726,44.692880659597],[2.1552964923022,44.70023944349],[2.1630322730753,44.690215331586],[2.1791523780579,44.674446124105],[2.1655660362222,44.661375303382],[2.1740442827509,44.653644834741],[2.1687595856936,44.647386736712],[2.1694164789558,44.638069782843],[2.1908059572226,44.628252004845],[2.2074728028173,44.61552895784],[2.2198705673093,44.623646052351],[2.214541909482,44.627080806224],[2.2084152778134,44.643842310283],[2.2286252203003,44.655106676519],[2.2508940527358,44.651888047018],[2.264931023707,44.660757552111],[2.270930098105,44.660401110765],[2.2910368223518,44.666581877606],[2.3045868091932,44.662449015977],[2.3267908312388,44.669693386939],[2.3365579816568,44.661275985276],[2.3327786804308,44.650617960529],[2.3485386057121,44.641480228035],[2.3659976814652,44.641342211431],[2.3782230201151,44.650161602045],[2.397445965387,44.646186044198],[2.4055217700154,44.647179554811],[2.435000853128,44.638874930003],[2.4521635947204,44.648220759561],[2.4680389011889,44.642888409527],[2.4689992507151,44.649641593651],[2.4831874702259,44.650342597738],[2.4901340080947,44.656773198157],[2.4875777637021,44.666984218285],[2.4989152190022,44.687020949858],[2.5188863490069,44.699027751647],[2.5184594908124,44.703480601801],[2.556122557476,44.721283990134],[2.5519407104745,44.732804630794],[2.5544909688881,44.73964379349],[2.5516388576146,44.750719684187],[2.5585893921439,44.757924931793],[2.5627129322914,44.775756861827],[2.5735477024072,44.784962589937],[2.5865648469617,44.783990021983],[2.5993613568997,44.792806185507],[2.6013884128515,44.807574409416],[2.5971356193221,44.819510989142],[2.6074714184,44.824096540945],[2.6117393110443,44.83131246301],[2.6026823497168,44.843163111324],[2.6180527448461,44.854603721987],[2.6239295606463,44.866918027702],[2.6366080646644,44.872551413571],[2.6490646425252,44.869728369056],[2.6562270538803,44.87241580597],[2.6581063096255,44.882979115397],[2.6812975408382,44.907392758521],[2.6938913636929,44.902938090171],[2.7064336715881,44.907221617118],[2.7135929831216,44.92713012749],[2.7240210839286,44.924576074703],[2.731006631595,44.936748083927],[2.738258109046,44.941219492647],[2.7603927919273,44.927510072233],[2.7735403561236,44.915091091551],[2.776087665079,44.908963934931],[2.7718590507401,44.902271109449],[2.7783381480633,44.887718357993],[2.77049124514,44.875537836385],[2.7684108734637,44.863858763976],[2.772707056045,44.855545795389],[2.801957650579,44.873625756087],[2.8220333243708,44.87157004877],[2.8496519747355,44.871490231757],[2.8596736604077,44.874465473337],[2.8559650223393,44.855179951014],[2.8705082792207,44.827398299766],[2.8795747424774,44.803006111318],[2.8897062556822,44.788417083385],[2.9040726320859,44.783702886621],[2.920189595566,44.794308778558],[2.9345177106412,44.779201871895],[2.9348220891073,44.766338409064],[2.9208013627531,44.765729671884],[2.9172495539886,44.756714098966],[2.9284555057549,44.755160769806],[2.9335256868255,44.750101514437],[2.9322008334785,44.738182515263],[2.9232670003911,44.728642526112],[2.9350900117718,44.705004788991],[2.9338731506521,44.697402037726],[2.9408965571355,44.683818918865],[2.9392865668235,44.677756455026],[2.9487265645702,44.672978048006],[2.9637576145748,44.654316787673],[2.9729967000843,44.645719145774],[2.981675726654,44.644673011362],[2.981760369824,44.651994919411],[2.9985742640224,44.674442966678],[3.0160122019676,44.713692453341],[3.0251405593834,44.716097238134],[3.0391236076168,44.714995724501],[3.0353535096078,44.727206782516],[3.028416597051,44.73255744411],[3.0310731845345,44.749413959606],[3.0422427573327,44.75938114179],[3.0503924394573,44.779809366102],[3.0457487033386,44.799052030765],[3.0615217992797,44.817172380452],[3.0768587089093,44.824410436955],[3.0714754944234,44.834124974928],[3.0994806863618,44.833584813393],[3.1001211680904,44.844373808687],[3.0953252337809,44.85208399024],[3.1050371687709,44.86639509115],[3.1054945101096,44.886774806731],[3.1229128915544,44.892733396595],[3.1283803710941,44.903578216134],[3.1410977876348,44.903315197313],[3.1531732734567,44.893017216949],[3.1690213470506,44.874091478783],[3.1823170380273,44.863735423357],[3.1991804637825,44.874642009283],[3.2159619013053,44.875041006609],[3.2252942367053,44.882045162686],[3.2323433112231,44.891622050737],[3.2269844428022,44.897602452938],[3.2278135177439,44.909928387989],[3.2496887102206,44.916235200562],[3.245167534381,44.93480347612],[3.2595403854401,44.942429341236],[3.2615217326405,44.932067820131],[3.2713373103277,44.927600109493],[3.2860179111885,44.926382028761],[3.2973059946128,44.935604538605],[3.3379420512705,44.955906998959],[3.3545315434466,44.9548199209],[3.3613476310625,44.971408091786],[3.3703185777492,44.96998390468],[3.3713550433617,44.960250089988],[3.3863677767162,44.952742049715],[3.3969930219391,44.958577768116],[3.4045530849223,44.956400427592],[3.412832200087,44.944841611062],[3.4149529202982,44.932631887178],[3.413833246774,44.919859843574],[3.4192590880448,44.908428284947],[3.417976841379,44.900767433551],[3.4357050101121,44.88024496334],[3.4386254407679,44.86082184192],[3.4416742987403,44.854449680958],[3.4541989644633,44.844563734203],[3.4570624789322,44.833777540962],[3.4757711698307,44.815370629667],[3.478809589921,44.809446829457],[3.4909959832186,44.808474309867],[3.4948664240388,44.815405935965],[3.5056459727137,44.823846663279],[3.5397515164373,44.828176022752],[3.5615758039452,44.824976812591],[3.5638205108562,44.832831791958],[3.5745418907117,44.83460991769],[3.578465058473,44.825696757681],[3.5893552432085,44.832194014444],[3.5920659249124,44.84796463101],[3.5980348128056,44.859504969144],[3.5943335024029,44.875433384901],[3.6082755428246,44.879331218549],[3.6147496711134,44.874174272057],[3.6264517258551,44.880253899231],[3.6423461696965,44.878382169756],[3.6595224161061,44.86994134545],[3.6704785324924,44.850864431429],[3.6718167758914,44.843382404889],[3.6574209674758,44.836124356852],[3.6663623630222,44.828776303359],[3.6954389564378,44.830958625259],[3.7003857822671,44.836813194859],[3.7228844822867,44.830986703517],[3.7406494702404,44.838697356604],[3.7526807081682,44.82097908395],[3.7624285152172,44.810666360605],[3.7587613653652,44.805576543778],[3.7794867433517,44.79731064671],[3.8032312316337,44.781579343618],[3.8033308935883,44.770414179887],[3.8121315885881,44.766032837865],[3.8198835993274,44.772685233514],[3.8301463157408,44.775710594028],[3.841603226393,44.772129900378],[3.8428722625525,44.767659869676],[3.8304555521813,44.756161500223],[3.8365590308337,44.747847636802],[3.8625310211191,44.743866105932],[3.8754615107331,44.740626944691],[3.8762993159981,44.731800448649],[3.8677916785686,44.728142672276],[3.8615128126047,44.71201694644],[3.8718913936808,44.705396507123],[3.8696426954409,44.696962680173],[3.8845476207292,44.697347879776],[3.8732699495096,44.678201691122],[3.882909471786,44.660088831897],[3.8947423692172,44.651129115275],[3.8926148288923,44.623030105672],[3.8985315708048,44.613411802763],[3.9083038945979,44.606615580322],[3.90517074571,44.592708958301],[3.9191671077331,44.585245092622],[3.9207367872473,44.575746388916],[3.9284831974258,44.569998826159],[3.9451514993013,44.573790000095],[3.9608749832371,44.554803732187],[3.9657451606381,44.537497086144],[3.9753657955514,44.523650580786],[3.9766536412959,44.516689836275],[3.9837035025138,44.510167633816],[3.9873321701777,44.499162516354],[3.985747412107,44.487924045953],[3.9875441966947,44.473361271665],[3.9981617468281,44.459798467391],[4.0149839677909,44.454514219975],[4.0232058055546,44.445573236432],[4.0375991394785,44.445719563488],[4.0464583808932,44.432710617884],[4.0354823981467,44.420090870159],[4.0561040289114,44.414335993335],[4.0684449498584,44.405111736232],[4.0572129135807,44.393348439495],[4.042468868612,44.39464402593],[4.0437442732688,44.384550041392],[4.0529853320038,44.378694159984],[4.055527118005,44.365626171449],[4.0531535999561,44.340968920772],[4.0450038312264,44.333082309228],[4.0368667860025,44.330771008666],[4.0514566440182,44.317321809072],[4.0716270663138,44.327298770679],[4.1039911697566,44.333899706452],[4.1125125628157,44.329490022147],[4.1267455749949,44.337730884113],[4.1403038447089,44.327883881292],[4.1428714788751,44.313351716383],[4.1548869300058,44.31262212801],[4.1777450676527,44.317879259785],[4.1867071328058,44.29968541211],[4.2164426737394,44.288852848267],[4.2413235022379,44.270096446791],[4.2588499153827,44.264783733394],[4.2766179866697,44.274252680812],[4.2894096266193,44.293214668623],[4.2884228053033,44.31465771441],[4.3044280048901,44.315234251029],[4.3217239441113,44.323989000128],[4.3360706324228,44.339519174094],[4.3667775642003,44.339497579716],[4.3865260888309,44.346613937013],[4.3941986915176,44.345264673242],[4.4032085466386,44.333895573125],[4.3907812808888,44.303051306396],[4.3934072251798,44.293647114857],[4.3989780395897,44.288943564372],[4.4218910835178,44.287324346637],[4.440502356745,44.284053476816],[4.4506900513602,44.297286859459],[4.4492717103226,44.304914782152],[4.4508857895897,44.33261714008],[4.4576163712243,44.341635623893],[4.4761161664256,44.34074524217],[4.484186331178,44.337581914669],[4.503538697272,44.340187516986],[4.5178637257565,44.329927083074],[4.5326208269687,44.32252533633],[4.5444682300368,44.320766940178],[4.5586960480886,44.302442886009],[4.574187229155,44.300751054654],[4.5869814679806,44.29459622458],[4.6068181251102,44.290471804776],[4.6181459353598,44.278542099268],[4.6288231783395,44.284004141308],[4.6380600403344,44.282964739036],[4.641962943496,44.273967232879],[4.649227423465,44.270359808636],[4.6540654761357,44.254338013491],[4.6748406183712,44.238546852911],[4.6784293717396,44.229429565698],[4.6726658505102,44.216806161879],[4.6836408656973,44.21242318348],[4.7018165185921,44.216070926665],[4.7097117846241,44.206925388326],[4.7038951813692,44.197612213118],[4.7220708851492,44.18742070852],[4.716116694835,44.165974548714],[4.7188928038989,44.14449718833],[4.714318820751,44.137803248451],[4.7070128409472,44.113682146579],[4.7074595244331,44.103669745076],[4.7196389371655,44.086665255194],[4.7301353625795,44.079023395797],[4.7548761078409,44.088309298713],[4.7608553902053,44.08629669027],[4.7578505502116,44.077246976599],[4.7879793576032,44.065056776494],[4.7891182892738,44.052194281428],[4.8080065523425,44.03972336512],[4.8161675560385,44.032144996975],[4.8211405354756,44.016469245528],[4.8376764645108,44.014939590778],[4.8433326670726,44.009857987382],[4.8455501032842,43.99667711759],[4.8421001716407,43.98647354378],[4.8319955437626,43.985260560051],[4.8159834779277,43.988799971648],[4.8101475881401,43.97704355585],[4.8150547522655,43.967622474105],[4.8079998756015,43.960029108371],[4.7971529885585,43.956718817037],[4.7790210940203,43.937894495052],[4.7687787417118,43.933801125308],[4.7499895249126,43.932181836453],[4.7390596940896,43.92406219253],[4.740099224056,43.919678920657],[4.7233684641772,43.905955710295],[4.7037984091552,43.899340665402],[4.7074943864756,43.895550919044],[4.6905462810021,43.883898624023],[4.6654377200626,43.875147404443],[4.6566482355099,43.874778903832],[4.6419145398807,43.867476572594],[4.6480099815874,43.851229485733],[4.6586664103492,43.853223756034],[4.6662999036899,43.844776915402],[4.6501517057694,43.839124011369],[4.6424185010062,43.831436886337],[4.6522767209675,43.816837884851],[4.6548263114857,43.806405017468],[4.6512435847762,43.782275197677],[4.628818965927,43.759861933174],[4.6227171190074,43.743237369574],[4.6136350841342,43.729822310127],[4.6130400270515,43.714296691071],[4.6276618120935,43.690542678491],[4.605829920983,43.686077262962],[4.5930346527266,43.68745966779],[4.5818853309897,43.696368547688],[4.5527787964313,43.701311173254],[4.5398466434949,43.707275616451],[4.5243901803315,43.702131030559],[4.503671690096,43.702259072675],[4.4872344746833,43.699241399194],[4.4756623542909,43.684463819817],[4.4754954502059,43.671096153803],[4.4559475264435,43.667415945459],[4.4475788905709,43.659307469452],[4.4382159894455,43.644374718144],[4.4270341666761,43.620674791673],[4.4397478336794,43.610672750672],[4.4545256952964,43.611392063023],[4.4668068635081,43.615205555036],[4.4752352404423,43.60829610571],[4.4606813332323,43.589260601197],[4.4433120956209,43.583144847291],[4.4255399426089,43.585225258609],[4.404416776755,43.574366053053],[4.4153195295637,43.572538108822],[4.4093533628433,43.561126852889],[4.3870870214048,43.560476830234],[4.3806768784461,43.55254245629],[4.3651362956496,43.547157120782],[4.3536437981366,43.547390132754],[4.3341326001686,43.535451246643],[4.3164310144209,43.544330277799],[4.3095227640281,43.543279128578],[4.3227085568643,43.530446651372],[4.3204919293874,43.525482210334],[4.3051324465276,43.520794514252],[4.2976898160141,43.515329111265],[4.271416895472,43.508069960206],[4.2586419540305,43.507538672405],[4.2381030309066,43.497625146899],[4.2311705681976,43.47675937846],[4.2302808850321,43.460183661653],[4.1938625454583,43.465779027827],[4.1656196762668,43.471915156827],[4.137670466646,43.481949459061],[4.1231397009828,43.494201235057],[4.1165892511326,43.508710525509],[4.1298746993328,43.522765554616],[4.1382579687386,43.526105311289],[4.1391197547669,43.531898260949],[4.12162781658,43.547075001142],[4.1010404384135,43.554370958977],[4.0663488317709,43.557386111903],[4.0422520205905,43.556806676461],[4.0111840974253,43.552446664056],[3.9685717523119,43.540018483347],[3.9071379792073,43.516845546072],[3.8864007764545,43.50687119465],[3.8496233013451,43.485360022977],[3.8288196651265,43.469199818772],[3.818529911629,43.458313042789],[3.7966687778375,43.441038572476],[3.7745683768076,43.431420834377],[3.7462817628759,43.423623789327],[3.724920103348,43.41579312533],[3.7230347632352,43.401095090434],[3.715556142844,43.400687731567],[3.6919033474737,43.391883457324],[3.6621617057021,43.392279948911],[3.6460792124476,43.384774104561],[3.6196750009169,43.367836073788],[3.6026227584831,43.355428335099],[3.5661200382653,43.325717677552],[3.5273014618389,43.28981147991],[3.5109592064433,43.273328841308],[3.4683351175459,43.276598485695],[3.4303317007418,43.290210436006],[3.4034831432597,43.287900440396],[3.3869052230084,43.284136091601],[3.3438584522568,43.270394222721],[3.2871141319468,43.241993153845],[3.2634509331275,43.228864618646],[3.2405623482295,43.212804132866],[3.2178713301191,43.197502303167],[3.1901982904968,43.175846370089],[3.1683477733427,43.157328349219],[3.140800124971,43.128768756296],[3.1309240074639,43.111758439868],[3.1172266379458,43.101836432273],[3.0928818865124,43.06914587835],[3.0838489259408,43.055302627989],[3.0655869638129,43.021675065612],[3.0615075416401,43.008829254021],[3.0525103814528,42.990159118293],[3.0428444157674,42.960156485478],[3.0393165218276,42.941683366716],[3.0404673397314,42.929700731159],[3.0525504097283,42.926207159025],[3.0605893002724,42.91706260281],[3.0521306763747,42.885348067732],[3.0435046945933,42.838148318333],[3.0393825874565,42.799198332564],[3.0383147458062,42.759308922454],[3.0388174616362,42.731854400073],[3.0406344364503,42.717464171238],[3.0354235158251,42.678251792455],[3.0348448670056,42.660160793544],[3.0374210506027,42.623834642628],[3.045187180481,42.594580128259],[3.0461959546139,42.571621030681],[3.0496015552694,42.550136565972],[3.0602531213169,42.535571457297],[3.0820579326701,42.531560165182],[3.0884117662963,42.525558183092],[3.1091343781376,42.52489266491],[3.1245047496547,42.521008572288],[3.1335799243959,42.512937683655],[3.125266856012,42.502379897222],[3.1329574003536,42.49727637329],[3.1301915393708,42.485333147407],[3.1331140504699,42.48125657057],[3.1530079401401,42.477772687552],[3.1556347078439,42.469619425916],[3.1624454541281,42.464978147207],[3.1598953323874,42.451898657834],[3.1673878928116,42.448419269998],[3.1747892794105,42.438690536519],[3.1732186031539,42.434878294177],[3.1254604409588,42.43468722687],[3.1207651976703,42.438008576998],[3.1072768828596,42.432657662278],[3.0983029144992,42.424928915316],[3.0854409735932,42.425513473771],[3.0573242267829,42.446987385415],[3.049039409754,42.455546175261],[3.0407584675862,42.473141908956],[3.0198010082741,42.470624644994],[3.0125732677896,42.466522275456],[3.0009203931282,42.472988789014],[2.9822385301958,42.471613793793],[2.9689921527615,42.465793999445],[2.9470281255671,42.481796599661],[2.9302139076263,42.472078747973],[2.924484683878,42.458390971344],[2.9070949041858,42.456950703603],[2.8920092453183,42.461788700333],[2.8809448199987,42.461172866792],[2.8727897478221,42.467059299379],[2.8635181251783,42.463685068523],[2.859676897177,42.454572528495],[2.8414158207066,42.458521817354],[2.8331700496324,42.452804895516],[2.8271034160314,42.439240137443],[2.8162952658984,42.439738013572],[2.8031487735856,42.428224313103],[2.7992434851571,42.41857137482],[2.790949549749,42.417857916921],[2.7769704769536,42.411950189136],[2.7685368540735,42.413430586275],[2.7531989854034,42.4253608469],[2.7166720712852,42.42122422902],[2.6945491255524,42.407887936979],[2.6750400951504,42.404970989064],[2.6714146160115,42.387529592347],[2.6556398345705,42.388430725188],[2.660742170663,42.378153731227],[2.6611097557922,42.365961556824],[2.6727185269299,42.359466239204],[2.6760751446233,42.351638965741],[2.6717703199325,42.341177323897],[2.6559403579543,42.341429322911],[2.6495298474086,42.344118258289],[2.6178064323289,42.345509163763],[2.5778257714722,42.357932340651],[2.562716553225,42.357067819912],[2.5573378574231,42.354085820691],[2.5521719085286,42.343319051918],[2.5400380013544,42.333755393653],[2.5257604063048,42.33364688988],[2.5003055444058,42.342908435218],[2.4829568103055,42.33964742313],[2.4675348479811,42.358923606052],[2.4514681079426,42.369203663978],[2.4454040688981,42.36956863647],[2.4334669708382,42.377094638841],[2.4354845211197,42.388880175068],[2.4288205957426,42.394335723771],[2.4167902772506,42.392360477665],[2.3954903182362,42.395121661663],[2.3899700764621,42.398051030902],[2.3688351288602,42.401165613258],[2.3491768366401,42.406745263737],[2.3341179227016,42.415651766886],[2.3253087868373,42.417410301027],[2.3141335755949,42.427849671933],[2.3069588238745,42.428790247213],[2.2923849967665,42.422976621044],[2.2738581951916,42.432690437335],[2.2578039229724,42.438353537568],[2.2466730218158,42.429496737389],[2.2222325344186,42.424592964147],[2.2010574502093,42.41629050573],[2.1563381691629,42.423423821077],[2.1313502035542,42.413484336715],[2.114896793444,42.394507212494],[2.1167685660168,42.383217532845],[2.0916681165323,42.374166894014],[2.0835932961683,42.362697401901],[2.0723509915714,42.364576641156],[2.0580021628496,42.357888067271],[2.0234953451252,42.355223026123],[2.0169227090321,42.348686254163],[1.9859078905071,42.362044583467],[1.980584938619,42.369405890793],[1.971695415142,42.373783371899],[1.9620597540182,42.389876289524],[1.9607755007324,42.403677303718],[1.9558602817575,42.412475519734],[1.9582805852121,42.424047755767],[1.9417250599361,42.429661230654],[1.9430207870612,42.44411210649],[1.9353061351198,42.453582304437],[1.9166392735781,42.446308629241],[1.8982681400083,42.450058731348],[1.8854483131238,42.449295307775],[1.8814265985157,42.459710961468],[1.8683724263794,42.465058824645],[1.8585449890657,42.462680550073],[1.8469943350858,42.470704743694],[1.8433611119041,42.477147183315],[1.8346241667293,42.481783546447],[1.8064207841596,42.488451645516],[1.7950029277753,42.486845300346],[1.7632599240148,42.486844325683],[1.7461600305578,42.49532036127],[1.7298892803686,42.495327493594],[1.7258285070201,42.503605106587],[1.7256472450279,42.515034379784],[1.7343746270315,42.535650381024],[1.7359462939386,42.548521333167],[1.7411151935539,42.557100349798],[1.7498796321903,42.563587757319],[1.7699598880127,42.564819783733],[1.7861298758203,42.573623487381]],[[1.9573803578127,42.461623243383],[1.9597995518936,42.453259523701],[1.9813423517482,42.44752541931],[2.0000647814638,42.446778541763],[2.0126872587813,42.448344388962],[2.0109536138017,42.454821453137],[1.9966046469832,42.461186871026],[1.9872946716006,42.469685808584],[1.9865299951704,42.475761010873],[1.9960839145775,42.484654179931],[1.994441965458,42.488880134829],[1.978759694687,42.494769707784],[1.9761955998207,42.48559878431],[1.9613838814667,42.472523712782],[1.9573803578127,42.461623243383]]],[[[-0.10307051080042,43.242819142542],[-0.12215124145212,43.243893908194],[-0.13346480059307,43.258458798265],[-0.14061503281768,43.271941230583],[-0.13650575288846,43.284504952764],[-0.12616476378979,43.293876660784],[-0.11997934072059,43.306250495105],[-0.11185367186851,43.31039465909],[-0.092031063800833,43.300469260619],[-0.096173699573616,43.285481158687],[-0.079283735332789,43.271656452017],[-0.079840951222932,43.262366418014],[-0.092111707678552,43.252065563512],[-0.099320994112155,43.252127129181],[-0.10307051080042,43.242819142542]]],[[[-0.10221657949985,43.358514651885],[-0.10728332222542,43.370734939225],[-0.09095912750824,43.37316253716],[-0.076422702553633,43.364562190447],[-0.065396680791735,43.35504948237],[-0.062503063827367,43.346712050556],[-0.070279283945182,43.317455182599],[-0.075041474866062,43.307136096993],[-0.10412308826692,43.312464324807],[-0.11139515774132,43.315808605005],[-0.11566381713828,43.330976950464],[-0.10847946239493,43.337801770075],[-0.096783660691415,43.334763115112],[-0.086786928155415,43.336872044844],[-0.090143282581254,43.358859352353],[-0.10221657949985,43.358514651885]]]]},"properties":{"code":"76","nom":"Occitanie"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[3.3613476310625,44.971408091786],[3.3545315434466,44.9548199209],[3.3379420512705,44.955906998959],[3.2973059946128,44.935604538605],[3.2860179111885,44.926382028761],[3.2713373103277,44.927600109493],[3.2615217326405,44.932067820131],[3.2595403854401,44.942429341236],[3.245167534381,44.93480347612],[3.2496887102206,44.916235200562],[3.2278135177439,44.909928387989],[3.2269844428022,44.897602452938],[3.2323433112231,44.891622050737],[3.2252942367053,44.882045162686],[3.2159619013053,44.875041006609],[3.1991804637825,44.874642009283],[3.1823170380273,44.863735423357],[3.1690213470506,44.874091478783],[3.1531732734567,44.893017216949],[3.1410977876348,44.903315197313],[3.1283803710941,44.903578216134],[3.1229128915544,44.892733396595],[3.1054945101096,44.886774806731],[3.1050371687709,44.86639509115],[3.0953252337809,44.85208399024],[3.1001211680904,44.844373808687],[3.0994806863618,44.833584813393],[3.0714754944234,44.834124974928],[3.0768587089093,44.824410436955],[3.0615217992797,44.817172380452],[3.0457487033386,44.799052030765],[3.0503924394573,44.779809366102],[3.0422427573327,44.75938114179],[3.0310731845345,44.749413959606],[3.028416597051,44.73255744411],[3.0353535096078,44.727206782516],[3.0391236076168,44.714995724501],[3.0251405593834,44.716097238134],[3.0160122019676,44.713692453341],[2.9985742640224,44.674442966678],[2.981760369824,44.651994919411],[2.981675726654,44.644673011362],[2.9729967000843,44.645719145774],[2.9637576145748,44.654316787673],[2.9487265645702,44.672978048006],[2.9392865668235,44.677756455026],[2.9408965571355,44.683818918865],[2.9338731506521,44.697402037726],[2.9350900117718,44.705004788991],[2.9232670003911,44.728642526112],[2.9322008334785,44.738182515263],[2.9335256868255,44.750101514437],[2.9284555057549,44.755160769806],[2.9172495539886,44.756714098966],[2.9208013627531,44.765729671884],[2.9348220891073,44.766338409064],[2.9345177106412,44.779201871895],[2.920189595566,44.794308778558],[2.9040726320859,44.783702886621],[2.8897062556822,44.788417083385],[2.8795747424774,44.803006111318],[2.8705082792207,44.827398299766],[2.8559650223393,44.855179951014],[2.8596736604077,44.874465473337],[2.8496519747355,44.871490231757],[2.8220333243708,44.87157004877],[2.801957650579,44.873625756087],[2.772707056045,44.855545795389],[2.7684108734637,44.863858763976],[2.77049124514,44.875537836385],[2.7783381480633,44.887718357993],[2.7718590507401,44.902271109449],[2.776087665079,44.908963934931],[2.7735403561236,44.915091091551],[2.7603927919273,44.927510072233],[2.738258109046,44.941219492647],[2.731006631595,44.936748083927],[2.7240210839286,44.924576074703],[2.7135929831216,44.92713012749],[2.7064336715881,44.907221617118],[2.6938913636929,44.902938090171],[2.6812975408382,44.907392758521],[2.6581063096255,44.882979115397],[2.6562270538803,44.87241580597],[2.6490646425252,44.869728369056],[2.6366080646644,44.872551413571],[2.6239295606463,44.866918027702],[2.6180527448461,44.854603721987],[2.6026823497168,44.843163111324],[2.6117393110443,44.83131246301],[2.6074714184,44.824096540945],[2.5971356193221,44.819510989142],[2.6013884128515,44.807574409416],[2.5993613568997,44.792806185507],[2.5865648469617,44.783990021983],[2.5735477024072,44.784962589937],[2.5627129322914,44.775756861827],[2.5585893921439,44.757924931793],[2.5516388576146,44.750719684187],[2.5544909688881,44.73964379349],[2.5519407104745,44.732804630794],[2.556122557476,44.721283990134],[2.5184594908124,44.703480601801],[2.5188863490069,44.699027751647],[2.4989152190022,44.687020949858],[2.4875777637021,44.666984218285],[2.4901340080947,44.656773198157],[2.4831874702259,44.650342597738],[2.4689992507151,44.649641593651],[2.4680389011889,44.642888409527],[2.4521635947204,44.648220759561],[2.435000853128,44.638874930003],[2.4055217700154,44.647179554811],[2.397445965387,44.646186044198],[2.3782230201151,44.650161602045],[2.3659976814652,44.641342211431],[2.3485386057121,44.641480228035],[2.3327786804308,44.650617960529],[2.3365579816568,44.661275985276],[2.3267908312388,44.669693386939],[2.3045868091932,44.662449015977],[2.2910368223518,44.666581877606],[2.270930098105,44.660401110765],[2.264931023707,44.660757552111],[2.2508940527358,44.651888047018],[2.2286252203003,44.655106676519],[2.2084152778134,44.643842310283],[2.214541909482,44.627080806224],[2.2198705673093,44.623646052351],[2.2074728028173,44.61552895784],[2.1908059572226,44.628252004845],[2.1694164789558,44.638069782843],[2.1687595856936,44.647386736712],[2.1740442827509,44.653644834741],[2.1655660362222,44.661375303382],[2.1791523780579,44.674446124105],[2.1630322730753,44.690215331586],[2.1552964923022,44.70023944349],[2.1386637746726,44.692880659597],[2.1301318075949,44.698486086307],[2.1336852541707,44.70956475715],[2.1479681938401,44.723035803571],[2.1522238006118,44.736723151663],[2.1534957604021,44.753104006989],[2.1493997719958,44.769790512407],[2.1667022088341,44.772651831571],[2.1716374993124,44.790027108976],[2.1652929430823,44.799560342182],[2.1658208187006,44.812904212621],[2.1398031019064,44.823820670465],[2.1227770243941,44.847633102732],[2.1165704984568,44.850184202716],[2.0942097640089,44.872012369152],[2.0837359232769,44.887424173789],[2.0864901589829,44.901079919432],[2.1081047030139,44.910638688547],[2.0892278644094,44.928560463933],[2.0786238601329,44.932494333995],[2.0763195910268,44.940561879615],[2.0806940542158,44.953285983552],[2.0629079799591,44.9765045515],[2.0766169639286,44.978785623857],[2.0905743960003,44.984665148518],[2.1003714972007,44.983427469854],[2.1329815746739,44.985516038406],[2.1381513494782,44.992811832821],[2.1406414310588,45.005858479694],[2.1168066989252,45.02111434735],[2.1094104611066,45.041521518867],[2.0993181256264,45.047622806571],[2.0951568732001,45.056033465741],[2.1037456940938,45.065812421906],[2.1183646353816,45.070379067781],[2.1298193059745,45.078932414297],[2.1456535641311,45.085592171697],[2.1717594845165,45.081496802672],[2.1803618094732,45.09734068898],[2.1794393252059,45.109177492216],[2.1852692693185,45.113998024195],[2.1787905007908,45.136297935946],[2.1948369367108,45.136027708871],[2.2115654221992,45.14844827392],[2.2137008320653,45.160189965969],[2.225397887065,45.160336595328],[2.2335857511761,45.167181650239],[2.2195874303098,45.172114610573],[2.2011879889027,45.181494229499],[2.1985478420586,45.194408666334],[2.1905131897891,45.20213434701],[2.1953636990438,45.220851418291],[2.2249287044688,45.241854962029],[2.2413408281325,45.24942616212],[2.2387747025234,45.260353952142],[2.245004874828,45.267106520498],[2.2585683903144,45.270220164439],[2.2617348470443,45.28322143744],[2.2714111009736,45.290154603854],[2.2800803441611,45.287325615297],[2.2920696943683,45.290569998093],[2.3073512042479,45.312659714856],[2.3177397642658,45.322963729764],[2.3504806858312,45.327560923525],[2.3593793404283,45.335790299537],[2.3513461420151,45.348610937353],[2.3647790516305,45.357919621969],[2.3629697029865,45.378412337982],[2.3682726042671,45.388621392102],[2.3644462766137,45.395234506367],[2.3545525332951,45.401398504646],[2.3500842175271,45.409676058097],[2.3551307955913,45.415027972839],[2.3782501191323,45.414302210343],[2.3954865345645,45.407322290365],[2.3982881363717,45.400169538674],[2.4129045453324,45.396651442056],[2.4226736731266,45.397229870143],[2.441865995091,45.384259395763],[2.4580813755781,45.384827047932],[2.4734557788383,45.38152628147],[2.4778316883062,45.370410647653],[2.4857679741129,45.378946887778],[2.5227321270438,45.382084686424],[2.5262353366501,45.389343818253],[2.5220338520841,45.402237812322],[2.5159713869265,45.403236533013],[2.4927584232596,45.413842323437],[2.487471709413,45.418842030111],[2.4955946696815,45.44550416324],[2.5067704533992,45.464065004968],[2.5084125130653,45.478501516921],[2.5138913543334,45.492347782226],[2.5089910453543,45.500226403127],[2.5115199537568,45.511153110817],[2.5203805740984,45.520450992238],[2.5165205610225,45.524032787608],[2.5163271748739,45.55342839279],[2.5064679621685,45.553444063405],[2.4909285469766,45.560394087282],[2.4874305070125,45.569384021272],[2.4725367701592,45.580929716396],[2.4646251782029,45.594410586781],[2.4653445128497,45.600820150088],[2.4784344946797,45.607911789419],[2.4790816386943,45.62246233864],[2.4833880353068,45.639303519147],[2.4897451626044,45.642353692],[2.5011495345088,45.638738876646],[2.5142980219448,45.639528483879],[2.5249384159848,45.657234455338],[2.5151301172176,45.664284079976],[2.5129233228036,45.6713335771],[2.5283596411119,45.681924314977],[2.5268700649094,45.694919495794],[2.5198739656449,45.697052906827],[2.5183220391127,45.712799669432],[2.4921294160933,45.7376701128],[2.4846414659033,45.748521466442],[2.4751529321011,45.747688866007],[2.4547914690758,45.761151249494],[2.4414259075117,45.762378997013],[2.4341123429169,45.769852817869],[2.4329800874586,45.783888824912],[2.4274035046023,45.794285013202],[2.4185991219253,45.798475127769],[2.4006773662183,45.817289546629],[2.388014020679,45.827373168854],[2.4013447310476,45.837577232244],[2.4265364620605,45.834771343876],[2.436436952669,45.846998827989],[2.4478280089908,45.84581866569],[2.4425827259717,45.863008040763],[2.4706137918202,45.872335245229],[2.4797383951775,45.864541357011],[2.4922279879729,45.864029936278],[2.5099613389201,45.88666598071],[2.5262086816167,45.896727274022],[2.5376912527467,45.900845994537],[2.5550056008106,45.912509471984],[2.5415060022687,45.921531781083],[2.5509536719711,45.935761668247],[2.5516381183225,45.941261078502],[2.5657173898648,45.946856793309],[2.5651781859373,45.95661981464],[2.5891875589674,45.960437573506],[2.6107853057918,45.971228071516],[2.6074695080176,45.979108641029],[2.5944202186196,45.989440975795],[2.6025059601172,46.033461930485],[2.5716988273144,46.048689825423],[2.5631828961231,46.064609781776],[2.5570843667475,46.069300275416],[2.5518715312783,46.083457348801],[2.5518219731636,46.103970633498],[2.5490488887945,46.114075006608],[2.5582364865104,46.130701979674],[2.5586220340193,46.138326224613],[2.5653725529015,46.143035759957],[2.5654816305578,46.153967351319],[2.5607637153191,46.155596225642],[2.5597996290957,46.173366559433],[2.5431674609911,46.175602605523],[2.5286290573702,46.184894945309],[2.5280194815711,46.195466990157],[2.5216954121117,46.203035380932],[2.5215270201899,46.21133367553],[2.5154284346668,46.228012112114],[2.5163085117785,46.239436870366],[2.489106418147,46.248968644305],[2.4770972903349,46.269361724579],[2.4789445821479,46.281145991526],[2.4430263839161,46.294995852237],[2.4309509758156,46.291519676804],[2.421335782135,46.284622030263],[2.4161017112175,46.300056006693],[2.4204656768519,46.310129656565],[2.4113176626179,46.314094483732],[2.3918581379529,46.329985164159],[2.3840641130619,46.328908641081],[2.370482749419,46.312629017475],[2.3549060485425,46.325678438006],[2.3345821354246,46.325320260055],[2.3230230944721,46.329277448172],[2.3093794648902,46.342006193666],[2.3027460023726,46.354419802873],[2.313389172619,46.356936451493],[2.3233383727294,46.366525024524],[2.3371146519405,46.366795923975],[2.3315900743858,46.378176612964],[2.3154715753059,46.375205741584],[2.2850442774167,46.385857562809],[2.2804029533754,46.410236476962],[2.2810437278384,46.420403547753],[2.2857604795168,46.453514664499],[2.3054693178764,46.475428936804],[2.3166710404192,46.468549195709],[2.3242884285484,46.470978980874],[2.3298217389117,46.479616607338],[2.3241785781947,46.49036759012],[2.3520036091655,46.512206845202],[2.3683002910262,46.51843386298],[2.3884650716406,46.518246292054],[2.4131644849466,46.520301786364],[2.4266867789218,46.526121661214],[2.4502811792897,46.521935935452],[2.4685711377311,46.526009632976],[2.4829275256976,46.532694737487],[2.4969434776113,46.533665788244],[2.4991226886431,46.521292172555],[2.512426202843,46.523880853474],[2.5201385391568,46.530864132368],[2.5275313125159,46.529030044988],[2.5366546066244,46.519702557793],[2.5540275760751,46.529387627047],[2.5724916070298,46.533849645617],[2.5835051726425,46.542741752192],[2.6149607060411,46.553276455558],[2.60621930247,46.565758488844],[2.6093779370947,46.571328686404],[2.6045186165205,46.579001838563],[2.6023203253116,46.595164451357],[2.5815597567024,46.593164438775],[2.5779519369239,46.603788174773],[2.5691010154446,46.609518978116],[2.5859628971047,46.6142967727],[2.5852765586441,46.622738638042],[2.5966478585977,46.637215067759],[2.5895802639199,46.648026747075],[2.5673899068872,46.652347408754],[2.5721892884417,46.659444642004],[2.5849748988646,46.664165776546],[2.6050484721825,46.668158037606],[2.6095979741835,46.662840354764],[2.6246414896646,46.657300692831],[2.6308613163993,46.672294145791],[2.6215530530757,46.678653259953],[2.6234039357923,46.688702717854],[2.6313578708624,46.690886867154],[2.6478858990075,46.688908315282],[2.6547293011216,46.696536792562],[2.6777927654584,46.704612208045],[2.6881649904859,46.720909610987],[2.7009209254283,46.720959754269],[2.7049698717297,46.739389993021],[2.7287214908144,46.748308579779],[2.7372898083354,46.743150242056],[2.7435704821949,46.73008326729],[2.7567441474108,46.724772483564],[2.7585207590938,46.717748505775],[2.7744893811293,46.718902897367],[2.787290827625,46.728613960925],[2.8010724027789,46.733722377214],[2.8276177034814,46.735286079973],[2.8448121194469,46.726844055458],[2.845419928846,46.742855932849],[2.8612332862758,46.754030340445],[2.8770157582915,46.761468535881],[2.8761691440531,46.768445733319],[2.9098049149944,46.779347563944],[2.9081271826571,46.787903599841],[2.9243754548552,46.794523429403],[2.9378161550649,46.795713700537],[2.9529591220769,46.790999230159],[2.959918627937,46.803872076205],[2.977801671991,46.80377337386],[2.9895396276531,46.799298294916],[3.0033551657685,46.798122809815],[3.0175184994153,46.799900698717],[3.0320629441459,46.794909389217],[3.0368385012729,46.784399457513],[3.0361449719957,46.776351034743],[3.0490666680714,46.758080742151],[3.0610780913415,46.749849808096],[3.0839336875931,46.737632194007],[3.1297797354937,46.727201530755],[3.1631524413883,46.693541123032],[3.1972601846791,46.679928148065],[3.2155446436111,46.682892755029],[3.2330363473519,46.697017662903],[3.2551640362648,46.706289026218],[3.2697959512206,46.71674181988],[3.2988329664362,46.713590484885],[3.3139651835149,46.688751611332],[3.3467035850706,46.684418162056],[3.3664449691016,46.691259477216],[3.3754269760827,46.699410803841],[3.3787310431309,46.71134766179],[3.3877581200663,46.714818365449],[3.4074108289121,46.711510582242],[3.4341396009475,46.711907843672],[3.4295672938027,46.702504791218],[3.4329783660003,46.693340026098],[3.4513122938683,46.689900877873],[3.4535963621348,46.681987883569],[3.4473385862025,46.663554460402],[3.4572892729042,46.651760006926],[3.4865354798384,46.65380880583],[3.4871533162964,46.658256156349],[3.5174930194471,46.683185185586],[3.5300363962253,46.688813284083],[3.5464728563281,46.678292894912],[3.5543959772727,46.684731744078],[3.5555591963708,46.695741177165],[3.548207507912,46.706166654281],[3.5503869458917,46.715861095646],[3.5773137335153,46.714852724197],[3.598000652576,46.723983498355],[3.5971876767747,46.728401657187],[3.5845515939144,46.739382605418],[3.5806709648764,46.752741235279],[3.5910525816638,46.762426406979],[3.5977490685569,46.76202889412],[3.6020398798222,46.751247280578],[3.6201072037828,46.754059565827],[3.6294223422648,46.749456328005],[3.6225898833129,46.740130866568],[3.6353341554133,46.728514790806],[3.6381391050479,46.722723829214],[3.637895263919,46.707205199291],[3.6513931816228,46.70282167235],[3.6554716665381,46.687748401639],[3.6801004977635,46.66852089269],[3.6969575528098,46.660583034448],[3.699679505,46.651867135799],[3.7121523238188,46.633631635674],[3.7227091007956,46.627609885471],[3.7230250098493,46.622072726143],[3.7138737202882,46.613995279712],[3.7176467323502,46.605806262315],[3.7323776901235,46.604907119963],[3.7432893129951,46.567565263244],[3.7406549316466,46.559049395025],[3.73154117491,46.549578224034],[3.7418443310505,46.539508443385],[3.7546629110025,46.536019887064],[3.7656008328403,46.537908481562],[3.7878963661806,46.528042650186],[3.8017563839321,46.519902255804],[3.8113440515561,46.520138117834],[3.8176755382384,46.525229454055],[3.8340033360184,46.531134997034],[3.8464630176371,46.524356398489],[3.8397556873666,46.517562051932],[3.8494709455035,46.513023833485],[3.8600251576626,46.515222323315],[3.8646271424558,46.509717077517],[3.860387224324,46.495601253328],[3.8649127119961,46.489736338385],[3.8904665810402,46.481246458453],[3.896985633842,46.481471942919],[3.9013529089878,46.490636303507],[3.9189702450008,46.496061208045],[3.9375764836594,46.49076190287],[3.9496133283036,46.492478893726],[3.9579376111726,46.489753821104],[3.9520867242123,46.481423383561],[3.9565931687991,46.47688226209],[3.9730562040646,46.477457398934],[3.9980402829299,46.465463980924],[4.0015415164833,46.458618151559],[3.997444424826,46.450264670788],[4.0055701432229,46.443531306791],[3.9881422985694,46.435461575775],[3.9956151474212,46.4286940195],[3.9844480228975,46.416663389961],[3.9886970251491,46.408772224942],[3.9772206054151,46.399220047306],[3.9842615206377,46.378286038678],[3.9916043062641,46.369630419679],[3.9886640376734,46.360561403255],[3.9847410554074,46.32973022678],[3.9974052217542,46.323291087799],[3.9866271252361,46.319195576966],[3.9481286581435,46.31979164002],[3.9477193967384,46.303444864233],[3.942781911555,46.298925500612],[3.9300977722843,46.295820251472],[3.9135709840696,46.296680727045],[3.8974208259956,46.291460834216],[3.8912386850317,46.28524616424],[3.899538631706,46.275908099459],[3.9055127902449,46.271596707683],[3.908821904601,46.260346940334],[3.9076581109201,46.242456213516],[3.8966112073781,46.2371189424],[3.8981917464837,46.226659321125],[3.890130972164,46.214487049905],[3.9135693350409,46.206918558033],[3.9179891232598,46.202853033545],[3.933514918779,46.206414377073],[3.9725466394127,46.202707514639],[3.9728332574833,46.193862543845],[3.9817823975359,46.17634098728],[3.9887880883959,46.169805261207],[4.0308840440337,46.171882539683],[4.051960198465,46.181690186415],[4.0614051962048,46.188789802443],[4.0716672927165,46.18807123789],[4.0908839436933,46.192837097346],[4.1040867377072,46.198391359055],[4.1324158349304,46.177826358374],[4.1660889760454,46.172928033288],[4.1884438149961,46.175128955988],[4.1854551738783,46.190162130834],[4.207903434232,46.194833150686],[4.2246872961743,46.177995338767],[4.2335294499164,46.180026926884],[4.2423584224526,46.188830459357],[4.2525000565082,46.187922148658],[4.2610250986037,46.178754364444],[4.2518988744775,46.167097935374],[4.2520302327293,46.157916681311],[4.2824944900944,46.156946471815],[4.2952828837852,46.172250410112],[4.3035807058325,46.17426655994],[4.3157416420975,46.172029804364],[4.3270887031684,46.184790131282],[4.3357117653558,46.181398292861],[4.3450682105084,46.187441862916],[4.3648481141165,46.183579311067],[4.3706868166882,46.191620039558],[4.3631781812533,46.200537276046],[4.3774743279046,46.21020246009],[4.3893979878582,46.213601360996],[4.3880744564659,46.219790380732],[4.388291015925,46.247956431405],[4.3920466116785,46.263026545141],[4.4058135314858,46.296057806589],[4.4218715520166,46.294954263085],[4.4272337977412,46.302730717527],[4.4397213287914,46.293184568466],[4.4583704273073,46.296976724079],[4.4765696377244,46.284237867232],[4.488465816487,46.287994462282],[4.5039940949336,46.267132463094],[4.5372643385622,46.269911483268],[4.5464477974735,46.27391839397],[4.5480762222411,46.282864938182],[4.5577956308141,46.294551640092],[4.5698487572768,46.293352201901],[4.5726687726239,46.277139335718],[4.5865068000033,46.268694622582],[4.6185580580588,46.264793895574],[4.6220235259619,46.270079226484],[4.6183224944202,46.282440402941],[4.6314517777677,46.289015276562],[4.6352614072065,46.299289507242],[4.6546591822967,46.303484822155],[4.6693820675804,46.297910092985],[4.6794340760587,46.303994122044],[4.6931098569714,46.302197476983],[4.694515991108,46.292672565821],[4.7075411259083,46.284660070276],[4.7076872577415,46.269647917424],[4.6878811178807,46.265311972919],[4.6795502516132,46.258666565339],[4.6883618181605,46.25011389523],[4.7028290155173,46.251330439429],[4.7357666167041,46.234244688808],[4.7326605831699,46.227019799221],[4.7206237625559,46.222390986056],[4.7356928657613,46.211923783014],[4.72266470068,46.202320489849],[4.7243706747794,46.184304976244],[4.7305257874621,46.178368585861],[4.7597597705914,46.172840600415],[4.7608053446831,46.175968780182],[4.7802082627383,46.176676203678],[4.7802430578135,46.189052363162],[4.7933904888672,46.204700104778],[4.7945859355866,46.218311767171],[4.8077505003904,46.236972415214],[4.8115552603184,46.249932664612],[4.8109975376095,46.259923276174],[4.8259515552341,46.274785814873],[4.8332136171616,46.300145048773],[4.8534210199043,46.32990123356],[4.8514544831808,46.356271094403],[4.8585287407096,46.368018459572],[4.873839273104,46.384668143424],[4.8882101486247,46.402977057782],[4.8918151434404,46.439918009678],[4.8992958191725,46.450123277325],[4.9111172894635,46.457732635494],[4.9157805036687,46.465413333501],[4.9155507621799,46.488939443669],[4.9257189717408,46.497441604339],[4.9314208893674,46.509211481378],[4.9400218107181,46.517199374492],[4.9491021767105,46.501380502462],[4.9645994700407,46.513175985923],[4.9835496952255,46.515392507897],[5.011007749262,46.510294840159],[5.0141793460298,46.500587565063],[5.0523715346281,46.484873791529],[5.0700061667722,46.485667291269],[5.0989387475854,46.497166675779],[5.10737201939,46.491919458253],[5.1152051358154,46.494069043579],[5.141950046447,46.508357328146],[5.1664495124354,46.505590616989],[5.1667923612572,46.514674866375],[5.1815968667213,46.509758803783],[5.2011399666188,46.508211405762],[5.2066353369633,46.48639795185],[5.2130427939332,46.481261974235],[5.2150628404089,46.468359298393],[5.2255477233319,46.468273543404],[5.2350290009581,46.457948870166],[5.2468319237306,46.459403653865],[5.2545935888787,46.454117831184],[5.2759250637615,46.4481213263],[5.3105633704742,46.446769968334],[5.3194882695109,46.430803499916],[5.308978572395,46.424532251303],[5.3076872001929,46.416819197974],[5.3147703161373,46.40947618293],[5.331272401231,46.399499315198],[5.3525084400185,46.397586033829],[5.3552221284773,46.39375452396],[5.3770431289975,46.381355482485],[5.362996992744,46.370926983475],[5.3770544086974,46.364113395825],[5.3734648101425,46.352234450451],[5.3819165667023,46.345255630996],[5.3992759574473,46.339521371463],[5.4042931339536,46.332813029221],[5.4046508439018,46.310338173994],[5.4102335548466,46.30910668308],[5.4170861726833,46.339534237431],[5.4278984240109,46.342210714821],[5.4377949533958,46.315109371064],[5.4669175767252,46.323267248222],[5.4753005499335,46.315382606424],[5.4674037740958,46.295566233017],[5.4595129521644,46.290471994825],[5.4568426743662,46.274473574235],[5.4730515403718,46.265066548043],[5.4995891133957,46.268200455579],[5.5129432911698,46.264539612518],[5.5420340189851,46.270203795698],[5.5581274576637,46.282173642648],[5.5663641424008,46.294050213862],[5.5855011829326,46.292557783319],[5.59838931795,46.298445925032],[5.610460815624,46.324211378495],[5.6176441912887,46.329091983869],[5.6305151249665,46.330204693001],[5.6419584041921,46.342028332374],[5.6493445080392,46.339494512081],[5.6529045876259,46.323214774673],[5.6684418272398,46.324369189279],[5.6833466019044,46.316276892818],[5.6845768021754,46.310927537001],[5.714721806193,46.308772354673],[5.7192939761881,46.293462363342],[5.7160491956243,46.279915646538],[5.720112401844,46.265870062788],[5.7251818400017,46.260731935709],[5.7459179055539,46.266368533117],[5.7656471814788,46.268294754652],[5.8212837267024,46.262094109034],[5.8498475590074,46.262067170418],[5.8643332109856,46.271208875005],[5.8702488945181,46.265305590806],[5.8791206347196,46.269936490689],[5.8946251190123,46.286607913138],[5.9089357776791,46.283950786541],[5.9185184907402,46.307199659115],[5.9259040835744,46.313765646046],[5.9414094008927,46.309446510031],[5.9535602724875,46.326531457174],[5.9729173069373,46.346856233903],[5.9868463201736,46.364869353266],[6.0106565375389,46.374508650286],[6.0295137846375,46.38681604791],[6.0480752195777,46.405125490757],[6.0551820813125,46.414801045991],[6.064005627331,46.416222559892],[6.0981978560935,46.40879028923],[6.1036883616715,46.401582285672],[6.1185950336377,46.396898818592],[6.1361111289261,46.387666375676],[6.1475847015617,46.379107190355],[6.1613607860611,46.375593565193],[6.1697363568789,46.367935207296],[6.1593091645661,46.357523011537],[6.1487581545338,46.342474971902],[6.1390806928978,46.339163368564],[6.1378901936654,46.333067215087],[6.1195873808544,46.308278314384],[6.1193736282587,46.294908886937],[6.1026435450234,46.285062924822],[6.1039528249604,46.279569729649],[6.115111632378,46.266272590393],[6.1201369325078,46.264754303732],[6.1242461802512,46.251015651206],[6.1092500751152,46.23976163763],[6.1017586374755,46.237488846141],[6.0881868913623,46.246811272397],[6.0696791670011,46.241028403834],[6.0634398141038,46.245647436254],[6.0450945249842,46.231703564592],[6.0331263207186,46.23799437917],[6.017063845784,46.23176216947],[6.0072895259931,46.22536977425],[5.9717812659904,46.211519488185],[5.9636784095618,46.196964390659],[5.9921631932798,46.186617405804],[5.9952918547587,46.18299442988],[5.9832528438156,46.171486546085],[5.9560670913359,46.132090234706],[5.9738400143027,46.131738683687],[5.985316810497,46.143308955951],[6.0154641822919,46.14263396477],[6.0325422068392,46.138442041928],[6.0455233066288,46.139907692935],[6.0520405063454,46.151402707103],[6.0749307059736,46.148890032198],[6.0924619318286,46.151762719587],[6.0992749757816,46.144011566226],[6.1212014573294,46.142667449845],[6.1266206934256,46.140460017961],[6.1449190514584,46.144832823407],[6.1521154179752,46.151723946513],[6.1750725341517,46.158152598893],[6.1882037288084,46.168463284904],[6.1859715813532,46.17817796673],[6.2142469629058,46.193786616278],[6.2320741324515,46.205470235677],[6.2517782250825,46.207041486005],[6.2773739792759,46.215611853153],[6.2956514854587,46.226054581929],[6.3101113416345,46.243699660222],[6.3085403196879,46.255105885559],[6.2846173713146,46.255153793328],[6.2676297299719,46.247839951429],[6.2489222724698,46.263081361726],[6.2377992707926,46.27733692078],[6.2416291134625,46.284546843215],[6.2510763599071,46.287643543433],[6.2479330373852,46.306039208714],[6.2579242025762,46.321777857151],[6.2799144692268,46.351093458251],[6.2941843558993,46.360850723006],[6.3151995925349,46.368778204186],[6.3269980708935,46.371129282074],[6.3446806034485,46.370015245292],[6.3622839851983,46.347951295821],[6.3900333913921,46.340163012448],[6.3983362100039,46.349291951337],[6.4115883259384,46.358394900258],[6.4285826466732,46.359525351148],[6.4690640820175,46.372614566115],[6.4803914973041,46.379314208071],[6.4828511368319,46.391927295245],[6.4923970036831,46.398425207982],[6.5090399003785,46.404031878903],[6.5205788239548,46.404192806741],[6.5451764296884,46.394724620294],[6.5635602532757,46.398365633599],[6.6350579346881,46.405772458657],[6.6573993573272,46.404992488925],[6.6926864378952,46.408081546332],[6.7228648390107,46.407550427288],[6.7575049437368,46.402602205639],[6.7602536639409,46.400376898866],[6.7956711769373,46.393088744604],[6.8048287544258,46.393585002703],[6.8062164014005,46.380373005422],[6.7939579093873,46.368622978764],[6.7725993243998,46.361732287023],[6.770609037987,46.35489449301],[6.7826406405392,46.336879446577],[6.7981214712964,46.330137581736],[6.7999297623371,46.320468909994],[6.8066438150253,46.320654870777],[6.8256057085651,46.310849078308],[6.8373080183838,46.2966869808],[6.8498971155566,46.290147597499],[6.8589051093538,46.29059983934],[6.8645108313675,46.282986228855],[6.8538982253794,46.253760812247],[6.8434127149042,46.248726167204],[6.8337455798703,46.237035791813],[6.8216770780521,46.227691939843],[6.8036633001539,46.204343363963],[6.811228200568,46.185029674216],[6.8042020707473,46.172106439303],[6.7919797022783,46.162225177301],[6.7903942029832,46.154717927724],[6.7985330883924,46.136103390553],[6.8147295130574,46.129695648917],[6.8355075060867,46.132440109797],[6.8517868611599,46.126417177303],[6.889761788112,46.124847684892],[6.8983839799267,46.122561981532],[6.892714778239,46.104316525882],[6.8838438298784,46.095796864191],[6.8914506010215,46.084495302772],[6.8900687536716,46.076513214339],[6.8798946308492,46.067793789027],[6.8726328572469,46.052044575345],[6.8883272243818,46.043120600357],[6.9085295179521,46.050234188897],[6.9245114290077,46.065194793319],[6.93736936958,46.06456312426],[6.9357975763722,46.0551192491],[6.9515100788266,46.049953446394],[6.9629078952786,46.030531973099],[6.9786083663027,46.021144644415],[6.9846771340211,46.006542009406],[6.9947247398586,46.000742003948],[7.0036316590852,46.000553586437],[7.0182519988272,45.984185305283],[7.0182419263004,45.975567599113],[7.00940894593,45.9697604902],[7.0179746222284,45.960347157061],[7.037615499193,45.95430091758],[7.0371021493003,45.941929380484],[7.0438913499404,45.922087093613],[7.0218109199059,45.916452271309],[7.0031479175286,45.89782755209],[7.0033187238325,45.882408678251],[6.9917249963735,45.868198790757],[6.9716946211702,45.867044015003],[6.9510356268261,45.859535060133],[6.93960886416,45.846732871084],[6.9230835545726,45.847274071201],[6.9092120399646,45.842522379483],[6.895098526216,45.842600014196],[6.8821969778683,45.849520488181],[6.873610959862,45.845496843566],[6.8698438889527,45.825642650285],[6.8538394187733,45.837147031314],[6.8379652390991,45.839496400234],[6.8180784499339,45.834974269868],[6.8142564432708,45.826836338335],[6.8039854950068,45.815846165391],[6.8127223620905,45.80801890935],[6.8115834715922,45.798399188776],[6.8039839343781,45.789307695607],[6.8025153780901,45.778372017386],[6.8056204903279,45.748466106619],[6.8163461892763,45.739522550345],[6.8111853327597,45.73065029663],[6.8291131566154,45.702831040263],[6.8416918546486,45.699758351852],[6.8477523743945,45.689376465007],[6.8685964773289,45.680965439806],[6.8902954111672,45.677517341592],[6.902535284798,45.680938868689],[6.9065054377295,45.674559463369],[6.9021374596942,45.663743226821],[6.916286202296,45.660011360485],[6.9171852994011,45.650736949397],[6.9346140944773,45.647093928516],[6.9666799933754,45.654063379324],[6.9781568498682,45.645387517519],[7.0006916861839,45.639899750138],[7.0010463175509,45.634973208788],[6.9860084427011,45.62249039449],[6.9855421261112,45.611104948043],[6.9778473846393,45.589884647121],[6.9806967751279,45.583323625828],[6.9953839096018,45.575637066048],[6.9902484226223,45.561160964462],[6.9945093026684,45.546677250256],[6.9915104141831,45.531278684704],[7.0038437540042,45.520940469575],[7.0003315139353,45.504414498664],[7.0224771388388,45.49654847936],[7.0520544291456,45.496249516678],[7.0563572963814,45.489623728606],[7.0458504949934,45.478351199929],[7.0542268132495,45.472184344708],[7.0694234895786,45.473884402143],[7.0997838903912,45.469437750641],[7.1014832194722,45.453864029477],[7.1146156812434,45.44172035079],[7.1135165884052,45.434196485823],[7.133848390776,45.426564709361],[7.1475131268884,45.423992978267],[7.1568873923079,45.417008078104],[7.1842712160815,45.407484371382],[7.17760043192,45.389026414715],[7.1631811300703,45.381359810968],[7.1588996003487,45.370751749811],[7.1616596669718,45.362453596128],[7.1528797089116,45.353816021836],[7.1377390432018,45.350806280555],[7.1321131760816,45.341125471296],[7.1347132782574,45.331243465627],[7.1263435309097,45.326945010527],[7.1106925788126,45.326508796443],[7.1123728281041,45.315170813723],[7.1191793002337,45.306692568243],[7.1229875004603,45.294328291286],[7.136423190274,45.28079819697],[7.1320835823333,45.266961258797],[7.1375927179634,45.255692980709],[7.1255846631745,45.244603122115],[7.110603877569,45.246346626842],[7.1065115700157,45.239258758095],[7.0854359176976,45.225881604766],[7.0796007060118,45.21424401107],[7.0673372003279,45.210085201319],[7.051179744193,45.225334821034],[7.0427614515596,45.225313603097],[7.030358820074,45.217845107982],[7.0199925125511,45.215876575558],[7.0003751823587,45.217602834471],[6.989138474737,45.210260447293],[6.9687620809781,45.208057678984],[6.9538358712227,45.184628781446],[6.954195544259,45.179612452986],[6.9429030634006,45.176188730221],[6.9430641979885,45.17091084008],[6.9302666782212,45.170963141126],[6.9069600182339,45.166613555832],[6.8916010947342,45.167033325671],[6.8858238474503,45.154195417179],[6.8975633895087,45.143009081491],[6.894376782376,45.137373356732],[6.8747634572978,45.13563631718],[6.8498552798828,45.127164544748],[6.8422856917908,45.135528185554],[6.8122710919045,45.148356968553],[6.8013961759487,45.150083145112],[6.7796480661915,45.158028591752],[6.7679412928181,45.159739939943],[6.7498942015229,45.142719026683],[6.7392628844294,45.136771576844],[6.7270392227155,45.138490660871],[6.7121080083373,45.144648738816],[6.6862136559676,45.139756066415],[6.6800685047784,45.140123130573],[6.6739820186998,45.129496472881],[6.6657100684593,45.122605577556],[6.6299923020059,45.109324963809],[6.6155462835465,45.121477875934],[6.5906851893034,45.119010630972],[6.5765291374542,45.123092743765],[6.5630788445458,45.11303936929],[6.556730767951,45.104079390462],[6.5297109874994,45.0985691169],[6.5104239586159,45.108998029314],[6.4995275838537,45.10159781596],[6.4812555476638,45.094138953543],[6.4893378703322,45.068353912844],[6.4862360357216,45.056075754404],[6.4728883939578,45.056011644618],[6.4535295918669,45.051837207667],[6.4433986588263,45.055077367768],[6.4385899722107,45.06258734764],[6.4002434258614,45.063261148419],[6.3939107242634,45.0618177275],[6.365073385182,45.071290490956],[6.3735310876429,45.084151804143],[6.3629265157708,45.104492035764],[6.3344836229796,45.122836461323],[6.3312951655489,45.118123866818],[6.3019155994585,45.108954317068],[6.2862810761543,45.110160822134],[6.275502630793,45.115299423706],[6.2605698000566,45.12684420383],[6.2544936755586,45.120790168264],[6.2438305270389,45.117298075856],[6.2293919345611,45.108749945384],[6.2296723977867,45.100589085615],[6.2358324302027,45.087232804381],[6.2401205372094,45.06771808518],[6.2200802599652,45.065369735518],[6.2063284689408,45.026782796498],[6.2039233205269,45.012471073947],[6.2517609476002,44.996700081455],[6.2696990840472,44.998351365091],[6.2970615457571,45.003365126963],[6.3182021615637,45.003859362058],[6.3196573396763,44.994552811249],[6.3148100239742,44.980185922577],[6.3285012874077,44.969714464603],[6.3229180108318,44.953019839313],[6.3290046114892,44.947315364095],[6.3588423781754,44.941280796729],[6.3546140951868,44.923593300625],[6.3581697523493,44.893778946012],[6.3507779137165,44.881204072575],[6.3553625022057,44.854775353601],[6.3363165518362,44.848370410548],[6.3192302042703,44.85684625453],[6.302850434726,44.873257969643],[6.2882129459689,44.874030533685],[6.2677561761734,44.86950109295],[6.2581706057376,44.86248397325],[6.2505425682344,44.852650516632],[6.2243745547304,44.852494101643],[6.1963759402105,44.858978334449],[6.1852192319643,44.853991864943],[6.1684510585274,44.852242761941],[6.1490188906075,44.858169876067],[6.1362266704196,44.864071820118],[6.1283556561161,44.861901713563],[6.1166725017074,44.849313192704],[6.1007058869493,44.84257849233],[6.0965156572897,44.837489421771],[6.0653153781591,44.82268480473],[6.0563403817425,44.815907431783],[6.0402065129253,44.827867468677],[6.0302157011626,44.838097758941],[6.0159331963205,44.835485814051],[6.0048600553234,44.820439050514],[5.9961657258664,44.81787407617],[5.9781993713916,44.818035522208],[5.9495216336669,44.804527356596],[5.9537639530916,44.799525853781],[5.9777793189449,44.790983738721],[5.9801493330969,44.781181602373],[5.9555147438847,44.772449015839],[5.952471613503,44.76214052281],[5.937984096823,44.763046424986],[5.926812494728,44.757135657325],[5.9152344231519,44.754703072251],[5.900149637893,44.758315310611],[5.8888310649581,44.748803778249],[5.8794954997212,44.747015345674],[5.8652264931802,44.75155204943],[5.8503937497009,44.750747373326],[5.8371577512142,44.757677183301],[5.8270981940509,44.759688387455],[5.8277714297865,44.740086051546],[5.8177724444737,44.730405199263],[5.8087945811456,44.712101632921],[5.8014699513145,44.706777613167],[5.8271099006445,44.700288039663],[5.8294720463131,44.692425284611],[5.8246351320469,44.685278024621],[5.8064797515589,44.677181975541],[5.790623681681,44.653292905762],[5.7666311555846,44.655266851559],[5.7539428619931,44.662710867987],[5.748257168346,44.655090844363],[5.7511047252626,44.648611621404],[5.7360131774513,44.649510358823],[5.7358025109287,44.640415596891],[5.7260329075738,44.639393999475],[5.6853621391431,44.649596345809],[5.6593597358465,44.650663453626],[5.6544567435058,44.655393257217],[5.6417177024073,44.65107732796],[5.6403729488497,44.633825447345],[5.6496311179712,44.617884606434],[5.6475161192881,44.612808143065],[5.6274790368545,44.594965971046],[5.6257986898421,44.586275880643],[5.6070190339977,44.568348424227],[5.5997980521304,44.553941311612],[5.5972525723721,44.543273639184],[5.6149927369414,44.532817987531],[5.630802337654,44.531597332459],[5.6531427146706,44.514831250068],[5.6645041823511,44.501894932126],[5.6526558596497,44.499962952183],[5.6297876074114,44.501187043038],[5.618123153083,44.474812657295],[5.6036448321495,44.465542446118],[5.5792007067241,44.471686064395],[5.5703041972283,44.476754841678],[5.5624010016641,44.474853738869],[5.5447008857046,44.482537575762],[5.5133416154223,44.491125991349],[5.479877306738,44.491243239804],[5.4735960069771,44.498568843239],[5.4653894088793,44.500459334817],[5.4569314822479,44.496235778443],[5.463575747607,44.480512627606],[5.4587312484193,44.466142946772],[5.4640494490072,44.457360043051],[5.4644276220352,44.447890408205],[5.496803836369,44.438493779503],[5.4936153322299,44.428217653577],[5.4865672289608,44.429310933518],[5.4764846044694,44.419722107544],[5.4507590745848,44.430873511581],[5.4338571063313,44.433224179441],[5.4185330627929,44.424944615913],[5.422756262532,44.416770650479],[5.434309527365,44.409479438419],[5.4430201938352,44.391233871018],[5.4423608910239,44.381659799255],[5.4351137570212,44.37707693084],[5.4344154288602,44.36962646376],[5.4629658844687,44.367052180352],[5.4679488171996,44.352676849629],[5.4824720338071,44.349605960068],[5.4930701487957,44.337173950444],[5.5135447821727,44.347485508397],[5.5398634524253,44.342637263297],[5.5373655887575,44.333521248655],[5.5491114786402,44.330396465555],[5.5738598675994,44.333940368466],[5.5868917748447,44.332226010325],[5.6171385399181,44.332478533509],[5.6269152221035,44.334764537726],[5.6315982014425,44.32830571643],[5.6138324838557,44.316139439714],[5.6079060792589,44.306669558882],[5.6377527896773,44.29968895608],[5.6332659808825,44.282119871541],[5.6467811994158,44.267088776629],[5.6752912853484,44.275852112257],[5.6865615009091,44.266921017987],[5.6753443584242,44.258110993228],[5.6726438758953,44.245665214395],[5.6813154432669,44.232890979586],[5.6760207339785,44.212146588276],[5.6864432188187,44.197157935534],[5.6760358633349,44.191428664539],[5.6515861240321,44.189572730485],[5.6522929653271,44.185411124162],[5.6436911140627,44.172641360479],[5.6469586945897,44.166287300205],[5.6626325073952,44.16686426058],[5.6827091460673,44.163217461898],[5.6786089032088,44.146091300526],[5.6679496679388,44.148873764468],[5.65770809672,44.147529418679],[5.6311399737751,44.150576623162],[5.6395945851702,44.167581524],[5.6162160024561,44.181069460057],[5.6020555143928,44.191496296599],[5.5962058311559,44.187648959302],[5.5761919645305,44.188037035508],[5.5643706424911,44.170901794193],[5.5829754941585,44.157625987959],[5.5695065039633,44.148099520416],[5.5513311325106,44.149791971653],[5.5439848356077,44.136389912148],[5.5329588653579,44.130053463575],[5.5197573760784,44.126616149895],[5.5048243383524,44.116270397321],[5.4987864391759,44.115716677493],[5.4547151332789,44.119226133429],[5.4492512328028,44.124591922526],[5.4472805287304,44.135994708471],[5.4369459430348,44.142812945214],[5.4357509062277,44.152249650949],[5.3905234132549,44.1534251894],[5.3832371388833,44.155284811726],[5.3864765223646,44.1769070133],[5.3830416498971,44.198796138337],[5.3845269211658,44.20104933819],[5.3540415690827,44.213431973111],[5.336784174291,44.20389269414],[5.3183111725222,44.209869282984],[5.3037098672957,44.206011143284],[5.2911909842134,44.214933969307],[5.2565049248197,44.230055506],[5.2404514324301,44.230825507739],[5.2381459551442,44.213233409548],[5.2046138867346,44.215116852293],[5.1735074807317,44.2219664549],[5.1548996659898,44.230941470835],[5.1516592069293,44.23772859876],[5.1615500254058,44.245588822308],[5.1571364176122,44.267225182448],[5.1474716753569,44.269525185767],[5.1497309928727,44.282086494235],[5.1672051148975,44.292050008972],[5.1726899918655,44.309391119528],[5.1664353137721,44.314853482023],[5.1524172226752,44.307683682999],[5.1546757377907,44.301844910979],[5.1214657621262,44.287480229186],[5.1078521429136,44.280398126188],[5.0765144884036,44.284084169033],[5.0605607254823,44.308137131551],[5.0384946811178,44.299637776655],[5.0218466033995,44.295587171529],[5.0069116240356,44.287554489231],[4.9814530758182,44.284833474448],[4.9598922113805,44.274192870866],[4.935492573713,44.264314996193],[4.9175325402435,44.260348620291],[4.9060631576886,44.260294315057],[4.8961483935046,44.264431155121],[4.8737563985909,44.25925825523],[4.845368774508,44.241470533268],[4.8266501157802,44.228322408488],[4.814089831112,44.232314781729],[4.8126620207402,44.257716427139],[4.8052938582648,44.268723026395],[4.8028804076615,44.296593704504],[4.7991000020835,44.303525444918],[4.7825467521402,44.315582694107],[4.7622549890071,44.325381622419],[4.7201274920268,44.326711236709],[4.7130169314739,44.320649375535],[4.6790253292764,44.320490236187],[4.6506111734968,44.329803148128],[4.653662160064,44.297280366126],[4.649227423465,44.270359808636],[4.641962943496,44.273967232879],[4.6380600403344,44.282964739036],[4.6288231783395,44.284004141308],[4.6181459353598,44.278542099268],[4.6068181251102,44.290471804776],[4.5869814679806,44.29459622458],[4.574187229155,44.300751054654],[4.5586960480886,44.302442886009],[4.5444682300368,44.320766940178],[4.5326208269687,44.32252533633],[4.5178637257565,44.329927083074],[4.503538697272,44.340187516986],[4.484186331178,44.337581914669],[4.4761161664256,44.34074524217],[4.4576163712243,44.341635623893],[4.4508857895897,44.33261714008],[4.4492717103226,44.304914782152],[4.4506900513602,44.297286859459],[4.440502356745,44.284053476816],[4.4218910835178,44.287324346637],[4.3989780395897,44.288943564372],[4.3934072251798,44.293647114857],[4.3907812808888,44.303051306396],[4.4032085466386,44.333895573125],[4.3941986915176,44.345264673242],[4.3865260888309,44.346613937013],[4.3667775642003,44.339497579716],[4.3360706324228,44.339519174094],[4.3217239441113,44.323989000128],[4.3044280048901,44.315234251029],[4.2884228053033,44.31465771441],[4.2894096266193,44.293214668623],[4.2766179866697,44.274252680812],[4.2588499153827,44.264783733394],[4.2413235022379,44.270096446791],[4.2164426737394,44.288852848267],[4.1867071328058,44.29968541211],[4.1777450676527,44.317879259785],[4.1548869300058,44.31262212801],[4.1428714788751,44.313351716383],[4.1403038447089,44.327883881292],[4.1267455749949,44.337730884113],[4.1125125628157,44.329490022147],[4.1039911697566,44.333899706452],[4.0716270663138,44.327298770679],[4.0514566440182,44.317321809072],[4.0368667860025,44.330771008666],[4.0450038312264,44.333082309228],[4.0531535999561,44.340968920772],[4.055527118005,44.365626171449],[4.0529853320038,44.378694159984],[4.0437442732688,44.384550041392],[4.042468868612,44.39464402593],[4.0572129135807,44.393348439495],[4.0684449498584,44.405111736232],[4.0561040289114,44.414335993335],[4.0354823981467,44.420090870159],[4.0464583808932,44.432710617884],[4.0375991394785,44.445719563488],[4.0232058055546,44.445573236432],[4.0149839677909,44.454514219975],[3.9981617468281,44.459798467391],[3.9875441966947,44.473361271665],[3.985747412107,44.487924045953],[3.9873321701777,44.499162516354],[3.9837035025138,44.510167633816],[3.9766536412959,44.516689836275],[3.9753657955514,44.523650580786],[3.9657451606381,44.537497086144],[3.9608749832371,44.554803732187],[3.9451514993013,44.573790000095],[3.9284831974258,44.569998826159],[3.9207367872473,44.575746388916],[3.9191671077331,44.585245092622],[3.90517074571,44.592708958301],[3.9083038945979,44.606615580322],[3.8985315708048,44.613411802763],[3.8926148288923,44.623030105672],[3.8947423692172,44.651129115275],[3.882909471786,44.660088831897],[3.8732699495096,44.678201691122],[3.8845476207292,44.697347879776],[3.8696426954409,44.696962680173],[3.8718913936808,44.705396507123],[3.8615128126047,44.71201694644],[3.8677916785686,44.728142672276],[3.8762993159981,44.731800448649],[3.8754615107331,44.740626944691],[3.8625310211191,44.743866105932],[3.8365590308337,44.747847636802],[3.8304555521813,44.756161500223],[3.8428722625525,44.767659869676],[3.841603226393,44.772129900378],[3.8301463157408,44.775710594028],[3.8198835993274,44.772685233514],[3.8121315885881,44.766032837865],[3.8033308935883,44.770414179887],[3.8032312316337,44.781579343618],[3.7794867433517,44.79731064671],[3.7587613653652,44.805576543778],[3.7624285152172,44.810666360605],[3.7526807081682,44.82097908395],[3.7406494702404,44.838697356604],[3.7228844822867,44.830986703517],[3.7003857822671,44.836813194859],[3.6954389564378,44.830958625259],[3.6663623630222,44.828776303359],[3.6574209674758,44.836124356852],[3.6718167758914,44.843382404889],[3.6704785324924,44.850864431429],[3.6595224161061,44.86994134545],[3.6423461696965,44.878382169756],[3.6264517258551,44.880253899231],[3.6147496711134,44.874174272057],[3.6082755428246,44.879331218549],[3.5943335024029,44.875433384901],[3.5980348128056,44.859504969144],[3.5920659249124,44.84796463101],[3.5893552432085,44.832194014444],[3.578465058473,44.825696757681],[3.5745418907117,44.83460991769],[3.5638205108562,44.832831791958],[3.5615758039452,44.824976812591],[3.5397515164373,44.828176022752],[3.5056459727137,44.823846663279],[3.4948664240388,44.815405935965],[3.4909959832186,44.808474309867],[3.478809589921,44.809446829457],[3.4757711698307,44.815370629667],[3.4570624789322,44.833777540962],[3.4541989644633,44.844563734203],[3.4416742987403,44.854449680958],[3.4386254407679,44.86082184192],[3.4357050101121,44.88024496334],[3.417976841379,44.900767433551],[3.4192590880448,44.908428284947],[3.413833246774,44.919859843574],[3.4149529202982,44.932631887178],[3.412832200087,44.944841611062],[3.4045530849223,44.956400427592],[3.3969930219391,44.958577768116],[3.3863677767162,44.952742049715],[3.3713550433617,44.960250089988],[3.3703185777492,44.96998390468],[3.3613476310625,44.971408091786]],[[4.8881212108854,44.331685388726],[4.8816338901906,44.324867070891],[4.8898043773976,44.314637092176],[4.8895301353902,44.304153097826],[4.9221541568202,44.308786460381],[4.9451171535381,44.304930431589],[4.9592140611525,44.300383345912],[4.9785833048477,44.29746123871],[4.9872903058308,44.293201871035],[4.9931295821934,44.314275867797],[5.0133769832902,44.326136687081],[5.0090024588591,44.333764157861],[5.0232851187488,44.345948323084],[5.0217054810597,44.35674765583],[5.0270113166527,44.362835272711],[5.0520104655825,44.364657329845],[5.0715584929227,44.377495636793],[5.0708829483659,44.383226380932],[5.0450881649883,44.38222013058],[5.033568721145,44.391088844502],[5.0157545106617,44.392767137778],[5.0133020500209,44.405342926953],[5.0187537016752,44.415979484324],[5.0010692090687,44.412604850416],[4.9886124577738,44.423200264487],[4.9786944339347,44.423476108149],[4.9704375593477,44.431367227183],[4.960461816094,44.420048061058],[4.9185138149855,44.407786865574],[4.9123797297803,44.399635600585],[4.9117660520568,44.387044638589],[4.9066213399272,44.374101025322],[4.893168871015,44.367875394193],[4.8906819005659,44.359781959098],[4.8753963679389,44.351439190756],[4.8796465016088,44.345346527391],[4.8953267719183,44.338062405104],[4.8881212108854,44.331685388726]]]},"properties":{"code":"84","nom":"Auvergne-Rhône-Alpes"}},{"type":"Feature","geometry":{"type":"MultiPolygon","coordinates":[[[[6.9483326980915,44.654818187455],[6.9545132491635,44.636224928214],[6.9668199032047,44.625347388492],[6.9507674204422,44.619841837282],[6.9449335028933,44.605789563959],[6.9383975462678,44.603747763937],[6.9327380313786,44.592705761063],[6.9335092809034,44.5759534554],[6.9219454035638,44.570243826413],[6.9132069817362,44.558829270084],[6.876030406824,44.55015646598],[6.8698392887424,44.536836939535],[6.8584936249176,44.534359207877],[6.854014437248,44.52912511427],[6.8612281786649,44.503421026182],[6.8819639305182,44.477256328072],[6.9063376727978,44.466843845236],[6.9110962932443,44.452367703384],[6.9371328757365,44.438869491063],[6.9445579172439,44.432057527562],[6.9239709413721,44.422877906287],[6.9179670246858,44.427399028125],[6.9028825840578,44.420453193274],[6.8928683040571,44.420779824329],[6.8956192908931,44.40850443666],[6.8943641862255,44.397964299149],[6.8965054422432,44.374301434879],[6.8874351607458,44.361051257141],[6.9039405145375,44.358363946255],[6.922408948521,44.348259672782],[6.9264745551235,44.334748792521],[6.952951586736,44.317556187214],[6.9606383114524,44.308313554754],[6.956527244135,44.298637866463],[6.9746845616164,44.284947324084],[6.9818271258487,44.286410035391],[6.9934466941361,44.280889629925],[6.9961055050865,44.274898557636],[6.9971354940846,44.251969663265],[7.008058899486,44.236434519326],[7.0236065351574,44.234002611242],[7.0309527146887,44.227886412564],[7.0423543174862,44.225341715295],[7.071038657434,44.232947084937],[7.0875099114445,44.228292359933],[7.0956034766404,44.220998156705],[7.1122287931144,44.217330653519],[7.1410513675592,44.200999432021],[7.1597408386494,44.20620668921],[7.1889131681001,44.197800735913],[7.1936149196336,44.187096791929],[7.2077263762825,44.179359647414],[7.2188636397203,44.168943578203],[7.2330706376379,44.171847122805],[7.2433604024762,44.16824934948],[7.2485713354452,44.158510912489],[7.2627871994961,44.148031915773],[7.2819657633804,44.143448609313],[7.3094385951796,44.145823690919],[7.319723239617,44.142984830429],[7.3441996623578,44.145160179669],[7.3486515313978,44.132703415252],[7.3560379859181,44.120862631994],[7.3678650497535,44.116393672544],[7.3862710914984,44.123786171069],[7.402623982354,44.120705927946],[7.4269527801501,44.112874801646],[7.4299229881381,44.12780018313],[7.4353553212408,44.12936252164],[7.457603190617,44.126386684548],[7.4877154419517,44.135762163943],[7.5057396587933,44.143648852302],[7.520182785703,44.137674317137],[7.537290343427,44.145959889905],[7.5567907106942,44.146921089934],[7.5730685064726,44.152945056661],[7.6145604124219,44.149672411542],[7.6272700685025,44.158689779815],[7.6300545159959,44.170243633498],[7.6366204125639,44.177106922757],[7.645279607809,44.177974572433],[7.6845890381135,44.174017398395],[7.6809496805966,44.164264593246],[7.6708532380976,44.153736855882],[7.6785361248798,44.145890169308],[7.6665952665469,44.130757105938],[7.6745231655973,44.117978245486],[7.687962616314,44.110091318983],[7.6966096855559,44.097734290199],[7.7119543533479,44.088263855715],[7.7169378581589,44.081762896271],[7.7140726367423,44.065430655301],[7.7040230585525,44.0525085058],[7.7000270318339,44.040791675149],[7.6898090293654,44.039470511681],[7.6782822841591,44.03329165478],[7.6649824687263,44.030663880807],[7.6618347607452,44.017913762433],[7.6702052888494,43.998468338078],[7.6485982666394,43.974109522666],[7.6401015316808,43.971240651171],[7.6155485013064,43.957789271068],[7.5980648513608,43.957024140012],[7.5836834071779,43.952447983137],[7.5671101389754,43.943674367953],[7.5707221149432,43.937343618185],[7.5682448275089,43.923261011537],[7.5599292736857,43.914444652084],[7.5628129682105,43.901908468635],[7.5592240305265,43.89729711992],[7.5360791029785,43.892182868868],[7.5105146453694,43.881552779572],[7.5012119292534,43.874828789654],[7.4954411094938,43.864355738536],[7.4986078220042,43.846177765064],[7.5073719223254,43.841680148497],[7.5102522518857,43.828199938911],[7.5187225864577,43.802507945967],[7.5285185561398,43.790517639429],[7.5247262568589,43.784879584787],[7.5117948400642,43.781115025816],[7.5114975854043,43.776215035435],[7.4902105843582,43.767195024672],[7.4759133369426,43.750794270454],[7.4597361031449,43.7600397197],[7.4466232736677,43.751857229949],[7.4372257692862,43.751597325308],[7.4122682542985,43.734386932687],[7.4156350290343,43.725913755066],[7.4064566044271,43.71962940636],[7.3979400485547,43.718906163039],[7.3832708147641,43.722581448981],[7.3693528634512,43.719373461503],[7.3585182511974,43.721877364751],[7.3511879110757,43.715209965617],[7.3361061972735,43.710332184327],[7.3296137110006,43.701909777531],[7.3336420480539,43.693576495112],[7.3353474080935,43.67821377735],[7.3263641460951,43.674107370674],[7.3202887345678,43.69132875931],[7.3253410136934,43.700155817322],[7.3147161986497,43.70653561017],[7.3068448365673,43.697863928793],[7.308767626144,43.691876117984],[7.2972030752041,43.686139330004],[7.2851740716363,43.694320779226],[7.2624291447135,43.69425697459],[7.2418855125179,43.688481372627],[7.230632479809,43.678552633914],[7.2258833224864,43.662250909247],[7.2064521654727,43.645639308042],[7.1945395872153,43.657918311572],[7.1792252554182,43.655921466708],[7.1676659649864,43.657401670267],[7.1510535551671,43.649273147891],[7.1371975190968,43.634490533121],[7.1264731964483,43.605277906363],[7.1258107141258,43.594574055426],[7.1296893171876,43.58264162915],[7.1255471645856,43.575784139356],[7.1392394995248,43.564445498702],[7.1347862801153,43.555745223246],[7.1441717937997,43.552949923404],[7.1385034267534,43.545620722537],[7.1191937177542,43.544452103717],[7.1216246082512,43.554189213515],[7.1145834190314,43.565833873571],[7.1012671442927,43.5706815908],[7.0843069068568,43.569546459525],[7.0675647780773,43.561637194767],[7.0559473239941,43.547965476969],[7.0404439376582,43.541582782416],[7.026613869621,43.548604342901],[7.0148286615711,43.550852905577],[6.9872491529001,43.548425210345],[6.9718325905645,43.545451297616],[6.9521643765802,43.53471627255],[6.9383636746132,43.516390841291],[6.9383938694233,43.508638111929],[6.9547512806261,43.504724793903],[6.9489893541651,43.493480863369],[6.9488401316243,43.485496928717],[6.9326931753823,43.484349210212],[6.9337211159516,43.480065494401],[6.923867212973,43.470960837627],[6.9243598479502,43.464066349035],[6.9179721528571,43.447738536354],[6.9051351716853,43.445353094761],[6.8938948378079,43.436171115171],[6.8918037687118,43.428580015191],[6.8745353033552,43.426537753906],[6.8652393715348,43.433930920766],[6.8569996758254,43.430477732013],[6.8594727968345,43.418159528215],[6.8550478015615,43.411429429877],[6.8425087566418,43.416314042768],[6.8267609493565,43.417371848056],[6.7988544528977,43.413719926554],[6.7896945798181,43.408266782123],[6.7634118379603,43.424488987703],[6.750657595625,43.420845307432],[6.7398086751923,43.41288238776],[6.7295091701175,43.397245962638],[6.7263132753371,43.383104485014],[6.7143312441348,43.36790258606],[6.7165464557638,43.347490862069],[6.7099603836418,43.344598306055],[6.6816193520365,43.340959774178],[6.6689910907851,43.33292829161],[6.6659564383834,43.31821983472],[6.6504467498051,43.30930360706],[6.6286232743314,43.304542794427],[6.6212969072192,43.296033806007],[6.6017039878442,43.285829711816],[6.5899812585712,43.28243883097],[6.5838742224265,43.277308105612],[6.585990659385,43.264473629553],[6.5934629712796,43.262265776308],[6.6234880954753,43.265350514242],[6.6457979042857,43.273835088392],[6.662121282463,43.264909792407],[6.6695313240363,43.268462885728],[6.6704136972555,43.27640069302],[6.6773068762378,43.278794827575],[6.6972545497172,43.265497283834],[6.6904226539265,43.253768484541],[6.676365540846,43.244474024822],[6.6685654818411,43.245554369751],[6.6635799631008,43.238043384914],[6.6626657632275,43.217572199696],[6.677034229563,43.197186519392],[6.6593271741191,43.195930208865],[6.6420225769795,43.183734132211],[6.6355350265918,43.172509449193],[6.6236623943555,43.165300606932],[6.612901777714,43.165892299234],[6.6004702842875,43.182582281991],[6.5919303129754,43.185477402074],[6.5596377554811,43.188632638495],[6.541396288166,43.182330817397],[6.534084190046,43.172782676664],[6.5363193464327,43.165106616411],[6.5228061651254,43.165323967594],[6.5087687818106,43.156648567314],[6.4934958461812,43.150223730387],[6.4883740268723,43.152806138202],[6.4641477513921,43.157528246642],[6.4492154874295,43.153387552888],[6.44429973474,43.145456324914],[6.4290707640808,43.151423030929],[6.4051586594236,43.148994996899],[6.3875680181733,43.144900254259],[6.3802996760452,43.138559151429],[6.3687216170301,43.136975338721],[6.3597633175514,43.119904355977],[6.3598808549228,43.105074542854],[6.368364474458,43.102269062044],[6.3682566796679,43.089914872597],[6.3492877575107,43.088191211862],[6.3325137465072,43.091093655786],[6.3253619900804,43.095399033313],[6.3166670705359,43.106166407372],[6.3092405738884,43.108321309527],[6.2882203945084,43.108702218392],[6.2881595756018,43.114200760657],[6.274941161023,43.120741066834],[6.2652965375011,43.121041023451],[6.2343366461075,43.113014447828],[6.2080853497602,43.116444167346],[6.2007847463615,43.115790863382],[6.1839926131867,43.108536285948],[6.1704563295787,43.0997558313],[6.1598371974529,43.088451636416],[6.150270989362,43.064453888882],[6.1499595681806,43.045856056649],[6.1531565349953,43.035245722363],[6.147899852463,43.026960466647],[6.1368994767253,43.030616602392],[6.1339953631425,43.036214235727],[6.120936317207,43.032186182571],[6.115004757531,43.034956601301],[6.1025906616279,43.028782647513],[6.0918311311331,43.036774442924],[6.1047189809048,43.041956746957],[6.1167138627143,43.039240063655],[6.1281920087398,43.042671102624],[6.1323295631249,43.059513879555],[6.124051799264,43.07930650726],[6.1139934267722,43.083654682725],[6.0812978668083,43.087226281584],[6.0608714971149,43.081747669597],[6.0314352379439,43.07747526022],[6.0215343544984,43.078256714006],[6.0168236605891,43.083635285965],[6.0234652560844,43.094811520978],[6.0050157080904,43.103799383815],[5.9762269212434,43.10757701689],[5.9662730514685,43.1056392255],[5.9412493838579,43.107661088538],[5.9257873894364,43.103970758155],[5.9343359139287,43.118604366719],[5.9074795895659,43.118881530843],[5.8890107013515,43.11005127935],[5.8868360567952,43.103450269366],[5.901008542602,43.103996533879],[5.909107117861,43.10046149114],[5.8947710571836,43.081712418128],[5.9095702721446,43.079393797213],[5.9170857708081,43.085825411251],[5.9289528079791,43.082919298522],[5.9376580436388,43.08457851954],[5.9509582392784,43.076765254429],[5.943881221795,43.066409791665],[5.9366458228053,43.071725835864],[5.9285981186439,43.071716453532],[5.9112894628203,43.06578413673],[5.8984664585895,43.07758725099],[5.8871334844754,43.077225735618],[5.8657541086125,43.059881682488],[5.8574553138035,43.046618874503],[5.8276382705234,43.05034932291],[5.8167124624351,43.062314625126],[5.7941055326647,43.068774233408],[5.8045644441502,43.078283139099],[5.8105134830279,43.092326111559],[5.8127322115996,43.109367157095],[5.8069507607973,43.115679350616],[5.7910184437069,43.112424881887],[5.7886661988609,43.116377367101],[5.7744948217719,43.116904330683],[5.7736877374351,43.124358146456],[5.7806944360543,43.129636959482],[5.7712544214782,43.138932344182],[5.7522954712541,43.13316137548],[5.7258497190477,43.136527153376],[5.7190149570316,43.147273734952],[5.6948752166924,43.143589707468],[5.682675442198,43.160132349422],[5.69476068803,43.168021818342],[5.6924387435758,43.174870299627],[5.6845946967002,43.180061736494],[5.6718787324219,43.179269594604],[5.6525593241702,43.187314477783],[5.6383239998299,43.189173766465],[5.6172174635767,43.18371473989],[5.6098389569561,43.17368424192],[5.6146454833389,43.169198477141],[5.6008948125683,43.162545513212],[5.5714983888382,43.173555880459],[5.5479598370767,43.196023901121],[5.5499085142965,43.207367827769],[5.5369302937792,43.214490076169],[5.515763799187,43.203024207623],[5.5100611678748,43.197689816439],[5.5002885068597,43.196790895695],[5.4865704178615,43.204153568372],[5.468036914708,43.20872417933],[5.4461877784161,43.210231385585],[5.4256485097191,43.203784469675],[5.4033807899197,43.21282384953],[5.3910567260333,43.212122982456],[5.3636491661807,43.207122106689],[5.3456097729721,43.212497555779],[5.3425610087084,43.216257869717],[5.3483543737945,43.2298241001],[5.3725248187308,43.245077650705],[5.3760469740713,43.255156912202],[5.3673730695884,43.268907750223],[5.3456836221411,43.282366222064],[5.3629864899254,43.301953092747],[5.3644147192511,43.312140169969],[5.3620502253915,43.321960251309],[5.3556316786832,43.322291979926],[5.352523739124,43.332822871057],[5.3431794461906,43.339096162428],[5.341020887781,43.344783149914],[5.3173099513093,43.355086515457],[5.3110302222328,43.360879997437],[5.2885149096553,43.357326659023],[5.2703975054675,43.344652472176],[5.2576422113991,43.33785745169],[5.2405905351428,43.331712598278],[5.2213339498192,43.328358899356],[5.1954386570072,43.33000275989],[5.1774744273398,43.333616525803],[5.164476902229,43.327323286526],[5.1482109690618,43.326418360361],[5.1351880880297,43.329222149882],[5.094781174269,43.329270900706],[5.0815876357356,43.327877052599],[5.0627982236147,43.331087967135],[5.0539150268677,43.324272099372],[5.0410400764889,43.327284831154],[5.0190482280859,43.342937227035],[5.0242965902058,43.355559161915],[5.017109588485,43.35694335664],[5.0113980677591,43.368027586573],[5.0001976645609,43.377116357469],[4.9876375735659,43.391776901932],[5.0010677938316,43.398215886274],[4.9955040109031,43.403478734365],[4.9776421775338,43.407406133291],[4.9730488082218,43.420933908913],[4.9677103819671,43.426100332678],[4.9494334707518,43.429224186554],[4.941216499844,43.428254043212],[4.931376951317,43.433157232314],[4.9106063278399,43.427280115584],[4.9063533880916,43.419737286499],[4.8865877345916,43.412880564295],[4.8839595728386,43.419515397166],[4.8674100871644,43.432331363619],[4.8773029521565,43.410513204152],[4.8668499113366,43.404678136755],[4.8291209117113,43.428264665696],[4.8244333765645,43.424394088096],[4.8614681256348,43.40076989363],[4.8500135070493,43.398836197988],[4.8416101405785,43.404034087959],[4.8358563366124,43.398039616459],[4.8551101946662,43.387877558547],[4.8494840577119,43.380013571741],[4.8569334158861,43.370915251699],[4.8667320208315,43.369607444541],[4.8737024584045,43.360848282232],[4.9022342998273,43.370982432633],[4.89252239213,43.360161697152],[4.8550448910375,43.332618516509],[4.8481410380544,43.333670742325],[4.8330340586153,43.32986959949],[4.8231844261886,43.335956971178],[4.8019643201692,43.343146781855],[4.783356801758,43.347189434094],[4.7595949251318,43.349936079368],[4.7177423514311,43.350306361918],[4.7057078087084,43.34779914182],[4.6617842756445,43.346410527778],[4.6380886588302,43.351001855561],[4.6131027136534,43.353767124036],[4.5858024446726,43.360071509782],[4.5627978195916,43.372134942713],[4.5556106083519,43.38282276464],[4.5627131374003,43.392243971332],[4.5735916278341,43.393577384459],[4.5876982001696,43.400712121388],[4.5929514695631,43.409939117692],[4.5880988195327,43.422705156053],[4.5731686445663,43.437345552555],[4.5549165862997,43.446213275115],[4.5347167281545,43.451636616845],[4.5163610320847,43.454715093233],[4.4652664495204,43.457150995927],[4.4417093298303,43.45488352219],[4.4334372492981,43.451162718975],[4.4045865202341,43.448120304403],[4.3820421638572,43.45227212971],[4.3037217279638,43.456772476562],[4.2302808850321,43.460183661653],[4.2311705681976,43.47675937846],[4.2381030309066,43.497625146899],[4.2586419540305,43.507538672405],[4.271416895472,43.508069960206],[4.2976898160141,43.515329111265],[4.3051324465276,43.520794514252],[4.3204919293874,43.525482210334],[4.3227085568643,43.530446651372],[4.3095227640281,43.543279128578],[4.3164310144209,43.544330277799],[4.3341326001686,43.535451246643],[4.3536437981366,43.547390132754],[4.3651362956496,43.547157120782],[4.3806768784461,43.55254245629],[4.3870870214048,43.560476830234],[4.4093533628433,43.561126852889],[4.4153195295637,43.572538108822],[4.404416776755,43.574366053053],[4.4255399426089,43.585225258609],[4.4433120956209,43.583144847291],[4.4606813332323,43.589260601197],[4.4752352404423,43.60829610571],[4.4668068635081,43.615205555036],[4.4545256952964,43.611392063023],[4.4397478336794,43.610672750672],[4.4270341666761,43.620674791673],[4.4382159894455,43.644374718144],[4.4475788905709,43.659307469452],[4.4559475264435,43.667415945459],[4.4754954502059,43.671096153803],[4.4756623542909,43.684463819817],[4.4872344746833,43.699241399194],[4.503671690096,43.702259072675],[4.5243901803315,43.702131030559],[4.5398466434949,43.707275616451],[4.5527787964313,43.701311173254],[4.5818853309897,43.696368547688],[4.5930346527266,43.68745966779],[4.605829920983,43.686077262962],[4.6276618120935,43.690542678491],[4.6130400270515,43.714296691071],[4.6136350841342,43.729822310127],[4.6227171190074,43.743237369574],[4.628818965927,43.759861933174],[4.6512435847762,43.782275197677],[4.6548263114857,43.806405017468],[4.6522767209675,43.816837884851],[4.6424185010062,43.831436886337],[4.6501517057694,43.839124011369],[4.6662999036899,43.844776915402],[4.6586664103492,43.853223756034],[4.6480099815874,43.851229485733],[4.6419145398807,43.867476572594],[4.6566482355099,43.874778903832],[4.6654377200626,43.875147404443],[4.6905462810021,43.883898624023],[4.7074943864756,43.895550919044],[4.7037984091552,43.899340665402],[4.7233684641772,43.905955710295],[4.740099224056,43.919678920657],[4.7390596940896,43.92406219253],[4.7499895249126,43.932181836453],[4.7687787417118,43.933801125308],[4.7790210940203,43.937894495052],[4.7971529885585,43.956718817037],[4.8079998756015,43.960029108371],[4.8150547522655,43.967622474105],[4.8101475881401,43.97704355585],[4.8159834779277,43.988799971648],[4.8319955437626,43.985260560051],[4.8421001716407,43.98647354378],[4.8455501032842,43.99667711759],[4.8433326670726,44.009857987382],[4.8376764645108,44.014939590778],[4.8211405354756,44.016469245528],[4.8161675560385,44.032144996975],[4.8080065523425,44.03972336512],[4.7891182892738,44.052194281428],[4.7879793576032,44.065056776494],[4.7578505502116,44.077246976599],[4.7608553902053,44.08629669027],[4.7548761078409,44.088309298713],[4.7301353625795,44.079023395797],[4.7196389371655,44.086665255194],[4.7074595244331,44.103669745076],[4.7070128409472,44.113682146579],[4.714318820751,44.137803248451],[4.7188928038989,44.14449718833],[4.716116694835,44.165974548714],[4.7220708851492,44.18742070852],[4.7038951813692,44.197612213118],[4.7097117846241,44.206925388326],[4.7018165185921,44.216070926665],[4.6836408656973,44.21242318348],[4.6726658505102,44.216806161879],[4.6784293717396,44.229429565698],[4.6748406183712,44.238546852911],[4.6540654761357,44.254338013491],[4.649227423465,44.270359808636],[4.653662160064,44.297280366126],[4.6506111734968,44.329803148128],[4.6790253292764,44.320490236187],[4.7130169314739,44.320649375535],[4.7201274920268,44.326711236709],[4.7622549890071,44.325381622419],[4.7825467521402,44.315582694107],[4.7991000020835,44.303525444918],[4.8028804076615,44.296593704504],[4.8052938582648,44.268723026395],[4.8126620207402,44.257716427139],[4.814089831112,44.232314781729],[4.8266501157802,44.228322408488],[4.845368774508,44.241470533268],[4.8737563985909,44.25925825523],[4.8961483935046,44.264431155121],[4.9060631576886,44.260294315057],[4.9175325402435,44.260348620291],[4.935492573713,44.264314996193],[4.9598922113805,44.274192870866],[4.9814530758182,44.284833474448],[5.0069116240356,44.287554489231],[5.0218466033995,44.295587171529],[5.0384946811178,44.299637776655],[5.0605607254823,44.308137131551],[5.0765144884036,44.284084169033],[5.1078521429136,44.280398126188],[5.1214657621262,44.287480229186],[5.1546757377907,44.301844910979],[5.1524172226752,44.307683682999],[5.1664353137721,44.314853482023],[5.1726899918655,44.309391119528],[5.1672051148975,44.292050008972],[5.1497309928727,44.282086494235],[5.1474716753569,44.269525185767],[5.1571364176122,44.267225182448],[5.1615500254058,44.245588822308],[5.1516592069293,44.23772859876],[5.1548996659898,44.230941470835],[5.1735074807317,44.2219664549],[5.2046138867346,44.215116852293],[5.2381459551442,44.213233409548],[5.2404514324301,44.230825507739],[5.2565049248197,44.230055506],[5.2911909842134,44.214933969307],[5.3037098672957,44.206011143284],[5.3183111725222,44.209869282984],[5.336784174291,44.20389269414],[5.3540415690827,44.213431973111],[5.3845269211658,44.20104933819],[5.3830416498971,44.198796138337],[5.3864765223646,44.1769070133],[5.3832371388833,44.155284811726],[5.3905234132549,44.1534251894],[5.4357509062277,44.152249650949],[5.4369459430348,44.142812945214],[5.4472805287304,44.135994708471],[5.4492512328028,44.124591922526],[5.4547151332789,44.119226133429],[5.4987864391759,44.115716677493],[5.5048243383524,44.116270397321],[5.5197573760784,44.126616149895],[5.5329588653579,44.130053463575],[5.5439848356077,44.136389912148],[5.5513311325106,44.149791971653],[5.5695065039633,44.148099520416],[5.5829754941585,44.157625987959],[5.5643706424911,44.170901794193],[5.5761919645305,44.188037035508],[5.5962058311559,44.187648959302],[5.6020555143928,44.191496296599],[5.6162160024561,44.181069460057],[5.6395945851702,44.167581524],[5.6311399737751,44.150576623162],[5.65770809672,44.147529418679],[5.6679496679388,44.148873764468],[5.6786089032088,44.146091300526],[5.6827091460673,44.163217461898],[5.6626325073952,44.16686426058],[5.6469586945897,44.166287300205],[5.6436911140627,44.172641360479],[5.6522929653271,44.185411124162],[5.6515861240321,44.189572730485],[5.6760358633349,44.191428664539],[5.6864432188187,44.197157935534],[5.6760207339785,44.212146588276],[5.6813154432669,44.232890979586],[5.6726438758953,44.245665214395],[5.6753443584242,44.258110993228],[5.6865615009091,44.266921017987],[5.6752912853484,44.275852112257],[5.6467811994158,44.267088776629],[5.6332659808825,44.282119871541],[5.6377527896773,44.29968895608],[5.6079060792589,44.306669558882],[5.6138324838557,44.316139439714],[5.6315982014425,44.32830571643],[5.6269152221035,44.334764537726],[5.6171385399181,44.332478533509],[5.5868917748447,44.332226010325],[5.5738598675994,44.333940368466],[5.5491114786402,44.330396465555],[5.5373655887575,44.333521248655],[5.5398634524253,44.342637263297],[5.5135447821727,44.347485508397],[5.4930701487957,44.337173950444],[5.4824720338071,44.349605960068],[5.4679488171996,44.352676849629],[5.4629658844687,44.367052180352],[5.4344154288602,44.36962646376],[5.4351137570212,44.37707693084],[5.4423608910239,44.381659799255],[5.4430201938352,44.391233871018],[5.434309527365,44.409479438419],[5.422756262532,44.416770650479],[5.4185330627929,44.424944615913],[5.4338571063313,44.433224179441],[5.4507590745848,44.430873511581],[5.4764846044694,44.419722107544],[5.4865672289608,44.429310933518],[5.4936153322299,44.428217653577],[5.496803836369,44.438493779503],[5.4644276220352,44.447890408205],[5.4640494490072,44.457360043051],[5.4587312484193,44.466142946772],[5.463575747607,44.480512627606],[5.4569314822479,44.496235778443],[5.4653894088793,44.500459334817],[5.4735960069771,44.498568843239],[5.479877306738,44.491243239804],[5.5133416154223,44.491125991349],[5.5447008857046,44.482537575762],[5.5624010016641,44.474853738869],[5.5703041972283,44.476754841678],[5.5792007067241,44.471686064395],[5.6036448321495,44.465542446118],[5.618123153083,44.474812657295],[5.6297876074114,44.501187043038],[5.6526558596497,44.499962952183],[5.6645041823511,44.501894932126],[5.6531427146706,44.514831250068],[5.630802337654,44.531597332459],[5.6149927369414,44.532817987531],[5.5972525723721,44.543273639184],[5.5997980521304,44.553941311612],[5.6070190339977,44.568348424227],[5.6257986898421,44.586275880643],[5.6274790368545,44.594965971046],[5.6475161192881,44.612808143065],[5.6496311179712,44.617884606434],[5.6403729488497,44.633825447345],[5.6417177024073,44.65107732796],[5.6544567435058,44.655393257217],[5.6593597358465,44.650663453626],[5.6853621391431,44.649596345809],[5.7260329075738,44.639393999475],[5.7358025109287,44.640415596891],[5.7360131774513,44.649510358823],[5.7511047252626,44.648611621404],[5.748257168346,44.655090844363],[5.7539428619931,44.662710867987],[5.7666311555846,44.655266851559],[5.790623681681,44.653292905762],[5.8064797515589,44.677181975541],[5.8246351320469,44.685278024621],[5.8294720463131,44.692425284611],[5.8271099006445,44.700288039663],[5.8014699513145,44.706777613167],[5.8087945811456,44.712101632921],[5.8177724444737,44.730405199263],[5.8277714297865,44.740086051546],[5.8270981940509,44.759688387455],[5.8371577512142,44.757677183301],[5.8503937497009,44.750747373326],[5.8652264931802,44.75155204943],[5.8794954997212,44.747015345674],[5.8888310649581,44.748803778249],[5.900149637893,44.758315310611],[5.9152344231519,44.754703072251],[5.926812494728,44.757135657325],[5.937984096823,44.763046424986],[5.952471613503,44.76214052281],[5.9555147438847,44.772449015839],[5.9801493330969,44.781181602373],[5.9777793189449,44.790983738721],[5.9537639530916,44.799525853781],[5.9495216336669,44.804527356596],[5.9781993713916,44.818035522208],[5.9961657258664,44.81787407617],[6.0048600553234,44.820439050514],[6.0159331963205,44.835485814051],[6.0302157011626,44.838097758941],[6.0402065129253,44.827867468677],[6.0563403817425,44.815907431783],[6.0653153781591,44.82268480473],[6.0965156572897,44.837489421771],[6.1007058869493,44.84257849233],[6.1166725017074,44.849313192704],[6.1283556561161,44.861901713563],[6.1362266704196,44.864071820118],[6.1490188906075,44.858169876067],[6.1684510585274,44.852242761941],[6.1852192319643,44.853991864943],[6.1963759402105,44.858978334449],[6.2243745547304,44.852494101643],[6.2505425682344,44.852650516632],[6.2581706057376,44.86248397325],[6.2677561761734,44.86950109295],[6.2882129459689,44.874030533685],[6.302850434726,44.873257969643],[6.3192302042703,44.85684625453],[6.3363165518362,44.848370410548],[6.3553625022057,44.854775353601],[6.3507779137165,44.881204072575],[6.3581697523493,44.893778946012],[6.3546140951868,44.923593300625],[6.3588423781754,44.941280796729],[6.3290046114892,44.947315364095],[6.3229180108318,44.953019839313],[6.3285012874077,44.969714464603],[6.3148100239742,44.980185922577],[6.3196573396763,44.994552811249],[6.3182021615637,45.003859362058],[6.2970615457571,45.003365126963],[6.2696990840472,44.998351365091],[6.2517609476002,44.996700081455],[6.2039233205269,45.012471073947],[6.2063284689408,45.026782796498],[6.2200802599652,45.065369735518],[6.2401205372094,45.06771808518],[6.2358324302027,45.087232804381],[6.2296723977867,45.100589085615],[6.2293919345611,45.108749945384],[6.2438305270389,45.117298075856],[6.2544936755586,45.120790168264],[6.2605698000566,45.12684420383],[6.275502630793,45.115299423706],[6.2862810761543,45.110160822134],[6.3019155994585,45.108954317068],[6.3312951655489,45.118123866818],[6.3344836229796,45.122836461323],[6.3629265157708,45.104492035764],[6.3735310876429,45.084151804143],[6.365073385182,45.071290490956],[6.3939107242634,45.0618177275],[6.4002434258614,45.063261148419],[6.4385899722107,45.06258734764],[6.4433986588263,45.055077367768],[6.4535295918669,45.051837207667],[6.4728883939578,45.056011644618],[6.4862360357216,45.056075754404],[6.4893378703322,45.068353912844],[6.4812555476638,45.094138953543],[6.4995275838537,45.10159781596],[6.5104239586159,45.108998029314],[6.5297109874994,45.0985691169],[6.556730767951,45.104079390462],[6.5630788445458,45.11303936929],[6.5765291374542,45.123092743765],[6.5906851893034,45.119010630972],[6.6155462835465,45.121477875934],[6.6299923020059,45.109324963809],[6.6274839517535,45.101215174371],[6.6454471568466,45.085321118769],[6.6452449110874,45.075644489098],[6.6621102280893,45.071636240322],[6.6619665564343,45.054254651103],[6.6697329651003,45.041528589974],[6.6642057859606,45.033852692689],[6.6738842245217,45.019618440205],[6.7208749671212,45.021947970161],[6.7408121549644,45.016732773834],[6.7455184581155,45.012636232743],[6.7511816747145,44.997554388257],[6.7376368487818,44.991489847333],[6.7487248532957,44.985300837089],[6.7500991466522,44.979004278299],[6.7634620292171,44.971216274205],[6.7649436361829,44.959669769983],[6.7530762964187,44.942964787789],[6.760454851589,44.933557259798],[6.7509575667282,44.924736641884],[6.7497507150819,44.907359345497],[6.7707561827724,44.903356119918],[6.778831730714,44.895247653895],[6.7997873639988,44.885790632096],[6.8040834784844,44.877494910069],[6.8286189375326,44.867936372769],[6.8365561972179,44.862113162368],[6.8598658043828,44.852903429339],[6.8837432066014,44.847958551328],[6.9137650533034,44.845420317518],[6.9277645236266,44.859966074683],[6.9336859786803,44.862026116862],[6.9536880142387,44.855488865035],[6.9726101112827,44.846235246901],[6.9838519381402,44.845869843048],[7.0067725151035,44.839316013319],[7.0093160771169,44.826729413865],[7.0217860677102,44.821493498314],[7.0182872220085,44.812302571705],[6.9995699130659,44.789443859689],[7.014173059144,44.780240783682],[7.0247448800861,44.762381967485],[7.0217840296699,44.753151161226],[7.0237266250912,44.741017074034],[7.032722682298,44.727849112916],[7.043680201538,44.71814154062],[7.0657832187637,44.71360393024],[7.0663991317632,44.707135672178],[7.0741932187631,44.69248281361],[7.0771048243018,44.680914951343],[7.0597229739436,44.679959761356],[7.0370906551502,44.689271101061],[7.0237344527351,44.691300223227],[7.0063373453242,44.68821962595],[6.9870611832936,44.690137664959],[6.9763421453374,44.681204625623],[6.9626468064561,44.677766961935],[6.9483326980915,44.654818187455]],[[5.0178344377819,43.469321193939],[5.0379847941255,43.470644268033],[5.0518847547722,43.463560167399],[5.0549690681399,43.453888162229],[5.054121512102,43.442021912977],[5.0611076258685,43.423140307283],[5.0580213222048,43.409552133438],[5.0595684339306,43.403974555677],[5.0703896715519,43.400202593118],[5.0927056002731,43.400605101589],[5.1107078769979,43.404127256643],[5.125776538992,43.400015717235],[5.137266271971,43.400185493623],[5.157534521038,43.409584196466],[5.1828633330337,43.426606568488],[5.1912661780646,43.434900512668],[5.2084471015655,43.445433671054],[5.2203482060614,43.449162229641],[5.2301377569344,43.465078044372],[5.2225521040856,43.483465085916],[5.2175169994984,43.488096323996],[5.2027922080577,43.491173117668],[5.1908429897818,43.486475795117],[5.1824609658291,43.479350075479],[5.1651054168282,43.471767081519],[5.1496876211759,43.457026659088],[5.1321152674543,43.473849327421],[5.123114322047,43.48615366834],[5.1135686679163,43.504660978563],[5.1182092489503,43.518012416527],[5.1086615060731,43.525496816445],[5.0893141543062,43.525515609476],[5.0643299415117,43.527830813843],[5.046434902166,43.522138786534],[5.0322512284114,43.5397685648],[5.0309517808795,43.54682479433],[5.0219939854938,43.55615613908],[5.0132835978236,43.554448679869],[5.0122049007424,43.545526935893],[5.0154635062157,43.529718860201],[5.0024501091134,43.512784134911],[4.9985487475088,43.49810611091],[5.0029037494134,43.486740851749],[5.000857898128,43.474094351803],[5.006004863914,43.469664960408],[5.0178344377819,43.469321193939]]],[[[6.4341485392957,43.013347028571],[6.4339410610688,43.020253759896],[6.4402634234376,43.024842658411],[6.4552030224291,43.02681507814],[6.4702163404405,43.045167505797],[6.5041808620696,43.05334030784],[6.5112885804875,43.046821992697],[6.5047119129479,43.043075249916],[6.4895900424486,43.042642232202],[6.4710212810966,43.01921193325],[6.4616995826693,43.013939106124],[6.4528033958039,43.016843850293],[6.4391012526205,43.004472055456],[6.4341485392957,43.013347028571]]],[[[6.3970913857265,42.992801774792],[6.3850038068943,42.997874748913],[6.3714123570963,42.997142408976],[6.3697195012539,43.001244421426],[6.3824109734744,43.011037691381],[6.4085816077235,43.018603831541],[6.4206661963932,43.013709224929],[6.4069003940727,42.997223596606],[6.3970913857265,42.992801774792]]],[[[6.2440741459649,43.020035297662],[6.2484869352116,43.016627467203],[6.2504533863157,42.999408277823],[6.2265230585799,42.992424259693],[6.2164360797719,42.991108164979],[6.2086710614315,42.98338081093],[6.1978984464393,42.982043008785],[6.1938577077542,42.99020258064],[6.1773879229647,42.996127936721],[6.1645371983983,42.997829141178],[6.1712703057401,43.00620484955],[6.1840052925618,43.008256946209],[6.2016813018254,43.000829346611],[6.2117350144,43.002561912277],[6.2204147969509,43.012437419854],[6.2339910204288,43.011656466491],[6.2440741459649,43.020035297662]]],[[[7.0671175705284,43.513649369297],[7.0361331446075,43.517461440788],[7.0322078648162,43.523439858109],[7.0500971114395,43.522515412284],[7.0708767870982,43.51736504678],[7.0671175705284,43.513649369297]]],[[[4.8881212108854,44.331685388726],[4.8953267719183,44.338062405104],[4.8796465016088,44.345346527391],[4.8753963679389,44.351439190756],[4.8906819005659,44.359781959098],[4.893168871015,44.367875394193],[4.9066213399272,44.374101025322],[4.9117660520568,44.387044638589],[4.9123797297803,44.399635600585],[4.9185138149855,44.407786865574],[4.960461816094,44.420048061058],[4.9704375593477,44.431367227183],[4.9786944339347,44.423476108149],[4.9886124577738,44.423200264487],[5.0010692090687,44.412604850416],[5.0187537016752,44.415979484324],[5.0133020500209,44.405342926953],[5.0157545106617,44.392767137778],[5.033568721145,44.391088844502],[5.0450881649883,44.38222013058],[5.0708829483659,44.383226380932],[5.0715584929227,44.377495636793],[5.0520104655825,44.364657329845],[5.0270113166527,44.362835272711],[5.0217054810597,44.35674765583],[5.0232851187488,44.345948323084],[5.0090024588591,44.333764157861],[5.0133769832902,44.326136687081],[4.9931295821934,44.314275867797],[4.9872903058308,44.293201871035],[4.9785833048477,44.29746123871],[4.9592140611525,44.300383345912],[4.9451171535381,44.304930431589],[4.9221541568202,44.308786460381],[4.8895301353902,44.304153097826],[4.8898043773976,44.314637092176],[4.8816338901906,44.324867070891],[4.8881212108854,44.331685388726]]]]},"properties":{"code":"93","nom":"Provence-Alpes-Côte d\'Azur"}},{"type":"Feature","geometry":{"type":"MultiPolygon","coordinates":[[[[9.2710321280228,41.364959299521],[9.265698545799,41.362164776515],[9.2558829669799,41.368794222327],[9.2602446048541,41.373651229899],[9.273659440522,41.369221791575],[9.2710321280228,41.364959299521]]],[[[9.4022711090103,41.858701678165],[9.4020526477352,41.845844224512],[9.4062743560399,41.822363784172],[9.3941343569793,41.79894215528],[9.3991901775403,41.790143164158],[9.3981451175547,41.778459013889],[9.4073217319481,41.767634723217],[9.4052716742874,41.754575654188],[9.4062185485145,41.73920137245],[9.4013418072307,41.716959615945],[9.4035331655531,41.710840198665],[9.3998192801504,41.69279867],[9.3810879581743,41.688001244821],[9.3723006750494,41.678830164331],[9.3757375815574,41.670619677977],[9.3874913966427,41.657359062003],[9.3850563977806,41.652970458201],[9.3644131875031,41.636179025769],[9.3547387700685,41.640710164794],[9.3476012746477,41.636632418311],[9.3463932296058,41.63002302864],[9.3538271659327,41.626632801378],[9.3463550313306,41.617508503613],[9.3367416523086,41.621538780451],[9.3272049926403,41.616356949796],[9.3082365328383,41.628487552777],[9.3060190567968,41.617470193836],[9.2970016566957,41.610930362027],[9.2883407858234,41.609067528624],[9.2825337896991,41.596415718545],[9.286354138341,41.589453101103],[9.2956793037693,41.583322361133],[9.3083814880745,41.593972713908],[9.3130806771213,41.601132392709],[9.3215169876122,41.604837299741],[9.3350988345063,41.602027547324],[9.3470681679656,41.594390886207],[9.3685744931696,41.596897302353],[9.3533825795291,41.577938443543],[9.3481742396925,41.575388818689],[9.3501715740997,41.566187005133],[9.3408997155844,41.559241730325],[9.3239922254982,41.557236366366],[9.3023216696934,41.545198419563],[9.2875574726946,41.530228755368],[9.2730739945179,41.53019271867],[9.273680106865,41.522517947178],[9.2839183612598,41.520450085063],[9.277308421099,41.506124986587],[9.2688973149711,41.501624751876],[9.2759308530555,41.49643713783],[9.2876523998677,41.494831125938],[9.28400186333,41.477572296911],[9.2772722837641,41.475358221151],[9.2777164179139,41.46495547492],[9.2658821075424,41.465995458816],[9.2429445240833,41.446705574174],[9.223954267893,41.442488841516],[9.2232723456115,41.436025985419],[9.2288969116275,41.425302049177],[9.2281191406951,41.409110517705],[9.2442363338799,41.421181163353],[9.2651023772974,41.428283396377],[9.2591670709159,41.413375395828],[9.2507254948685,41.40960553083],[9.2361643789523,41.393559251695],[9.2331233905073,41.386560178849],[9.2214883823877,41.376328969738],[9.2196789477427,41.368211945774],[9.1988058887608,41.36588583439],[9.1803693126024,41.366438293705],[9.1743707764701,41.379329284074],[9.1672444080415,41.385592973955],[9.1446146072237,41.387183678065],[9.1208631045283,41.39644315535],[9.0938398987455,41.393839319394],[9.0911719516959,41.401806079279],[9.0955320043022,41.412431710561],[9.1089222562469,41.419940163471],[9.1043469551733,41.425502848125],[9.120687595476,41.437616309687],[9.1192193922242,41.440772011484],[9.0994499566209,41.442768149338],[9.0935832833779,41.449719424027],[9.0822010138671,41.441973884937],[9.0743134372406,41.442920620722],[9.0664301578555,41.451023602972],[9.0704320220003,41.466940562623],[9.070286926691,41.475671427311],[9.0508357375037,41.459641860478],[9.0382611446596,41.459645198212],[9.0180268691937,41.467748490519],[9.0128843778786,41.476121872495],[9.0021701866201,41.475774397275],[8.9928461630234,41.485396435585],[8.9808637276524,41.479330164884],[8.9594585113313,41.492130159311],[8.938402541315,41.48966848731],[8.9317877201954,41.495378064347],[8.9210126230225,41.497499034287],[8.9147467175153,41.507208151354],[8.9001835704243,41.508774219762],[8.8846150462285,41.50507236925],[8.8820378648188,41.509239075837],[8.8882614285546,41.51707992067],[8.8778100883194,41.523794452944],[8.865369828875,41.520128455719],[8.8450740207766,41.517958079633],[8.8414047053005,41.523766509681],[8.8519237231626,41.533233974908],[8.8511877593354,41.540860979943],[8.8416810361388,41.546552827363],[8.8229182141785,41.546156093531],[8.814890471805,41.553906217363],[8.7885345993036,41.557735921446],[8.7854932407521,41.563658878459],[8.8019653365352,41.5725251973],[8.7827891492503,41.585681206952],[8.7771927389114,41.592763979819],[8.7839015050151,41.59639969226],[8.7909467331176,41.608501287066],[8.7930767849103,41.629554383445],[8.8024752261462,41.633221115876],[8.8217796251471,41.630090136165],[8.8265171763194,41.635951775657],[8.8540761012096,41.647017321432],[8.8695009599086,41.646091120096],[8.877264032596,41.652454617448],[8.8809129542854,41.668095186004],[8.8928931495104,41.674100351332],[8.9080176286522,41.677007881852],[8.9153277451781,41.681282755136],[8.9145075925891,41.689723682063],[8.8856557174325,41.690849961129],[8.8782882421796,41.695973169993],[8.8412808961089,41.697551641036],[8.8302939411387,41.706262922095],[8.8127122072851,41.714129905775],[8.7937675276411,41.707893097781],[8.7729726652092,41.711919063255],[8.7845453570537,41.731664815454],[8.7800237021371,41.739414158852],[8.7724546247573,41.741517274673],[8.7600821507981,41.738380383757],[8.7366474883573,41.729424936258],[8.7254848567332,41.727545668736],[8.7172417233064,41.722774526354],[8.7030325607564,41.726005824599],[8.7076082107898,41.73618560032],[8.6976380199228,41.741319354452],[8.6820097937715,41.739918393262],[8.6717700658097,41.743688167428],[8.6585643232553,41.741804670222],[8.6597494147728,41.749463503232],[8.6682797961785,41.752894642014],[8.6845169668936,41.747002332036],[8.7044093153393,41.757890543543],[8.7131431683495,41.760833582026],[8.7300880504804,41.77591212379],[8.7271678055689,41.78708867668],[8.7195718291105,41.788893754962],[8.7212499540158,41.797809382794],[8.7409410916134,41.79868785997],[8.7482572136005,41.810823729007],[8.7575460129466,41.80895026474],[8.7712959607968,41.811239419914],[8.7747951360312,41.82504031127],[8.7820652523774,41.833703364592],[8.7708086871301,41.836461210042],[8.767794604169,41.845931092466],[8.7841001717388,41.848170286407],[8.7906166495097,41.855520792589],[8.7902752705309,41.866416605405],[8.781211947867,41.880668839163],[8.8031333721604,41.891381047926],[8.795661885825,41.908865779323],[8.7858171453796,41.920265738823],[8.7726394721087,41.927375596769],[8.7608963047658,41.924460972208],[8.7549076702854,41.932565729457],[8.745110539203,41.933164242485],[8.7399479222249,41.928307210691],[8.7410637125693,41.91754841615],[8.7310370715364,41.915900103573],[8.7214300448374,41.909256183947],[8.7032845356386,41.907630033647],[8.6868554085917,41.90859416785],[8.6704582677272,41.905060573018],[8.6643099502431,41.907384856241],[8.6414501138477,41.909889243142],[8.6149322619016,41.902346804089],[8.610306446193,41.913050837853],[8.6218879056671,41.927827389358],[8.6207764177835,41.939541948075],[8.6089998541718,41.940155623683],[8.6056928687397,41.951055349782],[8.5976997733316,41.953238328668],[8.5958844509261,41.9660969095],[8.6148401371518,41.971330910765],[8.6390210889529,41.967471298128],[8.6460663299246,41.968130756625],[8.6688781676627,41.982429503353],[8.6684592293729,41.991610798065],[8.6575664515333,41.993436712754],[8.6564246405607,42.009345707145],[8.66801032159,42.017457160521],[8.6903254906641,42.027593059646],[8.702011655943,42.026639132045],[8.7253458869114,42.034356688034],[8.7226820538602,42.042540055616],[8.741329138221,42.040912179268],[8.7469869224827,42.0502108539],[8.7391608385257,42.062698609291],[8.7198555560589,42.06351093709],[8.7203352966306,42.069442470516],[8.7147668279995,42.08153861531],[8.7047370379813,42.087940049587],[8.7102579733595,42.095822368407],[8.7002490365492,42.10604379347],[8.6999858627077,42.112515614544],[8.6891550495107,42.115105402635],[8.680727946306,42.105996814848],[8.6712597688232,42.107107181013],[8.6605028767172,42.103588496488],[8.6470086216948,42.121131891644],[8.6374753377432,42.11976700426],[8.6256340976664,42.122670550852],[8.6099541503765,42.1345450022],[8.5958860094781,42.13025896889],[8.5825175645431,42.129323208282],[8.5849834154329,42.135866535707],[8.5939572487287,42.143185234803],[8.5897456767979,42.149152267892],[8.5774733357997,42.156554543452],[8.5901738822205,42.163884812642],[8.5884884100621,42.171421188299],[8.5682188559922,42.169017173529],[8.5654392505696,42.177332135912],[8.582879148895,42.178547241363],[8.578217141654,42.188551889364],[8.5813855583817,42.205939854644],[8.5696750552871,42.2080024677],[8.5753209823783,42.216374212666],[8.567135591097,42.219577195648],[8.5735416635984,42.225839882474],[8.5703414705341,42.230300843511],[8.5481905843276,42.228905913957],[8.5401025407511,42.234990759489],[8.5492440260065,42.239976932275],[8.5561122651665,42.236039038782],[8.5731170667844,42.238745320634],[8.578263306898,42.244253414861],[8.5893237006741,42.24450377404],[8.616717053661,42.255458016475],[8.6267416458828,42.25175456083],[8.6418418463671,42.256428059655],[8.6655881496278,42.259320114998],[8.6715712790019,42.262059482484],[8.6891048520685,42.263527621966],[8.6901226204434,42.278207035825],[8.6759776798364,42.283615563315],[8.67395545525,42.294337194236],[8.660571343066,42.302118549571],[8.6486515166656,42.302732559447],[8.639933499141,42.299416084547],[8.6255148911749,42.312261962884],[8.6103565562315,42.308394659111],[8.5974331518027,42.316054932892],[8.6046294578781,42.322652105253],[8.6215546415518,42.327510035659],[8.6279955733531,42.332296015498],[8.6264440528796,42.340241753638],[8.6182826215658,42.340701534987],[8.6002435360509,42.352999825029],[8.5915444423808,42.352772156997],[8.5815591608145,42.347468214352],[8.5738501697388,42.338412964424],[8.5648822039848,42.333214755035],[8.5533077910528,42.333031073096],[8.5588034162198,42.343784641612],[8.5517937879479,42.347375798384],[8.5558846856209,42.364749965739],[8.5432048758181,42.367016637162],[8.547948004985,42.379354824713],[8.5575710562857,42.370756414133],[8.5666906484566,42.370692862461],[8.5783059458289,42.375541718692],[8.5734085639674,42.381404942274],[8.5851262589954,42.38532518234],[8.5962264339561,42.382398762993],[8.6088441270775,42.386379953813],[8.6022869184152,42.400052818571],[8.6116794771433,42.403198147717],[8.6040429146329,42.409512946067],[8.6084169092937,42.416822082277],[8.6234377365159,42.421017847031],[8.6393957751413,42.418519567154],[8.6481082467376,42.413119060137],[8.6552300368167,42.415734337364],[8.6622200218125,42.426291905255],[8.6604105317327,42.43528280362],[8.6482384069515,42.442410807187],[8.6673206951673,42.444883992318],[8.6681439215198,42.45801303094],[8.6798297088815,42.468113820166],[8.6747918186735,42.476242956982],[8.6492357429259,42.474309683953],[8.6499303561134,42.478239958239],[8.6645502904805,42.49299417376],[8.6665085981229,42.515223865295],[8.6748420529906,42.518622461042],[8.6837613976392,42.516458985462],[8.6968431485562,42.525583517795],[8.7104476758167,42.523703513378],[8.7186158657164,42.528245234685],[8.7102577314429,42.535723624921],[8.7189524706419,42.540795175147],[8.7166314657641,42.549267771155],[8.7228204001293,42.556778273386],[8.7150751347624,42.564027675983],[8.7109904635305,42.576605764442],[8.7243185035707,42.584093673826],[8.7238415443762,42.574014082285],[8.7270436936434,42.561604463168],[8.7381119728326,42.567802968518],[8.7482834774653,42.568188079066],[8.7604416501391,42.558569577855],[8.7686425102482,42.555811440464],[8.7878053378926,42.558171123435],[8.8040993857369,42.569855594773],[8.8001589769082,42.582398778056],[8.8110798196196,42.589684742309],[8.8089320042038,42.599059599401],[8.8235352570811,42.606187366031],[8.8343194896775,42.601743500142],[8.8509405731086,42.610583827688],[8.8649682002014,42.607999881244],[8.8750416263931,42.613164920347],[8.8740939946005,42.61817996916],[8.8865269490476,42.628966058933],[8.9024157028959,42.627137432183],[8.9111573343141,42.628894923509],[8.9181350468671,42.63690550884],[8.9342605989761,42.638771827731],[8.9417828616377,42.634096039449],[8.9593730520526,42.635081802897],[8.9751743716955,42.640043666233],[9.0006328532992,42.641910192535],[9.0103777713521,42.64035209136],[9.0206940431911,42.644272763711],[9.0275141840511,42.652054428408],[9.0460037274368,42.655043174979],[9.0593208042615,42.660064628209],[9.0618252740801,42.665092965545],[9.0538043881836,42.679958481466],[9.0590940519087,42.694609453744],[9.0717031140713,42.693409341766],[9.0797009215888,42.700848589665],[9.0857643447586,42.714609110752],[9.0998800974121,42.715246309427],[9.1059770511843,42.724097520742],[9.1180072147931,42.726542533128],[9.1245519786652,42.731631049124],[9.1360558292684,42.730227284287],[9.1668856039546,42.736563616418],[9.1881552949011,42.727336456562],[9.2038452583029,42.726315061736],[9.217626725491,42.734222269857],[9.2245533152652,42.731999951427],[9.2340050664169,42.719909789956],[9.2544476997124,42.718515074833],[9.2593250469014,42.700693050085],[9.2679444804296,42.699476951561],[9.2788565397074,42.689592099364],[9.2844265705845,42.676336087658],[9.2933224871581,42.674311357318],[9.30315826849,42.684062221748],[9.3141769700085,42.688991839255],[9.3225981035062,42.698103422439],[9.321292738335,42.713400038631],[9.3395766319473,42.728992493133],[9.3444782391532,42.737810423971],[9.339181189137,42.757928245104],[9.339659755223,42.776011504848],[9.3425627879236,42.79480205062],[9.337774931012,42.804079605712],[9.3251300488766,42.813332647957],[9.3205438024435,42.823408404009],[9.3110153694299,42.834679311095],[9.3321782165813,42.85847260124],[9.3401543659189,42.86548579796],[9.3298530724956,42.872395584774],[9.3262689644171,42.890315517283],[9.322223463327,42.899632639571],[9.353819146522,42.916234653141],[9.3560395125976,42.927003469485],[9.3488941969672,42.92930970895],[9.358603665308,42.94633937258],[9.348145476117,42.951797488202],[9.3457582466882,42.957906943631],[9.3505448749339,42.968270031649],[9.3421423687094,42.978546347423],[9.3443683003848,42.985532557301],[9.3408728322382,42.994464747166],[9.3590415875145,43.006725446764],[9.3728616504645,43.004763668513],[9.3799389872775,43.008193389796],[9.4044764187179,43.005823769617],[9.4136701217893,43.006531836354],[9.4217576417904,43.011724041684],[9.4308368621636,43.00272384855],[9.4385130519137,43.000490605004],[9.4512650406387,42.990315238432],[9.4635582980189,42.986401078046],[9.4540973301679,42.97307892537],[9.4518764864235,42.964359720868],[9.4576350561474,42.949057159617],[9.4693212926991,42.936145296863],[9.4676737905393,42.926807351234],[9.4707921080556,42.918530856678],[9.4738686210525,42.891155154693],[9.4775278660748,42.881442813563],[9.4730668331504,42.874128797384],[9.4823148818977,42.864255300645],[9.484277260776,42.850189178286],[9.4807429643273,42.840776037517],[9.485811781953,42.832427261458],[9.4923850966255,42.805100268638],[9.4910751495896,42.794970088426],[9.472078926813,42.77053370509],[9.4671143214594,42.760859543836],[9.4685604695043,42.753048544421],[9.4613913735206,42.740659678567],[9.4624714977006,42.735628024208],[9.4561949971884,42.718039470181],[9.4523972721956,42.693495855424],[9.4463872288639,42.686125087855],[9.446189061428,42.673577272426],[9.4491942129664,42.662239762642],[9.4621969995941,42.640114758488],[9.4748795080564,42.624836118132],[9.5162152677147,42.583012642887],[9.5256781330523,42.569008285145],[9.5331957398235,42.545946562512],[9.5344917834473,42.523982588056],[9.5300256352103,42.5032908319],[9.5312290693099,42.484415645223],[9.5404627433876,42.461067005301],[9.5408346733534,42.440809257975],[9.5433951533138,42.428490625529],[9.5386315892536,42.414019694859],[9.532672682662,42.379967969125],[9.5333702262866,42.366280319789],[9.5372430000044,42.345209511976],[9.5425016250046,42.328804455976],[9.5504574617621,42.313214942216],[9.5588293070416,42.285264635275],[9.5592262719626,42.271734300663],[9.5532133692255,42.241433836434],[9.5528601939832,42.221257653469],[9.557438978743,42.203166452024],[9.5544087218137,42.157011398157],[9.5566017971818,42.142142733245],[9.5499796055405,42.104165986623],[9.5313440713912,42.087489423987],[9.5029309613993,42.055616031082],[9.4647863427601,42.010954139334],[9.4415478574917,41.98974926191],[9.424255411615,41.971535954188],[9.4125689541656,41.952475652276],[9.4120532345487,41.939726645644],[9.4149982681884,41.925108109695],[9.4112475276506,41.91100050268],[9.4020635619458,41.897155488353],[9.3970189665487,41.874613277788],[9.4022711090103,41.858701678165]]]]},"properties":{"code":"94","nom":"Corse"}}]}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! leaflet */ "./node_modules/leaflet/dist/leaflet-src.js");
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _france_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./france.json */ "./src/france.json");
/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */



const map = leaflet__WEBPACK_IMPORTED_MODULE_0___default().map('map-div', {
  attributionControl: false,
  scrollWheelZoom: false
}).setView([46.642, 2.758], 6);
const mapStyle = {
  'color': '#8ea18c',
  'fillOpacity': '1'
};
leaflet__WEBPACK_IMPORTED_MODULE_0___default().geoJSON(_france_json__WEBPACK_IMPORTED_MODULE_1__, {
  style: mapStyle
}).addTo(map);
const customIcon = leaflet__WEBPACK_IMPORTED_MODULE_0___default().icon({
  iconUrl: window.mapViewData.iconUrl,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [0, -12]
});
function onEachFeature(feature, layer) {
  if (feature.properties && feature.properties.popupContent) {
    layer.bindPopup(feature.properties.popupContent);
  }
}
function setGeojsonData(name, popupContent, coords) {
  const coordinates = coords.map(coord => parseFloat(coord.trim()));
  return {
    "type": "Feature",
    "properties": {
      "name": name,
      "amenity": name,
      "popupContent": popupContent
    },
    "geometry": {
      "type": "Point",
      "coordinates": coordinates
    }
  };
}
const geojsonData = window.mapViewData.geojsonData;
if (geojsonData) {
  geojsonData.map(data => {
    const geoData = setGeojsonData(data.name, data.name, data.coords);
    leaflet__WEBPACK_IMPORTED_MODULE_0___default().geoJSON(geoData, {
      pointToLayer: function (feature, latlng) {
        return leaflet__WEBPACK_IMPORTED_MODULE_0___default().marker(latlng, {
          icon: customIcon
        });
      },
      onEachFeature: onEachFeature
    }).addTo(map);
  });
}
})();

/******/ })()
;
//# sourceMappingURL=view.js.map