import axios from 'axios'
import {PAINTINGS_DETAIL} from "../../Fetch/settings"

export const getPaintingDetail = (setDataDetail, id) => {
    axios.get(PAINTINGS_DETAIL(id))
    .then((response) => {
        setDataDetail(response.data);
    })
    .catch((error) => {
        console.error("Error fetching paintings:", error.response || error.message);
    });

}
