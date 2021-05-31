import React, { CSSProperties, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  align?: 'center' | 'flex-start' | 'flex-end' | 'stretch';
  direction?: 'row' | 'column';
  justify?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-evenly'
    | 'space-around';
  style?: CSSProperties;
  page?: boolean;
  onClick?: (i?: any) => void;
  ref?: any;
};

export function View(props: Props) {
  const {
    children,
    page = false,
    align = 'center',
    justify = 'center',
    direction = 'row',
    style,
    onClick
  } = props;

  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        height: page ? '100vh' : 'auto',
        cursor: onClick && 'pointer',
        alignItems: align,
        justifyContent: justify,
        flexDirection: direction,
        ...style
      }}>
      {children}
    </div>
  );
}
