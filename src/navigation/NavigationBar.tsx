import React, { CSSProperties } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { State } from '../redux/reducers/rootReducer';
import { selectUser } from '../redux/reducers/user/userReducer';
import { Button } from '../ui/Button';
import { Text } from '../ui/Text';
import { theme } from '../ui/theme';
import { View } from '../ui/View';

export function NavigationBar() {
  const state = useSelector((state: State) => state);
  const user = selectUser(state);

  return (
    <View justify="space-between" style={navigation}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Text text="Trello Clone" style={logo} />
      </Link>
      {user ? (
        <View>
          <Button title={user.username} variant="secondary" />
          <Link to="/logout">
            <Button title="Logout" variant="alternative" />
          </Link>
        </View>
      ) : (
        <View>
          <Link to="/login">
            <Button title="Login" variant="secondary" />
          </Link>
          <Link to="/register">
            <Button title="Register" variant="alternative" />
          </Link>
        </View>
      )}
    </View>
  );
}

const navigation: CSSProperties = {
  paddingRight: '20px',
  width: '100%',
  position: 'fixed',
  height: '60px',
  backgroundColor: theme.colors.secondary
};

const logo: CSSProperties = {
  fontSize: '40px',
  color: theme.colors.black,
  marginLeft: '10px'
};
