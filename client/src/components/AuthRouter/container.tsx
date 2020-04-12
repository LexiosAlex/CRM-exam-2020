import AuthRouter from './index';
import { connect } from 'react-redux';
import { AppState } from '../../reducers/rootReducer';

const enhance = connect((state: AppState) => {
  const { firebase } = state;
  const { auth, profile } = firebase;
  return {
    auth,
    profile,
  };
});

export default enhance(AuthRouter);
