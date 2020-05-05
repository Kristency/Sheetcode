import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'
import Dropdown from 'react-bootstrap/Dropdown'
import InputGroup from 'react-bootstrap/InputGroup'

import { FaCode, FaMarker, FaFilter, FaSearch, FaUserCog } from 'react-icons/fa'

import GoogleAuth from './GoogleAuth'
import DarkModeButton from './DarkModeButton'
import NewQuestionModal from './NewQuestionModal'
import FilterQuestionsModal from './FilterQuestionsModal'
import { fetchSearchResults } from '../actions'
import history from '../history'

class Header extends Component {
	state = { term: '', newQuestionModalShow: false, filterQuestionModalShow: false }

	componentDidMount() {
		const presentTheme = localStorage.getItem('theme')
		if (presentTheme && presentTheme === 'dark') {
			document.body.classList.add('bootstrap-dark')
		}
	}

	onSearchInputChange = (event) => {
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

	renderQuestionAddButton() {
		if (this.props.isSignedIn) {
			return (
				<Nav.Link onClick={() => this.setState({ newQuestionModalShow: true })}>
					Add Question <FaMarker />
				</Nav.Link>
			)
		} else {
			return null
		}
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
						{this.renderQuestionAddButton()}
						<Nav.Link onClick={() => this.setState({ filterQuestionModalShow: true })}>
							Filter Questions <FaFilter />
						</Nav.Link>
					</Nav>

					<Form as="form" inline onSubmit={this.onFormSubmit} className="mb-2 mb-md-0 mr-md-2">
						<InputGroup className="mr-sm-2">
							<FormControl
								as="input"
								type="text"
								placeholder="Search"
								onChange={this.onSearchInputChange}
								value={this.state.term}
							/>
							<InputGroup.Append>
								<Button type="submit" variant="outline-secondary" className="px-3">
									<FaSearch />
								</Button>
							</InputGroup.Append>
						</InputGroup>
					</Form>
				</Navbar.Collapse>
				<Dropdown alignRight>
					<Dropdown.Toggle as={Button} variant="success" id="dropdown-basic">
						{this.props.name} &nbsp;
						<FaUserCog />
					</Dropdown.Toggle>
					<Dropdown.Menu>
						<Dropdown.Item as="button">
							<GoogleAuth />
						</Dropdown.Item>
						<Dropdown.Item as={DarkModeButton} />
					</Dropdown.Menu>
				</Dropdown>

				{/* This component is always hidden from view, just there to initialize auth status on mount */}
				<div className="d-none">
					<GoogleAuth />
				</div>
				<NewQuestionModal show={this.state.newQuestionModalShow} onHide={this.newQuestionModalClose} />
				<FilterQuestionsModal show={this.state.filterQuestionModalShow} onHide={this.filterQuestionModalClose} />
			</Navbar>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		isSignedIn: state.auth.isSignedIn,
		name: state.auth.name
	}
}

export default connect(mapStateToProps, { fetchSearchResults })(Header)
