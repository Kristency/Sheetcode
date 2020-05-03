import React from 'react'
import { connect } from 'react-redux'

import { SignIn, SignOut } from '../actions'

class GoogleAuth extends React.Component {
	componentDidMount() {
		window.gapi.load('client:auth2', () => {
			window.gapi.client
				.init({
					clientId: process.env.REACT_APP_GOOGLE_OAUTH_CLIENTID,
					scope: 'email'
				})
				.then(() => {
					this.auth = window.gapi.auth2.getAuthInstance()
					this.onAuthChange(this.auth.isSignedIn.get())
					this.auth.isSignedIn.listen(this.onAuthChange)
				})
		})
	}

	onAuthChange = (isSignedIn) => {
		if (isSignedIn) {
			this.props.SignIn(this.auth.currentUser.get().getBasicProfile().getEmail())
		} else {
			this.props.SignOut()
		}
	}

	onSignInClick = () => {
		this.auth.signIn()
	}

	onSignOutClick = () => {
		this.auth.signOut()
	}

	renderAuthButtons = () => {
		if (this.props.isSignedIn === null) {
			return null
		} else if (this.props.isSignedIn) {
			return (
				<button onClick={this.onSignOutClick} className="btn btn-danger">
					SignOut
				</button>
			)
		} else {
			return (
				<button onClick={this.onSignInClick} className="btn btn-danger">
					SignIn
				</button>
			)
		}
	}

	render() {
		return <div>{this.renderAuthButtons()}</div>
	}
}

const mapStateToProps = (state) => {
	return {
		isSignedIn: state.auth.isSignedIn
	}
}

export default connect(mapStateToProps, {
	SignIn,
	SignOut
})(GoogleAuth)
