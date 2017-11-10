import React from 'react'
import Paginate, { getPagingSearchParams, updateSearchParams, WithUrlPaging } from '../src/index'

/**
 * Example: Paginate URL wrapper example
 * 
 * Note: This component is optional, you can use the PagingControl directly too.
 * 
 * This example gets the basics of the component running without any support for URL control or Redux state.
 * The Paginate component is a simple layer of abstraction around pagination to allow quicker development cycles
 * 
 */


class UrlPaginateExample extends React.Component {
	constructor(props) {
		super(props)

		this.onPageSelect = this.onPageSelect.bind(this)
		this.loadPage = this.loadPage.bind(this)

		// Helper method WithUrlPaging allows simpler URL based state setup
		this.state = WithUrlPaging({
			loading: false,
			data: [],
			totalCount: 0, // Needed if you want the in-built paging control
		})

		// This is only needed for this demo, as we use it in the example fake data
		if(this.state.paging.page !== undefined) {
			this.state.paging.page = parseInt(this.state.paging.page, 10)
		}
	}

	componentWillMount() {
		this.loadPage(this.state.paging)
	}

	onPageSelect(page) {
		// set the loading state
		this.setState({ loading: true })
		this.loadPage({...this.state.paging, page})
	}

	loadPage(nextPagingState, callback) {

		// Create 20 items of fake data
		let newFakeData = []
		for(let f=0,fl=20; f<fl; f++) {
			newFakeData.push({
				id: f * (nextPagingState.page || 1),
				title: 'page:' + (nextPagingState.page || 1) + ' item:' + f
			})
		}

		// Fake network request with delay
		window.setTimeout(() => {
			// Set new state
			this.setState({
				paging : nextPagingState, // Update current page, can also do this before the return
				data: newFakeData,
				totalCount: 1000, // returned by the server
				loading: false
			})
			// Update URL params
			updateSearchParams(nextPagingState)
		}, 300)
	}

	render() {
		return (
			<Paginate
				paging={this.state.paging}
				totalCount={this.state.totalCount}
				loading={this.state.loading}
				onSelect={this.onPageSelect}>
				
				{ this.state.data.map(item => { return (
					<div key={item.id}>
						<div>id: {item.id}</div>
						<div>title: {item.title}</div>
					</div>
				)})}

			</Paginate>
		)
	}
}

export default UrlPaginateExample