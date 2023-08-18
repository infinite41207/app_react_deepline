import axios from "axios";
import getConfig from "../config/setup";

export async function sendMessage(params) {
  return await axios.post(
    `${process.env.REACT_APP_API_BASE_URL}/ai/send-message`,
    params,
    getConfig()
  );
}

export async function getConversationRecords() {
  return await axios.get(
    `${process.env.REACT_APP_API_BASE_URL}/ai/conversation-records`,
    getConfig()
  );
}


export async function getMessages(params) {
  return await axios.get(
    `${process.env.REACT_APP_API_BASE_URL}/ai/get-messages`,
    {
      headers: getConfig().headers,
      params: params
    }
  );
}
