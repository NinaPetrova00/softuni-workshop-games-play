// import { post } from "./requester";
import * as request from './requester';

const baseUrl = 'http://localhost:3030';

export const login = (email, password) => {
    // request('POST', `${baseUrl}/users/login`);

    return request.post(`${baseUrl}/users/login`, { email, password });
};

export const logout = async (accessToken) => {
    try {
        const response = await fetch(`${baseUrl}/users/logout`, {
            headers: {
                'X-Authorization': accessToken
            }
        });

        return response;
    } catch (error) {
        console.log(error);
    }
};

export const register = (email, password) => {
    return request.post(`${baseUrl}/users/register`, { email, password });
}