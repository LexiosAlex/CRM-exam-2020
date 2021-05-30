import React, { ChangeEvent } from 'react';
import Box from '@material-ui/core/Box';
import { InputLabel, NativeSelect } from '@material-ui/core';
import { Language } from 'common/constants';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';
import { StyledSelect } from './LanguageSelect.style';

export const LanguageSelect = () => {
  const { t } = useTranslation();

  const handleChangeLanguage = (event: ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <Box display="flex" flexDirection="row" alignItems="center">
      <InputLabel htmlFor="select-language">{t('language.language')}</InputLabel>
      <StyledSelect id="select-language" value={i18n.language} onChange={handleChangeLanguage}>
        <option value={Language.EN}>{t('language.en')}</option>
        <option value={Language.RU}>{t('language.ru')}</option>
      </StyledSelect>
    </Box>
  );
};
