(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["react-tradingview-widget"] = factory();
	else
		root["react-tradingview-widget"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return webpackJsonpreact_tradingview_widget([1],{

/***/ 5:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var SCRIPT_ID = 'tradingview-widget-script';
var CONTAINER_ID = 'tradingview-widget';

var TradingViewWidget = function (_PureComponent) {
  _inherits(TradingViewWidget, _PureComponent);

  function TradingViewWidget() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TradingViewWidget);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TradingViewWidget.__proto__ || Object.getPrototypeOf(TradingViewWidget)).call.apply(_ref, [this].concat(args))), _this), _this.componentDidMount = function () {
      return _this.appendScript(_this.initWidget);
    }, _this.componentDidUpdate = function () {
      _this.cleanWidget();
      _this.initWidget();
    }, _this.canUseDOM = function () {
      return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
    }, _this.appendScript = function (onload) {
      if (!_this.canUseDOM()) {
        onload();
        return;
      }

      if (_this.scriptExists()) {
        /* global TradingView */
        if (typeof TradingView === 'undefined') {
          _this.updateOnloadListener(onload);
          return;
        }
        onload();
        return;
      }
      var script = document.createElement('script');
      script.id = SCRIPT_ID;
      script.type = 'text/javascript';
      script.async = true;
      script.src = 'https://s3.tradingview.com/tv.js';
      script.onload = onload;
      document.getElementsByTagName('head')[0].appendChild(script);
    }, _this.getScriptElement = function () {
      return document.getElementById(SCRIPT_ID);
    }, _this.scriptExists = function () {
      return _this.getScriptElement() !== null;
    }, _this.updateOnloadListener = function (onload) {
      var script = _this.getScriptElement();
      var oldOnload = script.onload;
      return script.onload = function () {
        oldOnload();
        onload();
      };
    }, _this.initWidget = function () {
      /* global TradingView */
      if (typeof TradingView === 'undefined' || !document.getElementById(_this.props.containerId)) return;

      var _this$props = _this.props,
          widgetType = _this$props.widgetType,
          widgetConfig = _objectWithoutProperties(_this$props, ['widgetType']);

      var config = _extends({}, widgetConfig, { container_id: _this.props.containerId });

      if (config.autosize) {
        delete config.width;
        delete config.height;
      }

      /* global TradingView */
      new TradingView[widgetType](config);
    }, _this.cleanWidget = function () {
      if (!_this.canUseDOM()) return;
      document.getElementById(_this.props.containerId).innerHTML = '';
    }, _this.getStyle = function () {
      if (!_this.props.autosize) return {};
      return {
        width: '100%',
        height: '100%'
      };
    }, _this.render = function () {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('article', { id: _this.props.containerId, style: _this.getStyle() });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  //containerId = `${CONTAINER_ID}-${Math.random()}`;

  return TradingViewWidget;
}(__WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"]);

TradingViewWidget.propTypes = {
  autosize: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  height: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  greyText: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  gridLineColor: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  fontColor: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  underLineColor: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  trendLineColor: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  symbols: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string)).isRequired,
  locale: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  widgetType: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  width: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  chartOnly: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  containerId: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string
};
TradingViewWidget.defaultProps = {
  containerId: CONTAINER_ID,
  autosize: false,
  height: '400px',
  greyText: "Quotes by",
  gridLineColor: "#e9e9ea",
  fontColor: "#83888D",
  underLineColor: "#dbeffb",
  trendLineColor: "#4bafe9",
  locale: 'en',
  widgetType: 'MediumWidget',
  width: '1000px',
  chartOnly: false
};
/* harmony default export */ __webpack_exports__["default"] = (TradingViewWidget);

/***/ })

},[5]);
});