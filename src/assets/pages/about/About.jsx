import React from 'react'
import { useTranslation } from 'react-i18next';

export default function About() {
    const { t, i18n } = useTranslation();
  
  return (
    <div>
      {t('About')}
    </div>
  )
}
