import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import { AutoSizer, Column, Table, TableCellRenderer } from 'react-virtualized';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';

import {
  StyledTableCell,
  StyledHeader,
  CloseButton,
  StyledDialogHeader,
  StyledMuiDialogContent,
} from './HistoryTableDialog.style';

import { IActivity, IActivityHistory } from 'common/types';
import { TITLE_STATUS_MAP } from '../../utils/activities';

interface DialogProps {
  open: boolean;
  onClose: () => void;
  activity: IActivity;
}

interface IHistoryTableItem {
  operatorName: string | null;
  assigneeName: string | null;
  time: string;
  status: string;
}

const columns = [
  {
    label: 'Operator',
    dataKey: 'operatorName',
  },
  {
    label: 'Assignee',
    dataKey: 'assigneeName',
  },
  {
    label: 'Time',
    dataKey: 'time',
  },
  {
    label: 'Status',
    dataKey: 'status',
  },
];

const renderCell: TableCellRenderer = ({ cellData }) => {
  return (
    <StyledTableCell component="div" variant="body">
      {cellData}
    </StyledTableCell>
  );
};

const renderHeader = ({ label }) => {
  return (
    <StyledHeader component="div" variant="head">
      <span>{label}</span>
    </StyledHeader>
  );
};

const getHistoryItem = (record: IActivityHistory): IHistoryTableItem => ({
  operatorName: record.operator ? record.operator.name : 'no data provided',
  assigneeName: record.assignee ? record.assignee.name : 'no data provided',
  time: moment(record.time).format('LLL'),
  status: TITLE_STATUS_MAP[record.status],
});

const getHistoryList = (history: { [id: string]: IActivityHistory }) =>
  Object.values(history).reduce(
    (acc: IHistoryTableItem[], record) => [...acc, getHistoryItem(record)],
    [],
  );

export const HistoryTableDialog: React.FC<DialogProps> = ({ open, onClose, activity }) => {
  const { history, address } = activity;
  const historyList = getHistoryList(history);
  console.log(historyList);

  return (
    <Dialog maxWidth="lg" open={open} onClose={onClose}>
      <StyledDialogHeader>
        <div>
          <h4>{address.description}</h4>
        </div>
        <CloseButton aria-label="close" onClick={onClose}>
          <CloseIcon />
        </CloseButton>
      </StyledDialogHeader>
      <StyledMuiDialogContent>
        <Paper style={{ height: 700, width: 900 }}>
          <AutoSizer>
            {({ height, width }) => (
              <Table
                rowGetter={({ index }) => historyList[index]}
                height={height}
                width={width}
                rowHeight={50}
                gridStyle={{
                  direction: 'inherit',
                }}
                headerHeight={75}
                rowCount={historyList.length}
              >
                {columns.map(({ dataKey, label }) => (
                  <Column
                    key={dataKey}
                    headerRenderer={() => renderHeader({ label })}
                    cellRenderer={renderCell}
                    dataKey={dataKey}
                    width={225}
                  />
                ))}
              </Table>
            )}
          </AutoSizer>
        </Paper>
      </StyledMuiDialogContent>
    </Dialog>
  );
};
