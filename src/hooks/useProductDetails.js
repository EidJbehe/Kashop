import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../Api/axiosInstance"
import { useFetch } from "./useFetch";

export function useProductDetails(id) {
  return useFetch(['product',id], `/Products/${id}`);
}