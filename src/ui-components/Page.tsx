import { styled } from '../theme/theme';

export const Page = styled.div`
  height: 100vh;
  min-width: 100%;
  padding-top: 60px;
  background-color: ${({ theme }) => theme.colors.background.primary};
`;
