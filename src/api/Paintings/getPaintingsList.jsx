import axios from "axios";
import { PAINTINGS } from "../../Fetch/settings";

export const getPaintings = (setData, Category) => {
  const url = Category
    ? `${PAINTINGS}?category=${Category}`
    : PAINTINGS;

  console.log(`Fetching paintings from URL: ${url}`);

  return axios
    .get(url)
    .then((response) => {
      setData(response.data);
    })
    .catch((error) => {
      console.error("Error fetching paintings:", error.response || error.message);
    });
};
