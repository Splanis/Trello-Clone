import React, { CSSProperties, useMemo } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { FaTrash } from 'react-icons/fa';
import styled from 'styled-components';
import { List } from '../../../models/Board';
import { Pressable } from '../../../ui-components/Pressable';
import { theme } from '../../../ui-components/theme';
import { View } from '../../../ui-components/View';
import { Button } from '../../../ui-components/Button';
import { useBoardUIState } from '../context/BoardModalProvider';
import { CardView } from './CardView';

type Props = {
  list: List;
  index: number;
};

export function ListView({ list, index }: Props) {
  const {
    openDeleteListModal,
    openNewCardModal,
    openDeleteCardModal
  } = useBoardUIState();
  const issues = useMemo(() => list.cards.length.toString(), [list.cards.length]);

  return (
    <Draggable key={list.id} draggableId={list.id} index={index}>
      {(provided, snapshot) => (
        <ListStyled
          isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.draggableProps}>
          <View justify="space-between" style={styles.header}>
            <View>
              <TitleView {...provided.dragHandleProps}>{list.name}</TitleView>
              <IssuesView>({issues})</IssuesView>
            </View>
            <Pressable onClick={() => openDeleteListModal(list.id)}>
              <FaTrash color="red" />
            </Pressable>
          </View>
          <Droppable droppableId={list.id} type="droppable-cards" direction="vertical">
            {(provided, snapshot) => (
              <CardsContainer
                isDraggingOver={snapshot.isDraggingOver}
                ref={provided.innerRef}>
                {list.cards.map((card, index) => (
                  <CardView
                    key={card.id}
                    card={card}
                    index={index}
                    onDelete={() =>
                      openDeleteCardModal({ listId: list.id, cardId: card.id })
                    }
                  />
                ))}
                {provided.placeholder}
              </CardsContainer>
            )}
          </Droppable>
          <Button title="+ Add New Card" onClick={() => openNewCardModal(list.id)} />
        </ListStyled>
      )}
    </Draggable>
  );
}

const ListStyled = styled.div<{ isDragging: boolean }>`
  display: flex;
  flex-direction: column;
  box-shadow: ${({ isDragging }) =>
    isDragging ? theme.shadow.big : theme.shadow.primary};
  border-radius: 20px;
  background-color: ${theme.colors.white};
  padding: 20px 10px;
  width: 250px;
  margin: 0 10px;
`;

const CardsContainer = styled.div<{ isDraggingOver: boolean }>`
  background: ${({ isDraggingOver }) =>
    isDraggingOver
      ? `repeating-linear-gradient(
    45deg,
    ${theme.colors.white},
    ${theme.colors.white} 5px,
    ${theme.colors.gray} 5px,
    ${theme.colors.gray} 10px
  );`
      : theme.colors.white};
  display: flex;
  flex-direction: column;
  margin: 10px 0;
  min-height: 1px;
  scrollbar-width: thin;
  scrollbar-color: ${theme.colors.dark} ${theme.colors.primary};
`;

const IssuesView = styled.div`
  font-size: 1.2rem;
  font-weight: 400;
  margin-left: 5px;
`;

const TitleView = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  flex: 2;
  word-break: 'break-all';
`;

type Styles = {
  title: CSSProperties;
  header: CSSProperties;
  cards: CSSProperties;
};

const styles: Styles = {
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
  }
};
