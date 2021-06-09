import React, { ComponentProps } from 'react';
import { ButtonContainer } from './ButtonContainer';
import { Pressable } from './Pressable';

type Props = ComponentProps<typeof ButtonContainer> & ComponentProps<typeof Pressable>;

export function Button({ variant, stretched, onClick, children, style }: Props) {
  return (
    <Pressable onClick={onClick}>
      <ButtonContainer variant={variant} stretched={stretched} style={style}>
        {children}
      </ButtonContainer>
    </Pressable>
  );
}
