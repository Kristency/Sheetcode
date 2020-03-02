import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Router } from 'react-router-dom'

import history from '../history'
import { fetchUsers } from '../actions'

import QuestionList from './QuestionList'
import Header from './Header'

export class App extends Component {
	componentDidMount() {
		if (this.props.users.length === 0) {
			this.props.fetchUsers()
		}
	}

	render() {
		return (
			<div className="container-fluid px-0">
				<Router history={history}>
					<div>
						<Header />
						<QuestionList />
					</div>
				</Router>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return { users: Object.values(state.users) }
}

export default connect(mapStateToProps, { fetchUsers })(App)
