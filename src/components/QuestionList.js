import React, { Component } from 'react'
import { connect } from 'react-redux'

import Button from 'react-bootstrap/Button'

import { fetchQuestions } from '../actions'
import NewSolutionModal from './NewSolutionModal'
import EditQuestionDetailsModal from './EditQuestionDetailsModal'
import QuestionCard from './QuestionCard'
import Spinner from './Spinner'

class QuestionList extends Component {
	state = {
		newSolutionModalShow: false,
		editQuestionModalShow: false,
		currentlySelectedQuestionForSolution: null,
		currentlySelectedQuestionForEdit: null
	}

	componentDidMount() {
		if (this.props.questions.length === 0) {
			this.props.fetchQuestions()
		}
	}

	newSolutionModalClose = () => {
		this.setState({ newSolutionModalShow: false })
	}

	editQuestionModalClose = () => {
		this.setState({ editQuestionModalShow: false })
	}

	setCurrentlySelectedQuestionForSolution = (question) => {
		this.setState({ currentlySelectedQuestionForSolution: question, newSolutionModalShow: true })
	}

	setCurrentlySelectedQuestionForEdit = (question) => {
		this.setState({ currentlySelectedQuestionForEdit: question, editQuestionModalShow: true })
	}

	renderQuestionsList() {
		return this.props.questions.map((question) => (
			<QuestionCard
				key={question._id}
				question={question}
				onClickingPlusButton={this.setCurrentlySelectedQuestionForSolution}
				onClickingEditButton={this.setCurrentlySelectedQuestionForEdit}
			/>
		))
	}

	renderLoadMoreButton() {
		if (this.props.questions.length === 0) {
			return null
		} else {
			return (
				<div className="row justify-content-center mx-0">
					<Button onClick={this.props.fetchQuestions} className="my-4 justify-content-center" variant="outline-dark" size="lg">
						Load More
					</Button>
				</div>
			)
		}
	}

	render() {
		if (this.props.questions.length > 0) {
			return (
				<div>
					{this.renderQuestionsList()}
					{this.renderLoadMoreButton()}
					<NewSolutionModal
						show={this.state.newSolutionModalShow}
						onHide={this.newSolutionModalClose}
						question={this.state.currentlySelectedQuestionForSolution}
					/>
					<EditQuestionDetailsModal
						show={this.state.editQuestionModalShow}
						onHide={this.editQuestionModalClose}
						question={this.state.currentlySelectedQuestionForEdit}
					/>
				</div>
			)
		} else {
			return <Spinner />
		}
	}
}

const mapStateToProps = (state) => {
	return { questions: Object.values(state.questions).sort((a, b) => b._id - a._id) }
}

export default connect(mapStateToProps, { fetchQuestions })(QuestionList)
