import React, { CSSProperties, useEffect, useReducer } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  selectBoard,
  selectBoardError,
  selectBoardLoading
} from '../../redux/reducers/board/boardReducer';
import {
  createNewCard,
  createNewList,
  loadBoard,
  moveCard,
  moveList,
  saveBoard,
  unloadBoard
} from '../../redux/reducers/board/middleware';
import { State } from '../../redux/reducers/rootReducer';
import { selectUserId } from '../../redux/reducers/user/userReducer';
import { ModalWithInput } from '../../ui/ModalWithInput';
import { Spinner } from '../../ui/Spinner';
import { Text } from '../../ui/Text';
import { theme } from '../../ui/theme';
import { View } from '../../ui/View';
import { CreateCardModal } from './CreateCardModal';
import { List } from './List';
import {
  addLabel,
  changeCardColor,
  changeCardLabel,
  changeCardName,
  changeListName,
  closeModal,
  initialState,
  ModalStatus,
  openNewCardModal,
  openNewListModal,
  reducer,
  removeLabel,
  selectCardName,
  selectColor,
  selectLabel,
  selectLabels,
  selectListId,
  selectListName,
  selectStatus
} from './modalState';

export function Board() {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const state = useSelector((state: State) => state);
  const userId = selectUserId(state);
  const board = selectBoard(state);
  const boardLoading = selectBoardLoading(state);
  const boardError = selectBoardError(state);
  const [modalState, modalDispatch] = useReducer(reducer, initialState);
  const modalStatus = selectStatus(modalState);
  const listName = selectListName(modalState);
  const cardName = selectCardName(modalState);
  const label = selectLabel(modalState);
  const color = selectColor(modalState);
  const labels = selectLabels(modalState);
  const listId = selectListId(modalState);

  const handleDragEnd = (result: any) => {
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

  const onCloseModal = () => {
    modalDispatch(closeModal());
  };

  const onCreateNewList = () => {
    if (!listName) return;

    dispatch(
      createNewList({
        name: listName
      })
    );

    onCloseModal();
  };

  const onCreateNewCard = () => {
    if (!cardName || !listId) return;

    dispatch(
      createNewCard({
        listId,
        name: cardName,
        labels: labels
      })
    );

    onCloseModal();
  };

  useEffect(() => {
    dispatch(loadBoard({ boardId: id, userId }));

    return () => {
      dispatch(unloadBoard());
    };
  }, [id, userId, dispatch]);

  useEffect(() => {
    if (board && board.id) {
      dispatch(saveBoard({ board, id: board.id }));
    }
  }, [board, dispatch]);

  if (boardLoading)
    return (
      <View page>
        <Spinner />
      </View>
    );

  if (!board || boardError) return <View page>{boardError}</View>;

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <View
        page
        justify="flex-start"
        align="flex-start"
        direction="column"
        style={styles.container}>
        <Text fontSize={30} style={styles.title} text={board.name} />
        <View align="flex-start" justify="flex-start">
          <Droppable
            droppableId="droppable-board"
            type="droppable-list"
            direction="horizontal">
            {(provided) => (
              <div ref={provided.innerRef}>
                <View style={styles.lists}>
                  {board &&
                    board.lists.map((list, index) => (
                      <List
                        key={list.id}
                        list={list}
                        index={index}
                        onClick={() => modalDispatch(openNewCardModal(list.id))}
                      />
                    ))}
                  {provided.placeholder}
                </View>
              </div>
            )}
          </Droppable>
          <View
            justify="flex-start"
            style={styles.addListButton}
            onClick={() => modalDispatch(openNewListModal())}>
            <Text text="+ Add New List" fontSize={20} style={styles.addListButtonText} />
          </View>
        </View>
      </View>
      <CreateCardModal
        show={modalStatus === ModalStatus.NEWCARD}
        name={cardName}
        label={label}
        color={color}
        labels={labels}
        onClose={onCloseModal}
        onCreate={onCreateNewCard}
        onChangeCard={(e) => modalDispatch(changeCardName(e.target.value))}
        onChangeLabel={(e) => modalDispatch(changeCardLabel(e.target.value))}
        onSelect={(color: string) => modalDispatch(changeCardColor(color))}
        addLabel={() => modalDispatch(addLabel())}
        removeLabel={() => modalDispatch(removeLabel())}
      />
      <ModalWithInput
        show={modalStatus === ModalStatus.NEWLIST}
        name={listName}
        placeholder="List Name"
        onClose={onCloseModal}
        onCreate={onCreateNewList}
        onChange={(e) => modalDispatch(changeListName(e.target.value))}
      />
    </DragDropContext>
  );
}

type Styles = {
  container: CSSProperties;
  addListButton: CSSProperties;
  addListButtonText: CSSProperties;
  lists: CSSProperties;
  title: CSSProperties;
};

const styles: Styles = {
  container: { padding: '80px 20px 20px 20px', overflowX: 'scroll' },
  title: { marginBottom: 20, alignSelf: 'center' },
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
  addListButtonText: { color: theme.colors.white }
};
