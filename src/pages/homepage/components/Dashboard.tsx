import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { keyframes } from 'styled-components';
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
  const hasNoBoards = boards.length === 0;

  return (
    <CSSTransition in appear timeout={300} classNames="fade">
      <Container column>
        <Header>
          <Title>My Boards</Title>
          <AnimatedButton when={hasNoBoards}>
            <Button onClick={onClick} variant="secondary">
              Create New Board
            </Button>
          </AnimatedButton>
        </Header>

        <View align="flex-end">
          {hasNoBoards ? (
            <Typography size="veryLarge">You have no boards yet</Typography>
          ) : (
            boards.map((board) => (
              <LinkStyled key={board.id} to={`/board/${board.id}`}>
                <Board>
                  <Typography>{board.name}</Typography>
                </Board>
              </LinkStyled>
            ))
          )}
        </View>
        <NewBoardButtonContainer justify="flex-end"></NewBoardButtonContainer>
      </Container>
    </CSSTransition>
  );
}

const Container = styled(View)`
  padding: 3rem 5rem;
  transition: opacity 300ms, transform 300ms;
  width: 100%;
`;

const Header = styled(View)`
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled(Typography)`
  font-size: 3rem;
  align-self: flex-start;
  margin-left: 0.5rem;
`;

const LinkStyled = styled(Link)`
  text-decoration: none;

  &:visited {
    color: inherit;
  }
`;

const buttonAnimation = keyframes`
   0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
`;

const AnimatedButton = styled.div<{ when: boolean }>`
  animation: ${buttonAnimation} ${({ when }) => (when ? `1s` : 0)} infinite;
  animation-timing-function: ease-in-out;
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
