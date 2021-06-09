import React from 'react';
import { CgDarkMode } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import { useToggleTheme } from '../providers/ThemeProvider';
import { styled } from '../theme/theme';
import { ButtonContainer } from '../ui-components/ButtonContainer';
import { Pressable } from '../ui-components/Pressable';
import { Typography } from '../ui-components/Typography';
import { View } from '../ui-components/View';

export function NavigationBar() {
  const { isAuthenticated, username } = useAuth();
  const toggleTheme = useToggleTheme();

  console.log(isAuthenticated);

  return (
    <Navigation justify="space-between">
      <LinkStyled to="/">
        <Logo size="veryLarge">Trello Clone</Logo>
      </LinkStyled>

      {isAuthenticated ? (
        <ButtonsContainer>
          <Pressable onClick={toggleTheme}>
            <ThemeToggleButton size={30} />
          </Pressable>
          {username && <ButtonContainer variant="primary">{username}</ButtonContainer>}
          <LinkStyled to="/logout">
            <ButtonContainer variant="secondary">Logout</ButtonContainer>
          </LinkStyled>
        </ButtonsContainer>
      ) : (
        <ButtonsContainer>
          <Pressable onClick={toggleTheme}>
            <ThemeToggleButton size={30} />
          </Pressable>
          <LinkStyled to="/login">
            <ButtonContainer variant="secondary">Login</ButtonContainer>
          </LinkStyled>
        </ButtonsContainer>
      )}
    </Navigation>
  );
}

const Navigation = styled(View)`
  padding-right: 20px;
  width: 100%;
  position: fixed;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.background.alternative};
`;

const Logo = styled(Typography)`
  font-size: 40px;
  margin-left: 10px;
  color: ${({ theme }) => theme.colors.font.primary};
`;

const ButtonsContainer = styled(View)`
  & > * {
    margin: 0 5px;
  }
`;

const ThemeToggleButton = styled(CgDarkMode)`
  color: ${({ theme }) => theme.colors.font.primary};
  margin-top: 3px;
`;

const LinkStyled = styled(Link)`
  text-decoration: none;

  &:visited {
    color: inherit;
  }
`;
