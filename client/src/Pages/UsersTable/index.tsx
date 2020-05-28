import React, { forwardRef } from 'react';
import MaterialTable, { Column, Icons } from 'material-table';
import { EmployeeType } from 'common/constants';
import { connect, useDispatch } from 'react-redux';
import selectors from '../../selectors/index';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import styles from './index.scss';
import { IAppState } from '../../interfaces/state';
import employees from '../../selectors/employees';
import { IUsersHeapState } from '../../interfaces/state';
import { IAppUser } from 'common/types';
import { EDIT_USER_PENDING } from '../../interfaces/actions/users';

const tableIcons: Icons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

interface Row {
  name: string;
  type: EmployeeType;
  id: string;
}

interface TableState {
  columns: Array<Column<Row>>;
  data: Row[];
}

interface UsersTableProps {
  employees: any;
  isLoading: boolean;
}

const UsersTable: React.FC<UsersTableProps> = ({ employees, isLoading }) => {
  const dispatch = useDispatch();
  const [state, setState] = React.useState<TableState>({
    columns: [
      { title: 'Name', field: 'name', editable: 'never' },
      {
        title: 'Role',
        field: 'type',
        lookup: { 2: 'Volunteer', 1: 'Operator' },
        editable: 'onUpdate',
      },
    ],
    data: employees,
  });

  return (
    <div className={styles.container}>
      <h2>Users management</h2>
      <MaterialTable
        isLoading={isLoading}
        icons={tableIcons}
        title="Users"
        columns={state.columns}
        data={state.data}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              const { id, type } = newData;
              dispatch({ type: EDIT_USER_PENDING, payload: { id, type } });
              resolve();
              //As the doc says it should be a promise
            }),
        }}
      />
    </div>
  );
};

export default connect((state: IAppState) => ({
  employees: selectors.employees.employeesForTable(state),
  isLoading: selectors.employees.getTableLoading(state),
}))(UsersTable);
