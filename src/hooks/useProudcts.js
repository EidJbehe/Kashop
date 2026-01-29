import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../Api/axiosInstance"
import { useFetch } from "./useFetch";

export function useProducts() { 

  return useFetch('products', '/Products');
}