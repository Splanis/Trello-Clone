import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Board } from '../pages/board/Board';
import { Homepage } from '../pages/homepage/Homepage';
import { Login } from '../pages/login/Login';
import { Logout } from '../pages/logout/Logout';
import { State } from '../redux/reducers/rootReducer';
import { selectUser } from '../redux/reducers/user/userReducer';

export function Routes() {
  const state = useSelector((state: State) => state);
  const user = selectUser(state);

  if (user)
    return (
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path="/board/:id">
          <Board />
        </Route>
        <Route exact path="/logout">
          <Logout />
        </Route>
        <Redirect to="/" />
      </Switch>
    );

  return (
    <Switch>
      <Route exact path="/login">
        <Login />
      </Route>
      <Redirect to="/login" />
    </Switch>
  );
}
