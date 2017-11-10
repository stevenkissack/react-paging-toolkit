import qs from 'qs'

export function getPagingSearchParams(filterList = ['page', 'perPage', 'filter']) {
    return parsePagingParams(window.location.search, filterList)
}

export function parsePagingParams(paramString, paramFilterList) {
    // Ignore leading "?"
    let parsedParams = qs.parse(paramString, { ignoreQueryPrefix: true })

    // Filter params from returned querystring
    if(paramFilterList) {
        return paramFilterList.forEach(param => {
            params[param] = parsedParams[param]
        })
    } else {
        return parsedParams
    }
}

export function updateSearchParams(params, forceClear = false) {
    // Get current params
    let searchParams = forceClear ? {} : qs.parse(window.location.search, { ignoreQueryPrefix: true })
    
    // Merge with new params
    let newSearchParams = { ...searchParams, ...params }

    // Set new browser URL
    let newRelativePathQuery = window.location.pathname + '?' + qs.stringify(newSearchParams)
    window.history.pushState(null, '', newRelativePathQuery)
}

export function WithPaging(originalState) {
    return { paging: { page: 1, perPage: 20, filter: null }, ...originalState }
}

export function WithUrlPaging(originalState, optionalFilterList) {
    return { ...WithPaging, ...getPagingSearchParams(optionalFilterList), ...originalState }
}

export default {
    getPagingSearchParams,
    parsePagingParams,
    updateSearchParams,
    WithPaging
}