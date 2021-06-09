import { styled } from '../theme/theme';

type Props = {
  align?: 'center' | 'flex-start' | 'flex-end' | 'stretch';
  column?: boolean;
  noWrap?: boolean;
  justify?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-evenly'
    | 'space-around';
  ref?: any;
};

export const View = styled.div<Props>`
  display: flex;
  align-items: ${({ align }) => align ?? 'center'};
  justify-content: ${({ justify }) => justify ?? 'center'};
  flex-direction: ${({ column }) => (column ? 'column' : 'row')};
  flex-wrap: ${({ noWrap }) => (noWrap ? 'nowrap' : 'wrap')};
`;
