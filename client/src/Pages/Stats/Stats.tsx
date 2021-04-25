import React from 'react';
import { Box } from '@material-ui/core';
import { StyledCounter } from './Stats.style';

//TODO: refactor it
export const Stats: React.FC = () => {
  return (
    <Box marginTop="1rem" marginLeft="50px" marginRight="50px">
      <h2>Statistics</h2>
      <Box display="flex" flexDirection="row" width="100%">
        <div>
          <h3>Activities today</h3>
          <StyledCounter>
            <span>10</span>
            <p>Done</p>
          </StyledCounter>
          <StyledCounter>
            <span>3</span>
            <p>Canceled</p>
          </StyledCounter>
          <StyledCounter>
            <span>10</span>
            <p>Created</p>
          </StyledCounter>
        </div>
        <div>
          <h3>Activities this week</h3>
          <StyledCounter>
            <span>16</span>
            <p>Done</p>
          </StyledCounter>
          <StyledCounter>
            <span>5</span>
            <p>Canceled</p>
          </StyledCounter>
          <StyledCounter>
            <span>15</span>
            <p>Created</p>
          </StyledCounter>
        </div>
        <div>
          <h3>Activities this month</h3>
          <StyledCounter>
            <span>16</span>
            <p>Done</p>
          </StyledCounter>
          <StyledCounter>
            <span>5</span>
            <p>Canceled</p>
          </StyledCounter>
          <StyledCounter>
            <span>15</span>
            <p>Created</p>
          </StyledCounter>
        </div>
      </Box>
    </Box>
  );
};
