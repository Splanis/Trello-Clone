import React from 'react';
import { MdAddCircle } from 'react-icons/md';
import { BoardMember, Label as LabelType } from '../../../models/Board';
import { styled } from '../../../theme/theme';
import { ErrorMessage } from '../../../ui-components/ErrorMessage';
import { Input } from '../../../ui-components/Input';
import { Pressable } from '../../../ui-components/Pressable';
import { View } from '../../../ui-components/View';
import { LabelColor } from '../boardState';
import { Label } from './Label';
import { TitleWithTwoButtons } from './TitleWithTwoButtons';

export const labelColors: LabelColor[] = ['green', 'blue', 'red', 'orange'];

type Props = {
  name: string;
  description: string;
  title: string;
  labels: LabelType[];
  assignee?: BoardMember;
  members: BoardMember[];
  nameError?: string;
  label: string;
  labelError?: string;
  color: LabelColor;
  onCloseLabel: string;
  onYesLabel: string;
  onChangeName: (text: string) => void;
  onClose: () => void;
  onYes: () => void;
  onChangeLabel: (text: string) => void;
  addLabel: () => void;
  onChangeColor: (color: LabelColor) => void;
  deleteLabel: (label: string) => void;
  onChangeDescription: (text: string) => void;
};

export function CardContentSidebar(props: Props) {
  return (
    <TitleWithTwoButtons
      title={props.title}
      onClose={props.onClose}
      onYes={props.onYes}
      onCloseLabel={props.onCloseLabel}
      onYesLabel={props.onYesLabel}>
      <InputContainer>
        <Input value={props.name} placeholder="name..." onChange={props.onChangeName} />
      </InputContainer>
      {props.nameError && <ErrorMessage>{props.nameError}</ErrorMessage>}
      <DescriptionInput
        value={props.description}
        onChange={(e) => props.onChangeDescription(e.target.value)}
        placeholder="description..."
      />
      <InputContainer noWrap>
        <Input
          value={props.label}
          placeholder="add a label"
          onChange={props.onChangeLabel}
        />
        <Pressable onClick={props.addLabel}>
          <AddIcon size={20} />
        </Pressable>
      </InputContainer>
      {props.labelError && <ErrorMessage>{props.labelError}</ErrorMessage>}
      <LabelPickerContainer>
        {labelColors.map((col) => (
          <Pressable key={col} onClick={() => props.onChangeColor(col)}>
            <LabelPicker isActive={col === props.color} color={col} />
          </Pressable>
        ))}
      </LabelPickerContainer>
      <LabelsContainer>
        {props.labels.map((l) => (
          <Label
            key={l.label}
            color={l.color}
            label={l.label}
            canDelete
            onDelete={() => props.deleteLabel(l.label)}
          />
        ))}
      </LabelsContainer>
    </TitleWithTwoButtons>
  );
}

const InputContainer = styled(View)`
  margin: 10px;
  width: 100%;
`;

const AddIcon = styled(MdAddCircle)`
  color: ${({ theme }) => theme.colors.font.primary};
  margin-top: 6px;
  margin-left: 10px;
`;

const DescriptionInput = styled.textarea`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  color: ${({ theme }) => theme.colors.font.primary};
  padding: 6px 12px;
  border-radius: 2px;
  border: none;
  font-size: ${({ theme }) => theme.sizing.font.base};
  font-family: ${({ theme }) => theme.fonts.primary};
  resize: none;
  width: 100%;
  margin: 10px;
  height: 200px;

  &:focus,
  &:focus,
  &:focus {
    outline: none;
  }
`;

const LabelPicker = styled.div<{ isActive: boolean; color: LabelColor }>`
  width: 25px;
  height: 25px;
  /* border-radius: 100%; */
  border: ${({ isActive, theme }) =>
    isActive ? `2px solid ${theme.colors.font.primary}` : 'none'};
  background-color: ${({ color, theme }) => theme.colors.common[color]};
  margin: 0 10px;
`;

const LabelPickerContainer = styled(View)`
  margin-top: 10px;
  margin-right: 20px;
`;

const LabelsContainer = styled(View)`
  width: 100%;
  margin: 15px 0 5px 10px;
  justify-content: flex-start;
`;

const getAssignee = (userId?: string, username?: string, photo?: string) => {
  if (!userId || !username || !photo) return undefined;

  return {
    id: userId,
    photo,
    username
  };
};
