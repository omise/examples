import { OmiseCreateResponseSuccessful } from "@/@types/omise/omise";
import axios from "axios";
import type { AxiosResponse } from "axios";

export const useAxios = () => {
  const a = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });
  a.interceptors.response.use(
    (response) => response,
    (error) => {
      alert(error.response);
      return error;
    }
  );
  return a;
};

export const apiCharge = axios.create({
  auth: {
    username: process.env.OMISE_SECRET_KEY,
    password: ""
  }
});

export const useAPICreditCard = () => {
  const axios = useAxios();
  return (amount: number, token: string): Promise<AxiosResponse<any>> =>
    axios.post("api/credit-card", { amount, token });
};

export const useAPIChargeBySource = () => {
  const axios = useAxios();
  return (amount: number, source: string, returnUri: string, paymentId: string): Promise<AxiosResponse<any>> =>
    axios.post("api/charge-by-source", { amount, source, returnUri, paymentId });
};

export const useAPIPayPay = () => {
  const axios = useAxios();
  return (amount: number, returnUri: string, paymentId: string): Promise<AxiosResponse<any>> =>
    axios.post("api/paypay", { amount, returnUri, paymentId });
};

export const useAPIPayPayAnother = () => {
  const axios = useAxios();
  return (amount: number, source: string, returnUri: string, paymentId: string): Promise<AxiosResponse<any>> =>
    axios.post("api/paypay-another", { amount, source, returnUri, paymentId });
};

export const useAPIRetrievCharge = () => {
  const axios = useAxios();
  return (paymentId: string): Promise<AxiosResponse<any>> =>
    axios.get("api/charge-retrieve/"+paymentId);
};
