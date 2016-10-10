/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	// src/main.js
	var Vue = __webpack_require__(1);
	var VueRouter = __webpack_require__(2);
	var VueResource = __webpack_require__(3);

	// 注册插件
	Vue.use(VueResource)
	Vue.use(VueRouter)

	// 路由参数配置，以{}作为参数
	var routes = __webpack_require__(4); 

	// 开启路由，设置路由
	var router = new VueRouter(routes)

	new Vue({router}).$mount('#app');


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * Vue.js v2.0.1
	 * (c) 2014-2016 Evan You
	 * Released under the MIT License.
	 */
	(function (global, factory) {
	   true ? module.exports = factory() :
	  typeof define === 'function' && define.amd ? define(factory) :
	  (global.Vue = factory());
	}(this, (function () { 'use strict';

	/*  */

	/**
	 * Convert a value to a string that is actually rendered.
	 */
	function _toString (val) {
	  return val == null
	    ? ''
	    : typeof val === 'object'
	      ? JSON.stringify(val, null, 2)
	      : String(val)
	}

	/**
	 * Convert a input value to a number for persistence.
	 * If the conversion fails, return original string.
	 */
	function toNumber (val) {
	  var n = parseFloat(val, 10)
	  return (n || n === 0) ? n : val
	}

	/**
	 * Make a map and return a function for checking if a key
	 * is in that map.
	 */
	function makeMap (
	  str,
	  expectsLowerCase
	) {
	  var map = Object.create(null)
	  var list = str.split(',')
	  for (var i = 0; i < list.length; i++) {
	    map[list[i]] = true
	  }
	  return expectsLowerCase
	    ? function (val) { return map[val.toLowerCase()]; }
	    : function (val) { return map[val]; }
	}

	/**
	 * Check if a tag is a built-in tag.
	 */
	var isBuiltInTag = makeMap('slot,component', true)

	/**
	 * Remove an item from an array
	 */
	function remove$1 (arr, item) {
	  if (arr.length) {
	    var index = arr.indexOf(item)
	    if (index > -1) {
	      return arr.splice(index, 1)
	    }
	  }
	}

	/**
	 * Check whether the object has the property.
	 */
	var hasOwnProperty = Object.prototype.hasOwnProperty
	function hasOwn (obj, key) {
	  return hasOwnProperty.call(obj, key)
	}

	/**
	 * Check if value is primitive
	 */
	function isPrimitive (value) {
	  return typeof value === 'string' || typeof value === 'number'
	}

	/**
	 * Create a cached version of a pure function.
	 */
	function cached (fn) {
	  var cache = Object.create(null)
	  return function cachedFn (str) {
	    var hit = cache[str]
	    return hit || (cache[str] = fn(str))
	  }
	}

	/**
	 * Camelize a hyphen-delmited string.
	 */
	var camelizeRE = /-(\w)/g
	var camelize = cached(function (str) {
	  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
	})

	/**
	 * Capitalize a string.
	 */
	var capitalize = cached(function (str) {
	  return str.charAt(0).toUpperCase() + str.slice(1)
	})

	/**
	 * Hyphenate a camelCase string.
	 */
	var hyphenateRE = /([^-])([A-Z])/g
	var hyphenate = cached(function (str) {
	  return str
	    .replace(hyphenateRE, '$1-$2')
	    .replace(hyphenateRE, '$1-$2')
	    .toLowerCase()
	})

	/**
	 * Simple bind, faster than native
	 */
	function bind$1 (fn, ctx) {
	  function boundFn (a) {
	    var l = arguments.length
	    return l
	      ? l > 1
	        ? fn.apply(ctx, arguments)
	        : fn.call(ctx, a)
	      : fn.call(ctx)
	  }
	  // record original fn length
	  boundFn._length = fn.length
	  return boundFn
	}

	/**
	 * Convert an Array-like object to a real Array.
	 */
	function toArray (list, start) {
	  start = start || 0
	  var i = list.length - start
	  var ret = new Array(i)
	  while (i--) {
	    ret[i] = list[i + start]
	  }
	  return ret
	}

	/**
	 * Mix properties into target object.
	 */
	function extend (to, _from) {
	  for (var key in _from) {
	    to[key] = _from[key]
	  }
	  return to
	}

	/**
	 * Quick object check - this is primarily used to tell
	 * Objects from primitive values when we know the value
	 * is a JSON-compliant type.
	 */
	function isObject (obj) {
	  return obj !== null && typeof obj === 'object'
	}

	/**
	 * Strict object type check. Only returns true
	 * for plain JavaScript objects.
	 */
	var toString = Object.prototype.toString
	var OBJECT_STRING = '[object Object]'
	function isPlainObject (obj) {
	  return toString.call(obj) === OBJECT_STRING
	}

	/**
	 * Merge an Array of Objects into a single Object.
	 */
	function toObject (arr) {
	  var res = {}
	  for (var i = 0; i < arr.length; i++) {
	    if (arr[i]) {
	      extend(res, arr[i])
	    }
	  }
	  return res
	}

	/**
	 * Perform no operation.
	 */
	function noop () {}

	/**
	 * Always return false.
	 */
	var no = function () { return false; }

	/**
	 * Generate a static keys string from compiler modules.
	 */
	function genStaticKeys (modules) {
	  return modules.reduce(function (keys, m) {
	    return keys.concat(m.staticKeys || [])
	  }, []).join(',')
	}

	/**
	 * Check if two values are loosely equal - that is,
	 * if they are plain objects, do they have the same shape?
	 */
	function looseEqual (a, b) {
	  /* eslint-disable eqeqeq */
	  return a == b || (
	    isObject(a) && isObject(b)
	      ? JSON.stringify(a) === JSON.stringify(b)
	      : false
	  )
	  /* eslint-enable eqeqeq */
	}

	function looseIndexOf (arr, val) {
	  for (var i = 0; i < arr.length; i++) {
	    if (looseEqual(arr[i], val)) { return i }
	  }
	  return -1
	}

	/*  */

	var config = {
	  /**
	   * Option merge strategies (used in core/util/options)
	   */
	  optionMergeStrategies: Object.create(null),

	  /**
	   * Whether to suppress warnings.
	   */
	  silent: false,

	  /**
	   * Whether to enable devtools
	   */
	  devtools: "development" !== 'production',

	  /**
	   * Error handler for watcher errors
	   */
	  errorHandler: null,

	  /**
	   * Ignore certain custom elements
	   */
	  ignoredElements: null,

	  /**
	   * Custom user key aliases for v-on
	   */
	  keyCodes: Object.create(null),

	  /**
	   * Check if a tag is reserved so that it cannot be registered as a
	   * component. This is platform-dependent and may be overwritten.
	   */
	  isReservedTag: no,

	  /**
	   * Check if a tag is an unknown element.
	   * Platform-dependent.
	   */
	  isUnknownElement: no,

	  /**
	   * Get the namespace of an element
	   */
	  getTagNamespace: noop,

	  /**
	   * Check if an attribute must be bound using property, e.g. value
	   * Platform-dependent.
	   */
	  mustUseProp: no,

	  /**
	   * List of asset types that a component can own.
	   */
	  _assetTypes: [
	    'component',
	    'directive',
	    'filter'
	  ],

	  /**
	   * List of lifecycle hooks.
	   */
	  _lifecycleHooks: [
	    'beforeCreate',
	    'created',
	    'beforeMount',
	    'mounted',
	    'beforeUpdate',
	    'updated',
	    'beforeDestroy',
	    'destroyed',
	    'activated',
	    'deactivated'
	  ],

	  /**
	   * Max circular updates allowed in a scheduler flush cycle.
	   */
	  _maxUpdateCount: 100,

	  /**
	   * Server rendering?
	   */
	  _isServer: "client" === 'server'
	}

	/*  */

	/**
	 * Check if a string starts with $ or _
	 */
	function isReserved (str) {
	  var c = (str + '').charCodeAt(0)
	  return c === 0x24 || c === 0x5F
	}

	/**
	 * Define a property.
	 */
	function def (obj, key, val, enumerable) {
	  Object.defineProperty(obj, key, {
	    value: val,
	    enumerable: !!enumerable,
	    writable: true,
	    configurable: true
	  })
	}

	/**
	 * Parse simple path.
	 */
	var bailRE = /[^\w\.\$]/
	function parsePath (path) {
	  if (bailRE.test(path)) {
	    return
	  } else {
	    var segments = path.split('.')
	    return function (obj) {
	      for (var i = 0; i < segments.length; i++) {
	        if (!obj) { return }
	        obj = obj[segments[i]]
	      }
	      return obj
	    }
	  }
	}

	/*  */
	/* globals MutationObserver */

	// can we use __proto__?
	var hasProto = '__proto__' in {}

	// Browser environment sniffing
	var inBrowser =
	  typeof window !== 'undefined' &&
	  Object.prototype.toString.call(window) !== '[object Object]'

	var UA = inBrowser && window.navigator.userAgent.toLowerCase()
	var isIE = UA && /msie|trident/.test(UA)
	var isIE9 = UA && UA.indexOf('msie 9.0') > 0
	var isEdge = UA && UA.indexOf('edge/') > 0
	var isAndroid = UA && UA.indexOf('android') > 0
	var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA)

	// detect devtools
	var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__

	/* istanbul ignore next */
	function isNative (Ctor) {
	  return /native code/.test(Ctor.toString())
	}

	/**
	 * Defer a task to execute it asynchronously.
	 */
	var nextTick = (function () {
	  var callbacks = []
	  var pending = false
	  var timerFunc

	  function nextTickHandler () {
	    pending = false
	    var copies = callbacks.slice(0)
	    callbacks.length = 0
	    for (var i = 0; i < copies.length; i++) {
	      copies[i]()
	    }
	  }

	  // the nextTick behavior leverages the microtask queue, which can be accessed
	  // via either native Promise.then or MutationObserver.
	  // MutationObserver has wider support, however it is seriously bugged in
	  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
	  // completely stops working after triggering a few times... so, if native
	  // Promise is available, we will use it:
	  /* istanbul ignore if */
	  if (typeof Promise !== 'undefined' && isNative(Promise)) {
	    var p = Promise.resolve()
	    timerFunc = function () {
	      p.then(nextTickHandler)
	      // in problematic UIWebViews, Promise.then doesn't completely break, but
	      // it can get stuck in a weird state where callbacks are pushed into the
	      // microtask queue but the queue isn't being flushed, until the browser
	      // needs to do some other work, e.g. handle a timer. Therefore we can
	      // "force" the microtask queue to be flushed by adding an empty timer.
	      if (isIOS) { setTimeout(noop) }
	    }
	  } else if (typeof MutationObserver !== 'undefined' && (
	    isNative(MutationObserver) ||
	    // PhantomJS and iOS 7.x
	    MutationObserver.toString() === '[object MutationObserverConstructor]'
	  )) {
	    // use MutationObserver where native Promise is not available,
	    // e.g. PhantomJS IE11, iOS7, Android 4.4
	    var counter = 1
	    var observer = new MutationObserver(nextTickHandler)
	    var textNode = document.createTextNode(String(counter))
	    observer.observe(textNode, {
	      characterData: true
	    })
	    timerFunc = function () {
	      counter = (counter + 1) % 2
	      textNode.data = String(counter)
	    }
	  } else {
	    // fallback to setTimeout
	    /* istanbul ignore next */
	    timerFunc = setTimeout
	  }

	  return function queueNextTick (cb, ctx) {
	    var func = ctx
	      ? function () { cb.call(ctx) }
	      : cb
	    callbacks.push(func)
	    if (!pending) {
	      pending = true
	      timerFunc(nextTickHandler, 0)
	    }
	  }
	})()

	var _Set
	/* istanbul ignore if */
	if (typeof Set !== 'undefined' && isNative(Set)) {
	  // use native Set when available.
	  _Set = Set
	} else {
	  // a non-standard Set polyfill that only works with primitive keys.
	  _Set = (function () {
	    function Set () {
	      this.set = Object.create(null)
	    }
	    Set.prototype.has = function has (key) {
	      return this.set[key] !== undefined
	    };
	    Set.prototype.add = function add (key) {
	      this.set[key] = 1
	    };
	    Set.prototype.clear = function clear () {
	      this.set = Object.create(null)
	    };

	    return Set;
	  }())
	}

	/* not type checking this file because flow doesn't play well with Proxy */

	var hasProxy;
	var proxyHandlers;
	var initProxy

	{
	  var allowedGlobals = makeMap(
	    'Infinity,undefined,NaN,isFinite,isNaN,' +
	    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
	    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
	    'require' // for Webpack/Browserify
	  )

	  hasProxy =
	    typeof Proxy !== 'undefined' &&
	    Proxy.toString().match(/native code/)

	  proxyHandlers = {
	    has: function has (target, key) {
	      var has = key in target
	      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_'
	      if (!has && !isAllowed) {
	        warn(
	          "Property or method \"" + key + "\" is not defined on the instance but " +
	          "referenced during render. Make sure to declare reactive data " +
	          "properties in the data option.",
	          target
	        )
	      }
	      return has || !isAllowed
	    }
	  }

	  initProxy = function initProxy (vm) {
	    if (hasProxy) {
	      vm._renderProxy = new Proxy(vm, proxyHandlers)
	    } else {
	      vm._renderProxy = vm
	    }
	  }
	}

	/*  */


	var uid$2 = 0

	/**
	 * A dep is an observable that can have multiple
	 * directives subscribing to it.
	 */
	var Dep = function Dep () {
	  this.id = uid$2++
	  this.subs = []
	};

	Dep.prototype.addSub = function addSub (sub) {
	  this.subs.push(sub)
	};

	Dep.prototype.removeSub = function removeSub (sub) {
	  remove$1(this.subs, sub)
	};

	Dep.prototype.depend = function depend () {
	  if (Dep.target) {
	    Dep.target.addDep(this)
	  }
	};

	Dep.prototype.notify = function notify () {
	  // stablize the subscriber list first
	  var subs = this.subs.slice()
	  for (var i = 0, l = subs.length; i < l; i++) {
	    subs[i].update()
	  }
	};

	// the current target watcher being evaluated.
	// this is globally unique because there could be only one
	// watcher being evaluated at any time.
	Dep.target = null
	var targetStack = []

	function pushTarget (_target) {
	  if (Dep.target) { targetStack.push(Dep.target) }
	  Dep.target = _target
	}

	function popTarget () {
	  Dep.target = targetStack.pop()
	}

	/*  */


	var queue = []
	var has$1 = {}
	var circular = {}
	var waiting = false
	var flushing = false
	var index = 0

	/**
	 * Reset the scheduler's state.
	 */
	function resetSchedulerState () {
	  queue.length = 0
	  has$1 = {}
	  {
	    circular = {}
	  }
	  waiting = flushing = false
	}

	/**
	 * Flush both queues and run the watchers.
	 */
	function flushSchedulerQueue () {
	  flushing = true

	  // Sort queue before flush.
	  // This ensures that:
	  // 1. Components are updated from parent to child. (because parent is always
	  //    created before the child)
	  // 2. A component's user watchers are run before its render watcher (because
	  //    user watchers are created before the render watcher)
	  // 3. If a component is destroyed during a parent component's watcher run,
	  //    its watchers can be skipped.
	  queue.sort(function (a, b) { return a.id - b.id; })

	  // do not cache length because more watchers might be pushed
	  // as we run existing watchers
	  for (index = 0; index < queue.length; index++) {
	    var watcher = queue[index]
	    var id = watcher.id
	    has$1[id] = null
	    watcher.run()
	    // in dev build, check and stop circular updates.
	    if ("development" !== 'production' && has$1[id] != null) {
	      circular[id] = (circular[id] || 0) + 1
	      if (circular[id] > config._maxUpdateCount) {
	        warn(
	          'You may have an infinite update loop ' + (
	            watcher.user
	              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
	              : "in a component render function."
	          ),
	          watcher.vm
	        )
	        break
	      }
	    }
	  }

	  // devtool hook
	  /* istanbul ignore if */
	  if (devtools && config.devtools) {
	    devtools.emit('flush')
	  }

	  resetSchedulerState()
	}

	/**
	 * Push a watcher into the watcher queue.
	 * Jobs with duplicate IDs will be skipped unless it's
	 * pushed when the queue is being flushed.
	 */
	function queueWatcher (watcher) {
	  var id = watcher.id
	  if (has$1[id] == null) {
	    has$1[id] = true
	    if (!flushing) {
	      queue.push(watcher)
	    } else {
	      // if already flushing, splice the watcher based on its id
	      // if already past its id, it will be run next immediately.
	      var i = queue.length - 1
	      while (i >= 0 && queue[i].id > watcher.id) {
	        i--
	      }
	      queue.splice(Math.max(i, index) + 1, 0, watcher)
	    }
	    // queue the flush
	    if (!waiting) {
	      waiting = true
	      nextTick(flushSchedulerQueue)
	    }
	  }
	}

	/*  */

	var uid$1 = 0

	/**
	 * A watcher parses an expression, collects dependencies,
	 * and fires callback when the expression value changes.
	 * This is used for both the $watch() api and directives.
	 */
	var Watcher = function Watcher (
	  vm,
	  expOrFn,
	  cb,
	  options
	) {
	  if ( options === void 0 ) options = {};

	  this.vm = vm
	  vm._watchers.push(this)
	  // options
	  this.deep = !!options.deep
	  this.user = !!options.user
	  this.lazy = !!options.lazy
	  this.sync = !!options.sync
	  this.expression = expOrFn.toString()
	  this.cb = cb
	  this.id = ++uid$1 // uid for batching
	  this.active = true
	  this.dirty = this.lazy // for lazy watchers
	  this.deps = []
	  this.newDeps = []
	  this.depIds = new _Set()
	  this.newDepIds = new _Set()
	  // parse expression for getter
	  if (typeof expOrFn === 'function') {
	    this.getter = expOrFn
	  } else {
	    this.getter = parsePath(expOrFn)
	    if (!this.getter) {
	      this.getter = function () {}
	      "development" !== 'production' && warn(
	        "Failed watching path: \"" + expOrFn + "\" " +
	        'Watcher only accepts simple dot-delimited paths. ' +
	        'For full control, use a function instead.',
	        vm
	      )
	    }
	  }
	  this.value = this.lazy
	    ? undefined
	    : this.get()
	};

	/**
	 * Evaluate the getter, and re-collect dependencies.
	 */
	Watcher.prototype.get = function get () {
	  pushTarget(this)
	  var value = this.getter.call(this.vm, this.vm)
	  // "touch" every property so they are all tracked as
	  // dependencies for deep watching
	  if (this.deep) {
	    traverse(value)
	  }
	  popTarget()
	  this.cleanupDeps()
	  return value
	};

	/**
	 * Add a dependency to this directive.
	 */
	Watcher.prototype.addDep = function addDep (dep) {
	  var id = dep.id
	  if (!this.newDepIds.has(id)) {
	    this.newDepIds.add(id)
	    this.newDeps.push(dep)
	    if (!this.depIds.has(id)) {
	      dep.addSub(this)
	    }
	  }
	};

	/**
	 * Clean up for dependency collection.
	 */
	Watcher.prototype.cleanupDeps = function cleanupDeps () {
	    var this$1 = this;

	  var i = this.deps.length
	  while (i--) {
	    var dep = this$1.deps[i]
	    if (!this$1.newDepIds.has(dep.id)) {
	      dep.removeSub(this$1)
	    }
	  }
	  var tmp = this.depIds
	  this.depIds = this.newDepIds
	  this.newDepIds = tmp
	  this.newDepIds.clear()
	  tmp = this.deps
	  this.deps = this.newDeps
	  this.newDeps = tmp
	  this.newDeps.length = 0
	};

	/**
	 * Subscriber interface.
	 * Will be called when a dependency changes.
	 */
	Watcher.prototype.update = function update () {
	  /* istanbul ignore else */
	  if (this.lazy) {
	    this.dirty = true
	  } else if (this.sync) {
	    this.run()
	  } else {
	    queueWatcher(this)
	  }
	};

	/**
	 * Scheduler job interface.
	 * Will be called by the scheduler.
	 */
	Watcher.prototype.run = function run () {
	  if (this.active) {
	    var value = this.get()
	      if (
	        value !== this.value ||
	      // Deep watchers and watchers on Object/Arrays should fire even
	      // when the value is the same, because the value may
	      // have mutated.
	      isObject(value) ||
	      this.deep
	    ) {
	      // set new value
	      var oldValue = this.value
	      this.value = value
	      if (this.user) {
	        try {
	          this.cb.call(this.vm, value, oldValue)
	        } catch (e) {
	          "development" !== 'production' && warn(
	            ("Error in watcher \"" + (this.expression) + "\""),
	            this.vm
	          )
	          /* istanbul ignore else */
	          if (config.errorHandler) {
	            config.errorHandler.call(null, e, this.vm)
	          } else {
	            throw e
	          }
	        }
	      } else {
	        this.cb.call(this.vm, value, oldValue)
	      }
	    }
	  }
	};

	/**
	 * Evaluate the value of the watcher.
	 * This only gets called for lazy watchers.
	 */
	Watcher.prototype.evaluate = function evaluate () {
	  this.value = this.get()
	  this.dirty = false
	};

	/**
	 * Depend on all deps collected by this watcher.
	 */
	Watcher.prototype.depend = function depend () {
	    var this$1 = this;

	  var i = this.deps.length
	  while (i--) {
	    this$1.deps[i].depend()
	  }
	};

	/**
	 * Remove self from all dependencies' subcriber list.
	 */
	Watcher.prototype.teardown = function teardown () {
	    var this$1 = this;

	  if (this.active) {
	    // remove self from vm's watcher list
	    // this is a somewhat expensive operation so we skip it
	    // if the vm is being destroyed or is performing a v-for
	    // re-render (the watcher list is then filtered by v-for).
	    if (!this.vm._isBeingDestroyed && !this.vm._vForRemoving) {
	      remove$1(this.vm._watchers, this)
	    }
	    var i = this.deps.length
	    while (i--) {
	      this$1.deps[i].removeSub(this$1)
	    }
	    this.active = false
	  }
	};

	/**
	 * Recursively traverse an object to evoke all converted
	 * getters, so that every nested property inside the object
	 * is collected as a "deep" dependency.
	 */
	var seenObjects = new _Set()
	function traverse (val, seen) {
	  var i, keys
	  if (!seen) {
	    seen = seenObjects
	    seen.clear()
	  }
	  var isA = Array.isArray(val)
	  var isO = isObject(val)
	  if ((isA || isO) && Object.isExtensible(val)) {
	    if (val.__ob__) {
	      var depId = val.__ob__.dep.id
	      if (seen.has(depId)) {
	        return
	      } else {
	        seen.add(depId)
	      }
	    }
	    if (isA) {
	      i = val.length
	      while (i--) { traverse(val[i], seen) }
	    } else if (isO) {
	      keys = Object.keys(val)
	      i = keys.length
	      while (i--) { traverse(val[keys[i]], seen) }
	    }
	  }
	}

	/*
	 * not type checking this file because flow doesn't play well with
	 * dynamically accessing methods on Array prototype
	 */

	var arrayProto = Array.prototype
	var arrayMethods = Object.create(arrayProto);[
	  'push',
	  'pop',
	  'shift',
	  'unshift',
	  'splice',
	  'sort',
	  'reverse'
	]
	.forEach(function (method) {
	  // cache original method
	  var original = arrayProto[method]
	  def(arrayMethods, method, function mutator () {
	    var arguments$1 = arguments;

	    // avoid leaking arguments:
	    // http://jsperf.com/closure-with-arguments
	    var i = arguments.length
	    var args = new Array(i)
	    while (i--) {
	      args[i] = arguments$1[i]
	    }
	    var result = original.apply(this, args)
	    var ob = this.__ob__
	    var inserted
	    switch (method) {
	      case 'push':
	        inserted = args
	        break
	      case 'unshift':
	        inserted = args
	        break
	      case 'splice':
	        inserted = args.slice(2)
	        break
	    }
	    if (inserted) { ob.observeArray(inserted) }
	    // notify change
	    ob.dep.notify()
	    return result
	  })
	})

	/*  */

	var arrayKeys = Object.getOwnPropertyNames(arrayMethods)

	/**
	 * By default, when a reactive property is set, the new value is
	 * also converted to become reactive. However when passing down props,
	 * we don't want to force conversion because the value may be a nested value
	 * under a frozen data structure. Converting it would defeat the optimization.
	 */
	var observerState = {
	  shouldConvert: true,
	  isSettingProps: false
	}

	/**
	 * Observer class that are attached to each observed
	 * object. Once attached, the observer converts target
	 * object's property keys into getter/setters that
	 * collect dependencies and dispatches updates.
	 */
	var Observer = function Observer (value) {
	  this.value = value
	  this.dep = new Dep()
	  this.vmCount = 0
	  def(value, '__ob__', this)
	  if (Array.isArray(value)) {
	    var augment = hasProto
	      ? protoAugment
	      : copyAugment
	    augment(value, arrayMethods, arrayKeys)
	    this.observeArray(value)
	  } else {
	    this.walk(value)
	  }
	};

	/**
	 * Walk through each property and convert them into
	 * getter/setters. This method should only be called when
	 * value type is Object.
	 */
	Observer.prototype.walk = function walk (obj) {
	  var keys = Object.keys(obj)
	  for (var i = 0; i < keys.length; i++) {
	    defineReactive$$1(obj, keys[i], obj[keys[i]])
	  }
	};

	/**
	 * Observe a list of Array items.
	 */
	Observer.prototype.observeArray = function observeArray (items) {
	  for (var i = 0, l = items.length; i < l; i++) {
	    observe(items[i])
	  }
	};

	// helpers

	/**
	 * Augment an target Object or Array by intercepting
	 * the prototype chain using __proto__
	 */
	function protoAugment (target, src) {
	  /* eslint-disable no-proto */
	  target.__proto__ = src
	  /* eslint-enable no-proto */
	}

	/**
	 * Augment an target Object or Array by defining
	 * hidden properties.
	 *
	 * istanbul ignore next
	 */
	function copyAugment (target, src, keys) {
	  for (var i = 0, l = keys.length; i < l; i++) {
	    var key = keys[i]
	    def(target, key, src[key])
	  }
	}

	/**
	 * Attempt to create an observer instance for a value,
	 * returns the new observer if successfully observed,
	 * or the existing observer if the value already has one.
	 */
	function observe (value) {
	  if (!isObject(value)) {
	    return
	  }
	  var ob
	  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
	    ob = value.__ob__
	  } else if (
	    observerState.shouldConvert &&
	    !config._isServer &&
	    (Array.isArray(value) || isPlainObject(value)) &&
	    Object.isExtensible(value) &&
	    !value._isVue
	  ) {
	    ob = new Observer(value)
	  }
	  return ob
	}

	/**
	 * Define a reactive property on an Object.
	 */
	function defineReactive$$1 (
	  obj,
	  key,
	  val,
	  customSetter
	) {
	  var dep = new Dep()

	  var property = Object.getOwnPropertyDescriptor(obj, key)
	  if (property && property.configurable === false) {
	    return
	  }

	  // cater for pre-defined getter/setters
	  var getter = property && property.get
	  var setter = property && property.set

	  var childOb = observe(val)
	  Object.defineProperty(obj, key, {
	    enumerable: true,
	    configurable: true,
	    get: function reactiveGetter () {
	      var value = getter ? getter.call(obj) : val
	      if (Dep.target) {
	        dep.depend()
	        if (childOb) {
	          childOb.dep.depend()
	        }
	        if (Array.isArray(value)) {
	          for (var e = void 0, i = 0, l = value.length; i < l; i++) {
	            e = value[i]
	            e && e.__ob__ && e.__ob__.dep.depend()
	          }
	        }
	      }
	      return value
	    },
	    set: function reactiveSetter (newVal) {
	      var value = getter ? getter.call(obj) : val
	      if (newVal === value) {
	        return
	      }
	      if ("development" !== 'production' && customSetter) {
	        customSetter()
	      }
	      if (setter) {
	        setter.call(obj, newVal)
	      } else {
	        val = newVal
	      }
	      childOb = observe(newVal)
	      dep.notify()
	    }
	  })
	}

	/**
	 * Set a property on an object. Adds the new property and
	 * triggers change notification if the property doesn't
	 * already exist.
	 */
	function set (obj, key, val) {
	  if (Array.isArray(obj)) {
	    obj.splice(key, 1, val)
	    return val
	  }
	  if (hasOwn(obj, key)) {
	    obj[key] = val
	    return
	  }
	  var ob = obj.__ob__
	  if (obj._isVue || (ob && ob.vmCount)) {
	    "development" !== 'production' && warn(
	      'Avoid adding reactive properties to a Vue instance or its root $data ' +
	      'at runtime - declare it upfront in the data option.'
	    )
	    return
	  }
	  if (!ob) {
	    obj[key] = val
	    return
	  }
	  defineReactive$$1(ob.value, key, val)
	  ob.dep.notify()
	  return val
	}

	/**
	 * Delete a property and trigger change if necessary.
	 */
	function del (obj, key) {
	  var ob = obj.__ob__
	  if (obj._isVue || (ob && ob.vmCount)) {
	    "development" !== 'production' && warn(
	      'Avoid deleting properties on a Vue instance or its root $data ' +
	      '- just set it to null.'
	    )
	    return
	  }
	  if (!hasOwn(obj, key)) {
	    return
	  }
	  delete obj[key]
	  if (!ob) {
	    return
	  }
	  ob.dep.notify()
	}

	/*  */

	function initState (vm) {
	  vm._watchers = []
	  initProps(vm)
	  initData(vm)
	  initComputed(vm)
	  initMethods(vm)
	  initWatch(vm)
	}

	function initProps (vm) {
	  var props = vm.$options.props
	  if (props) {
	    var propsData = vm.$options.propsData || {}
	    var keys = vm.$options._propKeys = Object.keys(props)
	    var isRoot = !vm.$parent
	    // root instance props should be converted
	    observerState.shouldConvert = isRoot
	    var loop = function ( i ) {
	      var key = keys[i]
	      /* istanbul ignore else */
	      {
	        defineReactive$$1(vm, key, validateProp(key, props, propsData, vm), function () {
	          if (vm.$parent && !observerState.isSettingProps) {
	            warn(
	              "Avoid mutating a prop directly since the value will be " +
	              "overwritten whenever the parent component re-renders. " +
	              "Instead, use a data or computed property based on the prop's " +
	              "value. Prop being mutated: \"" + key + "\"",
	              vm
	            )
	          }
	        })
	      }
	    };

	    for (var i = 0; i < keys.length; i++) loop( i );
	    observerState.shouldConvert = true
	  }
	}

	function initData (vm) {
	  var data = vm.$options.data
	  data = vm._data = typeof data === 'function'
	    ? data.call(vm)
	    : data || {}
	  if (!isPlainObject(data)) {
	    data = {}
	    "development" !== 'production' && warn(
	      'data functions should return an object.',
	      vm
	    )
	  }
	  // proxy data on instance
	  var keys = Object.keys(data)
	  var props = vm.$options.props
	  var i = keys.length
	  while (i--) {
	    if (props && hasOwn(props, keys[i])) {
	      "development" !== 'production' && warn(
	        "The data property \"" + (keys[i]) + "\" is already declared as a prop. " +
	        "Use prop default value instead.",
	        vm
	      )
	    } else {
	      proxy(vm, keys[i])
	    }
	  }
	  // observe data
	  observe(data)
	  data.__ob__ && data.__ob__.vmCount++
	}

	var computedSharedDefinition = {
	  enumerable: true,
	  configurable: true,
	  get: noop,
	  set: noop
	}

	function initComputed (vm) {
	  var computed = vm.$options.computed
	  if (computed) {
	    for (var key in computed) {
	      var userDef = computed[key]
	      if (typeof userDef === 'function') {
	        computedSharedDefinition.get = makeComputedGetter(userDef, vm)
	        computedSharedDefinition.set = noop
	      } else {
	        computedSharedDefinition.get = userDef.get
	          ? userDef.cache !== false
	            ? makeComputedGetter(userDef.get, vm)
	            : bind$1(userDef.get, vm)
	          : noop
	        computedSharedDefinition.set = userDef.set
	          ? bind$1(userDef.set, vm)
	          : noop
	      }
	      Object.defineProperty(vm, key, computedSharedDefinition)
	    }
	  }
	}

	function makeComputedGetter (getter, owner) {
	  var watcher = new Watcher(owner, getter, noop, {
	    lazy: true
	  })
	  return function computedGetter () {
	    if (watcher.dirty) {
	      watcher.evaluate()
	    }
	    if (Dep.target) {
	      watcher.depend()
	    }
	    return watcher.value
	  }
	}

	function initMethods (vm) {
	  var methods = vm.$options.methods
	  if (methods) {
	    for (var key in methods) {
	      if (methods[key] != null) {
	        vm[key] = bind$1(methods[key], vm)
	      } else {
	        warn(("Method \"" + key + "\" is undefined in options."), vm)
	      }
	    }
	  }
	}

	function initWatch (vm) {
	  var watch = vm.$options.watch
	  if (watch) {
	    for (var key in watch) {
	      var handler = watch[key]
	      if (Array.isArray(handler)) {
	        for (var i = 0; i < handler.length; i++) {
	          createWatcher(vm, key, handler[i])
	        }
	      } else {
	        createWatcher(vm, key, handler)
	      }
	    }
	  }
	}

	function createWatcher (vm, key, handler) {
	  var options
	  if (isPlainObject(handler)) {
	    options = handler
	    handler = handler.handler
	  }
	  if (typeof handler === 'string') {
	    handler = vm[handler]
	  }
	  vm.$watch(key, handler, options)
	}

	function stateMixin (Vue) {
	  // flow somehow has problems with directly declared definition object
	  // when using Object.defineProperty, so we have to procedurally build up
	  // the object here.
	  var dataDef = {}
	  dataDef.get = function () {
	    return this._data
	  }
	  {
	    dataDef.set = function (newData) {
	      warn(
	        'Avoid replacing instance root $data. ' +
	        'Use nested data properties instead.',
	        this
	      )
	    }
	  }
	  Object.defineProperty(Vue.prototype, '$data', dataDef)

	  Vue.prototype.$set = set
	  Vue.prototype.$delete = del

	  Vue.prototype.$watch = function (
	    expOrFn,
	    cb,
	    options
	  ) {
	    var vm = this
	    options = options || {}
	    options.user = true
	    var watcher = new Watcher(vm, expOrFn, cb, options)
	    if (options.immediate) {
	      cb.call(vm, watcher.value)
	    }
	    return function unwatchFn () {
	      watcher.teardown()
	    }
	  }
	}

	function proxy (vm, key) {
	  if (!isReserved(key)) {
	    Object.defineProperty(vm, key, {
	      configurable: true,
	      enumerable: true,
	      get: function proxyGetter () {
	        return vm._data[key]
	      },
	      set: function proxySetter (val) {
	        vm._data[key] = val
	      }
	    })
	  }
	}

	/*  */

	var VNode = function VNode (
	  tag,
	  data,
	  children,
	  text,
	  elm,
	  ns,
	  context,
	  componentOptions
	) {
	  this.tag = tag
	  this.data = data
	  this.children = children
	  this.text = text
	  this.elm = elm
	  this.ns = ns
	  this.context = context
	  this.key = data && data.key
	  this.componentOptions = componentOptions
	  this.child = undefined
	  this.parent = undefined
	  this.raw = false
	  this.isStatic = false
	  this.isRootInsert = true
	  this.isComment = false
	  this.isCloned = false
	};

	var emptyVNode = function () {
	  var node = new VNode()
	  node.text = ''
	  node.isComment = true
	  return node
	}

	// optimized shallow clone
	// used for static nodes and slot nodes because they may be reused across
	// multiple renders, cloning them avoids errors when DOM manipulations rely
	// on their elm reference.
	function cloneVNode (vnode) {
	  var cloned = new VNode(
	    vnode.tag,
	    vnode.data,
	    vnode.children,
	    vnode.text,
	    vnode.elm,
	    vnode.ns,
	    vnode.context,
	    vnode.componentOptions
	  )
	  cloned.isStatic = vnode.isStatic
	  cloned.key = vnode.key
	  cloned.isCloned = true
	  return cloned
	}

	function cloneVNodes (vnodes) {
	  var res = new Array(vnodes.length)
	  for (var i = 0; i < vnodes.length; i++) {
	    res[i] = cloneVNode(vnodes[i])
	  }
	  return res
	}

	/*  */

	function normalizeChildren (
	  children,
	  ns,
	  nestedIndex
	) {
	  if (isPrimitive(children)) {
	    return [createTextVNode(children)]
	  }
	  if (Array.isArray(children)) {
	    var res = []
	    for (var i = 0, l = children.length; i < l; i++) {
	      var c = children[i]
	      var last = res[res.length - 1]
	      //  nested
	      if (Array.isArray(c)) {
	        res.push.apply(res, normalizeChildren(c, ns, i))
	      } else if (isPrimitive(c)) {
	        if (last && last.text) {
	          last.text += String(c)
	        } else if (c !== '') {
	          // convert primitive to vnode
	          res.push(createTextVNode(c))
	        }
	      } else if (c instanceof VNode) {
	        if (c.text && last && last.text) {
	          last.text += c.text
	        } else {
	          // inherit parent namespace
	          if (ns) {
	            applyNS(c, ns)
	          }
	          // default key for nested array children (likely generated by v-for)
	          if (c.tag && c.key == null && nestedIndex != null) {
	            c.key = "__vlist_" + nestedIndex + "_" + i + "__"
	          }
	          res.push(c)
	        }
	      }
	    }
	    return res
	  }
	}

	function createTextVNode (val) {
	  return new VNode(undefined, undefined, undefined, String(val))
	}

	function applyNS (vnode, ns) {
	  if (vnode.tag && !vnode.ns) {
	    vnode.ns = ns
	    if (vnode.children) {
	      for (var i = 0, l = vnode.children.length; i < l; i++) {
	        applyNS(vnode.children[i], ns)
	      }
	    }
	  }
	}

	function getFirstComponentChild (children) {
	  return children && children.filter(function (c) { return c && c.componentOptions; })[0]
	}

	function mergeVNodeHook (def$$1, key, hook) {
	  var oldHook = def$$1[key]
	  if (oldHook) {
	    var injectedHash = def$$1.__injected || (def$$1.__injected = {})
	    if (!injectedHash[key]) {
	      injectedHash[key] = true
	      def$$1[key] = function () {
	        oldHook.apply(this, arguments)
	        hook.apply(this, arguments)
	      }
	    }
	  } else {
	    def$$1[key] = hook
	  }
	}

	function updateListeners (
	  on,
	  oldOn,
	  add,
	  remove$$1
	) {
	  var name, cur, old, fn, event, capture
	  for (name in on) {
	    cur = on[name]
	    old = oldOn[name]
	    if (!cur) {
	      "development" !== 'production' && warn(
	        ("Handler for event \"" + name + "\" is undefined.")
	      )
	    } else if (!old) {
	      capture = name.charAt(0) === '!'
	      event = capture ? name.slice(1) : name
	      if (Array.isArray(cur)) {
	        add(event, (cur.invoker = arrInvoker(cur)), capture)
	      } else {
	        if (!cur.invoker) {
	          fn = cur
	          cur = on[name] = {}
	          cur.fn = fn
	          cur.invoker = fnInvoker(cur)
	        }
	        add(event, cur.invoker, capture)
	      }
	    } else if (cur !== old) {
	      if (Array.isArray(old)) {
	        old.length = cur.length
	        for (var i = 0; i < old.length; i++) { old[i] = cur[i] }
	        on[name] = old
	      } else {
	        old.fn = cur
	        on[name] = old
	      }
	    }
	  }
	  for (name in oldOn) {
	    if (!on[name]) {
	      event = name.charAt(0) === '!' ? name.slice(1) : name
	      remove$$1(event, oldOn[name].invoker)
	    }
	  }
	}

	function arrInvoker (arr) {
	  return function (ev) {
	    var arguments$1 = arguments;

	    var single = arguments.length === 1
	    for (var i = 0; i < arr.length; i++) {
	      single ? arr[i](ev) : arr[i].apply(null, arguments$1)
	    }
	  }
	}

	function fnInvoker (o) {
	  return function (ev) {
	    var single = arguments.length === 1
	    single ? o.fn(ev) : o.fn.apply(null, arguments)
	  }
	}

	/*  */

	var activeInstance = null

	function initLifecycle (vm) {
	  var options = vm.$options

	  // locate first non-abstract parent
	  var parent = options.parent
	  if (parent && !options.abstract) {
	    while (parent.$options.abstract && parent.$parent) {
	      parent = parent.$parent
	    }
	    parent.$children.push(vm)
	  }

	  vm.$parent = parent
	  vm.$root = parent ? parent.$root : vm

	  vm.$children = []
	  vm.$refs = {}

	  vm._watcher = null
	  vm._inactive = false
	  vm._isMounted = false
	  vm._isDestroyed = false
	  vm._isBeingDestroyed = false
	}

	function lifecycleMixin (Vue) {
	  Vue.prototype._mount = function (
	    el,
	    hydrating
	  ) {
	    var vm = this
	    vm.$el = el
	    if (!vm.$options.render) {
	      vm.$options.render = emptyVNode
	      {
	        /* istanbul ignore if */
	        if (vm.$options.template) {
	          warn(
	            'You are using the runtime-only build of Vue where the template ' +
	            'option is not available. Either pre-compile the templates into ' +
	            'render functions, or use the compiler-included build.',
	            vm
	          )
	        } else {
	          warn(
	            'Failed to mount component: template or render function not defined.',
	            vm
	          )
	        }
	      }
	    }
	    callHook(vm, 'beforeMount')
	    vm._watcher = new Watcher(vm, function () {
	      vm._update(vm._render(), hydrating)
	    }, noop)
	    hydrating = false
	    // root instance, call mounted on self
	    // mounted is called for child components in its inserted hook
	    if (vm.$root === vm) {
	      vm._isMounted = true
	      callHook(vm, 'mounted')
	    }
	    return vm
	  }

	  Vue.prototype._update = function (vnode, hydrating) {
	    var vm = this
	    if (vm._isMounted) {
	      callHook(vm, 'beforeUpdate')
	    }
	    var prevEl = vm.$el
	    var prevActiveInstance = activeInstance
	    activeInstance = vm
	    var prevVnode = vm._vnode
	    vm._vnode = vnode
	    if (!prevVnode) {
	      // Vue.prototype.__patch__ is injected in entry points
	      // based on the rendering backend used.
	      vm.$el = vm.__patch__(vm.$el, vnode, hydrating)
	    } else {
	      vm.$el = vm.__patch__(prevVnode, vnode)
	    }
	    activeInstance = prevActiveInstance
	    // update __vue__ reference
	    if (prevEl) {
	      prevEl.__vue__ = null
	    }
	    if (vm.$el) {
	      vm.$el.__vue__ = vm
	    }
	    // if parent is an HOC, update its $el as well
	    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
	      vm.$parent.$el = vm.$el
	    }
	    if (vm._isMounted) {
	      callHook(vm, 'updated')
	    }
	  }

	  Vue.prototype._updateFromParent = function (
	    propsData,
	    listeners,
	    parentVnode,
	    renderChildren
	  ) {
	    var vm = this
	    var hasChildren = !!(vm.$options._renderChildren || renderChildren)
	    vm.$options._parentVnode = parentVnode
	    vm.$options._renderChildren = renderChildren
	    // update props
	    if (propsData && vm.$options.props) {
	      observerState.shouldConvert = false
	      {
	        observerState.isSettingProps = true
	      }
	      var propKeys = vm.$options._propKeys || []
	      for (var i = 0; i < propKeys.length; i++) {
	        var key = propKeys[i]
	        vm[key] = validateProp(key, vm.$options.props, propsData, vm)
	      }
	      observerState.shouldConvert = true
	      {
	        observerState.isSettingProps = false
	      }
	    }
	    // update listeners
	    if (listeners) {
	      var oldListeners = vm.$options._parentListeners
	      vm.$options._parentListeners = listeners
	      vm._updateListeners(listeners, oldListeners)
	    }
	    // resolve slots + force update if has children
	    if (hasChildren) {
	      vm.$slots = resolveSlots(renderChildren, vm._renderContext)
	      vm.$forceUpdate()
	    }
	  }

	  Vue.prototype.$forceUpdate = function () {
	    var vm = this
	    if (vm._watcher) {
	      vm._watcher.update()
	    }
	  }

	  Vue.prototype.$destroy = function () {
	    var vm = this
	    if (vm._isBeingDestroyed) {
	      return
	    }
	    callHook(vm, 'beforeDestroy')
	    vm._isBeingDestroyed = true
	    // remove self from parent
	    var parent = vm.$parent
	    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
	      remove$1(parent.$children, vm)
	    }
	    // teardown watchers
	    if (vm._watcher) {
	      vm._watcher.teardown()
	    }
	    var i = vm._watchers.length
	    while (i--) {
	      vm._watchers[i].teardown()
	    }
	    // remove reference from data ob
	    // frozen object may not have observer.
	    if (vm._data.__ob__) {
	      vm._data.__ob__.vmCount--
	    }
	    // call the last hook...
	    vm._isDestroyed = true
	    callHook(vm, 'destroyed')
	    // turn off all instance listeners.
	    vm.$off()
	    // remove __vue__ reference
	    if (vm.$el) {
	      vm.$el.__vue__ = null
	    }
	  }
	}

	function callHook (vm, hook) {
	  var handlers = vm.$options[hook]
	  if (handlers) {
	    for (var i = 0, j = handlers.length; i < j; i++) {
	      handlers[i].call(vm)
	    }
	  }
	  vm.$emit('hook:' + hook)
	}

	/*  */

	var hooks = { init: init, prepatch: prepatch, insert: insert, destroy: destroy$1 }
	var hooksToMerge = Object.keys(hooks)

	function createComponent (
	  Ctor,
	  data,
	  context,
	  children,
	  tag
	) {
	  if (!Ctor) {
	    return
	  }

	  if (isObject(Ctor)) {
	    Ctor = Vue$3.extend(Ctor)
	  }

	  if (typeof Ctor !== 'function') {
	    {
	      warn(("Invalid Component definition: " + (String(Ctor))), context)
	    }
	    return
	  }

	  // async component
	  if (!Ctor.cid) {
	    if (Ctor.resolved) {
	      Ctor = Ctor.resolved
	    } else {
	      Ctor = resolveAsyncComponent(Ctor, function () {
	        // it's ok to queue this on every render because
	        // $forceUpdate is buffered by the scheduler.
	        context.$forceUpdate()
	      })
	      if (!Ctor) {
	        // return nothing if this is indeed an async component
	        // wait for the callback to trigger parent update.
	        return
	      }
	    }
	  }

	  data = data || {}

	  // extract props
	  var propsData = extractProps(data, Ctor)

	  // functional component
	  if (Ctor.options.functional) {
	    return createFunctionalComponent(Ctor, propsData, data, context, children)
	  }

	  // extract listeners, since these needs to be treated as
	  // child component listeners instead of DOM listeners
	  var listeners = data.on
	  // replace with listeners with .native modifier
	  data.on = data.nativeOn

	  if (Ctor.options.abstract) {
	    // abstract components do not keep anything
	    // other than props & listeners
	    data = {}
	  }

	  // merge component management hooks onto the placeholder node
	  mergeHooks(data)

	  // return a placeholder vnode
	  var name = Ctor.options.name || tag
	  var vnode = new VNode(
	    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
	    data, undefined, undefined, undefined, undefined, context,
	    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children }
	  )
	  return vnode
	}

	function createFunctionalComponent (
	  Ctor,
	  propsData,
	  data,
	  context,
	  children
	) {
	  var props = {}
	  var propOptions = Ctor.options.props
	  if (propOptions) {
	    for (var key in propOptions) {
	      props[key] = validateProp(key, propOptions, propsData)
	    }
	  }
	  return Ctor.options.render.call(
	    null,
	    // ensure the createElement function in functional components
	    // gets a unique context - this is necessary for correct named slot check
	    bind$1(createElement, { _self: Object.create(context) }),
	    {
	      props: props,
	      data: data,
	      parent: context,
	      children: normalizeChildren(children),
	      slots: function () { return resolveSlots(children, context); }
	    }
	  )
	}

	function createComponentInstanceForVnode (
	  vnode, // we know it's MountedComponentVNode but flow doesn't
	  parent // activeInstance in lifecycle state
	) {
	  var vnodeComponentOptions = vnode.componentOptions
	  var options = {
	    _isComponent: true,
	    parent: parent,
	    propsData: vnodeComponentOptions.propsData,
	    _componentTag: vnodeComponentOptions.tag,
	    _parentVnode: vnode,
	    _parentListeners: vnodeComponentOptions.listeners,
	    _renderChildren: vnodeComponentOptions.children
	  }
	  // check inline-template render functions
	  var inlineTemplate = vnode.data.inlineTemplate
	  if (inlineTemplate) {
	    options.render = inlineTemplate.render
	    options.staticRenderFns = inlineTemplate.staticRenderFns
	  }
	  return new vnodeComponentOptions.Ctor(options)
	}

	function init (vnode, hydrating) {
	  if (!vnode.child || vnode.child._isDestroyed) {
	    var child = vnode.child = createComponentInstanceForVnode(vnode, activeInstance)
	    child.$mount(hydrating ? vnode.elm : undefined, hydrating)
	  }
	}

	function prepatch (
	  oldVnode,
	  vnode
	) {
	  var options = vnode.componentOptions
	  var child = vnode.child = oldVnode.child
	  child._updateFromParent(
	    options.propsData, // updated props
	    options.listeners, // updated listeners
	    vnode, // new parent vnode
	    options.children // new children
	  )
	}

	function insert (vnode) {
	  if (!vnode.child._isMounted) {
	    vnode.child._isMounted = true
	    callHook(vnode.child, 'mounted')
	  }
	  if (vnode.data.keepAlive) {
	    vnode.child._inactive = false
	    callHook(vnode.child, 'activated')
	  }
	}

	function destroy$1 (vnode) {
	  if (!vnode.child._isDestroyed) {
	    if (!vnode.data.keepAlive) {
	      vnode.child.$destroy()
	    } else {
	      vnode.child._inactive = true
	      callHook(vnode.child, 'deactivated')
	    }
	  }
	}

	function resolveAsyncComponent (
	  factory,
	  cb
	) {
	  if (factory.requested) {
	    // pool callbacks
	    factory.pendingCallbacks.push(cb)
	  } else {
	    factory.requested = true
	    var cbs = factory.pendingCallbacks = [cb]
	    var sync = true

	    var resolve = function (res) {
	      if (isObject(res)) {
	        res = Vue$3.extend(res)
	      }
	      // cache resolved
	      factory.resolved = res
	      // invoke callbacks only if this is not a synchronous resolve
	      // (async resolves are shimmed as synchronous during SSR)
	      if (!sync) {
	        for (var i = 0, l = cbs.length; i < l; i++) {
	          cbs[i](res)
	        }
	      }
	    }

	    var reject = function (reason) {
	      "development" !== 'production' && warn(
	        "Failed to resolve async component: " + (String(factory)) +
	        (reason ? ("\nReason: " + reason) : '')
	      )
	    }

	    var res = factory(resolve, reject)

	    // handle promise
	    if (res && typeof res.then === 'function' && !factory.resolved) {
	      res.then(resolve, reject)
	    }

	    sync = false
	    // return in case resolved synchronously
	    return factory.resolved
	  }
	}

	function extractProps (data, Ctor) {
	  // we are only extrating raw values here.
	  // validation and default values are handled in the child
	  // component itself.
	  var propOptions = Ctor.options.props
	  if (!propOptions) {
	    return
	  }
	  var res = {}
	  var attrs = data.attrs;
	  var props = data.props;
	  var domProps = data.domProps;
	  if (attrs || props || domProps) {
	    for (var key in propOptions) {
	      var altKey = hyphenate(key)
	      checkProp(res, props, key, altKey, true) ||
	      checkProp(res, attrs, key, altKey) ||
	      checkProp(res, domProps, key, altKey)
	    }
	  }
	  return res
	}

	function checkProp (
	  res,
	  hash,
	  key,
	  altKey,
	  preserve
	) {
	  if (hash) {
	    if (hasOwn(hash, key)) {
	      res[key] = hash[key]
	      if (!preserve) {
	        delete hash[key]
	      }
	      return true
	    } else if (hasOwn(hash, altKey)) {
	      res[key] = hash[altKey]
	      if (!preserve) {
	        delete hash[altKey]
	      }
	      return true
	    }
	  }
	  return false
	}

	function mergeHooks (data) {
	  if (!data.hook) {
	    data.hook = {}
	  }
	  for (var i = 0; i < hooksToMerge.length; i++) {
	    var key = hooksToMerge[i]
	    var fromParent = data.hook[key]
	    var ours = hooks[key]
	    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours
	  }
	}

	function mergeHook$1 (a, b) {
	  // since all hooks have at most two args, use fixed args
	  // to avoid having to use fn.apply().
	  return function (_, __) {
	    a(_, __)
	    b(_, __)
	  }
	}

	/*  */

	// wrapper function for providing a more flexible interface
	// without getting yelled at by flow
	function createElement (
	  tag,
	  data,
	  children
	) {
	  if (data && (Array.isArray(data) || typeof data !== 'object')) {
	    children = data
	    data = undefined
	  }
	  // make sure to use real instance instead of proxy as context
	  return _createElement(this._self, tag, data, children)
	}

	function _createElement (
	  context,
	  tag,
	  data,
	  children
	) {
	  if (data && data.__ob__) {
	    "development" !== 'production' && warn(
	      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
	      'Always create fresh vnode data objects in each render!',
	      context
	    )
	    return
	  }
	  if (!tag) {
	    // in case of component :is set to falsy value
	    return emptyVNode()
	  }
	  if (typeof tag === 'string') {
	    var Ctor
	    var ns = config.getTagNamespace(tag)
	    if (config.isReservedTag(tag)) {
	      // platform built-in elements
	      return new VNode(
	        tag, data, normalizeChildren(children, ns),
	        undefined, undefined, ns, context
	      )
	    } else if ((Ctor = resolveAsset(context.$options, 'components', tag))) {
	      // component
	      return createComponent(Ctor, data, context, children, tag)
	    } else {
	      // unknown or unlisted namespaced elements
	      // check at runtime because it may get assigned a namespace when its
	      // parent normalizes children
	      return new VNode(
	        tag, data, normalizeChildren(children, ns),
	        undefined, undefined, ns, context
	      )
	    }
	  } else {
	    // direct component options / constructor
	    return createComponent(tag, data, context, children)
	  }
	}

	/*  */

	function initRender (vm) {
	  vm.$vnode = null // the placeholder node in parent tree
	  vm._vnode = null // the root of the child tree
	  vm._staticTrees = null
	  vm._renderContext = vm.$options._parentVnode && vm.$options._parentVnode.context
	  vm.$slots = resolveSlots(vm.$options._renderChildren, vm._renderContext)
	  // bind the public createElement fn to this instance
	  // so that we get proper render context inside it.
	  vm.$createElement = bind$1(createElement, vm)
	  if (vm.$options.el) {
	    vm.$mount(vm.$options.el)
	  }
	}

	function renderMixin (Vue) {
	  Vue.prototype.$nextTick = function (fn) {
	    nextTick(fn, this)
	  }

	  Vue.prototype._render = function () {
	    var vm = this
	    var ref = vm.$options;
	    var render = ref.render;
	    var staticRenderFns = ref.staticRenderFns;
	    var _parentVnode = ref._parentVnode;

	    if (vm._isMounted) {
	      // clone slot nodes on re-renders
	      for (var key in vm.$slots) {
	        vm.$slots[key] = cloneVNodes(vm.$slots[key])
	      }
	    }

	    if (staticRenderFns && !vm._staticTrees) {
	      vm._staticTrees = []
	    }
	    // set parent vnode. this allows render functions to have access
	    // to the data on the placeholder node.
	    vm.$vnode = _parentVnode
	    // render self
	    var vnode
	    try {
	      vnode = render.call(vm._renderProxy, vm.$createElement)
	    } catch (e) {
	      {
	        warn(("Error when rendering " + (formatComponentName(vm)) + ":"))
	      }
	      /* istanbul ignore else */
	      if (config.errorHandler) {
	        config.errorHandler.call(null, e, vm)
	      } else {
	        if (config._isServer) {
	          throw e
	        } else {
	          setTimeout(function () { throw e }, 0)
	        }
	      }
	      // return previous vnode to prevent render error causing blank component
	      vnode = vm._vnode
	    }
	    // return empty vnode in case the render function errored out
	    if (!(vnode instanceof VNode)) {
	      if ("development" !== 'production' && Array.isArray(vnode)) {
	        warn(
	          'Multiple root nodes returned from render function. Render function ' +
	          'should return a single root node.',
	          vm
	        )
	      }
	      vnode = emptyVNode()
	    }
	    // set parent
	    vnode.parent = _parentVnode
	    return vnode
	  }

	  // shorthands used in render functions
	  Vue.prototype._h = createElement
	  // toString for mustaches
	  Vue.prototype._s = _toString
	  // number conversion
	  Vue.prototype._n = toNumber
	  // empty vnode
	  Vue.prototype._e = emptyVNode
	  // loose equal
	  Vue.prototype._q = looseEqual
	  // loose indexOf
	  Vue.prototype._i = looseIndexOf

	  // render static tree by index
	  Vue.prototype._m = function renderStatic (
	    index,
	    isInFor
	  ) {
	    var tree = this._staticTrees[index]
	    // if has already-rendered static tree and not inside v-for,
	    // we can reuse the same tree by doing a shallow clone.
	    if (tree && !isInFor) {
	      return Array.isArray(tree)
	        ? cloneVNodes(tree)
	        : cloneVNode(tree)
	    }
	    // otherwise, render a fresh tree.
	    tree = this._staticTrees[index] = this.$options.staticRenderFns[index].call(this._renderProxy)
	    if (Array.isArray(tree)) {
	      for (var i = 0; i < tree.length; i++) {
	        tree[i].isStatic = true
	        tree[i].key = "__static__" + index + "_" + i
	      }
	    } else {
	      tree.isStatic = true
	      tree.key = "__static__" + index
	    }
	    return tree
	  }

	  // filter resolution helper
	  var identity = function (_) { return _; }
	  Vue.prototype._f = function resolveFilter (id) {
	    return resolveAsset(this.$options, 'filters', id, true) || identity
	  }

	  // render v-for
	  Vue.prototype._l = function renderList (
	    val,
	    render
	  ) {
	    var ret, i, l, keys, key
	    if (Array.isArray(val)) {
	      ret = new Array(val.length)
	      for (i = 0, l = val.length; i < l; i++) {
	        ret[i] = render(val[i], i)
	      }
	    } else if (typeof val === 'number') {
	      ret = new Array(val)
	      for (i = 0; i < val; i++) {
	        ret[i] = render(i + 1, i)
	      }
	    } else if (isObject(val)) {
	      keys = Object.keys(val)
	      ret = new Array(keys.length)
	      for (i = 0, l = keys.length; i < l; i++) {
	        key = keys[i]
	        ret[i] = render(val[key], key, i)
	      }
	    }
	    return ret
	  }

	  // renderSlot
	  Vue.prototype._t = function (
	    name,
	    fallback
	  ) {
	    var slotNodes = this.$slots[name]
	    // warn duplicate slot usage
	    if (slotNodes && "development" !== 'production') {
	      slotNodes._rendered && warn(
	        "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
	        "- this will likely cause render errors.",
	        this
	      )
	      slotNodes._rendered = true
	    }
	    return slotNodes || fallback
	  }

	  // apply v-bind object
	  Vue.prototype._b = function bindProps (
	    data,
	    value,
	    asProp
	  ) {
	    if (value) {
	      if (!isObject(value)) {
	        "development" !== 'production' && warn(
	          'v-bind without argument expects an Object or Array value',
	          this
	        )
	      } else {
	        if (Array.isArray(value)) {
	          value = toObject(value)
	        }
	        for (var key in value) {
	          if (key === 'class' || key === 'style') {
	            data[key] = value[key]
	          } else {
	            var hash = asProp || config.mustUseProp(key)
	              ? data.domProps || (data.domProps = {})
	              : data.attrs || (data.attrs = {})
	            hash[key] = value[key]
	          }
	        }
	      }
	    }
	    return data
	  }

	  // expose v-on keyCodes
	  Vue.prototype._k = function getKeyCodes (key) {
	    return config.keyCodes[key]
	  }
	}

	function resolveSlots (
	  renderChildren,
	  context
	) {
	  var slots = {}
	  if (!renderChildren) {
	    return slots
	  }
	  var children = normalizeChildren(renderChildren) || []
	  var defaultSlot = []
	  var name, child
	  for (var i = 0, l = children.length; i < l; i++) {
	    child = children[i]
	    // named slots should only be respected if the vnode was rendered in the
	    // same context.
	    if (child.context === context &&
	        child.data && (name = child.data.slot)) {
	      var slot = (slots[name] || (slots[name] = []))
	      if (child.tag === 'template') {
	        slot.push.apply(slot, child.children)
	      } else {
	        slot.push(child)
	      }
	    } else {
	      defaultSlot.push(child)
	    }
	  }
	  // ignore single whitespace
	  if (defaultSlot.length && !(
	    defaultSlot.length === 1 &&
	    (defaultSlot[0].text === ' ' || defaultSlot[0].isComment)
	  )) {
	    slots.default = defaultSlot
	  }
	  return slots
	}

	/*  */

	function initEvents (vm) {
	  vm._events = Object.create(null)
	  // init parent attached events
	  var listeners = vm.$options._parentListeners
	  var on = bind$1(vm.$on, vm)
	  var off = bind$1(vm.$off, vm)
	  vm._updateListeners = function (listeners, oldListeners) {
	    updateListeners(listeners, oldListeners || {}, on, off)
	  }
	  if (listeners) {
	    vm._updateListeners(listeners)
	  }
	}

	function eventsMixin (Vue) {
	  Vue.prototype.$on = function (event, fn) {
	    var vm = this;(vm._events[event] || (vm._events[event] = [])).push(fn)
	    return vm
	  }

	  Vue.prototype.$once = function (event, fn) {
	    var vm = this
	    function on () {
	      vm.$off(event, on)
	      fn.apply(vm, arguments)
	    }
	    on.fn = fn
	    vm.$on(event, on)
	    return vm
	  }

	  Vue.prototype.$off = function (event, fn) {
	    var vm = this
	    // all
	    if (!arguments.length) {
	      vm._events = Object.create(null)
	      return vm
	    }
	    // specific event
	    var cbs = vm._events[event]
	    if (!cbs) {
	      return vm
	    }
	    if (arguments.length === 1) {
	      vm._events[event] = null
	      return vm
	    }
	    // specific handler
	    var cb
	    var i = cbs.length
	    while (i--) {
	      cb = cbs[i]
	      if (cb === fn || cb.fn === fn) {
	        cbs.splice(i, 1)
	        break
	      }
	    }
	    return vm
	  }

	  Vue.prototype.$emit = function (event) {
	    var vm = this
	    var cbs = vm._events[event]
	    if (cbs) {
	      cbs = cbs.length > 1 ? toArray(cbs) : cbs
	      var args = toArray(arguments, 1)
	      for (var i = 0, l = cbs.length; i < l; i++) {
	        cbs[i].apply(vm, args)
	      }
	    }
	    return vm
	  }
	}

	/*  */

	var uid = 0

	function initMixin (Vue) {
	  Vue.prototype._init = function (options) {
	    var vm = this
	    // a uid
	    vm._uid = uid++
	    // a flag to avoid this being observed
	    vm._isVue = true
	    // merge options
	    if (options && options._isComponent) {
	      // optimize internal component instantiation
	      // since dynamic options merging is pretty slow, and none of the
	      // internal component options needs special treatment.
	      initInternalComponent(vm, options)
	    } else {
	      vm.$options = mergeOptions(
	        resolveConstructorOptions(vm),
	        options || {},
	        vm
	      )
	    }
	    /* istanbul ignore else */
	    {
	      initProxy(vm)
	    }
	    // expose real self
	    vm._self = vm
	    initLifecycle(vm)
	    initEvents(vm)
	    callHook(vm, 'beforeCreate')
	    initState(vm)
	    callHook(vm, 'created')
	    initRender(vm)
	  }

	  function initInternalComponent (vm, options) {
	    var opts = vm.$options = Object.create(resolveConstructorOptions(vm))
	    // doing this because it's faster than dynamic enumeration.
	    opts.parent = options.parent
	    opts.propsData = options.propsData
	    opts._parentVnode = options._parentVnode
	    opts._parentListeners = options._parentListeners
	    opts._renderChildren = options._renderChildren
	    opts._componentTag = options._componentTag
	    if (options.render) {
	      opts.render = options.render
	      opts.staticRenderFns = options.staticRenderFns
	    }
	  }

	  function resolveConstructorOptions (vm) {
	    var Ctor = vm.constructor
	    var options = Ctor.options
	    if (Ctor.super) {
	      var superOptions = Ctor.super.options
	      var cachedSuperOptions = Ctor.superOptions
	      if (superOptions !== cachedSuperOptions) {
	        // super option changed
	        Ctor.superOptions = superOptions
	        options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions)
	        if (options.name) {
	          options.components[options.name] = Ctor
	        }
	      }
	    }
	    return options
	  }
	}

	function Vue$3 (options) {
	  if ("development" !== 'production' &&
	    !(this instanceof Vue$3)) {
	    warn('Vue is a constructor and should be called with the `new` keyword')
	  }
	  this._init(options)
	}

	initMixin(Vue$3)
	stateMixin(Vue$3)
	eventsMixin(Vue$3)
	lifecycleMixin(Vue$3)
	renderMixin(Vue$3)

	var warn = noop
	var formatComponentName

	{
	  var hasConsole = typeof console !== 'undefined'

	  warn = function (msg, vm) {
	    if (hasConsole && (!config.silent)) {
	      console.error("[Vue warn]: " + msg + " " + (
	        vm ? formatLocation(formatComponentName(vm)) : ''
	      ))
	    }
	  }

	  formatComponentName = function (vm) {
	    if (vm.$root === vm) {
	      return 'root instance'
	    }
	    var name = vm._isVue
	      ? vm.$options.name || vm.$options._componentTag
	      : vm.name
	    return name ? ("component <" + name + ">") : "anonymous component"
	  }

	  var formatLocation = function (str) {
	    if (str === 'anonymous component') {
	      str += " - use the \"name\" option for better debugging messages."
	    }
	    return ("(found in " + str + ")")
	  }
	}

	/*  */

	/**
	 * Option overwriting strategies are functions that handle
	 * how to merge a parent option value and a child option
	 * value into the final value.
	 */
	var strats = config.optionMergeStrategies

	/**
	 * Options with restrictions
	 */
	{
	  strats.el = strats.propsData = function (parent, child, vm, key) {
	    if (!vm) {
	      warn(
	        "option \"" + key + "\" can only be used during instance " +
	        'creation with the `new` keyword.'
	      )
	    }
	    return defaultStrat(parent, child)
	  }

	  strats.name = function (parent, child, vm) {
	    if (vm && child) {
	      warn(
	        'options "name" can only be used as a component definition option, ' +
	        'not during instance creation.'
	      )
	    }
	    return defaultStrat(parent, child)
	  }
	}

	/**
	 * Helper that recursively merges two data objects together.
	 */
	function mergeData (to, from) {
	  var key, toVal, fromVal
	  for (key in from) {
	    toVal = to[key]
	    fromVal = from[key]
	    if (!hasOwn(to, key)) {
	      set(to, key, fromVal)
	    } else if (isObject(toVal) && isObject(fromVal)) {
	      mergeData(toVal, fromVal)
	    }
	  }
	  return to
	}

	/**
	 * Data
	 */
	strats.data = function (
	  parentVal,
	  childVal,
	  vm
	) {
	  if (!vm) {
	    // in a Vue.extend merge, both should be functions
	    if (!childVal) {
	      return parentVal
	    }
	    if (typeof childVal !== 'function') {
	      "development" !== 'production' && warn(
	        'The "data" option should be a function ' +
	        'that returns a per-instance value in component ' +
	        'definitions.',
	        vm
	      )
	      return parentVal
	    }
	    if (!parentVal) {
	      return childVal
	    }
	    // when parentVal & childVal are both present,
	    // we need to return a function that returns the
	    // merged result of both functions... no need to
	    // check if parentVal is a function here because
	    // it has to be a function to pass previous merges.
	    return function mergedDataFn () {
	      return mergeData(
	        childVal.call(this),
	        parentVal.call(this)
	      )
	    }
	  } else if (parentVal || childVal) {
	    return function mergedInstanceDataFn () {
	      // instance merge
	      var instanceData = typeof childVal === 'function'
	        ? childVal.call(vm)
	        : childVal
	      var defaultData = typeof parentVal === 'function'
	        ? parentVal.call(vm)
	        : undefined
	      if (instanceData) {
	        return mergeData(instanceData, defaultData)
	      } else {
	        return defaultData
	      }
	    }
	  }
	}

	/**
	 * Hooks and param attributes are merged as arrays.
	 */
	function mergeHook (
	  parentVal,
	  childVal
	) {
	  return childVal
	    ? parentVal
	      ? parentVal.concat(childVal)
	      : Array.isArray(childVal)
	        ? childVal
	        : [childVal]
	    : parentVal
	}

	config._lifecycleHooks.forEach(function (hook) {
	  strats[hook] = mergeHook
	})

	/**
	 * Assets
	 *
	 * When a vm is present (instance creation), we need to do
	 * a three-way merge between constructor options, instance
	 * options and parent options.
	 */
	function mergeAssets (parentVal, childVal) {
	  var res = Object.create(parentVal || null)
	  return childVal
	    ? extend(res, childVal)
	    : res
	}

	config._assetTypes.forEach(function (type) {
	  strats[type + 's'] = mergeAssets
	})

	/**
	 * Watchers.
	 *
	 * Watchers hashes should not overwrite one
	 * another, so we merge them as arrays.
	 */
	strats.watch = function (parentVal, childVal) {
	  /* istanbul ignore if */
	  if (!childVal) { return parentVal }
	  if (!parentVal) { return childVal }
	  var ret = {}
	  extend(ret, parentVal)
	  for (var key in childVal) {
	    var parent = ret[key]
	    var child = childVal[key]
	    if (parent && !Array.isArray(parent)) {
	      parent = [parent]
	    }
	    ret[key] = parent
	      ? parent.concat(child)
	      : [child]
	  }
	  return ret
	}

	/**
	 * Other object hashes.
	 */
	strats.props =
	strats.methods =
	strats.computed = function (parentVal, childVal) {
	  if (!childVal) { return parentVal }
	  if (!parentVal) { return childVal }
	  var ret = Object.create(null)
	  extend(ret, parentVal)
	  extend(ret, childVal)
	  return ret
	}

	/**
	 * Default strategy.
	 */
	var defaultStrat = function (parentVal, childVal) {
	  return childVal === undefined
	    ? parentVal
	    : childVal
	}

	/**
	 * Make sure component options get converted to actual
	 * constructors.
	 */
	function normalizeComponents (options) {
	  if (options.components) {
	    var components = options.components
	    var def
	    for (var key in components) {
	      var lower = key.toLowerCase()
	      if (isBuiltInTag(lower) || config.isReservedTag(lower)) {
	        "development" !== 'production' && warn(
	          'Do not use built-in or reserved HTML elements as component ' +
	          'id: ' + key
	        )
	        continue
	      }
	      def = components[key]
	      if (isPlainObject(def)) {
	        components[key] = Vue$3.extend(def)
	      }
	    }
	  }
	}

	/**
	 * Ensure all props option syntax are normalized into the
	 * Object-based format.
	 */
	function normalizeProps (options) {
	  var props = options.props
	  if (!props) { return }
	  var res = {}
	  var i, val, name
	  if (Array.isArray(props)) {
	    i = props.length
	    while (i--) {
	      val = props[i]
	      if (typeof val === 'string') {
	        name = camelize(val)
	        res[name] = { type: null }
	      } else {
	        warn('props must be strings when using array syntax.')
	      }
	    }
	  } else if (isPlainObject(props)) {
	    for (var key in props) {
	      val = props[key]
	      name = camelize(key)
	      res[name] = isPlainObject(val)
	        ? val
	        : { type: val }
	    }
	  }
	  options.props = res
	}

	/**
	 * Normalize raw function directives into object format.
	 */
	function normalizeDirectives (options) {
	  var dirs = options.directives
	  if (dirs) {
	    for (var key in dirs) {
	      var def = dirs[key]
	      if (typeof def === 'function') {
	        dirs[key] = { bind: def, update: def }
	      }
	    }
	  }
	}

	/**
	 * Merge two option objects into a new one.
	 * Core utility used in both instantiation and inheritance.
	 */
	function mergeOptions (
	  parent,
	  child,
	  vm
	) {
	  normalizeComponents(child)
	  normalizeProps(child)
	  normalizeDirectives(child)
	  var extendsFrom = child.extends
	  if (extendsFrom) {
	    parent = typeof extendsFrom === 'function'
	      ? mergeOptions(parent, extendsFrom.options, vm)
	      : mergeOptions(parent, extendsFrom, vm)
	  }
	  if (child.mixins) {
	    for (var i = 0, l = child.mixins.length; i < l; i++) {
	      var mixin = child.mixins[i]
	      if (mixin.prototype instanceof Vue$3) {
	        mixin = mixin.options
	      }
	      parent = mergeOptions(parent, mixin, vm)
	    }
	  }
	  var options = {}
	  var key
	  for (key in parent) {
	    mergeField(key)
	  }
	  for (key in child) {
	    if (!hasOwn(parent, key)) {
	      mergeField(key)
	    }
	  }
	  function mergeField (key) {
	    var strat = strats[key] || defaultStrat
	    options[key] = strat(parent[key], child[key], vm, key)
	  }
	  return options
	}

	/**
	 * Resolve an asset.
	 * This function is used because child instances need access
	 * to assets defined in its ancestor chain.
	 */
	function resolveAsset (
	  options,
	  type,
	  id,
	  warnMissing
	) {
	  /* istanbul ignore if */
	  if (typeof id !== 'string') {
	    return
	  }
	  var assets = options[type]
	  var res = assets[id] ||
	    // camelCase ID
	    assets[camelize(id)] ||
	    // Pascal Case ID
	    assets[capitalize(camelize(id))]
	  if ("development" !== 'production' && warnMissing && !res) {
	    warn(
	      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
	      options
	    )
	  }
	  return res
	}

	/*  */

	function validateProp (
	  key,
	  propOptions,
	  propsData,
	  vm
	) {
	  var prop = propOptions[key]
	  var absent = !hasOwn(propsData, key)
	  var value = propsData[key]
	  // handle boolean props
	  if (getType(prop.type) === 'Boolean') {
	    if (absent && !hasOwn(prop, 'default')) {
	      value = false
	    } else if (value === '' || value === hyphenate(key)) {
	      value = true
	    }
	  }
	  // check default value
	  if (value === undefined) {
	    value = getPropDefaultValue(vm, prop, key)
	    // since the default value is a fresh copy,
	    // make sure to observe it.
	    var prevShouldConvert = observerState.shouldConvert
	    observerState.shouldConvert = true
	    observe(value)
	    observerState.shouldConvert = prevShouldConvert
	  }
	  {
	    assertProp(prop, key, value, vm, absent)
	  }
	  return value
	}

	/**
	 * Get the default value of a prop.
	 */
	function getPropDefaultValue (vm, prop, name) {
	  // no default, return undefined
	  if (!hasOwn(prop, 'default')) {
	    return undefined
	  }
	  var def = prop.default
	  // warn against non-factory defaults for Object & Array
	  if (isObject(def)) {
	    "development" !== 'production' && warn(
	      'Invalid default value for prop "' + name + '": ' +
	      'Props with type Object/Array must use a factory function ' +
	      'to return the default value.',
	      vm
	    )
	  }
	  // call factory function for non-Function types
	  return typeof def === 'function' && prop.type !== Function
	    ? def.call(vm)
	    : def
	}

	/**
	 * Assert whether a prop is valid.
	 */
	function assertProp (
	  prop,
	  name,
	  value,
	  vm,
	  absent
	) {
	  if (prop.required && absent) {
	    warn(
	      'Missing required prop: "' + name + '"',
	      vm
	    )
	    return
	  }
	  if (value == null && !prop.required) {
	    return
	  }
	  var type = prop.type
	  var valid = !type || type === true
	  var expectedTypes = []
	  if (type) {
	    if (!Array.isArray(type)) {
	      type = [type]
	    }
	    for (var i = 0; i < type.length && !valid; i++) {
	      var assertedType = assertType(value, type[i])
	      expectedTypes.push(assertedType.expectedType)
	      valid = assertedType.valid
	    }
	  }
	  if (!valid) {
	    warn(
	      'Invalid prop: type check failed for prop "' + name + '".' +
	      ' Expected ' + expectedTypes.map(capitalize).join(', ') +
	      ', got ' + Object.prototype.toString.call(value).slice(8, -1) + '.',
	      vm
	    )
	    return
	  }
	  var validator = prop.validator
	  if (validator) {
	    if (!validator(value)) {
	      warn(
	        'Invalid prop: custom validator check failed for prop "' + name + '".',
	        vm
	      )
	    }
	  }
	}

	/**
	 * Assert the type of a value
	 */
	function assertType (value, type) {
	  var valid
	  var expectedType = getType(type)
	  if (expectedType === 'String') {
	    valid = typeof value === (expectedType = 'string')
	  } else if (expectedType === 'Number') {
	    valid = typeof value === (expectedType = 'number')
	  } else if (expectedType === 'Boolean') {
	    valid = typeof value === (expectedType = 'boolean')
	  } else if (expectedType === 'Function') {
	    valid = typeof value === (expectedType = 'function')
	  } else if (expectedType === 'Object') {
	    valid = isPlainObject(value)
	  } else if (expectedType === 'Array') {
	    valid = Array.isArray(value)
	  } else {
	    valid = value instanceof type
	  }
	  return {
	    valid: valid,
	    expectedType: expectedType
	  }
	}

	/**
	 * Use function string name to check built-in types,
	 * because a simple equality check will fail when running
	 * across different vms / iframes.
	 */
	function getType (fn) {
	  var match = fn && fn.toString().match(/^\s*function (\w+)/)
	  return match && match[1]
	}



	var util = Object.freeze({
		defineReactive: defineReactive$$1,
		_toString: _toString,
		toNumber: toNumber,
		makeMap: makeMap,
		isBuiltInTag: isBuiltInTag,
		remove: remove$1,
		hasOwn: hasOwn,
		isPrimitive: isPrimitive,
		cached: cached,
		camelize: camelize,
		capitalize: capitalize,
		hyphenate: hyphenate,
		bind: bind$1,
		toArray: toArray,
		extend: extend,
		isObject: isObject,
		isPlainObject: isPlainObject,
		toObject: toObject,
		noop: noop,
		no: no,
		genStaticKeys: genStaticKeys,
		looseEqual: looseEqual,
		looseIndexOf: looseIndexOf,
		isReserved: isReserved,
		def: def,
		parsePath: parsePath,
		hasProto: hasProto,
		inBrowser: inBrowser,
		UA: UA,
		isIE: isIE,
		isIE9: isIE9,
		isEdge: isEdge,
		isAndroid: isAndroid,
		isIOS: isIOS,
		devtools: devtools,
		nextTick: nextTick,
		get _Set () { return _Set; },
		mergeOptions: mergeOptions,
		resolveAsset: resolveAsset,
		get warn () { return warn; },
		get formatComponentName () { return formatComponentName; },
		validateProp: validateProp
	});

	/*  */

	function initUse (Vue) {
	  Vue.use = function (plugin) {
	    /* istanbul ignore if */
	    if (plugin.installed) {
	      return
	    }
	    // additional parameters
	    var args = toArray(arguments, 1)
	    args.unshift(this)
	    if (typeof plugin.install === 'function') {
	      plugin.install.apply(plugin, args)
	    } else {
	      plugin.apply(null, args)
	    }
	    plugin.installed = true
	    return this
	  }
	}

	/*  */

	function initMixin$1 (Vue) {
	  Vue.mixin = function (mixin) {
	    Vue.options = mergeOptions(Vue.options, mixin)
	  }
	}

	/*  */

	function initExtend (Vue) {
	  /**
	   * Each instance constructor, including Vue, has a unique
	   * cid. This enables us to create wrapped "child
	   * constructors" for prototypal inheritance and cache them.
	   */
	  Vue.cid = 0
	  var cid = 1

	  /**
	   * Class inheritance
	   */
	  Vue.extend = function (extendOptions) {
	    extendOptions = extendOptions || {}
	    var Super = this
	    var isFirstExtend = Super.cid === 0
	    if (isFirstExtend && extendOptions._Ctor) {
	      return extendOptions._Ctor
	    }
	    var name = extendOptions.name || Super.options.name
	    {
	      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
	        warn(
	          'Invalid component name: "' + name + '". Component names ' +
	          'can only contain alphanumeric characaters and the hyphen.'
	        )
	        name = null
	      }
	    }
	    var Sub = function VueComponent (options) {
	      this._init(options)
	    }
	    Sub.prototype = Object.create(Super.prototype)
	    Sub.prototype.constructor = Sub
	    Sub.cid = cid++
	    Sub.options = mergeOptions(
	      Super.options,
	      extendOptions
	    )
	    Sub['super'] = Super
	    // allow further extension
	    Sub.extend = Super.extend
	    // create asset registers, so extended classes
	    // can have their private assets too.
	    config._assetTypes.forEach(function (type) {
	      Sub[type] = Super[type]
	    })
	    // enable recursive self-lookup
	    if (name) {
	      Sub.options.components[name] = Sub
	    }
	    // keep a reference to the super options at extension time.
	    // later at instantiation we can check if Super's options have
	    // been updated.
	    Sub.superOptions = Super.options
	    Sub.extendOptions = extendOptions
	    // cache constructor
	    if (isFirstExtend) {
	      extendOptions._Ctor = Sub
	    }
	    return Sub
	  }
	}

	/*  */

	function initAssetRegisters (Vue) {
	  /**
	   * Create asset registration methods.
	   */
	  config._assetTypes.forEach(function (type) {
	    Vue[type] = function (
	      id,
	      definition
	    ) {
	      if (!definition) {
	        return this.options[type + 's'][id]
	      } else {
	        /* istanbul ignore if */
	        {
	          if (type === 'component' && config.isReservedTag(id)) {
	            warn(
	              'Do not use built-in or reserved HTML elements as component ' +
	              'id: ' + id
	            )
	          }
	        }
	        if (type === 'component' && isPlainObject(definition)) {
	          definition.name = definition.name || id
	          definition = Vue.extend(definition)
	        }
	        if (type === 'directive' && typeof definition === 'function') {
	          definition = { bind: definition, update: definition }
	        }
	        this.options[type + 's'][id] = definition
	        return definition
	      }
	    }
	  })
	}

	var KeepAlive = {
	  name: 'keep-alive',
	  abstract: true,
	  created: function created () {
	    this.cache = Object.create(null)
	  },
	  render: function render () {
	    var vnode = getFirstComponentChild(this.$slots.default)
	    if (vnode && vnode.componentOptions) {
	      var opts = vnode.componentOptions
	      var key = vnode.key == null
	        // same constructor may get registered as different local components
	        // so cid alone is not enough (#3269)
	        ? opts.Ctor.cid + '::' + opts.tag
	        : vnode.key
	      if (this.cache[key]) {
	        vnode.child = this.cache[key].child
	      } else {
	        this.cache[key] = vnode
	      }
	      vnode.data.keepAlive = true
	    }
	    return vnode
	  },
	  destroyed: function destroyed () {
	    var this$1 = this;

	    for (var key in this.cache) {
	      var vnode = this$1.cache[key]
	      callHook(vnode.child, 'deactivated')
	      vnode.child.$destroy()
	    }
	  }
	}

	var builtInComponents = {
	  KeepAlive: KeepAlive
	}

	/*  */

	function initGlobalAPI (Vue) {
	  // config
	  var configDef = {}
	  configDef.get = function () { return config; }
	  {
	    configDef.set = function () {
	      warn(
	        'Do not replace the Vue.config object, set individual fields instead.'
	      )
	    }
	  }
	  Object.defineProperty(Vue, 'config', configDef)
	  Vue.util = util
	  Vue.set = set
	  Vue.delete = del
	  Vue.nextTick = nextTick

	  Vue.options = Object.create(null)
	  config._assetTypes.forEach(function (type) {
	    Vue.options[type + 's'] = Object.create(null)
	  })

	  extend(Vue.options.components, builtInComponents)

	  initUse(Vue)
	  initMixin$1(Vue)
	  initExtend(Vue)
	  initAssetRegisters(Vue)
	}

	initGlobalAPI(Vue$3)

	Object.defineProperty(Vue$3.prototype, '$isServer', {
	  get: function () { return config._isServer; }
	})

	Vue$3.version = '2.0.1'

	/*  */

	// attributes that should be using props for binding
	var mustUseProp = makeMap('value,selected,checked,muted')

	var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck')

	var isBooleanAttr = makeMap(
	  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
	  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
	  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
	  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
	  'required,reversed,scoped,seamless,selected,sortable,translate,' +
	  'truespeed,typemustmatch,visible'
	)

	var isAttr = makeMap(
	  'accept,accept-charset,accesskey,action,align,alt,async,autocomplete,' +
	  'autofocus,autoplay,autosave,bgcolor,border,buffered,challenge,charset,' +
	  'checked,cite,class,code,codebase,color,cols,colspan,content,http-equiv,' +
	  'name,contenteditable,contextmenu,controls,coords,data,datetime,default,' +
	  'defer,dir,dirname,disabled,download,draggable,dropzone,enctype,method,for,' +
	  'form,formaction,headers,<th>,height,hidden,high,href,hreflang,http-equiv,' +
	  'icon,id,ismap,itemprop,keytype,kind,label,lang,language,list,loop,low,' +
	  'manifest,max,maxlength,media,method,GET,POST,min,multiple,email,file,' +
	  'muted,name,novalidate,open,optimum,pattern,ping,placeholder,poster,' +
	  'preload,radiogroup,readonly,rel,required,reversed,rows,rowspan,sandbox,' +
	  'scope,scoped,seamless,selected,shape,size,type,text,password,sizes,span,' +
	  'spellcheck,src,srcdoc,srclang,srcset,start,step,style,summary,tabindex,' +
	  'target,title,type,usemap,value,width,wrap'
	)



	var xlinkNS = 'http://www.w3.org/1999/xlink'

	var isXlink = function (name) {
	  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
	}

	var getXlinkProp = function (name) {
	  return isXlink(name) ? name.slice(6, name.length) : ''
	}

	var isFalsyAttrValue = function (val) {
	  return val == null || val === false
	}

	/*  */

	function genClassForVnode (vnode) {
	  var data = vnode.data
	  var parentNode = vnode
	  var childNode = vnode
	  while (childNode.child) {
	    childNode = childNode.child._vnode
	    if (childNode.data) {
	      data = mergeClassData(childNode.data, data)
	    }
	  }
	  while ((parentNode = parentNode.parent)) {
	    if (parentNode.data) {
	      data = mergeClassData(data, parentNode.data)
	    }
	  }
	  return genClassFromData(data)
	}

	function mergeClassData (child, parent) {
	  return {
	    staticClass: concat(child.staticClass, parent.staticClass),
	    class: child.class
	      ? [child.class, parent.class]
	      : parent.class
	  }
	}

	function genClassFromData (data) {
	  var dynamicClass = data.class
	  var staticClass = data.staticClass
	  if (staticClass || dynamicClass) {
	    return concat(staticClass, stringifyClass(dynamicClass))
	  }
	  /* istanbul ignore next */
	  return ''
	}

	function concat (a, b) {
	  return a ? b ? (a + ' ' + b) : a : (b || '')
	}

	function stringifyClass (value) {
	  var res = ''
	  if (!value) {
	    return res
	  }
	  if (typeof value === 'string') {
	    return value
	  }
	  if (Array.isArray(value)) {
	    var stringified
	    for (var i = 0, l = value.length; i < l; i++) {
	      if (value[i]) {
	        if ((stringified = stringifyClass(value[i]))) {
	          res += stringified + ' '
	        }
	      }
	    }
	    return res.slice(0, -1)
	  }
	  if (isObject(value)) {
	    for (var key in value) {
	      if (value[key]) { res += key + ' ' }
	    }
	    return res.slice(0, -1)
	  }
	  /* istanbul ignore next */
	  return res
	}

	/*  */

	var namespaceMap = {
	  svg: 'http://www.w3.org/2000/svg',
	  math: 'http://www.w3.org/1998/Math/MathML'
	}

	var isHTMLTag = makeMap(
	  'html,body,base,head,link,meta,style,title,' +
	  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
	  'div,dd,dl,dt,figcaption,figure,hr,img,li,main,ol,p,pre,ul,' +
	  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
	  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
	  'embed,object,param,source,canvas,script,noscript,del,ins,' +
	  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
	  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
	  'output,progress,select,textarea,' +
	  'details,dialog,menu,menuitem,summary,' +
	  'content,element,shadow,template'
	)

	var isUnaryTag = makeMap(
	  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
	  'link,meta,param,source,track,wbr',
	  true
	)

	// Elements that you can, intentionally, leave open
	// (and which close themselves)
	var canBeLeftOpenTag = makeMap(
	  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source',
	  true
	)

	// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
	// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
	var isNonPhrasingTag = makeMap(
	  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
	  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
	  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
	  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
	  'title,tr,track',
	  true
	)

	// this map is intentionally selective, only covering SVG elements that may
	// contain child elements.
	var isSVG = makeMap(
	  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font,' +
	  'font-face,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
	  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
	  true
	)

	var isPreTag = function (tag) { return tag === 'pre'; }

	var isReservedTag = function (tag) {
	  return isHTMLTag(tag) || isSVG(tag)
	}

	function getTagNamespace (tag) {
	  if (isSVG(tag)) {
	    return 'svg'
	  }
	  // basic support for MathML
	  // note it doesn't support other MathML elements being component roots
	  if (tag === 'math') {
	    return 'math'
	  }
	}

	var unknownElementCache = Object.create(null)
	function isUnknownElement (tag) {
	  /* istanbul ignore if */
	  if (!inBrowser) {
	    return true
	  }
	  if (isReservedTag(tag)) {
	    return false
	  }
	  tag = tag.toLowerCase()
	  /* istanbul ignore if */
	  if (unknownElementCache[tag] != null) {
	    return unknownElementCache[tag]
	  }
	  var el = document.createElement(tag)
	  if (tag.indexOf('-') > -1) {
	    // http://stackoverflow.com/a/28210364/1070244
	    return (unknownElementCache[tag] = (
	      el.constructor === window.HTMLUnknownElement ||
	      el.constructor === window.HTMLElement
	    ))
	  } else {
	    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
	  }
	}

	/*  */

	/**
	 * Query an element selector if it's not an element already.
	 */
	function query (el) {
	  if (typeof el === 'string') {
	    var selector = el
	    el = document.querySelector(el)
	    if (!el) {
	      "development" !== 'production' && warn(
	        'Cannot find element: ' + selector
	      )
	      return document.createElement('div')
	    }
	  }
	  return el
	}

	/*  */

	function createElement$1 (tagName) {
	  return document.createElement(tagName)
	}

	function createElementNS (namespace, tagName) {
	  return document.createElementNS(namespaceMap[namespace], tagName)
	}

	function createTextNode (text) {
	  return document.createTextNode(text)
	}

	function createComment (text) {
	  return document.createComment(text)
	}

	function insertBefore (parentNode, newNode, referenceNode) {
	  parentNode.insertBefore(newNode, referenceNode)
	}

	function removeChild (node, child) {
	  node.removeChild(child)
	}

	function appendChild (node, child) {
	  node.appendChild(child)
	}

	function parentNode (node) {
	  return node.parentNode
	}

	function nextSibling (node) {
	  return node.nextSibling
	}

	function tagName (node) {
	  return node.tagName
	}

	function setTextContent (node, text) {
	  node.textContent = text
	}

	function childNodes (node) {
	  return node.childNodes
	}

	function setAttribute (node, key, val) {
	  node.setAttribute(key, val)
	}


	var nodeOps = Object.freeze({
		createElement: createElement$1,
		createElementNS: createElementNS,
		createTextNode: createTextNode,
		createComment: createComment,
		insertBefore: insertBefore,
		removeChild: removeChild,
		appendChild: appendChild,
		parentNode: parentNode,
		nextSibling: nextSibling,
		tagName: tagName,
		setTextContent: setTextContent,
		childNodes: childNodes,
		setAttribute: setAttribute
	});

	/*  */

	var ref = {
	  create: function create (_, vnode) {
	    registerRef(vnode)
	  },
	  update: function update (oldVnode, vnode) {
	    if (oldVnode.data.ref !== vnode.data.ref) {
	      registerRef(oldVnode, true)
	      registerRef(vnode)
	    }
	  },
	  destroy: function destroy (vnode) {
	    registerRef(vnode, true)
	  }
	}

	function registerRef (vnode, isRemoval) {
	  var key = vnode.data.ref
	  if (!key) { return }

	  var vm = vnode.context
	  var ref = vnode.child || vnode.elm
	  var refs = vm.$refs
	  if (isRemoval) {
	    if (Array.isArray(refs[key])) {
	      remove$1(refs[key], ref)
	    } else if (refs[key] === ref) {
	      refs[key] = undefined
	    }
	  } else {
	    if (vnode.data.refInFor) {
	      if (Array.isArray(refs[key])) {
	        refs[key].push(ref)
	      } else {
	        refs[key] = [ref]
	      }
	    } else {
	      refs[key] = ref
	    }
	  }
	}

	/**
	 * Virtual DOM patching algorithm based on Snabbdom by
	 * Simon Friis Vindum (@paldepind)
	 * Licensed under the MIT License
	 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
	 *
	 * modified by Evan You (@yyx990803)
	 *

	/*
	 * Not type-checking this because this file is perf-critical and the cost
	 * of making flow understand it is not worth it.
	 */

	var emptyData = {}
	var emptyNode = new VNode('', emptyData, [])
	var hooks$1 = ['create', 'update', 'postpatch', 'remove', 'destroy']

	function isUndef (s) {
	  return s == null
	}

	function isDef (s) {
	  return s != null
	}

	function sameVnode (vnode1, vnode2) {
	  return (
	    vnode1.key === vnode2.key &&
	    vnode1.tag === vnode2.tag &&
	    vnode1.isComment === vnode2.isComment &&
	    !vnode1.data === !vnode2.data
	  )
	}

	function createKeyToOldIdx (children, beginIdx, endIdx) {
	  var i, key
	  var map = {}
	  for (i = beginIdx; i <= endIdx; ++i) {
	    key = children[i].key
	    if (isDef(key)) { map[key] = i }
	  }
	  return map
	}

	function createPatchFunction (backend) {
	  var i, j
	  var cbs = {}

	  var modules = backend.modules;
	  var nodeOps = backend.nodeOps;

	  for (i = 0; i < hooks$1.length; ++i) {
	    cbs[hooks$1[i]] = []
	    for (j = 0; j < modules.length; ++j) {
	      if (modules[j][hooks$1[i]] !== undefined) { cbs[hooks$1[i]].push(modules[j][hooks$1[i]]) }
	    }
	  }

	  function emptyNodeAt (elm) {
	    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
	  }

	  function createRmCb (childElm, listeners) {
	    function remove$$1 () {
	      if (--remove$$1.listeners === 0) {
	        removeElement(childElm)
	      }
	    }
	    remove$$1.listeners = listeners
	    return remove$$1
	  }

	  function removeElement (el) {
	    var parent = nodeOps.parentNode(el)
	    nodeOps.removeChild(parent, el)
	  }

	  function createElm (vnode, insertedVnodeQueue, nested) {
	    var i
	    var data = vnode.data
	    vnode.isRootInsert = !nested
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode) }
	      // after calling the init hook, if the vnode is a child component
	      // it should've created a child instance and mounted it. the child
	      // component also has set the placeholder vnode's elm.
	      // in that case we can just return the element and be done.
	      if (isDef(i = vnode.child)) {
	        initComponent(vnode, insertedVnodeQueue)
	        return vnode.elm
	      }
	    }
	    var children = vnode.children
	    var tag = vnode.tag
	    if (isDef(tag)) {
	      {
	        if (
	          !vnode.ns &&
	          !(config.ignoredElements && config.ignoredElements.indexOf(tag) > -1) &&
	          config.isUnknownElement(tag)
	        ) {
	          warn(
	            'Unknown custom element: <' + tag + '> - did you ' +
	            'register the component correctly? For recursive components, ' +
	            'make sure to provide the "name" option.',
	            vnode.context
	          )
	        }
	      }
	      vnode.elm = vnode.ns
	        ? nodeOps.createElementNS(vnode.ns, tag)
	        : nodeOps.createElement(tag)
	      setScope(vnode)
	      createChildren(vnode, children, insertedVnodeQueue)
	      if (isDef(data)) {
	        invokeCreateHooks(vnode, insertedVnodeQueue)
	      }
	    } else if (vnode.isComment) {
	      vnode.elm = nodeOps.createComment(vnode.text)
	    } else {
	      vnode.elm = nodeOps.createTextNode(vnode.text)
	    }
	    return vnode.elm
	  }

	  function createChildren (vnode, children, insertedVnodeQueue) {
	    if (Array.isArray(children)) {
	      for (var i = 0; i < children.length; ++i) {
	        nodeOps.appendChild(vnode.elm, createElm(children[i], insertedVnodeQueue, true))
	      }
	    } else if (isPrimitive(vnode.text)) {
	      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text))
	    }
	  }

	  function isPatchable (vnode) {
	    while (vnode.child) {
	      vnode = vnode.child._vnode
	    }
	    return isDef(vnode.tag)
	  }

	  function invokeCreateHooks (vnode, insertedVnodeQueue) {
	    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
	      cbs.create[i$1](emptyNode, vnode)
	    }
	    i = vnode.data.hook // Reuse variable
	    if (isDef(i)) {
	      if (i.create) { i.create(emptyNode, vnode) }
	      if (i.insert) { insertedVnodeQueue.push(vnode) }
	    }
	  }

	  function initComponent (vnode, insertedVnodeQueue) {
	    if (vnode.data.pendingInsert) {
	      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert)
	    }
	    vnode.elm = vnode.child.$el
	    if (isPatchable(vnode)) {
	      invokeCreateHooks(vnode, insertedVnodeQueue)
	      setScope(vnode)
	    } else {
	      // empty component root.
	      // skip all element-related modules except for ref (#3455)
	      registerRef(vnode)
	      // make sure to invoke the insert hook
	      insertedVnodeQueue.push(vnode)
	    }
	  }

	  // set scope id attribute for scoped CSS.
	  // this is implemented as a special case to avoid the overhead
	  // of going through the normal attribute patching process.
	  function setScope (vnode) {
	    var i
	    if (isDef(i = vnode.context) && isDef(i = i.$options._scopeId)) {
	      nodeOps.setAttribute(vnode.elm, i, '')
	    }
	    if (isDef(i = activeInstance) &&
	        i !== vnode.context &&
	        isDef(i = i.$options._scopeId)) {
	      nodeOps.setAttribute(vnode.elm, i, '')
	    }
	  }

	  function addVnodes (parentElm, before, vnodes, startIdx, endIdx, insertedVnodeQueue) {
	    for (; startIdx <= endIdx; ++startIdx) {
	      nodeOps.insertBefore(parentElm, createElm(vnodes[startIdx], insertedVnodeQueue), before)
	    }
	  }

	  function invokeDestroyHook (vnode) {
	    var i, j
	    var data = vnode.data
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode) }
	      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode) }
	    }
	    if (isDef(i = vnode.child) && !data.keepAlive) {
	      invokeDestroyHook(i._vnode)
	    }
	    if (isDef(i = vnode.children)) {
	      for (j = 0; j < vnode.children.length; ++j) {
	        invokeDestroyHook(vnode.children[j])
	      }
	    }
	  }

	  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
	    for (; startIdx <= endIdx; ++startIdx) {
	      var ch = vnodes[startIdx]
	      if (isDef(ch)) {
	        if (isDef(ch.tag)) {
	          removeAndInvokeRemoveHook(ch)
	          invokeDestroyHook(ch)
	        } else { // Text node
	          nodeOps.removeChild(parentElm, ch.elm)
	        }
	      }
	    }
	  }

	  function removeAndInvokeRemoveHook (vnode, rm) {
	    if (rm || isDef(vnode.data)) {
	      var listeners = cbs.remove.length + 1
	      if (!rm) {
	        // directly removing
	        rm = createRmCb(vnode.elm, listeners)
	      } else {
	        // we have a recursively passed down rm callback
	        // increase the listeners count
	        rm.listeners += listeners
	      }
	      // recursively invoke hooks on child component root node
	      if (isDef(i = vnode.child) && isDef(i = i._vnode) && isDef(i.data)) {
	        removeAndInvokeRemoveHook(i, rm)
	      }
	      for (i = 0; i < cbs.remove.length; ++i) {
	        cbs.remove[i](vnode, rm)
	      }
	      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
	        i(vnode, rm)
	      } else {
	        rm()
	      }
	    } else {
	      removeElement(vnode.elm)
	    }
	  }

	  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
	    var oldStartIdx = 0
	    var newStartIdx = 0
	    var oldEndIdx = oldCh.length - 1
	    var oldStartVnode = oldCh[0]
	    var oldEndVnode = oldCh[oldEndIdx]
	    var newEndIdx = newCh.length - 1
	    var newStartVnode = newCh[0]
	    var newEndVnode = newCh[newEndIdx]
	    var oldKeyToIdx, idxInOld, elmToMove, before

	    // removeOnly is a special flag used only by <transition-group>
	    // to ensure removed elements stay in correct relative positions
	    // during leaving transitions
	    var canMove = !removeOnly

	    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
	      if (isUndef(oldStartVnode)) {
	        oldStartVnode = oldCh[++oldStartIdx] // Vnode has been moved left
	      } else if (isUndef(oldEndVnode)) {
	        oldEndVnode = oldCh[--oldEndIdx]
	      } else if (sameVnode(oldStartVnode, newStartVnode)) {
	        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue)
	        oldStartVnode = oldCh[++oldStartIdx]
	        newStartVnode = newCh[++newStartIdx]
	      } else if (sameVnode(oldEndVnode, newEndVnode)) {
	        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue)
	        oldEndVnode = oldCh[--oldEndIdx]
	        newEndVnode = newCh[--newEndIdx]
	      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
	        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue)
	        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm))
	        oldStartVnode = oldCh[++oldStartIdx]
	        newEndVnode = newCh[--newEndIdx]
	      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
	        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue)
	        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm)
	        oldEndVnode = oldCh[--oldEndIdx]
	        newStartVnode = newCh[++newStartIdx]
	      } else {
	        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx) }
	        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : null
	        if (isUndef(idxInOld)) { // New element
	          nodeOps.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm)
	          newStartVnode = newCh[++newStartIdx]
	        } else {
	          elmToMove = oldCh[idxInOld]
	          /* istanbul ignore if */
	          if ("development" !== 'production' && !elmToMove) {
	            warn(
	              'It seems there are duplicate keys that is causing an update error. ' +
	              'Make sure each v-for item has a unique key.'
	            )
	          }
	          if (elmToMove.tag !== newStartVnode.tag) {
	            // same key but different element. treat as new element
	            nodeOps.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm)
	            newStartVnode = newCh[++newStartIdx]
	          } else {
	            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue)
	            oldCh[idxInOld] = undefined
	            canMove && nodeOps.insertBefore(parentElm, newStartVnode.elm, oldStartVnode.elm)
	            newStartVnode = newCh[++newStartIdx]
	          }
	        }
	      }
	    }
	    if (oldStartIdx > oldEndIdx) {
	      before = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm
	      addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue)
	    } else if (newStartIdx > newEndIdx) {
	      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx)
	    }
	  }

	  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
	    if (oldVnode === vnode) {
	      return
	    }
	    // reuse element for static trees.
	    // note we only do this if the vnode is cloned -
	    // if the new node is not cloned it means the render functions have been
	    // reset by the hot-reload-api and we need to do a proper re-render.
	    if (vnode.isStatic &&
	        oldVnode.isStatic &&
	        vnode.key === oldVnode.key &&
	        vnode.isCloned) {
	      vnode.elm = oldVnode.elm
	      return
	    }
	    var i, hook
	    var hasData = isDef(i = vnode.data)
	    if (hasData && isDef(hook = i.hook) && isDef(i = hook.prepatch)) {
	      i(oldVnode, vnode)
	    }
	    var elm = vnode.elm = oldVnode.elm
	    var oldCh = oldVnode.children
	    var ch = vnode.children
	    if (hasData && isPatchable(vnode)) {
	      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode) }
	      if (isDef(hook) && isDef(i = hook.update)) { i(oldVnode, vnode) }
	    }
	    if (isUndef(vnode.text)) {
	      if (isDef(oldCh) && isDef(ch)) {
	        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly) }
	      } else if (isDef(ch)) {
	        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, '') }
	        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue)
	      } else if (isDef(oldCh)) {
	        removeVnodes(elm, oldCh, 0, oldCh.length - 1)
	      } else if (isDef(oldVnode.text)) {
	        nodeOps.setTextContent(elm, '')
	      }
	    } else if (oldVnode.text !== vnode.text) {
	      nodeOps.setTextContent(elm, vnode.text)
	    }
	    if (hasData) {
	      for (i = 0; i < cbs.postpatch.length; ++i) { cbs.postpatch[i](oldVnode, vnode) }
	      if (isDef(hook) && isDef(i = hook.postpatch)) { i(oldVnode, vnode) }
	    }
	  }

	  function invokeInsertHook (vnode, queue, initial) {
	    // delay insert hooks for component root nodes, invoke them after the
	    // element is really inserted
	    if (initial && vnode.parent) {
	      vnode.parent.data.pendingInsert = queue
	    } else {
	      for (var i = 0; i < queue.length; ++i) {
	        queue[i].data.hook.insert(queue[i])
	      }
	    }
	  }

	  var bailed = false
	  function hydrate (elm, vnode, insertedVnodeQueue) {
	    {
	      if (!assertNodeMatch(elm, vnode)) {
	        return false
	      }
	    }
	    vnode.elm = elm
	    var tag = vnode.tag;
	    var data = vnode.data;
	    var children = vnode.children;
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */) }
	      if (isDef(i = vnode.child)) {
	        // child component. it should have hydrated its own tree.
	        initComponent(vnode, insertedVnodeQueue)
	        return true
	      }
	    }
	    if (isDef(tag)) {
	      if (isDef(children)) {
	        var childNodes = nodeOps.childNodes(elm)
	        // empty element, allow client to pick up and populate children
	        if (!childNodes.length) {
	          createChildren(vnode, children, insertedVnodeQueue)
	        } else {
	          var childrenMatch = true
	          if (childNodes.length !== children.length) {
	            childrenMatch = false
	          } else {
	            for (var i$1 = 0; i$1 < children.length; i$1++) {
	              if (!hydrate(childNodes[i$1], children[i$1], insertedVnodeQueue)) {
	                childrenMatch = false
	                break
	              }
	            }
	          }
	          if (!childrenMatch) {
	            if ("development" !== 'production' &&
	                typeof console !== 'undefined' &&
	                !bailed) {
	              bailed = true
	              console.warn('Parent: ', elm)
	              console.warn('Mismatching childNodes vs. VNodes: ', childNodes, children)
	            }
	            return false
	          }
	        }
	      }
	      if (isDef(data)) {
	        invokeCreateHooks(vnode, insertedVnodeQueue)
	      }
	    }
	    return true
	  }

	  function assertNodeMatch (node, vnode) {
	    if (vnode.tag) {
	      return (
	        vnode.tag.indexOf('vue-component') === 0 ||
	        vnode.tag === nodeOps.tagName(node).toLowerCase()
	      )
	    } else {
	      return _toString(vnode.text) === node.data
	    }
	  }

	  return function patch (oldVnode, vnode, hydrating, removeOnly) {
	    var elm, parent
	    var isInitialPatch = false
	    var insertedVnodeQueue = []

	    if (!oldVnode) {
	      // empty mount, create new root element
	      isInitialPatch = true
	      createElm(vnode, insertedVnodeQueue)
	    } else {
	      var isRealElement = isDef(oldVnode.nodeType)
	      if (!isRealElement && sameVnode(oldVnode, vnode)) {
	        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly)
	      } else {
	        if (isRealElement) {
	          // mounting to a real element
	          // check if this is server-rendered content and if we can perform
	          // a successful hydration.
	          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute('server-rendered')) {
	            oldVnode.removeAttribute('server-rendered')
	            hydrating = true
	          }
	          if (hydrating) {
	            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
	              invokeInsertHook(vnode, insertedVnodeQueue, true)
	              return oldVnode
	            } else {
	              warn(
	                'The client-side rendered virtual DOM tree is not matching ' +
	                'server-rendered content. This is likely caused by incorrect ' +
	                'HTML markup, for example nesting block-level elements inside ' +
	                '<p>, or missing <tbody>. Bailing hydration and performing ' +
	                'full client-side render.'
	              )
	            }
	          }
	          // either not server-rendered, or hydration failed.
	          // create an empty node and replace it
	          oldVnode = emptyNodeAt(oldVnode)
	        }
	        elm = oldVnode.elm
	        parent = nodeOps.parentNode(elm)

	        createElm(vnode, insertedVnodeQueue)

	        // component root element replaced.
	        // update parent placeholder node element.
	        if (vnode.parent) {
	          vnode.parent.elm = vnode.elm
	          if (isPatchable(vnode)) {
	            for (var i = 0; i < cbs.create.length; ++i) {
	              cbs.create[i](emptyNode, vnode.parent)
	            }
	          }
	        }

	        if (parent !== null) {
	          nodeOps.insertBefore(parent, vnode.elm, nodeOps.nextSibling(elm))
	          removeVnodes(parent, [oldVnode], 0, 0)
	        } else if (isDef(oldVnode.tag)) {
	          invokeDestroyHook(oldVnode)
	        }
	      }
	    }

	    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch)
	    return vnode.elm
	  }
	}

	/*  */

	var directives = {
	  create: function bindDirectives (oldVnode, vnode) {
	    var hasInsert = false
	    forEachDirective(oldVnode, vnode, function (def, dir) {
	      callHook$1(def, dir, 'bind', vnode, oldVnode)
	      if (def.inserted) {
	        hasInsert = true
	      }
	    })
	    if (hasInsert) {
	      mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', function () {
	        applyDirectives(oldVnode, vnode, 'inserted')
	      })
	    }
	  },
	  update: function updateDirectives (oldVnode, vnode) {
	    applyDirectives(oldVnode, vnode, 'update')
	    // if old vnode has directives but new vnode doesn't
	    // we need to teardown the directives on the old one.
	    if (oldVnode.data.directives && !vnode.data.directives) {
	      applyDirectives(oldVnode, oldVnode, 'unbind')
	    }
	  },
	  postpatch: function postupdateDirectives (oldVnode, vnode) {
	    applyDirectives(oldVnode, vnode, 'componentUpdated')
	  },
	  destroy: function unbindDirectives (vnode) {
	    applyDirectives(vnode, vnode, 'unbind')
	  }
	}

	var emptyModifiers = Object.create(null)

	function forEachDirective (
	  oldVnode,
	  vnode,
	  fn
	) {
	  var dirs = vnode.data.directives
	  if (dirs) {
	    for (var i = 0; i < dirs.length; i++) {
	      var dir = dirs[i]
	      var def = resolveAsset(vnode.context.$options, 'directives', dir.name, true)
	      if (def) {
	        var oldDirs = oldVnode && oldVnode.data.directives
	        if (oldDirs) {
	          dir.oldValue = oldDirs[i].value
	        }
	        if (!dir.modifiers) {
	          dir.modifiers = emptyModifiers
	        }
	        fn(def, dir)
	      }
	    }
	  }
	}

	function applyDirectives (
	  oldVnode,
	  vnode,
	  hook
	) {
	  forEachDirective(oldVnode, vnode, function (def, dir) {
	    callHook$1(def, dir, hook, vnode, oldVnode)
	  })
	}

	function callHook$1 (def, dir, hook, vnode, oldVnode) {
	  var fn = def && def[hook]
	  if (fn) {
	    fn(vnode.elm, dir, vnode, oldVnode)
	  }
	}

	var baseModules = [
	  ref,
	  directives
	]

	/*  */

	function updateAttrs (oldVnode, vnode) {
	  if (!oldVnode.data.attrs && !vnode.data.attrs) {
	    return
	  }
	  var key, cur, old
	  var elm = vnode.elm
	  var oldAttrs = oldVnode.data.attrs || {}
	  var attrs = vnode.data.attrs || {}
	  // clone observed objects, as the user probably wants to mutate it
	  if (attrs.__ob__) {
	    attrs = vnode.data.attrs = extend({}, attrs)
	  }

	  for (key in attrs) {
	    cur = attrs[key]
	    old = oldAttrs[key]
	    if (old !== cur) {
	      setAttr(elm, key, cur)
	    }
	  }
	  for (key in oldAttrs) {
	    if (attrs[key] == null) {
	      if (isXlink(key)) {
	        elm.removeAttributeNS(xlinkNS, getXlinkProp(key))
	      } else if (!isEnumeratedAttr(key)) {
	        elm.removeAttribute(key)
	      }
	    }
	  }
	}

	function setAttr (el, key, value) {
	  if (isBooleanAttr(key)) {
	    // set attribute for blank value
	    // e.g. <option disabled>Select one</option>
	    if (isFalsyAttrValue(value)) {
	      el.removeAttribute(key)
	    } else {
	      el.setAttribute(key, key)
	    }
	  } else if (isEnumeratedAttr(key)) {
	    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true')
	  } else if (isXlink(key)) {
	    if (isFalsyAttrValue(value)) {
	      el.removeAttributeNS(xlinkNS, getXlinkProp(key))
	    } else {
	      el.setAttributeNS(xlinkNS, key, value)
	    }
	  } else {
	    if (isFalsyAttrValue(value)) {
	      el.removeAttribute(key)
	    } else {
	      el.setAttribute(key, value)
	    }
	  }
	}

	var attrs = {
	  create: updateAttrs,
	  update: updateAttrs
	}

	/*  */

	function updateClass (oldVnode, vnode) {
	  var el = vnode.elm
	  var data = vnode.data
	  var oldData = oldVnode.data
	  if (!data.staticClass && !data.class &&
	      (!oldData || (!oldData.staticClass && !oldData.class))) {
	    return
	  }

	  var cls = genClassForVnode(vnode)

	  // handle transition classes
	  var transitionClass = el._transitionClasses
	  if (transitionClass) {
	    cls = concat(cls, stringifyClass(transitionClass))
	  }

	  // set the class
	  if (cls !== el._prevClass) {
	    el.setAttribute('class', cls)
	    el._prevClass = cls
	  }
	}

	var klass = {
	  create: updateClass,
	  update: updateClass
	}

	// skip type checking this file because we need to attach private properties
	// to elements

	function updateDOMListeners (oldVnode, vnode) {
	  if (!oldVnode.data.on && !vnode.data.on) {
	    return
	  }
	  var on = vnode.data.on || {}
	  var oldOn = oldVnode.data.on || {}
	  var add = vnode.elm._v_add || (vnode.elm._v_add = function (event, handler, capture) {
	    vnode.elm.addEventListener(event, handler, capture)
	  })
	  var remove = vnode.elm._v_remove || (vnode.elm._v_remove = function (event, handler) {
	    vnode.elm.removeEventListener(event, handler)
	  })
	  updateListeners(on, oldOn, add, remove)
	}

	var events = {
	  create: updateDOMListeners,
	  update: updateDOMListeners
	}

	/*  */

	function updateDOMProps (oldVnode, vnode) {
	  if (!oldVnode.data.domProps && !vnode.data.domProps) {
	    return
	  }
	  var key, cur
	  var elm = vnode.elm
	  var oldProps = oldVnode.data.domProps || {}
	  var props = vnode.data.domProps || {}
	  // clone observed objects, as the user probably wants to mutate it
	  if (props.__ob__) {
	    props = vnode.data.domProps = extend({}, props)
	  }

	  for (key in oldProps) {
	    if (props[key] == null) {
	      elm[key] = undefined
	    }
	  }
	  for (key in props) {
	    // ignore children if the node has textContent or innerHTML,
	    // as these will throw away existing DOM nodes and cause removal errors
	    // on subsequent patches (#3360)
	    if ((key === 'textContent' || key === 'innerHTML') && vnode.children) {
	      vnode.children.length = 0
	    }
	    cur = props[key]
	    if (key === 'value') {
	      // store value as _value as well since
	      // non-string values will be stringified
	      elm._value = cur
	      // avoid resetting cursor position when value is the same
	      var strCur = cur == null ? '' : String(cur)
	      if (elm.value !== strCur) {
	        elm.value = strCur
	      }
	    } else {
	      elm[key] = cur
	    }
	  }
	}

	var domProps = {
	  create: updateDOMProps,
	  update: updateDOMProps
	}

	/*  */

	var prefixes = ['Webkit', 'Moz', 'ms']

	var testEl
	var normalize = cached(function (prop) {
	  testEl = testEl || document.createElement('div')
	  prop = camelize(prop)
	  if (prop !== 'filter' && (prop in testEl.style)) {
	    return prop
	  }
	  var upper = prop.charAt(0).toUpperCase() + prop.slice(1)
	  for (var i = 0; i < prefixes.length; i++) {
	    var prefixed = prefixes[i] + upper
	    if (prefixed in testEl.style) {
	      return prefixed
	    }
	  }
	})

	function updateStyle (oldVnode, vnode) {
	  if ((!oldVnode.data || !oldVnode.data.style) && !vnode.data.style) {
	    return
	  }
	  var cur, name
	  var el = vnode.elm
	  var oldStyle = oldVnode.data.style || {}
	  var style = vnode.data.style || {}

	  // handle string
	  if (typeof style === 'string') {
	    el.style.cssText = style
	    return
	  }

	  var needClone = style.__ob__

	  // handle array syntax
	  if (Array.isArray(style)) {
	    style = vnode.data.style = toObject(style)
	  }

	  // clone the style for future updates,
	  // in case the user mutates the style object in-place.
	  if (needClone) {
	    style = vnode.data.style = extend({}, style)
	  }

	  for (name in oldStyle) {
	    if (!style[name]) {
	      el.style[normalize(name)] = ''
	    }
	  }
	  for (name in style) {
	    cur = style[name]
	    if (cur !== oldStyle[name]) {
	      // ie9 setting to null has no effect, must use empty string
	      el.style[normalize(name)] = cur == null ? '' : cur
	    }
	  }
	}

	var style = {
	  create: updateStyle,
	  update: updateStyle
	}

	/*  */

	/**
	 * Add class with compatibility for SVG since classList is not supported on
	 * SVG elements in IE
	 */
	function addClass (el, cls) {
	  /* istanbul ignore else */
	  if (el.classList) {
	    if (cls.indexOf(' ') > -1) {
	      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); })
	    } else {
	      el.classList.add(cls)
	    }
	  } else {
	    var cur = ' ' + el.getAttribute('class') + ' '
	    if (cur.indexOf(' ' + cls + ' ') < 0) {
	      el.setAttribute('class', (cur + cls).trim())
	    }
	  }
	}

	/**
	 * Remove class with compatibility for SVG since classList is not supported on
	 * SVG elements in IE
	 */
	function removeClass (el, cls) {
	  /* istanbul ignore else */
	  if (el.classList) {
	    if (cls.indexOf(' ') > -1) {
	      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); })
	    } else {
	      el.classList.remove(cls)
	    }
	  } else {
	    var cur = ' ' + el.getAttribute('class') + ' '
	    var tar = ' ' + cls + ' '
	    while (cur.indexOf(tar) >= 0) {
	      cur = cur.replace(tar, ' ')
	    }
	    el.setAttribute('class', cur.trim())
	  }
	}

	/*  */

	var hasTransition = inBrowser && !isIE9
	var TRANSITION = 'transition'
	var ANIMATION = 'animation'

	// Transition property/event sniffing
	var transitionProp = 'transition'
	var transitionEndEvent = 'transitionend'
	var animationProp = 'animation'
	var animationEndEvent = 'animationend'
	if (hasTransition) {
	  /* istanbul ignore if */
	  if (window.ontransitionend === undefined &&
	    window.onwebkittransitionend !== undefined) {
	    transitionProp = 'WebkitTransition'
	    transitionEndEvent = 'webkitTransitionEnd'
	  }
	  if (window.onanimationend === undefined &&
	    window.onwebkitanimationend !== undefined) {
	    animationProp = 'WebkitAnimation'
	    animationEndEvent = 'webkitAnimationEnd'
	  }
	}

	var raf = (inBrowser && window.requestAnimationFrame) || setTimeout
	function nextFrame (fn) {
	  raf(function () {
	    raf(fn)
	  })
	}

	function addTransitionClass (el, cls) {
	  (el._transitionClasses || (el._transitionClasses = [])).push(cls)
	  addClass(el, cls)
	}

	function removeTransitionClass (el, cls) {
	  if (el._transitionClasses) {
	    remove$1(el._transitionClasses, cls)
	  }
	  removeClass(el, cls)
	}

	function whenTransitionEnds (
	  el,
	  expectedType,
	  cb
	) {
	  var ref = getTransitionInfo(el, expectedType);
	  var type = ref.type;
	  var timeout = ref.timeout;
	  var propCount = ref.propCount;
	  if (!type) { return cb() }
	  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent
	  var ended = 0
	  var end = function () {
	    el.removeEventListener(event, onEnd)
	    cb()
	  }
	  var onEnd = function (e) {
	    if (e.target === el) {
	      if (++ended >= propCount) {
	        end()
	      }
	    }
	  }
	  setTimeout(function () {
	    if (ended < propCount) {
	      end()
	    }
	  }, timeout + 1)
	  el.addEventListener(event, onEnd)
	}

	var transformRE = /\b(transform|all)(,|$)/

	function getTransitionInfo (el, expectedType) {
	  var styles = window.getComputedStyle(el)
	  var transitioneDelays = styles[transitionProp + 'Delay'].split(', ')
	  var transitionDurations = styles[transitionProp + 'Duration'].split(', ')
	  var transitionTimeout = getTimeout(transitioneDelays, transitionDurations)
	  var animationDelays = styles[animationProp + 'Delay'].split(', ')
	  var animationDurations = styles[animationProp + 'Duration'].split(', ')
	  var animationTimeout = getTimeout(animationDelays, animationDurations)

	  var type
	  var timeout = 0
	  var propCount = 0
	  /* istanbul ignore if */
	  if (expectedType === TRANSITION) {
	    if (transitionTimeout > 0) {
	      type = TRANSITION
	      timeout = transitionTimeout
	      propCount = transitionDurations.length
	    }
	  } else if (expectedType === ANIMATION) {
	    if (animationTimeout > 0) {
	      type = ANIMATION
	      timeout = animationTimeout
	      propCount = animationDurations.length
	    }
	  } else {
	    timeout = Math.max(transitionTimeout, animationTimeout)
	    type = timeout > 0
	      ? transitionTimeout > animationTimeout
	        ? TRANSITION
	        : ANIMATION
	      : null
	    propCount = type
	      ? type === TRANSITION
	        ? transitionDurations.length
	        : animationDurations.length
	      : 0
	  }
	  var hasTransform =
	    type === TRANSITION &&
	    transformRE.test(styles[transitionProp + 'Property'])
	  return {
	    type: type,
	    timeout: timeout,
	    propCount: propCount,
	    hasTransform: hasTransform
	  }
	}

	function getTimeout (delays, durations) {
	  return Math.max.apply(null, durations.map(function (d, i) {
	    return toMs(d) + toMs(delays[i])
	  }))
	}

	function toMs (s) {
	  return Number(s.slice(0, -1)) * 1000
	}

	/*  */

	function enter (vnode) {
	  var el = vnode.elm

	  // call leave callback now
	  if (el._leaveCb) {
	    el._leaveCb.cancelled = true
	    el._leaveCb()
	  }

	  var data = resolveTransition(vnode.data.transition)
	  if (!data) {
	    return
	  }

	  /* istanbul ignore if */
	  if (el._enterCb || el.nodeType !== 1) {
	    return
	  }

	  var css = data.css;
	  var type = data.type;
	  var enterClass = data.enterClass;
	  var enterActiveClass = data.enterActiveClass;
	  var appearClass = data.appearClass;
	  var appearActiveClass = data.appearActiveClass;
	  var beforeEnter = data.beforeEnter;
	  var enter = data.enter;
	  var afterEnter = data.afterEnter;
	  var enterCancelled = data.enterCancelled;
	  var beforeAppear = data.beforeAppear;
	  var appear = data.appear;
	  var afterAppear = data.afterAppear;
	  var appearCancelled = data.appearCancelled;

	  // activeInstance will always be the <transition> component managing this
	  // transition. One edge case to check is when the <transition> is placed
	  // as the root node of a child component. In that case we need to check
	  // <transition>'s parent for appear check.
	  var transitionNode = activeInstance.$vnode
	  var context = transitionNode && transitionNode.parent
	    ? transitionNode.parent.context
	    : activeInstance

	  var isAppear = !context._isMounted || !vnode.isRootInsert

	  if (isAppear && !appear && appear !== '') {
	    return
	  }

	  var startClass = isAppear ? appearClass : enterClass
	  var activeClass = isAppear ? appearActiveClass : enterActiveClass
	  var beforeEnterHook = isAppear ? (beforeAppear || beforeEnter) : beforeEnter
	  var enterHook = isAppear ? (typeof appear === 'function' ? appear : enter) : enter
	  var afterEnterHook = isAppear ? (afterAppear || afterEnter) : afterEnter
	  var enterCancelledHook = isAppear ? (appearCancelled || enterCancelled) : enterCancelled

	  var expectsCSS = css !== false && !isIE9
	  var userWantsControl =
	    enterHook &&
	    // enterHook may be a bound method which exposes
	    // the length of original fn as _length
	    (enterHook._length || enterHook.length) > 1

	  var cb = el._enterCb = once(function () {
	    if (expectsCSS) {
	      removeTransitionClass(el, activeClass)
	    }
	    if (cb.cancelled) {
	      if (expectsCSS) {
	        removeTransitionClass(el, startClass)
	      }
	      enterCancelledHook && enterCancelledHook(el)
	    } else {
	      afterEnterHook && afterEnterHook(el)
	    }
	    el._enterCb = null
	  })

	  if (!vnode.data.show) {
	    // remove pending leave element on enter by injecting an insert hook
	    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', function () {
	      var parent = el.parentNode
	      var pendingNode = parent && parent._pending && parent._pending[vnode.key]
	      if (pendingNode && pendingNode.tag === vnode.tag && pendingNode.elm._leaveCb) {
	        pendingNode.elm._leaveCb()
	      }
	      enterHook && enterHook(el, cb)
	    })
	  }

	  // start enter transition
	  beforeEnterHook && beforeEnterHook(el)
	  if (expectsCSS) {
	    addTransitionClass(el, startClass)
	    addTransitionClass(el, activeClass)
	    nextFrame(function () {
	      removeTransitionClass(el, startClass)
	      if (!cb.cancelled && !userWantsControl) {
	        whenTransitionEnds(el, type, cb)
	      }
	    })
	  }

	  if (vnode.data.show) {
	    enterHook && enterHook(el, cb)
	  }

	  if (!expectsCSS && !userWantsControl) {
	    cb()
	  }
	}

	function leave (vnode, rm) {
	  var el = vnode.elm

	  // call enter callback now
	  if (el._enterCb) {
	    el._enterCb.cancelled = true
	    el._enterCb()
	  }

	  var data = resolveTransition(vnode.data.transition)
	  if (!data) {
	    return rm()
	  }

	  /* istanbul ignore if */
	  if (el._leaveCb || el.nodeType !== 1) {
	    return
	  }

	  var css = data.css;
	  var type = data.type;
	  var leaveClass = data.leaveClass;
	  var leaveActiveClass = data.leaveActiveClass;
	  var beforeLeave = data.beforeLeave;
	  var leave = data.leave;
	  var afterLeave = data.afterLeave;
	  var leaveCancelled = data.leaveCancelled;
	  var delayLeave = data.delayLeave;

	  var expectsCSS = css !== false && !isIE9
	  var userWantsControl =
	    leave &&
	    // leave hook may be a bound method which exposes
	    // the length of original fn as _length
	    (leave._length || leave.length) > 1

	  var cb = el._leaveCb = once(function () {
	    if (el.parentNode && el.parentNode._pending) {
	      el.parentNode._pending[vnode.key] = null
	    }
	    if (expectsCSS) {
	      removeTransitionClass(el, leaveActiveClass)
	    }
	    if (cb.cancelled) {
	      if (expectsCSS) {
	        removeTransitionClass(el, leaveClass)
	      }
	      leaveCancelled && leaveCancelled(el)
	    } else {
	      rm()
	      afterLeave && afterLeave(el)
	    }
	    el._leaveCb = null
	  })

	  if (delayLeave) {
	    delayLeave(performLeave)
	  } else {
	    performLeave()
	  }

	  function performLeave () {
	    // the delayed leave may have already been cancelled
	    if (cb.cancelled) {
	      return
	    }
	    // record leaving element
	    if (!vnode.data.show) {
	      (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode
	    }
	    beforeLeave && beforeLeave(el)
	    if (expectsCSS) {
	      addTransitionClass(el, leaveClass)
	      addTransitionClass(el, leaveActiveClass)
	      nextFrame(function () {
	        removeTransitionClass(el, leaveClass)
	        if (!cb.cancelled && !userWantsControl) {
	          whenTransitionEnds(el, type, cb)
	        }
	      })
	    }
	    leave && leave(el, cb)
	    if (!expectsCSS && !userWantsControl) {
	      cb()
	    }
	  }
	}

	function resolveTransition (def$$1) {
	  if (!def$$1) {
	    return
	  }
	  /* istanbul ignore else */
	  if (typeof def$$1 === 'object') {
	    var res = {}
	    if (def$$1.css !== false) {
	      extend(res, autoCssTransition(def$$1.name || 'v'))
	    }
	    extend(res, def$$1)
	    return res
	  } else if (typeof def$$1 === 'string') {
	    return autoCssTransition(def$$1)
	  }
	}

	var autoCssTransition = cached(function (name) {
	  return {
	    enterClass: (name + "-enter"),
	    leaveClass: (name + "-leave"),
	    appearClass: (name + "-enter"),
	    enterActiveClass: (name + "-enter-active"),
	    leaveActiveClass: (name + "-leave-active"),
	    appearActiveClass: (name + "-enter-active")
	  }
	})

	function once (fn) {
	  var called = false
	  return function () {
	    if (!called) {
	      called = true
	      fn()
	    }
	  }
	}

	var transition = inBrowser ? {
	  create: function create (_, vnode) {
	    if (!vnode.data.show) {
	      enter(vnode)
	    }
	  },
	  remove: function remove (vnode, rm) {
	    /* istanbul ignore else */
	    if (!vnode.data.show) {
	      leave(vnode, rm)
	    } else {
	      rm()
	    }
	  }
	} : {}

	var platformModules = [
	  attrs,
	  klass,
	  events,
	  domProps,
	  style,
	  transition
	]

	/*  */

	// the directive module should be applied last, after all
	// built-in modules have been applied.
	var modules = platformModules.concat(baseModules)

	var patch$1 = createPatchFunction({ nodeOps: nodeOps, modules: modules })

	/**
	 * Not type checking this file because flow doesn't like attaching
	 * properties to Elements.
	 */

	var modelableTagRE = /^input|select|textarea|vue-component-[0-9]+(-[0-9a-zA-Z_\-]*)?$/

	/* istanbul ignore if */
	if (isIE9) {
	  // http://www.matts411.com/post/internet-explorer-9-oninput/
	  document.addEventListener('selectionchange', function () {
	    var el = document.activeElement
	    if (el && el.vmodel) {
	      trigger(el, 'input')
	    }
	  })
	}

	var model = {
	  bind: function bind (el, binding, vnode) {
	    {
	      if (!modelableTagRE.test(vnode.tag)) {
	        warn(
	          "v-model is not supported on element type: <" + (vnode.tag) + ">. " +
	          'If you are working with contenteditable, it\'s recommended to ' +
	          'wrap a library dedicated for that purpose inside a custom component.',
	          vnode.context
	        )
	      }
	    }
	    if (vnode.tag === 'select') {
	      setSelected(el, binding, vnode.context)
	      /* istanbul ignore if */
	      if (isIE || isEdge) {
	        var cb = function () {
	          setSelected(el, binding, vnode.context)
	        }
	        nextTick(cb)
	        setTimeout(cb, 0)
	      }
	    } else if (vnode.tag === 'textarea' || el.type === 'text') {
	      if (!isAndroid) {
	        el.addEventListener('compositionstart', onCompositionStart)
	        el.addEventListener('compositionend', onCompositionEnd)
	      }
	      /* istanbul ignore if */
	      if (isIE9) {
	        el.vmodel = true
	      }
	    }
	  },
	  componentUpdated: function componentUpdated (el, binding, vnode) {
	    if (vnode.tag === 'select') {
	      setSelected(el, binding, vnode.context)
	      // in case the options rendered by v-for have changed,
	      // it's possible that the value is out-of-sync with the rendered options.
	      // detect such cases and filter out values that no longer has a matchig
	      // option in the DOM.
	      var needReset = el.multiple
	        ? binding.value.some(function (v) { return hasNoMatchingOption(v, el.options); })
	        : hasNoMatchingOption(binding.value, el.options)
	      if (needReset) {
	        trigger(el, 'change')
	      }
	    }
	  }
	}

	function setSelected (el, binding, vm) {
	  var value = binding.value
	  var isMultiple = el.multiple
	  if (isMultiple && !Array.isArray(value)) {
	    "development" !== 'production' && warn(
	      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
	      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
	      vm
	    )
	    return
	  }
	  var selected, option
	  for (var i = 0, l = el.options.length; i < l; i++) {
	    option = el.options[i]
	    if (isMultiple) {
	      selected = looseIndexOf(value, getValue(option)) > -1
	      if (option.selected !== selected) {
	        option.selected = selected
	      }
	    } else {
	      if (looseEqual(getValue(option), value)) {
	        if (el.selectedIndex !== i) {
	          el.selectedIndex = i
	        }
	        return
	      }
	    }
	  }
	  if (!isMultiple) {
	    el.selectedIndex = -1
	  }
	}

	function hasNoMatchingOption (value, options) {
	  for (var i = 0, l = options.length; i < l; i++) {
	    if (looseEqual(getValue(options[i]), value)) {
	      return false
	    }
	  }
	  return true
	}

	function getValue (option) {
	  return '_value' in option
	    ? option._value
	    : option.value
	}

	function onCompositionStart (e) {
	  e.target.composing = true
	}

	function onCompositionEnd (e) {
	  e.target.composing = false
	  trigger(e.target, 'input')
	}

	function trigger (el, type) {
	  var e = document.createEvent('HTMLEvents')
	  e.initEvent(type, true, true)
	  el.dispatchEvent(e)
	}

	/*  */

	// recursively search for possible transition defined inside the component root
	function locateNode (vnode) {
	  return vnode.child && (!vnode.data || !vnode.data.transition)
	    ? locateNode(vnode.child._vnode)
	    : vnode
	}

	var show = {
	  bind: function bind (el, ref, vnode) {
	    var value = ref.value;

	    vnode = locateNode(vnode)
	    var transition = vnode.data && vnode.data.transition
	    if (value && transition && !isIE9) {
	      enter(vnode)
	    }
	    var originalDisplay = el.style.display === 'none' ? '' : el.style.display
	    el.style.display = value ? originalDisplay : 'none'
	    el.__vOriginalDisplay = originalDisplay
	  },
	  update: function update (el, ref, vnode) {
	    var value = ref.value;
	    var oldValue = ref.oldValue;

	    /* istanbul ignore if */
	    if (value === oldValue) { return }
	    vnode = locateNode(vnode)
	    var transition = vnode.data && vnode.data.transition
	    if (transition && !isIE9) {
	      if (value) {
	        enter(vnode)
	        el.style.display = el.__vOriginalDisplay
	      } else {
	        leave(vnode, function () {
	          el.style.display = 'none'
	        })
	      }
	    } else {
	      el.style.display = value ? el.__vOriginalDisplay : 'none'
	    }
	  }
	}

	var platformDirectives = {
	  model: model,
	  show: show
	}

	/*  */

	// Provides transition support for a single element/component.
	// supports transition mode (out-in / in-out)

	var transitionProps = {
	  name: String,
	  appear: Boolean,
	  css: Boolean,
	  mode: String,
	  type: String,
	  enterClass: String,
	  leaveClass: String,
	  enterActiveClass: String,
	  leaveActiveClass: String,
	  appearClass: String,
	  appearActiveClass: String
	}

	// in case the child is also an abstract component, e.g. <keep-alive>
	// we want to recrusively retrieve the real component to be rendered
	function getRealChild (vnode) {
	  var compOptions = vnode && vnode.componentOptions
	  if (compOptions && compOptions.Ctor.options.abstract) {
	    return getRealChild(getFirstComponentChild(compOptions.children))
	  } else {
	    return vnode
	  }
	}

	function extractTransitionData (comp) {
	  var data = {}
	  var options = comp.$options
	  // props
	  for (var key in options.propsData) {
	    data[key] = comp[key]
	  }
	  // events.
	  // extract listeners and pass them directly to the transition methods
	  var listeners = options._parentListeners
	  for (var key$1 in listeners) {
	    data[camelize(key$1)] = listeners[key$1].fn
	  }
	  return data
	}

	function placeholder (h, rawChild) {
	  return /\d-keep-alive$/.test(rawChild.tag)
	    ? h('keep-alive')
	    : null
	}

	function hasParentTransition (vnode) {
	  while ((vnode = vnode.parent)) {
	    if (vnode.data.transition) {
	      return true
	    }
	  }
	}

	var Transition = {
	  name: 'transition',
	  props: transitionProps,
	  abstract: true,
	  render: function render (h) {
	    var this$1 = this;

	    var children = this.$slots.default
	    if (!children) {
	      return
	    }

	    // filter out text nodes (possible whitespaces)
	    children = children.filter(function (c) { return c.tag; })
	    /* istanbul ignore if */
	    if (!children.length) {
	      return
	    }

	    // warn multiple elements
	    if ("development" !== 'production' && children.length > 1) {
	      warn(
	        '<transition> can only be used on a single element. Use ' +
	        '<transition-group> for lists.',
	        this.$parent
	      )
	    }

	    var mode = this.mode

	    // warn invalid mode
	    if ("development" !== 'production' &&
	        mode && mode !== 'in-out' && mode !== 'out-in') {
	      warn(
	        'invalid <transition> mode: ' + mode,
	        this.$parent
	      )
	    }

	    var rawChild = children[0]

	    // if this is a component root node and the component's
	    // parent container node also has transition, skip.
	    if (hasParentTransition(this.$vnode)) {
	      return rawChild
	    }

	    // apply transition data to child
	    // use getRealChild() to ignore abstract components e.g. keep-alive
	    var child = getRealChild(rawChild)
	    /* istanbul ignore if */
	    if (!child) {
	      return rawChild
	    }

	    if (this._leaving) {
	      return placeholder(h, rawChild)
	    }

	    child.key = child.key == null || child.isStatic
	      ? ("__v" + (child.tag + this._uid) + "__")
	      : child.key
	    var data = (child.data || (child.data = {})).transition = extractTransitionData(this)
	    var oldRawChild = this._vnode
	    var oldChild = getRealChild(oldRawChild)

	    // mark v-show
	    // so that the transition module can hand over the control to the directive
	    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
	      child.data.show = true
	    }

	    if (oldChild && oldChild.data && oldChild.key !== child.key) {
	      // replace old child transition data with fresh one
	      // important for dynamic transitions!
	      var oldData = oldChild.data.transition = extend({}, data)

	      // handle transition mode
	      if (mode === 'out-in') {
	        // return placeholder node and queue update when leave finishes
	        this._leaving = true
	        mergeVNodeHook(oldData, 'afterLeave', function () {
	          this$1._leaving = false
	          this$1.$forceUpdate()
	        })
	        return placeholder(h, rawChild)
	      } else if (mode === 'in-out') {
	        var delayedLeave
	        var performLeave = function () { delayedLeave() }
	        mergeVNodeHook(data, 'afterEnter', performLeave)
	        mergeVNodeHook(data, 'enterCancelled', performLeave)
	        mergeVNodeHook(oldData, 'delayLeave', function (leave) {
	          delayedLeave = leave
	        })
	      }
	    }

	    return rawChild
	  }
	}

	/*  */

	// Provides transition support for list items.
	// supports move transitions using the FLIP technique.

	// Because the vdom's children update algorithm is "unstable" - i.e.
	// it doesn't guarantee the relative positioning of removed elements,
	// we force transition-group to update its children into two passes:
	// in the first pass, we remove all nodes that need to be removed,
	// triggering their leaving transition; in the second pass, we insert/move
	// into the final disired state. This way in the second pass removed
	// nodes will remain where they should be.

	var props = extend({
	  tag: String,
	  moveClass: String
	}, transitionProps)

	delete props.mode

	var TransitionGroup = {
	  props: props,

	  render: function render (h) {
	    var tag = this.tag || this.$vnode.data.tag || 'span'
	    var map = Object.create(null)
	    var prevChildren = this.prevChildren = this.children
	    var rawChildren = this.$slots.default || []
	    var children = this.children = []
	    var transitionData = extractTransitionData(this)

	    for (var i = 0; i < rawChildren.length; i++) {
	      var c = rawChildren[i]
	      if (c.tag) {
	        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
	          children.push(c)
	          map[c.key] = c
	          ;(c.data || (c.data = {})).transition = transitionData
	        } else {
	          var opts = c.componentOptions
	          var name = opts
	            ? (opts.Ctor.options.name || opts.tag)
	            : c.tag
	          warn(("<transition-group> children must be keyed: <" + name + ">"))
	        }
	      }
	    }

	    if (prevChildren) {
	      var kept = []
	      var removed = []
	      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
	        var c$1 = prevChildren[i$1]
	        c$1.data.transition = transitionData
	        c$1.data.pos = c$1.elm.getBoundingClientRect()
	        if (map[c$1.key]) {
	          kept.push(c$1)
	        } else {
	          removed.push(c$1)
	        }
	      }
	      this.kept = h(tag, null, kept)
	      this.removed = removed
	    }

	    return h(tag, null, children)
	  },

	  beforeUpdate: function beforeUpdate () {
	    // force removing pass
	    this.__patch__(
	      this._vnode,
	      this.kept,
	      false, // hydrating
	      true // removeOnly (!important, avoids unnecessary moves)
	    )
	    this._vnode = this.kept
	  },

	  updated: function updated () {
	    var children = this.prevChildren
	    var moveClass = this.moveClass || (this.name + '-move')
	    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
	      return
	    }

	    // we divide the work into three loops to avoid mixing DOM reads and writes
	    // in each iteration - which helps prevent layout thrashing.
	    children.forEach(callPendingCbs)
	    children.forEach(recordPosition)
	    children.forEach(applyTranslation)

	    // force reflow to put everything in position
	    var f = document.body.offsetHeight // eslint-disable-line

	    children.forEach(function (c) {
	      if (c.data.moved) {
	        var el = c.elm
	        var s = el.style
	        addTransitionClass(el, moveClass)
	        s.transform = s.WebkitTransform = s.transitionDuration = ''
	        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
	          if (!e || /transform$/.test(e.propertyName)) {
	            el.removeEventListener(transitionEndEvent, cb)
	            el._moveCb = null
	            removeTransitionClass(el, moveClass)
	          }
	        })
	      }
	    })
	  },

	  methods: {
	    hasMove: function hasMove (el, moveClass) {
	      /* istanbul ignore if */
	      if (!hasTransition) {
	        return false
	      }
	      if (this._hasMove != null) {
	        return this._hasMove
	      }
	      addTransitionClass(el, moveClass)
	      var info = getTransitionInfo(el)
	      removeTransitionClass(el, moveClass)
	      return (this._hasMove = info.hasTransform)
	    }
	  }
	}

	function callPendingCbs (c) {
	  /* istanbul ignore if */
	  if (c.elm._moveCb) {
	    c.elm._moveCb()
	  }
	  /* istanbul ignore if */
	  if (c.elm._enterCb) {
	    c.elm._enterCb()
	  }
	}

	function recordPosition (c) {
	  c.data.newPos = c.elm.getBoundingClientRect()
	}

	function applyTranslation (c) {
	  var oldPos = c.data.pos
	  var newPos = c.data.newPos
	  var dx = oldPos.left - newPos.left
	  var dy = oldPos.top - newPos.top
	  if (dx || dy) {
	    c.data.moved = true
	    var s = c.elm.style
	    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)"
	    s.transitionDuration = '0s'
	  }
	}

	var platformComponents = {
	  Transition: Transition,
	  TransitionGroup: TransitionGroup
	}

	/*  */

	// install platform specific utils
	Vue$3.config.isUnknownElement = isUnknownElement
	Vue$3.config.isReservedTag = isReservedTag
	Vue$3.config.getTagNamespace = getTagNamespace
	Vue$3.config.mustUseProp = mustUseProp

	// install platform runtime directives & components
	extend(Vue$3.options.directives, platformDirectives)
	extend(Vue$3.options.components, platformComponents)

	// install platform patch function
	Vue$3.prototype.__patch__ = config._isServer ? noop : patch$1

	// wrap mount
	Vue$3.prototype.$mount = function (
	  el,
	  hydrating
	) {
	  el = el && !config._isServer ? query(el) : undefined
	  return this._mount(el, hydrating)
	}

	// devtools global hook
	/* istanbul ignore next */
	setTimeout(function () {
	  if (config.devtools) {
	    if (devtools) {
	      devtools.emit('init', Vue$3)
	    } else if (
	      "development" !== 'production' &&
	      inBrowser && /Chrome\/\d+/.test(window.navigator.userAgent)
	    ) {
	      console.log(
	        'Download the Vue Devtools for a better development experience:\n' +
	        'https://github.com/vuejs/vue-devtools'
	      )
	    }
	  }
	}, 0)

	/*  */

	// check whether current browser encodes a char inside attribute values
	function shouldDecode (content, encoded) {
	  var div = document.createElement('div')
	  div.innerHTML = "<div a=\"" + content + "\">"
	  return div.innerHTML.indexOf(encoded) > 0
	}

	// According to
	// https://w3c.github.io/DOM-Parsing/#dfn-serializing-an-attribute-value
	// when serializing innerHTML, <, >, ", & should be encoded as entities.
	// However, only some browsers, e.g. PhantomJS, encodes < and >.
	// this causes problems with the in-browser parser.
	var shouldDecodeTags = inBrowser ? shouldDecode('>', '&gt;') : false

	// #3663
	// IE encodes newlines inside attribute values while other browsers don't
	var shouldDecodeNewlines = inBrowser ? shouldDecode('\n', '&#10;') : false

	/*  */

	var decoder = document.createElement('div')

	function decodeHTML (html) {
	  decoder.innerHTML = html
	  return decoder.textContent
	}

	/**
	 * Not type-checking this file because it's mostly vendor code.
	 */

	/*!
	 * HTML Parser By John Resig (ejohn.org)
	 * Modified by Juriy "kangax" Zaytsev
	 * Original code by Erik Arvidsson, Mozilla Public License
	 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
	 */

	// Regular Expressions for parsing tags and attributes
	var singleAttrIdentifier = /([^\s"'<>\/=]+)/
	var singleAttrAssign = /(?:=)/
	var singleAttrValues = [
	  // attr value double quotes
	  /"([^"]*)"+/.source,
	  // attr value, single quotes
	  /'([^']*)'+/.source,
	  // attr value, no quotes
	  /([^\s"'=<>`]+)/.source
	]
	var attribute = new RegExp(
	  '^\\s*' + singleAttrIdentifier.source +
	  '(?:\\s*(' + singleAttrAssign.source + ')' +
	  '\\s*(?:' + singleAttrValues.join('|') + '))?'
	)

	// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
	// but for Vue templates we can enforce a simple charset
	var ncname = '[a-zA-Z_][\\w\\-\\.]*'
	var qnameCapture = '((?:' + ncname + '\\:)?' + ncname + ')'
	var startTagOpen = new RegExp('^<' + qnameCapture)
	var startTagClose = /^\s*(\/?)>/
	var endTag = new RegExp('^<\\/' + qnameCapture + '[^>]*>')
	var doctype = /^<!DOCTYPE [^>]+>/i

	var IS_REGEX_CAPTURING_BROKEN = false
	'x'.replace(/x(.)?/g, function (m, g) {
	  IS_REGEX_CAPTURING_BROKEN = g === ''
	})

	// Special Elements (can contain anything)
	var isSpecialTag = makeMap('script,style', true)

	var reCache = {}

	var ltRE = /&lt;/g
	var gtRE = /&gt;/g
	var nlRE = /&#10;/g
	var ampRE = /&amp;/g
	var quoteRE = /&quot;/g

	function decodeAttr (value, shouldDecodeTags, shouldDecodeNewlines) {
	  if (shouldDecodeTags) {
	    value = value.replace(ltRE, '<').replace(gtRE, '>')
	  }
	  if (shouldDecodeNewlines) {
	    value = value.replace(nlRE, '\n')
	  }
	  return value.replace(ampRE, '&').replace(quoteRE, '"')
	}

	function parseHTML (html, options) {
	  var stack = []
	  var expectHTML = options.expectHTML
	  var isUnaryTag$$1 = options.isUnaryTag || no
	  var isFromDOM = options.isFromDOM
	  var index = 0
	  var last, lastTag
	  while (html) {
	    last = html
	    // Make sure we're not in a script or style element
	    if (!lastTag || !isSpecialTag(lastTag)) {
	      var textEnd = html.indexOf('<')
	      if (textEnd === 0) {
	        // Comment:
	        if (/^<!--/.test(html)) {
	          var commentEnd = html.indexOf('-->')

	          if (commentEnd >= 0) {
	            advance(commentEnd + 3)
	            continue
	          }
	        }

	        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
	        if (/^<!\[/.test(html)) {
	          var conditionalEnd = html.indexOf(']>')

	          if (conditionalEnd >= 0) {
	            advance(conditionalEnd + 2)
	            continue
	          }
	        }

	        // Doctype:
	        var doctypeMatch = html.match(doctype)
	        if (doctypeMatch) {
	          advance(doctypeMatch[0].length)
	          continue
	        }

	        // End tag:
	        var endTagMatch = html.match(endTag)
	        if (endTagMatch) {
	          var curIndex = index
	          advance(endTagMatch[0].length)
	          parseEndTag(endTagMatch[0], endTagMatch[1], curIndex, index)
	          continue
	        }

	        // Start tag:
	        var startTagMatch = parseStartTag()
	        if (startTagMatch) {
	          handleStartTag(startTagMatch)
	          continue
	        }
	      }

	      var text = void 0
	      if (textEnd >= 0) {
	        text = html.substring(0, textEnd)
	        advance(textEnd)
	      } else {
	        text = html
	        html = ''
	      }

	      if (options.chars) {
	        options.chars(text)
	      }
	    } else {
	      var stackedTag = lastTag.toLowerCase()
	      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'))
	      var endTagLength = 0
	      var rest = html.replace(reStackedTag, function (all, text, endTag) {
	        endTagLength = endTag.length
	        if (stackedTag !== 'script' && stackedTag !== 'style' && stackedTag !== 'noscript') {
	          text = text
	            .replace(/<!--([\s\S]*?)-->/g, '$1')
	            .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
	        }
	        if (options.chars) {
	          options.chars(text)
	        }
	        return ''
	      })
	      index += html.length - rest.length
	      html = rest
	      parseEndTag('</' + stackedTag + '>', stackedTag, index - endTagLength, index)
	    }

	    if (html === last) {
	      throw new Error('Error parsing template:\n\n' + html)
	    }
	  }

	  // Clean up any remaining tags
	  parseEndTag()

	  function advance (n) {
	    index += n
	    html = html.substring(n)
	  }

	  function parseStartTag () {
	    var start = html.match(startTagOpen)
	    if (start) {
	      var match = {
	        tagName: start[1],
	        attrs: [],
	        start: index
	      }
	      advance(start[0].length)
	      var end, attr
	      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
	        advance(attr[0].length)
	        match.attrs.push(attr)
	      }
	      if (end) {
	        match.unarySlash = end[1]
	        advance(end[0].length)
	        match.end = index
	        return match
	      }
	    }
	  }

	  function handleStartTag (match) {
	    var tagName = match.tagName
	    var unarySlash = match.unarySlash

	    if (expectHTML) {
	      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
	        parseEndTag('', lastTag)
	      }
	      if (canBeLeftOpenTag(tagName) && lastTag === tagName) {
	        parseEndTag('', tagName)
	      }
	    }

	    var unary = isUnaryTag$$1(tagName) || tagName === 'html' && lastTag === 'head' || !!unarySlash

	    var l = match.attrs.length
	    var attrs = new Array(l)
	    for (var i = 0; i < l; i++) {
	      var args = match.attrs[i]
	      // hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
	      if (IS_REGEX_CAPTURING_BROKEN && args[0].indexOf('""') === -1) {
	        if (args[3] === '') { delete args[3] }
	        if (args[4] === '') { delete args[4] }
	        if (args[5] === '') { delete args[5] }
	      }
	      var value = args[3] || args[4] || args[5] || ''
	      attrs[i] = {
	        name: args[1],
	        value: isFromDOM ? decodeAttr(
	          value,
	          options.shouldDecodeTags,
	          options.shouldDecodeNewlines
	        ) : value
	      }
	    }

	    if (!unary) {
	      stack.push({ tag: tagName, attrs: attrs })
	      lastTag = tagName
	      unarySlash = ''
	    }

	    if (options.start) {
	      options.start(tagName, attrs, unary, match.start, match.end)
	    }
	  }

	  function parseEndTag (tag, tagName, start, end) {
	    var pos
	    if (start == null) { start = index }
	    if (end == null) { end = index }

	    // Find the closest opened tag of the same type
	    if (tagName) {
	      var needle = tagName.toLowerCase()
	      for (pos = stack.length - 1; pos >= 0; pos--) {
	        if (stack[pos].tag.toLowerCase() === needle) {
	          break
	        }
	      }
	    } else {
	      // If no tag name is provided, clean shop
	      pos = 0
	    }

	    if (pos >= 0) {
	      // Close all the open elements, up the stack
	      for (var i = stack.length - 1; i >= pos; i--) {
	        if (options.end) {
	          options.end(stack[i].tag, start, end)
	        }
	      }

	      // Remove the open elements from the stack
	      stack.length = pos
	      lastTag = pos && stack[pos - 1].tag
	    } else if (tagName.toLowerCase() === 'br') {
	      if (options.start) {
	        options.start(tagName, [], true, start, end)
	      }
	    } else if (tagName.toLowerCase() === 'p') {
	      if (options.start) {
	        options.start(tagName, [], false, start, end)
	      }
	      if (options.end) {
	        options.end(tagName, start, end)
	      }
	    }
	  }
	}

	/*  */

	function parseFilters (exp) {
	  var inSingle = false
	  var inDouble = false
	  var curly = 0
	  var square = 0
	  var paren = 0
	  var lastFilterIndex = 0
	  var c, prev, i, expression, filters

	  for (i = 0; i < exp.length; i++) {
	    prev = c
	    c = exp.charCodeAt(i)
	    if (inSingle) {
	      // check single quote
	      if (c === 0x27 && prev !== 0x5C) { inSingle = !inSingle }
	    } else if (inDouble) {
	      // check double quote
	      if (c === 0x22 && prev !== 0x5C) { inDouble = !inDouble }
	    } else if (
	      c === 0x7C && // pipe
	      exp.charCodeAt(i + 1) !== 0x7C &&
	      exp.charCodeAt(i - 1) !== 0x7C &&
	      !curly && !square && !paren
	    ) {
	      if (expression === undefined) {
	        // first filter, end of expression
	        lastFilterIndex = i + 1
	        expression = exp.slice(0, i).trim()
	      } else {
	        pushFilter()
	      }
	    } else {
	      switch (c) {
	        case 0x22: inDouble = true; break // "
	        case 0x27: inSingle = true; break // '
	        case 0x28: paren++; break         // (
	        case 0x29: paren--; break         // )
	        case 0x5B: square++; break        // [
	        case 0x5D: square--; break        // ]
	        case 0x7B: curly++; break         // {
	        case 0x7D: curly--; break         // }
	      }
	    }
	  }

	  if (expression === undefined) {
	    expression = exp.slice(0, i).trim()
	  } else if (lastFilterIndex !== 0) {
	    pushFilter()
	  }

	  function pushFilter () {
	    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim())
	    lastFilterIndex = i + 1
	  }

	  if (filters) {
	    for (i = 0; i < filters.length; i++) {
	      expression = wrapFilter(expression, filters[i])
	    }
	  }

	  return expression
	}

	function wrapFilter (exp, filter) {
	  var i = filter.indexOf('(')
	  if (i < 0) {
	    // _f: resolveFilter
	    return ("_f(\"" + filter + "\")(" + exp + ")")
	  } else {
	    var name = filter.slice(0, i)
	    var args = filter.slice(i + 1)
	    return ("_f(\"" + name + "\")(" + exp + "," + args)
	  }
	}

	/*  */

	var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g
	var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g

	var buildRegex = cached(function (delimiters) {
	  var open = delimiters[0].replace(regexEscapeRE, '\\$&')
	  var close = delimiters[1].replace(regexEscapeRE, '\\$&')
	  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
	})

	function parseText (
	  text,
	  delimiters
	) {
	  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE
	  if (!tagRE.test(text)) {
	    return
	  }
	  var tokens = []
	  var lastIndex = tagRE.lastIndex = 0
	  var match, index
	  while ((match = tagRE.exec(text))) {
	    index = match.index
	    // push text token
	    if (index > lastIndex) {
	      tokens.push(JSON.stringify(text.slice(lastIndex, index)))
	    }
	    // tag token
	    var exp = parseFilters(match[1].trim())
	    tokens.push(("_s(" + exp + ")"))
	    lastIndex = index + match[0].length
	  }
	  if (lastIndex < text.length) {
	    tokens.push(JSON.stringify(text.slice(lastIndex)))
	  }
	  return tokens.join('+')
	}

	/*  */

	function baseWarn (msg) {
	  console.error(("[Vue parser]: " + msg))
	}

	function pluckModuleFunction (
	  modules,
	  key
	) {
	  return modules
	    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
	    : []
	}

	function addProp (el, name, value) {
	  (el.props || (el.props = [])).push({ name: name, value: value })
	}

	function addAttr (el, name, value) {
	  (el.attrs || (el.attrs = [])).push({ name: name, value: value })
	}

	function addDirective (
	  el,
	  name,
	  value,
	  arg,
	  modifiers
	) {
	  (el.directives || (el.directives = [])).push({ name: name, value: value, arg: arg, modifiers: modifiers })
	}

	function addHandler (
	  el,
	  name,
	  value,
	  modifiers,
	  important
	) {
	  // check capture modifier
	  if (modifiers && modifiers.capture) {
	    delete modifiers.capture
	    name = '!' + name // mark the event as captured
	  }
	  var events
	  if (modifiers && modifiers.native) {
	    delete modifiers.native
	    events = el.nativeEvents || (el.nativeEvents = {})
	  } else {
	    events = el.events || (el.events = {})
	  }
	  var newHandler = { value: value, modifiers: modifiers }
	  var handlers = events[name]
	  /* istanbul ignore if */
	  if (Array.isArray(handlers)) {
	    important ? handlers.unshift(newHandler) : handlers.push(newHandler)
	  } else if (handlers) {
	    events[name] = important ? [newHandler, handlers] : [handlers, newHandler]
	  } else {
	    events[name] = newHandler
	  }
	}

	function getBindingAttr (
	  el,
	  name,
	  getStatic
	) {
	  var dynamicValue =
	    getAndRemoveAttr(el, ':' + name) ||
	    getAndRemoveAttr(el, 'v-bind:' + name)
	  if (dynamicValue != null) {
	    return dynamicValue
	  } else if (getStatic !== false) {
	    var staticValue = getAndRemoveAttr(el, name)
	    if (staticValue != null) {
	      return JSON.stringify(staticValue)
	    }
	  }
	}

	function getAndRemoveAttr (el, name) {
	  var val
	  if ((val = el.attrsMap[name]) != null) {
	    var list = el.attrsList
	    for (var i = 0, l = list.length; i < l; i++) {
	      if (list[i].name === name) {
	        list.splice(i, 1)
	        break
	      }
	    }
	  }
	  return val
	}

	/*  */

	var dirRE = /^v-|^@|^:/
	var forAliasRE = /(.*)\s+(?:in|of)\s+(.*)/
	var forIteratorRE = /\(([^,]*),([^,]*)(?:,([^,]*))?\)/
	var bindRE = /^:|^v-bind:/
	var onRE = /^@|^v-on:/
	var argRE = /:(.*)$/
	var modifierRE = /\.[^\.]+/g

	var decodeHTMLCached = cached(decodeHTML)

	// configurable state
	var warn$1
	var platformGetTagNamespace
	var platformMustUseProp
	var platformIsPreTag
	var preTransforms
	var transforms
	var postTransforms
	var delimiters

	/**
	 * Convert HTML string to AST.
	 */
	function parse (
	  template,
	  options
	) {
	  warn$1 = options.warn || baseWarn
	  platformGetTagNamespace = options.getTagNamespace || no
	  platformMustUseProp = options.mustUseProp || no
	  platformIsPreTag = options.isPreTag || no
	  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode')
	  transforms = pluckModuleFunction(options.modules, 'transformNode')
	  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode')
	  delimiters = options.delimiters
	  var stack = []
	  var preserveWhitespace = options.preserveWhitespace !== false
	  var root
	  var currentParent
	  var inVPre = false
	  var inPre = false
	  var warned = false
	  parseHTML(template, {
	    expectHTML: options.expectHTML,
	    isUnaryTag: options.isUnaryTag,
	    isFromDOM: options.isFromDOM,
	    shouldDecodeTags: options.shouldDecodeTags,
	    shouldDecodeNewlines: options.shouldDecodeNewlines,
	    start: function start (tag, attrs, unary) {
	      // check namespace.
	      // inherit parent ns if there is one
	      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag)

	      // handle IE svg bug
	      /* istanbul ignore if */
	      if (options.isIE && ns === 'svg') {
	        attrs = guardIESVGBug(attrs)
	      }

	      var element = {
	        type: 1,
	        tag: tag,
	        attrsList: attrs,
	        attrsMap: makeAttrsMap(attrs),
	        parent: currentParent,
	        children: []
	      }
	      if (ns) {
	        element.ns = ns
	      }

	      if ("client" !== 'server' && isForbiddenTag(element)) {
	        element.forbidden = true
	        "development" !== 'production' && warn$1(
	          'Templates should only be responsible for mapping the state to the ' +
	          'UI. Avoid placing tags with side-effects in your templates, such as ' +
	          "<" + tag + ">."
	        )
	      }

	      // apply pre-transforms
	      for (var i = 0; i < preTransforms.length; i++) {
	        preTransforms[i](element, options)
	      }

	      if (!inVPre) {
	        processPre(element)
	        if (element.pre) {
	          inVPre = true
	        }
	      }
	      if (platformIsPreTag(element.tag)) {
	        inPre = true
	      }
	      if (inVPre) {
	        processRawAttrs(element)
	      } else {
	        processFor(element)
	        processIf(element)
	        processOnce(element)
	        processKey(element)

	        // determine whether this is a plain element after
	        // removing structural attributes
	        element.plain = !element.key && !attrs.length

	        processRef(element)
	        processSlot(element)
	        processComponent(element)
	        for (var i$1 = 0; i$1 < transforms.length; i$1++) {
	          transforms[i$1](element, options)
	        }
	        processAttrs(element)
	      }

	      function checkRootConstraints (el) {
	        {
	          if (el.tag === 'slot' || el.tag === 'template') {
	            warn$1(
	              "Cannot use <" + (el.tag) + "> as component root element because it may " +
	              'contain multiple nodes:\n' + template
	            )
	          }
	          if (el.attrsMap.hasOwnProperty('v-for')) {
	            warn$1(
	              'Cannot use v-for on stateful component root element because ' +
	              'it renders multiple elements:\n' + template
	            )
	          }
	        }
	      }

	      // tree management
	      if (!root) {
	        root = element
	        checkRootConstraints(root)
	      } else if ("development" !== 'production' && !stack.length && !warned) {
	        // allow 2 root elements with v-if and v-else
	        if ((root.attrsMap.hasOwnProperty('v-if') && element.attrsMap.hasOwnProperty('v-else'))) {
	          checkRootConstraints(element)
	        } else {
	          warned = true
	          warn$1(
	            ("Component template should contain exactly one root element:\n\n" + template)
	          )
	        }
	      }
	      if (currentParent && !element.forbidden) {
	        if (element.else) {
	          processElse(element, currentParent)
	        } else {
	          currentParent.children.push(element)
	          element.parent = currentParent
	        }
	      }
	      if (!unary) {
	        currentParent = element
	        stack.push(element)
	      }
	      // apply post-transforms
	      for (var i$2 = 0; i$2 < postTransforms.length; i$2++) {
	        postTransforms[i$2](element, options)
	      }
	    },

	    end: function end () {
	      // remove trailing whitespace
	      var element = stack[stack.length - 1]
	      var lastNode = element.children[element.children.length - 1]
	      if (lastNode && lastNode.type === 3 && lastNode.text === ' ') {
	        element.children.pop()
	      }
	      // pop stack
	      stack.length -= 1
	      currentParent = stack[stack.length - 1]
	      // check pre state
	      if (element.pre) {
	        inVPre = false
	      }
	      if (platformIsPreTag(element.tag)) {
	        inPre = false
	      }
	    },

	    chars: function chars (text) {
	      if (!currentParent) {
	        if ("development" !== 'production' && !warned) {
	          warned = true
	          warn$1(
	            'Component template should contain exactly one root element:\n\n' + template
	          )
	        }
	        return
	      }
	      text = inPre || text.trim()
	        ? decodeHTMLCached(text)
	        // only preserve whitespace if its not right after a starting tag
	        : preserveWhitespace && currentParent.children.length ? ' ' : ''
	      if (text) {
	        var expression
	        if (!inVPre && text !== ' ' && (expression = parseText(text, delimiters))) {
	          currentParent.children.push({
	            type: 2,
	            expression: expression,
	            text: text
	          })
	        } else {
	          currentParent.children.push({
	            type: 3,
	            text: text
	          })
	        }
	      }
	    }
	  })
	  return root
	}

	function processPre (el) {
	  if (getAndRemoveAttr(el, 'v-pre') != null) {
	    el.pre = true
	  }
	}

	function processRawAttrs (el) {
	  var l = el.attrsList.length
	  if (l) {
	    var attrs = el.attrs = new Array(l)
	    for (var i = 0; i < l; i++) {
	      attrs[i] = {
	        name: el.attrsList[i].name,
	        value: JSON.stringify(el.attrsList[i].value)
	      }
	    }
	  } else if (!el.pre) {
	    // non root node in pre blocks with no attributes
	    el.plain = true
	  }
	}

	function processKey (el) {
	  var exp = getBindingAttr(el, 'key')
	  if (exp) {
	    if ("development" !== 'production' && el.tag === 'template') {
	      warn$1("<template> cannot be keyed. Place the key on real elements instead.")
	    }
	    el.key = exp
	  }
	}

	function processRef (el) {
	  var ref = getBindingAttr(el, 'ref')
	  if (ref) {
	    el.ref = ref
	    el.refInFor = checkInFor(el)
	  }
	}

	function processFor (el) {
	  var exp
	  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
	    var inMatch = exp.match(forAliasRE)
	    if (!inMatch) {
	      "development" !== 'production' && warn$1(
	        ("Invalid v-for expression: " + exp)
	      )
	      return
	    }
	    el.for = inMatch[2].trim()
	    var alias = inMatch[1].trim()
	    var iteratorMatch = alias.match(forIteratorRE)
	    if (iteratorMatch) {
	      el.alias = iteratorMatch[1].trim()
	      el.iterator1 = iteratorMatch[2].trim()
	      if (iteratorMatch[3]) {
	        el.iterator2 = iteratorMatch[3].trim()
	      }
	    } else {
	      el.alias = alias
	    }
	  }
	}

	function processIf (el) {
	  var exp = getAndRemoveAttr(el, 'v-if')
	  if (exp) {
	    el.if = exp
	  }
	  if (getAndRemoveAttr(el, 'v-else') != null) {
	    el.else = true
	  }
	}

	function processElse (el, parent) {
	  var prev = findPrevElement(parent.children)
	  if (prev && prev.if) {
	    prev.elseBlock = el
	  } else {
	    warn$1(
	      ("v-else used on element <" + (el.tag) + "> without corresponding v-if.")
	    )
	  }
	}

	function processOnce (el) {
	  var once = getAndRemoveAttr(el, 'v-once')
	  if (once != null) {
	    el.once = true
	  }
	}

	function processSlot (el) {
	  if (el.tag === 'slot') {
	    el.slotName = getBindingAttr(el, 'name')
	  } else {
	    var slotTarget = getBindingAttr(el, 'slot')
	    if (slotTarget) {
	      el.slotTarget = slotTarget
	    }
	  }
	}

	function processComponent (el) {
	  var binding
	  if ((binding = getBindingAttr(el, 'is'))) {
	    el.component = binding
	  }
	  if (getAndRemoveAttr(el, 'inline-template') != null) {
	    el.inlineTemplate = true
	  }
	}

	function processAttrs (el) {
	  var list = el.attrsList
	  var i, l, name, value, arg, modifiers, isProp
	  for (i = 0, l = list.length; i < l; i++) {
	    name = list[i].name
	    value = list[i].value
	    if (dirRE.test(name)) {
	      // mark element as dynamic
	      el.hasBindings = true
	      // modifiers
	      modifiers = parseModifiers(name)
	      if (modifiers) {
	        name = name.replace(modifierRE, '')
	      }
	      if (bindRE.test(name)) { // v-bind
	        name = name.replace(bindRE, '')
	        if (modifiers && modifiers.prop) {
	          isProp = true
	          name = camelize(name)
	          if (name === 'innerHtml') { name = 'innerHTML' }
	        }
	        if (isProp || platformMustUseProp(name)) {
	          addProp(el, name, value)
	        } else {
	          addAttr(el, name, value)
	        }
	      } else if (onRE.test(name)) { // v-on
	        name = name.replace(onRE, '')
	        addHandler(el, name, value, modifiers)
	      } else { // normal directives
	        name = name.replace(dirRE, '')
	        // parse arg
	        var argMatch = name.match(argRE)
	        if (argMatch && (arg = argMatch[1])) {
	          name = name.slice(0, -(arg.length + 1))
	        }
	        addDirective(el, name, value, arg, modifiers)
	      }
	    } else {
	      // literal attribute
	      {
	        var expression = parseText(value, delimiters)
	        if (expression) {
	          warn$1(
	            name + "=\"" + value + "\": " +
	            'Interpolation inside attributes has been deprecated. ' +
	            'Use v-bind or the colon shorthand instead.'
	          )
	        }
	      }
	      addAttr(el, name, JSON.stringify(value))
	    }
	  }
	}

	function checkInFor (el) {
	  var parent = el
	  while (parent) {
	    if (parent.for !== undefined) {
	      return true
	    }
	    parent = parent.parent
	  }
	  return false
	}

	function parseModifiers (name) {
	  var match = name.match(modifierRE)
	  if (match) {
	    var ret = {}
	    match.forEach(function (m) { ret[m.slice(1)] = true })
	    return ret
	  }
	}

	function makeAttrsMap (attrs) {
	  var map = {}
	  for (var i = 0, l = attrs.length; i < l; i++) {
	    if ("development" !== 'production' && map[attrs[i].name]) {
	      warn$1('duplicate attribute: ' + attrs[i].name)
	    }
	    map[attrs[i].name] = attrs[i].value
	  }
	  return map
	}

	function findPrevElement (children) {
	  var i = children.length
	  while (i--) {
	    if (children[i].tag) { return children[i] }
	  }
	}

	function isForbiddenTag (el) {
	  return (
	    el.tag === 'style' ||
	    (el.tag === 'script' && (
	      !el.attrsMap.type ||
	      el.attrsMap.type === 'text/javascript'
	    ))
	  )
	}

	var ieNSBug = /^xmlns:NS\d+/
	var ieNSPrefix = /^NS\d+:/

	/* istanbul ignore next */
	function guardIESVGBug (attrs) {
	  var res = []
	  for (var i = 0; i < attrs.length; i++) {
	    var attr = attrs[i]
	    if (!ieNSBug.test(attr.name)) {
	      attr.name = attr.name.replace(ieNSPrefix, '')
	      res.push(attr)
	    }
	  }
	  return res
	}

	/*  */

	var isStaticKey
	var isPlatformReservedTag

	var genStaticKeysCached = cached(genStaticKeys$1)

	/**
	 * Goal of the optimizier: walk the generated template AST tree
	 * and detect sub-trees that are purely static, i.e. parts of
	 * the DOM that never needs to change.
	 *
	 * Once we detect these sub-trees, we can:
	 *
	 * 1. Hoist them into constants, so that we no longer need to
	 *    create fresh nodes for them on each re-render;
	 * 2. Completely skip them in the patching process.
	 */
	function optimize (root, options) {
	  if (!root) { return }
	  isStaticKey = genStaticKeysCached(options.staticKeys || '')
	  isPlatformReservedTag = options.isReservedTag || (function () { return false; })
	  // first pass: mark all non-static nodes.
	  markStatic(root)
	  // second pass: mark static roots.
	  markStaticRoots(root, false)
	}

	function genStaticKeys$1 (keys) {
	  return makeMap(
	    'type,tag,attrsList,attrsMap,plain,parent,children,attrs' +
	    (keys ? ',' + keys : '')
	  )
	}

	function markStatic (node) {
	  node.static = isStatic(node)
	  if (node.type === 1) {
	    for (var i = 0, l = node.children.length; i < l; i++) {
	      var child = node.children[i]
	      markStatic(child)
	      if (!child.static) {
	        node.static = false
	      }
	    }
	  }
	}

	function markStaticRoots (node, isInFor) {
	  if (node.type === 1) {
	    if (node.once || node.static) {
	      node.staticRoot = true
	      node.staticInFor = isInFor
	      return
	    }
	    if (node.children) {
	      for (var i = 0, l = node.children.length; i < l; i++) {
	        markStaticRoots(node.children[i], !!node.for)
	      }
	    }
	  }
	}

	function isStatic (node) {
	  if (node.type === 2) { // expression
	    return false
	  }
	  if (node.type === 3) { // text
	    return true
	  }
	  return !!(node.pre || (
	    !node.hasBindings && // no dynamic bindings
	    !node.if && !node.for && // not v-if or v-for or v-else
	    !isBuiltInTag(node.tag) && // not a built-in
	    isPlatformReservedTag(node.tag) && // not a component
	    Object.keys(node).every(isStaticKey)
	  ))
	}

	/*  */

	var simplePathRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\]|\[\d+\]|\[[A-Za-z_$][\w$]*\])*$/

	// keyCode aliases
	var keyCodes = {
	  esc: 27,
	  tab: 9,
	  enter: 13,
	  space: 32,
	  up: 38,
	  left: 37,
	  right: 39,
	  down: 40,
	  'delete': [8, 46]
	}

	var modifierCode = {
	  stop: '$event.stopPropagation();',
	  prevent: '$event.preventDefault();',
	  self: 'if($event.target !== $event.currentTarget)return;'
	}

	function genHandlers (events, native) {
	  var res = native ? 'nativeOn:{' : 'on:{'
	  for (var name in events) {
	    res += "\"" + name + "\":" + (genHandler(events[name])) + ","
	  }
	  return res.slice(0, -1) + '}'
	}

	function genHandler (
	  handler
	) {
	  if (!handler) {
	    return 'function(){}'
	  } else if (Array.isArray(handler)) {
	    return ("[" + (handler.map(genHandler).join(',')) + "]")
	  } else if (!handler.modifiers) {
	    return simplePathRE.test(handler.value)
	      ? handler.value
	      : ("function($event){" + (handler.value) + "}")
	  } else {
	    var code = ''
	    var keys = []
	    for (var key in handler.modifiers) {
	      if (modifierCode[key]) {
	        code += modifierCode[key]
	      } else {
	        keys.push(key)
	      }
	    }
	    if (keys.length) {
	      code = genKeyFilter(keys) + code
	    }
	    var handlerCode = simplePathRE.test(handler.value)
	      ? handler.value + '($event)'
	      : handler.value
	    return 'function($event){' + code + handlerCode + '}'
	  }
	}

	function genKeyFilter (keys) {
	  var code = keys.length === 1
	    ? normalizeKeyCode(keys[0])
	    : Array.prototype.concat.apply([], keys.map(normalizeKeyCode))
	  if (Array.isArray(code)) {
	    return ("if(" + (code.map(function (c) { return ("$event.keyCode!==" + c); }).join('&&')) + ")return;")
	  } else {
	    return ("if($event.keyCode!==" + code + ")return;")
	  }
	}

	function normalizeKeyCode (key) {
	  return (
	    parseInt(key, 10) || // number keyCode
	    keyCodes[key] || // built-in alias
	    ("_k(" + (JSON.stringify(key)) + ")") // custom alias
	  )
	}

	/*  */

	function bind$2 (el, dir) {
	  el.wrapData = function (code) {
	    return ("_b(" + code + "," + (dir.value) + (dir.modifiers && dir.modifiers.prop ? ',true' : '') + ")")
	  }
	}

	var baseDirectives = {
	  bind: bind$2,
	  cloak: noop
	}

	/*  */

	// configurable state
	var warn$2
	var transforms$1
	var dataGenFns
	var platformDirectives$1
	var staticRenderFns
	var currentOptions

	function generate (
	  ast,
	  options
	) {
	  // save previous staticRenderFns so generate calls can be nested
	  var prevStaticRenderFns = staticRenderFns
	  var currentStaticRenderFns = staticRenderFns = []
	  currentOptions = options
	  warn$2 = options.warn || baseWarn
	  transforms$1 = pluckModuleFunction(options.modules, 'transformCode')
	  dataGenFns = pluckModuleFunction(options.modules, 'genData')
	  platformDirectives$1 = options.directives || {}
	  var code = ast ? genElement(ast) : '_h("div")'
	  staticRenderFns = prevStaticRenderFns
	  return {
	    render: ("with(this){return " + code + "}"),
	    staticRenderFns: currentStaticRenderFns
	  }
	}

	function genElement (el) {
	  if (el.staticRoot && !el.staticProcessed) {
	    // hoist static sub-trees out
	    el.staticProcessed = true
	    staticRenderFns.push(("with(this){return " + (genElement(el)) + "}"))
	    return ("_m(" + (staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
	  } else if (el.for && !el.forProcessed) {
	    return genFor(el)
	  } else if (el.if && !el.ifProcessed) {
	    return genIf(el)
	  } else if (el.tag === 'template' && !el.slotTarget) {
	    return genChildren(el) || 'void 0'
	  } else if (el.tag === 'slot') {
	    return genSlot(el)
	  } else {
	    // component or element
	    var code
	    if (el.component) {
	      code = genComponent(el)
	    } else {
	      var data = genData(el)
	      var children = el.inlineTemplate ? null : genChildren(el)
	      code = "_h('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")"
	    }
	    // module transforms
	    for (var i = 0; i < transforms$1.length; i++) {
	      code = transforms$1[i](el, code)
	    }
	    return code
	  }
	}

	function genIf (el) {
	  var exp = el.if
	  el.ifProcessed = true // avoid recursion
	  return ("(" + exp + ")?" + (genElement(el)) + ":" + (genElse(el)))
	}

	function genElse (el) {
	  return el.elseBlock
	    ? genElement(el.elseBlock)
	    : '_e()'
	}

	function genFor (el) {
	  var exp = el.for
	  var alias = el.alias
	  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : ''
	  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : ''
	  el.forProcessed = true // avoid recursion
	  return "_l((" + exp + ")," +
	    "function(" + alias + iterator1 + iterator2 + "){" +
	      "return " + (genElement(el)) +
	    '})'
	}

	function genData (el) {
	  if (el.plain) {
	    return
	  }

	  var data = '{'

	  // directives first.
	  // directives may mutate the el's other properties before they are generated.
	  var dirs = genDirectives(el)
	  if (dirs) { data += dirs + ',' }

	  // key
	  if (el.key) {
	    data += "key:" + (el.key) + ","
	  }
	  // ref
	  if (el.ref) {
	    data += "ref:" + (el.ref) + ","
	  }
	  if (el.refInFor) {
	    data += "refInFor:true,"
	  }
	  // record original tag name for components using "is" attribute
	  if (el.component) {
	    data += "tag:\"" + (el.tag) + "\","
	  }
	  // slot target
	  if (el.slotTarget) {
	    data += "slot:" + (el.slotTarget) + ","
	  }
	  // module data generation functions
	  for (var i = 0; i < dataGenFns.length; i++) {
	    data += dataGenFns[i](el)
	  }
	  // attributes
	  if (el.attrs) {
	    data += "attrs:{" + (genProps(el.attrs)) + "},"
	  }
	  // DOM props
	  if (el.props) {
	    data += "domProps:{" + (genProps(el.props)) + "},"
	  }
	  // event handlers
	  if (el.events) {
	    data += (genHandlers(el.events)) + ","
	  }
	  if (el.nativeEvents) {
	    data += (genHandlers(el.nativeEvents, true)) + ","
	  }
	  // inline-template
	  if (el.inlineTemplate) {
	    var ast = el.children[0]
	    if ("development" !== 'production' && (
	      el.children.length > 1 || ast.type !== 1
	    )) {
	      warn$2('Inline-template components must have exactly one child element.')
	    }
	    if (ast.type === 1) {
	      var inlineRenderFns = generate(ast, currentOptions)
	      data += "inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}"
	    }
	  }
	  data = data.replace(/,$/, '') + '}'
	  // v-bind data wrap
	  if (el.wrapData) {
	    data = el.wrapData(data)
	  }
	  return data
	}

	function genDirectives (el) {
	  var dirs = el.directives
	  if (!dirs) { return }
	  var res = 'directives:['
	  var hasRuntime = false
	  var i, l, dir, needRuntime
	  for (i = 0, l = dirs.length; i < l; i++) {
	    dir = dirs[i]
	    needRuntime = true
	    var gen = platformDirectives$1[dir.name] || baseDirectives[dir.name]
	    if (gen) {
	      // compile-time directive that manipulates AST.
	      // returns true if it also needs a runtime counterpart.
	      needRuntime = !!gen(el, dir, warn$2)
	    }
	    if (needRuntime) {
	      hasRuntime = true
	      res += "{name:\"" + (dir.name) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:\"" + (dir.arg) + "\"") : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},"
	    }
	  }
	  if (hasRuntime) {
	    return res.slice(0, -1) + ']'
	  }
	}

	function genChildren (el) {
	  if (el.children.length) {
	    return '[' + el.children.map(genNode).join(',') + ']'
	  }
	}

	function genNode (node) {
	  if (node.type === 1) {
	    return genElement(node)
	  } else {
	    return genText(node)
	  }
	}

	function genText (text) {
	  return text.type === 2
	    ? text.expression // no need for () because already wrapped in _s()
	    : JSON.stringify(text.text)
	}

	function genSlot (el) {
	  var slotName = el.slotName || '"default"'
	  var children = genChildren(el)
	  return children
	    ? ("_t(" + slotName + "," + children + ")")
	    : ("_t(" + slotName + ")")
	}

	function genComponent (el) {
	  var children = genChildren(el)
	  return ("_h(" + (el.component) + "," + (genData(el)) + (children ? ("," + children) : '') + ")")
	}

	function genProps (props) {
	  var res = ''
	  for (var i = 0; i < props.length; i++) {
	    var prop = props[i]
	    res += "\"" + (prop.name) + "\":" + (prop.value) + ","
	  }
	  return res.slice(0, -1)
	}

	/*  */

	/**
	 * Compile a template.
	 */
	function compile$1 (
	  template,
	  options
	) {
	  var ast = parse(template.trim(), options)
	  optimize(ast, options)
	  var code = generate(ast, options)
	  return {
	    ast: ast,
	    render: code.render,
	    staticRenderFns: code.staticRenderFns
	  }
	}

	/*  */

	// operators like typeof, instanceof and in are allowed
	var prohibitedKeywordRE = new RegExp('\\b' + (
	  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
	  'super,throw,while,yield,delete,export,import,return,switch,default,' +
	  'extends,finally,continue,debugger,function,arguments'
	).split(',').join('\\b|\\b') + '\\b')
	// check valid identifier for v-for
	var identRE = /[A-Za-z_$][\w$]*/
	// strip strings in expressions
	var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g

	// detect problematic expressions in a template
	function detectErrors (ast) {
	  var errors = []
	  if (ast) {
	    checkNode(ast, errors)
	  }
	  return errors
	}

	function checkNode (node, errors) {
	  if (node.type === 1) {
	    for (var name in node.attrsMap) {
	      if (dirRE.test(name)) {
	        var value = node.attrsMap[name]
	        if (value) {
	          if (name === 'v-for') {
	            checkFor(node, ("v-for=\"" + value + "\""), errors)
	          } else {
	            checkExpression(value, (name + "=\"" + value + "\""), errors)
	          }
	        }
	      }
	    }
	    if (node.children) {
	      for (var i = 0; i < node.children.length; i++) {
	        checkNode(node.children[i], errors)
	      }
	    }
	  } else if (node.type === 2) {
	    checkExpression(node.expression, node.text, errors)
	  }
	}

	function checkFor (node, text, errors) {
	  checkExpression(node.for || '', text, errors)
	  checkIdentifier(node.alias, 'v-for alias', text, errors)
	  checkIdentifier(node.iterator1, 'v-for iterator', text, errors)
	  checkIdentifier(node.iterator2, 'v-for iterator', text, errors)
	}

	function checkIdentifier (ident, type, text, errors) {
	  if (typeof ident === 'string' && !identRE.test(ident)) {
	    errors.push(("- invalid " + type + " \"" + ident + "\" in expression: " + text))
	  }
	}

	function checkExpression (exp, text, errors) {
	  try {
	    new Function(("return " + exp))
	  } catch (e) {
	    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE)
	    if (keywordMatch) {
	      errors.push(
	        "- avoid using JavaScript keyword as property name: " +
	        "\"" + (keywordMatch[0]) + "\" in expression " + text
	      )
	    } else {
	      errors.push(("- invalid expression: " + text))
	    }
	  }
	}

	/*  */

	function transformNode (el, options) {
	  var warn = options.warn || baseWarn
	  var staticClass = getAndRemoveAttr(el, 'class')
	  if ("development" !== 'production' && staticClass) {
	    var expression = parseText(staticClass, options.delimiters)
	    if (expression) {
	      warn(
	        "class=\"" + staticClass + "\": " +
	        'Interpolation inside attributes has been deprecated. ' +
	        'Use v-bind or the colon shorthand instead.'
	      )
	    }
	  }
	  if (staticClass) {
	    el.staticClass = JSON.stringify(staticClass)
	  }
	  var classBinding = getBindingAttr(el, 'class', false /* getStatic */)
	  if (classBinding) {
	    el.classBinding = classBinding
	  }
	}

	function genData$1 (el) {
	  var data = ''
	  if (el.staticClass) {
	    data += "staticClass:" + (el.staticClass) + ","
	  }
	  if (el.classBinding) {
	    data += "class:" + (el.classBinding) + ","
	  }
	  return data
	}

	var klass$1 = {
	  staticKeys: ['staticClass'],
	  transformNode: transformNode,
	  genData: genData$1
	}

	/*  */

	function transformNode$1 (el) {
	  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */)
	  if (styleBinding) {
	    el.styleBinding = styleBinding
	  }
	}

	function genData$2 (el) {
	  return el.styleBinding
	    ? ("style:(" + (el.styleBinding) + "),")
	    : ''
	}

	var style$1 = {
	  transformNode: transformNode$1,
	  genData: genData$2
	}

	var modules$1 = [
	  klass$1,
	  style$1
	]

	/*  */

	var warn$3

	function model$1 (
	  el,
	  dir,
	  _warn
	) {
	  warn$3 = _warn
	  var value = dir.value
	  var modifiers = dir.modifiers
	  var tag = el.tag
	  var type = el.attrsMap.type
	  if (tag === 'select') {
	    return genSelect(el, value)
	  } else if (tag === 'input' && type === 'checkbox') {
	    genCheckboxModel(el, value)
	  } else if (tag === 'input' && type === 'radio') {
	    genRadioModel(el, value)
	  } else {
	    return genDefaultModel(el, value, modifiers)
	  }
	}

	function genCheckboxModel (el, value) {
	  if ("development" !== 'production' &&
	    el.attrsMap.checked != null) {
	    warn$3(
	      "<" + (el.tag) + " v-model=\"" + value + "\" checked>:\n" +
	      "inline checked attributes will be ignored when using v-model. " +
	      'Declare initial values in the component\'s data option instead.'
	    )
	  }
	  var valueBinding = getBindingAttr(el, 'value') || 'null'
	  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true'
	  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false'
	  addProp(el, 'checked',
	    "Array.isArray(" + value + ")" +
	      "?_i(" + value + "," + valueBinding + ")>-1" +
	      ":_q(" + value + "," + trueValueBinding + ")"
	  )
	  addHandler(el, 'change',
	    "var $$a=" + value + "," +
	        '$$el=$event.target,' +
	        "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
	    'if(Array.isArray($$a)){' +
	      "var $$v=" + valueBinding + "," +
	          '$$i=_i($$a,$$v);' +
	      "if($$c){$$i<0&&(" + value + "=$$a.concat($$v))}" +
	      "else{$$i>-1&&(" + value + "=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}" +
	    "}else{" + value + "=$$c}",
	    null, true
	  )
	}

	function genRadioModel (el, value) {
	  if ("development" !== 'production' &&
	    el.attrsMap.checked != null) {
	    warn$3(
	      "<" + (el.tag) + " v-model=\"" + value + "\" checked>:\n" +
	      "inline checked attributes will be ignored when using v-model. " +
	      'Declare initial values in the component\'s data option instead.'
	    )
	  }
	  var valueBinding = getBindingAttr(el, 'value') || 'null'
	  addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"))
	  addHandler(el, 'change', (value + "=" + valueBinding), null, true)
	}

	function genDefaultModel (
	  el,
	  value,
	  modifiers
	) {
	  {
	    if (el.tag === 'input' && el.attrsMap.value) {
	      warn$3(
	        "<" + (el.tag) + " v-model=\"" + value + "\" value=\"" + (el.attrsMap.value) + "\">:\n" +
	        'inline value attributes will be ignored when using v-model. ' +
	        'Declare initial values in the component\'s data option instead.'
	      )
	    }
	    if (el.tag === 'textarea' && el.children.length) {
	      warn$3(
	        "<textarea v-model=\"" + value + "\">:\n" +
	        'inline content inside <textarea> will be ignored when using v-model. ' +
	        'Declare initial values in the component\'s data option instead.'
	      )
	    }
	  }

	  var type = el.attrsMap.type
	  var ref = modifiers || {};
	  var lazy = ref.lazy;
	  var number = ref.number;
	  var trim = ref.trim;
	  var event = lazy || (isIE && type === 'range') ? 'change' : 'input'
	  var needCompositionGuard = !lazy && type !== 'range'
	  var isNative = el.tag === 'input' || el.tag === 'textarea'

	  var valueExpression = isNative
	    ? ("$event.target.value" + (trim ? '.trim()' : ''))
	    : "$event"
	  var code = number || type === 'number'
	    ? (value + "=_n(" + valueExpression + ")")
	    : (value + "=" + valueExpression)
	  if (isNative && needCompositionGuard) {
	    code = "if($event.target.composing)return;" + code
	  }
	  // inputs with type="file" are read only and setting the input's
	  // value will throw an error.
	  if ("development" !== 'production' &&
	      type === 'file') {
	    warn$3(
	      "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
	      "File inputs are read only. Use a v-on:change listener instead."
	    )
	  }
	  addProp(el, 'value', isNative ? ("_s(" + value + ")") : ("(" + value + ")"))
	  addHandler(el, event, code, null, true)
	  if (needCompositionGuard) {
	    // need runtime directive code to help with composition events
	    return true
	  }
	}

	function genSelect (el, value) {
	  {
	    el.children.some(checkOptionWarning)
	  }
	  var code = value + "=Array.prototype.filter" +
	    ".call($event.target.options,function(o){return o.selected})" +
	    ".map(function(o){return \"_value\" in o ? o._value : o.value})" +
	    (el.attrsMap.multiple == null ? '[0]' : '')
	  addHandler(el, 'change', code, null, true)
	  // need runtime to help with possible dynamically generated options
	  return true
	}

	function checkOptionWarning (option) {
	  if (option.type === 1 &&
	    option.tag === 'option' &&
	    option.attrsMap.selected != null) {
	    warn$3(
	      "<select v-model=\"" + (option.parent.attrsMap['v-model']) + "\">:\n" +
	      'inline selected attributes on <option> will be ignored when using v-model. ' +
	      'Declare initial values in the component\'s data option instead.'
	    )
	    return true
	  }
	  return false
	}

	/*  */

	function text (el, dir) {
	  if (dir.value) {
	    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"))
	  }
	}

	/*  */

	function html (el, dir) {
	  if (dir.value) {
	    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"))
	  }
	}

	var directives$1 = {
	  model: model$1,
	  text: text,
	  html: html
	}

	/*  */

	var cache = Object.create(null)

	var baseOptions = {
	  isIE: isIE,
	  expectHTML: true,
	  modules: modules$1,
	  staticKeys: genStaticKeys(modules$1),
	  directives: directives$1,
	  isReservedTag: isReservedTag,
	  isUnaryTag: isUnaryTag,
	  mustUseProp: mustUseProp,
	  getTagNamespace: getTagNamespace,
	  isPreTag: isPreTag
	}

	function compile$$1 (
	  template,
	  options
	) {
	  options = options
	    ? extend(extend({}, baseOptions), options)
	    : baseOptions
	  return compile$1(template, options)
	}

	function compileToFunctions (
	  template,
	  options,
	  vm
	) {
	  var _warn = (options && options.warn) || warn
	  // detect possible CSP restriction
	  /* istanbul ignore if */
	  {
	    try {
	      new Function('return 1')
	    } catch (e) {
	      if (e.toString().match(/unsafe-eval|CSP/)) {
	        _warn(
	          'It seems you are using the standalone build of Vue.js in an ' +
	          'environment with Content Security Policy that prohibits unsafe-eval. ' +
	          'The template compiler cannot work in this environment. Consider ' +
	          'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
	          'templates into render functions.'
	        )
	      }
	    }
	  }
	  var key = options && options.delimiters
	    ? String(options.delimiters) + template
	    : template
	  if (cache[key]) {
	    return cache[key]
	  }
	  var res = {}
	  var compiled = compile$$1(template, options)
	  res.render = makeFunction(compiled.render)
	  var l = compiled.staticRenderFns.length
	  res.staticRenderFns = new Array(l)
	  for (var i = 0; i < l; i++) {
	    res.staticRenderFns[i] = makeFunction(compiled.staticRenderFns[i])
	  }
	  {
	    if (res.render === noop || res.staticRenderFns.some(function (fn) { return fn === noop; })) {
	      _warn(
	        "failed to compile template:\n\n" + template + "\n\n" +
	        detectErrors(compiled.ast).join('\n') +
	        '\n\n',
	        vm
	      )
	    }
	  }
	  return (cache[key] = res)
	}

	function makeFunction (code) {
	  try {
	    return new Function(code)
	  } catch (e) {
	    return noop
	  }
	}

	/*  */

	var idToTemplate = cached(function (id) {
	  var el = query(id)
	  return el && el.innerHTML
	})

	var mount = Vue$3.prototype.$mount
	Vue$3.prototype.$mount = function (
	  el,
	  hydrating
	) {
	  el = el && query(el)

	  /* istanbul ignore if */
	  if (el === document.body || el === document.documentElement) {
	    "development" !== 'production' && warn(
	      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
	    )
	    return this
	  }

	  var options = this.$options
	  // resolve template/el and convert to render function
	  if (!options.render) {
	    var template = options.template
	    var isFromDOM = false
	    if (template) {
	      if (typeof template === 'string') {
	        if (template.charAt(0) === '#') {
	          isFromDOM = true
	          template = idToTemplate(template)
	        }
	      } else if (template.nodeType) {
	        isFromDOM = true
	        template = template.innerHTML
	      } else {
	        {
	          warn('invalid template option:' + template, this)
	        }
	        return this
	      }
	    } else if (el) {
	      isFromDOM = true
	      template = getOuterHTML(el)
	    }
	    if (template) {
	      var ref = compileToFunctions(template, {
	        warn: warn,
	        isFromDOM: isFromDOM,
	        shouldDecodeTags: shouldDecodeTags,
	        shouldDecodeNewlines: shouldDecodeNewlines,
	        delimiters: options.delimiters
	      }, this);
	      var render = ref.render;
	      var staticRenderFns = ref.staticRenderFns;
	      options.render = render
	      options.staticRenderFns = staticRenderFns
	    }
	  }
	  return mount.call(this, el, hydrating)
	}

	/**
	 * Get outerHTML of elements, taking care
	 * of SVG elements in IE as well.
	 */
	function getOuterHTML (el) {
	  if (el.outerHTML) {
	    return el.outerHTML
	  } else {
	    var container = document.createElement('div')
	    container.appendChild(el.cloneNode(true))
	    return container.innerHTML
	  }
	}

	Vue$3.compile = compileToFunctions

	return Vue$3;

	})));


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * vue-router v2.0.0
	 * (c) 2016 Evan You
	 * @license MIT
	 */
	(function (global, factory) {
	   true ? module.exports = factory() :
	  typeof define === 'function' && define.amd ? define(factory) :
	  (global.VueRouter = factory());
	}(this, (function () { 'use strict';

	var View = {
	  name: 'router-view',
	  functional: true,
	  props: {
	    name: {
	      type: String,
	      default: 'default'
	    }
	  },
	  render: function render (h, ref) {
	    var props = ref.props;
	    var children = ref.children;
	    var parent = ref.parent;
	    var data = ref.data;

	    data.routerView = true

	    var route = parent.$route
	    var cache = parent._routerViewCache || (parent._routerViewCache = {})
	    var depth = 0
	    var inactive = false

	    while (parent) {
	      if (parent.$vnode && parent.$vnode.data.routerView) {
	        depth++
	      }
	      if (parent._inactive) {
	        inactive = true
	      }
	      parent = parent.$parent
	    }

	    data.routerViewDepth = depth
	    var matched = route.matched[depth]
	    if (!matched) {
	      return h()
	    }

	    var component = inactive
	      ? cache[props.name]
	      : (cache[props.name] = matched.components[props.name])

	    if (!inactive) {
	      (data.hook || (data.hook = {})).init = function (vnode) {
	        matched.instances[props.name] = vnode.child
	      }
	    }

	    return h(component, data, children)
	  }
	}

	/*  */

	function resolvePath (
	  relative,
	  base,
	  append
	) {
	  if (relative.charAt(0) === '/') {
	    return relative
	  }

	  if (relative.charAt(0) === '?' || relative.charAt(0) === '#') {
	    return base + relative
	  }

	  var stack = base.split('/')

	  // remove trailing segment if:
	  // - not appending
	  // - appending to trailing slash (last segment is empty)
	  if (!append || !stack[stack.length - 1]) {
	    stack.pop()
	  }

	  // resolve relative path
	  var segments = relative.replace(/^\//, '').split('/')
	  for (var i = 0; i < segments.length; i++) {
	    var segment = segments[i]
	    if (segment === '.') {
	      continue
	    } else if (segment === '..') {
	      stack.pop()
	    } else {
	      stack.push(segment)
	    }
	  }

	  // ensure leading slash
	  if (stack[0] !== '') {
	    stack.unshift('')
	  }

	  return stack.join('/')
	}

	function parsePath (path) {
	  var hash = ''
	  var query = ''

	  var hashIndex = path.indexOf('#')
	  if (hashIndex >= 0) {
	    hash = path.slice(hashIndex)
	    path = path.slice(0, hashIndex)
	  }

	  var queryIndex = path.indexOf('?')
	  if (queryIndex >= 0) {
	    query = path.slice(queryIndex + 1)
	    path = path.slice(0, queryIndex)
	  }

	  return {
	    path: path,
	    query: query,
	    hash: hash
	  }
	}

	function cleanPath (path) {
	  return path.replace(/\/\//g, '/')
	}

	/*  */

	function assert (condition, message) {
	  if (!condition) {
	    throw new Error(("[vue-router] " + message))
	  }
	}

	function warn (condition, message) {
	  if (!condition) {
	    typeof console !== 'undefined' && console.warn(("[vue-router] " + message))
	  }
	}

	/*  */

	var encode = encodeURIComponent
	var decode = decodeURIComponent

	function resolveQuery (
	  query,
	  extraQuery
	) {
	  if ( extraQuery === void 0 ) extraQuery = {};

	  if (query) {
	    var parsedQuery
	    try {
	      parsedQuery = parseQuery(query)
	    } catch (e) {
	      warn(false, e.message)
	      parsedQuery = {}
	    }
	    for (var key in extraQuery) {
	      parsedQuery[key] = extraQuery[key]
	    }
	    return parsedQuery
	  } else {
	    return extraQuery
	  }
	}

	function parseQuery (query) {
	  var res = Object.create(null)

	  query = query.trim().replace(/^(\?|#|&)/, '')

	  if (!query) {
	    return res
	  }

	  query.split('&').forEach(function (param) {
	    var parts = param.replace(/\+/g, ' ').split('=')
	    var key = decode(parts.shift())
	    var val = parts.length > 0
	      ? decode(parts.join('='))
	      : null

	    if (res[key] === undefined) {
	      res[key] = val
	    } else if (Array.isArray(res[key])) {
	      res[key].push(val)
	    } else {
	      res[key] = [res[key], val]
	    }
	  })

	  return res
	}

	function stringifyQuery (obj) {
	  var res = obj ? Object.keys(obj).sort().map(function (key) {
	    var val = obj[key]

	    if (val === undefined) {
	      return ''
	    }

	    if (val === null) {
	      return encode(key)
	    }

	    if (Array.isArray(val)) {
	      var result = []
	      val.slice().forEach(function (val2) {
	        if (val2 === undefined) {
	          return
	        }
	        if (val2 === null) {
	          result.push(encode(key))
	        } else {
	          result.push(encode(key) + '=' + encode(val2))
	        }
	      })
	      return result.join('&')
	    }

	    return encode(key) + '=' + encode(val)
	  }).filter(function (x) { return x.length > 0; }).join('&') : null
	  return res ? ("?" + res) : ''
	}

	/*  */

	function createRoute (
	  record,
	  location,
	  redirectedFrom
	) {
	  var route = {
	    name: location.name || (record && record.name),
	    meta: (record && record.meta) || {},
	    path: location.path || '/',
	    hash: location.hash || '',
	    query: location.query || {},
	    params: location.params || {},
	    fullPath: getFullPath(location),
	    matched: record ? formatMatch(record) : []
	  }
	  if (redirectedFrom) {
	    route.redirectedFrom = getFullPath(redirectedFrom)
	  }
	  return Object.freeze(route)
	}

	// the starting route that represents the initial state
	var START = createRoute(null, {
	  path: '/'
	})

	function formatMatch (record) {
	  var res = []
	  while (record) {
	    res.unshift(record)
	    record = record.parent
	  }
	  return res
	}

	function getFullPath (ref) {
	  var path = ref.path;
	  var query = ref.query; if ( query === void 0 ) query = {};
	  var hash = ref.hash; if ( hash === void 0 ) hash = '';

	  return (path || '/') + stringifyQuery(query) + hash
	}

	var trailingSlashRE = /\/$/
	function isSameRoute (a, b) {
	  if (b === START) {
	    return a === b
	  } else if (!b) {
	    return false
	  } else if (a.path && b.path) {
	    return (
	      a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '') &&
	      a.hash === b.hash &&
	      isObjectEqual(a.query, b.query)
	    )
	  } else if (a.name && b.name) {
	    return (
	      a.name === b.name &&
	      a.hash === b.hash &&
	      isObjectEqual(a.query, b.query) &&
	      isObjectEqual(a.params, b.params)
	    )
	  } else {
	    return false
	  }
	}

	function isObjectEqual (a, b) {
	  if ( a === void 0 ) a = {};
	  if ( b === void 0 ) b = {};

	  var aKeys = Object.keys(a)
	  var bKeys = Object.keys(b)
	  if (aKeys.length !== bKeys.length) {
	    return false
	  }
	  return aKeys.every(function (key) { return String(a[key]) === String(b[key]); })
	}

	function isIncludedRoute (current, target) {
	  return (
	    current.path.indexOf(target.path) === 0 &&
	    (!target.hash || current.hash === target.hash) &&
	    queryIncludes(current.query, target.query)
	  )
	}

	function queryIncludes (current, target) {
	  for (var key in target) {
	    if (!(key in current)) {
	      return false
	    }
	  }
	  return true
	}

	/*  */

	function normalizeLocation (
	  raw,
	  current,
	  append
	) {
	  var next = typeof raw === 'string' ? { path: raw } : raw
	  if (next.name || next._normalized) {
	    return next
	  }

	  var parsedPath = parsePath(next.path || '')
	  var basePath = (current && current.path) || '/'
	  var path = parsedPath.path
	    ? resolvePath(parsedPath.path, basePath, append)
	    : (current && current.path) || '/'
	  var query = resolveQuery(parsedPath.query, next.query)
	  var hash = next.hash || parsedPath.hash
	  if (hash && hash.charAt(0) !== '#') {
	    hash = "#" + hash
	  }

	  return {
	    _normalized: true,
	    path: path,
	    query: query,
	    hash: hash
	  }
	}

	/*  */

	// work around weird flow bug
	var toTypes = [String, Object]

	var Link = {
	  name: 'router-link',
	  props: {
	    to: {
	      type: toTypes,
	      required: true
	    },
	    tag: {
	      type: String,
	      default: 'a'
	    },
	    exact: Boolean,
	    append: Boolean,
	    replace: Boolean,
	    activeClass: String
	  },
	  render: function render (h) {
	    var this$1 = this;

	    var router = this.$router
	    var current = this.$route
	    var to = normalizeLocation(this.to, current, this.append)
	    var resolved = router.match(to)
	    var fullPath = resolved.redirectedFrom || resolved.fullPath
	    var base = router.history.base
	    var href = base ? cleanPath(base + fullPath) : fullPath
	    var classes = {}
	    var activeClass = this.activeClass || router.options.linkActiveClass || 'router-link-active'
	    var compareTarget = to.path ? createRoute(null, to) : resolved
	    classes[activeClass] = this.exact
	      ? isSameRoute(current, compareTarget)
	      : isIncludedRoute(current, compareTarget)

	    var on = {
	      click: function (e) {
	        e.preventDefault()
	        if (this$1.replace) {
	          router.replace(to)
	        } else {
	          router.push(to)
	        }
	      }
	    }

	    var data = {
	      class: classes
	    }

	    if (this.tag === 'a') {
	      data.on = on
	      data.attrs = { href: href }
	    } else {
	      // find the first <a> child and apply listener and href
	      var a = findAnchor(this.$slots.default)
	      if (a) {
	        var aData = a.data || (a.data = {})
	        aData.on = on
	        var aAttrs = aData.attrs || (aData.attrs = {})
	        aAttrs.href = href
	      }
	    }

	    return h(this.tag, data, this.$slots.default)
	  }
	}

	function findAnchor (children) {
	  if (children) {
	    var child
	    for (var i = 0; i < children.length; i++) {
	      child = children[i]
	      if (child.tag === 'a') {
	        return child
	      }
	      if (child.children && (child = findAnchor(child.children))) {
	        return child
	      }
	    }
	  }
	}

	function install (Vue) {
	  if (install.installed) { return }
	  install.installed = true

	  Object.defineProperty(Vue.prototype, '$router', {
	    get: function get () { return this.$root._router }
	  })

	  Object.defineProperty(Vue.prototype, '$route', {
	    get: function get$1 () { return this.$root._route }
	  })

	  Vue.mixin({
	    beforeCreate: function beforeCreate () {
	      if (this.$options.router) {
	        this._router = this.$options.router
	        this._router.init(this)
	        Vue.util.defineReactive(this, '_route', this._router.history.current)
	      }
	    }
	  })

	  Vue.component('router-view', View)
	  Vue.component('router-link', Link)
	}

	var __moduleExports = Array.isArray || function (arr) {
	  return Object.prototype.toString.call(arr) == '[object Array]';
	};

	var isarray = __moduleExports

	/**
	 * Expose `pathToRegexp`.
	 */
	var index = pathToRegexp
	var parse_1 = parse
	var compile_1 = compile
	var tokensToFunction_1 = tokensToFunction
	var tokensToRegExp_1 = tokensToRegExp

	/**
	 * The main path matching regexp utility.
	 *
	 * @type {RegExp}
	 */
	var PATH_REGEXP = new RegExp([
	  // Match escaped characters that would otherwise appear in future matches.
	  // This allows the user to escape special characters that won't transform.
	  '(\\\\.)',
	  // Match Express-style parameters and un-named parameters with a prefix
	  // and optional suffixes. Matches appear as:
	  //
	  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
	  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
	  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
	  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
	].join('|'), 'g')

	/**
	 * Parse a string for the raw tokens.
	 *
	 * @param  {string} str
	 * @return {!Array}
	 */
	function parse (str) {
	  var tokens = []
	  var key = 0
	  var index = 0
	  var path = ''
	  var res

	  while ((res = PATH_REGEXP.exec(str)) != null) {
	    var m = res[0]
	    var escaped = res[1]
	    var offset = res.index
	    path += str.slice(index, offset)
	    index = offset + m.length

	    // Ignore already escaped sequences.
	    if (escaped) {
	      path += escaped[1]
	      continue
	    }

	    var next = str[index]
	    var prefix = res[2]
	    var name = res[3]
	    var capture = res[4]
	    var group = res[5]
	    var modifier = res[6]
	    var asterisk = res[7]

	    // Push the current path onto the tokens.
	    if (path) {
	      tokens.push(path)
	      path = ''
	    }

	    var partial = prefix != null && next != null && next !== prefix
	    var repeat = modifier === '+' || modifier === '*'
	    var optional = modifier === '?' || modifier === '*'
	    var delimiter = res[2] || '/'
	    var pattern = capture || group || (asterisk ? '.*' : '[^' + delimiter + ']+?')

	    tokens.push({
	      name: name || key++,
	      prefix: prefix || '',
	      delimiter: delimiter,
	      optional: optional,
	      repeat: repeat,
	      partial: partial,
	      asterisk: !!asterisk,
	      pattern: escapeGroup(pattern)
	    })
	  }

	  // Match any characters still remaining.
	  if (index < str.length) {
	    path += str.substr(index)
	  }

	  // If the path exists, push it onto the end.
	  if (path) {
	    tokens.push(path)
	  }

	  return tokens
	}

	/**
	 * Compile a string to a template function for the path.
	 *
	 * @param  {string}             str
	 * @return {!function(Object=, Object=)}
	 */
	function compile (str) {
	  return tokensToFunction(parse(str))
	}

	/**
	 * Prettier encoding of URI path segments.
	 *
	 * @param  {string}
	 * @return {string}
	 */
	function encodeURIComponentPretty (str) {
	  return encodeURI(str).replace(/[\/?#]/g, function (c) {
	    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
	  })
	}

	/**
	 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
	 *
	 * @param  {string}
	 * @return {string}
	 */
	function encodeAsterisk (str) {
	  return encodeURI(str).replace(/[?#]/g, function (c) {
	    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
	  })
	}

	/**
	 * Expose a method for transforming tokens into the path function.
	 */
	function tokensToFunction (tokens) {
	  // Compile all the tokens into regexps.
	  var matches = new Array(tokens.length)

	  // Compile all the patterns before compilation.
	  for (var i = 0; i < tokens.length; i++) {
	    if (typeof tokens[i] === 'object') {
	      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$')
	    }
	  }

	  return function (obj, opts) {
	    var path = ''
	    var data = obj || {}
	    var options = opts || {}
	    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent

	    for (var i = 0; i < tokens.length; i++) {
	      var token = tokens[i]

	      if (typeof token === 'string') {
	        path += token

	        continue
	      }

	      var value = data[token.name]
	      var segment

	      if (value == null) {
	        if (token.optional) {
	          // Prepend partial segment prefixes.
	          if (token.partial) {
	            path += token.prefix
	          }

	          continue
	        } else {
	          throw new TypeError('Expected "' + token.name + '" to be defined')
	        }
	      }

	      if (isarray(value)) {
	        if (!token.repeat) {
	          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
	        }

	        if (value.length === 0) {
	          if (token.optional) {
	            continue
	          } else {
	            throw new TypeError('Expected "' + token.name + '" to not be empty')
	          }
	        }

	        for (var j = 0; j < value.length; j++) {
	          segment = encode(value[j])

	          if (!matches[i].test(segment)) {
	            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
	          }

	          path += (j === 0 ? token.prefix : token.delimiter) + segment
	        }

	        continue
	      }

	      segment = token.asterisk ? encodeAsterisk(value) : encode(value)

	      if (!matches[i].test(segment)) {
	        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
	      }

	      path += token.prefix + segment
	    }

	    return path
	  }
	}

	/**
	 * Escape a regular expression string.
	 *
	 * @param  {string} str
	 * @return {string}
	 */
	function escapeString (str) {
	  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
	}

	/**
	 * Escape the capturing group by escaping special characters and meaning.
	 *
	 * @param  {string} group
	 * @return {string}
	 */
	function escapeGroup (group) {
	  return group.replace(/([=!:$\/()])/g, '\\$1')
	}

	/**
	 * Attach the keys as a property of the regexp.
	 *
	 * @param  {!RegExp} re
	 * @param  {Array}   keys
	 * @return {!RegExp}
	 */
	function attachKeys (re, keys) {
	  re.keys = keys
	  return re
	}

	/**
	 * Get the flags for a regexp from the options.
	 *
	 * @param  {Object} options
	 * @return {string}
	 */
	function flags (options) {
	  return options.sensitive ? '' : 'i'
	}

	/**
	 * Pull out keys from a regexp.
	 *
	 * @param  {!RegExp} path
	 * @param  {!Array}  keys
	 * @return {!RegExp}
	 */
	function regexpToRegexp (path, keys) {
	  // Use a negative lookahead to match only capturing groups.
	  var groups = path.source.match(/\((?!\?)/g)

	  if (groups) {
	    for (var i = 0; i < groups.length; i++) {
	      keys.push({
	        name: i,
	        prefix: null,
	        delimiter: null,
	        optional: false,
	        repeat: false,
	        partial: false,
	        asterisk: false,
	        pattern: null
	      })
	    }
	  }

	  return attachKeys(path, keys)
	}

	/**
	 * Transform an array into a regexp.
	 *
	 * @param  {!Array}  path
	 * @param  {Array}   keys
	 * @param  {!Object} options
	 * @return {!RegExp}
	 */
	function arrayToRegexp (path, keys, options) {
	  var parts = []

	  for (var i = 0; i < path.length; i++) {
	    parts.push(pathToRegexp(path[i], keys, options).source)
	  }

	  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options))

	  return attachKeys(regexp, keys)
	}

	/**
	 * Create a path regexp from string input.
	 *
	 * @param  {string}  path
	 * @param  {!Array}  keys
	 * @param  {!Object} options
	 * @return {!RegExp}
	 */
	function stringToRegexp (path, keys, options) {
	  var tokens = parse(path)
	  var re = tokensToRegExp(tokens, options)

	  // Attach keys back to the regexp.
	  for (var i = 0; i < tokens.length; i++) {
	    if (typeof tokens[i] !== 'string') {
	      keys.push(tokens[i])
	    }
	  }

	  return attachKeys(re, keys)
	}

	/**
	 * Expose a function for taking tokens and returning a RegExp.
	 *
	 * @param  {!Array}  tokens
	 * @param  {Object=} options
	 * @return {!RegExp}
	 */
	function tokensToRegExp (tokens, options) {
	  options = options || {}

	  var strict = options.strict
	  var end = options.end !== false
	  var route = ''
	  var lastToken = tokens[tokens.length - 1]
	  var endsWithSlash = typeof lastToken === 'string' && /\/$/.test(lastToken)

	  // Iterate over the tokens and create our regexp string.
	  for (var i = 0; i < tokens.length; i++) {
	    var token = tokens[i]

	    if (typeof token === 'string') {
	      route += escapeString(token)
	    } else {
	      var prefix = escapeString(token.prefix)
	      var capture = '(?:' + token.pattern + ')'

	      if (token.repeat) {
	        capture += '(?:' + prefix + capture + ')*'
	      }

	      if (token.optional) {
	        if (!token.partial) {
	          capture = '(?:' + prefix + '(' + capture + '))?'
	        } else {
	          capture = prefix + '(' + capture + ')?'
	        }
	      } else {
	        capture = prefix + '(' + capture + ')'
	      }

	      route += capture
	    }
	  }

	  // In non-strict mode we allow a slash at the end of match. If the path to
	  // match already ends with a slash, we remove it for consistency. The slash
	  // is valid at the end of a path match, not in the middle. This is important
	  // in non-ending mode, where "/test/" shouldn't match "/test//route".
	  if (!strict) {
	    route = (endsWithSlash ? route.slice(0, -2) : route) + '(?:\\/(?=$))?'
	  }

	  if (end) {
	    route += '$'
	  } else {
	    // In non-ending mode, we need the capturing groups to match as much as
	    // possible by using a positive lookahead to the end or next path segment.
	    route += strict && endsWithSlash ? '' : '(?=\\/|$)'
	  }

	  return new RegExp('^' + route, flags(options))
	}

	/**
	 * Normalize the given path string, returning a regular expression.
	 *
	 * An empty array can be passed in for the keys, which will hold the
	 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
	 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
	 *
	 * @param  {(string|RegExp|Array)} path
	 * @param  {(Array|Object)=}       keys
	 * @param  {Object=}               options
	 * @return {!RegExp}
	 */
	function pathToRegexp (path, keys, options) {
	  keys = keys || []

	  if (!isarray(keys)) {
	    options = /** @type {!Object} */ (keys)
	    keys = []
	  } else if (!options) {
	    options = {}
	  }

	  if (path instanceof RegExp) {
	    return regexpToRegexp(path, /** @type {!Array} */ (keys))
	  }

	  if (isarray(path)) {
	    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
	  }

	  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
	}

	index.parse = parse_1;
	index.compile = compile_1;
	index.tokensToFunction = tokensToFunction_1;
	index.tokensToRegExp = tokensToRegExp_1;

	/*  */

	function createRouteMap (routes) {
	  var pathMap = Object.create(null)
	  var nameMap = Object.create(null)

	  routes.forEach(function (route) {
	    addRouteRecord(pathMap, nameMap, route)
	  })

	  return {
	    pathMap: pathMap,
	    nameMap: nameMap
	  }
	}

	function addRouteRecord (
	  pathMap,
	  nameMap,
	  route,
	  parent,
	  matchAs
	) {
	  var path = route.path;
	  var name = route.name;
	  assert(path != null, "\"path\" is required in a route configuration.")

	  var record = {
	    path: normalizePath(path, parent),
	    components: route.components || { default: route.component },
	    instances: {},
	    name: name,
	    parent: parent,
	    matchAs: matchAs,
	    redirect: route.redirect,
	    beforeEnter: route.beforeEnter,
	    meta: route.meta || {}
	  }

	  if (route.children) {
	    // Warn if route is named and has a default child route.
	    // If users navigate to this route by name, the default child will
	    // not be rendered (GH Issue #629)
	    if (false) {}
	    route.children.forEach(function (child) {
	      addRouteRecord(pathMap, nameMap, child, record)
	    })
	  }

	  if (route.alias) {
	    if (Array.isArray(route.alias)) {
	      route.alias.forEach(function (alias) {
	        addRouteRecord(pathMap, nameMap, { path: alias }, parent, record.path)
	      })
	    } else {
	      addRouteRecord(pathMap, nameMap, { path: route.alias }, parent, record.path)
	    }
	  }

	  pathMap[record.path] = record
	  if (name) { nameMap[name] = record }
	}

	function normalizePath (path, parent) {
	  path = path.replace(/\/$/, '')
	  if (path[0] === '/') { return path }
	  if (parent == null) { return path }
	  return cleanPath(((parent.path) + "/" + path))
	}

	/*  */

	var regexpCache = Object.create(null)

	var regexpCompileCache = Object.create(null)

	function createMatcher (routes) {
	  var ref = createRouteMap(routes);
	  var pathMap = ref.pathMap;
	  var nameMap = ref.nameMap;

	  function match (
	    raw,
	    currentRoute,
	    redirectedFrom
	  ) {
	    var location = normalizeLocation(raw, currentRoute)
	    var name = location.name;

	    if (name) {
	      var record = nameMap[name]
	      if (record) {
	        location.path = fillParams(record.path, location.params, ("named route \"" + name + "\""))
	        return _createRoute(record, location, redirectedFrom)
	      }
	    } else if (location.path) {
	      location.params = {}
	      for (var path in pathMap) {
	        if (matchRoute(path, location.params, location.path)) {
	          return _createRoute(pathMap[path], location, redirectedFrom)
	        }
	      }
	    }
	    // no match
	    return _createRoute(null, location)
	  }

	  function redirect (
	    record,
	    location
	  ) {
	    var originalRedirect = record.redirect
	    var redirect = typeof originalRedirect === 'function'
	        ? originalRedirect(createRoute(record, location))
	        : originalRedirect

	    if (typeof redirect === 'string') {
	      redirect = { path: redirect }
	    }

	    if (!redirect || typeof redirect !== 'object') {
	      warn(false, ("invalid redirect option: " + (JSON.stringify(redirect))))
	      return _createRoute(null, location)
	    }

	    var re = redirect
	    var name = re.name;
	    var path = re.path;
	    var query = location.query;
	    var hash = location.hash;
	    var params = location.params;
	    query = re.hasOwnProperty('query') ? re.query : query
	    hash = re.hasOwnProperty('hash') ? re.hash : hash
	    params = re.hasOwnProperty('params') ? re.params : params

	    if (name) {
	      // resolved named direct
	      var targetRecord = nameMap[name]
	      assert(targetRecord, ("redirect failed: named route \"" + name + "\" not found."))
	      return match({
	        _normalized: true,
	        name: name,
	        query: query,
	        hash: hash,
	        params: params
	      }, undefined, location)
	    } else if (path) {
	      // 1. resolve relative redirect
	      var rawPath = resolveRecordPath(path, record)
	      // 2. resolve params
	      var resolvedPath = fillParams(rawPath, params, ("redirect route with path \"" + rawPath + "\""))
	      // 3. rematch with existing query and hash
	      return match({
	        _normalized: true,
	        path: resolvedPath,
	        query: query,
	        hash: hash
	      }, undefined, location)
	    } else {
	      warn(false, ("invalid redirect option: " + (JSON.stringify(redirect))))
	      return _createRoute(null, location)
	    }
	  }

	  function alias (
	    record,
	    location,
	    matchAs
	  ) {
	    var aliasedPath = fillParams(matchAs, location.params, ("aliased route with path \"" + matchAs + "\""))
	    var aliasedMatch = match({
	      _normalized: true,
	      path: aliasedPath
	    })
	    if (aliasedMatch) {
	      var matched = aliasedMatch.matched
	      var aliasedRecord = matched[matched.length - 1]
	      location.params = aliasedMatch.params
	      return _createRoute(aliasedRecord, location)
	    }
	    return _createRoute(null, location)
	  }

	  function _createRoute (
	    record,
	    location,
	    redirectedFrom
	  ) {
	    if (record && record.redirect) {
	      return redirect(record, redirectedFrom || location)
	    }
	    if (record && record.matchAs) {
	      return alias(record, location, record.matchAs)
	    }
	    return createRoute(record, location, redirectedFrom)
	  }

	  return match
	}

	function matchRoute (
	  path,
	  params,
	  pathname
	) {
	  var keys, regexp
	  var hit = regexpCache[path]
	  if (hit) {
	    keys = hit.keys
	    regexp = hit.regexp
	  } else {
	    keys = []
	    regexp = index(path, keys)
	    regexpCache[path] = { keys: keys, regexp: regexp }
	  }
	  var m = pathname.match(regexp)

	  if (!m) {
	    return false
	  } else if (!params) {
	    return true
	  }

	  for (var i = 1, len = m.length; i < len; ++i) {
	    var key = keys[i - 1]
	    var val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i]
	    if (key) { params[key.name] = val }
	  }

	  return true
	}

	function fillParams (
	  path,
	  params,
	  routeMsg
	) {
	  try {
	    var filler =
	      regexpCompileCache[path] ||
	      (regexpCompileCache[path] = index.compile(path))
	    return filler(params || {}, { pretty: true })
	  } catch (e) {
	    assert(false, ("missing param for " + routeMsg + ": " + (e.message)))
	    return ''
	  }
	}

	function resolveRecordPath (path, record) {
	  return resolvePath(path, record.parent ? record.parent.path : '/', true)
	}

	/*  */

	var inBrowser = typeof window !== 'undefined'

	var supportsHistory = inBrowser && (function () {
	  var ua = window.navigator.userAgent

	  if (
	    (ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &&
	    ua.indexOf('Mobile Safari') !== -1 &&
	    ua.indexOf('Chrome') === -1 &&
	    ua.indexOf('Windows Phone') === -1
	  ) {
	    return false
	  }

	  return window.history && 'pushState' in window.history
	})()

	/*  */

	function runQueue (queue, fn, cb) {
	  var step = function (index) {
	    if (index >= queue.length) {
	      cb()
	    } else {
	      if (queue[index]) {
	        fn(queue[index], function () {
	          step(index + 1)
	        })
	      } else {
	        step(index + 1)
	      }
	    }
	  }
	  step(0)
	}

	/*  */


	var History = function History (router, base) {
	  this.router = router
	  this.base = normalizeBase(base)
	  // start with a route object that stands for "nowhere"
	  this.current = START
	  this.pending = null
	};

	History.prototype.listen = function listen (cb) {
	  this.cb = cb
	};

	History.prototype.transitionTo = function transitionTo (location, cb) {
	    var this$1 = this;

	  var route = this.router.match(location, this.current)
	  this.confirmTransition(route, function () {
	    this$1.updateRoute(route)
	    cb && cb(route)
	    this$1.ensureURL()
	  })
	};

	History.prototype.confirmTransition = function confirmTransition (route, cb) {
	    var this$1 = this;

	  var current = this.current
	  if (isSameRoute(route, current)) {
	    this.ensureURL()
	    return
	  }

	  var ref = resolveQueue(this.current.matched, route.matched);
	    var deactivated = ref.deactivated;
	    var activated = ref.activated;

	  var queue = [].concat(
	    // in-component leave guards
	    extractLeaveGuards(deactivated),
	    // global before hooks
	    this.router.beforeHooks,
	    // enter guards
	    activated.map(function (m) { return m.beforeEnter; }),
	    // async components
	    resolveAsyncComponents(activated)
	  )

	  this.pending = route
	  var iterator = function (hook, next) {
	    if (this$1.pending !== route) { return }
	    hook(route, current, function (to) {
	      if (to === false) {
	        // next(false) -> abort navigation, ensure current URL
	        this$1.ensureURL()
	      } else if (typeof to === 'string' || typeof to === 'object') {
	        // next('/') or next({ path: '/' }) -> redirect
	        this$1.push(to)
	      } else {
	        // confirm transition and pass on the value
	        next(to)
	      }
	    })
	  }

	  runQueue(queue, iterator, function () {
	    var postEnterCbs = []
	    // wait until async components are resolved before
	    // extracting in-component enter guards
	    runQueue(extractEnterGuards(activated, postEnterCbs), iterator, function () {
	      if (this$1.pending === route) {
	        this$1.pending = null
	        cb(route)
	        this$1.router.app.$nextTick(function () {
	          postEnterCbs.forEach(function (cb) { return cb(); })
	        })
	      }
	    })
	  })
	};

	History.prototype.updateRoute = function updateRoute (route) {
	  var prev = this.current
	  this.current = route
	  this.cb && this.cb(route)
	  this.router.afterHooks.forEach(function (hook) {
	    hook && hook(route, prev)
	  })
	};

	function normalizeBase (base) {
	  if (!base) {
	    if (inBrowser) {
	      // respect <base> tag
	      var baseEl = document.querySelector('base')
	      base = baseEl ? baseEl.getAttribute('href') : '/'
	    } else {
	      base = '/'
	    }
	  }
	  // make sure there's the starting slash
	  if (base.charAt(0) !== '/') {
	    base = '/' + base
	  }
	  // remove trailing slash
	  return base.replace(/\/$/, '')
	}

	function resolveQueue (
	  current,
	  next
	) {
	  var i
	  var max = Math.max(current.length, next.length)
	  for (i = 0; i < max; i++) {
	    if (current[i] !== next[i]) {
	      break
	    }
	  }
	  return {
	    activated: next.slice(i),
	    deactivated: current.slice(i)
	  }
	}

	function extractLeaveGuards (matched) {
	  return flatMapComponents(matched, function (def, instance) {
	    var guard = def && def.beforeRouteLeave
	    if (guard) {
	      return function routeLeaveGuard () {
	        return guard.apply(instance, arguments)
	      }
	    }
	  }).reverse()
	}

	function extractEnterGuards (matched, cbs) {
	  return flatMapComponents(matched, function (def, _, match, key) {
	    var guard = def && def.beforeRouteEnter
	    if (guard) {
	      return function routeEnterGuard (to, from, next) {
	        return guard(to, from, function (cb) {
	          next(cb)
	          if (typeof cb === 'function') {
	            cbs.push(function () {
	              cb(match.instances[key])
	            })
	          }
	        })
	      }
	    }
	  })
	}

	function resolveAsyncComponents (matched) {
	  return flatMapComponents(matched, function (def, _, match, key) {
	    // if it's a function and doesn't have Vue options attached,
	    // assume it's an async component resolve function.
	    // we are not using Vue's default async resolving mechanism because
	    // we want to halt the navigation until the incoming component has been
	    // resolved.
	    if (typeof def === 'function' && !def.options) {
	      return function (to, from, next) {
	        var resolve = function (resolvedDef) {
	          match.components[key] = resolvedDef
	          next()
	        }

	        var reject = function (reason) {
	          warn(false, ("Failed to resolve async component " + key + ": " + reason))
	          next(false)
	        }

	        var res = def(resolve, reject)
	        if (res && typeof res.then === 'function') {
	          res.then(resolve, reject)
	        }
	      }
	    }
	  })
	}

	function flatMapComponents (
	  matched,
	  fn
	) {
	  return Array.prototype.concat.apply([], matched.map(function (m) {
	    return Object.keys(m.components).map(function (key) { return fn(
	      m.components[key],
	      m.instances[key],
	      m, key
	    ); })
	  }))
	}

	/*  */

	function saveScrollPosition (key) {
	  if (!key) { return }
	  window.sessionStorage.setItem(key, JSON.stringify({
	    x: window.pageXOffset,
	    y: window.pageYOffset
	  }))
	}

	function getScrollPosition (key) {
	  if (!key) { return }
	  return JSON.parse(window.sessionStorage.getItem(key))
	}

	function getElementPosition (el) {
	  var docRect = document.documentElement.getBoundingClientRect()
	  var elRect = el.getBoundingClientRect()
	  return {
	    x: elRect.left - docRect.left,
	    y: elRect.top - docRect.top
	  }
	}

	function isValidPosition (obj) {
	  return isNumber(obj.x) || isNumber(obj.y)
	}

	function normalizePosition (obj) {
	  return {
	    x: isNumber(obj.x) ? obj.x : window.pageXOffset,
	    y: isNumber(obj.y) ? obj.y : window.pageYOffset
	  }
	}

	function isNumber (v) {
	  return typeof v === 'number'
	}

	/*  */


	var genKey = function () { return String(Date.now()); }
	var _key = genKey()

	var HTML5History = (function (History) {
	  function HTML5History (router, base) {
	    var this$1 = this;

	    History.call(this, router, base)

	    this.transitionTo(getLocation(this.base))

	    var expectScroll = router.options.scrollBehavior
	    window.addEventListener('popstate', function (e) {
	      _key = e.state && e.state.key
	      var current = this$1.current
	      this$1.transitionTo(getLocation(this$1.base), function (next) {
	        if (expectScroll) {
	          this$1.handleScroll(next, current, true)
	        }
	      })
	    })

	    if (expectScroll) {
	      window.addEventListener('scroll', function () {
	        saveScrollPosition(_key)
	      })
	    }
	  }

	  if ( History ) HTML5History.__proto__ = History;
	  HTML5History.prototype = Object.create( History && History.prototype );
	  HTML5History.prototype.constructor = HTML5History;

	  HTML5History.prototype.go = function go (n) {
	    window.history.go(n)
	  };

	  HTML5History.prototype.push = function push (location) {
	    var this$1 = this;

	    var current = this.current
	    this.transitionTo(location, function (route) {
	      pushState(cleanPath(this$1.base + route.fullPath))
	      this$1.handleScroll(route, current, false)
	    })
	  };

	  HTML5History.prototype.replace = function replace (location) {
	    var this$1 = this;

	    var current = this.current
	    this.transitionTo(location, function (route) {
	      replaceState(cleanPath(this$1.base + route.fullPath))
	      this$1.handleScroll(route, current, false)
	    })
	  };

	  HTML5History.prototype.ensureURL = function ensureURL () {
	    if (getLocation(this.base) !== this.current.fullPath) {
	      replaceState(cleanPath(this.base + this.current.fullPath))
	    }
	  };

	  HTML5History.prototype.handleScroll = function handleScroll (to, from, isPop) {
	    var router = this.router
	    if (!router.app) {
	      return
	    }

	    var behavior = router.options.scrollBehavior
	    if (!behavior) {
	      return
	    }
	    assert(typeof behavior === 'function', "scrollBehavior must be a function")

	    // wait until re-render finishes before scrolling
	    router.app.$nextTick(function () {
	      var position = getScrollPosition(_key)
	      var shouldScroll = behavior(to, from, isPop ? position : null)
	      if (!shouldScroll) {
	        return
	      }
	      var isObject = typeof shouldScroll === 'object'
	      if (isObject && typeof shouldScroll.selector === 'string') {
	        var el = document.querySelector(shouldScroll.selector)
	        if (el) {
	          position = getElementPosition(el)
	        } else if (isValidPosition(shouldScroll)) {
	          position = normalizePosition(shouldScroll)
	        }
	      } else if (isObject && isValidPosition(shouldScroll)) {
	        position = normalizePosition(shouldScroll)
	      }

	      if (position) {
	        window.scrollTo(position.x, position.y)
	      }
	    })
	  };

	  return HTML5History;
	}(History));

	function getLocation (base) {
	  var path = window.location.pathname
	  if (base && path.indexOf(base) === 0) {
	    path = path.slice(base.length)
	  }
	  return (path || '/') + window.location.search + window.location.hash
	}

	function pushState (url, replace) {
	  // try...catch the pushState call to get around Safari
	  // DOM Exception 18 where it limits to 100 pushState calls
	  var history = window.history
	  try {
	    if (replace) {
	      history.replaceState({ key: _key }, '', url)
	    } else {
	      _key = genKey()
	      history.pushState({ key: _key }, '', url)
	    }
	    saveScrollPosition(_key)
	  } catch (e) {
	    window.location[replace ? 'assign' : 'replace'](url)
	  }
	}

	function replaceState (url) {
	  pushState(url, true)
	}

	/*  */


	var HashHistory = (function (History) {
	  function HashHistory (router, base, fallback) {
	    var this$1 = this;

	    History.call(this, router, base)

	    // check history fallback deeplinking
	    if (fallback && this.checkFallback()) {
	      return
	    }

	    ensureSlash()
	    this.transitionTo(getHash())

	    window.addEventListener('hashchange', function () {
	      this$1.onHashChange()
	    })
	  }

	  if ( History ) HashHistory.__proto__ = History;
	  HashHistory.prototype = Object.create( History && History.prototype );
	  HashHistory.prototype.constructor = HashHistory;

	  HashHistory.prototype.checkFallback = function checkFallback () {
	    var location = getLocation(this.base)
	    if (!/^\/#/.test(location)) {
	      window.location.replace(
	        cleanPath(this.base + '/#' + location)
	      )
	      return true
	    }
	  };

	  HashHistory.prototype.onHashChange = function onHashChange () {
	    if (!ensureSlash()) {
	      return
	    }
	    this.transitionTo(getHash(), function (route) {
	      replaceHash(route.fullPath)
	    })
	  };

	  HashHistory.prototype.push = function push (location) {
	    History.prototype.transitionTo.call(this, location, function (route) {
	      pushHash(route.fullPath)
	    })
	  };

	  HashHistory.prototype.replace = function replace (location) {
	    History.prototype.transitionTo.call(this, location, function (route) {
	      replaceHash(route.fullPath)
	    })
	  };

	  HashHistory.prototype.go = function go (n) {
	    window.history.go(n)
	  };

	  HashHistory.prototype.ensureURL = function ensureURL () {
	    if (getHash() !== this.current.fullPath) {
	      replaceHash(this.current.fullPath)
	    }
	  };

	  return HashHistory;
	}(History));

	function ensureSlash () {
	  var path = getHash()
	  if (path.charAt(0) === '/') {
	    return true
	  }
	  replaceHash('/' + path)
	  return false
	}

	function getHash () {
	  // We can't use window.location.hash here because it's not
	  // consistent across browsers - Firefox will pre-decode it!
	  var href = window.location.href
	  var index = href.indexOf('#')
	  return index === -1 ? '' : href.slice(index + 1)
	}

	function pushHash (path) {
	  window.location.hash = path
	}

	function replaceHash (path) {
	  var i = window.location.href.indexOf('#')
	  window.location.replace(
	    window.location.href.slice(0, i >= 0 ? i : 0) + '#' + path
	  )
	}

	/*  */


	var AbstractHistory = (function (History) {
	  function AbstractHistory (router) {
	    History.call(this, router)
	    this.stack = []
	    this.index = 0
	  }

	  if ( History ) AbstractHistory.__proto__ = History;
	  AbstractHistory.prototype = Object.create( History && History.prototype );
	  AbstractHistory.prototype.constructor = AbstractHistory;

	  AbstractHistory.prototype.push = function push (location) {
	    var this$1 = this;

	    History.prototype.transitionTo.call(this, location, function (route) {
	      this$1.stack = this$1.stack.slice(0, this$1.index + 1).concat(route)
	      this$1.index++
	    })
	  };

	  AbstractHistory.prototype.replace = function replace (location) {
	    var this$1 = this;

	    History.prototype.transitionTo.call(this, location, function (route) {
	      this$1.stack = this$1.stack.slice(0, this$1.index).concat(route)
	    })
	  };

	  AbstractHistory.prototype.go = function go (n) {
	    var this$1 = this;

	    var targetIndex = this.index + n
	    if (targetIndex < 0 || targetIndex >= this.stack.length) {
	      return
	    }
	    var location = this.stack[targetIndex]
	    this.confirmTransition(location, function () {
	      this$1.index = targetIndex
	      this$1.updateRoute(location)
	    })
	  };

	  AbstractHistory.prototype.ensureURL = function ensureURL () {
	    // noop
	  };

	  return AbstractHistory;
	}(History));

	/*  */

	var VueRouter = function VueRouter (options) {
	  if ( options === void 0 ) options = {};

	  this.app = null
	  this.options = options
	  this.beforeHooks = []
	  this.afterHooks = []
	  this.match = createMatcher(options.routes || [])

	  var mode = options.mode || 'hash'
	  this.fallback = mode === 'history' && !supportsHistory
	  if (this.fallback) {
	    mode = 'hash'
	  }
	  if (!inBrowser) {
	    mode = 'abstract'
	  }
	  this.mode = mode
	};

	var prototypeAccessors = { currentRoute: {} };

	prototypeAccessors.currentRoute.get = function () {
	  return this.history && this.history.current
	};

	VueRouter.prototype.init = function init (app /* Vue component instance */) {
	    var this$1 = this;

	  assert(
	    install.installed,
	    "not installed. Make sure to call `Vue.use(VueRouter)` " +
	    "before creating root instance."
	  )

	  this.app = app

	  var ref = this;
	    var mode = ref.mode;
	    var options = ref.options;
	    var fallback = ref.fallback;
	  switch (mode) {
	    case 'history':
	      this.history = new HTML5History(this, options.base)
	      break
	    case 'hash':
	      this.history = new HashHistory(this, options.base, fallback)
	      break
	    case 'abstract':
	      this.history = new AbstractHistory(this)
	      break
	    default:
	      assert(false, ("invalid mode: " + mode))
	  }

	  this.history.listen(function (route) {
	    this$1.app._route = route
	  })
	};

	VueRouter.prototype.beforeEach = function beforeEach (fn) {
	  this.beforeHooks.push(fn)
	};

	VueRouter.prototype.afterEach = function afterEach (fn) {
	  this.afterHooks.push(fn)
	};

	VueRouter.prototype.push = function push (location) {
	  this.history.push(location)
	};

	VueRouter.prototype.replace = function replace (location) {
	  this.history.replace(location)
	};

	VueRouter.prototype.go = function go (n) {
	  this.history.go(n)
	};

	VueRouter.prototype.back = function back () {
	  this.go(-1)
	};

	VueRouter.prototype.forward = function forward () {
	  this.go(1)
	};

	VueRouter.prototype.getMatchedComponents = function getMatchedComponents () {
	  if (!this.currentRoute) {
	    return []
	  }
	  return [].concat.apply([], this.currentRoute.matched.map(function (m) {
	    return Object.keys(m.components).map(function (key) {
	      return m.components[key]
	    })
	  }))
	};

	Object.defineProperties( VueRouter.prototype, prototypeAccessors );

	VueRouter.install = install

	if (inBrowser && window.Vue) {
	  window.Vue.use(VueRouter)
	}

	return VueRouter;

	})));

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * vue-resource v1.0.3
	 * https://github.com/vuejs/vue-resource
	 * Released under the MIT License.
	 */

	!function(t,n){ true?module.exports=n():"function"==typeof define&&define.amd?define(n):t.VueResource=n()}(this,function(){"use strict";function t(t){this.state=it,this.value=void 0,this.deferred=[];var n=this;try{t(function(t){n.resolve(t)},function(t){n.reject(t)})}catch(t){n.reject(t)}}function n(t,n){t instanceof Promise?this.promise=t:this.promise=new Promise(t.bind(n)),this.context=n}function e(t){at=t.util,ct=t.config.debug||!t.config.silent}function o(t){"undefined"!=typeof console&&ct&&console.warn("[VueResource warn]: "+t)}function r(t){"undefined"!=typeof console&&console.error(t)}function i(t,n){return at.nextTick(t,n)}function u(t){return t.replace(/^\s*|\s*$/g,"")}function s(t){return t?t.toLowerCase():""}function c(t){return t?t.toUpperCase():""}function a(t){return"string"==typeof t}function f(t){return t===!0||t===!1}function h(t){return"function"==typeof t}function p(t){return null!==t&&"object"==typeof t}function l(t){return p(t)&&Object.getPrototypeOf(t)==Object.prototype}function d(t){return"undefined"!=typeof Blob&&t instanceof Blob}function m(t){return"undefined"!=typeof FormData&&t instanceof FormData}function y(t,e,o){var r=n.resolve(t);return arguments.length<2?r:r.then(e,o)}function v(t,n,e){return e=e||{},h(e)&&(e=e.call(n)),g(t.bind({$vm:n,$options:e}),t,{$options:e})}function b(t,n){var e,o;if(t&&"number"==typeof t.length)for(e=0;e<t.length;e++)n.call(t[e],t[e],e);else if(p(t))for(o in t)t.hasOwnProperty(o)&&n.call(t[o],t[o],o);return t}function g(t){var n=ft.call(arguments,1);return n.forEach(function(n){x(t,n,!0)}),t}function w(t){var n=ft.call(arguments,1);return n.forEach(function(n){for(var e in n)void 0===t[e]&&(t[e]=n[e])}),t}function T(t){var n=ft.call(arguments,1);return n.forEach(function(n){x(t,n)}),t}function x(t,n,e){for(var o in n)e&&(l(n[o])||ht(n[o]))?(l(n[o])&&!l(t[o])&&(t[o]={}),ht(n[o])&&!ht(t[o])&&(t[o]=[]),x(t[o],n[o],e)):void 0!==n[o]&&(t[o]=n[o])}function j(t,n){var e=n(t);return a(t.root)&&!e.match(/^(https?:)?\//)&&(e=t.root+"/"+e),e}function E(t,n){var e=Object.keys(k.options.params),o={},r=n(t);return b(t.params,function(t,n){e.indexOf(n)===-1&&(o[n]=t)}),o=k.params(o),o&&(r+=(r.indexOf("?")==-1?"?":"&")+o),r}function O(t,n,e){var o=P(t),r=o.expand(n);return e&&e.push.apply(e,o.vars),r}function P(t){var n=["+","#",".","/",";","?","&"],e=[];return{vars:e,expand:function(o){return t.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g,function(t,r,i){if(r){var u=null,s=[];if(n.indexOf(r.charAt(0))!==-1&&(u=r.charAt(0),r=r.substr(1)),r.split(/,/g).forEach(function(t){var n=/([^:\*]*)(?::(\d+)|(\*))?/.exec(t);s.push.apply(s,C(o,u,n[1],n[2]||n[3])),e.push(n[1])}),u&&"+"!==u){var c=",";return"?"===u?c="&":"#"!==u&&(c=u),(0!==s.length?u:"")+s.join(c)}return s.join(",")}return U(i)})}}}function C(t,n,e,o){var r=t[e],i=[];if($(r)&&""!==r)if("string"==typeof r||"number"==typeof r||"boolean"==typeof r)r=r.toString(),o&&"*"!==o&&(r=r.substring(0,parseInt(o,10))),i.push(R(n,r,A(n)?e:null));else if("*"===o)Array.isArray(r)?r.filter($).forEach(function(t){i.push(R(n,t,A(n)?e:null))}):Object.keys(r).forEach(function(t){$(r[t])&&i.push(R(n,r[t],t))});else{var u=[];Array.isArray(r)?r.filter($).forEach(function(t){u.push(R(n,t))}):Object.keys(r).forEach(function(t){$(r[t])&&(u.push(encodeURIComponent(t)),u.push(R(n,r[t].toString())))}),A(n)?i.push(encodeURIComponent(e)+"="+u.join(",")):0!==u.length&&i.push(u.join(","))}else";"===n?i.push(encodeURIComponent(e)):""!==r||"&"!==n&&"?"!==n?""===r&&i.push(""):i.push(encodeURIComponent(e)+"=");return i}function $(t){return void 0!==t&&null!==t}function A(t){return";"===t||"&"===t||"?"===t}function R(t,n,e){return n="+"===t||"#"===t?U(n):encodeURIComponent(n),e?encodeURIComponent(e)+"="+n:n}function U(t){return t.split(/(%[0-9A-Fa-f]{2})/g).map(function(t){return/%[0-9A-Fa-f]/.test(t)||(t=encodeURI(t)),t}).join("")}function S(t){var n=[],e=O(t.url,t.params,n);return n.forEach(function(n){delete t.params[n]}),e}function k(t,n){var e,o=this||{},r=t;return a(t)&&(r={url:t,params:n}),r=g({},k.options,o.$options,r),k.transforms.forEach(function(t){e=I(t,e,o.$vm)}),e(r)}function I(t,n,e){return function(o){return t.call(e,o,n)}}function H(t,n,e){var o,r=ht(n),i=l(n);b(n,function(n,u){o=p(n)||ht(n),e&&(u=e+"["+(i||o?u:"")+"]"),!e&&r?t.add(n.name,n.value):o?H(t,n,u):t.add(u,n)})}function L(t){return new n(function(n){var e=new XDomainRequest,o=function(o){var r=o.type,i=0;"load"===r?i=200:"error"===r&&(i=500),n(t.respondWith(e.responseText,{status:i}))};t.abort=function(){return e.abort()},e.open(t.method,t.getUrl()),e.timeout=0,e.onload=o,e.onerror=o,e.ontimeout=o,e.onprogress=function(){},e.send(t.getBody())})}function N(t,n){!f(t.crossOrigin)&&q(t)&&(t.crossOrigin=!0),t.crossOrigin&&(yt||(t.client=L),delete t.emulateHTTP),n()}function q(t){var n=k.parse(k(t));return n.protocol!==mt.protocol||n.host!==mt.host}function B(t,n){m(t.body)?t.headers.delete("Content-Type"):(p(t.body)||ht(t.body))&&(t.emulateJSON?(t.body=k.params(t.body),t.headers.set("Content-Type","application/x-www-form-urlencoded")):t.body=JSON.stringify(t.body)),n(function(t){return Object.defineProperty(t,"data",{get:function(){return this.body},set:function(t){this.body=t}}),t.bodyText?y(t.text(),function(n){var e=t.headers.get("Content-Type");if(a(e)&&0===e.indexOf("application/json"))try{t.body=JSON.parse(n)}catch(n){t.body=null}else t.body=n;return t}):t})}function J(t){return new n(function(n){var e,o,r=t.jsonp||"callback",i="_jsonp"+Math.random().toString(36).substr(2),u=null;e=function(e){var r=e.type,s=0;"load"===r&&null!==u?s=200:"error"===r&&(s=500),n(t.respondWith(u,{status:s})),delete window[i],document.body.removeChild(o)},t.params[r]=i,window[i]=function(t){u=JSON.stringify(t)},o=document.createElement("script"),o.src=t.getUrl(),o.type="text/javascript",o.async=!0,o.onload=e,o.onerror=e,document.body.appendChild(o)})}function D(t,n){"JSONP"==t.method&&(t.client=J),n(function(n){if("JSONP"==t.method)return y(n.json(),function(t){return n.body=t,n})})}function M(t,n){h(t.before)&&t.before.call(this,t),n()}function X(t,n){t.emulateHTTP&&/^(PUT|PATCH|DELETE)$/i.test(t.method)&&(t.headers.set("X-HTTP-Method-Override",t.method),t.method="POST"),n()}function F(t,n){var e=pt({},Z.headers.common,t.crossOrigin?{}:Z.headers.custom,Z.headers[s(t.method)]);b(e,function(n,e){t.headers.has(e)||t.headers.set(e,n)}),n()}function W(t,n){var e;t.timeout&&(e=setTimeout(function(){t.abort()},t.timeout)),n(function(t){clearTimeout(e)})}function G(t){return new n(function(n){var e=new XMLHttpRequest,o=function(o){var r=t.respondWith("response"in e?e.response:e.responseText,{status:1223===e.status?204:e.status,statusText:1223===e.status?"No Content":u(e.statusText)});b(u(e.getAllResponseHeaders()).split("\n"),function(t){r.headers.append(t.slice(0,t.indexOf(":")),t.slice(t.indexOf(":")+1))}),n(r)};t.abort=function(){return e.abort()},t.progress&&("GET"===t.method?e.addEventListener("progress",t.progress):/^(POST|PUT)$/i.test(t.method)&&e.upload.addEventListener("progress",t.progress)),e.open(t.method,t.getUrl(),!0),"responseType"in e&&(e.responseType="blob"),t.credentials===!0&&(e.withCredentials=!0),t.headers.forEach(function(t,n){e.setRequestHeader(n,t)}),e.timeout=0,e.onload=o,e.onerror=o,e.send(t.getBody())})}function V(t){function e(e){return new n(function(n){function s(){r=i.pop(),h(r)?r.call(t,e,c):(o("Invalid interceptor of type "+typeof r+", must be a function"),c())}function c(e){if(h(e))u.unshift(e);else if(p(e))return u.forEach(function(n){e=y(e,function(e){return n.call(t,e)||e})}),void y(e,n);s()}s()},t)}var r,i=[_],u=[];return p(t)||(t=null),e.use=function(t){i.push(t)},e}function _(t,n){var e=t.client||G;n(e(t))}function z(t,n){return Object.keys(t).reduce(function(t,e){return s(n)===s(e)?e:t},null)}function K(t){if(/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(t))throw new TypeError("Invalid character in header field name");return u(t)}function Q(t){return new n(function(n){var e=new FileReader;e.readAsText(t),e.onload=function(){n(e.result)}})}function Y(t){return 0===t.type.indexOf("text")||t.type.indexOf("json")!==-1}function Z(t){var e=this||{},o=V(e.$vm);return w(t||{},e.$options,Z.options),Z.interceptors.forEach(function(t){o.use(t)}),o(new wt(t)).then(function(t){return t.ok?t:n.reject(t)},function(t){return t instanceof Error&&r(t),n.reject(t)})}function tt(t,n,e,o){var r=this||{},i={};return e=pt({},tt.actions,e),b(e,function(e,u){e=g({url:t,params:pt({},n)},o,e),i[u]=function(){return(r.$http||Z)(nt(e,arguments))}}),i}function nt(t,n){var e,o=pt({},t),r={};switch(n.length){case 2:r=n[0],e=n[1];break;case 1:/^(POST|PUT|PATCH)$/i.test(o.method)?e=n[0]:r=n[0];break;case 0:break;default:throw"Expected up to 4 arguments [params, body], got "+n.length+" arguments"}return o.body=e,o.params=pt({},o.params,r),o}function et(t){et.installed||(e(t),t.url=k,t.http=Z,t.resource=tt,t.Promise=n,Object.defineProperties(t.prototype,{$url:{get:function(){return v(t.url,this,this.$options.url)}},$http:{get:function(){return v(t.http,this,this.$options.http)}},$resource:{get:function(){return t.resource.bind(this)}},$promise:{get:function(){var n=this;return function(e){return new t.Promise(e,n)}}}}))}var ot=0,rt=1,it=2;t.reject=function(n){return new t(function(t,e){e(n)})},t.resolve=function(n){return new t(function(t,e){t(n)})},t.all=function(n){return new t(function(e,o){function r(t){return function(o){u[t]=o,i+=1,i===n.length&&e(u)}}var i=0,u=[];0===n.length&&e(u);for(var s=0;s<n.length;s+=1)t.resolve(n[s]).then(r(s),o)})},t.race=function(n){return new t(function(e,o){for(var r=0;r<n.length;r+=1)t.resolve(n[r]).then(e,o)})};var ut=t.prototype;ut.resolve=function(t){var n=this;if(n.state===it){if(t===n)throw new TypeError("Promise settled with itself.");var e=!1;try{var o=t&&t.then;if(null!==t&&"object"==typeof t&&"function"==typeof o)return void o.call(t,function(t){e||n.resolve(t),e=!0},function(t){e||n.reject(t),e=!0})}catch(t){return void(e||n.reject(t))}n.state=ot,n.value=t,n.notify()}},ut.reject=function(t){var n=this;if(n.state===it){if(t===n)throw new TypeError("Promise settled with itself.");n.state=rt,n.value=t,n.notify()}},ut.notify=function(){var t=this;i(function(){if(t.state!==it)for(;t.deferred.length;){var n=t.deferred.shift(),e=n[0],o=n[1],r=n[2],i=n[3];try{t.state===ot?r("function"==typeof e?e.call(void 0,t.value):t.value):t.state===rt&&("function"==typeof o?r(o.call(void 0,t.value)):i(t.value))}catch(t){i(t)}}})},ut.then=function(n,e){var o=this;return new t(function(t,r){o.deferred.push([n,e,t,r]),o.notify()})},ut.catch=function(t){return this.then(void 0,t)},"undefined"==typeof Promise&&(window.Promise=t),n.all=function(t,e){return new n(Promise.all(t),e)},n.resolve=function(t,e){return new n(Promise.resolve(t),e)},n.reject=function(t,e){return new n(Promise.reject(t),e)},n.race=function(t,e){return new n(Promise.race(t),e)};var st=n.prototype;st.bind=function(t){return this.context=t,this},st.then=function(t,e){return t&&t.bind&&this.context&&(t=t.bind(this.context)),e&&e.bind&&this.context&&(e=e.bind(this.context)),new n(this.promise.then(t,e),this.context)},st.catch=function(t){return t&&t.bind&&this.context&&(t=t.bind(this.context)),new n(this.promise.catch(t),this.context)},st.finally=function(t){return this.then(function(n){return t.call(this),n},function(n){return t.call(this),Promise.reject(n)})};var ct=!1,at={},ft=[].slice,ht=Array.isArray,pt=Object.assign||T,lt=document.documentMode,dt=document.createElement("a");k.options={url:"",root:null,params:{}},k.transforms=[S,E,j],k.params=function(t){var n=[],e=encodeURIComponent;return n.add=function(t,n){h(n)&&(n=n()),null===n&&(n=""),this.push(e(t)+"="+e(n))},H(n,t),n.join("&").replace(/%20/g,"+")},k.parse=function(t){return lt&&(dt.href=t,t=dt.href),dt.href=t,{href:dt.href,protocol:dt.protocol?dt.protocol.replace(/:$/,""):"",port:dt.port,host:dt.host,hostname:dt.hostname,pathname:"/"===dt.pathname.charAt(0)?dt.pathname:"/"+dt.pathname,search:dt.search?dt.search.replace(/^\?/,""):"",hash:dt.hash?dt.hash.replace(/^#/,""):""}};var mt=k.parse(location.href),yt="withCredentials"in new XMLHttpRequest,vt=function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")},bt=function(){function t(n){var e=this;vt(this,t),this.map={},b(n,function(t,n){return e.append(n,t)})}return t.prototype.has=function(t){return null!==z(this.map,t)},t.prototype.get=function(t){var n=this.map[z(this.map,t)];return n?n[0]:null},t.prototype.getAll=function(t){return this.map[z(this.map,t)]||[]},t.prototype.set=function(t,n){this.map[K(z(this.map,t)||t)]=[u(n)]},t.prototype.append=function(t,n){var e=this.getAll(t);e.length?e.push(u(n)):this.set(t,n)},t.prototype.delete=function(t){delete this.map[z(this.map,t)]},t.prototype.forEach=function(t,n){var e=this;b(this.map,function(o,r){b(o,function(o){return t.call(n,o,r,e)})})},t}(),gt=function(){function t(n,e){var o=e.url,r=e.headers,i=e.status,u=e.statusText;vt(this,t),this.url=o,this.ok=i>=200&&i<300,this.status=i||0,this.statusText=u||"",this.headers=new bt(r),this.body=n,a(n)?this.bodyText=n:d(n)&&(this.bodyBlob=n,Y(n)&&(this.bodyText=Q(n)))}return t.prototype.blob=function(){return y(this.bodyBlob)},t.prototype.text=function(){return y(this.bodyText)},t.prototype.json=function(){return y(this.text(),function(t){return JSON.parse(t)})},t}(),wt=function(){function t(n){vt(this,t),this.body=null,this.params={},pt(this,n,{method:c(n.method||"GET")}),this.headers instanceof bt||(this.headers=new bt(this.headers))}return t.prototype.getUrl=function(){return k(this)},t.prototype.getBody=function(){return this.body},t.prototype.respondWith=function(t,n){return new gt(t,pt(n||{},{url:this.getUrl()}))},t}(),Tt={"X-Requested-With":"XMLHttpRequest"},xt={Accept:"application/json, text/plain, */*"},jt={"Content-Type":"application/json;charset=utf-8"};return Z.options={},Z.headers={put:jt,post:jt,patch:jt,delete:jt,custom:Tt,common:xt},Z.interceptors=[M,W,X,B,D,F,N],["get","delete","head","jsonp"].forEach(function(t){Z[t]=function(n,e){return this(pt(e||{},{url:n,method:t}))}}),["post","put","patch"].forEach(function(t){Z[t]=function(n,e,o){return this(pt(o||{},{url:n,method:t,body:e}))}}),tt.actions={get:{method:"GET"},save:{method:"POST"},query:{method:"GET"},update:{method:"PUT"},remove:{method:"DELETE"},delete:{method:"DELETE"}},"undefined"!=typeof window&&window.Vue&&window.Vue.use(et),et});

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	// 模版组件
	var Index = __webpack_require__(5);
	var Search = __webpack_require__(13);
	var List = __webpack_require__(18);
	var Login = __webpack_require__(28);
	var Register = __webpack_require__(33);
	var Forget = __webpack_require__(38);
	var Forgettips = __webpack_require__(43);
	var Password = __webpack_require__(48);
	var Cart = __webpack_require__(53);

	// 路由routes
	module.exports = {
		path : '*',
		redirect : '/index',
	  routes: [
	    { path: '/', component: Index },
	    { path: '/index', component: Index },
	    { path: '/search', component: Search },
	    { path: '/list', component: List },
	    { path: '/login', component: Login },
	    { path: '/register', component: Register },
	    { path: '/forget', component: Forget },
	    { path: '/forgettips', component: Forgettips },
	    { path: '/password', component: Password },
	    { path: '/cart', component: Cart }
	  ]
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(6)
	__vue_script__ = __webpack_require__(10)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] shopping\\tpl\\index.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(12)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./index.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(7);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./index.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./index.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\r\n/*分享*/\r\n.i-share{\r\n\tbackground: #fff;\r\n}\r\n.i-share-list{\r\n\t\r\n}\r\n.i-share-img{\r\n\t\r\n}\r\n.i-share-img img{\r\n\twidth: 100%;\r\n}\r\n.i-share-text{\r\n\tpadding: 5px;\r\n}\r\n\r\n/*头部*/\r\n.i-header{\r\n\tposition: fixed;\r\n\twidth: 100%;\r\n\tbackground: #42b8d3;\r\n\tline-height: 1rem;\r\n\theight: 3rem;\r\n\tfont-size: 1rem;\r\n\tpadding: .5rem 5%;\r\n\tcolor: #fff;\r\n\tmax-width: 920px;\r\n    box-sizing: border-box;\r\n}\r\n.i-header-h{\r\n\theight: 3rem;\r\n}\r\n.i-header-search{\r\n\ttext-align: center;\r\n\tpadding: 0 3rem;\r\n}\r\n.i-header-search-input{\r\n\theight: 2rem;\r\n\tline-height: 2rem;\r\n\tborder: none;\r\n\tbackground: rgba(255,255,255,.3);\r\n\tcolor: #fff;\r\n\tfont-size: .8rem;\r\n\twidth: 100%;\r\n\ttext-align: center;\r\n\tdisplay: block;\r\n\tborder-radius: 4px;\r\n}\r\n.i-header-search-input:focus{\r\n\ttext-decoration: none;\r\n\tcolor: #fff;\r\n}\r\n.i-header-login{\r\n\tposition: absolute;\r\n\tleft: 0;\r\n\ttop: 0;\r\n\twidth: 1.6rem;\r\n\theight: 1.6rem;\r\n\ttext-align: center;\r\n\tpadding: .7rem .5em;\r\n\tdisplay: block;\r\n\tcolor: #fff;\r\n}\r\n.i-header-login span{\r\n\twidth: 1.6rem;\r\n\theight: 1.6rem;\r\n\tline-height: 1.4rem;\r\n\tborder: 1px solid #fff;\r\n\tborder-radius: 50%;\r\n\tdisplay: block;\r\n\tbox-sizing: border-box;\r\n}\r\n\r\n/*幻灯片*/\r\n.swiper-container {\r\n\tmargin: 0 auto;\r\n\tposition: relative;\r\n\toverflow: hidden;\r\n\tz-index: 1;\r\n}\r\n.swiper-wrapper {\r\n\tposition: relative;\r\n\twidth: 100%;\r\n\theight: 100%;\r\n\tz-index: 1;\r\n\tdisplay: -webkit-box;\r\n\tdisplay: -ms-flexbox;\r\n\tdisplay: flex;\r\n\t-webkit-transition-property: -webkit-transform;\r\n\ttransition-property: -webkit-transform;\r\n\ttransition-property: transform;\r\n\ttransition-property: transform, -webkit-transform;\r\n\tbox-sizing: content-box;\r\n\t-webkit-transform: translate3d(0, 0, 0);\r\n\ttransform: translate3d(0, 0, 0);\r\n}\r\n.swiper-slide {\r\n\t-webkit-flex-shrink: 0;\r\n\t-ms-flex: 0 0 auto;\r\n\t-ms-flex-negative: 0;\r\n\t    flex-shrink: 0;\r\n\twidth: 100%;\r\n\theight: 100%;\r\n\tposition: relative;\r\n}\r\n.swiper-slide img{\r\n\twidth: 100%;\r\n}\r\n.swiper-pagination {\r\n\tposition: absolute;\r\n\ttext-align: center;\r\n\t-webkit-transition: .3s;\r\n\ttransition: .3s;\r\n\t-webkit-transform: translate3d(0, 0, 0);\r\n\ttransform: translate3d(0, 0, 0);\r\n\tz-index: 10;\r\n}\r\n.swiper-container-horizontal>.swiper-pagination-bullets {\r\n\tbottom: 3px;\r\n\tleft: 0;\r\n\twidth: 100%;\r\n}\r\n.swiper-pagination-bullet {\r\n\twidth: 6px;\r\n\theight: 6px;\r\n\tdisplay: inline-block;\r\n\tborder-radius: 100%;\r\n\tbackground: #fff;\r\n\topacity: .5;\r\n}\r\nbutton.swiper-pagination-bullet {\r\n\tborder: none;\r\n\tmargin: 0;\r\n\tpadding: 0;\r\n\tbox-shadow: none;\r\n\t-moz-appearance: none;\r\n\t-ms-appearance: none;\r\n\t-webkit-appearance: none;\r\n\tappearance: none;\r\n}\r\n.swiper-pagination-clickable .swiper-pagination-bullet { cursor: pointer;}\r\n.swiper-pagination-white .swiper-pagination-bullet { background: #fff}\r\n.swiper-pagination-bullet-active {\r\n\topacity: 1;\r\n\tbackground: #68e0de;\r\n}\r\n.swiper-pagination-white .swiper-pagination-bullet-active {\tbackground: #fff;}\r\n.swiper-pagination-black .swiper-pagination-bullet-active { background: #000;}\r\n.swiper-container-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet {\tmargin: 0 3px;}\r\n\r\n/*导航*/\r\n.i-nav{ border-bottom: 1px solid #ddd; font-size: 0; background: #fff; margin-bottom: 5px;}\r\n.i-nav-link{ width: 25%; display: inline-block; font-size: .8rem; padding: 1em 5px; box-sizing: border-box; color: #999;}\r\n.i-nav-link b,.i-nav-link span{ display: block; text-align: center;}\r\n.i-nav-link b{ font-size: 1.4em; padding-bottom: 8px;}\r\n", ""]);

	// exports


/***/ },
/* 8 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(true) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if (media) {
			styleElement.setAttribute("media", media);
		}

		if (sourceMap) {
			// https://developer.chrome.com/devtools/docs/javascript-debugging
			// this makes source maps inside style tags work properly in Chrome
			css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */';
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Swiper = __webpack_require__(11);
	module.exports = {
		data: function data() {
			return {
				"banner": [{ "img": "/shopping/static/images/11.jpg", "url": "/" }, { "img": "/shopping/static/images/12.jpg", "url": "/" }]
			};
		},
		mounted: function mounted() {
			this.$nextTick(function () {
				setTimeout(function () {
					var swiper = new Swiper('.swiper-container', {
						autoplay: 3000,
						loop: true,
						pagination: '.swiper-pagination',
						paginationClickable: true
					});
				}, 0);
			});
		}
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Swiper 3.3.1
	 * Most modern mobile touch slider and framework with hardware accelerated transitions
	 * 
	 * http://www.idangero.us/swiper/
	 * 
	 * Copyright 2016, Vladimir Kharlampidi
	 * The iDangero.us
	 * http://www.idangero.us/
	 * 
	 * Licensed under MIT
	 * 
	 * Released on: February 7, 2016
	 */
	!function(){"use strict";function e(e){e.fn.swiper=function(a){var r;return e(this).each(function(){var e=new t(this,a);r||(r=e)}),r}}var a,t=function(e,i){function s(e){return Math.floor(e)}function n(){b.autoplayTimeoutId=setTimeout(function(){b.params.loop?(b.fixLoop(),b._slideNext(),b.emit("onAutoplay",b)):b.isEnd?i.autoplayStopOnLast?b.stopAutoplay():(b._slideTo(0),b.emit("onAutoplay",b)):(b._slideNext(),b.emit("onAutoplay",b))},b.params.autoplay)}function o(e,t){var r=a(e.target);if(!r.is(t))if("string"==typeof t)r=r.parents(t);else if(t.nodeType){var i;return r.parents().each(function(e,a){a===t&&(i=t)}),i?t:void 0}if(0!==r.length)return r[0]}function l(e,a){a=a||{};var t=window.MutationObserver||window.WebkitMutationObserver,r=new t(function(e){e.forEach(function(e){b.onResize(!0),b.emit("onObserverUpdate",b,e)})});r.observe(e,{attributes:"undefined"==typeof a.attributes?!0:a.attributes,childList:"undefined"==typeof a.childList?!0:a.childList,characterData:"undefined"==typeof a.characterData?!0:a.characterData}),b.observers.push(r)}function p(e){e.originalEvent&&(e=e.originalEvent);var a=e.keyCode||e.charCode;if(!b.params.allowSwipeToNext&&(b.isHorizontal()&&39===a||!b.isHorizontal()&&40===a))return!1;if(!b.params.allowSwipeToPrev&&(b.isHorizontal()&&37===a||!b.isHorizontal()&&38===a))return!1;if(!(e.shiftKey||e.altKey||e.ctrlKey||e.metaKey||document.activeElement&&document.activeElement.nodeName&&("input"===document.activeElement.nodeName.toLowerCase()||"textarea"===document.activeElement.nodeName.toLowerCase()))){if(37===a||39===a||38===a||40===a){var t=!1;if(b.container.parents(".swiper-slide").length>0&&0===b.container.parents(".swiper-slide-active").length)return;var r={left:window.pageXOffset,top:window.pageYOffset},i=window.innerWidth,s=window.innerHeight,n=b.container.offset();b.rtl&&(n.left=n.left-b.container[0].scrollLeft);for(var o=[[n.left,n.top],[n.left+b.width,n.top],[n.left,n.top+b.height],[n.left+b.width,n.top+b.height]],l=0;l<o.length;l++){var p=o[l];p[0]>=r.left&&p[0]<=r.left+i&&p[1]>=r.top&&p[1]<=r.top+s&&(t=!0)}if(!t)return}b.isHorizontal()?((37===a||39===a)&&(e.preventDefault?e.preventDefault():e.returnValue=!1),(39===a&&!b.rtl||37===a&&b.rtl)&&b.slideNext(),(37===a&&!b.rtl||39===a&&b.rtl)&&b.slidePrev()):((38===a||40===a)&&(e.preventDefault?e.preventDefault():e.returnValue=!1),40===a&&b.slideNext(),38===a&&b.slidePrev())}}function d(e){e.originalEvent&&(e=e.originalEvent);var a=b.mousewheel.event,t=0,r=b.rtl?-1:1;if("mousewheel"===a)if(b.params.mousewheelForceToAxis)if(b.isHorizontal()){if(!(Math.abs(e.wheelDeltaX)>Math.abs(e.wheelDeltaY)))return;t=e.wheelDeltaX*r}else{if(!(Math.abs(e.wheelDeltaY)>Math.abs(e.wheelDeltaX)))return;t=e.wheelDeltaY}else t=Math.abs(e.wheelDeltaX)>Math.abs(e.wheelDeltaY)?-e.wheelDeltaX*r:-e.wheelDeltaY;else if("DOMMouseScroll"===a)t=-e.detail;else if("wheel"===a)if(b.params.mousewheelForceToAxis)if(b.isHorizontal()){if(!(Math.abs(e.deltaX)>Math.abs(e.deltaY)))return;t=-e.deltaX*r}else{if(!(Math.abs(e.deltaY)>Math.abs(e.deltaX)))return;t=-e.deltaY}else t=Math.abs(e.deltaX)>Math.abs(e.deltaY)?-e.deltaX*r:-e.deltaY;if(0!==t){if(b.params.mousewheelInvert&&(t=-t),b.params.freeMode){var i=b.getWrapperTranslate()+t*b.params.mousewheelSensitivity,s=b.isBeginning,n=b.isEnd;if(i>=b.minTranslate()&&(i=b.minTranslate()),i<=b.maxTranslate()&&(i=b.maxTranslate()),b.setWrapperTransition(0),b.setWrapperTranslate(i),b.updateProgress(),b.updateActiveIndex(),(!s&&b.isBeginning||!n&&b.isEnd)&&b.updateClasses(),b.params.freeModeSticky?(clearTimeout(b.mousewheel.timeout),b.mousewheel.timeout=setTimeout(function(){b.slideReset()},300)):b.params.lazyLoading&&b.lazy&&b.lazy.load(),0===i||i===b.maxTranslate())return}else{if((new window.Date).getTime()-b.mousewheel.lastScrollTime>60)if(0>t)if(b.isEnd&&!b.params.loop||b.animating){if(b.params.mousewheelReleaseOnEdges)return!0}else b.slideNext();else if(b.isBeginning&&!b.params.loop||b.animating){if(b.params.mousewheelReleaseOnEdges)return!0}else b.slidePrev();b.mousewheel.lastScrollTime=(new window.Date).getTime()}return b.params.autoplay&&b.stopAutoplay(),e.preventDefault?e.preventDefault():e.returnValue=!1,!1}}function u(e,t){e=a(e);var r,i,s,n=b.rtl?-1:1;r=e.attr("data-swiper-parallax")||"0",i=e.attr("data-swiper-parallax-x"),s=e.attr("data-swiper-parallax-y"),i||s?(i=i||"0",s=s||"0"):b.isHorizontal()?(i=r,s="0"):(s=r,i="0"),i=i.indexOf("%")>=0?parseInt(i,10)*t*n+"%":i*t*n+"px",s=s.indexOf("%")>=0?parseInt(s,10)*t+"%":s*t+"px",e.transform("translate3d("+i+", "+s+",0px)")}function c(e){return 0!==e.indexOf("on")&&(e=e[0]!==e[0].toUpperCase()?"on"+e[0].toUpperCase()+e.substring(1):"on"+e),e}if(!(this instanceof t))return new t(e,i);var m={direction:"horizontal",touchEventsTarget:"container",initialSlide:0,speed:300,autoplay:!1,autoplayDisableOnInteraction:!0,autoplayStopOnLast:!1,iOSEdgeSwipeDetection:!1,iOSEdgeSwipeThreshold:20,freeMode:!1,freeModeMomentum:!0,freeModeMomentumRatio:1,freeModeMomentumBounce:!0,freeModeMomentumBounceRatio:1,freeModeSticky:!1,freeModeMinimumVelocity:.02,autoHeight:!1,setWrapperSize:!1,virtualTranslate:!1,effect:"slide",coverflow:{rotate:50,stretch:0,depth:100,modifier:1,slideShadows:!0},flip:{slideShadows:!0,limitRotation:!0},cube:{slideShadows:!0,shadow:!0,shadowOffset:20,shadowScale:.94},fade:{crossFade:!1},parallax:!1,scrollbar:null,scrollbarHide:!0,scrollbarDraggable:!1,scrollbarSnapOnRelease:!1,keyboardControl:!1,mousewheelControl:!1,mousewheelReleaseOnEdges:!1,mousewheelInvert:!1,mousewheelForceToAxis:!1,mousewheelSensitivity:1,hashnav:!1,breakpoints:void 0,spaceBetween:0,slidesPerView:1,slidesPerColumn:1,slidesPerColumnFill:"column",slidesPerGroup:1,centeredSlides:!1,slidesOffsetBefore:0,slidesOffsetAfter:0,roundLengths:!1,touchRatio:1,touchAngle:45,simulateTouch:!0,shortSwipes:!0,longSwipes:!0,longSwipesRatio:.5,longSwipesMs:300,followFinger:!0,onlyExternal:!1,threshold:0,touchMoveStopPropagation:!0,uniqueNavElements:!0,pagination:null,paginationElement:"span",paginationClickable:!1,paginationHide:!1,paginationBulletRender:null,paginationProgressRender:null,paginationFractionRender:null,paginationCustomRender:null,paginationType:"bullets",resistance:!0,resistanceRatio:.85,nextButton:null,prevButton:null,watchSlidesProgress:!1,watchSlidesVisibility:!1,grabCursor:!1,preventClicks:!0,preventClicksPropagation:!0,slideToClickedSlide:!1,lazyLoading:!1,lazyLoadingInPrevNext:!1,lazyLoadingInPrevNextAmount:1,lazyLoadingOnTransitionStart:!1,preloadImages:!0,updateOnImagesReady:!0,loop:!1,loopAdditionalSlides:0,loopedSlides:null,control:void 0,controlInverse:!1,controlBy:"slide",allowSwipeToPrev:!0,allowSwipeToNext:!0,swipeHandler:null,noSwiping:!0,noSwipingClass:"swiper-no-swiping",slideClass:"swiper-slide",slideActiveClass:"swiper-slide-active",slideVisibleClass:"swiper-slide-visible",slideDuplicateClass:"swiper-slide-duplicate",slideNextClass:"swiper-slide-next",slidePrevClass:"swiper-slide-prev",wrapperClass:"swiper-wrapper",bulletClass:"swiper-pagination-bullet",bulletActiveClass:"swiper-pagination-bullet-active",buttonDisabledClass:"swiper-button-disabled",paginationCurrentClass:"swiper-pagination-current",paginationTotalClass:"swiper-pagination-total",paginationHiddenClass:"swiper-pagination-hidden",paginationProgressbarClass:"swiper-pagination-progressbar",observer:!1,observeParents:!1,a11y:!1,prevSlideMessage:"Previous slide",nextSlideMessage:"Next slide",firstSlideMessage:"This is the first slide",lastSlideMessage:"This is the last slide",paginationBulletMessage:"Go to slide {{index}}",runCallbacksOnInit:!0},h=i&&i.virtualTranslate;i=i||{};var f={};for(var g in i)if("object"!=typeof i[g]||null===i[g]||(i[g].nodeType||i[g]===window||i[g]===document||"undefined"!=typeof r&&i[g]instanceof r||"undefined"!=typeof jQuery&&i[g]instanceof jQuery))f[g]=i[g];else{f[g]={};for(var v in i[g])f[g][v]=i[g][v]}for(var w in m)if("undefined"==typeof i[w])i[w]=m[w];else if("object"==typeof i[w])for(var y in m[w])"undefined"==typeof i[w][y]&&(i[w][y]=m[w][y]);var b=this;if(b.params=i,b.originalParams=f,b.classNames=[],"undefined"!=typeof a&&"undefined"!=typeof r&&(a=r),("undefined"!=typeof a||(a="undefined"==typeof r?window.Dom7||window.Zepto||window.jQuery:r))&&(b.$=a,b.currentBreakpoint=void 0,b.getActiveBreakpoint=function(){if(!b.params.breakpoints)return!1;var e,a=!1,t=[];for(e in b.params.breakpoints)b.params.breakpoints.hasOwnProperty(e)&&t.push(e);t.sort(function(e,a){return parseInt(e,10)>parseInt(a,10)});for(var r=0;r<t.length;r++)e=t[r],e>=window.innerWidth&&!a&&(a=e);return a||"max"},b.setBreakpoint=function(){var e=b.getActiveBreakpoint();if(e&&b.currentBreakpoint!==e){var a=e in b.params.breakpoints?b.params.breakpoints[e]:b.originalParams,t=b.params.loop&&a.slidesPerView!==b.params.slidesPerView;for(var r in a)b.params[r]=a[r];b.currentBreakpoint=e,t&&b.destroyLoop&&b.reLoop(!0)}},b.params.breakpoints&&b.setBreakpoint(),b.container=a(e),0!==b.container.length)){if(b.container.length>1){var x=[];return b.container.each(function(){x.push(new t(this,i))}),x}b.container[0].swiper=b,b.container.data("swiper",b),b.classNames.push("swiper-container-"+b.params.direction),b.params.freeMode&&b.classNames.push("swiper-container-free-mode"),b.support.flexbox||(b.classNames.push("swiper-container-no-flexbox"),b.params.slidesPerColumn=1),b.params.autoHeight&&b.classNames.push("swiper-container-autoheight"),(b.params.parallax||b.params.watchSlidesVisibility)&&(b.params.watchSlidesProgress=!0),["cube","coverflow","flip"].indexOf(b.params.effect)>=0&&(b.support.transforms3d?(b.params.watchSlidesProgress=!0,b.classNames.push("swiper-container-3d")):b.params.effect="slide"),"slide"!==b.params.effect&&b.classNames.push("swiper-container-"+b.params.effect),"cube"===b.params.effect&&(b.params.resistanceRatio=0,b.params.slidesPerView=1,b.params.slidesPerColumn=1,b.params.slidesPerGroup=1,b.params.centeredSlides=!1,b.params.spaceBetween=0,b.params.virtualTranslate=!0,b.params.setWrapperSize=!1),("fade"===b.params.effect||"flip"===b.params.effect)&&(b.params.slidesPerView=1,b.params.slidesPerColumn=1,b.params.slidesPerGroup=1,b.params.watchSlidesProgress=!0,b.params.spaceBetween=0,b.params.setWrapperSize=!1,"undefined"==typeof h&&(b.params.virtualTranslate=!0)),b.params.grabCursor&&b.support.touch&&(b.params.grabCursor=!1),b.wrapper=b.container.children("."+b.params.wrapperClass),b.params.pagination&&(b.paginationContainer=a(b.params.pagination),b.params.uniqueNavElements&&"string"==typeof b.params.pagination&&b.paginationContainer.length>1&&1===b.container.find(b.params.pagination).length&&(b.paginationContainer=b.container.find(b.params.pagination)),"bullets"===b.params.paginationType&&b.params.paginationClickable?b.paginationContainer.addClass("swiper-pagination-clickable"):b.params.paginationClickable=!1,b.paginationContainer.addClass("swiper-pagination-"+b.params.paginationType)),(b.params.nextButton||b.params.prevButton)&&(b.params.nextButton&&(b.nextButton=a(b.params.nextButton),b.params.uniqueNavElements&&"string"==typeof b.params.nextButton&&b.nextButton.length>1&&1===b.container.find(b.params.nextButton).length&&(b.nextButton=b.container.find(b.params.nextButton))),b.params.prevButton&&(b.prevButton=a(b.params.prevButton),b.params.uniqueNavElements&&"string"==typeof b.params.prevButton&&b.prevButton.length>1&&1===b.container.find(b.params.prevButton).length&&(b.prevButton=b.container.find(b.params.prevButton)))),b.isHorizontal=function(){return"horizontal"===b.params.direction},b.rtl=b.isHorizontal()&&("rtl"===b.container[0].dir.toLowerCase()||"rtl"===b.container.css("direction")),b.rtl&&b.classNames.push("swiper-container-rtl"),b.rtl&&(b.wrongRTL="-webkit-box"===b.wrapper.css("display")),b.params.slidesPerColumn>1&&b.classNames.push("swiper-container-multirow"),b.device.android&&b.classNames.push("swiper-container-android"),b.container.addClass(b.classNames.join(" ")),b.translate=0,b.progress=0,b.velocity=0,b.lockSwipeToNext=function(){b.params.allowSwipeToNext=!1},b.lockSwipeToPrev=function(){b.params.allowSwipeToPrev=!1},b.lockSwipes=function(){b.params.allowSwipeToNext=b.params.allowSwipeToPrev=!1},b.unlockSwipeToNext=function(){b.params.allowSwipeToNext=!0},b.unlockSwipeToPrev=function(){b.params.allowSwipeToPrev=!0},b.unlockSwipes=function(){b.params.allowSwipeToNext=b.params.allowSwipeToPrev=!0},b.params.grabCursor&&(b.container[0].style.cursor="move",b.container[0].style.cursor="-webkit-grab",b.container[0].style.cursor="-moz-grab",b.container[0].style.cursor="grab"),b.imagesToLoad=[],b.imagesLoaded=0,b.loadImage=function(e,a,t,r,i){function s(){i&&i()}var n;e.complete&&r?s():a?(n=new window.Image,n.onload=s,n.onerror=s,t&&(n.srcset=t),a&&(n.src=a)):s()},b.preloadImages=function(){function e(){"undefined"!=typeof b&&null!==b&&(void 0!==b.imagesLoaded&&b.imagesLoaded++,b.imagesLoaded===b.imagesToLoad.length&&(b.params.updateOnImagesReady&&b.update(),b.emit("onImagesReady",b)))}b.imagesToLoad=b.container.find("img");for(var a=0;a<b.imagesToLoad.length;a++)b.loadImage(b.imagesToLoad[a],b.imagesToLoad[a].currentSrc||b.imagesToLoad[a].getAttribute("src"),b.imagesToLoad[a].srcset||b.imagesToLoad[a].getAttribute("srcset"),!0,e)},b.autoplayTimeoutId=void 0,b.autoplaying=!1,b.autoplayPaused=!1,b.startAutoplay=function(){return"undefined"!=typeof b.autoplayTimeoutId?!1:b.params.autoplay?b.autoplaying?!1:(b.autoplaying=!0,b.emit("onAutoplayStart",b),void n()):!1},b.stopAutoplay=function(e){b.autoplayTimeoutId&&(b.autoplayTimeoutId&&clearTimeout(b.autoplayTimeoutId),b.autoplaying=!1,b.autoplayTimeoutId=void 0,b.emit("onAutoplayStop",b))},b.pauseAutoplay=function(e){b.autoplayPaused||(b.autoplayTimeoutId&&clearTimeout(b.autoplayTimeoutId),b.autoplayPaused=!0,0===e?(b.autoplayPaused=!1,n()):b.wrapper.transitionEnd(function(){b&&(b.autoplayPaused=!1,b.autoplaying?n():b.stopAutoplay())}))},b.minTranslate=function(){return-b.snapGrid[0]},b.maxTranslate=function(){return-b.snapGrid[b.snapGrid.length-1]},b.updateAutoHeight=function(){var e=b.slides.eq(b.activeIndex)[0];if("undefined"!=typeof e){var a=e.offsetHeight;a&&b.wrapper.css("height",a+"px")}},b.updateContainerSize=function(){var e,a;e="undefined"!=typeof b.params.width?b.params.width:b.container[0].clientWidth,a="undefined"!=typeof b.params.height?b.params.height:b.container[0].clientHeight,0===e&&b.isHorizontal()||0===a&&!b.isHorizontal()||(e=e-parseInt(b.container.css("padding-left"),10)-parseInt(b.container.css("padding-right"),10),a=a-parseInt(b.container.css("padding-top"),10)-parseInt(b.container.css("padding-bottom"),10),b.width=e,b.height=a,b.size=b.isHorizontal()?b.width:b.height)},b.updateSlidesSize=function(){b.slides=b.wrapper.children("."+b.params.slideClass),b.snapGrid=[],b.slidesGrid=[],b.slidesSizesGrid=[];var e,a=b.params.spaceBetween,t=-b.params.slidesOffsetBefore,r=0,i=0;if("undefined"!=typeof b.size){"string"==typeof a&&a.indexOf("%")>=0&&(a=parseFloat(a.replace("%",""))/100*b.size),b.virtualSize=-a,b.rtl?b.slides.css({marginLeft:"",marginTop:""}):b.slides.css({marginRight:"",marginBottom:""});var n;b.params.slidesPerColumn>1&&(n=Math.floor(b.slides.length/b.params.slidesPerColumn)===b.slides.length/b.params.slidesPerColumn?b.slides.length:Math.ceil(b.slides.length/b.params.slidesPerColumn)*b.params.slidesPerColumn,"auto"!==b.params.slidesPerView&&"row"===b.params.slidesPerColumnFill&&(n=Math.max(n,b.params.slidesPerView*b.params.slidesPerColumn)));var o,l=b.params.slidesPerColumn,p=n/l,d=p-(b.params.slidesPerColumn*p-b.slides.length);for(e=0;e<b.slides.length;e++){o=0;var u=b.slides.eq(e);if(b.params.slidesPerColumn>1){var c,m,h;"column"===b.params.slidesPerColumnFill?(m=Math.floor(e/l),h=e-m*l,(m>d||m===d&&h===l-1)&&++h>=l&&(h=0,m++),c=m+h*n/l,u.css({"-webkit-box-ordinal-group":c,"-moz-box-ordinal-group":c,"-ms-flex-order":c,"-webkit-order":c,order:c})):(h=Math.floor(e/p),m=e-h*p),u.css({"margin-top":0!==h&&b.params.spaceBetween&&b.params.spaceBetween+"px"}).attr("data-swiper-column",m).attr("data-swiper-row",h)}"none"!==u.css("display")&&("auto"===b.params.slidesPerView?(o=b.isHorizontal()?u.outerWidth(!0):u.outerHeight(!0),b.params.roundLengths&&(o=s(o))):(o=(b.size-(b.params.slidesPerView-1)*a)/b.params.slidesPerView,b.params.roundLengths&&(o=s(o)),b.isHorizontal()?b.slides[e].style.width=o+"px":b.slides[e].style.height=o+"px"),b.slides[e].swiperSlideSize=o,b.slidesSizesGrid.push(o),b.params.centeredSlides?(t=t+o/2+r/2+a,0===e&&(t=t-b.size/2-a),Math.abs(t)<.001&&(t=0),i%b.params.slidesPerGroup===0&&b.snapGrid.push(t),b.slidesGrid.push(t)):(i%b.params.slidesPerGroup===0&&b.snapGrid.push(t),b.slidesGrid.push(t),t=t+o+a),b.virtualSize+=o+a,r=o,i++)}b.virtualSize=Math.max(b.virtualSize,b.size)+b.params.slidesOffsetAfter;var f;if(b.rtl&&b.wrongRTL&&("slide"===b.params.effect||"coverflow"===b.params.effect)&&b.wrapper.css({width:b.virtualSize+b.params.spaceBetween+"px"}),(!b.support.flexbox||b.params.setWrapperSize)&&(b.isHorizontal()?b.wrapper.css({width:b.virtualSize+b.params.spaceBetween+"px"}):b.wrapper.css({height:b.virtualSize+b.params.spaceBetween+"px"})),b.params.slidesPerColumn>1&&(b.virtualSize=(o+b.params.spaceBetween)*n,b.virtualSize=Math.ceil(b.virtualSize/b.params.slidesPerColumn)-b.params.spaceBetween,b.wrapper.css({width:b.virtualSize+b.params.spaceBetween+"px"}),b.params.centeredSlides)){for(f=[],e=0;e<b.snapGrid.length;e++)b.snapGrid[e]<b.virtualSize+b.snapGrid[0]&&f.push(b.snapGrid[e]);b.snapGrid=f}if(!b.params.centeredSlides){for(f=[],e=0;e<b.snapGrid.length;e++)b.snapGrid[e]<=b.virtualSize-b.size&&f.push(b.snapGrid[e]);b.snapGrid=f,Math.floor(b.virtualSize-b.size)-Math.floor(b.snapGrid[b.snapGrid.length-1])>1&&b.snapGrid.push(b.virtualSize-b.size)}0===b.snapGrid.length&&(b.snapGrid=[0]),0!==b.params.spaceBetween&&(b.isHorizontal()?b.rtl?b.slides.css({marginLeft:a+"px"}):b.slides.css({marginRight:a+"px"}):b.slides.css({marginBottom:a+"px"})),b.params.watchSlidesProgress&&b.updateSlidesOffset()}},b.updateSlidesOffset=function(){for(var e=0;e<b.slides.length;e++)b.slides[e].swiperSlideOffset=b.isHorizontal()?b.slides[e].offsetLeft:b.slides[e].offsetTop},b.updateSlidesProgress=function(e){if("undefined"==typeof e&&(e=b.translate||0),0!==b.slides.length){"undefined"==typeof b.slides[0].swiperSlideOffset&&b.updateSlidesOffset();var a=-e;b.rtl&&(a=e),b.slides.removeClass(b.params.slideVisibleClass);for(var t=0;t<b.slides.length;t++){var r=b.slides[t],i=(a-r.swiperSlideOffset)/(r.swiperSlideSize+b.params.spaceBetween);if(b.params.watchSlidesVisibility){var s=-(a-r.swiperSlideOffset),n=s+b.slidesSizesGrid[t],o=s>=0&&s<b.size||n>0&&n<=b.size||0>=s&&n>=b.size;o&&b.slides.eq(t).addClass(b.params.slideVisibleClass)}r.progress=b.rtl?-i:i}}},b.updateProgress=function(e){"undefined"==typeof e&&(e=b.translate||0);var a=b.maxTranslate()-b.minTranslate(),t=b.isBeginning,r=b.isEnd;0===a?(b.progress=0,b.isBeginning=b.isEnd=!0):(b.progress=(e-b.minTranslate())/a,b.isBeginning=b.progress<=0,b.isEnd=b.progress>=1),b.isBeginning&&!t&&b.emit("onReachBeginning",b),b.isEnd&&!r&&b.emit("onReachEnd",b),b.params.watchSlidesProgress&&b.updateSlidesProgress(e),b.emit("onProgress",b,b.progress)},b.updateActiveIndex=function(){var e,a,t,r=b.rtl?b.translate:-b.translate;for(a=0;a<b.slidesGrid.length;a++)"undefined"!=typeof b.slidesGrid[a+1]?r>=b.slidesGrid[a]&&r<b.slidesGrid[a+1]-(b.slidesGrid[a+1]-b.slidesGrid[a])/2?e=a:r>=b.slidesGrid[a]&&r<b.slidesGrid[a+1]&&(e=a+1):r>=b.slidesGrid[a]&&(e=a);(0>e||"undefined"==typeof e)&&(e=0),t=Math.floor(e/b.params.slidesPerGroup),t>=b.snapGrid.length&&(t=b.snapGrid.length-1),e!==b.activeIndex&&(b.snapIndex=t,b.previousIndex=b.activeIndex,b.activeIndex=e,b.updateClasses())},b.updateClasses=function(){b.slides.removeClass(b.params.slideActiveClass+" "+b.params.slideNextClass+" "+b.params.slidePrevClass);var e=b.slides.eq(b.activeIndex);e.addClass(b.params.slideActiveClass);var t=e.next("."+b.params.slideClass).addClass(b.params.slideNextClass);b.params.loop&&0===t.length&&b.slides.eq(0).addClass(b.params.slideNextClass);var r=e.prev("."+b.params.slideClass).addClass(b.params.slidePrevClass);if(b.params.loop&&0===r.length&&b.slides.eq(-1).addClass(b.params.slidePrevClass),b.paginationContainer&&b.paginationContainer.length>0){var i,s=b.params.loop?Math.ceil((b.slides.length-2*b.loopedSlides)/b.params.slidesPerGroup):b.snapGrid.length;if(b.params.loop?(i=Math.ceil((b.activeIndex-b.loopedSlides)/b.params.slidesPerGroup),i>b.slides.length-1-2*b.loopedSlides&&(i-=b.slides.length-2*b.loopedSlides),i>s-1&&(i-=s),0>i&&"bullets"!==b.params.paginationType&&(i=s+i)):i="undefined"!=typeof b.snapIndex?b.snapIndex:b.activeIndex||0,"bullets"===b.params.paginationType&&b.bullets&&b.bullets.length>0&&(b.bullets.removeClass(b.params.bulletActiveClass),b.paginationContainer.length>1?b.bullets.each(function(){a(this).index()===i&&a(this).addClass(b.params.bulletActiveClass)}):b.bullets.eq(i).addClass(b.params.bulletActiveClass)),"fraction"===b.params.paginationType&&(b.paginationContainer.find("."+b.params.paginationCurrentClass).text(i+1),b.paginationContainer.find("."+b.params.paginationTotalClass).text(s)),"progress"===b.params.paginationType){var n=(i+1)/s,o=n,l=1;b.isHorizontal()||(l=n,o=1),b.paginationContainer.find("."+b.params.paginationProgressbarClass).transform("translate3d(0,0,0) scaleX("+o+") scaleY("+l+")").transition(b.params.speed)}"custom"===b.params.paginationType&&b.params.paginationCustomRender&&(b.paginationContainer.html(b.params.paginationCustomRender(b,i+1,s)),b.emit("onPaginationRendered",b,b.paginationContainer[0]))}b.params.loop||(b.params.prevButton&&b.prevButton&&b.prevButton.length>0&&(b.isBeginning?(b.prevButton.addClass(b.params.buttonDisabledClass),b.params.a11y&&b.a11y&&b.a11y.disable(b.prevButton)):(b.prevButton.removeClass(b.params.buttonDisabledClass),b.params.a11y&&b.a11y&&b.a11y.enable(b.prevButton))),b.params.nextButton&&b.nextButton&&b.nextButton.length>0&&(b.isEnd?(b.nextButton.addClass(b.params.buttonDisabledClass),b.params.a11y&&b.a11y&&b.a11y.disable(b.nextButton)):(b.nextButton.removeClass(b.params.buttonDisabledClass),b.params.a11y&&b.a11y&&b.a11y.enable(b.nextButton))))},b.updatePagination=function(){if(b.params.pagination&&b.paginationContainer&&b.paginationContainer.length>0){var e="";if("bullets"===b.params.paginationType){for(var a=b.params.loop?Math.ceil((b.slides.length-2*b.loopedSlides)/b.params.slidesPerGroup):b.snapGrid.length,t=0;a>t;t++)e+=b.params.paginationBulletRender?b.params.paginationBulletRender(t,b.params.bulletClass):"<"+b.params.paginationElement+' class="'+b.params.bulletClass+'"></'+b.params.paginationElement+">";b.paginationContainer.html(e),b.bullets=b.paginationContainer.find("."+b.params.bulletClass),b.params.paginationClickable&&b.params.a11y&&b.a11y&&b.a11y.initPagination()}"fraction"===b.params.paginationType&&(e=b.params.paginationFractionRender?b.params.paginationFractionRender(b,b.params.paginationCurrentClass,b.params.paginationTotalClass):'<span class="'+b.params.paginationCurrentClass+'"></span> / <span class="'+b.params.paginationTotalClass+'"></span>',b.paginationContainer.html(e)),"progress"===b.params.paginationType&&(e=b.params.paginationProgressRender?b.params.paginationProgressRender(b,b.params.paginationProgressbarClass):'<span class="'+b.params.paginationProgressbarClass+'"></span>',b.paginationContainer.html(e)),"custom"!==b.params.paginationType&&b.emit("onPaginationRendered",b,b.paginationContainer[0])}},b.update=function(e){function a(){r=Math.min(Math.max(b.translate,b.maxTranslate()),b.minTranslate()),b.setWrapperTranslate(r),b.updateActiveIndex(),b.updateClasses()}if(b.updateContainerSize(),b.updateSlidesSize(),b.updateProgress(),b.updatePagination(),b.updateClasses(),b.params.scrollbar&&b.scrollbar&&b.scrollbar.set(),e){var t,r;b.controller&&b.controller.spline&&(b.controller.spline=void 0),b.params.freeMode?(a(),b.params.autoHeight&&b.updateAutoHeight()):(t=("auto"===b.params.slidesPerView||b.params.slidesPerView>1)&&b.isEnd&&!b.params.centeredSlides?b.slideTo(b.slides.length-1,0,!1,!0):b.slideTo(b.activeIndex,0,!1,!0),t||a())}else b.params.autoHeight&&b.updateAutoHeight()},b.onResize=function(e){b.params.breakpoints&&b.setBreakpoint();var a=b.params.allowSwipeToPrev,t=b.params.allowSwipeToNext;b.params.allowSwipeToPrev=b.params.allowSwipeToNext=!0,b.updateContainerSize(),b.updateSlidesSize(),("auto"===b.params.slidesPerView||b.params.freeMode||e)&&b.updatePagination(),b.params.scrollbar&&b.scrollbar&&b.scrollbar.set(),b.controller&&b.controller.spline&&(b.controller.spline=void 0);var r=!1;if(b.params.freeMode){var i=Math.min(Math.max(b.translate,b.maxTranslate()),b.minTranslate());b.setWrapperTranslate(i),b.updateActiveIndex(),b.updateClasses(),b.params.autoHeight&&b.updateAutoHeight()}else b.updateClasses(),r=("auto"===b.params.slidesPerView||b.params.slidesPerView>1)&&b.isEnd&&!b.params.centeredSlides?b.slideTo(b.slides.length-1,0,!1,!0):b.slideTo(b.activeIndex,0,!1,!0);b.params.lazyLoading&&!r&&b.lazy&&b.lazy.load(),b.params.allowSwipeToPrev=a,b.params.allowSwipeToNext=t};var T=["mousedown","mousemove","mouseup"];window.navigator.pointerEnabled?T=["pointerdown","pointermove","pointerup"]:window.navigator.msPointerEnabled&&(T=["MSPointerDown","MSPointerMove","MSPointerUp"]),b.touchEvents={start:b.support.touch||!b.params.simulateTouch?"touchstart":T[0],move:b.support.touch||!b.params.simulateTouch?"touchmove":T[1],end:b.support.touch||!b.params.simulateTouch?"touchend":T[2]},(window.navigator.pointerEnabled||window.navigator.msPointerEnabled)&&("container"===b.params.touchEventsTarget?b.container:b.wrapper).addClass("swiper-wp8-"+b.params.direction),b.initEvents=function(e){var a=e?"off":"on",t=e?"removeEventListener":"addEventListener",r="container"===b.params.touchEventsTarget?b.container[0]:b.wrapper[0],s=b.support.touch?r:document,n=b.params.nested?!0:!1;b.browser.ie?(r[t](b.touchEvents.start,b.onTouchStart,!1),s[t](b.touchEvents.move,b.onTouchMove,n),s[t](b.touchEvents.end,b.onTouchEnd,!1)):(b.support.touch&&(r[t](b.touchEvents.start,b.onTouchStart,!1),r[t](b.touchEvents.move,b.onTouchMove,n),r[t](b.touchEvents.end,b.onTouchEnd,!1)),!i.simulateTouch||b.device.ios||b.device.android||(r[t]("mousedown",b.onTouchStart,!1),document[t]("mousemove",b.onTouchMove,n),document[t]("mouseup",b.onTouchEnd,!1))),window[t]("resize",b.onResize),b.params.nextButton&&b.nextButton&&b.nextButton.length>0&&(b.nextButton[a]("click",b.onClickNext),b.params.a11y&&b.a11y&&b.nextButton[a]("keydown",b.a11y.onEnterKey)),b.params.prevButton&&b.prevButton&&b.prevButton.length>0&&(b.prevButton[a]("click",b.onClickPrev),b.params.a11y&&b.a11y&&b.prevButton[a]("keydown",b.a11y.onEnterKey)),b.params.pagination&&b.params.paginationClickable&&(b.paginationContainer[a]("click","."+b.params.bulletClass,b.onClickIndex),b.params.a11y&&b.a11y&&b.paginationContainer[a]("keydown","."+b.params.bulletClass,b.a11y.onEnterKey)),(b.params.preventClicks||b.params.preventClicksPropagation)&&r[t]("click",b.preventClicks,!0)},b.attachEvents=function(){b.initEvents()},b.detachEvents=function(){b.initEvents(!0)},b.allowClick=!0,b.preventClicks=function(e){b.allowClick||(b.params.preventClicks&&e.preventDefault(),b.params.preventClicksPropagation&&b.animating&&(e.stopPropagation(),e.stopImmediatePropagation()))},b.onClickNext=function(e){e.preventDefault(),(!b.isEnd||b.params.loop)&&b.slideNext()},b.onClickPrev=function(e){e.preventDefault(),(!b.isBeginning||b.params.loop)&&b.slidePrev()},b.onClickIndex=function(e){e.preventDefault();var t=a(this).index()*b.params.slidesPerGroup;b.params.loop&&(t+=b.loopedSlides),b.slideTo(t)},b.updateClickedSlide=function(e){var t=o(e,"."+b.params.slideClass),r=!1;if(t)for(var i=0;i<b.slides.length;i++)b.slides[i]===t&&(r=!0);if(!t||!r)return b.clickedSlide=void 0,void(b.clickedIndex=void 0);if(b.clickedSlide=t,b.clickedIndex=a(t).index(),b.params.slideToClickedSlide&&void 0!==b.clickedIndex&&b.clickedIndex!==b.activeIndex){var s,n=b.clickedIndex;if(b.params.loop){if(b.animating)return;s=a(b.clickedSlide).attr("data-swiper-slide-index"),b.params.centeredSlides?n<b.loopedSlides-b.params.slidesPerView/2||n>b.slides.length-b.loopedSlides+b.params.slidesPerView/2?(b.fixLoop(),n=b.wrapper.children("."+b.params.slideClass+'[data-swiper-slide-index="'+s+'"]:not(.swiper-slide-duplicate)').eq(0).index(),setTimeout(function(){b.slideTo(n)},0)):b.slideTo(n):n>b.slides.length-b.params.slidesPerView?(b.fixLoop(),n=b.wrapper.children("."+b.params.slideClass+'[data-swiper-slide-index="'+s+'"]:not(.swiper-slide-duplicate)').eq(0).index(),setTimeout(function(){b.slideTo(n)},0)):b.slideTo(n)}else b.slideTo(n)}};var S,C,z,M,E,P,k,I,L,B,D="input, select, textarea, button",H=Date.now(),A=[];b.animating=!1,b.touches={startX:0,startY:0,currentX:0,currentY:0,diff:0};var G,O;if(b.onTouchStart=function(e){if(e.originalEvent&&(e=e.originalEvent),G="touchstart"===e.type,G||!("which"in e)||3!==e.which){if(b.params.noSwiping&&o(e,"."+b.params.noSwipingClass))return void(b.allowClick=!0);if(!b.params.swipeHandler||o(e,b.params.swipeHandler)){var t=b.touches.currentX="touchstart"===e.type?e.targetTouches[0].pageX:e.pageX,r=b.touches.currentY="touchstart"===e.type?e.targetTouches[0].pageY:e.pageY;if(!(b.device.ios&&b.params.iOSEdgeSwipeDetection&&t<=b.params.iOSEdgeSwipeThreshold)){if(S=!0,C=!1,z=!0,E=void 0,O=void 0,b.touches.startX=t,b.touches.startY=r,M=Date.now(),b.allowClick=!0,b.updateContainerSize(),b.swipeDirection=void 0,b.params.threshold>0&&(I=!1),"touchstart"!==e.type){var i=!0;a(e.target).is(D)&&(i=!1),document.activeElement&&a(document.activeElement).is(D)&&document.activeElement.blur(),i&&e.preventDefault()}b.emit("onTouchStart",b,e)}}}},b.onTouchMove=function(e){if(e.originalEvent&&(e=e.originalEvent),!G||"mousemove"!==e.type){if(e.preventedByNestedSwiper)return b.touches.startX="touchmove"===e.type?e.targetTouches[0].pageX:e.pageX,void(b.touches.startY="touchmove"===e.type?e.targetTouches[0].pageY:e.pageY);if(b.params.onlyExternal)return b.allowClick=!1,void(S&&(b.touches.startX=b.touches.currentX="touchmove"===e.type?e.targetTouches[0].pageX:e.pageX,b.touches.startY=b.touches.currentY="touchmove"===e.type?e.targetTouches[0].pageY:e.pageY,M=Date.now()));if(G&&document.activeElement&&e.target===document.activeElement&&a(e.target).is(D))return C=!0,void(b.allowClick=!1);if(z&&b.emit("onTouchMove",b,e),!(e.targetTouches&&e.targetTouches.length>1)){if(b.touches.currentX="touchmove"===e.type?e.targetTouches[0].pageX:e.pageX,b.touches.currentY="touchmove"===e.type?e.targetTouches[0].pageY:e.pageY,"undefined"==typeof E){var t=180*Math.atan2(Math.abs(b.touches.currentY-b.touches.startY),Math.abs(b.touches.currentX-b.touches.startX))/Math.PI;E=b.isHorizontal()?t>b.params.touchAngle:90-t>b.params.touchAngle}if(E&&b.emit("onTouchMoveOpposite",b,e),"undefined"==typeof O&&b.browser.ieTouch&&(b.touches.currentX!==b.touches.startX||b.touches.currentY!==b.touches.startY)&&(O=!0),S){if(E)return void(S=!1);if(O||!b.browser.ieTouch){b.allowClick=!1,b.emit("onSliderMove",b,e),e.preventDefault(),b.params.touchMoveStopPropagation&&!b.params.nested&&e.stopPropagation(),C||(i.loop&&b.fixLoop(),k=b.getWrapperTranslate(),b.setWrapperTransition(0),b.animating&&b.wrapper.trigger("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"),b.params.autoplay&&b.autoplaying&&(b.params.autoplayDisableOnInteraction?b.stopAutoplay():b.pauseAutoplay()),B=!1,b.params.grabCursor&&(b.container[0].style.cursor="move",b.container[0].style.cursor="-webkit-grabbing",b.container[0].style.cursor="-moz-grabbin",b.container[0].style.cursor="grabbing")),C=!0;var r=b.touches.diff=b.isHorizontal()?b.touches.currentX-b.touches.startX:b.touches.currentY-b.touches.startY;r*=b.params.touchRatio,b.rtl&&(r=-r),b.swipeDirection=r>0?"prev":"next",P=r+k;var s=!0;if(r>0&&P>b.minTranslate()?(s=!1,b.params.resistance&&(P=b.minTranslate()-1+Math.pow(-b.minTranslate()+k+r,b.params.resistanceRatio))):0>r&&P<b.maxTranslate()&&(s=!1,b.params.resistance&&(P=b.maxTranslate()+1-Math.pow(b.maxTranslate()-k-r,b.params.resistanceRatio))),
	s&&(e.preventedByNestedSwiper=!0),!b.params.allowSwipeToNext&&"next"===b.swipeDirection&&k>P&&(P=k),!b.params.allowSwipeToPrev&&"prev"===b.swipeDirection&&P>k&&(P=k),b.params.followFinger){if(b.params.threshold>0){if(!(Math.abs(r)>b.params.threshold||I))return void(P=k);if(!I)return I=!0,b.touches.startX=b.touches.currentX,b.touches.startY=b.touches.currentY,P=k,void(b.touches.diff=b.isHorizontal()?b.touches.currentX-b.touches.startX:b.touches.currentY-b.touches.startY)}(b.params.freeMode||b.params.watchSlidesProgress)&&b.updateActiveIndex(),b.params.freeMode&&(0===A.length&&A.push({position:b.touches[b.isHorizontal()?"startX":"startY"],time:M}),A.push({position:b.touches[b.isHorizontal()?"currentX":"currentY"],time:(new window.Date).getTime()})),b.updateProgress(P),b.setWrapperTranslate(P)}}}}}},b.onTouchEnd=function(e){if(e.originalEvent&&(e=e.originalEvent),z&&b.emit("onTouchEnd",b,e),z=!1,S){b.params.grabCursor&&C&&S&&(b.container[0].style.cursor="move",b.container[0].style.cursor="-webkit-grab",b.container[0].style.cursor="-moz-grab",b.container[0].style.cursor="grab");var t=Date.now(),r=t-M;if(b.allowClick&&(b.updateClickedSlide(e),b.emit("onTap",b,e),300>r&&t-H>300&&(L&&clearTimeout(L),L=setTimeout(function(){b&&(b.params.paginationHide&&b.paginationContainer.length>0&&!a(e.target).hasClass(b.params.bulletClass)&&b.paginationContainer.toggleClass(b.params.paginationHiddenClass),b.emit("onClick",b,e))},300)),300>r&&300>t-H&&(L&&clearTimeout(L),b.emit("onDoubleTap",b,e))),H=Date.now(),setTimeout(function(){b&&(b.allowClick=!0)},0),!S||!C||!b.swipeDirection||0===b.touches.diff||P===k)return void(S=C=!1);S=C=!1;var i;if(i=b.params.followFinger?b.rtl?b.translate:-b.translate:-P,b.params.freeMode){if(i<-b.minTranslate())return void b.slideTo(b.activeIndex);if(i>-b.maxTranslate())return void(b.slides.length<b.snapGrid.length?b.slideTo(b.snapGrid.length-1):b.slideTo(b.slides.length-1));if(b.params.freeModeMomentum){if(A.length>1){var s=A.pop(),n=A.pop(),o=s.position-n.position,l=s.time-n.time;b.velocity=o/l,b.velocity=b.velocity/2,Math.abs(b.velocity)<b.params.freeModeMinimumVelocity&&(b.velocity=0),(l>150||(new window.Date).getTime()-s.time>300)&&(b.velocity=0)}else b.velocity=0;A.length=0;var p=1e3*b.params.freeModeMomentumRatio,d=b.velocity*p,u=b.translate+d;b.rtl&&(u=-u);var c,m=!1,h=20*Math.abs(b.velocity)*b.params.freeModeMomentumBounceRatio;if(u<b.maxTranslate())b.params.freeModeMomentumBounce?(u+b.maxTranslate()<-h&&(u=b.maxTranslate()-h),c=b.maxTranslate(),m=!0,B=!0):u=b.maxTranslate();else if(u>b.minTranslate())b.params.freeModeMomentumBounce?(u-b.minTranslate()>h&&(u=b.minTranslate()+h),c=b.minTranslate(),m=!0,B=!0):u=b.minTranslate();else if(b.params.freeModeSticky){var f,g=0;for(g=0;g<b.snapGrid.length;g+=1)if(b.snapGrid[g]>-u){f=g;break}u=Math.abs(b.snapGrid[f]-u)<Math.abs(b.snapGrid[f-1]-u)||"next"===b.swipeDirection?b.snapGrid[f]:b.snapGrid[f-1],b.rtl||(u=-u)}if(0!==b.velocity)p=b.rtl?Math.abs((-u-b.translate)/b.velocity):Math.abs((u-b.translate)/b.velocity);else if(b.params.freeModeSticky)return void b.slideReset();b.params.freeModeMomentumBounce&&m?(b.updateProgress(c),b.setWrapperTransition(p),b.setWrapperTranslate(u),b.onTransitionStart(),b.animating=!0,b.wrapper.transitionEnd(function(){b&&B&&(b.emit("onMomentumBounce",b),b.setWrapperTransition(b.params.speed),b.setWrapperTranslate(c),b.wrapper.transitionEnd(function(){b&&b.onTransitionEnd()}))})):b.velocity?(b.updateProgress(u),b.setWrapperTransition(p),b.setWrapperTranslate(u),b.onTransitionStart(),b.animating||(b.animating=!0,b.wrapper.transitionEnd(function(){b&&b.onTransitionEnd()}))):b.updateProgress(u),b.updateActiveIndex()}return void((!b.params.freeModeMomentum||r>=b.params.longSwipesMs)&&(b.updateProgress(),b.updateActiveIndex()))}var v,w=0,y=b.slidesSizesGrid[0];for(v=0;v<b.slidesGrid.length;v+=b.params.slidesPerGroup)"undefined"!=typeof b.slidesGrid[v+b.params.slidesPerGroup]?i>=b.slidesGrid[v]&&i<b.slidesGrid[v+b.params.slidesPerGroup]&&(w=v,y=b.slidesGrid[v+b.params.slidesPerGroup]-b.slidesGrid[v]):i>=b.slidesGrid[v]&&(w=v,y=b.slidesGrid[b.slidesGrid.length-1]-b.slidesGrid[b.slidesGrid.length-2]);var x=(i-b.slidesGrid[w])/y;if(r>b.params.longSwipesMs){if(!b.params.longSwipes)return void b.slideTo(b.activeIndex);"next"===b.swipeDirection&&(x>=b.params.longSwipesRatio?b.slideTo(w+b.params.slidesPerGroup):b.slideTo(w)),"prev"===b.swipeDirection&&(x>1-b.params.longSwipesRatio?b.slideTo(w+b.params.slidesPerGroup):b.slideTo(w))}else{if(!b.params.shortSwipes)return void b.slideTo(b.activeIndex);"next"===b.swipeDirection&&b.slideTo(w+b.params.slidesPerGroup),"prev"===b.swipeDirection&&b.slideTo(w)}}},b._slideTo=function(e,a){return b.slideTo(e,a,!0,!0)},b.slideTo=function(e,a,t,r){"undefined"==typeof t&&(t=!0),"undefined"==typeof e&&(e=0),0>e&&(e=0),b.snapIndex=Math.floor(e/b.params.slidesPerGroup),b.snapIndex>=b.snapGrid.length&&(b.snapIndex=b.snapGrid.length-1);var i=-b.snapGrid[b.snapIndex];b.params.autoplay&&b.autoplaying&&(r||!b.params.autoplayDisableOnInteraction?b.pauseAutoplay(a):b.stopAutoplay()),b.updateProgress(i);for(var s=0;s<b.slidesGrid.length;s++)-Math.floor(100*i)>=Math.floor(100*b.slidesGrid[s])&&(e=s);return!b.params.allowSwipeToNext&&i<b.translate&&i<b.minTranslate()?!1:!b.params.allowSwipeToPrev&&i>b.translate&&i>b.maxTranslate()&&(b.activeIndex||0)!==e?!1:("undefined"==typeof a&&(a=b.params.speed),b.previousIndex=b.activeIndex||0,b.activeIndex=e,b.rtl&&-i===b.translate||!b.rtl&&i===b.translate?(b.params.autoHeight&&b.updateAutoHeight(),b.updateClasses(),"slide"!==b.params.effect&&b.setWrapperTranslate(i),!1):(b.updateClasses(),b.onTransitionStart(t),0===a?(b.setWrapperTranslate(i),b.setWrapperTransition(0),b.onTransitionEnd(t)):(b.setWrapperTranslate(i),b.setWrapperTransition(a),b.animating||(b.animating=!0,b.wrapper.transitionEnd(function(){b&&b.onTransitionEnd(t)}))),!0))},b.onTransitionStart=function(e){"undefined"==typeof e&&(e=!0),b.params.autoHeight&&b.updateAutoHeight(),b.lazy&&b.lazy.onTransitionStart(),e&&(b.emit("onTransitionStart",b),b.activeIndex!==b.previousIndex&&(b.emit("onSlideChangeStart",b),b.activeIndex>b.previousIndex?b.emit("onSlideNextStart",b):b.emit("onSlidePrevStart",b)))},b.onTransitionEnd=function(e){b.animating=!1,b.setWrapperTransition(0),"undefined"==typeof e&&(e=!0),b.lazy&&b.lazy.onTransitionEnd(),e&&(b.emit("onTransitionEnd",b),b.activeIndex!==b.previousIndex&&(b.emit("onSlideChangeEnd",b),b.activeIndex>b.previousIndex?b.emit("onSlideNextEnd",b):b.emit("onSlidePrevEnd",b))),b.params.hashnav&&b.hashnav&&b.hashnav.setHash()},b.slideNext=function(e,a,t){if(b.params.loop){if(b.animating)return!1;b.fixLoop();b.container[0].clientLeft;return b.slideTo(b.activeIndex+b.params.slidesPerGroup,a,e,t)}return b.slideTo(b.activeIndex+b.params.slidesPerGroup,a,e,t)},b._slideNext=function(e){return b.slideNext(!0,e,!0)},b.slidePrev=function(e,a,t){if(b.params.loop){if(b.animating)return!1;b.fixLoop();b.container[0].clientLeft;return b.slideTo(b.activeIndex-1,a,e,t)}return b.slideTo(b.activeIndex-1,a,e,t)},b._slidePrev=function(e){return b.slidePrev(!0,e,!0)},b.slideReset=function(e,a,t){return b.slideTo(b.activeIndex,a,e)},b.setWrapperTransition=function(e,a){b.wrapper.transition(e),"slide"!==b.params.effect&&b.effects[b.params.effect]&&b.effects[b.params.effect].setTransition(e),b.params.parallax&&b.parallax&&b.parallax.setTransition(e),b.params.scrollbar&&b.scrollbar&&b.scrollbar.setTransition(e),b.params.control&&b.controller&&b.controller.setTransition(e,a),b.emit("onSetTransition",b,e)},b.setWrapperTranslate=function(e,a,t){var r=0,i=0,n=0;b.isHorizontal()?r=b.rtl?-e:e:i=e,b.params.roundLengths&&(r=s(r),i=s(i)),b.params.virtualTranslate||(b.support.transforms3d?b.wrapper.transform("translate3d("+r+"px, "+i+"px, "+n+"px)"):b.wrapper.transform("translate("+r+"px, "+i+"px)")),b.translate=b.isHorizontal()?r:i;var o,l=b.maxTranslate()-b.minTranslate();o=0===l?0:(e-b.minTranslate())/l,o!==b.progress&&b.updateProgress(e),a&&b.updateActiveIndex(),"slide"!==b.params.effect&&b.effects[b.params.effect]&&b.effects[b.params.effect].setTranslate(b.translate),b.params.parallax&&b.parallax&&b.parallax.setTranslate(b.translate),b.params.scrollbar&&b.scrollbar&&b.scrollbar.setTranslate(b.translate),b.params.control&&b.controller&&b.controller.setTranslate(b.translate,t),b.emit("onSetTranslate",b,b.translate)},b.getTranslate=function(e,a){var t,r,i,s;return"undefined"==typeof a&&(a="x"),b.params.virtualTranslate?b.rtl?-b.translate:b.translate:(i=window.getComputedStyle(e,null),window.WebKitCSSMatrix?(r=i.transform||i.webkitTransform,r.split(",").length>6&&(r=r.split(", ").map(function(e){return e.replace(",",".")}).join(", ")),s=new window.WebKitCSSMatrix("none"===r?"":r)):(s=i.MozTransform||i.OTransform||i.MsTransform||i.msTransform||i.transform||i.getPropertyValue("transform").replace("translate(","matrix(1, 0, 0, 1,"),t=s.toString().split(",")),"x"===a&&(r=window.WebKitCSSMatrix?s.m41:16===t.length?parseFloat(t[12]):parseFloat(t[4])),"y"===a&&(r=window.WebKitCSSMatrix?s.m42:16===t.length?parseFloat(t[13]):parseFloat(t[5])),b.rtl&&r&&(r=-r),r||0)},b.getWrapperTranslate=function(e){return"undefined"==typeof e&&(e=b.isHorizontal()?"x":"y"),b.getTranslate(b.wrapper[0],e)},b.observers=[],b.initObservers=function(){if(b.params.observeParents)for(var e=b.container.parents(),a=0;a<e.length;a++)l(e[a]);l(b.container[0],{childList:!1}),l(b.wrapper[0],{attributes:!1})},b.disconnectObservers=function(){for(var e=0;e<b.observers.length;e++)b.observers[e].disconnect();b.observers=[]},b.createLoop=function(){b.wrapper.children("."+b.params.slideClass+"."+b.params.slideDuplicateClass).remove();var e=b.wrapper.children("."+b.params.slideClass);"auto"!==b.params.slidesPerView||b.params.loopedSlides||(b.params.loopedSlides=e.length),b.loopedSlides=parseInt(b.params.loopedSlides||b.params.slidesPerView,10),b.loopedSlides=b.loopedSlides+b.params.loopAdditionalSlides,b.loopedSlides>e.length&&(b.loopedSlides=e.length);var t,r=[],i=[];for(e.each(function(t,s){var n=a(this);t<b.loopedSlides&&i.push(s),t<e.length&&t>=e.length-b.loopedSlides&&r.push(s),n.attr("data-swiper-slide-index",t)}),t=0;t<i.length;t++)b.wrapper.append(a(i[t].cloneNode(!0)).addClass(b.params.slideDuplicateClass));for(t=r.length-1;t>=0;t--)b.wrapper.prepend(a(r[t].cloneNode(!0)).addClass(b.params.slideDuplicateClass))},b.destroyLoop=function(){b.wrapper.children("."+b.params.slideClass+"."+b.params.slideDuplicateClass).remove(),b.slides.removeAttr("data-swiper-slide-index")},b.reLoop=function(e){var a=b.activeIndex-b.loopedSlides;b.destroyLoop(),b.createLoop(),b.updateSlidesSize(),e&&b.slideTo(a+b.loopedSlides,0,!1)},b.fixLoop=function(){var e;b.activeIndex<b.loopedSlides?(e=b.slides.length-3*b.loopedSlides+b.activeIndex,e+=b.loopedSlides,b.slideTo(e,0,!1,!0)):("auto"===b.params.slidesPerView&&b.activeIndex>=2*b.loopedSlides||b.activeIndex>b.slides.length-2*b.params.slidesPerView)&&(e=-b.slides.length+b.activeIndex+b.loopedSlides,e+=b.loopedSlides,b.slideTo(e,0,!1,!0))},b.appendSlide=function(e){if(b.params.loop&&b.destroyLoop(),"object"==typeof e&&e.length)for(var a=0;a<e.length;a++)e[a]&&b.wrapper.append(e[a]);else b.wrapper.append(e);b.params.loop&&b.createLoop(),b.params.observer&&b.support.observer||b.update(!0)},b.prependSlide=function(e){b.params.loop&&b.destroyLoop();var a=b.activeIndex+1;if("object"==typeof e&&e.length){for(var t=0;t<e.length;t++)e[t]&&b.wrapper.prepend(e[t]);a=b.activeIndex+e.length}else b.wrapper.prepend(e);b.params.loop&&b.createLoop(),b.params.observer&&b.support.observer||b.update(!0),b.slideTo(a,0,!1)},b.removeSlide=function(e){b.params.loop&&(b.destroyLoop(),b.slides=b.wrapper.children("."+b.params.slideClass));var a,t=b.activeIndex;if("object"==typeof e&&e.length){for(var r=0;r<e.length;r++)a=e[r],b.slides[a]&&b.slides.eq(a).remove(),t>a&&t--;t=Math.max(t,0)}else a=e,b.slides[a]&&b.slides.eq(a).remove(),t>a&&t--,t=Math.max(t,0);b.params.loop&&b.createLoop(),b.params.observer&&b.support.observer||b.update(!0),b.params.loop?b.slideTo(t+b.loopedSlides,0,!1):b.slideTo(t,0,!1)},b.removeAllSlides=function(){for(var e=[],a=0;a<b.slides.length;a++)e.push(a);b.removeSlide(e)},b.effects={fade:{setTranslate:function(){for(var e=0;e<b.slides.length;e++){var a=b.slides.eq(e),t=a[0].swiperSlideOffset,r=-t;b.params.virtualTranslate||(r-=b.translate);var i=0;b.isHorizontal()||(i=r,r=0);var s=b.params.fade.crossFade?Math.max(1-Math.abs(a[0].progress),0):1+Math.min(Math.max(a[0].progress,-1),0);a.css({opacity:s}).transform("translate3d("+r+"px, "+i+"px, 0px)")}},setTransition:function(e){if(b.slides.transition(e),b.params.virtualTranslate&&0!==e){var a=!1;b.slides.transitionEnd(function(){if(!a&&b){a=!0,b.animating=!1;for(var e=["webkitTransitionEnd","transitionend","oTransitionEnd","MSTransitionEnd","msTransitionEnd"],t=0;t<e.length;t++)b.wrapper.trigger(e[t])}})}}},flip:{setTranslate:function(){for(var e=0;e<b.slides.length;e++){var t=b.slides.eq(e),r=t[0].progress;b.params.flip.limitRotation&&(r=Math.max(Math.min(t[0].progress,1),-1));var i=t[0].swiperSlideOffset,s=-180*r,n=s,o=0,l=-i,p=0;if(b.isHorizontal()?b.rtl&&(n=-n):(p=l,l=0,o=-n,n=0),t[0].style.zIndex=-Math.abs(Math.round(r))+b.slides.length,b.params.flip.slideShadows){var d=b.isHorizontal()?t.find(".swiper-slide-shadow-left"):t.find(".swiper-slide-shadow-top"),u=b.isHorizontal()?t.find(".swiper-slide-shadow-right"):t.find(".swiper-slide-shadow-bottom");0===d.length&&(d=a('<div class="swiper-slide-shadow-'+(b.isHorizontal()?"left":"top")+'"></div>'),t.append(d)),0===u.length&&(u=a('<div class="swiper-slide-shadow-'+(b.isHorizontal()?"right":"bottom")+'"></div>'),t.append(u)),d.length&&(d[0].style.opacity=Math.max(-r,0)),u.length&&(u[0].style.opacity=Math.max(r,0))}t.transform("translate3d("+l+"px, "+p+"px, 0px) rotateX("+o+"deg) rotateY("+n+"deg)")}},setTransition:function(e){if(b.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e),b.params.virtualTranslate&&0!==e){var t=!1;b.slides.eq(b.activeIndex).transitionEnd(function(){if(!t&&b&&a(this).hasClass(b.params.slideActiveClass)){t=!0,b.animating=!1;for(var e=["webkitTransitionEnd","transitionend","oTransitionEnd","MSTransitionEnd","msTransitionEnd"],r=0;r<e.length;r++)b.wrapper.trigger(e[r])}})}}},cube:{setTranslate:function(){var e,t=0;b.params.cube.shadow&&(b.isHorizontal()?(e=b.wrapper.find(".swiper-cube-shadow"),0===e.length&&(e=a('<div class="swiper-cube-shadow"></div>'),b.wrapper.append(e)),e.css({height:b.width+"px"})):(e=b.container.find(".swiper-cube-shadow"),0===e.length&&(e=a('<div class="swiper-cube-shadow"></div>'),b.container.append(e))));for(var r=0;r<b.slides.length;r++){var i=b.slides.eq(r),s=90*r,n=Math.floor(s/360);b.rtl&&(s=-s,n=Math.floor(-s/360));var o=Math.max(Math.min(i[0].progress,1),-1),l=0,p=0,d=0;r%4===0?(l=4*-n*b.size,d=0):(r-1)%4===0?(l=0,d=4*-n*b.size):(r-2)%4===0?(l=b.size+4*n*b.size,d=b.size):(r-3)%4===0&&(l=-b.size,d=3*b.size+4*b.size*n),b.rtl&&(l=-l),b.isHorizontal()||(p=l,l=0);var u="rotateX("+(b.isHorizontal()?0:-s)+"deg) rotateY("+(b.isHorizontal()?s:0)+"deg) translate3d("+l+"px, "+p+"px, "+d+"px)";if(1>=o&&o>-1&&(t=90*r+90*o,b.rtl&&(t=90*-r-90*o)),i.transform(u),b.params.cube.slideShadows){var c=b.isHorizontal()?i.find(".swiper-slide-shadow-left"):i.find(".swiper-slide-shadow-top"),m=b.isHorizontal()?i.find(".swiper-slide-shadow-right"):i.find(".swiper-slide-shadow-bottom");0===c.length&&(c=a('<div class="swiper-slide-shadow-'+(b.isHorizontal()?"left":"top")+'"></div>'),i.append(c)),0===m.length&&(m=a('<div class="swiper-slide-shadow-'+(b.isHorizontal()?"right":"bottom")+'"></div>'),i.append(m)),c.length&&(c[0].style.opacity=Math.max(-o,0)),m.length&&(m[0].style.opacity=Math.max(o,0))}}if(b.wrapper.css({"-webkit-transform-origin":"50% 50% -"+b.size/2+"px","-moz-transform-origin":"50% 50% -"+b.size/2+"px","-ms-transform-origin":"50% 50% -"+b.size/2+"px","transform-origin":"50% 50% -"+b.size/2+"px"}),b.params.cube.shadow)if(b.isHorizontal())e.transform("translate3d(0px, "+(b.width/2+b.params.cube.shadowOffset)+"px, "+-b.width/2+"px) rotateX(90deg) rotateZ(0deg) scale("+b.params.cube.shadowScale+")");else{var h=Math.abs(t)-90*Math.floor(Math.abs(t)/90),f=1.5-(Math.sin(2*h*Math.PI/360)/2+Math.cos(2*h*Math.PI/360)/2),g=b.params.cube.shadowScale,v=b.params.cube.shadowScale/f,w=b.params.cube.shadowOffset;e.transform("scale3d("+g+", 1, "+v+") translate3d(0px, "+(b.height/2+w)+"px, "+-b.height/2/v+"px) rotateX(-90deg)")}var y=b.isSafari||b.isUiWebView?-b.size/2:0;b.wrapper.transform("translate3d(0px,0,"+y+"px) rotateX("+(b.isHorizontal()?0:t)+"deg) rotateY("+(b.isHorizontal()?-t:0)+"deg)")},setTransition:function(e){b.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e),b.params.cube.shadow&&!b.isHorizontal()&&b.container.find(".swiper-cube-shadow").transition(e)}},coverflow:{setTranslate:function(){for(var e=b.translate,t=b.isHorizontal()?-e+b.width/2:-e+b.height/2,r=b.isHorizontal()?b.params.coverflow.rotate:-b.params.coverflow.rotate,i=b.params.coverflow.depth,s=0,n=b.slides.length;n>s;s++){var o=b.slides.eq(s),l=b.slidesSizesGrid[s],p=o[0].swiperSlideOffset,d=(t-p-l/2)/l*b.params.coverflow.modifier,u=b.isHorizontal()?r*d:0,c=b.isHorizontal()?0:r*d,m=-i*Math.abs(d),h=b.isHorizontal()?0:b.params.coverflow.stretch*d,f=b.isHorizontal()?b.params.coverflow.stretch*d:0;Math.abs(f)<.001&&(f=0),Math.abs(h)<.001&&(h=0),Math.abs(m)<.001&&(m=0),Math.abs(u)<.001&&(u=0),Math.abs(c)<.001&&(c=0);var g="translate3d("+f+"px,"+h+"px,"+m+"px)  rotateX("+c+"deg) rotateY("+u+"deg)";if(o.transform(g),o[0].style.zIndex=-Math.abs(Math.round(d))+1,b.params.coverflow.slideShadows){var v=b.isHorizontal()?o.find(".swiper-slide-shadow-left"):o.find(".swiper-slide-shadow-top"),w=b.isHorizontal()?o.find(".swiper-slide-shadow-right"):o.find(".swiper-slide-shadow-bottom");0===v.length&&(v=a('<div class="swiper-slide-shadow-'+(b.isHorizontal()?"left":"top")+'"></div>'),o.append(v)),0===w.length&&(w=a('<div class="swiper-slide-shadow-'+(b.isHorizontal()?"right":"bottom")+'"></div>'),o.append(w)),v.length&&(v[0].style.opacity=d>0?d:0),w.length&&(w[0].style.opacity=-d>0?-d:0)}}if(b.browser.ie){var y=b.wrapper[0].style;y.perspectiveOrigin=t+"px 50%"}},setTransition:function(e){b.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)}}},b.lazy={initialImageLoaded:!1,loadImageInSlide:function(e,t){if("undefined"!=typeof e&&("undefined"==typeof t&&(t=!0),0!==b.slides.length)){var r=b.slides.eq(e),i=r.find(".swiper-lazy:not(.swiper-lazy-loaded):not(.swiper-lazy-loading)");!r.hasClass("swiper-lazy")||r.hasClass("swiper-lazy-loaded")||r.hasClass("swiper-lazy-loading")||(i=i.add(r[0])),0!==i.length&&i.each(function(){var e=a(this);e.addClass("swiper-lazy-loading");var i=e.attr("data-background"),s=e.attr("data-src"),n=e.attr("data-srcset");b.loadImage(e[0],s||i,n,!1,function(){if(i?(e.css("background-image",'url("'+i+'")'),e.removeAttr("data-background")):(n&&(e.attr("srcset",n),e.removeAttr("data-srcset")),s&&(e.attr("src",s),e.removeAttr("data-src"))),e.addClass("swiper-lazy-loaded").removeClass("swiper-lazy-loading"),r.find(".swiper-lazy-preloader, .preloader").remove(),b.params.loop&&t){var a=r.attr("data-swiper-slide-index");if(r.hasClass(b.params.slideDuplicateClass)){var o=b.wrapper.children('[data-swiper-slide-index="'+a+'"]:not(.'+b.params.slideDuplicateClass+")");b.lazy.loadImageInSlide(o.index(),!1)}else{var l=b.wrapper.children("."+b.params.slideDuplicateClass+'[data-swiper-slide-index="'+a+'"]');b.lazy.loadImageInSlide(l.index(),!1)}}b.emit("onLazyImageReady",b,r[0],e[0])}),b.emit("onLazyImageLoad",b,r[0],e[0])})}},load:function(){var e;if(b.params.watchSlidesVisibility)b.wrapper.children("."+b.params.slideVisibleClass).each(function(){b.lazy.loadImageInSlide(a(this).index())});else if(b.params.slidesPerView>1)for(e=b.activeIndex;e<b.activeIndex+b.params.slidesPerView;e++)b.slides[e]&&b.lazy.loadImageInSlide(e);else b.lazy.loadImageInSlide(b.activeIndex);if(b.params.lazyLoadingInPrevNext)if(b.params.slidesPerView>1||b.params.lazyLoadingInPrevNextAmount&&b.params.lazyLoadingInPrevNextAmount>1){var t=b.params.lazyLoadingInPrevNextAmount,r=b.params.slidesPerView,i=Math.min(b.activeIndex+r+Math.max(t,r),b.slides.length),s=Math.max(b.activeIndex-Math.max(r,t),0);for(e=b.activeIndex+b.params.slidesPerView;i>e;e++)b.slides[e]&&b.lazy.loadImageInSlide(e);for(e=s;e<b.activeIndex;e++)b.slides[e]&&b.lazy.loadImageInSlide(e)}else{var n=b.wrapper.children("."+b.params.slideNextClass);n.length>0&&b.lazy.loadImageInSlide(n.index());var o=b.wrapper.children("."+b.params.slidePrevClass);o.length>0&&b.lazy.loadImageInSlide(o.index())}},onTransitionStart:function(){b.params.lazyLoading&&(b.params.lazyLoadingOnTransitionStart||!b.params.lazyLoadingOnTransitionStart&&!b.lazy.initialImageLoaded)&&b.lazy.load()},onTransitionEnd:function(){b.params.lazyLoading&&!b.params.lazyLoadingOnTransitionStart&&b.lazy.load()}},b.scrollbar={isTouched:!1,setDragPosition:function(e){var a=b.scrollbar,t=b.isHorizontal()?"touchstart"===e.type||"touchmove"===e.type?e.targetTouches[0].pageX:e.pageX||e.clientX:"touchstart"===e.type||"touchmove"===e.type?e.targetTouches[0].pageY:e.pageY||e.clientY,r=t-a.track.offset()[b.isHorizontal()?"left":"top"]-a.dragSize/2,i=-b.minTranslate()*a.moveDivider,s=-b.maxTranslate()*a.moveDivider;i>r?r=i:r>s&&(r=s),r=-r/a.moveDivider,b.updateProgress(r),b.setWrapperTranslate(r,!0)},dragStart:function(e){var a=b.scrollbar;a.isTouched=!0,e.preventDefault(),e.stopPropagation(),a.setDragPosition(e),clearTimeout(a.dragTimeout),a.track.transition(0),b.params.scrollbarHide&&a.track.css("opacity",1),b.wrapper.transition(100),a.drag.transition(100),b.emit("onScrollbarDragStart",b)},dragMove:function(e){var a=b.scrollbar;a.isTouched&&(e.preventDefault?e.preventDefault():e.returnValue=!1,a.setDragPosition(e),b.wrapper.transition(0),a.track.transition(0),a.drag.transition(0),b.emit("onScrollbarDragMove",b))},dragEnd:function(e){var a=b.scrollbar;a.isTouched&&(a.isTouched=!1,b.params.scrollbarHide&&(clearTimeout(a.dragTimeout),a.dragTimeout=setTimeout(function(){a.track.css("opacity",0),a.track.transition(400)},1e3)),b.emit("onScrollbarDragEnd",b),b.params.scrollbarSnapOnRelease&&b.slideReset())},enableDraggable:function(){var e=b.scrollbar,t=b.support.touch?e.track:document;a(e.track).on(b.touchEvents.start,e.dragStart),a(t).on(b.touchEvents.move,e.dragMove),a(t).on(b.touchEvents.end,e.dragEnd)},disableDraggable:function(){var e=b.scrollbar,t=b.support.touch?e.track:document;a(e.track).off(b.touchEvents.start,e.dragStart),a(t).off(b.touchEvents.move,e.dragMove),a(t).off(b.touchEvents.end,e.dragEnd)},set:function(){if(b.params.scrollbar){var e=b.scrollbar;e.track=a(b.params.scrollbar),b.params.uniqueNavElements&&"string"==typeof b.params.scrollbar&&e.track.length>1&&1===b.container.find(b.params.scrollbar).length&&(e.track=b.container.find(b.params.scrollbar)),e.drag=e.track.find(".swiper-scrollbar-drag"),0===e.drag.length&&(e.drag=a('<div class="swiper-scrollbar-drag"></div>'),e.track.append(e.drag)),e.drag[0].style.width="",e.drag[0].style.height="",e.trackSize=b.isHorizontal()?e.track[0].offsetWidth:e.track[0].offsetHeight,e.divider=b.size/b.virtualSize,e.moveDivider=e.divider*(e.trackSize/b.size),e.dragSize=e.trackSize*e.divider,b.isHorizontal()?e.drag[0].style.width=e.dragSize+"px":e.drag[0].style.height=e.dragSize+"px",e.divider>=1?e.track[0].style.display="none":e.track[0].style.display="",b.params.scrollbarHide&&(e.track[0].style.opacity=0)}},setTranslate:function(){if(b.params.scrollbar){var e,a=b.scrollbar,t=(b.translate||0,a.dragSize);e=(a.trackSize-a.dragSize)*b.progress,b.rtl&&b.isHorizontal()?(e=-e,e>0?(t=a.dragSize-e,e=0):-e+a.dragSize>a.trackSize&&(t=a.trackSize+e)):0>e?(t=a.dragSize+e,e=0):e+a.dragSize>a.trackSize&&(t=a.trackSize-e),b.isHorizontal()?(b.support.transforms3d?a.drag.transform("translate3d("+e+"px, 0, 0)"):a.drag.transform("translateX("+e+"px)"),a.drag[0].style.width=t+"px"):(b.support.transforms3d?a.drag.transform("translate3d(0px, "+e+"px, 0)"):a.drag.transform("translateY("+e+"px)"),a.drag[0].style.height=t+"px"),b.params.scrollbarHide&&(clearTimeout(a.timeout),a.track[0].style.opacity=1,a.timeout=setTimeout(function(){a.track[0].style.opacity=0,a.track.transition(400)},1e3))}},setTransition:function(e){b.params.scrollbar&&b.scrollbar.drag.transition(e)}},b.controller={LinearSpline:function(e,a){this.x=e,this.y=a,this.lastIndex=e.length-1;var t,r;this.x.length;this.interpolate=function(e){return e?(r=i(this.x,e),t=r-1,(e-this.x[t])*(this.y[r]-this.y[t])/(this.x[r]-this.x[t])+this.y[t]):0};var i=function(){var e,a,t;return function(r,i){for(a=-1,e=r.length;e-a>1;)r[t=e+a>>1]<=i?a=t:e=t;return e}}()},getInterpolateFunction:function(e){b.controller.spline||(b.controller.spline=b.params.loop?new b.controller.LinearSpline(b.slidesGrid,e.slidesGrid):new b.controller.LinearSpline(b.snapGrid,e.snapGrid))},setTranslate:function(e,a){function r(a){e=a.rtl&&"horizontal"===a.params.direction?-b.translate:b.translate,"slide"===b.params.controlBy&&(b.controller.getInterpolateFunction(a),s=-b.controller.spline.interpolate(-e)),s&&"container"!==b.params.controlBy||(i=(a.maxTranslate()-a.minTranslate())/(b.maxTranslate()-b.minTranslate()),s=(e-b.minTranslate())*i+a.minTranslate()),b.params.controlInverse&&(s=a.maxTranslate()-s),a.updateProgress(s),a.setWrapperTranslate(s,!1,b),a.updateActiveIndex()}var i,s,n=b.params.control;if(b.isArray(n))for(var o=0;o<n.length;o++)n[o]!==a&&n[o]instanceof t&&r(n[o]);else n instanceof t&&a!==n&&r(n)},setTransition:function(e,a){function r(a){a.setWrapperTransition(e,b),0!==e&&(a.onTransitionStart(),a.wrapper.transitionEnd(function(){s&&(a.params.loop&&"slide"===b.params.controlBy&&a.fixLoop(),a.onTransitionEnd())}))}var i,s=b.params.control;if(b.isArray(s))for(i=0;i<s.length;i++)s[i]!==a&&s[i]instanceof t&&r(s[i]);else s instanceof t&&a!==s&&r(s)}},b.hashnav={init:function(){if(b.params.hashnav){b.hashnav.initialized=!0;var e=document.location.hash.replace("#","");if(e)for(var a=0,t=0,r=b.slides.length;r>t;t++){var i=b.slides.eq(t),s=i.attr("data-hash");if(s===e&&!i.hasClass(b.params.slideDuplicateClass)){var n=i.index();b.slideTo(n,a,b.params.runCallbacksOnInit,!0)}}}},setHash:function(){b.hashnav.initialized&&b.params.hashnav&&(document.location.hash=b.slides.eq(b.activeIndex).attr("data-hash")||"")}},b.disableKeyboardControl=function(){b.params.keyboardControl=!1,a(document).off("keydown",p)},b.enableKeyboardControl=function(){b.params.keyboardControl=!0,a(document).on("keydown",p)},b.mousewheel={event:!1,lastScrollTime:(new window.Date).getTime()},b.params.mousewheelControl){try{new window.WheelEvent("wheel"),b.mousewheel.event="wheel"}catch(N){(window.WheelEvent||b.container[0]&&"wheel"in b.container[0])&&(b.mousewheel.event="wheel")}!b.mousewheel.event&&window.WheelEvent,b.mousewheel.event||void 0===document.onmousewheel||(b.mousewheel.event="mousewheel"),b.mousewheel.event||(b.mousewheel.event="DOMMouseScroll")}b.disableMousewheelControl=function(){return b.mousewheel.event?(b.container.off(b.mousewheel.event,d),!0):!1},b.enableMousewheelControl=function(){return b.mousewheel.event?(b.container.on(b.mousewheel.event,d),!0):!1},b.parallax={setTranslate:function(){b.container.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(){u(this,b.progress)}),b.slides.each(function(){var e=a(this);e.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(){var a=Math.min(Math.max(e[0].progress,-1),1);u(this,a)})})},setTransition:function(e){"undefined"==typeof e&&(e=b.params.speed),b.container.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(){var t=a(this),r=parseInt(t.attr("data-swiper-parallax-duration"),10)||e;0===e&&(r=0),t.transition(r)})}},b._plugins=[];for(var R in b.plugins){var W=b.plugins[R](b,b.params[R]);W&&b._plugins.push(W)}return b.callPlugins=function(e){for(var a=0;a<b._plugins.length;a++)e in b._plugins[a]&&b._plugins[a][e](arguments[1],arguments[2],arguments[3],arguments[4],arguments[5])},b.emitterEventListeners={},b.emit=function(e){b.params[e]&&b.params[e](arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]);var a;if(b.emitterEventListeners[e])for(a=0;a<b.emitterEventListeners[e].length;a++)b.emitterEventListeners[e][a](arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]);b.callPlugins&&b.callPlugins(e,arguments[1],arguments[2],arguments[3],arguments[4],arguments[5])},b.on=function(e,a){return e=c(e),b.emitterEventListeners[e]||(b.emitterEventListeners[e]=[]),b.emitterEventListeners[e].push(a),b},b.off=function(e,a){var t;if(e=c(e),"undefined"==typeof a)return b.emitterEventListeners[e]=[],b;if(b.emitterEventListeners[e]&&0!==b.emitterEventListeners[e].length){for(t=0;t<b.emitterEventListeners[e].length;t++)b.emitterEventListeners[e][t]===a&&b.emitterEventListeners[e].splice(t,1);return b}},b.once=function(e,a){e=c(e);var t=function(){a(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4]),b.off(e,t)};return b.on(e,t),b},b.a11y={makeFocusable:function(e){return e.attr("tabIndex","0"),e},addRole:function(e,a){return e.attr("role",a),e},addLabel:function(e,a){return e.attr("aria-label",a),e},disable:function(e){return e.attr("aria-disabled",!0),e},enable:function(e){return e.attr("aria-disabled",!1),e},onEnterKey:function(e){13===e.keyCode&&(a(e.target).is(b.params.nextButton)?(b.onClickNext(e),b.isEnd?b.a11y.notify(b.params.lastSlideMessage):b.a11y.notify(b.params.nextSlideMessage)):a(e.target).is(b.params.prevButton)&&(b.onClickPrev(e),b.isBeginning?b.a11y.notify(b.params.firstSlideMessage):b.a11y.notify(b.params.prevSlideMessage)),a(e.target).is("."+b.params.bulletClass)&&a(e.target)[0].click())},liveRegion:a('<span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>'),notify:function(e){var a=b.a11y.liveRegion;0!==a.length&&(a.html(""),a.html(e))},init:function(){b.params.nextButton&&b.nextButton&&b.nextButton.length>0&&(b.a11y.makeFocusable(b.nextButton),b.a11y.addRole(b.nextButton,"button"),b.a11y.addLabel(b.nextButton,b.params.nextSlideMessage)),b.params.prevButton&&b.prevButton&&b.prevButton.length>0&&(b.a11y.makeFocusable(b.prevButton),b.a11y.addRole(b.prevButton,"button"),b.a11y.addLabel(b.prevButton,b.params.prevSlideMessage)),a(b.container).append(b.a11y.liveRegion)},initPagination:function(){b.params.pagination&&b.params.paginationClickable&&b.bullets&&b.bullets.length&&b.bullets.each(function(){var e=a(this);b.a11y.makeFocusable(e),b.a11y.addRole(e,"button"),b.a11y.addLabel(e,b.params.paginationBulletMessage.replace(/{{index}}/,e.index()+1))})},destroy:function(){b.a11y.liveRegion&&b.a11y.liveRegion.length>0&&b.a11y.liveRegion.remove()}},b.init=function(){b.params.loop&&b.createLoop(),b.updateContainerSize(),b.updateSlidesSize(),b.updatePagination(),b.params.scrollbar&&b.scrollbar&&(b.scrollbar.set(),b.params.scrollbarDraggable&&b.scrollbar.enableDraggable()),"slide"!==b.params.effect&&b.effects[b.params.effect]&&(b.params.loop||b.updateProgress(),b.effects[b.params.effect].setTranslate()),b.params.loop?b.slideTo(b.params.initialSlide+b.loopedSlides,0,b.params.runCallbacksOnInit):(b.slideTo(b.params.initialSlide,0,b.params.runCallbacksOnInit),0===b.params.initialSlide&&(b.parallax&&b.params.parallax&&b.parallax.setTranslate(),b.lazy&&b.params.lazyLoading&&(b.lazy.load(),b.lazy.initialImageLoaded=!0))),b.attachEvents(),b.params.observer&&b.support.observer&&b.initObservers(),b.params.preloadImages&&!b.params.lazyLoading&&b.preloadImages(),b.params.autoplay&&b.startAutoplay(),b.params.keyboardControl&&b.enableKeyboardControl&&b.enableKeyboardControl(),b.params.mousewheelControl&&b.enableMousewheelControl&&b.enableMousewheelControl(),
	b.params.hashnav&&b.hashnav&&b.hashnav.init(),b.params.a11y&&b.a11y&&b.a11y.init(),b.emit("onInit",b)},b.cleanupStyles=function(){b.container.removeClass(b.classNames.join(" ")).removeAttr("style"),b.wrapper.removeAttr("style"),b.slides&&b.slides.length&&b.slides.removeClass([b.params.slideVisibleClass,b.params.slideActiveClass,b.params.slideNextClass,b.params.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-column").removeAttr("data-swiper-row"),b.paginationContainer&&b.paginationContainer.length&&b.paginationContainer.removeClass(b.params.paginationHiddenClass),b.bullets&&b.bullets.length&&b.bullets.removeClass(b.params.bulletActiveClass),b.params.prevButton&&a(b.params.prevButton).removeClass(b.params.buttonDisabledClass),b.params.nextButton&&a(b.params.nextButton).removeClass(b.params.buttonDisabledClass),b.params.scrollbar&&b.scrollbar&&(b.scrollbar.track&&b.scrollbar.track.length&&b.scrollbar.track.removeAttr("style"),b.scrollbar.drag&&b.scrollbar.drag.length&&b.scrollbar.drag.removeAttr("style"))},b.destroy=function(e,a){b.detachEvents(),b.stopAutoplay(),b.params.scrollbar&&b.scrollbar&&b.params.scrollbarDraggable&&b.scrollbar.disableDraggable(),b.params.loop&&b.destroyLoop(),a&&b.cleanupStyles(),b.disconnectObservers(),b.params.keyboardControl&&b.disableKeyboardControl&&b.disableKeyboardControl(),b.params.mousewheelControl&&b.disableMousewheelControl&&b.disableMousewheelControl(),b.params.a11y&&b.a11y&&b.a11y.destroy(),b.emit("onDestroy"),e!==!1&&(b=null)},b.init(),b}};t.prototype={isSafari:function(){var e=navigator.userAgent.toLowerCase();return e.indexOf("safari")>=0&&e.indexOf("chrome")<0&&e.indexOf("android")<0}(),isUiWebView:/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent),isArray:function(e){return"[object Array]"===Object.prototype.toString.apply(e)},browser:{ie:window.navigator.pointerEnabled||window.navigator.msPointerEnabled,ieTouch:window.navigator.msPointerEnabled&&window.navigator.msMaxTouchPoints>1||window.navigator.pointerEnabled&&window.navigator.maxTouchPoints>1},device:function(){var e=navigator.userAgent,a=e.match(/(Android);?[\s\/]+([\d.]+)?/),t=e.match(/(iPad).*OS\s([\d_]+)/),r=e.match(/(iPod)(.*OS\s([\d_]+))?/),i=!t&&e.match(/(iPhone\sOS)\s([\d_]+)/);return{ios:t||i||r,android:a}}(),support:{touch:window.Modernizr&&Modernizr.touch===!0||function(){return!!("ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch)}(),transforms3d:window.Modernizr&&Modernizr.csstransforms3d===!0||function(){var e=document.createElement("div").style;return"webkitPerspective"in e||"MozPerspective"in e||"OPerspective"in e||"MsPerspective"in e||"perspective"in e}(),flexbox:function(){for(var e=document.createElement("div").style,a="alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "),t=0;t<a.length;t++)if(a[t]in e)return!0}(),observer:function(){return"MutationObserver"in window||"WebkitMutationObserver"in window}()},plugins:{}};for(var r=(function(){var e=function(e){var a=this,t=0;for(t=0;t<e.length;t++)a[t]=e[t];return a.length=e.length,this},a=function(a,t){var r=[],i=0;if(a&&!t&&a instanceof e)return a;if(a)if("string"==typeof a){var s,n,o=a.trim();if(o.indexOf("<")>=0&&o.indexOf(">")>=0){var l="div";for(0===o.indexOf("<li")&&(l="ul"),0===o.indexOf("<tr")&&(l="tbody"),(0===o.indexOf("<td")||0===o.indexOf("<th"))&&(l="tr"),0===o.indexOf("<tbody")&&(l="table"),0===o.indexOf("<option")&&(l="select"),n=document.createElement(l),n.innerHTML=a,i=0;i<n.childNodes.length;i++)r.push(n.childNodes[i])}else for(s=t||"#"!==a[0]||a.match(/[ .<>:~]/)?(t||document).querySelectorAll(a):[document.getElementById(a.split("#")[1])],i=0;i<s.length;i++)s[i]&&r.push(s[i])}else if(a.nodeType||a===window||a===document)r.push(a);else if(a.length>0&&a[0].nodeType)for(i=0;i<a.length;i++)r.push(a[i]);return new e(r)};return e.prototype={addClass:function(e){if("undefined"==typeof e)return this;for(var a=e.split(" "),t=0;t<a.length;t++)for(var r=0;r<this.length;r++)this[r].classList.add(a[t]);return this},removeClass:function(e){for(var a=e.split(" "),t=0;t<a.length;t++)for(var r=0;r<this.length;r++)this[r].classList.remove(a[t]);return this},hasClass:function(e){return this[0]?this[0].classList.contains(e):!1},toggleClass:function(e){for(var a=e.split(" "),t=0;t<a.length;t++)for(var r=0;r<this.length;r++)this[r].classList.toggle(a[t]);return this},attr:function(e,a){if(1===arguments.length&&"string"==typeof e)return this[0]?this[0].getAttribute(e):void 0;for(var t=0;t<this.length;t++)if(2===arguments.length)this[t].setAttribute(e,a);else for(var r in e)this[t][r]=e[r],this[t].setAttribute(r,e[r]);return this},removeAttr:function(e){for(var a=0;a<this.length;a++)this[a].removeAttribute(e);return this},data:function(e,a){if("undefined"!=typeof a){for(var t=0;t<this.length;t++){var r=this[t];r.dom7ElementDataStorage||(r.dom7ElementDataStorage={}),r.dom7ElementDataStorage[e]=a}return this}if(this[0]){var i=this[0].getAttribute("data-"+e);return i?i:this[0].dom7ElementDataStorage&&e in this[0].dom7ElementDataStorage?this[0].dom7ElementDataStorage[e]:void 0}},transform:function(e){for(var a=0;a<this.length;a++){var t=this[a].style;t.webkitTransform=t.MsTransform=t.msTransform=t.MozTransform=t.OTransform=t.transform=e}return this},transition:function(e){"string"!=typeof e&&(e+="ms");for(var a=0;a<this.length;a++){var t=this[a].style;t.webkitTransitionDuration=t.MsTransitionDuration=t.msTransitionDuration=t.MozTransitionDuration=t.OTransitionDuration=t.transitionDuration=e}return this},on:function(e,t,r,i){function s(e){var i=e.target;if(a(i).is(t))r.call(i,e);else for(var s=a(i).parents(),n=0;n<s.length;n++)a(s[n]).is(t)&&r.call(s[n],e)}var n,o,l=e.split(" ");for(n=0;n<this.length;n++)if("function"==typeof t||t===!1)for("function"==typeof t&&(r=arguments[1],i=arguments[2]||!1),o=0;o<l.length;o++)this[n].addEventListener(l[o],r,i);else for(o=0;o<l.length;o++)this[n].dom7LiveListeners||(this[n].dom7LiveListeners=[]),this[n].dom7LiveListeners.push({listener:r,liveListener:s}),this[n].addEventListener(l[o],s,i);return this},off:function(e,a,t,r){for(var i=e.split(" "),s=0;s<i.length;s++)for(var n=0;n<this.length;n++)if("function"==typeof a||a===!1)"function"==typeof a&&(t=arguments[1],r=arguments[2]||!1),this[n].removeEventListener(i[s],t,r);else if(this[n].dom7LiveListeners)for(var o=0;o<this[n].dom7LiveListeners.length;o++)this[n].dom7LiveListeners[o].listener===t&&this[n].removeEventListener(i[s],this[n].dom7LiveListeners[o].liveListener,r);return this},once:function(e,a,t,r){function i(n){t(n),s.off(e,a,i,r)}var s=this;"function"==typeof a&&(a=!1,t=arguments[1],r=arguments[2]),s.on(e,a,i,r)},trigger:function(e,a){for(var t=0;t<this.length;t++){var r;try{r=new window.CustomEvent(e,{detail:a,bubbles:!0,cancelable:!0})}catch(i){r=document.createEvent("Event"),r.initEvent(e,!0,!0),r.detail=a}this[t].dispatchEvent(r)}return this},transitionEnd:function(e){function a(s){if(s.target===this)for(e.call(this,s),t=0;t<r.length;t++)i.off(r[t],a)}var t,r=["webkitTransitionEnd","transitionend","oTransitionEnd","MSTransitionEnd","msTransitionEnd"],i=this;if(e)for(t=0;t<r.length;t++)i.on(r[t],a);return this},width:function(){return this[0]===window?window.innerWidth:this.length>0?parseFloat(this.css("width")):null},outerWidth:function(e){return this.length>0?e?this[0].offsetWidth+parseFloat(this.css("margin-right"))+parseFloat(this.css("margin-left")):this[0].offsetWidth:null},height:function(){return this[0]===window?window.innerHeight:this.length>0?parseFloat(this.css("height")):null},outerHeight:function(e){return this.length>0?e?this[0].offsetHeight+parseFloat(this.css("margin-top"))+parseFloat(this.css("margin-bottom")):this[0].offsetHeight:null},offset:function(){if(this.length>0){var e=this[0],a=e.getBoundingClientRect(),t=document.body,r=e.clientTop||t.clientTop||0,i=e.clientLeft||t.clientLeft||0,s=window.pageYOffset||e.scrollTop,n=window.pageXOffset||e.scrollLeft;return{top:a.top+s-r,left:a.left+n-i}}return null},css:function(e,a){var t;if(1===arguments.length){if("string"!=typeof e){for(t=0;t<this.length;t++)for(var r in e)this[t].style[r]=e[r];return this}if(this[0])return window.getComputedStyle(this[0],null).getPropertyValue(e)}if(2===arguments.length&&"string"==typeof e){for(t=0;t<this.length;t++)this[t].style[e]=a;return this}return this},each:function(e){for(var a=0;a<this.length;a++)e.call(this[a],a,this[a]);return this},html:function(e){if("undefined"==typeof e)return this[0]?this[0].innerHTML:void 0;for(var a=0;a<this.length;a++)this[a].innerHTML=e;return this},text:function(e){if("undefined"==typeof e)return this[0]?this[0].textContent.trim():null;for(var a=0;a<this.length;a++)this[a].textContent=e;return this},is:function(t){if(!this[0])return!1;var r,i;if("string"==typeof t){var s=this[0];if(s===document)return t===document;if(s===window)return t===window;if(s.matches)return s.matches(t);if(s.webkitMatchesSelector)return s.webkitMatchesSelector(t);if(s.mozMatchesSelector)return s.mozMatchesSelector(t);if(s.msMatchesSelector)return s.msMatchesSelector(t);for(r=a(t),i=0;i<r.length;i++)if(r[i]===this[0])return!0;return!1}if(t===document)return this[0]===document;if(t===window)return this[0]===window;if(t.nodeType||t instanceof e){for(r=t.nodeType?[t]:t,i=0;i<r.length;i++)if(r[i]===this[0])return!0;return!1}return!1},index:function(){if(this[0]){for(var e=this[0],a=0;null!==(e=e.previousSibling);)1===e.nodeType&&a++;return a}},eq:function(a){if("undefined"==typeof a)return this;var t,r=this.length;return a>r-1?new e([]):0>a?(t=r+a,new e(0>t?[]:[this[t]])):new e([this[a]])},append:function(a){var t,r;for(t=0;t<this.length;t++)if("string"==typeof a){var i=document.createElement("div");for(i.innerHTML=a;i.firstChild;)this[t].appendChild(i.firstChild)}else if(a instanceof e)for(r=0;r<a.length;r++)this[t].appendChild(a[r]);else this[t].appendChild(a);return this},prepend:function(a){var t,r;for(t=0;t<this.length;t++)if("string"==typeof a){var i=document.createElement("div");for(i.innerHTML=a,r=i.childNodes.length-1;r>=0;r--)this[t].insertBefore(i.childNodes[r],this[t].childNodes[0])}else if(a instanceof e)for(r=0;r<a.length;r++)this[t].insertBefore(a[r],this[t].childNodes[0]);else this[t].insertBefore(a,this[t].childNodes[0]);return this},insertBefore:function(e){for(var t=a(e),r=0;r<this.length;r++)if(1===t.length)t[0].parentNode.insertBefore(this[r],t[0]);else if(t.length>1)for(var i=0;i<t.length;i++)t[i].parentNode.insertBefore(this[r].cloneNode(!0),t[i])},insertAfter:function(e){for(var t=a(e),r=0;r<this.length;r++)if(1===t.length)t[0].parentNode.insertBefore(this[r],t[0].nextSibling);else if(t.length>1)for(var i=0;i<t.length;i++)t[i].parentNode.insertBefore(this[r].cloneNode(!0),t[i].nextSibling)},next:function(t){return new e(this.length>0?t?this[0].nextElementSibling&&a(this[0].nextElementSibling).is(t)?[this[0].nextElementSibling]:[]:this[0].nextElementSibling?[this[0].nextElementSibling]:[]:[])},nextAll:function(t){var r=[],i=this[0];if(!i)return new e([]);for(;i.nextElementSibling;){var s=i.nextElementSibling;t?a(s).is(t)&&r.push(s):r.push(s),i=s}return new e(r)},prev:function(t){return new e(this.length>0?t?this[0].previousElementSibling&&a(this[0].previousElementSibling).is(t)?[this[0].previousElementSibling]:[]:this[0].previousElementSibling?[this[0].previousElementSibling]:[]:[])},prevAll:function(t){var r=[],i=this[0];if(!i)return new e([]);for(;i.previousElementSibling;){var s=i.previousElementSibling;t?a(s).is(t)&&r.push(s):r.push(s),i=s}return new e(r)},parent:function(e){for(var t=[],r=0;r<this.length;r++)e?a(this[r].parentNode).is(e)&&t.push(this[r].parentNode):t.push(this[r].parentNode);return a(a.unique(t))},parents:function(e){for(var t=[],r=0;r<this.length;r++)for(var i=this[r].parentNode;i;)e?a(i).is(e)&&t.push(i):t.push(i),i=i.parentNode;return a(a.unique(t))},find:function(a){for(var t=[],r=0;r<this.length;r++)for(var i=this[r].querySelectorAll(a),s=0;s<i.length;s++)t.push(i[s]);return new e(t)},children:function(t){for(var r=[],i=0;i<this.length;i++)for(var s=this[i].childNodes,n=0;n<s.length;n++)t?1===s[n].nodeType&&a(s[n]).is(t)&&r.push(s[n]):1===s[n].nodeType&&r.push(s[n]);return new e(a.unique(r))},remove:function(){for(var e=0;e<this.length;e++)this[e].parentNode&&this[e].parentNode.removeChild(this[e]);return this},add:function(){var e,t,r=this;for(e=0;e<arguments.length;e++){var i=a(arguments[e]);for(t=0;t<i.length;t++)r[r.length]=i[t],r.length++}return r}},a.fn=e.prototype,a.unique=function(e){for(var a=[],t=0;t<e.length;t++)-1===a.indexOf(e[t])&&a.push(e[t]);return a},a}()),i=["jQuery","Zepto","Dom7"],s=0;s<i.length;s++)window[i[s]]&&e(window[i[s]]);var n;n="undefined"==typeof r?window.Dom7||window.Zepto||window.jQuery:r,n&&("transitionEnd"in n.fn||(n.fn.transitionEnd=function(e){function a(s){if(s.target===this)for(e.call(this,s),t=0;t<r.length;t++)i.off(r[t],a)}var t,r=["webkitTransitionEnd","transitionend","oTransitionEnd","MSTransitionEnd","msTransitionEnd"],i=this;if(e)for(t=0;t<r.length;t++)i.on(r[t],a);return this}),"transform"in n.fn||(n.fn.transform=function(e){for(var a=0;a<this.length;a++){var t=this[a].style;t.webkitTransform=t.MsTransform=t.msTransform=t.MozTransform=t.OTransform=t.transform=e}return this}),"transition"in n.fn||(n.fn.transition=function(e){"string"!=typeof e&&(e+="ms");for(var a=0;a<this.length;a++){var t=this[a].style;t.webkitTransitionDuration=t.MsTransitionDuration=t.msTransitionDuration=t.MozTransitionDuration=t.OTransitionDuration=t.transitionDuration=e}return this})),window.Swiper=t}(), true?module.exports=window.Swiper:"function"==typeof define&&define.amd&&define([],function(){"use strict";return window.Swiper});
	//# sourceMappingURL=maps/swiper.min.js.map

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"body-main bg-grey\">\n\t<div class=\"i-header-h\">\n\t\t<div class=\"i-header\">\n\t\t\t<router-link to=\"/login\" class=\"i-header-login\"><span><b class=\"fa fa-user\"></b></span></router-link>\n\t\t\t<div class=\"i-header-search\"><router-link to=\"/search\" class=\"i-header-search-input\">搜索感兴趣的东西</router-link></div>\n\t\t</div>\n\t</div>\n\t<div class=\"swiper-container\">\n        <div class=\"swiper-wrapper\">\n            <div class=\"swiper-slide\" v-for=\"v in banner\"><a><img :src=\"v.img\" alt=\"\" /></a></div>\n        </div>\n        <div class=\"swiper-pagination\"></div>\n\t</div>\n\t<div class=\"i-nav\">\n\t\t<router-link to=\"/list\" class=\"i-nav-link\"><b class=\"fa fa-automobile\" style=\"color: #10A286;\"></b><span>良品购</span></router-link>\n\t\t<router-link to=\"/shop\" class=\"i-nav-link\"><b class=\"fa fa-automobile\" style=\"color: #2BACC9;\"></b><span>商城</span></router-link>\n\t\t<router-link to=\"/cart\" class=\"i-nav-link\"><b class=\"fa fa-cart-plus\" style=\"color: #DF7514;\"></b><span>购物车</span></router-link>\n\t\t<router-link to=\"/user\" class=\"i-nav-link\"><b class=\"fa fa-automobile\" style=\"color: #857456;\"></b><span>我的</span></router-link>\n\t</div>\n\t<div class=\"i-share\">\n\t\t<ul>\n\t\t\t<li class=\"i-share-list\">\n\t\t\t\t<div class=\"i-share-img\"><img src=\"/shopping/static/images/12.jpg\"/></div>\n\t\t\t\t<p class=\"i-share-text\">小轩窗正梳妆</p>\n\t\t\t</li>\n\t\t</ul>\n\t</div>\n</div>\n";

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(14)
	__vue_script__ = __webpack_require__(16)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] shopping\\tpl\\search.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(17)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./search.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(15);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-85998230&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./search.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-85998230&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./search.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.search_show[_v-85998230]{\n\tdisplay: none;\n    margin-top: 0;\n    font-size: 14px;\n}\n.search_bar[_v-85998230] {\n\tposition: relative;\n\tpadding: 8px 10px;\n\tdisplay: -webkit-box;\n\tdisplay: -ms-flexbox;\n\tdisplay: flex;\n\tbox-sizing: border-box;\n\tbackground-color: #efeff4;\n}\n\n.search_bar[_v-85998230]:before {\n\ttop: 0;\n\tborder-top: 1px solid #c7c7c7;\n\t-webkit-transform-origin: 0 0;\n\ttransform-origin: 0 0;\n\t-webkit-transform: scaleY(.5);\n\ttransform: scaleY(.5);\n}\n.search_bar[_v-85998230]:after,\n.search_bar[_v-85998230]:before {\n\tcontent: \" \";\n\tposition: absolute;\n\tleft: 0;\n\twidth: 100%;\n\theight: 1px;\n\tcolor: #c7c7c7;\n}\n.search_bar[_v-85998230]:after {\n\tbottom: 0;\n\tborder-bottom: 1px solid #c7c7c7;\n\t-webkit-transform-origin: 0 100%;\n\ttransform-origin: 0 100%;\n\t-webkit-transform: scaleY(.5);\n\ttransform: scaleY(.5);\n}\n.search_bar.search_focusing .search_cancel[_v-85998230] {\n\tdisplay: block;\n}\n.search_bar.search_focusing .search_text[_v-85998230] {\n\tdisplay: none;\n}\n.search_outer[_v-85998230] {\n\tposition: relative;\n\t-webkit-box-flex: 1;\n\t-ms-flex: auto;\n\t    flex: auto;\n\tbackground-color: #efeff4;\n}\n.search_outer[_v-85998230]:after {\n\tcontent: '';\n\tposition: absolute;\n\tleft: 0;\n\ttop: 0;\n\twidth: 200%;\n\theight: 200%;\n\t-webkit-transform: scale(.5);\n\ttransform: scale(.5);\n\t-webkit-transform-origin: 0 0;\n\ttransform-origin: 0 0;\n\tborder-radius: 10px;\n\tborder: 1px solid #e6e6ea;\n\tbox-sizing: border-box;\n\tbackground: #fff;\n}\n.search_inner[_v-85998230] {\n\tposition: relative;\n\tpadding-left: 30px;\n\tpadding-right: 30px;\n\theight: 100%;\n\twidth: 100%;\n\tbox-sizing: border-box;\n\tz-index: 1;\n}\n.search_inner .search_input[_v-85998230] {\n\tpadding: 4px 0;\n\twidth: 100%;\n\theight: 1.42857143em;\n\tborder: 0;\n\tfont-size: 14px;\n\tline-height: 1.42857143em;\n\tbox-sizing: content-box;\n\tbackground: transparent;\n}\n.search_inner .search_input[_v-85998230]:focus {\n\toutline: none;\n}\n.search_inner .icon_search[_v-85998230] {\n\tposition: absolute;\n\tleft: 10px;\n\ttop: -2px;\n\tline-height: 28px;\n}\n.search_inner .icon_clear[_v-85998230] {\n\tposition: absolute;\n\ttop: -2px;\n\tright: 0;\n\tpadding: 0 10px;\n\tline-height: 28px;\n}\n.search_text[_v-85998230] {\n\tposition: absolute;\n\ttop: 1px;\n\tright: 1px;\n\tbottom: 1px;\n\tleft: 1px;\n\tz-index: 2;\n\tborder-radius: 3px;\n\ttext-align: center;\n\tcolor: #9b9b9b;\n\tbackground: #fff;\n}\n.search_text span[_v-85998230] {\n\tdisplay: inline-block;\n\tfont-size: 14px;\n\tvertical-align: middle;\n}\n.search_text .icon_search[_v-85998230] {\n\tmargin-right: 5px;\n}\n.search_cancel[_v-85998230] {\n\tdisplay: none;\n\tmargin-left: 10px;\n\tline-height: 28px;\n\twhite-space: nowrap;\n\tcolor: #42b8d3;\n}\n.search_input:not(:valid)~.icon_clear[_v-85998230] {\n\tdisplay: none\n}\ninput[type=search][_v-85998230]::-webkit-search-cancel-button,\ninput[type=search][_v-85998230]::-webkit-search-decoration,\ninput[type=search][_v-85998230]::-webkit-search-results-button,\ninput[type=search][_v-85998230]::-webkit-search-results-decoration {\n\tdisplay: none;\n}\n.cell[_v-85998230] {\n\tposition: relative\n}\n.cell[_v-85998230]:before {\n\tcontent: \" \";\n\tposition: absolute;\n\tleft: 0;\n\ttop: 0;\n\twidth: 100%;\n\theight: 1px;\n\tborder-top: 1px solid #d9d9d9;\n\tcolor: #d9d9d9;\n\t-webkit-transform-origin: 0 0;\n\ttransform-origin: 0 0;\n\t-webkit-transform: scaleY(.5);\n\ttransform: scaleY(.5);\n\tleft: 15px\n}\n.cell[_v-85998230]:first-child:before {\n\tdisplay: none\n}\n.cells[_v-85998230] {\n\tbackground-color: #fff;\n\tline-height: 1.41176471;\n\tfont-size: 1rem;\n\toverflow: hidden;\n\tposition: relative\n}\n.cells[_v-85998230]:before {\n\ttop: 0;\n\tborder-top: 1px solid #d9d9d9;\n\t-webkit-transform-origin: 0 0;\n\ttransform-origin: 0 0;\n\t-webkit-transform: scaleY(.5);\n\ttransform: scaleY(.5)\n}\n.cells[_v-85998230]:after,\n.cells[_v-85998230]:before {\n\tcontent: \" \";\n\tposition: absolute;\n\tleft: 0;\n\twidth: 100%;\n\theight: 1px;\n\tcolor: #d9d9d9\n}\n.cells[_v-85998230]:after {\n\tbottom: 0;\n\tborder-bottom: 1px solid #d9d9d9;\n\t-webkit-transform-origin: 0 100%;\n\ttransform-origin: 0 100%;\n\t-webkit-transform: scaleY(.5);\n\ttransform: scaleY(.5)\n}\n.cells_title[_v-85998230] {\n\tmargin-top: .77em;\n\tmargin-bottom: .3em;\n\tpadding-left: 15px;\n\tpadding-right: 15px;\n\tcolor: #888;\n\tfont-size: 14px\n}\n.cells_title+.cells[_v-85998230] {\n\tmargin-top: 0\n}\n.cells_tips[_v-85998230] {\n\tmargin-top: .3em;\n\tcolor: #888;\n\tpadding-left: 15px;\n\tpadding-right: 15px;\n\tfont-size: 14px\n}\n.cell[_v-85998230] {\n\tpadding: 10px 15px;\n\tposition: relative;\n\tdisplay: -webkit-box;\n\tdisplay: -ms-flexbox;\n\tdisplay: flex;\n\t-webkit-box-align: center;\n\t-ms-flex-align: center;\n\t    align-items: center\n}\n.cell_primary[_v-85998230] {\n\t-webkit-box-flex: 1;\n\t-ms-flex: 1;\n\t    flex: 1\n}\n.cells_access .cell[_v-85998230]:not(.no_access) {\n\t-webkit-tap-highlight-color: rgba(0, 0, 0, 0)\n}\n.cells_access .cell[_v-85998230]:not(.no_access):active {\n\tbackground-color: #ececec\n}\n.cells_access a.cell[_v-85998230] {\n\tcolor: inherit\n}\n", ""]);

	// exports


/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";

	module.exports = {
		methods: {
			searchClear: function searchClear() {
				$("#search_input").val('');
				$("#search_show").css("display", "none");
				$("#search_text").css("display", "");
			},
			searchBarFocus: function searchBarFocus() {
				$("#search_bar").addClass("search_focusing");
			},
			searchBarBlur: function searchBarBlur() {
				if ($("#search_input").val() == '') {
					$("#search_text").css("display", "");
					$("#search_bar").removeClass("search_focusing");
				}
			},
			searchBarKeyup: function searchBarKeyup() {
				if ($("#search_input").val() == '') {
					$("#search_show").css("display", "none");
				} else {
					$("#search_show").css("display", "block");
					$("#search_text").css("display", "none");
				}
			},
			searchCancel: function searchCancel() {
				$("#search_text").css("display", "");
				$("#search_bar").removeClass("search_focusing");
				$("#search_show").css("display", "none");
				$("#search_input").val('');
			}
		}
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = "\n<div _v-85998230=\"\">\n    <div class=\"search_bar\" id=\"search_bar\" _v-85998230=\"\">\n        <form class=\"search_outer\" _v-85998230=\"\">\n            <div class=\"search_inner\" _v-85998230=\"\">\n                <i class=\"icon_search\" _v-85998230=\"\"></i>\n                <input type=\"search\" class=\"search_input\" id=\"search_input\" placeholder=\"搜索\" required=\"\" @focus=\"searchBarFocus\" @blur=\"searchBarBlur\" @keyup=\"searchBarKeyup\" _v-85998230=\"\">\n                <a href=\"javascript:\" class=\"icon_clear\" id=\"search_clear\" @click=\"searchClear()\" _v-85998230=\"\"></a>\n            </div>\n            <label for=\"search_input\" class=\"search_text\" id=\"search_text\" _v-85998230=\"\">\n                <i class=\"icon_search\" _v-85998230=\"\"></i>\n                <span _v-85998230=\"\">搜索</span>\n            </label>\n        </form>\n        <a href=\"javascript:\" class=\"search_cancel\" id=\"search_cancel\" @click=\"searchCancel()\" _v-85998230=\"\">取消</a>\n    </div>\n    <div class=\"cells cells_access search_show\" id=\"search_show\" _v-85998230=\"\">\n        <div class=\"cell\" _v-85998230=\"\">\n            <div class=\"cell_bd cell_primary\" _v-85998230=\"\">\n                <p _v-85998230=\"\">实时搜索文本</p>\n            </div>\n        </div>\n        <div class=\"cell\" _v-85998230=\"\">\n            <div class=\"cell_bd cell_primary\" _v-85998230=\"\">\n                <p _v-85998230=\"\">实时搜索文本</p>\n            </div>\n        </div>\n        <div class=\"cell\" _v-85998230=\"\">\n            <div class=\"cell_bd cell_primary\" _v-85998230=\"\">\n                <p _v-85998230=\"\">实时搜索文本</p>\n            </div>\n        </div>\n    </div>\n</div>\n";

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(19)
	__vue_script__ = __webpack_require__(21)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] shopping\\tpl\\list.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(27)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./list.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(20);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-279fa8de&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./list.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-279fa8de&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./list.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.shoplist[_v-279fa8de]{\n\tbackground: #ebeced;\n}\n.shopitem[_v-279fa8de]{\n\tbackground: #fff;\n\tmargin-bottom: 20px;\n}\n.thumb a[_v-279fa8de]{\n\tdisplay: block;\n\tpadding-bottom: 75%;\n\theight: 0;\n\toverflow: hidden;\n}\n.thumb a img[_v-279fa8de]{\n\tdisplay: inline;\n\twidth:100%;\n\tborder: none;\n}\n.content h4[_v-279fa8de]{\n\tpadding: 1em;\n\tfont-size: 14px;\n}\n.operation[_v-279fa8de]{\n\tpadding:0 1em 1em;\n\ttext-align: right;\n}\n.fa[_v-279fa8de]{\n    display: inline-block;\n    font: normal normal normal 14px/1 FontAwesome;\n    font-size: inherit;\n    text-rendering: auto;\n}\n.fa[_v-279fa8de]:before {\n\tfont-size: 24px;\n    content: \"\\F039\";\n}\n", ""]);

	// exports


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Header = __webpack_require__(22);
	module.exports = {
		data: function data() {
			return {
				"title": "商品列表",
				"items": [{ "title": "春秋季复古英伦风粗跟单鞋女中跟尖头女鞋OL学院风小皮鞋黑通勤鞋", "thumb": "static/images/3.jpeg" }, { "title": "秋冬英伦大头粗跟厚底松糕鞋日系原宿学生女鞋小皮鞋大码系带单鞋", "thumb": "static/images/2.jpeg" }, { "title": "布洛克女鞋平底单鞋复古小皮鞋学院风女英伦风小白鞋女牛津鞋", "thumb": "static/images/1.jpeg" }]
			};
		},
		components: {
			'myHeader': Header
		},
		methods: {}
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(60)
	__vue_script__ = __webpack_require__(25)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] shopping\\tpl\\header.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(62)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./header.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 23 */,
/* 24 */,
/* 25 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
		props: ['title']
	};

/***/ },
/* 26 */,
/* 27 */
/***/ function(module, exports) {

	module.exports = "\n<div _v-279fa8de=\"\">\n\t<div _v-279fa8de=\"\">\n\t\t<my-header :title=\"title\" _v-279fa8de=\"\"></my-header>\n\t</div>\n\t<section class=\"shoplist\" _v-279fa8de=\"\">\n\t\t<article class=\"shopitem\" v-for=\"item in items\" _v-279fa8de=\"\">\n\t\t\t<header class=\"thumb\" _v-279fa8de=\"\"><a href=\"javascript:;\" _v-279fa8de=\"\"><img :src=\"item.thumb\" alt=\"\" _v-279fa8de=\"\"></a></header>\n\t\t\t<section class=\"content\" _v-279fa8de=\"\"><h4 _v-279fa8de=\"\"><a href=\"javascript:;\" _v-279fa8de=\"\">{{item.title}}</a></h4></section>\n\t\t\t<footer class=\"operation\" _v-279fa8de=\"\"><a href=\"javascript:;\" _v-279fa8de=\"\"><i class=\"fa\" _v-279fa8de=\"\"></i></a></footer>\n\t\t</article>\n\t</section>\n</div>\n";

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(29)
	__vue_script__ = __webpack_require__(31)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] shopping\\tpl\\login.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(32)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./login.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(30);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-9d1cd44e&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./login.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-9d1cd44e&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./login.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.form[_v-9d1cd44e]{\n\twidth: 90%; margin: 0 auto; padding: 20px 0; font-size: .9rem;\n}\n.form-group[_v-9d1cd44e],.form-line[_v-9d1cd44e]{\n\tpadding-bottom: 20px;\n}\n.form-group label[_v-9d1cd44e]{\n\tdisplay: block; padding-bottom: 10px;\n}\n.form-group input[type=text][_v-9d1cd44e],.form-group input[type=password][_v-9d1cd44e]{\n\twidth: 100%; height: 40px;  box-sizing: border-box; border: 1px solid #ccc; padding: 9px 10px;\n}\n.form-group .input-tips[_v-9d1cd44e]{\n\tbackground: #ffe5e5;\n\tdisplay: block;\n\tmargin-top: 5px;\n\tpadding: 0 8px;\n\tline-height: 30px;\n}\n.form-btn[_v-9d1cd44e]{\n\ttext-align: center;\n\tpadding-top: 10px;\n\tborder-top: 1px solid #eee;\n}\n.form-btn input[type=submit][_v-9d1cd44e],.form-btn a[_v-9d1cd44e]{\n\twidth: 45%;\n\tbox-sizing: border-box;\n}\n.form-btn input[type=submit][_v-9d1cd44e]{\n\tbackground: #999;\n\tborder: 1px solid #999;\n}\n", ""]);

	// exports


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Header = __webpack_require__(22);
	module.exports = {
		data: function data() {
			return {
				"title": "登录",
				"apiUrl": 'api/login.php',
				"form": {
					"username": "",
					"password": "",
					"remember": false,
					"usernametips": "",
					"passwordtips": ""
				}
			};
		},
		components: {
			'myHeader': Header
		},
		methods: {
			onSubmit: function onSubmit() {
				this.$http.post(this.apiUrl, this.form).then(function (response) {

					tips('登录成功', function () {
						location.href = '/';
					});
				}, function (response) {
					tips('网络繁忙，请稍候再试！');
				});
			}
		}
	};

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = "\n<div _v-9d1cd44e=\"\">\n\t<div _v-9d1cd44e=\"\">\n\t\t<my-header :title=\"title\" _v-9d1cd44e=\"\"></my-header>\n\t</div>\n\t<div class=\"form\" _v-9d1cd44e=\"\">\n\t\t<form @submit.prevent=\"onSubmit\" _v-9d1cd44e=\"\">\n\t\t\t<div class=\"form-group\" _v-9d1cd44e=\"\">\n\t\t\t\t<label for=\"username\" _v-9d1cd44e=\"\">用户名/邮箱：</label>\n\t\t\t\t<input type=\"text\" v-model=\"form.username\" debounce=\"500\" name=\"username\" id=\"username\" value=\"\" required=\"required\" _v-9d1cd44e=\"\">\n\t\t\t\t<span class=\"input-tips\" v-show=\"form.usernametips!=''\" _v-9d1cd44e=\"\"><font color=\"red\" _v-9d1cd44e=\"\">*{{form.usernametips}}</font></span>\n\t\t\t</div>\n\t\t\t<div class=\"form-group\" _v-9d1cd44e=\"\">\n\t\t\t\t<label for=\"password\" _v-9d1cd44e=\"\">密码：</label>\n\t\t\t\t<input type=\"password\" v-model=\"form.password\" debounce=\"500\" name=\"password\" id=\"password\" value=\"\" required=\"required\" _v-9d1cd44e=\"\">\n\t\t\t\t<span class=\"input-tips\" v-show=\"form.passwordtips!=''\" _v-9d1cd44e=\"\"><font color=\"red\" _v-9d1cd44e=\"\">*{{form.passwordtips}}</font></span>\n\t\t\t</div>\n\t\t\t<div class=\"form-line\" _v-9d1cd44e=\"\">\n\t\t\t\t<label for=\"remember\" _v-9d1cd44e=\"\"><input type=\"checkbox\" v-model=\"form.remember\" name=\"remember\" id=\"remember\" _v-9d1cd44e=\"\"> 记住密码</label>\n\t\t\t\t<router-link to=\"/forget\" class=\"fr\" _v-9d1cd44e=\"\">忘记密码？</router-link>\n\t\t\t</div>\n\t\t\t<div class=\"form-btn\" _v-9d1cd44e=\"\">\n\t\t\t\t<input type=\"submit\" value=\"登录\" class=\"btn btn-primary\" @keyup.enter=\"onSubmit\" _v-9d1cd44e=\"\">\n\t\t\t\t<router-link to=\"/register\" class=\"btn btn-primary\" _v-9d1cd44e=\"\">注册</router-link>\n\t\t\t</div>\n\t\t</form>\n\t</div>\n</div>\n";

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(34)
	__vue_script__ = __webpack_require__(36)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] shopping\\tpl\\register.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(37)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./register.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(35);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-0f5e0863&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./register.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-0f5e0863&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./register.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.form[_v-0f5e0863]{\n\twidth: 90%; margin: 0 auto; padding: 20px 0; font-size: .9rem;\n}\n.form-group[_v-0f5e0863],.form-line[_v-0f5e0863]{\n\tpadding-bottom: 20px;\n}\n.form-group label[_v-0f5e0863]{\n\tdisplay: block; padding-bottom: 10px;\n}\n.form-group input[type=text][_v-0f5e0863],.form-group input[type=password][_v-0f5e0863],.form-group input[type=email][_v-0f5e0863]{\n\twidth: 100%; height: 40px;  box-sizing: border-box; border: 1px solid #ccc; padding: 9px 10px;\n}\n.form-group .input-tips[_v-0f5e0863]{\n\tbackground: #ffe5e5;\n\tdisplay: block;\n\tmargin-top: 5px;\n\tpadding: 0 8px;\n\tline-height: 30px;\n}\n.form-btn[_v-0f5e0863]{\n\ttext-align: center;\n\tpadding-top: 10px;\n\tborder-top: 1px solid #eee;\n}\n.form-btn input[type=submit][_v-0f5e0863]{\n\twidth: 60%;\n\tbox-sizing: border-box;\n}\n", ""]);

	// exports


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Header = __webpack_require__(22);
	module.exports = {
		data: function data() {
			return {
				"title": "注册",
				"apiUrl": 'api/register.php',
				"form": {
					"username": "",
					"email": "",
					"password": "",
					"emailtips": "",
					"usernametips": "",
					"passwordtips": ""
				}
			};
		},
		components: {
			'myHeader': Header
		},
		methods: {
			onSubmit: function onSubmit() {
				this.$http.post(this.apiUrl, this.form).then(function (response) {

					tips('注册成功', function () {
						location.href = '/login';
					});
				}, function (response) {
					tips('网络繁忙，请稍候再试！');
				});
			}
		}
	};

/***/ },
/* 37 */
/***/ function(module, exports) {

	module.exports = "\n<div _v-0f5e0863=\"\">\n\t<div _v-0f5e0863=\"\">\n\t\t<my-header :title=\"title\" _v-0f5e0863=\"\"></my-header>\n\t</div>\n\t<div class=\"form\" _v-0f5e0863=\"\">\n\t\t<form @submit.prevent=\"onSubmit\" _v-0f5e0863=\"\">\n\t\t\t<div class=\"form-group\" _v-0f5e0863=\"\">\n\t\t\t\t<label for=\"email\" _v-0f5e0863=\"\">邮箱：</label>\n\t\t\t\t<input type=\"email\" v-model=\"form.email\" debounce=\"500\" name=\"email\" id=\"email\" value=\"\" required=\"required\" _v-0f5e0863=\"\">\n\t\t\t\t<span class=\"input-tips\" v-show=\"form.emailtips!=''\" _v-0f5e0863=\"\"><font color=\"red\" _v-0f5e0863=\"\">*{{form.emailtips}}</font></span>\n\t\t\t</div>\n\t\t\t<div class=\"form-group\" _v-0f5e0863=\"\">\n\t\t\t\t<label for=\"username\" _v-0f5e0863=\"\">用户名：</label>\n\t\t\t\t<input type=\"text\" v-model=\"form.username\" debounce=\"500\" name=\"username\" id=\"username\" value=\"\" required=\"required\" _v-0f5e0863=\"\">\n\t\t\t\t<span class=\"input-tips\" v-show=\"form.usernametips!=''\" _v-0f5e0863=\"\"><font color=\"red\" _v-0f5e0863=\"\">*{{form.usernametips}}</font></span>\n\t\t\t</div>\n\t\t\t<div class=\"form-group\" _v-0f5e0863=\"\">\n\t\t\t\t<label for=\"password\" _v-0f5e0863=\"\">密码：</label>\n\t\t\t\t<input type=\"password\" v-model=\"form.password\" debounce=\"500\" name=\"password\" id=\"password\" value=\"\" required=\"required\" _v-0f5e0863=\"\">\n\t\t\t\t<span class=\"input-tips\" v-show=\"form.passwordtips!=''\" _v-0f5e0863=\"\"><font color=\"red\" _v-0f5e0863=\"\">*{{form.passwordtips}}</font></span>\n\t\t\t</div>\n\t\t\t<div class=\"form-btn\" _v-0f5e0863=\"\">\n\t\t\t\t<input type=\"submit\" value=\"注册\" class=\"btn btn-primary\" @keyup.enter=\"onSubmit\" _v-0f5e0863=\"\">\n\t\t\t</div>\n\t\t</form>\n\t</div>\n</div>\n";

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(39)
	__vue_script__ = __webpack_require__(41)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] shopping\\tpl\\forget.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(42)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./forget.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(40);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-7771dea6&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./forget.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-7771dea6&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./forget.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.form[_v-7771dea6]{\n\twidth: 90%; margin: 0 auto; padding: 20px 0; font-size: .9rem;\n}\n.form-group[_v-7771dea6],.form-line[_v-7771dea6]{\n\tpadding-bottom: 20px;\n}\n.form-group label[_v-7771dea6]{\n\tdisplay: block; padding-bottom: 10px;\n}\n.form-group input[type=text][_v-7771dea6],.form-group input[type=email][_v-7771dea6]{\n\twidth: 100%; height: 40px; box-sizing: border-box; border: 1px solid #ccc; padding: 9px 10px;\n}\n.form-group .input-tips[_v-7771dea6]{\n\tbackground: #ffe5e5;\n\tdisplay: block;\n\tmargin-top: 5px;\n\tpadding: 0 8px;\n\tline-height: 30px;\n}\n.input-code[_v-7771dea6]{\n\tposition: relative;\n\tpadding-right: 95px;\n}\n.input-code .code-img[_v-7771dea6]{\n\tposition: absolute;\n\twidth: 95px;\n\theight: 40px;\n\tright: 0;\n\ttop: 0;\n\tborder: 1px solid #e5e5e5;\n\tbox-sizing: border-box;\n}\n.input-code .code-img img[_v-7771dea6]{\n\twidth: 100%;\n\theight: 100%;\n}\n.form-btn[_v-7771dea6]{\n\ttext-align: center;\n\tpadding-top: 10px;\n\tborder-top: 1px solid #eee;\n}\n.form-btn input[type=submit][_v-7771dea6],.form-btn a[_v-7771dea6]{\n\twidth: 45%;\n\tbox-sizing: border-box;\n}\n.form-btn input[type=submit][_v-7771dea6]{\n\twidth: 60%;\n}\n", ""]);

	// exports


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Header = __webpack_require__(22);
	module.exports = {
		data: function data() {
			return {
				"title": "忘记密码",
				"apiUrl": 'api/forget.php',
				"form": {
					"email": "",
					"code": "",
					"emailtips": "",
					"codetips": ""
				}
			};
		},
		components: {
			'myHeader': Header
		},
		methods: {
			onSubmit: function onSubmit() {
				this.$http.post(this.apiUrl, this.form).then(function (response) {

					tips('提交成功', function () {
						location.href = '/forgettips';
					});
				}, function (response) {
					console.log('网络繁忙，请稍候再试！');
				});
			}
		}
	};

/***/ },
/* 42 */
/***/ function(module, exports) {

	module.exports = "\n<div _v-7771dea6=\"\">\n\t<div _v-7771dea6=\"\">\n\t\t<my-header :title=\"title\" _v-7771dea6=\"\"></my-header>\n\t</div>\n\t<div class=\"form\" _v-7771dea6=\"\">\n\t\t<form @submit.prevent=\"onSubmit\" _v-7771dea6=\"\">\n\t\t\t<div class=\"form-group\" _v-7771dea6=\"\">\n\t\t\t\t<label for=\"email\" _v-7771dea6=\"\">请输入邮箱：</label>\n\t\t\t\t<input type=\"email\" v-model=\"form.email\" debounce=\"500\" name=\"email\" id=\"email\" value=\"\" required=\"required\" _v-7771dea6=\"\">\n\t\t\t\t<span class=\"input-tips\" v-show=\"form.emailtips!=''\" _v-7771dea6=\"\"><font color=\"red\" _v-7771dea6=\"\">*{{form.emailtips}}</font></span>\n\t\t\t</div>\n\t\t\t<div class=\"form-group\" _v-7771dea6=\"\">\n\t\t\t\t<label for=\"code\" _v-7771dea6=\"\">请输入验证码：</label>\n\t\t\t\t<div class=\"input-code\" _v-7771dea6=\"\">\n\t\t\t\t\t<input type=\"text\" v-model=\"form.code\" debounce=\"500\" name=\"code\" id=\"code\" value=\"\" required=\"required\" _v-7771dea6=\"\">\n\t\t\t\t\t<span class=\"code-img\" _v-7771dea6=\"\"><img src=\"xxxHTMLLINKxxx0.73075556079857050.35873158276081085xxx\" _v-7771dea6=\"\"></span>\n\t\t\t\t</div>\n\t\t\t\t<span class=\"input-tips\" v-show=\"form.codetips!=''\" _v-7771dea6=\"\"><font color=\"red\" _v-7771dea6=\"\">*{{form.codetips}}</font></span>\n\t\t\t</div>\n\t\t\t<div class=\"form-btn\" _v-7771dea6=\"\">\n\t\t\t\t<input type=\"submit\" value=\"下一步\" class=\"btn btn-primary\" @keyup.enter=\"onSubmit\" _v-7771dea6=\"\">\n\t\t\t</div>\n\t\t</form>\n\t</div>\n</div>\n";

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(44)
	__vue_script__ = __webpack_require__(46)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] shopping\\tpl\\forgettips.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(47)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./forgettips.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(45);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-380c1536&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./forgettips.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-380c1536&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./forgettips.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.forgettips[_v-380c1536]{\n\tpadding: 50px 10%;\n}\n.forgettips p[_v-380c1536]{\n\ttext-align: center;\n\tcolor: #666;\n\tpadding: 5px 0;\n\tline-height: 1.5em;\n}\n", ""]);

	// exports


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Header = __webpack_require__(22);
	module.exports = {
		data: function data() {
			return {
				"title": "找回密码",
				"apiUrl": 'api/forget.php',
				"form": {
					"email": "",
					"code": "",
					"emailtips": "",
					"codetips": ""
				}
			};
		},
		components: {
			'myHeader': Header
		}
	};

/***/ },
/* 47 */
/***/ function(module, exports) {

	module.exports = "\n<div _v-380c1536=\"\">\n\t<div _v-380c1536=\"\">\n\t\t<my-header :title=\"title\" _v-380c1536=\"\"></my-header>\n\t</div>\n\t<div class=\"forgettips\" _v-380c1536=\"\">\n\t\t<p _v-380c1536=\"\">我们已将信息发生至您的邮箱，请点击邮箱中的链接地址重置密码</p>\n\t\t<p _v-380c1536=\"\"><a href=\"https://mail.qq.com\" target=\"_blank\" class=\"btn btn-primary btn-sm\" _v-380c1536=\"\">去我的邮箱</a></p>\n\t</div>\n</div>\n";

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(49)
	__vue_script__ = __webpack_require__(51)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] shopping\\tpl\\password.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(52)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./password.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(50);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-d2164f4a&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./password.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-d2164f4a&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./password.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.form[_v-d2164f4a]{\n\twidth: 90%; margin: 0 auto; padding: 20px 0; font-size: .9rem;\n}\n.form-group[_v-d2164f4a],.form-line[_v-d2164f4a]{\n\tpadding-bottom: 20px;\n}\n.form-group label[_v-d2164f4a]{\n\tdisplay: block; padding-bottom: 10px;\n}\n.form-group input[type=text][_v-d2164f4a],.form-group input[type=password][_v-d2164f4a]{\n\twidth: 100%; height: 40px;  box-sizing: border-box; border: 1px solid #ccc; padding: 9px 10px;\n}\n.form-group .input-tips[_v-d2164f4a]{\n\tbackground: #ffe5e5;\n\tdisplay: block;\n\tmargin-top: 5px;\n\tpadding: 0 8px;\n\tline-height: 30px;\n}\n.form-btn[_v-d2164f4a]{\n\ttext-align: center;\n\tpadding-top: 10px;\n\tborder-top: 1px solid #eee;\n}\n.form-btn input[type=submit][_v-d2164f4a]{\n\twidth: 60%;\n}\n", ""]);

	// exports


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Header = __webpack_require__(22);
	module.exports = {
		data: function data() {
			return {
				"title": "找回密码",
				"apiUrl": 'api/password.php',
				"form": {
					"password": "",
					"repassword": "",
					"passwordtips": "",
					"repasswordtips": ""
				}
			};
		},
		components: {
			'myHeader': Header
		},
		methods: {
			onSubmit: function onSubmit() {
				var _this = this.form;
				if (_this.repassword != _this.password) {
					_this.repasswordtips = "两次密码输入不一致";
					return false;
				} else {
					_this.repasswordtips = "";
				}
				this.$http.post(this.apiUrl, this.form).then(function (response) {

					tips('提交成功', function () {
						location.href = '/login';
					});
				}, function (response) {
					tips('网络繁忙，请稍候再试！');
				});
			}
		}
	};

/***/ },
/* 52 */
/***/ function(module, exports) {

	module.exports = "\n<div _v-d2164f4a=\"\">\n\t<div _v-d2164f4a=\"\">\n\t\t<my-header :title=\"title\" _v-d2164f4a=\"\"></my-header>\n\t</div>\n\t<div class=\"form\" _v-d2164f4a=\"\">\n\t\t<form @submit.prevent=\"onSubmit\" _v-d2164f4a=\"\">\n\t\t\t<div class=\"form-group\" _v-d2164f4a=\"\">\n\t\t\t\t<label for=\"password\" _v-d2164f4a=\"\">输入新密码：</label>\n\t\t\t\t<input type=\"password\" v-model=\"form.password\" debounce=\"500\" name=\"password\" id=\"password\" value=\"\" required=\"required\" _v-d2164f4a=\"\">\n\t\t\t\t<span class=\"input-tips\" v-show=\"form.passwordtips!=''\" _v-d2164f4a=\"\"><font color=\"red\" _v-d2164f4a=\"\">*{{form.passwordtips}}</font></span>\n\t\t\t</div>\n\t\t\t<div class=\"form-group\" _v-d2164f4a=\"\">\n\t\t\t\t<label for=\"repassword\" _v-d2164f4a=\"\">再次输入新密码：</label>\n\t\t\t\t<input type=\"password\" v-model=\"form.repassword\" debounce=\"500\" name=\"repassword\" id=\"repassword\" value=\"\" required=\"required\" _v-d2164f4a=\"\">\n\t\t\t\t<span class=\"input-tips\" v-show=\"form.repasswordtips!=''\" _v-d2164f4a=\"\"><font color=\"red\" _v-d2164f4a=\"\">*{{form.repasswordtips}}</font></span>\n\t\t\t</div>\n\t\t\t<div class=\"form-btn\" _v-d2164f4a=\"\">\n\t\t\t\t<input type=\"submit\" value=\"提交\" class=\"btn btn-primary\" @keyup.enter=\"onSubmit\" _v-d2164f4a=\"\">\n\t\t\t</div>\n\t\t</form>\n\t</div>\n</div>\n";

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(54)
	__vue_script__ = __webpack_require__(56)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] shopping\\tpl\\cart.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(57)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./cart.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(55);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./cart.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./cart.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\r\n.cart_lists{\r\n\tpadding: 0 2%;\r\n}\r\n.cart_lists li{\r\n\tpadding: 8px 0;\r\n    border-bottom: 1px solid #eee;\r\n    color: #333;\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n}\r\n.cart_hd{\r\n\tmargin-right: .8em;\r\n    width: 60px;\r\n    height: 60px;\r\n    line-height: 60px;\r\n    text-align: center;\r\n}\r\n.cart_bd{\r\n\t-webkit-box-flex: 1;\r\n    -ms-flex: 1;\r\n    flex: 1;\r\n    min-width: 0;\r\n}\r\n.cart_desc{\r\n\tcolor: #999;\r\n\tfont-size: .8rem;\r\n}\r\n.cart_price{\r\n\tpadding: 5px 0;\r\n\tcolor: #999;\r\n\tfont-size: .8rem;\r\n}\r\n.cart_price span{\r\n\tpadding-right: 1rem;\r\n}\r\n.cart_price b{\r\n\tfont-weight: normal;\r\n}\r\n.cart_num{\r\n\tfont-size: 0;\r\n}\r\n.cart_num a{\r\n\twidth: 25px;\r\n\theight: 25px;\r\n\tline-height: 25px;\r\n\ttext-align: center;\r\n\tfont-size: .8rem;\r\n\tbackground: #E5E5E5;\r\n\tborder: 1px solid #bdbdbd;\r\n\tdisplay: inline-block;\r\n\tcolor: #000;\r\n}\r\n.cart_num input{\r\n\twidth: 30px;\r\n\theight: 25px;\r\n\tfont-size: .8rem;\r\n\ttext-align: center;\r\n\tborder: none;\r\n\tborder-top: 1px solid #bdbdbd;\r\n\tborder-bottom: 1px solid #bdbdbd;\r\n\tbackground: #fff;\r\n}\r\n.cart_del{\r\n\tfloat: right;\r\n}\r\n.cart_del a{\r\n\tfont-size: .8rem;\r\n\tborder: 1px solid #bdbdbd;\r\n\tbackground: #fff;\r\n\tborder-radius: 5px;\r\n\tpadding: 5px 12px;\r\n\tcolor: #000;\r\n\tdisplay: inline-block;\r\n}\r\n.cart_total{\r\n\theight: 54px;\r\n}\r\n.cart_total b{\r\n\tfont-weight: normal;\r\n}\r\n.cart_total_p{\r\n\tposition: fixed;\r\n\twidth: 90%;\r\n\theight: 34px;\r\n\tbackground: #fff;\r\n\tborder-top: 1px solid #ddd;\r\n\tbottom: 0;\r\n\tleft: 0;\r\n\tpadding: 10px 5%;\r\n}\r\n.cart_total_p span{\r\n\tpadding-right: .8rem;\r\n\tline-height: 34px;\r\n}\r\n.cart_total_btn:hover,.cart_total_btn:focus{\r\n\tcolor: #fff;\r\n}\r\n.cart-empty{\r\n\ttext-align: center;\r\n\tpadding: 5rem 5%;\r\n}\r\n", ""]);

	// exports


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Header = __webpack_require__(22);
	module.exports = {
		components: {
			'myHeader': Header
		},
		data: function data() {
			return {
				"title": "购物车",
				"apiUrl": "api/cart.php",
				"buyurl": "",
				"data": []
			};
		},
		mounted: function mounted() {
			this.$nextTick(function () {
				this.$http.get(this.apiUrl, {}).then(function (response) {
					var objs = JSON.parse(response.data);
					this.data = objs;
				}, function (response) {
					console.log('获取失败！');
				});
			});
		},
		computed: {
			totalNum: function totalNum() {
				var num = 0;
				for (var i = 0; i < this.data.length; i++) {
					num += this.data[i]["num"] * 1;
				}
				return num;
			},
			totalPrice: function totalPrice() {
				var price = 0;
				for (var i = 0; i < this.data.length; i++) {
					price += this.data[i]["price"] * this.data[i]["num"];
				}
				if (price > 0) {
					this.buyurl = "/";
				}
				return price;
			}
		},
		methods: {
			minus: function minus(a) {
				this.data[a]["num"]--;
				if (this.data[a]["num"] <= 0) {
					this.data[a]["num"] = 1;
				}
			},
			add: function add(a) {
				this.data[a]["num"]++;
			},
			del: function del(a) {
				var aData = this.data;
				prompt('确认删除该商品？', function () {
					aData.splice(a, 1);
				});
			}
		}
	};

/***/ },
/* 57 */
/***/ function(module, exports) {

	module.exports = "\n<div>\n\t<div>\n\t\t<my-header :title = \"title\"></my-header>\n\t</div>\n\t<div>\n\t\t<div class=\"cart_lists\" id=\"cart\">\n\t\t\t<ul v-if=\"data.length>0\">\n\t\t\t\t<li v-for=\"(v , index) in data\">\n\t\t\t\t\t<div class=\"cart_hd\">\n\t\t                <img class=\"cart_appmsg_thumb\" :src=\"v.img\">\n\t\t            </div>\n\t\t            <div class=\"cart_bd\">\n\t\t                <h4 class=\"cart_title\">{{v.title}}</h4>\n\t\t                <p class=\"cart_desc\">{{v.sub_title}}</p>\n\t\t                <p class=\"cart_price\">\n\t\t                \t<span>价格：￥<b>{{v.price}}</b>×<b>{{v.num}}</b></span>\n\t\t                \t<span>合计：￥<b>{{v.price*v.num}}</b></span>\n\t\t                </p>\n\t\t                <p class=\"cart_handle\">\n\t\t                \t<span class=\"cart_num\">\n\t\t                \t\t<a @click=\"minus(index)\">-</a>\n\t\t                \t\t<input type=\"text\" :value=\"v.num\" />\n\t\t                \t\t<a @click=\"add(index)\">+</a>\n\t\t                \t</span>\n\t\t                \t<span class=\"cart_del\">\n\t\t                \t\t<a @click=\"del(index)\">删除</a>\n\t\t                \t</span>\n\t\t                </p>\n\t\t            </div>\n\t\t\t\t</li>\n\t\t\t</ul>\n\t\t\t<div v-else class=\"cart-empty\">还没有任何商品，<router-link to=\"/\" class=\"btn btn-default btn-sm\">去购买</router-link></div>\n\t\t</div>\n\t\t<div class=\"cart_total\">\n\t\t\t<div class=\"cart_total_p\">\n\t\t\t\t<span>共<b>{{totalNum}}</b>件商品</span>\n\t\t\t\t<span>合计：{{totalPrice}}元</span>\n\t\t\t\t<router-link to=\"/buyurl\" :class=\"{'btn-disabled':totalPrice<=0,'btn-primary':totalPrice>0}\" class=\"btn btn-sm fr\">立即购买</router-link>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n";

/***/ },
/* 58 */,
/* 59 */,
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(61);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./header.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./header.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\r\n.header{\r\n\tposition: fixed;\r\n\twidth: 90%;\r\n\tbackground: #42b8d3;\r\n\tline-height: 1rem;\r\n\theight: 1rem;\r\n\tfont-size: 1rem;\r\n\tpadding: 1rem 5%;\r\n\tcolor: #fff;\r\n}\r\n.header-height{\r\n\theight: 3rem;\r\n}\r\n.header-title{\r\n\ttext-align: center;\r\n\tpadding: 0 3rem;\r\n    white-space: nowrap;\r\n    text-overflow: ellipsis;\r\n    overflow: hidden;\r\n}\r\n.header-back{\r\n\tposition: absolute;\r\n\tleft: 0;\r\n\ttop: 0;\r\n\theight: 1rem;\r\n\tpadding: 1rem .5em;\r\n\tdisplay: block;\r\n\tcolor: #fff;\r\n}\r\n.header-back:hover,.header-back:focus{\r\n\tcolor: #fff;\r\n}\r\n", ""]);

	// exports


/***/ },
/* 62 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"header-height\">\n\t<div class=\"header\">\n\t\t<a class=\"header-back\" href=\"javascript:;\" onclick=\"window.history.go(-1)\"><span class=\"fa fa-chevron-left\"></span> 返回</a>\n\t\t<p class=\"header-title\">{{title}}</p>\n\t</div>\n</div>\n";

/***/ }
/******/ ]);