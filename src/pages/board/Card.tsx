import React, { CSSProperties } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { ICard } from '../../redux/models/Board';
import { Text } from '../../ui/Text';
import { theme } from '../../ui/theme';
import { View } from '../../ui/View';

type Props = {
  card: ICard;
  index: number;
  onClick?: () => void;
};

export function Card(props: Props) {
  const { card, index, onClick } = props;

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <CardStyled
          onClick={onClick}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={snapshot.isDragging}>
          <Text text={card.name} style={styles.text} />
          <View justify="flex-start" style={styles.card}>
            {card.labels &&
              card.labels.map((l) => (
                <Text
                  style={{ ...styles.label, backgroundColor: l.color }}
                  text={l.label}
                />
              ))}
          </View>
        </CardStyled>
      )}
    </Draggable>
  );
}

// QUICK-FIX: Can't add inline styles
const CardStyled = styled.div<{ isDragging: boolean }>`
  padding: 10px;
  background: ${theme.colors.light};
  border-radius: 6px;
  margin: 10px;
  box-shadow: ${({ isDragging }) => isDragging && theme.shadow.big};
`;

type Styles = {
  card: CSSProperties;
  label: CSSProperties;
  text: CSSProperties;
};

const styles: Styles = {
  // card: {
  //   padding: '10px',
  //   borderRadius: '6px',
  //   margin: '10px'
  // },
  card: { marginTop: 10 },
  text: {
    wordBreak: 'break-all'
  },

  label: {
    margin: '0 5px',
    padding: '2px 12px',
    borderRadius: 30,
    color: 'white'
  }
};
