import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { createNewList } from '../../../redux/modules/board';
import { ModalWithInput } from '../../../ui-components/ModalWithInput';
import { useBoardUIState } from '../context/BoardModalProvider';

export function CreateListModal() {
  const dispatch = useDispatch();
  const { closeModal } = useBoardUIState();
  const [listName, setListName] = useState('');

  const handleCreateNewList = () => {
    dispatch(
      createNewList({
        name: listName,
        id: uuid()
      })
    );

    closeModal();
  };

  return (
    <ModalWithInput
      isVisible
      name={listName}
      placeholder="List Name"
      onClose={closeModal}
      onCreate={handleCreateNewList}
      onChange={(e) => setListName(e.target.value)}
    />
  );
}
