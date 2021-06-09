import React from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import styled, { keyframes } from 'styled-components';
import { View } from '../../../ui-components/View';
import { useBoard } from '../BoardProvider';
import {
  closeSidebar,
  deleteCard,
  deleteList,
  selectCardId,
  selectListId,
  selectSidebarStatus,
  SidebarStatus
} from '../boardState';
import { CreateCardSidebar } from './CreateCardSidebar';
import { CreateListSidebar } from './CreateListSidebar';
import { TitleWithTwoButtons } from './TitleWithTwoButtons';
import { ViewingCardSidebar } from './ViewingCardSidebar';

export function Sidebar() {
  const { dispatch, state } = useBoard();
  const status = selectSidebarStatus(state);

  if (status === SidebarStatus.HIDDEN) return null;

  return (
    <SidebarContainerStyled>
      <View justify="flex-end">
        <CloseIcon size={25} onClick={() => dispatch(closeSidebar())} />
      </View>
      <SidebarView />
    </SidebarContainerStyled>
  );
}

function SidebarView() {
  const { state, dispatch } = useBoard();
  const listId = selectListId(state);
  const cardId = selectCardId(state);
  const status = selectSidebarStatus(state);

  const handleDeleteList = () => {
    if (!listId) return;

    dispatch(deleteList({ listId }));
  };

  const handleDeleteCard = () => {
    if (!cardId || !listId) return;

    dispatch(deleteCard({ listId, cardId }));
  };

  console.log(status);

  if (status === SidebarStatus.CREATING_NEW_CARD) return <CreateCardSidebar />;

  if (status === SidebarStatus.CREATING_NEW_LIST) return <CreateListSidebar />;

  if (status === SidebarStatus.DELETING_LIST)
    return (
      <TitleWithTwoButtons
        title="Are you sure you want to delete this list?"
        onClose={() => dispatch(closeSidebar())}
        onYes={handleDeleteList}
        onCloseLabel="Cancel"
        onYesLabel="Yes"
      />
    );

  if (status === SidebarStatus.DELETING_CARD)
    return (
      <TitleWithTwoButtons
        title="Are you sure you want to delete this card?"
        onClose={() => dispatch(closeSidebar())}
        onYes={handleDeleteCard}
        onCloseLabel="Cancel"
        onYesLabel="Yes"
      />
    );

  if (status === SidebarStatus.VIEWING_CARD) return <ViewingCardSidebar />;

  return null;
}

const sidebarAnimation = keyframes`
from {
  margin-left: -400px;

}to {
  margin-left: 0
}
`;

const SidebarContainerStyled = styled.div`
  height: 100vh;
  overflow-y: scroll;
  position: fixed;
  width: 380px;
  background-color: ${({ theme }) => theme.colors.background.alternative};
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  padding: 15px;

  /* 
  transition: all 0.5s;
  -webkit-transition: all 0.25s;
  animation: ${sidebarAnimation} 0.2s ease-in; */
`;

const CloseIcon = styled(AiFillCloseCircle)`
  color: ${({ theme }) => theme.colors.font.primary};
  margin-right: 7px;
  margin-bottom: 10px;
`;
