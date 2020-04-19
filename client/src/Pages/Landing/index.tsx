import React, { useEffect } from 'react';
import { useFirebase } from 'react-redux-firebase';
import { REFS } from '../../utils/refs';
import TaskList from "../../components/TaskList";

const Landing: React.FC = () => {
  const firebase = useFirebase();
  useEffect(() => {
    firebase.ref(REFS.ACTIVITIES).on('value', (snap) => {
      console.log(snap.val());
    });
  }, []);



  return <div className="container">

  </div>;
};

export default Landing;
