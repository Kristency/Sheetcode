import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Badge, Button } from 'react-bootstrap'
import { FaRegEdit } from 'react-icons/fa'

const difficultyColor = {
	Easy: 'success',
	Medium: 'warning',
	Hard: 'danger'
}

class QuestionCard extends Component {
	renderQuestionEditButton() {
		let { question, onClickingEditButton } = this.props
		if (this.props.isSignedIn) {
			return (
				<h5 className="d-inline ml-1 ml-md-3 align-top">
					<FaRegEdit className="pointer" onClick={() => onClickingEditButton(question)} />
				</h5>
			)
		} else {
			return null
		}
	}

	renderSolutionAddButton() {
		let { question, onClickingPlusButton } = this.props
		if (this.props.isSignedIn) {
			return (
				<Badge as={Button} onClick={() => onClickingPlusButton(question)} pill className="ml-1 ml-md-3" variant="primary">
					+
				</Badge>
			)
		} else {
			return null
		}
	}

	render() {
		let { question } = this.props

		return (
			<Card body>
				<div className="row">
					<div className="col-md-4">
						<a href={question.link} target="_blank" rel="noopener noreferrer">
							<h5 className="d-inline">{question.name}</h5>
						</a>
						{this.renderQuestionEditButton()}
					</div>
					<div className="col-md-3">
						<h5 className="d-inline">
							<Badge className="ml-md-5" variant={difficultyColor[question.difficulty]}>
								{question.difficulty}
							</Badge>
							<Badge className="ml-1 ml-md-3" variant="secondary">
								{question.category}
							</Badge>
						</h5>
					</div>
					<div className="col-md-5">
						<h5 className="d-inline">
							{question.solutions.map((solution) => {
								return (
									<Badge
										key={solution.user_column}
										as="a"
										href={solution.link}
										target="_blank"
										rel="noopener noreferrer"
										pill
										className="ml-md-3"
										variant="info"
									>
										{solution.user_name}
									</Badge>
								)
							})}
							{this.renderSolutionAddButton()}
						</h5>
					</div>
				</div>
			</Card>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		isSignedIn: state.auth.isSignedIn
	}
}

export default connect(mapStateToProps)(QuestionCard)
