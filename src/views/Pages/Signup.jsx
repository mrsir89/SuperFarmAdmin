import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Actions } from '../../actions/index';

// reactstrap components
import {
  Form,
  FormGroup,
  Input,
  Label,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  CardFooter,
  Row,
  Col,
  Button
} from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.jsx";

class ValidationForms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      register: {
        emailState: "",
        passwordState: "",
        confirmState: "",
        fullNameState: "",
        email: "",
        password: "",
        confirm: "",
        fullName: ""
      }
    };
  }
  registerEmail(e) {
    var register = this.state.register;
    register["email"] = e.target.value;
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(e.target.value)) {
      register["emailState"] = "has-success";
    } else {
      register["emailState"] = "has-danger";
    }
    this.setState({ register });
  }
  registerPassword(e) {
    var register = this.state.register;
    register["password"] = e.target.value;
    if (e.target.value.length > 0) {
      register["passwordState"] = "has-success";
    } else {
      register["passwordState"] = "has-danger";
    }
    if (register["password"] === register["confirm"]) {
      register["confirmState"] = "has-success";
    } else {
      register["confirmState"] = "has-danger";
    }
    this.setState({ register });
  }
  registerConfirm(e) {
    var register = this.state.register;
    register["confirm"] = e.target.value;
    if (register["password"] === register["confirm"]) {
      register["confirmState"] = "has-success";
    } else {
      register["confirmState"] = "has-danger";
    }
    this.setState({ register });
  }
  registerSubmit(e) {
    var register = this.state.register;
    if (register["emailState"] !== "has-success")
      register["emailState"] = "has-danger";
    if (register["passwordState"] !== "has-success")
      register["passwordState"] = "has-danger";
    if (register["confirmState"] !== "has-success")
      register["confirmState"] = "has-danger";
    this.setState({ register });
  }
 
  render() {
    return (
      <>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            <Col xs={12} md={6}>
              <Form>
                <Card>
                  <CardHeader>
                    <CardTitle tag="h4">Register Form</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <FormGroup
                      className={"has-label " + this.state.register.emailState}
                    >
                      <Label>Email Address *</Label>
                      <Input
                        type="email"
                        onChange={e => this.registerEmail(e)}
                      />
                    </FormGroup>
                    <FormGroup
                      className={
                        "has-label " + this.state.register.passwordState
                      }
                    >
                      <Label>Password *</Label>
                      <Input
                        type="password"
                        autoComplete="password"
                        onChange={e => this.registerPassword(e)}
                      />
                    </FormGroup>
                    <FormGroup
                      className={
                        "has-label " + this.state.register.confirmState
                      }
                    >
                      <Label>Confirm Password *</Label>
                      <Input
                        type="password"
                        autoComplete="password"
                        onChange={e => this.registerConfirm(e)}
                      />
                    </FormGroup>
                    <div className="category form-category">
                      * Required fields
                    </div>
                  </CardBody>
                  <CardFooter className="text-right">
                    <FormGroup check className="pull-left">
                      <Label check>
                        <Input type="checkbox" />
                        <span className="form-check-sign" />
                        Subscribe to newsletter
                      </Label>
                    </FormGroup>
                    <Button
                      color="primary"
                      onClick={e => this.registerSubmit(e)}
                    >
                      Register
                    </Button>
                  </CardFooter>
                </Card>
              </Form>
            </Col>

          </Row>
        </div>
      </>
    );
  }
}

export default ValidationForms;
