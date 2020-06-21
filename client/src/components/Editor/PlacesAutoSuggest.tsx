import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import throttle from 'lodash/throttle';
import { IActivityAddress, ILatLng } from 'common/types';

const autocompleteService = { current: null };

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}));

interface PlaceType {
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
    main_text_matched_substrings: [
      {
        offset: number;
        length: number;
      }
    ];
  };
}

interface Restrictions {
  country: string | Array<string>;
}

interface AutoSuggestQuery {
  input: string;
  types?: Array<string>;
  componentRestrictions?: Restrictions;
  bounds?: google.maps.LatLngBounds;
  strictBounds?: boolean;
}

interface PlacesAutoSuggestProps {
  customValue: IActivityAddress | null;
  disabled: boolean;
  id: string;
  type: string;
  input: any;
  meta: any;
}

const PlacesAutoSuggest: React.FC<PlacesAutoSuggestProps> = (params) => {
  const { customValue, input } = params;

  const classes = useStyles();
  const [inputValue, setInputValue] = useState<string>(customValue ? customValue.description : '');
  const [options, setOptions] = useState<IActivityAddress[]>([]);

  const fetch = React.useMemo(
    () =>
      throttle((request: AutoSuggestQuery, callback: (results?: PlaceType[]) => void) => {
        (autocompleteService.current as any).getPlacePredictions(request, callback);
      }, 300),
    []
  );

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current && (window as any).google) {
      autocompleteService.current = new (window as any).google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      setOptions(customValue ? [customValue] : []);
      return undefined;
    }

    fetch(
      {
        input: `Saint Petersburg,${inputValue}`,
        componentRestrictions: { country: ['ru'] },
      } as AutoSuggestQuery,
      (results?: PlaceType[]) => {
        if (active) {
          let newOptions = [] as IActivityAddress[];

          if (customValue) {
            newOptions = [customValue];
          }
          if (results) {
            results.map((it) => {
              newOptions.push({ description: it.description });
            });
          }

          setOptions(newOptions);
        }
      }
    );

    return () => {
      active = false;
    };
  }, [customValue, inputValue, fetch]);

  return (
    <Autocomplete
      id="google-map-demo"
      style={{ width: 300 }}
      getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={customValue ? customValue : null}
      onChange={async (event: any, newValue: IActivityAddress | null) => {
        if (!newValue) {
          input.onChange(newValue);
          return;
        }

        const geoCoderService = new google.maps.Geocoder();
        await geoCoderService.geocode({ address: newValue?.description }, (results, status) => {
          if (status == google.maps.GeocoderStatus.OK) {
            var latitude = results[0].geometry.location.lat();
            var longitude = results[0].geometry.location.lng();
            const coords: ILatLng = { lat: latitude, lng: longitude };
            input.onChange({ description: newValue?.description, coords } as IActivityAddress);
            setOptions([newValue, ...options]);
          }
        });
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => <TextField {...params} variant="outlined" fullWidth />}
      renderOption={(option) => {
        return (
          <Grid container alignItems="center">
            <Grid item>
              <LocationOnIcon className={classes.icon} />
            </Grid>
            <Grid item xs>
              <Typography variant="body2" color="textSecondary">
                {option.description}
              </Typography>
            </Grid>
          </Grid>
        );
      }}
    />
  );
};

export default PlacesAutoSuggest;
