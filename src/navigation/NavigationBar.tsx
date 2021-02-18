import React, { CSSProperties } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { State } from '../redux/reducers/rootReducer';
import { isLoggedIn, selectUsername } from '../redux/reducers/user/userReducer';
import { Button } from '../ui/Button';
import { Text } from '../ui/Text';
import { theme } from '../ui/theme';
import { View } from '../ui/View';

export function NavigationBar() {
  const state = useSelector((state: State) => state);
  const loggedIn = isLoggedIn(state);
  const username = selectUsername(state);

  return (
    <View justify="space-between" style={styles.navigation}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Text text="Trello Clone" style={styles.logo} />
      </Link>
      {loggedIn ? (
        <View>
          <Button title={username} variant="secondary" />
          <Link to="/logout" style={styles.button}>
            <Button title="Logout" variant="alternative" />
          </Link>
        </View>
      ) : (
        <View>
          <Link to="/login">
            <Button title="Login" variant="alternative" />
          </Link>
        </View>
      )}
    </View>
  );
}

type Styles = {
  navigation: CSSProperties;
  logo: CSSProperties;
  button: CSSProperties;
};

const styles: Styles = {
  navigation: {
    paddingRight: '20px',
    width: '100%',
    position: 'fixed',
    height: '60px',
    backgroundColor: theme.colors.primary
  },
  logo: {
    fontSize: '40px',
    color: theme.colors.white,
    marginLeft: '10px'
  },
  button: {
    marginLeft: '20px'
  }
};
