"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changeYear = exports.addPeriods = exports.endOfFebruary = exports.isEndOfFebruary = exports.isFebruary = exports.isEndOfMonth = exports.startOfEndOfMonth = exports.countDays30360 = exports.countDays30E360 = exports.countDays30365 = void 0;

var _curry2 = _interopRequireDefault(require("ramda/src/curry"));

var _both2 = _interopRequireDefault(require("ramda/src/both"));

var _equals2 = _interopRequireDefault(require("ramda/src/equals"));

var _converge2 = _interopRequireDefault(require("ramda/src/converge"));

var _compose2 = _interopRequireDefault(require("ramda/src/compose"));

var _always2 = _interopRequireDefault(require("ramda/src/always"));

var _when2 = _interopRequireDefault(require("ramda/src/when"));

var _min2 = _interopRequireDefault(require("ramda/src/min"));

var _end_of_month = _interopRequireDefault(require("date-fns/end_of_month"));

var _end_of_day = _interopRequireDefault(require("date-fns/end_of_day"));

var _start_of_day = _interopRequireDefault(require("date-fns/start_of_day"));

var _add_months = _interopRequireDefault(require("date-fns/add_months"));

var _get_month = _interopRequireDefault(require("date-fns/get_month"));

var _set_year = _interopRequireDefault(require("date-fns/set_year"));

var _get_year = _interopRequireDefault(require("date-fns/get_year"));

var _is_equal = _interopRequireDefault(require("date-fns/is_equal"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var min30 = (0, _min2["default"])(30);

var min30If = function min30If(condition) {
  return (0, _when2["default"])((0, _always2["default"])(condition), min30);
};

var base30360Formula = function base30360Formula(d1, m1, y1, d2, m2, y2) {
  return (y2 - y1) * 360 + (m2 - m1) * 30 + d2 - d1;
};
/* eslint-disable max-len */


var countDays30E360 = function countDays30E360(d1, m1, y1, d2, m2, y2) {
  return base30360Formula(min30(d1), m1, y1, min30(d2), m2, y2);
};

exports.countDays30E360 = countDays30E360;

var countDays30365 = function countDays30365(d1, m1, y1, d2, m2, y2) {
  return (y2 - y1) * 365 + (m2 - m1) * 30 + d2 - d1;
}
exports.countDays30365 = countDays30365;

var countDays30360 = function countDays30360(d1, m1, y1, d2, m2, y2) {
  return base30360Formula(min30(d1), m1, y1, min30If(d1 >= 30)(d2), m2, y2);
};
/* eslint-enable max-len */
exports.countDays30360 = countDays30360;
var startOfEndOfMonth = (0, _compose2["default"])(_start_of_day["default"], _end_of_month["default"]);
exports.startOfEndOfMonth = startOfEndOfMonth;
var isEndOfMonth = (0, _converge2["default"])(_is_equal["default"], [_end_of_day["default"], _end_of_month["default"]]);
exports.isEndOfMonth = isEndOfMonth;
var isFebruary = (0, _compose2["default"])((0, _equals2["default"])(1), _get_month["default"]);
exports.isFebruary = isFebruary;
var isEndOfFebruary = (0, _both2["default"])(isEndOfMonth, isFebruary);
exports.isEndOfFebruary = isEndOfFebruary;

var endOfFebruary = function endOfFebruary(year) {
  return startOfEndOfMonth(new Date(year, 1));
};

exports.endOfFebruary = endOfFebruary;
var addPeriods = (0, _curry2["default"])(function (date, frequency, n) {
  return (0, _add_months["default"])(date, 12 / frequency * n);
});
exports.addPeriods = addPeriods;

var changeYear = function changeYear(date1, date2) {
  return isEndOfFebruary(date1) ? endOfFebruary((0, _get_year["default"])(date2)) : (0, _set_year["default"])(date1, (0, _get_year["default"])(date2));
};

exports.changeYear = changeYear;