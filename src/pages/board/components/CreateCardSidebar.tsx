import React, { useCallback, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Label } from '../../../models/Board';
import { useAuth } from '../../../providers/AuthProvider';
import { useBoard } from '../BoardProvider';
import {
  closeSidebar,
  createNewCard,
  LabelColor,
  selectBoardMembers,
  selectListId,
  selectViewingCard
} from '../boardState';
import { CardContentSidebar } from './CardContentSidebar';

export function CreateCardSidebar() {
  const { userId, photo, username } = useAuth();
  const { state, dispatch } = useBoard();
  const listId = selectListId(state);
  const members = selectBoardMembers(state);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [labels, setLabels] = useState<Label[]>([]);
  const [label, setLabel] = useState('');
  const [color, setColor] = useState<LabelColor>('green');
  const [nameError, setNameError] = useState<string>();
  const [labelError, setLabelError] = useState<string>();

  const addLabel = useCallback(() => {
    if (!label) return setLabelError('Label can not be empty!');
    return setLabels((prev) => [...prev, { label, color, id: uuid() }]);
  }, [color, label]);

  const deleteLabel = useCallback((labelToDelete: string) => {
    setLabels((prev) => prev.filter((l) => l.label !== labelToDelete));
  }, []);

  const handleCreateNewCard = useCallback(() => {
    if (!listId) return;

    if (!name) {
      setNameError('Card Name can not be empty!');
    } else {
      dispatch(
        createNewCard({
          listId,
          id: uuid(),
          name,
          labels,
          description,
          assignee: getAssignee(userId, username, photo)
        })
      );
    }
  }, [dispatch, description, labels, listId, name, photo, userId, username]);

  if (!members) return null;

  return (
    <CardContentSidebar
      title="Create new card"
      name={name}
      labels={labels}
      description={description}
      members={members}
      label={label}
      color={color}
      nameError={nameError}
      labelError={labelError}
      onYes={handleCreateNewCard}
      onClose={() => dispatch(closeSidebar())}
      onChangeName={(text) => {
        setName(text);
        if (nameError) setNameError(undefined);
      }}
      onChangeLabel={(text) => {
        setLabel(text);
        if (labelError) setLabelError(undefined);
      }}
      addLabel={addLabel}
      onChangeColor={setColor}
      onChangeDescription={setDescription}
      deleteLabel={deleteLabel}
      onCloseLabel="Cancel"
      onYesLabel="Save"
    />
  );
}

// import React, { useCallback, useState } from 'react';
// import { MdAddCircle } from 'react-icons/md';
// import { v4 as uuid } from 'uuid';
// import { Label as LabelType } from '../../../models/Board';
// import { useAuth } from '../../../providers/AuthProvider';
// import { styled } from '../../../theme/theme';
// import { ErrorMessage } from '../../../ui-components/ErrorMessage';
// import { Input } from '../../../ui-components/Input';
// import { Pressable } from '../../../ui-components/Pressable';
// import { View } from '../../../ui-components/View';
// import { useBoard } from '../BoardProvider';
// import {
//   closeSidebar,
//   createNewCard,
//   LabelColor,
//   selectListId,
//   selectViewingCard,
//   selectBoardMembers
// } from '../boardState';
// import { Label } from './Label';
// import { TitleWithTwoButtons } from './TitleWithTwoButtons';

// export const labelColors: LabelColor[] = ['green', 'blue', 'red', 'orange'];

// export function CreateCardSidebar() {
//   const { userId, photo, username } = useAuth();
//   const { state, dispatch } = useBoard();
//   const card = selectViewingCard(state);
//   const listId = selectListId(state);
//   const members = selectBoardMembers(state);
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [labels, setLabels] = useState<LabelType[]>([]);
//   const [label, setLabel] = useState('');
//   const [color, setColor] = useState<LabelColor>('green');
//   const [nameError, setNameError] = useState<string>();
//   const [labelError, setLabelError] = useState<string>();

//   const addLabel = useCallback(() => {
//     if (!label) return setLabelError('Label can not be empty!');
//     return setLabels((prev) => [...prev, { label, color, id: uuid() }]);
//   }, [color, label]);

//   const deleteLabel = useCallback((labelToDelete: string) => {
//     setLabels((prev) => prev.filter((l) => l.label !== labelToDelete));
//   }, []);

//   const handleCreateNewCard = useCallback(() => {
//     if (!listId) return;

//     if (!name) {
//       setNameError('Card Name can not be empty!');
//     } else {
//       dispatch(
//         createNewCard({
//           listId,
//           id: uuid(),
//           name,
//           labels,
//           description,
//           assignee: getAssignee(userId, username, photo)
//         })
//       );
//     }
//   }, [dispatch, description, labels, listId, name, photo, userId, username]);

//   return (
//     <TitleWithTwoButtons
//       title="Create new card"
//       onClose={() => dispatch(closeSidebar())}
//       onYes={handleCreateNewCard}
//       onCloseLabel="Cancel"
//       onYesLabel="Create">
//       <InputContainer>
//         <Input
//           value={name}
//           placeholder="name..."
//           onChange={(text) => {
//             setName(text);
//             if (nameError) setNameError(undefined);
//           }}
//         />
//       </InputContainer>
//       {nameError && <ErrorMessage>{nameError}</ErrorMessage>}
//       <DescriptionInput
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         placeholder="description..."
//       />
//       <InputContainer noWrap>
//         <Input
//           value={label}
//           placeholder="add a label"
//           onChange={(text) => {
//             setLabel(text);
//             if (labelError) setLabelError(undefined);
//           }}
//         />
//         <Pressable onClick={addLabel}>
//           <AddIcon size={20} />
//         </Pressable>
//       </InputContainer>
//       {labelError && <ErrorMessage>{labelError}</ErrorMessage>}
//       <LabelPickerContainer>
//         {labelColors.map((col) => (
//           <Pressable key={col} onClick={() => setColor(col)}>
//             <LabelPicker isActive={col === color} color={col} />
//           </Pressable>
//         ))}
//       </LabelPickerContainer>
//       <LabelsContainer>
//         {labels.map((l) => (
//           <Label
//             key={l.label}
//             color={l.color}
//             label={l.label}
//             canDelete
//             onDelete={() => deleteLabel(l.label)}
//           />
//         ))}
//       </LabelsContainer>
//     </TitleWithTwoButtons>
//   );
// }

// const InputContainer = styled(View)`
//   margin: 10px;
//   width: 100%;
// `;

// const AddIcon = styled(MdAddCircle)`
//   color: ${({ theme }) => theme.colors.font.primary};
//   margin-top: 6px;
//   margin-left: 10px;
// `;

// const DescriptionInput = styled.textarea`
//   background-color: ${({ theme }) => theme.colors.background.secondary};
//   color: ${({ theme }) => theme.colors.font.primary};
//   padding: 6px 12px;
//   border-radius: 2px;
//   border: none;
//   font-size: ${({ theme }) => theme.sizing.font.base};
//   font-family: ${({ theme }) => theme.fonts.primary};
//   resize: none;
//   width: 100%;
//   margin: 10px;
//   height: 200px;

//   &:focus,
//   &:focus,
//   &:focus {
//     outline: none;
//   }
// `;

// const LabelPicker = styled.div<{ isActive: boolean; color: LabelColor }>`
//   width: 25px;
//   height: 25px;
//   /* border-radius: 100%; */
//   border: ${({ isActive, theme }) =>
//     isActive ? `2px solid ${theme.colors.font.primary}` : 'none'};
//   background-color: ${({ color, theme }) => theme.colors.common[color]};
//   margin: 0 10px;
// `;

// const LabelPickerContainer = styled(View)`
//   margin-top: 10px;
//   margin-right: 20px;
// `;

// const LabelsContainer = styled(View)`
//   width: 100%;
//   margin: 15px 0 5px 10px;
//   justify-content: flex-start;
// `;

const getAssignee = (userId?: string, username?: string, photo?: string) => {
  if (!userId || !username || !photo) return undefined;

  return {
    id: userId,
    photo,
    username
  };
};
