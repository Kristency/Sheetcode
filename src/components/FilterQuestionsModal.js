import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'

import FilterQuestionsForm from './FilterQuestionsForm'

class FilterQuestionsModal extends Component {
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
					<FilterQuestionsForm functionToCallAfterFormSubmitToCloseModal={this.props.onHide} />
				</Modal.Body>
			</Modal>
		)
	}
}

export default FilterQuestionsModal
