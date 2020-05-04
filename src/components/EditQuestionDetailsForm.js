import React, { Component, Fragment } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { updateQuestionDetails } from '../actions'

class EditQuestionDetailsForm extends Component {
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

	renderTextArea = ({ input, label, meta }) => {
		const className = `form-control ${meta.error && meta.touched ? 'border-danger' : ''}`
		return (
			<div className="mt-4">
				<label>{label}</label>
				<textarea {...input} className={className} />
				{this.renderError(meta)}
			</div>
		)
	}

	onSubmit = (formValues) => {
		this.props.updateQuestionDetails({ ...formValues, _id: this.props.question._id })
		this.props.functionToCallAfterFormSubmitToCloseModal()
	}

	render() {
		return (
			<Fragment>
				<p className="text-center mt-4">
					<h3>
						<strong>{this.props.question ? this.props.question.name : null}</strong>
					</h3>
				</p>
				<div className="row justify-content-center mt-3 mx-0">
					<div className="col-12 col-md-10">
						<form onSubmit={this.props.handleSubmit(this.onSubmit)} autoComplete="off">
							<div className="form-row">
								<div className="form-group col-md-12">
									<Field name="name" component={this.renderInput} label="Enter problem name" type="text" />
								</div>
							</div>
							<div className="form-row">
								<div className="form-group col-md-12">
									<Field name="problem_link" component={this.renderTextArea} label="Enter problem link" type="text" />
								</div>
							</div>
							<div className="form-row">
								<button type="submit" className="btn btn-outline-dark btn-lg my-4 px-5 responsive-width">
									Save
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

	return errors
}

const mapStateToProps = (state, ownProps) => {
	let { name, link: problem_link } = ownProps.question
	return {
		initialValues: { name, problem_link }
		// very special prop, used by redux-form to set initial values of the fields
	}
}

const formWrapped = reduxForm({
	form: 'editQuestionDetails',
	validate,
	enableReinitialize: true
})(EditQuestionDetailsForm)

export default connect(mapStateToProps, { updateQuestionDetails })(formWrapped)
