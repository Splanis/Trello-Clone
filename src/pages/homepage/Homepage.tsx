import React, { CSSProperties, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { UserBoard } from '../../models/User';
import { createBoard } from '../../redux/middlewares/auth';
import { selectUserBoards } from '../../redux/modules/auth.selectors';
import { Button } from '../../ui-components/Button';
import { ModalWithInput } from '../../ui-components/ModalWithInput';
import { Spinner } from '../../ui-components/Spinner';
import { Text } from '../../ui-components/Text';
import { theme } from '../../ui-components/theme';
import { View } from '../../ui-components/View';

export function Homepage() {
  const boards = useSelector(selectUserBoards);
  const [isModalVisible, setIsModalVisible] = useState(false);

  if (!boards)
    return (
      <View page>
        <Spinner />
      </View>
    );

  return (
    <View page justify="flex-start">
      <Boards boards={boards} onCreateNewBoard={() => setIsModalVisible(true)} />
      <CreateBoardModal
        isVisible={isModalVisible}
        closeModal={() => setIsModalVisible(false)}
      />
    </View>
  );
}

type BoardsProps = {
  boards?: UserBoard[];
  onCreateNewBoard: () => void;
};
function Boards({ boards, onCreateNewBoard: onClick }: BoardsProps) {
  if (!boards) return null;

  return (
    <View direction="column" style={styles.container}>
      <Text text="My Boards" fontSize={30} style={styles.text} />
      <View direction="column" style={styles.text}>
        {boards.map((board) => (
          <Link key={board.id} to={`/board/${board.id}`} style={styles.button}>
            <Button title={board.name} variant="primary" />
          </Link>
        ))}
      </View>
      <Button title="Create New Board" onClick={onClick} variant="alternative" />
    </View>
  );
}

type CreateBoardModalProps = { isVisible: boolean; closeModal: () => void };
function CreateBoardModal({ isVisible, closeModal }: CreateBoardModalProps) {
  const dispatch = useDispatch();
  const [newBoardInput, setNewBoardInput] = useState<string>('');

  const handleCloseModal = () => {
    setNewBoardInput('');
    closeModal();
  };

  const handleCreateBoard = () => {
    dispatch(createBoard({ name: newBoardInput }));
    handleCloseModal();
  };

  return (
    <ModalWithInput
      isVisible={isVisible}
      name={newBoardInput}
      placeholder="Board Name"
      onChange={(e) => setNewBoardInput(e.target.value)}
      onCreate={handleCreateBoard}
      onClose={handleCloseModal}
    />
  );
}

type Styles = {
  container: CSSProperties;
  button: CSSProperties;
  text: CSSProperties;
};

const styles: Styles = {
  container: {
    backgroundColor: theme.colors.gray,
    borderRadius: 20,
    marginLeft: 50,
    padding: 20
  },
  button: {
    margin: '10px'
  },
  text: { marginBottom: 20 }
};
