import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'

import NewQuestionForm from './NewQuestionForm'

export class NewQuestionModal extends Component {
	render() {
		return (
			<Modal
				show={this.props.show}
				size="lg"
				onHide={this.props.onHide}
				scrollable
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Body>
					<NewQuestionForm functionToCallAfterFormSubmitToCloseModal={this.props.onHide} />
				</Modal.Body>
			</Modal>
		)
	}
}

export default NewQuestionModal
