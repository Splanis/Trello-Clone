import React, { CSSProperties } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { FaTrash } from 'react-icons/fa';
import styled from 'styled-components';
import { Card } from '../../../models/Board';
import { Pressable } from '../../../ui-components/Pressable';
import { Text } from '../../../ui-components/Text';
import { theme } from '../../../ui-components/theme';
import { View } from '../../../ui-components/View';

type Props = {
  card: Card;
  index: number;
  onDelete: () => void;
};

export function CardView({ card, index, onDelete }: Props) {
  return (
    <Draggable key={card.id} draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <CardStyled
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={snapshot.isDragging}>
          <View justify="space-between" style={{ margin: 8 }}>
            <Text text={card.name} style={styles.text} />
          </View>
          {hasLabels(card.labels) && (
            <View justify="flex-start" style={{ flexWrap: 'wrap' }}>
              {card.labels.map((l) => (
                <Text
                  key={l.label}
                  style={{ ...styles.label, backgroundColor: l.color }}
                  text={l.label}
                />
              ))}
            </View>
          )}
          <View justify="flex-end" style={{ marginLeft: 5 }}>
            <Pressable onClick={onDelete}>
              <FaTrash size={22} />
            </Pressable>

            {card.assignee && (
              <div>
                <AssigneePhoto src={card.assignee?.photo} alt="user_image" />
              </div>
            )}
          </View>
        </CardStyled>
      )}
    </Draggable>
  );
}

const hasLabels = <T,>(labels: T[]) => labels.length > 0;

const CardStyled = styled.div<{ isDragging: boolean }>`
  padding: 10px;
  background: ${theme.colors.gray};
  border-radius: 2px;
  margin: 15px 5px;
  box-shadow: ${({ isDragging }) => isDragging && theme.shadow.big};
`;

const AssigneePhoto = styled.img`
  width: 22px;
  height: 22px;
  border-radius: 100%;
  margin-left: 5px;
`;

type Styles = {
  card: CSSProperties;
  label: CSSProperties;
  text: CSSProperties;
};

const styles: Styles = {
  card: { marginTop: 20 },
  text: {
    wordBreak: 'break-all'
  },
  label: {
    margin: '3px',
    padding: '2px 12px',
    borderRadius: 30,
    color: 'white',
    opacity: 0.7
  }
};
