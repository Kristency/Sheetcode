import React, { Component } from 'react'
import { connect } from 'react-redux'

import NewSolutionModal from './NewSolutionModal'
import QuestionCard from './QuestionCard'

export class ResultsList extends Component {
	state = { modalShow: false, currentlySelectedQuestion: null }

	modalClose = () => {
		this.setState({ modalShow: false })
	}

	setCurrentlySelectedQuestion = question => {
		this.setState({ currentlySelectedQuestion: question, modalShow: true })
	}

	renderSearchResultsList() {
		return this.props.filterOrSearchResults.map(question => (
			<QuestionCard
				key={question._id}
				question={question}
				users={this.props.users}
				onClickingPlusButton={this.setCurrentlySelectedQuestion}
			/>
		))
	}

	render() {
		return (
			<div>
				{this.renderSearchResultsList()}
				<NewSolutionModal show={this.state.modalShow} onHide={this.modalClose} question={this.state.currentlySelectedQuestion} />
			</div>
		)
	}
}

const mapStateToProps = state => {
	let { filterOrSearchResults, users } = state
	return { filterOrSearchResults, users }
}

export default connect(mapStateToProps)(ResultsList)
