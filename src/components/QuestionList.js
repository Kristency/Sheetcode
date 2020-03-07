import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchQuestions } from '../actions'
import NewSolutionModal from './NewSolutionModal'
import QuestionCard from './QuestionCard'

export class QuestionList extends Component {
	state = { modalShow: false, currentlySelectedQuestion: null }

	componentDidMount() {
		if (this.props.questions.length === 0) {
			this.props.fetchQuestions()
		}
	}

	modalClose = () => {
		this.setState({ modalShow: false })
	}

	setCurrentlySelectedQuestion = question => {
		this.setState({ currentlySelectedQuestion: question, modalShow: true })
	}

	renderQuestionsList() {
		return this.props.questions.map(question => (
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
				{this.renderQuestionsList()}
				<NewSolutionModal show={this.state.modalShow} onHide={this.modalClose} question={this.state.currentlySelectedQuestion} />
			</div>
		)
	}
}

const mapStateToProps = state => {
	return { questions: Object.values(state.questions).sort((a, b) => b._id - a._id), users: state.users }
}

export default connect(mapStateToProps, { fetchQuestions })(QuestionList)
