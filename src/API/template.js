import axios from "axios";
import getConfig from "../config/setup";

export const getAllTemplates = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_BASE_URL}/ai/history`,
    getConfig()
  );
  return res.data.data;
};

export const getTemplates = async (temp) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/ai/text-type-history/all?text_type=${temp.param}`,
        getConfig()
      )
      .then((res) => {
        resolve({ totals: res.data.data.length });
      });
  });
};

export function updateOutputRecord(id, params) {
  axios.put(
    `${process.env.REACT_APP_API_BASE_URL}/ai/update-output-record/${id}`,
    params,
    getConfig()
  );
}

export async function generateText(params) {
  return await axios.post(
    `${process.env.REACT_APP_API_BASE_URL}/ai/generate-text`,
    params,
    getConfig()
  );
}

export async function getHistoryOutput(id) {
  return await axios.get(
    `${process.env.REACT_APP_API_BASE_URL}/ai/history-outputs?history_id=${id}`,
    getConfig()
  );
}

export async function getHistories(params) {
  return await axios.get(`${process.env.REACT_APP_API_BASE_URL}/ai/history`, {
    params,
    headers: getConfig().headers,
  });
}
