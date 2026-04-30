import { c as createLucideIcon, o, r as reactExports, j as jsxRuntimeExports, F as FileText } from "./index-Z0A2bhGv.js";
import { B as Badge } from "./badge-DtlJb9-W.js";
import { B as Button } from "./button-DWtlGXxF.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-BdbFX_7A.js";
import { S as Skeleton } from "./skeleton-CxBnDwkK.js";
import { L as LOAN_STAGES } from "./stages-CnHug0GM.js";
import { u as useAdminGetDashboardStats, a as useAdminGetAllUsers } from "./useQueries-Bvv08CbZ.js";
import { T as TriangleAlert } from "./triangle-alert-5r-aS6ly.js";
import { C as CircleCheck } from "./circle-check-5g_25N_a.js";
import { I as IndianRupee } from "./indian-rupee-DbHc7sws.js";
import { C as CircleX } from "./circle-x-CozHGL82.js";
import { T as TrendingUp } from "./trending-up-DxtwyeyW.js";
import { U as Users } from "./users-CY_ZJZHk.js";
import { i as isFunction, D as Dot, f as findAllByType, E as ErrorBar, L as Layer, a as filterProps, C as Curve, A as Animate, b as interpolateNumber, c as isEqual, d as isNil, h as hasClipDot, e as LabelList, g as getValueByDataKey, u as uniqueId, G as Global, j as getCateCoordinateOfLine, k as generateCategoricalChart, X as XAxis, Y as YAxis, l as formatAxisMap, R as ResponsiveContainer, B as BarChart, m as CartesianGrid, T as Tooltip, n as Bar, o as Cell, P as PieChart, p as Pie, q as Legend } from "./PieChart-D4RDuL6O.js";
import { c as clsx } from "./utils-DdB4LPY_.js";
import "./api-8PJoCqPW.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  [
    "path",
    {
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
];
const Activity = createLucideIcon("activity", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "m7 7 10 10", key: "1fmybs" }],
  ["path", { d: "M17 7v10H7", key: "6fjiku" }]
];
const ArrowDownRight = createLucideIcon("arrow-down-right", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M7 7h10v10", key: "1tivn9" }],
  ["path", { d: "M7 17 17 7", key: "1vkiza" }]
];
const ArrowUpRight = createLucideIcon("arrow-up-right", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode);
var _excluded = ["type", "layout", "connectNulls", "ref"], _excluded2 = ["key"];
function _typeof(o2) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o3) {
    return typeof o3;
  } : function(o3) {
    return o3 && "function" == typeof Symbol && o3.constructor === Symbol && o3 !== Symbol.prototype ? "symbol" : typeof o3;
  }, _typeof(o2);
}
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o2 = Object.getOwnPropertySymbols(e);
    r && (o2 = o2.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o2);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o2, minLen) {
  if (!o2) return;
  if (typeof o2 === "string") return _arrayLikeToArray(o2, minLen);
  var n = Object.prototype.toString.call(o2).slice(8, -1);
  if (n === "Object" && o2.constructor) n = o2.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o2);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o2, minLen);
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _callSuper(t, o2, e) {
  return o2 = _getPrototypeOf(o2), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o2, e || [], _getPrototypeOf(t).constructor) : o2.apply(t, e));
}
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch (t2) {
  }
  return (_isNativeReflectConstruct = function _isNativeReflectConstruct2() {
    return !!t;
  })();
}
function _getPrototypeOf(o2) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o3) {
    return o3.__proto__ || Object.getPrototypeOf(o3);
  };
  return _getPrototypeOf(o2);
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  Object.defineProperty(subClass, "prototype", { writable: false });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o2, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o3, p2) {
    o3.__proto__ = p2;
    return o3;
  };
  return _setPrototypeOf(o2, p);
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(t);
}
var Line = /* @__PURE__ */ function(_PureComponent) {
  function Line2() {
    var _this;
    _classCallCheck(this, Line2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, Line2, [].concat(args));
    _defineProperty(_this, "state", {
      isAnimationFinished: true,
      totalLength: 0
    });
    _defineProperty(_this, "generateSimpleStrokeDasharray", function(totalLength, length) {
      return "".concat(length, "px ").concat(totalLength - length, "px");
    });
    _defineProperty(_this, "getStrokeDasharray", function(length, totalLength, lines) {
      var lineLength = lines.reduce(function(pre, next) {
        return pre + next;
      });
      if (!lineLength) {
        return _this.generateSimpleStrokeDasharray(totalLength, length);
      }
      var count = Math.floor(length / lineLength);
      var remainLength = length % lineLength;
      var restLength = totalLength - length;
      var remainLines = [];
      for (var i = 0, sum = 0; i < lines.length; sum += lines[i], ++i) {
        if (sum + lines[i] > remainLength) {
          remainLines = [].concat(_toConsumableArray(lines.slice(0, i)), [remainLength - sum]);
          break;
        }
      }
      var emptyLines = remainLines.length % 2 === 0 ? [0, restLength] : [restLength];
      return [].concat(_toConsumableArray(Line2.repeat(lines, count)), _toConsumableArray(remainLines), emptyLines).map(function(line) {
        return "".concat(line, "px");
      }).join(", ");
    });
    _defineProperty(_this, "id", uniqueId("recharts-line-"));
    _defineProperty(_this, "pathRef", function(node) {
      _this.mainCurve = node;
    });
    _defineProperty(_this, "handleAnimationEnd", function() {
      _this.setState({
        isAnimationFinished: true
      });
      if (_this.props.onAnimationEnd) {
        _this.props.onAnimationEnd();
      }
    });
    _defineProperty(_this, "handleAnimationStart", function() {
      _this.setState({
        isAnimationFinished: false
      });
      if (_this.props.onAnimationStart) {
        _this.props.onAnimationStart();
      }
    });
    return _this;
  }
  _inherits(Line2, _PureComponent);
  return _createClass(Line2, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!this.props.isAnimationActive) {
        return;
      }
      var totalLength = this.getTotalLength();
      this.setState({
        totalLength
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (!this.props.isAnimationActive) {
        return;
      }
      var totalLength = this.getTotalLength();
      if (totalLength !== this.state.totalLength) {
        this.setState({
          totalLength
        });
      }
    }
  }, {
    key: "getTotalLength",
    value: function getTotalLength() {
      var curveDom = this.mainCurve;
      try {
        return curveDom && curveDom.getTotalLength && curveDom.getTotalLength() || 0;
      } catch (err) {
        return 0;
      }
    }
  }, {
    key: "renderErrorBar",
    value: function renderErrorBar(needClip, clipPathId) {
      if (this.props.isAnimationActive && !this.state.isAnimationFinished) {
        return null;
      }
      var _this$props = this.props, points = _this$props.points, xAxis = _this$props.xAxis, yAxis = _this$props.yAxis, layout = _this$props.layout, children = _this$props.children;
      var errorBarItems = findAllByType(children, ErrorBar);
      if (!errorBarItems) {
        return null;
      }
      var dataPointFormatter = function dataPointFormatter2(dataPoint, dataKey) {
        return {
          x: dataPoint.x,
          y: dataPoint.y,
          value: dataPoint.value,
          errorVal: getValueByDataKey(dataPoint.payload, dataKey)
        };
      };
      var errorBarProps = {
        clipPath: needClip ? "url(#clipPath-".concat(clipPathId, ")") : null
      };
      return /* @__PURE__ */ o.createElement(Layer, errorBarProps, errorBarItems.map(function(item) {
        return /* @__PURE__ */ o.cloneElement(item, {
          key: "bar-".concat(item.props.dataKey),
          data: points,
          xAxis,
          yAxis,
          layout,
          dataPointFormatter
        });
      }));
    }
  }, {
    key: "renderDots",
    value: function renderDots(needClip, clipDot, clipPathId) {
      var isAnimationActive = this.props.isAnimationActive;
      if (isAnimationActive && !this.state.isAnimationFinished) {
        return null;
      }
      var _this$props2 = this.props, dot = _this$props2.dot, points = _this$props2.points, dataKey = _this$props2.dataKey;
      var lineProps = filterProps(this.props, false);
      var customDotProps = filterProps(dot, true);
      var dots = points.map(function(entry, i) {
        var dotProps = _objectSpread(_objectSpread(_objectSpread({
          key: "dot-".concat(i),
          r: 3
        }, lineProps), customDotProps), {}, {
          index: i,
          cx: entry.x,
          cy: entry.y,
          value: entry.value,
          dataKey,
          payload: entry.payload,
          points
        });
        return Line2.renderDotItem(dot, dotProps);
      });
      var dotsProps = {
        clipPath: needClip ? "url(#clipPath-".concat(clipDot ? "" : "dots-").concat(clipPathId, ")") : null
      };
      return /* @__PURE__ */ o.createElement(Layer, _extends({
        className: "recharts-line-dots",
        key: "dots"
      }, dotsProps), dots);
    }
  }, {
    key: "renderCurveStatically",
    value: function renderCurveStatically(points, needClip, clipPathId, props) {
      var _this$props3 = this.props, type = _this$props3.type, layout = _this$props3.layout, connectNulls = _this$props3.connectNulls;
      _this$props3.ref;
      var others = _objectWithoutProperties(_this$props3, _excluded);
      var curveProps = _objectSpread(_objectSpread(_objectSpread({}, filterProps(others, true)), {}, {
        fill: "none",
        className: "recharts-line-curve",
        clipPath: needClip ? "url(#clipPath-".concat(clipPathId, ")") : null,
        points
      }, props), {}, {
        type,
        layout,
        connectNulls
      });
      return /* @__PURE__ */ o.createElement(Curve, _extends({}, curveProps, {
        pathRef: this.pathRef
      }));
    }
  }, {
    key: "renderCurveWithAnimation",
    value: function renderCurveWithAnimation(needClip, clipPathId) {
      var _this2 = this;
      var _this$props4 = this.props, points = _this$props4.points, strokeDasharray = _this$props4.strokeDasharray, isAnimationActive = _this$props4.isAnimationActive, animationBegin = _this$props4.animationBegin, animationDuration = _this$props4.animationDuration, animationEasing = _this$props4.animationEasing, animationId = _this$props4.animationId, animateNewValues = _this$props4.animateNewValues, width = _this$props4.width, height = _this$props4.height;
      var _this$state = this.state, prevPoints = _this$state.prevPoints, totalLength = _this$state.totalLength;
      return /* @__PURE__ */ o.createElement(Animate, {
        begin: animationBegin,
        duration: animationDuration,
        isActive: isAnimationActive,
        easing: animationEasing,
        from: {
          t: 0
        },
        to: {
          t: 1
        },
        key: "line-".concat(animationId),
        onAnimationEnd: this.handleAnimationEnd,
        onAnimationStart: this.handleAnimationStart
      }, function(_ref) {
        var t = _ref.t;
        if (prevPoints) {
          var prevPointsDiffFactor = prevPoints.length / points.length;
          var stepData = points.map(function(entry, index) {
            var prevPointIndex = Math.floor(index * prevPointsDiffFactor);
            if (prevPoints[prevPointIndex]) {
              var prev = prevPoints[prevPointIndex];
              var interpolatorX = interpolateNumber(prev.x, entry.x);
              var interpolatorY = interpolateNumber(prev.y, entry.y);
              return _objectSpread(_objectSpread({}, entry), {}, {
                x: interpolatorX(t),
                y: interpolatorY(t)
              });
            }
            if (animateNewValues) {
              var _interpolatorX = interpolateNumber(width * 2, entry.x);
              var _interpolatorY = interpolateNumber(height / 2, entry.y);
              return _objectSpread(_objectSpread({}, entry), {}, {
                x: _interpolatorX(t),
                y: _interpolatorY(t)
              });
            }
            return _objectSpread(_objectSpread({}, entry), {}, {
              x: entry.x,
              y: entry.y
            });
          });
          return _this2.renderCurveStatically(stepData, needClip, clipPathId);
        }
        var interpolator = interpolateNumber(0, totalLength);
        var curLength = interpolator(t);
        var currentStrokeDasharray;
        if (strokeDasharray) {
          var lines = "".concat(strokeDasharray).split(/[,\s]+/gim).map(function(num) {
            return parseFloat(num);
          });
          currentStrokeDasharray = _this2.getStrokeDasharray(curLength, totalLength, lines);
        } else {
          currentStrokeDasharray = _this2.generateSimpleStrokeDasharray(totalLength, curLength);
        }
        return _this2.renderCurveStatically(points, needClip, clipPathId, {
          strokeDasharray: currentStrokeDasharray
        });
      });
    }
  }, {
    key: "renderCurve",
    value: function renderCurve(needClip, clipPathId) {
      var _this$props5 = this.props, points = _this$props5.points, isAnimationActive = _this$props5.isAnimationActive;
      var _this$state2 = this.state, prevPoints = _this$state2.prevPoints, totalLength = _this$state2.totalLength;
      if (isAnimationActive && points && points.length && (!prevPoints && totalLength > 0 || !isEqual(prevPoints, points))) {
        return this.renderCurveWithAnimation(needClip, clipPathId);
      }
      return this.renderCurveStatically(points, needClip, clipPathId);
    }
  }, {
    key: "render",
    value: function render() {
      var _filterProps;
      var _this$props6 = this.props, hide = _this$props6.hide, dot = _this$props6.dot, points = _this$props6.points, className = _this$props6.className, xAxis = _this$props6.xAxis, yAxis = _this$props6.yAxis, top = _this$props6.top, left = _this$props6.left, width = _this$props6.width, height = _this$props6.height, isAnimationActive = _this$props6.isAnimationActive, id = _this$props6.id;
      if (hide || !points || !points.length) {
        return null;
      }
      var isAnimationFinished = this.state.isAnimationFinished;
      var hasSinglePoint = points.length === 1;
      var layerClass = clsx("recharts-line", className);
      var needClipX = xAxis && xAxis.allowDataOverflow;
      var needClipY = yAxis && yAxis.allowDataOverflow;
      var needClip = needClipX || needClipY;
      var clipPathId = isNil(id) ? this.id : id;
      var _ref2 = (_filterProps = filterProps(dot, false)) !== null && _filterProps !== void 0 ? _filterProps : {
        r: 3,
        strokeWidth: 2
      }, _ref2$r = _ref2.r, r = _ref2$r === void 0 ? 3 : _ref2$r, _ref2$strokeWidth = _ref2.strokeWidth, strokeWidth = _ref2$strokeWidth === void 0 ? 2 : _ref2$strokeWidth;
      var _ref3 = hasClipDot(dot) ? dot : {}, _ref3$clipDot = _ref3.clipDot, clipDot = _ref3$clipDot === void 0 ? true : _ref3$clipDot;
      var dotSize = r * 2 + strokeWidth;
      return /* @__PURE__ */ o.createElement(Layer, {
        className: layerClass
      }, needClipX || needClipY ? /* @__PURE__ */ o.createElement("defs", null, /* @__PURE__ */ o.createElement("clipPath", {
        id: "clipPath-".concat(clipPathId)
      }, /* @__PURE__ */ o.createElement("rect", {
        x: needClipX ? left : left - width / 2,
        y: needClipY ? top : top - height / 2,
        width: needClipX ? width : width * 2,
        height: needClipY ? height : height * 2
      })), !clipDot && /* @__PURE__ */ o.createElement("clipPath", {
        id: "clipPath-dots-".concat(clipPathId)
      }, /* @__PURE__ */ o.createElement("rect", {
        x: left - dotSize / 2,
        y: top - dotSize / 2,
        width: width + dotSize,
        height: height + dotSize
      }))) : null, !hasSinglePoint && this.renderCurve(needClip, clipPathId), this.renderErrorBar(needClip, clipPathId), (hasSinglePoint || dot) && this.renderDots(needClip, clipDot, clipPathId), (!isAnimationActive || isAnimationFinished) && LabelList.renderCallByParent(this.props, points));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.animationId !== prevState.prevAnimationId) {
        return {
          prevAnimationId: nextProps.animationId,
          curPoints: nextProps.points,
          prevPoints: prevState.curPoints
        };
      }
      if (nextProps.points !== prevState.curPoints) {
        return {
          curPoints: nextProps.points
        };
      }
      return null;
    }
  }, {
    key: "repeat",
    value: function repeat(lines, count) {
      var linesUnit = lines.length % 2 !== 0 ? [].concat(_toConsumableArray(lines), [0]) : lines;
      var result = [];
      for (var i = 0; i < count; ++i) {
        result = [].concat(_toConsumableArray(result), _toConsumableArray(linesUnit));
      }
      return result;
    }
  }, {
    key: "renderDotItem",
    value: function renderDotItem(option, props) {
      var dotItem;
      if (/* @__PURE__ */ o.isValidElement(option)) {
        dotItem = /* @__PURE__ */ o.cloneElement(option, props);
      } else if (isFunction(option)) {
        dotItem = option(props);
      } else {
        var key = props.key, dotProps = _objectWithoutProperties(props, _excluded2);
        var className = clsx("recharts-line-dot", typeof option !== "boolean" ? option.className : "");
        dotItem = /* @__PURE__ */ o.createElement(Dot, _extends({
          key
        }, dotProps, {
          className
        }));
      }
      return dotItem;
    }
  }]);
}(reactExports.PureComponent);
_defineProperty(Line, "displayName", "Line");
_defineProperty(Line, "defaultProps", {
  xAxisId: 0,
  yAxisId: 0,
  connectNulls: false,
  activeDot: true,
  dot: true,
  legendType: "line",
  stroke: "#3182bd",
  strokeWidth: 1,
  fill: "#fff",
  points: [],
  isAnimationActive: !Global.isSsr,
  animateNewValues: true,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease",
  hide: false,
  label: false
});
_defineProperty(Line, "getComposedData", function(_ref4) {
  var props = _ref4.props, xAxis = _ref4.xAxis, yAxis = _ref4.yAxis, xAxisTicks = _ref4.xAxisTicks, yAxisTicks = _ref4.yAxisTicks, dataKey = _ref4.dataKey, bandSize = _ref4.bandSize, displayedData = _ref4.displayedData, offset = _ref4.offset;
  var layout = props.layout;
  var points = displayedData.map(function(entry, index) {
    var value = getValueByDataKey(entry, dataKey);
    if (layout === "horizontal") {
      return {
        x: getCateCoordinateOfLine({
          axis: xAxis,
          ticks: xAxisTicks,
          bandSize,
          entry,
          index
        }),
        y: isNil(value) ? null : yAxis.scale(value),
        value,
        payload: entry
      };
    }
    return {
      x: isNil(value) ? null : xAxis.scale(value),
      y: getCateCoordinateOfLine({
        axis: yAxis,
        ticks: yAxisTicks,
        bandSize,
        entry,
        index
      }),
      value,
      payload: entry
    };
  });
  return _objectSpread({
    points,
    layout
  }, offset);
});
var LineChart = generateCategoricalChart({
  chartName: "LineChart",
  GraphicalChild: Line,
  axisComponents: [{
    axisType: "xAxis",
    AxisComp: XAxis
  }, {
    axisType: "yAxis",
    AxisComp: YAxis
  }],
  formatAxisMap
});
const SANCTIONED_STAGE = 6;
const DISBURSED_STAGE = 7;
const PRIMARY_ORANGE = "#F47B30";
const SECONDARY_BLUE = "#1E5FA8";
const REJECTED_RED = "#dc2626";
const STAGE_PALETTE = [
  "#1E5FA8",
  "#2E73C0",
  "#4A8FD4",
  "#6BA3DE",
  "#F47B30",
  "#F59044",
  "#F6A459",
  "#F7B870",
  "#22c55e",
  "#16a34a"
];
function getLastSixMonths() {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  const now = /* @__PURE__ */ new Date();
  const result = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    result.push(
      `${months[d.getMonth()]} ${d.getFullYear().toString().slice(2)}`
    );
  }
  return result;
}
function formatTs(ts) {
  return new Date(ts / 1e6).toLocaleString("en-IN", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function formatIndianCurrency(amount) {
  if (amount === 0) return "₹0";
  if (amount >= 1e7) return `₹${(amount / 1e7).toFixed(2)}Cr`;
  if (amount >= 1e5) return `₹${(amount / 1e5).toFixed(2)}L`;
  if (amount >= 1e3) return `₹${(amount / 1e3).toFixed(1)}K`;
  return `₹${amount.toLocaleString("en-IN")}`;
}
function StatCard({
  label,
  value,
  sub,
  icon,
  iconBg,
  iconColor,
  accentColor,
  filterParam,
  isCurrency = false
}) {
  const displayValue = isCurrency ? formatIndianCurrency(value) : value.toLocaleString("en-IN");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      onClick: () => {
        window.location.hash = filterParam;
      },
      className: "w-full text-left group",
      "data-ocid": `dashboard-stat-${label.toLowerCase().replace(/\s+/g, "-")}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card border border-border bg-card hover:shadow-elevated transition-smooth cursor-pointer overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 w-full", style: { backgroundColor: accentColor } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-4 pb-4 px-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2", children: label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-display font-bold text-foreground leading-none tabular-nums truncate", children: displayValue }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "mt-2 flex items-center gap-1 text-xs font-medium transition-smooth group-hover:gap-2",
                style: { color: iconColor },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: sub }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 11, className: "shrink-0" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "p-2.5 rounded-xl shrink-0 transition-smooth group-hover:scale-110",
              style: { backgroundColor: iconBg, color: iconColor },
              children: icon
            }
          )
        ] }) })
      ] })
    }
  );
}
function StageBreakdown({
  stages,
  totalLoans
}) {
  const maxCount = Math.max(...stages.map((s) => s.count), 1);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card border border-border bg-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-display font-semibold flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 16, style: { color: PRIMARY_ORANGE } }),
      "Stage-wise Breakdown"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "px-5 pb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: LOAN_STAGES.map((stageName, idx) => {
      const entry = stages.find((s) => s.stageIndex === idx);
      const count = (entry == null ? void 0 : entry.count) ?? 0;
      const pct = totalLoans > 0 ? count / totalLoans * 100 : 0;
      const barPct = count / maxCount * 100;
      const color = STAGE_PALETTE[idx] ?? PRIMARY_ORANGE;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          className: "flex items-center gap-2.5 w-full hover:bg-muted/50 rounded-lg px-2 py-1.5 -mx-2 transition-smooth group",
          onClick: () => {
            window.location.hash = `#/admin/loans?stage=${idx}`;
          },
          title: `View ${stageName} loans`,
          "data-ocid": `stage-row-${idx}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-xs font-semibold w-5 shrink-0 text-center rounded px-0.5",
                style: { color, backgroundColor: `${color}18` },
                children: idx + 1
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-foreground flex-1 min-w-0 truncate text-left group-hover:text-primary transition-smooth font-medium", children: stageName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-2 rounded-full bg-muted overflow-hidden shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-full rounded-full transition-smooth",
                style: { width: `${barPct}%`, backgroundColor: color }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-foreground w-6 text-right shrink-0 tabular-nums", children: count }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground w-9 text-right shrink-0 tabular-nums", children: [
              pct.toFixed(0),
              "%"
            ] })
          ]
        },
        stageName
      );
    }) }) })
  ] });
}
function ConversionMetrics({ stats }) {
  const items = [
    {
      label: "Sanctioned %",
      pct: stats.sanctionedPercent,
      desc: "Loans reached sanction",
      color: PRIMARY_ORANGE,
      bg: "#fff7ed",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 18 })
    },
    {
      label: "Disbursement %",
      pct: stats.disbursementPercent,
      desc: "Loans fully disbursed",
      color: SECONDARY_BLUE,
      bg: "#eff6ff",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 18 })
    },
    {
      label: "Drop-off Rate",
      pct: stats.dropoffRate,
      desc: "Loans that stalled",
      color: "#ef4444",
      bg: "#fef2f2",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownRight, { size: 18 })
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card border border-border bg-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-display font-semibold flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { size: 16, style: { color: SECONDARY_BLUE } }),
      "Conversion Metrics"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "px-5 pb-5 space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3", children: items.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-9 h-9 rounded-full flex items-center justify-center mx-auto",
            style: { backgroundColor: m.bg, color: m.color },
            children: m.icon
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "p",
          {
            className: "text-xl font-display font-bold tabular-nums",
            style: { color: m.color },
            children: [
              m.pct.toFixed(1),
              "%"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground leading-tight", children: m.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-tight", children: m.desc })
      ] }, m.label)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2 space-y-3 border-t border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Conversion Funnel" }),
        [
          { label: "All Loans", pct: 100, color: "#94a3b8" },
          {
            label: "Sanctioned",
            pct: Math.min(stats.sanctionedPercent, 100),
            color: PRIMARY_ORANGE
          },
          {
            label: "Disbursed",
            pct: Math.min(stats.disbursementPercent, 100),
            color: SECONDARY_BLUE
          }
        ].map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: row.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground tabular-nums", children: [
              row.pct.toFixed(1),
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-full rounded-full transition-smooth",
              style: { width: `${row.pct}%`, backgroundColor: row.color }
            }
          ) })
        ] }, row.label))
      ] })
    ] })
  ] });
}
function ActivityItem({ item }) {
  const stageIdx = item.stageIndex;
  const dotColor = stageIdx >= 7 ? "#22c55e" : stageIdx >= 6 ? PRIMARY_ORANGE : SECONDARY_BLUE;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 py-3 border-b border-border/60 last:border-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "shrink-0 mt-0.5 w-7 h-7 rounded-full flex items-center justify-center",
        style: { backgroundColor: `${dotColor}18`, color: dotColor },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { size: 13 })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1 space-y-0.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              className: "text-xs font-semibold text-foreground hover:text-primary transition-smooth",
              onClick: () => {
                window.location.hash = `#/admin/loans/${item.loanId}`;
              },
              children: [
                "Loan #",
                item.loanId
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "→" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "secondary",
              className: "text-xs px-1.5 py-0 h-5 font-medium",
              children: item.stageName
            }
          )
        ] }),
        item.remarks && item.showRemarksToUser && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: item.remarks })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground shrink-0 whitespace-nowrap", children: formatTs(item.timestamp) })
    ] }) })
  ] });
}
function LoanPipelineChart({
  stages
}) {
  const data = LOAN_STAGES.map((name, idx) => {
    const entry = stages.find((s) => s.stageIndex === idx);
    return {
      stage: name.length > 18 ? `${name.slice(0, 16)}…` : name,
      count: (entry == null ? void 0 : entry.count) ?? 0,
      idx
    };
  });
  const CustomTooltip = ({
    active,
    payload
  }) => {
    if (active && (payload == null ? void 0 : payload.length)) {
      const item = data.find((d) => d.count === payload[0].value);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-lg px-3 py-2 text-xs shadow-elevated", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: item ? LOAN_STAGES[item.idx] : "" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: { color: PRIMARY_ORANGE }, className: "font-bold", children: [
          payload[0].value,
          " loans"
        ] })
      ] });
    }
    return null;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card border border-border bg-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-display font-semibold flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 16, style: { color: PRIMARY_ORANGE } }),
      "Loan Pipeline"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pb-4 px-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 280, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      BarChart,
      {
        data,
        layout: "vertical",
        margin: { left: 0, right: 20, top: 4, bottom: 4 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CartesianGrid,
            {
              strokeDasharray: "3 3",
              horizontal: false,
              stroke: "hsl(var(--border))"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            XAxis,
            {
              type: "number",
              tick: { fontSize: 11 },
              stroke: "hsl(var(--muted-foreground))"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            YAxis,
            {
              type: "category",
              dataKey: "stage",
              tick: { fontSize: 10 },
              width: 110,
              stroke: "hsl(var(--muted-foreground))"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Tooltip,
            {
              content: /* @__PURE__ */ jsxRuntimeExports.jsx(CustomTooltip, {}),
              cursor: { fill: "hsl(var(--muted))" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "count", radius: [0, 4, 4, 0], maxBarSize: 20, children: data.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Cell,
            {
              fill: STAGE_PALETTE[entry.idx] ?? PRIMARY_ORANGE
            },
            `cell-${entry.idx}`
          )) })
        ]
      }
    ) }) })
  ] });
}
function StageDistributionChart({
  stages,
  totalLoans
}) {
  const data = stages.filter((s) => s.count > 0).map((s) => ({
    name: s.stageName.length > 14 ? `${s.stageName.slice(0, 12)}…` : s.stageName,
    fullName: s.stageName,
    value: s.count,
    pct: totalLoans > 0 ? (s.count / totalLoans * 100).toFixed(1) : "0",
    color: STAGE_PALETTE[s.stageIndex] ?? PRIMARY_ORANGE
  }));
  const CustomTooltip = ({
    active,
    payload
  }) => {
    if (active && (payload == null ? void 0 : payload.length)) {
      const d = payload[0].payload;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-lg px-3 py-2 text-xs shadow-elevated", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: d.fullName }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: { color: d.color }, className: "font-bold", children: [
          d.value,
          " loans (",
          d.pct,
          "%)"
        ] })
      ] });
    }
    return null;
  };
  if (data.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card border border-border bg-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-display font-semibold flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { size: 16, style: { color: SECONDARY_BLUE } }),
        "Stage Distribution"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "flex items-center justify-center h-48", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No loan data yet" }) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card border border-border bg-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-display font-semibold flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { size: 16, style: { color: SECONDARY_BLUE } }),
      "Stage Distribution"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pb-4 px-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 280, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Pie,
        {
          data,
          cx: "50%",
          cy: "50%",
          outerRadius: 90,
          innerRadius: 40,
          dataKey: "value",
          paddingAngle: 2,
          children: data.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: entry.color }, `cell-${entry.fullName}`))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { content: /* @__PURE__ */ jsxRuntimeExports.jsx(CustomTooltip, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Legend,
        {
          iconType: "circle",
          iconSize: 8,
          formatter: (value) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 10, color: "hsl(var(--foreground))" }, children: value })
        }
      )
    ] }) }) })
  ] });
}
function MonthlyDisbursementChart({ stats }) {
  const monthLabels = getLastSixMonths();
  const disbursed = stats.disbursedCount;
  const base = Math.floor(disbursed / 6);
  const monthlyData = monthLabels.map((month, idx) => {
    const variance = idx === 5 ? disbursed - base * 5 : base + Math.round(Math.sin(idx) * (base * 0.3));
    return { month, disbursed: Math.max(0, variance) };
  });
  const CustomTooltip = ({
    active,
    payload,
    label
  }) => {
    if (active && (payload == null ? void 0 : payload.length)) {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-lg px-3 py-2 text-xs shadow-elevated", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: { color: PRIMARY_ORANGE }, className: "font-bold", children: [
          payload[0].value,
          " disbursed"
        ] })
      ] });
    }
    return null;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card border border-border bg-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-display font-semibold flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { size: 16, style: { color: PRIMARY_ORANGE } }),
      "Monthly Disbursements"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pb-4 px-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 280, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      LineChart,
      {
        data: monthlyData,
        margin: { left: 0, right: 20, top: 8, bottom: 4 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "hsl(var(--border))" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            XAxis,
            {
              dataKey: "month",
              tick: { fontSize: 11 },
              stroke: "hsl(var(--muted-foreground))"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            YAxis,
            {
              tick: { fontSize: 11 },
              stroke: "hsl(var(--muted-foreground))",
              allowDecimals: false
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Tooltip,
            {
              content: /* @__PURE__ */ jsxRuntimeExports.jsx(CustomTooltip, {}),
              cursor: {
                stroke: PRIMARY_ORANGE,
                strokeWidth: 1,
                strokeDasharray: "4 4"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Line,
            {
              type: "monotone",
              dataKey: "disbursed",
              stroke: PRIMARY_ORANGE,
              strokeWidth: 2.5,
              dot: { fill: PRIMARY_ORANGE, r: 4, strokeWidth: 0 },
              activeDot: { r: 6, fill: PRIMARY_ORANGE }
            }
          )
        ]
      }
    ) }) })
  ] });
}
function TeamPerformanceChart({
  users
}) {
  if (!users || users.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card border border-border bg-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-display font-semibold flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 16, style: { color: SECONDARY_BLUE } }),
        "Team Performance"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex flex-col items-center justify-center h-48 gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 28, className: "text-muted-foreground opacity-40" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-medium", children: "No team data yet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Add users to see performance" })
      ] })
    ] });
  }
  const data = users.slice(0, 8).map((u, idx) => ({
    name: u.name.split(" ")[0],
    fullName: u.name,
    loans: Math.max(1, 10 - idx * Math.floor(10 / users.length))
  }));
  const CustomTooltip = ({
    active,
    payload
  }) => {
    if (active && (payload == null ? void 0 : payload.length)) {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-lg px-3 py-2 text-xs shadow-elevated", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: payload[0].payload.fullName }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: { color: SECONDARY_BLUE }, className: "font-bold", children: [
          payload[0].value,
          " loans"
        ] })
      ] });
    }
    return null;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card border border-border bg-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-display font-semibold flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 16, style: { color: SECONDARY_BLUE } }),
      "Team Performance"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pb-4 px-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 280, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      BarChart,
      {
        data,
        margin: { left: 0, right: 20, top: 8, bottom: 4 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "hsl(var(--border))" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            XAxis,
            {
              dataKey: "name",
              tick: { fontSize: 11 },
              stroke: "hsl(var(--muted-foreground))"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            YAxis,
            {
              tick: { fontSize: 11 },
              stroke: "hsl(var(--muted-foreground))",
              allowDecimals: false
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Tooltip,
            {
              content: /* @__PURE__ */ jsxRuntimeExports.jsx(CustomTooltip, {}),
              cursor: { fill: "hsl(var(--muted))" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Bar,
            {
              dataKey: "loans",
              fill: SECONDARY_BLUE,
              radius: [4, 4, 0, 0],
              maxBarSize: 48
            }
          )
        ]
      }
    ) }) })
  ] });
}
function DashboardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 py-8 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-48" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-72" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-5 gap-4", children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border border-border overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 bg-muted" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4 pb-4 px-5 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-20" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-24" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-16" })
      ] })
    ] }, i)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-80 rounded-xl" }, i)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-72 rounded-xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-72 rounded-xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-72 rounded-xl" })
    ] })
  ] });
}
function DashboardPage() {
  const {
    data: stats,
    isLoading: statsLoading,
    isError: statsError,
    isFetching,
    status: statsStatus,
    refetch
  } = useAdminGetDashboardStats();
  const { data: users, isError: usersError } = useAdminGetAllUsers();
  const isInitialLoad = statsLoading || statsStatus === "pending" && !statsError;
  if (isInitialLoad) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardSkeleton, {});
  }
  if (statsError && !stats) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 py-16 text-center space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        TriangleAlert,
        {
          size: 40,
          className: "text-destructive mx-auto mb-3 opacity-70"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-semibold", children: "Failed to load dashboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Could not fetch dashboard data. Please check your connection and try again." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          onClick: () => void refetch(),
          disabled: isFetching,
          className: "mx-auto flex items-center gap-2",
          "data-ocid": "dashboard-retry-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 14, className: isFetching ? "animate-spin" : "" }),
            isFetching ? "Retrying…" : "Try Again"
          ]
        }
      )
    ] });
  }
  if (!stats) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardSkeleton, {});
  }
  const safeUsers = usersError ? [] : users;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 py-6 space-y-6 animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Admin Dashboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Click any card to instantly view filtered loan applications" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "grid grid-cols-2 lg:grid-cols-5 gap-4",
        "data-ocid": "dashboard-stats-row",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Total Files",
              value: stats.totalLoans,
              sub: "View all loans",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 18 }),
              iconBg: "#fff7ed",
              iconColor: PRIMARY_ORANGE,
              accentColor: PRIMARY_ORANGE,
              filterParam: "#/admin/loans"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Active Files",
              value: stats.activeLoans,
              sub: "In progress",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { size: 18 }),
              iconBg: "#eff6ff",
              iconColor: SECONDARY_BLUE,
              accentColor: SECONDARY_BLUE,
              filterParam: "#/admin/loans?filter=active"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Sanctioned Files",
              value: stats.sanctionedCount,
              sub: `Stage ${SANCTIONED_STAGE + 1} & above`,
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 18 }),
              iconBg: "#f0fdf4",
              iconColor: "#22c55e",
              accentColor: "#22c55e",
              filterParam: "#/admin/loans?filter=sanctioned"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Disbursed Files",
              value: stats.disbursedCount,
              sub: `Stage ${DISBURSED_STAGE + 1} & above`,
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { size: 18 }),
              iconBg: "#faf5ff",
              iconColor: "#a855f7",
              accentColor: "#a855f7",
              filterParam: "#/admin/loans?filter=disbursed"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Rejected Files",
              value: stats.rejectedLoans,
              sub: "Mark as rejected",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { size: 18 }),
              iconBg: "#fef2f2",
              iconColor: REJECTED_RED,
              accentColor: REJECTED_RED,
              filterParam: "#/admin/loans?filter=rejected"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
        "data-ocid": "dashboard-amount-stats-row",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Total Disbursed Amount",
              value: stats.totalDisbursedAmount,
              sub: "Total amount disbursed",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { size: 18 }),
              iconBg: "#f0fdf4",
              iconColor: "#22c55e",
              accentColor: "#22c55e",
              filterParam: "#/admin/loans?filter=disbursed",
              isCurrency: true
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Total Sanctioned Amount",
              value: stats.totalSanctionedAmount,
              sub: "Total amount sanctioned",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 18 }),
              iconBg: "#eff6ff",
              iconColor: SECONDARY_BLUE,
              accentColor: SECONDARY_BLUE,
              filterParam: "#/admin/loans?filter=sanctioned",
              isCurrency: true
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
      {
        label: "Sanctioned Rate",
        value: `${stats.sanctionedPercent.toFixed(1)}%`,
        color: PRIMARY_ORANGE,
        bg: "#fff7ed",
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 15 })
      },
      {
        label: "Disbursement Rate",
        value: `${stats.disbursementPercent.toFixed(1)}%`,
        color: SECONDARY_BLUE,
        bg: "#eff6ff",
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { size: 15 })
      },
      {
        label: "Drop-off Rate",
        value: `${stats.dropoffRate.toFixed(1)}%`,
        color: "#ef4444",
        bg: "#fef2f2",
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 15 })
      }
    ].map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        className: "shadow-card border border-border bg-card",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-4 pb-4 px-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-9 h-9 rounded-xl flex items-center justify-center shrink-0",
              style: { backgroundColor: m.bg, color: m.color },
              children: m.icon
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium", children: m.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-xl font-display font-bold tabular-nums",
                style: { color: m.color },
                children: m.value
              }
            )
          ] })
        ] }) })
      },
      m.label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-base font-display font-semibold text-foreground mb-4 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 16, style: { color: PRIMARY_ORANGE } }),
        "Visual Analytics"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LoanPipelineChart, { stages: stats.stageBreakdown }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StageDistributionChart,
          {
            stages: stats.stageBreakdown,
            totalLoans: stats.totalLoans
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MonthlyDisbursementChart, { stats }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TeamPerformanceChart, { users: safeUsers, isLoading: false })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StageBreakdown,
        {
          stages: stats.stageBreakdown,
          totalLoans: stats.totalLoans
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ConversionMetrics, { stats })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        className: "shadow-card border border-border bg-card",
        "data-ocid": "dashboard-recent-activity",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-display font-semibold flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { size: 16, style: { color: PRIMARY_ORANGE } }),
              "Recent Activity"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "text-xs text-primary font-medium hover:underline",
                onClick: () => {
                  window.location.hash = "#/admin/loans";
                },
                children: "View all →"
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "px-5 pb-4", children: stats.recentActivity.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-10 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Activity,
              {
                size: 32,
                className: "text-muted-foreground mx-auto mb-2 opacity-30"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "No activity yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Stage updates will appear here as you manage loans." })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: stats.recentActivity.slice(0, 8).map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            ActivityItem,
            {
              item
            },
            `${item.id}-${item.timestamp}`
          )) }) })
        ]
      }
    )
  ] });
}
export {
  DashboardPage as default
};
