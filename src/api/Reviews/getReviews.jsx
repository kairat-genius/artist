import axios from "axios";
import { REVIEWS_LIST_GET } from "../../Fetch/settings";

export const getReviews = (setData, setPagination, page = 1) => {
  return axios
    .get(`${REVIEWS_LIST_GET}?page=${page}`)
    .then((response) => {
      setData(response.data.results);
      setPagination({
        next: response.data.next,
        previous: response.data.previous,
      });
    })
    .catch((error) => {
      console.error("Error fetching reviews:", error.response || error.message);
    });
};
