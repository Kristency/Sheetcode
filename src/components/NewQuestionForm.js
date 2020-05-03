import React, { Component, Fragment } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { addQuestion } from '../actions'
import { categories, difficulties } from '../form-options-data'
import './App.css'

class NewQuestionForm extends Component {
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

	renderDifficultyOptions() {
		return difficulties.map((difficulty) => {
			return <option value={difficulty}>{difficulty}</option>
		})
	}

	renderDifficultyDropDownSelect = ({ input, label, meta }) => {
		return (
			<div className="mt-4">
				<label>{label}</label>&nbsp;&nbsp;&nbsp;
				<select {...input} className="form-control">
					<option value="">Select</option>
					{this.renderDifficultyOptions()}
				</select>
				{this.renderError(meta)}
			</div>
		)
	}

	renderCategoryOptions() {
		return categories.map((category) => {
			return <option value={category}>{category}</option>
		})
	}

	renderCategoryDropDownSelect = ({ input, label, meta }) => {
		return (
			<div className="mt-4">
				<label>{label}</label>&nbsp;&nbsp;&nbsp;
				<select {...input} className="form-control">
					<option value="">Select</option>
					{this.renderCategoryOptions()}
				</select>
				{this.renderError(meta)}
			</div>
		)
	}

	onSubmit = (formValues) => {
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

const validate = (formValues) => {
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
	if (!formValues.solution_link) {
		errors.solution_link = 'Please enter a valid solution link.'
	}

	return errors
}

const formWrapped = reduxForm({
	form: 'newQuestionDetails',
	validate
})(NewQuestionForm)

export default connect(null, { addQuestion })(formWrapped)
