import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Router, Route, Switch } from 'react-router-dom'

import history from '../history'
import { fetchUsers } from '../actions'

import QuestionList from './QuestionList'
import ResultsList from './ResultsList'
import Header from './Header'

export class App extends Component {
	componentDidMount() {
		this.props.fetchUsers()
	}

	render() {
		return (
			<div className="container-fluid px-0">
				<Router history={history}>
					<Header />
					<div>
						<Switch>
							<Route path="/" exact component={QuestionList} />
							<Route path="/results" exact component={ResultsList} />
						</Switch>
					</div>
				</Router>
			</div>
		)
	}
}

export default connect(null, { fetchUsers })(App)
