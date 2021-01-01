import React, { CSSProperties } from 'react';
import Modal from 'react-modal';
import { Button } from './Button';
import { modalStyles } from './modalStyles';
import { View } from './View';
import { Text } from './Text';

type Props = {
  show: boolean;
  text: string;
  onClose: () => void;
  onYes: () => void;
};

export function SimpleModal(props: Props) {
  const { show, text, onClose, onYes } = props;

  return (
    <Modal isOpen={show} ariaHideApp={false} onRequestClose={onClose} style={modalStyles}>
      <Text text={text} fontSize={20} />
      <View>
        <Button
          onClick={onClose}
          title="No"
          variant="alternative"
          style={styles.button}
        />
        <Button onClick={onYes} title="Yes" variant="primary" style={styles.button} />
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
