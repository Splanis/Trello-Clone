import React, { CSSProperties } from 'react';
import { theme } from './theme';

type Variant = 'primary' | 'secondary' | 'alternative' | 'white';

type Props = {
  title: string;
  onClick?: () => void;
  variant?: Variant;
  style?: CSSProperties;
};

export function Button({ title, variant = 'primary', onClick, style }: Props) {
  return (
    <button
      style={{
        ...button,
        backgroundColor: theme.colors[variant],
        ...getButtonColor(variant),
        ...style
      }}
      onClick={onClick}>
      {title}
    </button>
  );
}

const getButtonColor = (variant: Variant) => {
  if (variant === 'white' || variant === 'alternative')
    return { color: theme.colors.black };

  return { color: theme.colors.white };
};

const button: CSSProperties = {
  border: 'none',
  color: 'black',
  padding: '8px 20px',
  fontSize: '18px',
  minWidth: '100px',
  borderRadius: '20px',
  cursor: 'pointer'
};
