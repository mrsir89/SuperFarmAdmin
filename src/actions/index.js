import { ActionTypes } from '../contants';

/**
 * 회원가입 
 * 
 */
//------------------------------------------------
 const signup = (signupAdmin,history) => {
   console.log(signupAdmin, '여기는 sign up')

   return ({
     type: ActionTypes.SIGNUP,
     payload: {
       request: {
         method: 'POST',
         url: '/signup',
         headers: {
           'Content-Type' : 'application/json; charset: utf-8'
         },
         data: JSON.stringify()//signUp -> DB 
       }
     }
   }
   );
 };

 const idCheck = (id) => {
  console.log('idCheck 실행 ', id)

  const formData = new FormData();
  formData.append('id', id);
  return ({
    type: ActionTypes.IDCHECK,
    payload: {
      request: {
        method: 'POST',
        url: '/signup/idCheck',
        data: formData
      }
    }
  });
};

const emailCheck = (email) => {
  const formData = new FormData();
  formData.append('email', email);
  return ({
    type: ActionTypes.EMAILCHECK,
    payload: {
      request: {
        method: 'POST',
        url: '/signup/emailCheck',
        data: formData
      }
    }
  });
}



/**
 * Admin 페이지 Action 정의 
 */


const getClientToken = () => {
    const formData = new FormData();
    formData.append('grant_type', 'client_credentials');
    console.log('Actions의 getClientToken 발급 받는다. ');
    return ({
      type: ActionTypes.GET_TOKEN,
      payload: {
        request: {
          method: 'POST',
          url: '/oauth/token',
          data: formData
        }
      }
    });
  };
  
  //refreshToken
  const refreshToken = (refresh_token) => {
    const formData = new FormData();
    formData.append('grant_type', 'refresh_token');
    formData.append('refresh_token', refresh_token);
  
    return ({
      type: "REFRESH_TOKEN",
      payload: {
        request: {
          method: 'POST',
          url: '/oauth/token',
          data: formData
        }
      }
    });
  };


/**
 *  @apiNote admin Login
 *  
 */

const login = (customerId, password) => {
    const formData = new FormData();
    formData.append('grant_type', 'password');
    formData.append('username', customerId);
    formData.append('password', password);
    console.log(customerId, 'ID ', password, ' Password')
    return ({
      type: ActionTypes.LOGIN,
      payload: {
        request: {
          method: 'POST',
          url: '/oauth/token',
          data: formData
        }
      }
    });
  };
  
  const getUserMe = () => {
    return ({
      type: ActionTypes.GET_USERME,
      payload: {
        request: {
          method: 'POST',
          url: '/users/me'
  
        }
      }
    });
  };
  
  
  const logout = () => ({
    type: ActionTypes.LOGOUT
  })






export const Actions ={
  signup, emailCheck, idCheck,getClientToken,refreshToken,login, logout,getUserMe // login과 인증
    
}