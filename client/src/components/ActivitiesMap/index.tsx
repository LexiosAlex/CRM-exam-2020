import React from 'react';
import { GoogleMap, Marker, withGoogleMap } from 'react-google-maps';
import { IActivity, ILatLng } from 'common/types';
import { useSelector } from 'react-redux';
import { IAppState } from '../../interfaces/state';
import selectors from '../../selectors';

const SaintPLatLng: ILatLng = {
  lat: 59.93863,
  lng: 30.31413,
};

const ActivitiesMap: React.FC = () => {
  const activities: { [key: string]: IActivity } = useSelector((state: IAppState) =>
    selectors.activities.getFilteredHeap(state)
  );
  console.log(activities);
  return (
    <GoogleMap defaultZoom={10} defaultCenter={SaintPLatLng}>
      {Object.entries(activities).map(([activityId, activityProps]) => (
        <Marker key={activityId} position={activityProps.address.coords} />
      ))}
    </GoogleMap>
  );
};

export default withGoogleMap(ActivitiesMap);
