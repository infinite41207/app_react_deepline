import axios from "axios";
import getConfig from "../config/setup";

export async function signIn(params) {
    return await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/signin`, params)
}

export async function signup(params) {
  const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/signup`, params);
  return res
}

export async function signInWithSocial(params) {
    const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/social-signin`, params)
    return res
}

export async function signUpWithSocial(params) {
    const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/social-signup`, params)
    return res
}

export async function verifyAccount(params) {
    return await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/verify-account`, params)
}

export async function resendOtp(params) {
    return await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/resend-otp`, params)
}

export async function getDeleteAccountOTP() {
    return await axios.get(`${process.env.REACT_APP_API_BASE_URL}/auth/get-delete-account-otp`, getConfig())
}

export async function deleteAccount(otp) {
    return await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/auth/delete-account`, {
        headers: getConfig().headers,
        data: {
            otp
        }
    })
}