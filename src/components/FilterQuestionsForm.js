import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { fetchFilterResults } from '../actions'
import { categories, difficulties } from '../form-options-data'

class FilterQuestionsForm extends Component {
	renderCheckBox = ({ input, label, type, meta }) => {
		return (
			<div className="custom-control custom-checkbox">
				<input {...input} type={type} className="custom-control-input" id="customCheck1" />
				<label className="custom-control-label" htmlFor="customCheck1">
					{label}
				</label>
			</div>
		)
	}

	renderAuthCheckBox() {
		if (this.props.isSignedIn) {
			return (
				<div className="form-group col-md-6">
					<Field name="unsolved_questions" component={this.renderCheckBox} label="Show unsolved questions only" type="checkbox" />
				</div>
			)
		} else {
			return null
		}
	}

	renderCategoryOptions() {
		return categories.map((category) => {
			return (
				<option value={category} key={category}>
					{category}
				</option>
			)
		})
	}

	renderCategoryDropDownSelect = ({ input, label, meta }) => {
		return (
			<div className="mt-4">
				<label>{label}</label>&nbsp;&nbsp;&nbsp;
				<select {...input} className="form-control">
					<option value="All">All</option>
					{this.renderCategoryOptions()}
				</select>
			</div>
		)
	}

	renderDifficultyOptions() {
		return difficulties.map((difficulty) => {
			return (
				<option value={difficulty} key={difficulty}>
					{difficulty}
				</option>
			)
		})
	}

	renderDifficultyDropDownSelect = ({ input, label, meta }) => {
		return (
			<div className="mt-4">
				<label>{label}</label>&nbsp;&nbsp;&nbsp;
				<select {...input} className="form-control">
					<option value="All">All</option>
					{this.renderDifficultyOptions()}
				</select>
			</div>
		)
	}

	onSubmit = (formValues) => {
		if (this.props.isSignedIn) {
			formValues['user_column'] = this.props.user_column
		}
		this.props.fetchFilterResults(formValues)
		this.props.functionToCallAfterFormSubmitToCloseModal()
	}

	render() {
		return (
			<div className="row justify-content-center mt-3 mx-0">
				<div className="col-12 col-md-10">
					<form onSubmit={this.props.handleSubmit(this.onSubmit)} autoComplete="off">
						<div className="form-row">
							<div className="form-group col-md-6">
								<Field name="category" label="Select Category" component={this.renderCategoryDropDownSelect}></Field>
							</div>
							<div className="form-group col-md-6">
								<Field name="difficulty" label="Select Difficulty" component={this.renderDifficultyDropDownSelect}></Field>
							</div>
							{this.renderAuthCheckBox()}
							<button type="submit" className="btn btn-outline-dark btn-lg my-4 px-5 responsive-width">
								Apply
							</button>
						</div>
					</form>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		isSignedIn: state.auth.isSignedIn,
		user_column: state.auth._id
	}
}

const formWrapped = reduxForm({
	form: 'filterDetails'
})(FilterQuestionsForm)

export default connect(mapStateToProps, { fetchFilterResults })(formWrapped)
