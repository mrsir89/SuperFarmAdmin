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
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducers from './reducers';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios'; // 추가사항
import axiosMiddleware from 'redux-axios-middleware'; // 추가사항
import { createBrowserHistory } from "history";
import { Route, Switch, Redirect } from "react-router-dom";
import { StateLoader, interceptors, onErrorHandler } from './util';
import AdminLayout from "layouts/Admin.jsx";
import AuthLayout from "layouts/Auth.jsx";

import Login from './views/Pages/Login'; // 8/27
import Signup from './views/Pages/Signup';

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/now-ui-dashboard.scss?v=1.3.0";
import "assets/css/demo.css";



const clientId = 'test01';
const clientSecret = 'test01';

const hist = createBrowserHistory();

const client = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
    'Cache-Control': 'no-cache'
  },
  responseType: 'json'
});

// config 설정
const middlewareConfig = {
  // authoprization을 bearer 토큰으로 바꿔주기 위한 인터셉터
  interceptors,
  // 401에러를 처리하여 토큰을 자동으로 갱신한 후, 이전 에 실패한 액션(api call)을 다시 수행  / 실행한 경우 다시 실행 
  // 에러가 나면 무조건 실행 reqeust 나 respone 둘중에 처리해도 된다.
  // 하지만 인터셉터랑 핸들러랑 차이가 있다. /
  // 기본적인 onError 핸들러는 로그인시 실패 하면 /login_fail 또는 login_suscess 두가지중 하나로 온다.
  onError: onErrorHandler
};

const logger = createLogger({
  collapsed: true
});

const stateLoader = new StateLoader();

const store = createStore(

  rootReducers,
  stateLoader.loadState(),

  applyMiddleware(axiosMiddleware(client, middlewareConfig), logger, thunk)
);

store.subscribe(() => {
  stateLoader.saveState(store.getState());
});


// 여기가 App.js라 생각하면 된다.
ReactDOM.render(

  <Provider store = {store}>
  <Router history={hist}>
      <Switch>
      <Route path="/login" component={Login} />
      <Route
        path="/admin"
        render={props => {
          return <AdminLayout {...props} />;
        }}
      />
      <Route
        path="/auth"
        render={props => {
          return <AuthLayout {...props} />;
        }}
      />

      {/* 8/27 */}
      <Route path="/login" component={Login} />
      <Route path="/signup" component ={Signup}/>

      <Redirect to="/admin/dashboard" />
    </Switch>
  </Router>
  </Provider>,
  document.getElementById("root")
);
