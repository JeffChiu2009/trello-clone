import React, { Component } from 'react';
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as actions from "./store/actions/";

import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Auth from "./containers/Auth/Auth";
import Main from "./components/Main/Main";
import NotFound from "./components/NotFound/NotFound";
import Spinner from "./components/UI/Spinner/Spinner";

class App extends Component {
  componentDidMount() {
    this.props.onAuthCheckState();
  }
  render() {
    return (
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" render={() => <Home isAuth={this.props.isAuth}/>} />
            <Route path="/auth" component={Auth} />
            <Route path="/boards" component={Main} />
            <Route render={() => <NotFound isAuth={this.props.isAuth}/>} />
          </Switch>
        </Layout>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuthCheckState: () => dispatch(actions.authCheckState())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);