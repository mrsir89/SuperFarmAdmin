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
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/now-ui-dashboard.scss?v=1.3.0";
import "assets/css/demo.css";

import AdminLayout from "layouts/Admin.jsx";
import AuthLayout from "layouts/Auth.jsx";

import Login from './views/Pages/Login'; // 8/27

import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducers from './reducers';
import { StateLoader, interceptors, onErrorHandler } from './util';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

const clientId = 'test01';
const clientSecret = 'test01';

const client = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
    'Cache-Control': 'no-cache'
  },
  responseType: 'json'
});

const middlewareConfig={
  interceptors,
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

store.subscribe(()=>{
  stateLoader.saveState(store.getState());
});

const hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>

      <Switch>
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

        <Redirect to="/admin/dashboard" />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
