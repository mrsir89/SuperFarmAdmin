/*!
=========================================================
* Now UI Dashboard PRO React - v1.3.0
=========================================================
* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React from "react";
import { Actions } from '../../actions/index';
import { ActionTypes } from '../../contants';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// reactstrap components
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Form,
  Container,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Button
} from "reactstrap";

// core components
import nowLogo from "assets/img/now-logo.png";

import bgImage from "assets/img/bg14.jpg";

const loginAsync = (customerId, password, history) => (dispatch) => {
  console.log('loginAsynce 시작 ', customerId, password)
  return dispatch(Actions.login(customerId, password))
    .then(response => {
      
      if (response === undefined || response === null) {
        alert(' 아이디 또는 비밀 번호가 잘못 되었습니다.')
      
        return history.push("/login")
      
      } else {
        if (response.type === ActionTypes.LOGIN_SUCCESS) {
      
          return dispatch(Actions.getUserMe())
      
        } else {
      
          return alert('아이디 또는 비밀 번호가 잘못 되었습니다.');
      
        }
      }
    }).then(response => {
      if (response.type === ActionTypes.GET_USERME_SUCCESS) {
        alert(`${customerId} 님 접속을 환영 합니다.`)
        return history.push("/")
      
      } else {
        alert('회원 정보를 가져 오는데 실패 하였습니다. \n\n다시 시도해 주세요');
        return dispatch(Actions.logout())
      
      }
    }).catch(error => {
      return console.log(' login Error', error)
    });
}


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id:'',
      password:''
    };
  }

  componentDidMount() {
    document.body.classList.add("login-page");
  }

  componentWillUnmount() {
    document.body.classList.remove("login-page");
  }

  _loginStart=()=>{
    const { login } = this.props
    const { history } = this.props;
    let id = this.state.id;
    let password = this.state.password
    login(id,password,history);
  }

  _idChange(event){
    console.log(event.target,'idCange')
    console.log(event.target.value)
    this.setState({
      id : event.target.value
    })
  }
  _passwordChange(event){
    console.log(event.target,'passwordChange')
    console.log(event.target.value)
    this.setState({
      password : event.target.value
    })
    console.log(this.state,'this.State 확인 ')
  }
  render() {
    return (
      <>
       {/* 8/27 Auth.jsx 내용 복사 */}
        <div className="wrapper wrapper-full-page" ref="fullPages">
          <div
            className="full-page section-image"
            filter-color={this.state.filterColor}
          >
            <div className="content">
              <div className="login-page">
                <Container>
                  <Col xs={12} md={8} lg={4} className="ml-auto mr-auto">
                    <Form>
                      <Card className="card-login card-plain">
                        <CardHeader>
                          <div className="logo-container">
                            <img src={nowLogo} alt="now-logo" />
                          </div>
                        </CardHeader>
                        <CardBody>
                          <InputGroup
                            className={
                              "no-border form-control-lg " +
                              (this.state.firstnameFocus ? "input-group-focus" : "")
                            }
                          >
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="now-ui-icons users_circle-08" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              type="text"
                              placeholder="아이디를 입력하세요"
                              onFocus={e => this.setState({ firstnameFocus: true })}
                              onBlur={e => this.setState({ firstnameFocus: false })}
                              onChange={this._idChange.bind(this)}
                            />
                          </InputGroup>
                          <InputGroup
                            className={
                              "no-border form-control-lg " +
                              (this.state.lastnameFocus ? "input-group-focus" : "")
                            }
                          >
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="now-ui-icons text_caps-small" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              type="password"
                              placeholder="패스워드를 입력하세요"
                              onFocus={e => this.setState({ lastnameFocus: true })}
                              onBlur={e => this.setState({ lastnameFocus: false })}
                              onChange={this._passwordChange.bind(this)}
                            />
                          </InputGroup>
                        </CardBody>
                        <CardFooter>
                          <Button
                            block
                            color="primary"
                            size="lg"
                            href="#pablo"
                            className="mb-3 btn-round"
                           onClick={this._loginStart}>
                            Get Started
                      </Button>
                          <div className="pull-left">
                            <h6>
                              <a href="#pablo" className="link footer-link">
                                Create Account
                          </a>
                            </h6>
                          </div>
                          <div className="pull-right">
                            <h6>
                              <a href="#pablo" className="link footer-link">
                                Need Help?
                          </a>
                            </h6>
                          </div>
                        </CardFooter>
                      </Card>
                    </Form>
                  </Col>
                </Container>
              </div>
            </div>
            <div
              className="full-page-background"
              style={{ backgroundImage: "url(" + bgImage + ")" }}
            />

          </div>
        </div>
      </>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  login: (adminId, password, history) => dispatch(loginAsync(adminId, password, history))
});
export default withRouter(connect(null, mapDispatchToProps)(Login));