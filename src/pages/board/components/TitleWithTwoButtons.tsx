import React, { ReactNode } from 'react';
import { styled } from '../../../theme/theme';
import { Button } from '../../../ui-components/Button';
import { Typography } from '../../../ui-components/Typography';
import { View } from '../../../ui-components/View';

type Props = {
  title: string;
  onClose: () => void;
  onYes: () => void;
  onCloseLabel: string;
  onYesLabel: string;
  children?: ReactNode;
};

export function TitleWithTwoButtons(props: Props) {
  const { title, onClose, onYes, onCloseLabel, onYesLabel, children } = props;
  return (
    <View>
      <Title size="veryLarge">{title}</Title>
      {children}
      <ButtonsContainer justify="space-evenly">
        <Button onClick={onClose} variant="secondary">
          {onCloseLabel}
        </Button>
        <Button onClick={onYes}>{onYesLabel}</Button>
      </ButtonsContainer>
    </View>
  );
}

const Title = styled(Typography)`
  margin-bottom: 10px;
`;
const ButtonsContainer = styled(View)`
  margin-top: 10px;
  width: 250px;
`;
