import axiosAuthInstance from "../Api/axiosAuthInstance";
import i18n from "../i18n";
import { useFetch } from "./useFetch";

export default function useProfile() {
  return useFetch(['profile', i18n.language], '/Profile', axiosAuthInstance);
}
