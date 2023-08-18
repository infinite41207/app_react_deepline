import axios from "axios";
import getConfig from "../config/setup";

export async function getUsageDetails() {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/payment/usage-details`,
      getConfig()
    );
    return res.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function makePayment(params) {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/payment/make-transaction`,
      params,
      getConfig()
    );
    return res;
  } catch (error) {
    return error;
  }
}

export async function pauseSubscription(params) {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/payment/pause-subscription`,
      params,
      getConfig()
    );
    return res;
  } catch (error) {
    return error;
  }
}

export async function getPaymentHistory() {
  const res = await axios.get(
    `${process.env.REACT_APP_API_BASE_URL}/payment/payment-history`,
    getConfig()
  );
  return res.data;
}