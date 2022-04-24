"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.num = exports.next = exports.previous = exports.dates = exports.accrued = exports.days = void 0;

var _multiply2 = _interopRequireDefault(require("ramda/src/multiply"));

var _add2 = _interopRequireDefault(require("ramda/src/add"));

var _find2 = _interopRequireDefault(require("ramda/src/find"));

var _2 = _interopRequireDefault(require("ramda/src/__"));

var _findLast2 = _interopRequireDefault(require("ramda/src/findLast"));

var _max2 = _interopRequireDefault(require("ramda/src/max"));

var _range2 = _interopRequireDefault(require("ramda/src/range"));

var _always2 = _interopRequireDefault(require("ramda/src/always"));

var _when2 = _interopRequireDefault(require("ramda/src/when"));

var _compose2 = _interopRequireDefault(require("ramda/src/compose"));

var _map2 = _interopRequireDefault(require("ramda/src/map"));

var _either2 = _interopRequireDefault(require("ramda/src/either"));

var _curry2 = _interopRequireDefault(require("ramda/src/curry"));

var _is_equal = _interopRequireDefault(require("date-fns/is_equal"));

var _is_before = _interopRequireDefault(require("date-fns/is_before"));

var _is_after = _interopRequireDefault(require("date-fns/is_after"));

var _get_year = _interopRequireDefault(require("date-fns/get_year"));

var _get_month = _interopRequireDefault(require("date-fns/get_month"));

var _get_date = _interopRequireDefault(require("date-fns/get_date"));

var _difference_in_months = _interopRequireDefault(require("date-fns/difference_in_months"));

var _difference_in_days = _interopRequireDefault(require("date-fns/difference_in_days"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var differenceInMonthsC = (0, _curry2["default"])(_difference_in_months["default"]);
var isBeforeOrEqual = (0, _curry2["default"])(function (dateLeft, dateRight) {
  return (0, _either2["default"])(_is_before["default"], _is_equal["default"])(dateLeft, dateRight);
}); // eslint-disable-line max-len

var isAfterC = (0, _curry2["default"])(_is_after["default"]);

var days = function days(previous, next, frequency, convention) {
  switch (convention) {
    case 'ACTUAL/365':
    case '30/365':
      return 365 / frequency;

    case 'ACTUAL/ACTUAL':
      return (0, _difference_in_days["default"])(next, previous);

    case '30U/360':
    case '30E/360':
    case '30/360':
    case 'ACTUAL/360':
    default:
      return 360 / frequency;
  }
};

exports.days = days;

var accrued = function accrued(date1, date2, convention) {
  var d1 = (0, _get_date["default"])(date1);
  var m1 = (0, _get_month["default"])(date1);
  var y1 = (0, _get_year["default"])(date1);
  var d2 = (0, _get_date["default"])(date2);
  var m2 = (0, _get_month["default"])(date2);
  var y2 = (0, _get_year["default"])(date2);

  switch (convention) {
    case '30/360':
      return (0, _utils.countDays30360)(d1, m1, y1, d2, m2, y2);
    case '30/365':
      return (0, _utils.countDays30365)(d1, m1, y1, d2, m2, y2);

    case '30E/360':
      return (0, _utils.countDays30E360)(d1, m1, y1, d2, m2, y2);

    case 'ACTUAL/360':
    case 'ACTUAL/365':
    case 'ACTUAL/ACTUAL':
      return (0, _difference_in_days["default"])(date2, date1);

    case '30U/360':
    default:
      if ((0, _utils.isEndOfFebruary)(date1)) d1 = 30;
      if ((0, _utils.isEndOfFebruary)(date1) && (0, _utils.isEndOfFebruary)(date2)) d2 = 30;
      return (0, _utils.countDays30360)(d1, m1, y1, d2, m2, y2);
  }
};

exports.accrued = accrued;

var dates = function dates(settlement, maturity, frequency) {
  return (0, _map2["default"])((0, _compose2["default"])((0, _when2["default"])((0, _always2["default"])((0, _utils.isEndOfMonth)(maturity)), _utils.startOfEndOfMonth), (0, _utils.addPeriods)((0, _utils.changeYear)(maturity, settlement), frequency)), (0, _range2["default"])(1 - (0, _max2["default"])(4)(frequency), (0, _max2["default"])(4)(frequency)));
};

exports.dates = dates;

var previous = function previous(settlement, maturity, frequency) {
  return (0, _compose2["default"])((0, _findLast2["default"])(isBeforeOrEqual(_2["default"], settlement)), dates)(settlement, maturity, frequency);
};

exports.previous = previous;

var next = function next(settlement, maturity, frequency) {
  return (0, _compose2["default"])((0, _find2["default"])(isAfterC(_2["default"], settlement)), dates)(settlement, maturity, frequency);
};

exports.next = next;

var num = function num(settlement, maturity, frequency) {
  return (0, _compose2["default"])(Math.ceil, (0, _add2["default"])(1), (0, _multiply2["default"])(frequency / 12), differenceInMonthsC(maturity), next)(settlement, maturity, frequency);
};

exports.num = num;