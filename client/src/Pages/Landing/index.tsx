import React, { useEffect } from 'react';
import { useFirebase } from 'react-redux-firebase';
import WithAuth from '../../Hocs/WithAuth';
import { REFS } from '../../utils/refs';
import TaskList from "../../components/TaskList";

const getQuery = (firebase, type, uid) => {
  const ActivitiesRef = firebase.ref(REFS.ACTIVITIES);
  switch (type) {
    case 0:
      return ActivitiesRef;
      break;
    case 1:
      return ActivitiesRef.orderByChild('operator').equalTo(uid);
      break;
    case 2:
      return ActivitiesRef.orderByChild('assignee').equalTo(uid);
      break;
    default:
      return;
  }
};

const Landing: React.FC = (props: any) => {
  const {
    auth: { uid },
    profile: { type },
  } = props;
  const firebase = useFirebase();
  useEffect(() => {
    const query = getQuery(firebase, type, uid);
    if (!query) {
      return;
    }
    query.on(
      'value',
      (snapshot) => {
        const r = snapshot.val();
        console.log(r);
      },
      (r) => {
        console.log(r);
      }
    );
  }, []);



  return <div className="container">

  </div>;
};

export default WithAuth(Landing);
