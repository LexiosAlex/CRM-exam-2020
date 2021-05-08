import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';

export const StyledCounter = styled.div`
  margin-right: 2.5rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
  width: 150px;
  border-radius: 5px;
  background-color: #f5f5f6;
  span {
    font-weight: bold;
  }
`;

export const StyledTabsPaper = styled(Paper)`
  flex-grow: 1;
`;

export const StyledTabs = styled(Tabs)`
  && .MuiTabs-indicator {
    background-color: #ffe55e;
  }
`;
