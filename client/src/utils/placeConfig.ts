import { ILatLng } from 'common/types';

interface areaCfg {
  COORDS: ILatLng;
  ZOOM: number;
  NAME: string;
}

const AREA = {
  COORDS: {
    lat: 59.93863,
    lng: 30.31413,
  },
  ZOOM: 10,
  NAME: 'Saint Petersburg',
};

export default AREA;
