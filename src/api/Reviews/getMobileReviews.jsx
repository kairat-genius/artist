import axios from "axios";
import { REVIEWS_LIST_MOBILE_GET } from "../../Fetch/settings";


export const getMobileReviews = async (setData) => {
  try {
    const response = await axios.get(REVIEWS_LIST_MOBILE_GET);
    setData(response.data.results);
  } catch (error) {

    console.error("Error fetching reviews:", error.response ? error.response.data : error.message);
  }
};