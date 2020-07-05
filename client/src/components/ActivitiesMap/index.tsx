import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { GoogleMap, Marker } from '@react-google-maps/api';

import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';

import { IActivity } from 'common/types';
import { IAppState } from '../../interfaces/state';
import selectors from '../../selectors';
import { TITLE_STATUS_MAP, TITLE_TYPE_MAP } from '../../utils/activities';
import { ActivityStatus } from 'common/constants';
import AREA from '../../utils/placeConfig';

import styles from './index.scss';

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
        zoom={AREA.ZOOM}
        center={AREA.COORDS}
        mapContainerStyle={{ height: 'calc(100% - 6rem)' }}
      >
        {Object.entries(activities).map(([activityId, activityProps]) => {
          if (!activityProps.address.coords) {
            return;
          }

          const title =
            status === -1 || activityProps.status === status
              ? `${TITLE_TYPE_MAP[activityProps.type]} , ${activityProps.address.description}`
              : null;
          return title ? (
            <Marker key={activityId} position={activityProps.address.coords} title={title} />
          ) : null;
        })}
      </GoogleMap>
    </>
  );
};

export default ActivitiesMap;
