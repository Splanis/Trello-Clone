import React, { CSSProperties } from 'react';
import Modal from 'react-modal';
import { Button } from './Button';
import { modalStyles } from './modalStyles';
import { Typography } from './Typography';
import { View } from './View';

type Props = {
  isVisible: boolean;
  text: string;
  onClose: () => void;
  onYes: () => void;
};

export function AcknowledgementModal(props: Props) {
  const { isVisible, text, onClose, onYes } = props;

  return (
    <Modal
      isOpen={isVisible}
      ariaHideApp={false}
      onRequestClose={onClose}
      style={modalStyles}>
      <Typography>{text}</Typography>
      <View>
        <Button onClick={onClose} variant="secondary" style={styles.button}>
          No
        </Button>
        <Button onClick={onYes} style={styles.button}>
          Yes
        </Button>
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
