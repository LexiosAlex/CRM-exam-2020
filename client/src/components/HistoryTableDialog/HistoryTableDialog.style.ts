import styled, { css } from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';

export const styledFlexContainer = css`
  display: flex;
  align-items: center;
  box-sizing: border-box;
`;

export const StyledTableCell = styled(TableCell)`
  flex: 1;

  ${styledFlexContainer}
`;

export const StyledHeader = styled(TableCell)`
  display: flex !important;
  flex: 1;

  ${styledFlexContainer}
`;

export const CloseButton = styled(IconButton)`
  position: absolute !important;
  right: 1rem;
  top: 1rem;
  color: #323232;
`;

export const StyledDialogHeader = styled.header`
  padding: 0 2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  transition: all 0.3s linear;
  h4 {
    margin: 0;
    padding: 2rem 0;
    font-size: 1.25rem;
    text-transform: uppercase;
    letter-spacing: 3px;
    font-weight: 700;
  }
`;
