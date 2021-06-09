import { RiDeleteBack2Fill } from 'react-icons/ri';
import { styled } from '../../../theme/theme';
import { View } from '../../../ui-components/View';
import { LabelColor } from '../boardState';

type Props = {
  canDelete?: boolean;
  color: LabelColor;
  label: string;
  onDelete: () => void;
};
export function Label({ canDelete, color, label, onDelete }: Props) {
  return (
    <LabelContainer color={color}>
      <LabelText>{label}</LabelText>
      {canDelete && <RiDeleteBack2Fill size={12} color="white" onClick={onDelete} />}
    </LabelContainer>
  );
}

const LabelContainer = styled(View)<{ color: LabelColor }>`
  margin: 3px;
  padding: 2px 12px;
  border-radius: 30px;
  background-color: ${({ theme, color }) => theme.colors.common[color]};
`;

const LabelText = styled.div`
  margin: 0 10px;
  color: ${({ theme }) => theme.colors.white};
`;
