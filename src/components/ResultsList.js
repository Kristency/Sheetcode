import React, { Component } from 'react'
import { connect } from 'react-redux'

import NewSolutionModal from './NewSolutionModal'
import QuestionCard from './QuestionCard'
import Spinner from './Spinner'

import NoResults from './no_results.png'

export class ResultsList extends Component {
	state = { modalShow: false, currentlySelectedQuestion: null }

	modalClose = () => {
		this.setState({ modalShow: false })
	}

	setCurrentlySelectedQuestion = (question) => {
		this.setState({ currentlySelectedQuestion: question, modalShow: true })
	}

	renderSearchResultsList() {
		if (this.props.filterOrSearchResults.length === 0) {
			return (
				<div className="row justify-content-center mx-0 mt-5 mt-md-0">
					<img src={NoResults} height="15%" width="55%" alt="no results" />
				</div>
			)
		} else {
			return this.props.filterOrSearchResults.map((question) => (
				<QuestionCard
					key={question._id}
					question={question}
					users={this.props.users}
					onClickingPlusButton={this.setCurrentlySelectedQuestion}
				/>
			))
		}
	}

	render() {
		if (this.props.filterOrSearchResults.length > 0) {
			return (
				<div>
					{this.renderSearchResultsList()}
					<NewSolutionModal
						show={this.state.modalShow}
						onHide={this.modalClose}
						question={this.state.currentlySelectedQuestion}
					/>
				</div>
			)
		} else {
			return <Spinner />
		}
	}
}

const mapStateToProps = (state) => {
	let { filterOrSearchResults, users } = state
	return { filterOrSearchResults, users }
}

export default connect(mapStateToProps)(ResultsList)
