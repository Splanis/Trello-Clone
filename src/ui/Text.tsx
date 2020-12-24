import React, { CSSProperties } from 'react';

type Props = {
  text: string;
  fontSize?: number;
  color?: string;
  style?: CSSProperties;
};

export function Text({ text, color = 'black', fontSize = 16, style }: Props) {
  return <div style={{ fontSize, color, ...style }}>{text}</div>;
}
