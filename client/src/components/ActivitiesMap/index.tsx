import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { GoogleMap, Marker } from '@react-google-maps/api';

import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';

import { IActivity, ILatLng } from 'common/types';
import { IAppState } from '../../interfaces/state';
import selectors from '../../selectors';
import { TITLE_STATUS_MAP, TITLE_TYPE_MAP } from '../../utils/activities';
import { ActivityStatus } from 'common/constants';

import styles from './index.scss';

const SaintPLatLng: ILatLng = {
  lat: 59.93863,
  lng: 30.31413,
};

const ActivitiesMap: React.FC = () => {
  const activities: { [key: string]: IActivity } = useSelector((state: IAppState) =>
    selectors.activities.getFilteredHeap(state)
  );

  const visibleStatuses: ActivityStatus[] = useSelector((state: IAppState) =>
    selectors.user.getVisibleStatuses(state)
  );

  const [status, setStatus] = useState<ActivityStatus | number>(-1);

  return (
    <>
      <div className={styles.selectInputContainer}>
        <NativeSelect
          input={<InputBase className={styles.inputWrapper} />}
          value={status}
          onChange={(event) => setStatus(parseInt(event.target.value))}
        >
          <option value={-1}>All activities</option>
          {visibleStatuses.map((status) => (
            <option key={status} value={status}>
              {TITLE_STATUS_MAP[status]}
            </option>
          ))}
        </NativeSelect>
      </div>
      <GoogleMap
        zoom={10}
        center={SaintPLatLng}
        mapContainerStyle={{ height: 'calc(100% - 6rem)' }}
      >
        {Object.entries(activities).map(([activityId, activityProps]) => {
          if (!activityProps.address.coords) {
            return;
          }

          return status === -1 ? (
            <Marker
              key={activityId}
              position={activityProps.address.coords}
              title={`${TITLE_TYPE_MAP[activityProps.type]} , ${activityProps.address.description}`}
            />
          ) : (
            activityProps.status === status && (
              <Marker
                key={activityId}
                position={activityProps.address.coords}
                title={`${TITLE_TYPE_MAP[activityProps.type]} , ${
                  activityProps.address.description
                }`}
              />
            )
          );
        })}
      </GoogleMap>
    </>
  );
};

export default ActivitiesMap;
