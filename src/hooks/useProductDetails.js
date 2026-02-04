import { useFetch } from './useFetch';
import i18n from '../i18n';

export function useProductDetails(id) {
  return useFetch(
    ['product', id, i18n.language], // query key
    `/Products/${id}`, // URL
    {} // params فارغة
  );
}
