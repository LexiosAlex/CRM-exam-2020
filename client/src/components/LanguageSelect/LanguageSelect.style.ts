import styled from 'styled-components';
import NativeSelect from '@material-ui/core/NativeSelect';

export const StyledSelect = styled(NativeSelect)`
  margin: 0 10px;

  &::before,
  &::after {
    display: none;
  }
`;
