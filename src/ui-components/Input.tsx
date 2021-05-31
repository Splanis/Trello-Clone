import React from 'react';
import styled from 'styled-components';
import { theme } from './theme';

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
  background-color: ${theme.colors.gray};
  padding: 10px 15px;
  border-radius: 16px;
  border: none;
  font-size: 18px;
  &:focus,
  &:focus,
  &:focus {
    outline: none;
  }
`;
