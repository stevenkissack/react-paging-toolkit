'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.getPagingSearchParams = getPagingSearchParams;
exports.parsePagingParams = parsePagingParams;
exports.updateSearchParams = updateSearchParams;
exports.WithPaging = WithPaging;
exports.WithUrlPaging = WithUrlPaging;

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getPagingSearchParams() {
    var filterList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ['page', 'perPage', 'filter'];

    return parsePagingParams(window.location.search, filterList);
}

function parsePagingParams(paramString, paramFilterList) {
    // Ignore leading "?"
    var parsedParams = _qs2.default.parse(paramString, { ignoreQueryPrefix: true });

    // Filter params from returned querystring
    if (paramFilterList) {
        var params = {};
        paramFilterList.map(function (param) {
            params[param] = parsedParams[param];
        });
        return params;
    } else {
        return parsedParams;
    }
}

function updateSearchParams(params) {
    var forceClear = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    // Get current params
    var searchParams = forceClear ? {} : _qs2.default.parse(window.location.search, { ignoreQueryPrefix: true });

    // Merge with new params
    var newSearchParams = _extends({}, searchParams, params);

    // Set new browser URL
    var newRelativePathQuery = window.location.pathname + '?' + _qs2.default.stringify(newSearchParams);
    window.history.pushState(null, '', newRelativePathQuery);
}

function WithPaging(originalState) {
    return _extends({ paging: { page: 1, perPage: 20, filter: null } }, originalState);
}

function WithUrlPaging(originalState, optionalFilterList) {
    return _extends({}, WithPaging, { paging: _extends({}, getPagingSearchParams(optionalFilterList)) }, originalState);
}

exports.default = {
    getPagingSearchParams: getPagingSearchParams,
    parsePagingParams: parsePagingParams,
    updateSearchParams: updateSearchParams,
    WithPaging: WithPaging
};