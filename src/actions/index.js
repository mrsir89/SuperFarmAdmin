import { ActionTypes } from '../contants';
import { userInfo } from 'os';
// React 컴포넌트같은 것이 직접 접근하려고 하면 안됨.
// 직접 접근하기 위해 "Action"이라는 의식을 거쳐야 한다.
// 1)_ Store에 대해 뭔가 하고 싶은 경우엔 Action 을 발행한다.
// 2)_ Store의 문지기(Reducer)가 Action의 발생을 감지하면, 새로운 State가 생성된다.


// type: "액션의 종류를 한번에 식별할 수 있는 문자열 혹은 심볼"
// payload: "액션의 실행에 필요한 임의의 데이터"


// 초기 페이지 설정 값

const initBoardListsize = 10
const initBoardListPage = 1


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


//////////////////////////////////////////////
//           회원 가입 

/**
 * 회원가입 
 * @param {singupCustomer} signupCustomer 
 * @Return User<Customer>
 */
const signup = (signupCustomer,history) => {
  console.log(signupCustomer, ' 여기는 signup 안쪽')

  return ({
    type: ActionTypes.SIGNUP,
    payload: {
      request: {
        method: 'POST',
        url: '/signup',
        headers: {
          'Content-Type': 'application/json; charset: utf-8'
        },
        data: JSON.stringify(signupCustomer)
      }
    }
  }
  );
};

/**
 * id 중복 체크
 * @param String id
 * @return true or notfoud 
 */
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

//////////////////////////////////////////////////////
//        로 그 인 



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

const userEdit=(customerEdit)=>{
  return ({
    type: ActionTypes.USER_EDIT,
    payload: {
      request: {
        method: 'POST',
        url: '/users/edit',
        headers: {
          'Content-Type': 'application/json; charset: utf-8'
        },
        data: JSON.stringify(customerEdit)
      }
    }
  }
  );
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



const refreshToken = (refresh_token) => {
  const formData = new FormData();
  formData.append('grant_type', 'refresh_token');
  formData.append('refresh_token', refresh_token);

// 미들웨어 형식 
  return ({   
    type: ActionTypes.REFRESH_TOKEN,
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
 * @author 심인선
 * @param {*} writeQnA 
 */

 /////////////////////////////////////////////////////////////////////
 //faq

 const loadFrequentlyAskedQuestionBoard = ()=>{
  const formData = new FormData();
  console.log('Action FrequentlyAskedBoard 실행')
  return({
    type:ActionTypes.LOAD_FREQUENTLYASKEDBOARD,
    payload:{
      request:{
        method:'POST',
        url:'/faqboard',
        data:formData
      }
    }
  })
}

/**
 * @author 심인선
 * @param {*} writeQnA 
 */
/////////////////////////////////////////////////////////////////
/////          notice board

const loadNoticeBoard = ()=>{
  const formData = new FormData();
  console.log('Action NoticeBoard 실행')
  return({
    type:ActionTypes.LOAD_NOTICEBOARD,
    payload:{
      request:{
        method:'POST',
        url:'/notice',
        data:formData
      }
    }
  })
}

/////////////////////////////////////////////////////////////////
/////////// QnA Board ///////////////////////////////////////

//QnABoard productBoardNum에 맞게 불러 오기
const loadqnaboardList = (productNum, size, page) => {
  const formdata = new FormData();
  formdata.append('productNum', 5);
  formdata.append('size', size);
  formdata.append('page', page);
  console.log('Action loadQnABoard 실행')
  console.log('size', size, ' page ', page)
  return ({
    type: ActionTypes.LOAD_QNABOARDLIST,
    payload: {
      request: {
        method: 'POST',
        url: '/question/product',
        data: formdata
      }
    }
  })
}

// 리뷰 가져오기
const getReviews = (type, id, size = initBoardListsize,
  page = initBoardListPage) => {
  const formData = new FormData();
  type = 'productBoard'
  var url = '/review/product';
  formData.append('size', size)
  formData.append('page', page)
  formData.append('productBoardNum', 5)
  console.log('Action LOAD_REVIEWS')

  if (type == 'productBoard') {
    formData.append('productBoardNum', 5)
    url = '/review/product';
  }
  if (type == 'user') {
    formData.append('userId', id)
    url = '/review/userId'
  }
  console.log('size', size, 'page', page, 'id', id)
  return ({
    type: ActionTypes.LOAD_REVIEWS,
    payload: {
      request: {
        method: 'POST',
        url: url,
        data: formData,
      },

    }
  })
};

// const getCategories = () => {
//   return ({
//     type: ActionTypes.GET_CATEGORIES
//   })
// }

//////////////////////////////////////////////////////////
///        비동기 처리를 위한 Action
const asynAction = () => {
  // window.setInterval(()=>{}, 100);
  return {
    type: ActionTypes.ASNYCACTION,
    payload: {
      request: {
        method: 'POST',
        url: '/signup/asyncAction'
      }
    }
  }
}


export const Actions = {

  signup, emailCheck, idCheck, getUserMe,
  login, logout, getClientToken,refreshToken,
  loadqnaboardList,
  loadNoticeBoard,
  loadFrequentlyAskedQuestionBoard,

  getReviews,
  asynAction
};