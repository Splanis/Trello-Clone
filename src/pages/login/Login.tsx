import React, { CSSProperties } from 'react';
import { useDispatch } from 'react-redux';
import googleLogo from '../../assets/google.png';
import { signIn } from '../../redux/reducers/user/middleware';
import { Text } from '../../ui/Text';
import { theme } from '../../ui/theme';
import { View } from '../../ui/View';

export function Login() {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(signIn());
  };

  return (
    <View page direction="column">
      {/* <Text text="Login" /> */}
      <View style={styles.button} onClick={handleClick}>
        <img style={styles.logo} src={googleLogo} alt="google" />{' '}
        <Text text="Sign in with Google" fontSize={20} />
      </View>
    </View>
  );
}

type Styles = {
  button: CSSProperties;
  logo: CSSProperties;
};

const styles: Styles = {
  button: {
    background: theme.colors.white,
    padding: '10px',
    boxShadow: theme.shadow.big,
    border: '1px solid grey',
    borderRadius: '8px'
  },
  logo: {
    width: '40px'
  }
};
