import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { fetchFilterResults } from '../actions'
import './App.css'

export class FilterQuestionsForm extends Component {
	renderCategoryDropDownSelect = ({ input, label, meta }) => {
		return (
			<div className="mt-4">
				<label>{label}</label>&nbsp;&nbsp;&nbsp;
				<select {...input} className="form-control">
					<option value="All">All</option>
					<option value="Array">Array</option>
					<option value="DP">DP</option>
					<option value="String">String</option>
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
			</div>
		)
	}

	renderDifficultyDropDownSelect = ({ input, label, meta }) => {
		return (
			<div className="mt-4">
				<label>{label}</label>&nbsp;&nbsp;&nbsp;
				<select {...input} className="form-control">
					<option value="All">All</option>
					<option value="Easy">Easy</option>
					<option value="Medium">Medium</option>
					<option value="Hard">Hard</option>
				</select>
			</div>
		)
	}

	onSubmit = formValues => {
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
	form: 'filterDetails'
})(FilterQuestionsForm)

export default connect(null, { fetchFilterResults })(formWrapped)
