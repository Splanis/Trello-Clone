import { styled } from '../theme/theme';

type Props = { onClick: () => void };

export const Pressable = styled.div<Props>`
  cursor: pointer;
`;
