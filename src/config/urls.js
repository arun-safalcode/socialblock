export const API_BASE_URL = "https://socialblock.twtests.co.in/api/auth";

export const getApiUrl = (endpoint)=>API_BASE_URL + endpoint;

export const LOGIN = getApiUrl('/login');
export const PROFILE = getApiUrl('/profile');
export const SCANNER = getApiUrl('/qr-token');