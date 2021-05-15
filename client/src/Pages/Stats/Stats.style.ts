import styled, { css } from 'styled-components';
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

const PaperStyled = css`
  margin: 1rem 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  min-width: 300px;
  min-height: 300px;
`;

export const StyledChartPaper = styled(Paper)`
  ${PaperStyled}
`;

export const StyledAllStatsPaper = styled(Paper)`
  && ul {
    margin: 0 0 auto 0;
    padding: 1rem 2rem 0;

    display: flex;
    flex-direction: column;
    align-self: flex-start;

    list-style: none;
  }

  && li {
    padding: 0.5rem 0;

    display: inline-flex;

    & > p {
      span {
        font-weight: bold;
      }
    }
  }

  ${PaperStyled}
`;
