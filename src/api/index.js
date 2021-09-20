import axios from "axios";
import { BASE_URL } from "@constants/api";

export const getCurrencyList = async () => {
    const response = await axios.get(`${BASE_URL}/daily_json.js`);

    return Object.keys(response.data.Valute).map(el => response.data.Valute[el]).map(el => {
      el.differency = el.Value > el.Previous
      el.difference = Math.round(((el.Value - el.Previous)) * 10000) / 10000
      return el
    })
  };