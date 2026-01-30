import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../Api/axiosInstance"
import { useFetch } from "./useFetch";
import i18n from "../i18n";

export function useProductDetails(id) {
  return useFetch(['product',id,i18n.language], `/Products/${id}`);
}