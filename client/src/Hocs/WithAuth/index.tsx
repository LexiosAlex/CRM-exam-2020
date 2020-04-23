import { connect } from 'react-redux';
import { AppState } from '../../reducers/rootReducer';

export default connect((state: AppState) => {
  const { firebase } = state;
  const { auth, profile, authError } = firebase;
  return {
    auth,
    profile,
    authError,
  };
});
