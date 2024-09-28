

// const API_DOMAIN = 'https://tati-b-n.ru';
const API_PREFIX = '/api/v1/';
// const CONCATE = API_DOMAIN + API_PREFIX;

const CONCATE = API_PREFIX;
// API METHODS URLS


// подписка

export const PAINTINGS = CONCATE + 'list/paintings/';
export const PAINTINGS_DETAIL = (id) => CONCATE + `detail/painting/${id}/`;


// продукты
export const PRODUCT_LIST_GET = CONCATE + 'GetProducts/';
export const PRODUCT_DETAIL = (slug) => 
    CONCATE + `GetProductDetail/${slug}/`;

export const PRODUCT_SIMILAR_POST = CONCATE + 'GetSimilarProducts/';


// Статика
export const PARTNER_GET = CONCATE + 'partner/';
export const CONTACT_GET = CONCATE + 'contact/';
export const FQA_GET = CONCATE + 'aboutUs/';
export const POPULAR_SERVICE_GET = CONCATE + 'popular-service/';


// Корзина

export const CAT_GET = CONCATE + 'account/my/shopping-cart/';
export const CAT_ADD_POST = CONCATE + 'account/add/shopping-cart/'
export const CAT_DELETE_POST = CONCATE + 'account/delete/shopping-cart/'
export const CAT_GET_COUNT = CONCATE + 'account/shopping-cart/products/count/'
