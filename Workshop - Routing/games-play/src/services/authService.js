import * as request from "./requester";

const baseUrl = 'http://localhost:3030/users';

export const login = (email, password) => {
    return request.post(`${baseUrl}/login`, { email, password});
};

export const logout = () => {
    return request.get(`${baseUrl}/logout`);
};

export const register = (userData) => {
    return request.post(`${baseUrl}/register`, userData);
}