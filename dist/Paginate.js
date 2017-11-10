'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _PagingControl = require('./PagingControl');

var _PagingControl2 = _interopRequireDefault(_PagingControl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A wrapper to implement the most common form of pagination in a web app
 */
var Paginate = function (_Component) {
  _inherits(Paginate, _Component);

  function Paginate() {
    _classCallCheck(this, Paginate);

    return _possibleConstructorReturn(this, (Paginate.__proto__ || Object.getPrototypeOf(Paginate)).apply(this, arguments));
  }

  _createClass(Paginate, [{
    key: 'render',
    value: function render() {
      var showPagers = Number.isInteger(this.props.totalCount) && this.props.paging;
      var showTopPager = this.props.pagingControlPosition === "both" || this.props.pagingControlPosition === "top";
      var showBottomPager = this.props.pagingControlPosition === "both" || this.props.pagingControlPosition === "bottom";
      // Uppercase to allow as Components
      var PagingControlComponent = this.props.pagingControlComponent;
      var Loader = this.props.loaderComponent;

      return _react2.default.createElement(
        'div',
        { className: this.props.className + (this.props.loading ? ' loading' : '') },
        showTopPager && showPagers && _react2.default.createElement(PagingControlComponent, { paging: this.props.paging, onSelect: this.props.onSelect, totalCount: this.props.totalCount }),
        this.props.loading && !!Loader && _react2.default.createElement(Loader, null),
        (!this.props.loading || this.props.loading && this.props.preserveDataDuringLoading) && this.props.children,
        showBottomPager && showPagers && _react2.default.createElement(PagingControlComponent, { paging: this.props.paging, onSelect: this.props.onSelect, totalCount: this.props.totalCount })
      );
    }
  }]);

  return Paginate;
}(_react.Component);

Paginate.propTypes = {
  loading: _propTypes2.default.bool.isRequired,
  onSelect: _propTypes2.default.func,
  className: _propTypes2.default.string,
  paging: _propTypes2.default.object.isRequired,
  totalCount: _propTypes2.default.number,
  loaderComponent: _propTypes2.default.func,
  preserveDataDuringLoading: _propTypes2.default.bool,
  pagingControlComponent: _propTypes2.default.func,
  pagingParams: _propTypes2.default.array,
  pagingControlPosition: _propTypes2.default.string
};

Paginate.defaultProps = {
  //loaderComponent: undefined, // default: no loader for now, pass in a component
  preserveDataDuringLoading: false,
  className: "paginate",
  pagingControlComponent: _PagingControl2.default,
  pagingParams: ['page', 'perPage', 'filter'],
  pagingControlPosition: 'both' // both || top || bottom
};

exports.default = Paginate;