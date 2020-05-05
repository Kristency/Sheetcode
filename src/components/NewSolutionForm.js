import React, { Component, Fragment } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { addSolution } from '../actions'

class NewSolutionForm extends Component {
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

	onSubmit = (formValues) => {
		formValues['_id'] = this.props.question._id
		this.props.addSolution(formValues)
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
								<div className="form-group col-md-6 m-auto">
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

	if (!formValues.solution_link) {
		errors.solution_link = 'Please enter a valid solution link.'
	}

	return errors
}

const formWrapped = reduxForm({
	form: 'newSolutionDetails',
	validate
})(NewSolutionForm)

export default connect(null, { addSolution })(formWrapped)
