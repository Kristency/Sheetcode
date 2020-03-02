import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Badge, Button } from 'react-bootstrap'
import { FaRegStar } from 'react-icons/fa'

import { fetchQuestions } from '../actions'
import NewSolutionModal from './NewSolutionModal'

const difficultyColor = {
	Easy: 'success',
	Medium: 'warning',
	Hard: 'danger'
}

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

	renderQuestionsList() {
		return this.props.questions.map(question => {
			return (
				<div>
					<Card body key={question.row}>
						<div className="row">
							<div className="col-md-4">
								<a href={question.link} target="_blank" rel="noopener noreferrer">
									<h2 className="d-inline">{question.name}</h2>
								</a>
								<h3 className="d-inline ml-3 align-top">
									<FaRegStar />
								</h3>
							</div>
							<div className="col-md-3">
								<h2 className="d-inline">
									<Badge className="ml-3" variant={difficultyColor[question.difficulty]}>
										{question.difficulty}
									</Badge>
									<Badge className="ml-3" variant="secondary">
										{question.category}
									</Badge>
								</h2>
							</div>
							<div className="col-md-5">
								<h5 className="d-inline">
									{question.solutions.map(solution => {
										return (
											<Badge
												key={solution.user_column}
												as="a"
												href={solution.link}
												target="_blank"
												rel="noopener noreferrer"
												pill
												className="ml-3"
												variant="info"
											>
												{this.props.users[solution.user_column].name}
											</Badge>
										)
									})}
									<Badge
										as={Button}
										onClick={() => this.setState({ modalShow: true, currentlySelectedQuestion: question })}
										pill
										className="ml-3"
										variant="primary"
									>
										+
									</Badge>
								</h5>
							</div>
						</div>
					</Card>
				</div>
			)
		})
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
	return { questions: Object.values(state.questions), users: state.users }
}

export default connect(mapStateToProps, { fetchQuestions })(QuestionList)
