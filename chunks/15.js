webpackJsonp([15],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
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
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(23)
	__vue_script__ = __webpack_require__(25)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] shopping\\tpl\\header.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(26)
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
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(24);
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
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\r\n.header{\r\n\tposition: fixed;\r\n\twidth: 90%;\r\n\tbackground: #42b8d3;\r\n\tline-height: 1rem;\r\n\theight: 1rem;\r\n\tfont-size: 1rem;\r\n\tpadding: 1rem 5%;\r\n\tcolor: #fff;\r\n}\r\n.header-height{\r\n\theight: 3rem;\r\n}\r\n.header-title{\r\n\ttext-align: center;\r\n\tpadding: 0 3rem;\r\n    white-space: nowrap;\r\n    text-overflow: ellipsis;\r\n    overflow: hidden;\r\n}\r\n.header-back{\r\n\tposition: absolute;\r\n\tleft: 0;\r\n\ttop: 0;\r\n\theight: 1rem;\r\n\tpadding: 1rem .5em;\r\n\tdisplay: block;\r\n\tcolor: #fff;\r\n}\r\n.header-back:hover,.header-back:focus{\r\n\tcolor: #fff;\r\n}\r\n", ""]);

	// exports


/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
		props: ['title']
	};

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"header-height\">\n\t<div class=\"header\">\n\t\t<a class=\"header-back\" href=\"javascript:;\" onclick=\"window.history.go(-1)\"><span class=\"fa fa-chevron-left\"></span> 返回</a>\n\t\t<p class=\"header-title\">{{title}}</p>\n\t</div>\n</div>\n";

/***/ },
/* 27 */,
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(29)
	__vue_script__ = __webpack_require__(31)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] shopping\\tpl\\goods.vue: named exports in *.vue files are ignored.")}
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
	  var id = "./goods.vue"
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
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./goods.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./goods.vue");
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
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\r\n.goods-img,.goods-img img{\r\n\twidth: 100%;\r\n}\r\n.goods-info{\r\n\tbackground: #fff;\r\n\tborder-bottom: 1px solid #eee;\r\n\tpadding: 5px 4%;\r\n\tmargin-bottom: 8px;\r\n}\r\n.goods-info-title{\r\n\tline-height: 1.5em;\r\n\tfont-size: 1.1rem;\r\n\tmargin-bottom: 8px;\r\n}\r\n.goods-info-desc{\r\n\tcolor: #999;\r\n\tfont-size: .8rem;\r\n\tmargin-bottom: 8px;\r\n}\r\n.goods-price{\r\n\tfont-size: .8rem;\r\n\tmargin-bottom: 10px;\r\n}\r\n.goods-price-now{\r\n\tmargin-right: 10px;\r\n}\r\n.goods-price-now b{\r\n\tfont-size: 1.2em;\r\n\tcolor: orangered;\r\n}\r\n.goods-price-original{\r\n\ttext-decoration: line-through;\r\n}\r\n.goods-buy{\r\n\tborder-top: 1px solid #eee;\r\n\tpadding-top: 10px;\r\n}\r\n.goods-detail{\r\n\tbackground: #fff;\r\n\tpadding: 5px 4%;\r\n}\r\n.goods-detail-t{\r\n\tborder-bottom: 1px solid #eee;\r\n\tpadding: 0 5px 5px;\r\n}\r\n.goods-detail-t span{\r\n\tborder-left: 3px solid #2BACC9;\r\n\tpadding-left: 8px;\r\n}\r\n.goods-detail-con{\r\n\tpadding: 5px 0;\r\n}\r\n.fixed{\r\n\tposition: fixed;\r\n\twidth: 100%; height: 100%;\r\n\tbackground: rgba(0,0,0,.5);\r\n\tleft: 0;\r\n\ttop: 0;\r\n}\r\n.goods-pop{\r\n\tposition: absolute;\r\n\tbackground: #fff;\r\n\twidth: 100%;\r\n\tleft: 0;\r\n\tbottom: 0;\r\n\tpadding: 50px 5% 10px;\r\n\tbox-sizing: border-box;\r\n}\r\n.goods-pop-img{\r\n\tposition: absolute;\r\n\twidth: 60px;\r\n\theight: 60px;\r\n\tpadding: 5px;\r\n\tleft: 5%;\r\n\ttop: -30px;\r\n\tbackground: #fff;\r\n}\r\n.goods-pop-img img{\r\n\twidth: 100%;\r\n\theight: 100%;\r\n}\r\n.goods-pop-chioce{\r\n\tfont-size: .8rem;\r\n}\r\n.goods-pop-chioce dt{\r\n\tfloat: left;\r\n\twidth: 3em;\r\n\ttext-align: right;\r\n}\r\n.goods-pop-chioce dd{\r\n\tmargin-left:3em;\r\n\tmargin-bottom: 10px;\r\n}\r\n.size{}\r\n.size span{\r\n\tborder: 1px solid #ccc;\r\n\tpadding: 5px 12px;\r\n\tdisplay: inline-block;\r\n\tmargin-bottom: 5px;\r\n\tmargin-right: 5px;\r\n}\r\n.size span.active{\r\n\tborder: 1px solid #42b8d3;\r\n\tcolor: #42b8d3;\r\n}\r\n.chioce-num{ font-size: 0;}\r\n.chioce-num input[type=button]{\r\n\twidth: 2em;\r\n\theight: 2em;\r\n\tfont-size: .8rem;\r\n\tborder: 1px solid #ccc;\r\n\tbackground: #e5e5e5;\r\n}\r\n.chioce-num input[type=text]{\r\n\twidth: 3em;\r\n\theight: 2em;\r\n\tfont-size: .8rem;\r\n\tborder: none;\r\n\tborder-top: 1px solid #ccc;\r\n\tborder-bottom: 1px solid #ccc;\r\n\tbackground: #fff;\r\n\ttext-align: center;\r\n\tbox-sizing: border-box;\r\n}\r\n\r\n", ""]);

	// exports


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Header = __webpack_require__(22);
	module.exports = {
		components: {
			"myHeader": Header
		},
		data: function data() {
			return {
				"title": "",
				"data": {},
				"size": {},
				"apiUrl": "api/goods.php",
				"apiSubmit": "api/order.php",
				"pop": 0,
				"sub": {
					"num": 1,
					"size": []
				}
			};
		},
		mounted: function mounted() {
			var goodid = this.$route.query.gid;
			this.sub.id = goodid;
			this.$http.get(this.apiUrl, { "params": { "id": goodid } }).then(function (response) {
				var objs = JSON.parse(response.data);
				if (!objs.error) {
					this.data = objs.datas;
					this.size = objs.datas.size;
					for (var i = 0; i < this.size.length; i++) {
						var size = { "name": this.size[i]["name"], "size": "" };
						this.sub.size.push(size);
					}
				} else {
					tips({ txt: "找不到该信息！" });
				}
			}, function (response) {
				tips({ txt: "获取失败,请稍候再试！" });
			});
		},
		methods: {
			buy: function buy() {
				this.pop == 0 ? this.pop = 1 : this.pop = 0;
			},
			add: function add() {
				this.sub.num = this.sub.num * 1 + 1;
			},
			minus: function minus() {
				if (this.sub.num > 1) {
					this.sub.num = this.sub.num * 1 - 1;
				}
			},
			chiocesize: function chiocesize(i, j) {
				var size = this.size[i]['value'][j];
				this.sub.size[i]['size'] = size;
			},
			buysub: function buysub() {
				for (var i = 0; i < this.sub.size.length; i++) {
					if (this.sub.size[i].size == '') {
						tips({ txt: '请选择' + this.sub.size[i].name });
						return false;
					}
				}
				this.$http.post(this.apiSubmit, this.sub).then(function (response) {
					location.href = '/order';
				}, function (response) {
					tips({ txt: '网络繁忙，请稍候再试！' });
				});
			}
		}
	};

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"body-main bg-grey\">\n\t<div>\n\t\t<my-header :title = \"title\"></my-header>\n\t</div>\n\t<div class=\"goods-img\"><img :src=\"data.thumb\" alt=\"\" /></div>\n\t<div class=\"goods-info\">\n\t\t<h2 class=\"goods-info-title\">{{data.title}}</h2>\n\t\t<p class=\"goods-info-desc\">{{data.sub_title}}</p>\n\t\t<div class=\"goods-price\">\n\t\t\t<span class=\"goods-price-now\">优惠价：<b>{{data.price}}</b></span>\n\t\t\t<span class=\"goods-price-original\">原价：{{data.originalprice}}</span>\n\t\t</div>\n\t\t<div class=\"goods-buy\"><a @click=\"buy\" class=\"btn btn-block btn-primary\">立即购买</a></div>\n\t</div>\n\t<div class=\"goods-detail\">\n\t\t<div class=\"goods-detail-t\"><span>商品介绍</span></div>\n\t\t<div class=\"goods-detail-con\" v-html=\"data.content\"></div>\n\t</div>\n\t<div class=\"fixed\" :class=\"{hide:!pop,show:pop}\">\n\t\t<div class=\"goods-pop\">\n\t\t\t<div class=\"goods-pop-img\"><img :src=\"data.thumb\"/></div>\n\t\t\t<a href=\"javascript:;\" class=\"close\" @click=\"buy\" style=\" position: absolute; right: 8px; top: 8px;\"></a>\n\t\t\t<dl class=\"goods-pop-chioce\" v-for=\"(v, i) in size\">\n\t\t\t\t<dt>{{v.name}}：</dt>\n\t\t\t\t<dd class=\"size\">\n\t\t\t\t\t<span v-for=\"(s, j) in v.value\" @click=\"chiocesize(i,j)\" :class=\"{active:s==sub.size[i].size}\">{{s}}</span>\n\t\t\t\t</dd>\n\t\t\t</dl>\n\t\t\t<dl class=\"goods-pop-chioce\">\n\t\t\t\t<dt>数量：</dt>\n\t\t\t\t<dd class=\"chioce-num\">\n\t\t\t\t\t<input type=\"button\" @click=\"minus\" value=\"-\" />\n\t\t\t\t\t<input type=\"text\" :value=\"sub.num\" readonly=\"readonly\" />\n\t\t\t\t\t<input type=\"button\" @click=\"add\" value=\"+\" />\n\t\t\t\t</dd>\n\t\t\t</dl>\n\t\t\t<div class=\"goods-buy\"><a @click=\"buysub\" class=\"btn btn-block btn-primary\">立即购买</a></div>\n\t\t</div>\n\t</div>\n</div>\n";

/***/ }
]);