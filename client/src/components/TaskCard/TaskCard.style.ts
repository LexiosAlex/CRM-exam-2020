import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

export const StyledCardContainer = styled(Card)`
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .cardActions button {
    display: none;
  }
  &:hover {
    .cardActions button {
      display: flex;
    }
  }
`;

export const StyledCardContent = styled(CardContent)`
  .root {
    padding: 1rem 2rem !important;
    & .h3 {
      font-size: 1rem;
    }
    & .h4 {
      font-size: 0.75rem !important;
      color: #555555;
    }
  }
`;

export const StyledCardActions = styled(CardActions)`
  padding: 0 !important;
  padding-right: 1rem !important;
  min-width: 44px;
`;
