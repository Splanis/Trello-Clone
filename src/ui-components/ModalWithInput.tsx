import React, { CSSProperties } from 'react';
import Modal from 'react-modal';
import { styled } from '../theme/theme';
import { Button } from './Button';
import { Input } from './Input';
import { modalStyles } from './modalStyles';
import { Typography } from './Typography';
import { View } from './View';

type Props = {
  isVisible: boolean;
  name: string;
  placeholder: string;
  error?: string;
  onClose: () => void;
  onCreate: () => void;
  onChange: (text: string) => void;
};

export function ModalWithInput(props: Props) {
  const { isVisible, name, placeholder, error, onClose, onCreate, onChange } = props;

  return (
    <Modal
      isOpen={isVisible}
      ariaHideApp={false}
      onRequestClose={onClose}
      style={modalStyles}>
      <Input placeholder={placeholder} onChange={onChange} value={name} />
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <View>
        <Button onClick={onClose} variant="secondary" style={styles.button}>
          Cancel
        </Button>
        <Button onClick={onCreate} style={styles.button}>
          Create
        </Button>
      </View>
    </Modal>
  );
}

const ErrorMessage = styled(Typography)`
  color: ${({ theme }) => theme.colors.common.red};
`;

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
