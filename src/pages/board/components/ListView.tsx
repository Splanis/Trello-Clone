import React, { useMemo, useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { HiPlusSm } from 'react-icons/hi';
import { List } from '../../../models/Board';
import { styled } from '../../../theme/theme';
import { Button } from '../../../ui-components/Button';
import { Typography } from '../../../ui-components/Typography';
import { View } from '../../../ui-components/View';
import { useBoard } from '../BoardProvider';
import {
  openDeleteCardSidebar,
  openDeleteListSidebar,
  openNewCardSidebar
} from '../boardState';
import { CardView } from './CardView';
import { ExpandedSettings } from './ExpandedSettings';

type Props = {
  list: List;
  index: number;
};

export function ListView({ list, index }: Props) {
  const { dispatch } = useBoard();
  const issues = useMemo(() => list.cards.length.toString(), [list.cards.length]);
  const [hasExpandedSettings, setHasExpandedSettings] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const toggleIsEditing = () => setIsEditing((prev) => !prev);
  const toggleHasExpandedSettings = () => {
    setIsEditing(false);
    setHasExpandedSettings((prev) => !prev);
  };

  return (
    <Draggable key={list.id} draggableId={list.id} index={index}>
      {(provided, snapshot) => (
        <ListStyled
          isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.draggableProps}>
          <Header justify="space-between" align="flex-start" noWrap>
            <TitleContainer justify="flex-start">
              {isEditing ? (
                <EditingInput value={list.name} autoFocus />
              ) : (
                <View>
                  <Title size="large" {...provided.dragHandleProps}>
                    {list.name}
                  </Title>
                  {/* <Issues>({issues})</Issues> */}
                </View>
              )}
            </TitleContainer>
            <Settings
              hasExpandedSettings={hasExpandedSettings}
              onDelete={() => dispatch(openDeleteListSidebar(list.id))}
              toggleHasExpandedSettings={toggleHasExpandedSettings}
              toggleIsEditing={toggleIsEditing}
            />
          </Header>
          <Droppable droppableId={list.id} type="droppable-cards" direction="vertical">
            {(provided, snapshot) => (
              <CardsContainer
                isDraggingOver={snapshot.isDraggingOver}
                ref={provided.innerRef}>
                {list.cards.map((card, index) => (
                  <CardView
                    key={card.id}
                    card={card}
                    listId={list.id}
                    index={index}
                    onDelete={() =>
                      dispatch(
                        openDeleteCardSidebar({ listId: list.id, cardId: card.id })
                      )
                    }
                  />
                ))}
                {provided.placeholder}
              </CardsContainer>
            )}
          </Droppable>
          <Button onClick={() => dispatch(openNewCardSidebar(list.id))}>
            <HiPlusSm /> Add New Card
          </Button>
        </ListStyled>
      )}
    </Draggable>
  );
}

const ListStyled = styled.div<{ isDragging: boolean }>`
  display: flex;
  flex-direction: column;
  box-shadow: ${({ isDragging, theme }) =>
    isDragging ? theme.shadow.big : theme.shadow.primary};
  border-radius: 2px;
  background-color: ${({ theme }) => theme.colors.background.alternative};
  padding: 20px 5px;
  width: 300px;
  margin: 0 10px;
  max-height: 100%;
`;

const CardsContainer = styled.div<{ isDraggingOver: boolean }>`
  background: ${({ theme, isDraggingOver }) =>
    isDraggingOver
      ? `repeating-linear-gradient(
    45deg,
    ${theme.colors.background.alternative},
    ${theme.colors.background.alternative} 5px,
    ${theme.colors.background.secondary} 5px,
    ${theme.colors.background.secondary} 10px
  );`
      : theme.colors.background.alternative};
  display: flex;
  flex-direction: column;
  margin: 10px 0;
  min-height: 1px;
  overflow-y: scroll;
  padding: 0 10px;
`;

const Header = styled(View)`
  padding: 0 10px;
`;

const EditingInput = styled.textarea`
  width: 170px;
  resize: none;
  display: flex;
  align-items: center;
  outline: 0;
  background-color: ${({ theme }) => theme.colors.background.alternative};
  color: ${({ theme }) => theme.colors.font.primary};
  font-size: ${({ theme }) => theme.sizing.font.large};
  font-weight: 700;
  font-family: ${({ theme }) => theme.fonts.primary};
  border: none;
  height: auto;
  overflow: hidden;
`;

const Issues = styled(Typography)`
  font-weight: 400;
  margin-left: 5px;
`;

const Title = styled(Typography)`
  font-weight: 700;
  text-align: left;
  word-break: 'break-all';
`;

const TitleContainer = styled(View)`
  width: 170px;
`;

const Settings = styled(ExpandedSettings)`
  width: 100px;
`;
