import React from 'react'
import Paginate, { WithPaging } from '../src/index'

/**
 * Example: Paginate Simple wrapper example
 * 
 * Note: This component is optional, you can use the PagingControl directly too.
 * 
 * This example gets the basics of the component running without any support for URL control or Redux state.
 * The Paginate component is a simple layer of abstraction around pagination to allow quicker development cycles
 * 
 * See other examples for: Redux, URL parameter based paging, param filters & Component overrides
 */


class SimplePaginateExample extends React.Component {
	constructor(props) {
		super(props)

		this.onPageSelect = this.onPageSelect.bind(this)

		// Helper method WithPaging allows simpler state setup
		// Can also use the WithUrlPaging helper to setup with URL params, see other examples
		this.state = WithPaging({
			loading: false,
			data: [],
			totalCount: 0, // Needed if you want the in-built paging control
		})
	}

	componentWillMount() {
		this.onPageSelect(1) // Need to get the initial data
	}

	onPageSelect(newPage) {
		// Create 20 items of fake data
		let newFakeData = []
		for(let f=0,fl=20; f<fl; f++) {
			newFakeData.push({
				id: f * newPage,
				title: 'page:' + newPage + ' item:' + f
			})
		}

		// set the loading state
		this.setState({ loading: true })

		// Fake network request with delay
		window.setTimeout(() => {
			this.setState({
				paging : { ...this.state.paging, page: newPage }, // Update current page, can also do this before the return
				data: newFakeData,
				totalCount: 1000, // returned by the server
				loading: false
			})
		}, 500)
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

export default SimplePaginateExample