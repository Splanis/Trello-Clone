import React, { useCallback, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useBoard } from '../BoardProvider';
import {
  closeSidebar,
  editCard,
  LabelColor,
  saveCard,
  selectBoardMembers,
  selectViewingCard
} from '../boardState';
import { CardContentSidebar } from './CardContentSidebar';

export function ViewingCardSidebar() {
  const { dispatch, state } = useBoard();
  const card = selectViewingCard(state);
  const members = selectBoardMembers(state);
  const [label, setLabel] = useState('');
  const [color, setColor] = useState<LabelColor>('green');
  const [nameError, setNameError] = useState<string>();
  const [labelError, setLabelError] = useState<string>();

  const addLabel = useCallback(() => {
    if (!card) return;
    dispatch(
      editCard({ ...card, labels: [...card.labels, { label, color, id: uuid() }] })
    );
  }, [card, color, label, dispatch]);

  const deleteLabel = useCallback(
    (labelToDelete: string) => {
      if (!card) return;
      dispatch(
        editCard({
          ...card,
          labels: card.labels.filter((l) => l.label !== labelToDelete)
        })
      );
    },
    [card, dispatch]
  );

  const changeName = useCallback(
    (name: string) => {
      if (!card) return;
      dispatch(editCard({ ...card, name }));
    },
    [card, dispatch]
  );

  const changeDescription = useCallback(
    (description: string) => {
      if (!card) return;
      dispatch(editCard({ ...card, description }));
    },
    [card, dispatch]
  );

  const handleSaveCard = useCallback(() => {
    if (!card?.name) {
      setNameError('Card Name can not be empty!');
    } else {
      dispatch(saveCard());
    }
  }, [dispatch, card?.name]);

  if (!card || !members) return null;

  return (
    <CardContentSidebar
      title={card.id}
      name={card.name}
      labels={card.labels}
      description={card.description}
      assignee={card.assignee}
      members={members}
      label={label}
      color={color}
      nameError={nameError}
      labelError={labelError}
      onYes={handleSaveCard}
      onClose={() => dispatch(closeSidebar())}
      onChangeName={changeName}
      onChangeLabel={(text) => {
        setLabel(text);
        if (labelError) setLabelError(undefined);
      }}
      addLabel={addLabel}
      onChangeColor={setColor}
      onChangeDescription={changeDescription}
      deleteLabel={deleteLabel}
      onCloseLabel="Cancel"
      onYesLabel="Save"
    />
  );
}
