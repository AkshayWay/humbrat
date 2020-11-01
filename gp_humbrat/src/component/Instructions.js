import React, { component, Component } from "react";
import axios from "axios";
import { Modal, Button, Form, Col } from "react-bootstrap";
import { store } from "react-notifications-component";

export default class Instructions extends Component {
  constructor(props) {
    super();
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
  componentDidMount() {
    if (this.props.match.params.id != 0) {
      axios
        .get(
          "http://localhost:4500/humbrat/instructions/" +
            this.props.match.params.id
        )
        .then((response) => {
          this.setState({
            instructionId: response.data[0].tbl_instructions_id,
            instruction: response.data[0].tbl_instructions_msg,
            instructionIsActive: response.data[0].tbl_instructions_is_active,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      this.setState({
        datesDisplay: "none",
      });
    }
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
        store.addNotification({
          title: "सूचना",
          message: "सूचना जतन करण्यात आले आहे",
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 4000,
            onScreen: true,
            showIcon: true,
          },
          width: 600,
        });
        setTimeout(function () {
          window.location.reload();
        }, 5000);

        //this.props.history.push("/adminPortal");
      })
      .catch(function (error) {
        console.log("Error : " + error);
      });
  };
  render() {
    return (
      <div style={{ minHeight: "calc(100vh - 70px)" }}>
        <h2 style={{ margin: "20px" }}>सूचना</h2>
        <hr
          style={{
            height: "10px",
            borderWidth: "0",
            boxShadow: " 0 10px 10px -10px #8c8c8c inset",
            backgroundImage:
              "linear-gradient(to right, rgba(0, 0, 0, 0), rgba(60, 179, 113), rgba(0, 0, 0, 0))",
          }}
        ></hr>
        <Form
          onSubmit={this.onSubmit}
          style={{ width: "60%", margin: "0 auto" }}
        >
          <Form.Row>
            <Form.Group as={Col} controlId="formInstructionIsActive">
              <Form.Label>सक्रिय आहे</Form.Label>
              <Form.Check
                type="checkbox"
                //label="सक्रिय आहे"
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
          <div className="text-center">
            <Button variant="primary" value="Edit news" type="submit">
              जतन करा
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}
