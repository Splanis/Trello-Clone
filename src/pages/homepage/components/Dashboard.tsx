import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { addUserBoardToFirestore } from '../../../firebase/services/board';
import { createInitialBoard } from '../../../models/Board';
import { UserBoard } from '../../../models/User';
import { useAuth } from '../../../providers/AuthProvider';
import { styled } from '../../../theme/theme';
import { Button } from '../../../ui-components/Button';
import { ModalWithInput } from '../../../ui-components/ModalWithInput';
import { Spinner } from '../../../ui-components/Spinner';
import { Typography } from '../../../ui-components/Typography';
import { View } from '../../../ui-components/View';
import './animation.css';

export function Dashboard() {
  const { boards } = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(false);

  if (!boards) return <Spinner />;

  return (
    <View justify="flex-start" style={{ width: '100%' }}>
      <Boards boards={boards} onCreateNewBoard={() => setIsModalVisible(true)} />
      <CreateBoardModal
        isVisible={isModalVisible}
        closeModal={() => setIsModalVisible(false)}
      />
    </View>
  );
}

type BoardsProps = {
  boards: UserBoard[];
  onCreateNewBoard: () => void;
};

function Boards({ boards, onCreateNewBoard: onClick }: BoardsProps) {
  return (
    <CSSTransition in appear timeout={300} classNames="fade">
      <Container column>
        <Title>My Boards</Title>
        <View align="flex-end">
          {boards.map((board) => (
            <Board key={board.id}>
              <LinkStyled key={board.id} to={`/board/${board.id}`}>
                <Typography>{board.name}</Typography>
              </LinkStyled>
            </Board>
          ))}
        </View>
        <NewBoardButtonContainer justify="flex-end">
          <Button onClick={onClick} variant="secondary">
            Create New Board
          </Button>
        </NewBoardButtonContainer>
      </Container>
    </CSSTransition>
  );
}

const Container = styled(View)`
  padding: 3rem 5rem;
  transition: opacity 300ms, transform 300ms;
`;

const Title = styled(Typography)`
  font-size: 3rem;
  align-self: flex-start;
  margin-left: 0.5rem;
  margin-bottom: 1.5rem;
`;

const LinkStyled = styled(Link)`
  text-decoration: none;

  &:visited {
    color: inherit;
  }
`;

const Board = styled(View)`
  background-color: ${({ theme }) => theme.colors.background.alternative};
  border-radius: 12px;
  margin: 0.5rem;
  width: 16rem;
  padding: 2rem 0.5rem;
`;

const NewBoardButtonContainer = styled(View)`
  width: 100%;
  margin-top: 30px;
  padding-right: 30px;
`;

type CreateBoardModalProps = { isVisible: boolean; closeModal: () => void };

function CreateBoardModal({ isVisible, closeModal }: CreateBoardModalProps) {
  const { userId, photo, username } = useAuth();
  const [newBoardName, setNewBoardName] = useState<string>('');
  const [error, setError] = useState<string>();

  const handleCloseModal = () => {
    setNewBoardName('');
    setError(undefined);
    closeModal();
  };

  const handleCreateBoard = () => {
    if (!userId || !photo || !username) return;
    if (!newBoardName) {
      return setError('Field can not be empty!');
    }

    const board = createInitialBoard(newBoardName, { id: userId, photo, username });
    addUserBoardToFirestore(userId, board);

    return handleCloseModal();
  };

  return (
    <ModalWithInput
      isVisible={isVisible}
      name={newBoardName}
      placeholder="Board Name"
      error={error}
      onChange={(text) => {
        setNewBoardName(text);
        if (error) setError(undefined);
      }}
      onCreate={handleCreateBoard}
      onClose={handleCloseModal}
    />
  );
}
