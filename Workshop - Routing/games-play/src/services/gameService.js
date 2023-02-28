import * as request from '../services/requester';

const baseUrl = 'http://localhost:3030/data/games';


const getAll = () => {
   return request.get(`${baseUrl}?sortBy=_createdOn%20desc`); 
};

const create = (gameData) => {
    return request.post(baseUrl, gameData);
};

const getOne = (gameId) => {
    return request.get(`${baseUrl}/${gameId}`);
};

const edit = (gameId, gameData) => {
    return request.put(`${baseUrl}/${gameId}`, gameData);
};

const remove = (gameId) => {
    return request.del(`${baseUrl}/${gameId}`);
};

export {
    getAll,
    create,
    getOne,
    edit,
    remove
}