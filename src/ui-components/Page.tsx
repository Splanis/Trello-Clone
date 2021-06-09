import { styled } from '../theme/theme';

export const Page = styled.div`
  /* display: flex; */
  height: 100vh;
  min-width: 100%;
  padding-top: 60px;
  /* justify-content: flex-start;
  align-items: flex-start; */
  /* justify-content: flex-start;
  align-items: center; */
  /* flex-direction: column; */
  background-color: ${({ theme }) => theme.colors.background.primary};
`;
