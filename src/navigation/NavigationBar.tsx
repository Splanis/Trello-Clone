import React, { CSSProperties } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectIsAuthenticated, selectUserName } from '../redux/modules/auth.selectors';
import { Button } from '../ui-components/Button';
import { Text } from '../ui-components/Text';
import { theme } from '../ui-components/theme';
import { View } from '../ui-components/View';

export function NavigationBar() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const username = useSelector(selectUserName);

  return (
    <View justify="space-between" style={styles.navigation}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Text text="Trello Clone" style={styles.logo} />
      </Link>
      {isAuthenticated && username ? (
        <View>
          <Button title={username} variant="white" />
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
