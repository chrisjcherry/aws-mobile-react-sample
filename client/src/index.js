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
/* import AMA from 'ama';*/

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
  credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: awsmobile.aws_cognito_identity_pool_id
    })
});

//Make sure region is 'us-east-1'
AWS.config.region = 'us-east-1'; //in my case this overrides eu-west-1 region of app
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:61872f49-e29e-4cf0-a8b2-7bd621c54865' //Amazon Cognito Identity Pool ID
});

var options = {
    appId : 'd10f39f8fff6477586610e27fe10457e', //Amazon Mobile Analytics App ID
    appTitle : 'React Example App',              //Optional e.g. 'Example App'
/*
    appVersionName : APP_VERSION_NAME, //Optional e.g. '1.4.1'
    appVersionCode : APP_VERSION_CODE, //Optional e.g. '42'
    appPackageName : APP_PACKAGE_NAME  //Optional e.g. 'com.amazon.example'
*/
};

var mobileAnalyticsClient = new AMA.Manager(options);

console.log('AWS object: ', AWS);
console.log('AMA object: ', AMA);
console.log('App id: ', awsmobile.aws_project_id);
console.log('Amazon Cognito Identity Pool ID: ', awsmobile.aws_cognito_identity_pool_id);

// Analytics.record('App-open');

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
