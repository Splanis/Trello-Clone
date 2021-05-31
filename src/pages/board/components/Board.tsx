import React, { CSSProperties, useEffect, useMemo, useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { List } from '../../../models/Board';
import { loadBoard } from '../../../redux/middlewares/board';
import { moveCard, moveList } from '../../../redux/modules/board';
import { unloadBoard } from '../../../redux/modules/board.actions';
import {
  selectAllLists,
  selectBoard,
  selectBoardError,
  selectBoardIsLoading
} from '../../../redux/modules/board.selectors';
import { saveBoard } from '../../../services/saveBoard';
import { Button } from '../../../ui-components/Button';
import { Input } from '../../../ui-components/Input';
import { Spinner } from '../../../ui-components/Spinner';
import { Text } from '../../../ui-components/Text';
import { theme } from '../../../ui-components/theme';
import { View } from '../../../ui-components/View';
import { useBoardUIState } from '../context/BoardModalProvider';
import { BoardModals } from './BoardModals';
import { ListView } from './ListView';

export function Board({ id }: { id: string }) {
  const dispatch = useDispatch();
  const lists = useSelector(selectAllLists);
  const isLoading = useSelector(selectBoardIsLoading);
  const error = useSelector(selectBoardError);
  const board = useSelector(selectBoard);
  const { openNewListModal } = useBoardUIState();
  const [query, setQuery] = useState('');
  const listsToDisplay = useMemo(() => {
    if (!query) return lists;

    return filterListsByQuery(lists, query);
  }, [lists, query]);

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
    dispatch(loadBoard({ boardId: id }));

    return () => {
      dispatch(unloadBoard());
    };
  }, [id, dispatch]);

  useEffect(() => {
    if (!board) return;

    saveBoard(board);
  }, [board, dispatch]);

  if (error) return <View page>{error}</View>;

  if (isLoading || !board)
    return (
      <View page>
        <Spinner />
      </View>
    );

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <View
        page
        justify="flex-start"
        align="flex-start"
        direction="column"
        style={styles.container}>
        <View style={styles.header}>
          <Text fontSize={30} text={board.name} style={{ marginRight: 20 }} />
          <Input value={query} onChange={setQuery} placeholder="search..." />
        </View>
        <View align="flex-start" justify="flex-start">
          <Droppable
            droppableId="droppable-board"
            type="droppable-list"
            direction="horizontal">
            {(provided) => (
              <div ref={provided.innerRef}>
                <View style={styles.lists}>
                  {listsToDisplay.map((list, index) => (
                    <ListView key={list.id} list={list} index={index} />
                  ))}
                  {provided.placeholder}
                </View>
              </div>
            )}
          </Droppable>
          <Button
            variant="alternative"
            title="+ Add New List"
            onClick={openNewListModal}
            style={{ width: 250 }}
          />
        </View>
      </View>
      <BoardModals />
    </DragDropContext>
  );
}

const filterListsByQuery = (lists: List[], query: string) =>
  lists.reduce<List[]>((acc, list) => {
    const cardsIncludeQuery = list.cards.filter((card) =>
      card.name.toUpperCase().includes(query.toUpperCase())
    );
    if (cardsIncludeQuery.length > 0)
      return [...acc, { ...list, cards: cardsIncludeQuery }];

    return acc;
  }, []);

type Styles = {
  container: CSSProperties;
  addListButton: CSSProperties;
  addListButtonText: CSSProperties;
  lists: CSSProperties;
  header: CSSProperties;
};

const styles: Styles = {
  container: { padding: '80px 20px 20px 20px', overflowX: 'scroll' },
  header: { marginBottom: 20, alignSelf: 'center' },
  lists: { display: 'flex', alignItems: 'flex-start' },
  addListButton: {
    padding: '0 20px',
    margin: '0 30px 0 10px',
    boxShadow: theme.shadow.primary,
    fontSize: '1.3rem',
    fontWeight: 700,
    borderRadius: '20px',
    backgroundColor: theme.colors.alternative,
    width: '250px',
    height: '50px',
    cursor: 'pointer'
  },
  addListButtonText: { color: theme.colors.primary }
};
