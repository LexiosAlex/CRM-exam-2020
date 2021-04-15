import React from 'react';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import { Draggable } from 'react-beautiful-dnd';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

import { ActivityType } from 'common/index';
import { TITLE_TYPE_MAP } from '../../utils/activities';

import { StyledCardContainer, StyledCardActions, StyledCardContent } from './TaskCard.style';

interface ITaskCardProps {
  id: string;
  index: number;
  type: ActivityType;
  address: string;
  onOpenDialog: Function;
  onOpenHistory: Function;
}

export const TaskCard: React.FC<ITaskCardProps> = ({
  type,
  address,
  id,
  index,
  onOpenDialog,
  onOpenHistory,
}) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <StyledCardContainer>
            <StyledCardContent>
              <Typography component="h3" gutterBottom>
                {TITLE_TYPE_MAP[type]}
              </Typography>
              <Typography component="h4" gutterBottom>
                {address}
              </Typography>
            </StyledCardContent>
            <StyledCardActions>
              <IconButton onClick={() => onOpenDialog()}>
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton onClick={() => onOpenHistory()}>
                <AccessTimeIcon fontSize="small" />
              </IconButton>
            </StyledCardActions>
          </StyledCardContainer>
        </div>
      )}
    </Draggable>
  );
};
