import React, { Component } from 'react'
import { Card, Badge, Button } from 'react-bootstrap'
import { FaRegStar } from 'react-icons/fa'

const difficultyColor = {
	Easy: 'success',
	Medium: 'warning',
	Hard: 'danger'
}

export class QuestionCard extends Component {
	renderUser(user_column) {
		if (user_column in this.props.users) {
			return this.props.users[user_column].name
		} else {
			return null
		}
	}

	render() {
		let { question, onClickingPlusButton } = this.props

		return (
			<Card body>
				<div className="row">
					<div className="col-md-4">
						<a href={question.link} target="_blank" rel="noopener noreferrer">
							<h5 className="d-inline">{question.name}</h5>
						</a>
						<h5 className="d-inline ml-1 ml-md-3 align-top">
							<FaRegStar />
						</h5>
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
							{question.solutions.map(solution => {
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
										{this.renderUser(solution.user_column)}
									</Badge>
								)
							})}
							<Badge
								as={Button}
								onClick={() => onClickingPlusButton(question)}
								pill
								className="ml-1 ml-md-3"
								variant="primary"
							>
								+
							</Badge>
						</h5>
					</div>
				</div>
			</Card>
		)
	}
}

export default QuestionCard
