import axios from 'axios';
import { VIDEOS_LIST_GET } from "../../Fetch/settings";

export const getVideos = (setVideos, Category) => {
    const url = Category ? `${VIDEOS_LIST_GET}?category=${Category}` : `${VIDEOS_LIST_GET}`;

    axios.get(url)
    .then((response) => {
        setVideos(response.data);
      
    })
    .catch((error) => {
        console.error("Error fetching VIDEOS:", error.response || error.message);
    });
};
