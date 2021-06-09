import React from 'react';
import { styled } from '../../../theme/theme';
import { Input } from '../../../ui-components/Input';
import { Typography } from '../../../ui-components/Typography';
import { View } from '../../../ui-components/View';
import { useBoard } from '../BoardProvider';
import {
  changeQuery,
  selectBoardMembers,
  selectBoardName,
  selectBoardQuery,
  selectSidebarStatus,
  SidebarStatus
} from '../boardState';

export function BoardNavigation() {
  const { state, dispatch } = useBoard();
  const boardName = selectBoardName(state);
  const query = selectBoardQuery(state);
  const members = selectBoardMembers(state);
  const sidebarStatus = selectSidebarStatus(state);

  if (!boardName || !members || sidebarStatus !== SidebarStatus.HIDDEN) return null;

  return (
    <BoardNavigationContainer>
      <View style={{ flex: 1 }} />
      <View style={{ flex: 1 }} noWrap>
        <BoardName size="veryLarge">{boardName}</BoardName>
        <Input
          value={query}
          onChange={(text) => dispatch(changeQuery(text))}
          placeholder="search..."
        />
      </View>
      <View
        style={{
          flex: 1,
          marginRight: 10,
          justifySelf: 'flex-end',
          position: 'relative'
        }}>
        {members.map((member, i) => (
          <MemberPhoto key={i} src={member.photo} style={{ right: i * 25 }} />
        ))}
      </View>
    </BoardNavigationContainer>
  );
}

const BoardNavigationContainer = styled.div`
  display: flex;
  height: 45px;
  width: 100%;
  position: fixed;
  z-index: 10;
  background-color: ${({ theme }) => theme.colors.background.secondary};
`;

const BoardName = styled(Typography)`
  margin-right: 20px;
`;

const MemberPhoto = styled.img`
  height: 30px;
  width: 30px;
  border-radius: 100%;
  position: absolute;
  border: 2px solid;
  border-color: ${({ theme }) => theme.colors.gray};
  cursor: pointer;

  &:hover {
    z-index: 20;
  }
`;
