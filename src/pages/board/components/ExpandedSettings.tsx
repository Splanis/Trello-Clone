import React from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { FaTrash } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { styled } from '../../../theme/theme';
import { Pressable } from '../../../ui-components/Pressable';
import { View } from '../../../ui-components/View';

type Props = {
  hasExpandedSettings: boolean;
  onDelete: () => void;
  toggleIsEditing: () => void;
  toggleHasExpandedSettings: () => void;
};

export function ExpandedSettings(props: Props) {
  const {
    hasExpandedSettings,
    onDelete,
    toggleHasExpandedSettings,
    toggleIsEditing
  } = props;

  return (
    <View noWrap>
      {hasExpandedSettings && (
        <>
          <Pressable onClick={onDelete} style={{ marginRight: 5, marginLeft: 5 }}>
            <TrashIcon size={18} />
          </Pressable>
          <Pressable onClick={toggleIsEditing} style={{ marginRight: 5, marginLeft: 5 }}>
            <EditIcon size={20} />
          </Pressable>
        </>
      )}
      <Pressable onClick={toggleHasExpandedSettings}>
        <DotsIcon size={22} />
      </Pressable>
    </View>
  );
}

const DotsIcon = styled(BiDotsVerticalRounded)`
  color: ${({ theme }) => theme.colors.font.primary};
`;

const EditIcon = styled(MdEdit)`
  color: ${({ theme }) => theme.colors.font.primary};
`;

const TrashIcon = styled(FaTrash)`
  color: ${({ theme }) => theme.colors.font.primary};
`;
