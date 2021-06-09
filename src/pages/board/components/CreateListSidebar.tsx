import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { styled } from '../../../theme/theme';
import { ErrorMessage } from '../../../ui-components/ErrorMessage';
import { Input } from '../../../ui-components/Input';
import { View } from '../../../ui-components/View';
import { useBoard } from '../BoardProvider';
import { closeSidebar, createNewList } from '../boardState';
import { TitleWithTwoButtons } from './TitleWithTwoButtons';

export function CreateListSidebar() {
  const { dispatch } = useBoard();
  const [name, setName] = useState('');
  const [error, setError] = useState<string>();

  const handleCreateNewList = () => {
    if (!name) {
      setError('Field can not be empty!');
    } else {
      dispatch(
        createNewList({
          name: name,
          id: uuid(),
          cards: []
        })
      );
    }
  };

  return (
    <TitleWithTwoButtons
      title="Create new list"
      onClose={() => dispatch(closeSidebar())}
      onYes={handleCreateNewList}
      onCloseLabel="Cancel"
      onYesLabel="Create">
      <InputContainer>
        <Input
          value={name}
          placeholder="name"
          onChange={(text) => {
            setName(text);
            if (error) setError(undefined);
          }}
        />
      </InputContainer>
      {error && <ErrorMessageStyled>{error}</ErrorMessageStyled>}
    </TitleWithTwoButtons>
  );
}

const InputContainer = styled(View)`
  margin-top: 20px;
  width: 100%;
`;

const ErrorMessageStyled = styled(ErrorMessage)`
  margin-top: 10px;
`;
