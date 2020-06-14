import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { AutoSizer, Column, Table, TableCellRenderer, TableHeaderProps } from 'react-virtualized';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';

import { IActivity, IActivityHistory } from 'common/types';
import { TITLE_STATUS_MAP } from '../../utils/activities';

import styles from './index.scss';

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
    <TableCell
      component="div"
      className={`${styles.tableCell} ${styles.flexContainer}`}
      variant="body"
    >
      {cellData}
    </TableCell>
  );
};

const renderHeader = ({ dataKey, label }) => {
  return (
    <TableCell
      component="div"
      className={`${styles.tableCell} ${styles.tableHeader} ${styles.flexContainer}`}
      variant="head"
    >
      <span>{label}</span>
    </TableCell>
  );
};

const HistoryTableDialog: React.FC<DialogProps> = ({ open, onClose, activity }) => {
  const { history, type, address } = activity;
  console.log(history);

  const mutateHistoryItem = (historyItem: IActivityHistory): IHistoryTableItem => {
    return {
      operatorName: historyItem.operator ? historyItem.operator.name : 'no data provided',
      assigneeName: historyItem.assignee ? historyItem.assignee.name : 'no data provided',
      time: moment(historyItem.time).format('LLL'),
      status: TITLE_STATUS_MAP[historyItem.status],
    };
  };

  const mappedHistory = Object.entries(history).reduce(
    (acc: IHistoryTableItem[], [key, historyData]) => [...acc, ...[mutateHistoryItem(historyData)]],
    []
  );
  return (
    <>
      <Dialog maxWidth="lg" open={open} onClose={onClose}>
        <header className={styles.dialogHeader}>
          <div>
            <h4>{address}</h4>
          </div>
          <IconButton aria-label="close" className={styles.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </header>
        <MuiDialogContent>
          <Paper style={{ height: 700, width: 900 }}>
            <AutoSizer>
              {({ height, width }) => (
                <Table
                  rowGetter={({ index }) => mappedHistory[index]}
                  height={height}
                  width={width}
                  rowHeight={50}
                  gridStyle={{
                    direction: 'inherit',
                  }}
                  headerHeight={75}
                  rowCount={mappedHistory.length}
                  rowClassName={styles.flexContainer}
                >
                  {columns.map(({ dataKey, label }, index) => (
                    <Column
                      key={dataKey}
                      headerRenderer={() => renderHeader({ dataKey, label })}
                      cellRenderer={renderCell}
                      dataKey={dataKey}
                      width={225}
                    />
                  ))}
                </Table>
              )}
            </AutoSizer>
          </Paper>
        </MuiDialogContent>
      </Dialog>
    </>
  );
};

export default HistoryTableDialog;
