import React, { component, Component } from "react";
import axios from "axios";
import { Modal, Button, Form, Col } from "react-bootstrap";

export default class Instructions extends Component {
  constructor(props) {
    super(props);
    this.onInstructionActiveChange = this.onInstructionActiveChange.bind(this);
    this.onInstructionChange = this.onInstructionChange.bind(this);
    this.state = {
      instructionId: 0,
      instructionIsActive: false,
      instruction: "",
    };
  }

  onInstructionActiveChange(e) {
    this.setState({
      instructionIsActive: e.target.checked,
    });
  }
  onInstructionChange(e) {
    this.setState({
      instruction: e.target.value,
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const obj = {
      tbl_instructions_id: this.state.instructionId,
      tbl_instructions_msg: this.state.instruction,
      tbl_instructions_is_active: this.state.instructionIsActive,
      tbl_instructions_is_delete: 0,
    };
    axios
      .post("http://localhost:4500/humbrat/instructions", obj)
      .then((res) => {
        console.log("Successfully Inserted/Updated");
        this.props.history.push("/adminPortal");
      })
      .catch(function (error) {
        console.log("Error : " + error);
      });
  };
  render() {
    return (
      <div>
        <h2>सूचना</h2>
        <Form onSubmit={this.onSubmit}>
          <Form.Row>
            <Form.Group as={Col} controlId="formInstructionIsActive">
              <Form.Check
                type="checkbox"
                label="सक्रिय आहे"
                checked={this.state.instructionIsActive}
                onChange={this.onInstructionActiveChange}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGroupInstruction">
              <Form.Label>सूचना</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                value={this.state.instruction}
                onChange={this.onInstructionChange}
              />
            </Form.Group>
          </Form.Row>
          <Button variant="primary" value="Edit news" type="submit">
            जतन करा
          </Button>
        </Form>
      </div>
    );
  }
}
