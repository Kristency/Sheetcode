import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Navbar, Nav, Button, FormControl, Form } from 'react-bootstrap'
import { FaCode, FaMarker, FaFilter } from 'react-icons/fa'

import NewQuestionModal from './NewQuestionModal'
import FilterQuestionsModal from './FilterQuestionsModal'
import { fetchSearchResults } from '../actions'
import history from '../history'

class Header extends Component {
	state = { term: '', newQuestionModalShow: false, filterQuestionModalShow: false }

	onInputChange = (event) => {
		this.setState({ term: event.target.value })
	}

	onFormSubmit = (event) => {
		event.preventDefault()
		// console.log(this.state.term)
		if (this.state.term) {
			this.props.fetchSearchResults(this.state.term)
		} else {
			history.push('/')
		}
	}

	newQuestionModalClose = () => {
		this.setState({ newQuestionModalShow: false })
	}

	filterQuestionModalClose = () => {
		this.setState({ filterQuestionModalShow: false })
	}

	render() {
		return (
			<Navbar bg="dark" variant="dark" expand="lg" sticky="top">
				<Navbar.Brand as={Link} to="/">
					<FaCode className="mb-1" /> Sheetcode
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<Nav.Link onClick={() => this.setState({ newQuestionModalShow: true })}>
							Add Question <FaMarker />
						</Nav.Link>
						<Nav.Link onClick={() => this.setState({ filterQuestionModalShow: true })}>
							Filter Questions <FaFilter />
						</Nav.Link>
					</Nav>
					<Form as="form" inline onSubmit={this.onFormSubmit}>
						<FormControl
							as="input"
							type="text"
							placeholder="Search"
							onChange={this.onInputChange}
							value={this.state.term}
							className="mr-sm-2"
						/>
						<Button type="submit" variant="outline-success" className="mt-2 mt-md-0">
							Search
						</Button>
					</Form>
				</Navbar.Collapse>
				<NewQuestionModal show={this.state.newQuestionModalShow} onHide={this.newQuestionModalClose} />
				<FilterQuestionsModal show={this.state.filterQuestionModalShow} onHide={this.filterQuestionModalClose} />
			</Navbar>
		)
	}
}

export default connect(null, { fetchSearchResults })(Header)
