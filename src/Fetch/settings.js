const API_DOMAIN = 'https://tati-b-n.ru';
const API_PREFIX = '/api/v1/';
const CONCATE = API_DOMAIN + API_PREFIX;

// const CONCATE = API_PREFIX;
// API METHODS URLS


// Галерея
export const PAINTINGS = CONCATE + 'list/paintings/';
export const PAINTINGS_DETAIL = (id) => CONCATE + `detail/painting/${id}/`;


// video
export const VIDEOS_LIST_GET = CONCATE + 'list/videos/';

// отзывы
export const REVIEWS_LIST_GET = CONCATE + 'desktop/list/reviews/';
export const REVIEWS_LIST_MOBILE_GET = CONCATE + 'mobile/list/reviews/';


// contact
export const CONTACT_POST = CONCATE + 'create/application/';
