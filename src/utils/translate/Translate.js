import { useTranslation } from 'react-i18next';

//   const { t, i18n } = useTranslation();

function Translate(lang) {
    const { t, i18n } = useTranslation();
    i18n.changeLanguage(lang);
}

export default Translate;
