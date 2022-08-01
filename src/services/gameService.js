// import { get  } from "./requester";
import * as request from './requester';

const baseUrl = 'http://localhost:3030';

export const getAll = () => {
    // return fetch(`${baseUrl}/data/games`)
    //     .then(res => res.json());

    // using import {get}
    // return get(`${baseUrl}/data/games`);

    
    return request.get(`${baseUrl}/data/games`);
};
