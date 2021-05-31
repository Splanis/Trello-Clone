import React, { CSSProperties } from 'react';
import { useDispatch } from 'react-redux';
import googleLogo from '../../assets/google.png';
import { signIn } from '../../redux/middlewares/auth';
import { Text } from '../../ui-components/Text';
import { theme } from '../../ui-components/theme';
import { View } from '../../ui-components/View';

export function Login() {
  const dispatch = useDispatch();

  return (
    <View page direction="column">
      <View style={styles.button} onClick={() => dispatch(signIn())}>
        <img style={styles.logo} src={googleLogo} alt="google" />
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
