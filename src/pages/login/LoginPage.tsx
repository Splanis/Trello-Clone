import React from 'react';
import googleLogo from '../../assets/google.png';
import { signInAnonymously, signInWithGoogle } from '../../firebase/services/auth';
import { styled } from '../../theme/theme';
import { Page } from '../../ui-components/Page';
import { Pressable } from '../../ui-components/Pressable';
import { Typography } from '../../ui-components/Typography';
import { View } from '../../ui-components/View';
import { GiNinjaMask } from 'react-icons/gi';

export function LoginPage() {
  return (
    <Page>
      <ButtonsContainer>
        <LoginButton onClick={signInWithGoogle}>
          <GoogleImage src={googleLogo} alt="google" />
          <Typography>Sign in with Google</Typography>
        </LoginButton>
        {/* <LoginButton onClick={signInAnonymously}>
          <AnonymousImage size={30} />
          <Typography>Sign in Anonymously</Typography>
        </LoginButton> */}
      </ButtonsContainer>
    </Page>
  );
}

const ButtonsContainer = styled(View)`
  width: 100%;
  height: 100%;
`;

const LoginButton = styled(Pressable)`
  background: ${({ theme }) => theme.colors.background.secondary};
  width: 200px;
  height: 50px;
  margin: 10px;
  box-shadow: ${({ theme }) => theme.shadow.big};
  border: 1px solid grey;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GoogleImage = styled.img`
  width: 30px;
  border-radius: 100%;
  margin-right: 10px;
`;

const AnonymousImage = styled(GiNinjaMask)`
  color: ${({ theme }) => theme.colors.font.primary};
  border-radius: 100%;
  margin-right: 7px;
`;
