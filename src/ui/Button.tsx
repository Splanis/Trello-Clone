import React, { CSSProperties } from 'react';
import { theme } from './theme';

type Props = {
  title: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'alternative';
};

export function Button({ title, variant = 'primary', onClick }: Props) {
  return (
    <button
      style={{ ...button, backgroundColor: theme.colors[variant] }}
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
