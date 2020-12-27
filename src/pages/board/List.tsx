import React, { CSSProperties, useMemo } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { IList } from '../../redux/models/Board';
import { Text } from '../../ui/Text';
import { theme } from '../../ui/theme';
import { View } from '../../ui/View';
import { Card } from './Card';

type Props = {
  list: IList;
  index: number;
  onClick: () => void;
};

export function List(props: Props) {
  const { list, index, onClick } = props;

  const issues = useMemo(
    () => `${list.cards.length} ${list.cards.length === 1 ? 'issue' : 'issues'}`,
    [list.cards.length]
  );

  return (
    <Draggable key={list.id} draggableId={list.id} index={index}>
      {(provided) => (
        <ListStyled ref={provided.innerRef} {...provided.draggableProps}>
          <View justify="space-between" style={styles.header}>
            <div style={styles.title} {...provided.dragHandleProps}>
              {list.name}
            </div>
            <Text text={issues} />
          </View>
          <View onClick={onClick} style={styles.addCardButton}>
            <Text text="+ Add New Card" style={styles.addCardButtonText} />
          </View>
          <Droppable droppableId={list.id} type="droppable-cards" direction="vertical">
            {(provided, snapshot) => (
              <div
                style={{
                  ...styles.cards,
                  backgroundColor: snapshot.isDraggingOver
                    ? theme.colors.primary
                    : theme.colors.secondary
                }}
                ref={provided.innerRef}>
                {list.cards.map((card, index) => (
                  <Card key={card.id} card={card} index={index} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </ListStyled>
      )}
    </Draggable>
  );
}

// QUICK-FIX: Can't add inline styles
const ListStyled = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: ${theme.shadow.primary};
  border-radius: 20px;
  background-color: ${theme.colors.secondary};
  padding: 20px 0;
  width: 250px;
  margin: 0 10px;
`;

type Styles = {
  container: CSSProperties;
  title: CSSProperties;
  header: CSSProperties;
  cards: CSSProperties;
  addCardButton: CSSProperties;
  addCardButtonText: CSSProperties;
};

const styles: Styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    boxShadow: theme.shadow.primary,
    borderRadius: '20px',
    backgroundColor: theme.colors.primary,
    padding: '20px 0',
    width: '250px',
    margin: '0 10px'
  },
  title: {
    fontSize: '1.3rem',
    fontWeight: 700,
    flex: 2,
    wordBreak: 'break-all'
  },
  header: { padding: '0 10px' },
  cards: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: 1,
    scrollbarWidth: 'thin',
    scrollbarColor: `${theme.colors.dark} ${theme.colors.primary}`
  },
  addCardButton: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    margin: 10,
    borderRadius: 6
  },
  addCardButtonText: { color: theme.colors.white }
};
