import React, { useEffect, useMemo } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { HiPlusSm } from 'react-icons/hi';
import styled, { keyframes } from 'styled-components';
import { getBoardCollection } from '../../../firebase/collections';
import { saveBoardToFirestore } from '../../../firebase/services/board';
import { isBoard, List } from '../../../models/Board';
import { Theme } from '../../../theme/theme';
import { Button } from '../../../ui-components/Button';
import { View } from '../../../ui-components/View';
import { useBoard } from '../BoardProvider';
import {
  loadBoardFailed,
  loadBoardStarted,
  loadBoardSuccessful,
  moveCard,
  moveList,
  openNewListSidebar,
  selectBoard,
  selectBoardError,
  selectBoardLoading,
  selectBoardQuery,
  selectSidebarStatus,
  unloadBoard
} from '../boardState';
import './animation.css';
import { ListView } from './ListView';

export function Board({ id }: { id: string }) {
  const { state, dispatch } = useBoard();
  const board = selectBoard(state);
  const error = selectBoardError(state);
  const isLoading = selectBoardLoading(state);
  const query = selectBoardQuery(state);
  const sidebarStatus = selectSidebarStatus(state);

  const listsToDisplay = useMemo(() => {
    if (!query) return board?.lists || [];

    return filterCardsByQuery(query, board?.lists) || [];
  }, [board?.lists, query]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    if (result.type === 'droppable-list') {
      dispatch(
        moveList({
          sourceIdx: result.source.index,
          destinationIdx: result.destination.index
        })
      );
    }

    if (result.type === 'droppable-cards') {
      dispatch(
        moveCard({
          sourceId: result.source.droppableId,
          sourceIdx: result.source.index,
          destinationId: result.destination.droppableId,
          destinationIdx: result.destination.index,
          draggableId: result.draggableId
        })
      );
    }
  };

  useEffect(() => {
    dispatch(loadBoardStarted());

    const unsubscribe = getBoardCollection(id).onSnapshot(
      (snapshot) => {
        const doc = snapshot.data();
        if (isBoard(doc)) return dispatch(loadBoardSuccessful(doc));
        return dispatch(loadBoardFailed('Something went wrong'));
      },
      (error) => dispatch(loadBoardFailed(error.message))
    );

    return () => {
      unsubscribe();
    };
  }, [id, dispatch]);

  useEffect(() => {
    if (!board) return;

    saveBoardToFirestore(board);
  }, [board, dispatch]);

  useEffect(() => {
    return () => dispatch(unloadBoard());
  }, [dispatch]);

  if (error) return <View style={{ alignSelf: 'center', width: '100%' }}>{error}</View>;

  if (isLoading) return <Skeleton />;

  return (
    <BoardContainer noWrap justify="flex-start" align="flex-start">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable
          droppableId="droppable-board"
          type="droppable-list"
          direction="horizontal">
          {(provided) => (
            <View
              ref={provided.innerRef}
              align="flex-start"
              noWrap
              style={{ height: '100%' }}>
              {listsToDisplay.map((list, index) => (
                <ListView key={list.id} list={list} index={index} />
              ))}
              {provided.placeholder}
            </View>
          )}
        </Droppable>
        <Button
          style={{ width: 300, margin: '0 10px', padding: 12 }}
          variant="secondary"
          onClick={() => dispatch(openNewListSidebar())}>
          <>
            <HiPlusSm />
            Add New List
          </>
        </Button>
      </DragDropContext>
    </BoardContainer>
  );
}

function Skeleton() {
  return (
    <View justify="flex-start" align="flex-start" style={{ marginTop: 50, padding: 30 }}>
      <SkeletonList height={250} />
      <SkeletonList height={500} />
      <SkeletonList height={350} />
      <SkeletonList height={450} />
    </View>
  );
}

const filterCardsByQuery = (query: string, lists?: List[]) =>
  lists?.reduce<List[]>((acc, list) => {
    const cardsIncludeQuery = list.cards.filter((card) =>
      card.name.toUpperCase().includes(query.toUpperCase())
    );
    if (cardsIncludeQuery.length > 0)
      return [...acc, { ...list, cards: cardsIncludeQuery }];

    return acc;
  }, []);

const loadAnimation = (theme: Theme) => keyframes`
  0% {
    background-color: ${theme.colors.background.alternative};
  },
  50% {
    background-color: ${theme.colors.background.secondary};
  },
  100% {
    background-color: ${theme.colors.background.alternative};
  }
`;

// marginTop: sidebarStatus !== SidebarStatus.HIDDEN ? 0 : 40
//  paddingLeft: sidebarStatus !== SidebarStatus.HIDDEN ? 300 : 30,
const BoardContainer = styled(View)`
  padding: 20px;
  padding-top: 60px;
  height: 100%;
  width: 100%;
`;

const SkeletonList = styled.div<{ height: number }>`
  border-radius: 20px;
  width: 300px;
  height: ${(props) => `${props.height}px`};
  margin: 0 10px;
  animation: ${({ theme }) => loadAnimation(theme)} 2s infinite;
`;
