import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { BoardPage } from '../pages/board/BoardPage';
import { Homepage } from '../pages/homepage/Homepage';
import { Login } from '../pages/login/Login';
import { Logout } from '../pages/logout/Logout';
import { selectIsAuthenticated } from '../redux/modules/auth.selectors';

export function Routes() {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (isAuthenticated)
    return (
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path="/board/:id">
          <BoardPage />
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
