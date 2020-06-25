import { IAddress, ILatLng } from 'common/types';

const autoCompleteOnChange = async (
  event: any,
  newValue: IAddress | null,
  input: any,
  setOptions: Function,
  options: Array<IAddress>
) => {
  if (!newValue) {
    input.onChange(newValue);
    return;
  }

  const geoCoderService = new google.maps.Geocoder();
  await geoCoderService.geocode({ address: newValue?.description }, (results, status) => {
    if (status == google.maps.GeocoderStatus.OK) {
      const coords: ILatLng = {
        lat: results[0].geometry.location.lat(),
        lng: results[0].geometry.location.lng(),
      };
      input.onChange({ description: newValue?.description, coords } as IAddress);
      setOptions([newValue, ...options]);
    }
  });
};

export default autoCompleteOnChange;
