import React, { Component } from 'react'
import { connect } from 'react-redux'

import NewSolutionModal from './NewSolutionModal'
import EditQuestionDetailsModal from './EditQuestionDetailsModal'
import QuestionCard from './QuestionCard'
import Spinner from './Spinner'

import NoResults from './no_results.png'

const NO_RESULTS = 'NO_RESULTS'

class ResultsList extends Component {
	state = {
		newSolutionModalShow: false,
		editQuestionModalShow: false,
		currentlySelectedQuestionForSolution: null,
		currentlySelectedQuestionForEdit: null
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

	renderSearchResultsList() {
		if (this.props.filterOrSearchResults[0] === NO_RESULTS) {
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
					onClickingPlusButton={this.setCurrentlySelectedQuestionForSolution}
					onClickingEditButton={this.setCurrentlySelectedQuestionForEdit}
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
	let { filterOrSearchResults } = state
	return { filterOrSearchResults }
}

export default connect(mapStateToProps)(ResultsList)
