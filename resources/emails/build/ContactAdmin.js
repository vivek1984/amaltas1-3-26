function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
import * as React from "react";

/**
 * Renders a report card for a custom furniture enquiry,
 * displaying key-value pairs from the `data` prop in a stylized table.
 *
 * @param {Object} props - Component props.
 * @param {Object<string, string>} props.data - The data object containing the enquiry details.
 */
export default function ContactAdmin(_ref) {
  var data = _ref.data;
  // Utility function to ensure the value is a renderable string
  var renderValue = function renderValue(value) {
    if (value === null || value === undefined || value === '') {
      return "-";
    }

    // This is the core fix: Safely converting objects/arrays to strings.
    if (_typeof(value) === 'object') {
      try {
        // Use JSON.stringify for a safe, printable representation of the object/array
        return JSON.stringify(value, null, 2);
      } catch (e) {
        return "[Unprintable Object]";
      }
    }
    return value;
  };

  // Filter out unwanted keys before rendering the entries
  var filteredEntries = Object.entries(data).filter(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 1),
      key = _ref3[0];
    return (
      // Exclude the recaptcha_token field from the report
      key !== 'recaptcha_token'
    );
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "p-6 md:p-10 bg-gray-50 shadow-2xl rounded-xl max-w-4xl mx-auto my-10 font-sans border border-gray-100"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "mb-6 text-3xl font-bold text-indigo-700 border-b-4 border-indigo-100 pb-3"
  }, "New Custom Furniture Enquiry"), /*#__PURE__*/React.createElement("table", {
    className: "w-full border-collapse text-base border-spacing-0"
  }, /*#__PURE__*/React.createElement("tbody", null, filteredEntries.map(function (_ref4, index) {
    var _ref5 = _slicedToArray(_ref4, 2),
      key = _ref5[0],
      value = _ref5[1];
    return /*#__PURE__*/React.createElement("tr", {
      key: key,
      className: index % 2 === 0 ? 'bg-indigo-50/50' : 'bg-white'
    }, /*#__PURE__*/React.createElement("td", {
      className: "px-4 py-3 font-semibold capitalize w-1/3 text-indigo-800 border-b border-gray-200 border-r border-indigo-100/50 rounded-l-lg"
    }, key.replace(/_/g, " ")), /*#__PURE__*/React.createElement("td", {
      className: "px-4 py-3 text-gray-700 border-b border-gray-200 whitespace-pre-wrap rounded-r-lg"
    }, renderValue(value)));
  }))));
}