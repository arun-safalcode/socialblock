import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from '../redux/store';
import types from '../redux/types';


const { dispatch, getState } = store;
 
export async function getHeaders() {
	try {
	  const userData = await AsyncStorage.getItem('userData');
	  if (userData) {
		const { access_token } = JSON.parse(userData);
		return {
		  Authorization: `Bearer ${access_token}`,
		};
	  }
	  return {};
	} catch (error) {
	  console.error('Error while getting headers:', error);
	  return {};
	}
  }

export async function apiReq(
	endPoint,
	data,
	method,
	headers,
	requestOptions = {}
) {

	return new Promise(async (res, rej) => {
		const getTokenHeader = await getHeaders();
		
		headers = {
			...getTokenHeader,
			...headers
		};

		if (method === 'get' || method === 'delete') {
			data = {
				...requestOptions,
				...data,
				headers
			};
		}
		axios[method](endPoint, data, { headers })
			.then(result => {

				const { data } = result;

				if (data.status === false) {
					return rej(data);
				}

				return res(data);
			})
			.catch(error => {
				console.log(error)
				console.log(error && error.response, 'the error respne')
				if (error && error.response && error.response.status === 401) {
					clearUserData();
					// NavigationService.resetNavigation();
					//NavigationService.navigate('loginUsingEmailScreen');
					dispatch({
						type: types.CLEAR_REDUX_STATE,
						payload: {}
					});
					dispatch({
						type: types.NO_INTERNET,
						payload: { internetConnection: true },
					});


				}
				if (error && error.response && error.response.data) {
					if (!error.response.data.message) {
						return rej({ ...error.response.data, msg: error.response.data.message || "Network Error" })
					}
					return rej(error.response.data)
				} else {
					return rej({ message: "Network Error", msg: "Network Error" });
				}
				return rej(error);
			});
	});
}
 
export async function apiPost(endPoint, data, headers = {}) {
	return apiReq(endPoint, data, 'post', headers);
}

export async function apiDelete(endPoint, data, headers = {}) {
	return apiReq(endPoint, data, 'delete', headers);
}

export async function apiGet(endPoint, data, headers = {}, requestOptions) {
	return apiReq(endPoint, data, 'get', headers, requestOptions);
}

export async function apiPut(endPoint, data, headers = {}) {
	return apiReq(endPoint, data, 'put', headers);
}

export async function setItem(key, data) {
	data = JSON.stringify(data);
	return AsyncStorage.setItem(key, data);
}

export async function getItem(key) {
	return new Promise((resolve, reject) => {
		AsyncStorage.getItem(key).then(data => {
			resolve(JSON.parse(data));
		});
	});
}

export async function removeItem(key) {
	return AsyncStorage.removeItem(key);
}

export async function clearAsyncStorate(key) {
	return AsyncStorage.clear();
}

export async function setUserData(data) {
	data = JSON.stringify(data);
	return AsyncStorage.setItem('userData', data);
}

export async function getUserData() {
	return new Promise((resolve, reject) => {
		AsyncStorage.getItem('userData').then(data => {
			resolve(JSON.parse(data));
		});
	});
}
export async function clearUserData() {
	return AsyncStorage.removeItem('userData');
}