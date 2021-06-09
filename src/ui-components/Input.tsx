import React from 'react';
import { styled } from '../theme/theme';

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function Input({ value, onChange, placeholder }: Props) {
  return (
    <InputStyled
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
}

const InputStyled = styled.input`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  color: ${({ theme }) => theme.colors.font.primary};
  font-size: ${({ theme }) => theme.sizing.font.base};
  padding: 6px 12px;
  border-radius: 2px;
  width: 100%;
  border: none;
  &:focus,
  &:focus,
  &:focus {
    outline: none;
  }
`;
