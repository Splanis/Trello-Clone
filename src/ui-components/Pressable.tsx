import React, { CSSProperties, ReactNode } from 'react';

type Props = { onClick: () => void; children: ReactNode; style?: CSSProperties };

export function Pressable({ onClick, children, style }: Props) {
  return (
    <div onClick={onClick} style={style}>
      {children}
    </div>
  );
}
