import React, { ChangeEvent } from 'react';
import Box from '@material-ui/core/Box';
import { InputLabel, NativeSelect } from '@material-ui/core';
import i18n from '../../i18n';
import { Language } from 'common/constants';
import { useTranslation } from 'react-i18next';

export const LanguageSelect = () => {
  const { t } = useTranslation();

  const handleChangeLanguage = (event: ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <Box>
      <InputLabel htmlFor="select-language">{t('language.language')}</InputLabel>
      <NativeSelect id="select-language" value={i18n.language} onChange={handleChangeLanguage}>
        <option value={Language.EN}>{t('language.en')}</option>
        <option value={Language.RU}>{t('language.ru')}</option>
      </NativeSelect>
    </Box>
  );
};
