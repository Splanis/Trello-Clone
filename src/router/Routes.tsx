import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { BoardPage } from '../pages/board/BoardPage';
import { HomePage } from '../pages/homepage/HomePage';
import { LoginPage } from '../pages/login/LoginPage';
import { LogoutPage } from '../pages/logout/LogoutPage';
import { useAuth } from '../providers/AuthProvider';

export function Routes() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated)
    return (
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/board/:id">
          <BoardPage />
        </Route>
        <Route exact path="/logout">
          <LogoutPage />
        </Route>
        <Redirect to="/" />
      </Switch>
    );

  return (
    <Switch>
      <Route exact path="/login">
        <LoginPage />
      </Route>
      <Redirect to="/login" />
    </Switch>
  );
}
