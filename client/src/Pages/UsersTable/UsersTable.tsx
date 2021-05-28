import React, { forwardRef } from 'react';
import MaterialTable, { Column, Icons } from 'material-table';
import { useDispatch, useSelector } from 'react-redux';

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
import Box from '@material-ui/core/Box';

import { EmployeeType, ITypedUser } from 'common/index';
import { IAppState } from '../../interfaces/state';
import { editUser } from '../../actions/users';
import selectors from '../../selectors/index';
import { TITLE_USER_TYPE_MAP } from '../../utils/users';
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';

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

const columns: Column<ITypedUser>[] = [
  { title: i18n.t('usersTable.name'), field: 'name', editable: 'never' },
  {
    title: i18n.t('usersTable.role'),
    field: 'type',
    lookup: TITLE_USER_TYPE_MAP,
    editable: 'onUpdate',
  },
];

export const UsersTable: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('usersTable');
  const isLoading = useSelector((state: IAppState) => selectors.employees.isLoading(state));
  const employees = useSelector((state: IAppState) => selectors.employees.userList(state));

  const handleEditUser = (id: string, type: EmployeeType) => {
    dispatch(editUser(id, type));
    return Promise.resolve();
  };

  return (
    <Box marginLeft="50px" marginRight="50px" marginTop="50px">
      <h2>{t('usersManagement')}</h2>
      <MaterialTable
        isLoading={isLoading}
        icons={tableIcons}
        title="Users"
        columns={columns}
        data={employees}
        editable={{
          onRowUpdate: ({ id, type }) => handleEditUser(id, type),
        }}
      />
    </Box>
  );
};
