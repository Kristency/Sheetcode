import React, { Component, Fragment } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { addQuestion } from '../actions'
import './App.css'

export class NewQuestionForm extends Component {
	renderError({ touched, error }) {
		if (touched && error) {
			return <small className="form-text text-danger">{error}</small>
		}
	}

	renderInput = ({ input, label, type, meta }) => {
		const className = `form-control ${meta.error && meta.touched ? 'border-danger' : ''}`
		return (
			<div className="mt-4">
				<label>{label}</label>
				<input {...input} className={className} type={type} />
				{this.renderError(meta)}
			</div>
		)
	}

	renderUserSelectOptions = user => (
		<option key={user._id} value={user._id}>
			{user.name}
		</option>
	)

	renderDifficultyDropDownSelect = ({ input, label, meta }) => {
		return (
			<div className="mt-4">
				<label>{label}</label>&nbsp;&nbsp;&nbsp;
				<select {...input} className="form-control">
					<option value="">Select</option>
					<option value="Easy">Easy</option>
					<option value="Medium">Medium</option>
					<option value="Hard">Hard</option>
				</select>
				{this.renderError(meta)}
			</div>
		)
	}

	renderCategoryDropDownSelect = ({ input, label, meta }) => {
		return (
			<div className="mt-4">
				<label>{label}</label>&nbsp;&nbsp;&nbsp;
				<select {...input} className="form-control">
					<option value="">Select</option>
					<option value="Array">Array</option>
					<option value="DP">DP</option>
					<option value="String">String</option>
					<option value="Hash Map">Hash Map</option>
					<option value="Greedy">Greedy</option>
					<option value="Bit Manipulation">Bit Manipulation</option>
					<option value="Math">Math</option>
					<option value="Search">Search</option>
					<option value="Linked List">Linked List</option>
					<option value="Stack">Stack</option>
					<option value="Graph">Graph</option>
					<option value="Recursion">Recursion</option>
					<option value="Binary Tree">Binary Tree</option>
					<option value="Heap">Heap</option>
					<option value="Binary Search">Binary Search</option>
					<option value="Trees">Trees</option>
					<option value="Sorting">Sorting</option>
					<option value="Miscellaneous">Miscellaneous</option>
				</select>
				{this.renderError(meta)}
			</div>
		)
	}

	renderUserDropDownSelect = ({ input, label, meta }) => {
		return (
			<div className="mt-4">
				<label>{label}</label>&nbsp;&nbsp;&nbsp;
				<select {...input} className="form-control">
					<option value="">Select</option>
					{this.props.users.map(this.renderUserSelectOptions)}
				</select>
				{this.renderError(meta)}
			</div>
		)
	}

	onSubmit = formValues => {
		this.props.addQuestion(formValues)
		this.props.functionToCallAfterFormSubmitToCloseModal()
	}

	render() {
		return (
			<Fragment>
				<p className="text-center mt-4 display-4">
					<strong>New Question</strong>
				</p>
				<div className="row justify-content-center mt-4 mx-0">
					<div className="col-12 col-md-10">
						<form onSubmit={this.props.handleSubmit(this.onSubmit)} autoComplete="off">
							<div className="form-row">
								<div className="form-group col-md-6">
									<Field name="name" component={this.renderInput} label="Enter problem name" type="text" />
								</div>
								<div className="form-group col-md-6">
									<Field name="problem_link" component={this.renderInput} label="Enter problem link" type="text" />
								</div>
								<div className="form-group col-md-6">
									<Field
										name="difficulty"
										label="Select Difficulty"
										component={this.renderDifficultyDropDownSelect}
									></Field>
								</div>
								<div className="form-group col-md-6">
									<Field name="category" label="Select Category" component={this.renderCategoryDropDownSelect}></Field>
								</div>
								<div className="form-group col-md-6">
									<Field name="user_column" label="Select User" component={this.renderUserDropDownSelect}></Field>
								</div>
								<div className="form-group col-md-6">
									<Field name="solution_link" component={this.renderInput} label="Enter solution link" type="text" />
								</div>
								<button type="submit" className="btn btn-outline-dark btn-lg my-4 px-5 responsive-width">
									Submit
								</button>
							</div>
						</form>
					</div>
				</div>
			</Fragment>
		)
	}
}

const validate = formValues => {
	const errors = {}

	if (!formValues.name) {
		errors.name = 'Please enter a valid problem name.'
	}
	if (!formValues.problem_link) {
		errors.problem_link = 'Please enter a valid problem link.'
	}
	if (!formValues.difficulty) {
		errors.difficulty = 'Please select a difficulty level.'
	}
	if (!formValues.category) {
		errors.category = 'Please select a category.'
	}
	if (!formValues.user_column) {
		errors.user_column = 'Please select a user.'
	}
	if (!formValues.solution_link) {
		errors.solution_link = 'Please enter a valid solution link.'
	}

	return errors
}

const mapStateToProps = state => {
	return {
		users: Object.values(state.users)
	}
}

const formWrapped = reduxForm({
	form: 'newQuestionDetails',
	validate
})(NewQuestionForm)

export default connect(mapStateToProps, { addQuestion })(formWrapped)
