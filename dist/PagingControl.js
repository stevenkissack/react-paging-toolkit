'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'

var PaginateControl = function (_Component) {
  _inherits(PaginateControl, _Component);

  function PaginateControl() {
    _classCallCheck(this, PaginateControl);

    return _possibleConstructorReturn(this, (PaginateControl.__proto__ || Object.getPrototypeOf(PaginateControl)).apply(this, arguments));
  }

  _createClass(PaginateControl, [{
    key: 'makeArray',
    value: function makeArray(from, count) {
      return Array(count).fill().map(function (v, i) {
        return from + i;
      });
    }
  }, {
    key: 'generateOptions',
    value: function generateOptions(current, total) {
      var options = void 0;

      if (!current || !total) {
        return [];
      }

      // TODO: This actually comes out as 7 due to also showing the current one when in the middle
      var rangeDisplayed = 6;

      //console.log(`range: ${rangeDisplayed}, current: ${current}, total: ${total}`)

      if (total <= rangeDisplayed) {
        // show all - generate array of incrementing items
        options = this.makeArray(1, total);
      } else {
        // the perfect amount each side
        var halfRange = rangeDisplayed / 2;

        if (current > halfRange && current <= total - halfRange) {
          // In the middle somewhere
          options = [1, '...', current - 1, current, current + 1, '...', total];
        } else if (current <= halfRange) {
          // Left side
          options = this.makeArray(1, halfRange + 1);
          options = options.concat(['...', total]);
        } else if (current > total - halfRange) {
          // Right side
          options = [1, '...'];
          options = options.concat(this.makeArray(total - halfRange, halfRange + 1));
        }
      }
      return options;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          paging = _props.paging,
          onSelect = _props.onSelect,
          totalCount = _props.totalCount,
          className = _props.className;

      // Round up to nearest page worth

      var pageCount = Math.ceil(totalCount / parseInt(paging.perPage || 20, 10));

      var currentPage = parseInt(paging.page || 1, 10);

      var previousDisabled = currentPage === 1;
      var nextDisabled = pageCount === currentPage;
      var options = this.generateOptions(currentPage, pageCount);

      return _react2.default.createElement(
        'nav',
        { className: className },
        _react2.default.createElement(
          'ul',
          { className: 'pagination' },
          _react2.default.createElement(
            'li',
            { className: "page-item " + (previousDisabled ? "disabled" : "") },
            _react2.default.createElement(
              'a',
              { className: 'page-link', tabIndex: previousDisabled ? "-1" : "1", onClick: function onClick() {
                  onSelect(currentPage - 1);
                } },
              'Previous'
            )
          ),
          options.map(function (option, idx) {
            var isActive = currentPage === option;
            return _react2.default.createElement(
              'li',
              { key: idx, className: "page-item " + (isActive ? "active" : ""), tabIndex: option },
              _react2.default.createElement(
                'a',
                { className: 'page-link', onClick: function onClick() {
                    if (Number.isInteger(option)) {
                      onSelect(option);
                    }
                  } },
                option,
                ' ',
                isActive ? _react2.default.createElement(
                  'span',
                  { className: 'sr-only' },
                  '(current)'
                ) : undefined
              )
            );
          }),
          _react2.default.createElement(
            'li',
            { className: "page-item " + (nextDisabled ? "disabled" : "") },
            _react2.default.createElement(
              'a',
              { className: 'page-link', tabIndex: nextDisabled ? "-1" : pageCount + 1, onClick: function onClick() {
                  onSelect(currentPage + 1);
                } },
              'Next'
            )
          )
        )
      );
    }
  }]);

  return PaginateControl;
}(_react.Component);

PaginateControl.propTypes = {
  paging: _propTypes2.default.object.isRequired,
  onSelect: _propTypes2.default.func.isRequired,
  totalCount: _propTypes2.default.number.isRequired,
  className: _propTypes2.default.string
};

exports.default = PaginateControl;