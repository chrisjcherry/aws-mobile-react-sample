/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { BrowserRouter, Route, Redirect, Link, Switch } from 'react-router-dom';
import { Button, Card, Row, Col, Navbar, NavItem, Icon } from 'react-materialize';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import Main from './Main';
import Login from './Auth/Login';
import Register from './Auth/Register';
import Forget from './Auth/Forget';
import awsmobile from './aws-exports';
import Amplify,{Auth} from 'aws-amplify';
import './css/general.css';
import { Analytics } from 'aws-amplify';

/*
 * Import the SDK and Project Configuration
 */
import AWS from 'aws-sdk';
console.log('AWS object: ', AWS);
console.log('AWS config object: ', AWS.config);
console.log('My region', awsmobile.aws_cognito_region);

/*
 * Configure the SDK to use anonymous identity 
 */
AWS.config.update({
  region: awsmobile.aws_cognito_region,
  appId : awsmobile.aws_project_id,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: awsmobile.aws_cognito_identity_pool_id
  })
});

console.log('AWS object: ', AWS);

/*
var options = {
    appId : MOBILE_ANALYTICS_APP_ID   //Required e.g. 'c5d69c75a92646b8953126437d92c007'
};
mobileAnalyticsClient = new AMA.Manager(options);
*/

console.log('AWS config object: ', AWS.config);
console.log('AWS config region:', AWS.config.region);

Analytics.record('App-open');

const history = createHistory();

history.listen((location, action) => {
    const {pathname} = location;
    console.log('Page changed to:', location.pathname);
  });  

Amplify.configure(awsmobile);

require('file-loader?name=[name].[ext]!./index.html');
require("babel-core/register");
require("babel-polyfill");

const PublicRoute = ({ component: Component, authStatus, ...rest}) => (
    <Route {...rest} render={props => authStatus == false
        ? ( <Component {...props} /> ) : (<Redirect to="/main" />)
    } />
)

const PrivateRoute = ({ component: Component, authStatus, ...rest}) => (
    <Route {...rest} render={props => authStatus == false
        ? ( <Redirect to="/login" /> ) : ( <Component {...props} /> )
    } />
)

export default class AppRoute extends Component {

    constructor(props) {
        super(props);
        this.state = {authStatus: this.props.authStatus || false}
        this.handleWindowClose = this.handleWindowClose.bind(this);
    }

    handleWindowClose = async (e) => {
        e.preventDefault();
        Auth.signOut()
            .then(
                sessionStorage.setItem('isLoggedIn', false),
                this.setState(() => {
                    return {
                        authStatus: false
                    }
                })
            )
            .catch(err => console.log(err))
    }

    componentWillMount() {
        this.validateUserSession();
        window.addEventListener('beforeunload', this.handleWindowClose);
    }

    componentWillUnMount() {
        window.removeEventListener('beforeunload', this.handleWindowClose);
    }

    validateUserSession() {
        let checkIfLoggedIn = sessionStorage.getItem('isLoggedIn');
        if(checkIfLoggedIn === 'true'){
            this.setState(() => {
                return {
                    authStatus: true
                }
            })
        } else {
            this.setState(() => {
                return {
                    authStatus: false
                }
            })
        }
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <PublicRoute authStatus={this.state.authStatus} path='/' exact component={Login} />
                    <PublicRoute authStatus={this.state.authStatus} path='/login' exact component={Login} />
                    <PublicRoute authStatus={this.state.authStatus} path='/register' exact component={Register} />
                    <PublicRoute authStatus={this.state.authStatus} path='/forget' exact component={Forget} />
                    <PrivateRoute authStatus={this.state.authStatus} path='/main' component={Main} />
                    <Route render={() => (<Redirect to="/login" />)} />
                </Switch>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<AppRoute />, document.getElementById('root'));
