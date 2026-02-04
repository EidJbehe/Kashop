import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../Api/axiosInstance"
import { useFetch } from "./useFetch";
import i18n from "../i18n";

export function useProducts(filters={}) { 

  return useFetch(['product', i18n.language, filters], '/Products', filters);
}