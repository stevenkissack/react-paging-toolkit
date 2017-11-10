import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PagingControl from './PagingControl'

/**
 * A wrapper to implement the most common form of pagination in a web app
 */
class Paginate extends Component {
  render() {
    let showPagers = Number.isInteger(this.props.totalCount) && this.props.paging
    let showTopPager = this.props.pagingControlPosition === "both" || this.props.pagingControlPosition === "top"
    let showBottomPager = this.props.pagingControlPosition === "both" || this.props.pagingControlPosition === "bottom"
    // Uppercase to allow as Components
    let PagingControlComponent = this.props.pagingControlComponent
    let Loader = this.props.loaderComponent

    return (
      <div className={this.props.className + (this.props.loading ? ' loading': '')}>
        { showTopPager && showPagers && <PagingControlComponent paging={this.props.paging} onSelect={this.props.onSelect} totalCount={this.props.totalCount} /> }
        { this.props.loading && !!Loader && <Loader /> }
        { (!this.props.loading || (this.props.loading && this.props.preserveDataDuringLoading)) && this.props.children }
        { showBottomPager && showPagers && <PagingControlComponent paging={this.props.paging} onSelect={this.props.onSelect} totalCount={this.props.totalCount} /> }
      </div>
    )
  }
}

Paginate.propTypes = {
  loading: PropTypes.bool.isRequired,
  onSelect: PropTypes.func,
  className: PropTypes.string,
  paging: PropTypes.object.isRequired,
  totalCount: PropTypes.number,
  loaderComponent: PropTypes.func,
  preserveDataDuringLoading: PropTypes.bool,
  pagingControlComponent: PropTypes.func,
  pagingParams: PropTypes.array,
  pagingControlPosition: PropTypes.string
}

Paginate.defaultProps = {
  //loaderComponent: undefined, // default: no loader for now, pass in a component
  preserveDataDuringLoading: false,
  className: "paginate",
  pagingControlComponent: PagingControl,
  pagingParams: ['page', 'perPage', 'filter'],
  pagingControlPosition: 'both' // both || top || bottom
}

export default Paginate