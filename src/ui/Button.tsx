import React, { CSSProperties } from 'react';
import { theme } from './theme';

type Props = {
  title: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'alternative';
  style?: CSSProperties;
};

export function Button({ title, variant = 'primary', onClick, style }: Props) {
  return (
    <button
      style={{
        ...button,
        backgroundColor: theme.colors[variant],
        color: variant === 'secondary' ? theme.colors.black : theme.colors.white,
        ...style
      }}
      onClick={onClick}>
      {title}
    </button>
  );
}

const button: CSSProperties = {
  border: 'none',
  color: 'black',
  padding: '8px 20px',
  fontSize: '18px',
  minWidth: '100px',
  borderRadius: '30px',
  cursor: 'pointer'
};
