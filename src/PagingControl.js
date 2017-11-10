import React, {Component} from 'react'
import PropTypes from 'prop-types'
//import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'

class PaginateControl extends Component {
  makeArray(from, count) {
    return Array(count).fill().map((v,i) => { return from + i })
  }
  generateOptions(current, total) {
    let options

    if(!current || !total) {
      return []
    }

    // TODO: This actually comes out as 7 due to also showing the current one when in the middle
    let rangeDisplayed = 6

    //console.log(`range: ${rangeDisplayed}, current: ${current}, total: ${total}`)

    if (total <= rangeDisplayed) {
      // show all - generate array of incrementing items
      options = this.makeArray(1, total)
    } else {
      // the perfect amount each side
      let halfRange = (rangeDisplayed / 2)

      if(current > halfRange && current <= (total - halfRange)) {
        // In the middle somewhere
        options = [1, '...', current - 1, current, current + 1, '...', total]
      } else if (current <= halfRange) {
        // Left side
        options = this.makeArray(1, halfRange + 1)
        options = options.concat(['...', total])
      } else if (current > (total - halfRange)) {
        // Right side
        options = [1, '...']
        options = options.concat(this.makeArray(total - halfRange, halfRange + 1))
      }
    }
    return options
  }
  render() {
    let {paging, onSelect, totalCount, className} = this.props

    let pageCount = totalCount / parseInt(paging.perPage || 20, 10)
    let currentPage = parseInt(paging.page || 1, 10)

    let previousDisabled = currentPage === 1
    let nextDisabled = pageCount === currentPage
    let options = this.generateOptions(currentPage, pageCount)

    return (
      <nav className={className}>
        <ul className="pagination">
          <li className={"page-item " + (previousDisabled ? "disabled" : "")}>
            <a className="page-link" tabIndex={previousDisabled ? "-1" : "1"} onClick={()=> { onSelect(currentPage - 1) }}>Previous</a>
          </li>
          { options.map((option, idx) => {
              let isActive = currentPage === option
              return <li key={idx} className={"page-item " + (isActive ? "active" : "")} tabIndex={option}>
                <a className="page-link" onClick={()=> { if(Number.isInteger(option)) { onSelect(option) } }}>{option} {isActive ? <span className="sr-only">(current)</span> : undefined}</a>
              </li>
            })
          }
          <li className={"page-item " + (nextDisabled ? "disabled" : "")}>
            <a className="page-link" tabIndex={nextDisabled ? "-1" : pageCount + 1} onClick={()=> { onSelect(currentPage + 1) }}>Next</a>
          </li>
        </ul>
      </nav>
    )
  }
}

PaginateControl.propTypes = {
  paging: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
  totalCount: PropTypes.number.isRequired,
  className: PropTypes.string
}

export default PaginateControl