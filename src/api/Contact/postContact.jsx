import axios from 'axios';
import { CONTACT_POST } from "../../Fetch/settings";

export const postContactRequest = ({ phone, name }) => {
  return axios.post(CONTACT_POST, {
    phone: phone,
    name: name,
  }, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
