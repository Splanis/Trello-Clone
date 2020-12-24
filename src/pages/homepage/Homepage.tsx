import React, { CSSProperties, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { State } from '../../redux/reducers/rootReducer';
import { createBoard, loadBoards } from '../../redux/reducers/user/middleware';
import { selectBoards, selectUserId } from '../../redux/reducers/user/userReducer';
import { Button } from '../../ui/Button';
import { ModalWithInput } from '../../ui/ModalWithInput';
import { Spinner } from '../../ui/Spinner';
import { Text } from '../../ui/Text';
import { theme } from '../../ui/theme';
import { View } from '../../ui/View';

export function Homepage() {
  const dispatch = useDispatch();
  const state = useSelector((state: State) => state);
  const boards = selectBoards(state);
  const userId = selectUserId(state);
  const [newBoardInput, setNewBoardInput] = useState<string>('');
  const [showNewBoardModal, setShowNewBoardModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const handleCloseModal = () => {
    setShowNewBoardModal(false);
    setNewBoardInput('');
  };

  const handleCreateBoard = () => {
    if (userId) dispatch(createBoard({ name: newBoardInput, id: userId }));
    handleCloseModal();
  };

  useEffect(() => {
    if (userId) dispatch(loadBoards({ userId }));
    setLoading(false);
  }, [dispatch, userId]);

  if (loading)
    return (
      <View page>
        <Spinner />
      </View>
    );

  return (
    <View page justify="flex-start">
      <Boards boards={boards} onClick={() => setShowNewBoardModal(true)} />
      <ModalWithInput
        show={showNewBoardModal}
        name={newBoardInput}
        placeholder="Board Name"
        onChange={(e) => setNewBoardInput(e.target.value)}
        onCreate={handleCreateBoard}
        onClose={handleCloseModal}
      />
    </View>
  );
}

type BoardsProps = {
  boards: { name: string; id: string }[];
  onClick: () => void;
};

function Boards({ boards, onClick }: BoardsProps) {
  return (
    <View direction="column" style={styles.container}>
      <Text text="My Boards" fontSize={30} style={styles.text} />
      <View direction="column" style={styles.text}>
        {boards &&
          boards.map((board) => (
            <Link key={board.id} to={`/board/${board.id}`} style={styles.button}>
              <Button title={board.name} variant="primary" />
            </Link>
          ))}
      </View>
      <Button title="Create New Board" onClick={onClick} variant="secondary" />
    </View>
  );
}

type Styles = {
  container: CSSProperties;
  button: CSSProperties;
  text: CSSProperties;
};

const styles: Styles = {
  container: {
    backgroundColor: theme.colors.dark,
    borderRadius: 20,
    marginLeft: 50,
    padding: 20
  },
  button: {
    margin: '10px'
  },
  text: { marginBottom: 20 }
};
