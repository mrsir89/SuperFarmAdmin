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
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Actions } from '../../actions/index';

// reactstrap components
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardFooter,
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Label,
  Button
} from "reactstrap";

// core components
import bgImage from "assets/img/bg16.jpg";
import { ActionTypes } from "contants";


const ResisterAsync = (signupAdmin, history) => dispatch => {
  return dispatch(Actions.getClientToekn())
  .then (response => {
      if (response.type == ActionTypes.GET_TOKEN_SUCCESS){
          console.log ('dispatch signupAsync ActionTypes.GET_TOKEN_SUCCESS')
          return dispatch (Actions.signup(signupAdmin, history)).then(response => {
              history.push("/")
          })
      }else {
          return Promise.reject(response);
      }
  }).catch (error => {
      alert('서버와의 통신 중 오류')
      return history.push ("/signup")
  });
};


class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      password:'',
    //  passwordOrigin:'',
   //   passwordCheck:'',
     // passwordComent: '비밀번호를 입력해 주세요',
      name: '',
    //  email:'',
    //  emailComent:'email을 입력하세요',
     idCheck: false,
    //  passwordCheck: false,
    //  emailChecl: false 
    };

    this._handleInputChange = this._handleInputChange.bind(this);
    this._signupSubmit = this._signupSubmit.bind(this);
    this._idCheckChange = this._idCheckChange.bind(this);
  //  this._passwordCheck = this._passwordCheck.bind(this);
   // this._passwordOrigin = this._passwordOrigin.bind(this);
   // this._emailCheck = this._emailCheck.bind(this);
   // this.routeChange = this.routeChange.bind(this);
  }
  componentDidMount() {
    document.body.classList.add("register-page");
  }
  componentWillUnmount() {
    document.body.classList.remove("register-page");
  }

  _handleInputChange(event){
    const target = event.target;
    const value = target.value;
    const name = target.name;
    value.trim() 
    console.log (target, '   :target')
    console.log (value, '  :value')
    console.log(name, '   :name')


    this.setState({
        [name]:value
    });
    console.log(this.state)

  }

  _idCheckChange = (event) => {
      console.log ('아이디바뀜', event.target)
      let id = ''
      id = event.target.value;
      id.trim();
      const {idCheck} = this.props;
      console.log (id)
      if(id.length > 3) {
          console.log(id.length)
          idCheck(id).then(response =>{
              console.log(response, ' idCheck 확인 ~~~~~~~~')
              if(response.type ===ActionTypes.IDCHECK_SUCCESS){
                  this.setState({
                      id:id,
                      idCheck:true,
                      idCheckStatus:'사용가능한 아이디입니다'
                  })
                  return 
              } else if (response.type=== ActionTypes.IDCHECK_FAIL){
                  this.setState({
                      id:{
                          value:''
                      },
                      idCheck:false,
                      idCheckStatus:'사용 불가능한 아이디입니다'
                  })
              }
          }).catch(error => {
              console.log(error, ' error 확인 ')
              this.setState({
                id: {
                  value: ''
                },
                idCheck: false,
                idCheckStatus: '사용 불가능한 아이디 입니다.'
              })
            })
          } else {
            this.setState({
              idCheckStatus: '입력하신 아이디가 짧습니다.',
              idCheck: false
            })
          }
          console.log('Id change 확인중 ', this.state)
        }

  _signupSubmit(e) {
    e.preventDefault();
    console.log('submit 실행 합니다.')
    let checkId = this.state.idCheck;
    let checkpwd = this.state.passwordCheck;
    let checkemail = this.state.emailCheck;
    console.log('sumbit의 state.',this.state)
    if (checkpwd !== false && checkId !== false && checkemail !== false) {
      if (this.state.userId !== null && this.state.userId !==''
          &&this.state.name !=='' && this.state.phone !=='') {

        const signupAdmin = {
          userId: this.state.id,
          userName: this.state.name,
          userPassword: this.state.passwordOrigin,
          userEmail: this.state.email
    
        }
        const { signup } = this.props;
        const { history }= this.props;
        signup(signupAdmin,history);

      
      }else{
        alert('누락된 곳이 있습니다.')
      }
    }else {
      alert(' 입력하지 않은 곳이 있습니다.')
    }
  };



  render() {
    return (
      <>
        <div className="content">
          <div className="register-page">
            <Container>
              <Row className="justify-content-center">
                <Col lg={5} md={8} xs={12}>
                  <div className="info-area info-horizontal mt-5">
                    <div className="icon icon-primary">
                      <i className="now-ui-icons media-2_sound-wave" />
                    </div>
                    
                    
                  </div>
                </Col>
                <Col lg={4} md={8} xs={12}>
                  <Card className="card-signup">
                    <CardHeader className="text-center">
                      <CardTitle tag="h4">Register</CardTitle>
                      <div className="social btns-mr-5">
                        <Button className="btn-icon btn-round" color="twitter">
                          <i className="fab fa-twitter" />
                        </Button>
                        <Button className="btn-icon btn-round" color="dribbble">
                          <i className="fab fa-dribbble" />
                        </Button>
                        <Button className="btn-icon btn-round" color="facebook">
                          <i className="fab fa-facebook-f" />
                        </Button>
                        <h5 className="card-description">or be classical</h5>
                      </div>
                    </CardHeader>
                    <CardBody>
                      <Form>
                        <InputGroup
                          className={
                            this.state.firstnameFocus ? "input-group-focus" : ""
                          }
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="now-ui-icons users_circle-08" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="text"
                            name="id"
                            placeholder="ID"
                            onFocus={e =>
                              this.setState({ firstnameFocus: true })
                            }
                            onBlur={e =>
                              this.setState({ firstnameFocus: false })
                            }
                            onChange={this._handleInputChange.bind(this)}


                          />
                        </InputGroup>
                        <InputGroup
                          className={
                            this.state.lastnameFocus ? "input-group-focus" : ""
                          }
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="now-ui-icons text_caps-small" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="password"
                            name= "password"
                            placeholder="패스워드를 입력하세요"
                            onChange={this._handleInputChange.bind(this)}
                            //onChange={this._passwordCheck.bind(this)}
                                         
                           />
                        </InputGroup>
                        <InputGroup
                          className={
                            this.state.emailFocus ? "input-group-focus" : ""
                          }
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="now-ui-icons ui-1_email-85" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="email"
                            placeholder="Email..."
                            onFocus={e => this.setState({ emailFocus: true })}
                            onBlur={e => this.setState({ emailFocus: false })}
                          />
                        </InputGroup>

                        <InputGroup
                          className={
                            this.state.emailFocus ? "input-group-focus" : ""
                          }
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                             &nbsp;&nbsp;&nbsp;
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="select"
                            placeholder="status"
                            onFocus={e => this.setState({ emailFocus: true })}
                            onBlur={e => this.setState({ emailFocus: false })}
                          />
                        </InputGroup>


                        
                        
                        <FormGroup check>
                          <Label check>
                            <Input type="checkbox" />
                            <span className="form-check-sign" />
                            <div>
                              I agree to the{" "}
                              <a href="#something">terms and conditions</a>.
                            </div>
                          </Label>
                        </FormGroup>
                      </Form>
                    </CardBody>
                    <CardFooter className="text-center">
                    <Button
                      block
                      color="primary"
                      size="lg"
                      href="#pablo"
                      className="mb-3 btn-round"
                      onClick={this._signupSubmit}>
                       Get Started
                      </Button>
                     
                    </CardFooter>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
        <div
          className="full-page-background"
          style={{ backgroundImage: "url(" + bgImage + ")" }}
        />
      </>
    );
  }
}
const mapDispatchToProps = (dispatch) => (console.log('mapDispatchToProps', dispatch), {
            
  signup: (signupAdmin,history) => dispatch(ResisterAsync(signupAdmin,history)),
 // idCheck: (id) => dispatch(Actions.idCheck(id)),
 // emailCheck: (email) => dispatch(Actions.emailCheck(email)),
  //asynAction: () => dispatch(Actions.asynAction())
          
});

export default connect(null, mapDispatchToProps)(RegisterPage);


