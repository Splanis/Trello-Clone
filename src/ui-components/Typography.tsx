import { styled } from '../theme/theme';

type Size = 'base' | 'small' | 'large' | 'veryLarge';
export const Typography = styled.div<{ size?: Size }>`
  color: ${({ theme }) => theme.colors.font.primary};
  font-size: ${({ theme, size }) => theme.sizing.font[size ?? 'base']};
  text-align: center;
`;
