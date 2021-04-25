import React, { forwardRef } from 'react';
import MaterialTable, { Column, Icons } from 'material-table';
import { connect, useDispatch } from 'react-redux';

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

import { EmployeeType, ITypedUser } from 'common/index';
import { IAppState } from '../../interfaces/state';
import { editUser } from '../../actions/users';
import selectors from '../../selectors/index';
import { TITLE_USER_TYPE_MAP } from '../../utils/users';
import { Box } from '@material-ui/core';

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

interface TableState {
  columns: Array<Column<ITypedUser>>;
  data: ITypedUser[];
}

interface UsersTableProps {
  employees: ITypedUser[];
  isLoading: boolean;
  editUser: Function;
}

const columns: Column<ITypedUser>[] = [
  { title: 'Name', field: 'name', editable: 'never' },
  {
    title: 'Role',
    field: 'type',
    lookup: TITLE_USER_TYPE_MAP,
    editable: 'onUpdate',
  },
];

const UsersTable: React.FC<UsersTableProps> = ({ employees, isLoading, editUser }) => {
  const dispatch = useDispatch();
  const [state, setState] = React.useState<TableState>({
    columns,
    data: employees,
  });

  return (
    <Box marginLeft="50px" marginRight="50px" marginTop="50px">
      <h2>Users management</h2>
      <MaterialTable
        isLoading={isLoading}
        icons={tableIcons}
        title="Users"
        columns={state.columns}
        data={state.data}
        editable={{
          onRowUpdate: ({ id, type }) => editUser(id, type),
        }}
      />
    </Box>
  );
};

export const WrappedUsersTable = connect(
  (state: IAppState) => ({
    employees: selectors.employees.userList(state),
    isLoading: selectors.employees.isLoading(state),
  }),
  (dispatch) => ({
    editUser: (id: string, type: EmployeeType) => {
      dispatch(editUser(id, type));
      return Promise.resolve();
    },
  }),
)(UsersTable);