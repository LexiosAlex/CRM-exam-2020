import React, { useState, useEffect, useMemo } from 'react';
import throttle from 'lodash/throttle';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { IAddress } from 'common/types';
import Option from './Option';
import autoCompleteOnChange from './autoCompleteOnChange';
import AREA from '../../../utils/placeConfig';

interface IAutocompleteService {
  current: null | google.maps.places.AutocompleteService;
}

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
  customValue: IAddress | null;
  disabled: boolean;
  id: string;
  type: string;
  input: any;
  meta: any;
}

const autocompleteService: IAutocompleteService = { current: null };

const PlacesAutoSuggest: React.FC<PlacesAutoSuggestProps> = (params) => {
  const { customValue, input } = params;

  const [inputValue, setInputValue] = useState<string>(customValue ? customValue.description : '');
  const [options, setOptions] = useState<IAddress[]>([]);

  const doSuggest = useMemo(
    () =>
      throttle((request: AutoSuggestQuery, callback: (results?: PlaceType[]) => void) => {
        (autocompleteService.current as any).getPlacePredictions(request, callback);
      }, 300),
    []
  );

  useEffect(() => {
    let active = true;

    if (!autocompleteService.current && google) {
      autocompleteService.current = new google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return;
    }

    if (inputValue === '') {
      setOptions(customValue ? [customValue] : []);
      return;
    }

    doSuggest(
      {
        input: `${AREA.NAME},${inputValue}`,
        componentRestrictions: { country: ['ru'] },
      } as AutoSuggestQuery,
      (results?: PlaceType[]) => {
        if (active) {
          const newOptions: IAddress[] = [];
          if (customValue) {
            newOptions.push(customValue);
          }
          if (results) {
            results.forEach(({ description }) => newOptions.push({ description }));
          }

          setOptions(newOptions);
        }
      }
    );

    return () => {
      active = false;
    };
  }, [customValue, inputValue, doSuggest]);

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
      onChange={async (event: any, newValue: IAddress | null) =>
        autoCompleteOnChange(event, newValue, input, setOptions, options)
      }
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => <TextField {...params} variant="outlined" fullWidth />}
      renderOption={(option) => <Option option={option} />}
    />
  );
};

export default PlacesAutoSuggest;
