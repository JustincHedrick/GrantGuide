// API modules are where the code lives to communicate
// with the server via AJAX
import sendRequest from './send-request';
const BASE_URL = '/api/users';


export function getGuides() {
  return sendRequest(`${BASE_URL}`);
}

export function updateProfile(userData) {
  return sendRequest(`${BASE_URL}/update`, 'POST', userData);
}

export function signUp(userData) {
  return sendRequest(BASE_URL, 'POST', userData);
}

export function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
}

export function checkToken() {
  return sendRequest(`${BASE_URL}/check-token`);
}

export function getUser(userId) {
  return sendRequest(`${BASE_URL}/${userId}`)
}

