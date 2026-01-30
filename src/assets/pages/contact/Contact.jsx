import React from 'react'
import { useTranslation } from 'react-i18next';

export default function Contact() {
    const { t, i18n } = useTranslation();
  
  return (
    <div>
        {t('Contact')} 
    </div>
  )
}
