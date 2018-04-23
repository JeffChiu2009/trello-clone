import React, { Component } from 'react';
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Auth from "./containers/Auth/Auth";
import Main from "./components/Main/Main";
import Board from "./components/Board/Board";
import NotFound from "./components/NotFound/NotFound";
import Spinner from "./components/Spinner/Spinner";

class App extends Component {
  render() {
    let mainView = <Spinner />;
    if(!this.props.isAuth) {
      mainView = <Auth />;
    } else {
      mainView = <Main />;
    }
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={() => mainView} />
          <Route path="/board/:b_id" component={Board} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(App);
