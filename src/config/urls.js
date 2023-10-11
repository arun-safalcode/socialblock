export const API_BASE_URL = "https://socialblock.twtests.co.in/api/auth";

export const getApiUrl = (endpoint)=>API_BASE_URL + endpoint;

export const LOGIN = getApiUrl('/login');
export const PROFILE = getApiUrl('/profile');
export const REFRESH = getApiUrl('/refresh');
export const SCANNER = getApiUrl('/qr-token');
export const ATTENDANCE = getApiUrl('/emp-attand');
export const APPLIST = getApiUrl('/app-data');
export const ATTENDANCE_HISTORY = getApiUrl('/attand-history');