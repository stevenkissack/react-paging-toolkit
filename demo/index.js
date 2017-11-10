import React from 'react'
import { render } from 'react-dom'
import SimplePaginateExample from './simple-paginate'
import UrlPaginateExample from './url-paginate'

class App extends React.Component {
	render() {
		return (
			<div>
				<h1>Simple paginate example (without URL hooks)</h1>
				<SimplePaginateExample/>
				<br/>
				<h1>URL controlled paging example</h1>
				<UrlPaginateExample/>
				<br/>
				<h1>Redux powered example</h1>
				TODO
			</div>
		)
	}
}

window.onload = () => {
	render(React.createElement(App), document.querySelector('#app'))
}