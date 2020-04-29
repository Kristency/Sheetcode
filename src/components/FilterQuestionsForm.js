import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { fetchFilterResults } from '../actions'
import { categories, difficulties } from '../form-options-data'
import './App.css'

class FilterQuestionsForm extends Component {
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
					<option value="All">All</option>
					{this.renderCategoryOptions()}
				</select>
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
					<option value="All">All</option>
					{this.renderDifficultyOptions()}
				</select>
			</div>
		)
	}

	onSubmit = (formValues) => {
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

const formWrapped = reduxForm({
	form: 'filterDetails',
})(FilterQuestionsForm)

export default connect(null, { fetchFilterResults })(formWrapped)
