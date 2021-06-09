import styled from 'styled-components';
import { Typography } from './Typography';

export const ErrorMessage = styled(Typography)`
  color: ${({ theme }) => theme.colors.common.red};
`;
