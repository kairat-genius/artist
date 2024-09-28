import axios from 'axios'
import {PAINTINGS} from "../../Fetch/settings"

export const getPaintings = (setData) => {
    axios.get(PAINTINGS)
    .then((response) => {
        setData(response.data.results);
    })
    .catch((error) => {
        console.error("Error fetching paintings:", error.response || error.message);
    });

}