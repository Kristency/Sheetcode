import React, { Component, Fragment } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { addSolution } from '../actions'
import './App.css'

export class NewSolutionForm extends Component {
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
		this.props.addSolution({ ...formValues, _id: this.props.question._id })
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
	form: 'newSolutionDetails',
	validate
})(NewSolutionForm)

export default connect(mapStateToProps, { addSolution })(formWrapped)
