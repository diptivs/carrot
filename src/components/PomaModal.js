import React, { Component } from "react";
import { Modal } from "react-bootstrap";

export default class PomaModal extends Component {
	render() {
		return (
            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Text in a modal</h4>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
		);
	}
}