import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';

export const StyledContainer = styled(Box)`
  flex-grow: 1;

  && h3 {
    margin: 1rem 0;
    font-size: 1rem;
    font-weight: bold;
  }

  && h2 {
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
    font-weight: bold;
  }
`;

export const StyledChartPaper = styled(Paper)`
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
