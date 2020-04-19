(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~init"],{

/***/ "./node_modules/abs-svg-path/index.js":
/*!********************************************!*\
  !*** ./node_modules/abs-svg-path/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


module.exports = absolutize

/**
 * redefine `path` with absolute coordinates
 *
 * @param {Array} path
 * @return {Array}
 */

function absolutize(path){
	var startX = 0
	var startY = 0
	var x = 0
	var y = 0

	return path.map(function(seg){
		seg = seg.slice()
		var type = seg[0]
		var command = type.toUpperCase()

		// is relative
		if (type != command) {
			seg[0] = command
			switch (type) {
				case 'a':
					seg[6] += x
					seg[7] += y
					break
				case 'v':
					seg[1] += y
					break
				case 'h':
					seg[1] += x
					break
				default:
					for (var i = 1; i < seg.length;) {
						seg[i++] += x
						seg[i++] += y
					}
			}
		}

		// update cursor state
		switch (command) {
			case 'Z':
				x = startX
				y = startY
				break
			case 'H':
				x = seg[1]
				break
			case 'V':
				y = seg[1]
				break
			case 'M':
				x = startX = seg[1]
				y = startY = seg[2]
				break
			default:
				x = seg[seg.length - 2]
				y = seg[seg.length - 1]
		}

		return seg
	})
}


/***/ }),

/***/ "./node_modules/animation-frame-delta/app/dist/animationFrameDelta.js":
/*!****************************************************************************!*\
  !*** ./node_modules/animation-frame-delta/app/dist/animationFrameDelta.js ***!
  \****************************************************************************/
/*! exports provided: subscribe, default, ignoreUnsubscriptionError, unsubscribe, stats */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribe", function() { return subscribe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ignoreUnsubscriptionError", function() { return ignoreUnsubscriptionError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unsubscribe", function() { return unsubscribe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stats", function() { return stats; });
const now = performance.now.bind(performance);
const subscriptions = [];
const elapsingSubscriptions = [];
const initalElapsingSubscriptions = [];
function sub(func, elapseIn, iterations, iterateTimestamp, inIteration, begin) {
    if (elapseIn) {
        if (iterateTimestamp || begin === undefined)
            initalElapsingSubscriptions.push(func);
        else
            elapsingSubscriptions.push({ begin, func });
        setTimeout(() => {
            if (iterations > 1)
                requestAnimationFrame(() => {
                    sub(func, elapseIn, iterations, iterateTimestamp, inIteration, begin);
                });
            let index = findIndexOfElapsingSubscriptionsFunc(func);
            if (index === -1)
                return;
            let { begin } = elapsingSubscriptions[index];
            elapsingSubscriptions.splice(index, 1);
            let elapsed = inIteration * elapseIn;
            let timestamp = begin + elapsed;
            let absoluteDelta = timestamp - lastTimestamp;
            func(elapsed, absoluteDelta * ivertOfAbsoluteDeltaAt60FPS, timestamp, absoluteDelta);
            iterations--;
            inIteration++;
        }, elapseIn - 1); // setTimout is only 1ms accurate. In an edge case it is better to drop one frame instead of execute one too many
    }
    else
        subscriptions.push(func);
    return func;
}
function subscribe(func, elapseIn, iterations = 1, iterateTimestamp = false) {
    return sub(func, elapseIn, iterations, iterateTimestamp, 1);
}
/* harmony default export */ __webpack_exports__["default"] = (subscribe);
let ignore = false;
function ignoreUnsubscriptionError(to = true) {
    ignore = to;
}
function findIndexOfElapsingSubscriptionsFunc(func) {
    let at = -1;
    for (let i = 0; i < elapsingSubscriptions.length; i++) {
        if (elapsingSubscriptions[i].func === func) {
            at = i;
            break;
        }
    }
    return at;
}
function unsubscribe(func) {
    let at = findIndexOfElapsingSubscriptionsFunc(func);
    if (at !== -1)
        elapsingSubscriptions.splice(at, 1);
    else {
        at = subscriptions.indexOf(func);
        if (at !== -1)
            subscriptions.splice(at, 1);
        else {
            at = initalElapsingSubscriptions.indexOf(func);
            if (at !== -1)
                subscriptions.splice(at, 1);
            else if (!ignore)
                throw new Error("Invalid request to unsubscribe. Given function is not subscribed.\n\nTo ignore this error globally please call \"reqaf.ignoreUnsubscriptionError()\".\n");
        }
    }
}
const ivertOfAbsoluteDeltaAt60FPS = 60 / 1000;
const stats = {
    delta: 1,
    absoluteDelta: 1 / ivertOfAbsoluteDeltaAt60FPS,
    timestamp: 0
};
let index; // to prevent GC
let lastTimestamp = now();
let timestamp;
let currentSubscriptions;
let currentElapsingSubscriptions;
let currentAnything;
let currentTimestamp;
const loop = () => {
    currentTimestamp = timestamp = now();
    stats.absoluteDelta = timestamp - lastTimestamp;
    lastTimestamp = stats.timestamp = timestamp;
    stats.delta = stats.absoluteDelta * ivertOfAbsoluteDeltaAt60FPS;
    for (; 0 !== initalElapsingSubscriptions.length;) {
        elapsingSubscriptions.push({ begin: currentTimestamp, func: initalElapsingSubscriptions[0] });
        initalElapsingSubscriptions.splice(0, 1);
    }
    //clone to ensure that no subscriptions are added during (inside) one
    currentSubscriptions = [...subscriptions];
    currentElapsingSubscriptions = [...elapsingSubscriptions];
    for (index = 0; index < currentSubscriptions.length; index++) {
        currentSubscriptions[index](stats.delta, stats.timestamp, stats.absoluteDelta);
    }
    for (index = 0; index < currentElapsingSubscriptions.length; index++) {
        currentAnything = currentElapsingSubscriptions[index];
        currentAnything.func(currentTimestamp - currentAnything.begin, stats.delta, stats.timestamp, stats.absoluteDelta);
    }
    requestAnimationFrame(loop);
};
requestAnimationFrame(loop);


/***/ }),

/***/ "./node_modules/attatch-to-prototype/app/dist/attatchToPrototype.js":
/*!**************************************************************************!*\
  !*** ./node_modules/attatch-to-prototype/app/dist/attatchToPrototype.js ***!
  \**************************************************************************/
/*! exports provided: constructAttatchToPrototype, default, constructApplyToPrototype */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "constructAttatchToPrototype", function() { return constructAttatchToPrototype; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "constructApplyToPrototype", function() { return constructApplyToPrototype; });
/* harmony import */ var tiny_clone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tiny-clone */ "./node_modules/tiny-clone/app/dist/tinyClone.js");

function constructAttatchToPrototype(prototype, defaultOptions = { enumerable: false, configurable: true }) {
    let options = Object(tiny_clone__WEBPACK_IMPORTED_MODULE_0__["default"])(defaultOptions);
    return function (name, func) {
        let ob;
        if (typeof func === "function") {
            ob = Object(tiny_clone__WEBPACK_IMPORTED_MODULE_0__["default"])(options);
            ob.value = func;
        }
        else {
            ob = Object(tiny_clone__WEBPACK_IMPORTED_MODULE_0__["default"])(options);
            for (const k in func) {
                ob[k] = func[k];
            }
        }
        if (name instanceof Array) {
            for (let i = 0; i < name.length; i++) {
                appendToPrototype(name[i], ob);
            }
        }
        else
            appendToPrototype(name, ob);
    };
    function appendToPrototype(name, ob) {
        Object.defineProperty(prototype, name, ob);
    }
}
/* harmony default export */ __webpack_exports__["default"] = (constructAttatchToPrototype);
function constructApplyToPrototype(prototype, defaultOptions = { enumerable: false, configurable: true }) {
    let options = Object(tiny_clone__WEBPACK_IMPORTED_MODULE_0__["default"])(defaultOptions);
    return function (name, func) {
        let ob;
        if (typeof func === "function") {
            ob = Object(tiny_clone__WEBPACK_IMPORTED_MODULE_0__["default"])(options);
            ob.value = func;
        }
        else {
            ob = Object(tiny_clone__WEBPACK_IMPORTED_MODULE_0__["default"])(options);
            ob.value = function (...values) {
                if (values.length !== 0)
                    func.set.apply(this, values);
                else
                    return func.get.call(this);
                return this;
            };
        }
        if (name instanceof Array) {
            for (let i = 0; i < name.length; i++) {
                appendToPrototype(name[i], ob);
            }
        }
        else
            appendToPrototype(name, ob);
    };
    function appendToPrototype(name, ob) {
        Object.defineProperty(prototype, name, ob);
    }
}


/***/ }),

/***/ "./node_modules/bezier-easing/src/index.js":
/*!*************************************************!*\
  !*** ./node_modules/bezier-easing/src/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * https://github.com/gre/bezier-easing
 * BezierEasing - use bezier curve for transition easing function
 * by Gaëtan Renaudeau 2014 - 2015 – MIT License
 */

// These values are established by empiricism with tests (tradeoff: performance VS precision)
var NEWTON_ITERATIONS = 4;
var NEWTON_MIN_SLOPE = 0.001;
var SUBDIVISION_PRECISION = 0.0000001;
var SUBDIVISION_MAX_ITERATIONS = 10;

var kSplineTableSize = 11;
var kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);

var float32ArraySupported = typeof Float32Array === 'function';

function A (aA1, aA2) { return 1.0 - 3.0 * aA2 + 3.0 * aA1; }
function B (aA1, aA2) { return 3.0 * aA2 - 6.0 * aA1; }
function C (aA1)      { return 3.0 * aA1; }

// Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
function calcBezier (aT, aA1, aA2) { return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT; }

// Returns dx/dt given t, x1, and x2, or dy/dt given t, y1, and y2.
function getSlope (aT, aA1, aA2) { return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1); }

function binarySubdivide (aX, aA, aB, mX1, mX2) {
  var currentX, currentT, i = 0;
  do {
    currentT = aA + (aB - aA) / 2.0;
    currentX = calcBezier(currentT, mX1, mX2) - aX;
    if (currentX > 0.0) {
      aB = currentT;
    } else {
      aA = currentT;
    }
  } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);
  return currentT;
}

function newtonRaphsonIterate (aX, aGuessT, mX1, mX2) {
 for (var i = 0; i < NEWTON_ITERATIONS; ++i) {
   var currentSlope = getSlope(aGuessT, mX1, mX2);
   if (currentSlope === 0.0) {
     return aGuessT;
   }
   var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
   aGuessT -= currentX / currentSlope;
 }
 return aGuessT;
}

function LinearEasing (x) {
  return x;
}

module.exports = function bezier (mX1, mY1, mX2, mY2) {
  if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) {
    throw new Error('bezier x values must be in [0, 1] range');
  }

  if (mX1 === mY1 && mX2 === mY2) {
    return LinearEasing;
  }

  // Precompute samples table
  var sampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);
  for (var i = 0; i < kSplineTableSize; ++i) {
    sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
  }

  function getTForX (aX) {
    var intervalStart = 0.0;
    var currentSample = 1;
    var lastSample = kSplineTableSize - 1;

    for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
      intervalStart += kSampleStepSize;
    }
    --currentSample;

    // Interpolate to provide an initial guess for t
    var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
    var guessForT = intervalStart + dist * kSampleStepSize;

    var initialSlope = getSlope(guessForT, mX1, mX2);
    if (initialSlope >= NEWTON_MIN_SLOPE) {
      return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
    } else if (initialSlope === 0.0) {
      return guessForT;
    } else {
      return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
    }
  }

  return function BezierEasing (x) {
    // Because JavaScript number are imprecise, we should guarantee the extremes are right.
    if (x === 0) {
      return 0;
    }
    if (x === 1) {
      return 1;
    }
    return calcBezier(getTForX(x), mY1, mY2);
  };
};


/***/ }),

/***/ "./node_modules/dash-camelcase/dist/dash-camelcase.js":
/*!************************************************************!*\
  !*** ./node_modules/dash-camelcase/dist/dash-camelcase.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function camelCaseToDash(camelCaseString, joinWith = "-") {
    return camelCaseString.replace(/([a-z])([A-Z])/g, "$1" + joinWith + "$2").toLowerCase();
}
exports.camelCaseToDash = camelCaseToDash;
function toUpper(match, group1) {
    return group1 ? group1.toUpperCase() : '';
}
var DEFAULT_REGEX = /[-_]+(.)?/g;
function dashToCamelCase(dashString, splitAt) {
    return dashString.replace(splitAt ? new RegExp('[' + splitAt + ']+(.)', 'g') : DEFAULT_REGEX, toUpper);
}
exports.dashToCamelCase = dashToCamelCase;


/***/ }),

/***/ "./node_modules/decompose-dommatrix/dist/decomposeDOMMatrix.js":
/*!*********************************************************************!*\
  !*** ./node_modules/decompose-dommatrix/dist/decomposeDOMMatrix.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else {}
})(window, function() {
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./decomposeDommatrix.mjs");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./decomposeDommatrix.mjs":
/*!********************************!*\
  !*** ./decomposeDommatrix.mjs ***!
  \********************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return decomposeDOMMatrix; });\n/* harmony import */ var _decomposeMatrix_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./decomposeMatrix.mjs */ \"./decomposeMatrix.mjs\");\n/*\n\nDOMMatrix is column major, meaning:\n _               _\n| m11 m21 m31 m41 |  \n  m12 m22 m32 m42\n  m13 m23 m33 m43\n  m14 m24 m34 m44\n|_               _|\n\n*/\n\n\n\nfunction decomposeDOMMatrix(domMatrix) {\n\tconst indexableVersionOfMatrix = new Array(4);\n\tfor (let columnIndex = 1; columnIndex < 5; columnIndex++) {\n\t\tconst columnArray = indexableVersionOfMatrix[columnIndex - 1] = new Array(4);\n\t\tfor (let rowIndex = 1; rowIndex < 5; rowIndex++) {\n\t\t\tcolumnArray[rowIndex - 1] = domMatrix[`m${columnIndex}${rowIndex}`];\n\t\t}\n\t}\n\n\treturn Object(_decomposeMatrix_mjs__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(indexableVersionOfMatrix);\n}\n\n//# sourceURL=webpack://decomposeDOMMatrix/./decomposeDommatrix.mjs?");

/***/ }),

/***/ "./decomposeMatrix.mjs":
/*!*****************************!*\
  !*** ./decomposeMatrix.mjs ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return decomposeMatrix; });\n/* harmony import */ var _vectorFunctions_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vectorFunctions.mjs */ \"./vectorFunctions.mjs\");\n/* harmony import */ var _roundToThreePlaces_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./roundToThreePlaces.mjs */ \"./roundToThreePlaces.mjs\");\n/* harmony import */ var _quaternionToDegreesXYZ_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./quaternionToDegreesXYZ.mjs */ \"./quaternionToDegreesXYZ.mjs\");\n/*\n\nthis code is copied from https://github.com/facebook/react-native/blob/master/Libraries/Utilities/MatrixMath.js#L572 and modified\nfor some clarity and being able to work standalone. Expects the matrix to be a 4-element array of 4-element arrays of numbers.\n\n[\n    [column1 row1 value, column1 row2 value, column1 row3 value],\n    [column2 row1 value, column2 row2 value, column2 row3 value],\n    [column3 row1 value, column3 row2 value, column3 row3 value],\n    [column4 row1 value, column4 row2 value, column4 row3 value]\n]\n\n*/\n\n\n\n\n\nconst RAD_TO_DEG = 180 / Math.PI;\n\nfunction decomposeMatrix(matrix) {\n\tconst quaternion = new Array(4);\n\tconst scale = new Array(3);\n\tconst skew = new Array(3);\n\tconst translation = new Array(3);\n\n\t// translation is simple\n\t// it's the first 3 values in the last column\n\t// i.e. m41 is X translation, m42 is Y and m43 is Z\n\tfor (let i = 0; i < 3; i++) {\n\t\ttranslation[i] = matrix[3][i];\n\t}\n\n\t// Now get scale and shear.\n\tconst normalizedColumns = new Array(3);\n\tfor (let columnIndex = 0; columnIndex < 3; columnIndex++) {\n\t\tnormalizedColumns[columnIndex] = matrix[columnIndex].slice(0, 3);\n\t}\n\n\t// Compute X scale factor and normalize first row.\n\tscale[0] = _vectorFunctions_mjs__WEBPACK_IMPORTED_MODULE_0__[\"length\"](normalizedColumns[0]);\n\tnormalizedColumns[0] = _vectorFunctions_mjs__WEBPACK_IMPORTED_MODULE_0__[\"normalize\"](normalizedColumns[0], scale[0]);\n\n\t// Compute XY shear factor and make 2nd row orthogonal to 1st.\n\tskew[0] = _vectorFunctions_mjs__WEBPACK_IMPORTED_MODULE_0__[\"dotProduct\"](normalizedColumns[0], normalizedColumns[1]);\n\tnormalizedColumns[1] = _vectorFunctions_mjs__WEBPACK_IMPORTED_MODULE_0__[\"linearCombination\"](normalizedColumns[1], normalizedColumns[0], 1.0, -skew[0]);\n\n\t// Now, compute Y scale and normalize 2nd row.\n\tscale[1] = _vectorFunctions_mjs__WEBPACK_IMPORTED_MODULE_0__[\"length\"](normalizedColumns[1]);\n\tnormalizedColumns[1] = _vectorFunctions_mjs__WEBPACK_IMPORTED_MODULE_0__[\"normalize\"](normalizedColumns[1], scale[1]);\n\tskew[0] /= scale[1];\n\n\t// Compute XZ and YZ shears, orthogonalize 3rd row\n\tskew[1] = _vectorFunctions_mjs__WEBPACK_IMPORTED_MODULE_0__[\"dotProduct\"](normalizedColumns[0], normalizedColumns[2]);\n\tnormalizedColumns[2] = _vectorFunctions_mjs__WEBPACK_IMPORTED_MODULE_0__[\"linearCombination\"](normalizedColumns[2], normalizedColumns[0], 1.0, -skew[1]);\n\tskew[2] = _vectorFunctions_mjs__WEBPACK_IMPORTED_MODULE_0__[\"dotProduct\"](normalizedColumns[1], normalizedColumns[2]);\n\tnormalizedColumns[2] = _vectorFunctions_mjs__WEBPACK_IMPORTED_MODULE_0__[\"linearCombination\"](normalizedColumns[2], normalizedColumns[1], 1.0, -skew[2]);\n\n\t// Next, get Z scale and normalize 3rd row.\n\tscale[2] = _vectorFunctions_mjs__WEBPACK_IMPORTED_MODULE_0__[\"length\"](normalizedColumns[2]);\n\tnormalizedColumns[2] = _vectorFunctions_mjs__WEBPACK_IMPORTED_MODULE_0__[\"normalize\"](normalizedColumns[2], scale[2]);\n\tskew[1] /= scale[2];\n\tskew[2] /= scale[2];\n\n\t// At this point, the matrix defined in normalizedColumns is orthonormal.\n\t// Check for a coordinate system flip.  If the determinant\n\t// is -1, then negate the matrix and the scaling factors.\n\tconst pdum3 = _vectorFunctions_mjs__WEBPACK_IMPORTED_MODULE_0__[\"crossProduct\"](normalizedColumns[1], normalizedColumns[2]);\n\tif (_vectorFunctions_mjs__WEBPACK_IMPORTED_MODULE_0__[\"dotProduct\"](normalizedColumns[0], pdum3) < 0) {\n\t\tfor (let i = 0; i < 3; i++) {\n\t\t\tscale[i] *= -1;\n\t\t\tnormalizedColumns[i][0] *= -1;\n\t\t\tnormalizedColumns[i][1] *= -1;\n\t\t\tnormalizedColumns[i][2] *= -1;\n\t\t}\n\t}\n\n\t// Now, get the rotations out\n\tquaternion[0] =\n\t\t0.5 * Math.sqrt(Math.max(1 + normalizedColumns[0][0] - normalizedColumns[1][1] - normalizedColumns[2][2], 0));\n\tquaternion[1] =\n\t\t0.5 * Math.sqrt(Math.max(1 - normalizedColumns[0][0] + normalizedColumns[1][1] - normalizedColumns[2][2], 0));\n\tquaternion[2] =\n\t\t0.5 * Math.sqrt(Math.max(1 - normalizedColumns[0][0] - normalizedColumns[1][1] + normalizedColumns[2][2], 0));\n\tquaternion[3] =\n\t\t0.5 * Math.sqrt(Math.max(1 + normalizedColumns[0][0] + normalizedColumns[1][1] + normalizedColumns[2][2], 0));\n\n\tif (normalizedColumns[2][1] > normalizedColumns[1][2]) {\n\t\tquaternion[0] = -quaternion[0];\n\t}\n\tif (normalizedColumns[0][2] > normalizedColumns[2][0]) {\n\t\tquaternion[1] = -quaternion[1];\n\t}\n\tif (normalizedColumns[1][0] > normalizedColumns[0][1]) {\n\t\tquaternion[2] = -quaternion[2];\n\t}\n\n\t// correct for occasional, weird Euler synonyms for 2d rotation\n\tlet rotationDegrees;\n\tif (\n\t\tquaternion[0] < 0.001 &&\n\t\tquaternion[0] >= 0 &&\n\t\tquaternion[1] < 0.001 &&\n\t\tquaternion[1] >= 0\n\t) {\n\t\t// this is a 2d rotation on the z-axis\n\t\trotationDegrees = [\n\t\t\t0,\n\t\t\t0,\n\t\t\tObject(_roundToThreePlaces_mjs__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(\n\t\t\t\t(Math.atan2(normalizedColumns[0][1], normalizedColumns[0][0]) * 180) / Math.PI\n\t\t\t)\n\t\t];\n\t} else {\n\t\trotationDegrees = Object(_quaternionToDegreesXYZ_mjs__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(quaternion);\n\t}\n\n\t// expose both base data and convenience names\n\treturn {\n\t\trotateX: rotationDegrees[0],\n\t\trotateY: rotationDegrees[1],\n\t\trotateZ: rotationDegrees[2],\n\t\tscaleX: Object(_roundToThreePlaces_mjs__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(scale[0]),\n\t\tscaleY: Object(_roundToThreePlaces_mjs__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(scale[1]),\n\t\tscaleZ: Object(_roundToThreePlaces_mjs__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(scale[2]),\n\t\ttranslateX: translation[0],\n\t\ttranslateY: translation[1],\n\t\ttranslateZ: translation[2],\n\t\tskewXY: Object(_roundToThreePlaces_mjs__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(skew[0]) * RAD_TO_DEG,\n\t\tskewXZ: Object(_roundToThreePlaces_mjs__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(skew[1]) * RAD_TO_DEG,\n\t\tskewYZ: Object(_roundToThreePlaces_mjs__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(skew[2] * RAD_TO_DEG)\n\t};\n}\n\n//# sourceURL=webpack://decomposeDOMMatrix/./decomposeMatrix.mjs?");

/***/ }),

/***/ "./quaternionToDegreesXYZ.mjs":
/*!************************************!*\
  !*** ./quaternionToDegreesXYZ.mjs ***!
  \************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return quaternionToDegreesXYZ; });\n/* harmony import */ var _roundToThreePlaces_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./roundToThreePlaces.mjs */ \"./roundToThreePlaces.mjs\");\n/*\n\n copied from: https://github.com/facebook/react-native/blob/master/Libraries/Utilities/MatrixMath.js\n\n*/\n\n\n\n\nconst RAD_TO_DEG = 180 / Math.PI;\n\nfunction quaternionToDegreesXYZ(quaternion) {\n\n\tconst [qx, qy, qz, qw] = quaternion;\n\tconst qw2 = qw * qw;\n\tconst qx2 = qx * qx;\n\tconst qy2 = qy * qy;\n\tconst qz2 = qz * qz;\n\tconst test = qx * qy + qz * qw;\n\tconst unit = qw2 + qx2 + qy2 + qz2;\n\n\tif (test > 0.49999 * unit) {\n\t  return [0, 2 * Math.atan2(qx, qw) * RAD_TO_DEG, 90];\n\t}\n\tif (test < -0.49999 * unit) {\n\t  return [0, -2 * Math.atan2(qx, qw) * RAD_TO_DEG, -90];\n\t}\n\n\treturn [\n\t  Object(_roundToThreePlaces_mjs__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(\n\t\tMath.atan2(2 * qx * qw - 2 * qy * qz, 1 - 2 * qx2 - 2 * qz2) * RAD_TO_DEG,\n\t  ),\n\t  Object(_roundToThreePlaces_mjs__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(\n\t\tMath.atan2(2 * qy * qw - 2 * qx * qz, 1 - 2 * qy2 - 2 * qz2) * RAD_TO_DEG,\n\t  ),\n\t  Object(_roundToThreePlaces_mjs__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(Math.asin(2 * qx * qy + 2 * qz * qw) * RAD_TO_DEG),\n\t];\n\n}\n\n//# sourceURL=webpack://decomposeDOMMatrix/./quaternionToDegreesXYZ.mjs?");

/***/ }),

/***/ "./roundToThreePlaces.mjs":
/*!********************************!*\
  !*** ./roundToThreePlaces.mjs ***!
  \********************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return roundToThreePlaces; });\n/*\n\nfrom https://github.com/facebook/react-native/blob/master/Libraries/Utilities/MatrixMath.js\n\n*/ \n\nfunction roundToThreePlaces(number){\n    const arr = number.toString().split('e');\n    return Math.round(arr[0] + 'e' + (arr[1] ? +arr[1] - 3 : 3)) * 0.001;\n}\n\n//# sourceURL=webpack://decomposeDOMMatrix/./roundToThreePlaces.mjs?");

/***/ }),

/***/ "./vectorFunctions.mjs":
/*!*****************************!*\
  !*** ./vectorFunctions.mjs ***!
  \*****************************/
/*! exports provided: length, normalize, dotProduct, crossProduct, linearCombination */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"length\", function() { return length; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"normalize\", function() { return normalize; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"dotProduct\", function() { return dotProduct; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"crossProduct\", function() { return crossProduct; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"linearCombination\", function() { return linearCombination; });\n/*\n\n copied from https://github.com/facebook/react-native/blob/master/Libraries/Utilities/MatrixMath.js#L572\n\n vectors are just arrays of numbers\n\n*/\n\nfunction length(vector) {\n    return Math.sqrt(\n        vector[0] * vector[0] + \n        vector[1] * vector[1] + \n        vector[2] * vector[2]\n    );\n}\n\nfunction normalize(vector, preComputedVectorLength) {\n    return [\n        vector[0]/preComputedVectorLength, \n        vector[1]/preComputedVectorLength,\n        vector[2]/preComputedVectorLength\n    ];\n}\n\nfunction dotProduct(vectorA, vectorB) {\n    return (\n        vectorA[0] * vectorB[0] +\n        vectorA[1] * vectorB[1] +\n        vectorA[2] * vectorB[2]\n    );\n}\n\nfunction crossProduct(vectorA, vectorB) {\n    return [\n        vectorA[1] * vectorB[2] - vectorA[2] * vectorB[1],\n        vectorA[2] * vectorB[0] - vectorA[0] * vectorB[2],\n        vectorA[0] * vectorB[1] - vectorA[1] * vectorB[0]\n    ];\n}\n\nfunction linearCombination(vectorA, vectorB, aScaleFactor, bScaleFactor) {\n    return [\n        vectorA[0] * aScaleFactor + vectorB[0] * bScaleFactor,\n        vectorA[1] * aScaleFactor + vectorB[1] * bScaleFactor,\n        vectorA[2] * aScaleFactor + vectorB[2] * bScaleFactor\n    ];\n}\n\n//# sourceURL=webpack://decomposeDOMMatrix/./vectorFunctions.mjs?");

/***/ })

/******/ });
});

/***/ }),

/***/ "./node_modules/delay/index.js":
/*!*************************************!*\
  !*** ./node_modules/delay/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const createAbortError = () => {
	const error = new Error('Delay aborted');
	error.name = 'AbortError';
	return error;
};

const createDelay = ({clearTimeout: defaultClear, setTimeout: set, willResolve}) => (ms, {value, signal} = {}) => {
	if (signal && signal.aborted) {
		return Promise.reject(createAbortError());
	}

	let timeoutId;
	let settle;
	let rejectFn;
	const clear = defaultClear || clearTimeout;

	const signalListener = () => {
		clear(timeoutId);
		rejectFn(createAbortError());
	};

	const cleanup = () => {
		if (signal) {
			signal.removeEventListener('abort', signalListener);
		}
	};

	const delayPromise = new Promise((resolve, reject) => {
		settle = () => {
			cleanup();
			if (willResolve) {
				resolve(value);
			} else {
				reject(value);
			}
		};

		rejectFn = reject;
		timeoutId = (set || setTimeout)(settle, ms);
	});

	if (signal) {
		signal.addEventListener('abort', signalListener, {once: true});
	}

	delayPromise.clear = () => {
		clear(timeoutId);
		timeoutId = null;
		cleanup();
		settle();
	};

	return delayPromise;
};

const delay = createDelay({willResolve: true});
delay.reject = createDelay({willResolve: false});
delay.createWithTimers = ({clearTimeout, setTimeout}) => {
	const delay = createDelay({clearTimeout, setTimeout, willResolve: true});
	delay.reject = createDelay({clearTimeout, setTimeout, willResolve: false});
	return delay;
};

module.exports = delay;
// TODO: Remove this for the next major release
module.exports.default = delay;


/***/ }),

/***/ "./node_modules/extended-dom/app/dist/components/elementList.js":
/*!**********************************************************************!*\
  !*** ./node_modules/extended-dom/app/dist/components/elementList.js ***!
  \**********************************************************************/
/*! exports provided: ElementList, initPrototype */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ElementList", function() { return ElementList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initPrototype", function() { return initPrototype; });
/* harmony import */ var front_db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! front-db */ "./node_modules/front-db/app/dist/f-db.js");
/* harmony import */ var delay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! delay */ "./node_modules/delay/index.js");
/* harmony import */ var delay__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(delay__WEBPACK_IMPORTED_MODULE_1__);


class InternalElementList extends Array {
    constructor(...elems) {
        super(...elems);
    }
    async anim(frame_frames, options, guidance_stagger, stagger) {
        this.warn("anim");
        if (!(guidance_stagger instanceof front_db__WEBPACK_IMPORTED_MODULE_0__["Data"])) {
            stagger = guidance_stagger;
            guidance_stagger = undefined;
        }
        if (stagger) {
            let awaitForAnimationDuration = stagger === true;
            if (awaitForAnimationDuration) {
                for (let e of this) {
                    await e.anim(frame_frames, options, guidance_stagger);
                }
            }
            else {
                for (let i = 0; i < this.length; i++) {
                    if (i !== this.length - 1) {
                        this[i].anim(frame_frames, options, guidance_stagger);
                        await delay__WEBPACK_IMPORTED_MODULE_1___default()(stagger);
                    }
                    else
                        await this[i].anim(frame_frames, options, guidance_stagger);
                }
            }
        }
        else {
            let ls = [];
            for (let e of this) {
                ls.add(e.anim(frame_frames, options, guidance_stagger));
            }
            await Promise.all(ls);
        }
    }
    childs(selector = 1) {
        let ls = new ElementList();
        this.ea((e) => {
            ls.add(...e.childs(selector));
        });
        return ls;
    }
    /**
     * Removes node or element from list
     * @param valueOrIndices When 1 or more is given, The matching elements will be removed from the ElementList (Xrray implementation). When no parameter is given all Elements of the ElementList will be removed from the dom (dom implementation).
     */
    remove(...valueOrIndices) {
        if (valueOrIndices.empty) {
            this.ea((e) => {
                e.remove();
            });
        }
        else {
            super.remove(...valueOrIndices);
        }
        return this;
    }
    warn(cmd) {
        if (this.length === 0)
            console.warn("Trying to execute command \"" + cmd + "\" on empty NodeLs.");
    }
    exec(functionName, args) {
        this.warn(functionName);
        let end = [];
        for (let e of this) {
            end.add(e[functionName](...args));
        }
        return end;
    }
    execChain(functionName, args) {
        this.warn(functionName);
        for (let e of this) {
            e[functionName](...args);
        }
        return this;
    }
}
//@ts-ignore
const ElementList = InternalElementList;
//TODO: childs call can return NodeLs or just one Element because the structure is so similar (better performance). Maybe would also mean that you never know if getter give you array or not. They do have some differences though. You couldnt use rest operations e.g.
//has setterGetter -> make em
//has "has" in name -> make has, contains and have method
//any other function, call it with params and return array of results
function initPrototype() {
    const getPropDesc = Object.getOwnPropertyDescriptor.bind(Object);
    const elemProto = Element.prototype;
    const lsProto = ElementList.prototype;
    const NodeProto = Node.prototype;
    const EvTarProto = EventTarget.prototype;
    const has = "has";
    const includesString = "includes";
    const containsString = "contains";
    const excludesString = "excludes";
    const execString = "exec";
    const execChainString = "execChain";
    const chainAbleFunctions = ["insertAfter", "on", "off", "css", "addClass", "removeClass", "hasClass", "toggleClass", "apd", "emptyNodes", "hide", "show"];
    for (let k in elemProto) {
        if (lsProto[k] !== undefined) {
            //console.log("Skiping " + k);
            continue;
        }
        let d = getPropDesc(elemProto, k);
        if (d === undefined) {
            d = getPropDesc(NodeProto, k);
            if (d === undefined) {
                d = getPropDesc(EvTarProto, k);
            }
        }
        if (d === undefined) {
            console.warn("Edom: Unexpected change in dom api. The property \"" + k + "\" will not available in " + ElementList.name);
        }
        else {
            //console.log(k, d.writable);
            if (d.get !== undefined) {
                defineGetterSetter(k, d.set !== undefined);
            }
            else {
                let val = d.value;
                if (typeof val === "function") {
                    if (k.substr(0, 3) === has) {
                        let kName = k.substr(3);
                        // Since this k starts with "has" it cant be chainable
                        lsProto[excludesString + kName] = function (...args) {
                            let end = true;
                            for (let e of this) {
                                if (!e[k](...args)) {
                                    end = false;
                                    break;
                                }
                            }
                            return end;
                        };
                        lsProto[containsString + kName] = lsProto[includesString + kName] = function (...args) {
                            let end = false;
                            for (let e of this) {
                                if (e[k](...args)) {
                                    end = true;
                                    break;
                                }
                            }
                            return end;
                        };
                    }
                    let isChainAbleFunction = chainAbleFunctions.includes(k);
                    lsProto[k] = function (...args) {
                        return this[isChainAbleFunction ? execChainString : execString](k, args);
                    };
                }
                else {
                    defineGetterSetter(k, !d.writable || !d.configurable);
                }
            }
        }
    }
    function defineGetterSetter(key, writeAble) {
        let o = {
            get() {
                let end = [];
                for (let e of this) {
                    end.add(e[key]);
                }
                return end;
            }
        };
        if (writeAble)
            o.set = function (to) {
                for (let e of this) {
                    e[key] = to;
                }
            };
        Object.defineProperty(lsProto, key, o);
    }
}


/***/ }),

/***/ "./node_modules/extended-dom/app/dist/components/tel.js":
/*!**************************************************************!*\
  !*** ./node_modules/extended-dom/app/dist/components/tel.js ***!
  \**************************************************************/
/*! exports provided: Tel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tel", function() { return Tel; });
/* harmony import */ var _elementList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./elementList */ "./node_modules/extended-dom/app/dist/components/elementList.js");

class Tel {
    constructor(nodes, event, listener, enable = true) {
        this._enabled = false;
        this.p = new Nel(undefined, event, listener);
        // We ll only use methods here that are avalable to EventTargets here (on, off)
        //@ts-ignore
        if (nodes instanceof Array)
            this.p.nodes = new _elementList__WEBPACK_IMPORTED_MODULE_0__["ElementList"](...nodes);
        //@ts-ignore
        else
            this.p.nodes = new _elementList__WEBPACK_IMPORTED_MODULE_0__["ElementList"](nodes);
        if (enable)
            this.enable();
    }
    get event() {
        return this.p.event;
    }
    get nodes() {
        return this.p.nodes;
    }
    get listener() {
        return this.p.listener;
    }
    set nodes(node) {
        this.disable();
        //@ts-ignore
        this.p.nodes = new _elementList__WEBPACK_IMPORTED_MODULE_0__["ElementList"](...node);
        this.enable();
    }
    set event(event) {
        this.disable();
        this.p.event = event;
        this.enable();
    }
    set listener(listener) {
        this.disable();
        this.p.listener = listener;
        this.enable();
    }
    set enabled(to) {
        if (to) {
            if (this._enabled)
                return;
            //@ts-ignore
            this.p.nodes.on(this.event, this.listener);
        }
        else {
            if (!this._enabled)
                return;
            //@ts-ignore
            this.p.nodes.off(this.event, this.listener);
        }
        this._enabled = to;
    }
    get enabled() {
        return this._enabled;
    }
    enable() {
        this.enabled = true;
    }
    disable() {
        this.enabled = false;
    }
    repatch() {
        this.disable();
        this.enable();
    }
}
class Nel {
    //@ts-ignore
    constructor(nodes, event, listener) {
        this.nodes = nodes;
        this.event = event;
        this.listener = listener;
    }
}


/***/ }),

/***/ "./node_modules/extended-dom/app/dist/edom.js":
/*!****************************************************!*\
  !*** ./node_modules/extended-dom/app/dist/edom.js ***!
  \****************************************************/
/*! exports provided: init, polyfills, default, ElementList, Tel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var xrray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! xrray */ "./node_modules/xrray/xrray.js");
/* harmony import */ var xrray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(xrray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_polyfill__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/polyfill */ "./node_modules/extended-dom/app/dist/lib/polyfill.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "init", function() { return _lib_polyfill__WEBPACK_IMPORTED_MODULE_1__["init"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "polyfills", function() { return _lib_polyfill__WEBPACK_IMPORTED_MODULE_1__["polyfills"]; });

/* harmony import */ var _extentions_childs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./extentions/childs */ "./node_modules/extended-dom/app/dist/extentions/childs.js");
/* harmony import */ var _extentions_class__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./extentions/class */ "./node_modules/extended-dom/app/dist/extentions/class.js");
/* harmony import */ var _extentions_cssShorthands__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./extentions/cssShorthands */ "./node_modules/extended-dom/app/dist/extentions/cssShorthands.js");
/* harmony import */ var _extentions_htmlText__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./extentions/htmlText */ "./node_modules/extended-dom/app/dist/extentions/htmlText.js");
/* harmony import */ var _extentions_insertAfter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./extentions/insertAfter */ "./node_modules/extended-dom/app/dist/extentions/insertAfter.js");
/* harmony import */ var _extentions_listener__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./extentions/listener */ "./node_modules/extended-dom/app/dist/extentions/listener.js");
/* harmony import */ var _extentions_onOff__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./extentions/onOff */ "./node_modules/extended-dom/app/dist/extentions/onOff.js");
/* harmony import */ var _extentions_styleManipulation__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./extentions/styleManipulation */ "./node_modules/extended-dom/app/dist/extentions/styleManipulation.js");
/* harmony import */ var _components_elementList__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/elementList */ "./node_modules/extended-dom/app/dist/components/elementList.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ElementList", function() { return _components_elementList__WEBPACK_IMPORTED_MODULE_10__["ElementList"]; });

/* harmony import */ var _components_tel__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/tel */ "./node_modules/extended-dom/app/dist/components/tel.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Tel", function() { return _components_tel__WEBPACK_IMPORTED_MODULE_11__["Tel"]; });


xrray__WEBPACK_IMPORTED_MODULE_0___default()(Array);


/* harmony default export */ __webpack_exports__["default"] = (_lib_polyfill__WEBPACK_IMPORTED_MODULE_1__["init"]);











Object(_components_elementList__WEBPACK_IMPORTED_MODULE_10__["initPrototype"])();


/***/ }),

/***/ "./node_modules/extended-dom/app/dist/extentions/childs.js":
/*!*****************************************************************!*\
  !*** ./node_modules/extended-dom/app/dist/extentions/childs.js ***!
  \*****************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_attatchToProto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/attatchToProto */ "./node_modules/extended-dom/app/dist/lib/attatchToProto.js");
/* harmony import */ var _components_elementList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/elementList */ "./node_modules/extended-dom/app/dist/components/elementList.js");


const beforeend = "beforeend";
Object(_lib_attatchToProto__WEBPACK_IMPORTED_MODULE_0__["at"])("apd", function (...elems) {
    elems.ea((e) => {
        if (e instanceof Element)
            this.append(e);
        else
            this.insertAdjacentHTML(beforeend, e);
    });
    return this;
});
Object(_lib_attatchToProto__WEBPACK_IMPORTED_MODULE_0__["at"])("emptyNodes", function () {
    this.html = "";
    return this;
});
Object(_lib_attatchToProto__WEBPACK_IMPORTED_MODULE_0__["at"])("childs", function (selector_depth = 1) {
    if (typeof selector_depth === "string")
        return new _components_elementList__WEBPACK_IMPORTED_MODULE_1__["ElementList"](...this.querySelectorAll(selector_depth));
    else if (selector_depth > 0) {
        return new _components_elementList__WEBPACK_IMPORTED_MODULE_1__["ElementList"](...this.children, ...new _components_elementList__WEBPACK_IMPORTED_MODULE_1__["ElementList"](...this.children).childs(selector_depth - 1));
    }
    return new _components_elementList__WEBPACK_IMPORTED_MODULE_1__["ElementList"]();
});


/***/ }),

/***/ "./node_modules/extended-dom/app/dist/extentions/class.js":
/*!****************************************************************!*\
  !*** ./node_modules/extended-dom/app/dist/extentions/class.js ***!
  \****************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_attatchToProto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/attatchToProto */ "./node_modules/extended-dom/app/dist/lib/attatchToProto.js");

Object(_lib_attatchToProto__WEBPACK_IMPORTED_MODULE_0__["at"])("addClass", function (...className) {
    this.classList.add(...className);
    return this;
});
Object(_lib_attatchToProto__WEBPACK_IMPORTED_MODULE_0__["at"])("removeClass", function (...className) {
    this.classList.remove(...className);
    return this;
});
Object(_lib_attatchToProto__WEBPACK_IMPORTED_MODULE_0__["at"])("hasClass", function (...className) {
    let has = true;
    className.ea((cls) => {
        if (!this.classList.contains(cls))
            has = false;
    });
    return has;
});
Object(_lib_attatchToProto__WEBPACK_IMPORTED_MODULE_0__["at"])("toggleClass", function (...className) {
    className.ea((cls) => {
        if (this.hasClass(cls))
            this.removeClass(cls);
        else
            this.addClass(cls);
    });
    return this;
});


/***/ }),

/***/ "./node_modules/extended-dom/app/dist/extentions/cssShorthands.js":
/*!************************************************************************!*\
  !*** ./node_modules/extended-dom/app/dist/extentions/cssShorthands.js ***!
  \************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_attatchToProto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/attatchToProto */ "./node_modules/extended-dom/app/dist/lib/attatchToProto.js");

Object(_lib_attatchToProto__WEBPACK_IMPORTED_MODULE_0__["at"])("hide", function () {
    this.css("display", "none");
    return this;
});
Object(_lib_attatchToProto__WEBPACK_IMPORTED_MODULE_0__["at"])("show", function () {
    this.css("display", "block");
    return this;
});
Object(_lib_attatchToProto__WEBPACK_IMPORTED_MODULE_0__["at"])("height", {
    get() {
        return this.css("height");
    },
    set(to) {
        this.css("height", to);
    }
});
Object(_lib_attatchToProto__WEBPACK_IMPORTED_MODULE_0__["at"])("width", {
    get() {
        return this.css("width");
    },
    set(to) {
        this.css("width", to);
    }
});
Object(_lib_attatchToProto__WEBPACK_IMPORTED_MODULE_0__["at"])("offsetRight", function () {
    return this.offsetLeft + this.offsetWidth;
});
Object(_lib_attatchToProto__WEBPACK_IMPORTED_MODULE_0__["at"])("offsetBottom", function () {
    return this.offsetTop + this.offsetHeight;
});
Object(_lib_attatchToProto__WEBPACK_IMPORTED_MODULE_0__["at"])("absoluteOffset", function () {
    return this.getBoundingClientRect();
});
Object(_lib_attatchToProto__WEBPACK_IMPORTED_MODULE_0__["at"])("outerWidth", function () {
    return this.offsetWidth;
});
Object(_lib_attatchToProto__WEBPACK_IMPORTED_MODULE_0__["at"])("outerHeight", function () {
    return this.offsetHeight;
});
Object(_lib_attatchToProto__WEBPACK_IMPORTED_MODULE_0__["at"])("innerWidth", function () {
    return this.clientWidth;
});
Object(_lib_attatchToProto__WEBPACK_IMPORTED_MODULE_0__["at"])("innerHeight", function () {
    return this.clientHeight;
});
Object(_lib_attatchToProto__WEBPACK_IMPORTED_MODULE_0__["at"])("parent", function () {
    return this.parentElement;
});


/***/ }),

/***/ "./node_modules/extended-dom/app/dist/extentions/htmlText.js":
/*!*******************************************************************!*\
  !*** ./node_modules/extended-dom/app/dist/extentions/htmlText.js ***!
  \*******************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_attatchToProto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/attatchToProto */ "./node_modules/extended-dom/app/dist/lib/attatchToProto.js");

// TODO: data support
Object(_lib_attatchToProto__WEBPACK_IMPORTED_MODULE_0__["at"])("html", {
    get() {
        return this.innerHTML;
    },
    set(to) {
        this.innerHTML = to;
    }
});
Object(_lib_attatchToProto__WEBPACK_IMPORTED_MODULE_0__["at"])("text", {
    get() {
        return this.innerText;
    },
    set(to) {
        this.innerText = to;
    }
});


/***/ }),

/***/ "./node_modules/extended-dom/app/dist/extentions/insertAfter.js":
/*!**********************************************************************!*\
  !*** ./node_modules/extended-dom/app/dist/extentions/insertAfter.js ***!
  \**********************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_attatchToProto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/attatchToProto */ "./node_modules/extended-dom/app/dist/lib/attatchToProto.js");

Object(_lib_attatchToProto__WEBPACK_IMPORTED_MODULE_0__["at"])("insertAfter", function (newNode, referenceNode) {
    if (referenceNode.parent !== this)
        throw new Error("This is not the parent of referenceNode.");
    let sib = referenceNode.nextSibling;
    if (sib !== null)
        this.insertBefore(newNode, sib);
    else
        this.apd(newNode);
    return this;
});


/***/ }),

/***/ "./node_modules/extended-dom/app/dist/extentions/listener.js":
/*!*******************************************************************!*\
  !*** ./node_modules/extended-dom/app/dist/extentions/listener.js ***!
  \*******************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_attatchToProto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/attatchToProto */ "./node_modules/extended-dom/app/dist/lib/attatchToProto.js");
/* harmony import */ var _edom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../edom */ "./node_modules/extended-dom/app/dist/edom.js");


Object(_lib_attatchToProto__WEBPACK_IMPORTED_MODULE_0__["at"])(["listener", "listen", "ls"], function (event, listener, patch) {
    return new _edom__WEBPACK_IMPORTED_MODULE_1__["Tel"](this, event, listener, patch);
});


/***/ }),

/***/ "./node_modules/extended-dom/app/dist/extentions/onOff.js":
/*!****************************************************************!*\
  !*** ./node_modules/extended-dom/app/dist/extentions/onOff.js ***!
  \****************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_attatchToProto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/attatchToProto */ "./node_modules/extended-dom/app/dist/lib/attatchToProto.js");
/* harmony import */ var _lib_polyfill__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/polyfill */ "./node_modules/extended-dom/app/dist/lib/polyfill.js");


const dataTransfers = {};
let dataTransferID = 0;
let resizeListener = new Map();
//only init when needed since this heavily consumes resources (cpu).
let obs;
let obsUndefined = true;
function initResObs() {
    obsUndefined = false;
    obs = new _lib_polyfill__WEBPACK_IMPORTED_MODULE_1__["polyfills"].ResizeObserver((elements) => {
        elements.ea((elem) => {
            resizeListener.get(elem.target).forEach((actualFunc) => {
                actualFunc();
            });
        });
    });
}
//TODO: make getfunction
let eventListenerIndex = new Map();
const key = "advancedDataTransfere";
//TODO: document / window.on("ready")
//TODO: return data / or promise when no cb is given
//TODO: check if options are taken into account (resize??)
Object(_lib_attatchToProto__WEBPACK_IMPORTED_MODULE_0__["at"])("on", function (...a) {
    let isResize = a[0] === "resize";
    if (isResize && this !== window) {
        if (obsUndefined)
            initResObs();
        let map = resizeListener.get(this);
        if (map === undefined) {
            obs.observe(this);
            map = new Map();
            resizeListener.set(this, map);
        }
        map.set(a[1], a[1].bind(this));
    }
    else {
        let actualListener;
        if (isResize) {
            a[1].bind(this)(false);
            actualListener = a[1];
        }
        else if (a[0] === "dragstart") {
            dataTransferID++;
            actualListener = (e) => {
                e.setData = (data) => {
                    dataTransfers[dataTransferID] = data;
                    e.dataTransfer.setData(key, dataTransferID);
                };
                a[1](e);
            };
        }
        else if (a[0] === "drop") {
            actualListener = (e) => {
                e.getData = () => {
                    let id = e.dataTransfer.getData(key);
                    let found = id !== "" ? dataTransfers[id] : null;
                    delete dataTransfers[id];
                    return found;
                };
                a[1](e);
            };
        }
        else {
            actualListener = a[1];
        }
        actualListener = actualListener.bind(this);
        let that = eventListenerIndex.get(this);
        let o = { event: a[0], actualListener, userListener: a[1], options: a[2] };
        if (that === undefined)
            eventListenerIndex.set(this, [o]);
        else
            that.add(o);
        this.addEventListener(a[0], actualListener, a[2]);
    }
    return this;
});
Object(_lib_attatchToProto__WEBPACK_IMPORTED_MODULE_0__["at"])("off", function (...a) {
    if (a[0] === "resize" && this !== window) {
        if (obsUndefined)
            initResObs();
        let map = resizeListener.get(this);
        if (map !== undefined) {
            map.delete(a[1]);
            if (map.size === 0) {
                obs.unobserve(this);
                resizeListener.delete(this);
            }
        }
    }
    else {
        let toBeRm = [];
        let that = eventListenerIndex.get(this);
        if (that !== undefined) {
            if (a[0] !== undefined && a[1] !== undefined) {
                that.ea((e) => {
                    if (e.event === a[0] && e.userListener === a[1])
                        toBeRm.add(e);
                });
            }
            else {
                that.ea((e) => {
                    if (e.event === a[0] || e.userListener === a[1])
                        toBeRm.add(e);
                });
            }
            toBeRm.ea((e) => {
                this.removeEventListener(e.event, e.actualListener);
                that.rm(e);
            });
            if (that.empty)
                eventListenerIndex.delete(this);
        }
    }
    return this;
});


/***/ }),

/***/ "./node_modules/extended-dom/app/dist/extentions/styleManipulation.js":
/*!****************************************************************************!*\
  !*** ./node_modules/extended-dom/app/dist/extentions/styleManipulation.js ***!
  \****************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_attatchToProto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/attatchToProto */ "./node_modules/extended-dom/app/dist/lib/attatchToProto.js");
/* harmony import */ var front_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! front-db */ "./node_modules/front-db/app/dist/f-db.js");
/* harmony import */ var decompose_dommatrix__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! decompose-dommatrix */ "./node_modules/decompose-dommatrix/dist/decomposeDOMMatrix.js");
/* harmony import */ var decompose_dommatrix__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(decompose_dommatrix__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var spread_offset__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! spread-offset */ "./node_modules/spread-offset/app/dist/spreadOffset.js");
/* harmony import */ var _lib_parse__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../lib/parse */ "./node_modules/extended-dom/app/dist/lib/parse.js");
/* harmony import */ var tween_object__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tween-object */ "./node_modules/tween-object/app/dist/tweenObject.js");
/* harmony import */ var animation_frame_delta__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! animation-frame-delta */ "./node_modules/animation-frame-delta/app/dist/animationFrameDelta.js");
/* harmony import */ var waapi_easing__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! waapi-easing */ "./node_modules/waapi-easing/app/dist/waapiEasing.js");
/* harmony import */ var tiny_clone__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! tiny-clone */ "./node_modules/tiny-clone/app/dist/tinyClone.js");









function postFixStyle(prop, style, parseIndex, parseDirectionIn = true) {
    let fix = parseDirectionIn ? _lib_parse__WEBPACK_IMPORTED_MODULE_4__["parseIn"][parseIndex][prop] : _lib_parse__WEBPACK_IMPORTED_MODULE_4__["parseOut"][parseIndex][prop];
    if (fix !== undefined) {
        if (typeof fix === "function")
            return fix(style);
        else if (typeof style === "number")
            return style + fix;
        else {
            //@ts-ignore
            let e = splitValueFromUnit(style);
            if (e.unit === "")
                return style + fix;
            else
                return style;
        }
    }
    else
        return style.toString();
}
function stylePropertyAttribute(elem, stylePropertyAttribute) {
    return (TransformProp.applies(stylePropertyAttribute) || getComputedStyle(elem)[stylePropertyAttribute] !== undefined) ? "style" :
        stylePropertyAttribute in elem ? "prop" :
            "attr";
}
function stylePropertyAttributeOfKeyframe(elem, keys) {
    let o = {};
    keys.ea((e) => {
        o[e] = stylePropertyAttribute(elem, e);
    });
    return o;
}
// Optimize maybe
const styleString = "style";
function seperateKeyframeStylesFromProps(keyframes, parseIndexMap) {
    const style = [];
    const prop = [];
    keyframes.ea((keyframe) => {
        let s = {};
        let p = {};
        for (const key in parseIndexMap) {
            if (parseIndexMap[key] === styleString)
                s[key] = keyframe[key];
            else
                p[key] = keyframe[key];
        }
        if (!Object.keys(p).empty) {
            p.offset = keyframe.offset;
            prop.add(p);
        }
        if (!Object.keys(s).empty) {
            s.offset = keyframe.offset;
            style.add(s);
        }
    });
    return { style, prop };
}
let formatStyle = (() => {
    const joinComma = ",";
    const joinSpace = " ";
    function formatStyle(prop, style, that, parseIndex, parseDirectionIn = true) {
        let end;
        let transformApplies = TransformProp.applies(prop);
        //@ts-ignore
        let isAr = style instanceof Array;
        // TODO: Why is parseIn required to be true?
        if (isAr && parseDirectionIn) {
            let ar = [];
            //@ts-ignore
            for (let stl of style) {
                ar.add(postFixStyle(prop, stl, parseIndex, parseDirectionIn));
            }
            end = ar.join(transformApplies ? joinComma : joinSpace);
        }
        else
            end = postFixStyle(prop, style, parseIndex, parseDirectionIn);
        if (that instanceof TransformProp) {
            if (transformApplies) {
                //@ts-ignore
                that[prop] = end;
                return that;
            }
            else
                return end;
        }
        else if (that instanceof Element) {
            if (transformApplies) {
                let me = getTransformProps(that);
                //@ts-ignore
                me[prop] = end;
                return me;
            }
            else
                return end;
        }
        else
            return end;
    }
    return formatStyle;
})();
let transfromPropsIndex = new Map();
function buildGetIndex(map, init) {
    return function (index) {
        let me = map.get(index);
        if (me === undefined) {
            me = init(index);
            map.set(index, me);
        }
        return me;
    };
}
const getTransformProps = buildGetIndex(transfromPropsIndex, index => new TransformProp(index.css("transform")));
function formatCss(css, that, parseIndexMap, In) {
    let transformProp;
    if (that === true)
        that = new TransformProp();
    for (let key in css) {
        let s = formatStyle(key, css[key], that, parseIndexMap[key], In);
        if (!(s instanceof TransformProp))
            css[key] = s;
        else {
            delete css[key];
            transformProp = s;
        }
    }
    if (transformProp)
        css.transform = transformProp.toString();
    return transformProp;
}
function formatAnimationCss(css, that, parseIndexMap) {
    if ("offset" in css) {
        let { offset } = css;
        delete css.offset;
        let end = formatCss(css, that, parseIndexMap);
        css.offset = offset;
        return end;
    }
    else
        return formatCss(css, that, parseIndexMap);
}
function splitTransformPropsIntoKeyVal(val) {
    val = val.replace(/( |\t)/g, "");
    let ar = val.split(")");
    //@ts-ignore
    ar.rmI(ar.length - 1);
    let end = [];
    ar.forEach((e) => {
        let l = e.split("(");
        end.push({ key: l[0], val: l[1] });
    });
    return end;
}
const splitValueFromUnit = (() => {
    let val;
    return function splitValueFromUnit(value) {
        val = value;
        let max = val.length - 1;
        let edge = max - 2;
        if (!isEdge(edge)) {
            edge = max - 3;
            if (!isEdge(edge)) {
                edge = max - 1;
                if (!isEdge(edge)) {
                    edge = max;
                    if (!isEdge(edge)) {
                        edge = max - 4;
                        while (edge >= 0) {
                            if (isEdge(edge))
                                break;
                            edge--;
                        }
                        if (edge === -1)
                            return { val: NaN, unit: value };
                    }
                }
            }
        }
        edge++;
        return { val: +val.substr(0, edge), unit: val.substr(edge) };
    };
    function isEdge(at) {
        return !isNaN(+val[at]) && isNaN(+val[at + 1]);
    }
})();
class TransformProp {
    constructor(transform_clone) {
        this.primitives = {};
        this.changed = false;
        this.store = "none";
        if (transform_clone) {
            if (transform_clone instanceof TransformProp) {
                for (let k in transform_clone.primitives) {
                    this.primitives[k] = transform_clone.primitives[k];
                }
                this.changed = transform_clone.changed;
                this.store = transform_clone.store;
            }
            else
                this.transform = transform_clone;
        }
    }
    set translate(to) {
        if (!(to instanceof Array))
            to = to.split(",");
        this.allocate(to, ["translateX", "translateY", "translateZ"]);
    }
    // TODO maybe split this up and return a number[] of the translates; this would have to be consitently implemented through all css (like margin or padding)
    get translate() {
        return this.combineVals("translateX", "translateY", "translateZ");
    }
    set scale(to) {
        if (!(to instanceof Array))
            to = to.split(",");
        if (to[0] !== undefined) {
            if (to[1] !== undefined) {
                if (to[2] !== undefined) {
                    this.scaleX = to[0];
                    this.scaleY = to[1];
                    this.scaleZ = to[2];
                }
                else {
                    this.scaleX = to[0];
                    this.scaleY = to[1];
                }
            }
            else {
                this.scaleX = to[0];
                this.scaleY = to[0];
                this.scaleZ = to[0];
            }
        }
    }
    get scale() {
        let scaleX = this.scaleX;
        let scaleY = this.scaleY;
        let scaleZ = this.scaleZ;
        if (scaleX === scaleY && scaleY === scaleZ)
            return scaleX;
        return [scaleX, scaleY, scaleZ];
    }
    set skew(to) {
        if (!(to instanceof Array))
            to = to.split(",");
        this.allocate(to, ["skewX", "skewY"]);
    }
    get skew() {
        return this.combineVals("skewX", "skewY");
    }
    set matrix(to) {
        if (to instanceof Array)
            to = to.join(",");
        this.decomposeMatrix("matrix(" + to + ")");
    }
    set matrix3d(to) {
        if (to instanceof Array)
            to = to.join(",");
        this.decomposeMatrix("matrix3d(" + to + ")");
    }
    set transform(to) {
        if (to === undefined || to === "none" || to === "")
            return;
        let ar = splitTransformPropsIntoKeyVal(to);
        let ordered = {};
        ar.ea((e) => {
            let t = ordered[e.key] === undefined ? ordered[e.key] = [] : ordered[e.key];
            t.add(e.val);
        });
        for (let k in ordered) {
            if (TransformProp.umbrellaTransformProps.includes(k)) {
                this.decomposeMatrix(to);
                return;
            }
        }
        for (let k in ordered) {
            let t = ordered[k];
            if (t.length === 1) {
                this[k] = t.first;
                return;
            }
            else if (!(t instanceof Array)) {
                let split = [];
                t.ea((e) => {
                    split.add(splitValueFromUnit(e.val));
                });
                let unit = split.first.unit;
                let canCompose = true;
                for (let i = 0; i < split.length; i++) {
                    if (split[i].unit !== unit)
                        canCompose = false;
                }
                if (canCompose) {
                    let val = 0;
                    split.ea((e) => {
                        val += e.val;
                    });
                    this[k] = val + unit;
                    delete ordered[k];
                }
            }
        }
        let rest = "";
        for (let k in ordered) {
            rest += k + "(" + ordered[k] + ") ";
        }
        this.decomposeMatrix(rest);
    }
    get transform() {
        return this.toString();
    }
    decomposeMatrix(to) {
        let dec = decompose_dommatrix__WEBPACK_IMPORTED_MODULE_2___default()(new DOMMatrix(to));
        let skew = dec.skewXY;
        delete dec.skewXY;
        delete dec.skewXZ;
        delete dec.skewYZ;
        for (let d in dec) {
            //@ts-ignore
            if (dec[d] !== TransformProp.primitiveDefaults[d])
                this[d] = formatStyle(d, dec[d], false, "style");
        }
        if (skew !== TransformProp.primitiveDefaults.skewX)
            this.skewX = formatStyle("skewX", skew, false, "style");
    }
    combineVals(...vals) {
        let s = "";
        vals.ea((val) => {
            let e = this[val];
            s += e + ", ";
        });
        return s.substr(0, s.length - 2);
    }
    allocate(input, funcs) {
        funcs.ea((func, i) => {
            //@ts-ignore
            if (input[i] !== undefined)
                this[func] = input[i];
        });
    }
    toString() {
        if (this.changed) {
            this.changed = false;
            this.store = "";
            for (let prop of TransformProp.primitiveTransformProps) {
                // This MUST formated in the following order to achive consitent results [translate rotate skew scale]
                if (prop in this.primitives)
                    if (this.primitives[prop] !== TransformProp.primitiveDefaultsWithUnits[prop])
                        this.store += prop + TransformProp.clampOpen + this.primitives[prop] + TransformProp.clampClose;
            }
            this.store = this.store || "none ";
            this.store = this.store.substr(0, this.store.length - 1);
        }
        return this.store;
    }
}
TransformProp.primitiveDefaults = {
    translateX: 0,
    translateY: 0,
    translateZ: 0,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    skewX: 0,
    skewY: 0,
    scaleX: 1,
    scaleY: 1,
    scaleZ: 1
};
//@ts-ignore
TransformProp.primitiveDefaultsWithUnits = {};
TransformProp.primitiveTransformProps = Object.keys(TransformProp.primitiveDefaults);
TransformProp.umbrellaTransformProps = [
    "rotate", "rotate3d", "scale", "scale3d", "translate", "translate3d", "skew", "matrix", "matrix3d"
];
TransformProp.transformProps = [...TransformProp.primitiveTransformProps, ...TransformProp.umbrellaTransformProps];
TransformProp.applies = (...prop) => {
    return TransformProp.transformProps.contains(...prop);
};
TransformProp.clampOpen = "(";
TransformProp.clampClose = ") ";
for (let k in TransformProp.primitiveDefaults) {
    TransformProp.primitiveDefaultsWithUnits[k] = postFixStyle(k, TransformProp.primitiveDefaults[k], "style");
}
TransformProp.primitiveTransformProps.ea((prop) => {
    Object.defineProperty(TransformProp.prototype, prop, {
        get() {
            return this.primitives[prop] || TransformProp.primitiveDefaults[prop] + _lib_parse__WEBPACK_IMPORTED_MODULE_4__["parseIn"].style[prop];
        },
        set(style) {
            this.changed = true;
            this.primitives[prop] = style;
        }
    });
});
Object(_lib_attatchToProto__WEBPACK_IMPORTED_MODULE_0__["ae"])("css", function (key_css, val) {
    if (typeof key_css === "object") {
        let css = Object(tiny_clone__WEBPACK_IMPORTED_MODULE_8__["default"])(key_css);
        formatCss(css, this, stylePropertyAttributeOfKeyframe(this, Object.keys(css)));
        for (let prop in css) {
            this.style[prop] = css[prop];
        }
    }
    else if (val !== undefined && typeof val !== "boolean") {
        let s = formatStyle(key_css, val, this, stylePropertyAttribute(this, key_css));
        if (!(s instanceof TransformProp))
            this.style[key_css] = s;
        else
            this.style.transform = s.toString();
    }
    else {
        let s;
        if (TransformProp.applies(key_css)) {
            if (elemsWithoutConsitentTransformProps.includes({ elem: this })) {
                let t = new TransformProp();
                t.transform = getComputedStyle(this).transform;
                s = t[key_css];
            }
            else
                s = getTransformProps(this)[key_css];
        }
        else {
            s = window.getComputedStyle(this)[key_css];
        }
        if (s === undefined)
            throw "Unknown key \"" + key_css + "\".";
        if (val || s.split(" ").length > 1)
            return s;
        let n = parseFloat(s);
        if (isNaN(n))
            return s;
        return n;
    }
    return this;
});
function currentFrame(keys, that, parseIndexMap, transProp) {
    let ret = {};
    for (let key of keys) {
        if (parseIndexMap[key] === "style")
            ret[key] = that.css(key);
        else if (parseIndexMap[key] === "attr")
            ret[key] = that.getAttribute(key);
        else
            ret[key] = this[key];
    }
    formatCss(ret, transProp, parseIndexMap);
    ret.offset = 0;
    return ret;
}
let detectIfInTransitionProperty = (() => {
    function woan(key, that) {
        let s = "The transition propert";
        if (key instanceof Array)
            s += "ies \"";
        else
            s += "y \"";
        s += key.toString() + "\" is not empty for the following element. It is recommended to not use css aniamtions and this framework for the same properties.\n\nIn order to prevent an aniamtion from triggering twice in a row the result of this one will not display its result in the dom explorer.\n\n";
        console.warn(s, that);
    }
    return function (cssKeys, transitionPropertys, transitionDuration, that) {
        let warn = [];
        for (let key of cssKeys) {
            if (transitionDuration !== 0 && (transitionPropertys.includes(key) || transitionPropertys === "all")) {
                warn.add(key);
            }
        }
        let length = warn.length;
        if (length !== 0)
            if (length === 1)
                woan(warn[0], that);
            else
                woan(warn, that);
        return warn;
    };
})();
function evaluateAllKeys(frames) {
    let allKeys = Object.keys(frames.first);
    for (let i = 1; i < frames.length; i++) {
        let keys = Object.keys(frames[i]);
        for (let e of keys) {
            if (!allKeys.includes(e))
                allKeys.add(e);
        }
    }
    if (allKeys.includes("offset"))
        allKeys.rm("offset");
    return allKeys;
}
class ElemsWithoutConsitentTransformProps {
    constructor(...elems) {
        this.store = [];
        this.add(...elems);
    }
    add(...elems) {
        elems.ea((e) => {
            if (!this.includes(e))
                this.store.add(e);
        });
    }
    rm(...elems) {
        let indices = [];
        elems.ea((e) => {
            let hasNoIdentifier = e.identifier === undefined;
            this.store.ea((s, i) => {
                if (e === s || (s.elem === e.elem && (hasNoIdentifier || s.identifier === e.identifier)))
                    indices.add(i);
            });
        });
        this.store.rmI(...indices);
    }
    includes(...elems) {
        if (elems.ea((e) => {
            let hasNoIdentifier = e.identifier === undefined;
            if (this.store.ea((s) => {
                if (e === s || (s.elem === e.elem && (hasNoIdentifier || s.identifier === e.identifier)))
                    return true;
            }))
                return true;
        }))
            return true;
        return false;
    }
}
let easeInOut = new waapi_easing__WEBPACK_IMPORTED_MODULE_7__["default"]("easeInOut");
// let ease = new Easing("ease")
let easeInOutFunc = easeInOut.function;
// let easeInOutString = easeInOut.string
// let easeFunc = ease.function
// let easeString = ease.string
let maxAnimationProgress = .9999999;
let minAnimationProgress = 0.0000001;
let nameSpaceIndex = new Map();
let elemsWithoutConsitentTransformProps = new ElemsWithoutConsitentTransformProps();
const maxProgressInOneStep = 1 / 3;
//                                      .1 / 16.6666666666666667
const maxProgressInOneStepWithoutDelta = .006;
let frameDelta = 16.6666666666666667;
let lastFrameTimeStamp = 0;
let loop = (frameTimeStamp) => {
    frameDelta = frameTimeStamp - lastFrameTimeStamp;
    lastFrameTimeStamp = frameTimeStamp;
    requestAnimationFrame(loop);
    // log(frameDelta)
};
requestAnimationFrame(loop);
// TODO: Do I really have to always calculate initalframe immediatly or can I check if the anim is 
// guided & starts if the current progress in the middle of the animation. Otherways on start or end
// it will be calculated anyway
// TODO: maybe HTML attrbs anim
// So that you could animate innerHTML e.g.
// maybe fade aout font-color and then back... or just set it
// TODO: add x as shorthand for translate X usw.
// TODO: instead of options just the duration can be given as well. so elem.anim({...}, 300)
// TODO: make warning if animation to or from auto. Based on https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions#Which_CSS_properties_can_be_transitioned
let transformString = "transform";
class AnimPropAssoziation {
    constructor() {
        this.ls = [];
    }
    check(props) {
        let hasTransform = TransformProp.applies(...props);
        let toBeRm = [];
        this.ls.ea((e, i) => {
            if (!e.props.excludes(...props) || (hasTransform && e.props.includes(transformString))) {
                e.onCancel();
                toBeRm.add(i);
            }
        });
        this.ls.rmI(...toBeRm);
    }
    add(assoziation) {
        this.ls.add(assoziation);
    }
}
const currentAnimationPropsIndex = new Map();
const getAnimProps = buildGetIndex(currentAnimationPropsIndex, () => new AnimPropAssoziation());
// TODO: multiple configs for example for anim at NodeLs
Object(_lib_attatchToProto__WEBPACK_IMPORTED_MODULE_0__["ae"])("anim", async function (frame_frames, options = {}, guidance) {
    //@ts-ignore
    if (frame_frames[Object.keys(frame_frames)[0]] instanceof Array)
        frame_frames = convertFrameStructure(frame_frames);
    else
        frame_frames = Object(tiny_clone__WEBPACK_IMPORTED_MODULE_8__["default"])(frame_frames);
    let areFrames = frame_frames instanceof Array;
    let animationIsGuided = guidance !== undefined;
    const thisDisplay = this.css("display");
    if (thisDisplay === "" || thisDisplay === "none") {
        if (!animationIsGuided) {
            if (areFrames) {
                this.css(frame_frames.last);
            }
            else {
                this.css(frame_frames);
            }
            return;
        }
    }
    let thisTransProps = getTransformProps(this);
    let endFrames;
    let transitionProperty = this.css("transition-property");
    let transitionDuration = this.css("transition-duration");
    let needToCalculateInitalFrame = false;
    let allKeys;
    let initFrame;
    let parseIndexMap;
    let thisTransPropsCopy = new TransformProp(thisTransProps);
    if (areFrames) {
        //@ts-ignore
        frame_frames = frame_frames;
        allKeys = evaluateAllKeys(frame_frames);
        parseIndexMap = stylePropertyAttributeOfKeyframe(this, allKeys);
        needToCalculateInitalFrame = frame_frames.first.offset !== 0;
        if (needToCalculateInitalFrame) {
            initFrame = currentFrame(allKeys, this, parseIndexMap, thisTransProps);
        }
    }
    else {
        allKeys = Object.keys(frame_frames);
        parseIndexMap = stylePropertyAttributeOfKeyframe(this, allKeys);
        initFrame = currentFrame(allKeys, this, parseIndexMap, thisTransProps);
    }
    let thisAnimProps = getAnimProps(this);
    thisAnimProps.check(allKeys);
    if (typeof options === "number") {
        options = { duration: options };
    }
    if (nameSpaceIndex.get(this) === undefined)
        nameSpaceIndex.set(this, []);
    let ns = nameSpaceIndex.get(this);
    if (options.name === undefined) {
        let inc = 1;
        while (ns.includes(inc.toString())) {
            inc++;
        }
        let s = inc.toString();
        //@ts-ignore
        options.name = s;
        ns.add(s);
    }
    else {
        let inc = 2;
        let name;
        if (!ns.includes(options.name))
            name = options.name;
        else {
            while (ns.includes(options.name + inc)) {
                inc++;
            }
            name = options.name + inc;
        }
        //@ts-ignore
        options.name = name;
        ns.add(name);
    }
    let progressNameString = "animation-" + options.name + "-progress";
    //@ts-ignore
    if (options.iterations === undefined)
        options.iterations = 1;
    else if (options.iterations <= 0)
        throw "Given option iterations " + options.iterations + " cannot be negative.";
    if (areFrames) {
        //@ts-ignore
        let frames = frame_frames;
        if (needToCalculateInitalFrame) {
            let placeholder = {};
            allKeys.ea((k) => {
                placeholder[k] = "PLACEHOLDER";
            });
            placeholder.offset = 0;
            frames.dda(placeholder);
        }
        Object(spread_offset__WEBPACK_IMPORTED_MODULE_3__["default"])(frames);
        let needed = new Map();
        for (let i = 0; i < frames.length; i++) {
            let frame = frames[i];
            let thiskeys = Object.keys(frame);
            if (thiskeys.includes("offset"))
                thiskeys.rmV("offset");
            for (let key of allKeys) {
                if (!thiskeys.includes(key)) {
                    let prevStyle;
                    let nextStyle;
                    let prevOffset;
                    let nextOffset;
                    let wantedOffset = frame.offset;
                    for (let j = 0; j < frames.length; j++) {
                        let framej = frames[j];
                        if (framej[key] !== undefined) {
                            if (j < i) {
                                prevStyle = framej[key];
                                prevOffset = framej.offset;
                            }
                            else {
                                nextStyle = framej[key];
                                nextOffset = framej.offset;
                                break;
                            }
                        }
                    }
                    if (prevStyle === undefined) {
                        frame[key] = nextStyle;
                    }
                    else if (nextStyle === undefined) {
                        frame[key] = prevStyle;
                    }
                    else if (nextStyle === prevStyle) {
                        frame[key] = prevStyle;
                    }
                    else {
                        let at = ((wantedOffset - prevOffset) / (nextOffset - prevOffset));
                        let me = needed.get(frame);
                        if (me !== undefined) {
                            let f = me.ea((e) => {
                                if (e.identify.prevOffset === prevOffset && e.identify.nextOffset === nextOffset) {
                                    e.frames[0][key] = prevStyle;
                                    e.frames[1][key] = nextStyle;
                                    e.keys.add(key);
                                    return true;
                                }
                            });
                            if (!f) {
                                me.add({
                                    keys: [key],
                                    at,
                                    frames: [
                                        { [key]: prevStyle },
                                        { [key]: nextStyle }
                                    ],
                                    identify: {
                                        prevOffset,
                                        nextOffset
                                    }
                                });
                            }
                        }
                        else {
                            needed.set(frame, [
                                {
                                    keys: [key],
                                    at,
                                    frames: [
                                        { [key]: prevStyle },
                                        { [key]: nextStyle }
                                    ],
                                    identify: {
                                        prevOffset,
                                        nextOffset
                                    }
                                }
                            ]);
                        }
                    }
                }
            }
        }
        // placeholder should not be formatted
        if (needToCalculateInitalFrame)
            frames.rmI(0);
        let notAlreadyFormattedFrames = [];
        for (let frame of frames) {
            if (needed.get(frame) === undefined)
                formatAnimationCss(frame, thisTransPropsCopy, parseIndexMap);
            else
                notAlreadyFormattedFrames.add(frame);
        }
        let proms = [];
        needed.forEach((ne, frame) => {
            ne.ea((e) => {
                proms.add(getStyleAtProgress([e.frames, e, this, parseIndexMap], 1).then((style) => {
                    for (let key in style) {
                        frame[key] = style[key];
                    }
                }));
            });
        });
        if (!proms.empty)
            await Promise.all(proms);
        notAlreadyFormattedFrames.ea((frame) => {
            formatAnimationCss(frame, thisTransPropsCopy, parseIndexMap);
        });
        allKeys = evaluateAllKeys(frames);
        parseIndexMap = stylePropertyAttributeOfKeyframe(this, allKeys);
        if (needToCalculateInitalFrame)
            frames.dda(initFrame);
        endFrames = frames;
    }
    else {
        formatCss(frame_frames, thisTransPropsCopy, parseIndexMap);
        allKeys = Object.keys(frame_frames);
        if (allKeys.includes("offset"))
            allKeys.rmV("offset");
        frame_frames.offset = 1;
        parseIndexMap = stylePropertyAttributeOfKeyframe(this, allKeys);
        needToCalculateInitalFrame = true;
        endFrames = [initFrame, frame_frames];
    }
    let detectedProperties = detectIfInTransitionProperty(allKeys, transitionProperty, transitionDuration, this);
    let cssCanBeUsedToFill = allKeys.excludes(...detectedProperties);
    let elemsWithoutConsitentTransformPropsKey = { elem: this, identifier: options.name };
    const seperatedKeyframes = seperateKeyframeStylesFromProps(endFrames, parseIndexMap);
    const animateViaWaapi = !seperatedKeyframes.style.empty;
    const animateViaProp = !seperatedKeyframes.prop.empty;
    if (!animationIsGuided) {
        elemsWithoutConsitentTransformProps.add(elemsWithoutConsitentTransformPropsKey);
        let o = options;
        //Defaults
        if (o.duration === undefined)
            o.duration = 200;
        else if (o.duration <= 0)
            throw "Given option duration " + o.duration + " cannot be negative.";
        if (o.easing === undefined)
            o.easing = new waapi_easing__WEBPACK_IMPORTED_MODULE_7__["default"]("ease");
        else {
            //@ts-ignore
            if (typeof o.easing === "string")
                o.easing = new waapi_easing__WEBPACK_IMPORTED_MODULE_7__["default"](o.easing);
        }
        if (o.fill === undefined)
            o.fill = true;
        let waapiOptions;
        if (animateViaWaapi) {
            waapiOptions = {};
            waapiOptions.fill = "both";
            waapiOptions.iterations = o.iterations;
            waapiOptions.duration = o.duration;
            waapiOptions.easing = o.easing.string;
        }
        return await new Promise(async (res, rej) => {
            let animation;
            let tweeny;
            let cancelAnimation = false;
            let rmFromNameSpace = () => {
                this.removeAttribute(progressNameString);
                ns.rmV(options.name);
            };
            try {
                if (animateViaWaapi)
                    animation = this.animate(seperatedKeyframes.style, waapiOptions);
                if (animateViaProp) {
                    //@ts-ignore
                    tweeny = new tween_object__WEBPACK_IMPORTED_MODULE_5__["default"](true, seperatedKeyframes.prop, o);
                    // Format
                    tweeny.onUpdate((keyframe) => {
                        for (let prop in keyframe) {
                            keyframe[prop] = postFixStyle(prop, keyframe[prop], parseIndexMap[prop], false);
                        }
                    });
                    const fill = { attr: [], prop: [] };
                    const firstProp = Object(tiny_clone__WEBPACK_IMPORTED_MODULE_8__["default"])(seperatedKeyframes.prop.first);
                    delete firstProp.offset;
                    for (let prop in firstProp) {
                        fill[parseIndexMap[prop]].add(prop);
                    }
                    if (!fill.attr.empty) {
                        tweeny.onUpdate((keyframe) => {
                            fill.attr.ea((key) => {
                                this.setAttribute(key, keyframe[key]);
                            });
                        });
                    }
                    if (!fill.prop.empty) {
                        tweeny.onUpdate((keyframe) => {
                            fill.prop.ea((key) => {
                                this[key] = keyframe[key];
                            });
                        });
                    }
                    // TODO: use animationFrameDelta for everything
                    Object(animation_frame_delta__WEBPACK_IMPORTED_MODULE_6__["default"])(tweeny.update.bind(tweeny), o.duration, o.iterations);
                }
            }
            catch (e) {
                setKeyframe(endFrames.last, this);
                thisTransProps.transform = getComputedStyle(this).transform;
                elemsWithoutConsitentTransformProps.rm(elemsWithoutConsitentTransformPropsKey);
                rej(`Encountered following error while attempting to animate.

--------

` + e.message + `

--------


Falling back on ` + this.tagName.toLowerCase() + `#css(...) to prevent logic failures.`);
                cancelAnimation = true;
                this.setAttribute(progressNameString, "Failed");
                setTimeout(rmFromNameSpace, 1000);
                return;
            }
            let finished = false;
            thisAnimProps.add({ props: allKeys, onCancel: () => {
                    if (finished)
                        return;
                    cancelAnimation = true;
                    thisTransProps.transform = getComputedStyle(this).transform;
                    animation.cancel();
                    rmFromNameSpace();
                    res();
                } });
            let iterations = o.iterations;
            if (iterations !== Infinity)
                if (animation !== undefined)
                    animation.onfinish = () => {
                        if (cancelAnimation)
                            return;
                        finished = true;
                        let lastFrame = endFrames.last;
                        thisTransProps.transform = lastFrame.transform;
                        elemsWithoutConsitentTransformProps.rm(elemsWithoutConsitentTransformPropsKey);
                        if (o.fill && cssCanBeUsedToFill) {
                            setKeyframe(lastFrame, this);
                            animation.cancel();
                        }
                        res();
                    };
                else
                    setTimeout(() => {
                        if (cancelAnimation)
                            return;
                        finished = true;
                        elemsWithoutConsitentTransformProps.rm(elemsWithoutConsitentTransformPropsKey);
                        res();
                    }, o.duration * iterations);
            let displayProgress = () => {
                let freq = o.duration / 100;
                let min = 16;
                if (freq < min)
                    freq = min;
                let cur = 0;
                let progress = 0;
                let int = setInterval(() => {
                    if (cancelAnimation)
                        return clearInterval(int);
                    cur += freq;
                    progress = Math.round((cur / o.duration) * 100);
                    if (progress >= 100) {
                        clearInterval(int);
                        iterations--;
                        if (iterations <= 0) {
                            setTimeout(rmFromNameSpace, 1000);
                        }
                        else
                            displayProgress();
                        progress = 100;
                    }
                    this.setAttribute(progressNameString, progress + "%");
                }, freq);
            };
            displayProgress();
        });
    }
    else {
        let o = options;
        let easingFunc;
        // Defaults
        if (o.start === undefined)
            o.start = 0;
        if (o.end === undefined)
            o.end = o.start + 100;
        if (o.smooth === undefined)
            o.smooth = true;
        if (o.active === undefined)
            o.active = new front_db__WEBPACK_IMPORTED_MODULE_1__["Data"](true);
        if (o.easing === undefined) {
            easingFunc = easeInOutFunc;
        }
        else {
            //@ts-ignore
            if (typeof o.easing === "string")
                o.easing = new waapi_easing__WEBPACK_IMPORTED_MODULE_7__["default"](o.easing);
            easingFunc = o.easing.function;
        }
        if (o.start >= o.end)
            throw "Given option start " + o.start + " and end " + o.end + " are not consistent. End must be greater than start.";
        o.active.subscribe((active) => {
            notActive = !active;
            if (active) {
                elemsWithoutConsitentTransformProps.add(elemsWithoutConsitentTransformPropsKey);
                subscription();
            }
            else {
                if (elemsWithoutConsitentTransformProps.includes(elemsWithoutConsitentTransformPropsKey)) {
                    thisTransProps.transform = getComputedStyle(this).transform;
                    elemsWithoutConsitentTransformProps.rm(elemsWithoutConsitentTransformPropsKey);
                }
                this.setAttribute(progressNameString, "Inactive");
            }
        }, false);
        let inSmoothing;
        let cancelSmoothing;
        let lastAnimation;
        let lastProgress = minAnimationProgress;
        let progress = minAnimationProgress;
        let progressAbsorption = 0;
        let nextProgress = 1;
        let prevProgress = 0;
        let slide = 0;
        let lastProgressAbsorption = progressAbsorption;
        let rawProgress = minAnimationProgress;
        let rawLastProgress = minAnimationProgress;
        let notActive = !o.active.val;
        let notInLimitCorrection = true;
        let absuluteProgress;
        let lastCycle;
        let tweeny;
        if (animateViaProp) {
            let tweenOptions = {
                easing: a => a,
                duration: 1,
                fill: true,
                iterations: o.iterations
            };
            // Format
            tweeny = new tween_object__WEBPACK_IMPORTED_MODULE_5__["default"](true, seperatedKeyframes.prop, tweenOptions);
            // TODO: Dont do this via onUpdate; Use parse functions instead
            tweeny.onUpdate((keyframe) => {
                for (let prop in keyframe) {
                    keyframe[prop] = postFixStyle(prop, keyframe[prop], parseIndexMap[prop], false);
                }
            });
            const fill = { attr: [], prop: [] };
            const firstProp = Object(tiny_clone__WEBPACK_IMPORTED_MODULE_8__["default"])(seperatedKeyframes.prop.first);
            delete firstProp.offset;
            for (let prop in firstProp) {
                fill[parseIndexMap[prop]].add(prop);
            }
            if (!fill.attr.empty) {
                tweeny.onUpdate((keyframe) => {
                    fill.attr.ea((key) => {
                        this.setAttribute(key, keyframe[key]);
                    });
                });
            }
            if (!fill.prop.empty) {
                tweeny.onUpdate((keyframe) => {
                    fill.prop.ea((key) => {
                        this[key] = keyframe[key];
                    });
                });
            }
        }
        // Since this gets called VERY often, keep variable declaration to a minimum. Every mem allocation needs to be garbage collected.
        const subscription = () => {
            if (notActive)
                return;
            lastProgress = progress;
            rawLastProgress = rawProgress;
            progress = progressToSaveProgress(((absuluteProgress - o.start) / (o.end - o.start)));
            rawProgress = progress;
            if (progress === lastProgress)
                return;
            if (inSmoothing) {
                cancelSmoothing();
                if (rawLastProgress === rawProgress)
                    return;
            }
            if (o.smooth) {
                if (rawLastProgress < rawProgress) {
                    progressAbsorption = progressAbsorption * (rawProgress - nextProgress) / (rawLastProgress - nextProgress);
                }
                else {
                    progressAbsorption = progressAbsorption * (rawProgress - prevProgress) / (rawLastProgress - prevProgress);
                }
                if ((lastProgressAbsorption < 0 && progressAbsorption >= 0) || (progressAbsorption <= 0 && lastProgressAbsorption > 0)) {
                    progressAbsorption = 0;
                }
                progress += progressAbsorption;
                lastProgressAbsorption = progressAbsorption;
                slide = (slide / 1.7) + ((progress - lastProgress) / frameDelta);
            }
            let diff = progress - lastProgress;
            let overlimit = Math.abs(diff) > maxProgressInOneStep && !veryFirst;
            if (overlimit) {
                progress = progressToSaveProgress(lastProgress + (((diff > 0) ? maxProgressInOneStepWithoutDelta : -maxProgressInOneStepWithoutDelta) * frameDelta));
            }
            if (lastProgress === minAnimationProgress || lastProgress === maxAnimationProgress) {
                if (needToCalculateInitalFrame) {
                    endFrames[0] = currentFrame(allKeys, this, parseIndexMap, thisTransProps);
                    needToCalculateInitalFrame = false;
                }
                if (o.inCb !== undefined) {
                    if (typeof o.inCb === "string")
                        this[o.inCb]();
                    else
                        o.inCb.call(this);
                }
            }
            //animation
            setTimeout(() => {
                this.setAttribute(progressNameString, Math.round(progress * 100) + "%");
            }, 0);
            if (animateViaWaapi)
                if (lastAnimation !== undefined)
                    lastAnimation.cancel();
            let thisCycle = Symbol("Cycle");
            lastCycle = thisCycle;
            try {
                if (animateViaWaapi) {
                    lastAnimation = this.animate(endFrames, { duration: 1, fill: "both", easing: "linear", iterations: 1, iterationStart: progressToSaveProgress(easingFunc(progress)) });
                    lastAnimation.pause();
                }
                if (animateViaProp) {
                    tweeny.update(easingFunc(progress));
                }
            }
            catch (e) {
                errorAnimation("main", endFrames, progressToSaveProgress(easingFunc(progress)), this, e);
                progressAbsorption = 0;
                progress = 1;
            }
            requestAnimationFrame(() => {
                if (overlimit && !(progress <= minAnimationProgress || progress >= maxAnimationProgress)) {
                    notInLimitCorrection = false;
                    subscription();
                    return;
                }
                else
                    notInLimitCorrection = true;
                requestAnimationFrame(() => {
                    if (thisCycle === lastCycle) {
                        let rdyToSetEndVals;
                        if (o.smooth) {
                            let resRdyToSetEndVals;
                            rdyToSetEndVals = new SyncProm((res) => {
                                resRdyToSetEndVals = res;
                            });
                            inSmoothing = true;
                            let cancelAnimationSmoothing;
                            cancelSmoothing = () => {
                                cancelAnimationSmoothing = true;
                                cleanUpSmoothening(true);
                            };
                            let smoothProgress = progress;
                            let localCopyOfProgress = progress;
                            let that = this;
                            smooth();
                            function smooth() {
                                if (cancelAnimationSmoothing) {
                                    cancelAnimationSmoothing = false;
                                    return;
                                }
                                smoothProgress += slide * frameDelta;
                                slide = slide * .5;
                                // To be honest I dont know why this cant be just done once at to start of cleanUpSmoothening but wired things happen if it doesnt go here
                                // this keyframes shows the problem {translateX: 500}, {translateY: 500, backgroundColor: "red"},
                                smoothProgress = progressToSaveProgress(smoothProgress);
                                // TODO: move variable declaration outside of loop
                                let easedSmoothProgress = easingFunc(smoothProgress);
                                let minBorderReached = easedSmoothProgress <= minAnimationProgress;
                                let maxBorderReached = easedSmoothProgress >= maxAnimationProgress;
                                if (minBorderReached)
                                    easedSmoothProgress = minAnimationProgress;
                                else if (maxBorderReached)
                                    easedSmoothProgress = maxAnimationProgress;
                                try {
                                    if (animateViaWaapi) {
                                        if (lastAnimation !== undefined)
                                            lastAnimation.cancel();
                                        lastAnimation = that.animate(endFrames, { duration: 1, fill: "both", easing: "linear", iterations: 1, iterationStart: easedSmoothProgress });
                                        lastAnimation.pause();
                                    }
                                    if (animateViaProp) {
                                        tweeny.update(easedSmoothProgress);
                                    }
                                }
                                catch (e) {
                                    errorAnimation("smooth", endFrames, easedSmoothProgress, that, e);
                                    progressAbsorption = 0;
                                    progress = 0;
                                    return;
                                }
                                if (Math.abs(slide) >= .000001 && !(minBorderReached || maxBorderReached))
                                    requestAnimationFrame(smooth);
                                else
                                    cleanUpSmoothening(false);
                            }
                            function cleanUpSmoothening(hurry) {
                                slide = 0;
                                let smallerProgress;
                                let biggerProgress;
                                if (localCopyOfProgress < smoothProgress) {
                                    smallerProgress = localCopyOfProgress;
                                    biggerProgress = smoothProgress;
                                }
                                else {
                                    smallerProgress = smoothProgress;
                                    biggerProgress = localCopyOfProgress;
                                }
                                for (let { offset } of endFrames) {
                                    if (offset <= smallerProgress) {
                                        prevProgress = offset;
                                    }
                                    else if (offset >= biggerProgress) {
                                        nextProgress = offset;
                                        break;
                                    }
                                }
                                progressAbsorption = progressAbsorption + ((smoothProgress - localCopyOfProgress));
                                lastProgressAbsorption = progressAbsorption;
                                if (hurry)
                                    lastProgress = smoothProgress;
                                else
                                    progress = smoothProgress;
                                inSmoothing = false;
                                resRdyToSetEndVals(hurry);
                            }
                        }
                        else
                            rdyToSetEndVals = SyncProm.resolve(false);
                        rdyToSetEndVals.then((hurry) => {
                            if (!hurry) {
                                let currentFrame = {};
                                let cs = getComputedStyle(this);
                                allKeys.ea((key) => {
                                    currentFrame[key] = cs[key];
                                });
                                //@ts-ignore
                                if (currentFrame.transform !== undefined && elemsWithoutConsitentTransformProps.includes(elemsWithoutConsitentTransformPropsKey)) {
                                    //@ts-ignore
                                    thisTransProps.transform = currentFrame.transform;
                                    elemsWithoutConsitentTransformProps.rm(elemsWithoutConsitentTransformPropsKey);
                                    first = true;
                                    let transform = thisTransProps.toString();
                                    //@ts-ignore
                                    if (transform !== "none")
                                        currentFrame.transform = transform;
                                    //@ts-ignore
                                    else
                                        delete currentFrame.transform;
                                }
                                this.css(currentFrame);
                            }
                            if (animateViaWaapi) {
                                if (cssCanBeUsedToFill)
                                    lastAnimation.cancel();
                                lastAnimation = undefined;
                            }
                            if (progress === minAnimationProgress || progress === maxAnimationProgress) {
                                if (o.outCb !== undefined) {
                                    if (typeof o.outCb === "string")
                                        this[o.outCb]();
                                    else
                                        o.outCb.call(this);
                                }
                            }
                        });
                    }
                });
            });
        };
        let first = true;
        let veryFirst = true;
        guidance.subscribe((progress) => {
            absuluteProgress = progress;
            if (notInLimitCorrection) {
                subscription();
            }
            if (veryFirst)
                veryFirst = false;
            if (first) {
                elemsWithoutConsitentTransformProps.add(elemsWithoutConsitentTransformPropsKey);
                first = false;
            }
        });
    }
});
function setKeyframe(keyframe, that) {
    delete keyframe.offset;
    formatCss(keyframe, that, stylePropertyAttributeOfKeyframe(that, Object.keys(keyframe)), false);
    for (let prop in keyframe) {
        that.style[prop] = keyframe[prop];
    }
}
function errorAnimation(thread, workingFrames, progress, that, error) {
    console.error("Unexpected error while animating (Thread: " + thread + ") using the following parameters\n\nFrames: ", workingFrames, "\nProgress: ", progress, "\n\nSetting progressAbsorption to 0 to prevent further failures.\nthis: ", that, "\nException: \n", error);
}
class SyncProm {
    constructor(cb) {
        this._then = [];
        this.hasBeenResed = false;
        if (cb !== undefined) {
            cb(this._res.bind(this), this._rej.bind(this));
        }
        else {
            this.res = this._res;
            this.rej = this._rej;
        }
    }
    static resolve(res) {
        return new SyncProm((r) => { r(res); });
    }
    static reject() {
        return new SyncProm((r, n) => { n(); });
    }
    _res(val) {
        let then = this._then;
        for (let i = 0; i < then.length; i++) {
            then[i](val);
            delete then[i];
        }
        this.hasBeenResed = true;
        this.resVal = val;
    }
    _rej() {
        delete this._then;
        this.hasBeenResed = null;
    }
    then(to) {
        if (this.hasBeenResed) {
            to(this.resVal);
        }
        else if (this.hasBeenResed !== null) {
            this._then.add(to);
        }
    }
}
// transform props distinguish
function convertFrameStructure(ob) {
    let max = 0;
    for (let key in ob) {
        let x = ob[key].length;
        if (max < x)
            max = x;
    }
    let o = [];
    for (let i = 0; i < max; i++) {
        o[i] = {};
    }
    for (let key in ob) {
        ob[key].forEach((val, i) => {
            o[i][key] = val;
        });
    }
    return o;
}
function setupBackgroundTask(task, constraint = { time: 16, timeout: 16 }) {
    //@ts-ignore
    if (constraint.timeout === undefined)
        constraint.timeout = 16;
    const requestQueue = [];
    let importanceStructureHasChanged = false;
    let recursionOngoing = false;
    let start;
    let iterationsAsConstraint = "iterations" in constraint;
    let initRecursion = iterationsAsConstraint ? () => {
        start = 0;
    } : () => {
        start = new Date();
    };
    let compairConstraint = iterationsAsConstraint ? () => {
        //@ts-ignore
        start++;
        //@ts-ignore
        return start > constraint.iterations;
    } : () => {
        //@ts-ignore
        return new Date() - start > constraint.time;
    };
    function changeImportanceStructure() {
        importanceStructureHasChanged = true;
    }
    return function execute(params, importance = 0) {
        return new Promise((res) => {
            if (importance instanceof front_db__WEBPACK_IMPORTED_MODULE_1__["Data"]) {
                requestQueue.add({ importance, params, res });
                importance.subscribe(changeImportanceStructure);
            }
            else
                requestQueue.add({ importance: { val: importance }, params, res });
            if (!recursionOngoing) {
                recursionOngoing = true;
                setTimeout(() => {
                    initRecursion();
                    recursivelyCallElems();
                }, 0);
            }
        });
    };
    async function recursivelyCallElems() {
        if (importanceStructureHasChanged) {
            sortRequestQueue();
            importanceStructureHasChanged = false;
        }
        if (!requestQueue.empty) {
            let elem = requestQueue.first;
            elem.res(task(...elem.params));
            requestQueue.rmI(0);
            if (compairConstraint()) {
                setTimeout(() => {
                    initRecursion();
                    recursivelyCallElems();
                }, constraint.timeout);
            }
            else
                recursivelyCallElems();
        }
        else {
            recursionOngoing = false;
        }
    }
    function sortRequestQueue() {
        requestQueue.sort(({ importance: a }, { importance: b }) => {
            return a.val - b.val;
        });
    }
}
function progressToSaveProgress(progress) {
    if (progress < minAnimationProgress)
        progress = minAnimationProgress;
    else if (progress > maxAnimationProgress)
        progress = maxAnimationProgress;
    return progress;
}
let getStyleAtProgress = (() => {
    // TODO: Dont always use waapi to interpolate. For simple numeric values you could use TweenObject
    // TODO: Dont always create new Transfrom prop to calc it. Every elements at this point must have 
    // one. And it must be consistant, as far as I am concerned. But check if when the cleanup of the
    // last animation is called.
    const linear = "linear";
    const both = "both";
    return setupBackgroundTask(getStyleAtProgress);
    function getStyleAtProgress(frames, intrest, el, parseIndexMap) {
        let { keys } = intrest;
        let transformKeys = [];
        keys.ea((e, i) => {
            if (TransformProp.applies(e))
                transformKeys.add(i);
        });
        keys.rmI(...transformKeys);
        frames.ea((frame) => {
            formatCss(frame, true, parseIndexMap);
        });
        let animation = el.animate(frames, {
            duration: 100,
            fill: both,
            easing: linear,
            iterations: 1,
            iterationStart: progressToSaveProgress(intrest.at)
        });
        let res = {};
        let cs = getComputedStyle(el);
        if (!transformKeys.empty) {
            let t = new TransformProp();
            //@ts-ignore
            t.transform = cs.transform;
            transformKeys.ea((key) => {
                res[key] = t.primitives[key];
            });
        }
        for (let k of keys) {
            res[k] = cs[k];
        }
        animation.cancel();
        return res;
    }
})();


/***/ }),

/***/ "./node_modules/extended-dom/app/dist/lib/attatchToProto.js":
/*!******************************************************************!*\
  !*** ./node_modules/extended-dom/app/dist/lib/attatchToProto.js ***!
  \******************************************************************/
/*! exports provided: at, ae */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "at", function() { return at; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ae", function() { return ae; });
/* harmony import */ var attatch_to_prototype__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! attatch-to-prototype */ "./node_modules/attatch-to-prototype/app/dist/attatchToPrototype.js");

const defaultOptions = { enumerable: true };
// apply (to) Target
const at = Object(attatch_to_prototype__WEBPACK_IMPORTED_MODULE_0__["constructApplyToPrototype"])(EventTarget.prototype, defaultOptions);
// apply (to) Element
const ae = Object(attatch_to_prototype__WEBPACK_IMPORTED_MODULE_0__["constructApplyToPrototype"])(Element.prototype, defaultOptions);


/***/ }),

/***/ "./node_modules/extended-dom/app/dist/lib/parse.js":
/*!*********************************************************!*\
  !*** ./node_modules/extended-dom/app/dist/lib/parse.js ***!
  \*********************************************************/
/*! exports provided: parseIn, parseOut */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseIn", function() { return parseIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseOut", function() { return parseOut; });
/* harmony import */ var tween_svg_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tween-svg-path */ "./node_modules/tween-svg-path/app/dist/tweenSvgPath.js");
/* harmony import */ var tiny_clone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tiny-clone */ "./node_modules/tiny-clone/app/dist/tinyClone.js");


const styleIn = {};
const attrIn = {};
const propIn = {};
const parseIn = { style: styleIn, prop: propIn, attr: attrIn };
const attrOut = {};
const propOut = {};
const parseOut = { style: {}, prop: attrOut, attr: propOut };
let hasPx = ["x", "y", "z", "translateX", "translateY", "translateZ", "rotate", "rotate3d", "translate", "translate3d", "backgroundSize", "border", "borderBottom", "borderBottomLeftRadius", "borderBottomRightRadius", "borderBottomWidth", "borderLeft", "borderLeftWidth", "borderRadius", "borderRight", "borderRightWidth", "borderTop", "borderTopLeftRadius", "borderTopRightRadius", "borderTopWidth", "borderWidth", "bottom", "columnGap", "columnRuleWidth", "columnWidth", "columns", "flexBasis", "font", "fontSize", "gridColumnGap", "gridGap", "gridRowGap", "height", "left", "letterSpacing", "lineHeight", "margin", "marginBottom", "marginLeft", "marginRight", "marginTop", "maskSize", "maxHeight", "maxWidth", "minHeight", "minWidth", "outline", "outlineOffset", "outlineWidth", "padding", "paddingBottom", "paddingLeft", "paddingRight", "paddingTop", "perspective", "right", "shapeMargin", "tabSize", "top", "width", "wordSpacing"];
let hasDeg = ["rotateX", "rotateY", "rotateZ", "rotate", "skewX", "skewY", "skew"];
let px = "px";
let deg = "deg";
hasPx.ea((e) => {
    styleIn[e] = px;
});
hasDeg.ea((e) => {
    styleIn[e] = deg;
});
function startsWith(pre) {
    return function (style) {
        return style.substr(0, pre.length) === pre;
    };
}
function endsWith(post) {
    return function (style) {
        return style.substr(style.length - post.length) === post;
    };
}
function optionalPrePostFix(pre, post) {
    const start = startsWith(pre);
    const end = endsWith(post);
    return function (style) {
        if (start(style))
            style = pre + style;
        if (end(style))
            style += post;
        return style;
    };
}
function deleteIfFound(...query) {
    return function (style) {
        query.ea((e) => {
            style = style.split(e).join("");
        });
        return style;
    };
}
styleIn.backgroundImage = optionalPrePostFix("url(", ")");
// const startsWithPath = startsWith("path(")
// const endsWithBracket = endsWith(")")
const deletePathPrefixes = deleteIfFound("path(\"", "\")", "path('", "')", "path(`", "`)");
styleIn.d = (style) => {
    style = deletePathPrefixes(style);
    style = tween_svg_path__WEBPACK_IMPORTED_MODULE_0__["parse"].toPath(tween_svg_path__WEBPACK_IMPORTED_MODULE_0__["parse"].toObject(style));
    style = "path(\"" + style + "\")";
    return style;
};
propIn.d = attrIn.d = (style) => {
    return tween_svg_path__WEBPACK_IMPORTED_MODULE_0__["parse"].toObject(deletePathPrefixes(style));
};
propOut.d = attrOut.d = (style) => {
    // TODO: check if this even has any performace benefits
    style = Object(tiny_clone__WEBPACK_IMPORTED_MODULE_1__["default"])(style);
    style.ea((s) => {
        for (let i = 1; i < s.length; i++) {
            s[i] = (Math.round(s[i] * 100) / 100);
        }
    });
    return tween_svg_path__WEBPACK_IMPORTED_MODULE_0__["parse"].toPath(style);
};


/***/ }),

/***/ "./node_modules/extended-dom/app/dist/lib/polyfill.js":
/*!************************************************************!*\
  !*** ./node_modules/extended-dom/app/dist/lib/polyfill.js ***!
  \************************************************************/
/*! exports provided: init, polyfills */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "polyfills", function() { return polyfills; });
function init() {
    let proms = [];
    // -------------------------------------------- \\
    // -------------------------------------------- \\
    // --------------
    // ResizeObserver
    // --------------
    //@ts-ignore
    if (window.ResizeObserver === undefined) {
        proms.add(__webpack_require__.e(/*! import() | resizeObserverPolyfill */ "vendors~resizeObserverPolyfill").then(__webpack_require__.bind(null, /*! resize-observer-polyfill */ "./node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js")).then(({ default: r }) => { polyfills.ResizeObserver = r; }));
    }
    //@ts-ignore
    else
        polyfills.ResizeObserver = window.ResizeObserver;
    // ----------------
    // webAnimationsApi
    // ----------------
    if (Element.prototype.animate === undefined)
        proms.add(__webpack_require__.e(/*! import() | webAnimationsApiPolyfill */ "vendors~webAnimationsApiPolyfill").then(__webpack_require__.t.bind(null, /*! web-animations-js */ "./node_modules/web-animations-js/web-animations.min.js", 7)));
    // -------------------------------------------- \\
    // -------------------------------------------- \\
    return Promise.all(proms);
}
const polyfills = {};


/***/ }),

/***/ "./node_modules/fast-equals/dist/fast-equals.js":
/*!******************************************************!*\
  !*** ./node_modules/fast-equals/dist/fast-equals.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function (global, factory) {
   true ? factory(exports) :
  undefined;
}(this, function (exports) { 'use strict';

  var HAS_WEAKSET_SUPPORT = typeof WeakSet === 'function';
  var keys = Object.keys;
  /**
   * @function addToCache
   *
   * add object to cache if an object
   *
   * @param value the value to potentially add to cache
   * @param cache the cache to add to
   */
  function addToCache(value, cache) {
      if (value && typeof value === 'object') {
          cache.add(value);
      }
  }
  /**
   * @function hasPair
   *
   * @description
   * does the `pairToMatch` exist in the list of `pairs` provided based on the
   * `isEqual` check
   *
   * @param pairs the pairs to compare against
   * @param pairToMatch the pair to match
   * @param isEqual the equality comparator used
   * @param meta the meta provided
   * @returns does the pair exist in the pairs provided
   */
  function hasPair(pairs, pairToMatch, isEqual, meta) {
      var length = pairs.length;
      var pair;
      for (var index = 0; index < length; index++) {
          pair = pairs[index];
          if (isEqual(pair[0], pairToMatch[0], meta) &&
              isEqual(pair[1], pairToMatch[1], meta)) {
              return true;
          }
      }
      return false;
  }
  /**
   * @function hasValue
   *
   * @description
   * does the `valueToMatch` exist in the list of `values` provided based on the
   * `isEqual` check
   *
   * @param values the values to compare against
   * @param valueToMatch the value to match
   * @param isEqual the equality comparator used
   * @param meta the meta provided
   * @returns does the value exist in the values provided
   */
  function hasValue(values, valueToMatch, isEqual, meta) {
      var length = values.length;
      for (var index = 0; index < length; index++) {
          if (isEqual(values[index], valueToMatch, meta)) {
              return true;
          }
      }
      return false;
  }
  /**
   * @function sameValueZeroEqual
   *
   * @description
   * are the values passed strictly equal or both NaN
   *
   * @param a the value to compare against
   * @param b the value to test
   * @returns are the values equal by the SameValueZero principle
   */
  function sameValueZeroEqual(a, b) {
      return a === b || (a !== a && b !== b);
  }
  /**
   * @function isPlainObject
   *
   * @description
   * is the value a plain object
   *
   * @param value the value to test
   * @returns is the value a plain object
   */
  function isPlainObject(value) {
      return value.constructor === Object || value.constructor == null;
  }
  /**
   * @function isPromiseLike
   *
   * @description
   * is the value promise-like (meaning it is thenable)
   *
   * @param value the value to test
   * @returns is the value promise-like
   */
  function isPromiseLike(value) {
      return !!value && typeof value.then === 'function';
  }
  /**
   * @function isReactElement
   *
   * @description
   * is the value passed a react element
   *
   * @param value the value to test
   * @returns is the value a react element
   */
  function isReactElement(value) {
      return !!(value && value.$$typeof);
  }
  /**
   * @function getNewCacheFallback
   *
   * @description
   * in cases where WeakSet is not supported, creates a new custom
   * object that mimics the necessary API aspects for cache purposes
   *
   * @returns the new cache object
   */
  function getNewCacheFallback() {
      return Object.create({
          _values: [],
          add: function (value) {
              this._values.push(value);
          },
          has: function (value) {
              return this._values.indexOf(value) !== -1;
          },
      });
  }
  /**
   * @function getNewCache
   *
   * @description
   * get a new cache object to prevent circular references
   *
   * @returns the new cache object
   */
  var getNewCache = (function (canUseWeakMap) {
      if (canUseWeakMap) {
          return function _getNewCache() {
              return new WeakSet();
          };
      }
      return getNewCacheFallback;
  })(HAS_WEAKSET_SUPPORT);
  /**
   * @function createCircularEqualCreator
   *
   * @description
   * create a custom isEqual handler specific to circular objects
   *
   * @param [isEqual] the isEqual comparator to use instead of isDeepEqual
   * @returns the method to create the `isEqual` function
   */
  function createCircularEqualCreator(isEqual) {
      return function createCircularEqual(comparator) {
          var _comparator = isEqual || comparator;
          return function circularEqual(a, b, cache) {
              if (cache === void 0) { cache = getNewCache(); }
              var hasA = cache.has(a);
              var hasB = cache.has(b);
              if (hasA || hasB) {
                  return hasA && hasB;
              }
              addToCache(a, cache);
              addToCache(b, cache);
              return _comparator(a, b, cache);
          };
      };
  }
  /**
   * @function toPairs
   *
   * @description
   * convert the map passed into pairs (meaning an array of [key, value] tuples)
   *
   * @param map the map to convert to [key, value] pairs (entries)
   * @returns the [key, value] pairs
   */
  function toPairs(map) {
      var pairs = new Array(map.size);
      var index = 0;
      map.forEach(function (value, key) {
          pairs[index++] = [key, value];
      });
      return pairs;
  }
  /**
   * @function toValues
   *
   * @description
   * convert the set passed into values
   *
   * @param set the set to convert to values
   * @returns the values
   */
  function toValues(set) {
      var values = new Array(set.size);
      var index = 0;
      set.forEach(function (value) {
          values[index++] = value;
      });
      return values;
  }
  /**
   * @function areArraysEqual
   *
   * @description
   * are the arrays equal in value
   *
   * @param a the array to test
   * @param b the array to test against
   * @param isEqual the comparator to determine equality
   * @param meta the meta object to pass through
   * @returns are the arrays equal
   */
  function areArraysEqual(a, b, isEqual, meta) {
      var length = a.length;
      if (b.length !== length) {
          return false;
      }
      for (var index = 0; index < length; index++) {
          if (!isEqual(a[index], b[index], meta)) {
              return false;
          }
      }
      return true;
  }
  /**
   * @function areMapsEqual
   *
   * @description
   * are the maps equal in value
   *
   * @param a the map to test
   * @param b the map to test against
   * @param isEqual the comparator to determine equality
   * @param meta the meta map to pass through
   * @returns are the maps equal
   */
  function areMapsEqual(a, b, isEqual, meta) {
      if (a.size !== b.size) {
          return false;
      }
      var pairsA = toPairs(a);
      var pairsB = toPairs(b);
      var length = pairsA.length;
      for (var index = 0; index < length; index++) {
          if (!hasPair(pairsB, pairsA[index], isEqual, meta) ||
              !hasPair(pairsA, pairsB[index], isEqual, meta)) {
              return false;
          }
      }
      return true;
  }
  var OWNER = '_owner';
  var hasOwnProperty = Function.prototype.bind.call(Function.prototype.call, Object.prototype.hasOwnProperty);
  /**
   * @function areObjectsEqual
   *
   * @description
   * are the objects equal in value
   *
   * @param a the object to test
   * @param b the object to test against
   * @param isEqual the comparator to determine equality
   * @param meta the meta object to pass through
   * @returns are the objects equal
   */
  function areObjectsEqual(a, b, isEqual, meta) {
      var keysA = keys(a);
      var length = keysA.length;
      if (keys(b).length !== length) {
          return false;
      }
      var key;
      for (var index = 0; index < length; index++) {
          key = keysA[index];
          if (!hasOwnProperty(b, key)) {
              return false;
          }
          if (key === OWNER && isReactElement(a)) {
              if (!isReactElement(b)) {
                  return false;
              }
          }
          else if (!isEqual(a[key], b[key], meta)) {
              return false;
          }
      }
      return true;
  }
  /**
   * @function areRegExpsEqual
   *
   * @description
   * are the regExps equal in value
   *
   * @param a the regExp to test
   * @param b the regExp to test agains
   * @returns are the regExps equal
   */
  function areRegExpsEqual(a, b) {
      return (a.source === b.source &&
          a.global === b.global &&
          a.ignoreCase === b.ignoreCase &&
          a.multiline === b.multiline &&
          a.unicode === b.unicode &&
          a.sticky === b.sticky &&
          a.lastIndex === b.lastIndex);
  }
  /**
   * @function areSetsEqual
   *
   * @description
   * are the sets equal in value
   *
   * @param a the set to test
   * @param b the set to test against
   * @param isEqual the comparator to determine equality
   * @param meta the meta set to pass through
   * @returns are the sets equal
   */
  function areSetsEqual(a, b, isEqual, meta) {
      if (a.size !== b.size) {
          return false;
      }
      var valuesA = toValues(a);
      var valuesB = toValues(b);
      var length = valuesA.length;
      for (var index = 0; index < length; index++) {
          if (!hasValue(valuesB, valuesA[index], isEqual, meta) ||
              !hasValue(valuesA, valuesB[index], isEqual, meta)) {
              return false;
          }
      }
      return true;
  }

  var isArray = Array.isArray;
  var HAS_MAP_SUPPORT = typeof Map === 'function';
  var HAS_SET_SUPPORT = typeof Set === 'function';
  var OBJECT_TYPEOF = 'object';
  function createComparator(createIsEqual) {
      var isEqual = 
      /* eslint-disable no-use-before-define */
      typeof createIsEqual === 'function'
          ? createIsEqual(comparator)
          : comparator;
      /* eslint-enable */
      /**
       * @function comparator
       *
       * @description
       * compare the value of the two objects and return true if they are equivalent in values
       *
       * @param a the value to test against
       * @param b the value to test
       * @param [meta] an optional meta object that is passed through to all equality test calls
       * @returns are a and b equivalent in value
       */
      function comparator(a, b, meta) {
          if (sameValueZeroEqual(a, b)) {
              return true;
          }
          if (a && b && typeof a === OBJECT_TYPEOF && typeof b === OBJECT_TYPEOF) {
              if (isPlainObject(a) && isPlainObject(b)) {
                  return areObjectsEqual(a, b, isEqual, meta);
              }
              var arrayA = isArray(a);
              var arrayB = isArray(b);
              if (arrayA || arrayB) {
                  return arrayA === arrayB && areArraysEqual(a, b, isEqual, meta);
              }
              var aDate = a instanceof Date;
              var bDate = b instanceof Date;
              if (aDate || bDate) {
                  return aDate === bDate && sameValueZeroEqual(a.getTime(), b.getTime());
              }
              var aRegExp = a instanceof RegExp;
              var bRegExp = b instanceof RegExp;
              if (aRegExp || bRegExp) {
                  return aRegExp === bRegExp && areRegExpsEqual(a, b);
              }
              if (isPromiseLike(a) || isPromiseLike(b)) {
                  return a === b;
              }
              if (HAS_MAP_SUPPORT) {
                  var aMap = a instanceof Map;
                  var bMap = b instanceof Map;
                  if (aMap || bMap) {
                      return aMap === bMap && areMapsEqual(a, b, isEqual, meta);
                  }
              }
              if (HAS_SET_SUPPORT) {
                  var aSet = a instanceof Set;
                  var bSet = b instanceof Set;
                  if (aSet || bSet) {
                      return aSet === bSet && areSetsEqual(a, b, isEqual, meta);
                  }
              }
              return areObjectsEqual(a, b, isEqual, meta);
          }
          return false;
      }
      return comparator;
  }

  // comparator
  var deepEqual = createComparator();
  var shallowEqual = createComparator(function () { return sameValueZeroEqual; });
  var circularDeepEqual = createComparator(createCircularEqualCreator());
  var circularShallowEqual = createComparator(createCircularEqualCreator(sameValueZeroEqual));

  exports.circularDeepEqual = circularDeepEqual;
  exports.circularShallowEqual = circularShallowEqual;
  exports.createCustomEqual = createComparator;
  exports.deepEqual = deepEqual;
  exports.sameValueZeroEqual = sameValueZeroEqual;
  exports.shallowEqual = shallowEqual;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=fast-equals.js.map


/***/ }),

/***/ "./node_modules/front-db/app/dist/f-db.js":
/*!************************************************!*\
  !*** ./node_modules/front-db/app/dist/f-db.js ***!
  \************************************************/
/*! exports provided: InvalidKey, InvalidCast, default, DataBase, DataNumber, DataArray, Data */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InvalidKey", function() { return InvalidKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InvalidCast", function() { return InvalidCast; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return setData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataBase", function() { return DataBase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataNumber", function() { return DataNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataArray", function() { return DataArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Data", function() { return Data; });
/* harmony import */ var xrray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! xrray */ "./node_modules/xrray/xrray.js");
/* harmony import */ var xrray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(xrray__WEBPACK_IMPORTED_MODULE_0__);
// This file basically contains a observable Class (called Data) and a
// DataBase which contains a komplex (not primitiv types = objects)
// map off Observables as is often given when requesting data (e.g. JSON).

xrray__WEBPACK_IMPORTED_MODULE_0___default()(Array);
//@ts-ignore
const { InvalidValueException } = xrray__WEBPACK_IMPORTED_MODULE_0___default.a;
class InvalidKey extends Error {
    constructor(key, data) {
        super("Invalid key \"" + key + "\" for the following data structure:\n" + data.toString());
    }
}
class InvalidCast extends Error {
    constructor(castAttempt) {
        super("Cannot cast to " + castAttempt.name);
    }
}
// Formats fetched ( = raw) data into an nested Data construct.
function formatData(fetched, formatLocation, deleteUnseenVals = false) {
    if (formatLocation === undefined)
        formatLocation = new Data(new fetched.constructor());
    let ls;
    let updatedFormatLocation = false;
    if (deleteUnseenVals)
        ls = [];
    if (typeof fetched === "object") {
        for (let d in fetched) {
            if (!fetched.hasOwnProperty(d))
                continue;
            if (deleteUnseenVals)
                ls.add(d);
            if (typeof fetched[d] === "object") {
                if (formatLocation.val[d] === undefined)
                    formatLocation.val[d] = new Data(new fetched[d].constructor());
                formatData(fetched[d], formatLocation.val[d], deleteUnseenVals);
                updatedFormatLocation = true;
            }
            else if (formatLocation.val[d] === undefined) {
                formatLocation.val[d] = new Data(fetched[d]);
                updatedFormatLocation = true;
            }
            else if (formatLocation.val[d] instanceof Data)
                formatLocation.val[d].val = fetched[d];
        }
        if (deleteUnseenVals) {
            for (let d in formatLocation.val) {
                if (!formatLocation.val.hasOwnProperty(d))
                    continue;
                if (!ls.includes(d))
                    if (formatLocation.val instanceof Array)
                        formatLocation.val.removeI(parseInt(d));
                    else
                        delete formatLocation.val[d];
                updatedFormatLocation = true;
            }
        }
        //@ts-ignore when something is added notify listeners
        if (updatedFormatLocation)
            formatLocation.notify(true);
    }
    else
        formatLocation.val = fetched;
    return formatLocation;
}
function setData(data, location, complete) {
    if (!(location instanceof Data) && location !== undefined)
        location = new Data(location);
    let dataLocation = formatData(data, location);
    if (complete !== undefined)
        complete();
    return new DataBase(dataLocation);
}
/*
 * Holds and handles access to an complex map of data. This data Consisits of in each other nexted Data intsances
 * (to init such an map, consult formatData.)
 */
class DataBase {
    constructor(data) {
        this.data = data;
    }
    toString() {
        return "DataBase: " + this.data.toString();
    }
    /**
     * Gets a reference to subData found under given key(s) / path
     * A reference is a new DataBase instance just containing the referenced Data
     *
     * This function resolves references via the "recursively anchored Data" (rad) procedure. For further
     * insights what this means please consult the documentation of the function rad
     */
    ref(...keys) {
        return new DataBase(this.rad(...keys));
    }
    peek(...keys) {
        return new DataBase(this.fds(...keys));
    }
    current(...keys) {
        return (this.fds(...keys)).val;
    }
    /**
     * Gets the underlying Data found under given key(s) / path
     * Similar to ref but not wrapped inside a DataBase instance
     *
     * This function resolves references via the "recursively anchored Data" (rad) procedure. For further
     * insights what this means please consult the documentation of the function rad
     */
    get(key, cb) {
        if (typeof key === "string" || typeof key === "number" || key instanceof Data) {
            let data = (key instanceof Data) ? key : this.rad(key);
            if (cb !== undefined) {
                data.subscribe(cb);
            }
            else {
                return data;
            }
        }
        else {
            let map = [];
            if (cb !== undefined) {
                for (let i = 0; i < key.length; i++) {
                    //@ts-ignore
                    let data = (key[i] instanceof Data) ? key[i] : this.rad(key[i]);
                    const subscribtion = (v) => {
                        map[i] = v;
                        if (key.length === map.length) {
                            if (cb !== undefined) {
                                cb(...map);
                            }
                            else
                                return map;
                        }
                    };
                    data.subscribe(subscribtion);
                }
            }
            else {
                for (let i = 0; i < key.length; i++) {
                    //@ts-ignore
                    map[i] = (key[i] instanceof Data) ? key[i] : this.rad(key[i]);
                }
                return map;
            }
        }
    }
    set(key, to) {
        let fds = this.fds(key);
        formatData(to, fds, true);
    }
    /**
     * Gets recursively anchored Data (rad)
     * Meaning for each nesting step there will be one listener attatched to enable objects to be observed
     * This is very resource (mem) expensive. Use only when necessary
     */
    rad(...keys) {
        let last = this.data;
        let organizedKeys = keys.join(".").split(".");
        organizedKeys.ea((k) => {
            if (k !== "") {
                let next = last.val[k];
                if (next === undefined)
                    throw new InvalidKey(k, last);
                //@ts-ignore
                last.subscribeInternally((any) => {
                    let a = any[k];
                    let dt = a instanceof Data;
                    if (!(typeof a === "object" && !dt))
                        next.val = (dt) ? a.val : a;
                });
                last = next;
            }
        });
        return last;
    }
    fds(...keys) {
        let last = this.data;
        let organizedKeys = keys.join(".").split(".");
        organizedKeys.ea((k) => {
            if (k !== "") {
                let next = last.val[k];
                if (next === undefined)
                    throw new InvalidKey(k, last);
                last = next;
            }
        });
        return last;
    }
    //TODO: make this available for DB as a whole and limit acces via interfaces (conditinal types)
    get asArray() {
        //@ts-ignore
        if (this.data.val instanceof Array)
            return new DataArray(this.data);
        else
            throw new InvalidCast(Array);
    }
    get asNumber() {
        //@ts-ignore
        if (typeof this.data.val === "number")
            return new DataNumber(this.data);
        else
            throw new InvalidCast(Number);
    }
    equals(that) {
        return (that === undefined) ? false : this.data.equals(that.data, true);
    }
    same(that) {
        return this.data.val === that.data.val;
    }
}
class DataNumber extends DataBase {
    constructor(data) {
        super(data);
    }
    inc(by = 1) {
        this.data.val += by;
        return this.data.val;
    }
    dec(by = 1) {
        this.data.val -= by;
        return this.data.val;
    }
}
const DataArray_morphMap = new Map();
class DataArray extends DataBase {
    constructor(data) {
        super(data);
    }
    list(loop, stepIntoPathAfterwards = "") {
        for (let i = 0; i < this.length(); i++) {
            let end = loop(new DataBase(this.fds(i, stepIntoPathAfterwards)), i);
            if (end !== undefined)
                return end;
        }
    }
    forEach(loop, beforeLoop, afterLoop, stepIntoPathAfterwards = "") {
        let proms = [];
        this.get("", () => {
            if (beforeLoop !== undefined)
                proms.add(beforeLoop());
            this.data.val.ea((e, i) => {
                proms.add(loop(new DataBase(this.fds(i, stepIntoPathAfterwards)), i));
            });
            proms = proms.filter((e) => {
                return e instanceof Promise;
            });
            if (afterLoop !== undefined) {
                if (proms.length !== 0)
                    Promise.all(proms).then(afterLoop);
                else
                    afterLoop();
            }
        });
        if (proms.length !== 0)
            return Promise.all(proms);
    }
    length(cb) {
        if (cb === undefined)
            return this.data.val.length;
        else {
            this.get("", (a) => {
                cb(a.length);
            });
        }
    }
    realLength(cb) {
        if (cb === undefined)
            return this.data.val.realLength;
        else {
            this.get("", (a) => {
                cb(a.realLength);
            });
        }
    }
    alter(cb, initalizeLoop = false) {
        this.beforeLastChange = this.data.clone();
        if (initalizeLoop) {
            this.data.val.ea((e, i) => {
                cb(new DataBase(e), i);
            });
        }
        this.get("", (a) => {
            let indexesToBeCalled = [];
            a.ea((e, i) => {
                if (e !== undefined) {
                    indexesToBeCalled.add(i);
                    if (!e.equals(this.beforeLastChange.val[i], true))
                        cb(new DataBase(e), i);
                }
            });
            this.beforeLastChange.val.ea((e, i) => {
                if (!indexesToBeCalled.includes(i))
                    cb(null, i);
            });
            this.beforeLastChange = this.data.clone();
        });
    }
    morph(cb, initalizeLoop = false) {
        this.beforeLastChange = this.data.clone();
        if (initalizeLoop) {
            this.data.val.ea((e, i) => {
                cb(new DataBase(e), i);
            });
        }
        let cba = DataArray_morphMap.get(this.data);
        if (cba === undefined)
            DataArray_morphMap.set(this.data, [cb]);
        else
            cba.add(cb);
    }
    add(val, atIndex) {
        let length = this.length();
        let maxIndex = length - 1;
        if (atIndex === undefined)
            atIndex = length;
        this.data.val.Reverse().ea((e, i) => {
            i = maxIndex - i;
            if (i < atIndex)
                return;
            //THIS IF IS NECESSARY BECAUSE WHEN SETTING EMPTY ARRAY SOLOTS TO UNDEFINED THEY GET PICKED UP BY ITERATORS
            if (this.data.val[i] === undefined)
                delete this.data.val[i + 1];
            else
                this.data.val[i + 1] = this.data.val[i];
        });
        delete this.data.val[atIndex];
        let ob = {};
        ob[atIndex] = val;
        formatData(ob, this.data);
        let cba = DataArray_morphMap.get(this.data);
        if (cba !== undefined)
            cba.ea((f) => {
                f(new DataBase(this.data.val[atIndex]), atIndex);
            });
    }
    removeI(index, closeGap = true) {
        if (closeGap)
            this.data.val.removeI(index);
        else
            delete this.data.val[index];
        //@ts-ignore
        this.data.notify(true);
        let cba = DataArray_morphMap.get(this.data);
        if (cba !== undefined)
            cba.ea((f) => {
                f(null, index);
            });
    }
    removeV(val, closeGap = true) {
        let data = formatData(val);
        let index = this.data.val.ea((e, i) => {
            if (e.equals(data))
                return i;
        });
        if (index === undefined)
            throw new InvalidValueException(val, this.data.toString());
        if (closeGap)
            this.data.val.removeI(index);
        else
            delete this.data.val[index];
        //@ts-ignore
        this.data.notify(true);
        let cba = DataArray_morphMap.get(this.data);
        if (cba !== undefined)
            cba.ea((f) => {
                f(null, index);
            });
    }
}
class Data {
    constructor(val) {
        this.cbs = [];
        this.internalCBs = [];
        this.val = val;
    }
    /**
     * Set the val
     */
    set val(to) {
        if (this.val === to)
            return;
        this._val = to;
        this.notify(false);
    }
    /**
     * Gets the current val
     */
    get val() {
        return this._val;
    }
    /**
     * Subscribe to val
     * @param cb callback which gets called whenever the val changes
     */
    subscribe(cb, init = true) {
        this.cbs.add(cb);
        if (init)
            cb(this.val);
        return cb;
    }
    subscribeInternally(cb) {
        this.internalCBs.add(cb);
        cb(this.val);
    }
    unsubscribe(cb) {
        if (cb !== null)
            this.cbs.remove(cb);
        else
            this.cbs.clear();
    }
    toString(tabIn = 0, insideObject = false) {
        tabIn++;
        let s = "";
        let v = this.val;
        if (typeof v === "object") {
            let hasProps = false;
            let ar = v instanceof Array;
            if (ar)
                s += "[";
            else
                s += "{";
            s += "\n";
            for (let k in v) {
                if (!v.hasOwnProperty(k))
                    continue;
                hasProps = true;
                //@ts-ignore
                s += "\t".repeat(tabIn) + k + ": " + v[k].toString(tabIn, true);
            }
            if (!hasProps)
                s = s.substring(0, s.length - 1);
            else {
                s = s.substring(0, s.length - 2) + "\n";
                s += "\t".repeat(tabIn - 1);
            }
            if (ar)
                s += "]";
            else
                s += "}";
        }
        else {
            let st = typeof v === "string";
            if (st)
                s += "\"";
            s += v;
            if (st)
                s += "\"";
        }
        s += insideObject ? "," : "";
        return s + "\n";
    }
    notify(wild = false) {
        let val = this.val;
        this.cbs.ea((f) => {
            f(val);
        });
        if (!wild) {
            this.internalCBs.ea((f) => {
                f(val);
            });
        }
    }
    /**
     * Compares if all keys in this are equal to the equivelent ones on data
     * Different Data Instances holding the same value are the equal
     * Data can have more keys than this and still be equal.
     * If you dont want this pass in true to the strict param. This will be more recource intensive
     */
    equals(data, strict = false) {
        let v = this.val;
        if (data === undefined || data === null)
            return false;
        let d = data.val;
        if (v == d)
            return true;
        let ls;
        if (strict)
            ls = [];
        for (let k in v) {
            if (!v.hasOwnProperty(k))
                continue;
            if (strict)
                ls.add(k);
            if (v[k] !== d[k]) {
                if (v[k] instanceof Data) {
                    if (d[k] instanceof Data) {
                        //@ts-ignore
                        if (!v[k].equals(d[k], strict))
                            return false;
                    }
                    else
                        return false;
                }
                else
                    return false;
            }
        }
        if (strict) {
            for (let k in d) {
                if (!v.hasOwnProperty(k))
                    continue;
                if (!ls.includes(k))
                    return false;
            }
        }
        return true;
    }
    clone() {
        let d;
        let v = this.val;
        if (typeof v === "object") {
            //@ts-ignore
            let data = new v.constructor();
            d = new Data(data);
            for (let k in v) {
                if (!v.hasOwnProperty(k))
                    continue;
                //@ts-ignore
                d.val[k] = v[k].clone();
            }
        }
        else
            d = new Data(v);
        d.internalCBs.add(...this.internalCBs);
        d.cbs.add(...this.cbs);
        return d;
    }
}


/***/ }),

/***/ "./node_modules/normalize-svg-path/index.js":
/*!**************************************************!*\
  !*** ./node_modules/normalize-svg-path/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = normalize

var arcToCurve = __webpack_require__(/*! svg-arc-to-cubic-bezier */ "./node_modules/svg-arc-to-cubic-bezier/modules/index.js")

function normalize(path){
  // init state
  var prev
  var result = []
  var bezierX = 0
  var bezierY = 0
  var startX = 0
  var startY = 0
  var quadX = null
  var quadY = null
  var x = 0
  var y = 0

  for (var i = 0, len = path.length; i < len; i++) {
    var seg = path[i]
    var command = seg[0]

    switch (command) {
      case 'M':
        startX = seg[1]
        startY = seg[2]
        break
      case 'A':
        var curves = arcToCurve({
          px: x,
          py: y,
          cx: seg[6],
          cy:  seg[7],
          rx: seg[1],
          ry: seg[2],
          xAxisRotation: seg[3],
          largeArcFlag: seg[4],
          sweepFlag: seg[5]
        })

        // null-curves
        if (!curves.length) continue

        for (var j = 0, c; j < curves.length; j++) {
          c = curves[j]
          seg = ['C', c.x1, c.y1, c.x2, c.y2, c.x, c.y]
          if (j < curves.length - 1) result.push(seg)
        }

        break
      case 'S':
        // default control point
        var cx = x
        var cy = y
        if (prev == 'C' || prev == 'S') {
          cx += cx - bezierX // reflect the previous command's control
          cy += cy - bezierY // point relative to the current point
        }
        seg = ['C', cx, cy, seg[1], seg[2], seg[3], seg[4]]
        break
      case 'T':
        if (prev == 'Q' || prev == 'T') {
          quadX = x * 2 - quadX // as with 'S' reflect previous control point
          quadY = y * 2 - quadY
        } else {
          quadX = x
          quadY = y
        }
        seg = quadratic(x, y, quadX, quadY, seg[1], seg[2])
        break
      case 'Q':
        quadX = seg[1]
        quadY = seg[2]
        seg = quadratic(x, y, seg[1], seg[2], seg[3], seg[4])
        break
      case 'L':
        seg = line(x, y, seg[1], seg[2])
        break
      case 'H':
        seg = line(x, y, seg[1], y)
        break
      case 'V':
        seg = line(x, y, x, seg[1])
        break
      case 'Z':
        seg = line(x, y, startX, startY)
        break
    }

    // update state
    prev = command
    x = seg[seg.length - 2]
    y = seg[seg.length - 1]
    if (seg.length > 4) {
      bezierX = seg[seg.length - 4]
      bezierY = seg[seg.length - 3]
    } else {
      bezierX = x
      bezierY = y
    }
    result.push(seg)
  }

  return result
}

function line(x1, y1, x2, y2){
  return ['C', x1, y1, x2, y2, x2, y2]
}

function quadratic(x1, y1, cx, cy, x2, y2){
  return [
    'C',
    x1/3 + (2/3) * cx,
    y1/3 + (2/3) * cy,
    x2/3 + (2/3) * cx,
    y2/3 + (2/3) * cy,
    x2,
    y2
  ]
}


/***/ }),

/***/ "./node_modules/parse-svg-path/index.js":
/*!**********************************************!*\
  !*** ./node_modules/parse-svg-path/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


module.exports = parse

/**
 * expected argument lengths
 * @type {Object}
 */

var length = {a: 7, c: 6, h: 1, l: 2, m: 2, q: 4, s: 4, t: 2, v: 1, z: 0}

/**
 * segment pattern
 * @type {RegExp}
 */

var segment = /([astvzqmhlc])([^astvzqmhlc]*)/ig

/**
 * parse an svg path data string. Generates an Array
 * of commands where each command is an Array of the
 * form `[command, arg1, arg2, ...]`
 *
 * @param {String} path
 * @return {Array}
 */

function parse(path) {
	var data = []
	path.replace(segment, function(_, command, args){
		var type = command.toLowerCase()
		args = parseValues(args)

		// overloaded moveTo
		if (type == 'm' && args.length > 2) {
			data.push([command].concat(args.splice(0, 2)))
			type = 'l'
			command = command == 'm' ? 'l' : 'L'
		}

		while (true) {
			if (args.length == length[type]) {
				args.unshift(command)
				return data.push(args)
			}
			if (args.length < length[type]) throw new Error('malformed path data')
			data.push([command].concat(args.splice(0, length[type])))
		}
	})
	return data
}

var number = /-?[0-9]*\.?[0-9]+(?:e[-+]?\d+)?/ig

function parseValues(args) {
	var numbers = args.match(number)
	return numbers ? numbers.map(Number) : []
}


/***/ }),

/***/ "./node_modules/spread-offset/app/dist/spreadOffset.js":
/*!*************************************************************!*\
  !*** ./node_modules/spread-offset/app/dist/spreadOffset.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (keyframes) {
    keyframes[0].offset = 0;
    keyframes[keyframes.length - 1].offset = 1;
    if (keyframes.length === 2)
        return;
    let last = 1;
    let lastOffset = -1;
    for (let i = last; i < keyframes.length; i++) {
        let l = i + 1;
        let o = keyframes[i].offset;
        if (o !== undefined && o !== null) {
            if (o >= lastOffset && o >= 0 && o <= 1) {
                lastOffset = o;
                keyframes.slice(last, l);
                let start = keyframes[last - 1].offset;
                let end = keyframes[i].offset;
                let space = (end - start) / (l - last);
                let offset = start;
                for (let j = last; j < i; j++) {
                    offset += space;
                    keyframes[j].offset = offset;
                }
                last = l;
            }
            else
                throw new Error("Offsets must be given in incrementing sequence, spanning between 0 - 1");
        }
    }
    return keyframes;
});


/***/ }),

/***/ "./node_modules/svg-arc-to-cubic-bezier/modules/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/svg-arc-to-cubic-bezier/modules/index.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var TAU = Math.PI * 2;

var mapToEllipse = function mapToEllipse(_ref, rx, ry, cosphi, sinphi, centerx, centery) {
  var x = _ref.x,
      y = _ref.y;

  x *= rx;
  y *= ry;

  var xp = cosphi * x - sinphi * y;
  var yp = sinphi * x + cosphi * y;

  return {
    x: xp + centerx,
    y: yp + centery
  };
};

var approxUnitArc = function approxUnitArc(ang1, ang2) {
  // If 90 degree circular arc, use a constant
  // as derived from http://spencermortensen.com/articles/bezier-circle
  var a = ang2 === 1.5707963267948966 ? 0.551915024494 : ang2 === -1.5707963267948966 ? -0.551915024494 : 4 / 3 * Math.tan(ang2 / 4);

  var x1 = Math.cos(ang1);
  var y1 = Math.sin(ang1);
  var x2 = Math.cos(ang1 + ang2);
  var y2 = Math.sin(ang1 + ang2);

  return [{
    x: x1 - y1 * a,
    y: y1 + x1 * a
  }, {
    x: x2 + y2 * a,
    y: y2 - x2 * a
  }, {
    x: x2,
    y: y2
  }];
};

var vectorAngle = function vectorAngle(ux, uy, vx, vy) {
  var sign = ux * vy - uy * vx < 0 ? -1 : 1;

  var dot = ux * vx + uy * vy;

  if (dot > 1) {
    dot = 1;
  }

  if (dot < -1) {
    dot = -1;
  }

  return sign * Math.acos(dot);
};

var getArcCenter = function getArcCenter(px, py, cx, cy, rx, ry, largeArcFlag, sweepFlag, sinphi, cosphi, pxp, pyp) {
  var rxsq = Math.pow(rx, 2);
  var rysq = Math.pow(ry, 2);
  var pxpsq = Math.pow(pxp, 2);
  var pypsq = Math.pow(pyp, 2);

  var radicant = rxsq * rysq - rxsq * pypsq - rysq * pxpsq;

  if (radicant < 0) {
    radicant = 0;
  }

  radicant /= rxsq * pypsq + rysq * pxpsq;
  radicant = Math.sqrt(radicant) * (largeArcFlag === sweepFlag ? -1 : 1);

  var centerxp = radicant * rx / ry * pyp;
  var centeryp = radicant * -ry / rx * pxp;

  var centerx = cosphi * centerxp - sinphi * centeryp + (px + cx) / 2;
  var centery = sinphi * centerxp + cosphi * centeryp + (py + cy) / 2;

  var vx1 = (pxp - centerxp) / rx;
  var vy1 = (pyp - centeryp) / ry;
  var vx2 = (-pxp - centerxp) / rx;
  var vy2 = (-pyp - centeryp) / ry;

  var ang1 = vectorAngle(1, 0, vx1, vy1);
  var ang2 = vectorAngle(vx1, vy1, vx2, vy2);

  if (sweepFlag === 0 && ang2 > 0) {
    ang2 -= TAU;
  }

  if (sweepFlag === 1 && ang2 < 0) {
    ang2 += TAU;
  }

  return [centerx, centery, ang1, ang2];
};

var arcToBezier = function arcToBezier(_ref2) {
  var px = _ref2.px,
      py = _ref2.py,
      cx = _ref2.cx,
      cy = _ref2.cy,
      rx = _ref2.rx,
      ry = _ref2.ry,
      _ref2$xAxisRotation = _ref2.xAxisRotation,
      xAxisRotation = _ref2$xAxisRotation === undefined ? 0 : _ref2$xAxisRotation,
      _ref2$largeArcFlag = _ref2.largeArcFlag,
      largeArcFlag = _ref2$largeArcFlag === undefined ? 0 : _ref2$largeArcFlag,
      _ref2$sweepFlag = _ref2.sweepFlag,
      sweepFlag = _ref2$sweepFlag === undefined ? 0 : _ref2$sweepFlag;

  var curves = [];

  if (rx === 0 || ry === 0) {
    return [];
  }

  var sinphi = Math.sin(xAxisRotation * TAU / 360);
  var cosphi = Math.cos(xAxisRotation * TAU / 360);

  var pxp = cosphi * (px - cx) / 2 + sinphi * (py - cy) / 2;
  var pyp = -sinphi * (px - cx) / 2 + cosphi * (py - cy) / 2;

  if (pxp === 0 && pyp === 0) {
    return [];
  }

  rx = Math.abs(rx);
  ry = Math.abs(ry);

  var lambda = Math.pow(pxp, 2) / Math.pow(rx, 2) + Math.pow(pyp, 2) / Math.pow(ry, 2);

  if (lambda > 1) {
    rx *= Math.sqrt(lambda);
    ry *= Math.sqrt(lambda);
  }

  var _getArcCenter = getArcCenter(px, py, cx, cy, rx, ry, largeArcFlag, sweepFlag, sinphi, cosphi, pxp, pyp),
      _getArcCenter2 = _slicedToArray(_getArcCenter, 4),
      centerx = _getArcCenter2[0],
      centery = _getArcCenter2[1],
      ang1 = _getArcCenter2[2],
      ang2 = _getArcCenter2[3];

  // If 'ang2' == 90.0000000001, then `ratio` will evaluate to
  // 1.0000000001. This causes `segments` to be greater than one, which is an
  // unecessary split, and adds extra points to the bezier curve. To alleviate
  // this issue, we round to 1.0 when the ratio is close to 1.0.


  var ratio = Math.abs(ang2) / (TAU / 4);
  if (Math.abs(1.0 - ratio) < 0.0000001) {
    ratio = 1.0;
  }

  var segments = Math.max(Math.ceil(ratio), 1);

  ang2 /= segments;

  for (var i = 0; i < segments; i++) {
    curves.push(approxUnitArc(ang1, ang2));
    ang1 += ang2;
  }

  return curves.map(function (curve) {
    var _mapToEllipse = mapToEllipse(curve[0], rx, ry, cosphi, sinphi, centerx, centery),
        x1 = _mapToEllipse.x,
        y1 = _mapToEllipse.y;

    var _mapToEllipse2 = mapToEllipse(curve[1], rx, ry, cosphi, sinphi, centerx, centery),
        x2 = _mapToEllipse2.x,
        y2 = _mapToEllipse2.y;

    var _mapToEllipse3 = mapToEllipse(curve[2], rx, ry, cosphi, sinphi, centerx, centery),
        x = _mapToEllipse3.x,
        y = _mapToEllipse3.y;

    return { x1: x1, y1: y1, x2: x2, y2: y2, x: x, y: y };
  });
};

/* harmony default export */ __webpack_exports__["default"] = (arcToBezier);

/***/ }),

/***/ "./node_modules/tiny-clone/app/dist/tinyClone.js":
/*!*******************************************************!*\
  !*** ./node_modules/tiny-clone/app/dist/tinyClone.js ***!
  \*******************************************************/
/*! exports provided: clone, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clone", function() { return clone; });
function clone(data) {
    return JSON.parse(JSON.stringify(data));
}
/* harmony default export */ __webpack_exports__["default"] = (clone);


/***/ }),

/***/ "./node_modules/tween-object/app/dist/tweenObject.js":
/*!***********************************************************!*\
  !*** ./node_modules/tween-object/app/dist/tweenObject.js ***!
  \***********************************************************/
/*! exports provided: Easing, TweenError, TweenCheckError, SimpleTween, Tween, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TweenError", function() { return TweenError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TweenCheckError", function() { return TweenCheckError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SimpleTween", function() { return SimpleTween; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tween", function() { return Tween; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TweenObject; });
/* harmony import */ var tiny_clone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tiny-clone */ "./node_modules/tiny-clone/app/dist/tinyClone.js");
/* harmony import */ var spread_offset__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! spread-offset */ "./node_modules/spread-offset/app/dist/spreadOffset.js");
/* harmony import */ var fast_equals__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! fast-equals */ "./node_modules/fast-equals/dist/fast-equals.js");
/* harmony import */ var fast_equals__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(fast_equals__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var waapi_easing__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! waapi-easing */ "./node_modules/waapi-easing/app/dist/waapiEasing.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Easing", function() { return waapi_easing__WEBPACK_IMPORTED_MODULE_3__["Easing"]; });

/* harmony import */ var xrray__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! xrray */ "./node_modules/xrray/xrray.js");
/* harmony import */ var xrray__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(xrray__WEBPACK_IMPORTED_MODULE_4__);
const now = performance.now.bind(performance);






xrray__WEBPACK_IMPORTED_MODULE_4___default()(Array);
class TweenError extends Error {
    constructor(msg = "Unknown") {
        super();
        this.message = msg;
    }
    set message(to) {
        super.message = "TweenError: " + to;
    }
}
class TweenCheckError extends TweenError {
    constructor(msg = "Unknown") {
        super();
        this.msg = msg;
        this.steps = [];
        this.message = msg;
    }
    set message(to) {
        super.message = "CheckError: " + to;
    }
    addStep(...steps) {
        this.steps.dda(...steps);
        super.message = "CheckError at \"" + this.steps.join(".") + "\": " + this.msg;
    }
}
class SimpleTween {
    constructor(from, to, onUpdate) {
        this.from = from;
        this.to = to;
        this.onUpdate = onUpdate;
    }
    update(at) {
        this.onUpdate(this.from + (this.to - this.from) * at);
    }
}
const defaultOptions = {
    start: 0,
    end: 1000,
    duration: 1000,
    easing: a => a,
    iterations: 1,
    fill: true
};
function mergeDefaultOptions(options) {
    for (let key in defaultOptions) {
        if (options[key] === undefined)
            options[key] = defaultOptions[key];
    }
    if (options.duration !== undefined)
        options.end = options.duration;
    else
        options.duration = options.end - options.start;
    if (options.easing instanceof waapi_easing__WEBPACK_IMPORTED_MODULE_3__["default"])
        options.easing = options.easing.function;
    return Object.freeze(options);
}
class Tween {
    constructor(from_array, to_keyframes, duration_options, easing) {
        this.updateListeners = [];
        this.lastUpdateAt = null;
        this.isWrapped = false;
        if (typeof duration_options === "object")
            this.options = mergeDefaultOptions(duration_options);
        else if (duration_options !== undefined)
            this.options = mergeDefaultOptions({
                end: duration_options,
                easing,
            });
        else
            this.options = mergeDefaultOptions({});
        if (from_array === true)
            this.keyframes(to_keyframes);
        else {
            this._keyframes = [
                this.parseInAndWrap(from_array),
                this.parseInAndWrap(to_keyframes)
            ];
            this._keyframes[0].offset = 0;
            this._keyframes[1].offset = 1;
            this.prepInput();
        }
    }
    wrap(toBeWrapped) {
        this.isWrapped = typeof toBeWrapped !== "object";
        return this.isWrapped ? { wrap: toBeWrapped } : toBeWrapped;
    }
    unwrap(toBeUnwrapped) {
        return this.isWrapped ? toBeUnwrapped.wrap : toBeUnwrapped;
    }
    parseInAndWrap(input) {
        return this.wrap(this.parseIn(input));
    }
    parseOutAndUnwrap(interior) {
        return this.parseOut(this.unwrap(interior));
    }
    update(at) {
        if (at === undefined) {
            if (this.startTime === undefined) {
                at = 0;
                this.startTime = now();
            }
            else {
                at = now() - this.startTime;
            }
        }
        let inIteration = Math.floor(at / this.options.end) + 1;
        at = at - inIteration * this.options.start;
        at = at - (inIteration - 1) * this.options.duration;
        if (inIteration > this.options.iterations) {
            if (this.options.fill)
                at = this.options.duration;
            else
                at = 0;
        }
        else if (at < 0)
            at = 0;
        at = at / this.options.duration;
        at = this.options.easing(at);
        if (this.lastUpdateAt !== at) {
            let offsets = this.tweenInstancesIndexKeys;
            for (let i = 0; i < offsets.length - 1; i++) {
                let nextOffset = offsets[i + 1];
                let lastOffset = offsets[i];
                if (lastOffset <= at && nextOffset >= at) {
                    at = (at - lastOffset) / (nextOffset - lastOffset);
                    this.tweenInstancesIndex.get(lastOffset).ea((tween) => {
                        tween.update(at);
                    });
                    break;
                }
            }
            // Notify
            let res = this.parseOutAndUnwrap(this.tweeny);
            if (!Object(fast_equals__WEBPACK_IMPORTED_MODULE_2__["deepEqual"])(res, this.lastParsedOutput)) {
                this.updateListeners.ea((f) => {
                    f(res);
                });
                this.lastParsedOutput = res;
                this.lastUpdateAt = at;
            }
        }
        return this.lastParsedOutput;
    }
    onUpdate(ls) {
        this.updateListeners.add(ls);
        return ls;
    }
    offUpdate(ls) {
        this.updateListeners.rmV(ls);
    }
    from(to) {
        if (to !== undefined) {
            this._keyframes.first = this.parseInAndWrap(to);
            this._keyframes.first.offset = 0;
            this.prepInput();
        }
        else
            return this.parseOutAndUnwrap(this._keyframes.first);
    }
    to(to) {
        if (to !== undefined) {
            this._keyframes.last = this.parseInAndWrap(to);
            this._keyframes.last.offset = 1;
            this.prepInput();
        }
        else
            return this.parseOutAndUnwrap(this._keyframes.last);
    }
    keyframes(to) {
        if (to !== undefined) {
            this._keyframes = [];
            if (to.length < 2)
                throw new TweenError("Invalid keyframes. Must have a minimum length of 2.");
            let offset;
            to.ea((e, i) => {
                let hasOffset = offset !== undefined;
                if (hasOffset) {
                    offset = e.offset;
                    delete e.offset;
                }
                this._keyframes[i] = this.parseInAndWrap(e);
                if (hasOffset) {
                    this._keyframes[i].offset = offset;
                    e.offset = offset;
                }
            });
            this.prepInput();
        }
        else {
            let newKeyframes = [];
            let offset;
            this._keyframes.ea((e, i) => {
                let hasOffset = offset !== undefined;
                if (hasOffset) {
                    offset = e.offset;
                    delete e.offset;
                }
                newKeyframes[i] = this.parseOutAndUnwrap(e);
                if (hasOffset) {
                    this._keyframes[i].offset = offset;
                    e.offset = offset;
                }
            });
            //@ts-ignore
            return newKeyframes;
        }
    }
    prepInput() {
        Object(spread_offset__WEBPACK_IMPORTED_MODULE_1__["default"])(this._keyframes);
        this.checkInput(this._keyframes);
        this.tweeny = Object(tiny_clone__WEBPACK_IMPORTED_MODULE_0__["default"])(this._keyframes.first);
        delete this.tweeny.offset;
        this.tweenInstancesIndex = new Map();
        this.prepTweeny(this.tweeny, this._keyframes);
        this.tweenInstancesIndex.set(1, null);
        this.tweenInstancesIndexKeys = [...this.tweenInstancesIndex.keys()];
    }
    prepTweeny(tweeny, keyframes) {
        let typeofFrom;
        let typeofFromIsNumber;
        let typeofFromIsObject;
        const offsetString = "offset";
        for (const key in tweeny) {
            typeofFrom = typeof keyframes.first[key];
            typeofFromIsNumber = typeofFrom === "number";
            typeofFromIsObject = typeofFrom === "object";
            for (let i = 0; i < keyframes.length - 1; i++) {
                let offset = keyframes[i].offset;
                let from = keyframes[i][key];
                let to = keyframes[i + 1][key];
                if (typeofFromIsNumber) {
                    let tweenInstances = this.tweenInstancesIndex.get(offset);
                    if (tweenInstances === undefined) {
                        let ar = [];
                        this.tweenInstancesIndex.set(offset, ar);
                        tweenInstances = ar;
                    }
                    tweenInstances.add(new SimpleTween(from, to, (e) => {
                        tweeny[key] = e;
                    }));
                }
            }
            if (typeofFromIsObject) {
                //@ts-ignore
                let newKeyframe = keyframes.Inner(key);
                for (let i = 0; i < keyframes.length; i++) {
                    newKeyframe[i].offset = keyframes[i].offset;
                }
                this.prepTweeny(tweeny[key], newKeyframe);
            }
        }
        return tweeny;
    }
    checkInput(interiors) {
        let type = typeof interiors.first;
        for (let i = 1; i < interiors.length; i++) {
            if (type !== typeof interiors[i])
                throw new TweenCheckError("Types are not equal at index " + i + ".");
        }
        if (type === "object") {
            let keys = Object.keys(interiors.first);
            for (let i = 1; i < interiors.length; i++) {
                let me = Object.keys(interiors[i]);
                if (keys.length !== me.length)
                    throw new TweenCheckError("Length of keys are not equal at index " + i + ".");
                if (!me.contains(...keys))
                    throw new TweenCheckError("Keys do not match at index " + i + ".");
            }
            for (let key of keys) {
                try {
                    //@ts-ignore
                    this.checkInput(interiors.Inner(key));
                }
                catch (e) {
                    if (e instanceof TweenCheckError) {
                        e.addStep(key);
                    }
                    throw e;
                }
            }
        }
        else if (type !== "number") {
            let val = interiors.first;
            for (let i = 1; i < interiors.length; i++) {
                if (val !== interiors[i])
                    throw new TweenCheckError("Unable to interpolate between none numeric values. When using such, make sure the values are the same at given all given keyframes. Error eccured at index " + i + ".");
            }
        }
    }
}
class TweenObject extends Tween {
    parseIn(face) {
        return Object(tiny_clone__WEBPACK_IMPORTED_MODULE_0__["default"])(face);
    }
    parseOut(interior) {
        return Object(tiny_clone__WEBPACK_IMPORTED_MODULE_0__["default"])(interior);
    }
}


/***/ }),

/***/ "./node_modules/tween-svg-path/app/dist/parse.js":
/*!*******************************************************!*\
  !*** ./node_modules/tween-svg-path/app/dist/parse.js ***!
  \*******************************************************/
/*! exports provided: toObject, toPath */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toObject", function() { return toObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toPath", function() { return toPath; });
const parse = __webpack_require__(/*! parse-svg-path */ "./node_modules/parse-svg-path/index.js");
const abs = __webpack_require__(/*! abs-svg-path */ "./node_modules/abs-svg-path/index.js");
const normalize = __webpack_require__(/*! normalize-svg-path */ "./node_modules/normalize-svg-path/index.js");
const toObject = function (path) {
    let offset = path.offset;
    try {
        let parsed = normalize(abs(parse(path)));
        if (offset !== undefined)
            parsed.offset = offset;
        return parsed;
    }
    catch (e) {
        throw new Error("Failed to parseIn svgPathString.");
    }
};
const toPath = function (segments) {
    let i = 0;
    let s = "";
    for (; i < segments.length; i++) {
        s += segments[i].join(" ") + " ";
    }
    s = s.substr(0, s.length - 1);
    return s;
};


/***/ }),

/***/ "./node_modules/tween-svg-path/app/dist/tweenSvgPath.js":
/*!**************************************************************!*\
  !*** ./node_modules/tween-svg-path/app/dist/tweenSvgPath.js ***!
  \**************************************************************/
/*! exports provided: parse, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parse", function() { return parse; });
/* harmony import */ var animation_frame_delta__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! animation-frame-delta */ "./node_modules/animation-frame-delta/app/dist/animationFrameDelta.js");
/* harmony import */ var tween_object__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tween-object */ "./node_modules/tween-object/app/dist/tweenObject.js");
/* harmony import */ var _parse__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./parse */ "./node_modules/tween-svg-path/app/dist/parse.js");



let parse = _parse__WEBPACK_IMPORTED_MODULE_2__;
class ControlableStringTween extends tween_object__WEBPACK_IMPORTED_MODULE_1__["Tween"] {
    parseIn(face) {
        return parse.toObject(face);
    }
    parseOut(interior) {
        return parse.toPath(interior);
    }
}
/* harmony default export */ __webpack_exports__["default"] = (function (from_array, to_keyframes, duration_options, easing_run, run) {
    // defaults
    let duration;
    if (duration_options === undefined) {
        if (run === undefined)
            run = true;
        if (run)
            duration_options = 1000;
        else
            duration_options = 1;
        duration = duration_options;
    }
    else if (typeof duration_options === "number") {
        if (run === undefined)
            run = true;
        duration = duration_options;
    }
    else {
        if (easing_run === undefined)
            run = true;
        else {
            run = easing_run;
            easing_run = undefined;
        }
        //@ts-ignore
        if (duration_options.end === undefined) {
            //@ts-ignore
            if (run)
                duration_options.end = duration_options.start + 1000;
            //@ts-ignore
            else
                duration_options.end = duration_options.start + 1;
        }
        //@ts-ignore
        duration = duration_options.end;
    }
    let elem;
    if (from_array instanceof SVGPathElement) {
        elem = from_array;
        from_array = elem.getAttribute("d");
    }
    let InterpolatorClass = from_array === true ? typeof to_keyframes.first === "string" ? ControlableStringTween : tween_object__WEBPACK_IMPORTED_MODULE_1__["default"] : typeof from_array === "string" ? ControlableStringTween : tween_object__WEBPACK_IMPORTED_MODULE_1__["default"];
    //@ts-ignore
    let interpolator = new InterpolatorClass(from_array, to_keyframes, duration_options, easing_run);
    //@ts-ignore
    if (run)
        Object(animation_frame_delta__WEBPACK_IMPORTED_MODULE_0__["default"])(interpolator.update.bind(interpolator), duration, interpolator.options.iterations);
    if (elem !== undefined)
        interpolator.onUpdate((s) => {
            elem.setAttribute("d", s);
        });
    return interpolator;
});


/***/ }),

/***/ "./node_modules/waapi-easing/app/dist/waapiEasing.js":
/*!***********************************************************!*\
  !*** ./node_modules/waapi-easing/app/dist/waapiEasing.js ***!
  \***********************************************************/
/*! exports provided: Easing, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Easing", function() { return Easing; });
/* harmony import */ var bezier_easing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bezier-easing */ "./node_modules/bezier-easing/src/index.js");
/* harmony import */ var bezier_easing__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bezier_easing__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var dash_camelcase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dash-camelcase */ "./node_modules/dash-camelcase/dist/dash-camelcase.js");
/* harmony import */ var dash_camelcase__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dash_camelcase__WEBPACK_IMPORTED_MODULE_1__);


class Easing {
    constructor(ax_keyword, ay, bx, by) {
        if (typeof ax_keyword !== "number") {
            this.keyword = ax_keyword;
        }
        else {
            this.ax = ax_keyword;
            this.ay = ay;
            this.bx = bx;
            this.by = by;
        }
    }
    get string() {
        if (this.keyword === undefined)
            return "cubic-bezier(" + this.ax + "," + this.ay + "," + this.bx + "," + this.by + ")";
        return Object(dash_camelcase__WEBPACK_IMPORTED_MODULE_1__["camelCaseToDash"])(this.keyword);
    }
    get function() {
        if (this.ax === undefined) {
            let f = Easing.keywords[Object(dash_camelcase__WEBPACK_IMPORTED_MODULE_1__["dashToCamelCase"])(this.keyword)];
            this.ax = f[0];
            this.ay = f[1];
            this.bx = f[2];
            this.by = f[3];
        }
        return bezier_easing__WEBPACK_IMPORTED_MODULE_0___default()(this.ax, this.ay, this.bx, this.by);
    }
}
Easing.keywords = {
    linear: [.25, .25, .75, .75],
    ease: [.25, .1, .25, 1],
    easeIn: [.42, 0, 1, 1],
    easeOut: [0, 0, .58, 1],
    easeInOut: [.42, 0, .58, 1]
};
/* harmony default export */ __webpack_exports__["default"] = (Easing);


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./node_modules/xrray/xrray.js":
/*!*************************************!*\
  !*** ./node_modules/xrray/xrray.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// TODO: options to give rm function that return true or false depending on if the element should be removed
// TODO: remove unsafe option (just remove all elems or indexes that are there) dont throw if invalid
// TODO: addIfNotAlreadyIncluded: collect()


class Exception extends Error {
  constructor(msg) {
    super();
    this.message = this.constructor.name;
    if (msg !== undefined) this.message += ": " + msg;
  }
}
class IndexOutOfBoundsException extends Exception {
  constructor(index, array) {
    super("Given value \"" + index + "\" must be in range 0-" + (array.length-1) + ".");
    this.index = index;
    this.array = array;
  }
}
class InvalidInputException extends Exception {
  constructor(msg) {
    super("Given input is invalid.\n" + msg);
  }
}
class InvalidValueException extends Exception {
  constructor(value, array) {
    super("Unable to find given value: " + value.constructor.name + " " + JSON.stringify(value) + "; within following array: " + array.toString());
    this.value = value;
    this.array = array;
  }
}

//Throws IndexOutOfBoundsException when given index is out of bounds of a
function isIndex(i, a) {
  if(!a.hasOwnProperty(i)) throw new IndexOutOfBoundsException(i,a);
}

function appendToPrototypeOf(of) {
  return function(name, func) {
    const isFunc = typeof func === "function"
    if (name instanceof Array) {
      for (let i = 0; i < name.length; i++) {
        appendToPrototype(name[i], func, isFunc)
      }
    }
    else appendToPrototype(name, func, isFunc)
  }

  function appendToPrototype(name, func, isFunc) {
    let ob
    if (isFunc) {
      ob = {
        value: func,
        enumerable: false
      }
    }
    else {
      ob = func
      ob.enumerable = false
    }

    Object.defineProperty(of, name, ob)
  }
}




const xrraySymbol = Symbol("xrray");

function init(Xrray = Array) {
  if (Xrray[xrraySymbol]) return Xrray;
  Xrray[xrraySymbol] = true;

  const appendToXrray = appendToPrototypeOf(Xrray.prototype)


  appendToXrray(["each", "ea"], function(f, t = this) {
    if (this.length > 0) {
      let e;
      let startI;
      for (startI = 0; startI < t.length; startI++) {
        if (t.hasOwnProperty(startI)) {
          e = f.call(t, t[startI], startI, this);
          break;
        }
      }
      startI++;
      if (e instanceof Promise) {
        return (async () => {
          let r = await e;
          if (r !== undefined) return r;

          for (let i = startI; i < t.length; i++) {
            if (!t.hasOwnProperty(i)) continue;
            let e = await f.call(t, t[i], i, this);
            if (e !== undefined) return e;
          }
        })();
      }
      else {
        if (e !== undefined) return e;
        for (let i = startI; i < t.length; i++) {
          if (!t.hasOwnProperty(i)) continue;
          let e = f.call(t, t[i], i, this);
          if (e !== undefined) return e;
        }
      }
    }
  })

  appendToXrray("empty", {get() {
    return this.length === 0;
  }})

  appendToXrray("last", {
    get() {
      if (this.length === 0) return undefined;
      return this[this.length-1];
    },
    set(to) {
      this[this.length === 0 ? 0 : this.length] = to
    }

  })

  appendToXrray("realLength", {get() {
    let l = 0;
    for (let i = 0; i < this.length; i++) {
      if (this.hasOwnProperty(i)) l++;
    }
    return l;
  }})

  appendToXrray("first", {
    get() {
      return this[0];
    },
    set(to) {
      this[0] = to;
    }
  })

  appendToXrray("clear", function() {
    this.length = 0;
    return this;
  })

  appendToXrray("Clear", function() {
    return new Xrray();
  })

  appendToXrray("add", function(...values) {
    this.push(...values);
    return this;
  })
  appendToXrray("Add", function(...values) {
    return new Xrray().add(...this, ...values);
  })


  appendToXrray("set", function(a = []) {
    if(this === a) return this;
    if(a instanceof Array) return this.clear().add(...a);
    return this.clear().add(a);
  })

  appendToXrray("Set", function(a = []) {
    return new Xrray().add(...a);
  })

  appendToXrray("clone", function() {
    return this.Set(this);
  })
  appendToXrray("Reverse", function() {
    return this.Set(this).reverse();
  })

  appendToXrray("gather", function(...a) {
    a.ea((e) => {
      if (!this.includes(e)) this.add(e);
    })
    return this;
  })

  appendToXrray("Gather", function(...a) {
    let t = this.clone();
    a.ea((e) => {
      if (!t.includes(e)) t.add(e);
    })
    return t;
  })

  

  let mark = Symbol("Mark");

  //Throws InvalidValueException when the given value cannot be found withing this
  // TODO: differentate indexall and indexfirst
  appendToXrray("index", function(...values) {
    let that = this.Set(this);
    let indexes = new Xrray();
    values.ea((v) => {
      if(!this.includes(v)) throw new InvalidValueException(v,this);
      while (true) {
        let index = that.indexOf(v);
        if (indexes.last !== index && index !== -1){
          indexes.add(index);
          that[index] = mark;
        }
        else break;
      }
    });
    return indexes;
  })
  
  //Throws IndexOutOfBoundsException when given index is out of bounds of this
  appendToXrray(["removeI", "rmI"], function(...indices) {
    let rollback = this.Set(this);
    try {
      for (let i = 0; i < indices.length; i++) {
        isIndex(indices[i], this)
        this[indices[i]] = mark;
      }
      for (let i = 0; i < this.length; i++) {
        if (this[i] === mark) {
          this.splice(i, 1);
          i--;
        }
      }
    } catch (e) {
      if (e instanceof IndexOutOfBoundsException) this.set(rollback);
      throw e;
    }
    return this;
  })
  
  //Throws IndexOutOfBoundsException when given index is out of bounds of this
  appendToXrray(["RemoveI", "RmI"], function(...indices) {
    return this.Set(this).removeI(...indices);
  })

  

  //Throws InvalidValueException when the given value cannot be found withing this
  appendToXrray(["removeV", "rmV"], function(...values) {
    return this.removeI(...this.index(...values));
  })

  //Throws InvalidValueException when the given value cannot be found withing this
  appendToXrray(["RemoveV", "RmV"], function(...values) {
    return this.Set(this).removeV(...values);
  })

  //Throws InvalidValueException when the given param is detected as value but cannot be found withing this
  appendToXrray(["remove", "rm"], function(...valueOrIndex) {
    try {
      this.removeI(...valueOrIndex);
    } catch (e) {
      if (e instanceof IndexOutOfBoundsException) this.removeV(...valueOrIndex);
      else throw e;
    }
    return this;
  })


  //Throws IndexOutOfBoundsException when given param is detected as index but out of bounds of this
  //Throws InvalidValueException when the given param is detected as value but cannot be found withing this
  appendToXrray(["Remove", "Rm"], function(...valueOrIndex) {
    return this.Set(this).remove(...valueOrIndex);
  })

  appendToXrray("Get", function(...indexes) {
    let n = [];
    indexes.flat(Infinity).forEach((i) => {
      n.add(this[i]);
    });
    return n;
  })

  appendToXrray("get", function(...indexes) {
    return this.set(this.Get(...indexes))
  })

  appendToXrray("dda", function(...values) {
    return this.reverse().add(...values).reverse();
  })

  appendToXrray("Dda", function(...values) {
    return this.Reverse().add(...values).reverse();
  })


  //Throws IndexOutOfBoundsException when given index is out of bounds of a
  appendToXrray("rem", function(amount) {
    isIndex(amount,this);
    this.length -= amount;
    return this;
  })
  //Throws IndexOutOfBoundsException when given index is out of bounds of a
  appendToXrray("Rem", function(amount) {
    return this.Set(this).rem(amount);
  })

  //Throws IndexOutOfBoundsException when given index is out of bounds of a
  appendToXrray("mer", function(amount) {
    return this.reverse().rem(amount).reverse();
  })
  //Throws IndexOutOfBoundsException when given index is out of bounds of a
  appendToXrray("Mer", function(amount) {
    return this.Reverse().rem(amount).reverese();
  })

  //Throws IndexOutOfBoundsException when given index(es) are out of bounds of this
  //Throws InvalidInputException when given parameters are not equal in length
  appendToXrray("swapI", function(i1, i2) {
    i1 = [i1].flat(Infinity);
    i2 = [i2].flat(Infinity);
    if(i1.length === i2.length) {
      let rollback = this.Set(this);
      try {
        for (let i = 0; i < i1.length; i++) {
          isIndex(i1[i],this);
          isIndex(i2[i],this);
          [this[i1[i]],this[i2[i]]] = [this[i2[i]],this[i1[i]]];
        }
      } catch (e) {
        if(e instanceof IndexOutOfBoundsException) this.set(rollback);
        throw e;
      }
      return this;
    }
    throw new InvalidInputException("Parameter i1 and i2 must ether be two indexes, or two index-Arrays of the same length.");
  })
  //Throws IndexOutOfBoundsException when given index(es) are out of bounds of this
  //Throws InvalidInputException when given parameters are not equal in length
  appendToXrray("SwapI", function(i1, i2) {
    return this.Set(this).swapI(i1, i2);
  })

  //Throws InvalidValueException when the given value cannot be found withing this
  //Throws InvalidInputException when given parameters are not equal in length
  appendToXrray("swapV", function(v1, v2) {
    v1 = this.Set(v1).flat(2);
    v2 = this.Set(v2).flat(2);
    if (v1.length === v2.length) {
      for (var i = 0; i < v1.length; i++) {
        this.swapI(this.index(v1[i]),this.index(v2[i]));
      }
      return this;
    }
    throw new InvalidInputException("Parameter v1 and v2 must ether be two values, or two value-Arrays of the same length.");
  })
  //Throws InvalidValueException when the given value cannot be found withing this
  //Throws InvalidInputException when given parameters are not equal in length
  appendToXrray("SwapV", function(v1, v2) {
    return this.Set(this).swapV(v1, v2);
  })

  //Throws IndexOutOfBoundsException when given param is detected as index but out of bounds of this
  //Throws InvalidValueException when the given param is detected as value but cannot be found withing this
  appendToXrray("swap", function(vi1, vi2) {
    try {
      this.swapI(vi1, vi2);
    } catch (e) {
      if (e instanceof IndexOutOfBoundsException) this.swapV(vi1, vi2);
      else throw e;
    }
    return this;
  })
  //Throws IndexOutOfBoundsException when given param is detected as index but out of bounds of this
  //Throws InvalidValueException when the given param is detected as value but cannot be found withing this
  appendToXrray("Swap", function(vi1, vi2) {
    return this.Set(this).swap(vi1, vi2)
  })

  appendToXrray("prior", function(i, by = 1) {
    let r = i - by;
    if (r >= 0) return this[r];
    return this[this.length-(by-i)]
  })

  appendToXrray("next", function(i, by = 1) {
    let r = i + by;
    if (r <= this.length-1) return this[r];
    return this[by-(i-this.length-1)]
  })

  appendToXrray("inject", function(item, index) {
    this.splice(index, 0, item);
    return this
  })

  appendToXrray("contains", function(...vals) {
    for (let v of vals) {
      if (!this.includes(v)) return false
    }
    return true
  })

  appendToXrray("excludes", function(...vals) {
    for (let v of vals) {
      if (this.includes(v)) return false
    }
    return true
  })

  appendToXrray(["closest", "nearest"], function(to /*: number*/) {
    let a = []
    for (let i = 0; i < this.length; i++) {
      a[i] = Math.abs(this[i] - to)
    }
    let smallest = Infinity
    let index = -1
    for (let i = 0; i < a.length; i++) {
      let diff = a[i]
      if (diff < smallest) {
        smallest = diff
        index = i
      }
    }
    return index
  })

  appendToXrray("inner", function(step, callParams) {
    if (callParams !== undefined) {
      this.ea((e, i) => {
        this[i] = e[step](...callParams)
      })
    }
    else {
      this.ea((e, i) => {
        this[i] = e[step]
      })
    }
    
    return this
  })

  appendToXrray("Inner", function(step, callParams) {
    return this.Set(this).inner(step, callParams)
  })

  
  appendToXrray("call", function(...callParams) {
    if (callParams !== undefined) {
      this.ea((e, i) => {
        this[i] = e(...callParams)
      })
    }
    
    return this
  })

  appendToXrray("Call", function(...callParams) {
    return this.Set(this).call(...callParams)
  })


  appendToXrray("replace", function(func) {
    this.forEach((e, i) => {
      this[i] = func(e, i)
    })
    
    return this
  })

  appendToXrray("Replace", function(func) {
    return this.Set(this).replace(func)
  })



  return Xrray
}
init.Exception = Exception;
init.IndexOutOfBoundsException = IndexOutOfBoundsException;
init.InvalidInputException = InvalidInputException;
init.InvalidValueException = InvalidValueException;
//init.version = "unknown";


module.exports = init
module.exports.default = init



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYWJzLXN2Zy1wYXRoL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hbmltYXRpb24tZnJhbWUtZGVsdGEvYXBwL2Rpc3QvYW5pbWF0aW9uRnJhbWVEZWx0YS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXR0YXRjaC10by1wcm90b3R5cGUvYXBwL2Rpc3QvYXR0YXRjaFRvUHJvdG90eXBlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iZXppZXItZWFzaW5nL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGFzaC1jYW1lbGNhc2UvZGlzdC9kYXNoLWNhbWVsY2FzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGVjb21wb3NlLWRvbW1hdHJpeC9kaXN0L2RlY29tcG9zZURPTU1hdHJpeC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGVsYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2V4dGVuZGVkLWRvbS9hcHAvZGlzdC9jb21wb25lbnRzL2VsZW1lbnRMaXN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9leHRlbmRlZC1kb20vYXBwL2Rpc3QvY29tcG9uZW50cy90ZWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2V4dGVuZGVkLWRvbS9hcHAvZGlzdC9lZG9tLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9leHRlbmRlZC1kb20vYXBwL2Rpc3QvZXh0ZW50aW9ucy9jaGlsZHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2V4dGVuZGVkLWRvbS9hcHAvZGlzdC9leHRlbnRpb25zL2NsYXNzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9leHRlbmRlZC1kb20vYXBwL2Rpc3QvZXh0ZW50aW9ucy9jc3NTaG9ydGhhbmRzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9leHRlbmRlZC1kb20vYXBwL2Rpc3QvZXh0ZW50aW9ucy9odG1sVGV4dC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZXh0ZW5kZWQtZG9tL2FwcC9kaXN0L2V4dGVudGlvbnMvaW5zZXJ0QWZ0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2V4dGVuZGVkLWRvbS9hcHAvZGlzdC9leHRlbnRpb25zL2xpc3RlbmVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9leHRlbmRlZC1kb20vYXBwL2Rpc3QvZXh0ZW50aW9ucy9vbk9mZi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZXh0ZW5kZWQtZG9tL2FwcC9kaXN0L2V4dGVudGlvbnMvc3R5bGVNYW5pcHVsYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2V4dGVuZGVkLWRvbS9hcHAvZGlzdC9saWIvYXR0YXRjaFRvUHJvdG8uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2V4dGVuZGVkLWRvbS9hcHAvZGlzdC9saWIvcGFyc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2V4dGVuZGVkLWRvbS9hcHAvZGlzdC9saWIvcG9seWZpbGwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Zhc3QtZXF1YWxzL2Rpc3QvZmFzdC1lcXVhbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Zyb250LWRiL2FwcC9kaXN0L2YtZGIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25vcm1hbGl6ZS1zdmctcGF0aC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcGFyc2Utc3ZnLXBhdGgvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NwcmVhZC1vZmZzZXQvYXBwL2Rpc3Qvc3ByZWFkT2Zmc2V0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdmctYXJjLXRvLWN1YmljLWJlemllci9tb2R1bGVzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90aW55LWNsb25lL2FwcC9kaXN0L3RpbnlDbG9uZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdHdlZW4tb2JqZWN0L2FwcC9kaXN0L3R3ZWVuT2JqZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90d2Vlbi1zdmctcGF0aC9hcHAvZGlzdC9wYXJzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdHdlZW4tc3ZnLXBhdGgvYXBwL2Rpc3QvdHdlZW5TdmdQYXRoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93YWFwaS1lYXNpbmcvYXBwL2Rpc3Qvd2FhcGlFYXNpbmcuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMveHJyYXkveHJyYXkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsTUFBTTtBQUNqQixZQUFZO0FBQ1o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsZ0JBQWdCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEVBQUU7QUFDRjs7Ozs7Ozs7Ozs7OztBQ2xFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDL0tBO0FBQUE7QUFBQTtBQUE0QztBQUNyQztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQix3REFBVztBQUMxQztBQUNBO0FBQ0EsK0JBQStCLHdEQUFXO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEy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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLHVCQUF1QjtBQUN6QyxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0M7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdFQUF3RTtBQUN4RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSwrQkFBK0Isa0JBQWtCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQiwwREFBZTtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9GQUFvRixrREFBTztBQUMzRixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsQ0FBQztBQUNELDhEQUFFO0FBQ0Y7QUFDQSxrQkFBa0IsMERBQUs7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOERBQThELGFBQWE7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLG1CQUFtQixtQkFBbUI7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixvREFBTTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtGQUFrRixJQUFJO0FBQ3RGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOERBQUUsbURBQW1EO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLDBEQUFLO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFFBQVEsNkRBQVk7QUFDcEI7QUFDQSx1QkFBdUIsbUJBQW1CO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsbUJBQW1CO0FBQ3REO0FBQ0E7QUFD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O0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLGdCQUFnQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixnQkFBZ0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsZ0JBQWdCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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Q0EsdUJBQXVCLG1CQUFtQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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O0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7O0FBR0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7O0FBR0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsZUFBZTtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixlQUFlO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsbUJBQW1CLGlCQUFpQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixjQUFjO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7OztBQUdIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7O0FBR0g7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7Ozs7QUFJSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQSIsImZpbGUiOiJwdWJsaWMvZGlzdC9hcHAvdmVuZG9yc35pbml0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5tb2R1bGUuZXhwb3J0cyA9IGFic29sdXRpemVcblxuLyoqXG4gKiByZWRlZmluZSBgcGF0aGAgd2l0aCBhYnNvbHV0ZSBjb29yZGluYXRlc1xuICpcbiAqIEBwYXJhbSB7QXJyYXl9IHBhdGhcbiAqIEByZXR1cm4ge0FycmF5fVxuICovXG5cbmZ1bmN0aW9uIGFic29sdXRpemUocGF0aCl7XG5cdHZhciBzdGFydFggPSAwXG5cdHZhciBzdGFydFkgPSAwXG5cdHZhciB4ID0gMFxuXHR2YXIgeSA9IDBcblxuXHRyZXR1cm4gcGF0aC5tYXAoZnVuY3Rpb24oc2VnKXtcblx0XHRzZWcgPSBzZWcuc2xpY2UoKVxuXHRcdHZhciB0eXBlID0gc2VnWzBdXG5cdFx0dmFyIGNvbW1hbmQgPSB0eXBlLnRvVXBwZXJDYXNlKClcblxuXHRcdC8vIGlzIHJlbGF0aXZlXG5cdFx0aWYgKHR5cGUgIT0gY29tbWFuZCkge1xuXHRcdFx0c2VnWzBdID0gY29tbWFuZFxuXHRcdFx0c3dpdGNoICh0eXBlKSB7XG5cdFx0XHRcdGNhc2UgJ2EnOlxuXHRcdFx0XHRcdHNlZ1s2XSArPSB4XG5cdFx0XHRcdFx0c2VnWzddICs9IHlcblx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRjYXNlICd2Jzpcblx0XHRcdFx0XHRzZWdbMV0gKz0geVxuXHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdGNhc2UgJ2gnOlxuXHRcdFx0XHRcdHNlZ1sxXSArPSB4XG5cdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRmb3IgKHZhciBpID0gMTsgaSA8IHNlZy5sZW5ndGg7KSB7XG5cdFx0XHRcdFx0XHRzZWdbaSsrXSArPSB4XG5cdFx0XHRcdFx0XHRzZWdbaSsrXSArPSB5XG5cdFx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIHVwZGF0ZSBjdXJzb3Igc3RhdGVcblx0XHRzd2l0Y2ggKGNvbW1hbmQpIHtcblx0XHRcdGNhc2UgJ1onOlxuXHRcdFx0XHR4ID0gc3RhcnRYXG5cdFx0XHRcdHkgPSBzdGFydFlcblx0XHRcdFx0YnJlYWtcblx0XHRcdGNhc2UgJ0gnOlxuXHRcdFx0XHR4ID0gc2VnWzFdXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRjYXNlICdWJzpcblx0XHRcdFx0eSA9IHNlZ1sxXVxuXHRcdFx0XHRicmVha1xuXHRcdFx0Y2FzZSAnTSc6XG5cdFx0XHRcdHggPSBzdGFydFggPSBzZWdbMV1cblx0XHRcdFx0eSA9IHN0YXJ0WSA9IHNlZ1syXVxuXHRcdFx0XHRicmVha1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0eCA9IHNlZ1tzZWcubGVuZ3RoIC0gMl1cblx0XHRcdFx0eSA9IHNlZ1tzZWcubGVuZ3RoIC0gMV1cblx0XHR9XG5cblx0XHRyZXR1cm4gc2VnXG5cdH0pXG59XG4iLCJjb25zdCBub3cgPSBwZXJmb3JtYW5jZS5ub3cuYmluZChwZXJmb3JtYW5jZSk7XHJcbmNvbnN0IHN1YnNjcmlwdGlvbnMgPSBbXTtcclxuY29uc3QgZWxhcHNpbmdTdWJzY3JpcHRpb25zID0gW107XHJcbmNvbnN0IGluaXRhbEVsYXBzaW5nU3Vic2NyaXB0aW9ucyA9IFtdO1xyXG5mdW5jdGlvbiBzdWIoZnVuYywgZWxhcHNlSW4sIGl0ZXJhdGlvbnMsIGl0ZXJhdGVUaW1lc3RhbXAsIGluSXRlcmF0aW9uLCBiZWdpbikge1xyXG4gICAgaWYgKGVsYXBzZUluKSB7XHJcbiAgICAgICAgaWYgKGl0ZXJhdGVUaW1lc3RhbXAgfHwgYmVnaW4gPT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgaW5pdGFsRWxhcHNpbmdTdWJzY3JpcHRpb25zLnB1c2goZnVuYyk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBlbGFwc2luZ1N1YnNjcmlwdGlvbnMucHVzaCh7IGJlZ2luLCBmdW5jIH0pO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaXRlcmF0aW9ucyA+IDEpXHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1YihmdW5jLCBlbGFwc2VJbiwgaXRlcmF0aW9ucywgaXRlcmF0ZVRpbWVzdGFtcCwgaW5JdGVyYXRpb24sIGJlZ2luKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBsZXQgaW5kZXggPSBmaW5kSW5kZXhPZkVsYXBzaW5nU3Vic2NyaXB0aW9uc0Z1bmMoZnVuYyk7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gLTEpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGxldCB7IGJlZ2luIH0gPSBlbGFwc2luZ1N1YnNjcmlwdGlvbnNbaW5kZXhdO1xyXG4gICAgICAgICAgICBlbGFwc2luZ1N1YnNjcmlwdGlvbnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgbGV0IGVsYXBzZWQgPSBpbkl0ZXJhdGlvbiAqIGVsYXBzZUluO1xyXG4gICAgICAgICAgICBsZXQgdGltZXN0YW1wID0gYmVnaW4gKyBlbGFwc2VkO1xyXG4gICAgICAgICAgICBsZXQgYWJzb2x1dGVEZWx0YSA9IHRpbWVzdGFtcCAtIGxhc3RUaW1lc3RhbXA7XHJcbiAgICAgICAgICAgIGZ1bmMoZWxhcHNlZCwgYWJzb2x1dGVEZWx0YSAqIGl2ZXJ0T2ZBYnNvbHV0ZURlbHRhQXQ2MEZQUywgdGltZXN0YW1wLCBhYnNvbHV0ZURlbHRhKTtcclxuICAgICAgICAgICAgaXRlcmF0aW9ucy0tO1xyXG4gICAgICAgICAgICBpbkl0ZXJhdGlvbisrO1xyXG4gICAgICAgIH0sIGVsYXBzZUluIC0gMSk7IC8vIHNldFRpbW91dCBpcyBvbmx5IDFtcyBhY2N1cmF0ZS4gSW4gYW4gZWRnZSBjYXNlIGl0IGlzIGJldHRlciB0byBkcm9wIG9uZSBmcmFtZSBpbnN0ZWFkIG9mIGV4ZWN1dGUgb25lIHRvbyBtYW55XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICAgICAgc3Vic2NyaXB0aW9ucy5wdXNoKGZ1bmMpO1xyXG4gICAgcmV0dXJuIGZ1bmM7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHN1YnNjcmliZShmdW5jLCBlbGFwc2VJbiwgaXRlcmF0aW9ucyA9IDEsIGl0ZXJhdGVUaW1lc3RhbXAgPSBmYWxzZSkge1xyXG4gICAgcmV0dXJuIHN1YihmdW5jLCBlbGFwc2VJbiwgaXRlcmF0aW9ucywgaXRlcmF0ZVRpbWVzdGFtcCwgMSk7XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgc3Vic2NyaWJlO1xyXG5sZXQgaWdub3JlID0gZmFsc2U7XHJcbmV4cG9ydCBmdW5jdGlvbiBpZ25vcmVVbnN1YnNjcmlwdGlvbkVycm9yKHRvID0gdHJ1ZSkge1xyXG4gICAgaWdub3JlID0gdG87XHJcbn1cclxuZnVuY3Rpb24gZmluZEluZGV4T2ZFbGFwc2luZ1N1YnNjcmlwdGlvbnNGdW5jKGZ1bmMpIHtcclxuICAgIGxldCBhdCA9IC0xO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbGFwc2luZ1N1YnNjcmlwdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoZWxhcHNpbmdTdWJzY3JpcHRpb25zW2ldLmZ1bmMgPT09IGZ1bmMpIHtcclxuICAgICAgICAgICAgYXQgPSBpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXQ7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHVuc3Vic2NyaWJlKGZ1bmMpIHtcclxuICAgIGxldCBhdCA9IGZpbmRJbmRleE9mRWxhcHNpbmdTdWJzY3JpcHRpb25zRnVuYyhmdW5jKTtcclxuICAgIGlmIChhdCAhPT0gLTEpXHJcbiAgICAgICAgZWxhcHNpbmdTdWJzY3JpcHRpb25zLnNwbGljZShhdCwgMSk7XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBhdCA9IHN1YnNjcmlwdGlvbnMuaW5kZXhPZihmdW5jKTtcclxuICAgICAgICBpZiAoYXQgIT09IC0xKVxyXG4gICAgICAgICAgICBzdWJzY3JpcHRpb25zLnNwbGljZShhdCwgMSk7XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGF0ID0gaW5pdGFsRWxhcHNpbmdTdWJzY3JpcHRpb25zLmluZGV4T2YoZnVuYyk7XHJcbiAgICAgICAgICAgIGlmIChhdCAhPT0gLTEpXHJcbiAgICAgICAgICAgICAgICBzdWJzY3JpcHRpb25zLnNwbGljZShhdCwgMSk7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKCFpZ25vcmUpXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHJlcXVlc3QgdG8gdW5zdWJzY3JpYmUuIEdpdmVuIGZ1bmN0aW9uIGlzIG5vdCBzdWJzY3JpYmVkLlxcblxcblRvIGlnbm9yZSB0aGlzIGVycm9yIGdsb2JhbGx5IHBsZWFzZSBjYWxsIFxcXCJyZXFhZi5pZ25vcmVVbnN1YnNjcmlwdGlvbkVycm9yKClcXFwiLlxcblwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuY29uc3QgaXZlcnRPZkFic29sdXRlRGVsdGFBdDYwRlBTID0gNjAgLyAxMDAwO1xyXG5leHBvcnQgY29uc3Qgc3RhdHMgPSB7XHJcbiAgICBkZWx0YTogMSxcclxuICAgIGFic29sdXRlRGVsdGE6IDEgLyBpdmVydE9mQWJzb2x1dGVEZWx0YUF0NjBGUFMsXHJcbiAgICB0aW1lc3RhbXA6IDBcclxufTtcclxubGV0IGluZGV4OyAvLyB0byBwcmV2ZW50IEdDXHJcbmxldCBsYXN0VGltZXN0YW1wID0gbm93KCk7XHJcbmxldCB0aW1lc3RhbXA7XHJcbmxldCBjdXJyZW50U3Vic2NyaXB0aW9ucztcclxubGV0IGN1cnJlbnRFbGFwc2luZ1N1YnNjcmlwdGlvbnM7XHJcbmxldCBjdXJyZW50QW55dGhpbmc7XHJcbmxldCBjdXJyZW50VGltZXN0YW1wO1xyXG5jb25zdCBsb29wID0gKCkgPT4ge1xyXG4gICAgY3VycmVudFRpbWVzdGFtcCA9IHRpbWVzdGFtcCA9IG5vdygpO1xyXG4gICAgc3RhdHMuYWJzb2x1dGVEZWx0YSA9IHRpbWVzdGFtcCAtIGxhc3RUaW1lc3RhbXA7XHJcbiAgICBsYXN0VGltZXN0YW1wID0gc3RhdHMudGltZXN0YW1wID0gdGltZXN0YW1wO1xyXG4gICAgc3RhdHMuZGVsdGEgPSBzdGF0cy5hYnNvbHV0ZURlbHRhICogaXZlcnRPZkFic29sdXRlRGVsdGFBdDYwRlBTO1xyXG4gICAgZm9yICg7IDAgIT09IGluaXRhbEVsYXBzaW5nU3Vic2NyaXB0aW9ucy5sZW5ndGg7KSB7XHJcbiAgICAgICAgZWxhcHNpbmdTdWJzY3JpcHRpb25zLnB1c2goeyBiZWdpbjogY3VycmVudFRpbWVzdGFtcCwgZnVuYzogaW5pdGFsRWxhcHNpbmdTdWJzY3JpcHRpb25zWzBdIH0pO1xyXG4gICAgICAgIGluaXRhbEVsYXBzaW5nU3Vic2NyaXB0aW9ucy5zcGxpY2UoMCwgMSk7XHJcbiAgICB9XHJcbiAgICAvL2Nsb25lIHRvIGVuc3VyZSB0aGF0IG5vIHN1YnNjcmlwdGlvbnMgYXJlIGFkZGVkIGR1cmluZyAoaW5zaWRlKSBvbmVcclxuICAgIGN1cnJlbnRTdWJzY3JpcHRpb25zID0gWy4uLnN1YnNjcmlwdGlvbnNdO1xyXG4gICAgY3VycmVudEVsYXBzaW5nU3Vic2NyaXB0aW9ucyA9IFsuLi5lbGFwc2luZ1N1YnNjcmlwdGlvbnNdO1xyXG4gICAgZm9yIChpbmRleCA9IDA7IGluZGV4IDwgY3VycmVudFN1YnNjcmlwdGlvbnMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgY3VycmVudFN1YnNjcmlwdGlvbnNbaW5kZXhdKHN0YXRzLmRlbHRhLCBzdGF0cy50aW1lc3RhbXAsIHN0YXRzLmFic29sdXRlRGVsdGEpO1xyXG4gICAgfVxyXG4gICAgZm9yIChpbmRleCA9IDA7IGluZGV4IDwgY3VycmVudEVsYXBzaW5nU3Vic2NyaXB0aW9ucy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBjdXJyZW50QW55dGhpbmcgPSBjdXJyZW50RWxhcHNpbmdTdWJzY3JpcHRpb25zW2luZGV4XTtcclxuICAgICAgICBjdXJyZW50QW55dGhpbmcuZnVuYyhjdXJyZW50VGltZXN0YW1wIC0gY3VycmVudEFueXRoaW5nLmJlZ2luLCBzdGF0cy5kZWx0YSwgc3RhdHMudGltZXN0YW1wLCBzdGF0cy5hYnNvbHV0ZURlbHRhKTtcclxuICAgIH1cclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcclxufTtcclxucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xyXG4iLCJpbXBvcnQgY2xvbmUgZnJvbSBcInRpbnktY2xvbmVcIjtcclxuZXhwb3J0IGZ1bmN0aW9uIGNvbnN0cnVjdEF0dGF0Y2hUb1Byb3RvdHlwZShwcm90b3R5cGUsIGRlZmF1bHRPcHRpb25zID0geyBlbnVtZXJhYmxlOiBmYWxzZSwgY29uZmlndXJhYmxlOiB0cnVlIH0pIHtcclxuICAgIGxldCBvcHRpb25zID0gY2xvbmUoZGVmYXVsdE9wdGlvbnMpO1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChuYW1lLCBmdW5jKSB7XHJcbiAgICAgICAgbGV0IG9iO1xyXG4gICAgICAgIGlmICh0eXBlb2YgZnVuYyA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgIG9iID0gY2xvbmUob3B0aW9ucyk7XHJcbiAgICAgICAgICAgIG9iLnZhbHVlID0gZnVuYztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIG9iID0gY2xvbmUob3B0aW9ucyk7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgayBpbiBmdW5jKSB7XHJcbiAgICAgICAgICAgICAgICBvYltrXSA9IGZ1bmNba107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG5hbWUgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5hbWUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGFwcGVuZFRvUHJvdG90eXBlKG5hbWVbaV0sIG9iKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIGFwcGVuZFRvUHJvdG90eXBlKG5hbWUsIG9iKTtcclxuICAgIH07XHJcbiAgICBmdW5jdGlvbiBhcHBlbmRUb1Byb3RvdHlwZShuYW1lLCBvYikge1xyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90b3R5cGUsIG5hbWUsIG9iKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBjb25zdHJ1Y3RBdHRhdGNoVG9Qcm90b3R5cGU7XHJcbmV4cG9ydCBmdW5jdGlvbiBjb25zdHJ1Y3RBcHBseVRvUHJvdG90eXBlKHByb3RvdHlwZSwgZGVmYXVsdE9wdGlvbnMgPSB7IGVudW1lcmFibGU6IGZhbHNlLCBjb25maWd1cmFibGU6IHRydWUgfSkge1xyXG4gICAgbGV0IG9wdGlvbnMgPSBjbG9uZShkZWZhdWx0T3B0aW9ucyk7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKG5hbWUsIGZ1bmMpIHtcclxuICAgICAgICBsZXQgb2I7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBmdW5jID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgb2IgPSBjbG9uZShvcHRpb25zKTtcclxuICAgICAgICAgICAgb2IudmFsdWUgPSBmdW5jO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgb2IgPSBjbG9uZShvcHRpb25zKTtcclxuICAgICAgICAgICAgb2IudmFsdWUgPSBmdW5jdGlvbiAoLi4udmFsdWVzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWVzLmxlbmd0aCAhPT0gMClcclxuICAgICAgICAgICAgICAgICAgICBmdW5jLnNldC5hcHBseSh0aGlzLCB2YWx1ZXMpO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmdW5jLmdldC5jYWxsKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChuYW1lIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuYW1lLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBhcHBlbmRUb1Byb3RvdHlwZShuYW1lW2ldLCBvYik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBhcHBlbmRUb1Byb3RvdHlwZShuYW1lLCBvYik7XHJcbiAgICB9O1xyXG4gICAgZnVuY3Rpb24gYXBwZW5kVG9Qcm90b3R5cGUobmFtZSwgb2IpIHtcclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG90eXBlLCBuYW1lLCBvYik7XHJcbiAgICB9XHJcbn1cclxuIiwiLyoqXG4gKiBodHRwczovL2dpdGh1Yi5jb20vZ3JlL2Jlemllci1lYXNpbmdcbiAqIEJlemllckVhc2luZyAtIHVzZSBiZXppZXIgY3VydmUgZm9yIHRyYW5zaXRpb24gZWFzaW5nIGZ1bmN0aW9uXG4gKiBieSBHYcOrdGFuIFJlbmF1ZGVhdSAyMDE0IC0gMjAxNSDigJMgTUlUIExpY2Vuc2VcbiAqL1xuXG4vLyBUaGVzZSB2YWx1ZXMgYXJlIGVzdGFibGlzaGVkIGJ5IGVtcGlyaWNpc20gd2l0aCB0ZXN0cyAodHJhZGVvZmY6IHBlcmZvcm1hbmNlIFZTIHByZWNpc2lvbilcbnZhciBORVdUT05fSVRFUkFUSU9OUyA9IDQ7XG52YXIgTkVXVE9OX01JTl9TTE9QRSA9IDAuMDAxO1xudmFyIFNVQkRJVklTSU9OX1BSRUNJU0lPTiA9IDAuMDAwMDAwMTtcbnZhciBTVUJESVZJU0lPTl9NQVhfSVRFUkFUSU9OUyA9IDEwO1xuXG52YXIga1NwbGluZVRhYmxlU2l6ZSA9IDExO1xudmFyIGtTYW1wbGVTdGVwU2l6ZSA9IDEuMCAvIChrU3BsaW5lVGFibGVTaXplIC0gMS4wKTtcblxudmFyIGZsb2F0MzJBcnJheVN1cHBvcnRlZCA9IHR5cGVvZiBGbG9hdDMyQXJyYXkgPT09ICdmdW5jdGlvbic7XG5cbmZ1bmN0aW9uIEEgKGFBMSwgYUEyKSB7IHJldHVybiAxLjAgLSAzLjAgKiBhQTIgKyAzLjAgKiBhQTE7IH1cbmZ1bmN0aW9uIEIgKGFBMSwgYUEyKSB7IHJldHVybiAzLjAgKiBhQTIgLSA2LjAgKiBhQTE7IH1cbmZ1bmN0aW9uIEMgKGFBMSkgICAgICB7IHJldHVybiAzLjAgKiBhQTE7IH1cblxuLy8gUmV0dXJucyB4KHQpIGdpdmVuIHQsIHgxLCBhbmQgeDIsIG9yIHkodCkgZ2l2ZW4gdCwgeTEsIGFuZCB5Mi5cbmZ1bmN0aW9uIGNhbGNCZXppZXIgKGFULCBhQTEsIGFBMikgeyByZXR1cm4gKChBKGFBMSwgYUEyKSAqIGFUICsgQihhQTEsIGFBMikpICogYVQgKyBDKGFBMSkpICogYVQ7IH1cblxuLy8gUmV0dXJucyBkeC9kdCBnaXZlbiB0LCB4MSwgYW5kIHgyLCBvciBkeS9kdCBnaXZlbiB0LCB5MSwgYW5kIHkyLlxuZnVuY3Rpb24gZ2V0U2xvcGUgKGFULCBhQTEsIGFBMikgeyByZXR1cm4gMy4wICogQShhQTEsIGFBMikgKiBhVCAqIGFUICsgMi4wICogQihhQTEsIGFBMikgKiBhVCArIEMoYUExKTsgfVxuXG5mdW5jdGlvbiBiaW5hcnlTdWJkaXZpZGUgKGFYLCBhQSwgYUIsIG1YMSwgbVgyKSB7XG4gIHZhciBjdXJyZW50WCwgY3VycmVudFQsIGkgPSAwO1xuICBkbyB7XG4gICAgY3VycmVudFQgPSBhQSArIChhQiAtIGFBKSAvIDIuMDtcbiAgICBjdXJyZW50WCA9IGNhbGNCZXppZXIoY3VycmVudFQsIG1YMSwgbVgyKSAtIGFYO1xuICAgIGlmIChjdXJyZW50WCA+IDAuMCkge1xuICAgICAgYUIgPSBjdXJyZW50VDtcbiAgICB9IGVsc2Uge1xuICAgICAgYUEgPSBjdXJyZW50VDtcbiAgICB9XG4gIH0gd2hpbGUgKE1hdGguYWJzKGN1cnJlbnRYKSA+IFNVQkRJVklTSU9OX1BSRUNJU0lPTiAmJiArK2kgPCBTVUJESVZJU0lPTl9NQVhfSVRFUkFUSU9OUyk7XG4gIHJldHVybiBjdXJyZW50VDtcbn1cblxuZnVuY3Rpb24gbmV3dG9uUmFwaHNvbkl0ZXJhdGUgKGFYLCBhR3Vlc3NULCBtWDEsIG1YMikge1xuIGZvciAodmFyIGkgPSAwOyBpIDwgTkVXVE9OX0lURVJBVElPTlM7ICsraSkge1xuICAgdmFyIGN1cnJlbnRTbG9wZSA9IGdldFNsb3BlKGFHdWVzc1QsIG1YMSwgbVgyKTtcbiAgIGlmIChjdXJyZW50U2xvcGUgPT09IDAuMCkge1xuICAgICByZXR1cm4gYUd1ZXNzVDtcbiAgIH1cbiAgIHZhciBjdXJyZW50WCA9IGNhbGNCZXppZXIoYUd1ZXNzVCwgbVgxLCBtWDIpIC0gYVg7XG4gICBhR3Vlc3NUIC09IGN1cnJlbnRYIC8gY3VycmVudFNsb3BlO1xuIH1cbiByZXR1cm4gYUd1ZXNzVDtcbn1cblxuZnVuY3Rpb24gTGluZWFyRWFzaW5nICh4KSB7XG4gIHJldHVybiB4O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJlemllciAobVgxLCBtWTEsIG1YMiwgbVkyKSB7XG4gIGlmICghKDAgPD0gbVgxICYmIG1YMSA8PSAxICYmIDAgPD0gbVgyICYmIG1YMiA8PSAxKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignYmV6aWVyIHggdmFsdWVzIG11c3QgYmUgaW4gWzAsIDFdIHJhbmdlJyk7XG4gIH1cblxuICBpZiAobVgxID09PSBtWTEgJiYgbVgyID09PSBtWTIpIHtcbiAgICByZXR1cm4gTGluZWFyRWFzaW5nO1xuICB9XG5cbiAgLy8gUHJlY29tcHV0ZSBzYW1wbGVzIHRhYmxlXG4gIHZhciBzYW1wbGVWYWx1ZXMgPSBmbG9hdDMyQXJyYXlTdXBwb3J0ZWQgPyBuZXcgRmxvYXQzMkFycmF5KGtTcGxpbmVUYWJsZVNpemUpIDogbmV3IEFycmF5KGtTcGxpbmVUYWJsZVNpemUpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGtTcGxpbmVUYWJsZVNpemU7ICsraSkge1xuICAgIHNhbXBsZVZhbHVlc1tpXSA9IGNhbGNCZXppZXIoaSAqIGtTYW1wbGVTdGVwU2l6ZSwgbVgxLCBtWDIpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0VEZvclggKGFYKSB7XG4gICAgdmFyIGludGVydmFsU3RhcnQgPSAwLjA7XG4gICAgdmFyIGN1cnJlbnRTYW1wbGUgPSAxO1xuICAgIHZhciBsYXN0U2FtcGxlID0ga1NwbGluZVRhYmxlU2l6ZSAtIDE7XG5cbiAgICBmb3IgKDsgY3VycmVudFNhbXBsZSAhPT0gbGFzdFNhbXBsZSAmJiBzYW1wbGVWYWx1ZXNbY3VycmVudFNhbXBsZV0gPD0gYVg7ICsrY3VycmVudFNhbXBsZSkge1xuICAgICAgaW50ZXJ2YWxTdGFydCArPSBrU2FtcGxlU3RlcFNpemU7XG4gICAgfVxuICAgIC0tY3VycmVudFNhbXBsZTtcblxuICAgIC8vIEludGVycG9sYXRlIHRvIHByb3ZpZGUgYW4gaW5pdGlhbCBndWVzcyBmb3IgdFxuICAgIHZhciBkaXN0ID0gKGFYIC0gc2FtcGxlVmFsdWVzW2N1cnJlbnRTYW1wbGVdKSAvIChzYW1wbGVWYWx1ZXNbY3VycmVudFNhbXBsZSArIDFdIC0gc2FtcGxlVmFsdWVzW2N1cnJlbnRTYW1wbGVdKTtcbiAgICB2YXIgZ3Vlc3NGb3JUID0gaW50ZXJ2YWxTdGFydCArIGRpc3QgKiBrU2FtcGxlU3RlcFNpemU7XG5cbiAgICB2YXIgaW5pdGlhbFNsb3BlID0gZ2V0U2xvcGUoZ3Vlc3NGb3JULCBtWDEsIG1YMik7XG4gICAgaWYgKGluaXRpYWxTbG9wZSA+PSBORVdUT05fTUlOX1NMT1BFKSB7XG4gICAgICByZXR1cm4gbmV3dG9uUmFwaHNvbkl0ZXJhdGUoYVgsIGd1ZXNzRm9yVCwgbVgxLCBtWDIpO1xuICAgIH0gZWxzZSBpZiAoaW5pdGlhbFNsb3BlID09PSAwLjApIHtcbiAgICAgIHJldHVybiBndWVzc0ZvclQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBiaW5hcnlTdWJkaXZpZGUoYVgsIGludGVydmFsU3RhcnQsIGludGVydmFsU3RhcnQgKyBrU2FtcGxlU3RlcFNpemUsIG1YMSwgbVgyKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gQmV6aWVyRWFzaW5nICh4KSB7XG4gICAgLy8gQmVjYXVzZSBKYXZhU2NyaXB0IG51bWJlciBhcmUgaW1wcmVjaXNlLCB3ZSBzaG91bGQgZ3VhcmFudGVlIHRoZSBleHRyZW1lcyBhcmUgcmlnaHQuXG4gICAgaWYgKHggPT09IDApIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICBpZiAoeCA9PT0gMSkge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfVxuICAgIHJldHVybiBjYWxjQmV6aWVyKGdldFRGb3JYKHgpLCBtWTEsIG1ZMik7XG4gIH07XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZnVuY3Rpb24gY2FtZWxDYXNlVG9EYXNoKGNhbWVsQ2FzZVN0cmluZywgam9pbldpdGggPSBcIi1cIikge1xyXG4gICAgcmV0dXJuIGNhbWVsQ2FzZVN0cmluZy5yZXBsYWNlKC8oW2Etel0pKFtBLVpdKS9nLCBcIiQxXCIgKyBqb2luV2l0aCArIFwiJDJcIikudG9Mb3dlckNhc2UoKTtcclxufVxyXG5leHBvcnRzLmNhbWVsQ2FzZVRvRGFzaCA9IGNhbWVsQ2FzZVRvRGFzaDtcclxuZnVuY3Rpb24gdG9VcHBlcihtYXRjaCwgZ3JvdXAxKSB7XHJcbiAgICByZXR1cm4gZ3JvdXAxID8gZ3JvdXAxLnRvVXBwZXJDYXNlKCkgOiAnJztcclxufVxyXG52YXIgREVGQVVMVF9SRUdFWCA9IC9bLV9dKyguKT8vZztcclxuZnVuY3Rpb24gZGFzaFRvQ2FtZWxDYXNlKGRhc2hTdHJpbmcsIHNwbGl0QXQpIHtcclxuICAgIHJldHVybiBkYXNoU3RyaW5nLnJlcGxhY2Uoc3BsaXRBdCA/IG5ldyBSZWdFeHAoJ1snICsgc3BsaXRBdCArICddKyguKScsICdnJykgOiBERUZBVUxUX1JFR0VYLCB0b1VwcGVyKTtcclxufVxyXG5leHBvcnRzLmRhc2hUb0NhbWVsQ2FzZSA9IGRhc2hUb0NhbWVsQ2FzZTtcclxuIiwiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiZGVjb21wb3NlRE9NTWF0cml4XCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImRlY29tcG9zZURPTU1hdHJpeFwiXSA9IGZhY3RvcnkoKTtcbn0pKHdpbmRvdywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gLyoqKioqKi8gKGZ1bmN0aW9uKG1vZHVsZXMpIHsgLy8gd2VicGFja0Jvb3RzdHJhcFxuLyoqKioqKi8gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuLyoqKioqKi8gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuLyoqKioqKi8gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4vKioqKioqLyBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbi8qKioqKiovIFx0XHR9XG4vKioqKioqLyBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbi8qKioqKiovIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4vKioqKioqLyBcdFx0XHRpOiBtb2R1bGVJZCxcbi8qKioqKiovIFx0XHRcdGw6IGZhbHNlLFxuLyoqKioqKi8gXHRcdFx0ZXhwb3J0czoge31cbi8qKioqKiovIFx0XHR9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbi8qKioqKiovIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuLyoqKioqKi8gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbi8qKioqKiovIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4vKioqKioqLyBcdH1cbi8qKioqKiovXG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbi8qKioqKiovIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4vKioqKioqLyBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbi8qKioqKiovIFx0XHR9XG4vKioqKioqLyBcdH07XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbi8qKioqKiovIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbi8qKioqKiovIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuLyoqKioqKi8gXHRcdH1cbi8qKioqKiovIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqKioqKi8gXHR9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4vKioqKioqLyBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuLyoqKioqKi8gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbi8qKioqKiovIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4vKioqKioqLyBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbi8qKioqKiovIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbi8qKioqKiovIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuLyoqKioqKi8gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4vKioqKioqLyBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuLyoqKioqKi8gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbi8qKioqKiovIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4vKioqKioqLyBcdFx0cmV0dXJuIG5zO1xuLyoqKioqKi8gXHR9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4vKioqKioqLyBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4vKioqKioqLyBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuLyoqKioqKi8gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4vKioqKioqLyBcdFx0cmV0dXJuIGdldHRlcjtcbi8qKioqKiovIFx0fTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuLyoqKioqKi9cbi8qKioqKiovXG4vKioqKioqLyBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLyoqKioqKi8gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vZGVjb21wb3NlRG9tbWF0cml4Lm1qc1wiKTtcbi8qKioqKiovIH0pXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKioqKi8gKHtcblxuLyoqKi8gXCIuL2RlY29tcG9zZURvbW1hdHJpeC5tanNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vZGVjb21wb3NlRG9tbWF0cml4Lm1qcyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKiEgZXhwb3J0cyBwcm92aWRlZDogZGVmYXVsdCAqL1xuLyoqKi8gKGZ1bmN0aW9uKF9fd2VicGFja19tb2R1bGVfXywgX193ZWJwYWNrX2V4cG9ydHNfXywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcbmV2YWwoXCJfX3dlYnBhY2tfcmVxdWlyZV9fLnIoX193ZWJwYWNrX2V4cG9ydHNfXyk7XFxuLyogaGFybW9ueSBleHBvcnQgKGJpbmRpbmcpICovIF9fd2VicGFja19yZXF1aXJlX18uZChfX3dlYnBhY2tfZXhwb3J0c19fLCBcXFwiZGVmYXVsdFxcXCIsIGZ1bmN0aW9uKCkgeyByZXR1cm4gZGVjb21wb3NlRE9NTWF0cml4OyB9KTtcXG4vKiBoYXJtb255IGltcG9ydCAqLyB2YXIgX2RlY29tcG9zZU1hdHJpeF9tanNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXyA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4vZGVjb21wb3NlTWF0cml4Lm1qcyAqLyBcXFwiLi9kZWNvbXBvc2VNYXRyaXgubWpzXFxcIik7XFxuLypcXG5cXG5ET01NYXRyaXggaXMgY29sdW1uIG1ham9yLCBtZWFuaW5nOlxcbiBfICAgICAgICAgICAgICAgX1xcbnwgbTExIG0yMSBtMzEgbTQxIHwgIFxcbiAgbTEyIG0yMiBtMzIgbTQyXFxuICBtMTMgbTIzIG0zMyBtNDNcXG4gIG0xNCBtMjQgbTM0IG00NFxcbnxfICAgICAgICAgICAgICAgX3xcXG5cXG4qL1xcblxcblxcblxcbmZ1bmN0aW9uIGRlY29tcG9zZURPTU1hdHJpeChkb21NYXRyaXgpIHtcXG5cXHRjb25zdCBpbmRleGFibGVWZXJzaW9uT2ZNYXRyaXggPSBuZXcgQXJyYXkoNCk7XFxuXFx0Zm9yIChsZXQgY29sdW1uSW5kZXggPSAxOyBjb2x1bW5JbmRleCA8IDU7IGNvbHVtbkluZGV4KyspIHtcXG5cXHRcXHRjb25zdCBjb2x1bW5BcnJheSA9IGluZGV4YWJsZVZlcnNpb25PZk1hdHJpeFtjb2x1bW5JbmRleCAtIDFdID0gbmV3IEFycmF5KDQpO1xcblxcdFxcdGZvciAobGV0IHJvd0luZGV4ID0gMTsgcm93SW5kZXggPCA1OyByb3dJbmRleCsrKSB7XFxuXFx0XFx0XFx0Y29sdW1uQXJyYXlbcm93SW5kZXggLSAxXSA9IGRvbU1hdHJpeFtgbSR7Y29sdW1uSW5kZXh9JHtyb3dJbmRleH1gXTtcXG5cXHRcXHR9XFxuXFx0fVxcblxcblxcdHJldHVybiBPYmplY3QoX2RlY29tcG9zZU1hdHJpeF9tanNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfX1tcXFwiZGVmYXVsdFxcXCJdKShpbmRleGFibGVWZXJzaW9uT2ZNYXRyaXgpO1xcbn1cXG5cXG4vLyMgc291cmNlVVJMPXdlYnBhY2s6Ly9kZWNvbXBvc2VET01NYXRyaXgvLi9kZWNvbXBvc2VEb21tYXRyaXgubWpzP1wiKTtcblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9kZWNvbXBvc2VNYXRyaXgubWpzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL2RlY29tcG9zZU1hdHJpeC5tanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyohIGV4cG9ydHMgcHJvdmlkZWQ6IGRlZmF1bHQgKi9cbi8qKiovIChmdW5jdGlvbihfX3dlYnBhY2tfbW9kdWxlX18sIF9fd2VicGFja19leHBvcnRzX18sIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5ldmFsKFwiX193ZWJwYWNrX3JlcXVpcmVfXy5yKF9fd2VicGFja19leHBvcnRzX18pO1xcbi8qIGhhcm1vbnkgZXhwb3J0IChiaW5kaW5nKSAqLyBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoX193ZWJwYWNrX2V4cG9ydHNfXywgXFxcImRlZmF1bHRcXFwiLCBmdW5jdGlvbigpIHsgcmV0dXJuIGRlY29tcG9zZU1hdHJpeDsgfSk7XFxuLyogaGFybW9ueSBpbXBvcnQgKi8gdmFyIF92ZWN0b3JGdW5jdGlvbnNfbWpzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuL3ZlY3RvckZ1bmN0aW9ucy5tanMgKi8gXFxcIi4vdmVjdG9yRnVuY3Rpb25zLm1qc1xcXCIpO1xcbi8qIGhhcm1vbnkgaW1wb3J0ICovIHZhciBfcm91bmRUb1RocmVlUGxhY2VzX21qc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9fID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi9yb3VuZFRvVGhyZWVQbGFjZXMubWpzICovIFxcXCIuL3JvdW5kVG9UaHJlZVBsYWNlcy5tanNcXFwiKTtcXG4vKiBoYXJtb255IGltcG9ydCAqLyB2YXIgX3F1YXRlcm5pb25Ub0RlZ3JlZXNYWVpfbWpzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8yX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuL3F1YXRlcm5pb25Ub0RlZ3JlZXNYWVoubWpzICovIFxcXCIuL3F1YXRlcm5pb25Ub0RlZ3JlZXNYWVoubWpzXFxcIik7XFxuLypcXG5cXG50aGlzIGNvZGUgaXMgY29waWVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0LW5hdGl2ZS9ibG9iL21hc3Rlci9MaWJyYXJpZXMvVXRpbGl0aWVzL01hdHJpeE1hdGguanMjTDU3MiBhbmQgbW9kaWZpZWRcXG5mb3Igc29tZSBjbGFyaXR5IGFuZCBiZWluZyBhYmxlIHRvIHdvcmsgc3RhbmRhbG9uZS4gRXhwZWN0cyB0aGUgbWF0cml4IHRvIGJlIGEgNC1lbGVtZW50IGFycmF5IG9mIDQtZWxlbWVudCBhcnJheXMgb2YgbnVtYmVycy5cXG5cXG5bXFxuICAgIFtjb2x1bW4xIHJvdzEgdmFsdWUsIGNvbHVtbjEgcm93MiB2YWx1ZSwgY29sdW1uMSByb3czIHZhbHVlXSxcXG4gICAgW2NvbHVtbjIgcm93MSB2YWx1ZSwgY29sdW1uMiByb3cyIHZhbHVlLCBjb2x1bW4yIHJvdzMgdmFsdWVdLFxcbiAgICBbY29sdW1uMyByb3cxIHZhbHVlLCBjb2x1bW4zIHJvdzIgdmFsdWUsIGNvbHVtbjMgcm93MyB2YWx1ZV0sXFxuICAgIFtjb2x1bW40IHJvdzEgdmFsdWUsIGNvbHVtbjQgcm93MiB2YWx1ZSwgY29sdW1uNCByb3czIHZhbHVlXVxcbl1cXG5cXG4qL1xcblxcblxcblxcblxcblxcbmNvbnN0IFJBRF9UT19ERUcgPSAxODAgLyBNYXRoLlBJO1xcblxcbmZ1bmN0aW9uIGRlY29tcG9zZU1hdHJpeChtYXRyaXgpIHtcXG5cXHRjb25zdCBxdWF0ZXJuaW9uID0gbmV3IEFycmF5KDQpO1xcblxcdGNvbnN0IHNjYWxlID0gbmV3IEFycmF5KDMpO1xcblxcdGNvbnN0IHNrZXcgPSBuZXcgQXJyYXkoMyk7XFxuXFx0Y29uc3QgdHJhbnNsYXRpb24gPSBuZXcgQXJyYXkoMyk7XFxuXFxuXFx0Ly8gdHJhbnNsYXRpb24gaXMgc2ltcGxlXFxuXFx0Ly8gaXQncyB0aGUgZmlyc3QgMyB2YWx1ZXMgaW4gdGhlIGxhc3QgY29sdW1uXFxuXFx0Ly8gaS5lLiBtNDEgaXMgWCB0cmFuc2xhdGlvbiwgbTQyIGlzIFkgYW5kIG00MyBpcyBaXFxuXFx0Zm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcXG5cXHRcXHR0cmFuc2xhdGlvbltpXSA9IG1hdHJpeFszXVtpXTtcXG5cXHR9XFxuXFxuXFx0Ly8gTm93IGdldCBzY2FsZSBhbmQgc2hlYXIuXFxuXFx0Y29uc3Qgbm9ybWFsaXplZENvbHVtbnMgPSBuZXcgQXJyYXkoMyk7XFxuXFx0Zm9yIChsZXQgY29sdW1uSW5kZXggPSAwOyBjb2x1bW5JbmRleCA8IDM7IGNvbHVtbkluZGV4KyspIHtcXG5cXHRcXHRub3JtYWxpemVkQ29sdW1uc1tjb2x1bW5JbmRleF0gPSBtYXRyaXhbY29sdW1uSW5kZXhdLnNsaWNlKDAsIDMpO1xcblxcdH1cXG5cXG5cXHQvLyBDb21wdXRlIFggc2NhbGUgZmFjdG9yIGFuZCBub3JtYWxpemUgZmlyc3Qgcm93LlxcblxcdHNjYWxlWzBdID0gX3ZlY3RvckZ1bmN0aW9uc19tanNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfX1tcXFwibGVuZ3RoXFxcIl0obm9ybWFsaXplZENvbHVtbnNbMF0pO1xcblxcdG5vcm1hbGl6ZWRDb2x1bW5zWzBdID0gX3ZlY3RvckZ1bmN0aW9uc19tanNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfX1tcXFwibm9ybWFsaXplXFxcIl0obm9ybWFsaXplZENvbHVtbnNbMF0sIHNjYWxlWzBdKTtcXG5cXG5cXHQvLyBDb21wdXRlIFhZIHNoZWFyIGZhY3RvciBhbmQgbWFrZSAybmQgcm93IG9ydGhvZ29uYWwgdG8gMXN0LlxcblxcdHNrZXdbMF0gPSBfdmVjdG9yRnVuY3Rpb25zX21qc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fW1xcXCJkb3RQcm9kdWN0XFxcIl0obm9ybWFsaXplZENvbHVtbnNbMF0sIG5vcm1hbGl6ZWRDb2x1bW5zWzFdKTtcXG5cXHRub3JtYWxpemVkQ29sdW1uc1sxXSA9IF92ZWN0b3JGdW5jdGlvbnNfbWpzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX19bXFxcImxpbmVhckNvbWJpbmF0aW9uXFxcIl0obm9ybWFsaXplZENvbHVtbnNbMV0sIG5vcm1hbGl6ZWRDb2x1bW5zWzBdLCAxLjAsIC1za2V3WzBdKTtcXG5cXG5cXHQvLyBOb3csIGNvbXB1dGUgWSBzY2FsZSBhbmQgbm9ybWFsaXplIDJuZCByb3cuXFxuXFx0c2NhbGVbMV0gPSBfdmVjdG9yRnVuY3Rpb25zX21qc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fW1xcXCJsZW5ndGhcXFwiXShub3JtYWxpemVkQ29sdW1uc1sxXSk7XFxuXFx0bm9ybWFsaXplZENvbHVtbnNbMV0gPSBfdmVjdG9yRnVuY3Rpb25zX21qc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fW1xcXCJub3JtYWxpemVcXFwiXShub3JtYWxpemVkQ29sdW1uc1sxXSwgc2NhbGVbMV0pO1xcblxcdHNrZXdbMF0gLz0gc2NhbGVbMV07XFxuXFxuXFx0Ly8gQ29tcHV0ZSBYWiBhbmQgWVogc2hlYXJzLCBvcnRob2dvbmFsaXplIDNyZCByb3dcXG5cXHRza2V3WzFdID0gX3ZlY3RvckZ1bmN0aW9uc19tanNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfX1tcXFwiZG90UHJvZHVjdFxcXCJdKG5vcm1hbGl6ZWRDb2x1bW5zWzBdLCBub3JtYWxpemVkQ29sdW1uc1syXSk7XFxuXFx0bm9ybWFsaXplZENvbHVtbnNbMl0gPSBfdmVjdG9yRnVuY3Rpb25zX21qc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fW1xcXCJsaW5lYXJDb21iaW5hdGlvblxcXCJdKG5vcm1hbGl6ZWRDb2x1bW5zWzJdLCBub3JtYWxpemVkQ29sdW1uc1swXSwgMS4wLCAtc2tld1sxXSk7XFxuXFx0c2tld1syXSA9IF92ZWN0b3JGdW5jdGlvbnNfbWpzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX19bXFxcImRvdFByb2R1Y3RcXFwiXShub3JtYWxpemVkQ29sdW1uc1sxXSwgbm9ybWFsaXplZENvbHVtbnNbMl0pO1xcblxcdG5vcm1hbGl6ZWRDb2x1bW5zWzJdID0gX3ZlY3RvckZ1bmN0aW9uc19tanNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfX1tcXFwibGluZWFyQ29tYmluYXRpb25cXFwiXShub3JtYWxpemVkQ29sdW1uc1syXSwgbm9ybWFsaXplZENvbHVtbnNbMV0sIDEuMCwgLXNrZXdbMl0pO1xcblxcblxcdC8vIE5leHQsIGdldCBaIHNjYWxlIGFuZCBub3JtYWxpemUgM3JkIHJvdy5cXG5cXHRzY2FsZVsyXSA9IF92ZWN0b3JGdW5jdGlvbnNfbWpzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX19bXFxcImxlbmd0aFxcXCJdKG5vcm1hbGl6ZWRDb2x1bW5zWzJdKTtcXG5cXHRub3JtYWxpemVkQ29sdW1uc1syXSA9IF92ZWN0b3JGdW5jdGlvbnNfbWpzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX19bXFxcIm5vcm1hbGl6ZVxcXCJdKG5vcm1hbGl6ZWRDb2x1bW5zWzJdLCBzY2FsZVsyXSk7XFxuXFx0c2tld1sxXSAvPSBzY2FsZVsyXTtcXG5cXHRza2V3WzJdIC89IHNjYWxlWzJdO1xcblxcblxcdC8vIEF0IHRoaXMgcG9pbnQsIHRoZSBtYXRyaXggZGVmaW5lZCBpbiBub3JtYWxpemVkQ29sdW1ucyBpcyBvcnRob25vcm1hbC5cXG5cXHQvLyBDaGVjayBmb3IgYSBjb29yZGluYXRlIHN5c3RlbSBmbGlwLiAgSWYgdGhlIGRldGVybWluYW50XFxuXFx0Ly8gaXMgLTEsIHRoZW4gbmVnYXRlIHRoZSBtYXRyaXggYW5kIHRoZSBzY2FsaW5nIGZhY3RvcnMuXFxuXFx0Y29uc3QgcGR1bTMgPSBfdmVjdG9yRnVuY3Rpb25zX21qc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fW1xcXCJjcm9zc1Byb2R1Y3RcXFwiXShub3JtYWxpemVkQ29sdW1uc1sxXSwgbm9ybWFsaXplZENvbHVtbnNbMl0pO1xcblxcdGlmIChfdmVjdG9yRnVuY3Rpb25zX21qc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fW1xcXCJkb3RQcm9kdWN0XFxcIl0obm9ybWFsaXplZENvbHVtbnNbMF0sIHBkdW0zKSA8IDApIHtcXG5cXHRcXHRmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xcblxcdFxcdFxcdHNjYWxlW2ldICo9IC0xO1xcblxcdFxcdFxcdG5vcm1hbGl6ZWRDb2x1bW5zW2ldWzBdICo9IC0xO1xcblxcdFxcdFxcdG5vcm1hbGl6ZWRDb2x1bW5zW2ldWzFdICo9IC0xO1xcblxcdFxcdFxcdG5vcm1hbGl6ZWRDb2x1bW5zW2ldWzJdICo9IC0xO1xcblxcdFxcdH1cXG5cXHR9XFxuXFxuXFx0Ly8gTm93LCBnZXQgdGhlIHJvdGF0aW9ucyBvdXRcXG5cXHRxdWF0ZXJuaW9uWzBdID1cXG5cXHRcXHQwLjUgKiBNYXRoLnNxcnQoTWF0aC5tYXgoMSArIG5vcm1hbGl6ZWRDb2x1bW5zWzBdWzBdIC0gbm9ybWFsaXplZENvbHVtbnNbMV1bMV0gLSBub3JtYWxpemVkQ29sdW1uc1syXVsyXSwgMCkpO1xcblxcdHF1YXRlcm5pb25bMV0gPVxcblxcdFxcdDAuNSAqIE1hdGguc3FydChNYXRoLm1heCgxIC0gbm9ybWFsaXplZENvbHVtbnNbMF1bMF0gKyBub3JtYWxpemVkQ29sdW1uc1sxXVsxXSAtIG5vcm1hbGl6ZWRDb2x1bW5zWzJdWzJdLCAwKSk7XFxuXFx0cXVhdGVybmlvblsyXSA9XFxuXFx0XFx0MC41ICogTWF0aC5zcXJ0KE1hdGgubWF4KDEgLSBub3JtYWxpemVkQ29sdW1uc1swXVswXSAtIG5vcm1hbGl6ZWRDb2x1bW5zWzFdWzFdICsgbm9ybWFsaXplZENvbHVtbnNbMl1bMl0sIDApKTtcXG5cXHRxdWF0ZXJuaW9uWzNdID1cXG5cXHRcXHQwLjUgKiBNYXRoLnNxcnQoTWF0aC5tYXgoMSArIG5vcm1hbGl6ZWRDb2x1bW5zWzBdWzBdICsgbm9ybWFsaXplZENvbHVtbnNbMV1bMV0gKyBub3JtYWxpemVkQ29sdW1uc1syXVsyXSwgMCkpO1xcblxcblxcdGlmIChub3JtYWxpemVkQ29sdW1uc1syXVsxXSA+IG5vcm1hbGl6ZWRDb2x1bW5zWzFdWzJdKSB7XFxuXFx0XFx0cXVhdGVybmlvblswXSA9IC1xdWF0ZXJuaW9uWzBdO1xcblxcdH1cXG5cXHRpZiAobm9ybWFsaXplZENvbHVtbnNbMF1bMl0gPiBub3JtYWxpemVkQ29sdW1uc1syXVswXSkge1xcblxcdFxcdHF1YXRlcm5pb25bMV0gPSAtcXVhdGVybmlvblsxXTtcXG5cXHR9XFxuXFx0aWYgKG5vcm1hbGl6ZWRDb2x1bW5zWzFdWzBdID4gbm9ybWFsaXplZENvbHVtbnNbMF1bMV0pIHtcXG5cXHRcXHRxdWF0ZXJuaW9uWzJdID0gLXF1YXRlcm5pb25bMl07XFxuXFx0fVxcblxcblxcdC8vIGNvcnJlY3QgZm9yIG9jY2FzaW9uYWwsIHdlaXJkIEV1bGVyIHN5bm9ueW1zIGZvciAyZCByb3RhdGlvblxcblxcdGxldCByb3RhdGlvbkRlZ3JlZXM7XFxuXFx0aWYgKFxcblxcdFxcdHF1YXRlcm5pb25bMF0gPCAwLjAwMSAmJlxcblxcdFxcdHF1YXRlcm5pb25bMF0gPj0gMCAmJlxcblxcdFxcdHF1YXRlcm5pb25bMV0gPCAwLjAwMSAmJlxcblxcdFxcdHF1YXRlcm5pb25bMV0gPj0gMFxcblxcdCkge1xcblxcdFxcdC8vIHRoaXMgaXMgYSAyZCByb3RhdGlvbiBvbiB0aGUgei1heGlzXFxuXFx0XFx0cm90YXRpb25EZWdyZWVzID0gW1xcblxcdFxcdFxcdDAsXFxuXFx0XFx0XFx0MCxcXG5cXHRcXHRcXHRPYmplY3QoX3JvdW5kVG9UaHJlZVBsYWNlc19tanNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfX1tcXFwiZGVmYXVsdFxcXCJdKShcXG5cXHRcXHRcXHRcXHQoTWF0aC5hdGFuMihub3JtYWxpemVkQ29sdW1uc1swXVsxXSwgbm9ybWFsaXplZENvbHVtbnNbMF1bMF0pICogMTgwKSAvIE1hdGguUElcXG5cXHRcXHRcXHQpXFxuXFx0XFx0XTtcXG5cXHR9IGVsc2Uge1xcblxcdFxcdHJvdGF0aW9uRGVncmVlcyA9IE9iamVjdChfcXVhdGVybmlvblRvRGVncmVlc1hZWl9tanNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzJfX1tcXFwiZGVmYXVsdFxcXCJdKShxdWF0ZXJuaW9uKTtcXG5cXHR9XFxuXFxuXFx0Ly8gZXhwb3NlIGJvdGggYmFzZSBkYXRhIGFuZCBjb252ZW5pZW5jZSBuYW1lc1xcblxcdHJldHVybiB7XFxuXFx0XFx0cm90YXRlWDogcm90YXRpb25EZWdyZWVzWzBdLFxcblxcdFxcdHJvdGF0ZVk6IHJvdGF0aW9uRGVncmVlc1sxXSxcXG5cXHRcXHRyb3RhdGVaOiByb3RhdGlvbkRlZ3JlZXNbMl0sXFxuXFx0XFx0c2NhbGVYOiBPYmplY3QoX3JvdW5kVG9UaHJlZVBsYWNlc19tanNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfX1tcXFwiZGVmYXVsdFxcXCJdKShzY2FsZVswXSksXFxuXFx0XFx0c2NhbGVZOiBPYmplY3QoX3JvdW5kVG9UaHJlZVBsYWNlc19tanNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfX1tcXFwiZGVmYXVsdFxcXCJdKShzY2FsZVsxXSksXFxuXFx0XFx0c2NhbGVaOiBPYmplY3QoX3JvdW5kVG9UaHJlZVBsYWNlc19tanNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfX1tcXFwiZGVmYXVsdFxcXCJdKShzY2FsZVsyXSksXFxuXFx0XFx0dHJhbnNsYXRlWDogdHJhbnNsYXRpb25bMF0sXFxuXFx0XFx0dHJhbnNsYXRlWTogdHJhbnNsYXRpb25bMV0sXFxuXFx0XFx0dHJhbnNsYXRlWjogdHJhbnNsYXRpb25bMl0sXFxuXFx0XFx0c2tld1hZOiBPYmplY3QoX3JvdW5kVG9UaHJlZVBsYWNlc19tanNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfX1tcXFwiZGVmYXVsdFxcXCJdKShza2V3WzBdKSAqIFJBRF9UT19ERUcsXFxuXFx0XFx0c2tld1haOiBPYmplY3QoX3JvdW5kVG9UaHJlZVBsYWNlc19tanNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfX1tcXFwiZGVmYXVsdFxcXCJdKShza2V3WzFdKSAqIFJBRF9UT19ERUcsXFxuXFx0XFx0c2tld1laOiBPYmplY3QoX3JvdW5kVG9UaHJlZVBsYWNlc19tanNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfX1tcXFwiZGVmYXVsdFxcXCJdKShza2V3WzJdICogUkFEX1RPX0RFRylcXG5cXHR9O1xcbn1cXG5cXG4vLyMgc291cmNlVVJMPXdlYnBhY2s6Ly9kZWNvbXBvc2VET01NYXRyaXgvLi9kZWNvbXBvc2VNYXRyaXgubWpzP1wiKTtcblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9xdWF0ZXJuaW9uVG9EZWdyZWVzWFlaLm1qc1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vcXVhdGVybmlvblRvRGVncmVlc1hZWi5tanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qISBleHBvcnRzIHByb3ZpZGVkOiBkZWZhdWx0ICovXG4vKioqLyAoZnVuY3Rpb24oX193ZWJwYWNrX21vZHVsZV9fLCBfX3dlYnBhY2tfZXhwb3J0c19fLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuZXZhbChcIl9fd2VicGFja19yZXF1aXJlX18ucihfX3dlYnBhY2tfZXhwb3J0c19fKTtcXG4vKiBoYXJtb255IGV4cG9ydCAoYmluZGluZykgKi8gX193ZWJwYWNrX3JlcXVpcmVfXy5kKF9fd2VicGFja19leHBvcnRzX18sIFxcXCJkZWZhdWx0XFxcIiwgZnVuY3Rpb24oKSB7IHJldHVybiBxdWF0ZXJuaW9uVG9EZWdyZWVzWFlaOyB9KTtcXG4vKiBoYXJtb255IGltcG9ydCAqLyB2YXIgX3JvdW5kVG9UaHJlZVBsYWNlc19tanNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXyA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4vcm91bmRUb1RocmVlUGxhY2VzLm1qcyAqLyBcXFwiLi9yb3VuZFRvVGhyZWVQbGFjZXMubWpzXFxcIik7XFxuLypcXG5cXG4gY29waWVkIGZyb206IGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC1uYXRpdmUvYmxvYi9tYXN0ZXIvTGlicmFyaWVzL1V0aWxpdGllcy9NYXRyaXhNYXRoLmpzXFxuXFxuKi9cXG5cXG5cXG5cXG5cXG5jb25zdCBSQURfVE9fREVHID0gMTgwIC8gTWF0aC5QSTtcXG5cXG5mdW5jdGlvbiBxdWF0ZXJuaW9uVG9EZWdyZWVzWFlaKHF1YXRlcm5pb24pIHtcXG5cXG5cXHRjb25zdCBbcXgsIHF5LCBxeiwgcXddID0gcXVhdGVybmlvbjtcXG5cXHRjb25zdCBxdzIgPSBxdyAqIHF3O1xcblxcdGNvbnN0IHF4MiA9IHF4ICogcXg7XFxuXFx0Y29uc3QgcXkyID0gcXkgKiBxeTtcXG5cXHRjb25zdCBxejIgPSBxeiAqIHF6O1xcblxcdGNvbnN0IHRlc3QgPSBxeCAqIHF5ICsgcXogKiBxdztcXG5cXHRjb25zdCB1bml0ID0gcXcyICsgcXgyICsgcXkyICsgcXoyO1xcblxcblxcdGlmICh0ZXN0ID4gMC40OTk5OSAqIHVuaXQpIHtcXG5cXHQgIHJldHVybiBbMCwgMiAqIE1hdGguYXRhbjIocXgsIHF3KSAqIFJBRF9UT19ERUcsIDkwXTtcXG5cXHR9XFxuXFx0aWYgKHRlc3QgPCAtMC40OTk5OSAqIHVuaXQpIHtcXG5cXHQgIHJldHVybiBbMCwgLTIgKiBNYXRoLmF0YW4yKHF4LCBxdykgKiBSQURfVE9fREVHLCAtOTBdO1xcblxcdH1cXG5cXG5cXHRyZXR1cm4gW1xcblxcdCAgT2JqZWN0KF9yb3VuZFRvVGhyZWVQbGFjZXNfbWpzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX19bXFxcImRlZmF1bHRcXFwiXSkoXFxuXFx0XFx0TWF0aC5hdGFuMigyICogcXggKiBxdyAtIDIgKiBxeSAqIHF6LCAxIC0gMiAqIHF4MiAtIDIgKiBxejIpICogUkFEX1RPX0RFRyxcXG5cXHQgICksXFxuXFx0ICBPYmplY3QoX3JvdW5kVG9UaHJlZVBsYWNlc19tanNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfX1tcXFwiZGVmYXVsdFxcXCJdKShcXG5cXHRcXHRNYXRoLmF0YW4yKDIgKiBxeSAqIHF3IC0gMiAqIHF4ICogcXosIDEgLSAyICogcXkyIC0gMiAqIHF6MikgKiBSQURfVE9fREVHLFxcblxcdCAgKSxcXG5cXHQgIE9iamVjdChfcm91bmRUb1RocmVlUGxhY2VzX21qc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fW1xcXCJkZWZhdWx0XFxcIl0pKE1hdGguYXNpbigyICogcXggKiBxeSArIDIgKiBxeiAqIHF3KSAqIFJBRF9UT19ERUcpLFxcblxcdF07XFxuXFxufVxcblxcbi8vIyBzb3VyY2VVUkw9d2VicGFjazovL2RlY29tcG9zZURPTU1hdHJpeC8uL3F1YXRlcm5pb25Ub0RlZ3JlZXNYWVoubWpzP1wiKTtcblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9yb3VuZFRvVGhyZWVQbGFjZXMubWpzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL3JvdW5kVG9UaHJlZVBsYWNlcy5tanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyohIGV4cG9ydHMgcHJvdmlkZWQ6IGRlZmF1bHQgKi9cbi8qKiovIChmdW5jdGlvbihfX3dlYnBhY2tfbW9kdWxlX18sIF9fd2VicGFja19leHBvcnRzX18sIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5ldmFsKFwiX193ZWJwYWNrX3JlcXVpcmVfXy5yKF9fd2VicGFja19leHBvcnRzX18pO1xcbi8qIGhhcm1vbnkgZXhwb3J0IChiaW5kaW5nKSAqLyBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoX193ZWJwYWNrX2V4cG9ydHNfXywgXFxcImRlZmF1bHRcXFwiLCBmdW5jdGlvbigpIHsgcmV0dXJuIHJvdW5kVG9UaHJlZVBsYWNlczsgfSk7XFxuLypcXG5cXG5mcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC1uYXRpdmUvYmxvYi9tYXN0ZXIvTGlicmFyaWVzL1V0aWxpdGllcy9NYXRyaXhNYXRoLmpzXFxuXFxuKi8gXFxuXFxuZnVuY3Rpb24gcm91bmRUb1RocmVlUGxhY2VzKG51bWJlcil7XFxuICAgIGNvbnN0IGFyciA9IG51bWJlci50b1N0cmluZygpLnNwbGl0KCdlJyk7XFxuICAgIHJldHVybiBNYXRoLnJvdW5kKGFyclswXSArICdlJyArIChhcnJbMV0gPyArYXJyWzFdIC0gMyA6IDMpKSAqIDAuMDAxO1xcbn1cXG5cXG4vLyMgc291cmNlVVJMPXdlYnBhY2s6Ly9kZWNvbXBvc2VET01NYXRyaXgvLi9yb3VuZFRvVGhyZWVQbGFjZXMubWpzP1wiKTtcblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi92ZWN0b3JGdW5jdGlvbnMubWpzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL3ZlY3RvckZ1bmN0aW9ucy5tanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyohIGV4cG9ydHMgcHJvdmlkZWQ6IGxlbmd0aCwgbm9ybWFsaXplLCBkb3RQcm9kdWN0LCBjcm9zc1Byb2R1Y3QsIGxpbmVhckNvbWJpbmF0aW9uICovXG4vKioqLyAoZnVuY3Rpb24oX193ZWJwYWNrX21vZHVsZV9fLCBfX3dlYnBhY2tfZXhwb3J0c19fLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuZXZhbChcIl9fd2VicGFja19yZXF1aXJlX18ucihfX3dlYnBhY2tfZXhwb3J0c19fKTtcXG4vKiBoYXJtb255IGV4cG9ydCAoYmluZGluZykgKi8gX193ZWJwYWNrX3JlcXVpcmVfXy5kKF9fd2VicGFja19leHBvcnRzX18sIFxcXCJsZW5ndGhcXFwiLCBmdW5jdGlvbigpIHsgcmV0dXJuIGxlbmd0aDsgfSk7XFxuLyogaGFybW9ueSBleHBvcnQgKGJpbmRpbmcpICovIF9fd2VicGFja19yZXF1aXJlX18uZChfX3dlYnBhY2tfZXhwb3J0c19fLCBcXFwibm9ybWFsaXplXFxcIiwgZnVuY3Rpb24oKSB7IHJldHVybiBub3JtYWxpemU7IH0pO1xcbi8qIGhhcm1vbnkgZXhwb3J0IChiaW5kaW5nKSAqLyBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoX193ZWJwYWNrX2V4cG9ydHNfXywgXFxcImRvdFByb2R1Y3RcXFwiLCBmdW5jdGlvbigpIHsgcmV0dXJuIGRvdFByb2R1Y3Q7IH0pO1xcbi8qIGhhcm1vbnkgZXhwb3J0IChiaW5kaW5nKSAqLyBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoX193ZWJwYWNrX2V4cG9ydHNfXywgXFxcImNyb3NzUHJvZHVjdFxcXCIsIGZ1bmN0aW9uKCkgeyByZXR1cm4gY3Jvc3NQcm9kdWN0OyB9KTtcXG4vKiBoYXJtb255IGV4cG9ydCAoYmluZGluZykgKi8gX193ZWJwYWNrX3JlcXVpcmVfXy5kKF9fd2VicGFja19leHBvcnRzX18sIFxcXCJsaW5lYXJDb21iaW5hdGlvblxcXCIsIGZ1bmN0aW9uKCkgeyByZXR1cm4gbGluZWFyQ29tYmluYXRpb247IH0pO1xcbi8qXFxuXFxuIGNvcGllZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC1uYXRpdmUvYmxvYi9tYXN0ZXIvTGlicmFyaWVzL1V0aWxpdGllcy9NYXRyaXhNYXRoLmpzI0w1NzJcXG5cXG4gdmVjdG9ycyBhcmUganVzdCBhcnJheXMgb2YgbnVtYmVyc1xcblxcbiovXFxuXFxuZnVuY3Rpb24gbGVuZ3RoKHZlY3Rvcikge1xcbiAgICByZXR1cm4gTWF0aC5zcXJ0KFxcbiAgICAgICAgdmVjdG9yWzBdICogdmVjdG9yWzBdICsgXFxuICAgICAgICB2ZWN0b3JbMV0gKiB2ZWN0b3JbMV0gKyBcXG4gICAgICAgIHZlY3RvclsyXSAqIHZlY3RvclsyXVxcbiAgICApO1xcbn1cXG5cXG5mdW5jdGlvbiBub3JtYWxpemUodmVjdG9yLCBwcmVDb21wdXRlZFZlY3Rvckxlbmd0aCkge1xcbiAgICByZXR1cm4gW1xcbiAgICAgICAgdmVjdG9yWzBdL3ByZUNvbXB1dGVkVmVjdG9yTGVuZ3RoLCBcXG4gICAgICAgIHZlY3RvclsxXS9wcmVDb21wdXRlZFZlY3Rvckxlbmd0aCxcXG4gICAgICAgIHZlY3RvclsyXS9wcmVDb21wdXRlZFZlY3Rvckxlbmd0aFxcbiAgICBdO1xcbn1cXG5cXG5mdW5jdGlvbiBkb3RQcm9kdWN0KHZlY3RvckEsIHZlY3RvckIpIHtcXG4gICAgcmV0dXJuIChcXG4gICAgICAgIHZlY3RvckFbMF0gKiB2ZWN0b3JCWzBdICtcXG4gICAgICAgIHZlY3RvckFbMV0gKiB2ZWN0b3JCWzFdICtcXG4gICAgICAgIHZlY3RvckFbMl0gKiB2ZWN0b3JCWzJdXFxuICAgICk7XFxufVxcblxcbmZ1bmN0aW9uIGNyb3NzUHJvZHVjdCh2ZWN0b3JBLCB2ZWN0b3JCKSB7XFxuICAgIHJldHVybiBbXFxuICAgICAgICB2ZWN0b3JBWzFdICogdmVjdG9yQlsyXSAtIHZlY3RvckFbMl0gKiB2ZWN0b3JCWzFdLFxcbiAgICAgICAgdmVjdG9yQVsyXSAqIHZlY3RvckJbMF0gLSB2ZWN0b3JBWzBdICogdmVjdG9yQlsyXSxcXG4gICAgICAgIHZlY3RvckFbMF0gKiB2ZWN0b3JCWzFdIC0gdmVjdG9yQVsxXSAqIHZlY3RvckJbMF1cXG4gICAgXTtcXG59XFxuXFxuZnVuY3Rpb24gbGluZWFyQ29tYmluYXRpb24odmVjdG9yQSwgdmVjdG9yQiwgYVNjYWxlRmFjdG9yLCBiU2NhbGVGYWN0b3IpIHtcXG4gICAgcmV0dXJuIFtcXG4gICAgICAgIHZlY3RvckFbMF0gKiBhU2NhbGVGYWN0b3IgKyB2ZWN0b3JCWzBdICogYlNjYWxlRmFjdG9yLFxcbiAgICAgICAgdmVjdG9yQVsxXSAqIGFTY2FsZUZhY3RvciArIHZlY3RvckJbMV0gKiBiU2NhbGVGYWN0b3IsXFxuICAgICAgICB2ZWN0b3JBWzJdICogYVNjYWxlRmFjdG9yICsgdmVjdG9yQlsyXSAqIGJTY2FsZUZhY3RvclxcbiAgICBdO1xcbn1cXG5cXG4vLyMgc291cmNlVVJMPXdlYnBhY2s6Ly9kZWNvbXBvc2VET01NYXRyaXgvLi92ZWN0b3JGdW5jdGlvbnMubWpzP1wiKTtcblxuLyoqKi8gfSlcblxuLyoqKioqKi8gfSk7XG59KTsiLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGNyZWF0ZUFib3J0RXJyb3IgPSAoKSA9PiB7XG5cdGNvbnN0IGVycm9yID0gbmV3IEVycm9yKCdEZWxheSBhYm9ydGVkJyk7XG5cdGVycm9yLm5hbWUgPSAnQWJvcnRFcnJvcic7XG5cdHJldHVybiBlcnJvcjtcbn07XG5cbmNvbnN0IGNyZWF0ZURlbGF5ID0gKHtjbGVhclRpbWVvdXQ6IGRlZmF1bHRDbGVhciwgc2V0VGltZW91dDogc2V0LCB3aWxsUmVzb2x2ZX0pID0+IChtcywge3ZhbHVlLCBzaWduYWx9ID0ge30pID0+IHtcblx0aWYgKHNpZ25hbCAmJiBzaWduYWwuYWJvcnRlZCkge1xuXHRcdHJldHVybiBQcm9taXNlLnJlamVjdChjcmVhdGVBYm9ydEVycm9yKCkpO1xuXHR9XG5cblx0bGV0IHRpbWVvdXRJZDtcblx0bGV0IHNldHRsZTtcblx0bGV0IHJlamVjdEZuO1xuXHRjb25zdCBjbGVhciA9IGRlZmF1bHRDbGVhciB8fCBjbGVhclRpbWVvdXQ7XG5cblx0Y29uc3Qgc2lnbmFsTGlzdGVuZXIgPSAoKSA9PiB7XG5cdFx0Y2xlYXIodGltZW91dElkKTtcblx0XHRyZWplY3RGbihjcmVhdGVBYm9ydEVycm9yKCkpO1xuXHR9O1xuXG5cdGNvbnN0IGNsZWFudXAgPSAoKSA9PiB7XG5cdFx0aWYgKHNpZ25hbCkge1xuXHRcdFx0c2lnbmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Fib3J0Jywgc2lnbmFsTGlzdGVuZXIpO1xuXHRcdH1cblx0fTtcblxuXHRjb25zdCBkZWxheVByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0c2V0dGxlID0gKCkgPT4ge1xuXHRcdFx0Y2xlYW51cCgpO1xuXHRcdFx0aWYgKHdpbGxSZXNvbHZlKSB7XG5cdFx0XHRcdHJlc29sdmUodmFsdWUpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmVqZWN0KHZhbHVlKTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0cmVqZWN0Rm4gPSByZWplY3Q7XG5cdFx0dGltZW91dElkID0gKHNldCB8fCBzZXRUaW1lb3V0KShzZXR0bGUsIG1zKTtcblx0fSk7XG5cblx0aWYgKHNpZ25hbCkge1xuXHRcdHNpZ25hbC5hZGRFdmVudExpc3RlbmVyKCdhYm9ydCcsIHNpZ25hbExpc3RlbmVyLCB7b25jZTogdHJ1ZX0pO1xuXHR9XG5cblx0ZGVsYXlQcm9taXNlLmNsZWFyID0gKCkgPT4ge1xuXHRcdGNsZWFyKHRpbWVvdXRJZCk7XG5cdFx0dGltZW91dElkID0gbnVsbDtcblx0XHRjbGVhbnVwKCk7XG5cdFx0c2V0dGxlKCk7XG5cdH07XG5cblx0cmV0dXJuIGRlbGF5UHJvbWlzZTtcbn07XG5cbmNvbnN0IGRlbGF5ID0gY3JlYXRlRGVsYXkoe3dpbGxSZXNvbHZlOiB0cnVlfSk7XG5kZWxheS5yZWplY3QgPSBjcmVhdGVEZWxheSh7d2lsbFJlc29sdmU6IGZhbHNlfSk7XG5kZWxheS5jcmVhdGVXaXRoVGltZXJzID0gKHtjbGVhclRpbWVvdXQsIHNldFRpbWVvdXR9KSA9PiB7XG5cdGNvbnN0IGRlbGF5ID0gY3JlYXRlRGVsYXkoe2NsZWFyVGltZW91dCwgc2V0VGltZW91dCwgd2lsbFJlc29sdmU6IHRydWV9KTtcblx0ZGVsYXkucmVqZWN0ID0gY3JlYXRlRGVsYXkoe2NsZWFyVGltZW91dCwgc2V0VGltZW91dCwgd2lsbFJlc29sdmU6IGZhbHNlfSk7XG5cdHJldHVybiBkZWxheTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZGVsYXk7XG4vLyBUT0RPOiBSZW1vdmUgdGhpcyBmb3IgdGhlIG5leHQgbWFqb3IgcmVsZWFzZVxubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGRlbGF5O1xuIiwiaW1wb3J0IHsgRGF0YSB9IGZyb20gXCJmcm9udC1kYlwiO1xyXG5pbXBvcnQgZGVsYXkgZnJvbSBcImRlbGF5XCI7XHJcbmNsYXNzIEludGVybmFsRWxlbWVudExpc3QgZXh0ZW5kcyBBcnJheSB7XHJcbiAgICBjb25zdHJ1Y3RvciguLi5lbGVtcykge1xyXG4gICAgICAgIHN1cGVyKC4uLmVsZW1zKTtcclxuICAgIH1cclxuICAgIGFzeW5jIGFuaW0oZnJhbWVfZnJhbWVzLCBvcHRpb25zLCBndWlkYW5jZV9zdGFnZ2VyLCBzdGFnZ2VyKSB7XHJcbiAgICAgICAgdGhpcy53YXJuKFwiYW5pbVwiKTtcclxuICAgICAgICBpZiAoIShndWlkYW5jZV9zdGFnZ2VyIGluc3RhbmNlb2YgRGF0YSkpIHtcclxuICAgICAgICAgICAgc3RhZ2dlciA9IGd1aWRhbmNlX3N0YWdnZXI7XHJcbiAgICAgICAgICAgIGd1aWRhbmNlX3N0YWdnZXIgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzdGFnZ2VyKSB7XHJcbiAgICAgICAgICAgIGxldCBhd2FpdEZvckFuaW1hdGlvbkR1cmF0aW9uID0gc3RhZ2dlciA9PT0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKGF3YWl0Rm9yQW5pbWF0aW9uRHVyYXRpb24pIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGUgb2YgdGhpcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGUuYW5pbShmcmFtZV9mcmFtZXMsIG9wdGlvbnMsIGd1aWRhbmNlX3N0YWdnZXIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgIT09IHRoaXMubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzW2ldLmFuaW0oZnJhbWVfZnJhbWVzLCBvcHRpb25zLCBndWlkYW5jZV9zdGFnZ2VyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgZGVsYXkoc3RhZ2dlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpc1tpXS5hbmltKGZyYW1lX2ZyYW1lcywgb3B0aW9ucywgZ3VpZGFuY2Vfc3RhZ2dlcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBscyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBlIG9mIHRoaXMpIHtcclxuICAgICAgICAgICAgICAgIGxzLmFkZChlLmFuaW0oZnJhbWVfZnJhbWVzLCBvcHRpb25zLCBndWlkYW5jZV9zdGFnZ2VyKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwobHMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNoaWxkcyhzZWxlY3RvciA9IDEpIHtcclxuICAgICAgICBsZXQgbHMgPSBuZXcgRWxlbWVudExpc3QoKTtcclxuICAgICAgICB0aGlzLmVhKChlKSA9PiB7XHJcbiAgICAgICAgICAgIGxzLmFkZCguLi5lLmNoaWxkcyhzZWxlY3RvcikpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBscztcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyBub2RlIG9yIGVsZW1lbnQgZnJvbSBsaXN0XHJcbiAgICAgKiBAcGFyYW0gdmFsdWVPckluZGljZXMgV2hlbiAxIG9yIG1vcmUgaXMgZ2l2ZW4sIFRoZSBtYXRjaGluZyBlbGVtZW50cyB3aWxsIGJlIHJlbW92ZWQgZnJvbSB0aGUgRWxlbWVudExpc3QgKFhycmF5IGltcGxlbWVudGF0aW9uKS4gV2hlbiBubyBwYXJhbWV0ZXIgaXMgZ2l2ZW4gYWxsIEVsZW1lbnRzIG9mIHRoZSBFbGVtZW50TGlzdCB3aWxsIGJlIHJlbW92ZWQgZnJvbSB0aGUgZG9tIChkb20gaW1wbGVtZW50YXRpb24pLlxyXG4gICAgICovXHJcbiAgICByZW1vdmUoLi4udmFsdWVPckluZGljZXMpIHtcclxuICAgICAgICBpZiAodmFsdWVPckluZGljZXMuZW1wdHkpIHtcclxuICAgICAgICAgICAgdGhpcy5lYSgoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBzdXBlci5yZW1vdmUoLi4udmFsdWVPckluZGljZXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHdhcm4oY21kKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubGVuZ3RoID09PSAwKVxyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJUcnlpbmcgdG8gZXhlY3V0ZSBjb21tYW5kIFxcXCJcIiArIGNtZCArIFwiXFxcIiBvbiBlbXB0eSBOb2RlTHMuXCIpO1xyXG4gICAgfVxyXG4gICAgZXhlYyhmdW5jdGlvbk5hbWUsIGFyZ3MpIHtcclxuICAgICAgICB0aGlzLndhcm4oZnVuY3Rpb25OYW1lKTtcclxuICAgICAgICBsZXQgZW5kID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgZSBvZiB0aGlzKSB7XHJcbiAgICAgICAgICAgIGVuZC5hZGQoZVtmdW5jdGlvbk5hbWVdKC4uLmFyZ3MpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGVuZDtcclxuICAgIH1cclxuICAgIGV4ZWNDaGFpbihmdW5jdGlvbk5hbWUsIGFyZ3MpIHtcclxuICAgICAgICB0aGlzLndhcm4oZnVuY3Rpb25OYW1lKTtcclxuICAgICAgICBmb3IgKGxldCBlIG9mIHRoaXMpIHtcclxuICAgICAgICAgICAgZVtmdW5jdGlvbk5hbWVdKC4uLmFyZ3MpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxufVxyXG4vL0B0cy1pZ25vcmVcclxuZXhwb3J0IGNvbnN0IEVsZW1lbnRMaXN0ID0gSW50ZXJuYWxFbGVtZW50TGlzdDtcclxuLy9UT0RPOiBjaGlsZHMgY2FsbCBjYW4gcmV0dXJuIE5vZGVMcyBvciBqdXN0IG9uZSBFbGVtZW50IGJlY2F1c2UgdGhlIHN0cnVjdHVyZSBpcyBzbyBzaW1pbGFyIChiZXR0ZXIgcGVyZm9ybWFuY2UpLiBNYXliZSB3b3VsZCBhbHNvIG1lYW4gdGhhdCB5b3UgbmV2ZXIga25vdyBpZiBnZXR0ZXIgZ2l2ZSB5b3UgYXJyYXkgb3Igbm90LiBUaGV5IGRvIGhhdmUgc29tZSBkaWZmZXJlbmNlcyB0aG91Z2guIFlvdSBjb3VsZG50IHVzZSByZXN0IG9wZXJhdGlvbnMgZS5nLlxyXG4vL2hhcyBzZXR0ZXJHZXR0ZXIgLT4gbWFrZSBlbVxyXG4vL2hhcyBcImhhc1wiIGluIG5hbWUgLT4gbWFrZSBoYXMsIGNvbnRhaW5zIGFuZCBoYXZlIG1ldGhvZFxyXG4vL2FueSBvdGhlciBmdW5jdGlvbiwgY2FsbCBpdCB3aXRoIHBhcmFtcyBhbmQgcmV0dXJuIGFycmF5IG9mIHJlc3VsdHNcclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRQcm90b3R5cGUoKSB7XHJcbiAgICBjb25zdCBnZXRQcm9wRGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IuYmluZChPYmplY3QpO1xyXG4gICAgY29uc3QgZWxlbVByb3RvID0gRWxlbWVudC5wcm90b3R5cGU7XHJcbiAgICBjb25zdCBsc1Byb3RvID0gRWxlbWVudExpc3QucHJvdG90eXBlO1xyXG4gICAgY29uc3QgTm9kZVByb3RvID0gTm9kZS5wcm90b3R5cGU7XHJcbiAgICBjb25zdCBFdlRhclByb3RvID0gRXZlbnRUYXJnZXQucHJvdG90eXBlO1xyXG4gICAgY29uc3QgaGFzID0gXCJoYXNcIjtcclxuICAgIGNvbnN0IGluY2x1ZGVzU3RyaW5nID0gXCJpbmNsdWRlc1wiO1xyXG4gICAgY29uc3QgY29udGFpbnNTdHJpbmcgPSBcImNvbnRhaW5zXCI7XHJcbiAgICBjb25zdCBleGNsdWRlc1N0cmluZyA9IFwiZXhjbHVkZXNcIjtcclxuICAgIGNvbnN0IGV4ZWNTdHJpbmcgPSBcImV4ZWNcIjtcclxuICAgIGNvbnN0IGV4ZWNDaGFpblN0cmluZyA9IFwiZXhlY0NoYWluXCI7XHJcbiAgICBjb25zdCBjaGFpbkFibGVGdW5jdGlvbnMgPSBbXCJpbnNlcnRBZnRlclwiLCBcIm9uXCIsIFwib2ZmXCIsIFwiY3NzXCIsIFwiYWRkQ2xhc3NcIiwgXCJyZW1vdmVDbGFzc1wiLCBcImhhc0NsYXNzXCIsIFwidG9nZ2xlQ2xhc3NcIiwgXCJhcGRcIiwgXCJlbXB0eU5vZGVzXCIsIFwiaGlkZVwiLCBcInNob3dcIl07XHJcbiAgICBmb3IgKGxldCBrIGluIGVsZW1Qcm90bykge1xyXG4gICAgICAgIGlmIChsc1Byb3RvW2tdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIlNraXBpbmcgXCIgKyBrKTtcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBkID0gZ2V0UHJvcERlc2MoZWxlbVByb3RvLCBrKTtcclxuICAgICAgICBpZiAoZCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGQgPSBnZXRQcm9wRGVzYyhOb2RlUHJvdG8sIGspO1xyXG4gICAgICAgICAgICBpZiAoZCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBkID0gZ2V0UHJvcERlc2MoRXZUYXJQcm90bywgayk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJFZG9tOiBVbmV4cGVjdGVkIGNoYW5nZSBpbiBkb20gYXBpLiBUaGUgcHJvcGVydHkgXFxcIlwiICsgayArIFwiXFxcIiB3aWxsIG5vdCBhdmFpbGFibGUgaW4gXCIgKyBFbGVtZW50TGlzdC5uYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coaywgZC53cml0YWJsZSk7XHJcbiAgICAgICAgICAgIGlmIChkLmdldCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZpbmVHZXR0ZXJTZXR0ZXIoaywgZC5zZXQgIT09IHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdmFsID0gZC52YWx1ZTtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoay5zdWJzdHIoMCwgMykgPT09IGhhcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQga05hbWUgPSBrLnN1YnN0cigzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2luY2UgdGhpcyBrIHN0YXJ0cyB3aXRoIFwiaGFzXCIgaXQgY2FudCBiZSBjaGFpbmFibGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgbHNQcm90b1tleGNsdWRlc1N0cmluZyArIGtOYW1lXSA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZW5kID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGUgb2YgdGhpcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZVtrXSguLi5hcmdzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVuZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbHNQcm90b1tjb250YWluc1N0cmluZyArIGtOYW1lXSA9IGxzUHJvdG9baW5jbHVkZXNTdHJpbmcgKyBrTmFtZV0gPSBmdW5jdGlvbiAoLi4uYXJncykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGVuZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgZSBvZiB0aGlzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVba10oLi4uYXJncykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVuZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlzQ2hhaW5BYmxlRnVuY3Rpb24gPSBjaGFpbkFibGVGdW5jdGlvbnMuaW5jbHVkZXMoayk7XHJcbiAgICAgICAgICAgICAgICAgICAgbHNQcm90b1trXSA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzW2lzQ2hhaW5BYmxlRnVuY3Rpb24gPyBleGVjQ2hhaW5TdHJpbmcgOiBleGVjU3RyaW5nXShrLCBhcmdzKTtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmaW5lR2V0dGVyU2V0dGVyKGssICFkLndyaXRhYmxlIHx8ICFkLmNvbmZpZ3VyYWJsZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBkZWZpbmVHZXR0ZXJTZXR0ZXIoa2V5LCB3cml0ZUFibGUpIHtcclxuICAgICAgICBsZXQgbyA9IHtcclxuICAgICAgICAgICAgZ2V0KCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGVuZCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgZSBvZiB0aGlzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5kLmFkZChlW2tleV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVuZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYgKHdyaXRlQWJsZSlcclxuICAgICAgICAgICAgby5zZXQgPSBmdW5jdGlvbiAodG8pIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGUgb2YgdGhpcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGVba2V5XSA9IHRvO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShsc1Byb3RvLCBrZXksIG8pO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IEVsZW1lbnRMaXN0IH0gZnJvbSBcIi4vZWxlbWVudExpc3RcIjtcclxuZXhwb3J0IGNsYXNzIFRlbCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihub2RlcywgZXZlbnQsIGxpc3RlbmVyLCBlbmFibGUgPSB0cnVlKSB7XHJcbiAgICAgICAgdGhpcy5fZW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucCA9IG5ldyBOZWwodW5kZWZpbmVkLCBldmVudCwgbGlzdGVuZXIpO1xyXG4gICAgICAgIC8vIFdlIGxsIG9ubHkgdXNlIG1ldGhvZHMgaGVyZSB0aGF0IGFyZSBhdmFsYWJsZSB0byBFdmVudFRhcmdldHMgaGVyZSAob24sIG9mZilcclxuICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICBpZiAobm9kZXMgaW5zdGFuY2VvZiBBcnJheSlcclxuICAgICAgICAgICAgdGhpcy5wLm5vZGVzID0gbmV3IEVsZW1lbnRMaXN0KC4uLm5vZGVzKTtcclxuICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMucC5ub2RlcyA9IG5ldyBFbGVtZW50TGlzdChub2Rlcyk7XHJcbiAgICAgICAgaWYgKGVuYWJsZSlcclxuICAgICAgICAgICAgdGhpcy5lbmFibGUoKTtcclxuICAgIH1cclxuICAgIGdldCBldmVudCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wLmV2ZW50O1xyXG4gICAgfVxyXG4gICAgZ2V0IG5vZGVzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnAubm9kZXM7XHJcbiAgICB9XHJcbiAgICBnZXQgbGlzdGVuZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucC5saXN0ZW5lcjtcclxuICAgIH1cclxuICAgIHNldCBub2Rlcyhub2RlKSB7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlKCk7XHJcbiAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgdGhpcy5wLm5vZGVzID0gbmV3IEVsZW1lbnRMaXN0KC4uLm5vZGUpO1xyXG4gICAgICAgIHRoaXMuZW5hYmxlKCk7XHJcbiAgICB9XHJcbiAgICBzZXQgZXZlbnQoZXZlbnQpIHtcclxuICAgICAgICB0aGlzLmRpc2FibGUoKTtcclxuICAgICAgICB0aGlzLnAuZXZlbnQgPSBldmVudDtcclxuICAgICAgICB0aGlzLmVuYWJsZSgpO1xyXG4gICAgfVxyXG4gICAgc2V0IGxpc3RlbmVyKGxpc3RlbmVyKSB7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlKCk7XHJcbiAgICAgICAgdGhpcy5wLmxpc3RlbmVyID0gbGlzdGVuZXI7XHJcbiAgICAgICAgdGhpcy5lbmFibGUoKTtcclxuICAgIH1cclxuICAgIHNldCBlbmFibGVkKHRvKSB7XHJcbiAgICAgICAgaWYgKHRvKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9lbmFibGVkKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgdGhpcy5wLm5vZGVzLm9uKHRoaXMuZXZlbnQsIHRoaXMubGlzdGVuZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLl9lbmFibGVkKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgdGhpcy5wLm5vZGVzLm9mZih0aGlzLmV2ZW50LCB0aGlzLmxpc3RlbmVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fZW5hYmxlZCA9IHRvO1xyXG4gICAgfVxyXG4gICAgZ2V0IGVuYWJsZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VuYWJsZWQ7XHJcbiAgICB9XHJcbiAgICBlbmFibGUoKSB7XHJcbiAgICAgICAgdGhpcy5lbmFibGVkID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGRpc2FibGUoKSB7XHJcbiAgICAgICAgdGhpcy5lbmFibGVkID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXBhdGNoKCkge1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZSgpO1xyXG4gICAgICAgIHRoaXMuZW5hYmxlKCk7XHJcbiAgICB9XHJcbn1cclxuY2xhc3MgTmVsIHtcclxuICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgY29uc3RydWN0b3Iobm9kZXMsIGV2ZW50LCBsaXN0ZW5lcikge1xyXG4gICAgICAgIHRoaXMubm9kZXMgPSBub2RlcztcclxuICAgICAgICB0aGlzLmV2ZW50ID0gZXZlbnQ7XHJcbiAgICAgICAgdGhpcy5saXN0ZW5lciA9IGxpc3RlbmVyO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBYcnJheSBmcm9tIFwieHJyYXlcIjtcclxuWHJyYXkoQXJyYXkpO1xyXG5leHBvcnQgeyBpbml0LCBwb2x5ZmlsbHMgfSBmcm9tIFwiLi9saWIvcG9seWZpbGxcIjtcclxuaW1wb3J0IHsgaW5pdCB9IGZyb20gXCIuL2xpYi9wb2x5ZmlsbFwiO1xyXG5leHBvcnQgZGVmYXVsdCBpbml0O1xyXG5pbXBvcnQgXCIuL2V4dGVudGlvbnMvY2hpbGRzXCI7XHJcbmltcG9ydCBcIi4vZXh0ZW50aW9ucy9jbGFzc1wiO1xyXG5pbXBvcnQgXCIuL2V4dGVudGlvbnMvY3NzU2hvcnRoYW5kc1wiO1xyXG5pbXBvcnQgXCIuL2V4dGVudGlvbnMvaHRtbFRleHRcIjtcclxuaW1wb3J0IFwiLi9leHRlbnRpb25zL2luc2VydEFmdGVyXCI7XHJcbmltcG9ydCBcIi4vZXh0ZW50aW9ucy9saXN0ZW5lclwiO1xyXG5pbXBvcnQgXCIuL2V4dGVudGlvbnMvb25PZmZcIjtcclxuaW1wb3J0IFwiLi9leHRlbnRpb25zL3N0eWxlTWFuaXB1bGF0aW9uXCI7XHJcbmV4cG9ydCB7IEVsZW1lbnRMaXN0IH0gZnJvbSBcIi4vY29tcG9uZW50cy9lbGVtZW50TGlzdFwiO1xyXG5pbXBvcnQgeyBpbml0UHJvdG90eXBlIH0gZnJvbSBcIi4vY29tcG9uZW50cy9lbGVtZW50TGlzdFwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9jb21wb25lbnRzL3RlbFwiO1xyXG5pbml0UHJvdG90eXBlKCk7XHJcbiIsImltcG9ydCB7IGF0IH0gZnJvbSBcIi4uL2xpYi9hdHRhdGNoVG9Qcm90b1wiO1xyXG5pbXBvcnQgeyBFbGVtZW50TGlzdCB9IGZyb20gXCIuLi9jb21wb25lbnRzL2VsZW1lbnRMaXN0XCI7XHJcbmNvbnN0IGJlZm9yZWVuZCA9IFwiYmVmb3JlZW5kXCI7XHJcbmF0KFwiYXBkXCIsIGZ1bmN0aW9uICguLi5lbGVtcykge1xyXG4gICAgZWxlbXMuZWEoKGUpID0+IHtcclxuICAgICAgICBpZiAoZSBpbnN0YW5jZW9mIEVsZW1lbnQpXHJcbiAgICAgICAgICAgIHRoaXMuYXBwZW5kKGUpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy5pbnNlcnRBZGphY2VudEhUTUwoYmVmb3JlZW5kLCBlKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn0pO1xyXG5hdChcImVtcHR5Tm9kZXNcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5odG1sID0gXCJcIjtcclxuICAgIHJldHVybiB0aGlzO1xyXG59KTtcclxuYXQoXCJjaGlsZHNcIiwgZnVuY3Rpb24gKHNlbGVjdG9yX2RlcHRoID0gMSkge1xyXG4gICAgaWYgKHR5cGVvZiBzZWxlY3Rvcl9kZXB0aCA9PT0gXCJzdHJpbmdcIilcclxuICAgICAgICByZXR1cm4gbmV3IEVsZW1lbnRMaXN0KC4uLnRoaXMucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcl9kZXB0aCkpO1xyXG4gICAgZWxzZSBpZiAoc2VsZWN0b3JfZGVwdGggPiAwKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBFbGVtZW50TGlzdCguLi50aGlzLmNoaWxkcmVuLCAuLi5uZXcgRWxlbWVudExpc3QoLi4udGhpcy5jaGlsZHJlbikuY2hpbGRzKHNlbGVjdG9yX2RlcHRoIC0gMSkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ldyBFbGVtZW50TGlzdCgpO1xyXG59KTtcclxuIiwiaW1wb3J0IHsgYXQgfSBmcm9tIFwiLi4vbGliL2F0dGF0Y2hUb1Byb3RvXCI7XHJcbmF0KFwiYWRkQ2xhc3NcIiwgZnVuY3Rpb24gKC4uLmNsYXNzTmFtZSkge1xyXG4gICAgdGhpcy5jbGFzc0xpc3QuYWRkKC4uLmNsYXNzTmFtZSk7XHJcbiAgICByZXR1cm4gdGhpcztcclxufSk7XHJcbmF0KFwicmVtb3ZlQ2xhc3NcIiwgZnVuY3Rpb24gKC4uLmNsYXNzTmFtZSkge1xyXG4gICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKC4uLmNsYXNzTmFtZSk7XHJcbiAgICByZXR1cm4gdGhpcztcclxufSk7XHJcbmF0KFwiaGFzQ2xhc3NcIiwgZnVuY3Rpb24gKC4uLmNsYXNzTmFtZSkge1xyXG4gICAgbGV0IGhhcyA9IHRydWU7XHJcbiAgICBjbGFzc05hbWUuZWEoKGNscykgPT4ge1xyXG4gICAgICAgIGlmICghdGhpcy5jbGFzc0xpc3QuY29udGFpbnMoY2xzKSlcclxuICAgICAgICAgICAgaGFzID0gZmFsc2U7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBoYXM7XHJcbn0pO1xyXG5hdChcInRvZ2dsZUNsYXNzXCIsIGZ1bmN0aW9uICguLi5jbGFzc05hbWUpIHtcclxuICAgIGNsYXNzTmFtZS5lYSgoY2xzKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuaGFzQ2xhc3MoY2xzKSlcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVDbGFzcyhjbHMpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy5hZGRDbGFzcyhjbHMpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gdGhpcztcclxufSk7XHJcbiIsImltcG9ydCB7IGF0IH0gZnJvbSBcIi4uL2xpYi9hdHRhdGNoVG9Qcm90b1wiO1xyXG5hdChcImhpZGVcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5jc3MoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG59KTtcclxuYXQoXCJzaG93XCIsIGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuY3NzKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn0pO1xyXG5hdChcImhlaWdodFwiLCB7XHJcbiAgICBnZXQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3NzKFwiaGVpZ2h0XCIpO1xyXG4gICAgfSxcclxuICAgIHNldCh0bykge1xyXG4gICAgICAgIHRoaXMuY3NzKFwiaGVpZ2h0XCIsIHRvKTtcclxuICAgIH1cclxufSk7XHJcbmF0KFwid2lkdGhcIiwge1xyXG4gICAgZ2V0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNzcyhcIndpZHRoXCIpO1xyXG4gICAgfSxcclxuICAgIHNldCh0bykge1xyXG4gICAgICAgIHRoaXMuY3NzKFwid2lkdGhcIiwgdG8pO1xyXG4gICAgfVxyXG59KTtcclxuYXQoXCJvZmZzZXRSaWdodFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5vZmZzZXRMZWZ0ICsgdGhpcy5vZmZzZXRXaWR0aDtcclxufSk7XHJcbmF0KFwib2Zmc2V0Qm90dG9tXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLm9mZnNldFRvcCArIHRoaXMub2Zmc2V0SGVpZ2h0O1xyXG59KTtcclxuYXQoXCJhYnNvbHV0ZU9mZnNldFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxufSk7XHJcbmF0KFwib3V0ZXJXaWR0aFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5vZmZzZXRXaWR0aDtcclxufSk7XHJcbmF0KFwib3V0ZXJIZWlnaHRcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHRoaXMub2Zmc2V0SGVpZ2h0O1xyXG59KTtcclxuYXQoXCJpbm5lcldpZHRoXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLmNsaWVudFdpZHRoO1xyXG59KTtcclxuYXQoXCJpbm5lckhlaWdodFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jbGllbnRIZWlnaHQ7XHJcbn0pO1xyXG5hdChcInBhcmVudFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5wYXJlbnRFbGVtZW50O1xyXG59KTtcclxuIiwiaW1wb3J0IHsgYXQgfSBmcm9tIFwiLi4vbGliL2F0dGF0Y2hUb1Byb3RvXCI7XHJcbi8vIFRPRE86IGRhdGEgc3VwcG9ydFxyXG5hdChcImh0bWxcIiwge1xyXG4gICAgZ2V0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlubmVySFRNTDtcclxuICAgIH0sXHJcbiAgICBzZXQodG8pIHtcclxuICAgICAgICB0aGlzLmlubmVySFRNTCA9IHRvO1xyXG4gICAgfVxyXG59KTtcclxuYXQoXCJ0ZXh0XCIsIHtcclxuICAgIGdldCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbm5lclRleHQ7XHJcbiAgICB9LFxyXG4gICAgc2V0KHRvKSB7XHJcbiAgICAgICAgdGhpcy5pbm5lclRleHQgPSB0bztcclxuICAgIH1cclxufSk7XHJcbiIsImltcG9ydCB7IGF0IH0gZnJvbSBcIi4uL2xpYi9hdHRhdGNoVG9Qcm90b1wiO1xyXG5hdChcImluc2VydEFmdGVyXCIsIGZ1bmN0aW9uIChuZXdOb2RlLCByZWZlcmVuY2VOb2RlKSB7XHJcbiAgICBpZiAocmVmZXJlbmNlTm9kZS5wYXJlbnQgIT09IHRoaXMpXHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBpcyBub3QgdGhlIHBhcmVudCBvZiByZWZlcmVuY2VOb2RlLlwiKTtcclxuICAgIGxldCBzaWIgPSByZWZlcmVuY2VOb2RlLm5leHRTaWJsaW5nO1xyXG4gICAgaWYgKHNpYiAhPT0gbnVsbClcclxuICAgICAgICB0aGlzLmluc2VydEJlZm9yZShuZXdOb2RlLCBzaWIpO1xyXG4gICAgZWxzZVxyXG4gICAgICAgIHRoaXMuYXBkKG5ld05vZGUpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn0pO1xyXG4iLCJpbXBvcnQgeyBhdCB9IGZyb20gXCIuLi9saWIvYXR0YXRjaFRvUHJvdG9cIjtcclxuaW1wb3J0IHsgVGVsIH0gZnJvbSBcIi4uL2Vkb21cIjtcclxuYXQoW1wibGlzdGVuZXJcIiwgXCJsaXN0ZW5cIiwgXCJsc1wiXSwgZnVuY3Rpb24gKGV2ZW50LCBsaXN0ZW5lciwgcGF0Y2gpIHtcclxuICAgIHJldHVybiBuZXcgVGVsKHRoaXMsIGV2ZW50LCBsaXN0ZW5lciwgcGF0Y2gpO1xyXG59KTtcclxuIiwiaW1wb3J0IHsgYXQgfSBmcm9tIFwiLi4vbGliL2F0dGF0Y2hUb1Byb3RvXCI7XHJcbmltcG9ydCB7IHBvbHlmaWxscyB9IGZyb20gXCIuLi9saWIvcG9seWZpbGxcIjtcclxuY29uc3QgZGF0YVRyYW5zZmVycyA9IHt9O1xyXG5sZXQgZGF0YVRyYW5zZmVySUQgPSAwO1xyXG5sZXQgcmVzaXplTGlzdGVuZXIgPSBuZXcgTWFwKCk7XHJcbi8vb25seSBpbml0IHdoZW4gbmVlZGVkIHNpbmNlIHRoaXMgaGVhdmlseSBjb25zdW1lcyByZXNvdXJjZXMgKGNwdSkuXHJcbmxldCBvYnM7XHJcbmxldCBvYnNVbmRlZmluZWQgPSB0cnVlO1xyXG5mdW5jdGlvbiBpbml0UmVzT2JzKCkge1xyXG4gICAgb2JzVW5kZWZpbmVkID0gZmFsc2U7XHJcbiAgICBvYnMgPSBuZXcgcG9seWZpbGxzLlJlc2l6ZU9ic2VydmVyKChlbGVtZW50cykgPT4ge1xyXG4gICAgICAgIGVsZW1lbnRzLmVhKChlbGVtKSA9PiB7XHJcbiAgICAgICAgICAgIHJlc2l6ZUxpc3RlbmVyLmdldChlbGVtLnRhcmdldCkuZm9yRWFjaCgoYWN0dWFsRnVuYykgPT4ge1xyXG4gICAgICAgICAgICAgICAgYWN0dWFsRnVuYygpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59XHJcbi8vVE9ETzogbWFrZSBnZXRmdW5jdGlvblxyXG5sZXQgZXZlbnRMaXN0ZW5lckluZGV4ID0gbmV3IE1hcCgpO1xyXG5jb25zdCBrZXkgPSBcImFkdmFuY2VkRGF0YVRyYW5zZmVyZVwiO1xyXG4vL1RPRE86IGRvY3VtZW50IC8gd2luZG93Lm9uKFwicmVhZHlcIilcclxuLy9UT0RPOiByZXR1cm4gZGF0YSAvIG9yIHByb21pc2Ugd2hlbiBubyBjYiBpcyBnaXZlblxyXG4vL1RPRE86IGNoZWNrIGlmIG9wdGlvbnMgYXJlIHRha2VuIGludG8gYWNjb3VudCAocmVzaXplPz8pXHJcbmF0KFwib25cIiwgZnVuY3Rpb24gKC4uLmEpIHtcclxuICAgIGxldCBpc1Jlc2l6ZSA9IGFbMF0gPT09IFwicmVzaXplXCI7XHJcbiAgICBpZiAoaXNSZXNpemUgJiYgdGhpcyAhPT0gd2luZG93KSB7XHJcbiAgICAgICAgaWYgKG9ic1VuZGVmaW5lZClcclxuICAgICAgICAgICAgaW5pdFJlc09icygpO1xyXG4gICAgICAgIGxldCBtYXAgPSByZXNpemVMaXN0ZW5lci5nZXQodGhpcyk7XHJcbiAgICAgICAgaWYgKG1hcCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIG9icy5vYnNlcnZlKHRoaXMpO1xyXG4gICAgICAgICAgICBtYXAgPSBuZXcgTWFwKCk7XHJcbiAgICAgICAgICAgIHJlc2l6ZUxpc3RlbmVyLnNldCh0aGlzLCBtYXApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBtYXAuc2V0KGFbMV0sIGFbMV0uYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBsZXQgYWN0dWFsTGlzdGVuZXI7XHJcbiAgICAgICAgaWYgKGlzUmVzaXplKSB7XHJcbiAgICAgICAgICAgIGFbMV0uYmluZCh0aGlzKShmYWxzZSk7XHJcbiAgICAgICAgICAgIGFjdHVhbExpc3RlbmVyID0gYVsxXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoYVswXSA9PT0gXCJkcmFnc3RhcnRcIikge1xyXG4gICAgICAgICAgICBkYXRhVHJhbnNmZXJJRCsrO1xyXG4gICAgICAgICAgICBhY3R1YWxMaXN0ZW5lciA9IChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBlLnNldERhdGEgPSAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFUcmFuc2ZlcnNbZGF0YVRyYW5zZmVySURdID0gZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICBlLmRhdGFUcmFuc2Zlci5zZXREYXRhKGtleSwgZGF0YVRyYW5zZmVySUQpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIGFbMV0oZSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGFbMF0gPT09IFwiZHJvcFwiKSB7XHJcbiAgICAgICAgICAgIGFjdHVhbExpc3RlbmVyID0gKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGUuZ2V0RGF0YSA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaWQgPSBlLmRhdGFUcmFuc2Zlci5nZXREYXRhKGtleSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZvdW5kID0gaWQgIT09IFwiXCIgPyBkYXRhVHJhbnNmZXJzW2lkXSA6IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGRhdGFUcmFuc2ZlcnNbaWRdO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmb3VuZDtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBhWzFdKGUpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgYWN0dWFsTGlzdGVuZXIgPSBhWzFdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBhY3R1YWxMaXN0ZW5lciA9IGFjdHVhbExpc3RlbmVyLmJpbmQodGhpcyk7XHJcbiAgICAgICAgbGV0IHRoYXQgPSBldmVudExpc3RlbmVySW5kZXguZ2V0KHRoaXMpO1xyXG4gICAgICAgIGxldCBvID0geyBldmVudDogYVswXSwgYWN0dWFsTGlzdGVuZXIsIHVzZXJMaXN0ZW5lcjogYVsxXSwgb3B0aW9uczogYVsyXSB9O1xyXG4gICAgICAgIGlmICh0aGF0ID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIGV2ZW50TGlzdGVuZXJJbmRleC5zZXQodGhpcywgW29dKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoYXQuYWRkKG8pO1xyXG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihhWzBdLCBhY3R1YWxMaXN0ZW5lciwgYVsyXSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcztcclxufSk7XHJcbmF0KFwib2ZmXCIsIGZ1bmN0aW9uICguLi5hKSB7XHJcbiAgICBpZiAoYVswXSA9PT0gXCJyZXNpemVcIiAmJiB0aGlzICE9PSB3aW5kb3cpIHtcclxuICAgICAgICBpZiAob2JzVW5kZWZpbmVkKVxyXG4gICAgICAgICAgICBpbml0UmVzT2JzKCk7XHJcbiAgICAgICAgbGV0IG1hcCA9IHJlc2l6ZUxpc3RlbmVyLmdldCh0aGlzKTtcclxuICAgICAgICBpZiAobWFwICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgbWFwLmRlbGV0ZShhWzFdKTtcclxuICAgICAgICAgICAgaWYgKG1hcC5zaXplID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBvYnMudW5vYnNlcnZlKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgcmVzaXplTGlzdGVuZXIuZGVsZXRlKHRoaXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgbGV0IHRvQmVSbSA9IFtdO1xyXG4gICAgICAgIGxldCB0aGF0ID0gZXZlbnRMaXN0ZW5lckluZGV4LmdldCh0aGlzKTtcclxuICAgICAgICBpZiAodGhhdCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGlmIChhWzBdICE9PSB1bmRlZmluZWQgJiYgYVsxXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmVhKChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUuZXZlbnQgPT09IGFbMF0gJiYgZS51c2VyTGlzdGVuZXIgPT09IGFbMV0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvQmVSbS5hZGQoZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuZWEoKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZS5ldmVudCA9PT0gYVswXSB8fCBlLnVzZXJMaXN0ZW5lciA9PT0gYVsxXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9CZVJtLmFkZChlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRvQmVSbS5lYSgoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKGUuZXZlbnQsIGUuYWN0dWFsTGlzdGVuZXIpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5ybShlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmICh0aGF0LmVtcHR5KVxyXG4gICAgICAgICAgICAgICAgZXZlbnRMaXN0ZW5lckluZGV4LmRlbGV0ZSh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcztcclxufSk7XHJcbiIsImltcG9ydCB7IGFlIH0gZnJvbSBcIi4uL2xpYi9hdHRhdGNoVG9Qcm90b1wiO1xyXG5pbXBvcnQgeyBEYXRhIH0gZnJvbSBcImZyb250LWRiXCI7XHJcbmltcG9ydCBkZWNvbXBvc2VNYXRyaXggZnJvbSBcImRlY29tcG9zZS1kb21tYXRyaXhcIjtcclxuaW1wb3J0IHNwcmVhZE9mZnNldCBmcm9tIFwic3ByZWFkLW9mZnNldFwiO1xyXG5pbXBvcnQgeyBwYXJzZUluLCBwYXJzZU91dCB9IGZyb20gXCIuLy4uL2xpYi9wYXJzZVwiO1xyXG5pbXBvcnQgVHdlZW5PYmplY3QgZnJvbSBcInR3ZWVuLW9iamVjdFwiO1xyXG5pbXBvcnQgYW5pbWF0aW9uRnJhbWVEZWx0YSBmcm9tIFwiYW5pbWF0aW9uLWZyYW1lLWRlbHRhXCI7XHJcbmltcG9ydCBFYXNpbmcgZnJvbSBcIndhYXBpLWVhc2luZ1wiO1xyXG5pbXBvcnQgY2xvbmUgZnJvbSBcInRpbnktY2xvbmVcIjtcclxuZnVuY3Rpb24gcG9zdEZpeFN0eWxlKHByb3AsIHN0eWxlLCBwYXJzZUluZGV4LCBwYXJzZURpcmVjdGlvbkluID0gdHJ1ZSkge1xyXG4gICAgbGV0IGZpeCA9IHBhcnNlRGlyZWN0aW9uSW4gPyBwYXJzZUluW3BhcnNlSW5kZXhdW3Byb3BdIDogcGFyc2VPdXRbcGFyc2VJbmRleF1bcHJvcF07XHJcbiAgICBpZiAoZml4ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBpZiAodHlwZW9mIGZpeCA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgICAgICByZXR1cm4gZml4KHN0eWxlKTtcclxuICAgICAgICBlbHNlIGlmICh0eXBlb2Ygc3R5bGUgPT09IFwibnVtYmVyXCIpXHJcbiAgICAgICAgICAgIHJldHVybiBzdHlsZSArIGZpeDtcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgIGxldCBlID0gc3BsaXRWYWx1ZUZyb21Vbml0KHN0eWxlKTtcclxuICAgICAgICAgICAgaWYgKGUudW5pdCA9PT0gXCJcIilcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdHlsZSArIGZpeDtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0eWxlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgICAgICByZXR1cm4gc3R5bGUudG9TdHJpbmcoKTtcclxufVxyXG5mdW5jdGlvbiBzdHlsZVByb3BlcnR5QXR0cmlidXRlKGVsZW0sIHN0eWxlUHJvcGVydHlBdHRyaWJ1dGUpIHtcclxuICAgIHJldHVybiAoVHJhbnNmb3JtUHJvcC5hcHBsaWVzKHN0eWxlUHJvcGVydHlBdHRyaWJ1dGUpIHx8IGdldENvbXB1dGVkU3R5bGUoZWxlbSlbc3R5bGVQcm9wZXJ0eUF0dHJpYnV0ZV0gIT09IHVuZGVmaW5lZCkgPyBcInN0eWxlXCIgOlxyXG4gICAgICAgIHN0eWxlUHJvcGVydHlBdHRyaWJ1dGUgaW4gZWxlbSA/IFwicHJvcFwiIDpcclxuICAgICAgICAgICAgXCJhdHRyXCI7XHJcbn1cclxuZnVuY3Rpb24gc3R5bGVQcm9wZXJ0eUF0dHJpYnV0ZU9mS2V5ZnJhbWUoZWxlbSwga2V5cykge1xyXG4gICAgbGV0IG8gPSB7fTtcclxuICAgIGtleXMuZWEoKGUpID0+IHtcclxuICAgICAgICBvW2VdID0gc3R5bGVQcm9wZXJ0eUF0dHJpYnV0ZShlbGVtLCBlKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIG87XHJcbn1cclxuLy8gT3B0aW1pemUgbWF5YmVcclxuY29uc3Qgc3R5bGVTdHJpbmcgPSBcInN0eWxlXCI7XHJcbmZ1bmN0aW9uIHNlcGVyYXRlS2V5ZnJhbWVTdHlsZXNGcm9tUHJvcHMoa2V5ZnJhbWVzLCBwYXJzZUluZGV4TWFwKSB7XHJcbiAgICBjb25zdCBzdHlsZSA9IFtdO1xyXG4gICAgY29uc3QgcHJvcCA9IFtdO1xyXG4gICAga2V5ZnJhbWVzLmVhKChrZXlmcmFtZSkgPT4ge1xyXG4gICAgICAgIGxldCBzID0ge307XHJcbiAgICAgICAgbGV0IHAgPSB7fTtcclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBwYXJzZUluZGV4TWFwKSB7XHJcbiAgICAgICAgICAgIGlmIChwYXJzZUluZGV4TWFwW2tleV0gPT09IHN0eWxlU3RyaW5nKVxyXG4gICAgICAgICAgICAgICAgc1trZXldID0ga2V5ZnJhbWVba2V5XTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgcFtrZXldID0ga2V5ZnJhbWVba2V5XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFPYmplY3Qua2V5cyhwKS5lbXB0eSkge1xyXG4gICAgICAgICAgICBwLm9mZnNldCA9IGtleWZyYW1lLm9mZnNldDtcclxuICAgICAgICAgICAgcHJvcC5hZGQocCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghT2JqZWN0LmtleXMocykuZW1wdHkpIHtcclxuICAgICAgICAgICAgcy5vZmZzZXQgPSBrZXlmcmFtZS5vZmZzZXQ7XHJcbiAgICAgICAgICAgIHN0eWxlLmFkZChzKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiB7IHN0eWxlLCBwcm9wIH07XHJcbn1cclxubGV0IGZvcm1hdFN0eWxlID0gKCgpID0+IHtcclxuICAgIGNvbnN0IGpvaW5Db21tYSA9IFwiLFwiO1xyXG4gICAgY29uc3Qgam9pblNwYWNlID0gXCIgXCI7XHJcbiAgICBmdW5jdGlvbiBmb3JtYXRTdHlsZShwcm9wLCBzdHlsZSwgdGhhdCwgcGFyc2VJbmRleCwgcGFyc2VEaXJlY3Rpb25JbiA9IHRydWUpIHtcclxuICAgICAgICBsZXQgZW5kO1xyXG4gICAgICAgIGxldCB0cmFuc2Zvcm1BcHBsaWVzID0gVHJhbnNmb3JtUHJvcC5hcHBsaWVzKHByb3ApO1xyXG4gICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgIGxldCBpc0FyID0gc3R5bGUgaW5zdGFuY2VvZiBBcnJheTtcclxuICAgICAgICAvLyBUT0RPOiBXaHkgaXMgcGFyc2VJbiByZXF1aXJlZCB0byBiZSB0cnVlP1xyXG4gICAgICAgIGlmIChpc0FyICYmIHBhcnNlRGlyZWN0aW9uSW4pIHtcclxuICAgICAgICAgICAgbGV0IGFyID0gW107XHJcbiAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICBmb3IgKGxldCBzdGwgb2Ygc3R5bGUpIHtcclxuICAgICAgICAgICAgICAgIGFyLmFkZChwb3N0Rml4U3R5bGUocHJvcCwgc3RsLCBwYXJzZUluZGV4LCBwYXJzZURpcmVjdGlvbkluKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZW5kID0gYXIuam9pbih0cmFuc2Zvcm1BcHBsaWVzID8gam9pbkNvbW1hIDogam9pblNwYWNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBlbmQgPSBwb3N0Rml4U3R5bGUocHJvcCwgc3R5bGUsIHBhcnNlSW5kZXgsIHBhcnNlRGlyZWN0aW9uSW4pO1xyXG4gICAgICAgIGlmICh0aGF0IGluc3RhbmNlb2YgVHJhbnNmb3JtUHJvcCkge1xyXG4gICAgICAgICAgICBpZiAodHJhbnNmb3JtQXBwbGllcykge1xyXG4gICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICB0aGF0W3Byb3BdID0gZW5kO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVuZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhhdCBpbnN0YW5jZW9mIEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgaWYgKHRyYW5zZm9ybUFwcGxpZXMpIHtcclxuICAgICAgICAgICAgICAgIGxldCBtZSA9IGdldFRyYW5zZm9ybVByb3BzKHRoYXQpO1xyXG4gICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICBtZVtwcm9wXSA9IGVuZDtcclxuICAgICAgICAgICAgICAgIHJldHVybiBtZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZW5kO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybiBlbmQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZm9ybWF0U3R5bGU7XHJcbn0pKCk7XHJcbmxldCB0cmFuc2Zyb21Qcm9wc0luZGV4ID0gbmV3IE1hcCgpO1xyXG5mdW5jdGlvbiBidWlsZEdldEluZGV4KG1hcCwgaW5pdCkge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgICAgIGxldCBtZSA9IG1hcC5nZXQoaW5kZXgpO1xyXG4gICAgICAgIGlmIChtZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIG1lID0gaW5pdChpbmRleCk7XHJcbiAgICAgICAgICAgIG1hcC5zZXQoaW5kZXgsIG1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1lO1xyXG4gICAgfTtcclxufVxyXG5jb25zdCBnZXRUcmFuc2Zvcm1Qcm9wcyA9IGJ1aWxkR2V0SW5kZXgodHJhbnNmcm9tUHJvcHNJbmRleCwgaW5kZXggPT4gbmV3IFRyYW5zZm9ybVByb3AoaW5kZXguY3NzKFwidHJhbnNmb3JtXCIpKSk7XHJcbmZ1bmN0aW9uIGZvcm1hdENzcyhjc3MsIHRoYXQsIHBhcnNlSW5kZXhNYXAsIEluKSB7XHJcbiAgICBsZXQgdHJhbnNmb3JtUHJvcDtcclxuICAgIGlmICh0aGF0ID09PSB0cnVlKVxyXG4gICAgICAgIHRoYXQgPSBuZXcgVHJhbnNmb3JtUHJvcCgpO1xyXG4gICAgZm9yIChsZXQga2V5IGluIGNzcykge1xyXG4gICAgICAgIGxldCBzID0gZm9ybWF0U3R5bGUoa2V5LCBjc3Nba2V5XSwgdGhhdCwgcGFyc2VJbmRleE1hcFtrZXldLCBJbik7XHJcbiAgICAgICAgaWYgKCEocyBpbnN0YW5jZW9mIFRyYW5zZm9ybVByb3ApKVxyXG4gICAgICAgICAgICBjc3Nba2V5XSA9IHM7XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBjc3Nba2V5XTtcclxuICAgICAgICAgICAgdHJhbnNmb3JtUHJvcCA9IHM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKHRyYW5zZm9ybVByb3ApXHJcbiAgICAgICAgY3NzLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVByb3AudG9TdHJpbmcoKTtcclxuICAgIHJldHVybiB0cmFuc2Zvcm1Qcm9wO1xyXG59XHJcbmZ1bmN0aW9uIGZvcm1hdEFuaW1hdGlvbkNzcyhjc3MsIHRoYXQsIHBhcnNlSW5kZXhNYXApIHtcclxuICAgIGlmIChcIm9mZnNldFwiIGluIGNzcykge1xyXG4gICAgICAgIGxldCB7IG9mZnNldCB9ID0gY3NzO1xyXG4gICAgICAgIGRlbGV0ZSBjc3Mub2Zmc2V0O1xyXG4gICAgICAgIGxldCBlbmQgPSBmb3JtYXRDc3MoY3NzLCB0aGF0LCBwYXJzZUluZGV4TWFwKTtcclxuICAgICAgICBjc3Mub2Zmc2V0ID0gb2Zmc2V0O1xyXG4gICAgICAgIHJldHVybiBlbmQ7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICAgICAgcmV0dXJuIGZvcm1hdENzcyhjc3MsIHRoYXQsIHBhcnNlSW5kZXhNYXApO1xyXG59XHJcbmZ1bmN0aW9uIHNwbGl0VHJhbnNmb3JtUHJvcHNJbnRvS2V5VmFsKHZhbCkge1xyXG4gICAgdmFsID0gdmFsLnJlcGxhY2UoLyggfFxcdCkvZywgXCJcIik7XHJcbiAgICBsZXQgYXIgPSB2YWwuc3BsaXQoXCIpXCIpO1xyXG4gICAgLy9AdHMtaWdub3JlXHJcbiAgICBhci5ybUkoYXIubGVuZ3RoIC0gMSk7XHJcbiAgICBsZXQgZW5kID0gW107XHJcbiAgICBhci5mb3JFYWNoKChlKSA9PiB7XHJcbiAgICAgICAgbGV0IGwgPSBlLnNwbGl0KFwiKFwiKTtcclxuICAgICAgICBlbmQucHVzaCh7IGtleTogbFswXSwgdmFsOiBsWzFdIH0pO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gZW5kO1xyXG59XHJcbmNvbnN0IHNwbGl0VmFsdWVGcm9tVW5pdCA9ICgoKSA9PiB7XHJcbiAgICBsZXQgdmFsO1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIHNwbGl0VmFsdWVGcm9tVW5pdCh2YWx1ZSkge1xyXG4gICAgICAgIHZhbCA9IHZhbHVlO1xyXG4gICAgICAgIGxldCBtYXggPSB2YWwubGVuZ3RoIC0gMTtcclxuICAgICAgICBsZXQgZWRnZSA9IG1heCAtIDI7XHJcbiAgICAgICAgaWYgKCFpc0VkZ2UoZWRnZSkpIHtcclxuICAgICAgICAgICAgZWRnZSA9IG1heCAtIDM7XHJcbiAgICAgICAgICAgIGlmICghaXNFZGdlKGVkZ2UpKSB7XHJcbiAgICAgICAgICAgICAgICBlZGdlID0gbWF4IC0gMTtcclxuICAgICAgICAgICAgICAgIGlmICghaXNFZGdlKGVkZ2UpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWRnZSA9IG1heDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzRWRnZShlZGdlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlZGdlID0gbWF4IC0gNDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGVkZ2UgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzRWRnZShlZGdlKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVkZ2UtLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWRnZSA9PT0gLTEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyB2YWw6IE5hTiwgdW5pdDogdmFsdWUgfTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWRnZSsrO1xyXG4gICAgICAgIHJldHVybiB7IHZhbDogK3ZhbC5zdWJzdHIoMCwgZWRnZSksIHVuaXQ6IHZhbC5zdWJzdHIoZWRnZSkgfTtcclxuICAgIH07XHJcbiAgICBmdW5jdGlvbiBpc0VkZ2UoYXQpIHtcclxuICAgICAgICByZXR1cm4gIWlzTmFOKCt2YWxbYXRdKSAmJiBpc05hTigrdmFsW2F0ICsgMV0pO1xyXG4gICAgfVxyXG59KSgpO1xyXG5jbGFzcyBUcmFuc2Zvcm1Qcm9wIHtcclxuICAgIGNvbnN0cnVjdG9yKHRyYW5zZm9ybV9jbG9uZSkge1xyXG4gICAgICAgIHRoaXMucHJpbWl0aXZlcyA9IHt9O1xyXG4gICAgICAgIHRoaXMuY2hhbmdlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc3RvcmUgPSBcIm5vbmVcIjtcclxuICAgICAgICBpZiAodHJhbnNmb3JtX2Nsb25lKSB7XHJcbiAgICAgICAgICAgIGlmICh0cmFuc2Zvcm1fY2xvbmUgaW5zdGFuY2VvZiBUcmFuc2Zvcm1Qcm9wKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrIGluIHRyYW5zZm9ybV9jbG9uZS5wcmltaXRpdmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmltaXRpdmVzW2tdID0gdHJhbnNmb3JtX2Nsb25lLnByaW1pdGl2ZXNba107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZWQgPSB0cmFuc2Zvcm1fY2xvbmUuY2hhbmdlZDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcmUgPSB0cmFuc2Zvcm1fY2xvbmUuc3RvcmU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1fY2xvbmU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc2V0IHRyYW5zbGF0ZSh0bykge1xyXG4gICAgICAgIGlmICghKHRvIGluc3RhbmNlb2YgQXJyYXkpKVxyXG4gICAgICAgICAgICB0byA9IHRvLnNwbGl0KFwiLFwiKTtcclxuICAgICAgICB0aGlzLmFsbG9jYXRlKHRvLCBbXCJ0cmFuc2xhdGVYXCIsIFwidHJhbnNsYXRlWVwiLCBcInRyYW5zbGF0ZVpcIl0pO1xyXG4gICAgfVxyXG4gICAgLy8gVE9ETyBtYXliZSBzcGxpdCB0aGlzIHVwIGFuZCByZXR1cm4gYSBudW1iZXJbXSBvZiB0aGUgdHJhbnNsYXRlczsgdGhpcyB3b3VsZCBoYXZlIHRvIGJlIGNvbnNpdGVudGx5IGltcGxlbWVudGVkIHRocm91Z2ggYWxsIGNzcyAobGlrZSBtYXJnaW4gb3IgcGFkZGluZylcclxuICAgIGdldCB0cmFuc2xhdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tYmluZVZhbHMoXCJ0cmFuc2xhdGVYXCIsIFwidHJhbnNsYXRlWVwiLCBcInRyYW5zbGF0ZVpcIik7XHJcbiAgICB9XHJcbiAgICBzZXQgc2NhbGUodG8pIHtcclxuICAgICAgICBpZiAoISh0byBpbnN0YW5jZW9mIEFycmF5KSlcclxuICAgICAgICAgICAgdG8gPSB0by5zcGxpdChcIixcIik7XHJcbiAgICAgICAgaWYgKHRvWzBdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgaWYgKHRvWzFdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0b1syXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FsZVggPSB0b1swXTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYWxlWSA9IHRvWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhbGVaID0gdG9bMl07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYWxlWCA9IHRvWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhbGVZID0gdG9bMV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjYWxlWCA9IHRvWzBdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2FsZVkgPSB0b1swXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NhbGVaID0gdG9bMF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXQgc2NhbGUoKSB7XHJcbiAgICAgICAgbGV0IHNjYWxlWCA9IHRoaXMuc2NhbGVYO1xyXG4gICAgICAgIGxldCBzY2FsZVkgPSB0aGlzLnNjYWxlWTtcclxuICAgICAgICBsZXQgc2NhbGVaID0gdGhpcy5zY2FsZVo7XHJcbiAgICAgICAgaWYgKHNjYWxlWCA9PT0gc2NhbGVZICYmIHNjYWxlWSA9PT0gc2NhbGVaKVxyXG4gICAgICAgICAgICByZXR1cm4gc2NhbGVYO1xyXG4gICAgICAgIHJldHVybiBbc2NhbGVYLCBzY2FsZVksIHNjYWxlWl07XHJcbiAgICB9XHJcbiAgICBzZXQgc2tldyh0bykge1xyXG4gICAgICAgIGlmICghKHRvIGluc3RhbmNlb2YgQXJyYXkpKVxyXG4gICAgICAgICAgICB0byA9IHRvLnNwbGl0KFwiLFwiKTtcclxuICAgICAgICB0aGlzLmFsbG9jYXRlKHRvLCBbXCJza2V3WFwiLCBcInNrZXdZXCJdKTtcclxuICAgIH1cclxuICAgIGdldCBza2V3KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbWJpbmVWYWxzKFwic2tld1hcIiwgXCJza2V3WVwiKTtcclxuICAgIH1cclxuICAgIHNldCBtYXRyaXgodG8pIHtcclxuICAgICAgICBpZiAodG8gaW5zdGFuY2VvZiBBcnJheSlcclxuICAgICAgICAgICAgdG8gPSB0by5qb2luKFwiLFwiKTtcclxuICAgICAgICB0aGlzLmRlY29tcG9zZU1hdHJpeChcIm1hdHJpeChcIiArIHRvICsgXCIpXCIpO1xyXG4gICAgfVxyXG4gICAgc2V0IG1hdHJpeDNkKHRvKSB7XHJcbiAgICAgICAgaWYgKHRvIGluc3RhbmNlb2YgQXJyYXkpXHJcbiAgICAgICAgICAgIHRvID0gdG8uam9pbihcIixcIik7XHJcbiAgICAgICAgdGhpcy5kZWNvbXBvc2VNYXRyaXgoXCJtYXRyaXgzZChcIiArIHRvICsgXCIpXCIpO1xyXG4gICAgfVxyXG4gICAgc2V0IHRyYW5zZm9ybSh0bykge1xyXG4gICAgICAgIGlmICh0byA9PT0gdW5kZWZpbmVkIHx8IHRvID09PSBcIm5vbmVcIiB8fCB0byA9PT0gXCJcIilcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGxldCBhciA9IHNwbGl0VHJhbnNmb3JtUHJvcHNJbnRvS2V5VmFsKHRvKTtcclxuICAgICAgICBsZXQgb3JkZXJlZCA9IHt9O1xyXG4gICAgICAgIGFyLmVhKChlKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB0ID0gb3JkZXJlZFtlLmtleV0gPT09IHVuZGVmaW5lZCA/IG9yZGVyZWRbZS5rZXldID0gW10gOiBvcmRlcmVkW2Uua2V5XTtcclxuICAgICAgICAgICAgdC5hZGQoZS52YWwpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGZvciAobGV0IGsgaW4gb3JkZXJlZCkge1xyXG4gICAgICAgICAgICBpZiAoVHJhbnNmb3JtUHJvcC51bWJyZWxsYVRyYW5zZm9ybVByb3BzLmluY2x1ZGVzKGspKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlY29tcG9zZU1hdHJpeCh0byk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgayBpbiBvcmRlcmVkKSB7XHJcbiAgICAgICAgICAgIGxldCB0ID0gb3JkZXJlZFtrXTtcclxuICAgICAgICAgICAgaWYgKHQubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzW2tdID0gdC5maXJzdDtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICghKHQgaW5zdGFuY2VvZiBBcnJheSkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBzcGxpdCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgdC5lYSgoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNwbGl0LmFkZChzcGxpdFZhbHVlRnJvbVVuaXQoZS52YWwpKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IHVuaXQgPSBzcGxpdC5maXJzdC51bml0O1xyXG4gICAgICAgICAgICAgICAgbGV0IGNhbkNvbXBvc2UgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzcGxpdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzcGxpdFtpXS51bml0ICE9PSB1bml0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYW5Db21wb3NlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoY2FuQ29tcG9zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB2YWwgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHNwbGl0LmVhKChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbCArPSBlLnZhbDtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzW2tdID0gdmFsICsgdW5pdDtcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgb3JkZXJlZFtrXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcmVzdCA9IFwiXCI7XHJcbiAgICAgICAgZm9yIChsZXQgayBpbiBvcmRlcmVkKSB7XHJcbiAgICAgICAgICAgIHJlc3QgKz0gayArIFwiKFwiICsgb3JkZXJlZFtrXSArIFwiKSBcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5kZWNvbXBvc2VNYXRyaXgocmVzdCk7XHJcbiAgICB9XHJcbiAgICBnZXQgdHJhbnNmb3JtKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcbiAgICBkZWNvbXBvc2VNYXRyaXgodG8pIHtcclxuICAgICAgICBsZXQgZGVjID0gZGVjb21wb3NlTWF0cml4KG5ldyBET01NYXRyaXgodG8pKTtcclxuICAgICAgICBsZXQgc2tldyA9IGRlYy5za2V3WFk7XHJcbiAgICAgICAgZGVsZXRlIGRlYy5za2V3WFk7XHJcbiAgICAgICAgZGVsZXRlIGRlYy5za2V3WFo7XHJcbiAgICAgICAgZGVsZXRlIGRlYy5za2V3WVo7XHJcbiAgICAgICAgZm9yIChsZXQgZCBpbiBkZWMpIHtcclxuICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgIGlmIChkZWNbZF0gIT09IFRyYW5zZm9ybVByb3AucHJpbWl0aXZlRGVmYXVsdHNbZF0pXHJcbiAgICAgICAgICAgICAgICB0aGlzW2RdID0gZm9ybWF0U3R5bGUoZCwgZGVjW2RdLCBmYWxzZSwgXCJzdHlsZVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHNrZXcgIT09IFRyYW5zZm9ybVByb3AucHJpbWl0aXZlRGVmYXVsdHMuc2tld1gpXHJcbiAgICAgICAgICAgIHRoaXMuc2tld1ggPSBmb3JtYXRTdHlsZShcInNrZXdYXCIsIHNrZXcsIGZhbHNlLCBcInN0eWxlXCIpO1xyXG4gICAgfVxyXG4gICAgY29tYmluZVZhbHMoLi4udmFscykge1xyXG4gICAgICAgIGxldCBzID0gXCJcIjtcclxuICAgICAgICB2YWxzLmVhKCh2YWwpID0+IHtcclxuICAgICAgICAgICAgbGV0IGUgPSB0aGlzW3ZhbF07XHJcbiAgICAgICAgICAgIHMgKz0gZSArIFwiLCBcIjtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gcy5zdWJzdHIoMCwgcy5sZW5ndGggLSAyKTtcclxuICAgIH1cclxuICAgIGFsbG9jYXRlKGlucHV0LCBmdW5jcykge1xyXG4gICAgICAgIGZ1bmNzLmVhKChmdW5jLCBpKSA9PiB7XHJcbiAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICBpZiAoaW5wdXRbaV0gIT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgIHRoaXNbZnVuY10gPSBpbnB1dFtpXTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHRvU3RyaW5nKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmNoYW5nZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcmUgPSBcIlwiO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBwcm9wIG9mIFRyYW5zZm9ybVByb3AucHJpbWl0aXZlVHJhbnNmb3JtUHJvcHMpIHtcclxuICAgICAgICAgICAgICAgIC8vIFRoaXMgTVVTVCBmb3JtYXRlZCBpbiB0aGUgZm9sbG93aW5nIG9yZGVyIHRvIGFjaGl2ZSBjb25zaXRlbnQgcmVzdWx0cyBbdHJhbnNsYXRlIHJvdGF0ZSBza2V3IHNjYWxlXVxyXG4gICAgICAgICAgICAgICAgaWYgKHByb3AgaW4gdGhpcy5wcmltaXRpdmVzKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnByaW1pdGl2ZXNbcHJvcF0gIT09IFRyYW5zZm9ybVByb3AucHJpbWl0aXZlRGVmYXVsdHNXaXRoVW5pdHNbcHJvcF0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcmUgKz0gcHJvcCArIFRyYW5zZm9ybVByb3AuY2xhbXBPcGVuICsgdGhpcy5wcmltaXRpdmVzW3Byb3BdICsgVHJhbnNmb3JtUHJvcC5jbGFtcENsb3NlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcmUgPSB0aGlzLnN0b3JlIHx8IFwibm9uZSBcIjtcclxuICAgICAgICAgICAgdGhpcy5zdG9yZSA9IHRoaXMuc3RvcmUuc3Vic3RyKDAsIHRoaXMuc3RvcmUubGVuZ3RoIC0gMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLnN0b3JlO1xyXG4gICAgfVxyXG59XHJcblRyYW5zZm9ybVByb3AucHJpbWl0aXZlRGVmYXVsdHMgPSB7XHJcbiAgICB0cmFuc2xhdGVYOiAwLFxyXG4gICAgdHJhbnNsYXRlWTogMCxcclxuICAgIHRyYW5zbGF0ZVo6IDAsXHJcbiAgICByb3RhdGVYOiAwLFxyXG4gICAgcm90YXRlWTogMCxcclxuICAgIHJvdGF0ZVo6IDAsXHJcbiAgICBza2V3WDogMCxcclxuICAgIHNrZXdZOiAwLFxyXG4gICAgc2NhbGVYOiAxLFxyXG4gICAgc2NhbGVZOiAxLFxyXG4gICAgc2NhbGVaOiAxXHJcbn07XHJcbi8vQHRzLWlnbm9yZVxyXG5UcmFuc2Zvcm1Qcm9wLnByaW1pdGl2ZURlZmF1bHRzV2l0aFVuaXRzID0ge307XHJcblRyYW5zZm9ybVByb3AucHJpbWl0aXZlVHJhbnNmb3JtUHJvcHMgPSBPYmplY3Qua2V5cyhUcmFuc2Zvcm1Qcm9wLnByaW1pdGl2ZURlZmF1bHRzKTtcclxuVHJhbnNmb3JtUHJvcC51bWJyZWxsYVRyYW5zZm9ybVByb3BzID0gW1xyXG4gICAgXCJyb3RhdGVcIiwgXCJyb3RhdGUzZFwiLCBcInNjYWxlXCIsIFwic2NhbGUzZFwiLCBcInRyYW5zbGF0ZVwiLCBcInRyYW5zbGF0ZTNkXCIsIFwic2tld1wiLCBcIm1hdHJpeFwiLCBcIm1hdHJpeDNkXCJcclxuXTtcclxuVHJhbnNmb3JtUHJvcC50cmFuc2Zvcm1Qcm9wcyA9IFsuLi5UcmFuc2Zvcm1Qcm9wLnByaW1pdGl2ZVRyYW5zZm9ybVByb3BzLCAuLi5UcmFuc2Zvcm1Qcm9wLnVtYnJlbGxhVHJhbnNmb3JtUHJvcHNdO1xyXG5UcmFuc2Zvcm1Qcm9wLmFwcGxpZXMgPSAoLi4ucHJvcCkgPT4ge1xyXG4gICAgcmV0dXJuIFRyYW5zZm9ybVByb3AudHJhbnNmb3JtUHJvcHMuY29udGFpbnMoLi4ucHJvcCk7XHJcbn07XHJcblRyYW5zZm9ybVByb3AuY2xhbXBPcGVuID0gXCIoXCI7XHJcblRyYW5zZm9ybVByb3AuY2xhbXBDbG9zZSA9IFwiKSBcIjtcclxuZm9yIChsZXQgayBpbiBUcmFuc2Zvcm1Qcm9wLnByaW1pdGl2ZURlZmF1bHRzKSB7XHJcbiAgICBUcmFuc2Zvcm1Qcm9wLnByaW1pdGl2ZURlZmF1bHRzV2l0aFVuaXRzW2tdID0gcG9zdEZpeFN0eWxlKGssIFRyYW5zZm9ybVByb3AucHJpbWl0aXZlRGVmYXVsdHNba10sIFwic3R5bGVcIik7XHJcbn1cclxuVHJhbnNmb3JtUHJvcC5wcmltaXRpdmVUcmFuc2Zvcm1Qcm9wcy5lYSgocHJvcCkgPT4ge1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRyYW5zZm9ybVByb3AucHJvdG90eXBlLCBwcm9wLCB7XHJcbiAgICAgICAgZ2V0KCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcmltaXRpdmVzW3Byb3BdIHx8IFRyYW5zZm9ybVByb3AucHJpbWl0aXZlRGVmYXVsdHNbcHJvcF0gKyBwYXJzZUluLnN0eWxlW3Byb3BdO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0KHN0eWxlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMucHJpbWl0aXZlc1twcm9wXSA9IHN0eWxlO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59KTtcclxuYWUoXCJjc3NcIiwgZnVuY3Rpb24gKGtleV9jc3MsIHZhbCkge1xyXG4gICAgaWYgKHR5cGVvZiBrZXlfY3NzID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgbGV0IGNzcyA9IGNsb25lKGtleV9jc3MpO1xyXG4gICAgICAgIGZvcm1hdENzcyhjc3MsIHRoaXMsIHN0eWxlUHJvcGVydHlBdHRyaWJ1dGVPZktleWZyYW1lKHRoaXMsIE9iamVjdC5rZXlzKGNzcykpKTtcclxuICAgICAgICBmb3IgKGxldCBwcm9wIGluIGNzcykge1xyXG4gICAgICAgICAgICB0aGlzLnN0eWxlW3Byb3BdID0gY3NzW3Byb3BdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHZhbCAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiB2YWwgIT09IFwiYm9vbGVhblwiKSB7XHJcbiAgICAgICAgbGV0IHMgPSBmb3JtYXRTdHlsZShrZXlfY3NzLCB2YWwsIHRoaXMsIHN0eWxlUHJvcGVydHlBdHRyaWJ1dGUodGhpcywga2V5X2NzcykpO1xyXG4gICAgICAgIGlmICghKHMgaW5zdGFuY2VvZiBUcmFuc2Zvcm1Qcm9wKSlcclxuICAgICAgICAgICAgdGhpcy5zdHlsZVtrZXlfY3NzXSA9IHM7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLnN0eWxlLnRyYW5zZm9ybSA9IHMudG9TdHJpbmcoKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGxldCBzO1xyXG4gICAgICAgIGlmIChUcmFuc2Zvcm1Qcm9wLmFwcGxpZXMoa2V5X2NzcykpIHtcclxuICAgICAgICAgICAgaWYgKGVsZW1zV2l0aG91dENvbnNpdGVudFRyYW5zZm9ybVByb3BzLmluY2x1ZGVzKHsgZWxlbTogdGhpcyB9KSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHQgPSBuZXcgVHJhbnNmb3JtUHJvcCgpO1xyXG4gICAgICAgICAgICAgICAgdC50cmFuc2Zvcm0gPSBnZXRDb21wdXRlZFN0eWxlKHRoaXMpLnRyYW5zZm9ybTtcclxuICAgICAgICAgICAgICAgIHMgPSB0W2tleV9jc3NdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHMgPSBnZXRUcmFuc2Zvcm1Qcm9wcyh0aGlzKVtrZXlfY3NzXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHMgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzKVtrZXlfY3NzXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHMgPT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgdGhyb3cgXCJVbmtub3duIGtleSBcXFwiXCIgKyBrZXlfY3NzICsgXCJcXFwiLlwiO1xyXG4gICAgICAgIGlmICh2YWwgfHwgcy5zcGxpdChcIiBcIikubGVuZ3RoID4gMSlcclxuICAgICAgICAgICAgcmV0dXJuIHM7XHJcbiAgICAgICAgbGV0IG4gPSBwYXJzZUZsb2F0KHMpO1xyXG4gICAgICAgIGlmIChpc05hTihuKSlcclxuICAgICAgICAgICAgcmV0dXJuIHM7XHJcbiAgICAgICAgcmV0dXJuIG47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcztcclxufSk7XHJcbmZ1bmN0aW9uIGN1cnJlbnRGcmFtZShrZXlzLCB0aGF0LCBwYXJzZUluZGV4TWFwLCB0cmFuc1Byb3ApIHtcclxuICAgIGxldCByZXQgPSB7fTtcclxuICAgIGZvciAobGV0IGtleSBvZiBrZXlzKSB7XHJcbiAgICAgICAgaWYgKHBhcnNlSW5kZXhNYXBba2V5XSA9PT0gXCJzdHlsZVwiKVxyXG4gICAgICAgICAgICByZXRba2V5XSA9IHRoYXQuY3NzKGtleSk7XHJcbiAgICAgICAgZWxzZSBpZiAocGFyc2VJbmRleE1hcFtrZXldID09PSBcImF0dHJcIilcclxuICAgICAgICAgICAgcmV0W2tleV0gPSB0aGF0LmdldEF0dHJpYnV0ZShrZXkpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcmV0W2tleV0gPSB0aGlzW2tleV07XHJcbiAgICB9XHJcbiAgICBmb3JtYXRDc3MocmV0LCB0cmFuc1Byb3AsIHBhcnNlSW5kZXhNYXApO1xyXG4gICAgcmV0Lm9mZnNldCA9IDA7XHJcbiAgICByZXR1cm4gcmV0O1xyXG59XHJcbmxldCBkZXRlY3RJZkluVHJhbnNpdGlvblByb3BlcnR5ID0gKCgpID0+IHtcclxuICAgIGZ1bmN0aW9uIHdvYW4oa2V5LCB0aGF0KSB7XHJcbiAgICAgICAgbGV0IHMgPSBcIlRoZSB0cmFuc2l0aW9uIHByb3BlcnRcIjtcclxuICAgICAgICBpZiAoa2V5IGluc3RhbmNlb2YgQXJyYXkpXHJcbiAgICAgICAgICAgIHMgKz0gXCJpZXMgXFxcIlwiO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcyArPSBcInkgXFxcIlwiO1xyXG4gICAgICAgIHMgKz0ga2V5LnRvU3RyaW5nKCkgKyBcIlxcXCIgaXMgbm90IGVtcHR5IGZvciB0aGUgZm9sbG93aW5nIGVsZW1lbnQuIEl0IGlzIHJlY29tbWVuZGVkIHRvIG5vdCB1c2UgY3NzIGFuaWFtdGlvbnMgYW5kIHRoaXMgZnJhbWV3b3JrIGZvciB0aGUgc2FtZSBwcm9wZXJ0aWVzLlxcblxcbkluIG9yZGVyIHRvIHByZXZlbnQgYW4gYW5pYW10aW9uIGZyb20gdHJpZ2dlcmluZyB0d2ljZSBpbiBhIHJvdyB0aGUgcmVzdWx0IG9mIHRoaXMgb25lIHdpbGwgbm90IGRpc3BsYXkgaXRzIHJlc3VsdCBpbiB0aGUgZG9tIGV4cGxvcmVyLlxcblxcblwiO1xyXG4gICAgICAgIGNvbnNvbGUud2FybihzLCB0aGF0KTtcclxuICAgIH1cclxuICAgIHJldHVybiBmdW5jdGlvbiAoY3NzS2V5cywgdHJhbnNpdGlvblByb3BlcnR5cywgdHJhbnNpdGlvbkR1cmF0aW9uLCB0aGF0KSB7XHJcbiAgICAgICAgbGV0IHdhcm4gPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBrZXkgb2YgY3NzS2V5cykge1xyXG4gICAgICAgICAgICBpZiAodHJhbnNpdGlvbkR1cmF0aW9uICE9PSAwICYmICh0cmFuc2l0aW9uUHJvcGVydHlzLmluY2x1ZGVzKGtleSkgfHwgdHJhbnNpdGlvblByb3BlcnR5cyA9PT0gXCJhbGxcIikpIHtcclxuICAgICAgICAgICAgICAgIHdhcm4uYWRkKGtleSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGxlbmd0aCA9IHdhcm4ubGVuZ3RoO1xyXG4gICAgICAgIGlmIChsZW5ndGggIT09IDApXHJcbiAgICAgICAgICAgIGlmIChsZW5ndGggPT09IDEpXHJcbiAgICAgICAgICAgICAgICB3b2FuKHdhcm5bMF0sIHRoYXQpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB3b2FuKHdhcm4sIHRoYXQpO1xyXG4gICAgICAgIHJldHVybiB3YXJuO1xyXG4gICAgfTtcclxufSkoKTtcclxuZnVuY3Rpb24gZXZhbHVhdGVBbGxLZXlzKGZyYW1lcykge1xyXG4gICAgbGV0IGFsbEtleXMgPSBPYmplY3Qua2V5cyhmcmFtZXMuZmlyc3QpO1xyXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBmcmFtZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKGZyYW1lc1tpXSk7XHJcbiAgICAgICAgZm9yIChsZXQgZSBvZiBrZXlzKSB7XHJcbiAgICAgICAgICAgIGlmICghYWxsS2V5cy5pbmNsdWRlcyhlKSlcclxuICAgICAgICAgICAgICAgIGFsbEtleXMuYWRkKGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChhbGxLZXlzLmluY2x1ZGVzKFwib2Zmc2V0XCIpKVxyXG4gICAgICAgIGFsbEtleXMucm0oXCJvZmZzZXRcIik7XHJcbiAgICByZXR1cm4gYWxsS2V5cztcclxufVxyXG5jbGFzcyBFbGVtc1dpdGhvdXRDb25zaXRlbnRUcmFuc2Zvcm1Qcm9wcyB7XHJcbiAgICBjb25zdHJ1Y3RvciguLi5lbGVtcykge1xyXG4gICAgICAgIHRoaXMuc3RvcmUgPSBbXTtcclxuICAgICAgICB0aGlzLmFkZCguLi5lbGVtcyk7XHJcbiAgICB9XHJcbiAgICBhZGQoLi4uZWxlbXMpIHtcclxuICAgICAgICBlbGVtcy5lYSgoZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuaW5jbHVkZXMoZSkpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3JlLmFkZChlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJtKC4uLmVsZW1zKSB7XHJcbiAgICAgICAgbGV0IGluZGljZXMgPSBbXTtcclxuICAgICAgICBlbGVtcy5lYSgoZSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgaGFzTm9JZGVudGlmaWVyID0gZS5pZGVudGlmaWVyID09PSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcmUuZWEoKHMsIGkpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlID09PSBzIHx8IChzLmVsZW0gPT09IGUuZWxlbSAmJiAoaGFzTm9JZGVudGlmaWVyIHx8IHMuaWRlbnRpZmllciA9PT0gZS5pZGVudGlmaWVyKSkpXHJcbiAgICAgICAgICAgICAgICAgICAgaW5kaWNlcy5hZGQoaSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc3RvcmUucm1JKC4uLmluZGljZXMpO1xyXG4gICAgfVxyXG4gICAgaW5jbHVkZXMoLi4uZWxlbXMpIHtcclxuICAgICAgICBpZiAoZWxlbXMuZWEoKGUpID0+IHtcclxuICAgICAgICAgICAgbGV0IGhhc05vSWRlbnRpZmllciA9IGUuaWRlbnRpZmllciA9PT0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zdG9yZS5lYSgocykgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGUgPT09IHMgfHwgKHMuZWxlbSA9PT0gZS5lbGVtICYmIChoYXNOb0lkZW50aWZpZXIgfHwgcy5pZGVudGlmaWVyID09PSBlLmlkZW50aWZpZXIpKSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9KSlcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59XHJcbmxldCBlYXNlSW5PdXQgPSBuZXcgRWFzaW5nKFwiZWFzZUluT3V0XCIpO1xyXG4vLyBsZXQgZWFzZSA9IG5ldyBFYXNpbmcoXCJlYXNlXCIpXHJcbmxldCBlYXNlSW5PdXRGdW5jID0gZWFzZUluT3V0LmZ1bmN0aW9uO1xyXG4vLyBsZXQgZWFzZUluT3V0U3RyaW5nID0gZWFzZUluT3V0LnN0cmluZ1xyXG4vLyBsZXQgZWFzZUZ1bmMgPSBlYXNlLmZ1bmN0aW9uXHJcbi8vIGxldCBlYXNlU3RyaW5nID0gZWFzZS5zdHJpbmdcclxubGV0IG1heEFuaW1hdGlvblByb2dyZXNzID0gLjk5OTk5OTk7XHJcbmxldCBtaW5BbmltYXRpb25Qcm9ncmVzcyA9IDAuMDAwMDAwMTtcclxubGV0IG5hbWVTcGFjZUluZGV4ID0gbmV3IE1hcCgpO1xyXG5sZXQgZWxlbXNXaXRob3V0Q29uc2l0ZW50VHJhbnNmb3JtUHJvcHMgPSBuZXcgRWxlbXNXaXRob3V0Q29uc2l0ZW50VHJhbnNmb3JtUHJvcHMoKTtcclxuY29uc3QgbWF4UHJvZ3Jlc3NJbk9uZVN0ZXAgPSAxIC8gMztcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4xIC8gMTYuNjY2NjY2NjY2NjY2NjY2N1xyXG5jb25zdCBtYXhQcm9ncmVzc0luT25lU3RlcFdpdGhvdXREZWx0YSA9IC4wMDY7XHJcbmxldCBmcmFtZURlbHRhID0gMTYuNjY2NjY2NjY2NjY2NjY2NztcclxubGV0IGxhc3RGcmFtZVRpbWVTdGFtcCA9IDA7XHJcbmxldCBsb29wID0gKGZyYW1lVGltZVN0YW1wKSA9PiB7XHJcbiAgICBmcmFtZURlbHRhID0gZnJhbWVUaW1lU3RhbXAgLSBsYXN0RnJhbWVUaW1lU3RhbXA7XHJcbiAgICBsYXN0RnJhbWVUaW1lU3RhbXAgPSBmcmFtZVRpbWVTdGFtcDtcclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcclxuICAgIC8vIGxvZyhmcmFtZURlbHRhKVxyXG59O1xyXG5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7XHJcbi8vIFRPRE86IERvIEkgcmVhbGx5IGhhdmUgdG8gYWx3YXlzIGNhbGN1bGF0ZSBpbml0YWxmcmFtZSBpbW1lZGlhdGx5IG9yIGNhbiBJIGNoZWNrIGlmIHRoZSBhbmltIGlzIFxyXG4vLyBndWlkZWQgJiBzdGFydHMgaWYgdGhlIGN1cnJlbnQgcHJvZ3Jlc3MgaW4gdGhlIG1pZGRsZSBvZiB0aGUgYW5pbWF0aW9uLiBPdGhlcndheXMgb24gc3RhcnQgb3IgZW5kXHJcbi8vIGl0IHdpbGwgYmUgY2FsY3VsYXRlZCBhbnl3YXlcclxuLy8gVE9ETzogbWF5YmUgSFRNTCBhdHRyYnMgYW5pbVxyXG4vLyBTbyB0aGF0IHlvdSBjb3VsZCBhbmltYXRlIGlubmVySFRNTCBlLmcuXHJcbi8vIG1heWJlIGZhZGUgYW91dCBmb250LWNvbG9yIGFuZCB0aGVuIGJhY2suLi4gb3IganVzdCBzZXQgaXRcclxuLy8gVE9ETzogYWRkIHggYXMgc2hvcnRoYW5kIGZvciB0cmFuc2xhdGUgWCB1c3cuXHJcbi8vIFRPRE86IGluc3RlYWQgb2Ygb3B0aW9ucyBqdXN0IHRoZSBkdXJhdGlvbiBjYW4gYmUgZ2l2ZW4gYXMgd2VsbC4gc28gZWxlbS5hbmltKHsuLi59LCAzMDApXHJcbi8vIFRPRE86IG1ha2Ugd2FybmluZyBpZiBhbmltYXRpb24gdG8gb3IgZnJvbSBhdXRvLiBCYXNlZCBvbiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9DU1MvQ1NTX1RyYW5zaXRpb25zL1VzaW5nX0NTU190cmFuc2l0aW9ucyNXaGljaF9DU1NfcHJvcGVydGllc19jYW5fYmVfdHJhbnNpdGlvbmVkXHJcbmxldCB0cmFuc2Zvcm1TdHJpbmcgPSBcInRyYW5zZm9ybVwiO1xyXG5jbGFzcyBBbmltUHJvcEFzc296aWF0aW9uIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMubHMgPSBbXTtcclxuICAgIH1cclxuICAgIGNoZWNrKHByb3BzKSB7XHJcbiAgICAgICAgbGV0IGhhc1RyYW5zZm9ybSA9IFRyYW5zZm9ybVByb3AuYXBwbGllcyguLi5wcm9wcyk7XHJcbiAgICAgICAgbGV0IHRvQmVSbSA9IFtdO1xyXG4gICAgICAgIHRoaXMubHMuZWEoKGUsIGkpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFlLnByb3BzLmV4Y2x1ZGVzKC4uLnByb3BzKSB8fCAoaGFzVHJhbnNmb3JtICYmIGUucHJvcHMuaW5jbHVkZXModHJhbnNmb3JtU3RyaW5nKSkpIHtcclxuICAgICAgICAgICAgICAgIGUub25DYW5jZWwoKTtcclxuICAgICAgICAgICAgICAgIHRvQmVSbS5hZGQoaSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmxzLnJtSSguLi50b0JlUm0pO1xyXG4gICAgfVxyXG4gICAgYWRkKGFzc296aWF0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5scy5hZGQoYXNzb3ppYXRpb24pO1xyXG4gICAgfVxyXG59XHJcbmNvbnN0IGN1cnJlbnRBbmltYXRpb25Qcm9wc0luZGV4ID0gbmV3IE1hcCgpO1xyXG5jb25zdCBnZXRBbmltUHJvcHMgPSBidWlsZEdldEluZGV4KGN1cnJlbnRBbmltYXRpb25Qcm9wc0luZGV4LCAoKSA9PiBuZXcgQW5pbVByb3BBc3NvemlhdGlvbigpKTtcclxuLy8gVE9ETzogbXVsdGlwbGUgY29uZmlncyBmb3IgZXhhbXBsZSBmb3IgYW5pbSBhdCBOb2RlTHNcclxuYWUoXCJhbmltXCIsIGFzeW5jIGZ1bmN0aW9uIChmcmFtZV9mcmFtZXMsIG9wdGlvbnMgPSB7fSwgZ3VpZGFuY2UpIHtcclxuICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgaWYgKGZyYW1lX2ZyYW1lc1tPYmplY3Qua2V5cyhmcmFtZV9mcmFtZXMpWzBdXSBpbnN0YW5jZW9mIEFycmF5KVxyXG4gICAgICAgIGZyYW1lX2ZyYW1lcyA9IGNvbnZlcnRGcmFtZVN0cnVjdHVyZShmcmFtZV9mcmFtZXMpO1xyXG4gICAgZWxzZVxyXG4gICAgICAgIGZyYW1lX2ZyYW1lcyA9IGNsb25lKGZyYW1lX2ZyYW1lcyk7XHJcbiAgICBsZXQgYXJlRnJhbWVzID0gZnJhbWVfZnJhbWVzIGluc3RhbmNlb2YgQXJyYXk7XHJcbiAgICBsZXQgYW5pbWF0aW9uSXNHdWlkZWQgPSBndWlkYW5jZSAhPT0gdW5kZWZpbmVkO1xyXG4gICAgY29uc3QgdGhpc0Rpc3BsYXkgPSB0aGlzLmNzcyhcImRpc3BsYXlcIik7XHJcbiAgICBpZiAodGhpc0Rpc3BsYXkgPT09IFwiXCIgfHwgdGhpc0Rpc3BsYXkgPT09IFwibm9uZVwiKSB7XHJcbiAgICAgICAgaWYgKCFhbmltYXRpb25Jc0d1aWRlZCkge1xyXG4gICAgICAgICAgICBpZiAoYXJlRnJhbWVzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNzcyhmcmFtZV9mcmFtZXMubGFzdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNzcyhmcmFtZV9mcmFtZXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBsZXQgdGhpc1RyYW5zUHJvcHMgPSBnZXRUcmFuc2Zvcm1Qcm9wcyh0aGlzKTtcclxuICAgIGxldCBlbmRGcmFtZXM7XHJcbiAgICBsZXQgdHJhbnNpdGlvblByb3BlcnR5ID0gdGhpcy5jc3MoXCJ0cmFuc2l0aW9uLXByb3BlcnR5XCIpO1xyXG4gICAgbGV0IHRyYW5zaXRpb25EdXJhdGlvbiA9IHRoaXMuY3NzKFwidHJhbnNpdGlvbi1kdXJhdGlvblwiKTtcclxuICAgIGxldCBuZWVkVG9DYWxjdWxhdGVJbml0YWxGcmFtZSA9IGZhbHNlO1xyXG4gICAgbGV0IGFsbEtleXM7XHJcbiAgICBsZXQgaW5pdEZyYW1lO1xyXG4gICAgbGV0IHBhcnNlSW5kZXhNYXA7XHJcbiAgICBsZXQgdGhpc1RyYW5zUHJvcHNDb3B5ID0gbmV3IFRyYW5zZm9ybVByb3AodGhpc1RyYW5zUHJvcHMpO1xyXG4gICAgaWYgKGFyZUZyYW1lcykge1xyXG4gICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgIGZyYW1lX2ZyYW1lcyA9IGZyYW1lX2ZyYW1lcztcclxuICAgICAgICBhbGxLZXlzID0gZXZhbHVhdGVBbGxLZXlzKGZyYW1lX2ZyYW1lcyk7XHJcbiAgICAgICAgcGFyc2VJbmRleE1hcCA9IHN0eWxlUHJvcGVydHlBdHRyaWJ1dGVPZktleWZyYW1lKHRoaXMsIGFsbEtleXMpO1xyXG4gICAgICAgIG5lZWRUb0NhbGN1bGF0ZUluaXRhbEZyYW1lID0gZnJhbWVfZnJhbWVzLmZpcnN0Lm9mZnNldCAhPT0gMDtcclxuICAgICAgICBpZiAobmVlZFRvQ2FsY3VsYXRlSW5pdGFsRnJhbWUpIHtcclxuICAgICAgICAgICAgaW5pdEZyYW1lID0gY3VycmVudEZyYW1lKGFsbEtleXMsIHRoaXMsIHBhcnNlSW5kZXhNYXAsIHRoaXNUcmFuc1Byb3BzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBhbGxLZXlzID0gT2JqZWN0LmtleXMoZnJhbWVfZnJhbWVzKTtcclxuICAgICAgICBwYXJzZUluZGV4TWFwID0gc3R5bGVQcm9wZXJ0eUF0dHJpYnV0ZU9mS2V5ZnJhbWUodGhpcywgYWxsS2V5cyk7XHJcbiAgICAgICAgaW5pdEZyYW1lID0gY3VycmVudEZyYW1lKGFsbEtleXMsIHRoaXMsIHBhcnNlSW5kZXhNYXAsIHRoaXNUcmFuc1Byb3BzKTtcclxuICAgIH1cclxuICAgIGxldCB0aGlzQW5pbVByb3BzID0gZ2V0QW5pbVByb3BzKHRoaXMpO1xyXG4gICAgdGhpc0FuaW1Qcm9wcy5jaGVjayhhbGxLZXlzKTtcclxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgIG9wdGlvbnMgPSB7IGR1cmF0aW9uOiBvcHRpb25zIH07XHJcbiAgICB9XHJcbiAgICBpZiAobmFtZVNwYWNlSW5kZXguZ2V0KHRoaXMpID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgbmFtZVNwYWNlSW5kZXguc2V0KHRoaXMsIFtdKTtcclxuICAgIGxldCBucyA9IG5hbWVTcGFjZUluZGV4LmdldCh0aGlzKTtcclxuICAgIGlmIChvcHRpb25zLm5hbWUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGxldCBpbmMgPSAxO1xyXG4gICAgICAgIHdoaWxlIChucy5pbmNsdWRlcyhpbmMudG9TdHJpbmcoKSkpIHtcclxuICAgICAgICAgICAgaW5jKys7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBzID0gaW5jLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgb3B0aW9ucy5uYW1lID0gcztcclxuICAgICAgICBucy5hZGQocyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBsZXQgaW5jID0gMjtcclxuICAgICAgICBsZXQgbmFtZTtcclxuICAgICAgICBpZiAoIW5zLmluY2x1ZGVzKG9wdGlvbnMubmFtZSkpXHJcbiAgICAgICAgICAgIG5hbWUgPSBvcHRpb25zLm5hbWU7XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHdoaWxlIChucy5pbmNsdWRlcyhvcHRpb25zLm5hbWUgKyBpbmMpKSB7XHJcbiAgICAgICAgICAgICAgICBpbmMrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBuYW1lID0gb3B0aW9ucy5uYW1lICsgaW5jO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICBvcHRpb25zLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIG5zLmFkZChuYW1lKTtcclxuICAgIH1cclxuICAgIGxldCBwcm9ncmVzc05hbWVTdHJpbmcgPSBcImFuaW1hdGlvbi1cIiArIG9wdGlvbnMubmFtZSArIFwiLXByb2dyZXNzXCI7XHJcbiAgICAvL0B0cy1pZ25vcmVcclxuICAgIGlmIChvcHRpb25zLml0ZXJhdGlvbnMgPT09IHVuZGVmaW5lZClcclxuICAgICAgICBvcHRpb25zLml0ZXJhdGlvbnMgPSAxO1xyXG4gICAgZWxzZSBpZiAob3B0aW9ucy5pdGVyYXRpb25zIDw9IDApXHJcbiAgICAgICAgdGhyb3cgXCJHaXZlbiBvcHRpb24gaXRlcmF0aW9ucyBcIiArIG9wdGlvbnMuaXRlcmF0aW9ucyArIFwiIGNhbm5vdCBiZSBuZWdhdGl2ZS5cIjtcclxuICAgIGlmIChhcmVGcmFtZXMpIHtcclxuICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICBsZXQgZnJhbWVzID0gZnJhbWVfZnJhbWVzO1xyXG4gICAgICAgIGlmIChuZWVkVG9DYWxjdWxhdGVJbml0YWxGcmFtZSkge1xyXG4gICAgICAgICAgICBsZXQgcGxhY2Vob2xkZXIgPSB7fTtcclxuICAgICAgICAgICAgYWxsS2V5cy5lYSgoaykgPT4ge1xyXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXJba10gPSBcIlBMQUNFSE9MREVSXCI7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBwbGFjZWhvbGRlci5vZmZzZXQgPSAwO1xyXG4gICAgICAgICAgICBmcmFtZXMuZGRhKHBsYWNlaG9sZGVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3ByZWFkT2Zmc2V0KGZyYW1lcyk7XHJcbiAgICAgICAgbGV0IG5lZWRlZCA9IG5ldyBNYXAoKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZyYW1lcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgZnJhbWUgPSBmcmFtZXNbaV07XHJcbiAgICAgICAgICAgIGxldCB0aGlza2V5cyA9IE9iamVjdC5rZXlzKGZyYW1lKTtcclxuICAgICAgICAgICAgaWYgKHRoaXNrZXlzLmluY2x1ZGVzKFwib2Zmc2V0XCIpKVxyXG4gICAgICAgICAgICAgICAgdGhpc2tleXMucm1WKFwib2Zmc2V0XCIpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBrZXkgb2YgYWxsS2V5cykge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlza2V5cy5pbmNsdWRlcyhrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHByZXZTdHlsZTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV4dFN0eWxlO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwcmV2T2Zmc2V0O1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXh0T2Zmc2V0O1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB3YW50ZWRPZmZzZXQgPSBmcmFtZS5vZmZzZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBmcmFtZXMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZyYW1laiA9IGZyYW1lc1tqXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZyYW1laltrZXldICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChqIDwgaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXZTdHlsZSA9IGZyYW1laltrZXldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXZPZmZzZXQgPSBmcmFtZWoub2Zmc2V0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFN0eWxlID0gZnJhbWVqW2tleV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dE9mZnNldCA9IGZyYW1lai5vZmZzZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByZXZTdHlsZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyYW1lW2tleV0gPSBuZXh0U3R5bGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKG5leHRTdHlsZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyYW1lW2tleV0gPSBwcmV2U3R5bGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKG5leHRTdHlsZSA9PT0gcHJldlN0eWxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyYW1lW2tleV0gPSBwcmV2U3R5bGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYXQgPSAoKHdhbnRlZE9mZnNldCAtIHByZXZPZmZzZXQpIC8gKG5leHRPZmZzZXQgLSBwcmV2T2Zmc2V0KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtZSA9IG5lZWRlZC5nZXQoZnJhbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobWUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGYgPSBtZS5lYSgoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlLmlkZW50aWZ5LnByZXZPZmZzZXQgPT09IHByZXZPZmZzZXQgJiYgZS5pZGVudGlmeS5uZXh0T2Zmc2V0ID09PSBuZXh0T2Zmc2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUuZnJhbWVzWzBdW2tleV0gPSBwcmV2U3R5bGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUuZnJhbWVzWzFdW2tleV0gPSBuZXh0U3R5bGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUua2V5cy5hZGQoa2V5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZS5hZGQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXlzOiBba2V5XSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyYW1lczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBba2V5XTogcHJldlN0eWxlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IFtrZXldOiBuZXh0U3R5bGUgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZGVudGlmeToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldk9mZnNldCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRPZmZzZXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmVlZGVkLnNldChmcmFtZSwgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5czogW2tleV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcmFtZXM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgW2tleV06IHByZXZTdHlsZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBba2V5XTogbmV4dFN0eWxlIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWRlbnRpZnk6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXZPZmZzZXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0T2Zmc2V0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBwbGFjZWhvbGRlciBzaG91bGQgbm90IGJlIGZvcm1hdHRlZFxyXG4gICAgICAgIGlmIChuZWVkVG9DYWxjdWxhdGVJbml0YWxGcmFtZSlcclxuICAgICAgICAgICAgZnJhbWVzLnJtSSgwKTtcclxuICAgICAgICBsZXQgbm90QWxyZWFkeUZvcm1hdHRlZEZyYW1lcyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGZyYW1lIG9mIGZyYW1lcykge1xyXG4gICAgICAgICAgICBpZiAobmVlZGVkLmdldChmcmFtZSkgPT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgIGZvcm1hdEFuaW1hdGlvbkNzcyhmcmFtZSwgdGhpc1RyYW5zUHJvcHNDb3B5LCBwYXJzZUluZGV4TWFwKTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgbm90QWxyZWFkeUZvcm1hdHRlZEZyYW1lcy5hZGQoZnJhbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcHJvbXMgPSBbXTtcclxuICAgICAgICBuZWVkZWQuZm9yRWFjaCgobmUsIGZyYW1lKSA9PiB7XHJcbiAgICAgICAgICAgIG5lLmVhKChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBwcm9tcy5hZGQoZ2V0U3R5bGVBdFByb2dyZXNzKFtlLmZyYW1lcywgZSwgdGhpcywgcGFyc2VJbmRleE1hcF0sIDEpLnRoZW4oKHN0eWxlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIHN0eWxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyYW1lW2tleV0gPSBzdHlsZVtrZXldO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKCFwcm9tcy5lbXB0eSlcclxuICAgICAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwocHJvbXMpO1xyXG4gICAgICAgIG5vdEFscmVhZHlGb3JtYXR0ZWRGcmFtZXMuZWEoKGZyYW1lKSA9PiB7XHJcbiAgICAgICAgICAgIGZvcm1hdEFuaW1hdGlvbkNzcyhmcmFtZSwgdGhpc1RyYW5zUHJvcHNDb3B5LCBwYXJzZUluZGV4TWFwKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBhbGxLZXlzID0gZXZhbHVhdGVBbGxLZXlzKGZyYW1lcyk7XHJcbiAgICAgICAgcGFyc2VJbmRleE1hcCA9IHN0eWxlUHJvcGVydHlBdHRyaWJ1dGVPZktleWZyYW1lKHRoaXMsIGFsbEtleXMpO1xyXG4gICAgICAgIGlmIChuZWVkVG9DYWxjdWxhdGVJbml0YWxGcmFtZSlcclxuICAgICAgICAgICAgZnJhbWVzLmRkYShpbml0RnJhbWUpO1xyXG4gICAgICAgIGVuZEZyYW1lcyA9IGZyYW1lcztcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGZvcm1hdENzcyhmcmFtZV9mcmFtZXMsIHRoaXNUcmFuc1Byb3BzQ29weSwgcGFyc2VJbmRleE1hcCk7XHJcbiAgICAgICAgYWxsS2V5cyA9IE9iamVjdC5rZXlzKGZyYW1lX2ZyYW1lcyk7XHJcbiAgICAgICAgaWYgKGFsbEtleXMuaW5jbHVkZXMoXCJvZmZzZXRcIikpXHJcbiAgICAgICAgICAgIGFsbEtleXMucm1WKFwib2Zmc2V0XCIpO1xyXG4gICAgICAgIGZyYW1lX2ZyYW1lcy5vZmZzZXQgPSAxO1xyXG4gICAgICAgIHBhcnNlSW5kZXhNYXAgPSBzdHlsZVByb3BlcnR5QXR0cmlidXRlT2ZLZXlmcmFtZSh0aGlzLCBhbGxLZXlzKTtcclxuICAgICAgICBuZWVkVG9DYWxjdWxhdGVJbml0YWxGcmFtZSA9IHRydWU7XHJcbiAgICAgICAgZW5kRnJhbWVzID0gW2luaXRGcmFtZSwgZnJhbWVfZnJhbWVzXTtcclxuICAgIH1cclxuICAgIGxldCBkZXRlY3RlZFByb3BlcnRpZXMgPSBkZXRlY3RJZkluVHJhbnNpdGlvblByb3BlcnR5KGFsbEtleXMsIHRyYW5zaXRpb25Qcm9wZXJ0eSwgdHJhbnNpdGlvbkR1cmF0aW9uLCB0aGlzKTtcclxuICAgIGxldCBjc3NDYW5CZVVzZWRUb0ZpbGwgPSBhbGxLZXlzLmV4Y2x1ZGVzKC4uLmRldGVjdGVkUHJvcGVydGllcyk7XHJcbiAgICBsZXQgZWxlbXNXaXRob3V0Q29uc2l0ZW50VHJhbnNmb3JtUHJvcHNLZXkgPSB7IGVsZW06IHRoaXMsIGlkZW50aWZpZXI6IG9wdGlvbnMubmFtZSB9O1xyXG4gICAgY29uc3Qgc2VwZXJhdGVkS2V5ZnJhbWVzID0gc2VwZXJhdGVLZXlmcmFtZVN0eWxlc0Zyb21Qcm9wcyhlbmRGcmFtZXMsIHBhcnNlSW5kZXhNYXApO1xyXG4gICAgY29uc3QgYW5pbWF0ZVZpYVdhYXBpID0gIXNlcGVyYXRlZEtleWZyYW1lcy5zdHlsZS5lbXB0eTtcclxuICAgIGNvbnN0IGFuaW1hdGVWaWFQcm9wID0gIXNlcGVyYXRlZEtleWZyYW1lcy5wcm9wLmVtcHR5O1xyXG4gICAgaWYgKCFhbmltYXRpb25Jc0d1aWRlZCkge1xyXG4gICAgICAgIGVsZW1zV2l0aG91dENvbnNpdGVudFRyYW5zZm9ybVByb3BzLmFkZChlbGVtc1dpdGhvdXRDb25zaXRlbnRUcmFuc2Zvcm1Qcm9wc0tleSk7XHJcbiAgICAgICAgbGV0IG8gPSBvcHRpb25zO1xyXG4gICAgICAgIC8vRGVmYXVsdHNcclxuICAgICAgICBpZiAoby5kdXJhdGlvbiA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICBvLmR1cmF0aW9uID0gMjAwO1xyXG4gICAgICAgIGVsc2UgaWYgKG8uZHVyYXRpb24gPD0gMClcclxuICAgICAgICAgICAgdGhyb3cgXCJHaXZlbiBvcHRpb24gZHVyYXRpb24gXCIgKyBvLmR1cmF0aW9uICsgXCIgY2Fubm90IGJlIG5lZ2F0aXZlLlwiO1xyXG4gICAgICAgIGlmIChvLmVhc2luZyA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICBvLmVhc2luZyA9IG5ldyBFYXNpbmcoXCJlYXNlXCIpO1xyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvLmVhc2luZyA9PT0gXCJzdHJpbmdcIilcclxuICAgICAgICAgICAgICAgIG8uZWFzaW5nID0gbmV3IEVhc2luZyhvLmVhc2luZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvLmZpbGwgPT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgby5maWxsID0gdHJ1ZTtcclxuICAgICAgICBsZXQgd2FhcGlPcHRpb25zO1xyXG4gICAgICAgIGlmIChhbmltYXRlVmlhV2FhcGkpIHtcclxuICAgICAgICAgICAgd2FhcGlPcHRpb25zID0ge307XHJcbiAgICAgICAgICAgIHdhYXBpT3B0aW9ucy5maWxsID0gXCJib3RoXCI7XHJcbiAgICAgICAgICAgIHdhYXBpT3B0aW9ucy5pdGVyYXRpb25zID0gby5pdGVyYXRpb25zO1xyXG4gICAgICAgICAgICB3YWFwaU9wdGlvbnMuZHVyYXRpb24gPSBvLmR1cmF0aW9uO1xyXG4gICAgICAgICAgICB3YWFwaU9wdGlvbnMuZWFzaW5nID0gby5lYXNpbmcuc3RyaW5nO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXdhaXQgbmV3IFByb21pc2UoYXN5bmMgKHJlcywgcmVqKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBhbmltYXRpb247XHJcbiAgICAgICAgICAgIGxldCB0d2Vlbnk7XHJcbiAgICAgICAgICAgIGxldCBjYW5jZWxBbmltYXRpb24gPSBmYWxzZTtcclxuICAgICAgICAgICAgbGV0IHJtRnJvbU5hbWVTcGFjZSA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKHByb2dyZXNzTmFtZVN0cmluZyk7XHJcbiAgICAgICAgICAgICAgICBucy5ybVYob3B0aW9ucy5uYW1lKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGlmIChhbmltYXRlVmlhV2FhcGkpXHJcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uID0gdGhpcy5hbmltYXRlKHNlcGVyYXRlZEtleWZyYW1lcy5zdHlsZSwgd2FhcGlPcHRpb25zKTtcclxuICAgICAgICAgICAgICAgIGlmIChhbmltYXRlVmlhUHJvcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgICAgIHR3ZWVueSA9IG5ldyBUd2Vlbk9iamVjdCh0cnVlLCBzZXBlcmF0ZWRLZXlmcmFtZXMucHJvcCwgbyk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gRm9ybWF0XHJcbiAgICAgICAgICAgICAgICAgICAgdHdlZW55Lm9uVXBkYXRlKChrZXlmcmFtZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBwcm9wIGluIGtleWZyYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXlmcmFtZVtwcm9wXSA9IHBvc3RGaXhTdHlsZShwcm9wLCBrZXlmcmFtZVtwcm9wXSwgcGFyc2VJbmRleE1hcFtwcm9wXSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlsbCA9IHsgYXR0cjogW10sIHByb3A6IFtdIH07XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlyc3RQcm9wID0gY2xvbmUoc2VwZXJhdGVkS2V5ZnJhbWVzLnByb3AuZmlyc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBmaXJzdFByb3Aub2Zmc2V0O1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHByb3AgaW4gZmlyc3RQcm9wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGxbcGFyc2VJbmRleE1hcFtwcm9wXV0uYWRkKHByb3ApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWZpbGwuYXR0ci5lbXB0eSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0d2Vlbnkub25VcGRhdGUoKGtleWZyYW1lKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxsLmF0dHIuZWEoKGtleSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKGtleSwga2V5ZnJhbWVba2V5XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghZmlsbC5wcm9wLmVtcHR5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR3ZWVueS5vblVwZGF0ZSgoa2V5ZnJhbWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGwucHJvcC5lYSgoa2V5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1trZXldID0ga2V5ZnJhbWVba2V5XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogdXNlIGFuaW1hdGlvbkZyYW1lRGVsdGEgZm9yIGV2ZXJ5dGhpbmdcclxuICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25GcmFtZURlbHRhKHR3ZWVueS51cGRhdGUuYmluZCh0d2VlbnkpLCBvLmR1cmF0aW9uLCBvLml0ZXJhdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRLZXlmcmFtZShlbmRGcmFtZXMubGFzdCwgdGhpcyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzVHJhbnNQcm9wcy50cmFuc2Zvcm0gPSBnZXRDb21wdXRlZFN0eWxlKHRoaXMpLnRyYW5zZm9ybTtcclxuICAgICAgICAgICAgICAgIGVsZW1zV2l0aG91dENvbnNpdGVudFRyYW5zZm9ybVByb3BzLnJtKGVsZW1zV2l0aG91dENvbnNpdGVudFRyYW5zZm9ybVByb3BzS2V5KTtcclxuICAgICAgICAgICAgICAgIHJlaihgRW5jb3VudGVyZWQgZm9sbG93aW5nIGVycm9yIHdoaWxlIGF0dGVtcHRpbmcgdG8gYW5pbWF0ZS5cblxuLS0tLS0tLS1cblxuYCArIGUubWVzc2FnZSArIGBcblxuLS0tLS0tLS1cblxuXG5GYWxsaW5nIGJhY2sgb24gYCArIHRoaXMudGFnTmFtZS50b0xvd2VyQ2FzZSgpICsgYCNjc3MoLi4uKSB0byBwcmV2ZW50IGxvZ2ljIGZhaWx1cmVzLmApO1xyXG4gICAgICAgICAgICAgICAgY2FuY2VsQW5pbWF0aW9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKHByb2dyZXNzTmFtZVN0cmluZywgXCJGYWlsZWRcIik7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KHJtRnJvbU5hbWVTcGFjZSwgMTAwMCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGZpbmlzaGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXNBbmltUHJvcHMuYWRkKHsgcHJvcHM6IGFsbEtleXMsIG9uQ2FuY2VsOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbmlzaGVkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgY2FuY2VsQW5pbWF0aW9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzVHJhbnNQcm9wcy50cmFuc2Zvcm0gPSBnZXRDb21wdXRlZFN0eWxlKHRoaXMpLnRyYW5zZm9ybTtcclxuICAgICAgICAgICAgICAgICAgICBhbmltYXRpb24uY2FuY2VsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcm1Gcm9tTmFtZVNwYWNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzKCk7XHJcbiAgICAgICAgICAgICAgICB9IH0pO1xyXG4gICAgICAgICAgICBsZXQgaXRlcmF0aW9ucyA9IG8uaXRlcmF0aW9ucztcclxuICAgICAgICAgICAgaWYgKGl0ZXJhdGlvbnMgIT09IEluZmluaXR5KVxyXG4gICAgICAgICAgICAgICAgaWYgKGFuaW1hdGlvbiAhPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbi5vbmZpbmlzaCA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNhbmNlbEFuaW1hdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmluaXNoZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGFzdEZyYW1lID0gZW5kRnJhbWVzLmxhc3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNUcmFuc1Byb3BzLnRyYW5zZm9ybSA9IGxhc3RGcmFtZS50cmFuc2Zvcm07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1zV2l0aG91dENvbnNpdGVudFRyYW5zZm9ybVByb3BzLnJtKGVsZW1zV2l0aG91dENvbnNpdGVudFRyYW5zZm9ybVByb3BzS2V5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG8uZmlsbCAmJiBjc3NDYW5CZVVzZWRUb0ZpbGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEtleWZyYW1lKGxhc3RGcmFtZSwgdGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb24uY2FuY2VsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNhbmNlbEFuaW1hdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmluaXNoZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtc1dpdGhvdXRDb25zaXRlbnRUcmFuc2Zvcm1Qcm9wcy5ybShlbGVtc1dpdGhvdXRDb25zaXRlbnRUcmFuc2Zvcm1Qcm9wc0tleSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIG8uZHVyYXRpb24gKiBpdGVyYXRpb25zKTtcclxuICAgICAgICAgICAgbGV0IGRpc3BsYXlQcm9ncmVzcyA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBmcmVxID0gby5kdXJhdGlvbiAvIDEwMDtcclxuICAgICAgICAgICAgICAgIGxldCBtaW4gPSAxNjtcclxuICAgICAgICAgICAgICAgIGlmIChmcmVxIDwgbWluKVxyXG4gICAgICAgICAgICAgICAgICAgIGZyZXEgPSBtaW47XHJcbiAgICAgICAgICAgICAgICBsZXQgY3VyID0gMDtcclxuICAgICAgICAgICAgICAgIGxldCBwcm9ncmVzcyA9IDA7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW50ID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjYW5jZWxBbmltYXRpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjbGVhckludGVydmFsKGludCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VyICs9IGZyZXE7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3MgPSBNYXRoLnJvdW5kKChjdXIgLyBvLmR1cmF0aW9uKSAqIDEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb2dyZXNzID49IDEwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGludCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZXJhdGlvbnMtLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZXJhdGlvbnMgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChybUZyb21OYW1lU3BhY2UsIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlQcm9ncmVzcygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzcyA9IDEwMDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUocHJvZ3Jlc3NOYW1lU3RyaW5nLCBwcm9ncmVzcyArIFwiJVwiKTtcclxuICAgICAgICAgICAgICAgIH0sIGZyZXEpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBkaXNwbGF5UHJvZ3Jlc3MoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGxldCBvID0gb3B0aW9ucztcclxuICAgICAgICBsZXQgZWFzaW5nRnVuYztcclxuICAgICAgICAvLyBEZWZhdWx0c1xyXG4gICAgICAgIGlmIChvLnN0YXJ0ID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIG8uc3RhcnQgPSAwO1xyXG4gICAgICAgIGlmIChvLmVuZCA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICBvLmVuZCA9IG8uc3RhcnQgKyAxMDA7XHJcbiAgICAgICAgaWYgKG8uc21vb3RoID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIG8uc21vb3RoID0gdHJ1ZTtcclxuICAgICAgICBpZiAoby5hY3RpdmUgPT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgby5hY3RpdmUgPSBuZXcgRGF0YSh0cnVlKTtcclxuICAgICAgICBpZiAoby5lYXNpbmcgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBlYXNpbmdGdW5jID0gZWFzZUluT3V0RnVuYztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG8uZWFzaW5nID09PSBcInN0cmluZ1wiKVxyXG4gICAgICAgICAgICAgICAgby5lYXNpbmcgPSBuZXcgRWFzaW5nKG8uZWFzaW5nKTtcclxuICAgICAgICAgICAgZWFzaW5nRnVuYyA9IG8uZWFzaW5nLmZ1bmN0aW9uO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoby5zdGFydCA+PSBvLmVuZClcclxuICAgICAgICAgICAgdGhyb3cgXCJHaXZlbiBvcHRpb24gc3RhcnQgXCIgKyBvLnN0YXJ0ICsgXCIgYW5kIGVuZCBcIiArIG8uZW5kICsgXCIgYXJlIG5vdCBjb25zaXN0ZW50LiBFbmQgbXVzdCBiZSBncmVhdGVyIHRoYW4gc3RhcnQuXCI7XHJcbiAgICAgICAgby5hY3RpdmUuc3Vic2NyaWJlKChhY3RpdmUpID0+IHtcclxuICAgICAgICAgICAgbm90QWN0aXZlID0gIWFjdGl2ZTtcclxuICAgICAgICAgICAgaWYgKGFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgZWxlbXNXaXRob3V0Q29uc2l0ZW50VHJhbnNmb3JtUHJvcHMuYWRkKGVsZW1zV2l0aG91dENvbnNpdGVudFRyYW5zZm9ybVByb3BzS2V5KTtcclxuICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVsZW1zV2l0aG91dENvbnNpdGVudFRyYW5zZm9ybVByb3BzLmluY2x1ZGVzKGVsZW1zV2l0aG91dENvbnNpdGVudFRyYW5zZm9ybVByb3BzS2V5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXNUcmFuc1Byb3BzLnRyYW5zZm9ybSA9IGdldENvbXB1dGVkU3R5bGUodGhpcykudHJhbnNmb3JtO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1zV2l0aG91dENvbnNpdGVudFRyYW5zZm9ybVByb3BzLnJtKGVsZW1zV2l0aG91dENvbnNpdGVudFRyYW5zZm9ybVByb3BzS2V5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKHByb2dyZXNzTmFtZVN0cmluZywgXCJJbmFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIGZhbHNlKTtcclxuICAgICAgICBsZXQgaW5TbW9vdGhpbmc7XHJcbiAgICAgICAgbGV0IGNhbmNlbFNtb290aGluZztcclxuICAgICAgICBsZXQgbGFzdEFuaW1hdGlvbjtcclxuICAgICAgICBsZXQgbGFzdFByb2dyZXNzID0gbWluQW5pbWF0aW9uUHJvZ3Jlc3M7XHJcbiAgICAgICAgbGV0IHByb2dyZXNzID0gbWluQW5pbWF0aW9uUHJvZ3Jlc3M7XHJcbiAgICAgICAgbGV0IHByb2dyZXNzQWJzb3JwdGlvbiA9IDA7XHJcbiAgICAgICAgbGV0IG5leHRQcm9ncmVzcyA9IDE7XHJcbiAgICAgICAgbGV0IHByZXZQcm9ncmVzcyA9IDA7XHJcbiAgICAgICAgbGV0IHNsaWRlID0gMDtcclxuICAgICAgICBsZXQgbGFzdFByb2dyZXNzQWJzb3JwdGlvbiA9IHByb2dyZXNzQWJzb3JwdGlvbjtcclxuICAgICAgICBsZXQgcmF3UHJvZ3Jlc3MgPSBtaW5BbmltYXRpb25Qcm9ncmVzcztcclxuICAgICAgICBsZXQgcmF3TGFzdFByb2dyZXNzID0gbWluQW5pbWF0aW9uUHJvZ3Jlc3M7XHJcbiAgICAgICAgbGV0IG5vdEFjdGl2ZSA9ICFvLmFjdGl2ZS52YWw7XHJcbiAgICAgICAgbGV0IG5vdEluTGltaXRDb3JyZWN0aW9uID0gdHJ1ZTtcclxuICAgICAgICBsZXQgYWJzdWx1dGVQcm9ncmVzcztcclxuICAgICAgICBsZXQgbGFzdEN5Y2xlO1xyXG4gICAgICAgIGxldCB0d2Vlbnk7XHJcbiAgICAgICAgaWYgKGFuaW1hdGVWaWFQcm9wKSB7XHJcbiAgICAgICAgICAgIGxldCB0d2Vlbk9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICBlYXNpbmc6IGEgPT4gYSxcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxLFxyXG4gICAgICAgICAgICAgICAgZmlsbDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGl0ZXJhdGlvbnM6IG8uaXRlcmF0aW9uc1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAvLyBGb3JtYXRcclxuICAgICAgICAgICAgdHdlZW55ID0gbmV3IFR3ZWVuT2JqZWN0KHRydWUsIHNlcGVyYXRlZEtleWZyYW1lcy5wcm9wLCB0d2Vlbk9wdGlvbnMpO1xyXG4gICAgICAgICAgICAvLyBUT0RPOiBEb250IGRvIHRoaXMgdmlhIG9uVXBkYXRlOyBVc2UgcGFyc2UgZnVuY3Rpb25zIGluc3RlYWRcclxuICAgICAgICAgICAgdHdlZW55Lm9uVXBkYXRlKChrZXlmcmFtZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgcHJvcCBpbiBrZXlmcmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGtleWZyYW1lW3Byb3BdID0gcG9zdEZpeFN0eWxlKHByb3AsIGtleWZyYW1lW3Byb3BdLCBwYXJzZUluZGV4TWFwW3Byb3BdLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb25zdCBmaWxsID0geyBhdHRyOiBbXSwgcHJvcDogW10gfTtcclxuICAgICAgICAgICAgY29uc3QgZmlyc3RQcm9wID0gY2xvbmUoc2VwZXJhdGVkS2V5ZnJhbWVzLnByb3AuZmlyc3QpO1xyXG4gICAgICAgICAgICBkZWxldGUgZmlyc3RQcm9wLm9mZnNldDtcclxuICAgICAgICAgICAgZm9yIChsZXQgcHJvcCBpbiBmaXJzdFByb3ApIHtcclxuICAgICAgICAgICAgICAgIGZpbGxbcGFyc2VJbmRleE1hcFtwcm9wXV0uYWRkKHByb3ApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghZmlsbC5hdHRyLmVtcHR5KSB7XHJcbiAgICAgICAgICAgICAgICB0d2Vlbnkub25VcGRhdGUoKGtleWZyYW1lKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsbC5hdHRyLmVhKChrZXkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoa2V5LCBrZXlmcmFtZVtrZXldKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghZmlsbC5wcm9wLmVtcHR5KSB7XHJcbiAgICAgICAgICAgICAgICB0d2Vlbnkub25VcGRhdGUoKGtleWZyYW1lKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsbC5wcm9wLmVhKChrZXkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1trZXldID0ga2V5ZnJhbWVba2V5XTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFNpbmNlIHRoaXMgZ2V0cyBjYWxsZWQgVkVSWSBvZnRlbiwga2VlcCB2YXJpYWJsZSBkZWNsYXJhdGlvbiB0byBhIG1pbmltdW0uIEV2ZXJ5IG1lbSBhbGxvY2F0aW9uIG5lZWRzIHRvIGJlIGdhcmJhZ2UgY29sbGVjdGVkLlxyXG4gICAgICAgIGNvbnN0IHN1YnNjcmlwdGlvbiA9ICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKG5vdEFjdGl2ZSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgbGFzdFByb2dyZXNzID0gcHJvZ3Jlc3M7XHJcbiAgICAgICAgICAgIHJhd0xhc3RQcm9ncmVzcyA9IHJhd1Byb2dyZXNzO1xyXG4gICAgICAgICAgICBwcm9ncmVzcyA9IHByb2dyZXNzVG9TYXZlUHJvZ3Jlc3MoKChhYnN1bHV0ZVByb2dyZXNzIC0gby5zdGFydCkgLyAoby5lbmQgLSBvLnN0YXJ0KSkpO1xyXG4gICAgICAgICAgICByYXdQcm9ncmVzcyA9IHByb2dyZXNzO1xyXG4gICAgICAgICAgICBpZiAocHJvZ3Jlc3MgPT09IGxhc3RQcm9ncmVzcylcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgaWYgKGluU21vb3RoaW5nKSB7XHJcbiAgICAgICAgICAgICAgICBjYW5jZWxTbW9vdGhpbmcoKTtcclxuICAgICAgICAgICAgICAgIGlmIChyYXdMYXN0UHJvZ3Jlc3MgPT09IHJhd1Byb2dyZXNzKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoby5zbW9vdGgpIHtcclxuICAgICAgICAgICAgICAgIGlmIChyYXdMYXN0UHJvZ3Jlc3MgPCByYXdQcm9ncmVzcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHByb2dyZXNzQWJzb3JwdGlvbiA9IHByb2dyZXNzQWJzb3JwdGlvbiAqIChyYXdQcm9ncmVzcyAtIG5leHRQcm9ncmVzcykgLyAocmF3TGFzdFByb2dyZXNzIC0gbmV4dFByb2dyZXNzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHByb2dyZXNzQWJzb3JwdGlvbiA9IHByb2dyZXNzQWJzb3JwdGlvbiAqIChyYXdQcm9ncmVzcyAtIHByZXZQcm9ncmVzcykgLyAocmF3TGFzdFByb2dyZXNzIC0gcHJldlByb2dyZXNzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICgobGFzdFByb2dyZXNzQWJzb3JwdGlvbiA8IDAgJiYgcHJvZ3Jlc3NBYnNvcnB0aW9uID49IDApIHx8IChwcm9ncmVzc0Fic29ycHRpb24gPD0gMCAmJiBsYXN0UHJvZ3Jlc3NBYnNvcnB0aW9uID4gMCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBwcm9ncmVzc0Fic29ycHRpb24gPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3MgKz0gcHJvZ3Jlc3NBYnNvcnB0aW9uO1xyXG4gICAgICAgICAgICAgICAgbGFzdFByb2dyZXNzQWJzb3JwdGlvbiA9IHByb2dyZXNzQWJzb3JwdGlvbjtcclxuICAgICAgICAgICAgICAgIHNsaWRlID0gKHNsaWRlIC8gMS43KSArICgocHJvZ3Jlc3MgLSBsYXN0UHJvZ3Jlc3MpIC8gZnJhbWVEZWx0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGRpZmYgPSBwcm9ncmVzcyAtIGxhc3RQcm9ncmVzcztcclxuICAgICAgICAgICAgbGV0IG92ZXJsaW1pdCA9IE1hdGguYWJzKGRpZmYpID4gbWF4UHJvZ3Jlc3NJbk9uZVN0ZXAgJiYgIXZlcnlGaXJzdDtcclxuICAgICAgICAgICAgaWYgKG92ZXJsaW1pdCkge1xyXG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3MgPSBwcm9ncmVzc1RvU2F2ZVByb2dyZXNzKGxhc3RQcm9ncmVzcyArICgoKGRpZmYgPiAwKSA/IG1heFByb2dyZXNzSW5PbmVTdGVwV2l0aG91dERlbHRhIDogLW1heFByb2dyZXNzSW5PbmVTdGVwV2l0aG91dERlbHRhKSAqIGZyYW1lRGVsdGEpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobGFzdFByb2dyZXNzID09PSBtaW5BbmltYXRpb25Qcm9ncmVzcyB8fCBsYXN0UHJvZ3Jlc3MgPT09IG1heEFuaW1hdGlvblByb2dyZXNzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobmVlZFRvQ2FsY3VsYXRlSW5pdGFsRnJhbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbmRGcmFtZXNbMF0gPSBjdXJyZW50RnJhbWUoYWxsS2V5cywgdGhpcywgcGFyc2VJbmRleE1hcCwgdGhpc1RyYW5zUHJvcHMpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5lZWRUb0NhbGN1bGF0ZUluaXRhbEZyYW1lID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoby5pbkNiICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG8uaW5DYiA9PT0gXCJzdHJpbmdcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1tvLmluQ2JdKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvLmluQ2IuY2FsbCh0aGlzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL2FuaW1hdGlvblxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKHByb2dyZXNzTmFtZVN0cmluZywgTWF0aC5yb3VuZChwcm9ncmVzcyAqIDEwMCkgKyBcIiVcIik7XHJcbiAgICAgICAgICAgIH0sIDApO1xyXG4gICAgICAgICAgICBpZiAoYW5pbWF0ZVZpYVdhYXBpKVxyXG4gICAgICAgICAgICAgICAgaWYgKGxhc3RBbmltYXRpb24gIT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgICAgICBsYXN0QW5pbWF0aW9uLmNhbmNlbCgpO1xyXG4gICAgICAgICAgICBsZXQgdGhpc0N5Y2xlID0gU3ltYm9sKFwiQ3ljbGVcIik7XHJcbiAgICAgICAgICAgIGxhc3RDeWNsZSA9IHRoaXNDeWNsZTtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGlmIChhbmltYXRlVmlhV2FhcGkpIHtcclxuICAgICAgICAgICAgICAgICAgICBsYXN0QW5pbWF0aW9uID0gdGhpcy5hbmltYXRlKGVuZEZyYW1lcywgeyBkdXJhdGlvbjogMSwgZmlsbDogXCJib3RoXCIsIGVhc2luZzogXCJsaW5lYXJcIiwgaXRlcmF0aW9uczogMSwgaXRlcmF0aW9uU3RhcnQ6IHByb2dyZXNzVG9TYXZlUHJvZ3Jlc3MoZWFzaW5nRnVuYyhwcm9ncmVzcykpIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGxhc3RBbmltYXRpb24ucGF1c2UoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChhbmltYXRlVmlhUHJvcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHR3ZWVueS51cGRhdGUoZWFzaW5nRnVuYyhwcm9ncmVzcykpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICBlcnJvckFuaW1hdGlvbihcIm1haW5cIiwgZW5kRnJhbWVzLCBwcm9ncmVzc1RvU2F2ZVByb2dyZXNzKGVhc2luZ0Z1bmMocHJvZ3Jlc3MpKSwgdGhpcywgZSk7XHJcbiAgICAgICAgICAgICAgICBwcm9ncmVzc0Fic29ycHRpb24gPSAwO1xyXG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3MgPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAob3ZlcmxpbWl0ICYmICEocHJvZ3Jlc3MgPD0gbWluQW5pbWF0aW9uUHJvZ3Jlc3MgfHwgcHJvZ3Jlc3MgPj0gbWF4QW5pbWF0aW9uUHJvZ3Jlc3MpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm90SW5MaW1pdENvcnJlY3Rpb24gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBzdWJzY3JpcHRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgbm90SW5MaW1pdENvcnJlY3Rpb24gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpc0N5Y2xlID09PSBsYXN0Q3ljbGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJkeVRvU2V0RW5kVmFscztcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG8uc21vb3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVzUmR5VG9TZXRFbmRWYWxzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmR5VG9TZXRFbmRWYWxzID0gbmV3IFN5bmNQcm9tKChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNSZHlUb1NldEVuZFZhbHMgPSByZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluU21vb3RoaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjYW5jZWxBbmltYXRpb25TbW9vdGhpbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYW5jZWxTbW9vdGhpbmcgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FuY2VsQW5pbWF0aW9uU21vb3RoaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGVhblVwU21vb3RoZW5pbmcodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNtb290aFByb2dyZXNzID0gcHJvZ3Jlc3M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbG9jYWxDb3B5T2ZQcm9ncmVzcyA9IHByb2dyZXNzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc21vb3RoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBzbW9vdGgoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNhbmNlbEFuaW1hdGlvblNtb290aGluZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYW5jZWxBbmltYXRpb25TbW9vdGhpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbW9vdGhQcm9ncmVzcyArPSBzbGlkZSAqIGZyYW1lRGVsdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGUgPSBzbGlkZSAqIC41O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRvIGJlIGhvbmVzdCBJIGRvbnQga25vdyB3aHkgdGhpcyBjYW50IGJlIGp1c3QgZG9uZSBvbmNlIGF0IHRvIHN0YXJ0IG9mIGNsZWFuVXBTbW9vdGhlbmluZyBidXQgd2lyZWQgdGhpbmdzIGhhcHBlbiBpZiBpdCBkb2VzbnQgZ28gaGVyZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMga2V5ZnJhbWVzIHNob3dzIHRoZSBwcm9ibGVtIHt0cmFuc2xhdGVYOiA1MDB9LCB7dHJhbnNsYXRlWTogNTAwLCBiYWNrZ3JvdW5kQ29sb3I6IFwicmVkXCJ9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNtb290aFByb2dyZXNzID0gcHJvZ3Jlc3NUb1NhdmVQcm9ncmVzcyhzbW9vdGhQcm9ncmVzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogbW92ZSB2YXJpYWJsZSBkZWNsYXJhdGlvbiBvdXRzaWRlIG9mIGxvb3BcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZWFzZWRTbW9vdGhQcm9ncmVzcyA9IGVhc2luZ0Z1bmMoc21vb3RoUHJvZ3Jlc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtaW5Cb3JkZXJSZWFjaGVkID0gZWFzZWRTbW9vdGhQcm9ncmVzcyA8PSBtaW5BbmltYXRpb25Qcm9ncmVzcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbWF4Qm9yZGVyUmVhY2hlZCA9IGVhc2VkU21vb3RoUHJvZ3Jlc3MgPj0gbWF4QW5pbWF0aW9uUHJvZ3Jlc3M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1pbkJvcmRlclJlYWNoZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVhc2VkU21vb3RoUHJvZ3Jlc3MgPSBtaW5BbmltYXRpb25Qcm9ncmVzcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChtYXhCb3JkZXJSZWFjaGVkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlYXNlZFNtb290aFByb2dyZXNzID0gbWF4QW5pbWF0aW9uUHJvZ3Jlc3M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFuaW1hdGVWaWFXYWFwaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RBbmltYXRpb24gIT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0QW5pbWF0aW9uLmNhbmNlbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdEFuaW1hdGlvbiA9IHRoYXQuYW5pbWF0ZShlbmRGcmFtZXMsIHsgZHVyYXRpb246IDEsIGZpbGw6IFwiYm90aFwiLCBlYXNpbmc6IFwibGluZWFyXCIsIGl0ZXJhdGlvbnM6IDEsIGl0ZXJhdGlvblN0YXJ0OiBlYXNlZFNtb290aFByb2dyZXNzIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdEFuaW1hdGlvbi5wYXVzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhbmltYXRlVmlhUHJvcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHdlZW55LnVwZGF0ZShlYXNlZFNtb290aFByb2dyZXNzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvckFuaW1hdGlvbihcInNtb290aFwiLCBlbmRGcmFtZXMsIGVhc2VkU21vb3RoUHJvZ3Jlc3MsIHRoYXQsIGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzc0Fic29ycHRpb24gPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzcyA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKHNsaWRlKSA+PSAuMDAwMDAxICYmICEobWluQm9yZGVyUmVhY2hlZCB8fCBtYXhCb3JkZXJSZWFjaGVkKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHNtb290aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGVhblVwU21vb3RoZW5pbmcoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gY2xlYW5VcFNtb290aGVuaW5nKGh1cnJ5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGUgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzbWFsbGVyUHJvZ3Jlc3M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJpZ2dlclByb2dyZXNzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsb2NhbENvcHlPZlByb2dyZXNzIDwgc21vb3RoUHJvZ3Jlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc21hbGxlclByb2dyZXNzID0gbG9jYWxDb3B5T2ZQcm9ncmVzcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmlnZ2VyUHJvZ3Jlc3MgPSBzbW9vdGhQcm9ncmVzcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNtYWxsZXJQcm9ncmVzcyA9IHNtb290aFByb2dyZXNzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiaWdnZXJQcm9ncmVzcyA9IGxvY2FsQ29weU9mUHJvZ3Jlc3M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHsgb2Zmc2V0IH0gb2YgZW5kRnJhbWVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvZmZzZXQgPD0gc21hbGxlclByb2dyZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV2UHJvZ3Jlc3MgPSBvZmZzZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAob2Zmc2V0ID49IGJpZ2dlclByb2dyZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0UHJvZ3Jlc3MgPSBvZmZzZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzc0Fic29ycHRpb24gPSBwcm9ncmVzc0Fic29ycHRpb24gKyAoKHNtb290aFByb2dyZXNzIC0gbG9jYWxDb3B5T2ZQcm9ncmVzcykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RQcm9ncmVzc0Fic29ycHRpb24gPSBwcm9ncmVzc0Fic29ycHRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGh1cnJ5KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0UHJvZ3Jlc3MgPSBzbW9vdGhQcm9ncmVzcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyZXNzID0gc21vb3RoUHJvZ3Jlc3M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5TbW9vdGhpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNSZHlUb1NldEVuZFZhbHMoaHVycnkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJkeVRvU2V0RW5kVmFscyA9IFN5bmNQcm9tLnJlc29sdmUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZHlUb1NldEVuZFZhbHMudGhlbigoaHVycnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaHVycnkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY3VycmVudEZyYW1lID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNzID0gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGxLZXlzLmVhKChrZXkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudEZyYW1lW2tleV0gPSBjc1trZXldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50RnJhbWUudHJhbnNmb3JtICE9PSB1bmRlZmluZWQgJiYgZWxlbXNXaXRob3V0Q29uc2l0ZW50VHJhbnNmb3JtUHJvcHMuaW5jbHVkZXMoZWxlbXNXaXRob3V0Q29uc2l0ZW50VHJhbnNmb3JtUHJvcHNLZXkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzVHJhbnNQcm9wcy50cmFuc2Zvcm0gPSBjdXJyZW50RnJhbWUudHJhbnNmb3JtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtc1dpdGhvdXRDb25zaXRlbnRUcmFuc2Zvcm1Qcm9wcy5ybShlbGVtc1dpdGhvdXRDb25zaXRlbnRUcmFuc2Zvcm1Qcm9wc0tleSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRyYW5zZm9ybSA9IHRoaXNUcmFuc1Byb3BzLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHJhbnNmb3JtICE9PSBcIm5vbmVcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRGcmFtZS50cmFuc2Zvcm0gPSB0cmFuc2Zvcm07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgY3VycmVudEZyYW1lLnRyYW5zZm9ybTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jc3MoY3VycmVudEZyYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhbmltYXRlVmlhV2FhcGkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3NzQ2FuQmVVc2VkVG9GaWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0QW5pbWF0aW9uLmNhbmNlbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RBbmltYXRpb24gPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJvZ3Jlc3MgPT09IG1pbkFuaW1hdGlvblByb2dyZXNzIHx8IHByb2dyZXNzID09PSBtYXhBbmltYXRpb25Qcm9ncmVzcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvLm91dENiICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvLm91dENiID09PSBcInN0cmluZ1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1tvLm91dENiXSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvLm91dENiLmNhbGwodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZXQgZmlyc3QgPSB0cnVlO1xyXG4gICAgICAgIGxldCB2ZXJ5Rmlyc3QgPSB0cnVlO1xyXG4gICAgICAgIGd1aWRhbmNlLnN1YnNjcmliZSgocHJvZ3Jlc3MpID0+IHtcclxuICAgICAgICAgICAgYWJzdWx1dGVQcm9ncmVzcyA9IHByb2dyZXNzO1xyXG4gICAgICAgICAgICBpZiAobm90SW5MaW1pdENvcnJlY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh2ZXJ5Rmlyc3QpXHJcbiAgICAgICAgICAgICAgICB2ZXJ5Rmlyc3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKGZpcnN0KSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtc1dpdGhvdXRDb25zaXRlbnRUcmFuc2Zvcm1Qcm9wcy5hZGQoZWxlbXNXaXRob3V0Q29uc2l0ZW50VHJhbnNmb3JtUHJvcHNLZXkpO1xyXG4gICAgICAgICAgICAgICAgZmlyc3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59KTtcclxuZnVuY3Rpb24gc2V0S2V5ZnJhbWUoa2V5ZnJhbWUsIHRoYXQpIHtcclxuICAgIGRlbGV0ZSBrZXlmcmFtZS5vZmZzZXQ7XHJcbiAgICBmb3JtYXRDc3Moa2V5ZnJhbWUsIHRoYXQsIHN0eWxlUHJvcGVydHlBdHRyaWJ1dGVPZktleWZyYW1lKHRoYXQsIE9iamVjdC5rZXlzKGtleWZyYW1lKSksIGZhbHNlKTtcclxuICAgIGZvciAobGV0IHByb3AgaW4ga2V5ZnJhbWUpIHtcclxuICAgICAgICB0aGF0LnN0eWxlW3Byb3BdID0ga2V5ZnJhbWVbcHJvcF07XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gZXJyb3JBbmltYXRpb24odGhyZWFkLCB3b3JraW5nRnJhbWVzLCBwcm9ncmVzcywgdGhhdCwgZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoXCJVbmV4cGVjdGVkIGVycm9yIHdoaWxlIGFuaW1hdGluZyAoVGhyZWFkOiBcIiArIHRocmVhZCArIFwiKSB1c2luZyB0aGUgZm9sbG93aW5nIHBhcmFtZXRlcnNcXG5cXG5GcmFtZXM6IFwiLCB3b3JraW5nRnJhbWVzLCBcIlxcblByb2dyZXNzOiBcIiwgcHJvZ3Jlc3MsIFwiXFxuXFxuU2V0dGluZyBwcm9ncmVzc0Fic29ycHRpb24gdG8gMCB0byBwcmV2ZW50IGZ1cnRoZXIgZmFpbHVyZXMuXFxudGhpczogXCIsIHRoYXQsIFwiXFxuRXhjZXB0aW9uOiBcXG5cIiwgZXJyb3IpO1xyXG59XHJcbmNsYXNzIFN5bmNQcm9tIHtcclxuICAgIGNvbnN0cnVjdG9yKGNiKSB7XHJcbiAgICAgICAgdGhpcy5fdGhlbiA9IFtdO1xyXG4gICAgICAgIHRoaXMuaGFzQmVlblJlc2VkID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKGNiICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgY2IodGhpcy5fcmVzLmJpbmQodGhpcyksIHRoaXMuX3Jlai5iaW5kKHRoaXMpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVzID0gdGhpcy5fcmVzO1xyXG4gICAgICAgICAgICB0aGlzLnJlaiA9IHRoaXMuX3JlajtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgcmVzb2x2ZShyZXMpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFN5bmNQcm9tKChyKSA9PiB7IHIocmVzKTsgfSk7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgcmVqZWN0KCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgU3luY1Byb20oKHIsIG4pID0+IHsgbigpOyB9KTtcclxuICAgIH1cclxuICAgIF9yZXModmFsKSB7XHJcbiAgICAgICAgbGV0IHRoZW4gPSB0aGlzLl90aGVuO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGVuW2ldKHZhbCk7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGVuW2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmhhc0JlZW5SZXNlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5yZXNWYWwgPSB2YWw7XHJcbiAgICB9XHJcbiAgICBfcmVqKCkge1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLl90aGVuO1xyXG4gICAgICAgIHRoaXMuaGFzQmVlblJlc2VkID0gbnVsbDtcclxuICAgIH1cclxuICAgIHRoZW4odG8pIHtcclxuICAgICAgICBpZiAodGhpcy5oYXNCZWVuUmVzZWQpIHtcclxuICAgICAgICAgICAgdG8odGhpcy5yZXNWYWwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLmhhc0JlZW5SZXNlZCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl90aGVuLmFkZCh0byk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbi8vIHRyYW5zZm9ybSBwcm9wcyBkaXN0aW5ndWlzaFxyXG5mdW5jdGlvbiBjb252ZXJ0RnJhbWVTdHJ1Y3R1cmUob2IpIHtcclxuICAgIGxldCBtYXggPSAwO1xyXG4gICAgZm9yIChsZXQga2V5IGluIG9iKSB7XHJcbiAgICAgICAgbGV0IHggPSBvYltrZXldLmxlbmd0aDtcclxuICAgICAgICBpZiAobWF4IDwgeClcclxuICAgICAgICAgICAgbWF4ID0geDtcclxuICAgIH1cclxuICAgIGxldCBvID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1heDsgaSsrKSB7XHJcbiAgICAgICAgb1tpXSA9IHt9O1xyXG4gICAgfVxyXG4gICAgZm9yIChsZXQga2V5IGluIG9iKSB7XHJcbiAgICAgICAgb2Jba2V5XS5mb3JFYWNoKCh2YWwsIGkpID0+IHtcclxuICAgICAgICAgICAgb1tpXVtrZXldID0gdmFsO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG87XHJcbn1cclxuZnVuY3Rpb24gc2V0dXBCYWNrZ3JvdW5kVGFzayh0YXNrLCBjb25zdHJhaW50ID0geyB0aW1lOiAxNiwgdGltZW91dDogMTYgfSkge1xyXG4gICAgLy9AdHMtaWdub3JlXHJcbiAgICBpZiAoY29uc3RyYWludC50aW1lb3V0ID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgY29uc3RyYWludC50aW1lb3V0ID0gMTY7XHJcbiAgICBjb25zdCByZXF1ZXN0UXVldWUgPSBbXTtcclxuICAgIGxldCBpbXBvcnRhbmNlU3RydWN0dXJlSGFzQ2hhbmdlZCA9IGZhbHNlO1xyXG4gICAgbGV0IHJlY3Vyc2lvbk9uZ29pbmcgPSBmYWxzZTtcclxuICAgIGxldCBzdGFydDtcclxuICAgIGxldCBpdGVyYXRpb25zQXNDb25zdHJhaW50ID0gXCJpdGVyYXRpb25zXCIgaW4gY29uc3RyYWludDtcclxuICAgIGxldCBpbml0UmVjdXJzaW9uID0gaXRlcmF0aW9uc0FzQ29uc3RyYWludCA/ICgpID0+IHtcclxuICAgICAgICBzdGFydCA9IDA7XHJcbiAgICB9IDogKCkgPT4ge1xyXG4gICAgICAgIHN0YXJ0ID0gbmV3IERhdGUoKTtcclxuICAgIH07XHJcbiAgICBsZXQgY29tcGFpckNvbnN0cmFpbnQgPSBpdGVyYXRpb25zQXNDb25zdHJhaW50ID8gKCkgPT4ge1xyXG4gICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgIHN0YXJ0Kys7XHJcbiAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgcmV0dXJuIHN0YXJ0ID4gY29uc3RyYWludC5pdGVyYXRpb25zO1xyXG4gICAgfSA6ICgpID0+IHtcclxuICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICByZXR1cm4gbmV3IERhdGUoKSAtIHN0YXJ0ID4gY29uc3RyYWludC50aW1lO1xyXG4gICAgfTtcclxuICAgIGZ1bmN0aW9uIGNoYW5nZUltcG9ydGFuY2VTdHJ1Y3R1cmUoKSB7XHJcbiAgICAgICAgaW1wb3J0YW5jZVN0cnVjdHVyZUhhc0NoYW5nZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGV4ZWN1dGUocGFyYW1zLCBpbXBvcnRhbmNlID0gMCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpbXBvcnRhbmNlIGluc3RhbmNlb2YgRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgcmVxdWVzdFF1ZXVlLmFkZCh7IGltcG9ydGFuY2UsIHBhcmFtcywgcmVzIH0pO1xyXG4gICAgICAgICAgICAgICAgaW1wb3J0YW5jZS5zdWJzY3JpYmUoY2hhbmdlSW1wb3J0YW5jZVN0cnVjdHVyZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgcmVxdWVzdFF1ZXVlLmFkZCh7IGltcG9ydGFuY2U6IHsgdmFsOiBpbXBvcnRhbmNlIH0sIHBhcmFtcywgcmVzIH0pO1xyXG4gICAgICAgICAgICBpZiAoIXJlY3Vyc2lvbk9uZ29pbmcpIHtcclxuICAgICAgICAgICAgICAgIHJlY3Vyc2lvbk9uZ29pbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdFJlY3Vyc2lvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlY3Vyc2l2ZWx5Q2FsbEVsZW1zKCk7XHJcbiAgICAgICAgICAgICAgICB9LCAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIGFzeW5jIGZ1bmN0aW9uIHJlY3Vyc2l2ZWx5Q2FsbEVsZW1zKCkge1xyXG4gICAgICAgIGlmIChpbXBvcnRhbmNlU3RydWN0dXJlSGFzQ2hhbmdlZCkge1xyXG4gICAgICAgICAgICBzb3J0UmVxdWVzdFF1ZXVlKCk7XHJcbiAgICAgICAgICAgIGltcG9ydGFuY2VTdHJ1Y3R1cmVIYXNDaGFuZ2VkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghcmVxdWVzdFF1ZXVlLmVtcHR5KSB7XHJcbiAgICAgICAgICAgIGxldCBlbGVtID0gcmVxdWVzdFF1ZXVlLmZpcnN0O1xyXG4gICAgICAgICAgICBlbGVtLnJlcyh0YXNrKC4uLmVsZW0ucGFyYW1zKSk7XHJcbiAgICAgICAgICAgIHJlcXVlc3RRdWV1ZS5ybUkoMCk7XHJcbiAgICAgICAgICAgIGlmIChjb21wYWlyQ29uc3RyYWludCgpKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpbml0UmVjdXJzaW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVjdXJzaXZlbHlDYWxsRWxlbXMoKTtcclxuICAgICAgICAgICAgICAgIH0sIGNvbnN0cmFpbnQudGltZW91dCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgcmVjdXJzaXZlbHlDYWxsRWxlbXMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJlY3Vyc2lvbk9uZ29pbmcgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBzb3J0UmVxdWVzdFF1ZXVlKCkge1xyXG4gICAgICAgIHJlcXVlc3RRdWV1ZS5zb3J0KCh7IGltcG9ydGFuY2U6IGEgfSwgeyBpbXBvcnRhbmNlOiBiIH0pID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGEudmFsIC0gYi52YWw7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gcHJvZ3Jlc3NUb1NhdmVQcm9ncmVzcyhwcm9ncmVzcykge1xyXG4gICAgaWYgKHByb2dyZXNzIDwgbWluQW5pbWF0aW9uUHJvZ3Jlc3MpXHJcbiAgICAgICAgcHJvZ3Jlc3MgPSBtaW5BbmltYXRpb25Qcm9ncmVzcztcclxuICAgIGVsc2UgaWYgKHByb2dyZXNzID4gbWF4QW5pbWF0aW9uUHJvZ3Jlc3MpXHJcbiAgICAgICAgcHJvZ3Jlc3MgPSBtYXhBbmltYXRpb25Qcm9ncmVzcztcclxuICAgIHJldHVybiBwcm9ncmVzcztcclxufVxyXG5sZXQgZ2V0U3R5bGVBdFByb2dyZXNzID0gKCgpID0+IHtcclxuICAgIC8vIFRPRE86IERvbnQgYWx3YXlzIHVzZSB3YWFwaSB0byBpbnRlcnBvbGF0ZS4gRm9yIHNpbXBsZSBudW1lcmljIHZhbHVlcyB5b3UgY291bGQgdXNlIFR3ZWVuT2JqZWN0XHJcbiAgICAvLyBUT0RPOiBEb250IGFsd2F5cyBjcmVhdGUgbmV3IFRyYW5zZnJvbSBwcm9wIHRvIGNhbGMgaXQuIEV2ZXJ5IGVsZW1lbnRzIGF0IHRoaXMgcG9pbnQgbXVzdCBoYXZlIFxyXG4gICAgLy8gb25lLiBBbmQgaXQgbXVzdCBiZSBjb25zaXN0YW50LCBhcyBmYXIgYXMgSSBhbSBjb25jZXJuZWQuIEJ1dCBjaGVjayBpZiB3aGVuIHRoZSBjbGVhbnVwIG9mIHRoZVxyXG4gICAgLy8gbGFzdCBhbmltYXRpb24gaXMgY2FsbGVkLlxyXG4gICAgY29uc3QgbGluZWFyID0gXCJsaW5lYXJcIjtcclxuICAgIGNvbnN0IGJvdGggPSBcImJvdGhcIjtcclxuICAgIHJldHVybiBzZXR1cEJhY2tncm91bmRUYXNrKGdldFN0eWxlQXRQcm9ncmVzcyk7XHJcbiAgICBmdW5jdGlvbiBnZXRTdHlsZUF0UHJvZ3Jlc3MoZnJhbWVzLCBpbnRyZXN0LCBlbCwgcGFyc2VJbmRleE1hcCkge1xyXG4gICAgICAgIGxldCB7IGtleXMgfSA9IGludHJlc3Q7XHJcbiAgICAgICAgbGV0IHRyYW5zZm9ybUtleXMgPSBbXTtcclxuICAgICAgICBrZXlzLmVhKChlLCBpKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChUcmFuc2Zvcm1Qcm9wLmFwcGxpZXMoZSkpXHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm1LZXlzLmFkZChpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBrZXlzLnJtSSguLi50cmFuc2Zvcm1LZXlzKTtcclxuICAgICAgICBmcmFtZXMuZWEoKGZyYW1lKSA9PiB7XHJcbiAgICAgICAgICAgIGZvcm1hdENzcyhmcmFtZSwgdHJ1ZSwgcGFyc2VJbmRleE1hcCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IGFuaW1hdGlvbiA9IGVsLmFuaW1hdGUoZnJhbWVzLCB7XHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAsXHJcbiAgICAgICAgICAgIGZpbGw6IGJvdGgsXHJcbiAgICAgICAgICAgIGVhc2luZzogbGluZWFyLFxyXG4gICAgICAgICAgICBpdGVyYXRpb25zOiAxLFxyXG4gICAgICAgICAgICBpdGVyYXRpb25TdGFydDogcHJvZ3Jlc3NUb1NhdmVQcm9ncmVzcyhpbnRyZXN0LmF0KVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCByZXMgPSB7fTtcclxuICAgICAgICBsZXQgY3MgPSBnZXRDb21wdXRlZFN0eWxlKGVsKTtcclxuICAgICAgICBpZiAoIXRyYW5zZm9ybUtleXMuZW1wdHkpIHtcclxuICAgICAgICAgICAgbGV0IHQgPSBuZXcgVHJhbnNmb3JtUHJvcCgpO1xyXG4gICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgdC50cmFuc2Zvcm0gPSBjcy50cmFuc2Zvcm07XHJcbiAgICAgICAgICAgIHRyYW5zZm9ybUtleXMuZWEoKGtleSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmVzW2tleV0gPSB0LnByaW1pdGl2ZXNba2V5XTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGsgb2Yga2V5cykge1xyXG4gICAgICAgICAgICByZXNba10gPSBjc1trXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYW5pbWF0aW9uLmNhbmNlbCgpO1xyXG4gICAgICAgIHJldHVybiByZXM7XHJcbiAgICB9XHJcbn0pKCk7XHJcbiIsImltcG9ydCB7IGNvbnN0cnVjdEFwcGx5VG9Qcm90b3R5cGUgfSBmcm9tIFwiYXR0YXRjaC10by1wcm90b3R5cGVcIjtcclxuY29uc3QgZGVmYXVsdE9wdGlvbnMgPSB7IGVudW1lcmFibGU6IHRydWUgfTtcclxuLy8gYXBwbHkgKHRvKSBUYXJnZXRcclxuZXhwb3J0IGNvbnN0IGF0ID0gY29uc3RydWN0QXBwbHlUb1Byb3RvdHlwZShFdmVudFRhcmdldC5wcm90b3R5cGUsIGRlZmF1bHRPcHRpb25zKTtcclxuLy8gYXBwbHkgKHRvKSBFbGVtZW50XHJcbmV4cG9ydCBjb25zdCBhZSA9IGNvbnN0cnVjdEFwcGx5VG9Qcm90b3R5cGUoRWxlbWVudC5wcm90b3R5cGUsIGRlZmF1bHRPcHRpb25zKTtcclxuIiwiaW1wb3J0IHsgcGFyc2UgYXMgcGFyc2VTdmdQYXRoIH0gZnJvbSBcInR3ZWVuLXN2Zy1wYXRoXCI7XHJcbmltcG9ydCBjbG9uZSBmcm9tIFwidGlueS1jbG9uZVwiO1xyXG5jb25zdCBzdHlsZUluID0ge307XHJcbmNvbnN0IGF0dHJJbiA9IHt9O1xyXG5jb25zdCBwcm9wSW4gPSB7fTtcclxuZXhwb3J0IGNvbnN0IHBhcnNlSW4gPSB7IHN0eWxlOiBzdHlsZUluLCBwcm9wOiBwcm9wSW4sIGF0dHI6IGF0dHJJbiB9O1xyXG5jb25zdCBhdHRyT3V0ID0ge307XHJcbmNvbnN0IHByb3BPdXQgPSB7fTtcclxuZXhwb3J0IGNvbnN0IHBhcnNlT3V0ID0geyBzdHlsZToge30sIHByb3A6IGF0dHJPdXQsIGF0dHI6IHByb3BPdXQgfTtcclxubGV0IGhhc1B4ID0gW1wieFwiLCBcInlcIiwgXCJ6XCIsIFwidHJhbnNsYXRlWFwiLCBcInRyYW5zbGF0ZVlcIiwgXCJ0cmFuc2xhdGVaXCIsIFwicm90YXRlXCIsIFwicm90YXRlM2RcIiwgXCJ0cmFuc2xhdGVcIiwgXCJ0cmFuc2xhdGUzZFwiLCBcImJhY2tncm91bmRTaXplXCIsIFwiYm9yZGVyXCIsIFwiYm9yZGVyQm90dG9tXCIsIFwiYm9yZGVyQm90dG9tTGVmdFJhZGl1c1wiLCBcImJvcmRlckJvdHRvbVJpZ2h0UmFkaXVzXCIsIFwiYm9yZGVyQm90dG9tV2lkdGhcIiwgXCJib3JkZXJMZWZ0XCIsIFwiYm9yZGVyTGVmdFdpZHRoXCIsIFwiYm9yZGVyUmFkaXVzXCIsIFwiYm9yZGVyUmlnaHRcIiwgXCJib3JkZXJSaWdodFdpZHRoXCIsIFwiYm9yZGVyVG9wXCIsIFwiYm9yZGVyVG9wTGVmdFJhZGl1c1wiLCBcImJvcmRlclRvcFJpZ2h0UmFkaXVzXCIsIFwiYm9yZGVyVG9wV2lkdGhcIiwgXCJib3JkZXJXaWR0aFwiLCBcImJvdHRvbVwiLCBcImNvbHVtbkdhcFwiLCBcImNvbHVtblJ1bGVXaWR0aFwiLCBcImNvbHVtbldpZHRoXCIsIFwiY29sdW1uc1wiLCBcImZsZXhCYXNpc1wiLCBcImZvbnRcIiwgXCJmb250U2l6ZVwiLCBcImdyaWRDb2x1bW5HYXBcIiwgXCJncmlkR2FwXCIsIFwiZ3JpZFJvd0dhcFwiLCBcImhlaWdodFwiLCBcImxlZnRcIiwgXCJsZXR0ZXJTcGFjaW5nXCIsIFwibGluZUhlaWdodFwiLCBcIm1hcmdpblwiLCBcIm1hcmdpbkJvdHRvbVwiLCBcIm1hcmdpbkxlZnRcIiwgXCJtYXJnaW5SaWdodFwiLCBcIm1hcmdpblRvcFwiLCBcIm1hc2tTaXplXCIsIFwibWF4SGVpZ2h0XCIsIFwibWF4V2lkdGhcIiwgXCJtaW5IZWlnaHRcIiwgXCJtaW5XaWR0aFwiLCBcIm91dGxpbmVcIiwgXCJvdXRsaW5lT2Zmc2V0XCIsIFwib3V0bGluZVdpZHRoXCIsIFwicGFkZGluZ1wiLCBcInBhZGRpbmdCb3R0b21cIiwgXCJwYWRkaW5nTGVmdFwiLCBcInBhZGRpbmdSaWdodFwiLCBcInBhZGRpbmdUb3BcIiwgXCJwZXJzcGVjdGl2ZVwiLCBcInJpZ2h0XCIsIFwic2hhcGVNYXJnaW5cIiwgXCJ0YWJTaXplXCIsIFwidG9wXCIsIFwid2lkdGhcIiwgXCJ3b3JkU3BhY2luZ1wiXTtcclxubGV0IGhhc0RlZyA9IFtcInJvdGF0ZVhcIiwgXCJyb3RhdGVZXCIsIFwicm90YXRlWlwiLCBcInJvdGF0ZVwiLCBcInNrZXdYXCIsIFwic2tld1lcIiwgXCJza2V3XCJdO1xyXG5sZXQgcHggPSBcInB4XCI7XHJcbmxldCBkZWcgPSBcImRlZ1wiO1xyXG5oYXNQeC5lYSgoZSkgPT4ge1xyXG4gICAgc3R5bGVJbltlXSA9IHB4O1xyXG59KTtcclxuaGFzRGVnLmVhKChlKSA9PiB7XHJcbiAgICBzdHlsZUluW2VdID0gZGVnO1xyXG59KTtcclxuZnVuY3Rpb24gc3RhcnRzV2l0aChwcmUpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoc3R5bGUpIHtcclxuICAgICAgICByZXR1cm4gc3R5bGUuc3Vic3RyKDAsIHByZS5sZW5ndGgpID09PSBwcmU7XHJcbiAgICB9O1xyXG59XHJcbmZ1bmN0aW9uIGVuZHNXaXRoKHBvc3QpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoc3R5bGUpIHtcclxuICAgICAgICByZXR1cm4gc3R5bGUuc3Vic3RyKHN0eWxlLmxlbmd0aCAtIHBvc3QubGVuZ3RoKSA9PT0gcG9zdDtcclxuICAgIH07XHJcbn1cclxuZnVuY3Rpb24gb3B0aW9uYWxQcmVQb3N0Rml4KHByZSwgcG9zdCkge1xyXG4gICAgY29uc3Qgc3RhcnQgPSBzdGFydHNXaXRoKHByZSk7XHJcbiAgICBjb25zdCBlbmQgPSBlbmRzV2l0aChwb3N0KTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoc3R5bGUpIHtcclxuICAgICAgICBpZiAoc3RhcnQoc3R5bGUpKVxyXG4gICAgICAgICAgICBzdHlsZSA9IHByZSArIHN0eWxlO1xyXG4gICAgICAgIGlmIChlbmQoc3R5bGUpKVxyXG4gICAgICAgICAgICBzdHlsZSArPSBwb3N0O1xyXG4gICAgICAgIHJldHVybiBzdHlsZTtcclxuICAgIH07XHJcbn1cclxuZnVuY3Rpb24gZGVsZXRlSWZGb3VuZCguLi5xdWVyeSkge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChzdHlsZSkge1xyXG4gICAgICAgIHF1ZXJ5LmVhKChlKSA9PiB7XHJcbiAgICAgICAgICAgIHN0eWxlID0gc3R5bGUuc3BsaXQoZSkuam9pbihcIlwiKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gc3R5bGU7XHJcbiAgICB9O1xyXG59XHJcbnN0eWxlSW4uYmFja2dyb3VuZEltYWdlID0gb3B0aW9uYWxQcmVQb3N0Rml4KFwidXJsKFwiLCBcIilcIik7XHJcbi8vIGNvbnN0IHN0YXJ0c1dpdGhQYXRoID0gc3RhcnRzV2l0aChcInBhdGgoXCIpXHJcbi8vIGNvbnN0IGVuZHNXaXRoQnJhY2tldCA9IGVuZHNXaXRoKFwiKVwiKVxyXG5jb25zdCBkZWxldGVQYXRoUHJlZml4ZXMgPSBkZWxldGVJZkZvdW5kKFwicGF0aChcXFwiXCIsIFwiXFxcIilcIiwgXCJwYXRoKCdcIiwgXCInKVwiLCBcInBhdGgoYFwiLCBcImApXCIpO1xyXG5zdHlsZUluLmQgPSAoc3R5bGUpID0+IHtcclxuICAgIHN0eWxlID0gZGVsZXRlUGF0aFByZWZpeGVzKHN0eWxlKTtcclxuICAgIHN0eWxlID0gcGFyc2VTdmdQYXRoLnRvUGF0aChwYXJzZVN2Z1BhdGgudG9PYmplY3Qoc3R5bGUpKTtcclxuICAgIHN0eWxlID0gXCJwYXRoKFxcXCJcIiArIHN0eWxlICsgXCJcXFwiKVwiO1xyXG4gICAgcmV0dXJuIHN0eWxlO1xyXG59O1xyXG5wcm9wSW4uZCA9IGF0dHJJbi5kID0gKHN0eWxlKSA9PiB7XHJcbiAgICByZXR1cm4gcGFyc2VTdmdQYXRoLnRvT2JqZWN0KGRlbGV0ZVBhdGhQcmVmaXhlcyhzdHlsZSkpO1xyXG59O1xyXG5wcm9wT3V0LmQgPSBhdHRyT3V0LmQgPSAoc3R5bGUpID0+IHtcclxuICAgIC8vIFRPRE86IGNoZWNrIGlmIHRoaXMgZXZlbiBoYXMgYW55IHBlcmZvcm1hY2UgYmVuZWZpdHNcclxuICAgIHN0eWxlID0gY2xvbmUoc3R5bGUpO1xyXG4gICAgc3R5bGUuZWEoKHMpID0+IHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgc1tpXSA9IChNYXRoLnJvdW5kKHNbaV0gKiAxMDApIC8gMTAwKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBwYXJzZVN2Z1BhdGgudG9QYXRoKHN0eWxlKTtcclxufTtcclxuIiwiZXhwb3J0IGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICBsZXQgcHJvbXMgPSBbXTtcclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFxcXFxcclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFxcXFxcclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tXHJcbiAgICAvLyBSZXNpemVPYnNlcnZlclxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS1cclxuICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgaWYgKHdpbmRvdy5SZXNpemVPYnNlcnZlciA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcHJvbXMuYWRkKGltcG9ydCgvKiB3ZWJwYWNrQ2h1bmtOYW1lOiBcInJlc2l6ZU9ic2VydmVyUG9seWZpbGxcIiAqLyBcInJlc2l6ZS1vYnNlcnZlci1wb2x5ZmlsbFwiKS50aGVuKCh7IGRlZmF1bHQ6IHIgfSkgPT4geyBwb2x5ZmlsbHMuUmVzaXplT2JzZXJ2ZXIgPSByOyB9KSk7XHJcbiAgICB9XHJcbiAgICAvL0B0cy1pZ25vcmVcclxuICAgIGVsc2VcclxuICAgICAgICBwb2x5ZmlsbHMuUmVzaXplT2JzZXJ2ZXIgPSB3aW5kb3cuUmVzaXplT2JzZXJ2ZXI7XHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvLyB3ZWJBbmltYXRpb25zQXBpXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBpZiAoRWxlbWVudC5wcm90b3R5cGUuYW5pbWF0ZSA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIHByb21zLmFkZChpbXBvcnQoLyogd2VicGFja0NodW5rTmFtZTogXCJ3ZWJBbmltYXRpb25zQXBpUG9seWZpbGxcIiAqLyBcIndlYi1hbmltYXRpb25zLWpzXCIpKTtcclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFxcXFxcclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFxcXFxcclxuICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9tcyk7XHJcbn1cclxuZXhwb3J0IGNvbnN0IHBvbHlmaWxscyA9IHt9O1xyXG4iLCIoZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBmYWN0b3J5KGV4cG9ydHMpIDpcbiAgdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKFsnZXhwb3J0cyddLCBmYWN0b3J5KSA6XG4gIChnbG9iYWwgPSBnbG9iYWwgfHwgc2VsZiwgZmFjdG9yeShnbG9iYWxbJ2Zhc3QtZXF1YWxzJ10gPSB7fSkpO1xufSh0aGlzLCBmdW5jdGlvbiAoZXhwb3J0cykgeyAndXNlIHN0cmljdCc7XG5cbiAgdmFyIEhBU19XRUFLU0VUX1NVUFBPUlQgPSB0eXBlb2YgV2Vha1NldCA9PT0gJ2Z1bmN0aW9uJztcclxuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzO1xyXG4gIC8qKlxyXG4gICAqIEBmdW5jdGlvbiBhZGRUb0NhY2hlXHJcbiAgICpcclxuICAgKiBhZGQgb2JqZWN0IHRvIGNhY2hlIGlmIGFuIG9iamVjdFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHZhbHVlIHRoZSB2YWx1ZSB0byBwb3RlbnRpYWxseSBhZGQgdG8gY2FjaGVcclxuICAgKiBAcGFyYW0gY2FjaGUgdGhlIGNhY2hlIHRvIGFkZCB0b1xyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIGFkZFRvQ2FjaGUodmFsdWUsIGNhY2hlKSB7XHJcbiAgICAgIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICBjYWNoZS5hZGQodmFsdWUpO1xyXG4gICAgICB9XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIEBmdW5jdGlvbiBoYXNQYWlyXHJcbiAgICpcclxuICAgKiBAZGVzY3JpcHRpb25cclxuICAgKiBkb2VzIHRoZSBgcGFpclRvTWF0Y2hgIGV4aXN0IGluIHRoZSBsaXN0IG9mIGBwYWlyc2AgcHJvdmlkZWQgYmFzZWQgb24gdGhlXHJcbiAgICogYGlzRXF1YWxgIGNoZWNrXHJcbiAgICpcclxuICAgKiBAcGFyYW0gcGFpcnMgdGhlIHBhaXJzIHRvIGNvbXBhcmUgYWdhaW5zdFxyXG4gICAqIEBwYXJhbSBwYWlyVG9NYXRjaCB0aGUgcGFpciB0byBtYXRjaFxyXG4gICAqIEBwYXJhbSBpc0VxdWFsIHRoZSBlcXVhbGl0eSBjb21wYXJhdG9yIHVzZWRcclxuICAgKiBAcGFyYW0gbWV0YSB0aGUgbWV0YSBwcm92aWRlZFxyXG4gICAqIEByZXR1cm5zIGRvZXMgdGhlIHBhaXIgZXhpc3QgaW4gdGhlIHBhaXJzIHByb3ZpZGVkXHJcbiAgICovXHJcbiAgZnVuY3Rpb24gaGFzUGFpcihwYWlycywgcGFpclRvTWF0Y2gsIGlzRXF1YWwsIG1ldGEpIHtcclxuICAgICAgdmFyIGxlbmd0aCA9IHBhaXJzLmxlbmd0aDtcclxuICAgICAgdmFyIHBhaXI7XHJcbiAgICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgIHBhaXIgPSBwYWlyc1tpbmRleF07XHJcbiAgICAgICAgICBpZiAoaXNFcXVhbChwYWlyWzBdLCBwYWlyVG9NYXRjaFswXSwgbWV0YSkgJiZcclxuICAgICAgICAgICAgICBpc0VxdWFsKHBhaXJbMV0sIHBhaXJUb01hdGNoWzFdLCBtZXRhKSkge1xyXG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogQGZ1bmN0aW9uIGhhc1ZhbHVlXHJcbiAgICpcclxuICAgKiBAZGVzY3JpcHRpb25cclxuICAgKiBkb2VzIHRoZSBgdmFsdWVUb01hdGNoYCBleGlzdCBpbiB0aGUgbGlzdCBvZiBgdmFsdWVzYCBwcm92aWRlZCBiYXNlZCBvbiB0aGVcclxuICAgKiBgaXNFcXVhbGAgY2hlY2tcclxuICAgKlxyXG4gICAqIEBwYXJhbSB2YWx1ZXMgdGhlIHZhbHVlcyB0byBjb21wYXJlIGFnYWluc3RcclxuICAgKiBAcGFyYW0gdmFsdWVUb01hdGNoIHRoZSB2YWx1ZSB0byBtYXRjaFxyXG4gICAqIEBwYXJhbSBpc0VxdWFsIHRoZSBlcXVhbGl0eSBjb21wYXJhdG9yIHVzZWRcclxuICAgKiBAcGFyYW0gbWV0YSB0aGUgbWV0YSBwcm92aWRlZFxyXG4gICAqIEByZXR1cm5zIGRvZXMgdGhlIHZhbHVlIGV4aXN0IGluIHRoZSB2YWx1ZXMgcHJvdmlkZWRcclxuICAgKi9cclxuICBmdW5jdGlvbiBoYXNWYWx1ZSh2YWx1ZXMsIHZhbHVlVG9NYXRjaCwgaXNFcXVhbCwgbWV0YSkge1xyXG4gICAgICB2YXIgbGVuZ3RoID0gdmFsdWVzLmxlbmd0aDtcclxuICAgICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgaWYgKGlzRXF1YWwodmFsdWVzW2luZGV4XSwgdmFsdWVUb01hdGNoLCBtZXRhKSkge1xyXG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogQGZ1bmN0aW9uIHNhbWVWYWx1ZVplcm9FcXVhbFxyXG4gICAqXHJcbiAgICogQGRlc2NyaXB0aW9uXHJcbiAgICogYXJlIHRoZSB2YWx1ZXMgcGFzc2VkIHN0cmljdGx5IGVxdWFsIG9yIGJvdGggTmFOXHJcbiAgICpcclxuICAgKiBAcGFyYW0gYSB0aGUgdmFsdWUgdG8gY29tcGFyZSBhZ2FpbnN0XHJcbiAgICogQHBhcmFtIGIgdGhlIHZhbHVlIHRvIHRlc3RcclxuICAgKiBAcmV0dXJucyBhcmUgdGhlIHZhbHVlcyBlcXVhbCBieSB0aGUgU2FtZVZhbHVlWmVybyBwcmluY2lwbGVcclxuICAgKi9cclxuICBmdW5jdGlvbiBzYW1lVmFsdWVaZXJvRXF1YWwoYSwgYikge1xyXG4gICAgICByZXR1cm4gYSA9PT0gYiB8fCAoYSAhPT0gYSAmJiBiICE9PSBiKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogQGZ1bmN0aW9uIGlzUGxhaW5PYmplY3RcclxuICAgKlxyXG4gICAqIEBkZXNjcmlwdGlvblxyXG4gICAqIGlzIHRoZSB2YWx1ZSBhIHBsYWluIG9iamVjdFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHZhbHVlIHRoZSB2YWx1ZSB0byB0ZXN0XHJcbiAgICogQHJldHVybnMgaXMgdGhlIHZhbHVlIGEgcGxhaW4gb2JqZWN0XHJcbiAgICovXHJcbiAgZnVuY3Rpb24gaXNQbGFpbk9iamVjdCh2YWx1ZSkge1xyXG4gICAgICByZXR1cm4gdmFsdWUuY29uc3RydWN0b3IgPT09IE9iamVjdCB8fCB2YWx1ZS5jb25zdHJ1Y3RvciA9PSBudWxsO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBAZnVuY3Rpb24gaXNQcm9taXNlTGlrZVxyXG4gICAqXHJcbiAgICogQGRlc2NyaXB0aW9uXHJcbiAgICogaXMgdGhlIHZhbHVlIHByb21pc2UtbGlrZSAobWVhbmluZyBpdCBpcyB0aGVuYWJsZSlcclxuICAgKlxyXG4gICAqIEBwYXJhbSB2YWx1ZSB0aGUgdmFsdWUgdG8gdGVzdFxyXG4gICAqIEByZXR1cm5zIGlzIHRoZSB2YWx1ZSBwcm9taXNlLWxpa2VcclxuICAgKi9cclxuICBmdW5jdGlvbiBpc1Byb21pc2VMaWtlKHZhbHVlKSB7XHJcbiAgICAgIHJldHVybiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZS50aGVuID09PSAnZnVuY3Rpb24nO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBAZnVuY3Rpb24gaXNSZWFjdEVsZW1lbnRcclxuICAgKlxyXG4gICAqIEBkZXNjcmlwdGlvblxyXG4gICAqIGlzIHRoZSB2YWx1ZSBwYXNzZWQgYSByZWFjdCBlbGVtZW50XHJcbiAgICpcclxuICAgKiBAcGFyYW0gdmFsdWUgdGhlIHZhbHVlIHRvIHRlc3RcclxuICAgKiBAcmV0dXJucyBpcyB0aGUgdmFsdWUgYSByZWFjdCBlbGVtZW50XHJcbiAgICovXHJcbiAgZnVuY3Rpb24gaXNSZWFjdEVsZW1lbnQodmFsdWUpIHtcclxuICAgICAgcmV0dXJuICEhKHZhbHVlICYmIHZhbHVlLiQkdHlwZW9mKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogQGZ1bmN0aW9uIGdldE5ld0NhY2hlRmFsbGJhY2tcclxuICAgKlxyXG4gICAqIEBkZXNjcmlwdGlvblxyXG4gICAqIGluIGNhc2VzIHdoZXJlIFdlYWtTZXQgaXMgbm90IHN1cHBvcnRlZCwgY3JlYXRlcyBhIG5ldyBjdXN0b21cclxuICAgKiBvYmplY3QgdGhhdCBtaW1pY3MgdGhlIG5lY2Vzc2FyeSBBUEkgYXNwZWN0cyBmb3IgY2FjaGUgcHVycG9zZXNcclxuICAgKlxyXG4gICAqIEByZXR1cm5zIHRoZSBuZXcgY2FjaGUgb2JqZWN0XHJcbiAgICovXHJcbiAgZnVuY3Rpb24gZ2V0TmV3Q2FjaGVGYWxsYmFjaygpIHtcclxuICAgICAgcmV0dXJuIE9iamVjdC5jcmVhdGUoe1xyXG4gICAgICAgICAgX3ZhbHVlczogW10sXHJcbiAgICAgICAgICBhZGQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgIHRoaXMuX3ZhbHVlcy5wdXNoKHZhbHVlKTtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBoYXM6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLl92YWx1ZXMuaW5kZXhPZih2YWx1ZSkgIT09IC0xO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgfSk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIEBmdW5jdGlvbiBnZXROZXdDYWNoZVxyXG4gICAqXHJcbiAgICogQGRlc2NyaXB0aW9uXHJcbiAgICogZ2V0IGEgbmV3IGNhY2hlIG9iamVjdCB0byBwcmV2ZW50IGNpcmN1bGFyIHJlZmVyZW5jZXNcclxuICAgKlxyXG4gICAqIEByZXR1cm5zIHRoZSBuZXcgY2FjaGUgb2JqZWN0XHJcbiAgICovXHJcbiAgdmFyIGdldE5ld0NhY2hlID0gKGZ1bmN0aW9uIChjYW5Vc2VXZWFrTWFwKSB7XHJcbiAgICAgIGlmIChjYW5Vc2VXZWFrTWFwKSB7XHJcbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gX2dldE5ld0NhY2hlKCkge1xyXG4gICAgICAgICAgICAgIHJldHVybiBuZXcgV2Vha1NldCgpO1xyXG4gICAgICAgICAgfTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gZ2V0TmV3Q2FjaGVGYWxsYmFjaztcclxuICB9KShIQVNfV0VBS1NFVF9TVVBQT1JUKTtcclxuICAvKipcclxuICAgKiBAZnVuY3Rpb24gY3JlYXRlQ2lyY3VsYXJFcXVhbENyZWF0b3JcclxuICAgKlxyXG4gICAqIEBkZXNjcmlwdGlvblxyXG4gICAqIGNyZWF0ZSBhIGN1c3RvbSBpc0VxdWFsIGhhbmRsZXIgc3BlY2lmaWMgdG8gY2lyY3VsYXIgb2JqZWN0c1xyXG4gICAqXHJcbiAgICogQHBhcmFtIFtpc0VxdWFsXSB0aGUgaXNFcXVhbCBjb21wYXJhdG9yIHRvIHVzZSBpbnN0ZWFkIG9mIGlzRGVlcEVxdWFsXHJcbiAgICogQHJldHVybnMgdGhlIG1ldGhvZCB0byBjcmVhdGUgdGhlIGBpc0VxdWFsYCBmdW5jdGlvblxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIGNyZWF0ZUNpcmN1bGFyRXF1YWxDcmVhdG9yKGlzRXF1YWwpIHtcclxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIGNyZWF0ZUNpcmN1bGFyRXF1YWwoY29tcGFyYXRvcikge1xyXG4gICAgICAgICAgdmFyIF9jb21wYXJhdG9yID0gaXNFcXVhbCB8fCBjb21wYXJhdG9yO1xyXG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIGNpcmN1bGFyRXF1YWwoYSwgYiwgY2FjaGUpIHtcclxuICAgICAgICAgICAgICBpZiAoY2FjaGUgPT09IHZvaWQgMCkgeyBjYWNoZSA9IGdldE5ld0NhY2hlKCk7IH1cclxuICAgICAgICAgICAgICB2YXIgaGFzQSA9IGNhY2hlLmhhcyhhKTtcclxuICAgICAgICAgICAgICB2YXIgaGFzQiA9IGNhY2hlLmhhcyhiKTtcclxuICAgICAgICAgICAgICBpZiAoaGFzQSB8fCBoYXNCKSB7XHJcbiAgICAgICAgICAgICAgICAgIHJldHVybiBoYXNBICYmIGhhc0I7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGFkZFRvQ2FjaGUoYSwgY2FjaGUpO1xyXG4gICAgICAgICAgICAgIGFkZFRvQ2FjaGUoYiwgY2FjaGUpO1xyXG4gICAgICAgICAgICAgIHJldHVybiBfY29tcGFyYXRvcihhLCBiLCBjYWNoZSk7XHJcbiAgICAgICAgICB9O1xyXG4gICAgICB9O1xyXG4gIH1cclxuICAvKipcclxuICAgKiBAZnVuY3Rpb24gdG9QYWlyc1xyXG4gICAqXHJcbiAgICogQGRlc2NyaXB0aW9uXHJcbiAgICogY29udmVydCB0aGUgbWFwIHBhc3NlZCBpbnRvIHBhaXJzIChtZWFuaW5nIGFuIGFycmF5IG9mIFtrZXksIHZhbHVlXSB0dXBsZXMpXHJcbiAgICpcclxuICAgKiBAcGFyYW0gbWFwIHRoZSBtYXAgdG8gY29udmVydCB0byBba2V5LCB2YWx1ZV0gcGFpcnMgKGVudHJpZXMpXHJcbiAgICogQHJldHVybnMgdGhlIFtrZXksIHZhbHVlXSBwYWlyc1xyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIHRvUGFpcnMobWFwKSB7XHJcbiAgICAgIHZhciBwYWlycyA9IG5ldyBBcnJheShtYXAuc2l6ZSk7XHJcbiAgICAgIHZhciBpbmRleCA9IDA7XHJcbiAgICAgIG1hcC5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XHJcbiAgICAgICAgICBwYWlyc1tpbmRleCsrXSA9IFtrZXksIHZhbHVlXTtcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiBwYWlycztcclxuICB9XHJcbiAgLyoqXHJcbiAgICogQGZ1bmN0aW9uIHRvVmFsdWVzXHJcbiAgICpcclxuICAgKiBAZGVzY3JpcHRpb25cclxuICAgKiBjb252ZXJ0IHRoZSBzZXQgcGFzc2VkIGludG8gdmFsdWVzXHJcbiAgICpcclxuICAgKiBAcGFyYW0gc2V0IHRoZSBzZXQgdG8gY29udmVydCB0byB2YWx1ZXNcclxuICAgKiBAcmV0dXJucyB0aGUgdmFsdWVzXHJcbiAgICovXHJcbiAgZnVuY3Rpb24gdG9WYWx1ZXMoc2V0KSB7XHJcbiAgICAgIHZhciB2YWx1ZXMgPSBuZXcgQXJyYXkoc2V0LnNpemUpO1xyXG4gICAgICB2YXIgaW5kZXggPSAwO1xyXG4gICAgICBzZXQuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgIHZhbHVlc1tpbmRleCsrXSA9IHZhbHVlO1xyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIHZhbHVlcztcclxuICB9XHJcbiAgLyoqXHJcbiAgICogQGZ1bmN0aW9uIGFyZUFycmF5c0VxdWFsXHJcbiAgICpcclxuICAgKiBAZGVzY3JpcHRpb25cclxuICAgKiBhcmUgdGhlIGFycmF5cyBlcXVhbCBpbiB2YWx1ZVxyXG4gICAqXHJcbiAgICogQHBhcmFtIGEgdGhlIGFycmF5IHRvIHRlc3RcclxuICAgKiBAcGFyYW0gYiB0aGUgYXJyYXkgdG8gdGVzdCBhZ2FpbnN0XHJcbiAgICogQHBhcmFtIGlzRXF1YWwgdGhlIGNvbXBhcmF0b3IgdG8gZGV0ZXJtaW5lIGVxdWFsaXR5XHJcbiAgICogQHBhcmFtIG1ldGEgdGhlIG1ldGEgb2JqZWN0IHRvIHBhc3MgdGhyb3VnaFxyXG4gICAqIEByZXR1cm5zIGFyZSB0aGUgYXJyYXlzIGVxdWFsXHJcbiAgICovXHJcbiAgZnVuY3Rpb24gYXJlQXJyYXlzRXF1YWwoYSwgYiwgaXNFcXVhbCwgbWV0YSkge1xyXG4gICAgICB2YXIgbGVuZ3RoID0gYS5sZW5ndGg7XHJcbiAgICAgIGlmIChiLmxlbmd0aCAhPT0gbGVuZ3RoKSB7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgaWYgKCFpc0VxdWFsKGFbaW5kZXhdLCBiW2luZGV4XSwgbWV0YSkpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIEBmdW5jdGlvbiBhcmVNYXBzRXF1YWxcclxuICAgKlxyXG4gICAqIEBkZXNjcmlwdGlvblxyXG4gICAqIGFyZSB0aGUgbWFwcyBlcXVhbCBpbiB2YWx1ZVxyXG4gICAqXHJcbiAgICogQHBhcmFtIGEgdGhlIG1hcCB0byB0ZXN0XHJcbiAgICogQHBhcmFtIGIgdGhlIG1hcCB0byB0ZXN0IGFnYWluc3RcclxuICAgKiBAcGFyYW0gaXNFcXVhbCB0aGUgY29tcGFyYXRvciB0byBkZXRlcm1pbmUgZXF1YWxpdHlcclxuICAgKiBAcGFyYW0gbWV0YSB0aGUgbWV0YSBtYXAgdG8gcGFzcyB0aHJvdWdoXHJcbiAgICogQHJldHVybnMgYXJlIHRoZSBtYXBzIGVxdWFsXHJcbiAgICovXHJcbiAgZnVuY3Rpb24gYXJlTWFwc0VxdWFsKGEsIGIsIGlzRXF1YWwsIG1ldGEpIHtcclxuICAgICAgaWYgKGEuc2l6ZSAhPT0gYi5zaXplKSB7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgdmFyIHBhaXJzQSA9IHRvUGFpcnMoYSk7XHJcbiAgICAgIHZhciBwYWlyc0IgPSB0b1BhaXJzKGIpO1xyXG4gICAgICB2YXIgbGVuZ3RoID0gcGFpcnNBLmxlbmd0aDtcclxuICAgICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgaWYgKCFoYXNQYWlyKHBhaXJzQiwgcGFpcnNBW2luZGV4XSwgaXNFcXVhbCwgbWV0YSkgfHxcclxuICAgICAgICAgICAgICAhaGFzUGFpcihwYWlyc0EsIHBhaXJzQltpbmRleF0sIGlzRXF1YWwsIG1ldGEpKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuICB2YXIgT1dORVIgPSAnX293bmVyJztcclxuICB2YXIgaGFzT3duUHJvcGVydHkgPSBGdW5jdGlvbi5wcm90b3R5cGUuYmluZC5jYWxsKEZ1bmN0aW9uLnByb3RvdHlwZS5jYWxsLCBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5KTtcclxuICAvKipcclxuICAgKiBAZnVuY3Rpb24gYXJlT2JqZWN0c0VxdWFsXHJcbiAgICpcclxuICAgKiBAZGVzY3JpcHRpb25cclxuICAgKiBhcmUgdGhlIG9iamVjdHMgZXF1YWwgaW4gdmFsdWVcclxuICAgKlxyXG4gICAqIEBwYXJhbSBhIHRoZSBvYmplY3QgdG8gdGVzdFxyXG4gICAqIEBwYXJhbSBiIHRoZSBvYmplY3QgdG8gdGVzdCBhZ2FpbnN0XHJcbiAgICogQHBhcmFtIGlzRXF1YWwgdGhlIGNvbXBhcmF0b3IgdG8gZGV0ZXJtaW5lIGVxdWFsaXR5XHJcbiAgICogQHBhcmFtIG1ldGEgdGhlIG1ldGEgb2JqZWN0IHRvIHBhc3MgdGhyb3VnaFxyXG4gICAqIEByZXR1cm5zIGFyZSB0aGUgb2JqZWN0cyBlcXVhbFxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIGFyZU9iamVjdHNFcXVhbChhLCBiLCBpc0VxdWFsLCBtZXRhKSB7XHJcbiAgICAgIHZhciBrZXlzQSA9IGtleXMoYSk7XHJcbiAgICAgIHZhciBsZW5ndGggPSBrZXlzQS5sZW5ndGg7XHJcbiAgICAgIGlmIChrZXlzKGIpLmxlbmd0aCAhPT0gbGVuZ3RoKSB7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgdmFyIGtleTtcclxuICAgICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAga2V5ID0ga2V5c0FbaW5kZXhdO1xyXG4gICAgICAgICAgaWYgKCFoYXNPd25Qcm9wZXJ0eShiLCBrZXkpKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKGtleSA9PT0gT1dORVIgJiYgaXNSZWFjdEVsZW1lbnQoYSkpIHtcclxuICAgICAgICAgICAgICBpZiAoIWlzUmVhY3RFbGVtZW50KGIpKSB7XHJcbiAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBlbHNlIGlmICghaXNFcXVhbChhW2tleV0sIGJba2V5XSwgbWV0YSkpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIEBmdW5jdGlvbiBhcmVSZWdFeHBzRXF1YWxcclxuICAgKlxyXG4gICAqIEBkZXNjcmlwdGlvblxyXG4gICAqIGFyZSB0aGUgcmVnRXhwcyBlcXVhbCBpbiB2YWx1ZVxyXG4gICAqXHJcbiAgICogQHBhcmFtIGEgdGhlIHJlZ0V4cCB0byB0ZXN0XHJcbiAgICogQHBhcmFtIGIgdGhlIHJlZ0V4cCB0byB0ZXN0IGFnYWluc1xyXG4gICAqIEByZXR1cm5zIGFyZSB0aGUgcmVnRXhwcyBlcXVhbFxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIGFyZVJlZ0V4cHNFcXVhbChhLCBiKSB7XHJcbiAgICAgIHJldHVybiAoYS5zb3VyY2UgPT09IGIuc291cmNlICYmXHJcbiAgICAgICAgICBhLmdsb2JhbCA9PT0gYi5nbG9iYWwgJiZcclxuICAgICAgICAgIGEuaWdub3JlQ2FzZSA9PT0gYi5pZ25vcmVDYXNlICYmXHJcbiAgICAgICAgICBhLm11bHRpbGluZSA9PT0gYi5tdWx0aWxpbmUgJiZcclxuICAgICAgICAgIGEudW5pY29kZSA9PT0gYi51bmljb2RlICYmXHJcbiAgICAgICAgICBhLnN0aWNreSA9PT0gYi5zdGlja3kgJiZcclxuICAgICAgICAgIGEubGFzdEluZGV4ID09PSBiLmxhc3RJbmRleCk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIEBmdW5jdGlvbiBhcmVTZXRzRXF1YWxcclxuICAgKlxyXG4gICAqIEBkZXNjcmlwdGlvblxyXG4gICAqIGFyZSB0aGUgc2V0cyBlcXVhbCBpbiB2YWx1ZVxyXG4gICAqXHJcbiAgICogQHBhcmFtIGEgdGhlIHNldCB0byB0ZXN0XHJcbiAgICogQHBhcmFtIGIgdGhlIHNldCB0byB0ZXN0IGFnYWluc3RcclxuICAgKiBAcGFyYW0gaXNFcXVhbCB0aGUgY29tcGFyYXRvciB0byBkZXRlcm1pbmUgZXF1YWxpdHlcclxuICAgKiBAcGFyYW0gbWV0YSB0aGUgbWV0YSBzZXQgdG8gcGFzcyB0aHJvdWdoXHJcbiAgICogQHJldHVybnMgYXJlIHRoZSBzZXRzIGVxdWFsXHJcbiAgICovXHJcbiAgZnVuY3Rpb24gYXJlU2V0c0VxdWFsKGEsIGIsIGlzRXF1YWwsIG1ldGEpIHtcclxuICAgICAgaWYgKGEuc2l6ZSAhPT0gYi5zaXplKSB7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgdmFyIHZhbHVlc0EgPSB0b1ZhbHVlcyhhKTtcclxuICAgICAgdmFyIHZhbHVlc0IgPSB0b1ZhbHVlcyhiKTtcclxuICAgICAgdmFyIGxlbmd0aCA9IHZhbHVlc0EubGVuZ3RoO1xyXG4gICAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICBpZiAoIWhhc1ZhbHVlKHZhbHVlc0IsIHZhbHVlc0FbaW5kZXhdLCBpc0VxdWFsLCBtZXRhKSB8fFxyXG4gICAgICAgICAgICAgICFoYXNWYWx1ZSh2YWx1ZXNBLCB2YWx1ZXNCW2luZGV4XSwgaXNFcXVhbCwgbWV0YSkpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgfVxuXG4gIHZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcclxuICB2YXIgSEFTX01BUF9TVVBQT1JUID0gdHlwZW9mIE1hcCA9PT0gJ2Z1bmN0aW9uJztcclxuICB2YXIgSEFTX1NFVF9TVVBQT1JUID0gdHlwZW9mIFNldCA9PT0gJ2Z1bmN0aW9uJztcclxuICB2YXIgT0JKRUNUX1RZUEVPRiA9ICdvYmplY3QnO1xyXG4gIGZ1bmN0aW9uIGNyZWF0ZUNvbXBhcmF0b3IoY3JlYXRlSXNFcXVhbCkge1xyXG4gICAgICB2YXIgaXNFcXVhbCA9IFxyXG4gICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby11c2UtYmVmb3JlLWRlZmluZSAqL1xyXG4gICAgICB0eXBlb2YgY3JlYXRlSXNFcXVhbCA9PT0gJ2Z1bmN0aW9uJ1xyXG4gICAgICAgICAgPyBjcmVhdGVJc0VxdWFsKGNvbXBhcmF0b3IpXHJcbiAgICAgICAgICA6IGNvbXBhcmF0b3I7XHJcbiAgICAgIC8qIGVzbGludC1lbmFibGUgKi9cclxuICAgICAgLyoqXHJcbiAgICAgICAqIEBmdW5jdGlvbiBjb21wYXJhdG9yXHJcbiAgICAgICAqXHJcbiAgICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICAgKiBjb21wYXJlIHRoZSB2YWx1ZSBvZiB0aGUgdHdvIG9iamVjdHMgYW5kIHJldHVybiB0cnVlIGlmIHRoZXkgYXJlIGVxdWl2YWxlbnQgaW4gdmFsdWVzXHJcbiAgICAgICAqXHJcbiAgICAgICAqIEBwYXJhbSBhIHRoZSB2YWx1ZSB0byB0ZXN0IGFnYWluc3RcclxuICAgICAgICogQHBhcmFtIGIgdGhlIHZhbHVlIHRvIHRlc3RcclxuICAgICAgICogQHBhcmFtIFttZXRhXSBhbiBvcHRpb25hbCBtZXRhIG9iamVjdCB0aGF0IGlzIHBhc3NlZCB0aHJvdWdoIHRvIGFsbCBlcXVhbGl0eSB0ZXN0IGNhbGxzXHJcbiAgICAgICAqIEByZXR1cm5zIGFyZSBhIGFuZCBiIGVxdWl2YWxlbnQgaW4gdmFsdWVcclxuICAgICAgICovXHJcbiAgICAgIGZ1bmN0aW9uIGNvbXBhcmF0b3IoYSwgYiwgbWV0YSkge1xyXG4gICAgICAgICAgaWYgKHNhbWVWYWx1ZVplcm9FcXVhbChhLCBiKSkge1xyXG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKGEgJiYgYiAmJiB0eXBlb2YgYSA9PT0gT0JKRUNUX1RZUEVPRiAmJiB0eXBlb2YgYiA9PT0gT0JKRUNUX1RZUEVPRikge1xyXG4gICAgICAgICAgICAgIGlmIChpc1BsYWluT2JqZWN0KGEpICYmIGlzUGxhaW5PYmplY3QoYikpIHtcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuIGFyZU9iamVjdHNFcXVhbChhLCBiLCBpc0VxdWFsLCBtZXRhKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgdmFyIGFycmF5QSA9IGlzQXJyYXkoYSk7XHJcbiAgICAgICAgICAgICAgdmFyIGFycmF5QiA9IGlzQXJyYXkoYik7XHJcbiAgICAgICAgICAgICAgaWYgKGFycmF5QSB8fCBhcnJheUIpIHtcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuIGFycmF5QSA9PT0gYXJyYXlCICYmIGFyZUFycmF5c0VxdWFsKGEsIGIsIGlzRXF1YWwsIG1ldGEpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB2YXIgYURhdGUgPSBhIGluc3RhbmNlb2YgRGF0ZTtcclxuICAgICAgICAgICAgICB2YXIgYkRhdGUgPSBiIGluc3RhbmNlb2YgRGF0ZTtcclxuICAgICAgICAgICAgICBpZiAoYURhdGUgfHwgYkRhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuIGFEYXRlID09PSBiRGF0ZSAmJiBzYW1lVmFsdWVaZXJvRXF1YWwoYS5nZXRUaW1lKCksIGIuZ2V0VGltZSgpKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgdmFyIGFSZWdFeHAgPSBhIGluc3RhbmNlb2YgUmVnRXhwO1xyXG4gICAgICAgICAgICAgIHZhciBiUmVnRXhwID0gYiBpbnN0YW5jZW9mIFJlZ0V4cDtcclxuICAgICAgICAgICAgICBpZiAoYVJlZ0V4cCB8fCBiUmVnRXhwKSB7XHJcbiAgICAgICAgICAgICAgICAgIHJldHVybiBhUmVnRXhwID09PSBiUmVnRXhwICYmIGFyZVJlZ0V4cHNFcXVhbChhLCBiKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgaWYgKGlzUHJvbWlzZUxpa2UoYSkgfHwgaXNQcm9taXNlTGlrZShiKSkge1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm4gYSA9PT0gYjtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgaWYgKEhBU19NQVBfU1VQUE9SVCkge1xyXG4gICAgICAgICAgICAgICAgICB2YXIgYU1hcCA9IGEgaW5zdGFuY2VvZiBNYXA7XHJcbiAgICAgICAgICAgICAgICAgIHZhciBiTWFwID0gYiBpbnN0YW5jZW9mIE1hcDtcclxuICAgICAgICAgICAgICAgICAgaWYgKGFNYXAgfHwgYk1hcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFNYXAgPT09IGJNYXAgJiYgYXJlTWFwc0VxdWFsKGEsIGIsIGlzRXF1YWwsIG1ldGEpO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGlmIChIQVNfU0VUX1NVUFBPUlQpIHtcclxuICAgICAgICAgICAgICAgICAgdmFyIGFTZXQgPSBhIGluc3RhbmNlb2YgU2V0O1xyXG4gICAgICAgICAgICAgICAgICB2YXIgYlNldCA9IGIgaW5zdGFuY2VvZiBTZXQ7XHJcbiAgICAgICAgICAgICAgICAgIGlmIChhU2V0IHx8IGJTZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhU2V0ID09PSBiU2V0ICYmIGFyZVNldHNFcXVhbChhLCBiLCBpc0VxdWFsLCBtZXRhKTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICByZXR1cm4gYXJlT2JqZWN0c0VxdWFsKGEsIGIsIGlzRXF1YWwsIG1ldGEpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBjb21wYXJhdG9yO1xyXG4gIH1cblxuICAvLyBjb21wYXJhdG9yXHJcbiAgdmFyIGRlZXBFcXVhbCA9IGNyZWF0ZUNvbXBhcmF0b3IoKTtcclxuICB2YXIgc2hhbGxvd0VxdWFsID0gY3JlYXRlQ29tcGFyYXRvcihmdW5jdGlvbiAoKSB7IHJldHVybiBzYW1lVmFsdWVaZXJvRXF1YWw7IH0pO1xyXG4gIHZhciBjaXJjdWxhckRlZXBFcXVhbCA9IGNyZWF0ZUNvbXBhcmF0b3IoY3JlYXRlQ2lyY3VsYXJFcXVhbENyZWF0b3IoKSk7XHJcbiAgdmFyIGNpcmN1bGFyU2hhbGxvd0VxdWFsID0gY3JlYXRlQ29tcGFyYXRvcihjcmVhdGVDaXJjdWxhckVxdWFsQ3JlYXRvcihzYW1lVmFsdWVaZXJvRXF1YWwpKTtcblxuICBleHBvcnRzLmNpcmN1bGFyRGVlcEVxdWFsID0gY2lyY3VsYXJEZWVwRXF1YWw7XG4gIGV4cG9ydHMuY2lyY3VsYXJTaGFsbG93RXF1YWwgPSBjaXJjdWxhclNoYWxsb3dFcXVhbDtcbiAgZXhwb3J0cy5jcmVhdGVDdXN0b21FcXVhbCA9IGNyZWF0ZUNvbXBhcmF0b3I7XG4gIGV4cG9ydHMuZGVlcEVxdWFsID0gZGVlcEVxdWFsO1xuICBleHBvcnRzLnNhbWVWYWx1ZVplcm9FcXVhbCA9IHNhbWVWYWx1ZVplcm9FcXVhbDtcbiAgZXhwb3J0cy5zaGFsbG93RXF1YWwgPSBzaGFsbG93RXF1YWw7XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcblxufSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZmFzdC1lcXVhbHMuanMubWFwXG4iLCIvLyBUaGlzIGZpbGUgYmFzaWNhbGx5IGNvbnRhaW5zIGEgb2JzZXJ2YWJsZSBDbGFzcyAoY2FsbGVkIERhdGEpIGFuZCBhXHJcbi8vIERhdGFCYXNlIHdoaWNoIGNvbnRhaW5zIGEga29tcGxleCAobm90IHByaW1pdGl2IHR5cGVzID0gb2JqZWN0cylcclxuLy8gbWFwIG9mZiBPYnNlcnZhYmxlcyBhcyBpcyBvZnRlbiBnaXZlbiB3aGVuIHJlcXVlc3RpbmcgZGF0YSAoZS5nLiBKU09OKS5cclxuaW1wb3J0IFhycmF5IGZyb20gXCJ4cnJheVwiO1xyXG5YcnJheShBcnJheSk7XHJcbi8vQHRzLWlnbm9yZVxyXG5jb25zdCB7IEludmFsaWRWYWx1ZUV4Y2VwdGlvbiB9ID0gWHJyYXk7XHJcbmV4cG9ydCBjbGFzcyBJbnZhbGlkS2V5IGV4dGVuZHMgRXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3Ioa2V5LCBkYXRhKSB7XHJcbiAgICAgICAgc3VwZXIoXCJJbnZhbGlkIGtleSBcXFwiXCIgKyBrZXkgKyBcIlxcXCIgZm9yIHRoZSBmb2xsb3dpbmcgZGF0YSBzdHJ1Y3R1cmU6XFxuXCIgKyBkYXRhLnRvU3RyaW5nKCkpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBjbGFzcyBJbnZhbGlkQ2FzdCBleHRlbmRzIEVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKGNhc3RBdHRlbXB0KSB7XHJcbiAgICAgICAgc3VwZXIoXCJDYW5ub3QgY2FzdCB0byBcIiArIGNhc3RBdHRlbXB0Lm5hbWUpO1xyXG4gICAgfVxyXG59XHJcbi8vIEZvcm1hdHMgZmV0Y2hlZCAoID0gcmF3KSBkYXRhIGludG8gYW4gbmVzdGVkIERhdGEgY29uc3RydWN0LlxyXG5mdW5jdGlvbiBmb3JtYXREYXRhKGZldGNoZWQsIGZvcm1hdExvY2F0aW9uLCBkZWxldGVVbnNlZW5WYWxzID0gZmFsc2UpIHtcclxuICAgIGlmIChmb3JtYXRMb2NhdGlvbiA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIGZvcm1hdExvY2F0aW9uID0gbmV3IERhdGEobmV3IGZldGNoZWQuY29uc3RydWN0b3IoKSk7XHJcbiAgICBsZXQgbHM7XHJcbiAgICBsZXQgdXBkYXRlZEZvcm1hdExvY2F0aW9uID0gZmFsc2U7XHJcbiAgICBpZiAoZGVsZXRlVW5zZWVuVmFscylcclxuICAgICAgICBscyA9IFtdO1xyXG4gICAgaWYgKHR5cGVvZiBmZXRjaGVkID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgZm9yIChsZXQgZCBpbiBmZXRjaGVkKSB7XHJcbiAgICAgICAgICAgIGlmICghZmV0Y2hlZC5oYXNPd25Qcm9wZXJ0eShkKSlcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICBpZiAoZGVsZXRlVW5zZWVuVmFscylcclxuICAgICAgICAgICAgICAgIGxzLmFkZChkKTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBmZXRjaGVkW2RdID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZm9ybWF0TG9jYXRpb24udmFsW2RdID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0TG9jYXRpb24udmFsW2RdID0gbmV3IERhdGEobmV3IGZldGNoZWRbZF0uY29uc3RydWN0b3IoKSk7XHJcbiAgICAgICAgICAgICAgICBmb3JtYXREYXRhKGZldGNoZWRbZF0sIGZvcm1hdExvY2F0aW9uLnZhbFtkXSwgZGVsZXRlVW5zZWVuVmFscyk7XHJcbiAgICAgICAgICAgICAgICB1cGRhdGVkRm9ybWF0TG9jYXRpb24gPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGZvcm1hdExvY2F0aW9uLnZhbFtkXSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBmb3JtYXRMb2NhdGlvbi52YWxbZF0gPSBuZXcgRGF0YShmZXRjaGVkW2RdKTtcclxuICAgICAgICAgICAgICAgIHVwZGF0ZWRGb3JtYXRMb2NhdGlvbiA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoZm9ybWF0TG9jYXRpb24udmFsW2RdIGluc3RhbmNlb2YgRGF0YSlcclxuICAgICAgICAgICAgICAgIGZvcm1hdExvY2F0aW9uLnZhbFtkXS52YWwgPSBmZXRjaGVkW2RdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZGVsZXRlVW5zZWVuVmFscykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBkIGluIGZvcm1hdExvY2F0aW9uLnZhbCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFmb3JtYXRMb2NhdGlvbi52YWwuaGFzT3duUHJvcGVydHkoZCkpXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWxzLmluY2x1ZGVzKGQpKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmb3JtYXRMb2NhdGlvbi52YWwgaW5zdGFuY2VvZiBBcnJheSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0TG9jYXRpb24udmFsLnJlbW92ZUkocGFyc2VJbnQoZCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGZvcm1hdExvY2F0aW9uLnZhbFtkXTtcclxuICAgICAgICAgICAgICAgIHVwZGF0ZWRGb3JtYXRMb2NhdGlvbiA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy9AdHMtaWdub3JlIHdoZW4gc29tZXRoaW5nIGlzIGFkZGVkIG5vdGlmeSBsaXN0ZW5lcnNcclxuICAgICAgICBpZiAodXBkYXRlZEZvcm1hdExvY2F0aW9uKVxyXG4gICAgICAgICAgICBmb3JtYXRMb2NhdGlvbi5ub3RpZnkodHJ1ZSk7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICAgICAgZm9ybWF0TG9jYXRpb24udmFsID0gZmV0Y2hlZDtcclxuICAgIHJldHVybiBmb3JtYXRMb2NhdGlvbjtcclxufVxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzZXREYXRhKGRhdGEsIGxvY2F0aW9uLCBjb21wbGV0ZSkge1xyXG4gICAgaWYgKCEobG9jYXRpb24gaW5zdGFuY2VvZiBEYXRhKSAmJiBsb2NhdGlvbiAhPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIGxvY2F0aW9uID0gbmV3IERhdGEobG9jYXRpb24pO1xyXG4gICAgbGV0IGRhdGFMb2NhdGlvbiA9IGZvcm1hdERhdGEoZGF0YSwgbG9jYXRpb24pO1xyXG4gICAgaWYgKGNvbXBsZXRlICE9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgY29tcGxldGUoKTtcclxuICAgIHJldHVybiBuZXcgRGF0YUJhc2UoZGF0YUxvY2F0aW9uKTtcclxufVxyXG4vKlxyXG4gKiBIb2xkcyBhbmQgaGFuZGxlcyBhY2Nlc3MgdG8gYW4gY29tcGxleCBtYXAgb2YgZGF0YS4gVGhpcyBkYXRhIENvbnNpc2l0cyBvZiBpbiBlYWNoIG90aGVyIG5leHRlZCBEYXRhIGludHNhbmNlc1xyXG4gKiAodG8gaW5pdCBzdWNoIGFuIG1hcCwgY29uc3VsdCBmb3JtYXREYXRhLilcclxuICovXHJcbmV4cG9ydCBjbGFzcyBEYXRhQmFzZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihkYXRhKSB7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcclxuICAgIH1cclxuICAgIHRvU3RyaW5nKCkge1xyXG4gICAgICAgIHJldHVybiBcIkRhdGFCYXNlOiBcIiArIHRoaXMuZGF0YS50b1N0cmluZygpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIGEgcmVmZXJlbmNlIHRvIHN1YkRhdGEgZm91bmQgdW5kZXIgZ2l2ZW4ga2V5KHMpIC8gcGF0aFxyXG4gICAgICogQSByZWZlcmVuY2UgaXMgYSBuZXcgRGF0YUJhc2UgaW5zdGFuY2UganVzdCBjb250YWluaW5nIHRoZSByZWZlcmVuY2VkIERhdGFcclxuICAgICAqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHJlc29sdmVzIHJlZmVyZW5jZXMgdmlhIHRoZSBcInJlY3Vyc2l2ZWx5IGFuY2hvcmVkIERhdGFcIiAocmFkKSBwcm9jZWR1cmUuIEZvciBmdXJ0aGVyXHJcbiAgICAgKiBpbnNpZ2h0cyB3aGF0IHRoaXMgbWVhbnMgcGxlYXNlIGNvbnN1bHQgdGhlIGRvY3VtZW50YXRpb24gb2YgdGhlIGZ1bmN0aW9uIHJhZFxyXG4gICAgICovXHJcbiAgICByZWYoLi4ua2V5cykge1xyXG4gICAgICAgIHJldHVybiBuZXcgRGF0YUJhc2UodGhpcy5yYWQoLi4ua2V5cykpO1xyXG4gICAgfVxyXG4gICAgcGVlayguLi5rZXlzKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRhQmFzZSh0aGlzLmZkcyguLi5rZXlzKSk7XHJcbiAgICB9XHJcbiAgICBjdXJyZW50KC4uLmtleXMpIHtcclxuICAgICAgICByZXR1cm4gKHRoaXMuZmRzKC4uLmtleXMpKS52YWw7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIHVuZGVybHlpbmcgRGF0YSBmb3VuZCB1bmRlciBnaXZlbiBrZXkocykgLyBwYXRoXHJcbiAgICAgKiBTaW1pbGFyIHRvIHJlZiBidXQgbm90IHdyYXBwZWQgaW5zaWRlIGEgRGF0YUJhc2UgaW5zdGFuY2VcclxuICAgICAqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHJlc29sdmVzIHJlZmVyZW5jZXMgdmlhIHRoZSBcInJlY3Vyc2l2ZWx5IGFuY2hvcmVkIERhdGFcIiAocmFkKSBwcm9jZWR1cmUuIEZvciBmdXJ0aGVyXHJcbiAgICAgKiBpbnNpZ2h0cyB3aGF0IHRoaXMgbWVhbnMgcGxlYXNlIGNvbnN1bHQgdGhlIGRvY3VtZW50YXRpb24gb2YgdGhlIGZ1bmN0aW9uIHJhZFxyXG4gICAgICovXHJcbiAgICBnZXQoa2V5LCBjYikge1xyXG4gICAgICAgIGlmICh0eXBlb2Yga2V5ID09PSBcInN0cmluZ1wiIHx8IHR5cGVvZiBrZXkgPT09IFwibnVtYmVyXCIgfHwga2V5IGluc3RhbmNlb2YgRGF0YSkge1xyXG4gICAgICAgICAgICBsZXQgZGF0YSA9IChrZXkgaW5zdGFuY2VvZiBEYXRhKSA/IGtleSA6IHRoaXMucmFkKGtleSk7XHJcbiAgICAgICAgICAgIGlmIChjYiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhLnN1YnNjcmliZShjYik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IG1hcCA9IFtdO1xyXG4gICAgICAgICAgICBpZiAoY2IgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IChrZXlbaV0gaW5zdGFuY2VvZiBEYXRhKSA/IGtleVtpXSA6IHRoaXMucmFkKGtleVtpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3Vic2NyaWJ0aW9uID0gKHYpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFwW2ldID0gdjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGtleS5sZW5ndGggPT09IG1hcC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2IoLi4ubWFwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWFwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLnN1YnNjcmliZShzdWJzY3JpYnRpb24pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgICAgICBtYXBbaV0gPSAoa2V5W2ldIGluc3RhbmNlb2YgRGF0YSkgPyBrZXlbaV0gOiB0aGlzLnJhZChrZXlbaV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1hcDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHNldChrZXksIHRvKSB7XHJcbiAgICAgICAgbGV0IGZkcyA9IHRoaXMuZmRzKGtleSk7XHJcbiAgICAgICAgZm9ybWF0RGF0YSh0bywgZmRzLCB0cnVlKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyByZWN1cnNpdmVseSBhbmNob3JlZCBEYXRhIChyYWQpXHJcbiAgICAgKiBNZWFuaW5nIGZvciBlYWNoIG5lc3Rpbmcgc3RlcCB0aGVyZSB3aWxsIGJlIG9uZSBsaXN0ZW5lciBhdHRhdGNoZWQgdG8gZW5hYmxlIG9iamVjdHMgdG8gYmUgb2JzZXJ2ZWRcclxuICAgICAqIFRoaXMgaXMgdmVyeSByZXNvdXJjZSAobWVtKSBleHBlbnNpdmUuIFVzZSBvbmx5IHdoZW4gbmVjZXNzYXJ5XHJcbiAgICAgKi9cclxuICAgIHJhZCguLi5rZXlzKSB7XHJcbiAgICAgICAgbGV0IGxhc3QgPSB0aGlzLmRhdGE7XHJcbiAgICAgICAgbGV0IG9yZ2FuaXplZEtleXMgPSBrZXlzLmpvaW4oXCIuXCIpLnNwbGl0KFwiLlwiKTtcclxuICAgICAgICBvcmdhbml6ZWRLZXlzLmVhKChrKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChrICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV4dCA9IGxhc3QudmFsW2tdO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5leHQgPT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZEtleShrLCBsYXN0KTtcclxuICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgbGFzdC5zdWJzY3JpYmVJbnRlcm5hbGx5KChhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYSA9IGFueVtrXTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZHQgPSBhIGluc3RhbmNlb2YgRGF0YTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0eXBlb2YgYSA9PT0gXCJvYmplY3RcIiAmJiAhZHQpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0LnZhbCA9IChkdCkgPyBhLnZhbCA6IGE7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGxhc3QgPSBuZXh0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGxhc3Q7XHJcbiAgICB9XHJcbiAgICBmZHMoLi4ua2V5cykge1xyXG4gICAgICAgIGxldCBsYXN0ID0gdGhpcy5kYXRhO1xyXG4gICAgICAgIGxldCBvcmdhbml6ZWRLZXlzID0ga2V5cy5qb2luKFwiLlwiKS5zcGxpdChcIi5cIik7XHJcbiAgICAgICAgb3JnYW5pemVkS2V5cy5lYSgoaykgPT4ge1xyXG4gICAgICAgICAgICBpZiAoayAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5leHQgPSBsYXN0LnZhbFtrXTtcclxuICAgICAgICAgICAgICAgIGlmIChuZXh0ID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRLZXkoaywgbGFzdCk7XHJcbiAgICAgICAgICAgICAgICBsYXN0ID0gbmV4dDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBsYXN0O1xyXG4gICAgfVxyXG4gICAgLy9UT0RPOiBtYWtlIHRoaXMgYXZhaWxhYmxlIGZvciBEQiBhcyBhIHdob2xlIGFuZCBsaW1pdCBhY2NlcyB2aWEgaW50ZXJmYWNlcyAoY29uZGl0aW5hbCB0eXBlcylcclxuICAgIGdldCBhc0FycmF5KCkge1xyXG4gICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgIGlmICh0aGlzLmRhdGEudmFsIGluc3RhbmNlb2YgQXJyYXkpXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgRGF0YUFycmF5KHRoaXMuZGF0YSk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZENhc3QoQXJyYXkpO1xyXG4gICAgfVxyXG4gICAgZ2V0IGFzTnVtYmVyKCkge1xyXG4gICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5kYXRhLnZhbCA9PT0gXCJudW1iZXJcIilcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRhTnVtYmVyKHRoaXMuZGF0YSk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZENhc3QoTnVtYmVyKTtcclxuICAgIH1cclxuICAgIGVxdWFscyh0aGF0KSB7XHJcbiAgICAgICAgcmV0dXJuICh0aGF0ID09PSB1bmRlZmluZWQpID8gZmFsc2UgOiB0aGlzLmRhdGEuZXF1YWxzKHRoYXQuZGF0YSwgdHJ1ZSk7XHJcbiAgICB9XHJcbiAgICBzYW1lKHRoYXQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLnZhbCA9PT0gdGhhdC5kYXRhLnZhbDtcclxuICAgIH1cclxufVxyXG5leHBvcnQgY2xhc3MgRGF0YU51bWJlciBleHRlbmRzIERhdGFCYXNlIHtcclxuICAgIGNvbnN0cnVjdG9yKGRhdGEpIHtcclxuICAgICAgICBzdXBlcihkYXRhKTtcclxuICAgIH1cclxuICAgIGluYyhieSA9IDEpIHtcclxuICAgICAgICB0aGlzLmRhdGEudmFsICs9IGJ5O1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEudmFsO1xyXG4gICAgfVxyXG4gICAgZGVjKGJ5ID0gMSkge1xyXG4gICAgICAgIHRoaXMuZGF0YS52YWwgLT0gYnk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS52YWw7XHJcbiAgICB9XHJcbn1cclxuY29uc3QgRGF0YUFycmF5X21vcnBoTWFwID0gbmV3IE1hcCgpO1xyXG5leHBvcnQgY2xhc3MgRGF0YUFycmF5IGV4dGVuZHMgRGF0YUJhc2Uge1xyXG4gICAgY29uc3RydWN0b3IoZGF0YSkge1xyXG4gICAgICAgIHN1cGVyKGRhdGEpO1xyXG4gICAgfVxyXG4gICAgbGlzdChsb29wLCBzdGVwSW50b1BhdGhBZnRlcndhcmRzID0gXCJcIikge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sZW5ndGgoKTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBlbmQgPSBsb29wKG5ldyBEYXRhQmFzZSh0aGlzLmZkcyhpLCBzdGVwSW50b1BhdGhBZnRlcndhcmRzKSksIGkpO1xyXG4gICAgICAgICAgICBpZiAoZW5kICE9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZW5kO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZvckVhY2gobG9vcCwgYmVmb3JlTG9vcCwgYWZ0ZXJMb29wLCBzdGVwSW50b1BhdGhBZnRlcndhcmRzID0gXCJcIikge1xyXG4gICAgICAgIGxldCBwcm9tcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuZ2V0KFwiXCIsICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGJlZm9yZUxvb3AgIT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgIHByb21zLmFkZChiZWZvcmVMb29wKCkpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEudmFsLmVhKChlLCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBwcm9tcy5hZGQobG9vcChuZXcgRGF0YUJhc2UodGhpcy5mZHMoaSwgc3RlcEludG9QYXRoQWZ0ZXJ3YXJkcykpLCBpKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBwcm9tcyA9IHByb21zLmZpbHRlcigoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGUgaW5zdGFuY2VvZiBQcm9taXNlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKGFmdGVyTG9vcCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocHJvbXMubGVuZ3RoICE9PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgIFByb21pc2UuYWxsKHByb21zKS50aGVuKGFmdGVyTG9vcCk7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgYWZ0ZXJMb29wKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAocHJvbXMubGVuZ3RoICE9PSAwKVxyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbXMpO1xyXG4gICAgfVxyXG4gICAgbGVuZ3RoKGNiKSB7XHJcbiAgICAgICAgaWYgKGNiID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGEudmFsLmxlbmd0aDtcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5nZXQoXCJcIiwgKGEpID0+IHtcclxuICAgICAgICAgICAgICAgIGNiKGEubGVuZ3RoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVhbExlbmd0aChjYikge1xyXG4gICAgICAgIGlmIChjYiA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhLnZhbC5yZWFsTGVuZ3RoO1xyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmdldChcIlwiLCAoYSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY2IoYS5yZWFsTGVuZ3RoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgYWx0ZXIoY2IsIGluaXRhbGl6ZUxvb3AgPSBmYWxzZSkge1xyXG4gICAgICAgIHRoaXMuYmVmb3JlTGFzdENoYW5nZSA9IHRoaXMuZGF0YS5jbG9uZSgpO1xyXG4gICAgICAgIGlmIChpbml0YWxpemVMb29wKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YS52YWwuZWEoKGUsIGkpID0+IHtcclxuICAgICAgICAgICAgICAgIGNiKG5ldyBEYXRhQmFzZShlKSwgaSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmdldChcIlwiLCAoYSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgaW5kZXhlc1RvQmVDYWxsZWQgPSBbXTtcclxuICAgICAgICAgICAgYS5lYSgoZSwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4ZXNUb0JlQ2FsbGVkLmFkZChpKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWUuZXF1YWxzKHRoaXMuYmVmb3JlTGFzdENoYW5nZS52YWxbaV0sIHRydWUpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYihuZXcgRGF0YUJhc2UoZSksIGkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5iZWZvcmVMYXN0Q2hhbmdlLnZhbC5lYSgoZSwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpbmRleGVzVG9CZUNhbGxlZC5pbmNsdWRlcyhpKSlcclxuICAgICAgICAgICAgICAgICAgICBjYihudWxsLCBpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuYmVmb3JlTGFzdENoYW5nZSA9IHRoaXMuZGF0YS5jbG9uZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgbW9ycGgoY2IsIGluaXRhbGl6ZUxvb3AgPSBmYWxzZSkge1xyXG4gICAgICAgIHRoaXMuYmVmb3JlTGFzdENoYW5nZSA9IHRoaXMuZGF0YS5jbG9uZSgpO1xyXG4gICAgICAgIGlmIChpbml0YWxpemVMb29wKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YS52YWwuZWEoKGUsIGkpID0+IHtcclxuICAgICAgICAgICAgICAgIGNiKG5ldyBEYXRhQmFzZShlKSwgaSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgY2JhID0gRGF0YUFycmF5X21vcnBoTWFwLmdldCh0aGlzLmRhdGEpO1xyXG4gICAgICAgIGlmIChjYmEgPT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgRGF0YUFycmF5X21vcnBoTWFwLnNldCh0aGlzLmRhdGEsIFtjYl0pO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgY2JhLmFkZChjYik7XHJcbiAgICB9XHJcbiAgICBhZGQodmFsLCBhdEluZGV4KSB7XHJcbiAgICAgICAgbGV0IGxlbmd0aCA9IHRoaXMubGVuZ3RoKCk7XHJcbiAgICAgICAgbGV0IG1heEluZGV4ID0gbGVuZ3RoIC0gMTtcclxuICAgICAgICBpZiAoYXRJbmRleCA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICBhdEluZGV4ID0gbGVuZ3RoO1xyXG4gICAgICAgIHRoaXMuZGF0YS52YWwuUmV2ZXJzZSgpLmVhKChlLCBpKSA9PiB7XHJcbiAgICAgICAgICAgIGkgPSBtYXhJbmRleCAtIGk7XHJcbiAgICAgICAgICAgIGlmIChpIDwgYXRJbmRleClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgLy9USElTIElGIElTIE5FQ0VTU0FSWSBCRUNBVVNFIFdIRU4gU0VUVElORyBFTVBUWSBBUlJBWSBTT0xPVFMgVE8gVU5ERUZJTkVEIFRIRVkgR0VUIFBJQ0tFRCBVUCBCWSBJVEVSQVRPUlNcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGF0YS52YWxbaV0gPT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmRhdGEudmFsW2kgKyAxXTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnZhbFtpICsgMV0gPSB0aGlzLmRhdGEudmFsW2ldO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLmRhdGEudmFsW2F0SW5kZXhdO1xyXG4gICAgICAgIGxldCBvYiA9IHt9O1xyXG4gICAgICAgIG9iW2F0SW5kZXhdID0gdmFsO1xyXG4gICAgICAgIGZvcm1hdERhdGEob2IsIHRoaXMuZGF0YSk7XHJcbiAgICAgICAgbGV0IGNiYSA9IERhdGFBcnJheV9tb3JwaE1hcC5nZXQodGhpcy5kYXRhKTtcclxuICAgICAgICBpZiAoY2JhICE9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIGNiYS5lYSgoZikgPT4ge1xyXG4gICAgICAgICAgICAgICAgZihuZXcgRGF0YUJhc2UodGhpcy5kYXRhLnZhbFthdEluZGV4XSksIGF0SW5kZXgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJlbW92ZUkoaW5kZXgsIGNsb3NlR2FwID0gdHJ1ZSkge1xyXG4gICAgICAgIGlmIChjbG9zZUdhcClcclxuICAgICAgICAgICAgdGhpcy5kYXRhLnZhbC5yZW1vdmVJKGluZGV4KTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmRhdGEudmFsW2luZGV4XTtcclxuICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICB0aGlzLmRhdGEubm90aWZ5KHRydWUpO1xyXG4gICAgICAgIGxldCBjYmEgPSBEYXRhQXJyYXlfbW9ycGhNYXAuZ2V0KHRoaXMuZGF0YSk7XHJcbiAgICAgICAgaWYgKGNiYSAhPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICBjYmEuZWEoKGYpID0+IHtcclxuICAgICAgICAgICAgICAgIGYobnVsbCwgaW5kZXgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJlbW92ZVYodmFsLCBjbG9zZUdhcCA9IHRydWUpIHtcclxuICAgICAgICBsZXQgZGF0YSA9IGZvcm1hdERhdGEodmFsKTtcclxuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmRhdGEudmFsLmVhKChlLCBpKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlLmVxdWFscyhkYXRhKSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChpbmRleCA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZFZhbHVlRXhjZXB0aW9uKHZhbCwgdGhpcy5kYXRhLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgIGlmIChjbG9zZUdhcClcclxuICAgICAgICAgICAgdGhpcy5kYXRhLnZhbC5yZW1vdmVJKGluZGV4KTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmRhdGEudmFsW2luZGV4XTtcclxuICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICB0aGlzLmRhdGEubm90aWZ5KHRydWUpO1xyXG4gICAgICAgIGxldCBjYmEgPSBEYXRhQXJyYXlfbW9ycGhNYXAuZ2V0KHRoaXMuZGF0YSk7XHJcbiAgICAgICAgaWYgKGNiYSAhPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICBjYmEuZWEoKGYpID0+IHtcclxuICAgICAgICAgICAgICAgIGYobnVsbCwgaW5kZXgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgY2xhc3MgRGF0YSB7XHJcbiAgICBjb25zdHJ1Y3Rvcih2YWwpIHtcclxuICAgICAgICB0aGlzLmNicyA9IFtdO1xyXG4gICAgICAgIHRoaXMuaW50ZXJuYWxDQnMgPSBbXTtcclxuICAgICAgICB0aGlzLnZhbCA9IHZhbDtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHRoZSB2YWxcclxuICAgICAqL1xyXG4gICAgc2V0IHZhbCh0bykge1xyXG4gICAgICAgIGlmICh0aGlzLnZhbCA9PT0gdG8pXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLl92YWwgPSB0bztcclxuICAgICAgICB0aGlzLm5vdGlmeShmYWxzZSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIGN1cnJlbnQgdmFsXHJcbiAgICAgKi9cclxuICAgIGdldCB2YWwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbDtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogU3Vic2NyaWJlIHRvIHZhbFxyXG4gICAgICogQHBhcmFtIGNiIGNhbGxiYWNrIHdoaWNoIGdldHMgY2FsbGVkIHdoZW5ldmVyIHRoZSB2YWwgY2hhbmdlc1xyXG4gICAgICovXHJcbiAgICBzdWJzY3JpYmUoY2IsIGluaXQgPSB0cnVlKSB7XHJcbiAgICAgICAgdGhpcy5jYnMuYWRkKGNiKTtcclxuICAgICAgICBpZiAoaW5pdClcclxuICAgICAgICAgICAgY2IodGhpcy52YWwpO1xyXG4gICAgICAgIHJldHVybiBjYjtcclxuICAgIH1cclxuICAgIHN1YnNjcmliZUludGVybmFsbHkoY2IpIHtcclxuICAgICAgICB0aGlzLmludGVybmFsQ0JzLmFkZChjYik7XHJcbiAgICAgICAgY2IodGhpcy52YWwpO1xyXG4gICAgfVxyXG4gICAgdW5zdWJzY3JpYmUoY2IpIHtcclxuICAgICAgICBpZiAoY2IgIT09IG51bGwpXHJcbiAgICAgICAgICAgIHRoaXMuY2JzLnJlbW92ZShjYik7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLmNicy5jbGVhcigpO1xyXG4gICAgfVxyXG4gICAgdG9TdHJpbmcodGFiSW4gPSAwLCBpbnNpZGVPYmplY3QgPSBmYWxzZSkge1xyXG4gICAgICAgIHRhYkluKys7XHJcbiAgICAgICAgbGV0IHMgPSBcIlwiO1xyXG4gICAgICAgIGxldCB2ID0gdGhpcy52YWw7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB2ID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgIGxldCBoYXNQcm9wcyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBsZXQgYXIgPSB2IGluc3RhbmNlb2YgQXJyYXk7XHJcbiAgICAgICAgICAgIGlmIChhcilcclxuICAgICAgICAgICAgICAgIHMgKz0gXCJbXCI7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHMgKz0gXCJ7XCI7XHJcbiAgICAgICAgICAgIHMgKz0gXCJcXG5cIjtcclxuICAgICAgICAgICAgZm9yIChsZXQgayBpbiB2KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXYuaGFzT3duUHJvcGVydHkoaykpXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBoYXNQcm9wcyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgIHMgKz0gXCJcXHRcIi5yZXBlYXQodGFiSW4pICsgayArIFwiOiBcIiArIHZba10udG9TdHJpbmcodGFiSW4sIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghaGFzUHJvcHMpXHJcbiAgICAgICAgICAgICAgICBzID0gcy5zdWJzdHJpbmcoMCwgcy5sZW5ndGggLSAxKTtcclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzID0gcy5zdWJzdHJpbmcoMCwgcy5sZW5ndGggLSAyKSArIFwiXFxuXCI7XHJcbiAgICAgICAgICAgICAgICBzICs9IFwiXFx0XCIucmVwZWF0KHRhYkluIC0gMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGFyKVxyXG4gICAgICAgICAgICAgICAgcyArPSBcIl1cIjtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgcyArPSBcIn1cIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBzdCA9IHR5cGVvZiB2ID09PSBcInN0cmluZ1wiO1xyXG4gICAgICAgICAgICBpZiAoc3QpXHJcbiAgICAgICAgICAgICAgICBzICs9IFwiXFxcIlwiO1xyXG4gICAgICAgICAgICBzICs9IHY7XHJcbiAgICAgICAgICAgIGlmIChzdClcclxuICAgICAgICAgICAgICAgIHMgKz0gXCJcXFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHMgKz0gaW5zaWRlT2JqZWN0ID8gXCIsXCIgOiBcIlwiO1xyXG4gICAgICAgIHJldHVybiBzICsgXCJcXG5cIjtcclxuICAgIH1cclxuICAgIG5vdGlmeSh3aWxkID0gZmFsc2UpIHtcclxuICAgICAgICBsZXQgdmFsID0gdGhpcy52YWw7XHJcbiAgICAgICAgdGhpcy5jYnMuZWEoKGYpID0+IHtcclxuICAgICAgICAgICAgZih2YWwpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICghd2lsZCkge1xyXG4gICAgICAgICAgICB0aGlzLmludGVybmFsQ0JzLmVhKChmKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBmKHZhbCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQ29tcGFyZXMgaWYgYWxsIGtleXMgaW4gdGhpcyBhcmUgZXF1YWwgdG8gdGhlIGVxdWl2ZWxlbnQgb25lcyBvbiBkYXRhXHJcbiAgICAgKiBEaWZmZXJlbnQgRGF0YSBJbnN0YW5jZXMgaG9sZGluZyB0aGUgc2FtZSB2YWx1ZSBhcmUgdGhlIGVxdWFsXHJcbiAgICAgKiBEYXRhIGNhbiBoYXZlIG1vcmUga2V5cyB0aGFuIHRoaXMgYW5kIHN0aWxsIGJlIGVxdWFsLlxyXG4gICAgICogSWYgeW91IGRvbnQgd2FudCB0aGlzIHBhc3MgaW4gdHJ1ZSB0byB0aGUgc3RyaWN0IHBhcmFtLiBUaGlzIHdpbGwgYmUgbW9yZSByZWNvdXJjZSBpbnRlbnNpdmVcclxuICAgICAqL1xyXG4gICAgZXF1YWxzKGRhdGEsIHN0cmljdCA9IGZhbHNlKSB7XHJcbiAgICAgICAgbGV0IHYgPSB0aGlzLnZhbDtcclxuICAgICAgICBpZiAoZGF0YSA9PT0gdW5kZWZpbmVkIHx8IGRhdGEgPT09IG51bGwpXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICBsZXQgZCA9IGRhdGEudmFsO1xyXG4gICAgICAgIGlmICh2ID09IGQpXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIGxldCBscztcclxuICAgICAgICBpZiAoc3RyaWN0KVxyXG4gICAgICAgICAgICBscyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGsgaW4gdikge1xyXG4gICAgICAgICAgICBpZiAoIXYuaGFzT3duUHJvcGVydHkoaykpXHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgaWYgKHN0cmljdClcclxuICAgICAgICAgICAgICAgIGxzLmFkZChrKTtcclxuICAgICAgICAgICAgaWYgKHZba10gIT09IGRba10pIHtcclxuICAgICAgICAgICAgICAgIGlmICh2W2tdIGluc3RhbmNlb2YgRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkW2tdIGluc3RhbmNlb2YgRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF2W2tdLmVxdWFscyhkW2tdLCBzdHJpY3QpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHN0cmljdCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBrIGluIGQpIHtcclxuICAgICAgICAgICAgICAgIGlmICghdi5oYXNPd25Qcm9wZXJ0eShrKSlcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGlmICghbHMuaW5jbHVkZXMoaykpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgY2xvbmUoKSB7XHJcbiAgICAgICAgbGV0IGQ7XHJcbiAgICAgICAgbGV0IHYgPSB0aGlzLnZhbDtcclxuICAgICAgICBpZiAodHlwZW9mIHYgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgIGxldCBkYXRhID0gbmV3IHYuY29uc3RydWN0b3IoKTtcclxuICAgICAgICAgICAgZCA9IG5ldyBEYXRhKGRhdGEpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBrIGluIHYpIHtcclxuICAgICAgICAgICAgICAgIGlmICghdi5oYXNPd25Qcm9wZXJ0eShrKSlcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgZC52YWxba10gPSB2W2tdLmNsb25lKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBkID0gbmV3IERhdGEodik7XHJcbiAgICAgICAgZC5pbnRlcm5hbENCcy5hZGQoLi4udGhpcy5pbnRlcm5hbENCcyk7XHJcbiAgICAgICAgZC5jYnMuYWRkKC4uLnRoaXMuY2JzKTtcclxuICAgICAgICByZXR1cm4gZDtcclxuICAgIH1cclxufVxyXG4iLCIndXNlIHN0cmljdCdcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gbm9ybWFsaXplXHJcblxyXG52YXIgYXJjVG9DdXJ2ZSA9IHJlcXVpcmUoJ3N2Zy1hcmMtdG8tY3ViaWMtYmV6aWVyJylcclxuXHJcbmZ1bmN0aW9uIG5vcm1hbGl6ZShwYXRoKXtcclxuICAvLyBpbml0IHN0YXRlXHJcbiAgdmFyIHByZXZcclxuICB2YXIgcmVzdWx0ID0gW11cclxuICB2YXIgYmV6aWVyWCA9IDBcclxuICB2YXIgYmV6aWVyWSA9IDBcclxuICB2YXIgc3RhcnRYID0gMFxyXG4gIHZhciBzdGFydFkgPSAwXHJcbiAgdmFyIHF1YWRYID0gbnVsbFxyXG4gIHZhciBxdWFkWSA9IG51bGxcclxuICB2YXIgeCA9IDBcclxuICB2YXIgeSA9IDBcclxuXHJcbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHBhdGgubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgIHZhciBzZWcgPSBwYXRoW2ldXHJcbiAgICB2YXIgY29tbWFuZCA9IHNlZ1swXVxyXG5cclxuICAgIHN3aXRjaCAoY29tbWFuZCkge1xyXG4gICAgICBjYXNlICdNJzpcclxuICAgICAgICBzdGFydFggPSBzZWdbMV1cclxuICAgICAgICBzdGFydFkgPSBzZWdbMl1cclxuICAgICAgICBicmVha1xyXG4gICAgICBjYXNlICdBJzpcclxuICAgICAgICB2YXIgY3VydmVzID0gYXJjVG9DdXJ2ZSh7XHJcbiAgICAgICAgICBweDogeCxcclxuICAgICAgICAgIHB5OiB5LFxyXG4gICAgICAgICAgY3g6IHNlZ1s2XSxcclxuICAgICAgICAgIGN5OiAgc2VnWzddLFxyXG4gICAgICAgICAgcng6IHNlZ1sxXSxcclxuICAgICAgICAgIHJ5OiBzZWdbMl0sXHJcbiAgICAgICAgICB4QXhpc1JvdGF0aW9uOiBzZWdbM10sXHJcbiAgICAgICAgICBsYXJnZUFyY0ZsYWc6IHNlZ1s0XSxcclxuICAgICAgICAgIHN3ZWVwRmxhZzogc2VnWzVdXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLy8gbnVsbC1jdXJ2ZXNcclxuICAgICAgICBpZiAoIWN1cnZlcy5sZW5ndGgpIGNvbnRpbnVlXHJcblxyXG4gICAgICAgIGZvciAodmFyIGogPSAwLCBjOyBqIDwgY3VydmVzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICBjID0gY3VydmVzW2pdXHJcbiAgICAgICAgICBzZWcgPSBbJ0MnLCBjLngxLCBjLnkxLCBjLngyLCBjLnkyLCBjLngsIGMueV1cclxuICAgICAgICAgIGlmIChqIDwgY3VydmVzLmxlbmd0aCAtIDEpIHJlc3VsdC5wdXNoKHNlZylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGJyZWFrXHJcbiAgICAgIGNhc2UgJ1MnOlxyXG4gICAgICAgIC8vIGRlZmF1bHQgY29udHJvbCBwb2ludFxyXG4gICAgICAgIHZhciBjeCA9IHhcclxuICAgICAgICB2YXIgY3kgPSB5XHJcbiAgICAgICAgaWYgKHByZXYgPT0gJ0MnIHx8IHByZXYgPT0gJ1MnKSB7XHJcbiAgICAgICAgICBjeCArPSBjeCAtIGJlemllclggLy8gcmVmbGVjdCB0aGUgcHJldmlvdXMgY29tbWFuZCdzIGNvbnRyb2xcclxuICAgICAgICAgIGN5ICs9IGN5IC0gYmV6aWVyWSAvLyBwb2ludCByZWxhdGl2ZSB0byB0aGUgY3VycmVudCBwb2ludFxyXG4gICAgICAgIH1cclxuICAgICAgICBzZWcgPSBbJ0MnLCBjeCwgY3ksIHNlZ1sxXSwgc2VnWzJdLCBzZWdbM10sIHNlZ1s0XV1cclxuICAgICAgICBicmVha1xyXG4gICAgICBjYXNlICdUJzpcclxuICAgICAgICBpZiAocHJldiA9PSAnUScgfHwgcHJldiA9PSAnVCcpIHtcclxuICAgICAgICAgIHF1YWRYID0geCAqIDIgLSBxdWFkWCAvLyBhcyB3aXRoICdTJyByZWZsZWN0IHByZXZpb3VzIGNvbnRyb2wgcG9pbnRcclxuICAgICAgICAgIHF1YWRZID0geSAqIDIgLSBxdWFkWVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBxdWFkWCA9IHhcclxuICAgICAgICAgIHF1YWRZID0geVxyXG4gICAgICAgIH1cclxuICAgICAgICBzZWcgPSBxdWFkcmF0aWMoeCwgeSwgcXVhZFgsIHF1YWRZLCBzZWdbMV0sIHNlZ1syXSlcclxuICAgICAgICBicmVha1xyXG4gICAgICBjYXNlICdRJzpcclxuICAgICAgICBxdWFkWCA9IHNlZ1sxXVxyXG4gICAgICAgIHF1YWRZID0gc2VnWzJdXHJcbiAgICAgICAgc2VnID0gcXVhZHJhdGljKHgsIHksIHNlZ1sxXSwgc2VnWzJdLCBzZWdbM10sIHNlZ1s0XSlcclxuICAgICAgICBicmVha1xyXG4gICAgICBjYXNlICdMJzpcclxuICAgICAgICBzZWcgPSBsaW5lKHgsIHksIHNlZ1sxXSwgc2VnWzJdKVxyXG4gICAgICAgIGJyZWFrXHJcbiAgICAgIGNhc2UgJ0gnOlxyXG4gICAgICAgIHNlZyA9IGxpbmUoeCwgeSwgc2VnWzFdLCB5KVxyXG4gICAgICAgIGJyZWFrXHJcbiAgICAgIGNhc2UgJ1YnOlxyXG4gICAgICAgIHNlZyA9IGxpbmUoeCwgeSwgeCwgc2VnWzFdKVxyXG4gICAgICAgIGJyZWFrXHJcbiAgICAgIGNhc2UgJ1onOlxyXG4gICAgICAgIHNlZyA9IGxpbmUoeCwgeSwgc3RhcnRYLCBzdGFydFkpXHJcbiAgICAgICAgYnJlYWtcclxuICAgIH1cclxuXHJcbiAgICAvLyB1cGRhdGUgc3RhdGVcclxuICAgIHByZXYgPSBjb21tYW5kXHJcbiAgICB4ID0gc2VnW3NlZy5sZW5ndGggLSAyXVxyXG4gICAgeSA9IHNlZ1tzZWcubGVuZ3RoIC0gMV1cclxuICAgIGlmIChzZWcubGVuZ3RoID4gNCkge1xyXG4gICAgICBiZXppZXJYID0gc2VnW3NlZy5sZW5ndGggLSA0XVxyXG4gICAgICBiZXppZXJZID0gc2VnW3NlZy5sZW5ndGggLSAzXVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYmV6aWVyWCA9IHhcclxuICAgICAgYmV6aWVyWSA9IHlcclxuICAgIH1cclxuICAgIHJlc3VsdC5wdXNoKHNlZylcclxuICB9XHJcblxyXG4gIHJldHVybiByZXN1bHRcclxufVxyXG5cclxuZnVuY3Rpb24gbGluZSh4MSwgeTEsIHgyLCB5Mil7XHJcbiAgcmV0dXJuIFsnQycsIHgxLCB5MSwgeDIsIHkyLCB4MiwgeTJdXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHF1YWRyYXRpYyh4MSwgeTEsIGN4LCBjeSwgeDIsIHkyKXtcclxuICByZXR1cm4gW1xyXG4gICAgJ0MnLFxyXG4gICAgeDEvMyArICgyLzMpICogY3gsXHJcbiAgICB5MS8zICsgKDIvMykgKiBjeSxcclxuICAgIHgyLzMgKyAoMi8zKSAqIGN4LFxyXG4gICAgeTIvMyArICgyLzMpICogY3ksXHJcbiAgICB4MixcclxuICAgIHkyXHJcbiAgXVxyXG59XHJcbiIsIlxubW9kdWxlLmV4cG9ydHMgPSBwYXJzZVxuXG4vKipcbiAqIGV4cGVjdGVkIGFyZ3VtZW50IGxlbmd0aHNcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cblxudmFyIGxlbmd0aCA9IHthOiA3LCBjOiA2LCBoOiAxLCBsOiAyLCBtOiAyLCBxOiA0LCBzOiA0LCB0OiAyLCB2OiAxLCB6OiAwfVxuXG4vKipcbiAqIHNlZ21lbnQgcGF0dGVyblxuICogQHR5cGUge1JlZ0V4cH1cbiAqL1xuXG52YXIgc2VnbWVudCA9IC8oW2FzdHZ6cW1obGNdKShbXmFzdHZ6cW1obGNdKikvaWdcblxuLyoqXG4gKiBwYXJzZSBhbiBzdmcgcGF0aCBkYXRhIHN0cmluZy4gR2VuZXJhdGVzIGFuIEFycmF5XG4gKiBvZiBjb21tYW5kcyB3aGVyZSBlYWNoIGNvbW1hbmQgaXMgYW4gQXJyYXkgb2YgdGhlXG4gKiBmb3JtIGBbY29tbWFuZCwgYXJnMSwgYXJnMiwgLi4uXWBcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gcGF0aFxuICogQHJldHVybiB7QXJyYXl9XG4gKi9cblxuZnVuY3Rpb24gcGFyc2UocGF0aCkge1xuXHR2YXIgZGF0YSA9IFtdXG5cdHBhdGgucmVwbGFjZShzZWdtZW50LCBmdW5jdGlvbihfLCBjb21tYW5kLCBhcmdzKXtcblx0XHR2YXIgdHlwZSA9IGNvbW1hbmQudG9Mb3dlckNhc2UoKVxuXHRcdGFyZ3MgPSBwYXJzZVZhbHVlcyhhcmdzKVxuXG5cdFx0Ly8gb3ZlcmxvYWRlZCBtb3ZlVG9cblx0XHRpZiAodHlwZSA9PSAnbScgJiYgYXJncy5sZW5ndGggPiAyKSB7XG5cdFx0XHRkYXRhLnB1c2goW2NvbW1hbmRdLmNvbmNhdChhcmdzLnNwbGljZSgwLCAyKSkpXG5cdFx0XHR0eXBlID0gJ2wnXG5cdFx0XHRjb21tYW5kID0gY29tbWFuZCA9PSAnbScgPyAnbCcgOiAnTCdcblx0XHR9XG5cblx0XHR3aGlsZSAodHJ1ZSkge1xuXHRcdFx0aWYgKGFyZ3MubGVuZ3RoID09IGxlbmd0aFt0eXBlXSkge1xuXHRcdFx0XHRhcmdzLnVuc2hpZnQoY29tbWFuZClcblx0XHRcdFx0cmV0dXJuIGRhdGEucHVzaChhcmdzKVxuXHRcdFx0fVxuXHRcdFx0aWYgKGFyZ3MubGVuZ3RoIDwgbGVuZ3RoW3R5cGVdKSB0aHJvdyBuZXcgRXJyb3IoJ21hbGZvcm1lZCBwYXRoIGRhdGEnKVxuXHRcdFx0ZGF0YS5wdXNoKFtjb21tYW5kXS5jb25jYXQoYXJncy5zcGxpY2UoMCwgbGVuZ3RoW3R5cGVdKSkpXG5cdFx0fVxuXHR9KVxuXHRyZXR1cm4gZGF0YVxufVxuXG52YXIgbnVtYmVyID0gLy0/WzAtOV0qXFwuP1swLTldKyg/OmVbLStdP1xcZCspPy9pZ1xuXG5mdW5jdGlvbiBwYXJzZVZhbHVlcyhhcmdzKSB7XG5cdHZhciBudW1iZXJzID0gYXJncy5tYXRjaChudW1iZXIpXG5cdHJldHVybiBudW1iZXJzID8gbnVtYmVycy5tYXAoTnVtYmVyKSA6IFtdXG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoa2V5ZnJhbWVzKSB7XHJcbiAgICBrZXlmcmFtZXNbMF0ub2Zmc2V0ID0gMDtcclxuICAgIGtleWZyYW1lc1trZXlmcmFtZXMubGVuZ3RoIC0gMV0ub2Zmc2V0ID0gMTtcclxuICAgIGlmIChrZXlmcmFtZXMubGVuZ3RoID09PSAyKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIGxldCBsYXN0ID0gMTtcclxuICAgIGxldCBsYXN0T2Zmc2V0ID0gLTE7XHJcbiAgICBmb3IgKGxldCBpID0gbGFzdDsgaSA8IGtleWZyYW1lcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBsID0gaSArIDE7XHJcbiAgICAgICAgbGV0IG8gPSBrZXlmcmFtZXNbaV0ub2Zmc2V0O1xyXG4gICAgICAgIGlmIChvICE9PSB1bmRlZmluZWQgJiYgbyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZiAobyA+PSBsYXN0T2Zmc2V0ICYmIG8gPj0gMCAmJiBvIDw9IDEpIHtcclxuICAgICAgICAgICAgICAgIGxhc3RPZmZzZXQgPSBvO1xyXG4gICAgICAgICAgICAgICAga2V5ZnJhbWVzLnNsaWNlKGxhc3QsIGwpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHN0YXJ0ID0ga2V5ZnJhbWVzW2xhc3QgLSAxXS5vZmZzZXQ7XHJcbiAgICAgICAgICAgICAgICBsZXQgZW5kID0ga2V5ZnJhbWVzW2ldLm9mZnNldDtcclxuICAgICAgICAgICAgICAgIGxldCBzcGFjZSA9IChlbmQgLSBzdGFydCkgLyAobCAtIGxhc3QpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG9mZnNldCA9IHN0YXJ0O1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IGxhc3Q7IGogPCBpOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBvZmZzZXQgKz0gc3BhY2U7XHJcbiAgICAgICAgICAgICAgICAgICAga2V5ZnJhbWVzW2pdLm9mZnNldCA9IG9mZnNldDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxhc3QgPSBsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk9mZnNldHMgbXVzdCBiZSBnaXZlbiBpbiBpbmNyZW1lbnRpbmcgc2VxdWVuY2UsIHNwYW5uaW5nIGJldHdlZW4gMCAtIDFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGtleWZyYW1lcztcclxufVxyXG4iLCJ2YXIgX3NsaWNlZFRvQXJyYXkgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIHNsaWNlSXRlcmF0b3IoYXJyLCBpKSB7IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX2UgPSB1bmRlZmluZWQ7IHRyeSB7IGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH0gcmV0dXJuIGZ1bmN0aW9uIChhcnIsIGkpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgeyByZXR1cm4gYXJyOyB9IGVsc2UgaWYgKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoYXJyKSkgeyByZXR1cm4gc2xpY2VJdGVyYXRvcihhcnIsIGkpOyB9IGVsc2UgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTsgfSB9OyB9KCk7XG5cbnZhciBUQVUgPSBNYXRoLlBJICogMjtcblxudmFyIG1hcFRvRWxsaXBzZSA9IGZ1bmN0aW9uIG1hcFRvRWxsaXBzZShfcmVmLCByeCwgcnksIGNvc3BoaSwgc2lucGhpLCBjZW50ZXJ4LCBjZW50ZXJ5KSB7XG4gIHZhciB4ID0gX3JlZi54LFxuICAgICAgeSA9IF9yZWYueTtcblxuICB4ICo9IHJ4O1xuICB5ICo9IHJ5O1xuXG4gIHZhciB4cCA9IGNvc3BoaSAqIHggLSBzaW5waGkgKiB5O1xuICB2YXIgeXAgPSBzaW5waGkgKiB4ICsgY29zcGhpICogeTtcblxuICByZXR1cm4ge1xuICAgIHg6IHhwICsgY2VudGVyeCxcbiAgICB5OiB5cCArIGNlbnRlcnlcbiAgfTtcbn07XG5cbnZhciBhcHByb3hVbml0QXJjID0gZnVuY3Rpb24gYXBwcm94VW5pdEFyYyhhbmcxLCBhbmcyKSB7XG4gIC8vIElmIDkwIGRlZ3JlZSBjaXJjdWxhciBhcmMsIHVzZSBhIGNvbnN0YW50XG4gIC8vIGFzIGRlcml2ZWQgZnJvbSBodHRwOi8vc3BlbmNlcm1vcnRlbnNlbi5jb20vYXJ0aWNsZXMvYmV6aWVyLWNpcmNsZVxuICB2YXIgYSA9IGFuZzIgPT09IDEuNTcwNzk2MzI2Nzk0ODk2NiA/IDAuNTUxOTE1MDI0NDk0IDogYW5nMiA9PT0gLTEuNTcwNzk2MzI2Nzk0ODk2NiA/IC0wLjU1MTkxNTAyNDQ5NCA6IDQgLyAzICogTWF0aC50YW4oYW5nMiAvIDQpO1xuXG4gIHZhciB4MSA9IE1hdGguY29zKGFuZzEpO1xuICB2YXIgeTEgPSBNYXRoLnNpbihhbmcxKTtcbiAgdmFyIHgyID0gTWF0aC5jb3MoYW5nMSArIGFuZzIpO1xuICB2YXIgeTIgPSBNYXRoLnNpbihhbmcxICsgYW5nMik7XG5cbiAgcmV0dXJuIFt7XG4gICAgeDogeDEgLSB5MSAqIGEsXG4gICAgeTogeTEgKyB4MSAqIGFcbiAgfSwge1xuICAgIHg6IHgyICsgeTIgKiBhLFxuICAgIHk6IHkyIC0geDIgKiBhXG4gIH0sIHtcbiAgICB4OiB4MixcbiAgICB5OiB5MlxuICB9XTtcbn07XG5cbnZhciB2ZWN0b3JBbmdsZSA9IGZ1bmN0aW9uIHZlY3RvckFuZ2xlKHV4LCB1eSwgdngsIHZ5KSB7XG4gIHZhciBzaWduID0gdXggKiB2eSAtIHV5ICogdnggPCAwID8gLTEgOiAxO1xuXG4gIHZhciBkb3QgPSB1eCAqIHZ4ICsgdXkgKiB2eTtcblxuICBpZiAoZG90ID4gMSkge1xuICAgIGRvdCA9IDE7XG4gIH1cblxuICBpZiAoZG90IDwgLTEpIHtcbiAgICBkb3QgPSAtMTtcbiAgfVxuXG4gIHJldHVybiBzaWduICogTWF0aC5hY29zKGRvdCk7XG59O1xuXG52YXIgZ2V0QXJjQ2VudGVyID0gZnVuY3Rpb24gZ2V0QXJjQ2VudGVyKHB4LCBweSwgY3gsIGN5LCByeCwgcnksIGxhcmdlQXJjRmxhZywgc3dlZXBGbGFnLCBzaW5waGksIGNvc3BoaSwgcHhwLCBweXApIHtcbiAgdmFyIHJ4c3EgPSBNYXRoLnBvdyhyeCwgMik7XG4gIHZhciByeXNxID0gTWF0aC5wb3cocnksIDIpO1xuICB2YXIgcHhwc3EgPSBNYXRoLnBvdyhweHAsIDIpO1xuICB2YXIgcHlwc3EgPSBNYXRoLnBvdyhweXAsIDIpO1xuXG4gIHZhciByYWRpY2FudCA9IHJ4c3EgKiByeXNxIC0gcnhzcSAqIHB5cHNxIC0gcnlzcSAqIHB4cHNxO1xuXG4gIGlmIChyYWRpY2FudCA8IDApIHtcbiAgICByYWRpY2FudCA9IDA7XG4gIH1cblxuICByYWRpY2FudCAvPSByeHNxICogcHlwc3EgKyByeXNxICogcHhwc3E7XG4gIHJhZGljYW50ID0gTWF0aC5zcXJ0KHJhZGljYW50KSAqIChsYXJnZUFyY0ZsYWcgPT09IHN3ZWVwRmxhZyA/IC0xIDogMSk7XG5cbiAgdmFyIGNlbnRlcnhwID0gcmFkaWNhbnQgKiByeCAvIHJ5ICogcHlwO1xuICB2YXIgY2VudGVyeXAgPSByYWRpY2FudCAqIC1yeSAvIHJ4ICogcHhwO1xuXG4gIHZhciBjZW50ZXJ4ID0gY29zcGhpICogY2VudGVyeHAgLSBzaW5waGkgKiBjZW50ZXJ5cCArIChweCArIGN4KSAvIDI7XG4gIHZhciBjZW50ZXJ5ID0gc2lucGhpICogY2VudGVyeHAgKyBjb3NwaGkgKiBjZW50ZXJ5cCArIChweSArIGN5KSAvIDI7XG5cbiAgdmFyIHZ4MSA9IChweHAgLSBjZW50ZXJ4cCkgLyByeDtcbiAgdmFyIHZ5MSA9IChweXAgLSBjZW50ZXJ5cCkgLyByeTtcbiAgdmFyIHZ4MiA9ICgtcHhwIC0gY2VudGVyeHApIC8gcng7XG4gIHZhciB2eTIgPSAoLXB5cCAtIGNlbnRlcnlwKSAvIHJ5O1xuXG4gIHZhciBhbmcxID0gdmVjdG9yQW5nbGUoMSwgMCwgdngxLCB2eTEpO1xuICB2YXIgYW5nMiA9IHZlY3RvckFuZ2xlKHZ4MSwgdnkxLCB2eDIsIHZ5Mik7XG5cbiAgaWYgKHN3ZWVwRmxhZyA9PT0gMCAmJiBhbmcyID4gMCkge1xuICAgIGFuZzIgLT0gVEFVO1xuICB9XG5cbiAgaWYgKHN3ZWVwRmxhZyA9PT0gMSAmJiBhbmcyIDwgMCkge1xuICAgIGFuZzIgKz0gVEFVO1xuICB9XG5cbiAgcmV0dXJuIFtjZW50ZXJ4LCBjZW50ZXJ5LCBhbmcxLCBhbmcyXTtcbn07XG5cbnZhciBhcmNUb0JlemllciA9IGZ1bmN0aW9uIGFyY1RvQmV6aWVyKF9yZWYyKSB7XG4gIHZhciBweCA9IF9yZWYyLnB4LFxuICAgICAgcHkgPSBfcmVmMi5weSxcbiAgICAgIGN4ID0gX3JlZjIuY3gsXG4gICAgICBjeSA9IF9yZWYyLmN5LFxuICAgICAgcnggPSBfcmVmMi5yeCxcbiAgICAgIHJ5ID0gX3JlZjIucnksXG4gICAgICBfcmVmMiR4QXhpc1JvdGF0aW9uID0gX3JlZjIueEF4aXNSb3RhdGlvbixcbiAgICAgIHhBeGlzUm90YXRpb24gPSBfcmVmMiR4QXhpc1JvdGF0aW9uID09PSB1bmRlZmluZWQgPyAwIDogX3JlZjIkeEF4aXNSb3RhdGlvbixcbiAgICAgIF9yZWYyJGxhcmdlQXJjRmxhZyA9IF9yZWYyLmxhcmdlQXJjRmxhZyxcbiAgICAgIGxhcmdlQXJjRmxhZyA9IF9yZWYyJGxhcmdlQXJjRmxhZyA9PT0gdW5kZWZpbmVkID8gMCA6IF9yZWYyJGxhcmdlQXJjRmxhZyxcbiAgICAgIF9yZWYyJHN3ZWVwRmxhZyA9IF9yZWYyLnN3ZWVwRmxhZyxcbiAgICAgIHN3ZWVwRmxhZyA9IF9yZWYyJHN3ZWVwRmxhZyA9PT0gdW5kZWZpbmVkID8gMCA6IF9yZWYyJHN3ZWVwRmxhZztcblxuICB2YXIgY3VydmVzID0gW107XG5cbiAgaWYgKHJ4ID09PSAwIHx8IHJ5ID09PSAwKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgdmFyIHNpbnBoaSA9IE1hdGguc2luKHhBeGlzUm90YXRpb24gKiBUQVUgLyAzNjApO1xuICB2YXIgY29zcGhpID0gTWF0aC5jb3MoeEF4aXNSb3RhdGlvbiAqIFRBVSAvIDM2MCk7XG5cbiAgdmFyIHB4cCA9IGNvc3BoaSAqIChweCAtIGN4KSAvIDIgKyBzaW5waGkgKiAocHkgLSBjeSkgLyAyO1xuICB2YXIgcHlwID0gLXNpbnBoaSAqIChweCAtIGN4KSAvIDIgKyBjb3NwaGkgKiAocHkgLSBjeSkgLyAyO1xuXG4gIGlmIChweHAgPT09IDAgJiYgcHlwID09PSAwKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgcnggPSBNYXRoLmFicyhyeCk7XG4gIHJ5ID0gTWF0aC5hYnMocnkpO1xuXG4gIHZhciBsYW1iZGEgPSBNYXRoLnBvdyhweHAsIDIpIC8gTWF0aC5wb3cocngsIDIpICsgTWF0aC5wb3cocHlwLCAyKSAvIE1hdGgucG93KHJ5LCAyKTtcblxuICBpZiAobGFtYmRhID4gMSkge1xuICAgIHJ4ICo9IE1hdGguc3FydChsYW1iZGEpO1xuICAgIHJ5ICo9IE1hdGguc3FydChsYW1iZGEpO1xuICB9XG5cbiAgdmFyIF9nZXRBcmNDZW50ZXIgPSBnZXRBcmNDZW50ZXIocHgsIHB5LCBjeCwgY3ksIHJ4LCByeSwgbGFyZ2VBcmNGbGFnLCBzd2VlcEZsYWcsIHNpbnBoaSwgY29zcGhpLCBweHAsIHB5cCksXG4gICAgICBfZ2V0QXJjQ2VudGVyMiA9IF9zbGljZWRUb0FycmF5KF9nZXRBcmNDZW50ZXIsIDQpLFxuICAgICAgY2VudGVyeCA9IF9nZXRBcmNDZW50ZXIyWzBdLFxuICAgICAgY2VudGVyeSA9IF9nZXRBcmNDZW50ZXIyWzFdLFxuICAgICAgYW5nMSA9IF9nZXRBcmNDZW50ZXIyWzJdLFxuICAgICAgYW5nMiA9IF9nZXRBcmNDZW50ZXIyWzNdO1xuXG4gIC8vIElmICdhbmcyJyA9PSA5MC4wMDAwMDAwMDAxLCB0aGVuIGByYXRpb2Agd2lsbCBldmFsdWF0ZSB0b1xuICAvLyAxLjAwMDAwMDAwMDEuIFRoaXMgY2F1c2VzIGBzZWdtZW50c2AgdG8gYmUgZ3JlYXRlciB0aGFuIG9uZSwgd2hpY2ggaXMgYW5cbiAgLy8gdW5lY2Vzc2FyeSBzcGxpdCwgYW5kIGFkZHMgZXh0cmEgcG9pbnRzIHRvIHRoZSBiZXppZXIgY3VydmUuIFRvIGFsbGV2aWF0ZVxuICAvLyB0aGlzIGlzc3VlLCB3ZSByb3VuZCB0byAxLjAgd2hlbiB0aGUgcmF0aW8gaXMgY2xvc2UgdG8gMS4wLlxuXG5cbiAgdmFyIHJhdGlvID0gTWF0aC5hYnMoYW5nMikgLyAoVEFVIC8gNCk7XG4gIGlmIChNYXRoLmFicygxLjAgLSByYXRpbykgPCAwLjAwMDAwMDEpIHtcbiAgICByYXRpbyA9IDEuMDtcbiAgfVxuXG4gIHZhciBzZWdtZW50cyA9IE1hdGgubWF4KE1hdGguY2VpbChyYXRpbyksIDEpO1xuXG4gIGFuZzIgLz0gc2VnbWVudHM7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZWdtZW50czsgaSsrKSB7XG4gICAgY3VydmVzLnB1c2goYXBwcm94VW5pdEFyYyhhbmcxLCBhbmcyKSk7XG4gICAgYW5nMSArPSBhbmcyO1xuICB9XG5cbiAgcmV0dXJuIGN1cnZlcy5tYXAoZnVuY3Rpb24gKGN1cnZlKSB7XG4gICAgdmFyIF9tYXBUb0VsbGlwc2UgPSBtYXBUb0VsbGlwc2UoY3VydmVbMF0sIHJ4LCByeSwgY29zcGhpLCBzaW5waGksIGNlbnRlcngsIGNlbnRlcnkpLFxuICAgICAgICB4MSA9IF9tYXBUb0VsbGlwc2UueCxcbiAgICAgICAgeTEgPSBfbWFwVG9FbGxpcHNlLnk7XG5cbiAgICB2YXIgX21hcFRvRWxsaXBzZTIgPSBtYXBUb0VsbGlwc2UoY3VydmVbMV0sIHJ4LCByeSwgY29zcGhpLCBzaW5waGksIGNlbnRlcngsIGNlbnRlcnkpLFxuICAgICAgICB4MiA9IF9tYXBUb0VsbGlwc2UyLngsXG4gICAgICAgIHkyID0gX21hcFRvRWxsaXBzZTIueTtcblxuICAgIHZhciBfbWFwVG9FbGxpcHNlMyA9IG1hcFRvRWxsaXBzZShjdXJ2ZVsyXSwgcngsIHJ5LCBjb3NwaGksIHNpbnBoaSwgY2VudGVyeCwgY2VudGVyeSksXG4gICAgICAgIHggPSBfbWFwVG9FbGxpcHNlMy54LFxuICAgICAgICB5ID0gX21hcFRvRWxsaXBzZTMueTtcblxuICAgIHJldHVybiB7IHgxOiB4MSwgeTE6IHkxLCB4MjogeDIsIHkyOiB5MiwgeDogeCwgeTogeSB9O1xuICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGFyY1RvQmV6aWVyOyIsImV4cG9ydCBmdW5jdGlvbiBjbG9uZShkYXRhKSB7XHJcbiAgICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgY2xvbmU7XHJcbiIsImNvbnN0IG5vdyA9IHBlcmZvcm1hbmNlLm5vdy5iaW5kKHBlcmZvcm1hbmNlKTtcclxuaW1wb3J0IGNsb25lIGZyb20gXCJ0aW55LWNsb25lXCI7XHJcbmltcG9ydCBzcHJlYWRPZmZzZXQgZnJvbSBcInNwcmVhZC1vZmZzZXRcIjtcclxuaW1wb3J0IHsgZGVlcEVxdWFsIH0gZnJvbSBcImZhc3QtZXF1YWxzXCI7XHJcbmV4cG9ydCAqIGZyb20gXCJ3YWFwaS1lYXNpbmdcIjtcclxuaW1wb3J0IEVhc2luZyBmcm9tIFwid2FhcGktZWFzaW5nXCI7XHJcbmltcG9ydCBYcnJheSBmcm9tIFwieHJyYXlcIjtcclxuWHJyYXkoQXJyYXkpO1xyXG5leHBvcnQgY2xhc3MgVHdlZW5FcnJvciBleHRlbmRzIEVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKG1zZyA9IFwiVW5rbm93blwiKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtc2c7XHJcbiAgICB9XHJcbiAgICBzZXQgbWVzc2FnZSh0bykge1xyXG4gICAgICAgIHN1cGVyLm1lc3NhZ2UgPSBcIlR3ZWVuRXJyb3I6IFwiICsgdG87XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGNsYXNzIFR3ZWVuQ2hlY2tFcnJvciBleHRlbmRzIFR3ZWVuRXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IobXNnID0gXCJVbmtub3duXCIpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMubXNnID0gbXNnO1xyXG4gICAgICAgIHRoaXMuc3RlcHMgPSBbXTtcclxuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtc2c7XHJcbiAgICB9XHJcbiAgICBzZXQgbWVzc2FnZSh0bykge1xyXG4gICAgICAgIHN1cGVyLm1lc3NhZ2UgPSBcIkNoZWNrRXJyb3I6IFwiICsgdG87XHJcbiAgICB9XHJcbiAgICBhZGRTdGVwKC4uLnN0ZXBzKSB7XHJcbiAgICAgICAgdGhpcy5zdGVwcy5kZGEoLi4uc3RlcHMpO1xyXG4gICAgICAgIHN1cGVyLm1lc3NhZ2UgPSBcIkNoZWNrRXJyb3IgYXQgXFxcIlwiICsgdGhpcy5zdGVwcy5qb2luKFwiLlwiKSArIFwiXFxcIjogXCIgKyB0aGlzLm1zZztcclxuICAgIH1cclxufVxyXG5leHBvcnQgY2xhc3MgU2ltcGxlVHdlZW4ge1xyXG4gICAgY29uc3RydWN0b3IoZnJvbSwgdG8sIG9uVXBkYXRlKSB7XHJcbiAgICAgICAgdGhpcy5mcm9tID0gZnJvbTtcclxuICAgICAgICB0aGlzLnRvID0gdG87XHJcbiAgICAgICAgdGhpcy5vblVwZGF0ZSA9IG9uVXBkYXRlO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKGF0KSB7XHJcbiAgICAgICAgdGhpcy5vblVwZGF0ZSh0aGlzLmZyb20gKyAodGhpcy50byAtIHRoaXMuZnJvbSkgKiBhdCk7XHJcbiAgICB9XHJcbn1cclxuY29uc3QgZGVmYXVsdE9wdGlvbnMgPSB7XHJcbiAgICBzdGFydDogMCxcclxuICAgIGVuZDogMTAwMCxcclxuICAgIGR1cmF0aW9uOiAxMDAwLFxyXG4gICAgZWFzaW5nOiBhID0+IGEsXHJcbiAgICBpdGVyYXRpb25zOiAxLFxyXG4gICAgZmlsbDogdHJ1ZVxyXG59O1xyXG5mdW5jdGlvbiBtZXJnZURlZmF1bHRPcHRpb25zKG9wdGlvbnMpIHtcclxuICAgIGZvciAobGV0IGtleSBpbiBkZWZhdWx0T3B0aW9ucykge1xyXG4gICAgICAgIGlmIChvcHRpb25zW2tleV0gPT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgb3B0aW9uc1trZXldID0gZGVmYXVsdE9wdGlvbnNba2V5XTtcclxuICAgIH1cclxuICAgIGlmIChvcHRpb25zLmR1cmF0aW9uICE9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgb3B0aW9ucy5lbmQgPSBvcHRpb25zLmR1cmF0aW9uO1xyXG4gICAgZWxzZVxyXG4gICAgICAgIG9wdGlvbnMuZHVyYXRpb24gPSBvcHRpb25zLmVuZCAtIG9wdGlvbnMuc3RhcnQ7XHJcbiAgICBpZiAob3B0aW9ucy5lYXNpbmcgaW5zdGFuY2VvZiBFYXNpbmcpXHJcbiAgICAgICAgb3B0aW9ucy5lYXNpbmcgPSBvcHRpb25zLmVhc2luZy5mdW5jdGlvbjtcclxuICAgIHJldHVybiBPYmplY3QuZnJlZXplKG9wdGlvbnMpO1xyXG59XHJcbmV4cG9ydCBjbGFzcyBUd2VlbiB7XHJcbiAgICBjb25zdHJ1Y3Rvcihmcm9tX2FycmF5LCB0b19rZXlmcmFtZXMsIGR1cmF0aW9uX29wdGlvbnMsIGVhc2luZykge1xyXG4gICAgICAgIHRoaXMudXBkYXRlTGlzdGVuZXJzID0gW107XHJcbiAgICAgICAgdGhpcy5sYXN0VXBkYXRlQXQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuaXNXcmFwcGVkID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBkdXJhdGlvbl9vcHRpb25zID09PSBcIm9iamVjdFwiKVxyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMgPSBtZXJnZURlZmF1bHRPcHRpb25zKGR1cmF0aW9uX29wdGlvbnMpO1xyXG4gICAgICAgIGVsc2UgaWYgKGR1cmF0aW9uX29wdGlvbnMgIT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25zID0gbWVyZ2VEZWZhdWx0T3B0aW9ucyh7XHJcbiAgICAgICAgICAgICAgICBlbmQ6IGR1cmF0aW9uX29wdGlvbnMsXHJcbiAgICAgICAgICAgICAgICBlYXNpbmcsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25zID0gbWVyZ2VEZWZhdWx0T3B0aW9ucyh7fSk7XHJcbiAgICAgICAgaWYgKGZyb21fYXJyYXkgPT09IHRydWUpXHJcbiAgICAgICAgICAgIHRoaXMua2V5ZnJhbWVzKHRvX2tleWZyYW1lcyk7XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2tleWZyYW1lcyA9IFtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFyc2VJbkFuZFdyYXAoZnJvbV9hcnJheSksXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhcnNlSW5BbmRXcmFwKHRvX2tleWZyYW1lcylcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgdGhpcy5fa2V5ZnJhbWVzWzBdLm9mZnNldCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuX2tleWZyYW1lc1sxXS5vZmZzZXQgPSAxO1xyXG4gICAgICAgICAgICB0aGlzLnByZXBJbnB1dCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHdyYXAodG9CZVdyYXBwZWQpIHtcclxuICAgICAgICB0aGlzLmlzV3JhcHBlZCA9IHR5cGVvZiB0b0JlV3JhcHBlZCAhPT0gXCJvYmplY3RcIjtcclxuICAgICAgICByZXR1cm4gdGhpcy5pc1dyYXBwZWQgPyB7IHdyYXA6IHRvQmVXcmFwcGVkIH0gOiB0b0JlV3JhcHBlZDtcclxuICAgIH1cclxuICAgIHVud3JhcCh0b0JlVW53cmFwcGVkKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNXcmFwcGVkID8gdG9CZVVud3JhcHBlZC53cmFwIDogdG9CZVVud3JhcHBlZDtcclxuICAgIH1cclxuICAgIHBhcnNlSW5BbmRXcmFwKGlucHV0KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMud3JhcCh0aGlzLnBhcnNlSW4oaW5wdXQpKTtcclxuICAgIH1cclxuICAgIHBhcnNlT3V0QW5kVW53cmFwKGludGVyaW9yKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VPdXQodGhpcy51bndyYXAoaW50ZXJpb3IpKTtcclxuICAgIH1cclxuICAgIHVwZGF0ZShhdCkge1xyXG4gICAgICAgIGlmIChhdCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXJ0VGltZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBhdCA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0VGltZSA9IG5vdygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYXQgPSBub3coKSAtIHRoaXMuc3RhcnRUaW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBpbkl0ZXJhdGlvbiA9IE1hdGguZmxvb3IoYXQgLyB0aGlzLm9wdGlvbnMuZW5kKSArIDE7XHJcbiAgICAgICAgYXQgPSBhdCAtIGluSXRlcmF0aW9uICogdGhpcy5vcHRpb25zLnN0YXJ0O1xyXG4gICAgICAgIGF0ID0gYXQgLSAoaW5JdGVyYXRpb24gLSAxKSAqIHRoaXMub3B0aW9ucy5kdXJhdGlvbjtcclxuICAgICAgICBpZiAoaW5JdGVyYXRpb24gPiB0aGlzLm9wdGlvbnMuaXRlcmF0aW9ucykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmZpbGwpXHJcbiAgICAgICAgICAgICAgICBhdCA9IHRoaXMub3B0aW9ucy5kdXJhdGlvbjtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgYXQgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChhdCA8IDApXHJcbiAgICAgICAgICAgIGF0ID0gMDtcclxuICAgICAgICBhdCA9IGF0IC8gdGhpcy5vcHRpb25zLmR1cmF0aW9uO1xyXG4gICAgICAgIGF0ID0gdGhpcy5vcHRpb25zLmVhc2luZyhhdCk7XHJcbiAgICAgICAgaWYgKHRoaXMubGFzdFVwZGF0ZUF0ICE9PSBhdCkge1xyXG4gICAgICAgICAgICBsZXQgb2Zmc2V0cyA9IHRoaXMudHdlZW5JbnN0YW5jZXNJbmRleEtleXM7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2Zmc2V0cy5sZW5ndGggLSAxOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBuZXh0T2Zmc2V0ID0gb2Zmc2V0c1tpICsgMV07XHJcbiAgICAgICAgICAgICAgICBsZXQgbGFzdE9mZnNldCA9IG9mZnNldHNbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAobGFzdE9mZnNldCA8PSBhdCAmJiBuZXh0T2Zmc2V0ID49IGF0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXQgPSAoYXQgLSBsYXN0T2Zmc2V0KSAvIChuZXh0T2Zmc2V0IC0gbGFzdE9mZnNldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50d2Vlbkluc3RhbmNlc0luZGV4LmdldChsYXN0T2Zmc2V0KS5lYSgodHdlZW4pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHdlZW4udXBkYXRlKGF0KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBOb3RpZnlcclxuICAgICAgICAgICAgbGV0IHJlcyA9IHRoaXMucGFyc2VPdXRBbmRVbndyYXAodGhpcy50d2VlbnkpO1xyXG4gICAgICAgICAgICBpZiAoIWRlZXBFcXVhbChyZXMsIHRoaXMubGFzdFBhcnNlZE91dHB1dCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlTGlzdGVuZXJzLmVhKChmKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZihyZXMpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3RQYXJzZWRPdXRwdXQgPSByZXM7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3RVcGRhdGVBdCA9IGF0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmxhc3RQYXJzZWRPdXRwdXQ7XHJcbiAgICB9XHJcbiAgICBvblVwZGF0ZShscykge1xyXG4gICAgICAgIHRoaXMudXBkYXRlTGlzdGVuZXJzLmFkZChscyk7XHJcbiAgICAgICAgcmV0dXJuIGxzO1xyXG4gICAgfVxyXG4gICAgb2ZmVXBkYXRlKGxzKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVMaXN0ZW5lcnMucm1WKGxzKTtcclxuICAgIH1cclxuICAgIGZyb20odG8pIHtcclxuICAgICAgICBpZiAodG8gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9rZXlmcmFtZXMuZmlyc3QgPSB0aGlzLnBhcnNlSW5BbmRXcmFwKHRvKTtcclxuICAgICAgICAgICAgdGhpcy5fa2V5ZnJhbWVzLmZpcnN0Lm9mZnNldCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMucHJlcElucHV0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VPdXRBbmRVbndyYXAodGhpcy5fa2V5ZnJhbWVzLmZpcnN0KTtcclxuICAgIH1cclxuICAgIHRvKHRvKSB7XHJcbiAgICAgICAgaWYgKHRvICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fa2V5ZnJhbWVzLmxhc3QgPSB0aGlzLnBhcnNlSW5BbmRXcmFwKHRvKTtcclxuICAgICAgICAgICAgdGhpcy5fa2V5ZnJhbWVzLmxhc3Qub2Zmc2V0ID0gMTtcclxuICAgICAgICAgICAgdGhpcy5wcmVwSW5wdXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJzZU91dEFuZFVud3JhcCh0aGlzLl9rZXlmcmFtZXMubGFzdCk7XHJcbiAgICB9XHJcbiAgICBrZXlmcmFtZXModG8pIHtcclxuICAgICAgICBpZiAodG8gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9rZXlmcmFtZXMgPSBbXTtcclxuICAgICAgICAgICAgaWYgKHRvLmxlbmd0aCA8IDIpXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHdlZW5FcnJvcihcIkludmFsaWQga2V5ZnJhbWVzLiBNdXN0IGhhdmUgYSBtaW5pbXVtIGxlbmd0aCBvZiAyLlwiKTtcclxuICAgICAgICAgICAgbGV0IG9mZnNldDtcclxuICAgICAgICAgICAgdG8uZWEoKGUsIGkpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBoYXNPZmZzZXQgPSBvZmZzZXQgIT09IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIGlmIChoYXNPZmZzZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICBvZmZzZXQgPSBlLm9mZnNldDtcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgZS5vZmZzZXQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9rZXlmcmFtZXNbaV0gPSB0aGlzLnBhcnNlSW5BbmRXcmFwKGUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGhhc09mZnNldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2tleWZyYW1lc1tpXS5vZmZzZXQgPSBvZmZzZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5vZmZzZXQgPSBvZmZzZXQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnByZXBJbnB1dCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IG5ld0tleWZyYW1lcyA9IFtdO1xyXG4gICAgICAgICAgICBsZXQgb2Zmc2V0O1xyXG4gICAgICAgICAgICB0aGlzLl9rZXlmcmFtZXMuZWEoKGUsIGkpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBoYXNPZmZzZXQgPSBvZmZzZXQgIT09IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIGlmIChoYXNPZmZzZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICBvZmZzZXQgPSBlLm9mZnNldDtcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgZS5vZmZzZXQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBuZXdLZXlmcmFtZXNbaV0gPSB0aGlzLnBhcnNlT3V0QW5kVW53cmFwKGUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGhhc09mZnNldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2tleWZyYW1lc1tpXS5vZmZzZXQgPSBvZmZzZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5vZmZzZXQgPSBvZmZzZXQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgcmV0dXJuIG5ld0tleWZyYW1lcztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcmVwSW5wdXQoKSB7XHJcbiAgICAgICAgc3ByZWFkT2Zmc2V0KHRoaXMuX2tleWZyYW1lcyk7XHJcbiAgICAgICAgdGhpcy5jaGVja0lucHV0KHRoaXMuX2tleWZyYW1lcyk7XHJcbiAgICAgICAgdGhpcy50d2VlbnkgPSBjbG9uZSh0aGlzLl9rZXlmcmFtZXMuZmlyc3QpO1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLnR3ZWVueS5vZmZzZXQ7XHJcbiAgICAgICAgdGhpcy50d2Vlbkluc3RhbmNlc0luZGV4ID0gbmV3IE1hcCgpO1xyXG4gICAgICAgIHRoaXMucHJlcFR3ZWVueSh0aGlzLnR3ZWVueSwgdGhpcy5fa2V5ZnJhbWVzKTtcclxuICAgICAgICB0aGlzLnR3ZWVuSW5zdGFuY2VzSW5kZXguc2V0KDEsIG51bGwpO1xyXG4gICAgICAgIHRoaXMudHdlZW5JbnN0YW5jZXNJbmRleEtleXMgPSBbLi4udGhpcy50d2Vlbkluc3RhbmNlc0luZGV4LmtleXMoKV07XHJcbiAgICB9XHJcbiAgICBwcmVwVHdlZW55KHR3ZWVueSwga2V5ZnJhbWVzKSB7XHJcbiAgICAgICAgbGV0IHR5cGVvZkZyb207XHJcbiAgICAgICAgbGV0IHR5cGVvZkZyb21Jc051bWJlcjtcclxuICAgICAgICBsZXQgdHlwZW9mRnJvbUlzT2JqZWN0O1xyXG4gICAgICAgIGNvbnN0IG9mZnNldFN0cmluZyA9IFwib2Zmc2V0XCI7XHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdHdlZW55KSB7XHJcbiAgICAgICAgICAgIHR5cGVvZkZyb20gPSB0eXBlb2Yga2V5ZnJhbWVzLmZpcnN0W2tleV07XHJcbiAgICAgICAgICAgIHR5cGVvZkZyb21Jc051bWJlciA9IHR5cGVvZkZyb20gPT09IFwibnVtYmVyXCI7XHJcbiAgICAgICAgICAgIHR5cGVvZkZyb21Jc09iamVjdCA9IHR5cGVvZkZyb20gPT09IFwib2JqZWN0XCI7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5ZnJhbWVzLmxlbmd0aCAtIDE7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IG9mZnNldCA9IGtleWZyYW1lc1tpXS5vZmZzZXQ7XHJcbiAgICAgICAgICAgICAgICBsZXQgZnJvbSA9IGtleWZyYW1lc1tpXVtrZXldO1xyXG4gICAgICAgICAgICAgICAgbGV0IHRvID0ga2V5ZnJhbWVzW2kgKyAxXVtrZXldO1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZkZyb21Jc051bWJlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0d2Vlbkluc3RhbmNlcyA9IHRoaXMudHdlZW5JbnN0YW5jZXNJbmRleC5nZXQob2Zmc2V0KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHdlZW5JbnN0YW5jZXMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYXIgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50d2Vlbkluc3RhbmNlc0luZGV4LnNldChvZmZzZXQsIGFyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHdlZW5JbnN0YW5jZXMgPSBhcjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdHdlZW5JbnN0YW5jZXMuYWRkKG5ldyBTaW1wbGVUd2Vlbihmcm9tLCB0bywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHdlZW55W2tleV0gPSBlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodHlwZW9mRnJvbUlzT2JqZWN0KSB7XHJcbiAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgIGxldCBuZXdLZXlmcmFtZSA9IGtleWZyYW1lcy5Jbm5lcihrZXkpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlmcmFtZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXdLZXlmcmFtZVtpXS5vZmZzZXQgPSBrZXlmcmFtZXNbaV0ub2Zmc2V0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5wcmVwVHdlZW55KHR3ZWVueVtrZXldLCBuZXdLZXlmcmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHR3ZWVueTtcclxuICAgIH1cclxuICAgIGNoZWNrSW5wdXQoaW50ZXJpb3JzKSB7XHJcbiAgICAgICAgbGV0IHR5cGUgPSB0eXBlb2YgaW50ZXJpb3JzLmZpcnN0O1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgaW50ZXJpb3JzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlICE9PSB0eXBlb2YgaW50ZXJpb3JzW2ldKVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR3ZWVuQ2hlY2tFcnJvcihcIlR5cGVzIGFyZSBub3QgZXF1YWwgYXQgaW5kZXggXCIgKyBpICsgXCIuXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKGludGVyaW9ycy5maXJzdCk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgaW50ZXJpb3JzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbWUgPSBPYmplY3Qua2V5cyhpbnRlcmlvcnNbaV0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKGtleXMubGVuZ3RoICE9PSBtZS5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR3ZWVuQ2hlY2tFcnJvcihcIkxlbmd0aCBvZiBrZXlzIGFyZSBub3QgZXF1YWwgYXQgaW5kZXggXCIgKyBpICsgXCIuXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFtZS5jb250YWlucyguLi5rZXlzKSlcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHdlZW5DaGVja0Vycm9yKFwiS2V5cyBkbyBub3QgbWF0Y2ggYXQgaW5kZXggXCIgKyBpICsgXCIuXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAobGV0IGtleSBvZiBrZXlzKSB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tJbnB1dChpbnRlcmlvcnMuSW5uZXIoa2V5KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlIGluc3RhbmNlb2YgVHdlZW5DaGVja0Vycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGUuYWRkU3RlcChrZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGUgIT09IFwibnVtYmVyXCIpIHtcclxuICAgICAgICAgICAgbGV0IHZhbCA9IGludGVyaW9ycy5maXJzdDtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBpbnRlcmlvcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmICh2YWwgIT09IGludGVyaW9yc1tpXSlcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHdlZW5DaGVja0Vycm9yKFwiVW5hYmxlIHRvIGludGVycG9sYXRlIGJldHdlZW4gbm9uZSBudW1lcmljIHZhbHVlcy4gV2hlbiB1c2luZyBzdWNoLCBtYWtlIHN1cmUgdGhlIHZhbHVlcyBhcmUgdGhlIHNhbWUgYXQgZ2l2ZW4gYWxsIGdpdmVuIGtleWZyYW1lcy4gRXJyb3IgZWNjdXJlZCBhdCBpbmRleCBcIiArIGkgKyBcIi5cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVHdlZW5PYmplY3QgZXh0ZW5kcyBUd2VlbiB7XHJcbiAgICBwYXJzZUluKGZhY2UpIHtcclxuICAgICAgICByZXR1cm4gY2xvbmUoZmFjZSk7XHJcbiAgICB9XHJcbiAgICBwYXJzZU91dChpbnRlcmlvcikge1xyXG4gICAgICAgIHJldHVybiBjbG9uZShpbnRlcmlvcik7XHJcbiAgICB9XHJcbn1cclxuIiwiY29uc3QgcGFyc2UgPSByZXF1aXJlKCdwYXJzZS1zdmctcGF0aCcpO1xyXG5jb25zdCBhYnMgPSByZXF1aXJlKCdhYnMtc3ZnLXBhdGgnKTtcclxuY29uc3Qgbm9ybWFsaXplID0gcmVxdWlyZSgnbm9ybWFsaXplLXN2Zy1wYXRoJyk7XHJcbmV4cG9ydCBjb25zdCB0b09iamVjdCA9IGZ1bmN0aW9uIChwYXRoKSB7XHJcbiAgICBsZXQgb2Zmc2V0ID0gcGF0aC5vZmZzZXQ7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGxldCBwYXJzZWQgPSBub3JtYWxpemUoYWJzKHBhcnNlKHBhdGgpKSk7XHJcbiAgICAgICAgaWYgKG9mZnNldCAhPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICBwYXJzZWQub2Zmc2V0ID0gb2Zmc2V0O1xyXG4gICAgICAgIHJldHVybiBwYXJzZWQ7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBwYXJzZUluIHN2Z1BhdGhTdHJpbmcuXCIpO1xyXG4gICAgfVxyXG59O1xyXG5leHBvcnQgY29uc3QgdG9QYXRoID0gZnVuY3Rpb24gKHNlZ21lbnRzKSB7XHJcbiAgICBsZXQgaSA9IDA7XHJcbiAgICBsZXQgcyA9IFwiXCI7XHJcbiAgICBmb3IgKDsgaSA8IHNlZ21lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgcyArPSBzZWdtZW50c1tpXS5qb2luKFwiIFwiKSArIFwiIFwiO1xyXG4gICAgfVxyXG4gICAgcyA9IHMuc3Vic3RyKDAsIHMubGVuZ3RoIC0gMSk7XHJcbiAgICByZXR1cm4gcztcclxufTtcclxuIiwiaW1wb3J0IGFuaW1hdGlvbkZyYW1lRGVsdGEgZnJvbSBcImFuaW1hdGlvbi1mcmFtZS1kZWx0YVwiO1xyXG5pbXBvcnQgVHdlZW5PYmplY3QsIHsgVHdlZW4gfSBmcm9tIFwidHdlZW4tb2JqZWN0XCI7XHJcbmltcG9ydCAqIGFzIHBhciBmcm9tIFwiLi9wYXJzZVwiO1xyXG5leHBvcnQgbGV0IHBhcnNlID0gcGFyO1xyXG5jbGFzcyBDb250cm9sYWJsZVN0cmluZ1R3ZWVuIGV4dGVuZHMgVHdlZW4ge1xyXG4gICAgcGFyc2VJbihmYWNlKSB7XHJcbiAgICAgICAgcmV0dXJuIHBhcnNlLnRvT2JqZWN0KGZhY2UpO1xyXG4gICAgfVxyXG4gICAgcGFyc2VPdXQoaW50ZXJpb3IpIHtcclxuICAgICAgICByZXR1cm4gcGFyc2UudG9QYXRoKGludGVyaW9yKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoZnJvbV9hcnJheSwgdG9fa2V5ZnJhbWVzLCBkdXJhdGlvbl9vcHRpb25zLCBlYXNpbmdfcnVuLCBydW4pIHtcclxuICAgIC8vIGRlZmF1bHRzXHJcbiAgICBsZXQgZHVyYXRpb247XHJcbiAgICBpZiAoZHVyYXRpb25fb3B0aW9ucyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgaWYgKHJ1biA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICBydW4gPSB0cnVlO1xyXG4gICAgICAgIGlmIChydW4pXHJcbiAgICAgICAgICAgIGR1cmF0aW9uX29wdGlvbnMgPSAxMDAwO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgZHVyYXRpb25fb3B0aW9ucyA9IDE7XHJcbiAgICAgICAgZHVyYXRpb24gPSBkdXJhdGlvbl9vcHRpb25zO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodHlwZW9mIGR1cmF0aW9uX29wdGlvbnMgPT09IFwibnVtYmVyXCIpIHtcclxuICAgICAgICBpZiAocnVuID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIHJ1biA9IHRydWU7XHJcbiAgICAgICAgZHVyYXRpb24gPSBkdXJhdGlvbl9vcHRpb25zO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgaWYgKGVhc2luZ19ydW4gPT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgcnVuID0gdHJ1ZTtcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcnVuID0gZWFzaW5nX3J1bjtcclxuICAgICAgICAgICAgZWFzaW5nX3J1biA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgaWYgKGR1cmF0aW9uX29wdGlvbnMuZW5kID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgIGlmIChydW4pXHJcbiAgICAgICAgICAgICAgICBkdXJhdGlvbl9vcHRpb25zLmVuZCA9IGR1cmF0aW9uX29wdGlvbnMuc3RhcnQgKyAxMDAwO1xyXG4gICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgZHVyYXRpb25fb3B0aW9ucy5lbmQgPSBkdXJhdGlvbl9vcHRpb25zLnN0YXJ0ICsgMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgZHVyYXRpb24gPSBkdXJhdGlvbl9vcHRpb25zLmVuZDtcclxuICAgIH1cclxuICAgIGxldCBlbGVtO1xyXG4gICAgaWYgKGZyb21fYXJyYXkgaW5zdGFuY2VvZiBTVkdQYXRoRWxlbWVudCkge1xyXG4gICAgICAgIGVsZW0gPSBmcm9tX2FycmF5O1xyXG4gICAgICAgIGZyb21fYXJyYXkgPSBlbGVtLmdldEF0dHJpYnV0ZShcImRcIik7XHJcbiAgICB9XHJcbiAgICBsZXQgSW50ZXJwb2xhdG9yQ2xhc3MgPSBmcm9tX2FycmF5ID09PSB0cnVlID8gdHlwZW9mIHRvX2tleWZyYW1lcy5maXJzdCA9PT0gXCJzdHJpbmdcIiA/IENvbnRyb2xhYmxlU3RyaW5nVHdlZW4gOiBUd2Vlbk9iamVjdCA6IHR5cGVvZiBmcm9tX2FycmF5ID09PSBcInN0cmluZ1wiID8gQ29udHJvbGFibGVTdHJpbmdUd2VlbiA6IFR3ZWVuT2JqZWN0O1xyXG4gICAgLy9AdHMtaWdub3JlXHJcbiAgICBsZXQgaW50ZXJwb2xhdG9yID0gbmV3IEludGVycG9sYXRvckNsYXNzKGZyb21fYXJyYXksIHRvX2tleWZyYW1lcywgZHVyYXRpb25fb3B0aW9ucywgZWFzaW5nX3J1bik7XHJcbiAgICAvL0B0cy1pZ25vcmVcclxuICAgIGlmIChydW4pXHJcbiAgICAgICAgYW5pbWF0aW9uRnJhbWVEZWx0YShpbnRlcnBvbGF0b3IudXBkYXRlLmJpbmQoaW50ZXJwb2xhdG9yKSwgZHVyYXRpb24sIGludGVycG9sYXRvci5vcHRpb25zLml0ZXJhdGlvbnMpO1xyXG4gICAgaWYgKGVsZW0gIT09IHVuZGVmaW5lZClcclxuICAgICAgICBpbnRlcnBvbGF0b3Iub25VcGRhdGUoKHMpID0+IHtcclxuICAgICAgICAgICAgZWxlbS5zZXRBdHRyaWJ1dGUoXCJkXCIsIHMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgcmV0dXJuIGludGVycG9sYXRvcjtcclxufVxyXG4iLCJpbXBvcnQgYmF6IGZyb20gXCJiZXppZXItZWFzaW5nXCI7XHJcbmltcG9ydCB7IGNhbWVsQ2FzZVRvRGFzaCwgZGFzaFRvQ2FtZWxDYXNlIH0gZnJvbSBcImRhc2gtY2FtZWxjYXNlXCI7XHJcbmV4cG9ydCBjbGFzcyBFYXNpbmcge1xyXG4gICAgY29uc3RydWN0b3IoYXhfa2V5d29yZCwgYXksIGJ4LCBieSkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgYXhfa2V5d29yZCAhPT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgICAgICB0aGlzLmtleXdvcmQgPSBheF9rZXl3b3JkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5heCA9IGF4X2tleXdvcmQ7XHJcbiAgICAgICAgICAgIHRoaXMuYXkgPSBheTtcclxuICAgICAgICAgICAgdGhpcy5ieCA9IGJ4O1xyXG4gICAgICAgICAgICB0aGlzLmJ5ID0gYnk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0IHN0cmluZygpIHtcclxuICAgICAgICBpZiAodGhpcy5rZXl3b3JkID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIHJldHVybiBcImN1YmljLWJlemllcihcIiArIHRoaXMuYXggKyBcIixcIiArIHRoaXMuYXkgKyBcIixcIiArIHRoaXMuYnggKyBcIixcIiArIHRoaXMuYnkgKyBcIilcIjtcclxuICAgICAgICByZXR1cm4gY2FtZWxDYXNlVG9EYXNoKHRoaXMua2V5d29yZCk7XHJcbiAgICB9XHJcbiAgICBnZXQgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYXggPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBsZXQgZiA9IEVhc2luZy5rZXl3b3Jkc1tkYXNoVG9DYW1lbENhc2UodGhpcy5rZXl3b3JkKV07XHJcbiAgICAgICAgICAgIHRoaXMuYXggPSBmWzBdO1xyXG4gICAgICAgICAgICB0aGlzLmF5ID0gZlsxXTtcclxuICAgICAgICAgICAgdGhpcy5ieCA9IGZbMl07XHJcbiAgICAgICAgICAgIHRoaXMuYnkgPSBmWzNdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYmF6KHRoaXMuYXgsIHRoaXMuYXksIHRoaXMuYngsIHRoaXMuYnkpO1xyXG4gICAgfVxyXG59XHJcbkVhc2luZy5rZXl3b3JkcyA9IHtcclxuICAgIGxpbmVhcjogWy4yNSwgLjI1LCAuNzUsIC43NV0sXHJcbiAgICBlYXNlOiBbLjI1LCAuMSwgLjI1LCAxXSxcclxuICAgIGVhc2VJbjogWy40MiwgMCwgMSwgMV0sXHJcbiAgICBlYXNlT3V0OiBbMCwgMCwgLjU4LCAxXSxcclxuICAgIGVhc2VJbk91dDogWy40MiwgMCwgLjU4LCAxXVxyXG59O1xyXG5leHBvcnQgZGVmYXVsdCBFYXNpbmc7XHJcbiIsInZhciBnO1xuXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxuZyA9IChmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXM7XG59KSgpO1xuXG50cnkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcblx0ZyA9IGcgfHwgbmV3IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcbn0gY2F0Y2ggKGUpIHtcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcblx0aWYgKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpIGcgPSB3aW5kb3c7XG59XG5cbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XG5cbm1vZHVsZS5leHBvcnRzID0gZztcbiIsIi8vIFRPRE86IG9wdGlvbnMgdG8gZ2l2ZSBybSBmdW5jdGlvbiB0aGF0IHJldHVybiB0cnVlIG9yIGZhbHNlIGRlcGVuZGluZyBvbiBpZiB0aGUgZWxlbWVudCBzaG91bGQgYmUgcmVtb3ZlZFxyXG4vLyBUT0RPOiByZW1vdmUgdW5zYWZlIG9wdGlvbiAoanVzdCByZW1vdmUgYWxsIGVsZW1zIG9yIGluZGV4ZXMgdGhhdCBhcmUgdGhlcmUpIGRvbnQgdGhyb3cgaWYgaW52YWxpZFxyXG4vLyBUT0RPOiBhZGRJZk5vdEFscmVhZHlJbmNsdWRlZDogY29sbGVjdCgpXHJcblxyXG5cclxuY2xhc3MgRXhjZXB0aW9uIGV4dGVuZHMgRXJyb3Ige1xyXG4gIGNvbnN0cnVjdG9yKG1zZykge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHRoaXMubWVzc2FnZSA9IHRoaXMuY29uc3RydWN0b3IubmFtZTtcclxuICAgIGlmIChtc2cgIT09IHVuZGVmaW5lZCkgdGhpcy5tZXNzYWdlICs9IFwiOiBcIiArIG1zZztcclxuICB9XHJcbn1cclxuY2xhc3MgSW5kZXhPdXRPZkJvdW5kc0V4Y2VwdGlvbiBleHRlbmRzIEV4Y2VwdGlvbiB7XHJcbiAgY29uc3RydWN0b3IoaW5kZXgsIGFycmF5KSB7XHJcbiAgICBzdXBlcihcIkdpdmVuIHZhbHVlIFxcXCJcIiArIGluZGV4ICsgXCJcXFwiIG11c3QgYmUgaW4gcmFuZ2UgMC1cIiArIChhcnJheS5sZW5ndGgtMSkgKyBcIi5cIik7XHJcbiAgICB0aGlzLmluZGV4ID0gaW5kZXg7XHJcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XHJcbiAgfVxyXG59XHJcbmNsYXNzIEludmFsaWRJbnB1dEV4Y2VwdGlvbiBleHRlbmRzIEV4Y2VwdGlvbiB7XHJcbiAgY29uc3RydWN0b3IobXNnKSB7XHJcbiAgICBzdXBlcihcIkdpdmVuIGlucHV0IGlzIGludmFsaWQuXFxuXCIgKyBtc2cpO1xyXG4gIH1cclxufVxyXG5jbGFzcyBJbnZhbGlkVmFsdWVFeGNlcHRpb24gZXh0ZW5kcyBFeGNlcHRpb24ge1xyXG4gIGNvbnN0cnVjdG9yKHZhbHVlLCBhcnJheSkge1xyXG4gICAgc3VwZXIoXCJVbmFibGUgdG8gZmluZCBnaXZlbiB2YWx1ZTogXCIgKyB2YWx1ZS5jb25zdHJ1Y3Rvci5uYW1lICsgXCIgXCIgKyBKU09OLnN0cmluZ2lmeSh2YWx1ZSkgKyBcIjsgd2l0aGluIGZvbGxvd2luZyBhcnJheTogXCIgKyBhcnJheS50b1N0cmluZygpKTtcclxuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcclxuICB9XHJcbn1cclxuXHJcbi8vVGhyb3dzIEluZGV4T3V0T2ZCb3VuZHNFeGNlcHRpb24gd2hlbiBnaXZlbiBpbmRleCBpcyBvdXQgb2YgYm91bmRzIG9mIGFcclxuZnVuY3Rpb24gaXNJbmRleChpLCBhKSB7XHJcbiAgaWYoIWEuaGFzT3duUHJvcGVydHkoaSkpIHRocm93IG5ldyBJbmRleE91dE9mQm91bmRzRXhjZXB0aW9uKGksYSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFwcGVuZFRvUHJvdG90eXBlT2Yob2YpIHtcclxuICByZXR1cm4gZnVuY3Rpb24obmFtZSwgZnVuYykge1xyXG4gICAgY29uc3QgaXNGdW5jID0gdHlwZW9mIGZ1bmMgPT09IFwiZnVuY3Rpb25cIlxyXG4gICAgaWYgKG5hbWUgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5hbWUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBhcHBlbmRUb1Byb3RvdHlwZShuYW1lW2ldLCBmdW5jLCBpc0Z1bmMpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2UgYXBwZW5kVG9Qcm90b3R5cGUobmFtZSwgZnVuYywgaXNGdW5jKVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gYXBwZW5kVG9Qcm90b3R5cGUobmFtZSwgZnVuYywgaXNGdW5jKSB7XHJcbiAgICBsZXQgb2JcclxuICAgIGlmIChpc0Z1bmMpIHtcclxuICAgICAgb2IgPSB7XHJcbiAgICAgICAgdmFsdWU6IGZ1bmMsXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2VcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIG9iID0gZnVuY1xyXG4gICAgICBvYi5lbnVtZXJhYmxlID0gZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2YsIG5hbWUsIG9iKVxyXG4gIH1cclxufVxyXG5cclxuXHJcblxyXG5cclxuY29uc3QgeHJyYXlTeW1ib2wgPSBTeW1ib2woXCJ4cnJheVwiKTtcclxuXHJcbmZ1bmN0aW9uIGluaXQoWHJyYXkgPSBBcnJheSkge1xyXG4gIGlmIChYcnJheVt4cnJheVN5bWJvbF0pIHJldHVybiBYcnJheTtcclxuICBYcnJheVt4cnJheVN5bWJvbF0gPSB0cnVlO1xyXG5cclxuICBjb25zdCBhcHBlbmRUb1hycmF5ID0gYXBwZW5kVG9Qcm90b3R5cGVPZihYcnJheS5wcm90b3R5cGUpXHJcblxyXG5cclxuICBhcHBlbmRUb1hycmF5KFtcImVhY2hcIiwgXCJlYVwiXSwgZnVuY3Rpb24oZiwgdCA9IHRoaXMpIHtcclxuICAgIGlmICh0aGlzLmxlbmd0aCA+IDApIHtcclxuICAgICAgbGV0IGU7XHJcbiAgICAgIGxldCBzdGFydEk7XHJcbiAgICAgIGZvciAoc3RhcnRJID0gMDsgc3RhcnRJIDwgdC5sZW5ndGg7IHN0YXJ0SSsrKSB7XHJcbiAgICAgICAgaWYgKHQuaGFzT3duUHJvcGVydHkoc3RhcnRJKSkge1xyXG4gICAgICAgICAgZSA9IGYuY2FsbCh0LCB0W3N0YXJ0SV0sIHN0YXJ0SSwgdGhpcyk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgc3RhcnRJKys7XHJcbiAgICAgIGlmIChlIGluc3RhbmNlb2YgUHJvbWlzZSkge1xyXG4gICAgICAgIHJldHVybiAoYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgbGV0IHIgPSBhd2FpdCBlO1xyXG4gICAgICAgICAgaWYgKHIgIT09IHVuZGVmaW5lZCkgcmV0dXJuIHI7XHJcblxyXG4gICAgICAgICAgZm9yIChsZXQgaSA9IHN0YXJ0STsgaSA8IHQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKCF0Lmhhc093blByb3BlcnR5KGkpKSBjb250aW51ZTtcclxuICAgICAgICAgICAgbGV0IGUgPSBhd2FpdCBmLmNhbGwodCwgdFtpXSwgaSwgdGhpcyk7XHJcbiAgICAgICAgICAgIGlmIChlICE9PSB1bmRlZmluZWQpIHJldHVybiBlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pKCk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgaWYgKGUgIT09IHVuZGVmaW5lZCkgcmV0dXJuIGU7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHN0YXJ0STsgaSA8IHQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIGlmICghdC5oYXNPd25Qcm9wZXJ0eShpKSkgY29udGludWU7XHJcbiAgICAgICAgICBsZXQgZSA9IGYuY2FsbCh0LCB0W2ldLCBpLCB0aGlzKTtcclxuICAgICAgICAgIGlmIChlICE9PSB1bmRlZmluZWQpIHJldHVybiBlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pXHJcblxyXG4gIGFwcGVuZFRvWHJyYXkoXCJlbXB0eVwiLCB7Z2V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMubGVuZ3RoID09PSAwO1xyXG4gIH19KVxyXG5cclxuICBhcHBlbmRUb1hycmF5KFwibGFzdFwiLCB7XHJcbiAgICBnZXQoKSB7XHJcbiAgICAgIGlmICh0aGlzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgcmV0dXJuIHRoaXNbdGhpcy5sZW5ndGgtMV07XHJcbiAgICB9LFxyXG4gICAgc2V0KHRvKSB7XHJcbiAgICAgIHRoaXNbdGhpcy5sZW5ndGggPT09IDAgPyAwIDogdGhpcy5sZW5ndGhdID0gdG9cclxuICAgIH1cclxuXHJcbiAgfSlcclxuXHJcbiAgYXBwZW5kVG9YcnJheShcInJlYWxMZW5ndGhcIiwge2dldCgpIHtcclxuICAgIGxldCBsID0gMDtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAodGhpcy5oYXNPd25Qcm9wZXJ0eShpKSkgbCsrO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGw7XHJcbiAgfX0pXHJcblxyXG4gIGFwcGVuZFRvWHJyYXkoXCJmaXJzdFwiLCB7XHJcbiAgICBnZXQoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzWzBdO1xyXG4gICAgfSxcclxuICAgIHNldCh0bykge1xyXG4gICAgICB0aGlzWzBdID0gdG87XHJcbiAgICB9XHJcbiAgfSlcclxuXHJcbiAgYXBwZW5kVG9YcnJheShcImNsZWFyXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5sZW5ndGggPSAwO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfSlcclxuXHJcbiAgYXBwZW5kVG9YcnJheShcIkNsZWFyXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIG5ldyBYcnJheSgpO1xyXG4gIH0pXHJcblxyXG4gIGFwcGVuZFRvWHJyYXkoXCJhZGRcIiwgZnVuY3Rpb24oLi4udmFsdWVzKSB7XHJcbiAgICB0aGlzLnB1c2goLi4udmFsdWVzKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH0pXHJcbiAgYXBwZW5kVG9YcnJheShcIkFkZFwiLCBmdW5jdGlvbiguLi52YWx1ZXMpIHtcclxuICAgIHJldHVybiBuZXcgWHJyYXkoKS5hZGQoLi4udGhpcywgLi4udmFsdWVzKTtcclxuICB9KVxyXG5cclxuXHJcbiAgYXBwZW5kVG9YcnJheShcInNldFwiLCBmdW5jdGlvbihhID0gW10pIHtcclxuICAgIGlmKHRoaXMgPT09IGEpIHJldHVybiB0aGlzO1xyXG4gICAgaWYoYSBpbnN0YW5jZW9mIEFycmF5KSByZXR1cm4gdGhpcy5jbGVhcigpLmFkZCguLi5hKTtcclxuICAgIHJldHVybiB0aGlzLmNsZWFyKCkuYWRkKGEpO1xyXG4gIH0pXHJcblxyXG4gIGFwcGVuZFRvWHJyYXkoXCJTZXRcIiwgZnVuY3Rpb24oYSA9IFtdKSB7XHJcbiAgICByZXR1cm4gbmV3IFhycmF5KCkuYWRkKC4uLmEpO1xyXG4gIH0pXHJcblxyXG4gIGFwcGVuZFRvWHJyYXkoXCJjbG9uZVwiLCBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLlNldCh0aGlzKTtcclxuICB9KVxyXG4gIGFwcGVuZFRvWHJyYXkoXCJSZXZlcnNlXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuU2V0KHRoaXMpLnJldmVyc2UoKTtcclxuICB9KVxyXG5cclxuICBhcHBlbmRUb1hycmF5KFwiZ2F0aGVyXCIsIGZ1bmN0aW9uKC4uLmEpIHtcclxuICAgIGEuZWEoKGUpID0+IHtcclxuICAgICAgaWYgKCF0aGlzLmluY2x1ZGVzKGUpKSB0aGlzLmFkZChlKTtcclxuICAgIH0pXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9KVxyXG5cclxuICBhcHBlbmRUb1hycmF5KFwiR2F0aGVyXCIsIGZ1bmN0aW9uKC4uLmEpIHtcclxuICAgIGxldCB0ID0gdGhpcy5jbG9uZSgpO1xyXG4gICAgYS5lYSgoZSkgPT4ge1xyXG4gICAgICBpZiAoIXQuaW5jbHVkZXMoZSkpIHQuYWRkKGUpO1xyXG4gICAgfSlcclxuICAgIHJldHVybiB0O1xyXG4gIH0pXHJcblxyXG4gIFxyXG5cclxuICBsZXQgbWFyayA9IFN5bWJvbChcIk1hcmtcIik7XHJcblxyXG4gIC8vVGhyb3dzIEludmFsaWRWYWx1ZUV4Y2VwdGlvbiB3aGVuIHRoZSBnaXZlbiB2YWx1ZSBjYW5ub3QgYmUgZm91bmQgd2l0aGluZyB0aGlzXHJcbiAgLy8gVE9ETzogZGlmZmVyZW50YXRlIGluZGV4YWxsIGFuZCBpbmRleGZpcnN0XHJcbiAgYXBwZW5kVG9YcnJheShcImluZGV4XCIsIGZ1bmN0aW9uKC4uLnZhbHVlcykge1xyXG4gICAgbGV0IHRoYXQgPSB0aGlzLlNldCh0aGlzKTtcclxuICAgIGxldCBpbmRleGVzID0gbmV3IFhycmF5KCk7XHJcbiAgICB2YWx1ZXMuZWEoKHYpID0+IHtcclxuICAgICAgaWYoIXRoaXMuaW5jbHVkZXModikpIHRocm93IG5ldyBJbnZhbGlkVmFsdWVFeGNlcHRpb24odix0aGlzKTtcclxuICAgICAgd2hpbGUgKHRydWUpIHtcclxuICAgICAgICBsZXQgaW5kZXggPSB0aGF0LmluZGV4T2Yodik7XHJcbiAgICAgICAgaWYgKGluZGV4ZXMubGFzdCAhPT0gaW5kZXggJiYgaW5kZXggIT09IC0xKXtcclxuICAgICAgICAgIGluZGV4ZXMuYWRkKGluZGV4KTtcclxuICAgICAgICAgIHRoYXRbaW5kZXhdID0gbWFyaztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBicmVhaztcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gaW5kZXhlcztcclxuICB9KVxyXG4gIFxyXG4gIC8vVGhyb3dzIEluZGV4T3V0T2ZCb3VuZHNFeGNlcHRpb24gd2hlbiBnaXZlbiBpbmRleCBpcyBvdXQgb2YgYm91bmRzIG9mIHRoaXNcclxuICBhcHBlbmRUb1hycmF5KFtcInJlbW92ZUlcIiwgXCJybUlcIl0sIGZ1bmN0aW9uKC4uLmluZGljZXMpIHtcclxuICAgIGxldCByb2xsYmFjayA9IHRoaXMuU2V0KHRoaXMpO1xyXG4gICAgdHJ5IHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbmRpY2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaXNJbmRleChpbmRpY2VzW2ldLCB0aGlzKVxyXG4gICAgICAgIHRoaXNbaW5kaWNlc1tpXV0gPSBtYXJrO1xyXG4gICAgICB9XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmICh0aGlzW2ldID09PSBtYXJrKSB7XHJcbiAgICAgICAgICB0aGlzLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgIGktLTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgaWYgKGUgaW5zdGFuY2VvZiBJbmRleE91dE9mQm91bmRzRXhjZXB0aW9uKSB0aGlzLnNldChyb2xsYmFjayk7XHJcbiAgICAgIHRocm93IGU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9KVxyXG4gIFxyXG4gIC8vVGhyb3dzIEluZGV4T3V0T2ZCb3VuZHNFeGNlcHRpb24gd2hlbiBnaXZlbiBpbmRleCBpcyBvdXQgb2YgYm91bmRzIG9mIHRoaXNcclxuICBhcHBlbmRUb1hycmF5KFtcIlJlbW92ZUlcIiwgXCJSbUlcIl0sIGZ1bmN0aW9uKC4uLmluZGljZXMpIHtcclxuICAgIHJldHVybiB0aGlzLlNldCh0aGlzKS5yZW1vdmVJKC4uLmluZGljZXMpO1xyXG4gIH0pXHJcblxyXG4gIFxyXG5cclxuICAvL1Rocm93cyBJbnZhbGlkVmFsdWVFeGNlcHRpb24gd2hlbiB0aGUgZ2l2ZW4gdmFsdWUgY2Fubm90IGJlIGZvdW5kIHdpdGhpbmcgdGhpc1xyXG4gIGFwcGVuZFRvWHJyYXkoW1wicmVtb3ZlVlwiLCBcInJtVlwiXSwgZnVuY3Rpb24oLi4udmFsdWVzKSB7XHJcbiAgICByZXR1cm4gdGhpcy5yZW1vdmVJKC4uLnRoaXMuaW5kZXgoLi4udmFsdWVzKSk7XHJcbiAgfSlcclxuXHJcbiAgLy9UaHJvd3MgSW52YWxpZFZhbHVlRXhjZXB0aW9uIHdoZW4gdGhlIGdpdmVuIHZhbHVlIGNhbm5vdCBiZSBmb3VuZCB3aXRoaW5nIHRoaXNcclxuICBhcHBlbmRUb1hycmF5KFtcIlJlbW92ZVZcIiwgXCJSbVZcIl0sIGZ1bmN0aW9uKC4uLnZhbHVlcykge1xyXG4gICAgcmV0dXJuIHRoaXMuU2V0KHRoaXMpLnJlbW92ZVYoLi4udmFsdWVzKTtcclxuICB9KVxyXG5cclxuICAvL1Rocm93cyBJbnZhbGlkVmFsdWVFeGNlcHRpb24gd2hlbiB0aGUgZ2l2ZW4gcGFyYW0gaXMgZGV0ZWN0ZWQgYXMgdmFsdWUgYnV0IGNhbm5vdCBiZSBmb3VuZCB3aXRoaW5nIHRoaXNcclxuICBhcHBlbmRUb1hycmF5KFtcInJlbW92ZVwiLCBcInJtXCJdLCBmdW5jdGlvbiguLi52YWx1ZU9ySW5kZXgpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIHRoaXMucmVtb3ZlSSguLi52YWx1ZU9ySW5kZXgpO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICBpZiAoZSBpbnN0YW5jZW9mIEluZGV4T3V0T2ZCb3VuZHNFeGNlcHRpb24pIHRoaXMucmVtb3ZlViguLi52YWx1ZU9ySW5kZXgpO1xyXG4gICAgICBlbHNlIHRocm93IGU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9KVxyXG5cclxuXHJcbiAgLy9UaHJvd3MgSW5kZXhPdXRPZkJvdW5kc0V4Y2VwdGlvbiB3aGVuIGdpdmVuIHBhcmFtIGlzIGRldGVjdGVkIGFzIGluZGV4IGJ1dCBvdXQgb2YgYm91bmRzIG9mIHRoaXNcclxuICAvL1Rocm93cyBJbnZhbGlkVmFsdWVFeGNlcHRpb24gd2hlbiB0aGUgZ2l2ZW4gcGFyYW0gaXMgZGV0ZWN0ZWQgYXMgdmFsdWUgYnV0IGNhbm5vdCBiZSBmb3VuZCB3aXRoaW5nIHRoaXNcclxuICBhcHBlbmRUb1hycmF5KFtcIlJlbW92ZVwiLCBcIlJtXCJdLCBmdW5jdGlvbiguLi52YWx1ZU9ySW5kZXgpIHtcclxuICAgIHJldHVybiB0aGlzLlNldCh0aGlzKS5yZW1vdmUoLi4udmFsdWVPckluZGV4KTtcclxuICB9KVxyXG5cclxuICBhcHBlbmRUb1hycmF5KFwiR2V0XCIsIGZ1bmN0aW9uKC4uLmluZGV4ZXMpIHtcclxuICAgIGxldCBuID0gW107XHJcbiAgICBpbmRleGVzLmZsYXQoSW5maW5pdHkpLmZvckVhY2goKGkpID0+IHtcclxuICAgICAgbi5hZGQodGhpc1tpXSk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBuO1xyXG4gIH0pXHJcblxyXG4gIGFwcGVuZFRvWHJyYXkoXCJnZXRcIiwgZnVuY3Rpb24oLi4uaW5kZXhlcykge1xyXG4gICAgcmV0dXJuIHRoaXMuc2V0KHRoaXMuR2V0KC4uLmluZGV4ZXMpKVxyXG4gIH0pXHJcblxyXG4gIGFwcGVuZFRvWHJyYXkoXCJkZGFcIiwgZnVuY3Rpb24oLi4udmFsdWVzKSB7XHJcbiAgICByZXR1cm4gdGhpcy5yZXZlcnNlKCkuYWRkKC4uLnZhbHVlcykucmV2ZXJzZSgpO1xyXG4gIH0pXHJcblxyXG4gIGFwcGVuZFRvWHJyYXkoXCJEZGFcIiwgZnVuY3Rpb24oLi4udmFsdWVzKSB7XHJcbiAgICByZXR1cm4gdGhpcy5SZXZlcnNlKCkuYWRkKC4uLnZhbHVlcykucmV2ZXJzZSgpO1xyXG4gIH0pXHJcblxyXG5cclxuICAvL1Rocm93cyBJbmRleE91dE9mQm91bmRzRXhjZXB0aW9uIHdoZW4gZ2l2ZW4gaW5kZXggaXMgb3V0IG9mIGJvdW5kcyBvZiBhXHJcbiAgYXBwZW5kVG9YcnJheShcInJlbVwiLCBmdW5jdGlvbihhbW91bnQpIHtcclxuICAgIGlzSW5kZXgoYW1vdW50LHRoaXMpO1xyXG4gICAgdGhpcy5sZW5ndGggLT0gYW1vdW50O1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfSlcclxuICAvL1Rocm93cyBJbmRleE91dE9mQm91bmRzRXhjZXB0aW9uIHdoZW4gZ2l2ZW4gaW5kZXggaXMgb3V0IG9mIGJvdW5kcyBvZiBhXHJcbiAgYXBwZW5kVG9YcnJheShcIlJlbVwiLCBmdW5jdGlvbihhbW91bnQpIHtcclxuICAgIHJldHVybiB0aGlzLlNldCh0aGlzKS5yZW0oYW1vdW50KTtcclxuICB9KVxyXG5cclxuICAvL1Rocm93cyBJbmRleE91dE9mQm91bmRzRXhjZXB0aW9uIHdoZW4gZ2l2ZW4gaW5kZXggaXMgb3V0IG9mIGJvdW5kcyBvZiBhXHJcbiAgYXBwZW5kVG9YcnJheShcIm1lclwiLCBmdW5jdGlvbihhbW91bnQpIHtcclxuICAgIHJldHVybiB0aGlzLnJldmVyc2UoKS5yZW0oYW1vdW50KS5yZXZlcnNlKCk7XHJcbiAgfSlcclxuICAvL1Rocm93cyBJbmRleE91dE9mQm91bmRzRXhjZXB0aW9uIHdoZW4gZ2l2ZW4gaW5kZXggaXMgb3V0IG9mIGJvdW5kcyBvZiBhXHJcbiAgYXBwZW5kVG9YcnJheShcIk1lclwiLCBmdW5jdGlvbihhbW91bnQpIHtcclxuICAgIHJldHVybiB0aGlzLlJldmVyc2UoKS5yZW0oYW1vdW50KS5yZXZlcmVzZSgpO1xyXG4gIH0pXHJcblxyXG4gIC8vVGhyb3dzIEluZGV4T3V0T2ZCb3VuZHNFeGNlcHRpb24gd2hlbiBnaXZlbiBpbmRleChlcykgYXJlIG91dCBvZiBib3VuZHMgb2YgdGhpc1xyXG4gIC8vVGhyb3dzIEludmFsaWRJbnB1dEV4Y2VwdGlvbiB3aGVuIGdpdmVuIHBhcmFtZXRlcnMgYXJlIG5vdCBlcXVhbCBpbiBsZW5ndGhcclxuICBhcHBlbmRUb1hycmF5KFwic3dhcElcIiwgZnVuY3Rpb24oaTEsIGkyKSB7XHJcbiAgICBpMSA9IFtpMV0uZmxhdChJbmZpbml0eSk7XHJcbiAgICBpMiA9IFtpMl0uZmxhdChJbmZpbml0eSk7XHJcbiAgICBpZihpMS5sZW5ndGggPT09IGkyLmxlbmd0aCkge1xyXG4gICAgICBsZXQgcm9sbGJhY2sgPSB0aGlzLlNldCh0aGlzKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGkxLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBpc0luZGV4KGkxW2ldLHRoaXMpO1xyXG4gICAgICAgICAgaXNJbmRleChpMltpXSx0aGlzKTtcclxuICAgICAgICAgIFt0aGlzW2kxW2ldXSx0aGlzW2kyW2ldXV0gPSBbdGhpc1tpMltpXV0sdGhpc1tpMVtpXV1dO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIGlmKGUgaW5zdGFuY2VvZiBJbmRleE91dE9mQm91bmRzRXhjZXB0aW9uKSB0aGlzLnNldChyb2xsYmFjayk7XHJcbiAgICAgICAgdGhyb3cgZTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHRocm93IG5ldyBJbnZhbGlkSW5wdXRFeGNlcHRpb24oXCJQYXJhbWV0ZXIgaTEgYW5kIGkyIG11c3QgZXRoZXIgYmUgdHdvIGluZGV4ZXMsIG9yIHR3byBpbmRleC1BcnJheXMgb2YgdGhlIHNhbWUgbGVuZ3RoLlwiKTtcclxuICB9KVxyXG4gIC8vVGhyb3dzIEluZGV4T3V0T2ZCb3VuZHNFeGNlcHRpb24gd2hlbiBnaXZlbiBpbmRleChlcykgYXJlIG91dCBvZiBib3VuZHMgb2YgdGhpc1xyXG4gIC8vVGhyb3dzIEludmFsaWRJbnB1dEV4Y2VwdGlvbiB3aGVuIGdpdmVuIHBhcmFtZXRlcnMgYXJlIG5vdCBlcXVhbCBpbiBsZW5ndGhcclxuICBhcHBlbmRUb1hycmF5KFwiU3dhcElcIiwgZnVuY3Rpb24oaTEsIGkyKSB7XHJcbiAgICByZXR1cm4gdGhpcy5TZXQodGhpcykuc3dhcEkoaTEsIGkyKTtcclxuICB9KVxyXG5cclxuICAvL1Rocm93cyBJbnZhbGlkVmFsdWVFeGNlcHRpb24gd2hlbiB0aGUgZ2l2ZW4gdmFsdWUgY2Fubm90IGJlIGZvdW5kIHdpdGhpbmcgdGhpc1xyXG4gIC8vVGhyb3dzIEludmFsaWRJbnB1dEV4Y2VwdGlvbiB3aGVuIGdpdmVuIHBhcmFtZXRlcnMgYXJlIG5vdCBlcXVhbCBpbiBsZW5ndGhcclxuICBhcHBlbmRUb1hycmF5KFwic3dhcFZcIiwgZnVuY3Rpb24odjEsIHYyKSB7XHJcbiAgICB2MSA9IHRoaXMuU2V0KHYxKS5mbGF0KDIpO1xyXG4gICAgdjIgPSB0aGlzLlNldCh2MikuZmxhdCgyKTtcclxuICAgIGlmICh2MS5sZW5ndGggPT09IHYyLmxlbmd0aCkge1xyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHYxLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdGhpcy5zd2FwSSh0aGlzLmluZGV4KHYxW2ldKSx0aGlzLmluZGV4KHYyW2ldKSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICB0aHJvdyBuZXcgSW52YWxpZElucHV0RXhjZXB0aW9uKFwiUGFyYW1ldGVyIHYxIGFuZCB2MiBtdXN0IGV0aGVyIGJlIHR3byB2YWx1ZXMsIG9yIHR3byB2YWx1ZS1BcnJheXMgb2YgdGhlIHNhbWUgbGVuZ3RoLlwiKTtcclxuICB9KVxyXG4gIC8vVGhyb3dzIEludmFsaWRWYWx1ZUV4Y2VwdGlvbiB3aGVuIHRoZSBnaXZlbiB2YWx1ZSBjYW5ub3QgYmUgZm91bmQgd2l0aGluZyB0aGlzXHJcbiAgLy9UaHJvd3MgSW52YWxpZElucHV0RXhjZXB0aW9uIHdoZW4gZ2l2ZW4gcGFyYW1ldGVycyBhcmUgbm90IGVxdWFsIGluIGxlbmd0aFxyXG4gIGFwcGVuZFRvWHJyYXkoXCJTd2FwVlwiLCBmdW5jdGlvbih2MSwgdjIpIHtcclxuICAgIHJldHVybiB0aGlzLlNldCh0aGlzKS5zd2FwVih2MSwgdjIpO1xyXG4gIH0pXHJcblxyXG4gIC8vVGhyb3dzIEluZGV4T3V0T2ZCb3VuZHNFeGNlcHRpb24gd2hlbiBnaXZlbiBwYXJhbSBpcyBkZXRlY3RlZCBhcyBpbmRleCBidXQgb3V0IG9mIGJvdW5kcyBvZiB0aGlzXHJcbiAgLy9UaHJvd3MgSW52YWxpZFZhbHVlRXhjZXB0aW9uIHdoZW4gdGhlIGdpdmVuIHBhcmFtIGlzIGRldGVjdGVkIGFzIHZhbHVlIGJ1dCBjYW5ub3QgYmUgZm91bmQgd2l0aGluZyB0aGlzXHJcbiAgYXBwZW5kVG9YcnJheShcInN3YXBcIiwgZnVuY3Rpb24odmkxLCB2aTIpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIHRoaXMuc3dhcEkodmkxLCB2aTIpO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICBpZiAoZSBpbnN0YW5jZW9mIEluZGV4T3V0T2ZCb3VuZHNFeGNlcHRpb24pIHRoaXMuc3dhcFYodmkxLCB2aTIpO1xyXG4gICAgICBlbHNlIHRocm93IGU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9KVxyXG4gIC8vVGhyb3dzIEluZGV4T3V0T2ZCb3VuZHNFeGNlcHRpb24gd2hlbiBnaXZlbiBwYXJhbSBpcyBkZXRlY3RlZCBhcyBpbmRleCBidXQgb3V0IG9mIGJvdW5kcyBvZiB0aGlzXHJcbiAgLy9UaHJvd3MgSW52YWxpZFZhbHVlRXhjZXB0aW9uIHdoZW4gdGhlIGdpdmVuIHBhcmFtIGlzIGRldGVjdGVkIGFzIHZhbHVlIGJ1dCBjYW5ub3QgYmUgZm91bmQgd2l0aGluZyB0aGlzXHJcbiAgYXBwZW5kVG9YcnJheShcIlN3YXBcIiwgZnVuY3Rpb24odmkxLCB2aTIpIHtcclxuICAgIHJldHVybiB0aGlzLlNldCh0aGlzKS5zd2FwKHZpMSwgdmkyKVxyXG4gIH0pXHJcblxyXG4gIGFwcGVuZFRvWHJyYXkoXCJwcmlvclwiLCBmdW5jdGlvbihpLCBieSA9IDEpIHtcclxuICAgIGxldCByID0gaSAtIGJ5O1xyXG4gICAgaWYgKHIgPj0gMCkgcmV0dXJuIHRoaXNbcl07XHJcbiAgICByZXR1cm4gdGhpc1t0aGlzLmxlbmd0aC0oYnktaSldXHJcbiAgfSlcclxuXHJcbiAgYXBwZW5kVG9YcnJheShcIm5leHRcIiwgZnVuY3Rpb24oaSwgYnkgPSAxKSB7XHJcbiAgICBsZXQgciA9IGkgKyBieTtcclxuICAgIGlmIChyIDw9IHRoaXMubGVuZ3RoLTEpIHJldHVybiB0aGlzW3JdO1xyXG4gICAgcmV0dXJuIHRoaXNbYnktKGktdGhpcy5sZW5ndGgtMSldXHJcbiAgfSlcclxuXHJcbiAgYXBwZW5kVG9YcnJheShcImluamVjdFwiLCBmdW5jdGlvbihpdGVtLCBpbmRleCkge1xyXG4gICAgdGhpcy5zcGxpY2UoaW5kZXgsIDAsIGl0ZW0pO1xyXG4gICAgcmV0dXJuIHRoaXNcclxuICB9KVxyXG5cclxuICBhcHBlbmRUb1hycmF5KFwiY29udGFpbnNcIiwgZnVuY3Rpb24oLi4udmFscykge1xyXG4gICAgZm9yIChsZXQgdiBvZiB2YWxzKSB7XHJcbiAgICAgIGlmICghdGhpcy5pbmNsdWRlcyh2KSkgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZVxyXG4gIH0pXHJcblxyXG4gIGFwcGVuZFRvWHJyYXkoXCJleGNsdWRlc1wiLCBmdW5jdGlvbiguLi52YWxzKSB7XHJcbiAgICBmb3IgKGxldCB2IG9mIHZhbHMpIHtcclxuICAgICAgaWYgKHRoaXMuaW5jbHVkZXModikpIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWVcclxuICB9KVxyXG5cclxuICBhcHBlbmRUb1hycmF5KFtcImNsb3Nlc3RcIiwgXCJuZWFyZXN0XCJdLCBmdW5jdGlvbih0byAvKjogbnVtYmVyKi8pIHtcclxuICAgIGxldCBhID0gW11cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBhW2ldID0gTWF0aC5hYnModGhpc1tpXSAtIHRvKVxyXG4gICAgfVxyXG4gICAgbGV0IHNtYWxsZXN0ID0gSW5maW5pdHlcclxuICAgIGxldCBpbmRleCA9IC0xXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgbGV0IGRpZmYgPSBhW2ldXHJcbiAgICAgIGlmIChkaWZmIDwgc21hbGxlc3QpIHtcclxuICAgICAgICBzbWFsbGVzdCA9IGRpZmZcclxuICAgICAgICBpbmRleCA9IGlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGluZGV4XHJcbiAgfSlcclxuXHJcbiAgYXBwZW5kVG9YcnJheShcImlubmVyXCIsIGZ1bmN0aW9uKHN0ZXAsIGNhbGxQYXJhbXMpIHtcclxuICAgIGlmIChjYWxsUGFyYW1zICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5lYSgoZSwgaSkgPT4ge1xyXG4gICAgICAgIHRoaXNbaV0gPSBlW3N0ZXBdKC4uLmNhbGxQYXJhbXMpXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgdGhpcy5lYSgoZSwgaSkgPT4ge1xyXG4gICAgICAgIHRoaXNbaV0gPSBlW3N0ZXBdXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHJldHVybiB0aGlzXHJcbiAgfSlcclxuXHJcbiAgYXBwZW5kVG9YcnJheShcIklubmVyXCIsIGZ1bmN0aW9uKHN0ZXAsIGNhbGxQYXJhbXMpIHtcclxuICAgIHJldHVybiB0aGlzLlNldCh0aGlzKS5pbm5lcihzdGVwLCBjYWxsUGFyYW1zKVxyXG4gIH0pXHJcblxyXG4gIFxyXG4gIGFwcGVuZFRvWHJyYXkoXCJjYWxsXCIsIGZ1bmN0aW9uKC4uLmNhbGxQYXJhbXMpIHtcclxuICAgIGlmIChjYWxsUGFyYW1zICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5lYSgoZSwgaSkgPT4ge1xyXG4gICAgICAgIHRoaXNbaV0gPSBlKC4uLmNhbGxQYXJhbXMpXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHJldHVybiB0aGlzXHJcbiAgfSlcclxuXHJcbiAgYXBwZW5kVG9YcnJheShcIkNhbGxcIiwgZnVuY3Rpb24oLi4uY2FsbFBhcmFtcykge1xyXG4gICAgcmV0dXJuIHRoaXMuU2V0KHRoaXMpLmNhbGwoLi4uY2FsbFBhcmFtcylcclxuICB9KVxyXG5cclxuXHJcbiAgYXBwZW5kVG9YcnJheShcInJlcGxhY2VcIiwgZnVuY3Rpb24oZnVuYykge1xyXG4gICAgdGhpcy5mb3JFYWNoKChlLCBpKSA9PiB7XHJcbiAgICAgIHRoaXNbaV0gPSBmdW5jKGUsIGkpXHJcbiAgICB9KVxyXG4gICAgXHJcbiAgICByZXR1cm4gdGhpc1xyXG4gIH0pXHJcblxyXG4gIGFwcGVuZFRvWHJyYXkoXCJSZXBsYWNlXCIsIGZ1bmN0aW9uKGZ1bmMpIHtcclxuICAgIHJldHVybiB0aGlzLlNldCh0aGlzKS5yZXBsYWNlKGZ1bmMpXHJcbiAgfSlcclxuXHJcblxyXG5cclxuICByZXR1cm4gWHJyYXlcclxufVxyXG5pbml0LkV4Y2VwdGlvbiA9IEV4Y2VwdGlvbjtcclxuaW5pdC5JbmRleE91dE9mQm91bmRzRXhjZXB0aW9uID0gSW5kZXhPdXRPZkJvdW5kc0V4Y2VwdGlvbjtcclxuaW5pdC5JbnZhbGlkSW5wdXRFeGNlcHRpb24gPSBJbnZhbGlkSW5wdXRFeGNlcHRpb247XHJcbmluaXQuSW52YWxpZFZhbHVlRXhjZXB0aW9uID0gSW52YWxpZFZhbHVlRXhjZXB0aW9uO1xyXG4vL2luaXQudmVyc2lvbiA9IFwidW5rbm93blwiO1xyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gaW5pdFxyXG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gaW5pdFxyXG5cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==