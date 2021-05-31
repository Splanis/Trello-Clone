import React, { CSSProperties, useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { Label } from '../../../models/Board';
import { createNewCard } from '../../../redux/modules/board';
import { Button } from '../../../ui-components/Button';
import { modalStyles } from '../../../ui-components/modalStyles';
import { Text } from '../../../ui-components/Text';
import { theme } from '../../../ui-components/theme';
import { View } from '../../../ui-components/View';
import { useBoardUIState } from '../context/BoardModalProvider';
import { LabelColor, labelColors } from '../context/boardUIState';
import {
  selectUserId,
  selectUserProfilePhoto
} from '../../../redux/modules/auth.selectors';

export function CreateCardModal() {
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const userProfilePhoto = useSelector(selectUserProfilePhoto);
  const { listId, closeModal } = useBoardUIState();
  const [name, setName] = useState('');
  const [label, setLabel] = useState('');
  const [labels, setLabels] = useState<Label[]>([]);
  const [color, setColor] = useState<LabelColor>(theme.colors.labels.green);

  const handleCreateNewCard = () => {
    if (!listId) return;

    const assignee =
      userId && userProfilePhoto ? { id: userId, photo: userProfilePhoto } : undefined;

    dispatch(
      createNewCard({
        listId,
        id: uuid(),
        name,
        labels,
        assignee
      })
    );

    closeModal();
  };

  return (
    <Modal isOpen ariaHideApp={false} onRequestClose={closeModal} style={modalStyles}>
      <View align="flex-start">
        <textarea
          value={name}
          onChange={(e) => setName(e.target.value)}
          rows={5}
          cols={40}
          placeholder="card"
          style={styles.textarea}
        />
        <View direction="column">
          <View>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="labels"
              style={styles.input}
            />
            <View
              style={styles.circle}
              onClick={() => setLabels([...labels, { color, label }])}>
              +
            </View>
            <View
              style={styles.circle}
              onClick={() => setLabels(labels.filter((l) => l.label !== label))}>
              -
            </View>
          </View>
          <View direction="column" align="flex-start">
            <View>
              {labelColors.map((col) => (
                <LabelCircle
                  key={col}
                  onClick={() => setColor(col)}
                  isActive={color === col}
                  color={col}
                />
              ))}
            </View>
            <View>
              {labels.map((l) => (
                <Text
                  key={l.label}
                  style={{
                    backgroundColor: l.color,
                    ...styles.label
                  }}
                  text={l.label}
                />
              ))}
            </View>
          </View>
        </View>
      </View>
      <View>
        <Button
          onClick={closeModal}
          title="Cancel"
          variant="alternative"
          style={styles.button}
        />
        <Button
          onClick={handleCreateNewCard}
          title="Create"
          variant="primary"
          style={styles.button}
        />
      </View>
    </Modal>
  );
}

type LabelProps = { color: LabelColor; isActive: boolean; onClick: () => void };
function LabelCircle({ color, isActive, onClick }: LabelProps) {
  return (
    <div
      onClick={onClick}
      style={{
        ...styles.circle,
        border: isActive ? '2px solid black' : 'none',
        backgroundColor: color
      }}></div>
  );
}

type Styles = {
  textarea: CSSProperties;
  input: CSSProperties;
  button: CSSProperties;
  circle: CSSProperties;
  label: CSSProperties;
};

const styles: Styles = {
  textarea: {
    margin: '0 10px',
    padding: '10px',
    border: 'none',
    resize: 'none',
    fontSize: '1rem'
  },
  input: {
    margin: '0 10px',
    padding: '10px',
    fontSize: '1rem',
    border: 'none'
  },
  button: {
    margin: '20px 10px 10px 10px'
  },
  circle: {
    width: '30px',
    height: '30px',
    backgroundColor: theme.colors.dark,
    borderRadius: ' 50%',
    margin: ' 5px',
    cursor: 'pointer'
  },
  label: {
    margin: '0 5px',
    padding: '2px 12px',
    borderRadius: 30,
    color: 'white'
  }
};
