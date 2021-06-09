import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Card } from '../../../models/Board';
import { styled } from '../../../theme/theme';
import { Typography } from '../../../ui-components/Typography';
import { View } from '../../../ui-components/View';
import { useBoard } from '../BoardProvider';
import { deleteLabel, openViewCardSidebar } from '../boardState';
import { ExpandedSettings } from './ExpandedSettings';
import { Label } from './Label';
import { Pressable } from '../../../ui-components/Pressable';

type Props = {
  card: Card;
  listId: string;
  index: number;
  onDelete: () => void;
};

export function CardView({ card, listId, index, onDelete }: Props) {
  const { dispatch } = useBoard();
  const [hasExpandedSettings, setHasExpandedSettings] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const toggleIsEditing = () => setIsEditing((prev) => !prev);
  const toggleHasExpandedSettings = () => {
    setIsEditing(false);
    setHasExpandedSettings((prev) => !prev);
  };

  return (
    <Draggable key={card.id} draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <CardStyled
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={snapshot.isDragging}>
          <View justify="space-between" style={{ marginBottom: 15 }}>
            <Pressable onClick={() => dispatch(openViewCardSidebar({ card, listId }))}>
              <CardName>{card.name}</CardName>
            </Pressable>
          </View>
          {hasLabels(card.labels) && (
            <View justify="flex-start" style={{ flexWrap: 'wrap', marginTop: 10 }}>
              {card.labels.map((l) => (
                <Label
                  key={l.label}
                  color={l.color}
                  label={l.label}
                  canDelete={isEditing}
                  onDelete={() => {
                    dispatch(deleteLabel({ labelId: l.id, cardId: card.id, listId }));
                  }}
                />
              ))}
            </View>
          )}
          <View
            justify="space-between"
            style={{ marginLeft: 5, marginTop: 15, width: '100%' }}>
            {/* <CardId size="small">{card.id}</CardId> */}
            {card.assignee ? (
              <div>
                <AssigneePhoto src={card.assignee?.photo} alt="user_image" />
              </div>
            ) : (
              <div />
            )}
            <ExpandedSettings
              hasExpandedSettings={hasExpandedSettings}
              onDelete={onDelete}
              toggleHasExpandedSettings={toggleHasExpandedSettings}
              toggleIsEditing={toggleIsEditing}
            />
          </View>
        </CardStyled>
      )}
    </Draggable>
  );
}

const hasLabels = <T,>(labels: T[]) => labels.length > 0;

const CardStyled = styled.div<{ isDragging: boolean }>`
  padding: 15px;
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-radius: 2px;
  margin: 5px;
  box-shadow: ${({ isDragging, theme }) =>
    isDragging ? theme.shadow.big : theme.shadow.primary};
`;

const AssigneePhoto = styled.img`
  width: 22px;
  height: 22px;
  border-radius: 100%;
  margin-left: 5px;
`;

const CardName = styled(Typography)`
  word-break: break-all;
`;

const CardId = styled(Typography)`
  font-weight: 400;
`;
