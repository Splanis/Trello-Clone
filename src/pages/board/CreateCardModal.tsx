import React, { CSSProperties } from 'react';
import Modal from 'react-modal';
import { ILabel } from '../../redux/models/Board';
import { Button } from '../../ui/Button';
import { modalStyles } from '../../ui/modalStyles';
import { Text } from '../../ui/Text';
import { theme } from '../../ui/theme';
import { View } from '../../ui/View';
import { colors } from './modalState';

type Props = {
  show: boolean;
  name: string;
  label: string;
  color: string;
  labels: ILabel[];
  onSelect: (color: string) => void;
  onClose: () => void;
  onCreate: () => void;
  onChangeCard: (e: any) => void;
  onChangeLabel: (e: any) => void;
  addLabel: (tag: string) => void;
  removeLabel: (tag: string) => void;
};

export function CreateCardModal(props: Props) {
  const {
    show,
    name,
    labels,
    label,
    color,
    onChangeLabel,
    onClose,
    onChangeCard,
    onCreate,
    addLabel,
    removeLabel,
    onSelect
  } = props;

  return (
    <Modal isOpen={show} ariaHideApp={false} onRequestClose={onClose} style={modalStyles}>
      <View align="flex-start">
        <textarea
          value={name}
          onChange={onChangeCard}
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
              onChange={onChangeLabel}
              placeholder="labels"
              style={styles.input}
            />
            <View style={styles.circle} onClick={() => addLabel(label)}>
              +
            </View>
            <View style={styles.circle} onClick={() => removeLabel(label)}>
              -
            </View>
          </View>
          <View direction="column" align="flex-start">
            <View>
              {colors.map((col) => (
                <div
                  onClick={() => onSelect(col)}
                  style={{
                    ...styles.circle,
                    border: color === col ? '2px solid black' : 'none',
                    backgroundColor: col
                  }}></div>
              ))}
            </View>
            <View>
              {labels.map((l) => (
                <Text
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
          onClick={onClose}
          title="Cancel"
          variant="primary"
          style={styles.button}
        />
        <Button
          onClick={onCreate}
          title="Create"
          variant="secondary"
          style={styles.button}
        />
      </View>
    </Modal>
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
    margin: '0 10px'
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
