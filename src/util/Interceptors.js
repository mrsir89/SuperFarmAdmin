
const requestInterceptor = ({getState}, req) => {
  const {auth} = getState();
  const {token}=auth;
  let {headers, url} = req;

  if(token !== undefined && token !== null && url !=='/oauth/token'){
    const {access_token} = token;

    if(access_token !== undefined && access_token !== null){
      headers = {...headers, 'Authorization': `Bearer ${access_token}`};
    }
  }

  return {...req, headers}
};

const interceptors={

  request:[
    requestInterceptor
  ]
};

export default interceptors;