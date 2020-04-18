import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'

import EditQuestionDetailsForm from './EditQuestionDetailsForm'

export class EditQuestionDetailsModal extends Component {
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
					<EditQuestionDetailsForm question={this.props.question} functionToCallAfterFormSubmitToCloseModal={this.props.onHide} />
				</Modal.Body>
			</Modal>
		)
	}
}

export default EditQuestionDetailsModal
