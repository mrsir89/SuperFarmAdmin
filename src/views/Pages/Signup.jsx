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
import { ActionTypes } from "contants";
import bgImage from "assets/img/bg16.jpg";


const signupAsync = (signupAdmin, history) => dispatch => {
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

class Signup extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            id: '',
            passwordOrigin:'',
            passwordCheck:'',
            passwordComent: '비밀번호를 입력해 주세요',
            name: '',
            birthday: '',
            gender: '',
            email:'',
            address:'',
            phone:'',
            emailComent:'email을 입력하세요',
            idCheck: false,
            passwordCheck: false,
            emailChecl: false 
        };
        this._handleInputChange = this._handleInputChange.bind(this);
        this._signupSubmit = this._signupSubmit.bind(this);
        this._idCheckChange = this._idCheckChange.bind(this);
        this._passwordCheck = this._passwordCheck.bind(this);
        this._passwordOrigin = this._passwordOrigin.bind(this);
        this._emailCheck = this._emailCheck.bind(this);
        this.routeChange = this.routeChange.bind(this);
      }

      routeChange() {
          let path = '/';
          this.props.history.push(path);
      }

      componentWillMount() {
          console.log('willMount 실행 ')
      }

      componentDidMount() {
          console.log ('DidMount 실행')
      }

      shouldComponentUpdate(nextState){
          return(JSON.stringify(nextState) != JSON.stringify(this.state));
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
            
              // 비밀번호 체크
              _passwordOrigin = (event) => {
                var password = event.target.value
                password.trim()
                const { asynAction } = this.props;
            
                asynAction().then(response => {
                  this.setState({
                    passwordOrigin: password
                  })
                  if ((this.state.passwordOrigin).length > 3) {
                    if (this.state.passwordOrigin === this.state.passwordCheck) {
                      this.setState({
                        passwordComent: '비밀번호가 일치 합니다.',
                        passwordCheck: true
                      })
                      console.log('password State', this.state)
                    } else {
                      this.setState({
                        passwordComent: '비밀번호가 일치하지 않습니다.',
                        passwordCheck: true
                      })
                    }
                  } else {
                    this.setState({
                      passwordComent: '비밀번호가 짧습니다.',
                      passwordCheck: true
                    })
                  }
                })
                console.log('state 확인~!@!!!!!!!!!!!!!!!!!!!!!', this.state)
              }
              _passwordCheck = (event) => {
            
                console.log(event.target)
                const { asynAction } = this.props;
                var password = event.target.value
                password.trim()
                console.log(this.props, 'zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz')
                console.log(event.target.value, 'check target')
            
                asynAction().then((response) => {
                  console.log(response)
                  this.setState({
                    passwordCheck: password
                  })
                  if (this.state.passwordOrigin === this.state.passwordCheck) {
                    this.setState({
                      passwordComent: '비밀번호가 일치 합니다.',
                      passwordCheck: true
                    })
                    console.log('password State', this.state)
                  } else {
                    this.setState({
                      passwordComent: '비밀번호가 일치하지 않습니다.',
                      passwordCheck: true
                    })
                  }
                })
                console.log('state 확인~!@!!!!!!!!!!!!!!!!!!!!!', this.state)
              }
            
              _emailCheck = (event) => {
                var email = event.target.value;
                email.trim();
                const { emailCheck } = this.props;
                console.log('email 체크 합니다용~~~', this.props)
                emailCheck(email).then(response => {
                  if (response.type === ActionTypes.EMAILCHECK_SUCCESS) {
                    this.setState({
                      email: email,
                      emailCheck: true,
                      emailComent: '사용 가능 합니다.'
                    })
                  } else {
                    this.setState({
                      email:'',
                      emailCheck: false,
                      emailComent: '사용 불가능한 email입니다.'
                    })
                  }
                }).catch(error => {
                  console.log('error', error)
                  this.setState({
                    emailCheck: false,
                    emailComent: '사용 불가능한 email입니다.'
                  });
                })
            
                console.log(email, ' email 확인!!!!!!')
              }
            
            
              componentDidCatch(err, errorInfo) {
                console.log("componentDidCatch");
                console.error(err);
                console.error(errorInfo);
                this.setState(() => ({ err, errorInfo }));
              }
            
            
              // handleRadio(event) {
              //   let obj = {}
              //   obj[event.target.value] = event.target.checked
              //   this.setState({
              //     gender: {
              //       value: event.target.value
              //     }
              //   })
              // }
            
              _signupSubmit(e) {
                e.preventDefault();
                console.log('submit 실행 합니다.')
                let checkpwd = this.state.idCheck;
                let checkId = this.state.passwordCheck;
                let checkemail = this.state.emailCheck;
                console.log('sumbit의 state.',this.state)
                if (checkpwd !== false && checkId !== false && checkemail !== false) {
                  if (this.state.userId !== null && this.state.userId !==''
                      &&this.state.name !=='' && this.state.birthday !=='' 
                      &&this.state.address !=='' && this.state.phone !=='') {
            
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

                    <div className="wrapper wrapper-full-page" ref="fullPages">
                      <div
                        className="full-page section-image"
                        filter-color={this.state.filterColor}
                      >
                           
                        <div className="content">
                          <div className="signup-page">
                            <Container>
                          
                           
                              <Col xs={12} md={8} lg={4} className="ml-auto mr-auto">
                                <Form>
                               
                                  <Card className="card-login card-plain">
                                    <CardHeader >
                                     
                                      <div className="logo-container">
                                      <h2>Sign Up Page</h2> 
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
                                          name ="id"
                                          placeholder="아이디를 입력하세요"
                                          onFocus={e => this.setState({ firstnameFocus: true })}
                                          onBlur={e => this.setState({ firstnameFocus: false })}
                                          onChange={this._idCheckChange.bind(this)}
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
                                          onChange={this._passwordCheck.bind(this)}
                                         
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
                                          type="text"
                                          placeholder="이름을 입력해주세요"
                                          onFocus={e => this.setState({ lastnameFocus: true })}
                                          onBlur={e => this.setState({ lastnameFocus: false })}
                                          onChange={this._handleInputChange.bind(this)}
                                         
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
                                       onClick={this._signupSubmit}>
                                        Sign Up 
                                  </Button>
                                      <div className="pull-left">
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
           
                        />
            
                      </div>
                    </div>
                  </>
                );
              }
            }
    const mapDispatchToProps = (dispatch) => (console.log('mapDispatchToProps', dispatch), {
            
    signup: (signupCustomer,history) => dispatch(signupAsync(signupCustomer,history)),
    idCheck: (id) => dispatch(Actions.idCheck(id)),
    emailCheck: (email) => dispatch(Actions.emailCheck(email)),
    asynAction: () => dispatch(Actions.asynAction())
            
});
            
 export default connect(null, mapDispatchToProps)(Signup);


//  const mapDispatchToProps = (dispatch) => ({
//     login: (adminId, password, history) => dispatch(loginAsync(adminId, password, history))
//   });