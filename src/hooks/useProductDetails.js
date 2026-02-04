import { useFetch } from './useFetch';
import i18n from '../i18n';

export function useProductDetails(id) {
  console.log('Fetching product details for ID:', id);
  return useFetch(
    ['product', id, i18n.language], // query key
    `/Products/${id}`, // URL
    {} // params فارغة
  );
}
