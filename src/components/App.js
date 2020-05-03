import React, { Component } from 'react'
import { Router, Route, Switch } from 'react-router-dom'

import history from '../history'

import QuestionList from './QuestionList'
import ResultsList from './ResultsList'
import Header from './Header'
import Error from './Error'

class App extends Component {
	render() {
		return (
			<div className="container-fluid px-0">
				<Router history={history}>
					<Header />
					<div>
						<Switch>
							<Route path="/" exact component={QuestionList} />
							<Route path="/results" exact component={ResultsList} />
							<Route path="/error" exact component={Error} />
						</Switch>
					</div>
				</Router>
			</div>
		)
	}
}

export default App
