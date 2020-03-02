import React, { Component } from 'react'
import { Navbar, Nav, Button, FormControl, Form } from 'react-bootstrap'
import { FaAmazon, FaMarker } from 'react-icons/fa'

import NewQuestionModal from './NewQuestionModal'

export class Header extends Component {
	state = { modalShow: false }

	modalClose = () => {
		this.setState({ modalShow: false })
	}

	render() {
		return (
			<Navbar bg="dark" variant="dark" expand="lg" sticky="top">
				<Navbar.Brand>
					<FaAmazon className="align-baseline" />
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<Nav.Link onClick={() => this.setState({ modalShow: true })}>
							Add Question <FaMarker />
						</Nav.Link>
					</Nav>
					<Form inline>
						<FormControl type="text" placeholder="Search" className="mr-sm-2" />
						<Button variant="outline-success">Search</Button>
					</Form>
				</Navbar.Collapse>
				<NewQuestionModal show={this.state.modalShow} onHide={this.modalClose} />
			</Navbar>
		)
	}
}

export default Header
