import { styled } from '../theme/theme';

type Variant = 'primary' | 'secondary' | 'alternative';

type Props = {
  variant?: Variant;
  stretched?: boolean;
};

export const ButtonContainer = styled.div<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.black};
  padding: 8px 26px;
  width: ${({ stretched }) => (stretched ? '100%' : 'auto')};
  font-size: ${({ theme }) => theme.sizing.font.base};
  border-radius: 20px;
  background-color: ${({ theme, variant }) => theme.colors[variant ?? 'primary']};
  color: ${({ theme, variant }) =>
    variant === 'secondary' ? theme.colors.black : theme.colors.white};
`;
