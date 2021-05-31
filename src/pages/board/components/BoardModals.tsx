import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteCard, deleteList } from '../../../redux/modules/board';
import { AcknowledgementModal } from '../../../ui-components/AcknowledgementModal';
import { useBoardUIState } from '../context/BoardModalProvider';
import { BoardStatus } from '../context/boardUIState';
import { CreateCardModal } from './CreateCardModal';
import { CreateListModal } from './CreateListModal';

export function BoardModals() {
  const dispatch = useDispatch();
  const { status, listId, cardId, closeModal } = useBoardUIState();

  const handleDeleteList = () => {
    if (!listId) return;

    dispatch(deleteList({ listId }));

    closeModal();
  };

  const handleDeleteCard = () => {
    if (!cardId || !listId) return;

    dispatch(deleteCard({ listId, cardId }));

    closeModal();
  };

  if (status === BoardStatus.CREATING_NEW_CARD) return <CreateCardModal />;

  if (status === BoardStatus.CREATING_NEW_LIST) return <CreateListModal />;

  if (status === BoardStatus.DELETING_LIST)
    return (
      <AcknowledgementModal
        isVisible
        text="Are you sure you want to delete this list?"
        onClose={closeModal}
        onYes={handleDeleteList}
      />
    );

  if (status === BoardStatus.DELETING_CARD)
    return (
      <AcknowledgementModal
        isVisible
        text="Are you sure you want to delete this card?"
        onClose={closeModal}
        onYes={handleDeleteCard}
      />
    );

  return null;
}
