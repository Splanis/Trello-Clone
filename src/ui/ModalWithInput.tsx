import React, { CSSProperties } from 'react';
import Modal from 'react-modal';
import { Button } from './Button';
import { modalStyles } from './modalStyles';
import { View } from './View';

type Props = {
  show: boolean;
  name: string;
  placeholder: string;
  onClose: () => void;
  onCreate: () => void;
  onChange: (e: any) => void;
};

export function ModalWithInput(props: Props) {
  const { show, name, placeholder, onClose, onCreate, onChange } = props;

  return (
    <Modal isOpen={show} ariaHideApp={false} onRequestClose={onClose} style={modalStyles}>
      <input
        style={styles.input}
        type="text"
        value={name}
        onChange={onChange}
        placeholder={placeholder}
      />
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
  input: CSSProperties;
  button: CSSProperties;
};

const styles: Styles = {
  input: {
    padding: '10px',
    fontSize: '1rem',
    width: '100%'
  },

  button: {
    margin: '20px 10px 0 10px'
  }
};
