import axios from "axios";
import { REVIEWS_LIST_MOBILE_GET } from "../../Fetch/settings";


export const getMobileReviews = (setData) => {
  return axios.get(REVIEWS_LIST_MOBILE_GET)
    .then((response) => {
      setData(response.data);
    })
    .catch((error) => {
      console.error("Error fetching reviews:", error.response || error.message);
    });
};
