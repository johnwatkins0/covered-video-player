(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["CoveredVideoPlayer"] = factory();
	else
		root["CoveredVideoPlayer"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CoveredVideoPlayer = function () {
  function CoveredVideoPlayer(props) {
    _classCallCheck(this, CoveredVideoPlayer);

    this.setUp(props);

    this.appendSourceToVideoElement = this.appendSourceToVideoElement.bind(this);
    this.handleVideoClick = this.handleVideoClick.bind(this);

    this.run();
  }

  _createClass(CoveredVideoPlayer, [{
    key: 'run',
    value: function run() {
      if (this.shouldRender()) {
        this.putStylesInHead();
        this.render();
        this.addEventListeners();
      } else {
        this.maybeRenderFallback();
      }
    }
  }, {
    key: 'setUp',
    value: function setUp(_ref) {
      var selector = _ref.selector,
          src = _ref.src,
          controls = _ref.controls,
          loop = _ref.loop,
          cover = _ref.cover,
          coverClass = _ref.coverClass,
          videoContainerClass = _ref.videoContainerClass,
          muted = _ref.muted,
          fallbackCover = _ref.fallbackCover;

      try {
        this.selector = selector;
        this.root = document.querySelector(selector);
        this.cover = cover || this.root.innerHTML;
        this.fallbackCover = fallbackCover || '';
        this.coverClass = coverClass || 'CoveredVideoPlayer__cover';
        this.videoContainerClass = videoContainerClass || 'CoveredVideoPlayer__video';
        this.src = src;
        this.controls = typeof controls === 'undefined' ? true : controls;
        this.loop = typeof loop === 'undefined' ? false : loop;
        this.muted = typeof muted === 'undefined' ? true : muted;
      } catch (e) {
        this.maybeRenderFallback();
      }
    }
  }, {
    key: 'putStylesInHead',
    value: function putStylesInHead() {
      var styles = document.createElement('STYLE');

      styles.innerHTML = '\n      ' + this.selector + ' {\n        position: relative;\n      }\n\n      .' + this.coverClass + ' {\n        position: absolute;\n        top: 0;\n        right: 0;\n        bottom: 0;\n        left: 0;\n        z-index: 2;\n        transition: opacity .4s;\n        background: none;\n        border: none;\n        display: block;\n        width: 100%;\n        pointer-events: none;\n      }\n\n      ' + this.selector + '.playing .' + this.coverClass + ' {\n        display: none;\n      }\n\n      @supports (opacity: 0) {\n        ' + this.selector + '.playing .' + this.coverClass + ' {\n          display: block;\n          opacity: 0;\n        }\n      }\n\n      .' + this.videoContainerClass + ' video {\n        width: 100%;\n        height: auto;\n        position: relative;\n        z-index: 1;\n        cursor: pointer;\n      }\n    ';

      document.querySelector('head').appendChild(styles);
    }
  }, {
    key: 'shouldRender',
    value: function shouldRender() {
      return 'HTMLVideoElement' in window && 'CSS' in window && 'supports' in CSS && CSS.supports('pointer-events', 'none') && this.root && this.src.length;
    }
  }, {
    key: 'handleVideoClick',
    value: function handleVideoClick(event) {
      event.preventDefault(); // Some browsers have default video.pause() behavior.

      if (this.videoElement.paused === true) {
        this.videoElement.play();
      } else {
        this.videoElement.pause();
      }
    }
  }, {
    key: 'addEventListeners',
    value: function addEventListeners() {
      var _this = this;

      this.videoElement.addEventListener('click', this.handleVideoClick);
      this.videoElement.addEventListener('touchstart', this.handleVideoClick);
      this.coverElement.addEventListener('keypress', this.handleVideoClick);

      this.videoElement.addEventListener('play', function () {
        _this.root.classList.add('playing');
      });

      this.videoElement.addEventListener('pause', function () {
        _this.root.classList.remove('playing');
      });

      if (this.loop) {
        this.videoElement.addEventListener('ended', function () {
          _this.root.classList.remove('playing');
        });
      }
    }
  }, {
    key: 'appendSourceToVideoElement',
    value: function appendSourceToVideoElement(src) {
      try {
        var sourceElement = document.createElement('SOURCE');
        sourceElement.setAttribute('src', src.url);
        sourceElement.setAttribute('type', src.type);
        this.videoElement.appendChild(sourceElement);
      } catch (e) {
        // Do nothing.
      }
    }
  }, {
    key: 'maybeRenderFallback',
    value: function maybeRenderFallback() {
      if (this.root && (this.fallbackCover.length || this.cover.length)) {
        this.root.classList.add('fallback');
        this.root.innerHTML = this.fallbackCover || this.cover;
      }
    }
  }, {
    key: 'createVideoElement',
    value: function createVideoElement() {
      this.videoElement = document.createElement('VIDEO');
      this.videoElement.setAttribute('controls', this.controls);
      this.videoElement.setAttribute('loop', this.loop);
      this.videoElement.setAttribute('muted', this.muted);
      [].concat(_toConsumableArray(this.src)).forEach(this.appendSourceToVideoElement);
    }
  }, {
    key: 'createCoverElement',
    value: function createCoverElement() {
      this.coverElement = document.createElement('BUTTON');
      this.coverElement.innerHTML = this.cover;
      this.coverElement.setAttribute('class', '' + this.coverClass);
    }
  }, {
    key: 'createVideoContainer',
    value: function createVideoContainer() {
      this.videoContainer = document.createElement('DIV');
      this.videoContainer.appendChild(this.videoElement);
      this.videoContainer.setAttribute('class', '' + this.videoContainerClass);
    }
  }, {
    key: 'render',
    value: function render() {
      this.createVideoElement();
      this.createCoverElement();
      this.createVideoContainer();

      this.root.innerHTML = '';
      this.root.appendChild(this.coverElement);
      this.root.appendChild(this.videoContainer);
    }
  }]);

  return CoveredVideoPlayer;
}();

exports.default = CoveredVideoPlayer;

/***/ })
/******/ ]);
});
//# sourceMappingURL=covered-video-player.js.map